"""Record natural-voice narration clips for the voice-over, one mp3 per sentence.

Steps (see CLAUDE.md):
    node tools/narrate-capture.js /tmp/sentences.json [lessonId ...]
    python tools/narrate.py /tmp/sentences.json [--voice am_michael]

Needs: pip install kokoro-onnx soundfile num2words huggingface_hub, and ffmpeg.
The Kokoro-82M model (Apache-2.0) downloads from Hugging Face on first run.

Output per pack: audio/<pack>/clips.mp3 (every clip's mp3 bytes back to back) and
audio/<pack>/index.js, which registers each clip's hash, byte offset, length, and word timings with the page.
Word timings come from the timestamped export of the same model (it also reports phoneme durations):
one start time per whitespace-separated word of the sentence, in centiseconds, so the page can highlight
each word as it is spoken.
Bundling keeps the hosted page under its file-count limit. Clips already in the bundle are reused,
clips no longer used are dropped, and changing the voice re-records the pack.
"""
import argparse
import json
import pathlib
import re
import subprocess
import tempfile
import time

import numpy as np
import soundfile as sf
from huggingface_hub import hf_hub_download
from kokoro_onnx import Kokoro
from num2words import num2words

ROOT = pathlib.Path(__file__).resolve().parent.parent
REPO = "onnx-community/Kokoro-82M-v1.0-ONNX"
TIMED = "onnx-community/Kokoro-82M-v1.0-ONNX-timestamped"
PUNCT = set('.,;:!?—…"()“”«» ')
LABELS = {"am_michael": "Michael", "am_fenrir": "Fenrir", "am_puck": "Puck", "am_onyx": "Onyx", "am_eric": "Eric",
          "am_liam": "Liam", "am_adam": "Adam", "bm_george": "George", "bm_lewis": "Lewis", "bm_daniel": "Daniel", "bm_fable": "Fable"}


def words(n):
    return num2words(n).replace(" and ", " ").replace(",", "")


def year(m):
    return num2words(int(m.group(1)), to="year")


def decade(m):
    w = num2words(int(m.group(1)), to="year")
    return w[:-1] + "ies" if w.endswith("y") else w + "s"


def money(m):
    amount = m.group(1).replace(",", "")
    if "." in amount:
        d, c = amount.split(".")
        cents = int(c.ljust(2, "0")[:2])
        return f"{words(int(d))} dollars" + (f" and {words(cents)} cents" if cents else "")
    return f"{words(int(amount))} dollar" + ("" if amount == "1" else "s")


def normalize(t):
    """Spell out numbers so the speech model reads them the way an accountant would."""
    t = re.sub(r"\$([\d,]+(?:\.\d+)?)", money, t)
    t = re.sub(r"(\d+(?:\.\d+)?)%", lambda m: f"{normalize(m.group(1))} percent", t)
    t = re.sub(r"\b(\d{4})s\b", decade, t)
    t = re.sub(r"\b(1[89]\d\d|20\d\d)\b", year, t)
    t = re.sub(r"\b(\d+)\.(\d+)\b", lambda m: f"{words(int(m.group(1)))} point {' '.join(words(int(c)) for c in m.group(2))}", t)
    t = re.sub(r"\b\d{1,3}(?:,\d{3})+\b", lambda m: words(int(m.group(0).replace(",", ""))), t)
    t = re.sub(r"\b\d+\b", lambda m: words(int(m.group(0))), t)
    t = t.replace("#", "number ").replace("&", " and ")
    return re.sub(r"\s+", " ", t).strip()


def b36(n):
    return np.base_repr(int(n), 36).lower()


def spoken_words(text):
    return [x for x in normalize(text).split() if re.search(r"[A-Za-z0-9]", x)]


def word_starts(text, spoken):
    """Start time (seconds) of each whitespace-separated word of `text`, from the model's phoneme timings."""
    groups, cur = [], None  # spoken words: [start, end, phoneme count]
    for t in spoken:
        if t.phoneme == " ":
            cur = None
            continue
        if t.phoneme in PUNCT:
            continue
        if cur is None:
            cur = [t.start, t.end, 0]
            groups.append(cur)
        cur[1] = t.end
        cur[2] += 1
    words = text.split()
    if not groups:
        return [0.0] * len(words)
    counts = [len(spoken_words(w)) for w in words]
    out = []
    if sum(counts) == len(groups):  # one-to-one: exact
        k = 0
        for c in counts:
            out.append(groups[min(k, len(groups) - 1)][0] if c else None)
            k += c
    else:  # spelling and phonemes disagree: place words by their share of the letters spoken
        weights = [len(re.sub(r"[^a-z0-9]", "", normalize(w).lower())) for w in words]
        total, ph = sum(weights) or 1, sum(g[2] for g in groups)
        acc = 0
        for wt in weights:
            p, k = acc / total * ph, 0
            while k < len(groups) - 1 and p >= groups[k][2]:
                p -= groups[k][2]
                k += 1
            g = groups[k]
            out.append(g[0] + (g[1] - g[0]) * min(1.0, p / max(1, g[2])) if wt else None)
            acc += wt
    for i in range(len(out) - 1, -1, -1):  # silent tokens (dashes, symbols) start with the next word
        if out[i] is None:
            out[i] = out[i + 1] if i + 1 < len(out) else groups[-1][1]
    for i in range(1, len(out)):
        out[i] = max(out[i], out[i - 1])
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("sentences")
    ap.add_argument("--voice", default="am_michael")
    ap.add_argument("--speed", type=float, default=0.95)
    ap.add_argument("--bitrate", default="32k")
    args = ap.parse_args()

    data = json.loads(pathlib.Path(args.sentences).read_text(encoding="utf-8"))
    model = hf_hub_download(TIMED, "onnx/model.onnx")
    voice = np.fromfile(hf_hub_download(REPO, f"voices/{args.voice}.bin"), dtype=np.float32).reshape(-1, 1, 256)
    with tempfile.TemporaryDirectory() as tmp:
        np.savez(f"{tmp}/v.npz", **{args.voice: voice})
        tts = Kokoro(model, f"{tmp}/v.npz")
    tts.has_timings = True  # this export names its output "durations"
    lang = "en-gb" if args.voice.startswith("b") else "en-us"
    label = LABELS.get(args.voice, args.voice)

    for pack, clips in data.items():
        folder = ROOT / "audio" / pack
        folder.mkdir(parents=True, exist_ok=True)
        index, bundle = folder / "index.js", folder / "clips.mp3"
        have = {}
        if index.exists() and bundle.exists():
            meta = index.read_text()
            if f'voice: "{args.voice}"' in meta:
                blob = bundle.read_bytes()
                for h, off, ln, tm in re.findall(r"([0-9a-z]+):([0-9a-z]+):([0-9a-z]+):([0-9a-z.]+)", meta.split('clips: "')[1]):
                    off, ln = int(off, 36), int(ln, 36)
                    have[h] = (blob[off:off + ln], tm)  # clips without word timings are re-recorded
        for f in folder.glob("*.mp3"):  # loose clips from an older run (no timings)
            if f.name != "clips.mp3":
                f.unlink()
        todo = [(h, t) for h, t in clips.items() if h not in have]
        t0, secs = time.time(), 0.0
        for i, (h, text) in enumerate(todo, 1):
            audio, sr, spoken = tts.create_timed(normalize(text), voice=args.voice, speed=args.speed, lang=lang)
            starts = word_starts(text, spoken)
            secs += len(audio) / sr
            with tempfile.TemporaryDirectory() as tmp:
                sf.write(f"{tmp}/a.wav", audio, sr)
                subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", f"{tmp}/a.wav", "-af", "apad=pad_dur=0.12",
                                "-ac", "1", "-c:a", "libmp3lame", "-b:a", args.bitrate, f"{tmp}/a.mp3"], check=True)
                have[h] = (pathlib.Path(f"{tmp}/a.mp3").read_bytes(), ".".join(b36(round(x * 100)) for x in starts))
            if i % 50 == 0:
                print(f"  {pack}: {i}/{len(todo)} clips", flush=True)
        parts, entries, off = [], [], 0
        for h in sorted(clips):
            b, tm = have[h]
            parts.append(b)
            entries.append(f"{h}:{b36(off)}:{b36(len(b))}:{tm}")
            off += len(b)
        bundle.write_bytes(b"".join(parts))
        index.write_text(
            "/* Generated by tools/narrate.py: narration clips in clips.mp3 (hash:offset:length:word starts in centiseconds, base 36). */\n"
            f'HUB.narrationPack("{pack}", {{ voice: "{args.voice}", label: "{label}", clips: "{" ".join(entries)}" }});\n',
            encoding="utf-8")
        print(f"{pack}: {len(clips)} clips, {len(todo)} new ({secs / 60:.1f} min audio in {time.time() - t0:.0f}s), {off / 1e6:.1f} MB", flush=True)


if __name__ == "__main__":
    main()

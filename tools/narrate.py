"""Record natural-voice narration clips for the voice-over, one mp3 per sentence.

Steps (see CLAUDE.md):
    node tools/narrate-capture.js /tmp/sentences.json [lessonId ...]
    python tools/narrate.py /tmp/sentences.json [--voice am_michael]

Needs: pip install kokoro-onnx soundfile num2words huggingface_hub, and ffmpeg.
The Kokoro-82M model (Apache-2.0) downloads from Hugging Face on first run.

Output per pack: audio/<pack>/clips.mp3 (every clip's mp3 bytes back to back) and
audio/<pack>/index.js, which registers each clip's hash, byte offset, and length with the page.
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


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("sentences")
    ap.add_argument("--voice", default="am_michael")
    ap.add_argument("--speed", type=float, default=0.95)
    ap.add_argument("--bitrate", default="32k")
    args = ap.parse_args()

    data = json.loads(pathlib.Path(args.sentences).read_text(encoding="utf-8"))
    model = hf_hub_download(REPO, "onnx/model.onnx")
    voice = np.fromfile(hf_hub_download(REPO, f"voices/{args.voice}.bin"), dtype=np.float32).reshape(-1, 1, 256)
    with tempfile.TemporaryDirectory() as tmp:
        np.savez(f"{tmp}/v.npz", **{args.voice: voice})
        tts = Kokoro(model, f"{tmp}/v.npz")
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
                for h, off, ln in re.findall(r"([0-9a-z]+):([0-9a-z]+):([0-9a-z]+)", meta.split('clips: "')[1]):
                    off, ln = int(off, 36), int(ln, 36)
                    have[h] = blob[off:off + ln]
        for f in folder.glob("*.mp3"):  # loose clips from an interrupted or older run
            if f.name != "clips.mp3":
                have.setdefault(f.stem, f.read_bytes())
                f.unlink()
        todo = [(h, t) for h, t in clips.items() if h not in have]
        t0, secs = time.time(), 0.0
        for i, (h, text) in enumerate(todo, 1):
            audio, sr = tts.create(normalize(text), voice=args.voice, speed=args.speed, lang=lang)
            secs += len(audio) / sr
            with tempfile.TemporaryDirectory() as tmp:
                sf.write(f"{tmp}/a.wav", audio, sr)
                subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", f"{tmp}/a.wav", "-af", "apad=pad_dur=0.12",
                                "-ac", "1", "-c:a", "libmp3lame", "-b:a", args.bitrate, f"{tmp}/a.mp3"], check=True)
                have[h] = pathlib.Path(f"{tmp}/a.mp3").read_bytes()
            if i % 50 == 0:
                print(f"  {pack}: {i}/{len(todo)} clips", flush=True)
        parts, entries, off = [], [], 0
        for h in sorted(clips):
            b = have[h]
            parts.append(b)
            entries.append(f"{h}:{np.base_repr(off, 36).lower()}:{np.base_repr(len(b), 36).lower()}")
            off += len(b)
        bundle.write_bytes(b"".join(parts))
        index.write_text(
            "/* Generated by tools/narrate.py: recorded narration clips (hash:offset:length, base 36) in clips.mp3. */\n"
            f'HUB.narrationPack("{pack}", {{ voice: "{args.voice}", label: "{label}", clips: "{" ".join(entries)}" }});\n',
            encoding="utf-8")
        print(f"{pack}: {len(clips)} clips, {len(todo)} new ({secs / 60:.1f} min audio in {time.time() - t0:.0f}s), {off / 1e6:.1f} MB", flush=True)


if __name__ == "__main__":
    main()

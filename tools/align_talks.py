#!/usr/bin/env python3
"""Find when each transcript word is spoken in the audio lessons.

    python tools/align_talks.py [id ...]        (needs: pip install faster-whisper)

For each talks/audio/<id>.mp3, faster-whisper transcribes the recording with word timestamps,
and those words are matched against the script's own words (the transcript the player shows,
exactly as tools/build_talks.py builds it). Script words the recognizer missed or heard
differently get times interpolated between their matched neighbors. The result,
talks/timings/<id>.json = {"words": [start seconds per transcript word, ...]}, is read by
build_talks.py so the player can light up each word as it is spoken.
Recordings whose timings file is newer than the mp3 are skipped.
"""
import difflib, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "tools"))
import build_talks  # noqa: E402

AUDIO, SCRIPTS = os.path.join(ROOT, "talks/audio"), os.path.join(ROOT, "talks/scripts")
OUT = os.path.join(ROOT, "talks/timings")
NUM = {"0": "zero", "1": "one", "2": "two", "3": "three", "4": "four", "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine", "10": "ten"}


def norm(w):
    w = w.lower().replace("’", "'")
    w = re.sub(r"[^a-z0-9']", "", w)
    return NUM.get(w, w)


def script_words(i):
    paras = build_talks.paragraphs(open(os.path.join(SCRIPTS, i + ".txt")).read())
    return [w for p in paras for w in p[0].split()]


def align(words, heard):
    """words: transcript tokens; heard: [(word, start, end)] from the recognizer -> start per token."""
    a = [norm(w) for w in words]
    b = [norm(h[0]) for h in heard]
    starts = [None] * len(words)
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "equal":
            for k in range(i2 - i1):
                starts[i1 + k] = heard[j1 + k][1]
        elif tag == "replace" and j2 > j1:
            # same span heard differently (e.g. "F O B" vs "FOB"): spread over the heard time
            t0, t1 = heard[j1][1], heard[j2 - 1][2]
            n = i2 - i1
            for k in range(n):
                starts[i1 + k] = t0 + (t1 - t0) * k / n
    # fill anything left (words the recognizer skipped) between known neighbours, by length
    known = [k for k, s in enumerate(starts) if s is not None]
    if not known:
        return [0.0] * len(words)
    for k in range(0, known[0]):
        starts[k] = starts[known[0]]
    for x, y in zip(known, known[1:]):
        if y - x > 1:
            span = [len(words[k]) + 1 for k in range(x, y)]
            tot, acc = float(sum(span)), 0
            for k in range(x + 1, y):
                acc += span[k - x - 1]
                starts[k] = starts[x] + (starts[y] - starts[x]) * acc / tot
    for k in range(known[-1] + 1, len(words)):
        starts[k] = starts[known[-1]] + 0.3 * (k - known[-1])
    # keep them non-decreasing
    for k in range(1, len(starts)):
        starts[k] = max(starts[k], starts[k - 1])
    return [round(s, 2) for s in starts]


def main():
    from faster_whisper import WhisperModel
    global np, subprocess
    import numpy as np, subprocess
    ids = sys.argv[1:] or sorted(f[:-4] for f in os.listdir(AUDIO) if f.endswith(".mp3"))
    os.makedirs(OUT, exist_ok=True)
    model = WhisperModel("base.en", device="cpu", compute_type="int8")
    for i in ids:
        mp3, out = os.path.join(AUDIO, i + ".mp3"), os.path.join(OUT, i + ".json")
        if not os.path.exists(mp3) or not os.path.exists(os.path.join(SCRIPTS, i + ".txt")):
            continue
        if os.path.exists(out) and os.path.getmtime(out) > os.path.getmtime(mp3) and len(sys.argv) == 1:
            continue
        pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", mp3, "-ac", "1", "-ar", "16000", "-f", "s16le", "-"], capture_output=True, check=True).stdout
        audio = np.frombuffer(pcm, np.int16).astype(np.float32) / 32768.0
        segs, _ = model.transcribe(audio, word_timestamps=True, beam_size=1, language="en", condition_on_previous_text=False)
        heard = [(w.word.strip(), w.start, w.end) for s in segs for w in (s.words or [])]
        words = script_words(i)
        starts = align(words, heard)
        matched = difflib.SequenceMatcher(None, [norm(w) for w in words], [norm(h[0]) for h in heard], autojunk=False).ratio()
        json.dump({"words": starts}, open(out, "w"))
        print("%s: %d words, %d heard, match %.0f%%" % (i, len(words), len(heard), 100 * matched), flush=True)


if __name__ == "__main__":
    main()

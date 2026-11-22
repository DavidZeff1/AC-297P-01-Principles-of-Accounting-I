#!/usr/bin/env python3
"""Build talks/index.js from the audio-lesson scripts and recordings.

    python3 tools/build_talks.py [--encode RAW_DIR]

talks/scripts/<id>.txt   teacher script sent to ElevenLabs (audio tags like [pause] included)
talks/audio/<id>.mp3     the recording (64 kbps mono)

With --encode, every RAW_DIR/<id>.mp3 (the 128 kbps download from ElevenLabs) is re-encoded
into talks/audio/<id>.mp3 first. Each paragraph of the transcript gets a weight (its spoken
length, plus extra for [pause] tags); its estimated start is then snapped to the nearest pause in
the recording, and the player stores paras as [text, start seconds].
"""
import hashlib, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPTS, AUDIO = os.path.join(ROOT, "talks/scripts"), os.path.join(ROOT, "talks/audio")
# Voice each recording was made with (talks/voices.json: {"<id>": "Rob"}); the user's pick is Rob.
VOICES_FILE = os.path.join(ROOT, "talks/voices.json")
PAUSE_WEIGHT = {"short pause": 10, "pause": 22, "long pause": 40}


def key(i):
    return tuple(int(x) for x in i.split("-"))


def duration(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
                         capture_output=True, text=True, check=True).stdout
    return round(float(out.strip()), 2)


def silences(path):
    """(end time, length) of each pause in the recording."""
    err = subprocess.run(["ffmpeg", "-hide_banner", "-i", path, "-af", "silencedetect=noise=-38dB:d=0.35", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    ends = re.findall(r"silence_end: ([0-9.]+) \| silence_duration: ([0-9.]+)", err)
    return [(float(e), float(d)) for e, d in ends]


def place(paras, dur, gaps):
    """Start time of each paragraph: its share of the script, snapped to the best nearby pause
    (closest, favoring longer pauses), never earlier than the previous paragraph."""
    total = float(sum(p[1] for p in paras))
    acc, prev, out = 0, 0.0, []
    for i, p in enumerate(paras):
        est = acc / total * dur
        acc += p[1]
        if i == 0:
            out.append(0.0)
            continue
        near = [(abs(e - est) - 3 * d, e) for e, d in gaps if abs(e - est) <= 6 and e > prev + 2]
        t = min(near)[1] if near else est
        prev = t
        out.append(round(max(0.0, t - 0.15), 2))
    return out


def paragraphs(text):
    out = []
    for para in re.split(r"\n\s*\n", text.strip()):
        weight = len(re.sub(r"\[[^\]]*\]", "", para))
        weight += sum(PAUSE_WEIGHT.get(t.strip().lower(), 0) for t in re.findall(r"\[([^\]]*)\]", para))
        clean = re.sub(r"\s*\[[^\]]*\]\s*", " ", para).strip()
        clean = re.sub(r"\b([A-Z]{2,})\b", lambda m: m.group(1) if m.group(1) in KEEP_CAPS else m.group(1).lower(), clean)
        out.append([clean, weight])
    return out


# Acronyms stay upper case; words capitalized only for spoken emphasis are lowered in the transcript.
KEEP_CAPS = {"GAAP", "FASB", "IASB", "IFRS", "CPA", "CPAS", "CPAs", "IRS", "GAO", "SEC", "FBI", "DEAD", "RELIC", "AI", "US", "OK"}


def add_words(i, paras):
    """Word timings from tools/align_talks.py (talks/timings/<id>.json), if present and current:
    each paragraph becomes [text, start, [gap to each word in centiseconds]], where word k starts at
    start + sum of the first k+1 gaps. The paragraph start becomes its first word's start."""
    f = os.path.join(ROOT, "talks/timings", i + ".json")
    if not os.path.exists(f):
        return
    starts = json.load(open(f))["words"]
    if len(starts) != sum(len(p[0].split()) for p in paras):
        print("  %s: timings out of date (re-run tools/align_talks.py %s)" % (i, i))
        return
    k = 0
    for p in paras:
        n = len(p[0].split())
        ws, k = starts[k:k + n], k + n
        p[1] = round(max(0.0, ws[0] - 0.08), 2)
        prev, gaps = p[1], []
        for w in ws:
            gaps.append(max(0, int(round((w - prev) * 100))))
            prev += gaps[-1] / 100.0
        p.append(gaps)


def main():
    if len(sys.argv) > 2 and sys.argv[1] == "--encode":
        raw = sys.argv[2]
        for f in sorted(os.listdir(raw)):
            if f.endswith(".mp3"):
                subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", os.path.join(raw, f), "-ac", "1", "-b:a", "64k",
                                "-map_metadata", "-1", os.path.join(AUDIO, f)], check=True)
    voices = json.load(open(VOICES_FILE)) if os.path.exists(VOICES_FILE) else {}
    talks = {}
    for f in sorted(os.listdir(SCRIPTS), key=lambda f: key(f[:-4])):
        i = f[:-4]
        mp3 = os.path.join(AUDIO, i + ".mp3")
        if not f.endswith(".txt") or not os.path.exists(mp3):
            continue
        dur, paras = duration(mp3), paragraphs(open(os.path.join(SCRIPTS, f)).read())
        for p, t in zip(paras, place(paras, dur, silences(mp3))):
            p[1] = t
        add_words(i, paras)
        ver = hashlib.md5(open(mp3, "rb").read()).hexdigest()[:8]  # cache-buster when a lesson is re-recorded
        talks[i] = {"src": "talks/audio/%s.mp3?v=%s" % (i, ver), "dur": dur, "voice": voices.get(i, "Rob"), "paras": paras}
    body = ",\n".join("  %s: %s" % (json.dumps(i), json.dumps(t, ensure_ascii=False)) for i, t in talks.items())
    with open(os.path.join(ROOT, "talks/index.js"), "w") as fh:
        fh.write("/* Generated by tools/build_talks.py: audio lessons (teacher talks) per lesson. */\n")
        fh.write("HUB.talks = {\n%s\n};\n" % body)
    print("talks/index.js: %d audio lessons (%s)" % (len(talks), ", ".join(talks)))


if __name__ == "__main__":
    main()

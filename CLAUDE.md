# Working on this repo

Interactive learning hub for the course AC-297P-01 Principles of Accounting I. The user pastes
Canvas reading modules one at a time; each becomes a rebuilt lesson (clearer writing, diagrams,
interactive examples, flashcards, practice quiz). See README.md for the file layout and lesson format.

## Standing instructions from the user

- **Always merge, never ask.** After pushing finished work to the session branch, open a pull
  request into `main` and merge it right away. Don't ask for confirmation first.
- After each change, republish the hosted page (claude.ai artifact) so the live link stays current:
  `python3 tools/build_artifact.py <scratchpad>/hub.html`, then publish that file with `files`
  mapping `assets/*` and `lessons/*.js` to the repo copies. Link:
  https://claude.ai/artifact/Cfczk2RDSXU3JSARetoWMy

## Adding a lesson

- New file `lessons/<chapter>-<n>.js` (copy `lessons/1-1.js`), plus a script tag in `index.html`
  before `assets/voice.js`.
- Focus mode and voice-over work automatically when the lesson uses `section.sec[data-toc]`, the
  shared widgets, and `aria-live` on panels whose text changes with interaction.
- Update the status table in README.md.
- Record narration for the new lesson (and refresh `home`, whose text lists every lesson):
  ```
  python3 -m venv /tmp/tts && /tmp/tts/bin/pip install kokoro-onnx soundfile num2words huggingface_hub
  node tools/narrate-capture.js /tmp/sentences.json <lessonId>
  /tmp/tts/bin/python tools/narrate.py /tmp/sentences.json --voice am_michael
  ```
  Then add `<script src="audio/<lessonId>/index.js"></script>` to `index.html` beside the others.
  The capture step clicks through every interactive state, so new widget types that change spoken
  text should be clickable elements listed in `CLICKABLES` in `tools/narrate-capture.js` (or carry
  `data-voice-state`). The narrator is always Michael (`am_michael`, Kokoro-82M): the user wants one natural male voice and no voice picker.
- The user wants each spoken word highlighted in time with the audio (subtle grow and color change).
  `narrate.py` records with the timestamped Kokoro export and stores word start times per clip; clips
  without timings are re-recorded on the next run. Don't drop the timings when changing the recorder.
- Hosting limits for the artifact: at most ~511 files and 256 MB per version, 15 MB per binary file.
  Each lesson's narration is one bundle of roughly 2–4 MB at 24 kbps; if the total nears 256 MB,
  re-record at `--bitrate 24k` or split packs across artifacts.

## Audio lessons (ElevenLabs)

- Each lesson can have a teacher-style audio lesson: `talks/scripts/<id>.txt` → ElevenLabs → `talks/audio/<id>.mp3`,
  then `python3 tools/build_talks.py --encode <download dir>` (see README "Audio lessons").
- Voice: **Rob** (`Cz0K1kOv9tD8l0b5Qu53`, easygoing, grounded American male), model `eleven_v4`, one take per script.
  The user chose Rob after finding the first voice (Jeremy) annoying. Use Rob for every lesson.
  `talks/voices.json` lists lessons still recorded with Jeremy (1.2–2.6); re-record those with Rob when
  credits allow (the scripts are in `talks/scripts/`) and remove them from that file.
- The user's ElevenLabs plan is Starter (40,000 credits a month, about 1 credit per character). Check
  `account_get_usage` before generating and keep scripts around 3,000–3,500 characters (3–4 minutes).
- Chapters 1–2 have audio lessons (1.1 in Rob's voice). Credits reset monthly (next: Dec 21, 2026).
  Generate more only when the user asks, and say how many credits it will use.


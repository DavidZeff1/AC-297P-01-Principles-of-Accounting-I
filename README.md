# AC-297P-01 Principles of Accounting I · Learning Hub

The course's Canvas reading modules, rewritten for clarity and rebuilt with diagrams,
interactive worked examples, flashcards, and a practice check for each lesson.

## Open it

It's a static site with no build step. Open `index.html` through any web server:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000. GitHub Pages works too (Settings → Pages → deploy from this branch).

Progress (completed lessons, quiz scores) is saved in your browser only.

## Focus mode

On any lesson, press **Focus mode** (or the `F` key) to hide the rest of the site and read one
section at a time. Use the progress bar, the previous/next buttons, or `←` `→` to move between
sections, and `Esc` to exit. The setting is remembered.

## Voice-over

Press **Voice** in the top bar (or the `V` key) to turn on voice-over. Lessons are narrated by
**Michael**, a natural neural voice recorded ahead of time with the open-source
[Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) model (Apache-2.0). There is one voice by design. The
rare sentence without a recording (such as a changed progress count) is read by the device's closest
male voice.

- **Listen to this lesson** reads the whole lesson from the top, highlighting each block as it goes.
  In focus mode it turns the sections for you.
- Each word lights up as it is spoken: it grows slightly and shifts color, then settles back. Recorded
  clips carry each word's start time (from the model's own phoneme timings), so the highlight follows the
  audio at any speed. The device voice highlights words when the browser reports word boundaries.
- With voice-over on, tap any paragraph, card, table, or panel to hear it and keep reading from there.
  Each section has a **Listen from here** button, and each quiz question has a speaker button.
- Interactive pieces speak their results: diagram stages, user groups, simulator outcomes, flipped
  flashcards, and quiz and sorter feedback.
- The player bar at the bottom has previous/next, play/pause (`P`), and speed (0.75× to 1.75×).

Abbreviations are given spoken forms (FASB, GAAP, IFRS, …) in `assets/voice.js`. A lesson can add its own
with `pronounce: [[/regex/g, "spoken form"]]`.

## Audio lessons

Lessons with an audio lesson show a player under the summary (and a headphone mark on the course map):
a 2½–4 minute talk where a teacher walks through the lesson, recorded with ElevenLabs (voice: Rob, an easygoing
American male, model `eleven_v4`; `talks/voices.json` notes the few still in the earlier voice). The player has play/pause, ±15 s, speed (0.85×–1.5×), and a transcript
that highlights the paragraph being spoken; click a paragraph to jump there. Position and speed are remembered.

To add one: write `talks/scripts/<id>.txt` (paragraphs separated by blank lines; `[warmly]`, `[pause]` and other
v4 audio tags are allowed), generate it with the ElevenLabs connector, download the mp3 into a scratch folder,
then run `python3 tools/build_talks.py --encode <scratch folder>` to encode it to 64 kbps mono in `talks/audio/`
and rebuild `talks/index.js`. Each script costs about one ElevenLabs credit per character.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | Page shell: top bar, script tags for every built lesson |
| `assets/course.js` | Course map: units, chapters, and lesson titles from Canvas |
| `assets/voice.js` | Voice-over engine: reading order, spoken text cleanup, recorded clips, player bar |
| `audio/<pack>/` | Recorded narration: `clips.mp3` bundle and `index.js` clip map, per lesson plus `home` and `common` |
| `tools/narrate-capture.js`, `tools/narrate.py` | Collect every sentence a page can say, then record them with Kokoro |
| `assets/talk.js`, `talks/` | Audio lesson player; scripts, recordings, and the generated `talks/index.js` |
| `tools/build_talks.py` | Encodes audio-lesson recordings and builds `talks/index.js` |
| `assets/hub.js` | Router (`#home`, `#lesson-1-1`), progress, and shared widgets |
| `assets/hub.css` | Design tokens (light and dark) and shared component styles |
| `lessons/<ch>-<n>.js` | One file per lesson, e.g. `lessons/1-1.js` |
| `tools/build_artifact.py` | Produces the claude.ai artifact version of `index.html` |

## Adding a lesson

1. Create `lessons/<chapter>-<n>.js` that calls `HUB.register("<chapter>-<n>", { ... })`.
   Copy `lessons/1-1.js` as a template.
2. Add `<script src="lessons/<chapter>-<n>.js"></script>` to `index.html` before `assets/hub.js`.

A lesson definition can provide:

- `summary`, `objectives`: shown in the lesson header
- `html`: the lesson body. Each `<section class="sec" data-toc="Label">` becomes a contents entry.
- `cards`: flip-card sets, placed with `<div data-widget="cards" data-key="name">`
- `sorters`: classify-the-item games, placed with `<div data-widget="sorter" data-key="name">`
- `quiz`: multiple-choice practice check, placed with `<div data-widget="quiz">`. Scoring 75% or better marks the lesson complete.
- `init(root, api)`: custom interactive pieces (simulators, charts). `api.money(n)` formats dollars with accounting parentheses for negatives.

## Status

| Chapter | Lessons | Narration | Audio lesson |
| --- | --- | --- | --- |
| 1. Welcome to the World of Accounting | 1.1–1.5 | yes | yes |
| 2. Information Processing | 2.1–2.6 | yes | yes |
| 3. Income Measurement | 3.1–3.6 | yes | yes |
| 4. The Reporting Cycle | 4.1–4.5 | yes | yes |
| 5. Special Issues for Merchants | 5.1–5.5 | yes | yes |
| 6. Cash and Highly Liquid Investments | 6.1–6.5 | pending | yes |
| 7. Accounts Receivable | 7.1–7.4 | pending | yes |
| 8. Inventory | 8.1–8.6 | pending | yes |
| 9. Long-term Investments | 9.1–9.5 | pending | — |
| 10. Property, Plant, and Equipment | 10.1–10.6 | pending | — |
| 11. Advanced PP&E Issues, Natural Resources, and Intangibles | 11.1–11.6 | pending | — |
| 12. Current Liabilities and Employer Obligations | 12.1–12.5 | pending | — |
| 13. Long-Term Obligations | 13.1–13.6 | pending | — |
| 14. Corporate Equity Accounting | 14.1–14.5 | pending | — |

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

Press **Voice** in the top bar (or the `V` key) to turn on voice-over. It uses the browser's
built-in speech engine, so it works offline and needs no account.

- **Listen to this lesson** reads the whole lesson from the top, highlighting each block as it goes.
  In focus mode it turns the sections for you.
- With voice-over on, tap any paragraph, card, table, or panel to hear it and keep reading from there.
  Each section has a **Listen from here** button, and each quiz question has a speaker button.
- Interactive pieces speak their results: diagram stages, user groups, simulator outcomes, flipped
  flashcards, and quiz and sorter feedback.
- The player bar at the bottom has previous/next, play/pause (`P`), speed (0.75× to 1.75×), and a voice picker.

Abbreviations are given spoken forms (FASB, GAAP, IFRS, …) in `assets/voice.js`. A lesson can add its own
with `pronounce: [[/regex/g, "spoken form"]]`.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | Page shell: top bar, script tags for every built lesson |
| `assets/course.js` | Course map: units, chapters, and lesson titles from Canvas |
| `assets/voice.js` | Voice-over engine: reading order, spoken text cleanup, player bar |
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

| Chapter | Built |
| --- | --- |
| 1. Welcome to the World of Accounting | 1.1 |

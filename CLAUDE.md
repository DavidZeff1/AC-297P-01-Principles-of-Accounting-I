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

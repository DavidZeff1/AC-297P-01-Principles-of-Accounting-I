/* Collect every sentence voice-over can say, so tools/narrate.py can record it.
   Drives the real pages in headless Chromium with a stand-in speech engine: reads each view,
   clicks through interactive states, sweeps sliders, and answers quizzes/sorters every way.

   Usage: node tools/narrate-capture.js <out.json> [lessonId ...]   (default: every built lesson)
   Output: { "<pack>": { "<hash>": "sentence", ... }, ... } with packs common, home, and one per lesson. */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".mp3": "audio/mpeg" };
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split("?")[0]).replace(/^\/+/, "") || "index.html");
  if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": TYPES[path.extname(p)] || "application/octet-stream" });
  fs.createReadStream(p).pipe(res);
});

const STUB = () => {
  window.__voCapture = new Set();
  const fake = {
    getVoices: () => [], addEventListener() {}, cancel() {},
    speak(u) { setTimeout(() => u.onend && u.onend(), 2); }
  };
  Object.defineProperty(window, "speechSynthesis", { value: fake });
  window.SpeechSynthesisUtterance = function (t) { this.text = t; };
  try { localStorage.setItem("ac297p-voice-v1", JSON.stringify({ on: true, rate: 1 })); } catch (e) {}
};

/* clickable elements whose click changes what is read; lessons can mark more with data-voice-state */
const CLICKABLES = [".flow-step", ".users-svg .node", ".era-btn", ".flip", "[data-basis]", ".st-dot", "[data-voice-state]"];

(async () => {
  const out = process.argv[2];
  if (!out) { console.error("usage: node tools/narrate-capture.js <out.json> [lessonId ...]"); process.exit(1); }
  await new Promise(r => server.listen(0, r));
  const base = `http://localhost:${server.address().port}/`;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  await page.addInitScript(STUB);
  page.on("pageerror", e => console.error("page error:", e.message));
  const wait = ms => page.waitForTimeout(ms);
  const result = {};
  const add = async (pack, sentences) => {
    const pairs = await page.evaluate(list => list.map(t => [HUB.voiceHash(t), t]), sentences);
    result[pack] = result[pack] || {};
    pairs.forEach(([h, t]) => { result[pack][h] = t; });
  };
  const all = () => page.evaluate(() => HUB.voice._allSentences());
  const spoken = () => page.evaluate(() => { const a = [...window.__voCapture]; window.__voCapture.clear(); return a; });

  await page.goto(base + "#home"); await wait(400);
  await add("common", await page.evaluate(() => HUB.voice._fixed()));
  await add("home", await all());

  let ids = process.argv.slice(3);
  if (!ids.length) ids = await page.evaluate(() => Object.keys(HUB.lessons));

  for (const id of ids) {
    const t0 = Date.now();
    const open = async () => { await page.goto(base + "#home"); await page.goto(base + "#lesson-" + id); await wait(400); await spoken(); };
    await open();
    await add(id, await all());

    /* click through every interactive state */
    for (const sel of CLICKABLES) {
      const n = await page.locator(sel).count();
      for (let i = 0; i < n; i++) {
        await page.locator(sel).nth(i).click(); await wait(600);
        await add(id, await spoken()); await add(id, await all());
      }
    }
    /* buttons that reveal one more thing each press (next entry, next step, next transaction) */
    const reps = await page.locator("[data-voice-repeat]").count();
    for (let i = 0; i < reps; i++) {
      for (let k = 0; k < 40; k++) {
        const b = page.locator("[data-voice-repeat]").nth(i);
        if (await b.isDisabled()) break;
        await b.click(); await wait(600);
        await add(id, await spoken()); await add(id, await all());
      }
    }
    /* sweep sliders, under each setting of the toggles in the same panel */
    const ranges = await page.locator('input[type="range"]:not(.talk-seek)').count();
    for (let r = 0; r < ranges; r++) {
      const toggles = await page.evaluate(r => {
        const el = document.querySelectorAll('input[type="range"]:not(.talk-seek)')[r], panel = el.closest(".panel");
        return panel ? panel.querySelectorAll(".seg button").length : 0;
      }, r);
      for (let t = 0; t < Math.max(1, toggles); t++) {
        if (toggles) { await page.evaluate(([r, t]) => document.querySelectorAll('input[type="range"]:not(.talk-seek)')[r].closest(".panel").querySelectorAll(".seg button")[t].click(), [r, t]); await wait(600); await add(id, await spoken()); }
        const [min, max, step] = await page.evaluate(r => { const e = document.querySelectorAll('input[type="range"]:not(.talk-seek)')[r]; return [+e.min, +e.max, +(e.step || 1)]; }, r);
        for (let v = min; v <= max; v += step) {
          await page.evaluate(([r, v]) => { const e = document.querySelectorAll('input[type="range"]:not(.talk-seek)')[r]; e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, [r, v]);
          await wait(560);
          await add(id, await spoken());
        }
      }
    }
    /* quizzes: every score from 0 to all correct; sorters all wrong and all right */
    const quiz = await page.evaluate(id => (HUB.lessons[id].quiz || []).map(q => q.answer), id);
    for (let k = 0; k <= quiz.length; k++) {
      await open();
      for (let i = 0; i < quiz.length; i++) {
        const j = i < k ? quiz[i] : (quiz[i] === 0 ? 1 : 0);
        await page.locator(`.quiz-q[data-i="${i}"] .opt[data-j="${j}"]`).click(); await wait(220);
        await add(id, await spoken());
      }
      await wait(400); await add(id, await spoken());
      if (k === 0 || k === quiz.length) {
        const right = k === quiz.length;
        const sorters = await page.evaluate(id => Object.values(HUB.lessons[id].sorters || {}).map(s => s.items.map(it => it.cat)), id);
        let row = 0;
        for (const cats of sorters) for (const cat of cats) {
          await page.evaluate(([row, cat, right]) => {
            const r = document.querySelectorAll(".sorter-item")[row];
            const b = [...r.querySelectorAll(".choice")].find(x => (x.getAttribute("data-cat") === cat) === right);
            b.click();
          }, [row++, cat, right]);
          await wait(220); await add(id, await spoken());
        }
        await add(id, await all());
      } else {
        await add(id, (await all()).filter(t => /correct|percent|%/i.test(t)));
      }
    }
    console.log(`lesson ${id}: ${Object.keys(result[id]).length} sentences (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
  }
  fs.writeFileSync(out, JSON.stringify(result, null, 1));
  console.log("packs:", Object.entries(result).map(([k, v]) => `${k}=${Object.keys(v).length}`).join(" "));
  await browser.close(); server.close();
})();

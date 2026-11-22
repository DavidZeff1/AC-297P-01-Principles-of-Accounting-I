/* Voice-over: reads any view aloud with the browser's speech engine.
   - Continuous reading of a view (lesson or course map), block by block, with highlight
   - Tap any readable block to read from there; speaker buttons on sections and quiz questions
   - Reads interactive results (live regions, quiz/sorter feedback, flipped cards) when on
   Must load before hub.js; hub.js calls HUB.voice.mount(kind, root) after each render. */
(function () {
  "use strict";
  var HUB = window.HUB;
  var synth = window.speechSynthesis;
  var supported = !!(synth && window.SpeechSynthesisUtterance);
  var KEY = "ac297p-voice-v1";
  var RATES = [0.75, 1, 1.25, 1.5, 1.75];
  var ON_MSG = "Voice-over on. Press play to hear this page, or tap any paragraph.";

  var SEL = {
    lesson: [
      ".lesson-title h1", ".lesson-sub", ".objective",
      ".sec h2", ".sec h3", ".sec > p", ".sec > ul > li", ".sec > ol > li", ".callout",
      ".flow-detail", ".user-card", ".lane-src", ".lane", ".setter", ".converge", ".goal",
      ".flip", ".era-body", ".sim-ctrl > label", ".sim-month", ".meter", ".stmt", ".verdict",
      "table.compare tr", ".sorter-item", ".quiz-q",
      ".statement", ".jr-entry", ".ws-say", ".cont-res", ".tacct", ".eq-now", ".st-body", ".wk-q", ".wk-step", ".wk-ans", ".calc-field", ".calc-res", "table.ledger tbody tr", ".rule", ".sec > .scroll-x > table tr", ".fig-cap", ".quiz-result", ".recap li"
    ].join(","),
    home: ".home-hero h1, .home-hero p, .ledger-card, .unit-head, .chapter, .exam-milestone",
    soon: ".soon-page h1, .soon-page p",
    practice: ".pr-head h1, .pr-head p, .fc-front h2, .fc-back dd, .pq-setup h2, .pq-q, .pq-opt, .pq-verdict, .pq-why, .pq-score, .fc-done h2"
  };
  /* spoken forms for abbreviations and symbols; lessons can add more via def.pronounce */
  var SAY = [
    [/\bFASB\b/g, "Fazz-bee"], [/\bIASB\b/g, "I. A. S. B."], [/\bIFRS\b/g, "I. F. R. S."], [/\bGAAP\b/g, "gap"],
    [/\bA\/C\b/g, "A.C."], [/\bPP&E\b/g, "property, plant, and equipment"], [/\bvs\.\s/g, "versus "],
    [/\bYr (\d)/g, "year $1"], [/\bAC-297P-01\b/g, "A.C. 297 P"], [/\bAC-297P\b/g, "A.C. 297 P"],
    [/\(\$([\d,.]+)\)/g, "minus $$$1"], [/(\d{4})s[–-](\d{4})s/g, "$1s to $2s"], [/(\d)[–-](\d)/g, "$1 to $2"],
    [/\s=\s/g, " equals "], [/\s\+\s/g, " plus "], [/−/g, "minus "], [/→|⇄|↗|↓|←/g, " "], [/[·•]/g, ", "], [/[✓✕▶❚]/g, ""], [/[“”]/g, '"'], [/—/g, ", "]
  ];

  var pref = (function () {
    try { var s = JSON.parse(localStorage.getItem(KEY) || "{}"); return { on: !!s.on, rate: s.rate || 1, voice: s.voice || "" }; }
    catch (e) { return { on: false, rate: 1, voice: "" }; }
  })();
  function savePref() { try { localStorage.setItem(KEY, JSON.stringify(pref)); } catch (e) { /* storage unavailable */ } }

  var view = { kind: null, root: null, blocks: [], extra: [] };
  var idx = 0, playing = false, run = 0, speakingNow = false, lit = null, observer = null;
  var dock, playBtn, labelEl, rateBtn;

  /* ---------- text extraction ---------- */
  var BREAK = /^(block|flex|grid|list-item|table|table-row|table-cell|inline-flex|inline-grid|inline-block)$/;
  function extract(el) {
    if (el.hasAttribute("data-say")) return clean(el.getAttribute("data-say"));
    /* mark layout on the live element so the clone knows where lines break and what is hidden */
    var orig = [el].concat(Array.prototype.slice.call(el.querySelectorAll("*")));
    var marks = orig.map(function (x) {
      var d = getComputedStyle(x).display;
      return d === "none" ? "hide" : (x !== el && BREAK.test(d)) ? "br" : "";
    });
    var c = el.cloneNode(true);
    var copy = [c].concat(Array.prototype.slice.call(c.querySelectorAll("*")));
    copy.forEach(function (x, k) { if (marks[k]) x.setAttribute("data-vo", marks[k]); });
    c.querySelectorAll('[data-vo="hide"], [hidden]').forEach(function (x) { x.remove(); });
    c.querySelectorAll("[data-say]").forEach(function (x) { x.textContent = x.getAttribute("data-say") + " "; });
    c.querySelectorAll("svg, style, script, .vo-btn, .cue, .panel-title .hint, .flip-face.back .term, input, [data-no-voice]").forEach(function (x) { x.remove(); });
    c.querySelectorAll(".opt .letter").forEach(function (x) { x.textContent = "Option " + x.textContent + ": "; });
    c.querySelectorAll(".stem .n").forEach(function (x) { x.textContent = "Question " + parseInt(x.textContent, 10) + ". "; });
    c.querySelectorAll(".stmt-row > span:first-child, .ledger-card .row > span:first-child, .era-col .k, .lane .row b, .meter-top > span:first-child, dt").forEach(function (x) { x.appendChild(document.createTextNode(": ")); });
    c.querySelectorAll(".objective b").forEach(function (x) { x.textContent = "Goal " + x.textContent + ": "; });
    c.querySelectorAll("th, td").forEach(function (x) { x.appendChild(document.createTextNode(", ")); });
    c.querySelectorAll(".choice-row").forEach(function (x) { x.remove(); });
    if (el.matches(".chapter")) { var n = c.querySelector(".chapter-num"); if (n) n.textContent = "Chapter " + n.textContent + ". "; }
    if (el.matches(".unit-head")) { var e = c.querySelector(".eyebrow"); if (e) e.appendChild(document.createTextNode(": ")); }
    c.querySelectorAll('[data-vo="br"]').forEach(function (x) { x.appendChild(document.createTextNode(". ")); });
    var t = c.textContent;
    if (el.matches(".lesson-title h1")) { var tab = document.querySelector(".lesson-tab"); t = "Lesson " + (tab ? tab.textContent : "") + ". " + t; }
    if (el.matches(".sorter-item")) {
      var ch = Array.prototype.map.call(el.querySelectorAll(".choice"), function (b) { return b.textContent.replace(/ \/ /g, " or "); });
      if (ch.length) t += " " + ch.slice(0, -1).join(", ") + (ch.length > 1 ? ", or " : "") + ch[ch.length - 1] + "?";
    }
    return clean(t);
  }
  function clean(t) {
    var rules = SAY.concat(view.extra || []);
    rules.forEach(function (r) { t = t.replace(r[0], r[1]); });
    return t.replace(/\s+/g, " ")
      .replace(/\s+([.,:;!?])/g, "$1")
      .replace(/([.!?:;,])(?:\s*[.,])+/g, "$1")
      .replace(/^[\s.,:;]+/, "")
      .trim();
  }
  function sentences(t) {
    var out = t.match(/[^.!?]+(?:[.!?]+["')\]]*|$)\s*/g) || [t];
    /* keep decimals like "1.1" and "$5.50" together */
    var merged = [];
    out.forEach(function (s) {
      if (merged.length && /\d\.$/.test(merged[merged.length - 1].trim()) && /^\d/.test(s)) merged[merged.length - 1] += s;
      else merged.push(s);
    });
    return merged.map(function (s) { return s.trim(); }).filter(function (s) { return /[A-Za-z0-9$]/.test(s); });
  }

  /* ---------- speech ---------- */
  /* Two engines:
     1. Recorded narration: natural neural voice clips made at build time (tools/narrate.py),
        one mp3 per sentence, named by a hash of the sentence. Packs register via HUB.narrationPack.
     2. The device's own speech engine, used for anything without a clip (or when chosen). */
  var packs = {};
  HUB.narrationPack = function (id, p) {
    var map = {};
    p.clips.split(" ").forEach(function (e) {
      var f = e.split(":");
      if (f.length >= 3) map[f[0]] = [parseInt(f[1], 36), parseInt(f[2], 36), f[3] ? f[3].split(".").map(function (x) { return parseInt(x, 36) / 100; }) : null];
    });
    packs[id] = { voice: p.voice, label: p.label || p.voice, file: "audio/" + id + "/clips.mp3", map: map, buf: null, ready: null };
  };
  /* download a pack's bundle once; clips are sliced out of it as needed */
  function loadPack(p) {
    if (!p) return Promise.reject(new Error("no pack"));
    if (!p.ready) {
      p.ready = fetch(p.file).then(function (r) { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })
        .then(function (b) { p.buf = b; return p; })
        .catch(function (e) { p.failed = true; throw e; });
    }
    return p.ready;
  }
  function warm() { if (!pref.on || !view.pack) return; [packs[view.pack], packs.common].forEach(function (p) { if (p && !p.failed) loadPack(p).catch(function () {}); }); }
  function hash(t) {
    var h = 0x811c9dc5;
    for (var i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    return (h >>> 0).toString(36);
  }
  HUB.voiceHash = hash;
  function clipFor(text) {
    if (window.__voCapture) return null; /* build-time capture uses the stand-in engine */
    var h = hash(text), ids = [view.pack, "common"];
    for (var i = 0; i < ids.length; i++) { var p = packs[ids[i]]; if (p && !p.failed && p.map[h]) return { p: p, at: p.map[h] }; }
    return null;
  }
  var clipUrl = null;
  function clipSrc(c) {
    if (clipUrl) URL.revokeObjectURL(clipUrl);
    clipUrl = URL.createObjectURL(new Blob([c.p.buf.slice(c.at[0], c.at[0] + c.at[1])], { type: "audio/mpeg" }));
    return clipUrl;
  }
  var player = typeof Audio !== "undefined" ? new Audio() : null;
  if (player) player.preload = "auto";
  /* Safari only lets a media element play from script after it has played once during a tap */
  var SILENT = "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjYwLjE2LjEwMAAAAAAAAAAAAAAA//OEwAAAAAAAAAAAAEluZm8AAAAPAAAABQAAAqAAbW1tbW1tbW1tbW1tbW1tbW1tbZKSkpKSkpKSkpKSkpKSkpKSkpKStra2tra2tra2tra2tra2tra2trbb29vb29vb29vb29vb29vb29vb2///////////////////////////AAAAAExhdmM2MC4zMQAAAAAAAAAAAAAAACQEUAAAAAAAAAKgvT9A1gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//NExAAAAANIAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMu//NExFMAAANIAAAAADEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMu//NExKYAAANIAAAAADEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NExKwAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NExKwAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV", unlocked = false;
  function unlock() {
    if (unlocked || !player || !pref.on) return;
    unlocked = true;
    player.src = SILENT;
    var pr = player.play(); if (pr && pr.catch) pr.catch(function () { unlocked = false; });
  }
  ["pointerdown", "keydown"].forEach(function (ev) { document.addEventListener(ev, unlock, true); });

  /* ---------- word-by-word highlight ----------
     The spoken sentence is matched to the words on screen; a floating copy of the current word
     (same font, same spot) gently grows and changes color, so the page itself is never modified. */
  function keyOf(w) { return w.toLowerCase().replace(/[^a-z0-9]/g, ""); }
  var SKIP = "svg, script, style, input, .vo-btn, .cue, [data-no-voice], .vo-word";
  function domWords(el) {
    var out = [], tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null), n;
    while ((n = tw.nextNode())) {
      var par = n.parentElement;
      if (!par || par.closest(SKIP) || !par.getClientRects().length) continue;
      var re = /\S+/g, m;
      while ((m = re.exec(n.data))) { var k = keyOf(m[0]); if (k) out.push({ node: n, a: m.index, b: m.index + m[0].length, k: k }); }
    }
    return out;
  }
  /* one aligner per block: consecutive sentences walk forward through the block's words */
  function aligner(el) {
    var dom = domWords(el), cur = 0;
    return function (text) {
      var say = text.split(/\s+/), map = say.map(function () { return -1; }), anchors = [], start = cur;
      say.forEach(function (w, i) {
        var k = keyOf(w); if (!k) return;
        for (var j = cur; j < Math.min(dom.length, cur + 10); j++) if (dom[j].k === k) { map[i] = j; anchors.push(i); cur = j + 1; return; }
      });
      /* words that didn't match (spoken forms like "minus" or "Fazz-bee") share the screen words between two matches;
         with nothing in between they keep the previous word lit */
      var pi = -1, pd = start - 1;
      anchors.forEach(function (ai) {
        var n = ai - pi - 1, m = map[ai] - pd - 1;
        for (var r = 0; n > 0 && m > 0 && r < n; r++) map[pi + 1 + r] = pd + 1 + Math.floor(r * m / n);
        pi = ai; pd = map[ai];
      });
      return map.map(function (j) { return j < 0 ? null : dom[j]; });
    };
  }
  var pool = [], shown = null;
  function overlay() {
    var o = pool.shift();
    if (!o) { o = document.createElement("span"); o.className = "vo-word"; o.setAttribute("aria-hidden", "true"); }
    return o;
  }
  function retire(o) {
    o.classList.remove("on");
    clearTimeout(o._t);
    o._t = setTimeout(function () { o.remove(); pool.push(o); }, 260);
  }
  function showWord(w) {
    if (shown && w && shown.w === w) return;
    if (shown) { retire(shown.o); shown = null; }
    if (!w || !w.node.isConnected) return;
    var r = document.createRange();
    try { r.setStart(w.node, w.a); r.setEnd(w.node, w.b); } catch (e) { return; }
    var box = r.getClientRects()[0];
    if (!box || !box.width) return;
    var cs = getComputedStyle(w.node.parentElement), o = overlay();
    clearTimeout(o._t);
    o.textContent = w.node.data.slice(w.a, w.b);
    o.style.setProperty("--from", cs.color);
    ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "fontVariantNumeric", "fontFeatureSettings", "fontStretch"].forEach(function (k) { o.style[k] = cs[k]; });
    o.style.lineHeight = box.height + "px";
    o.style.left = (box.left + scrollX) + "px"; o.style.top = (box.top + scrollY) + "px";
    o.style.width = box.width + "px"; o.style.height = box.height + "px";
    o.classList.remove("on");
    document.body.appendChild(o);
    void o.offsetWidth; /* start the grow from the resting size */
    o.classList.add("on");
    shown = { w: w, o: o };
  }
  var tick = null;
  function stopWords() { if (tick) { cancelAnimationFrame(tick); tick = null; } showWord(null); }
  /* follow a recorded clip: its word start times are in media time, so playback speed is handled for free */
  function followClip(words, times, text) {
    stopWords();
    if (!words) return;
    var est = null;
    function starts() {
      if (times && times.length === words.length) return times;
      if (est || !isFinite(player.duration)) return est;
      /* older clips without timings: share the clip by word length */
      var parts = text.split(/\s+/), wt = parts.map(function (w) { return w.length + 1 + (/[,;:.!?]$/.test(w) ? 3 : 0); });
      var tot = wt.reduce(function (a, b) { return a + b; }, 0), span = Math.max(0.1, player.duration - 0.3), acc = 0;
      est = wt.map(function (x) { var t = 0.15 + acc / tot * span; acc += x; return t; });
      return est;
    }
    (function loop() {
      var st = starts(), t = player.currentTime + 0.04, k = -1;
      if (st) for (var i = 0; i < st.length && st[i] <= t; i++) k = i;
      if (k >= 0 && words[k]) showWord(words[k]);
      tick = requestAnimationFrame(loop);
    })();
  }
  /* the device voice reports word boundaries as character offsets */
  function followBoundary(u, words, text) {
    stopWords();
    if (!words) return;
    var offs = [], re = /\S+/g, m;
    while ((m = re.exec(text))) offs.push(m.index);
    u.onboundary = function (e) {
      if (e.name && e.name !== "word") return;
      var k = 0;
      while (k + 1 < offs.length && offs[k + 1] <= e.charIndex) k++;
      if (words[k]) showWord(words[k]);
    };
  }

  var voices = [];
  /* relaxed, clear male voices first, by platform: Edge natural voices, Apple enhanced voices, Google, Windows */
  var MALE = [/Andrew.*Natural/i, /Brian.*Natural/i, /Christopher.*Natural/i, /Guy.*Natural/i, /Eric.*Natural/i, /Davis.*Natural/i, /Roger.*Natural/i, /Steffan.*Natural/i, /Ryan.*Natural/i, /Thomas.*Natural/i,
    /^Evan\b.*(Premium|Enhanced)/i, /^Nathan\b.*(Premium|Enhanced)/i, /^Tom\b.*(Premium|Enhanced)/i, /^Aaron\b/i, /^Alex\b/i, /^Evan\b/i, /^Nathan\b/i, /^Tom\b/i, /^Daniel\b.*(Premium|Enhanced)/i, /^Oliver\b/i,
    /Google UK English Male/i, /^Daniel\b/i, /Microsoft (Guy|David|Mark|George|Ryan)/i, /\bmale\b/i];
  function rank(v) { for (var i = 0; i < MALE.length; i++) if (MALE[i].test(v.name)) return i; return 99; }
  function loadVoices() {
    voices = supported ? synth.getVoices().filter(function (v) { return /^en(-|_|$)/i.test(v.lang); }) : [];
    voices.sort(function (a, b) { return rank(a) - rank(b); });
  }
  /* fallback only: the device's closest match to the narrator (best-ranked male English voice) */
  function currentVoice() { return voices[0] || null; }

  function hush() {
    run++; speakingNow = false;
    if (supported) synth.cancel();
    if (player) { player.onended = player.onerror = null; player.pause(); }
    stopWords();
  }
  function speakList(list, myRun, done, el) {
    var k = 0, align = el && !window.__voCapture ? aligner(el) : null;
    if (window.__voCapture) list.forEach(function (t) { window.__voCapture.add(t); });
    function next() {
      if (myRun !== run) return;
      if (k >= list.length) { speakingNow = false; if (done) done(); return; }
      var text = list[k++], clip = clipFor(text), words = align ? align(text) : null;
      speakingNow = true;
      stopWords();
      if (clip && player) {
        if (!clip.p.buf) setLabel("Loading the narrator’s voice…");
        loadPack(clip.p).then(function () {
          if (myRun !== run) return;
          player.onended = function () { if (myRun === run) { stopWords(); next(); } };
          player.onerror = function () { if (myRun === run) device(text, words); };
          player.src = clipSrc(clip);
          player.playbackRate = pref.rate;
          var pr = player.play();
          followClip(words, clip.at[2], text);
          if (pr && pr.catch) pr.catch(function () { if (myRun === run) device(text, words); });
          if (labelEl && /^Loading/.test(labelEl.textContent)) setLabel(sectionName(lit) );
        }, function () { if (myRun === run) device(text, words); });
        return;
      }
      device(text, words);
    }
    function device(text, words) {
      if (!supported) { next(); return; }
      var u = new SpeechSynthesisUtterance(text);
      var v = currentVoice();
      if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "en-US";
      u.rate = pref.rate;
      followBoundary(u, words, text);
      u.onend = function () { stopWords(); next(); };
      u.onerror = function (e) { if (e.error === "interrupted" || e.error === "canceled") return; next(); };
      synth.speak(u);
    }
    /* Chrome drops an utterance queued in the same tick as cancel() */
    setTimeout(next, 60);
  }

  function highlight(el) {
    if (lit) lit.classList.remove("vo-lit");
    lit = el;
    if (!el) return;
    el.classList.add("vo-lit");
    var r = el.getBoundingClientRect(), dockH = dock && !dock.hidden ? dock.offsetHeight : 0;
    if (r.top < 90 || r.bottom > innerHeight - dockH - 16) {
      el.scrollIntoView({ block: r.height > innerHeight * 0.6 ? "start" : "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
  }

  /* ---------- blocks of the current view ---------- */
  function collect() {
    if (!view.root) return [];
    var sel = SEL[view.kind];
    var all = Array.prototype.slice.call(view.root.querySelectorAll(sel));
    var list = all.filter(function (el) {
      if (el.closest(".lesson-foot, .focusbar")) return false;
      for (var x = el; x && x !== view.root; x = x.parentElement) {
        if (x.hidden && !x.matches("section[data-toc], .lesson-hero")) return false;
      }
      var up = el.parentElement && el.parentElement.closest(sel);
      return !(up && view.root.contains(up));
    });
    list.forEach(function (el) { el.classList.add("vo-readable"); });
    view.blocks = list;
    return list;
  }
  function sectionName(el) {
    var s = el && el.closest("section[data-toc]");
    if (s) return s.getAttribute("data-toc");
    return view.kind === "home" ? "Course map" : "Introduction";
  }

  function playFrom(i) {
    var blocks = collect();
    if (!blocks.length) return;
    hush();
    if (HUB.talk) HUB.talk.stop();
    playing = true; paintDock();
    readBlock(Math.max(0, Math.min(i, blocks.length - 1)), run);
  }
  function readBlock(i, myRun) {
    if (myRun !== run) return;
    var blocks = view.blocks;
    if (i >= blocks.length) { playing = false; highlight(null); setLabel("Finished. Tap Play to start over."); idx = 0; paintDock(); return; }
    idx = i;
    var el = blocks[i];
    if (HUB.focusReveal) HUB.focusReveal(el);
    highlight(el);
    setLabel(sectionName(el) + " · " + (i + 1) + " of " + blocks.length);
    var parts = sentences(extract(el));
    if (!parts.length) { readBlock(i + 1, myRun); return; }
    speakList(parts, myRun, function () { readBlock(i + 1, myRun); }, el);
  }
  function pause() { hush(); playing = false; paintDock(); setLabel("Paused · " + sectionName(view.blocks[idx])); }

  /* say one thing now (interaction feedback, a single block); stops continuous reading */
  function sayNow(textOrEl) {
    if (!pref.on || (!supported && !player)) return;
    var el = typeof textOrEl === "string" ? null : textOrEl;
    var text = el ? extract(el) : clean(textOrEl);
    if (!text) return;
    hush();
    if (playing) { playing = false; paintDock(); }
    if (el) highlight(el);
    var myRun = run;
    speakList(sentences(text), myRun, function () { if (myRun === run && lit === el && el) highlight(null); }, el);
  }

  /* ---------- dock & toggles ---------- */
  var IC = {
    play: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" fill="currentColor"/></svg>',
    pause: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor"/></svg>',
    prev: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 5h2v14H6zM20 5v14L9 12z" fill="currentColor"/></svg>',
    next: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M16 5h2v14h-2zM4 5v14l11-7z" fill="currentColor"/></svg>',
    spk: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor" stroke="none"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"/></svg>'
  };
  function buildDock() {
    dock = document.createElement("div");
    dock.className = "vo-dock"; dock.id = "vo-dock"; dock.hidden = true;
    dock.setAttribute("role", "region"); dock.setAttribute("aria-label", "Voice-over player");
    dock.innerHTML =
      '<button type="button" class="vo-ctl" id="vo-prev" aria-label="Previous paragraph">' + IC.prev + '</button>' +
      '<button type="button" class="vo-ctl vo-main" id="vo-play" aria-label="Play">' + IC.play + '</button>' +
      '<button type="button" class="vo-ctl" id="vo-next" aria-label="Next paragraph">' + IC.next + '</button>' +
      '<div class="vo-now"><span class="vo-k">Voice-over</span><span id="vo-label">Tap Play, or tap any paragraph</span></div>' +
      '<button type="button" class="vo-rate" id="vo-rate" aria-label="Reading speed"></button>' +
      '<button type="button" class="vo-ctl vo-x" id="vo-close" aria-label="Turn voice-over off">✕</button>';
    document.body.appendChild(dock);
    playBtn = dock.querySelector("#vo-play"); labelEl = dock.querySelector("#vo-label");
    rateBtn = dock.querySelector("#vo-rate");
    playBtn.addEventListener("click", function () { if (playing) pause(); else playFrom(idx); });
    dock.querySelector("#vo-prev").addEventListener("click", function () { playFrom(idx - 1); });
    dock.querySelector("#vo-next").addEventListener("click", function () { playFrom(idx + 1); });
    dock.querySelector("#vo-close").addEventListener("click", function () { setOn(false); });
    rateBtn.addEventListener("click", function () {
      var k = RATES.indexOf(pref.rate); pref.rate = RATES[(k + 1) % RATES.length]; savePref(); paintDock();
      if (playing) playFrom(idx);
    });
    loadVoices();
    if (supported && "onvoiceschanged" in synth) synth.addEventListener("voiceschanged", loadVoices);
  }
  function setLabel(t) { if (labelEl) labelEl.textContent = t; }
  function paintDock() {
    if (!dock) return;
    dock.hidden = !pref.on;
    document.body.classList.toggle("vo-on", pref.on);
    playBtn.innerHTML = playing ? IC.pause : IC.play;
    playBtn.setAttribute("aria-label", playing ? "Pause" : "Play");
    rateBtn.textContent = pref.rate + "×";
    document.querySelectorAll("[data-vo-toggle]").forEach(function (b) { b.setAttribute("aria-pressed", pref.on); b.classList.toggle("on", pref.on); });
  }
  function setOn(on) {
    if (on && !supported && !player) { if (HUB.api) HUB.api.toast("This browser can’t read aloud. Try Chrome, Edge, or Safari."); return; }
    pref.on = on; savePref(); warm();
    if (on) unlock();
    if (!on) { hush(); playing = false; highlight(null); }
    paintDock();
    if (on) sayNow(ON_MSG);
  }

  /* ---------- per-view wiring ---------- */
  function mount(kind, root, extraSay, pack) {
    hush(); playing = false; lit = null; idx = 0;
    if (observer) { observer.disconnect(); observer = null; }
    view = { kind: kind, root: root, blocks: [], extra: extraSay || [], pack: pack || kind };
    loadVoices(); warm();
    collect();
    setLabel(kind === "home" ? "Course map · tap Play or any chapter" : "Tap Play, or tap any paragraph");
    paintDock();

    /* speaker buttons: "listen from here" on sections, "read this question" on quiz questions */
    root.querySelectorAll("section[data-toc] > .eyebrow").forEach(function (eb) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "vo-btn"; b.innerHTML = IC.spk + "<span>Listen from here</span>";
      b.addEventListener("click", function () {
        var first = eb.parentElement.querySelector(SEL.lesson);
        collect(); playFrom(Math.max(0, view.blocks.indexOf(first)));
      });
      eb.appendChild(b);
    });

    /* read interactive results as they change */
    if ("MutationObserver" in window) {
      var timers = new Map();
      observer = new MutationObserver(function (muts) {
        if (!pref.on) return;
        muts.forEach(function (m) {
          var region = (m.target.nodeType === 1 ? m.target : m.target.parentElement).closest("[aria-live]");
          if (!region || region.id === "toast" || !root.contains(region)) return;
          clearTimeout(timers.get(region));
          timers.set(region, setTimeout(function () { sayNow(region); }, 450));
        });
      });
      observer.observe(root, { childList: true, subtree: true, characterData: true });
    }
  }
  /* tap a block to read from it (one listener for every view) */
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-vo-toggle]")) { setOn(!pref.on); return; }
    if (!pref.on || !view.root || !view.root.contains(e.target)) return;
    var b = e.target.closest(".vo-q");
    if (b) { sayNow(b.closest(".quiz-q")); return; }
    if (e.target.closest("button, a, input, select, label, textarea, summary, .users-svg, .timeline, .chart")) return;
    var blk = e.target.closest(".vo-readable");
    if (!blk) return;
    collect(); playFrom(view.blocks.indexOf(blk));
  });

  /* quiz questions get their own speaker button (hub calls this after rendering a quiz) */
  function decorateQuiz(el) {
    el.querySelectorAll(".quiz-q .stem").forEach(function (st) {
      if (st.querySelector(".vo-q")) return;
      var b = document.createElement("button");
      b.type = "button"; b.className = "vo-btn vo-q"; b.setAttribute("aria-label", "Read this question aloud"); b.innerHTML = IC.spk;
      st.appendChild(b);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target, tag = t && t.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (t && t.isContentEditable)) return;
    if (e.key === "v" || e.key === "V") { e.preventDefault(); setOn(!pref.on); }
    else if (pref.on && (e.key === "p" || e.key === "P")) { e.preventDefault(); if (playing) pause(); else playFrom(idx); }
  });

  HUB.voice = {
    supported: supported,
    isOn: function () { return pref.on; },
    busy: function () { return pref.on && speakingNow; },
    toggle: function () { setOn(!pref.on); },
    stop: function () { if (playing) pause(); },
    on: function () { if (!pref.on) setOn(true); },
    listenAll: function () { if (!supported && !player) { setOn(true); return; } if (!pref.on) { pref.on = true; savePref(); paintDock(); } playFrom(0); },
    mount: mount,
    say: sayNow,
    decorateQuiz: decorateQuiz,
    sectionChanged: function (sec) {
      if (!playing) return;
      var first = sec.querySelector(SEL.lesson);
      var i = view.blocks.indexOf(first);
      if (i >= 0 && i !== idx) playFrom(i);
    },
    iconSpeaker: IC.spk,
    /* build hooks for tools/narrate: every sentence currently readable in the view */
    _allSentences: function () {
      var out = [];
      collect().forEach(function (el) { out = out.concat(sentences(extract(el))); });
      return out;
    },
    _fixed: function () { return sentences(clean(ON_MSG)); }
  };

  buildDock();
  paintDock();
})();

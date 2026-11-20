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

  var SEL = {
    lesson: [
      ".lesson-title h1", ".lesson-sub", ".objective",
      ".sec h2", ".sec h3", ".sec > p", ".sec > ul > li", ".sec > ol > li", ".callout",
      ".flow-detail", ".user-card", ".lane-src", ".lane", ".setter", ".converge", ".goal",
      ".flip", ".era-body", ".sim-ctrl > label", ".sim-month", ".meter", ".stmt", ".verdict",
      "table.compare tr", ".sorter-item", ".scoreline", ".quiz-q", ".quiz-result", ".recap li"
    ].join(","),
    home: ".home-hero h1, .home-hero p, .ledger-card, .unit-head, .chapter, .exam-milestone",
    soon: ".soon-page h1, .soon-page p"
  };
  /* spoken forms for abbreviations and symbols; lessons can add more via def.pronounce */
  var SAY = [
    [/\bFASB\b/g, "Fazz-bee"], [/\bIASB\b/g, "I. A. S. B."], [/\bIFRS\b/g, "I. F. R. S."], [/\bGAAP\b/g, "gap"],
    [/\bA\/C\b/g, "A.C."], [/\bPP&E\b/g, "property, plant, and equipment"], [/\bvs\.\s/g, "versus "],
    [/\bYr (\d)/g, "year $1"], [/\bAC-297P-01\b/g, "A.C. 297 P"], [/\bAC-297P\b/g, "A.C. 297 P"],
    [/\(\$([\d,.]+)\)/g, "minus $$$1"], [/(\d{4})s[–-](\d{4})s/g, "$1s to $2s"], [/(\d)[–-](\d)/g, "$1 to $2"],
    [/→|⇄|↗|↓|←/g, " "], [/[·•]/g, ", "], [/[✓✕▶❚]/g, ""], [/[“”]/g, '"'], [/—/g, ", "]
  ];

  var pref = (function () {
    try { var s = JSON.parse(localStorage.getItem(KEY) || "{}"); return { on: !!s.on, rate: s.rate || 1, voice: s.voice || "" }; }
    catch (e) { return { on: false, rate: 1, voice: "" }; }
  })();
  function savePref() { try { localStorage.setItem(KEY, JSON.stringify(pref)); } catch (e) { /* storage unavailable */ } }

  var view = { kind: null, root: null, blocks: [], extra: [] };
  var idx = 0, playing = false, run = 0, speakingNow = false, lit = null, observer = null;
  var dock, playBtn, labelEl, rateBtn, voiceSel;

  /* ---------- text extraction ---------- */
  var BREAK = /^(block|flex|grid|list-item|table|table-row|table-cell|inline-flex|inline-grid|inline-block)$/;
  function extract(el) {
    /* mark layout on the live element so the clone knows where lines break and what is hidden */
    var orig = [el].concat(Array.prototype.slice.call(el.querySelectorAll("*")));
    var marks = orig.map(function (x) {
      var d = getComputedStyle(x).display;
      return d === "none" ? "hide" : (x !== el && BREAK.test(d)) ? "br" : "";
    });
    var c = el.cloneNode(true);
    var copy = [c].concat(Array.prototype.slice.call(c.querySelectorAll("*")));
    copy.forEach(function (x, k) { if (marks[k]) x.setAttribute("data-vo", marks[k]); });
    c.querySelectorAll('[data-vo="hide"]').forEach(function (x) { x.remove(); });
    c.querySelectorAll("svg, style, script, .vo-btn, .cue, .panel-title .hint, .flip-face.back .term, input, [data-no-voice]").forEach(function (x) { x.remove(); });
    c.querySelectorAll(".opt .letter").forEach(function (x) { x.textContent = "Option " + x.textContent + ": "; });
    c.querySelectorAll(".stem .n").forEach(function (x) { x.textContent = "Question " + parseInt(x.textContent, 10) + ". "; });
    c.querySelectorAll(".stmt-row > span:first-child, .ledger-card .row > span:first-child, .lane .row b, .meter-top > span:first-child, dt").forEach(function (x) { x.appendChild(document.createTextNode(": ")); });
    c.querySelectorAll(".objective b").forEach(function (x) { x.textContent = "Goal " + x.textContent + ": "; });
    c.querySelectorAll("th, td").forEach(function (x) { x.appendChild(document.createTextNode(", ")); });
    c.querySelectorAll(".choice-row").forEach(function (x) { x.remove(); });
    if (el.matches(".chapter")) { var n = c.querySelector(".chapter-num"); if (n) n.textContent = "Chapter " + n.textContent + ". "; }
    if (el.matches(".unit-head")) { var e = c.querySelector(".eyebrow"); if (e) e.appendChild(document.createTextNode(": ")); }
    c.querySelectorAll('[data-vo="br"]').forEach(function (x) { x.appendChild(document.createTextNode(". ")); });
    var t = c.textContent;
    if (el.matches(".lesson-title h1")) { var tab = document.querySelector(".lesson-tab"); t = "Lesson " + (tab ? tab.textContent : "") + ". " + t; }
    if (el.matches(".sorter-item")) t += " Financial, or managerial?";
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
  var voices = [];
  function loadVoices() {
    if (!supported) return;
    voices = synth.getVoices().filter(function (v) { return /^en(-|_|$)/i.test(v.lang); });
    if (!voiceSel) return;
    var pick = pref.voice && voices.some(function (v) { return v.name === pref.voice; }) ? pref.voice : bestVoice();
    voiceSel.innerHTML = voices.map(function (v) {
      return '<option value="' + v.name.replace(/"/g, "&quot;") + '"' + (v.name === pick ? " selected" : "") + '>' + v.name.replace(/^(Microsoft|Google) /, "").replace(/ - English.*$/, "") + '</option>';
    }).join("");
    voiceSel.hidden = voices.length < 2;
  }
  function bestVoice() {
    var prefer = [/natural/i, /google us english/i, /samantha/i, /aria/i, /jenny/i, /daniel/i, /google uk english female/i];
    for (var i = 0; i < prefer.length; i++) { var v = voices.find(function (x) { return prefer[i].test(x.name); }); if (v) return v.name; }
    var us = voices.find(function (x) { return /en[-_]US/i.test(x.lang); });
    return us ? us.name : (voices[0] ? voices[0].name : "");
  }
  function currentVoice() {
    var name = voiceSel && voiceSel.value || pref.voice;
    return voices.find(function (v) { return v.name === name; }) || null;
  }

  function hush() { run++; speakingNow = false; if (supported) synth.cancel(); }
  function speakList(list, myRun, done) {
    var k = 0;
    function next() {
      if (myRun !== run) return;
      if (k >= list.length) { speakingNow = false; if (done) done(); return; }
      var u = new SpeechSynthesisUtterance(list[k++]);
      var v = currentVoice();
      if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "en-US";
      u.rate = pref.rate;
      u.onend = next;
      u.onerror = function (e) { if (e.error === "interrupted" || e.error === "canceled") return; next(); };
      speakingNow = true;
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
    speakList(parts, myRun, function () { readBlock(i + 1, myRun); });
  }
  function pause() { hush(); playing = false; paintDock(); setLabel("Paused · " + sectionName(view.blocks[idx])); }

  /* say one thing now (interaction feedback, a single block); stops continuous reading */
  function sayNow(textOrEl) {
    if (!pref.on || !supported) return;
    var el = typeof textOrEl === "string" ? null : textOrEl;
    var text = el ? extract(el) : clean(textOrEl);
    if (!text) return;
    hush();
    if (playing) { playing = false; paintDock(); }
    if (el) highlight(el);
    var myRun = run;
    speakList(sentences(text), myRun, function () { if (myRun === run && lit === el && el) highlight(null); });
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
      '<select id="vo-voice" class="vo-voice" aria-label="Voice"></select>' +
      '<button type="button" class="vo-ctl vo-x" id="vo-close" aria-label="Turn voice-over off">✕</button>';
    document.body.appendChild(dock);
    playBtn = dock.querySelector("#vo-play"); labelEl = dock.querySelector("#vo-label");
    rateBtn = dock.querySelector("#vo-rate"); voiceSel = dock.querySelector("#vo-voice");
    playBtn.addEventListener("click", function () { if (playing) pause(); else playFrom(idx); });
    dock.querySelector("#vo-prev").addEventListener("click", function () { playFrom(idx - 1); });
    dock.querySelector("#vo-next").addEventListener("click", function () { playFrom(idx + 1); });
    dock.querySelector("#vo-close").addEventListener("click", function () { setOn(false); });
    rateBtn.addEventListener("click", function () {
      var k = RATES.indexOf(pref.rate); pref.rate = RATES[(k + 1) % RATES.length]; savePref(); paintDock();
      if (playing) playFrom(idx);
    });
    voiceSel.addEventListener("change", function () { pref.voice = voiceSel.value; savePref(); if (playing) playFrom(idx); else sayNow("This is the " + voiceSel.options[voiceSel.selectedIndex].text + " voice."); });
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
    if (on && !supported) { if (HUB.api) HUB.api.toast("This browser can’t read aloud. Try Chrome, Edge, or Safari."); return; }
    pref.on = on; savePref();
    if (!on) { hush(); playing = false; highlight(null); }
    paintDock();
    if (on) sayNow("Voice-over on. Press play to hear this page, or tap any paragraph.");
  }

  /* ---------- per-view wiring ---------- */
  function mount(kind, root, extraSay) {
    hush(); playing = false; lit = null; idx = 0;
    if (observer) { observer.disconnect(); observer = null; }
    view = { kind: kind, root: root, blocks: [], extra: extraSay || [] };
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
    on: function () { if (!pref.on) setOn(true); },
    listenAll: function () { if (!supported) { setOn(true); return; } if (!pref.on) { pref.on = true; savePref(); paintDock(); } playFrom(0); },
    mount: mount,
    say: sayNow,
    decorateQuiz: decorateQuiz,
    sectionChanged: function (sec) {
      if (!playing) return;
      var first = sec.querySelector(SEL.lesson);
      var i = view.blocks.indexOf(first);
      if (i >= 0 && i !== idx) playFrom(i);
    },
    iconSpeaker: IC.spk
  };

  buildDock();
  paintDock();
})();

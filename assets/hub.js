/* Learning hub runtime: hash router, progress, and reusable lesson widgets.
   Views: #home (course map) and #lesson-<chapter>-<n> (e.g. #lesson-1-1). */
(function () {
  "use strict";
  var HUB = window.HUB;
  var KEY = "ac297p-hub-v1";
  var app = document.getElementById("app");

  /* ---------- progress (browser storage is a convenience; never required) ---------- */
  function load() {
    try { var s = JSON.parse(localStorage.getItem(KEY) || "{}"); return { done: s.done || {}, quiz: s.quiz || {}, last: s.last || null }; }
    catch (e) { return { done: {}, quiz: {}, last: null }; }
  }
  var state = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ } }
  function setDone(id, on) { if (on) state.done[id] = true; else delete state.done[id]; save(); updateProgress(); }

  function readyCount() { return HUB.order.filter(function (l) { return HUB.lessons[l.id]; }).length; }
  function doneCount() { return HUB.order.filter(function (l) { return state.done[l.id]; }).length; }
  function updateProgress() {
    var total = HUB.order.length, d = doneCount();
    var t = document.getElementById("prog-text"), f = document.getElementById("prog-fill");
    if (t) t.textContent = d + " / " + total + " lessons";
    if (f) f.style.width = (100 * d / total) + "%";
  }

  var toastTimer;
  function toast(msg) {
    var el = document.getElementById("toast");
    el.textContent = msg; el.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2200);
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- home ---------- */
  function renderHome() {
    document.title = "AC-297P Learning Hub";
    var next = HUB.order.find(function (l) { return HUB.lessons[l.id] && !state.done[l.id]; }) || HUB.order.find(function (l) { return HUB.lessons[l.id]; });
    var c = HUB.course;
    var h = '';
    h += '<header class="home-hero"><div class="wrap">';
    h += '<div><div class="eyebrow">' + esc(c.code) + ' · ' + esc(c.term) + '</div>';
    h += '<h1>' + esc(c.name) + '</h1>';
    h += '<p>Every reading module from the course, rebuilt with diagrams, worked examples you can play with, and a practice check at the end of each lesson.</p>';
    if (next) h += '<a class="btn" href="#lesson-' + next.id + '">' + (state.done[next.id] ? "Review " : "Start ") + next.num + ' · ' + esc(next.title) + ' →</a>';
    h += '</div>';
    h += '<div class="ledger-card" aria-label="Your progress">';
    h += '<div class="row"><span>Lessons in the course</span><span>' + HUB.order.length + '</span></div>';
    h += '<div class="row"><span>Built so far</span><span>' + readyCount() + '</span></div>';
    h += '<div class="row"><span>Marked complete</span><span>' + doneCount() + '</span></div>';
    h += '<div class="row total"><span>Still to go</span><span>' + (HUB.order.length - doneCount()) + '</span></div>';
    h += '</div></div></header>';

    h += '<main class="wrap units">';
    c.units.forEach(function (u, ui) {
      var ls = HUB.order.filter(function (l) { return l.unitIndex === ui; });
      var nd = ls.filter(function (l) { return state.done[l.id]; }).length;
      h += '<section><div class="unit-head"><span class="eyebrow">Exam unit ' + (ui + 1) + '</span><h2>' + esc(u.name) + '</h2>';
      h += '<span class="count">Chapters ' + u.chapters[0].n + '–' + u.chapters[u.chapters.length - 1].n + ' · ' + nd + ' of ' + ls.length + ' done</span></div>';
      h += '<div class="chapters">';
      u.chapters.forEach(function (ch) {
        h += '<article class="chapter"><div class="chapter-top"><div class="chapter-num">' + ch.n + '</div><div><h3>' + esc(ch.title) + '</h3>';
        h += '<div class="meta">' + ch.lessons.length + ' lessons</div></div></div><ul class="lesson-list">';
        ch.lessons.forEach(function (t, i) {
          var id = ch.n + "-" + (i + 1), num = ch.n + "." + (i + 1), ready = !!HUB.lessons[id];
          var st = state.done[id] ? '<span class="status done">Done</span>' : ready ? '<span class="status ready">Open</span>' : '<span class="status soon">Soon</span>';
          if (ready) h += '<li><a class="lesson-link ready" href="#lesson-' + id + '"><span class="num">' + num + '</span><span>' + esc(t) + '</span>' + st + '</a></li>';
          else h += '<li><a class="lesson-link pending" href="#lesson-' + id + '"><span class="num">' + num + '</span><span>' + esc(t) + '</span>' + st + '</a></li>';
        });
        h += '</ul></article>';
      });
      h += '</div><div class="exam-milestone"><span class="tag">Exam</span><strong>' + esc(u.exam) + '</strong><span>covers chapters ' + u.chapters[0].n + '–' + u.chapters[u.chapters.length - 1].n + '</span></div></section>';
    });
    h += '</main>';
    app.innerHTML = h;
  }

  /* ---------- lesson ---------- */
  function renderLesson(id) {
    var idx = HUB.order.findIndex(function (l) { return l.id === id; });
    if (idx < 0) { location.hash = "home"; return; }
    var meta = HUB.order[idx], def = HUB.lessons[id];
    var prev = HUB.order[idx - 1], next = HUB.order[idx + 1];
    document.title = meta.num + " " + meta.title + " · AC-297P";
    var crumbs = '<nav class="crumbs"><a href="#home">Course map</a><span>/</span><span>Chapter ' + meta.chapter.n + ': ' + esc(meta.chapter.title) + '</span></nav>';

    if (!def) {
      app.innerHTML = '<main class="wrap soon-page">' + crumbs + '<div class="eyebrow">Lesson ' + meta.num + '</div><h1>' + esc(meta.title) + '</h1>' +
        '<p>This lesson has not been built yet. Paste the module text from Canvas into the chat and it will be added here.</p>' +
        '<p><a class="btn ghost" href="#home">Back to the course map</a></p></main>';
      return;
    }
    state.last = id; save();

    var h = '<header class="lesson-hero"><div class="wrap">' + crumbs;
    h += '<div class="lesson-title"><div class="lesson-tab">' + meta.num + '</div><h1>' + esc(meta.title) + '</h1></div>';
    if (def.summary) h += '<p class="lesson-sub">' + def.summary + '</p>';
    if (def.objectives) {
      h += '<div class="objectives">';
      def.objectives.forEach(function (o, i) { h += '<div class="objective"><b>' + (i + 1) + '</b><span>' + o + '</span></div>'; });
      h += '</div>';
    }
    h += '</div></header>';
    h += '<div class="wrap lesson-layout"><aside class="toc"><div class="eyebrow">In this lesson</div><ol id="toc"></ol></aside>';
    h += '<main class="lesson-body" id="lesson-body">' + def.html;
    h += '<footer class="lesson-foot"><div class="complete-row"><button class="btn" id="complete-btn"></button><span class="hint" id="complete-hint"></span></div>';
    h += '<nav class="foot-nav">';
    h += prev ? '<a href="#lesson-' + prev.id + '"><span class="dir">← Previous</span>' + prev.num + ' ' + esc(prev.title) + '</a>' : '<span><span class="dir">Start of course</span>—</span>';
    h += next ? '<a class="next" href="#lesson-' + next.id + '"><span class="dir">Next →</span>' + next.num + ' ' + esc(next.title) + '</a>' : '<span class="next"><span class="dir">End of course</span>—</span>';
    h += '</nav></footer></main></div>';
    app.innerHTML = h;

    var body = document.getElementById("lesson-body");
    buildToc(body);
    mountWidgets(body, def, id);
    wireComplete(id);
    if (typeof def.init === "function") {
      try { def.init(body, api); } catch (e) { console.error("Lesson init failed", e); }
    }
  }

  function wireComplete(id) {
    var btn = document.getElementById("complete-btn"), hint = document.getElementById("complete-hint");
    function paint() {
      var d = !!state.done[id];
      btn.textContent = d ? "✓ Completed" : "Mark lesson complete";
      btn.classList.toggle("ghost", d);
      hint.textContent = d ? "Tap again to un-mark." : "Scoring 75% or better on the practice check marks it for you.";
    }
    btn.addEventListener("click", function () { setDone(id, !state.done[id]); paint(); toast(state.done[id] ? "Lesson marked complete" : "Marked as not complete"); });
    paint();
    api.repaintComplete = paint;
  }

  function buildToc(body) {
    var toc = document.getElementById("toc");
    var secs = Array.prototype.slice.call(body.querySelectorAll("section[data-toc]"));
    var btns = secs.map(function (s) {
      var li = document.createElement("li"), b = document.createElement("button");
      b.type = "button"; b.textContent = s.getAttribute("data-toc");
      b.addEventListener("click", function () { s.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }); });
      li.appendChild(b); toc.appendChild(li); return b;
    });
    if (!("IntersectionObserver" in window) || !secs.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { var i = secs.indexOf(en.target); btns.forEach(function (b, j) { b.classList.toggle("on", i === j); }); }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    secs.forEach(function (s) { io.observe(s); });
  }

  /* ---------- widgets ---------- */
  function mountWidgets(body, def, id) {
    body.querySelectorAll("[data-widget]").forEach(function (el) {
      var kind = el.getAttribute("data-widget"), key = el.getAttribute("data-key");
      if (kind === "cards") cards(el, (def.cards || {})[key] || []);
      else if (kind === "sorter") sorter(el, (def.sorters || {})[key]);
      else if (kind === "quiz") quiz(el, def.quiz || [], id);
    });
  }

  function cards(el, list) {
    el.className = "tiles";
    el.innerHTML = list.map(function (c) {
      return '<button type="button" class="flip" aria-pressed="false"><div class="flip-inner">' +
        '<div class="flip-face front"><span class="term">' + c.term + '</span>' + (c.sub ? '<span class="hint">' + c.sub + '</span>' : '') + '<span class="cue">Tap to flip</span></div>' +
        '<div class="flip-face back"><span class="term">' + c.term + '</span><span>' + c.back + '</span></div></div></button>';
    }).join("");
    el.querySelectorAll(".flip").forEach(function (f) {
      f.addEventListener("click", function () { var on = f.classList.toggle("on"); f.setAttribute("aria-pressed", on); });
    });
  }

  function sorter(el, cfg) {
    if (!cfg) return;
    var score = 0, answered = 0;
    var h = '<div class="sorter">';
    cfg.items.forEach(function (it, i) {
      h += '<div class="sorter-item" data-i="' + i + '"><div class="q">' + it.text + '</div><div class="choice-row">';
      cfg.categories.forEach(function (c) { h += '<button type="button" class="choice" data-cat="' + c.id + '">' + c.label + '</button>'; });
      h += '</div></div>';
    });
    h += '</div><div class="scoreline"><span id="' + (el.id || "s") + '-score">0 of ' + cfg.items.length + ' sorted</span><button type="button" class="btn ghost small" data-reset>Reset</button></div>';
    el.innerHTML = h;
    var scoreEl = el.querySelector(".scoreline span");
    el.querySelectorAll(".sorter-item").forEach(function (row) {
      var it = cfg.items[+row.getAttribute("data-i")];
      row.querySelectorAll(".choice").forEach(function (b) {
        b.addEventListener("click", function () {
          var ok = b.getAttribute("data-cat") === it.cat;
          row.querySelectorAll(".choice").forEach(function (x) {
            x.disabled = true;
            if (x.getAttribute("data-cat") === it.cat) x.classList.add("right");
          });
          if (!ok) b.classList.add("wrong");
          var fb = document.createElement("div");
          fb.className = "feedback " + (ok ? "right" : "wrong");
          fb.innerHTML = (ok ? "<b>Correct.</b> " : "<b>Not quite.</b> ") + it.why;
          row.appendChild(fb);
          answered++; if (ok) score++;
          scoreEl.textContent = answered === cfg.items.length ? "You sorted " + score + " of " + cfg.items.length + " correctly." : answered + " of " + cfg.items.length + " sorted · " + score + " correct";
        });
      });
    });
    el.querySelector("[data-reset]").addEventListener("click", function () { sorter(el, cfg); });
  }

  function quiz(el, qs, id) {
    var letters = "ABCDEF", answered = 0, right = 0;
    var h = '';
    qs.forEach(function (q, i) {
      h += '<div class="quiz-q" data-i="' + i + '"><div class="stem"><span class="n">' + String(i + 1).padStart(2, "0") + '</span><span>' + q.q + '</span></div><div class="opts">';
      q.options.forEach(function (o, j) { h += '<button type="button" class="opt" data-j="' + j + '"><span class="letter">' + letters[j] + '</span><span>' + o + '</span></button>'; });
      h += '</div></div>';
    });
    h += '<div class="quiz-result" hidden></div>';
    el.innerHTML = h;
    var result = el.querySelector(".quiz-result");
    el.querySelectorAll(".quiz-q").forEach(function (qe) {
      var q = qs[+qe.getAttribute("data-i")];
      qe.querySelectorAll(".opt").forEach(function (b) {
        b.addEventListener("click", function () {
          var j = +b.getAttribute("data-j"), ok = j === q.answer;
          qe.querySelectorAll(".opt").forEach(function (x) {
            x.disabled = true;
            if (+x.getAttribute("data-j") === q.answer) x.classList.add("right");
          });
          if (!ok) b.classList.add("wrong");
          var fb = document.createElement("div");
          fb.className = "feedback " + (ok ? "right" : "wrong");
          fb.innerHTML = (ok ? "<b>Correct.</b> " : "<b>Not quite.</b> ") + q.why;
          qe.appendChild(fb);
          answered++; if (ok) right++;
          if (answered === qs.length) finish();
        });
      });
    });
    function finish() {
      var pct = Math.round(100 * right / qs.length), pass = pct >= 75;
      state.quiz[id] = Math.max(state.quiz[id] || 0, pct);
      if (pass) state.done[id] = true;
      save(); updateProgress(); if (api.repaintComplete) api.repaintComplete();
      result.hidden = false;
      result.classList.toggle("fail", !pass);
      result.innerHTML = '<div class="big">' + pct + '%</div><div style="flex:1;min-width:200px"><b>' + right + ' of ' + qs.length + ' correct.</b> ' +
        (pass ? 'That clears the 75% bar Canvas uses for “Did You Learn?”. This lesson is marked complete.' : 'Canvas needs 75% on “Did You Learn?”. Review the explanations above, then try again.') +
        '</div><button type="button" class="btn ghost small">Retake</button>';
      result.querySelector("button").addEventListener("click", function () { quiz(el, qs, id); el.scrollIntoView({ block: "start" }); });
      if (pass) toast("Passed · lesson marked complete");
    }
  }

  /* helpers handed to lesson init() */
  var api = {
    money: function (n, dec) {
      var s = Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 });
      return (n < 0 ? "(" : "") + "$" + s + (n < 0 ? ")" : "");
    },
    toast: toast,
    reducedMotion: function () { return matchMedia("(prefers-reduced-motion: reduce)").matches; }
  };
  HUB.api = api;

  /* ---------- router ---------- */
  function route() {
    var hsh = (location.hash || "").replace(/^#/, "");
    var m = /^lesson-(\d+-\d+)$/.exec(hsh);
    if (m) renderLesson(m[1]); else renderHome();
    window.scrollTo(0, 0);
    updateProgress();
  }
  window.addEventListener("hashchange", route);
  route();
})();

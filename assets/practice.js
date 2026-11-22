/* Practice: flashcards and multiple choice drawn from every lesson's cards and quiz.
   Route: #practice/<cards|quiz>/<scope>, scope = all | ch<N> | <chapter>-<n> (e.g. ch3, 3-5).
   Flashcard backs show the lesson's definition plus the extra angles in HUB.defs[term]
   ([in plain words, example]) supplied by defs/ch<N>.js. */
(function () {
  "use strict";
  var HUB = window.HUB;
  var KEY = "ac297p-practice";
  HUB.defs = HUB.defs || {};
  HUB.addDefs = function (o) { for (var k in o) HUB.defs[k] = o[k]; };

  function load() { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } }
  var S = load(); S.known = S.known || {}; S.best = S.best || {};
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage unavailable */ } }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var LETTERS = "ABCDEFGH";

  /* ---------- content by scope ---------- */
  function lessonsIn(scope) {
    var ready = HUB.order.filter(function (l) { return HUB.lessons[l.id]; });
    if (scope === "all") return ready;
    var m = /^ch(\d+)$/.exec(scope);
    if (m) return ready.filter(function (l) { return String(l.chapter.n) === m[1]; });
    return ready.filter(function (l) { return l.id === scope; });
  }
  function cardsFor(scope) {
    var seen = {}, out = [];
    lessonsIn(scope).forEach(function (l) {
      var cards = HUB.lessons[l.id].cards || {};
      Object.keys(cards).forEach(function (k) {
        cards[k].forEach(function (c) {
          if (!c.term || seen[c.term]) return;
          seen[c.term] = true;
          out.push({ term: c.term, back: c.back, lesson: l });
        });
      });
    });
    return out;
  }
  function questionsFor(scope) {
    var out = [];
    lessonsIn(scope).forEach(function (l) {
      (HUB.lessons[l.id].quiz || []).forEach(function (q, i) { out.push({ q: q, lesson: l, key: l.id + ":" + i }); });
    });
    return out;
  }
  function scopeName(scope) {
    if (scope === "all") return "the whole course";
    var m = /^ch(\d+)$/.exec(scope);
    if (m) { var l = lessonsIn(scope)[0]; return "Chapter " + m[1] + (l ? ": " + l.chapter.title : ""); }
    var ls = lessonsIn(scope)[0];
    return ls ? "Lesson " + ls.num + ": " + ls.title : scope;
  }
  function chapterOf(scope) {
    var m = /^ch(\d+)$/.exec(scope); if (m) return m[1];
    m = /^(\d+)-\d+$/.exec(scope); return m ? m[1] : null;
  }

  /* ---------- page shell ---------- */
  var root, mode, scope;
  function go(m, s) { location.hash = "practice/" + m + "/" + s; }

  function render(app, m, s) {
    root = app; mode = m === "quiz" ? "quiz" : "cards"; scope = lessonsIn(s).length ? s : "all";
    document.title = (mode === "quiz" ? "Multiple choice" : "Flashcards") + " · Practice · AC-297P";
    var chapters = [];
    HUB.order.forEach(function (l) { if (HUB.lessons[l.id] && chapters.indexOf(l.chapter) < 0) chapters.push(l.chapter); });
    var cur = chapterOf(scope);
    var h = '<header class="pr-head"><div class="wrap">';
    h += '<div class="eyebrow">Practice</div><h1>' + (mode === "quiz" ? "Multiple choice" : "Flashcards") + '</h1>';
    h += '<p>' + (mode === "quiz" ? "Test yourself with questions from any chapter or lesson. You'll see the explanation after each answer." : "Flip through the key terms. Each card explains the term three ways: the definition, in plain words, and an example.") + '</p>';
    h += '<div class="pr-modes" role="tablist" aria-label="Practice mode">' +
      '<a role="tab" href="#practice/cards/' + scope + '" class="' + (mode === "cards" ? "on" : "") + '" aria-selected="' + (mode === "cards") + '">' + IC.cards + 'Flashcards</a>' +
      '<a role="tab" href="#practice/quiz/' + scope + '" class="' + (mode === "quiz" ? "on" : "") + '" aria-selected="' + (mode === "quiz") + '">' + IC.quiz + 'Multiple choice</a></div>';
    h += '<div class="pr-scope"><div class="pr-label">Section</div><div class="pr-chips" role="group" aria-label="Chapter">';
    h += '<a href="#practice/' + mode + '/all" class="chip' + (scope === "all" ? " on" : "") + '">All chapters</a>';
    chapters.forEach(function (c) { h += '<a href="#practice/' + mode + '/ch' + c.n + '" class="chip' + (String(c.n) === cur ? " on" : "") + '" title="' + esc(c.title) + '">Ch ' + c.n + '</a>'; });
    h += '</div>';
    if (cur) {
      var ls = lessonsIn("ch" + cur), ch = ls[0].chapter;
      h += '<div class="pr-chips pr-lessons" role="group" aria-label="Lesson"><span class="pr-chtitle">' + esc(ch.title) + '</span>';
      h += '<a href="#practice/' + mode + '/ch' + cur + '" class="chip' + (scope === "ch" + cur ? " on" : "") + '">Whole chapter</a>';
      ls.forEach(function (l) { h += '<a href="#practice/' + mode + '/' + l.id + '" class="chip' + (scope === l.id ? " on" : "") + '" title="' + esc(l.title) + '">' + l.num + ' <span>' + esc(l.title) + '</span></a>'; });
      h += '</div>';
    }
    h += '</div></div></header>';
    h += '<main class="wrap pr-main" id="pr-main"></main>';
    app.innerHTML = h;
    if (mode === "quiz") quizSetup(); else cardsStart();
    app.querySelectorAll(".pr-chips .chip.on").forEach(function (c) {
      var row = c.parentElement; if (row.scrollWidth > row.clientWidth) row.scrollLeft = c.offsetLeft - row.clientWidth / 2 + c.offsetWidth / 2;
    });
    if (HUB.voice) HUB.voice.mount("practice", app);
  }

  var IC = {
    cards: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 6V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2"/></svg>',
    quiz: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17h.01"/></svg>',
    prev: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>',
    next: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>',
    flip: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.2L3 16M3 21v-5h5"/></svg>',
    shuffle: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>'
  };

  /* ---------- flashcards ---------- */
  var deck, all, ci, flipped, onlyLearning;
  function cardsStart() {
    all = cardsFor(scope); onlyLearning = false; deck = all.slice(); ci = 0; flipped = false;
    if (!all.length) { document.getElementById("pr-main").innerHTML = '<p class="pr-empty">No flashcards in this section yet.</p>'; return; }
    drawCards();
  }
  function knownCount() { return all.filter(function (c) { return S.known[c.term]; }).length; }
  function drawCards() {
    var main = document.getElementById("pr-main");
    if (onlyLearning) deck = deck.filter(function (c) { return !S.known[c.term]; });
    var k = knownCount();
    var h = '<div class="fc-bar"><span class="fc-count num" aria-live="polite">' + (deck.length ? "Card " + (ci + 1) + " of " + deck.length : "0 cards") + '</span>' +
      '<span class="fc-known"><span class="fc-meter"><span style="width:' + (100 * k / all.length).toFixed(1) + '%"></span></span>' + k + ' of ' + all.length + ' known</span>' +
      '<span class="fc-tools"><button type="button" class="pbtn small" id="fc-shuffle">' + IC.shuffle + 'Shuffle</button>' +
      '<label class="fc-only"><input type="checkbox" id="fc-only"' + (onlyLearning ? " checked" : "") + '> Only cards I\'m still learning</label></span></div>';
    if (!deck.length) {
      h += '<div class="fc-done"><h2>You know every card here.</h2><p>Nice work. Reset to study them all again, or pick another section.</p><button type="button" class="btn" id="fc-reset">Mark all as still learning</button></div>';
      main.innerHTML = h; wireCardTools();
      document.getElementById("fc-reset").addEventListener("click", function () { all.forEach(function (c) { delete S.known[c.term]; }); save(); onlyLearning = false; deck = all.slice(); ci = 0; drawCards(); });
      return;
    }
    var c = deck[ci], d = HUB.defs[c.term] || [], isK = !!S.known[c.term];
    h += '<div class="fc-stage"><button type="button" class="fc-nav" id="fc-prev" aria-label="Previous card"' + (ci ? "" : " disabled") + '>' + IC.prev + '</button>';
    h += '<div class="fc-card' + (flipped ? " flipped" : "") + '" id="fc-card" tabindex="0" role="button" aria-label="Flashcard: ' + esc(c.term) + '. Press to flip.">' +
      '<div class="fc-inner">' +
      '<div class="fc-face fc-front" aria-hidden="' + flipped + '"><a class="fc-tag" href="#lesson-' + c.lesson.id + '">Lesson ' + c.lesson.num + '</a>' + (isK ? '<span class="fc-badge">Known</span>' : '') +
      '<h2>' + esc(c.term) + '</h2><span class="fc-hint">Tap the card or press Space to see what it means</span></div>' +
      '<div class="fc-face fc-back" aria-hidden="' + !flipped + '"><div class="fc-bterm">' + esc(c.term) + '</div><dl class="fc-defs">' +
      '<div><dt>Definition</dt><dd>' + esc(c.back) + '</dd></div>' +
      (d[0] ? '<div><dt>In plain words</dt><dd>' + esc(d[0]) + '</dd></div>' : '') +
      (d[1] ? '<div><dt>Example</dt><dd>' + esc(d[1]) + '</dd></div>' : '') +
      '</dl></div></div></div>';
    h += '<button type="button" class="fc-nav" id="fc-next" aria-label="Next card"' + (ci < deck.length - 1 ? "" : " disabled") + '>' + IC.next + '</button></div>';
    h += '<div class="fc-actions"><button type="button" class="pbtn" id="fc-flip">' + IC.flip + (flipped ? "Show term" : "Flip") + '</button>' +
      '<button type="button" class="pbtn learn' + (!isK ? " on" : "") + '" id="fc-learning">Still learning</button>' +
      '<button type="button" class="pbtn got' + (isK ? " on" : "") + '" id="fc-got">Got it ✓</button></div>';
    h += '<p class="fc-keys">Keys: Space flips · ← → move between cards</p><p class="fc-swipe">Swipe the card left or right to move between cards</p>';
    main.innerHTML = h;
    wireCardTools();
    var card = document.getElementById("fc-card");
    function flip() { flipped = !flipped; card.classList.toggle("flipped", flipped); document.getElementById("fc-flip").innerHTML = IC.flip + (flipped ? "Show term" : "Flip");
      card.querySelector(".fc-front").setAttribute("aria-hidden", flipped); card.querySelector(".fc-back").setAttribute("aria-hidden", !flipped);
      if (flipped && HUB.voice && HUB.voice.isOn()) HUB.voice.say(c.term + ". " + c.back + (d[0] ? " In plain words: " + d[0] : "") + (d[1] ? " For example: " + d[1] : "")); }
    card.addEventListener("click", function (e) { if (e.target.closest("a")) return; flip(); });
    card.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); flip(); } });
    var sx = null, sy = 0, swiped = false;
    card.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; swiped = false; }, { passive: true });
    card.addEventListener("touchend", function (e) {
      if (sx == null) return; var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; sx = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > 1.5 * Math.abs(dy)) { swiped = true; move(dx < 0 ? 1 : -1); }
    });
    card.addEventListener("click", function (e) { if (swiped) { e.stopImmediatePropagation(); swiped = false; } }, true);
    document.getElementById("fc-flip").addEventListener("click", flip);
    document.getElementById("fc-prev").addEventListener("click", function () { move(-1); });
    document.getElementById("fc-next").addEventListener("click", function () { move(1); });
    document.getElementById("fc-got").addEventListener("click", function () { mark(c, true); });
    document.getElementById("fc-learning").addEventListener("click", function () { mark(c, false); });
    cardKeys.flip = flip;
  }
  function wireCardTools() {
    document.getElementById("fc-shuffle").addEventListener("click", function () { deck = shuffle(onlyLearning ? all.filter(function (c) { return !S.known[c.term]; }) : all); ci = 0; flipped = false; drawCards(); });
    document.getElementById("fc-only").addEventListener("change", function (e) { onlyLearning = e.target.checked; deck = all.slice(); ci = 0; flipped = false; drawCards(); });
  }
  function move(dir) {
    var n = ci + dir; if (n < 0 || n >= deck.length) return;
    ci = n; flipped = false; drawCards(); var c = document.getElementById("fc-card"); if (c) c.focus({ preventScroll: true });
  }
  function mark(c, known) {
    if (known) S.known[c.term] = true; else delete S.known[c.term];
    save();
    if (onlyLearning && known) { deck = deck.filter(function (x) { return x !== c; }); if (ci >= deck.length) ci = Math.max(0, deck.length - 1); flipped = false; drawCards(); return; }
    if (ci < deck.length - 1) { ci++; flipped = false; }
    drawCards();
  }
  var cardKeys = {};
  document.addEventListener("keydown", function (e) {
    if (!root || !document.getElementById("fc-card") || mode !== "cards") return;
    var t = e.target, tag = t && t.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === " " && !(tag === "BUTTON" || tag === "A")) { e.preventDefault(); if (cardKeys.flip) cardKeys.flip(); }
    else if (e.key === "ArrowRight") { e.preventDefault(); move(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); }
  });

  /* ---------- multiple choice ---------- */
  var run;
  function quizSetup() {
    var pool = questionsFor(scope), main = document.getElementById("pr-main");
    if (!pool.length) { main.innerHTML = '<p class="pr-empty">No questions in this section yet.</p>'; return; }
    var best = S.best[scope];
    var sizes = [10, 20, 50].filter(function (n) { return n < pool.length; });
    var h = '<div class="pq-setup"><h2>' + pool.length + ' questions in ' + esc(scopeName(scope)) + '</h2>';
    if (best != null) h += '<p class="pq-best">Your best score here: <b>' + best + '%</b></p>';
    h += '<p>How many do you want to answer? Questions are picked at random.</p><div class="pq-sizes">';
    sizes.forEach(function (n) { h += '<button type="button" class="pbtn" data-n="' + n + '">' + n + ' questions</button>'; });
    h += '<button type="button" class="pbtn primary" data-n="' + pool.length + '">All ' + pool.length + '</button></div></div>';
    main.innerHTML = h;
    main.querySelectorAll("[data-n]").forEach(function (b) { b.addEventListener("click", function () { startQuiz(shuffle(pool).slice(0, +b.getAttribute("data-n"))); }); });
    if (HUB.voice) HUB.voice.mount("practice", root);
  }
  function startQuiz(list) { run = { list: list, i: 0, picks: [] }; drawQ(); }
  function drawQ() {
    var it = run.list[run.i], q = it.q, main = document.getElementById("pr-main");
    var h = '<div class="pq-top"><span class="num">Question ' + (run.i + 1) + ' of ' + run.list.length + '</span><span class="pq-meter"><span style="width:' + (100 * run.i / run.list.length).toFixed(1) + '%"></span></span>' +
      '<a href="#lesson-' + it.lesson.id + '" class="fc-tag">Lesson ' + it.lesson.num + '</a></div>';
    h += '<div class="pq-card"><p class="pq-q">' + q.q + '</p><div class="pq-opts" role="group" aria-label="Answer choices">';
    q.options.forEach(function (o, j) { h += '<button type="button" class="pq-opt" data-j="' + j + '"><span class="pq-l">' + LETTERS[j] + '</span><span>' + o + '</span></button>'; });
    h += '</div><div class="pq-fb" id="pq-fb" aria-live="polite"></div></div>';
    main.innerHTML = h;
    main.querySelectorAll(".pq-opt").forEach(function (b) { b.addEventListener("click", function () { answer(+b.getAttribute("data-j")); }); });
    var first = main.querySelector(".pq-opt"); if (first) first.focus({ preventScroll: true });
    toMain();
    if (HUB.voice) HUB.voice.mount("practice", root);
  }
  function answer(j) {
    var it = run.list[run.i], q = it.q, ok = j === q.answer, main = document.getElementById("pr-main");
    run.picks[run.i] = j;
    main.querySelectorAll(".pq-opt").forEach(function (b) {
      var k = +b.getAttribute("data-j"); b.disabled = true;
      if (k === q.answer) b.classList.add("right"); else if (k === j) b.classList.add("wrong"); else b.classList.add("dim");
    });
    var last = run.i === run.list.length - 1;
    document.getElementById("pq-fb").innerHTML = '<div class="pq-verdict ' + (ok ? "ok" : "no") + '">' + (ok ? "Correct!" : "Not quite. The answer is " + LETTERS[q.answer] + ": " + q.options[q.answer] + ".") + '</div>' +
      (q.why ? '<p class="pq-why">' + q.why + '</p>' : '') +
      '<div class="pq-next"><a href="#lesson-' + it.lesson.id + '" class="pq-review">Review lesson ' + it.lesson.num + '</a><button type="button" class="btn" id="pq-go">' + (last ? "See my score" : "Next question →") + '</button></div>';
    var go = document.getElementById("pq-go"); go.focus({ preventScroll: true });
    go.addEventListener("click", function () { if (last) finish(); else { run.i++; drawQ(); } });
  }
  function toMain() {
    var m = document.getElementById("pr-main"), top = m.getBoundingClientRect().top + window.scrollY - 70;
    if (window.scrollY > top) window.scrollTo({ top: Math.max(0, top) });
  }
  function finish() {
    var right = run.list.filter(function (it, i) { return run.picks[i] === it.q.answer; }).length, n = run.list.length, pct = Math.round(100 * right / n);
    var missed = run.list.filter(function (it, i) { return run.picks[i] !== it.q.answer; });
    if (S.best[scope] == null || pct > S.best[scope]) { S.best[scope] = pct; save(); }
    var h = '<div class="pq-result"><div class="pq-score"><span class="pq-big num">' + pct + '%</span><span>' + right + ' of ' + n + ' correct</span></div>' +
      '<p>' + (pct >= 90 ? "Excellent. You've really got this section." : pct >= 75 ? "Solid work. Review the misses below and you'll have it." : "Keep going. Read the explanations for the misses, then try them again.") + '</p><div class="pq-sizes">';
    if (missed.length) h += '<button type="button" class="pbtn primary" id="pq-retry">Retry the ' + missed.length + ' I missed</button>';
    h += '<button type="button" class="pbtn" id="pq-new">New set</button></div></div>';
    if (missed.length) {
      h += '<h3 class="pq-mh">Questions to review</h3><ol class="pq-missed">';
      run.list.forEach(function (it, i) {
        if (run.picks[i] === it.q.answer) return;
        h += '<li><p class="pq-q">' + it.q.q + '</p><p><span class="pq-yours">Your answer: ' + it.q.options[run.picks[i]] + '</span><br><span class="pq-correct">Correct: ' + it.q.options[it.q.answer] + '</span></p>' +
          (it.q.why ? '<p class="pq-why">' + it.q.why + '</p>' : '') + '<a href="#lesson-' + it.lesson.id + '" class="pq-review">Lesson ' + it.lesson.num + '</a></li>';
      });
      h += '</ol>';
    }
    document.getElementById("pr-main").innerHTML = h;
    if (missed.length) document.getElementById("pq-retry").addEventListener("click", function () { startQuiz(shuffle(missed)); });
    document.getElementById("pq-new").addEventListener("click", quizSetup);
    toMain();
    if (HUB.voice) HUB.voice.mount("practice", root);
  }

  HUB.practice = { render: render };
})();

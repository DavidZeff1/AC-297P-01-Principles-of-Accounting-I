/* Statement problems: worked practice in the style of the Chapter 1 Excel assignments.
   Route: #practice/problems/<id>
     tx    — "Statements after each transaction" (like I-01.05 Bingo Corporation). One card per
             transaction; each card starts from the previous card's correct statements, so only the
             lines the transaction changes need editing. Check & reveal, then go to the next card.
     build — "Build the statements" (like the Chapter 1 self-grading sheet). Numbers come from a
             5-digit ID with the same formulas as the spreadsheet; income statement, then retained
             earnings, then balance sheet, each carrying its result into the next.
   Progress is kept in browser storage as a convenience only. */
(function () {
  "use strict";
  var HUB = window.HUB;
  var KEY = "ac297p-problems";
  var TOL = 0.5; // dollars: answers within this of the right figure count as right

  HUB.problemSets = [
    { id: "tx", chapter: 1, title: "Statements after each transaction", short: "After each transaction" },
    { id: "build", chapter: 1, title: "Build the statements from an account list", short: "Build the statements" }
  ];

  function load() { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } }
  var S = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage unavailable */ } }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function fmt(n, dec) {
    if (n == null || isNaN(n)) return "";
    dec = dec || 0;
    var s = Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
    return n < -0.004 ? "(" + s + ")" : s;
  }
  function money(n, dec) { var s = fmt(n, dec); return n < -0.004 ? "($" + s.slice(1) : "$" + s; }
  function parse(v) {
    v = String(v == null ? "" : v).trim();
    if (!v) return null;
    var neg = /^\(.*\)$/.test(v) || /^-/.test(v);
    v = v.replace(/[()$,\s-]/g, "");
    if (!v || isNaN(+v)) return NaN;
    return neg ? -(+v) : +v;
  }
  function near(a, b) { return a != null && !isNaN(a) && Math.abs(a - b) <= TOL; }

  /* seeded random so a generated company can be rebuilt from its seed */
  function rng(seed) {
    var a = seed >>> 0;
    return function () { a = (a + 0x6D2B79F5) >>> 0; var t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }

  var IC = {
    cards: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 6V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2"/></svg>',
    quiz: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17h.01"/></svg>',
    sheet: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h4M14 16h2"/></svg>'
  };

  /* =====================================================================
     Problem 1: statements after each transaction
     ===================================================================== */
  var TX_LINES = {
    is: [
      { k: "rev", label: "Services to customers", col: 2, head: "Revenues" },
      { k: "wages", label: "Wages", col: 1, head: "Expenses", ind: true },
      { k: "util", label: "Utilities", col: 1, ind: true },
      { k: "totExp", label: "Total expenses", col: 2, sub: true },
      { k: "ni", label: "Net income", col: 2, total: true }
    ],
    re: [
      { k: "beg", label: "Beginning retained earnings", col: 2 },
      { k: "ni2", label: "Plus: Net income", col: 2 },
      { k: "reSub", label: "Subtotal", col: 2, sub: true },
      { k: "div", label: "Less: Dividends", col: 2 },
      { k: "end", label: "Ending retained earnings", col: 2, total: true }
    ],
    bs: [
      { k: "cash", label: "Cash", col: 2, head: "Assets" },
      { k: "ar", label: "Accounts receivable", col: 2 },
      { k: "asset", label: "Building", col: 2 },
      { k: "ta", label: "Total assets", col: 2, total: true },
      { k: "wp", label: "Wages payable", col: 1, head: "Liabilities", ind: true },
      { k: "np", label: "Notes payable", col: 1, ind: true },
      { k: "tl", label: "Total liabilities", col: 2, sub: true },
      { k: "cs", label: "Capital stock", col: 1, head: "Stockholders’ equity", ind: true },
      { k: "re", label: "Retained earnings", col: 1, ind: true },
      { k: "tse", label: "Total stockholders’ equity", col: 2, sub: true },
      { k: "tle", label: "Total liabilities and equity", col: 2, total: true }
    ]
  };
  var BAL = ["cash", "ar", "asset", "wp", "np", "cs", "rev", "wages", "util", "div"];
  var NAMES = { cash: "Cash", ar: "Accounts receivable", wp: "Wages payable", np: "Notes payable", cs: "Capital stock", rev: "Services revenue", wages: "Wages expense", util: "Utilities expense", div: "Dividends" };

  function txValues(b) {
    var v = {};
    BAL.forEach(function (k) { v[k] = b[k] || 0; });
    v.totExp = v.wages + v.util; v.ni = v.rev - v.totExp;
    v.beg = 0; v.ni2 = v.ni; v.reSub = v.beg + v.ni; v.end = v.reSub - v.div;
    v.ta = v.cash + v.ar + v.asset; v.tl = v.wp + v.np; v.re = v.end; v.tse = v.cs + v.re; v.tle = v.tl + v.tse;
    return v;
  }
  function balancesAfter(set, i) {
    var b = {};
    for (var j = 0; j <= i; j++) { var e = set.tx[j].eff; for (var k in e) b[k] = (b[k] || 0) + e[k]; }
    return b;
  }

  var BINGO = {
    key: "bingo", company: "Bingo Corporation", asset: "Building", from: "the I-01.05 assignment",
    tx: [
      { text: "Issued capital stock for $50,000 cash.", eff: { cash: 50000, cs: 50000 },
        why: "Owners put $50,000 in. Cash (an asset) and Capital stock (equity) both rise by $50,000. No revenue or expense, so the income statement is untouched." },
      { text: "Purchased building for $120,000, making a $20,000 down payment and signing a promissory note payable for the balance.", eff: { asset: 120000, cash: -20000, np: 100000 },
        why: "The building comes in at its full $120,000 cost. Cash goes down by the $20,000 paid, and the $100,000 still owed is a Note payable. Assets rise $100,000, matched by $100,000 more liabilities." },
      { text: "Paid wages expense of $5,000.", eff: { wages: 5000, cash: -5000 },
        why: "Wages expense of $5,000 lowers net income, so retained earnings falls $5,000. Cash falls $5,000 because it was paid now." },
      { text: "Provided services to customers for $15,000 cash.", eff: { rev: 15000, cash: 15000 },
        why: "Revenue of $15,000 raises net income and retained earnings. Customers paid at once, so Cash rises $15,000." },
      { text: "Paid utilities expense of $2,000.", eff: { util: 2000, cash: -2000 },
        why: "Utilities expense of $2,000 lowers net income and retained earnings. Cash falls $2,000." },
      { text: "Reduced note payable with an $8,000 cash payment (ignore interest costs).", eff: { np: -8000, cash: -8000 },
        why: "Paying down debt is not an expense. Cash and Notes payable both fall $8,000; the income statement doesn’t change." },
      { text: "Provided services to customers on account, $10,000.", eff: { rev: 10000, ar: 10000 },
        why: "Revenue is earned when the work is done, even before payment. Revenue rises $10,000 and so does Accounts receivable (the right to collect)." },
      { text: "Incurred wages expense of $3,000, to be paid in the future.", eff: { wages: 3000, wp: 3000 },
        why: "The expense belongs to this period even though it is unpaid. Wages expense rises $3,000 and the amount owed shows as Wages payable." },
      { text: "Collected $4,000 on an outstanding account receivable.", eff: { cash: 4000, ar: -4000 },
        why: "Collecting is not new revenue (that was counted when the service was provided). One asset swaps for another: Cash +$4,000, Accounts receivable −$4,000." },
      { text: "Declared and paid dividend of $6,000.", eff: { div: 6000, cash: -6000 },
        why: "Dividends are a distribution to owners, not an expense. They skip the income statement and are subtracted on the statement of retained earnings. Cash falls $6,000." }
    ]
  };

  var CO = ["Sparrow Landscaping Inc.", "Harbor Tutoring Corp.", "Pinecrest Cleaning Co.", "Bluebird Design Inc.", "Summit Courier Corp.", "Maple Street Repair Co.", "Northwind Consulting Inc.", "Copperfield Catering Corp.", "Ridgeline Fitness Inc.", "Lakeside Pet Care Co."];
  var ASSETS = [["Building", "building"], ["Equipment", "equipment"], ["Delivery van", "delivery van"], ["Office building", "office building"]];

  function makeSet(seed) {
    for (var attempt = 0; attempt < 50; attempt++) {
      var r = rng(seed + attempt * 7919);
      var pick = function (a) { return a[Math.floor(r() * a.length)]; };
      var k = function (lo, hi, step) { step = step || 1000; return (lo + Math.floor(r() * (hi - lo + 1))) * step; };
      var company = pick(CO), as = pick(ASSETS);
      var stock = k(30, 90), cost = k(60, 180), down = Math.min(stock - 5000, Math.max(5000, Math.round(cost * (0.1 + r() * 0.2) / 1000) * 1000));
      var note = cost - down;
      var w1 = k(2, 8), r1 = k(8, 25), u = k(2, 8, 500), pay = Math.min(note, k(3, 12)), r2 = k(6, 16), w2 = k(1, 5), d = k(2, 8);
      var col = Math.max(1000, Math.min(r2 - 1000, k(2, Math.max(2, r2 / 1000 - 1))));
      var D = function (n) { return "$" + n.toLocaleString("en-US"); };
      var first = [
        { text: "Issued capital stock for " + D(stock) + " cash.", eff: { cash: stock, cs: stock },
          why: "Owners invest " + D(stock) + ". Cash (asset) and Capital stock (equity) both rise; the income statement doesn’t change." },
        { text: "Purchased " + (as[1] === "equipment" ? "" : "a ") + as[1] + " for " + D(cost) + ", paying " + D(down) + " down and signing a note payable for the rest.", eff: { asset: cost, cash: -down, np: note },
          why: "The " + as[1] + " is recorded at its full cost, " + D(cost) + ". Cash falls by the " + D(down) + " paid and Notes payable rises by the " + D(note) + " still owed." }
      ];
      var rest = [
        { id: "w1", text: pick(["Paid wages of ", "Paid employees’ wages of "]) + D(w1) + ".", eff: { wages: w1, cash: -w1 },
          why: "Wages expense " + D(w1) + " lowers net income and retained earnings; Cash falls because it was paid now." },
        { id: "r1", text: pick(["Provided services to customers for ", "Performed services and received "]) + D(r1) + " cash.", eff: { rev: r1, cash: r1 },
          why: "Revenue " + D(r1) + " raises net income and retained earnings; Cash rises the same amount." },
        { id: "u", text: "Paid the utility bill, " + D(u) + ".", eff: { util: u, cash: -u },
          why: "Utilities expense " + D(u) + " lowers net income and retained earnings; Cash falls." },
        { id: "pay", text: "Paid " + D(pay) + " on the note payable (ignore interest).", eff: { np: -pay, cash: -pay },
          why: "Repaying debt is not an expense. Cash and Notes payable both fall " + D(pay) + "; the income statement is unchanged." },
        { id: "r2", text: "Provided services to customers on account, " + D(r2) + ".", eff: { rev: r2, ar: r2 },
          why: "Revenue is earned when the service is done. Revenue and Accounts receivable both rise " + D(r2) + "." },
        { id: "w2", text: "Employees earned " + D(w2) + " of wages that will be paid next month.", eff: { wages: w2, wp: w2 },
          why: "The expense belongs to this period even though it is unpaid. Wages expense and Wages payable both rise " + D(w2) + "." },
        { id: "col", text: "Collected " + D(col) + " from customers on account.", eff: { cash: col, ar: -col },
          why: "No new revenue: it was counted when the service was provided. Cash +" + D(col) + ", Accounts receivable −" + D(col) + "." },
        { id: "d", text: "Declared and paid a " + D(d) + " cash dividend.", eff: { div: d, cash: -d },
          why: "Dividends are not an expense. They are subtracted on the statement of retained earnings, and Cash falls " + D(d) + "." }
      ];
      for (var i = rest.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)), t = rest[i]; rest[i] = rest[j]; rest[j] = t; }
      var ir2 = rest.findIndex(function (x) { return x.id === "r2"; }), ic = rest.findIndex(function (x) { return x.id === "col"; });
      if (ic < ir2) { var tmp = rest[ic]; rest[ic] = rest[ir2]; rest[ir2] = tmp; }
      var set = { key: "r" + seed, seed: seed, company: company, asset: as[0], tx: first.concat(rest) };
      var ok = true;
      for (var n = 0; n < set.tx.length; n++) { if (balancesAfter(set, n).cash < 0) { ok = false; break; } }
      if (ok) return set;
    }
    return BINGO;
  }
  function setFor(key) { return key && /^r\d+$/.test(key) ? makeSet(+key.slice(1)) : BINGO; }

  /* ---------- page shell ---------- */
  var root, pid;
  function render(app, id) {
    root = app; pid = id === "build" ? "build" : "tx";
    var ps = HUB.problemSets.filter(function (p) { return p.id === pid; })[0];
    document.title = ps.title + " · Practice · AC-297P";
    var h = '<header class="pr-head"><div class="wrap">';
    h += '<div class="eyebrow">Practice · Chapter 1</div><h1>Statement problems</h1>';
    h += '<p>Prepare the income statement, statement of retained earnings, and balance sheet yourself, then check. Each card carries the right answers forward, so you only work out what changes.</p>';
    h += '<div class="pr-modes" role="tablist" aria-label="Practice mode">' +
      '<a role="tab" href="#practice/cards/ch1" aria-selected="false">' + IC.cards + 'Flashcards</a>' +
      '<a role="tab" href="#practice/quiz/ch1" aria-selected="false">' + IC.quiz + 'Multiple choice</a>' +
      '<a role="tab" href="#practice/problems/tx" class="on" aria-selected="true">' + IC.sheet + 'Statement problems</a></div>';
    h += '<div class="pr-scope"><div class="pr-label">Problem</div><div class="pr-chips" role="group" aria-label="Problem">';
    HUB.problemSets.forEach(function (p) { h += '<a href="#practice/problems/' + p.id + '" class="chip' + (p.id === pid ? " on" : "") + '">' + esc(p.title) + '</a>'; });
    h += '</div></div></div></header>';
    h += '<main class="wrap pr-main ps-main" id="pr-main"></main>';
    app.innerHTML = h;
    if (pid === "build") buildStart(); else txStart();
  }
  function mountVoice() { if (HUB.voice) HUB.voice.mount("practice", root); }
  function toMain() {
    var m = document.getElementById("pr-main"); if (!m) return;
    var top = m.getBoundingClientRect().top + window.scrollY - 70;
    if (window.scrollY > top) window.scrollTo({ top: Math.max(0, top) });
  }

  /* shared statement renderer: rows of { k, label, col, head, ind, sub, total, pick } */
  function stmt(title, co, period, rows, opts) {
    opts = opts || {};
    var h = '<section class="ps-st" aria-label="' + esc(title) + '"><header><b>' + esc(co) + '</b><span>' + esc(title) + '</span><small>' + esc(period) + '</small></header><div class="ps-rows">';
    rows.forEach(function (r) {
      if (r.head) h += '<div class="ps-row ps-h"><span class="ps-lab">' + esc(r.head) + '</span></div>';
      var cls = "ps-row" + (r.ind ? " ind" : "") + (r.sub ? " sub" : "") + (r.total ? " total" : "");
      var lab = r.pick ? '<select class="ps-sel" data-s="' + r.k + '" aria-label="Account for this line">' + opts.options + '</select>' : esc(r.label);
      var inp = '<span class="ps-cell"><input class="ps-in num" data-k="' + r.k + '" inputmode="decimal" autocomplete="off" spellcheck="false" aria-label="' + esc(r.label || "Amount") + '"></span>';
      h += '<div class="' + cls + '" data-row="' + r.k + '"><span class="ps-lab">' + lab + '</span><span class="ps-c1">' + (r.col === 1 ? inp : "") + '</span><span class="ps-c2">' + (r.col === 2 ? inp : "") + '</span></div>';
    });
    return h + '</div></section>';
  }

  function wireInputs(scope, onChange, dec) {
    scope.querySelectorAll(".ps-in").forEach(function (inp) {
      inp.addEventListener("input", function () { onChange(); });
      inp.addEventListener("blur", function () { var n = parse(inp.value); if (n != null && !isNaN(n)) inp.value = fmt(n, dec); });
      inp.addEventListener("keydown", function (e) {
        if (e.key !== "Enter") return;
        e.preventDefault();
        var all = Array.prototype.slice.call(scope.querySelectorAll(".ps-in:not([readonly]), .ps-sel:not([disabled])"));
        var i = all.indexOf(inp);
        if (e.shiftKey ? i > 0 : i < all.length - 1) all[i + (e.shiftKey ? -1 : 1)].focus();
        else { var b = document.getElementById("ps-check"); if (b) b.focus(); }
      });
    });
    scope.querySelectorAll(".ps-sel").forEach(function (s) { s.addEventListener("change", onChange); });
  }
  function markCell(inp, ok, correct, dec, changed, delta) {
    var cell = inp.parentElement, row = inp.closest(".ps-row");
    inp.classList.toggle("ok", ok); inp.classList.toggle("bad", !ok);
    var old = cell.querySelector(".ps-fix"); if (old) old.remove();
    if (!ok) { var f = document.createElement("span"); f.className = "ps-fix num"; f.textContent = fmt(correct, dec); f.title = "Correct amount"; cell.appendChild(f); }
    if (row && changed) {
      row.classList.add("changed");
      var lab = row.querySelector(".ps-lab");
      if (lab && delta && !lab.querySelector(".ps-delta")) {
        var d = document.createElement("span"); d.className = "ps-delta num"; d.textContent = (delta > 0 ? "+" : "−") + fmt(Math.abs(delta), dec); lab.appendChild(d);
      }
    }
  }

  /* ---------- transaction cards ---------- */
  var T, set, view;
  function txState() {
    var s = S.tx;
    if (!s || !s.set) { s = S.tx = { set: "bingo", ans: {} }; }
    s.ans = s.ans || {};
    return s;
  }
  function frontier() { var i = 0; while (i < set.tx.length && T.ans[i] && T.ans[i].done) i++; return i; }
  function txStart() {
    T = txState(); set = setFor(T.set);
    view = Math.min(frontier(), set.tx.length - 1);
    if (frontier() >= set.tx.length) view = set.tx.length; // finished: summary
    drawTx();
  }
  function prefillFor(i) {
    var v = i > 0 ? txValues(balancesAfter(set, i - 1)) : txValues({});
    var o = {}; for (var k in v) o[k] = fmt(v[k]); return o;
  }
  function newSet(key) { S.tx = { set: key, ans: {} }; save(); txStart(); toMain(); }

  function drawTx() {
    var main = document.getElementById("pr-main"), n = set.tx.length, f = frontier();
    var h = '<div class="ps-bar"><div class="ps-co"><span class="eyebrow">' + (set.key === "bingo" ? "From " + esc(set.from) : "Practice company") + '</span><strong>' + esc(set.company) + '</strong></div>' +
      '<div class="ps-tools"><button type="button" class="pbtn small" id="ps-new">New company</button>' +
      (set.key !== "bingo" ? '<button type="button" class="pbtn small" id="ps-bingo">Bingo Corp. (assignment)</button>' : '') +
      '<button type="button" class="pbtn small" id="ps-restart">Start over</button></div></div>';
    h += '<nav class="ps-steps" aria-label="Transactions">';
    for (var i = 0; i < n; i++) {
      var a = T.ans[i], cls = a && a.done ? (a.score === a.total ? " good" : " miss") : "";
      var can = i <= f;
      h += '<button type="button" class="ps-step' + cls + (i === view ? " on" : "") + '" data-i="' + i + '"' + (can ? "" : " disabled") + ' aria-label="Transaction ' + (i + 1) + (a && a.done ? ", " + a.score + " of " + a.total + " lines right" : "") + '"' + (i === view ? ' aria-current="step"' : "") + '>' + (i + 1) + '</button>';
    }
    h += '<button type="button" class="ps-step sum' + (view === n ? " on" : "") + '" data-i="' + n + '"' + (f >= n ? "" : " disabled") + '>Results</button></nav>';
    h += '<div id="ps-card"></div>';
    main.innerHTML = h;
    main.querySelectorAll(".ps-step").forEach(function (b) { b.addEventListener("click", function () { view = +b.getAttribute("data-i"); drawTx(); }); });
    document.getElementById("ps-new").addEventListener("click", function () { newSet("r" + (1 + Math.floor(Math.random() * 1e8))); });
    var bb = document.getElementById("ps-bingo"); if (bb) bb.addEventListener("click", function () { newSet("bingo"); });
    document.getElementById("ps-restart").addEventListener("click", function () { if (confirm("Clear your answers for " + set.company + " and start again from transaction 1?")) newSet(set.key); });
    if (view >= n) drawSummary(); else drawCard(view);
    mountVoice();
  }

  function drawCard(i) {
    var tx = set.tx[i], n = set.tx.length, a = T.ans[i];
    if (!a) { a = T.ans[i] = { vals: prefillFor(i), done: false }; save(); }
    var per = "For the month (through transaction #" + (i + 1) + ")", asOf = "As of completion of transaction #" + (i + 1);
    var bsRows = TX_LINES.bs.map(function (r) { return r.k === "asset" ? Object.assign({}, r, { label: set.asset }) : r; });
    var h = '<article class="ps-tx"><div class="ps-txn"><span class="ps-badge num">' + (i + 1) + '</span><div><div class="eyebrow">Transaction ' + (i + 1) + ' of ' + n + '</div><p class="ps-txt">' + esc(tx.text) + '</p></div></div>';
    if (i > 0 && !a.done) h += '<p class="ps-carry">The statements below start from the correct answers after transaction ' + i + '. Change only what this transaction affects, including the totals.</p>';
    else if (i === 0 && !a.done) h += '<p class="ps-carry">The company is brand new, so everything starts at zero. Fill in what this transaction changes, including the totals.</p>';
    h += '</article>';
    h += '<div class="ps-grid"><div class="ps-col">' + stmt("Income Statement", set.company, per, TX_LINES.is) + stmt("Statement of Retained Earnings", set.company, per, TX_LINES.re) + '</div>' +
      '<div class="ps-col">' + stmt("Balance Sheet", set.company, asOf, bsRows) + '</div></div>';
    h += '<div class="ps-act" id="ps-act"></div>';
    var card = document.getElementById("ps-card");
    card.innerHTML = h;
    card.querySelectorAll(".ps-in").forEach(function (inp) { inp.value = a.vals[inp.getAttribute("data-k")] || ""; });
    wireInputs(card, function () {
      if (a.done) return;
      card.querySelectorAll(".ps-in").forEach(function (inp) { a.vals[inp.getAttribute("data-k")] = inp.value; }); save();
    }, 0);
    if (a.done) showReveal(i, false); else drawActions(i);
  }

  function drawActions(i) {
    var act = document.getElementById("ps-act");
    act.innerHTML = '<div class="ps-btns"><button type="button" class="pbtn primary" id="ps-check">Check &amp; reveal</button>' +
      '<button type="button" class="pbtn" id="ps-reset">Reset this card</button></div>' +
      '<p class="ps-tip">Tip: Enter moves to the next box. Negative numbers can be typed as −5,000 or (5,000).</p>';
    document.getElementById("ps-check").addEventListener("click", function () {
      var a = T.ans[i];
      document.querySelectorAll("#ps-card .ps-in").forEach(function (inp) { a.vals[inp.getAttribute("data-k")] = inp.value; });
      a.done = true; save(); showReveal(i, true);
    });
    document.getElementById("ps-reset").addEventListener("click", function () {
      T.ans[i] = { vals: prefillFor(i), done: false }; save(); drawCard(i);
    });
  }

  function showReveal(i, fresh) {
    var a = T.ans[i], tx = set.tx[i], n = set.tx.length;
    var cur = txValues(balancesAfter(set, i)), prev = i > 0 ? txValues(balancesAfter(set, i - 1)) : txValues({});
    var right = 0, total = 0;
    document.querySelectorAll("#ps-card .ps-in").forEach(function (inp) {
      var k = inp.getAttribute("data-k"), val = parse(inp.value); if (val == null) val = 0;
      var ok = near(val, cur[k]); total++; if (ok) right++;
      inp.readOnly = true;
      markCell(inp, ok, cur[k], 0, Math.abs(cur[k] - prev[k]) > 0.004, cur[k] - prev[k]);
    });
    a.score = right; a.total = total; save();
    var eqOk = Math.abs(cur.ta - cur.tle) < 0.01;
    var last = i === n - 1;
    var act = document.getElementById("ps-act");
    act.innerHTML = '<div class="ps-result ' + (right === total ? "ok" : "no") + '" aria-live="polite">' +
      '<div class="ps-score"><span class="num">' + right + '/' + total + '</span><span>' + (right === total ? "Every line right." : (total - right) + " line" + (total - right === 1 ? "" : "s") + " to fix. The right figure is shown under each red box.") + '</span></div>' +
      '<p class="ps-why"><b>What happened:</b> ' + esc(tx.why) + '</p>' +
      '<p class="ps-eq num">Assets ' + money(cur.ta) + ' = Liabilities ' + money(cur.tl) + ' + Equity ' + money(cur.tse) + (eqOk ? " ✓" : "") + '</p>' +
      '<p class="ps-legend"><span class="ps-chg"></span>Highlighted lines changed in this transaction.</p>' +
      '<div class="ps-btns"><button type="button" class="pbtn primary" id="ps-next">' + (last ? "See results" : "Next transaction →") + '</button>' +
      '<button type="button" class="pbtn" id="ps-retry">Try this card again</button></div></div>';
    var go = document.getElementById("ps-next");
    go.addEventListener("click", function () { view = i + 1; drawTx(); toMain(); var c = document.querySelector("#ps-card .ps-in"); if (c && view < n) c.focus({ preventScroll: true }); });
    document.getElementById("ps-retry").addEventListener("click", function () {
      var keep = T.ans[i].vals; T.ans[i] = { vals: keep, done: false }; save(); drawTx();
    });
    if (fresh) {
      go.focus({ preventScroll: true });
      document.querySelectorAll(".ps-step")[i].className = "ps-step on " + (right === total ? "good" : "miss");
      var nx = document.querySelectorAll(".ps-step")[i + 1]; if (nx) nx.disabled = false;
      if (HUB.voice && HUB.voice.isOn && HUB.voice.isOn()) HUB.voice.say(right + " of " + total + " lines right. " + tx.why);
    }
  }

  function drawSummary() {
    var n = set.tx.length, perfect = 0, right = 0, total = 0;
    var h = '<div class="ps-sum"><h2>' + esc(set.company) + ': results</h2><ol class="ps-sumlist">';
    for (var i = 0; i < n; i++) {
      var a = T.ans[i] || {}; right += a.score || 0; total += a.total || 0; if (a.score === a.total) perfect++;
      h += '<li><button type="button" class="ps-sumrow" data-i="' + i + '"><span class="num">' + (i + 1) + '</span><span>' + esc(set.tx[i].text) + '</span><span class="ps-pill ' + (a.score === a.total ? "ok" : "no") + ' num">' + a.score + '/' + a.total + '</span></button></li>';
    }
    h += '</ol><p class="ps-sumline">' + perfect + ' of ' + n + ' cards perfect · ' + right + ' of ' + total + ' lines right overall.</p>';
    h += '<div class="ps-btns"><button type="button" class="pbtn primary" id="ps-new2">Practice with a new company</button><button type="button" class="pbtn" id="ps-again">Redo ' + esc(set.company) + '</button></div></div>';
    document.getElementById("ps-card").innerHTML = h;
    document.querySelectorAll(".ps-sumrow").forEach(function (b) { b.addEventListener("click", function () { view = +b.getAttribute("data-i"); drawTx(); }); });
    document.getElementById("ps-new2").addEventListener("click", function () { newSet("r" + (1 + Math.floor(Math.random() * 1e8))); });
    document.getElementById("ps-again").addEventListener("click", function () { newSet(set.key); });
  }

  /* =====================================================================
     Problem 2: build the statements from a list (5-digit ID, same formulas as the Excel sheet)
     ===================================================================== */
  var PICK = [6, 8, 3, 4, 9, 1, 2, 3, 5, 7, 9, 6, 6, 4, 3, 2, 6, 2, 1, 1, 7, 9, 8, 7, 3, 6, 1, 2, 3, 4, 5, 7, 8, 9, 5, 3, 5, 7, 3, 6, 7, 8, 2, 5, 7];
  var ACCTS = ["Capital stock", "Wage expense", "Services to customers", "Cash", "Utilities expense", "Beginning retained earnings", "Rent expense", "Accounts payable", "Equipment", "Dividends", "Accounts receivable", "Notes payable"];
  function idNumbers(id) {
    var d = String(id).padStart(5, "0").split("").map(Number), s = d.reduce(function (x, y) { return x + y; }, 0);
    var c71 = s >= 1 && s <= 45 ? PICK[s - 1] : 0, d71 = s, e71 = Math.floor(id / 100), f71 = Math.floor(id / 10), g71 = id;
    var c72 = d71 * 2.5 / 9, c73 = (c72 + c71) / 2, c74 = c72 + c73;
    var v = {
      "Capital stock": g71 * 2.5 * 2.5,
      "Wage expense": c73 * f71 * 2.5,
      "Cash": f71 * 2.5 * 2.5,
      "Utilities expense": c74 * e71 * 2.5,
      "Rent expense": c73 * f71,
      "Accounts payable": 5000,
      "Equipment": c73 * g71 * 2.5,
      "Dividends": c73 * e71 * 2.5,
      "Accounts receivable": g71 * 2.5,
      "Notes payable": c74 * f71 * 2.5
    };
    v["Services to customers"] = (v["Rent expense"] + v["Wage expense"] + v["Utilities expense"]) * 1.3;
    var r = {};
    for (var k in v) r[k] = Math.round(v[k] * 100) / 100;
    var ta = r.Cash + r["Accounts receivable"] + r.Equipment, tl = r["Accounts payable"] + r["Notes payable"];
    var end = Math.round((ta - tl - r["Capital stock"]) * 100) / 100;
    var ni = Math.round((r["Services to customers"] - r["Wage expense"] - r["Utilities expense"] - r["Rent expense"]) * 100) / 100;
    r["Beginning retained earnings"] = Math.round((end + r.Dividends - ni) * 100) / 100;
    return r;
  }
  var GROUPS = {
    rev: ["Services to customers"],
    exp: ["Wage expense", "Utilities expense", "Rent expense"],
    ast: ["Cash", "Accounts receivable", "Equipment"],
    lia: ["Accounts payable", "Notes payable"]
  };
  function buildCorrect(v) {
    var c = {};
    c.totExp = v["Wage expense"] + v["Utilities expense"] + v["Rent expense"];
    c.ni = v["Services to customers"] - c.totExp;
    c.beg = v["Beginning retained earnings"]; c.ni2 = c.ni; c.reSub = c.beg + c.ni; c.div = v.Dividends; c.end = c.reSub - c.div;
    c.ta = v.Cash + v["Accounts receivable"] + v.Equipment; c.tl = v["Accounts payable"] + v["Notes payable"];
    c.cs = v["Capital stock"]; c.re = c.end; c.tse = c.cs + c.re; c.tle = c.tl + c.tse;
    return c;
  }
  var B_STEPS = [
    { name: "Income Statement", period: "For the Year Ending Dec. 31, 20X5", rows: [
      { k: "rev1", pick: "rev", col: 2, head: "Revenues" },
      { k: "exp1", pick: "exp", col: 1, head: "Expenses", ind: true }, { k: "exp2", pick: "exp", col: 1, ind: true }, { k: "exp3", pick: "exp", col: 1, ind: true },
      { k: "totExp", label: "Total expenses", col: 2, sub: true },
      { k: "ni", label: "Net income", col: 2, total: true }] },
    { name: "Statement of Retained Earnings", period: "For the Year Ending Dec. 31, 20X5", rows: [
      { k: "beg", label: "Beginning retained earnings", col: 2 },
      { k: "ni2", label: "Plus: Net income", col: 2 },
      { k: "reSub", label: "Subtotal", col: 2, sub: true },
      { k: "div", label: "Less: Dividends", col: 2 },
      { k: "end", label: "Ending retained earnings", col: 2, total: true }] },
    { name: "Balance Sheet", period: "December 31, 20X5", rows: [
      { k: "ast1", pick: "ast", col: 2, head: "Assets" }, { k: "ast2", pick: "ast", col: 2 }, { k: "ast3", pick: "ast", col: 2 },
      { k: "ta", label: "Total assets", col: 2, total: true },
      { k: "lia1", pick: "lia", col: 1, head: "Liabilities", ind: true }, { k: "lia2", pick: "lia", col: 1, ind: true },
      { k: "tl", label: "Total liabilities", col: 2, sub: true },
      { k: "cs", label: "Capital stock", col: 1, head: "Stockholders’ equity", ind: true },
      { k: "re", label: "Ending retained earnings", col: 1, ind: true },
      { k: "tse", label: "Total stockholders’ equity", col: 2, sub: true },
      { k: "tle", label: "Total liabilities and equity", col: 2, total: true }] }
  ];
  var CARRY = { ni2: function (c) { return c.ni; }, re: function (c) { return c.end; } };

  var B;
  function bState() {
    var s = S.build;
    if (!s || !s.id) s = S.build = { id: 10000 + Math.floor(Math.random() * 90000), name: "", step: 0, ans: {} };
    s.ans = s.ans || {};
    return s;
  }
  function buildStart() { B = bState(); drawBuild(); }
  function coName() { return (B.name ? B.name.trim() + " " : "Your ") + "Company"; }

  function drawBuild() {
    var v = idNumbers(B.id), main = document.getElementById("pr-main");
    var h = '<div class="ps-bar"><div class="ps-co"><span class="eyebrow">Like the Chapter 1 self-grading sheet</span><strong>' + esc(coName()) + '</strong></div>' +
      '<form class="ps-idform" id="ps-idform"><label>Your name <input id="ps-name" class="ps-txtin" value="' + esc(B.name || "") + '" placeholder="optional" autocomplete="off"></label>' +
      '<label>5-digit ID <input id="ps-id" class="ps-txtin num" inputmode="numeric" maxlength="5" value="' + String(B.id).padStart(5, "0") + '"></label>' +
      '<button type="submit" class="pbtn small">Use this ID</button><button type="button" class="pbtn small" id="ps-rand">Random ID</button></form></div>';
    h += '<article class="ps-tx"><p class="ps-txt">Use the accounts below to prepare ' + esc(coName()) + '’s income statement, statement of retained earnings, and balance sheet for the year ending December 31, 20X5. Pick each account from the list and type its amount, then the totals.</p>';
    h += '<div class="ps-accts">';
    ACCTS.forEach(function (k) { h += '<div><span>' + esc(k) + '</span><span class="num">' + fmt(v[k], 2) + '</span></div>'; });
    h += '</div></article>';
    h += '<nav class="ps-steps" aria-label="Statements">';
    B_STEPS.forEach(function (s, i) {
      var a = B.ans[i], cls = a && a.done ? (a.score === a.total ? " good" : " miss") : "";
      h += '<button type="button" class="ps-step wide' + cls + (i === B.step ? " on" : "") + '" data-i="' + i + '"' + (i <= bFrontier() ? "" : " disabled") + '>' + (i + 1) + '. ' + esc(s.name.replace("Statement of ", "")) + '</button>';
    });
    h += '</nav><div id="ps-card"></div>';
    main.innerHTML = h;
    document.getElementById("ps-idform").addEventListener("submit", function (e) {
      e.preventDefault();
      var id = parseInt(document.getElementById("ps-id").value, 10);
      if (!(id >= 1 && id <= 99999)) { document.getElementById("ps-id").focus(); return; }
      S.build = { id: id, name: document.getElementById("ps-name").value, step: 0, ans: {} }; save(); buildStart();
    });
    document.getElementById("ps-name").addEventListener("change", function (e) { B.name = e.target.value; save(); drawBuild(); });
    document.getElementById("ps-rand").addEventListener("click", function () {
      S.build = { id: 10000 + Math.floor(Math.random() * 90000), name: B.name, step: 0, ans: {} }; save(); buildStart();
    });
    main.querySelectorAll(".ps-step").forEach(function (b) { b.addEventListener("click", function () { B.step = +b.getAttribute("data-i"); save(); drawBuild(); }); });
    drawBuildCard(B.step);
    mountVoice();
  }
  function bFrontier() { var i = 0; while (i < B_STEPS.length - 1 && B.ans[i] && B.ans[i].done) i++; return i; }

  function drawBuildCard(i) {
    var st = B_STEPS[i], v = idNumbers(B.id), c = buildCorrect(v), a = B.ans[i];
    if (!a) {
      a = B.ans[i] = { vals: {}, sel: {}, done: false };
      st.rows.forEach(function (r) { if (CARRY[r.k]) a.vals[r.k] = fmt(CARRY[r.k](c), 2); });
      save();
    }
    var opts = '<option value="">Choose account…</option>' + ACCTS.slice().sort().map(function (k) { return '<option>' + esc(k) + '</option>'; }).join("");
    var h = '';
    if (i > 0 && !a.done) h += '<p class="ps-carry">' + (i === 1 ? "Net income is carried in from your income statement (the correct figure)." : "Ending retained earnings is carried in from the statement of retained earnings (the correct figure).") + '</p>';
    h += '<div class="ps-grid one">' + stmt(st.name, coName(), st.period, st.rows, { options: opts }) + '</div><div class="ps-act" id="ps-act"></div>';
    var card = document.getElementById("ps-card");
    card.innerHTML = h;
    card.querySelectorAll(".ps-in").forEach(function (inp) { inp.value = a.vals[inp.getAttribute("data-k")] || ""; });
    card.querySelectorAll(".ps-sel").forEach(function (s) { s.value = a.sel[s.getAttribute("data-s")] || ""; });
    wireInputs(card, function () {
      if (a.done) return;
      card.querySelectorAll(".ps-in").forEach(function (inp) { a.vals[inp.getAttribute("data-k")] = inp.value; });
      card.querySelectorAll(".ps-sel").forEach(function (s) { a.sel[s.getAttribute("data-s")] = s.value; });
      save();
    }, 2);
    if (a.done) revealBuild(i, false);
    else {
      document.getElementById("ps-act").innerHTML = '<div class="ps-btns"><button type="button" class="pbtn primary" id="ps-check">Check &amp; reveal</button><button type="button" class="pbtn" id="ps-reset">Clear</button></div>' +
        '<p class="ps-tip">Order within a group doesn’t matter. Answers within 50¢ count as right.</p>';
      document.getElementById("ps-check").addEventListener("click", function () { a.done = true; save(); revealBuild(i, true); });
      document.getElementById("ps-reset").addEventListener("click", function () { delete B.ans[i]; save(); drawBuildCard(i); });
    }
  }

  function revealBuild(i, fresh) {
    var st = B_STEPS[i], v = idNumbers(B.id), c = buildCorrect(v), a = B.ans[i];
    var card = document.getElementById("ps-card"), right = 0, total = 0, used = {};
    // first pass: decide which picked accounts are valid for their group
    var assign = {};
    st.rows.forEach(function (r) {
      if (!r.pick) return;
      var s = a.sel[r.k] || "";
      if (GROUPS[r.pick].indexOf(s) >= 0 && !used[s]) { used[s] = true; assign[r.k] = s; }
    });
    st.rows.forEach(function (r) {
      if (!r.pick || assign[r.k]) return;
      var left = GROUPS[r.pick].filter(function (x) { return !used[x]; })[0];
      used[left] = true; assign[r.k] = left; assign[r.k + "!"] = true; // "!" = the pick itself was wrong
    });
    card.querySelectorAll(".ps-row[data-row]").forEach(function (row) {
      var k = row.getAttribute("data-row"), r = st.rows.filter(function (x) { return x.k === k; })[0];
      var inp = row.querySelector(".ps-in"), sel = row.querySelector(".ps-sel");
      var target = r.pick ? v[assign[k]] : c[k];
      var val = parse(inp.value), ok = near(val, target);
      if (r.pick) {
        var pickOk = !assign[k + "!"];
        sel.disabled = true; sel.classList.toggle("ok", pickOk); sel.classList.toggle("bad", !pickOk);
        if (!pickOk) { var f = document.createElement("span"); f.className = "ps-fixlab"; f.textContent = assign[k]; sel.parentElement.appendChild(f); }
        total++; if (pickOk) right++;
      }
      inp.readOnly = true; total++; if (ok) right++;
      markCell(inp, ok, target, 2, false);
    });
    a.score = right; a.total = total; save();
    var notes = [
      "Revenues minus expenses gives net income of " + money(c.ni, 2) + ". Dividends and the balance-sheet accounts don’t belong here.",
      "Beginning retained earnings " + money(c.beg, 2) + " + net income " + money(c.ni, 2) + " − dividends " + money(c.div, 2) + " = ending retained earnings " + money(c.end, 2) + ".",
      "Assets " + money(c.ta, 2) + " = liabilities " + money(c.tl, 2) + " + stockholders’ equity " + money(c.tse, 2) + ". The ending retained earnings from the previous statement is what makes it balance."
    ];
    var last = i === B_STEPS.length - 1;
    document.getElementById("ps-act").innerHTML = '<div class="ps-result ' + (right === total ? "ok" : "no") + '" aria-live="polite">' +
      '<div class="ps-score"><span class="num">' + right + '/' + total + '</span><span>' + (right === total ? "All correct." : "The right account or amount is shown under each red box.") + '</span></div>' +
      '<p class="ps-why">' + esc(notes[i]) + '</p>' +
      '<div class="ps-btns">' + (last ? '<button type="button" class="pbtn primary" id="ps-next">Try a new ID</button>' : '<button type="button" class="pbtn primary" id="ps-next">Next: ' + esc(B_STEPS[i + 1].name) + ' →</button>') +
      '<button type="button" class="pbtn" id="ps-retry">Try this statement again</button></div></div>';
    var go = document.getElementById("ps-next");
    go.addEventListener("click", function () {
      if (last) { S.build = { id: 10000 + Math.floor(Math.random() * 90000), name: B.name, step: 0, ans: {} }; save(); buildStart(); }
      else { B.step = i + 1; save(); drawBuild(); }
      toMain();
    });
    document.getElementById("ps-retry").addEventListener("click", function () { a.done = false; save(); drawBuild(); });
    if (fresh) {
      go.focus({ preventScroll: true });
      var steps = document.querySelectorAll(".ps-step");
      steps[i].classList.add(right === total ? "good" : "miss");
      if (steps[i + 1]) steps[i + 1].disabled = false;
      if (HUB.voice && HUB.voice.isOn && HUB.voice.isOn()) HUB.voice.say(right + " of " + total + " right. " + notes[i]);
    }
  }

  HUB.problems = { render: render, _idNumbers: idNumbers, _makeSet: makeSet, _txValues: txValues, _balancesAfter: balancesAfter, BINGO: BINGO };
})();

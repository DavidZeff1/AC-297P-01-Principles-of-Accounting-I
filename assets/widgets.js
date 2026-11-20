/* Shared accounting widgets. A lesson places one with
     <div data-widget="<kind>" data-key="<name>"></div>
   and supplies its data as def.data[<name>]. Every widget gives voice-over a natural sentence
   through data-say, and speaks newly revealed content with HUB.voice.say().

   Kinds: statement, journal, taccounts, equation, steps, worked, calc  (see README for data shapes) */
(function () {
  "use strict";
  var HUB = window.HUB;
  var W = HUB.widgets = HUB.widgets || {};

  function money(n, opts) {
    if (n === null || n === undefined || n === "") return "";
    if (typeof n === "string") return n;
    var s = Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: (opts && opts.dec) || 0, maximumFractionDigits: (opts && opts.dec) || 0 });
    var d = opts && opts.noDollar ? "" : "$";
    return n < 0 ? "(" + d + s + ")" : d + s;
  }
  function plain(n) { return money(n, { noDollar: true }); }
  function sayMoney(n) { return (n < 0 ? "minus " : "") + "$" + Math.abs(n).toLocaleString("en-US"); }
  function strip(html) { var d = document.createElement("div"); d.innerHTML = html; return d.textContent; }
  function say(el) { if (HUB.voice) HUB.voice.say(el); }
  W.money = money;

  /* linked figures: tapping any element with data-link highlights every element sharing that value */
  function link(e) {
    var t = e.target.closest && e.target.closest("[data-link]");
    if (!t || (e.type === "keydown" && e.key !== "Enter" && e.key !== " ")) return;
    if (e.type === "keydown") e.preventDefault();
    var v = t.getAttribute("data-link"), on = !t.classList.contains("linked");
    document.querySelectorAll(".linked").forEach(function (x) { x.classList.remove("linked"); });
    if (on) document.querySelectorAll('[data-link="' + v + '"]').forEach(function (x) { x.classList.add("linked"); });
  }
  document.addEventListener("click", link);
  document.addEventListener("keydown", link);

  /* ---------- statement: a financial statement on ledger paper ----------
     { entity, title, date, cols: 1|2, rows: [{ l, a, b, ind, head, bold, ua, ub, uua, uub, gap }] }
     a = inner column, b = outer column; u* = single underline, uu* = double underline */
  W.statement = function (el, d) {
    var two = d.cols === 2 || d.rows.some(function (r) { return r.a !== undefined && r.b !== undefined; });
    var h = '<div class="statement' + (two ? " two" : "") + '">';
    h += '<div class="st-head" data-say="' + [d.entity, d.title, d.date].filter(Boolean).join(". ") + '."><b>' + (d.entity || "") + '</b><span>' + (d.title || "") + '</span>' + (d.date ? '<span>' + d.date + '</span>' : '') + '</div>';
    d.rows.forEach(function (r) {
      if (r.gap) { h += '<div class="st-row gap" aria-hidden="true"></div>'; return; }
      var amt = r.b !== undefined ? r.b : r.a;
      var sayRow = strip(r.l) + (amt !== undefined && amt !== "" ? ": " + (typeof amt === "number" ? sayMoney(amt) : amt) : "");
      h += '<div class="st-row' + (r.head ? " head" : "") + (r.bold ? " bold" : "") + '" style="--ind:' + (r.ind || 0) + '"' + (r.link ? ' data-link="' + r.link + '" tabindex="0" role="button"' : '') + ' data-say="' + sayRow.replace(/"/g, "&quot;") + '.">';
      h += '<span class="st-l">' + r.l + '</span>';
      if (two) h += '<span class="st-a"><span class="' + (r.uua ? "uu" : r.ua ? "u" : "") + '">' + money(r.a) + '</span></span>';
      h += '<span class="st-b"><span class="' + (r.uub ? "uu" : r.ub ? "u" : "") + '">' + money(two ? r.b : r.a !== undefined ? r.a : r.b) + '</span></span></div>';
    });
    el.innerHTML = h + '</div>';
  };

  /* ---------- journal: general journal entries ----------
     { entries: [{ date, lines: [[account, debit, credit]], memo }], step: true }
     step: reveal one entry at a time with a "Show next entry" button */
  function entryHtml(e) {
    var s = (e.date ? e.date + ": " : "") + e.lines.map(function (ln) {
      return (ln[1] ? "debit " : "credit ") + strip(ln[0]) + ", " + sayMoney(ln[1] || ln[2]);
    }).join("; ") + "." + (e.memo ? " " + strip(e.memo) : "");
    var h = '<tbody class="jr-entry" data-say="' + s.replace(/"/g, "&quot;") + '">';
    e.lines.forEach(function (ln, i) {
      h += '<tr><td class="jr-date">' + (i === 0 ? (e.date || "") : "") + '</td><td class="jr-acct' + (ln[2] ? " cr" : "") + '">' + ln[0] + '</td>' +
        '<td class="num">' + (ln[1] ? plain(ln[1]) : "") + '</td><td class="num">' + (ln[2] ? plain(ln[2]) : "") + '</td></tr>';
    });
    if (e.memo) h += '<tr class="jr-memo"><td></td><td colspan="3">' + e.memo + '</td></tr>';
    return h + '</tbody>';
  }
  W.journal = function (el, d) {
    var h = '<div class="scroll-x"><table class="journal"><thead><tr><th>Date</th><th>Accounts</th><th class="num">Debit</th><th class="num">Credit</th></tr></thead>';
    d.entries.forEach(function (e) { h += entryHtml(e); });
    h += '</table></div>';
    if (d.step) h += '<div class="w-ctl"><button type="button" class="btn small jr-next" data-voice-repeat>Show next entry</button><button type="button" class="btn ghost small jr-reset">Start over</button><span class="hint jr-count"></span></div>';
    el.innerHTML = h;
    if (!d.step) return;
    var bodies = el.querySelectorAll(".jr-entry"), shown = 1, next = el.querySelector(".jr-next");
    function paint() {
      bodies.forEach(function (b, i) { b.hidden = i >= shown; });
      next.disabled = shown >= bodies.length;
      el.querySelector(".jr-count").textContent = shown + " of " + bodies.length + " entries";
    }
    next.addEventListener("click", function () { if (shown < bodies.length) { shown++; paint(); say(bodies[shown - 1]); } });
    el.querySelector(".jr-reset").addEventListener("click", function () { shown = 1; paint(); });
    paint();
  };

  /* ---------- taccounts: T-accounts with running balance ----------
     { accounts: [{ name, dr: [[label, amt]], cr: [[label, amt]], open: [side, amt] }] } */
  W.taccounts = function (el, d) {
    var h = '<div class="taccts">';
    d.accounts.forEach(function (a) {
      var dr = (a.dr || []).reduce(function (s, x) { return s + x[1]; }, 0), cr = (a.cr || []).reduce(function (s, x) { return s + x[1]; }, 0);
      var bal = dr - cr, side = bal >= 0 ? "debit" : "credit";
      var rows = Math.max((a.dr || []).length, (a.cr || []).length);
      var sayT = a.name + " account. Debits: " + ((a.dr || []).map(function (x) { return (x[0] ? x[0] + ", " : "") + sayMoney(x[1]); }).join("; ") || "none") +
        ". Credits: " + ((a.cr || []).map(function (x) { return (x[0] ? x[0] + ", " : "") + sayMoney(x[1]); }).join("; ") || "none") +
        ". Balance: " + sayMoney(Math.abs(bal)) + (bal ? " " + side : "") + ".";
      h += '<div class="tacct" data-say="' + sayT.replace(/"/g, "&quot;") + '"><div class="t-name">' + a.name + '</div><div class="t-body">';
      for (var i = 0; i < rows; i++) {
        var l = (a.dr || [])[i], r = (a.cr || [])[i];
        h += '<div class="t-cell dr">' + (l ? '<span class="t-lbl">' + (l[0] || "") + '</span><span class="num">' + plain(l[1]) + '</span>' : '') + '</div>';
        h += '<div class="t-cell cr">' + (r ? '<span class="t-lbl">' + (r[0] || "") + '</span><span class="num">' + plain(r[1]) + '</span>' : '') + '</div>';
      }
      h += '<div class="t-cell dr bal">' + (bal > 0 ? '<span class="t-lbl">Bal.</span><span class="num">' + plain(bal) + '</span>' : '') + '</div>';
      h += '<div class="t-cell cr bal">' + (bal < 0 ? '<span class="t-lbl">Bal.</span><span class="num">' + plain(-bal) + '</span>' : '') + '</div>';
      h += '</div></div>';
    });
    el.innerHTML = h + '</div>';
  };

  /* ---------- equation: step transactions through Assets = Liabilities + Equity ----------
     { cols: [{ n: "Cash", s: "A"|"L"|"E" }], txns: [{ d: description, c: { "Cash": 10000, ... }, note }] } */
  W.equation = function (el, d) {
    var cols = d.cols, i = -1;
    var groups = ["A", "L", "E"].map(function (s) { return cols.filter(function (c) { return c.s === s; }); });
    var h = '<div class="eq-w"><div class="eq-now" aria-live="polite"></div><div class="scroll-x"><table class="eq-table"><thead><tr><th class="eq-tx">Transaction</th>';
    var names = { A: "Assets", L: "Liabilities", E: "Equity" };
    groups.forEach(function (g, gi) {
      g.forEach(function (c, ci) { h += '<th class="num eq-' + c.s + (ci === 0 && gi ? " eq-first" : "") + '">' + c.n + '</th>'; });
    });
    h += '</tr><tr class="eq-band"><th></th>';
    groups.forEach(function (g, gi) { if (g.length) h += '<th colspan="' + g.length + '" class="eq-' + "ALE"[gi] + (gi ? " eq-first" : "") + '">' + (gi === 1 ? "= " : gi === 2 ? "+ " : "") + names["ALE"[gi]] + '</th>'; });
    h += '</tr></thead><tbody>';
    d.txns.forEach(function (t, ti) {
      h += '<tr class="eq-row" data-i="' + ti + '"><td class="eq-tx">' + t.d + '</td>';
      groups.forEach(function (g, gi) { g.forEach(function (c, ci) { var v = t.c[c.n]; h += '<td class="num eq-' + c.s + (ci === 0 && gi ? " eq-first" : "") + (t.open ? "" : v > 0 ? " up" : v < 0 ? " down" : "") + '">' + (v ? (t.open ? "" : v > 0 ? "+" : "−") + plain(Math.abs(v)) : "") + '</td>'; }); });
      h += '</tr>';
    });
    h += '<tr class="eq-total"><td class="eq-tx">Balance</td>';
    groups.forEach(function (g, gi) { g.forEach(function (c, ci) { h += '<td class="num eq-' + c.s + (ci === 0 && gi ? " eq-first" : "") + '" data-col="' + c.n + '"></td>'; }); });
    h += '</tr></tbody></table></div>';
    h += '<div class="w-ctl"><button type="button" class="btn small eq-next" data-voice-repeat>Next transaction</button><button type="button" class="btn ghost small eq-all">Show all</button><button type="button" class="btn ghost small eq-reset">Start over</button></div></div>';
    el.innerHTML = h;
    var rows = el.querySelectorAll(".eq-row"), now = el.querySelector(".eq-now"), next = el.querySelector(".eq-next");
    function totals(upto) {
      var t = {};
      cols.forEach(function (c) { t[c.n] = 0; });
      d.txns.forEach(function (x, k) { if (k <= upto) Object.keys(x.c).forEach(function (n) { t[n] += x.c[n]; }); });
      return t;
    }
    function sums(t) {
      var s = { A: 0, L: 0, E: 0 };
      cols.forEach(function (c) { s[c.s] += t[c.n]; });
      return s;
    }
    function paint(speak) {
      rows.forEach(function (r, k) { r.hidden = k > i; r.classList.toggle("on", k === i); });
      var t = totals(i), s = sums(t);
      el.querySelectorAll(".eq-total td[data-col]").forEach(function (td) { td.textContent = plain(t[td.getAttribute("data-col")]); });
      next.disabled = i >= d.txns.length - 1;
      var tx = d.txns[i];
      var line = '<span class="eq-sum"><b>Assets ' + money(s.A) + '</b> = Liabilities ' + money(s.L) + ' + Equity ' + money(s.E) + ' <span class="eq-ok">' + (s.A === s.L + s.E ? "✓ in balance" : "✗ out of balance") + '</span></span>';
      now.innerHTML = i < 0 ? '<span class="hint">Press <b>Next transaction</b> to record the first one.</span>' + line
        : '<span class="eq-step">' + (i + 1) + ' of ' + d.txns.length + '</span><span class="eq-desc">' + tx.d + (tx.note ? ' <span class="hint">' + tx.note + '</span>' : '') + '</span>' + line;
      if (!speak) now.setAttribute("aria-live", "off"); else now.setAttribute("aria-live", "polite");
    }
    next.addEventListener("click", function () { if (i < d.txns.length - 1) { i++; paint(true); } });
    el.querySelector(".eq-all").addEventListener("click", function () { i = d.txns.length - 1; paint(true); });
    el.querySelector(".eq-reset").addEventListener("click", function () { i = -1; paint(false); });
    paint(false);
  };

  /* ---------- steps: a clickable process or sequence ----------
     { items: [{ t: title, b: html }], numbered: true } */
  W.steps = function (el, d) {
    var h = '<div class="steps-w"><ol class="st-dots">';
    d.items.forEach(function (it, i) { h += '<li><button type="button" class="st-dot" data-i="' + i + '"><span class="st-n">' + (d.numbered === false ? "" : i + 1) + '</span><span class="st-t">' + it.t + '</span></button></li>'; });
    h += '</ol><div class="st-body" aria-live="polite"></div><div class="w-ctl"><button type="button" class="btn ghost small st-prev">← Back</button><button type="button" class="btn small st-next">Next →</button></div></div>';
    el.innerHTML = h;
    var body = el.querySelector(".st-body"), cur = 0;
    function show(i, quiet) {
      cur = i;
      el.querySelectorAll(".st-dot").forEach(function (b, k) { b.classList.toggle("on", k === i); b.classList.toggle("done", k < i); });
      body.setAttribute("aria-live", quiet ? "off" : "polite");
      body.innerHTML = '<h4>' + (d.numbered === false ? "" : "Step " + (i + 1) + ": ") + d.items[i].t + '</h4><div>' + d.items[i].b + '</div>';
      el.querySelector(".st-prev").disabled = i === 0;
      el.querySelector(".st-next").disabled = i === d.items.length - 1;
    }
    el.addEventListener("click", function (e) {
      var b = e.target.closest(".st-dot");
      if (b) show(+b.getAttribute("data-i"));
      if (e.target.closest(".st-prev") && cur > 0) show(cur - 1);
      if (e.target.closest(".st-next") && cur < d.items.length - 1) show(cur + 1);
    });
    show(0, true);
  };

  /* ---------- worked: a problem with its solution revealed one step at a time ----------
     { q: html, steps: [html], answer: html } */
  W.worked = function (el, d) {
    var h = '<div class="wk"><div class="wk-q"><span class="wk-k">Problem</span>' + d.q + '</div><ol class="wk-steps">';
    d.steps.forEach(function (s) { h += '<li class="wk-step" hidden>' + s + '</li>'; });
    h += '</ol>' + (d.answer ? '<div class="wk-ans" hidden><span class="wk-k">Answer</span>' + d.answer + '</div>' : '');
    h += '<div class="w-ctl"><button type="button" class="btn small wk-next" data-voice-repeat>Show first step</button><button type="button" class="btn ghost small wk-reset">Hide solution</button></div></div>';
    el.innerHTML = h;
    var items = Array.prototype.slice.call(el.querySelectorAll(".wk-step")), ans = el.querySelector(".wk-ans"), btn = el.querySelector(".wk-next"), n = 0;
    var all = items.concat(ans ? [ans] : []);
    function paint() {
      all.forEach(function (x, i) { x.hidden = i >= n; });
      btn.disabled = n >= all.length;
      btn.textContent = n === 0 ? "Show first step" : n >= all.length ? "Solution complete" : n === items.length ? "Show answer" : "Show next step";
    }
    btn.addEventListener("click", function () { if (n < all.length) { n++; paint(); say(all[n - 1]); } });
    el.querySelector(".wk-reset").addEventListener("click", function () { n = 0; paint(); });
    paint();
  };

  /* ---------- calc: sliders feeding a lesson-defined calculation ----------
     { inputs: [{ id, label, min, max, step, value, fmt: "$"|"%"|"n"|"yr" }],
       run: function (v, money) { return { html: "...", say: "one-sentence summary" }; } } */
  W.calc = function (el, d, key) {
    var px = "c-" + (key || "x") + "-";
    var h = '<div class="calc"><div class="calc-in">';
    d.inputs.forEach(function (inp) {
      h += '<div class="calc-field"><div class="calc-top"><label for="' + px + inp.id + '">' + inp.label + '</label><output class="num" id="o' + px + inp.id + '"></output></div>' +
        '<input type="range" id="' + px + inp.id + '" min="' + inp.min + '" max="' + inp.max + '" step="' + (inp.step || 1) + '" value="' + inp.value + '"></div>';
    });
    h += '</div><div class="calc-out"><div class="calc-res"></div><p class="calc-say verdict" aria-live="polite"></p></div></div>';
    el.innerHTML = h;
    function fmt(inp, v) { return inp.fmt === "$" ? money(v) : inp.fmt === "%" ? v + "%" : inp.fmt === "yr" ? v + (v === 1 ? " year" : " years") : String(v); }
    function run() {
      var v = {};
      d.inputs.forEach(function (inp) { v[inp.id] = +el.querySelector("#" + px + inp.id).value; el.querySelector("#o" + px + inp.id).textContent = fmt(inp, v[inp.id]); });
      var r = d.run(v, money);
      el.querySelector(".calc-res").innerHTML = r.html;
      el.querySelector(".calc-say").innerHTML = r.say;
    }
    el.addEventListener("input", run);
    run();
  };
})();

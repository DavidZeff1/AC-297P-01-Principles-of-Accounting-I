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
  function entryHtml(e, noDate) {
    var s = (e.date ? e.date + ": " : "") + e.lines.map(function (ln) {
      return (ln[1] ? "debit " : "credit ") + strip(ln[0]) + ", " + sayMoney(ln[1] || ln[2]);
    }).join("; ") + "." + (e.memo ? " " + strip(e.memo) : "");
    var h = '<tbody class="jr-entry" data-say="' + s.replace(/"/g, "&quot;") + '">';
    e.lines.forEach(function (ln, i) {
      h += '<tr>' + (noDate ? '' : '<td class="jr-date">' + (i === 0 ? (e.date || "") : "") + '</td>') + '<td class="jr-acct' + (ln[2] ? " cr" : "") + '">' + ln[0] + '</td>' +
        '<td class="num">' + (ln[1] ? plain(ln[1]) : "") + '</td><td class="num">' + (ln[2] ? plain(ln[2]) : "") + '</td></tr>';
    });
    if (e.memo) h += '<tr class="jr-memo">' + (noDate ? '' : '<td></td>') + '<td colspan="3">' + e.memo + '</td></tr>';
    return h + '</tbody>';
  }
  W.journal = function (el, d) {
    var noDate = d.entries.every(function (e) { return !e.date; });
    var h = '<div class="scroll-x"><table class="journal' + (noDate ? ' nodate' : '') + '"><thead><tr>' + (noDate ? '' : '<th>Date</th>') + '<th>Accounts</th><th class="num">Debit</th><th class="num">Credit</th></tr></thead>';
    d.entries.forEach(function (e) { h += entryHtml(e, noDate); });
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

  /* ---------- ledger: one general ledger account with a running balance ----------
     { account, no, open: [date, amount], rows: [[date, description, debit, credit]], normal: "dr"|"cr", swap: true }
     swap: adds a toggle between "Increase/Decrease" and "Debit/Credit" column labels */
  W.ledger = function (el, d) {
    var normal = d.normal || "dr", bal = d.open ? d.open[1] : 0;
    var h = '<div class="ledger-w">' + (d.swap ? '<div class="seg ledger-swap" role="group" aria-label="Column labels"><button type="button" data-voice-state class="on" data-lab="dc">Debit / Credit</button><button type="button" data-voice-state data-lab="id">Increase / Decrease</button></div>' : '');
    h += '<div class="scroll-x"><table class="ledger"><caption><b>' + d.account + '</b>' + (d.no ? ' <span class="hint">Account no. ' + d.no + '</span>' : '') + '</caption><thead><tr><th>Date</th><th>Description</th><th class="num lab-dr">Debit</th><th class="num lab-cr">Credit</th><th class="num">Balance</th></tr></thead><tbody>';
    if (d.open) h += '<tr data-say="' + d.open[0] + ': beginning balance, ' + sayMoney(bal) + '."><td>' + d.open[0] + '</td><td>Balance</td><td></td><td></td><td class="num">' + plain(bal) + '</td></tr>';
    d.rows.forEach(function (r) {
      bal += normal === "dr" ? (r[2] || 0) - (r[3] || 0) : (r[3] || 0) - (r[2] || 0);
      var sy = r[0] + ", " + strip(r[1]) + ": " + (r[2] ? "debit " + sayMoney(r[2]) : "credit " + sayMoney(r[3])) + ". Balance " + sayMoney(bal) + ".";
      h += '<tr data-say="' + sy.replace(/"/g, "&quot;") + '"><td>' + r[0] + '</td><td>' + r[1] + '</td><td class="num">' + (r[2] ? plain(r[2]) : "") + '</td><td class="num">' + (r[3] ? plain(r[3]) : "") + '</td><td class="num">' + plain(bal) + '</td></tr>';
    });
    h += '</tbody></table></div><p class="ledger-note hint" aria-live="polite"></p></div>';
    el.innerHTML = h;
    if (!d.swap) return;
    var inc = normal === "dr" ? ["Increase", "Decrease"] : ["Decrease", "Increase"];
    el.querySelector(".ledger-swap").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var dc = b.getAttribute("data-lab") === "dc";
      el.querySelectorAll(".ledger-swap button").forEach(function (x) { x.classList.toggle("on", x === b); });
      el.querySelector(".lab-dr").textContent = dc ? "Debit" : inc[0];
      el.querySelector(".lab-cr").textContent = dc ? "Credit" : inc[1];
      el.querySelector(".ledger-note").textContent = dc ? "Accountants label the columns debit and credit." : "For an asset like cash, the debit column holds the increases and the credit column holds the decreases.";
    });
  };

  /* ---------- trial: a trial balance ----------
     { entity, date, rows: [[account, debit, credit]], title } */
  W.trial = function (el, d) {
    var dr = 0, cr = 0;
    var h = '<div class="statement trial"><div class="st-head" data-say="' + d.entity + '. ' + (d.title || "Trial Balance") + '. ' + d.date + '."><b>' + d.entity + '</b><span>' + (d.title || "Trial Balance") + '</span><span>' + d.date + '</span></div>';
    h += '<div class="st-row tb-head" aria-hidden="true"><span class="st-l"></span><span class="st-a">Debits</span><span class="st-b">Credits</span></div>';
    d.rows.forEach(function (r) {
      dr += r[1] || 0; cr += r[2] || 0;
      h += '<div class="st-row" data-say="' + strip(r[0]) + ': ' + (r[1] ? "debit " + sayMoney(r[1]) : "credit " + sayMoney(r[2])) + '."><span class="st-l">' + r[0] + '</span><span class="st-a">' + (r[1] ? money(r[1]) : "") + '</span><span class="st-b">' + (r[2] ? money(r[2]) : "") + '</span></div>';
    });
    h += '<div class="st-row bold" data-say="Totals: debits ' + sayMoney(dr) + ', credits ' + sayMoney(cr) + '. ' + (dr === cr ? "In balance." : "Out of balance.") + '"><span class="st-l">Totals</span><span class="st-a"><span class="uu">' + money(dr) + '</span></span><span class="st-b"><span class="uu">' + money(cr) + '</span></span></div></div>';
    el.innerHTML = h;
  };

  /* ---------- worksheet: the 12-column worksheet, filled one column pair at a time ----------
     { entity, date, rows: [{ n: name, t: "A"|"XA"|"L"|"E"|"RE"|"D"|"R"|"X", tb: [dr, cr], adj: [dr, cr], keys: "a,b" }] } */
  W.worksheet = function (el, d) {
    var G = ["Trial balance", "Adjustments", "Adjusted trial balance", "Income statement", "Retained earnings", "Balance sheet"];
    var tot = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var body = "";
    d.rows.forEach(function (r) {
      var nd = r.tb[0] - r.tb[1] + r.adj[0] - r.adj[1], at = nd >= 0 ? [nd, 0] : [0, -nd];
      var dest = (r.t === "R" || r.t === "X") ? 3 : (r.t === "RE" || r.t === "D") ? 4 : 5;
      var cells = [r.tb[0], r.tb[1], r.adj[0], r.adj[1], at[0], at[1], 0, 0, 0, 0, 0, 0];
      cells[dest * 2] = at[0]; cells[dest * 2 + 1] = at[1];
      cells.forEach(function (v, i) { tot[i] += v; });
      body += '<tr><td class="ws-n">' + r.n + '</td>' + cells.map(function (v, i) {
        var g = Math.floor(i / 2), key = (g === 1 && v && r.keys) ? '<span class="ws-key">(' + r.keys + ')</span> ' : "";
        return '<td class="num" data-g="' + g + '">' + (v ? key + plain(v) : "") + '</td>';
      }).join("") + '</tr>';
    });
    var ni = tot[7] - tot[6], ret = tot[9] + Math.max(ni, 0) - tot[8] - Math.max(-ni, 0);
    function row(label, cells, cls) {
      return '<tr class="' + (cls || "") + '"><td class="ws-n">' + label + '</td>' + cells.map(function (v, i) {
        var g = Math.floor(i / 2); return '<td class="num" data-g="' + g + '" data-gb="' + (g >= 3 ? 6 : g) + '">' + (v === null ? "" : plain(v)) + '</td>'; }).join("") + '</tr>';
    }
    var sub = tot.slice();
    var foot = row("Totals", sub, "ws-tot");
    var niRow = [null, null, null, null, null, null, ni >= 0 ? ni : null, ni < 0 ? -ni : null, ni < 0 ? -ni : null, ni >= 0 ? ni : null, null, null];
    foot += row(ni >= 0 ? "Net income" : "Net loss", niRow, "ws-ni");
    var t2 = [null, null, null, null, null, null, sub[6] + (niRow[6] || 0), sub[7] + (niRow[7] || 0), sub[8] + (niRow[8] || 0), sub[9] + (niRow[9] || 0), null, null];
    foot += row("Subtotals", t2, "ws-tot");
    foot += row("Ending retained earnings", [null, null, null, null, null, null, null, null, ret, null, null, ret], "ws-ni");
    foot += row("Totals", [null, null, null, null, null, null, t2[6], t2[7], t2[8] + ret, t2[9], sub[10], sub[11] + ret], "ws-tot ws-final");
    var head = '<tr><th rowspan="2">Account</th>' + G.map(function (g, i) { return '<th colspan="2" data-g="' + i + '">' + g + '</th>'; }).join("") + '</tr><tr>' +
      G.map(function (g, i) { return '<th class="num" data-g="' + i + '">Dr</th><th class="num" data-g="' + i + '">Cr</th>'; }).join("") + '</tr>';
    var say = [
      "Start with the unadjusted trial balance.",
      "Enter the adjusting entries, keyed by letter, in the adjustments columns.",
      "Combine the first two pairs of columns into the adjusted trial balance.",
      "Extend revenues and expenses to the income statement columns.",
      "Extend dividends and beginning retained earnings to the retained earnings columns.",
      "Extend assets, liabilities, and capital stock to the balance sheet columns.",
      (ni >= 0 ? "Net income of $" + ni.toLocaleString() + " balances the income statement columns and is carried to retained earnings as a credit." : "The net loss of $" + (-ni).toLocaleString() + " is a credit in the income statement columns and a debit in retained earnings.") + " Ending retained earnings of $" + ret.toLocaleString() + " moves to the balance sheet, and every pair balances."
    ];
    el.innerHTML = '<div class="ws-w"><p class="verdict ws-say" aria-live="polite"></p><div class="scroll-x"><table class="ws"><caption>' + (d.entity || "") + ' · Worksheet · ' + (d.date || "") + '</caption><thead>' + head + '</thead><tbody>' + body + foot + '</tbody></table></div>' +
      '<div class="w-ctl"><button type="button" class="btn small ws-next" data-voice-repeat>Fill next columns</button><button type="button" class="btn ghost small ws-all">Show completed worksheet</button><button type="button" class="btn ghost small ws-reset">Start over</button></div></div>';
    var step = 0, tbl = el.querySelector(".ws"), sayEl = el.querySelector(".ws-say");
    function paint(speak) {
      tbl.querySelectorAll("[data-g]").forEach(function (c) {
        var g = +(c.getAttribute("data-gb") || c.getAttribute("data-g"));
        c.classList.toggle("off", g > step && !(c.tagName === "TH"));
        c.classList.toggle("now", g === step && step > 0 && c.tagName === "TD");
      });
      sayEl.setAttribute("aria-live", speak ? "polite" : "off");
      sayEl.textContent = "Step " + (step + 1) + " of 7: " + say[step];
      el.querySelector(".ws-next").disabled = step >= 6;
    }
    el.querySelector(".ws-next").addEventListener("click", function () { if (step < 6) { step++; paint(true); } });
    el.querySelector(".ws-all").addEventListener("click", function () { step = 6; paint(true); });
    el.querySelector(".ws-reset").addEventListener("click", function () { step = 0; paint(false); });
    paint(false);
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

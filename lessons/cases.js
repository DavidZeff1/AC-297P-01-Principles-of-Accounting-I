/* Running examples shared by several lessons. Loaded before the lesson files. */
HUB.cases = HUB.cases || {};

/* Xao Corporation, January (chapter 2): journal → ledger → trial balance → T-accounts.
   Cash nets to $26,300 as in the reading; Jan. 28 is the compound entry. */
HUB.cases.xao = (function () {
  var J = [
    { date: "Jan. 2", page: 1, lines: [["Cash", 25000, 0], ["Capital Stock", 0, 25000]], memo: "Issued stock for cash" },
    { date: "Jan. 4", page: 1, lines: [["Advertising Expense", 2000, 0], ["Cash", 0, 2000]], memo: "Paid for newspaper advertising" },
    { date: "Jan. 8", page: 1, lines: [["Cash", 4000, 0], ["Service Revenue", 0, 4000]], memo: "Provided services for cash" },
    { date: "Jan. 11", page: 1, lines: [["Utilities Expense", 800, 0], ["Accounts Payable", 0, 800]], memo: "Received the January utility bill" },
    { date: "Jan. 15", page: 1, lines: [["Accounts Receivable", 7000, 0], ["Service Revenue", 0, 7000]], memo: "Provided services on account" },
    { date: "Jan. 18", page: 2, lines: [["Accounts Payable", 500, 0], ["Cash", 0, 500]], memo: "Paid part of the utility bill" },
    { date: "Jan. 25", page: 2, lines: [["Cash", 4800, 0], ["Accounts Receivable", 0, 4800]], memo: "Collected from customers on account" },
    { date: "Jan. 28", page: 2, lines: [["Land", 30000, 0], ["Cash", 0, 5000], ["Notes Payable", 0, 25000]], memo: "Bought land: $5,000 down, signed a note for the rest" }
  ];
  /* chart of accounts: name, number, type, normal side */
  var CHART = [
    ["Cash", 101, "Asset", "dr"], ["Accounts Receivable", 102, "Asset", "dr"], ["Land", 103, "Asset", "dr"],
    ["Accounts Payable", 201, "Liability", "cr"], ["Notes Payable", 202, "Liability", "cr"],
    ["Capital Stock", 301, "Equity", "cr"], ["Service Revenue", 401, "Revenue", "cr"],
    ["Advertising Expense", 501, "Expense", "dr"], ["Utilities Expense", 502, "Expense", "dr"]
  ];
  function ledger(name) {
    var c = CHART.filter(function (x) { return x[0] === name; })[0];
    var rows = [];
    J.forEach(function (e) {
      e.lines.forEach(function (ln) { if (ln[0] === name) rows.push([e.date, "Journal page " + e.page, ln[1], ln[2]]); });
    });
    return { account: name, no: c[1], normal: c[3], rows: rows };
  }
  function balance(name) {
    var c = CHART.filter(function (x) { return x[0] === name; })[0], dr = 0, cr = 0;
    J.forEach(function (e) { e.lines.forEach(function (ln) { if (ln[0] === name) { dr += ln[1]; cr += ln[2]; } }); });
    return c[3] === "dr" ? dr - cr : cr - dr;
  }
  function journal(step) { return { step: !!step, entries: J.map(function (e) { return { date: e.date, lines: e.lines, memo: e.memo }; }) }; }
  function tacct(name) {
    var a = { name: name, dr: [], cr: [] };
    J.forEach(function (e) { e.lines.forEach(function (ln) { if (ln[0] === name) { if (ln[1]) a.dr.push([e.date, ln[1]]); else a.cr.push([e.date, ln[2]]); } }); });
    return a;
  }
  function trial() {
    return { entity: "Xao Corporation", date: "January 31, 20X1", rows: CHART.map(function (c) {
      var b = balance(c[0]); return c[3] === "dr" ? [c[0], b, 0] : [c[0], 0, b];
    }) };
  }
  return { entries: J, chart: CHART, ledger: ledger, balance: balance, journal: journal, tacct: tacct, trial: trial };
})();

/* England Tours Company, 20X3 (chapter 4). Anchors from the reading: revenue $32,800, expenses $30,200,
   net income $2,600, dividends $1,000, ending retained earnings $1,600 (first year, no beginning balance). */
HUB.cases.england = (function () {
  /* [account, type, normal side, unadjusted balance] in trial balance order */
  var A = [
    ["Cash", "A", "dr", 8100], ["Accounts Receivable", "A", "dr", 2500], ["Supplies", "A", "dr", 1800],
    ["Prepaid Insurance", "A", "dr", 3600], ["Equipment", "A", "dr", 15000], ["Accumulated Depreciation", "XA", "cr", 0],
    ["Accounts Payable", "L", "cr", 2300], ["Unearned Revenue", "L", "cr", 4000], ["Wages Payable", "L", "cr", 0],
    ["Interest Payable", "L", "cr", 0], ["Note Payable", "L", "cr", 10000], ["Capital Stock", "E", "cr", 5000],
    ["Retained Earnings", "E", "cr", 0], ["Dividends", "D", "dr", 1000], ["Revenue", "R", "cr", 30300],
    ["Wages Expense", "X", "dr", 14000], ["Rent Expense", "X", "dr", 4800], ["Utilities Expense", "X", "dr", 800],
    ["Supplies Expense", "X", "dr", 0], ["Insurance Expense", "X", "dr", 0], ["Depreciation Expense", "X", "dr", 0], ["Interest Expense", "X", "dr", 0]
  ];
  var ADJ = [
    { key: "a", date: "Dec. 31", lines: [["Supplies Expense", 1400, 0], ["Supplies", 0, 1400]], memo: "(a) Supplies used: $1,800 on hand less $400 counted" },
    { key: "b", date: "Dec. 31", lines: [["Insurance Expense", 1800, 0], ["Prepaid Insurance", 0, 1800]], memo: "(b) Six months of a one-year policy bought July 1 expired" },
    { key: "c", date: "Dec. 31", lines: [["Depreciation Expense", 5000, 0], ["Accumulated Depreciation", 0, 5000]], memo: "(c) Depreciation: $15,000 equipment over 3 years" },
    { key: "d", date: "Dec. 31", lines: [["Unearned Revenue", 1500, 0], ["Revenue", 0, 1500]], memo: "(d) Tours delivered that customers had paid for in advance" },
    { key: "e", date: "Dec. 31", lines: [["Accounts Receivable", 1000, 0], ["Revenue", 0, 1000]], memo: "(e) Tours given in December, not yet billed" },
    { key: "f", date: "Dec. 31", lines: [["Wages Expense", 2000, 0], ["Wages Payable", 0, 2000]], memo: "(f) Wages earned by guides, not yet paid" },
    { key: "g", date: "Dec. 31", lines: [["Interest Expense", 400, 0], ["Interest Payable", 0, 400]], memo: "(g) Interest accrued on the note" }
  ];
  function adj(name) {
    var dr = 0, cr = 0, keys = [];
    ADJ.forEach(function (e) { e.lines.forEach(function (l) { if (l[0] === name) { dr += l[1]; cr += l[2]; keys.push(e.key); } }); });
    return { dr: dr, cr: cr, keys: keys };
  }
  function adjusted(name) {
    var a = A.filter(function (x) { return x[0] === name; })[0], j = adj(name);
    return a[2] === "dr" ? a[3] + j.dr - j.cr : a[3] + j.cr - j.dr;
  }
  function tb(adjustedToo, skipZero) {
    return A.filter(function (a) { return !skipZero || (adjustedToo ? adjusted(a[0]) : a[3]); }).map(function (a) {
      var v = adjustedToo ? adjusted(a[0]) : a[3];
      return a[2] === "dr" ? [a[0], v, 0] : [a[0], 0, v];
    });
  }
  return { accounts: A, adjustments: ADJ, adj: adj, adjusted: adjusted, tb: tb,
    revenue: 32800, expenses: 30200, netIncome: 2600, dividends: 1000, endingRE: 1600 };
})();

/* Embassy Corporation (chapter 14): stockholders' equity, reconstructed around the reading's stated figures
   (preferred 200,000 × $100 par 8% cumulative; common 400,000 × $1 par; legal capital $20,400,000; total paid-in $56,400,000) */
HUB.cases.embassy = (function () {
  /* opts: { treasury: true } adds 10,000 common shares reacquired at $60; { split: 4 } applies a 4-for-1 split */
  function equity(opts) {
    opts = opts || {};
    var sp = opts.split || 1, par = 1 / sp, issued = 400000 * sp, auth = 1000000 * sp, tr = opts.treasury;
    var parTxt = par === 1 ? "$1" : "$" + par.toFixed(2);
    var rows = [
      { l: "Paid-in capital", head: true },
      { l: "Preferred stock, $100 par, 8% cumulative, 500,000 shares authorized, 200,000 shares issued and outstanding", a: 20000000, ind: 1 },
      { l: "Common stock, " + parTxt + " par, " + auth.toLocaleString() + " shares authorized, " + issued.toLocaleString() + " shares issued" + (tr ? ", " + (issued - 10000 * sp).toLocaleString() + " outstanding" : " and outstanding"), a: 400000, ind: 1, mark: sp > 1 },
      { l: "Paid-in capital in excess of par: preferred", a: 1000000, ind: 1 },
      { l: "Paid-in capital in excess of par: common", a: 35000000, ind: 1, ua: true },
      { l: "Total paid-in capital", b: 56400000, ind: 1 },
      { l: "Retained earnings", b: 43600000, ub: !tr },
    ];
    if (tr) {
      rows.push({ l: "Subtotal", b: 100000000, ind: 1 });
      rows.push({ l: "Less: treasury stock, 10,000 common shares at cost", b: -600000, ub: true, mark: true });
    }
    rows.push({ l: "Total stockholders’ equity", b: tr ? 99400000 : 100000000, bold: true, uub: true });
    return { entity: "Embassy Corporation", title: "Stockholders’ Equity", date: "December 31, 20X5", cols: 2, rows: rows };
  }
  return { equity: equity, prefDiv: 1600000 };
})();

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

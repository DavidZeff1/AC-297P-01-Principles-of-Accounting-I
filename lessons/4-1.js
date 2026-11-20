/* Lesson 4.1 · Preparing Financial Statements */
(function () {
  var E = HUB.cases.england;
  var TYPE = { "Retained Earnings": "RE", "Capital Stock": "E" };
  function wsRows() {
    return E.accounts.filter(function (a) { return a[3] || E.adj(a[0]).keys.length; }).map(function (a) {
      var j = E.adj(a[0]);
      return { n: a[0], t: TYPE[a[0]] || a[1], tb: a[2] === "dr" ? [a[3], 0] : [0, a[3]], adj: [j.dr, j.cr], keys: j.keys.join(",") };
    });
  }
  function v(n) { return E.adjusted(n); }

  HUB.register("4-1", {
    summary: "Put Chapter 3’s adjustments to work: take England Tours from an unadjusted trial balance through adjusting entries to an adjusted trial balance and finished statements, then do it all on a worksheet.",
    objectives: [
      "Explain how adjusting entries are proposed, approved, and entered",
      "Prepare an adjusted trial balance",
      "Prepare financial statements from the adjusted trial balance",
      "Complete a 12-column worksheet, including a net loss case"
    ],
    html: `
<section class="sec" data-toc="The adjusting process">
  <div class="eyebrow kind">Concept</div>
  <h2>From trial balance to adjusted trial balance</h2>
  <p>England Tours Company began operating early in 20X3. To prepare statements for the year ended December 31, 20X3, it needs adjusting entries. Statements built from the <b>unadjusted</b> trial balance would be incomplete and incorrect.</p>
  <p>In practice, someone who knows the business well reviews the trial balance and lists the needed adjustments. Not everyone should be allowed to enter year-end adjustments, or errors and rogue entries creep in. Proposed entries are documented on a form, often called a <b>journal voucher</b>, and approved by the chief accountant or controller. The approved vouchers are the supporting documents for entering the adjustments.</p>
  <div data-widget="steps" data-key="flow"></div>
</section>

<section class="sec" data-toc="England’s adjustments">
  <div class="eyebrow kind try">Example</div>
  <h2>England Tours’ adjusting entries</h2>
  <p class="hint">The numbers are assumed. If any entry is unclear, review lesson 3.5.</p>
  <div class="grid2">
    <div data-widget="trial" data-key="unadj"></div>
    <div data-widget="journal" data-key="adj"></div>
  </div>
  <p>After posting the adjustments, the <b>adjusted trial balance</b> still balances, now at $60,000. New accounts appear (accumulated depreciation, two payables, four expenses), and several balances have changed.</p>
  <div data-widget="trial" data-key="adjTb"></div>
</section>

<section class="sec" data-toc="The statements">
  <div class="eyebrow kind">Example</div>
  <h2>Statements straight from the adjusted trial balance</h2>
  <p>The adjusted trial balance is usually all you need. Trace each amount from it into the statements. <b>Tap a highlighted figure</b> to follow it.</p>
  <div class="grid3">
    <div data-widget="statement" data-key="is"></div>
    <div data-widget="statement" data-key="re"></div>
    <div data-widget="statement" data-key="bs"></div>
  </div>
  <div class="callout analogy"><div class="label">Why learn it if software does it?</div><p>Once adjustments are entered, every accounting package races through the rest. That’s like saying you don’t need to understand addition because you own a calculator. Understanding how amounts flow into the statements is still essential.</p></div>
</section>

<section class="sec" data-toc="The worksheet">
  <div class="eyebrow kind try">Try it</div>
  <h2>The worksheet approach</h2>
  <p>Sometimes you want adjusted statements <b>without</b> actually updating the journal and ledger: a manager wants monthly reports even though adjustments are only booked annually, or an auditor wants to see the effect of proposed adjustments first. A <b>worksheet</b> does this. Fill it in one pair of columns at a time.</p>
  <div class="panel"><div data-widget="worksheet" data-key="ws"></div></div>
  <div class="grid2">
    <div class="tile"><span class="k">How amounts are extended</span><p>Each adjusted balance moves to exactly one pair of columns, on the same side. Cash (a debit) goes to the balance sheet debit column; Revenue (a credit) goes to the income statement credit column.</p></div>
    <div class="tile alt"><span class="k">Balancing the bottom</span><p>Income statement credits ($32,800) exceed debits ($30,200), so net income is <b>$2,600</b>, entered as a debit to balance that pair and as a credit in retained earnings. Retained earnings credits ($2,600) exceed debits ($1,000) by <b>$1,600</b>, which is debited there and credited in the balance sheet columns.</p></div>
  </div>
</section>

<section class="sec" data-toc="Other cases">
  <div class="eyebrow kind">Concept</div>
  <h2>A beginning balance, and a net loss</h2>
  <div data-widget="steps" data-key="variants"></div>
</section>

<section class="sec" data-toc="Key terms">
  <div class="eyebrow kind">Review</div>
  <h2>Key terms</h2>
  <div data-widget="cards" data-key="terms"></div>
</section>

<section class="sec" data-toc="Practice check">
  <div class="eyebrow kind check">Check</div>
  <h2>Did you learn it?</h2>
  <p>Score 75% or better to mark this lesson complete.</p>
  <div class="panel"><div data-widget="quiz"></div></div>
</section>

<section class="sec" data-toc="Recap">
  <div class="eyebrow kind">Recap</div>
  <h2>Remember this</h2>
  <ol class="recap">
    <li><span>Trial balance → adjusting entries (approved on journal vouchers) → posting → <b>adjusted trial balance</b> → financial statements.</span></li>
    <li><span>Statements prepared from an unadjusted trial balance would be incomplete and incorrect.</span></li>
    <li><span>A <b>worksheet</b> produces adjusted statements without updating the journal and ledger: trial balance, adjustments, adjusted trial balance, then income statement, retained earnings, and balance sheet columns.</span></li>
    <li><span>Net income is a debit in the income statement columns and a credit in retained earnings; a net loss is the reverse.</span></li>
  </ol>
</section>`,

    data: {
      flow: { items: [
        { t: "Trial balance", b: "<p>Prepare the unadjusted trial balance.</p>" },
        { t: "Find adjustments", b: "<p>Someone who knows the business analyzes it and lists needed adjustments on journal vouchers.</p>" },
        { t: "Approve", b: "<p>The controller reviews and approves the vouchers.</p>" },
        { t: "Journalize and post", b: "<p>Enter the approved adjusting entries and post them to the ledger.</p>" },
        { t: "Adjusted trial balance", b: "<p>Prove debits still equal credits, then prepare the statements.</p>" }
      ]},
      unadj: { entity: "England Tours Company", title: "Trial Balance (unadjusted)", date: "December 31, 20X3", rows: E.tb(false, true) },
      adj: { entries: E.adjustments.map(function (e) { return { date: e.date, lines: e.lines, memo: e.memo }; }), step: true },
      adjTb: { entity: "England Tours Company", title: "Adjusted Trial Balance", date: "December 31, 20X3", rows: E.tb(true, true) },
      is: { entity: "England Tours Company", title: "Income Statement", date: "For the Year Ended December 31, 20X3", cols: 2, rows: [
        { l: "Revenue", b: v("Revenue") },
        { l: "Expenses", head: true },
        { l: "Wages", a: v("Wages Expense"), ind: 1 },
        { l: "Rent", a: v("Rent Expense"), ind: 1 },
        { l: "Depreciation", a: v("Depreciation Expense"), ind: 1 },
        { l: "Insurance", a: v("Insurance Expense"), ind: 1 },
        { l: "Supplies", a: v("Supplies Expense"), ind: 1 },
        { l: "Utilities", a: v("Utilities Expense"), ind: 1 },
        { l: "Interest", a: v("Interest Expense"), ind: 1, ua: true },
        { l: "Total expenses", b: E.expenses, ub: true },
        { l: "Net income", b: E.netIncome, bold: true, uub: true, link: "eni" }
      ]},
      re: { entity: "England Tours Company", title: "Statement of Retained Earnings", date: "For the Year Ended December 31, 20X3", rows: [
        { l: "Retained earnings, January 1", a: 0 },
        { l: "Plus: Net income", a: E.netIncome, ua: true, link: "eni" },
        { l: "Subtotal", a: E.netIncome, ind: 1 },
        { l: "Less: Dividends", a: -E.dividends, ua: true },
        { l: "Retained earnings, December 31", a: E.endingRE, bold: true, uua: true, link: "ere" }
      ]},
      bs: { entity: "England Tours Company", title: "Balance Sheet", date: "December 31, 20X3", cols: 2, rows: [
        { l: "Assets", head: true },
        { l: "Cash", a: v("Cash"), ind: 1 },
        { l: "Accounts receivable", a: v("Accounts Receivable"), ind: 1 },
        { l: "Supplies", a: v("Supplies"), ind: 1 },
        { l: "Prepaid insurance", a: v("Prepaid Insurance"), ind: 1 },
        { l: "Equipment", a: 15000, ind: 1 },
        { l: "Less: Accumulated depreciation", a: -5000, ind: 1, ua: true },
        { l: "Total assets", b: 23800, bold: true, uub: true },
        { l: "Liabilities", head: true },
        { l: "Accounts payable", a: 2300, ind: 1 },
        { l: "Unearned revenue", a: 2500, ind: 1 },
        { l: "Wages payable", a: 2000, ind: 1 },
        { l: "Interest payable", a: 400, ind: 1 },
        { l: "Note payable", a: 10000, ind: 1, ua: true },
        { l: "Total liabilities", b: 17200 },
        { l: "Stockholders’ equity", head: true },
        { l: "Capital stock", a: 5000, ind: 1 },
        { l: "Retained earnings", a: E.endingRE, ind: 1, ua: true, link: "ere" },
        { l: "Total stockholders’ equity", b: 6600, ub: true },
        { l: "Total liabilities and equity", b: 23800, bold: true, uub: true }
      ]},
      ws: { entity: "England Tours Company", date: "December 31, 20X3", rows: wsRows() },
      variants: { numbered: false, items: [
        { t: "20X4: a beginning balance", b: "<p>The $1,600 ending retained earnings from 20X3 becomes the <b>beginning</b> balance in 20X4. It appears in the trial balance as a credit and is extended to the <b>retained earnings credit</b> column, where it combines with the year’s income and dividends.</p>" },
        { t: "20X5: a net loss", b: "<p>Suppose England’s 20X5 expenses are $39,600 and revenues are $38,600. The income statement columns show more debits than credits: a <b>$1,000 net loss</b>.</p><p>The balancing amount goes in as a <b>credit</b> in the income statement columns and a <b>debit</b> in the retained earnings columns, reducing retained earnings.</p>" }
      ]}
    },

    cards: {
      terms: [
        { term: "Journal voucher", back: "A form documenting a proposed entry, approved by the controller before it’s entered." },
        { term: "Adjusted trial balance", back: "The trial balance after adjusting entries; the basis for the financial statements." },
        { term: "Worksheet", back: "A columnar tool to produce adjusted statements without updating the journal and ledger." },
        { term: "Extending", back: "Carrying each adjusted balance to the proper financial statement columns on the worksheet." },
        { term: "Net income on the worksheet", back: "Debit in the income statement columns, credit in the retained earnings columns." }
      ]
    },

    quiz: [
      { q: "Financial statements prepared from an unadjusted trial balance would be:", options: ["Complete and correct", "Incomplete and incorrect", "Required by GAAP", "The same as adjusted statements"], answer: 1, why: "Adjustments are needed to bring the accounts up to date." },
      { q: "A journal voucher is:", options: ["A customer invoice", "A form documenting a proposed entry for approval", "The post-closing trial balance", "A special journal"], answer: 1, why: "Approved vouchers authorize entering the adjustments." },
      { q: "Financial statements are ordinarily prepared directly from the:", options: ["Unadjusted trial balance", "Adjusted trial balance", "Chart of accounts", "Source documents"], answer: 1, why: "The adjusted trial balance contains every updated balance." },
      { q: "One reason to use a worksheet is to:", options: ["Replace the general ledger", "Prepare adjusted statements without updating the journal and ledger", "Record source documents", "Close the accounts"], answer: 1, why: "Useful for monthly reports or reviewing proposed adjustments." },
      { q: "On the worksheet, Revenue is extended to the:", options: ["Balance sheet debit column", "Income statement credit column", "Retained earnings debit column", "Adjustments column"], answer: 1, why: "Revenue is an income statement account with a credit balance." },
      { q: "England’s income statement columns show credits of $32,800 and debits of $30,200. Net income is entered as:", options: ["A $2,600 credit in the income statement columns", "A $2,600 debit in the income statement columns and a credit in retained earnings", "A $2,600 debit in the balance sheet columns", "A $62,800 credit"], answer: 1, why: "The debit balances the income statement pair; the credit carries income to retained earnings." },
      { q: "With a net loss, the balancing amount is entered as a:", options: ["Debit in the income statement columns", "Credit in the income statement columns and a debit in retained earnings", "Credit in the balance sheet columns", "Debit in the adjustments column"], answer: 1, why: "A loss reduces retained earnings, so it’s a debit there." },
      { q: "England Tours’ total assets at December 31, 20X3 are:", options: ["$28,800", "$23,800", "$60,000", "$17,200"], answer: 1, why: "Including equipment net of $5,000 accumulated depreciation, assets total $23,800." }
    ]
  });
})();

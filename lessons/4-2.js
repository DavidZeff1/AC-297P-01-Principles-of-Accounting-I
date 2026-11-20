/* Lesson 4.2 · The Accounting Cycle and Closing Process */
(function () {
  var E = HUB.cases.england;
  var REV = E.adjusted("Revenue"), X = E.accounts.filter(function (a) { return a[1] === "X"; }).map(function (a) { return [a[0], E.adjusted(a[0])]; });

  HUB.register("4-2", {
    summary: "The accounting cycle, start to finish, and its final step: closing. Closing updates Retained Earnings and resets revenues, expenses, and dividends to zero for the next period.",
    objectives: [
      "List the steps of the accounting cycle",
      "State the two objectives of closing",
      "Distinguish temporary (nominal) accounts from real accounts",
      "Prepare the four closing entries and a post-closing trial balance"
    ],
    html: `
<section class="sec" data-toc="The cycle">
  <div class="eyebrow kind">Concept</div>
  <h2>The accounting cycle</h2>
  <p>Put the steps from the last three chapters together and you have a cycle that repeats every period. It captures transaction information and moves it in an orderly way into useful financial statements, while leaving a complete record of every transaction (the journal) and every account’s activity (the ledger). No wonder it has lasted for centuries.</p>
  <div data-widget="steps" data-key="cycle"></div>
</section>

<section class="sec" data-toc="Why close?">
  <div class="eyebrow kind">Concept</div>
  <h2>Closing has two objectives</h2>
  <div class="grid2">
    <div class="tile"><span class="k">Objective 1</span><h4>Update Retained Earnings</h4><p>Recording revenues, expenses, and dividends never touches the Retained Earnings account directly. Until closing, the ledger still shows the <b>beginning</b> balance.</p></div>
    <div class="tile alt"><span class="k">Objective 2</span><h4>Reset the temporary accounts</h4><p>Revenues, expenses, and dividends measure one period, so they’re zeroed out to start the next. They’re called <b>temporary</b> or <b>nominal</b> accounts.</p></div>
  </div>
  <p>Asset, liability, and equity accounts are <b>real</b> (permanent) accounts: their balances carry forward. You don’t start over each period re-accumulating your cash.</p>
  <div class="panel">
    <div class="panel-title"><h3>Temporary or real?</h3><span class="hint">Which accounts get closed?</span></div>
    <div data-widget="sorter" data-key="tr"></div>
  </div>
</section>

<section class="sec" data-toc="Four closing entries">
  <div class="eyebrow kind try">Try it</div>
  <h2>The four closing entries</h2>
  <p>All revenues and expenses are corralled into a temporary account called <b>Income Summary</b>. Its net is the period’s income or loss, which is then swept into Retained Earnings along with dividends. Beginning retained earnings + income − dividends = ending retained earnings. Press <b>Next closing entry</b> and watch the T-accounts.</p>
  <div class="panel" id="closer">
    <div class="close-entry" id="close-entry"></div>
    <div id="close-t"></div>
    <p class="verdict" id="close-say" aria-live="polite"></p>
    <div class="w-ctl"><button type="button" class="btn small" id="close-next" data-voice-repeat>Next closing entry</button><button type="button" class="btn ghost small" id="close-reset">Start over</button></div>
  </div>
  <p>Afterward every temporary account is zero, and Income Summary is zero too: its $32,800 credit equals the $30,200 + $2,600 debits.</p>
</section>

<section class="sec" data-toc="Post-closing trial balance">
  <div class="eyebrow kind">Example</div>
  <h2>The post-closing trial balance</h2>
  <p>The <b>post-closing trial balance</b> lists balances after closing, so it contains <b>only balance sheet accounts</b>. Like any trial balance it’s a check that debits equal credits, not a formal statement. Retained Earnings now shows its updated $1,600 balance.</p>
  <div data-widget="trial" data-key="post"></div>
</section>

<section class="sec" data-toc="Software and closing">
  <div class="eyebrow kind">Concept</div>
  <h2>Closing in a database world</h2>
  <p>Software built on database logic can answer almost any query, such as results for the 45 days ending October 15 several years ago. The computer pulls exactly the transactions for any interval, so the idea of closing the books becomes far less important in such systems.</p>
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
    <li><span>Cycle: journalize → post → trial balance → adjust → adjusted trial balance → statements → close → post-closing trial balance.</span></li>
    <li><span>Closing updates <b>Retained Earnings</b> and zeroes the <b>temporary</b> accounts: revenues, expenses, dividends.</span></li>
    <li><span>Four entries: close revenues to Income Summary; close expenses to Income Summary; close Income Summary to Retained Earnings; close Dividends to Retained Earnings.</span></li>
    <li><span>The <b>post-closing trial balance</b> has only balance sheet (real) accounts.</span></li>
  </ol>
</section>`,

    data: {
      cycle: { items: [
        { t: "Journalize", b: "<p>Record transactions in the journal.</p>" },
        { t: "Post", b: "<p>Post journal entries to the ledger accounts.</p>" },
        { t: "Trial balance", b: "<p>Prepare a trial balance.</p>" },
        { t: "Adjust", b: "<p>Prepare and post adjusting entries.</p>" },
        { t: "Adjusted trial balance", b: "<p>Prepare the adjusted trial balance.</p>" },
        { t: "Statements", b: "<p>Produce the financial statements, perhaps with a worksheet.</p>" },
        { t: "Close", b: "<p>Journalize and post closing entries.</p>" },
        { t: "Post-closing trial balance", b: "<p>Confirm the books are in balance to begin the next period.</p>" }
      ]},
      post: { entity: "England Tours Company", title: "Post-Closing Trial Balance", date: "December 31, 20X3", rows: E.tb(true, true).filter(function (r) {
        var a = E.accounts.filter(function (x) { return x[0] === r[0]; })[0]; return ["A", "XA", "L", "E"].indexOf(a[1]) >= 0;
      }).concat([["Retained Earnings", 0, E.endingRE]]).sort(function (p, q) {
        var o = E.accounts.map(function (a) { return a[0]; }); return o.indexOf(p[0]) - o.indexOf(q[0]);
      }) }
    },

    sorters: {
      tr: {
        categories: [{ id: "t", label: "Temporary" }, { id: "r", label: "Real" }],
        items: [
          { text: "Revenue", cat: "t", why: "Revenues measure one period and are closed." },
          { text: "Cash", cat: "r", why: "Asset balances carry forward." },
          { text: "Wages Expense", cat: "t", why: "Expenses are zeroed out each period." },
          { text: "Dividends", cat: "t", why: "Dividends are closed to Retained Earnings." },
          { text: "Retained Earnings", cat: "r", why: "It’s an equity account; closing updates it, then it carries forward." },
          { text: "Wages Payable", cat: "r", why: "Liabilities carry forward." },
          { text: "Accumulated Depreciation", cat: "r", why: "A contra asset is a balance sheet account; it carries forward." },
          { text: "Income Summary", cat: "t", why: "It’s used only during closing and ends at zero." }
        ]
      }
    },

    cards: {
      terms: [
        { term: "Accounting cycle", back: "The repeating sequence from journalizing transactions through the post-closing trial balance." },
        { term: "Closing", back: "Updating Retained Earnings and zeroing out the temporary accounts at period end." },
        { term: "Temporary (nominal) accounts", back: "Revenues, expenses, and dividends: closed at the end of each period." },
        { term: "Real (permanent) accounts", back: "Asset, liability, and equity accounts, whose balances carry forward." },
        { term: "Income Summary", back: "A temporary account that collects revenues and expenses during closing; its net is income or loss." },
        { term: "Post-closing trial balance", back: "A trial balance after closing, containing only balance sheet accounts." }
      ]
    },

    quiz: [
      { q: "Which is NOT an objective of closing?", options: ["Update Retained Earnings", "Reset temporary accounts to zero", "Record adjusting entries", "Prepare accounts for the next period"], answer: 2, why: "Adjusting comes before statements; closing comes after." },
      { q: "Which accounts are temporary?", options: ["Assets, liabilities, equity", "Revenues, expenses, dividends", "Cash and receivables", "Capital stock and retained earnings"], answer: 1, why: "They measure activity for one period." },
      { q: "The first closing entry typically:", options: ["Debits each revenue account and credits Income Summary", "Debits Income Summary and credits each revenue", "Debits Retained Earnings and credits Dividends", "Debits Cash and credits Revenue"], answer: 0, why: "Revenues have credit balances, so they’re debited to close." },
      { q: "England’s Income Summary has a $32,800 credit and $30,200 debit after closing revenues and expenses. The third closing entry is:", options: ["Debit Retained Earnings $2,600, credit Income Summary $2,600", "Debit Income Summary $2,600, credit Retained Earnings $2,600", "Debit Income Summary $32,800, credit Revenue $32,800", "No entry"], answer: 1, why: "Net income is moved to Retained Earnings, zeroing Income Summary." },
      { q: "Dividends are closed by:", options: ["Debiting Dividends, crediting Retained Earnings", "Debiting Retained Earnings, crediting Dividends", "Debiting Income Summary, crediting Dividends", "They are not closed"], answer: 1, why: "Dividends reduce retained earnings and bypass Income Summary." },
      { q: "A post-closing trial balance contains:", options: ["All accounts", "Only income statement accounts", "Only balance sheet accounts", "Only temporary accounts"], answer: 2, why: "Temporary accounts are zero after closing." },
      { q: "Beginning RE $0, net income $2,600, dividends $1,000. Retained Earnings after closing is:", options: ["$3,600", "$2,600", "$1,600", "$1,000"], answer: 2, why: "$0 + $2,600 − $1,000 = $1,600." }
    ],

    init: function (root) {
      var W = HUB.widgets, n = 0;
      var exTotal = X.reduce(function (s, x) { return s + x[1]; }, 0);
      var steps = [
        { entry: { date: "Dec. 31", lines: [["Revenue", REV, 0], ["Income Summary", 0, REV]], memo: "Step 1: close revenues to Income Summary" },
          say: "Step 1. Revenue is debited $32,800 to zero it out, and Income Summary is credited." },
        { entry: { date: "Dec. 31", lines: [["Income Summary", exTotal, 0]].concat(X.map(function (x) { return [x[0], 0, x[1]]; })), memo: "Step 2: close every expense to Income Summary" },
          say: "Step 2. Income Summary is debited $30,200, and each of the seven expenses is credited to zero." },
        { entry: { date: "Dec. 31", lines: [["Income Summary", E.netIncome, 0], ["Retained Earnings", 0, E.netIncome]], memo: "Step 3: close Income Summary (net income) to Retained Earnings" },
          say: "Step 3. Income Summary’s $2,600 credit balance, the net income, is moved to Retained Earnings." },
        { entry: { date: "Dec. 31", lines: [["Retained Earnings", E.dividends, 0], ["Dividends", 0, E.dividends]], memo: "Step 4: close Dividends to Retained Earnings" },
          say: "Step 4. Dividends of $1,000 are closed directly to Retained Earnings, which ends at $1,600." }
      ];
      function accts() {
        var a = {
          rev: { name: "Revenue", dr: [], cr: [["Bal.", REV]] },
          exp: { name: "Expenses (7 accounts)", dr: [["Bal.", exTotal]], cr: [] },
          is: { name: "Income Summary", dr: [], cr: [] },
          div: { name: "Dividends", dr: [["Bal.", E.dividends]], cr: [] },
          re: { name: "Retained Earnings", dr: [], cr: [["Bal.", 0]] }
        };
        if (n >= 1) { a.rev.dr.push(["(1)", REV]); a.is.cr.push(["(1)", REV]); }
        if (n >= 2) { a.exp.cr.push(["(2)", exTotal]); a.is.dr.push(["(2)", exTotal]); }
        if (n >= 3) { a.is.dr.push(["(3)", E.netIncome]); a.re.cr.push(["(3)", E.netIncome]); }
        if (n >= 4) { a.div.cr.push(["(4)", E.dividends]); a.re.dr.push(["(4)", E.dividends]); }
        return [a.rev, a.exp, a.is, a.div, a.re];
      }
      function paint(speak) {
        var entryEl = root.querySelector("#close-entry");
        if (n) W.journal(entryEl, { entries: [steps[n - 1].entry] }); else entryEl.innerHTML = '<p class="hint">Before closing: the temporary accounts still hold the year’s activity, and Retained Earnings still shows its $0 beginning balance.</p>';
        W.taccounts(root.querySelector("#close-t"), { accounts: accts() });
        root.querySelector("#close-next").disabled = n >= 4;
        var s = root.querySelector("#close-say");
        s.setAttribute("aria-live", speak ? "polite" : "off");
        s.textContent = n ? steps[n - 1].say : "Four entries will zero the temporary accounts and update Retained Earnings.";
      }
      root.querySelector("#close-next").addEventListener("click", function () { if (n < 4) { n++; paint(true); } });
      root.querySelector("#close-reset").addEventListener("click", function () { n = 0; paint(false); });
      paint(false);
    }
  });
})();

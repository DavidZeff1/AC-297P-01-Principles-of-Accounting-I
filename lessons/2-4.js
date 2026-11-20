/* Lesson 2.4 · The Trial Balance */
HUB.register("2-4", {
  summary: "A trial balance lists every ledger balance to check that debits equal credits. Learn what it can and can’t catch, how statements flow from it, and how charts of accounts and subsidiary ledgers keep the system organized.",
  objectives: [
    "Prepare a trial balance and explain its purpose",
    "Identify errors a balanced trial balance won’t reveal",
    "Prepare simple financial statements from a trial balance",
    "Explain charts of accounts and control/subsidiary accounts"
  ],
  html: `
<section class="sec" data-toc="Debits equal credits">
  <div class="eyebrow kind">Concept</div>
  <h2>The trial balance is a self-check</h2>
  <p>After everything has been posted, it’s good practice to prepare a <b>trial balance</b>: a list of every ledger account with its debit or credit balance. It is <b>not</b> a formal financial statement. Its job is to confirm that total debits equal total credits.</p>
  <div class="grid2">
    <div data-widget="trial" data-key="xao"></div>
    <div class="tile"><span class="k">Reading it</span><p>Accounts with normal debit balances (assets and expenses) sit in the debit column; liabilities, equity, and revenue sit in the credit column.</p><p>Every journal entry had equal debits and credits, so the totals should match: <b>$61,300 = $61,300</b>.</p></div>
  </div>
  <p>If the totals don’t match, an error has occurred and must be found. It’s far better to be careful as you go than to hunt for a mistake afterward.</p>
</section>

<section class="sec" data-toc="What it can’t catch">
  <div class="eyebrow kind try">Try it</div>
  <h2>A balanced trial balance isn’t proof of correctness</h2>
  <p>A trial balance only proves that debits equal credits. Many errors keep that equality intact. Decide whether each mistake would make the trial balance fail.</p>
  <div class="panel">
    <div class="panel-title"><h3>Would the trial balance catch it?</h3><span class="hint">Pick one for each error</span></div>
    <div data-widget="sorter" data-key="errors"></div>
  </div>
</section>

<section class="sec" data-toc="From trial balance to statements">
  <div class="eyebrow kind">Example</div>
  <h2>Statements flow out of the trial balance</h2>
  <p>The next chapter adds adjustments needed for truly up-to-date statements. For now, a tentative set can be built straight from the trial balance: ledger → trial balance → financial statements. <b>Tap a highlighted amount</b> to see where it goes.</p>
  <div class="grid3">
    <div data-widget="statement" data-key="is"></div>
    <div data-widget="statement" data-key="re"></div>
    <div data-widget="statement" data-key="bs"></div>
  </div>
</section>

<section class="sec" data-toc="Chart of accounts">
  <div class="eyebrow kind">Concept</div>
  <h2>A chart of accounts numbers every account</h2>
  <p>The <b>chart of accounts</b> lists every account a company uses, usually with a reference number. Numbering keeps accounts organized and classified, a bit like zip codes speeding up the mail. Many systems let you enter an account by number instead of typing its name.</p>
  <div class="panel scroll-x">
    <table class="plain">
      <thead><tr><th>Number range</th><th>Type</th><th>Xao’s accounts</th></tr></thead>
      <tbody>
        <tr><td class="num">1xx</td><td>Assets</td><td>101 Cash · 102 Accounts Receivable · 103 Land</td></tr>
        <tr><td class="num">2xx</td><td>Liabilities</td><td>201 Accounts Payable · 202 Notes Payable</td></tr>
        <tr><td class="num">3xx</td><td>Equity</td><td>301 Capital Stock</td></tr>
        <tr><td class="num">4xx</td><td>Revenues</td><td>401 Service Revenue</td></tr>
        <tr><td class="num">5xx</td><td>Expenses</td><td>501 Advertising Expense · 502 Utilities Expense</td></tr>
      </tbody>
    </table>
  </div>
  <p>Numbers can be subdivided further. If Accounts Receivable is 102, individual customers might be 102.001, 102.002, 102.003, and so on. That makes subsidiary records easy to keep.</p>
</section>

<section class="sec" data-toc="Control and subsidiary">
  <div class="eyebrow kind">Concept</div>
  <h2>Control accounts and subsidiary accounts</h2>
  <p>Some ledger accounts are made of many pieces. Suppose total accounts receivable is <b>$19,000</b>, owed by three customers: Compton, Fisher, and Moore. The company must know the total <i>and</i> what each customer owes, so it keeps a separate <b>subsidiary account</b> for each customer.</p>
  <div data-widget="taccounts" data-key="subs"></div>
  <div class="big-eq" style="font-size:20px">Compton $7,500 + Fisher $4,000 + Moore $7,500 = <span class="a">Control account $19,000</span></div>
  <p>The general ledger Accounts Receivable account is the <b>control account</b> (or control ledger): its balance must equal the total of all the subsidiary balances. Companies must be able to reconcile the two, and computers are especially good at keeping them in perfect harmony.</p>
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
    <li><span>A <b>trial balance</b> lists ledger balances to check that debits equal credits. It’s a self-check, not a financial statement.</span></li>
    <li><span>A balanced trial balance can still hide errors: omitted entries, duplicate entries, and amounts posted to the wrong account.</span></li>
    <li><span>Tentative financial statements can be prepared from the trial balance (adjustments come in Chapter 3).</span></li>
    <li><span>A <b>chart of accounts</b> lists and numbers every account: 1 assets, 2 liabilities, 3 equity, 4 revenues, 5 expenses.</span></li>
    <li><span>A <b>control account</b> in the general ledger equals the total of its <b>subsidiary accounts</b>.</span></li>
  </ol>
</section>`,

  data: {
    xao: HUB.cases.xao.trial(),
    is: { entity: "Xao Corporation", title: "Income Statement", date: "For the Month Ended January 31, 20X1", cols: 2, rows: [
      { l: "Service revenue", b: 11000, link: "rev" },
      { l: "Expenses", head: true },
      { l: "Advertising", a: 2000, ind: 1, link: "adv" },
      { l: "Utilities", a: 800, ind: 1, ua: true, link: "util" },
      { l: "Total expenses", b: 2800, ub: true },
      { l: "Net income", b: 8200, bold: true, uub: true, link: "ni" }
    ]},
    re: { entity: "Xao Corporation", title: "Statement of Retained Earnings", date: "For the Month Ended January 31, 20X1", rows: [
      { l: "Retained earnings, January 1", a: 0 },
      { l: "Plus: Net income", a: 8200, ua: true, link: "ni" },
      { l: "Subtotal", a: 8200, ind: 1 },
      { l: "Less: Dividends", a: 0, ua: true },
      { l: "Retained earnings, January 31", a: 8200, bold: true, uua: true, link: "re" }
    ]},
    bs: { entity: "Xao Corporation", title: "Balance Sheet", date: "January 31, 20X1", cols: 2, rows: [
      { l: "Assets", head: true },
      { l: "Cash", a: 26300, ind: 1, link: "cash" },
      { l: "Accounts receivable", a: 2200, ind: 1, link: "ar" },
      { l: "Land", a: 30000, ind: 1, ua: true, link: "land" },
      { l: "Total assets", b: 58500, bold: true, uub: true },
      { l: "Liabilities", head: true },
      { l: "Accounts payable", a: 300, ind: 1, link: "ap" },
      { l: "Notes payable", a: 25000, ind: 1, ua: true, link: "np" },
      { l: "Total liabilities", b: 25300 },
      { l: "Stockholders’ equity", head: true },
      { l: "Capital stock", a: 25000, ind: 1, link: "cs" },
      { l: "Retained earnings", a: 8200, ind: 1, ua: true, link: "re" },
      { l: "Total stockholders’ equity", b: 33200, ub: true },
      { l: "Total liabilities and equity", b: 58500, bold: true, uub: true }
    ]},
    subs: { accounts: [
      { name: "Compton (102.001)", dr: [["Jan. 4", 9000]], cr: [["Jan. 20", 1500]] },
      { name: "Fisher (102.002)", dr: [["Jan. 9", 4000]], cr: [] },
      { name: "Moore (102.003)", dr: [["Jan. 12", 5000], ["Jan. 26", 2500]], cr: [] },
      { name: "Accounts Receivable (control, 102)", dr: [["Jan. 4", 9000], ["Jan. 9", 4000], ["Jan. 12", 5000], ["Jan. 26", 2500]], cr: [["Jan. 20", 1500]] }
    ]}
  },

  sorters: {
    errors: {
      categories: [{ id: "caught", label: "Out of balance" }, { id: "hidden", label: "Still balances" }],
      items: [
        { text: "A $900 sale on account was never recorded", cat: "hidden", why: "Neither the debit nor the credit was recorded, so both columns are short by the same amount." },
        { text: "The same $500 payment was journalized and posted twice", cat: "hidden", why: "Debits and credits are both overstated by $500, so they still match." },
        { text: "A $300 debit was posted to Land instead of Cash", cat: "hidden", why: "It’s still a debit for the right amount, just to the wrong account." },
        { text: "Only the debit half of an entry was posted", cat: "caught", why: "Debits now exceed credits, so the totals won’t match." },
        { text: "A $2,000 debit was posted to the account as a credit", cat: "caught", why: "Debits fall by $2,000 and credits rise by $2,000, a $4,000 difference." },
        { text: "An account balance was added incorrectly", cat: "caught", why: "A miscomputed balance makes the columns disagree." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Trial balance", back: "A list of ledger accounts and their debit or credit balances, used to check that debits equal credits." },
      { term: "Balanced but wrong", back: "Omitted entries, duplicated entries, and posting to the wrong account all leave a trial balance in balance." },
      { term: "Chart of accounts", back: "A listing of all accounts a company uses, usually with reference numbers." },
      { term: "Subsidiary account", back: "A detailed account for one component, such as one customer’s receivable." },
      { term: "Control account", back: "A general ledger account whose balance equals the total of its subsidiary accounts." }
    ]
  },

  quiz: [
    { q: "The main purpose of a trial balance is to:", options: ["Report profits to investors", "Check that total debits equal total credits", "Replace the general ledger", "Record transactions"], answer: 1, why: "It’s a self-check, not a formal financial statement." },
    { q: "Which error would NOT be revealed by a trial balance?", options: ["Posting only the debit half of an entry", "Recording the same transaction twice", "Posting a debit as a credit", "Adding an account balance incorrectly"], answer: 1, why: "A duplicate entry overstates debits and credits equally." },
    { q: "A trial balance is:", options: ["A formal financial statement", "Not a formal financial statement", "Required to be published", "Prepared before journalizing"], answer: 1, why: "It’s an internal check prepared after posting." },
    { q: "On Xao’s trial balance, which column holds Service Revenue?", options: ["Debit", "Credit", "Both", "Neither"], answer: 1, why: "Revenue has a normal credit balance." },
    { q: "Xao’s revenue is $11,000 and expenses total $2,800. Net income is:", options: ["$13,800", "$11,000", "$8,200", "$2,800"], answer: 2, why: "$11,000 − $2,800 = $8,200." },
    { q: "In a typical chart of accounts, an account numbered 201 is most likely a(n):", options: ["Asset", "Liability", "Revenue", "Expense"], answer: 1, why: "Liabilities usually begin with 2." },
    { q: "Customer accounts numbered 102.001, 102.002, 102.003 are examples of:", options: ["Control accounts", "Subsidiary accounts", "Special journals", "Trial balances"], answer: 1, why: "They are subdivisions of the Accounts Receivable control account (102)." },
    { q: "The Accounts Receivable control account must equal:", options: ["Total sales for the period", "The sum of the individual customer subsidiary balances", "Cash collected", "Total assets"], answer: 1, why: "The control account summarizes all subsidiary accounts." }
  ]
});

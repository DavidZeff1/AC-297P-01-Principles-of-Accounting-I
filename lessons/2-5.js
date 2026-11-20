/* Lesson 2.5 · Computerized Processing Systems */
HUB.register("2-5", {
  summary: "After the journal entry, everything is mechanical, which is exactly why computers took over transaction processing. See how accounting software works and why you still need to understand debits and credits.",
  objectives: [
    "Explain why transaction processing was among the first business tasks computerized",
    "Describe how data entry works in accounting software",
    "List typical features of accounting software",
    "Explain why accounting knowledge still matters"
  ],
  html: `
<section class="sec" data-toc="Mechanical work">
  <div class="eyebrow kind">Concept</div>
  <h2>Only the first step takes judgment</h2>
  <p>Look back at this chapter: once the journal entry is written, the data is merely <b>manipulated</b> to produce the ledger, trial balance, and statements. The only real analysis happens when the transaction is first recorded. Everything after that is mechanical, and perfectly suited to computers. That’s why transaction processing was among the first business tasks ever computerized.</p>
  <div data-widget="steps" data-key="split"></div>
</section>

<section class="sec" data-toc="The software">
  <div class="eyebrow kind">Concept</div>
  <h2>From $100 packages to enterprise systems</h2>
  <div class="grid3">
    <div class="tile"><span class="k">Small business</span><p>Basic packages can cost under $100.</p></div>
    <div class="tile"><span class="k">Large organization</span><p>Enterprise-wide systems can cost millions, including consultants to install them.</p></div>
    <div class="tile"><span class="k">Cloud-based</span><p>Customers enter data and produce reports over the internet.</p></div>
  </div>
</section>

<section class="sec" data-toc="Data entry">
  <div class="eyebrow kind try">Example</div>
  <h2>A typical data entry screen</h2>
  <p>A journal entry screen looks familiar: date, accounts, debits, credits, a memo. Once you save it, posting and everything after it happen automatically. Notice that the software won’t let you save until debits equal credits.</p>
  <div class="panel">
    <div class="entry-screen" aria-label="Sample journal entry screen">
      <div class="es-bar"><span>Journal Entry #1047</span><span class="es-date">Date: <b>01/28</b></span></div>
      <div class="scroll-x"><table class="plain es-table">
        <thead><tr><th>Account</th><th class="num">Debit</th><th class="num">Credit</th><th>Memo</th></tr></thead>
        <tbody>
          <tr><td>103 · Land</td><td class="num">30,000.00</td><td class="num"></td><td>Lot on Elm Street</td></tr>
          <tr><td>101 · Cash</td><td class="num"></td><td class="num">5,000.00</td><td>Down payment</td></tr>
          <tr><td>202 · Notes Payable</td><td class="num"></td><td class="num">25,000.00</td><td>5-year note</td></tr>
        </tbody>
        <tfoot><tr><td><b>Totals</b></td><td class="num"><b>30,000.00</b></td><td class="num"><b>30,000.00</b></td><td><span class="es-ok">✓ Balanced, ready to save</span></td></tr></tfoot>
      </table></div>
    </div>
  </div>
</section>

<section class="sec" data-toc="Common features">
  <div class="eyebrow kind">Concept</div>
  <h2>What accounting software generally does</h2>
  <div data-widget="steps" data-key="features"></div>
</section>

<section class="sec" data-toc="You still need the basics">
  <div class="eyebrow kind">Watch out</div>
  <h2>Garbage in, garbage out</h2>
  <p>Every product has its own look and feel, but the people running the accounting function must still understand accounts, debits and credits, and journal entries. Without that knowledge, data entry decisions go astray and the system’s output becomes hopelessly wrong. Accounting knowledge is essential to implementing and using any computerized system and the reports it produces.</p>
  <div class="panel">
    <div class="panel-title"><h3>Who does it: the software or you?</h3><span class="hint">Sort each task</span></div>
    <div data-widget="sorter" data-key="who"></div>
  </div>
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
    <li><span>After the initial journal entry, processing is mechanical, which is why it was computerized early.</span></li>
    <li><span>Software ranges from inexpensive small-business packages to costly enterprise and cloud systems.</span></li>
    <li><span>Typical features: simplified data entry, functional modules, pick lists and auto-complete, database queries, up-to-date data, and many reports.</span></li>
    <li><span>Users still need to understand accounting basics, or the output will be wrong.</span></li>
  </ol>
</section>`,

  data: {
    split: { numbered: false, items: [
      { t: "Analysis (human)", b: "<p>Read the source document and decide which accounts are debited and credited. This is the only step that requires judgment.</p>" },
      { t: "Posting (mechanical)", b: "<p>Copy each debit and credit to its ledger account.</p>" },
      { t: "Trial balance (mechanical)", b: "<p>List the balances and confirm debits equal credits.</p>" },
      { t: "Statements (mechanical)", b: "<p>Arrange the balances into the income statement, retained earnings statement, and balance sheet.</p>" }
    ]},
    features: { items: [
      { t: "Simplify data entry", b: "<p>Automate input wherever possible. A point-of-sale terminal at the register can itself become the data entry device.</p>" },
      { t: "Modules", b: "<p>Divide the work into functional areas such as sales and collections, and purchasing and payments.</p>" },
      { t: "User-friendly screens", b: "<p>Data entry blanks that clearly match the underlying transaction.</p>" },
      { t: "Fewer keystrokes", b: "<p>Pick lists, automatic call-up, and auto-complete.</p>" },
      { t: "Database logic", b: "<p>Transaction data can be sorted and queried any way you like, such as “income statement for July.”</p>" },
      { t: "Current data", b: "<p>Decision makers can see up-to-date information at any time.</p>" },
      { t: "Many reports", b: "<p>Numerous specialized reports beyond the basic statements.</p>" }
    ]}
  },

  sorters: {
    who: {
      categories: [{ id: "sw", label: "Software" }, { id: "you", label: "You" }],
      items: [
        { text: "Decide which accounts a transaction affects", cat: "you", why: "Transaction analysis requires accounting judgment." },
        { text: "Post the entry to the ledger", cat: "sw", why: "Posting is mechanical and fully automated." },
        { text: "Total the trial balance", cat: "sw", why: "Summing balances is pure arithmetic." },
        { text: "Choose debit or credit for each account", cat: "you", why: "The software can’t know what the transaction means." },
        { text: "Produce an income statement for July", cat: "sw", why: "Database queries generate reports on demand." },
        { text: "Notice that a report looks wrong and investigate", cat: "you", why: "Spotting bad output takes an understanding of accounting." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Transaction processing", back: "The mechanical steps after the journal entry: posting, trial balance, statements. Among the first business tasks computerized." },
      { term: "Module", back: "A part of accounting software devoted to one functional area, such as sales/collections or purchasing/payments." },
      { term: "Point-of-sale terminal", back: "A register that doubles as a data entry device for the accounting system." },
      { term: "Cloud-based system", back: "Accounting software used over the internet to enter data and produce reports." },
      { term: "Pick list", back: "A menu of choices, such as accounts, that reduces keystrokes and typing errors." }
    ]
  },

  quiz: [
    { q: "Which step in the accounting process requires the most judgment?", options: ["Posting to the ledger", "Preparing the trial balance", "The initial recording of the transaction", "Totaling the statements"], answer: 2, why: "Everything after the journal entry is mechanical." },
    { q: "Why was transaction processing one of the first business tasks computerized?", options: ["It requires creativity", "Its steps after the journal entry are mechanical", "It is rarely needed", "GAAP required it"], answer: 1, why: "Mechanical, repetitive steps suit computers." },
    { q: "Which is a typical feature of accounting software?", options: ["Requiring every report to be hand-typed", "Dividing the system into modules such as sales/collection", "Eliminating debits and credits", "Removing the need for source documents"], answer: 1, why: "Modules for functional areas are standard." },
    { q: "A point-of-sale terminal can act as:", options: ["A trial balance", "A data entry device for the accounting system", "The chart of accounts", "An auditor"], answer: 1, why: "Sales rung up at the register flow straight into the system." },
    { q: "Database logic lets accounting software:", options: ["Sort and query transaction data any way needed", "Skip transaction analysis", "Avoid posting", "Ignore the chart of accounts"], answer: 0, why: "For example, it can produce an income statement for July on request." },
    { q: "Why must users of accounting software still understand debits and credits?", options: ["The software can’t add", "Without that knowledge, input decisions go astray and the output is wrong", "Debits and credits are printed on every report", "It is required by the software license"], answer: 1, why: "The system is only as good as the entries you make." }
  ]
});

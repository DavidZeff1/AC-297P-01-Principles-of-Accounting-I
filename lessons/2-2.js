/* Lesson 2.2 · The Journal */
HUB.register("2-2", {
  summary: "The journal is accounting’s logbook: every transaction, in date order, written in debit/credit shorthand. Walk through Xao Corporation’s January journal.",
  objectives: [
    "Describe the general journal as the book of original entry",
    "Read and write a journal entry, including a compound entry",
    "Explain why businesses use special journals",
    "Explain why the journal alone can’t produce account balances"
  ],
  html: `
<section class="sec" data-toc="A logbook">
  <div class="eyebrow kind">Concept</div>
  <h2>The journal is a logbook in debit/credit shorthand</h2>
  <p>Any journal is a log of events in date (chronological) order. An <b>accounting journal</b> is the same idea: a chronological list of a company’s transactions. Instead of long narratives, each entry uses shorthand: <b>which accounts</b> are involved and whether each is <b>debited or credited</b>.</p>
  <p>The <b>general journal</b> is called the <b>book of original entry</b>. Source documents are analyzed, and the result is first written down here. The journal alone can’t produce financial statements, but it’s the starting point.</p>
  <div data-widget="steps" data-key="flow"></div>
</section>

<section class="sec" data-toc="Anatomy of an entry">
  <div class="eyebrow kind">Concept</div>
  <h2>How an entry is laid out</h2>
  <div data-widget="journal" data-key="one"></div>
  <div class="grid3">
    <div class="tile"><span class="k">Debits first</span><p>Debited accounts are listed first, flush left.</p></div>
    <div class="tile"><span class="k">Credits indented</span><p>Credited accounts follow, indented to the right.</p></div>
    <div class="tile"><span class="k">Explanation</span><p>A brief narrative description follows each entry as extra documentation.</p></div>
  </div>
</section>

<section class="sec" data-toc="Xao’s journal">
  <div class="eyebrow kind try">Try it</div>
  <h2>Xao Corporation’s January journal</h2>
  <p>Step through Xao’s transactions one at a time. Before revealing each entry, read the explanation and predict the debit and credit. The first entry increases both Cash (an asset, debited) and equity (Capital Stock, credited). The second increases Advertising Expense with a debit and decreases Cash with a credit.</p>
  <div class="panel"><div data-widget="journal" data-key="xao"></div></div>
  <div class="callout def">
    <div class="label">Compound entry</div>
    <p>A transaction can involve more than two accounts. On January 28 Xao bought $30,000 of land, paying $5,000 cash and signing a $25,000 note. One debit, two credits, and the total debits ($30,000) still equal the total credits ($5,000 + $25,000). An entry like this is a <b>compound entry</b>.</p>
  </div>
  <p>Xao’s journal is just two pages. A real business’s journal might run to hundreds or thousands of pages, which is why many keep it only in electronic form.</p>
</section>

<section class="sec" data-toc="Special journals">
  <div class="eyebrow kind">Concept</div>
  <h2>Special journals handle repetitive transactions</h2>
  <p>Every transaction <i>can</i> go in the general journal, but a business with huge volumes of the same kind of transaction may add optional <b>special journals</b>.</p>
  <div class="grid3">
    <div class="tile"><span class="k">Cash receipts</span><p>Every receipt of cash. The journal’s total can serve as the debit to Cash.</p></div>
    <div class="tile"><span class="k">Cash payments</span><p>Every payment of cash.</p></div>
    <div class="tile"><span class="k">Sales</span><p>Every sale on account.</p></div>
    <div class="tile"><span class="k">Purchases</span><p>Every purchase on account.</p></div>
    <div class="tile"><span class="k">Payroll</span><p>Every paycheck.</p></div>
    <div class="tile alt"><span class="k">General journal</span><p>Still used for everything else. Special journals don’t replace it; they strip out the repetitive items.</p></div>
  </div>
  <p>Because special-journal transactions are all alike, they usually don’t need individual explanations.</p>
</section>

<section class="sec" data-toc="Page numbers">
  <div class="eyebrow kind">Concept</div>
  <h2>Page numbers create a trail</h2>
  <p>Xao’s journal has a Page 1 and a Page 2. Even though entries are in date order, page numbers let you <b>cross-reference</b> transactions and work backward from a statement amount to the individual entries behind it. Some companies instead give every transaction a unique index number so it can be traced through the whole system.</p>
</section>

<section class="sec" data-toc="Why it isn’t enough">
  <div class="eyebrow kind">Concept</div>
  <h2>The journal doesn’t tell you any balances</h2>
  <p>How much cash does Xao have at the end of January? You could hunt through the journal and net every debit and credit to Cash:</p>
  <div class="big-eq" style="font-size:20px">$25,000 − $2,000 + $4,000 − $500 + $4,800 − $5,000 = <span class="a">$26,300</span></div>
  <p>That’s tedious and error-prone, and impossible with hundreds of pages. A better tool is needed: the <b>general ledger</b>, next lesson.</p>
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
    <li><span>The <b>general journal</b> is the book of original entry: transactions in chronological order, in debit/credit form.</span></li>
    <li><span>Debits are listed first, credits are indented, and a short explanation follows.</span></li>
    <li><span>A <b>compound entry</b> involves more than two accounts; debits still equal credits.</span></li>
    <li><span><b>Special journals</b> handle repetitive transactions like cash receipts, payments, sales, purchases, and payroll.</span></li>
    <li><span>The journal can’t show account balances. That’s the ledger’s job.</span></li>
  </ol>
</section>`,

  data: {
    flow: { items: [
      { t: "Source document", b: "<p>An invoice, check, deposit slip, or other document shows that something happened.</p>" },
      { t: "Analyze", b: "<p>Decide which accounts are affected and whether each goes up or down.</p>" },
      { t: "Journalize", b: "<p>Write the entry in the general journal, in date order, in debit/credit form.</p>" }
    ]},
    one: { entries: [{ date: "Jan. 2", lines: [["Cash", 25000, 0], ["Capital Stock", 0, 25000]], memo: "Issued stock for cash" }] },
    xao: HUB.cases.xao.journal(true)
  },

  cards: {
    terms: [
      { term: "Journal", back: "A chronological log of a company’s transactions in debit/credit shorthand." },
      { term: "General journal", sub: "book of original entry", back: "The journal where transactions are first recorded after analyzing source documents." },
      { term: "Journalize", back: "To record a transaction as a journal entry." },
      { term: "Compound entry", back: "A journal entry involving more than two accounts." },
      { term: "Special journal", back: "An optional journal for one kind of highly repetitive transaction, such as cash receipts or sales." },
      { term: "Chronological order", back: "Date order, the order in which the journal lists transactions." }
    ]
  },

  quiz: [
    { q: "The general journal is also called the:", options: ["Book of final entry", "Book of original entry", "General ledger", "Trial balance"], answer: 1, why: "Transactions are first recorded in the general journal." },
    { q: "In what order are journal entries recorded?", options: ["By account number", "Alphabetically", "Chronologically", "By dollar amount"], answer: 2, why: "The journal is a chronological log of transactions." },
    { q: "In a journal entry, credits are customarily:", options: ["Listed first, flush left", "Indented to the right, after the debits", "Written in red", "Omitted"], answer: 1, why: "Debits come first flush left; credits follow, indented." },
    { q: "Xao buys $30,000 of land, paying $5,000 cash and signing a $25,000 note. This entry is a:", options: ["Compound entry", "Special entry", "Closing entry", "Reversing entry"], answer: 0, why: "It involves three accounts: Land, Cash, and Notes Payable." },
    { q: "For the land purchase, which is correct?", options: ["Debit Cash $5,000, debit Notes Payable $25,000, credit Land $30,000", "Debit Land $30,000, credit Cash $5,000, credit Notes Payable $25,000", "Debit Land $25,000, credit Notes Payable $25,000", "Debit Land $30,000, credit Cash $30,000"], answer: 1, why: "Land (asset) increases with a debit; Cash decreases and Notes Payable increases, both with credits." },
    { q: "Why might a business use special journals?", options: ["To replace the general journal", "To handle large volumes of repetitive transactions efficiently", "Because GAAP requires them", "To compute account balances"], answer: 1, why: "Special journals strip out repetitive transactions; they don’t replace the general journal." },
    { q: "Why is the journal alone not enough?", options: ["It isn’t in date order", "It doesn’t show the balance of each account", "It can’t record compound entries", "It ignores source documents"], answer: 1, why: "Finding a balance means netting every entry to that account across the whole journal. The ledger solves this." },
    { q: "Paying $2,000 for advertising is journalized as:", options: ["Debit Cash, credit Advertising Expense", "Debit Advertising Expense, credit Cash", "Debit Advertising Expense, credit Accounts Payable", "Debit Capital Stock, credit Cash"], answer: 1, why: "Expenses increase with debits; cash decreases with a credit." }
  ]
});

/* Lesson 2.1 · Accounts, Debits, and Credits */
HUB.register("2-1", {
  summary: "Why a business needs a real accounting system, what an account is, and the debit and credit rules you’ll use for the rest of the course.",
  objectives: [
    "Explain what an account is and how its balance is found",
    "Know that every transaction has equal debits and credits",
    "Memorize the debit/credit rules for all six account types",
    "Analyze a transaction from its source document"
  ],
  html: `
<section class="sec" data-toc="Why a system">
  <div class="eyebrow kind">Concept</div>
  <h2>A business needs a system, not a marker board</h2>
  <p>Chapter 1 used before-and-after snapshots to show how transactions change the statements. Picture a real company doing that on a giant marker board, erasing and rewriting as each transaction arrives. Chaos would rule, and no one could explain afterward which transactions produced the results.</p>
  <p>So every business needs a reliable <b>accounting system</b>: a way to process and summarize transactions into useful statements and reports, while keeping retrievable documentation for every single transaction. Manual or computerized, its heart is the same set of tools:</p>
  <div data-widget="steps" data-key="tools"></div>
</section>

<section class="sec" data-toc="Accounts">
  <div class="eyebrow kind">Concept</div>
  <h2>An account tracks one item’s ins and outs</h2>
  <p>An <b>account</b> is the record kept for one asset, liability, equity, revenue, expense, or dividend item: one for Cash, one for Inventory, and so on for every financial statement element. All the accounts together make up the <b>general ledger</b>. In a manual system, picture a notebook with a separate page for each account.</p>
  <p>Here is a Cash account. It started January at $50,000; after a dozen days of activity its balance is <b>$63,000</b>, the amount a January 12 balance sheet would report. It looks a lot like a checkbook register. Switch the column labels to see what the debit and credit columns really mean for cash.</p>
  <div class="panel"><div data-widget="ledger" data-key="cash"></div></div>
</section>

<section class="sec" data-toc="Debits and credits">
  <div class="eyebrow kind">Concept</div>
  <h2>Debits and credits replace plus and minus</h2>
  <p>Instead of saying cash “increased” or “decreased,” accountants say it was <b>debited</b> (dr) or <b>credited</b> (cr). This shorthand also comes from Pacioli. Why the extra complexity? Because of two powerful facts:</p>
  <div class="grid2">
    <div class="tile"><span class="k">Fact 1</span><h4>Every transaction can be described in debit/credit form.</h4></div>
    <div class="tile"><span class="k">Fact 2</span><h4>For every transaction, debits = credits.</h4></div>
  </div>
  <h3>Why plus and minus fall apart</h3>
  <p>A +/− system has no internal consistency. Look at three ordinary transactions:</p>
  <div class="panel scroll-x">
    <table class="plain">
      <thead><tr><th>Transaction</th><th>Plus/minus effect</th><th>Debit/credit effect</th></tr></thead>
      <tbody>
        <tr><td>Provide services for cash</td><td>Cash +, Revenue + <span class="hint">(+/+)</span></td><td>Debit Cash, credit Revenue</td></tr>
        <tr><td>Pay an account payable</td><td>Cash −, Payable − <span class="hint">(−/−)</span></td><td>Debit Accounts Payable, credit Cash</td></tr>
        <tr><td>Buy land with cash</td><td>Land +, Cash − <span class="hint">(+/−)</span></td><td>Debit Land, credit Cash</td></tr>
      </tbody>
    </table>
  </div>
  <p>With pluses and minuses, any combination can be right, so a mistake can go unnoticed. With debits and credits, every correct entry has a debit side and a credit side that are equal. If they don’t match, you know immediately something is wrong. Computerized systems refuse to accept an unbalanced entry.</p>
</section>

<section class="sec" data-toc="The rules">
  <div class="eyebrow kind">Memorize</div>
  <h2>The debit/credit rules</h2>
  <p>Learning these rules is like learning a new language: memorize first, and understanding follows quickly. You’ll need instant recall from here on.</p>
  <div class="rules">
    <div class="rule"><span class="mn">D·E·A·D</span><h4>Debits increase Expenses, Assets, and Dividends</h4><div class="t-mini"><div class="plus">Debit<small>increase +</small></div><div class="minus">Credit<small>decrease −</small></div></div><p class="hint">Normal balance: debit</p></div>
    <div class="rule cr"><span class="mn">R·E·L·I·C</span><h4>Revenues, Equity, and Liabilities are Increased with Credits</h4><div class="t-mini"><div class="minus">Debit<small>decrease −</small></div><div class="plus">Credit<small>increase +</small></div></div><p class="hint">Normal balance: credit</p></div>
  </div>
  <div class="panel">
    <div class="panel-title"><h3>Debit or credit?</h3><span class="hint">Drill the rules until they’re automatic</span></div>
    <div data-widget="sorter" data-key="drill"></div>
  </div>
</section>

<section class="sec" data-toc="Transaction analysis">
  <div class="eyebrow kind try">Example</div>
  <h2>Analyze, then apply the rules</h2>
  <p>For every transaction you ask two questions: <b>(a) which accounts are affected</b>, and <b>(b) are they increased or decreased?</b> Then you apply the debit/credit rules.</p>
  <p>The trigger is usually a <b>source document</b>: a check for a payment, an invoice for a sale, a time report for payroll, a tax statement, a cash register tape, a bank deposit slip. Source documents should be kept, often electronically, as support for every entry.</p>
  <div class="panel"><div data-widget="worked" data-key="aoki"></div></div>
  <h3>Making sure nothing slips through</h3>
  <p>A well-designed system has <b>controls</b> so every transaction is captured: prenumbered documents, regular reconciliations (like reconciling your checkbook to the bank statement each month), and more. Much of a professional accountant’s work is designing, implementing, and evaluating these controls.</p>
</section>

<section class="sec" data-toc="An account’s balance">
  <div class="eyebrow kind">Concept</div>
  <h2>Finding an account’s balance</h2>
  <p>Start with the beginning balance, then net all the period’s debits and credits against it. For the Cash account above: $50,000 + $25,000 of debits − $12,000 of credits = <b>$63,000</b>.</p>
  <p>Remember that each debit or credit to Cash is matched by an equal, opposite effect somewhere else. The $10,000 debit on January 2 was paired with a $10,000 <b>credit to Accounts Receivable</b>, because a customer paid what they owed.</p>
</section>

<section class="sec" data-toc="Credit myths">
  <div class="eyebrow kind">Watch out</div>
  <h2>A credit is not always a decrease, or always an increase</h2>
  <div class="grid2">
    <div class="tile warn"><span class="k">Myth: credits always decrease</span><p>It comes from “we’ll credit your account” when you return something to a store. Your account is an <b>account receivable</b> on the <b>store’s</b> books, an asset, so crediting it does reduce it. On your own books you would <b>debit</b> (decrease) your payable.</p></div>
    <div class="tile warn"><span class="k">Myth: credits always increase</span><p>It comes from banking. When Matthew deposits money at Monalo Bank, the bank owes him that money: a <b>liability</b> on the bank’s books. Liabilities increase with credits, so the bank “credits” his account.</p></div>
  </div>
  <p>Whether a credit increases or decreases depends entirely on the <b>type of account</b>.</p>
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
    <li><span>An <b>account</b> records the increases and decreases for one item. All accounts together form the <b>general ledger</b>.</span></li>
    <li><span>Every transaction can be expressed in debits and credits, and <b>debits always equal credits</b>.</span></li>
    <li><span><b>DEAD:</b> debits increase expenses, assets, and dividends. <b>RELIC:</b> revenues, equity, and liabilities increase with credits.</span></li>
    <li><span>Transaction analysis: which accounts, increased or decreased, then apply the rules. Source documents trigger and support each entry.</span></li>
    <li><span>A credit can increase or decrease an account. It depends on the account type.</span></li>
  </ol>
</section>`,

  data: {
    tools: { numbered: false, items: [
      { t: "Accounts", b: "<p>A separate record for each asset, liability, equity, revenue, expense, and dividend item.</p>" },
      { t: "Debits and credits", b: "<p>The language used to describe every change to an account.</p>" },
      { t: "Journals", b: "<p>Where each transaction is first recorded, in date order. Covered in lesson 2.2.</p>" },
      { t: "General ledger", b: "<p>The collection of all accounts, showing each one’s activity and balance. Covered in lesson 2.3.</p>" }
    ]},
    cash: {
      account: "Cash", swap: true, normal: "dr", open: ["Jan. 1", 50000],
      rows: [
        ["Jan. 2", "Collected an account receivable", 10000, 0],
        ["Jan. 3", "Cash sale", 4000, 0],
        ["Jan. 5", "Paid rent", 0, 7000],
        ["Jan. 7", "Paid salaries", 0, 3000],
        ["Jan. 8", "Cash sale", 5000, 0],
        ["Jan. 10", "Paid utility bill", 0, 2000],
        ["Jan. 12", "Owner invested cash", 6000, 0]
      ]
    },
    aoki: {
      q: "<p>Jill Aoki, an architect, delivers finished blueprints to a client and hands over an <b>invoice for $2,500</b>. Later the client pays. Analyze both events.</p>",
      steps: [
        "<b>Source document:</b> the invoice proves the work is done and payment is now due.",
        "<b>Accounts affected:</b> Accounts Receivable goes up (the client owes her) and Revenue goes up (she earned it).",
        "<b>Apply the rules:</b> assets increase with debits, revenues increase with credits. <b>Debit Accounts Receivable $2,500; credit Revenue $2,500.</b>",
        "<b>When the client pays:</b> the bank deposit receipt is the source document. Cash goes up and Accounts Receivable goes down.",
        "<b>Debit Cash $2,500; credit Accounts Receivable $2,500.</b> In both entries debits equal credits."
      ],
      answer: "<p>Billing: Dr Accounts Receivable / Cr Revenue, $2,500. Collection: Dr Cash / Cr Accounts Receivable, $2,500.</p>"
    }
  },

  sorters: {
    drill: {
      categories: [{ id: "dr", label: "Debit" }, { id: "cr", label: "Credit" }],
      items: [
        { text: "Increase Cash", cat: "dr", why: "Cash is an asset. Debits increase assets." },
        { text: "Increase Service Revenue", cat: "cr", why: "Revenues increase with credits (RELIC)." },
        { text: "Decrease Accounts Payable", cat: "dr", why: "Liabilities increase with credits, so a debit decreases them." },
        { text: "Increase Rent Expense", cat: "dr", why: "Debits increase expenses (DEAD)." },
        { text: "Increase Capital Stock", cat: "cr", why: "Equity increases with credits." },
        { text: "Decrease Accounts Receivable", cat: "cr", why: "Receivables are assets. Credits decrease assets." },
        { text: "Increase Dividends", cat: "dr", why: "Debits increase dividends (DEAD)." },
        { text: "Increase Notes Payable", cat: "cr", why: "Liabilities increase with credits." },
        { text: "Decrease Equipment", cat: "cr", why: "Equipment is an asset; credits decrease it." },
        { text: "Decrease Cash", cat: "cr", why: "Cash is an asset; credits decrease it." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Accounting system", back: "A system that reliably processes transactions and events and summarizes them into useful statements and reports." },
      { term: "Account", back: "The record kept for one asset, liability, equity, revenue, expense, or dividend item." },
      { term: "General ledger", back: "All of a firm’s accounts, collectively." },
      { term: "Debit (dr)", back: "An entry on the left side. Increases assets, expenses, and dividends; decreases liabilities, revenues, and equity." },
      { term: "Credit (cr)", back: "An entry on the right side. Increases liabilities, revenues, and equity; decreases assets, expenses, and dividends." },
      { term: "DEAD", back: "Debits increase Expenses, Assets, and Dividends." },
      { term: "RELIC", back: "Revenues, Equity, and Liabilities are Increased with Credits." },
      { term: "Normal balance", back: "The side that increases the account: debit for assets, expenses, dividends; credit for liabilities, revenues, equity." },
      { term: "Transaction analysis", back: "Deciding which accounts a transaction affects and whether each increases or decreases." },
      { term: "Source document", back: "Evidence that triggers and supports an entry: checks, invoices, time reports, register tapes, deposit slips." }
    ]
  },

  quiz: [
    { q: "For every transaction recorded in a debit/credit system:", options: ["Debits exceed credits", "Debits equal credits", "Credits exceed debits", "Only one account changes"], answer: 1, why: "Debits = credits for every transaction, which gives the system its internal check." },
    { q: "Why is a +/− system weaker than debits and credits?", options: ["It can’t handle cash", "It lacks internal consistency, so errors can go unnoticed", "It is illegal under GAAP", "It requires more accounts"], answer: 1, why: "Any mix of pluses and minuses can be correct, so there’s no built-in check like debits = credits." },
    { q: "Which accounts are increased with debits?", options: ["Liabilities, revenues, equity", "Assets, expenses, dividends", "Assets, revenues, liabilities", "Expenses, equity, liabilities"], answer: 1, why: "DEAD: debits increase expenses, assets, and dividends." },
    { q: "Which account normally carries a credit balance?", options: ["Cash", "Salaries Expense", "Accounts Payable", "Dividends"], answer: 2, why: "Liabilities increase with credits, so they normally have credit balances." },
    { q: "Paying an account payable in cash is recorded as:", options: ["Debit Cash, credit Accounts Payable", "Debit Accounts Payable, credit Cash", "Debit Accounts Payable, debit Cash", "Credit Accounts Payable, credit Cash"], answer: 1, why: "The liability decreases (debit) and cash decreases (credit)." },
    { q: "Jill Aoki bills a client $2,500 for completed work. The entry is:", options: ["Debit Revenue, credit Accounts Receivable", "Debit Cash, credit Revenue", "Debit Accounts Receivable, credit Revenue", "Debit Accounts Receivable, credit Cash"], answer: 2, why: "The receivable (asset) increases with a debit; revenue increases with a credit." },
    { q: "Cash began at $50,000, had $25,000 of debits and $12,000 of credits. The balance is:", options: ["$87,000", "$63,000", "$37,000", "$13,000"], answer: 1, why: "$50,000 + $25,000 − $12,000 = $63,000." },
    { q: "When a store says “we’ll credit your account” after a return, on the store’s books it is:", options: ["Increasing its revenue", "Decreasing an account receivable", "Increasing a liability", "Increasing cash"], answer: 1, why: "Your account is a receivable (asset) for the store; a credit reduces it." },
    { q: "Which is an example of a source document?", options: ["The general ledger", "A customer invoice", "The balance sheet", "The trial balance"], answer: 1, why: "Invoices, checks, time reports, and deposit slips are source documents that trigger entries." }
  ]
});

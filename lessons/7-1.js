/* Lesson 7.1 · The Costs and Benefits of Selling on Credit */
HUB.register("7-1", {
  summary: "Selling on credit brings in customers but costs money. Learn the kinds of receivables and how credit card sales are recorded, whether funded immediately or later.",
  objectives: [
    "Distinguish trade and nontrade receivables",
    "Weigh the costs and benefits of extending credit",
    "Record bank card sales and delayed-collection card sales"
  ],
  html: `
<section class="sec" data-toc="Kinds of receivables">
  <div class="eyebrow kind">Concept</div>
  <h2>Receivables: claims on customers and others</h2>
  <p>Receivables are classified as current or noncurrent depending on how long they’ll take to collect.</p>
  <div class="grid2">
    <div class="tile"><span class="k">Trade receivables</span><p>The majority. They arise from selling products or services to customers and are carried in <b>Accounts Receivable</b>.</p></div>
    <div class="tile alt"><span class="k">Nontrade receivables</span><p>From other transactions, such as advances to employees and deposits with utility companies.</p></div>
  </div>
  <div class="panel">
    <div class="panel-title"><h3>Trade or nontrade?</h3></div>
    <div data-widget="sorter" data-key="kind"></div>
  </div>
</section>

<section class="sec" data-toc="Costs and benefits">
  <div class="eyebrow kind">Concept</div>
  <h2>Credit helps sales, but it isn’t free</h2>
  <div class="grid2">
    <div class="tile warn"><span class="k">Costs</span><ul><li>Investigating customers’ creditworthiness</li><li>Monitoring and pursuing collections</li><li>Giving up other uses of the money while it’s owed</li><li>Customers who can’t or won’t pay</li></ul></div>
    <div class="tile"><span class="k">Benefits</span><ul><li>Credit entices customers to buy</li><li>Interest charges can offset some costs</li></ul></div>
  </div>
</section>

<section class="sec" data-toc="Credit cards">
  <div class="eyebrow kind try">Example</div>
  <h2>Credit card sales</h2>
  <p>MasterCard, Visa, American Express, and similar cards spare merchants from running their own credit departments. The card companies earn merchant fees (usually a percentage of sales) plus interest and charges to cardholders. Merchants welcome them anyway: collection is virtually assured and fast, often the same day, and the fee is offset by not needing a credit department.</p>
  <h3>Bank card, funded immediately</h3>
  <p>Treated essentially as a cash sale. Rayyan Company sells $1,000 of merchandise; the bank charges 2%.</p>
  <div data-widget="journal" data-key="bank"></div>
  <h3>Card with delayed collection</h3>
  <p>Recorded first as a credit sale, with the card company as the debtor. When the money arrives on January 25, the service charge (here 3%) is recorded.</p>
  <div data-widget="journal" data-key="delayed"></div>
  <p class="hint">Strictly, the estimated charge could be recorded at the sale on January 9. Waiting until collection is simpler and acceptable because the amount is small, a materiality judgment you’ll meet again in lesson 7.2.</p>
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
    <li><span><b>Trade receivables</b> come from sales to customers; <b>nontrade</b> from other transactions.</span></li>
    <li><span>Credit attracts customers but costs money: investigation, collection, forgone use of funds, and bad debts.</span></li>
    <li><span>Immediately funded bank card sale: debit Cash and the service charge expense, credit Sales.</span></li>
    <li><span>Delayed card sale: debit a receivable from the card company; record the service charge when collected.</span></li>
  </ol>
</section>`,

  data: {
    bank: { entries: [{ date: "", lines: [["Cash", 980, 0], ["Service Charge Expense", 20, 0], ["Sales", 0, 1000]], memo: "Bank card sale; 2% fee withheld" }] },
    delayed: { entries: [
      { date: "Jan. 9", lines: [["Accounts Receivable, Card Company", 1000, 0], ["Sales", 0, 1000]], memo: "Card sale with delayed collection" },
      { date: "Jan. 25", lines: [["Cash", 970, 0], ["Service Charge Expense", 30, 0], ["Accounts Receivable, Card Company", 0, 1000]], memo: "Collected from the card company, less a 3% charge" }
    ]}
  },

  sorters: {
    kind: {
      categories: [{ id: "t", label: "Trade" }, { id: "n", label: "Nontrade" }],
      items: [
        { text: "A customer owes for merchandise bought last week", cat: "t", why: "It arose from a sale to a customer." },
        { text: "An advance paid to an employee", cat: "n", why: "Not from selling goods or services." },
        { text: "A deposit held by the electric company", cat: "n", why: "A refundable deposit, not a sale." },
        { text: "A client owes for consulting services performed", cat: "t", why: "Services sold on account." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Trade receivables", back: "Receivables from selling products or services to customers, carried in Accounts Receivable." },
      { term: "Nontrade receivables", back: "Receivables from other transactions, such as employee advances and utility deposits." },
      { term: "Merchant fee", back: "The percentage of each sale a card company charges the merchant." },
      { term: "Service charge expense", back: "The expense recorded for card company fees." }
    ]
  },

  quiz: [
    { q: "Most receivables are:", options: ["Nontrade receivables", "Trade receivables from sales to customers", "Employee advances", "Utility deposits"], answer: 1, why: "Trade receivables are the majority." },
    { q: "Which is a nontrade receivable?", options: ["Amount owed by a customer for goods", "An advance to an employee", "A client’s unpaid invoice", "A credit sale"], answer: 1, why: "It doesn’t arise from a sale." },
    { q: "Which is a cost of extending credit?", options: ["Customers buy more", "Forgoing other uses of the money while it’s owed", "Interest revenue", "Faster collection"], answer: 1, why: "Money tied up in receivables can’t be used elsewhere." },
    { q: "A $1,000 bank card sale with a 2% fee, funded immediately, is recorded as:", options: ["Debit Cash $1,000, credit Sales $1,000", "Debit Cash $980 and Service Charge Expense $20, credit Sales $1,000", "Debit Accounts Receivable $1,000, credit Sales $1,000", "Debit Cash $980, credit Sales $980"], answer: 1, why: "Full sale, fee as expense." },
    { q: "Why do merchants welcome bank cards despite the fees?", options: ["Fees are zero", "Collection is virtually assured and fast, and no credit department is needed", "They raise prices", "Card sales aren’t taxed"], answer: 1, why: "The fee is offset by lower internal costs." },
    { q: "For a card sale with delayed collection, the initial entry debits:", options: ["Cash", "A receivable from the card company", "Service Charge Expense", "Sales"], answer: 1, why: "It’s recorded as a credit sale until collected." }
  ]
});

/* Lesson 12.1 · Current Liabilities */
HUB.register("12-1", {
  summary: "What makes a liability current, the common kinds (payables, notes, current portion of long-term debt, accruals, customer prepayments, third-party collections), and when debt being refinanced can stay long-term.",
  objectives: [
    "Define current liabilities using the one-year-or-operating-cycle rule",
    "Identify typical current obligations",
    "Separate the current portion of long-term debt",
    "Apply the rule for obligations to be refinanced"
  ],
  html: `
<section class="sec" data-toc="The definition">
  <div class="eyebrow kind">Concept</div>
  <h2>Due soon, paid with current resources</h2>
  <p><b>Current liabilities</b> are debts due within <b>one year or the operating cycle, whichever is longer</b>, typically settled by using current assets, creating another current liability, or providing a service. The definition catches less obvious items too: customer prepayments, amounts collected for others, the current portion of long-term debt, accrued expenses, and contingent liabilities.</p>
  <p>It does <b>not</b> include amounts not yet <b>incurred</b>: salaries employees will earn next year aren’t a liability this year. Investors, creditors, and managers watch current liabilities closely because they are imminent demands on resources.</p>
  <div class="callout def"><div class="label">Operating cycle reminder</div><p>The time to turn cash back into cash. Usually under a year, but a furniture maker that must buy and cure wood for a long time may have a longer cycle, so its current liabilities could include obligations due in more than a year.</p></div>
</section>

<section class="sec" data-toc="Typical obligations">
  <div class="eyebrow kind">Concept</div>
  <h2>Typical current obligations</h2>
  <div data-widget="steps" data-key="types"></div>
  <div class="panel">
    <div class="panel-title"><h3>Current liability or not?</h3><span class="hint">At December 31, 20X5</span></div>
    <div data-widget="sorter" data-key="cur"></div>
  </div>
</section>

<section class="sec" data-toc="Refinancing">
  <div class="eyebrow kind">Concept</div>
  <h2>Debt that will be refinanced</h2>
  <p>A long-term debt maturing within the next year would normally move to current liabilities. But companies often renew such debt, borrowing new money to repay the old. The rule: show it as <b>current</b> unless</p>
  <div class="grid2">
    <div class="tile"><span class="k">1 · Intent</span><p>The company intends to renew the debt on a long-term basis, <b>and</b></p></div>
    <div class="tile"><span class="k">2 · Ability</span><p>it has the ability to do so, ordinarily shown by a firm agreement with a competent lender.</p></div>
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
    <li><span>Current liabilities: due within one year or the operating cycle, whichever is longer; only amounts already incurred.</span></li>
    <li><span>Include payables, short-term notes, current portion of long-term debt, accruals, unearned revenue, and amounts collected for third parties.</span></li>
    <li><span>Next year’s principal on long-term debt is current.</span></li>
    <li><span>Maturing debt stays long-term only with both the intent and the ability to refinance.</span></li>
  </ol>
</section>`,

  data: {
    types: { numbered: false, items: [
      { t: "Accounts payable", b: "<p>Amounts owed to suppliers for goods and services, usually based on an informal working relationship with payment expected soon.</p>" },
      { t: "Notes payable", b: "<p>Formal short-term borrowings backed by a written promise to pay: bank loans, equipment purchases, some supplier credit. The <b>maker</b> agrees to pay; a properly drafted note is a <b>negotiable instrument</b> the holder can transfer. Usually interest-bearing.</p>" },
      { t: "Current portion of long-term debt", b: "<p>Principal due within the next year (or operating cycle). A $100,000 note repaid $10,000 a year shows <b>$10,000</b> (plus accrued interest) as current and the rest as long-term.</p>" },
      { t: "Accrued liabilities", b: "<p>Expenses that build up with time and are paid in a lump: salaries and wages, taxes, interest. Only amounts already accumulated are reported.</p>" },
      { t: "Customer prepayments", b: "<p>Magazine subscriptions, gift cards, advance tickets. The seller must deliver or refund, so the money is <b>unearned revenue</b> until earned.</p>" },
      { t: "Collections for third parties", b: "<p>The recipient isn’t the beneficiary. Sales tax collected from customers is owed to the taxing authority until remitted.</p>" }
    ]}
  },

  sorters: {
    cur: {
      categories: [{ id: "y", label: "Current" }, { id: "n", label: "Not current" }],
      items: [
        { text: "Sales tax collected from customers this month", cat: "y", why: "Owed to the state; a third-party collection." },
        { text: "Salaries employees will earn next year", cat: "n", why: "Not yet incurred, so not a liability." },
        { text: "Gift cards sold but not yet redeemed", cat: "y", why: "Unearned revenue: an obligation to deliver." },
        { text: "$10,000 of principal due next year on a 10-year note", cat: "y", why: "The current portion of long-term debt." },
        { text: "A note maturing in 6 months that the company will renew under a firm agreement with a bank", cat: "n", why: "Intent and ability to refinance long-term keep it noncurrent." },
        { text: "Interest that has accrued on a loan through year end", cat: "y", why: "An accrued liability." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Current liabilities", back: "Debts due within one year or the operating cycle, whichever is longer." },
      { term: "Negotiable instrument", back: "A properly constructed note that the holder can transfer to someone else." },
      { term: "Current portion of long-term debt", back: "Principal on long-term debt due within the next year or operating cycle." },
      { term: "Accrued liabilities", back: "Expenses accumulated with time but not yet paid, like wages, taxes, and interest." },
      { term: "Customer prepayments", back: "Advance payments for future goods or services; reported as unearned revenue." },
      { term: "Refinancing rule", back: "Maturing debt stays long-term only if the company intends and is able to refinance it long-term." }
    ]
  },

  quiz: [
    { q: "Current liabilities are due within:", options: ["Six months", "One year or the operating cycle, whichever is shorter", "One year or the operating cycle, whichever is longer", "Five years"], answer: 2, why: "Whichever is longer." },
    { q: "Salaries employees will earn next year are:", options: ["A current liability", "A long-term liability", "Not a liability yet", "An asset"], answer: 2, why: "They haven’t been incurred." },
    { q: "A $100,000 note repaid $10,000 a year. At year end, the current liability is:", options: ["$100,000", "$90,000", "$10,000 plus accrued interest", "$0"], answer: 2, why: "Only next year’s principal is current." },
    { q: "Sales tax collected from customers is:", options: ["Revenue", "A current liability until remitted", "An expense", "Equity"], answer: 1, why: "It belongs to the taxing authority." },
    { q: "Gift cards sold but not redeemed are reported as:", options: ["Revenue", "Unearned revenue (current liability)", "Accounts receivable", "Retained earnings"], answer: 1, why: "The seller still owes the goods or a refund." },
    { q: "Maturing debt may stay long-term if the company:", options: ["Hopes to refinance", "Intends to refinance and has a firm agreement showing it can", "Has plenty of cash", "Is profitable"], answer: 1, why: "Both intent and ability are required." }
  ]
});

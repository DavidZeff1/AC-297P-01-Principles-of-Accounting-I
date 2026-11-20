/* Lesson 6.4 · Petty Cash */
HUB.register("6-4", {
  summary: "A small imprest fund for payments too small for a check: how it’s set up, replenished, and balanced, and what Cash Short (Over) is for.",
  objectives: [
    "Establish a petty cash fund",
    "Replenish the fund and record the expenses",
    "Record shortages and overages in Cash Short (Over)",
    "Increase the base fund"
  ],
  html: `
<section class="sec" data-toc="Setting it up">
  <div class="eyebrow kind">Concept</div>
  <h2>An imprest fund for small payments</h2>
  <p><b>Petty cash</b> (or <b>imprest cash</b>) is a fund for small payments that are impractical to pay by check: postage due, reimbursing an employee for a few office supplies, and so on. A check is written to cash, cashed, and the money is placed in a petty cash box, with a designated <b>custodian</b> responsible for it.</p>
  <div data-widget="journal" data-key="est"></div>
  <p>This simply moves part of the company’s cash into a separate account.</p>
</section>

<section class="sec" data-toc="Vouchers">
  <div class="eyebrow kind">Concept</div>
  <h2>Every payment leaves a receipt</h2>
  <p>Policies set out what petty cash can be used for. Each payment puts a receipt, a <b>petty cash voucher</b> showing the amount and purpose, into the box. At any moment:</p>
  <div class="big-eq" style="font-size:20px">Cash in the box + Vouchers = <span class="a">Fund balance</span></div>
  <p class="hint">No journal entry is made when individual payments come out of the box.</p>
</section>

<section class="sec" data-toc="Replenishing">
  <div class="eyebrow kind try">Example</div>
  <h2>Replenishing, and Cash Short (Over)</h2>
  <p>As cash runs low, a check is written to bring the box back to its original level. The vouchers come out and are recorded as expenses. The <b>Petty Cash account itself doesn’t change</b>; it stays at the base amount.</p>
  <div class="panel"><div data-widget="worked" data-key="rep"></div></div>
  <div class="grid2">
    <div class="tile"><span class="k">Cash Short (Over)</span><p>An income statement account. A <b>debit</b> balance is a shortage (expense); a <b>credit</b> balance is an overage (revenue).</p></div>
    <div class="tile alt"><span class="k">Not just petty cash</span><p>Retailers use it daily too: if the register drawer holds more or less than the recorded cash sales, the difference goes to Cash Short (Over).</p></div>
  </div>
</section>

<section class="sec" data-toc="Growing the fund">
  <div class="eyebrow kind">Concept</div>
  <h2>Increasing the base fund</h2>
  <p>As a company grows, it may need a bigger fund. The entry looks just like setting it up: debit Petty Cash, credit Cash for the increase. Apart from establishing or enlarging the fund, nothing is ever posted to Petty Cash.</p>
  <div data-widget="journal" data-key="inc"></div>
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
    <li><span>Establish: debit Petty Cash, credit Cash. A custodian safeguards the fund.</span></li>
    <li><span>Cash in the box + vouchers should always equal the fund balance.</span></li>
    <li><span>Replenish: debit the expenses shown by the vouchers, credit Cash. Petty Cash doesn’t change.</span></li>
    <li><span>Differences go to <b>Cash Short (Over)</b>: debit for shortages, credit for overages.</span></li>
  </ol>
</section>`,

  data: {
    est: { entries: [{ date: "Jan. 2", lines: [["Petty Cash", 1000, 0], ["Cash", 0, 1000]], memo: "Established a $1,000 petty cash fund" }] },
    inc: { entries: [{ date: "Jul. 1", lines: [["Petty Cash", 500, 0], ["Cash", 0, 500]], memo: "Increased the fund from $1,000 to $1,500" }] },
    rep: {
      q: "<p>The $1,000 fund holds $365 of cash and vouchers for postage $115, office supplies $300, and miscellaneous items $200. Replenish it.</p>",
      steps: [
        "Vouchers total $115 + $300 + $200 = <b>$615</b>.",
        "To bring cash back to $1,000 requires $1,000 − $365 = <b>$635</b>.",
        "Cash + vouchers = $365 + $615 = $980, so the fund is <b>$20 short</b>, perhaps a math error making change or a missing receipt.",
        "Debit each expense for its vouchers, debit <b>Cash Short (Over)</b> for the $20 shortage, and credit Cash for the full $635 check."
      ],
      answer: '<div data-widget="journal" data-key="repJ"></div>'
    },
    repJ: { entries: [{ date: "Jan. 31", lines: [["Postage Expense", 115, 0], ["Office Supplies Expense", 300, 0], ["Miscellaneous Expense", 200, 0], ["Cash Short (Over)", 20, 0], ["Cash", 0, 635]], memo: "Replenished petty cash; fund was $20 short" }] }
  },

  cards: {
    terms: [
      { term: "Petty cash", sub: "imprest cash", back: "A small fund for payments impractical to make by check." },
      { term: "Custodian", back: "The person designated to safeguard and pay from the petty cash fund." },
      { term: "Petty cash voucher", back: "A receipt placed in the box for each payment, showing amount and purpose." },
      { term: "Replenishment", back: "Writing a check to restore the fund; the vouchers are recorded as expenses." },
      { term: "Cash Short (Over)", back: "Income statement account for cash discrepancies: debit = shortage (expense), credit = overage (revenue)." }
    ]
  },

  quiz: [
    { q: "Establishing a $500 petty cash fund is recorded as:", options: ["Debit Cash, credit Petty Cash", "Debit Petty Cash, credit Cash", "Debit Miscellaneous Expense, credit Cash", "No entry"], answer: 1, why: "Part of Cash moves into a separate Petty Cash account." },
    { q: "When a $20 payment is made from the petty cash box:", options: ["Expense is debited immediately", "A voucher goes in the box; no entry yet", "Petty Cash is credited", "Cash is credited"], answer: 1, why: "Expenses are recorded when the fund is replenished." },
    { q: "At any time, the petty cash box should contain:", options: ["Only cash equal to the fund", "Cash plus vouchers equal to the fund balance", "Only vouchers", "More cash than the fund"], answer: 1, why: "Every dollar is either still cash or accounted for by a voucher." },
    { q: "When the fund is replenished, the Petty Cash account is:", options: ["Debited", "Credited", "Not affected", "Closed"], answer: 2, why: "It stays at the base amount; expenses are debited and Cash credited." },
    { q: "Vouchers total $615 but $635 is needed to restore the fund. The $20 is:", options: ["Credited to Cash Short (Over)", "Debited to Cash Short (Over)", "Debited to Petty Cash", "Ignored"], answer: 1, why: "A shortage is a debit, like an expense." },
    { q: "A credit balance in Cash Short (Over) represents:", options: ["A shortage (expense)", "An overage (revenue)", "A liability", "An asset"], answer: 1, why: "Credits mean more cash than expected." }
  ]
});

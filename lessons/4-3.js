/* Lesson 4.3 · Reversing Entries */
HUB.register("4-3", {
  summary: "A reversing entry undoes an accrual adjustment on the first day of the new period, so the next routine entry can be recorded normally. With or without it, the results are identical.",
  objectives: [
    "Define a reversing entry and explain why it’s optional",
    "Record accrued salaries with and without reversing entries",
    "Identify which adjustments are good candidates for reversal"
  ],
  html: `
<section class="sec" data-toc="What it is">
  <div class="eyebrow kind">Concept</div>
  <h2>A reversing entry undoes an adjustment</h2>
  <p>A <b>reversing entry</b> is an optional journal entry, made on the first day of a new period, that is the exact opposite of a prior adjusting entry. It can simplify routine record keeping.</p>
  <p>The facts: $2,000 of salaries accrued at the end of 20X3. On the next payday, January 15, 20X4, employees are paid $5,000: $2,000 for the end of 20X3 and $3,000 for work in 20X4.</p>
</section>

<section class="sec" data-toc="Side by side">
  <div class="eyebrow kind try">Compare</div>
  <h2>Without and with reversing entries</h2>
  <div class="grid2">
    <div><h3 class="poster-h">Without reversing</h3><div data-widget="journal" data-key="without"></div></div>
    <div><h3 class="poster-h">With reversing</h3><div data-widget="journal" data-key="with"></div></div>
  </div>
  <p>Without reversing, the bookkeeper on January 15 has to remember the accrual and split the payment. With reversing, January 15 is a completely normal payroll entry: the whole $5,000 goes to expense.</p>
  <h3>Same result either way</h3>
  <div class="grid2">
    <div data-widget="taccounts" data-key="tWithout"></div>
    <div data-widget="taccounts" data-key="tWith"></div>
  </div>
  <p>With reversing, the January 1 <b>credit</b> to an expense account looks strange on its own. It only makes sense paired with the January 15 debit: $5,000 debit − $2,000 credit = the correct <b>$3,000</b> of 20X4 salary expense. Salaries Payable ends at zero either way.</p>
</section>

<section class="sec" data-toc="When to reverse">
  <div class="eyebrow kind">Concept</div>
  <h2>Which adjustments to reverse</h2>
  <p>Reversing entries are ordinarily appropriate for adjustments that record <b>accrued revenues and expenses</b>, specifically those that involve a <b>future cash flow</b>, like accrued salaries, interest, or revenue to be collected. Whether you reverse or not, the end result is the same.</p>
  <div class="panel">
    <div class="panel-title"><h3>Good candidate for reversal?</h3><span class="hint">Accruals with a future cash flow</span></div>
    <div data-widget="sorter" data-key="rev"></div>
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
    <li><span>A <b>reversing entry</b> is the exact opposite of an adjusting entry, made at the start of the next period. It’s optional.</span></li>
    <li><span>It lets the next routine entry be recorded normally, without special attention to the earlier accrual.</span></li>
    <li><span>It’s used for accrued revenues and expenses that involve future cash flows.</span></li>
    <li><span>With or without reversing entries, the final balances are identical.</span></li>
  </ol>
</section>`,

  data: {
    without: { entries: [
      { date: "Dec. 31, 20X3", lines: [["Salaries Expense", 2000, 0], ["Salaries Payable", 0, 2000]], memo: "Adjusting entry: accrued salaries" },
      { date: "Jan. 15, 20X4", lines: [["Salaries Payable", 2000, 0], ["Salaries Expense", 3000, 0], ["Cash", 0, 5000]], memo: "Payday: split between the accrual and 20X4 expense" }
    ]},
    "with": { entries: [
      { date: "Dec. 31, 20X3", lines: [["Salaries Expense", 2000, 0], ["Salaries Payable", 0, 2000]], memo: "Adjusting entry: accrued salaries" },
      { date: "Jan. 1, 20X4", lines: [["Salaries Payable", 2000, 0], ["Salaries Expense", 0, 2000]], memo: "Reversing entry: the exact opposite" },
      { date: "Jan. 15, 20X4", lines: [["Salaries Expense", 5000, 0], ["Cash", 0, 5000]], memo: "Payday: a routine entry for the full amount" }
    ]},
    tWithout: { accounts: [
      { name: "Salaries Expense, 20X4 (without)", dr: [["Jan. 15", 3000]], cr: [] },
      { name: "Salaries Payable (without)", dr: [["Jan. 15", 2000]], cr: [["Dec. 31", 2000]] }
    ]},
    tWith: { accounts: [
      { name: "Salaries Expense, 20X4 (with)", dr: [["Jan. 15", 5000]], cr: [["Jan. 1", 2000]] },
      { name: "Salaries Payable (with)", dr: [["Jan. 1", 2000]], cr: [["Dec. 31", 2000]] }
    ]}
  },

  sorters: {
    rev: {
      categories: [{ id: "yes", label: "Reverse it" }, { id: "no", label: "Don’t bother" }],
      items: [
        { text: "Accrued salaries to be paid on the next payday", cat: "yes", why: "An accrued expense with a future cash payment." },
        { text: "Accrued interest on a note, payable at maturity", cat: "yes", why: "An accrued expense that will be paid in cash later." },
        { text: "Revenue earned in December, to be billed and collected in January", cat: "yes", why: "An accrued revenue with a future cash receipt." },
        { text: "Annual depreciation on equipment", cat: "no", why: "No future cash flow is involved." },
        { text: "Supplies used during the year", cat: "no", why: "This adjusts a prepaid asset; there’s no future cash flow." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Reversing entry", back: "An optional entry at the start of a period that exactly reverses a prior adjusting entry." },
      { term: "Why reverse?", back: "So the next routine entry, like payday, can be recorded normally without splitting it." },
      { term: "Candidates for reversal", back: "Accrued revenues and expenses that involve future cash flows." }
    ]
  },

  quiz: [
    { q: "A reversing entry is:", options: ["Required by GAAP", "An optional entry that undoes a prior adjusting entry", "A correction of an error", "A closing entry"], answer: 1, why: "It’s optional and simply reverses an adjustment." },
    { q: "Reversing entries are typically made:", options: ["At the end of the period", "On the first day of the next period", "When cash is paid", "Before adjusting entries"], answer: 1, why: "They’re recorded at the start of the new period." },
    { q: "With a reversing entry, the January 15 payday entry for $5,000 is:", options: ["Debit Salaries Payable $2,000, Salaries Expense $3,000, credit Cash $5,000", "Debit Salaries Expense $5,000, credit Cash $5,000", "Debit Cash, credit Salaries Expense", "No entry"], answer: 1, why: "The reversal already removed the payable, so payday is routine." },
    { q: "After the reversing entry and January 15 payment, 20X4 salary expense from these entries is:", options: ["$5,000", "$2,000", "$3,000", "$7,000"], answer: 2, why: "$5,000 debit − $2,000 credit = $3,000." },
    { q: "Which adjustment is a typical candidate for a reversing entry?", options: ["Depreciation", "Accrued interest payable", "Supplies used", "Expired prepaid insurance"], answer: 1, why: "Accruals with future cash flows are reversed." },
    { q: "Compared with not reversing, using reversing entries produces:", options: ["Higher expense", "Lower expense", "The same final results", "An unbalanced trial balance"], answer: 2, why: "Both approaches end with identical balances." }
  ]
});

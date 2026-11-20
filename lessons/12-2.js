/* Lesson 12.2 · Notes Payable */
HUB.register("12-2", {
  summary: "Borrowing on a short-term note: recording it, accruing interest across year end, and spotting interest tricks like the 360-day year, the rule of 78s, compounding, and interest taken up front.",
  objectives: [
    "Record a short-term note payable and its repayment",
    "Accrue interest on a note that spans year end",
    "Compare 360/365-day and rule-of-78s interest calculations",
    "Record a note with interest included in face value"
  ],
  html: `
<section class="sec" data-toc="Oliva’s note">
  <div class="eyebrow kind">Example</div>
  <h2>Borrowing $10,000 from BancZone</h2>
  <div class="note-doc">
    <div class="nd-top"><b>Promissory Note</b><span>$10,000.00 · January 1, 20X8</span></div>
    <p>For value received, <b>Oliva Company</b> promises to pay to the order of <b>BancZone</b> the sum of ten thousand dollars, with interest at <b>8% per year</b>, on <b>June 30, 20X8</b>.</p>
    <p class="hint">A simplified form for accounting purposes; real notes also cover default, legal fees, notice requirements, and more.</p>
  </div>
  <p>Interest for half a year: $10,000 × 8% × 6/12 = <b>$400</b>. Borrowing debits Cash and credits Notes Payable; at repayment, the extra cash beyond the note’s carrying amount is interest expense.</p>
  <div data-widget="journal" data-key="jan"></div>
</section>

<section class="sec" data-toc="Across year end">
  <div class="eyebrow kind">Concept</div>
  <h2>The same note, signed October 1</h2>
  <p>Now three months of interest belong to 20X8 and three to 20X9. Interest is accrued at December 31, and the March 31 payment covers both.</p>
  <div data-widget="journal" data-key="oct"></div>
  <div class="grid2">
    <div data-widget="statement" data-key="bs"></div>
    <div class="tile"><span class="k">Ordering current liabilities</span><p>Two acceptable schemes: by due date, earliest first, or by amount, largest first.</p></div>
  </div>
</section>

<section class="sec" data-toc="Interest traps">
  <div class="eyebrow kind try">Try it</div>
  <h2>Read the fine print</h2>
  <div class="grid2">
    <div class="tile warn"><span class="k">360-day year</span><p>$100,000 at 8% for 180 days: <b>$4,000</b> using 360 days vs. <b>$3,945</b> using 365. Once a convenience before calculators, today it may just favor the lender.</p></div>
    <div class="tile warn"><span class="k">Compounding</span><p>So far we’ve used <b>simple</b> interest. Eventually interest earns interest. Loan agreements state the compounding frequency (annual, quarterly, monthly, daily, continuous); the more frequent, the more total interest. Chapter 13 goes deeper.</p></div>
  </div>
  <h3>The rule of 78s</h3>
  <p>12 + 11 + … + 1 = 78. Some loans assign 12/78 of the year’s interest to month 1, 11/78 to month 2, and so on. Borrow $100,000 for 12 months at 8% ($8,000 of interest) and see what an early payoff costs:</p>
  <div class="panel"><div data-widget="calc" data-key="r78"></div></div>
</section>

<section class="sec" data-toc="Interest up front">
  <div class="eyebrow kind">Concept</div>
  <h2>Interest included in face value</h2>
  <p>A lender may take interest up front: you receive $9,000 but sign a $10,000 note, repaying $10,000 at maturity. The rate looks like 10% ($1,000 of $10,000), but the <b>effective rate is 11.11%</b> ($1,000 of the $9,000 you actually got).</p>
  <div data-widget="journal" data-key="disc"></div>
  <p>The $1,000 <b>Discount on Note Payable</b> is a contra liability: the balance sheet shows $10,000 − $1,000 = $9,000. The discount is amortized to interest expense over the loan, including at any year end before maturity, so the full $10,000 note is offset when repaid.</p>
  <div class="callout watch"><div class="label">Truth in lending</div><p>Because lenders can tilt calculations in their favor, laws increasingly require full disclosure and sometimes limit practices outright. Borrowers should understand the full economics; lenders who overcharge or break the law can lose the right to collect.</p></div>
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
    <li><span>Borrow: debit Cash, credit Notes Payable. Repay: debit Notes Payable and Interest Expense, credit Cash.</span></li>
    <li><span>Accrue interest at year end: debit Interest Expense, credit Interest Payable.</span></li>
    <li><span>360-day years and the rule of 78s raise the interest a borrower pays.</span></li>
    <li><span>Interest in face value: record a Discount on Note Payable (contra liability) and amortize it to interest expense.</span></li>
  </ol>
</section>`,

  data: {
    jan: { entries: [
      { date: "Jan. 1, 20X8", lines: [["Cash", 10000, 0], ["Notes Payable", 0, 10000]], memo: "Borrowed on an 8%, 6-month note" },
      { date: "Jun. 30, 20X8", lines: [["Notes Payable", 10000, 0], ["Interest Expense", 400, 0], ["Cash", 0, 10400]], memo: "Repaid the note with interest" }
    ]},
    oct: { entries: [
      { date: "Oct. 1, 20X8", lines: [["Cash", 10000, 0], ["Notes Payable", 0, 10000]], memo: "Borrowed on an 8%, 6-month note" },
      { date: "Dec. 31, 20X8", lines: [["Interest Expense", 200, 0], ["Interest Payable", 0, 200]], memo: "Accrued 3 months of interest" },
      { date: "Mar. 31, 20X9", lines: [["Notes Payable", 10000, 0], ["Interest Payable", 200, 0], ["Interest Expense", 200, 0], ["Cash", 0, 10400]], memo: "Repaid: $200 accrued last year plus $200 for this year" }
    ]},
    bs: { entity: "Oliva Company", title: "Balance Sheet (excerpt)", date: "December 31, 20X8", rows: [
      { l: "Current liabilities", head: true }, { l: "Notes payable", a: 10000, ind: 1 }, { l: "Interest payable", a: 200, ind: 1 } ] },
    r78: {
      inputs: [{ id: "m", label: "Months before paying off the loan", min: 1, max: 12, step: 1, value: 2, fmt: "n" }],
      run: function (v, money) {
        var num = 0; for (var i = 0; i < v.m; i++) num += 12 - i;
        var r = Math.round(num / 78 * 8000), s = Math.round(v.m / 12 * 8000);
        return { html: '<div class="statement"><div class="st-row"><span class="st-l">Rule of 78s: ' + num + '/78 × $8,000</span><span class="st-b">' + money(r) + '</span></div><div class="st-row"><span class="st-l">Straight time: ' + v.m + '/12 × $8,000</span><span class="st-b">' + money(s) + '</span></div><div class="st-row bold"><span class="st-l">Extra interest from the rule of 78s</span><span class="st-b"><span class="uu">' + money(r - s) + '</span></span></div></div>',
          say: "Paying off after " + v.m + " month" + (v.m > 1 ? "s" : "") + " costs " + money(r) + " under the rule of 78s versus " + money(s) + " by time: <b>" + money(r - s) + " more</b>." };
      }
    },
    disc: { entries: [
      { date: "Borrow", lines: [["Cash", 9000, 0], ["Discount on Note Payable", 1000, 0], ["Notes Payable", 0, 10000]], memo: "Received $9,000 on a $10,000 note; interest included in face" },
      { date: "Maturity", lines: [["Interest Expense", 1000, 0], ["Discount on Note Payable", 0, 1000]], memo: "Amortize the discount to interest expense" },
      { date: "Maturity", lines: [["Notes Payable", 10000, 0], ["Cash", 0, 10000]], memo: "Repay the face amount" }
    ]}
  },

  cards: {
    terms: [
      { term: "Note payable", back: "A formal written promise to repay borrowed money, usually with interest." },
      { term: "Interest payable", back: "Interest accrued but not yet paid; a current liability." },
      { term: "360-day year", back: "An interest convention that slightly increases interest compared with 365 days." },
      { term: "Rule of 78s", back: "Front-loads interest (12/78 in month 1, 11/78 in month 2…), penalizing early payoff." },
      { term: "Compounding", back: "Interest earning interest; more frequent compounding means more total interest." },
      { term: "Discount on Note Payable", back: "Contra liability for interest included in a note’s face value; amortized to interest expense." },
      { term: "Truth in lending", back: "Laws requiring disclosure of loan terms and limiting abusive practices." }
    ]
  },

  quiz: [
    { q: "Oliva borrows $10,000 at 8% for six months. Interest is:", options: ["$800", "$400", "$200", "$80"], answer: 1, why: "$10,000 × 8% × 6/12." },
    { q: "Repaying that note is recorded as:", options: ["Debit Cash, credit Notes Payable", "Debit Notes Payable $10,000 and Interest Expense $400, credit Cash $10,400", "Debit Interest Expense $10,400, credit Cash", "Debit Notes Payable $10,400, credit Cash"], answer: 1, why: "The note and interest are paid together." },
    { q: "A 6-month 8% note on $10,000 is signed October 1. Interest accrued at December 31 is:", options: ["$400", "$200", "$100", "$0"], answer: 1, why: "Three months: $10,000 × 8% × 3/12." },
    { q: "Interest on $100,000 at 8% for 180 days using a 360-day year is:", options: ["$3,945", "$4,000", "$8,000", "$4,055"], answer: 1, why: "$100,000 × 8% × 180/360." },
    { q: "Under the rule of 78s, paying off a 12-month loan with $8,000 interest after 2 months costs about:", options: ["$1,333", "$2,359", "$8,000", "$667"], answer: 1, why: "23/78 × $8,000." },
    { q: "You receive $9,000 on a $10,000 note with interest included in face. The effective rate is about:", options: ["10%", "11.11%", "9%", "1%"], answer: 1, why: "$1,000 ÷ $9,000." },
    { q: "Discount on Note Payable is reported as a:", options: ["Contra liability", "Asset", "Expense immediately", "Revenue"], answer: 0, why: "It reduces the note to its $9,000 net amount." }
  ]
});

/* Lesson 7.4 · Notes Receivable */
HUB.register("7-4", {
  summary: "A note receivable is a written promise to pay a definite amount, usually with interest. Compute interest, then record a note from start to maturity, including a dishonored note and a year-end accrual.",
  objectives: [
    "Define a note receivable and its parts",
    "Compute interest as principal × rate × time",
    "Record a note, its collection, and a dishonored note",
    "Accrue interest on a note at year end"
  ],
  html: `
<section class="sec" data-toc="What a note is">
  <div class="eyebrow kind">Concept</div>
  <h2>A written promise to pay</h2>
  <p>A <b>note receivable</b> is a written promise from a customer or client to pay a definite amount on a specific future date. Notes are common when extending credit to a new customer with no credit history: the note makes the debt legal and enforceable, and it usually bears interest.</p>
  <div class="grid2">
    <div class="tile"><span class="k">Maker</span><p>The party promising to pay.</p></div>
    <div class="tile"><span class="k">Payee</span><p>The party to be paid.</p></div>
    <div class="tile"><span class="k">Principal</span><p>The stated amount of the note.</p></div>
    <div class="tile"><span class="k">Maturity date</span><p>The day the note is due.</p></div>
  </div>
</section>

<section class="sec" data-toc="Interest">
  <div class="eyebrow kind try">Try it</div>
  <h2>Interest = Principal × Rate × Time</h2>
  <p>A $1,000, 60-day note at 12% earns $1,000 × 12% × 60/360 = <b>$20</b>. A 360-day year (or 30-day months) is often assumed. It dates from before calculators, and it slightly favors the lender. <i>Caveat emptor</i>: let the buyer beware. These lessons use it for round numbers.</p>
  <div class="panel"><div data-widget="calc" data-key="int"></div></div>
</section>

<section class="sec" data-toc="Butchko and Hewlett">
  <div class="eyebrow kind">Example</div>
  <h2>From account to note to collection</h2>
  <p>Butchko sold $10,000 of merchandise to Hewlett on account. Hewlett asked for more time and signed a <b>three-month, 12% note</b>. Interest: $10,000 × 12% × 3/12 = $300.</p>
  <div data-widget="journal" data-key="note"></div>
  <h3>A dishonored note</h3>
  <p>If Hewlett refuses to pay at maturity, the note is <b>dishonored</b>. Butchko moves the full amount, including the interest earned, back to Accounts Receivable in hopes of eventually collecting. If collection looks doubtful, an allowance would be set up as in lesson 7.3.</p>
  <div data-widget="journal" data-key="dis"></div>
</section>

<section class="sec" data-toc="Year-end accrual">
  <div class="eyebrow kind">Concept</div>
  <h2>A note that spans year end</h2>
  <p>Suppose the note was signed June 1 and Butchko’s fiscal year ends June 30. One month of interest has been earned by year end and must be accrued. The rest is earned in the new year.</p>
  <div class="timeline-note"><span class="tn-a">June: $100 earned, accrued at June 30</span><span class="tn-b">July–August: $200 earned, recorded at collection</span></div>
  <div data-widget="journal" data-key="accr"></div>
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
    <li><span>A <b>note receivable</b> is a written promise to pay principal (usually plus interest) on a maturity date. Maker pays; payee receives.</span></li>
    <li><span><b>Interest = principal × rate × time</b>, often with a 360-day year.</span></li>
    <li><span>At maturity: debit Cash, credit Notes Receivable and Interest Income.</span></li>
    <li><span>Dishonored: debit Accounts Receivable for principal plus interest.</span></li>
    <li><span>Accrue interest earned at year end: debit Interest Receivable, credit Interest Income.</span></li>
  </ol>
</section>`,

  data: {
    int: {
      inputs: [
        { id: "p", label: "Principal", min: 1000, max: 21000, step: 5000, value: 1000, fmt: "$" },
        { id: "r", label: "Annual rate", min: 6, max: 18, step: 3, value: 12, fmt: "%" },
        { id: "d", label: "Days", min: 30, max: 180, step: 30, value: 60, fmt: "n" }
      ],
      run: function (v, money) {
        var i360 = v.p * v.r / 100 * v.d / 360, i365 = v.p * v.r / 100 * v.d / 365;
        return { html: '<div class="big-eq" style="font-size:20px">' + money(v.p) + ' × ' + v.r + '% × ' + v.d + '/360 = <span class="e">' + money(Math.round(i360 * 100) / 100) + '</span></div><p class="hint">With a 365-day year it would be ' + money(Math.round(i365 * 100) / 100) + '. The 360-day convention gives the lender slightly more.</p>',
          say: "Interest is <b>" + money(Math.round(i360 * 100) / 100) + "</b> using a 360-day year." };
      }
    },
    note: { entries: [
      { date: "Mar. 1", lines: [["Notes Receivable", 10000, 0], ["Accounts Receivable", 0, 10000]], memo: "Hewlett’s account converted to a 3-month, 12% note" },
      { date: "Jun. 1", lines: [["Cash", 10300, 0], ["Notes Receivable", 0, 10000], ["Interest Income", 0, 300]], memo: "Collected the maturity value: principal plus interest" }
    ]},
    dis: { entries: [{ date: "Jun. 1", lines: [["Accounts Receivable", 10300, 0], ["Notes Receivable", 0, 10000], ["Interest Income", 0, 300]], memo: "Hewlett dishonored the note" }] },
    accr: { entries: [
      { date: "Jun. 1", lines: [["Notes Receivable", 10000, 0], ["Accounts Receivable", 0, 10000]], memo: "Set up the 3-month, 12% note" },
      { date: "Jun. 30", lines: [["Interest Receivable", 100, 0], ["Interest Income", 0, 100]], memo: "Year-end accrual: $10,000 × 12% × 1/12" },
      { date: "Sep. 1", lines: [["Cash", 10300, 0], ["Notes Receivable", 0, 10000], ["Interest Receivable", 0, 100], ["Interest Income", 0, 200]], memo: "Collected; $200 of interest belongs to the new year" }
    ]}
  },

  cards: {
    terms: [
      { term: "Note receivable", back: "A written promise to pay a definite amount on a specific future date." },
      { term: "Maker", back: "The party promising to pay a note." },
      { term: "Payee", back: "The party to whom a note is payable." },
      { term: "Principal", back: "The stated amount of the note." },
      { term: "Maturity date", back: "The date the note is due." },
      { term: "Maturity value", back: "Principal plus interest due at maturity." },
      { term: "Dishonored note", back: "A note the maker fails to pay at maturity; reclassified to Accounts Receivable." },
      { term: "360-day year", back: "A convention for computing interest that simplifies math and slightly favors the lender." }
    ]
  },

  quiz: [
    { q: "The party who promises to pay a note is the:", options: ["Payee", "Maker", "Principal", "Holder"], answer: 1, why: "The maker makes the promise." },
    { q: "Interest on a $1,000, 60-day, 12% note using a 360-day year is:", options: ["$120", "$20", "$12", "$60"], answer: 1, why: "$1,000 × 12% × 60/360 = $20." },
    { q: "Interest on a $10,000, 3-month, 12% note is:", options: ["$1,200", "$300", "$100", "$3,000"], answer: 1, why: "$10,000 × 12% × 3/12." },
    { q: "Converting a customer’s $10,000 account to a note is recorded as:", options: ["Debit Notes Receivable, credit Accounts Receivable", "Debit Accounts Receivable, credit Notes Receivable", "Debit Cash, credit Notes Receivable", "Debit Notes Receivable, credit Sales"], answer: 0, why: "One receivable replaces the other." },
    { q: "When a note is dishonored, the payee debits:", options: ["Cash", "Accounts Receivable for principal plus interest", "Interest Expense", "Notes Receivable"], answer: 1, why: "It hopes to collect the full amount due." },
    { q: "A note signed June 1 with a June 30 year end requires an adjusting entry to:", options: ["Debit Interest Receivable, credit Interest Income", "Debit Interest Income, credit Cash", "Debit Notes Receivable, credit Cash", "No entry"], answer: 0, why: "Interest earned in June must be accrued." },
    { q: "Why does the 360-day convention favor the lender?", options: ["It shortens the note", "Each day is a larger fraction of a year, so slightly more interest is computed", "It lowers the rate", "It doesn’t"], answer: 1, why: "Dividing by 360 instead of 365 increases interest." }
  ]
});

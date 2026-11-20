/* Lesson 7.3 · Allowance Method for Uncollectibles */
HUB.register("7-3", {
  summary: "Estimate bad debts with an aging schedule, adjust the allowance to its target, write off accounts without touching income, and monitor receivables with turnover and days outstanding.",
  objectives: [
    "Report receivables at net realizable value using an allowance",
    "Estimate the allowance with an aging analysis and record the adjustment",
    "Record write-offs and recoveries under the allowance method",
    "Compute accounts receivable turnover and days outstanding"
  ],
  html: `
<section class="sec" data-toc="The allowance">
  <div class="eyebrow kind">Concept</div>
  <h2>Report what you expect to collect</h2>
  <p>Ito Company has $425,000 of accounts receivable at year end, but estimates that $25,500 will prove uncollectible. A better balance sheet shows the total receivables reduced by an <b>allowance</b>, a contra-asset account, to the amount expected to be collected: the <b>net realizable value</b>.</p>
  <div data-widget="statement" data-key="ito"></div>
</section>

<section class="sec" data-toc="Aging analysis">
  <div class="eyebrow kind try">Try it</div>
  <h2>Estimating the allowance with an aging</h2>
  <p>If management knew which customers wouldn’t pay, it wouldn’t have sold to them. The estimate covers the balance as a whole, based on experience. An <b>aging of accounts receivable</b> sorts receivables by how long they’ve been outstanding and applies a historical percentage to each group. The older the account, the more likely it’s bad.</p>
  <div class="panel scroll-x">
    <table class="plain">
      <thead><tr><th>Days outstanding</th><th class="num">Balance</th><th class="num">% uncollectible</th><th class="num">Estimated uncollectible</th></tr></thead>
      <tbody>
        <tr><td>Current (0–30)</td><td class="num">$250,000</td><td class="num">2%</td><td class="num">$5,000</td></tr>
        <tr><td>31–60</td><td class="num">$100,000</td><td class="num">5%</td><td class="num">$5,000</td></tr>
        <tr><td>61–90</td><td class="num">$50,000</td><td class="num">15%</td><td class="num">$7,500</td></tr>
        <tr><td>Over 90</td><td class="num">$25,000</td><td class="num">32%</td><td class="num">$8,000</td></tr>
        <tr><td><b>Total</b></td><td class="num"><b>$425,000</b></td><td></td><td class="num"><b>$25,500</b></td></tr>
      </tbody>
    </table>
  </div>
  <p>$25,500 is the <b>target</b> balance. The adjusting entry is whatever it takes to get the allowance there from its current balance, and it’s debited to expense. Ito’s allowance already has a $10,000 credit balance. Try other starting balances:</p>
  <div class="panel"><div data-widget="calc" data-key="adj"></div></div>
</section>

<section class="sec" data-toc="Writing off">
  <div class="eyebrow kind">Concept</div>
  <h2>Writing off an account doesn’t touch income</h2>
  <p>When a specific $5,000 account is finally deemed uncollectible, both the allowance and the receivable go down. There’s no expense: it was already estimated.</p>
  <div data-widget="journal" data-key="wo"></div>
  <div class="grid2">
    <div data-widget="statement" data-key="before"></div>
    <div data-widget="statement" data-key="after"></div>
  </div>
  <p>Net realizable value is <b>$399,500</b> before and after the write-off.</p>
  <h3>Collecting an account previously written off</h3>
  <p>Sometimes a struggling customer recovers and pays. Two steps: reverse the write-off, then record the collection.</p>
  <div data-widget="journal" data-key="rec"></div>
  <p>It may seem odd that the allowance goes back up. The thinking is that some other, not-yet-identified account will probably go bad, consistent with the estimates. If that doesn’t happen, the estimation rates should be revisited.</p>
  <div class="callout def"><div class="label">Matching achieved</div><p>Every allowance approach records estimated bad debt expense in the same period as the related credit sales.</p></div>
</section>

<section class="sec" data-toc="Managing receivables">
  <div class="eyebrow kind">Concept</div>
  <h2>Avoid bad debts in the first place</h2>
  <p>Accounting for bad debts matters less than <b>preventing</b> them. Check potential customers’ credit histories: credit applications, references, reports from credit agencies. When needed, require payment in advance or a guarantee such as a bank <b>letter of credit</b>. No apology is needed for checking creditworthiness, especially since many countries’ laws make collection hard to enforce.</p>
  <h3>Watch how fast receivables turn into cash</h3>
  <div class="grid2">
    <div class="tile"><span class="k">Receivables turnover</span><h4>Net credit sales ÷ Average net accounts receivable</h4></div>
    <div class="tile"><span class="k">Days outstanding</span><h4>365 ÷ Receivables turnover</h4></div>
  </div>
  <div class="panel"><div data-widget="calc" data-key="turn"></div></div>
  <p>These numbers mean most when compared with prior years and industry trends. Slower collection is one of the first signs of a business downturn, and it ripples: a company that can’t collect soon struggles to pay its own bills.</p>
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
    <li><span>Receivables − Allowance for Uncollectible Accounts = <b>net realizable value</b>.</span></li>
    <li><span>An <b>aging</b> sets the target allowance; the adjusting entry is the change needed, debited to Uncollectible Accounts Expense.</span></li>
    <li><span>Write-off: debit Allowance, credit Accounts Receivable. No effect on income or net realizable value.</span></li>
    <li><span>Recovery: reverse the write-off, then record the cash collection.</span></li>
    <li><span><b>Turnover</b> = net credit sales ÷ average net receivables; <b>days outstanding</b> = 365 ÷ turnover.</span></li>
  </ol>
</section>`,

  data: {
    ito: { entity: "Ito Company", title: "Balance Sheet (excerpt)", date: "December 31, 20X5", cols: 2, rows: [
      { l: "Current assets", head: true },
      { l: "Accounts receivable", a: 425000, ind: 1 },
      { l: "Less: Allowance for uncollectible accounts", a: -25500, ind: 1, ua: true },
      { l: "Net realizable value", b: 399500, bold: true }
    ]},
    adj: {
      inputs: [{ id: "x", label: "Allowance balance before adjusting (negative = debit balance)", min: -5000, max: 20000, step: 2500, value: 10000, fmt: "$" }],
      run: function (v, money) {
        var amt = 25500 - v.x;
        return { html: '<div class="statement"><div class="st-row"><span class="st-l">Target allowance (from aging)</span><span class="st-b">' + money(25500) + '</span></div><div class="st-row"><span class="st-l">Current balance ' + (v.x < 0 ? "(debit)" : "(credit)") + '</span><span class="st-b"><span class="u">' + money(-v.x) + '</span></span></div><div class="st-row bold"><span class="st-l">Adjusting entry</span><span class="st-b"><span class="uu">' + money(amt) + '</span></span></div></div>',
          say: "Debit Uncollectible Accounts Expense and credit the Allowance for <b>" + money(amt) + "</b>" + (v.x < 0 ? ", more than the target, because write-offs exceeded past estimates and left a debit balance." : ".") };
      }
    },
    wo: { entries: [{ date: "", lines: [["Allowance for Uncollectible Accounts", 5000, 0], ["Accounts Receivable", 0, 5000]], memo: "Wrote off a specific uncollectible account" }] },
    before: { title: "Before the write-off", cols: 1, rows: [{ l: "Accounts receivable", a: 425000 }, { l: "Less: Allowance", a: -25500, ua: true }, { l: "Net realizable value", a: 399500, bold: true, uua: true }] },
    after: { title: "After the write-off", cols: 1, rows: [{ l: "Accounts receivable", a: 420000 }, { l: "Less: Allowance", a: -20500, ua: true }, { l: "Net realizable value", a: 399500, bold: true, uua: true }] },
    rec: { entries: [
      { date: "Step 1", lines: [["Accounts Receivable", 5000, 0], ["Allowance for Uncollectible Accounts", 0, 5000]], memo: "Reverse the earlier write-off" },
      { date: "Step 2", lines: [["Cash", 5000, 0], ["Accounts Receivable", 0, 5000]], memo: "Record the collection" }
    ]},
    turn: {
      inputs: [
        { id: "s", label: "Net credit sales", min: 1000000, max: 5000000, step: 1000000, value: 3000000, fmt: "$" },
        { id: "b", label: "Beginning net receivables", min: 150000, max: 450000, step: 100000, value: 250000, fmt: "$" },
        { id: "e", label: "Ending net receivables", min: 150000, max: 450000, step: 100000, value: 350000, fmt: "$" }
      ],
      run: function (v, money) {
        var avg = (v.b + v.e) / 2, t = v.s / avg, d = 365 / t;
        return { html: '<div class="statement"><div class="st-row"><span class="st-l">Average net receivables</span><span class="st-b">' + money(avg) + '</span></div><div class="st-row bold"><span class="st-l">Turnover</span><span class="st-b">' + t.toFixed(1) + ' times</span></div><div class="st-row bold"><span class="st-l">Days outstanding</span><span class="st-b">' + d.toFixed(1) + ' days</span></div></div>',
          say: "Receivables turn over <b>" + t.toFixed(1) + " times</b> a year, so sales sit in receivables about <b>" + Math.round(d) + " days</b>." };
      }
    }
  },

  cards: {
    terms: [
      { term: "Allowance for Uncollectible Accounts", back: "Contra-asset reducing receivables to the amount expected to be collected." },
      { term: "Net realizable value (receivables)", back: "Accounts receivable minus the allowance." },
      { term: "Aging of accounts receivable", back: "Grouping receivables by age and applying historical uncollectible rates to estimate the allowance." },
      { term: "Write-off (allowance method)", back: "Debit Allowance, credit Accounts Receivable. No income effect." },
      { term: "Letter of credit", back: "A bank’s guarantee of a customer’s payment." },
      { term: "Receivables turnover", back: "Net credit sales ÷ average net accounts receivable." },
      { term: "Days outstanding", back: "365 ÷ receivables turnover: how many days of sales sit in receivables." }
    ]
  },

  quiz: [
    { q: "The allowance for uncollectible accounts is a:", options: ["Liability", "Contra-asset", "Expense", "Revenue"], answer: 1, why: "It reduces receivables to net realizable value." },
    { q: "Receivables $425,000 with an allowance of $25,500. Net realizable value is:", options: ["$425,000", "$450,500", "$399,500", "$25,500"], answer: 2, why: "$425,000 − $25,500." },
    { q: "An aging shows a needed allowance of $25,500; the allowance has a $10,000 credit balance. The adjusting entry is:", options: ["$25,500", "$35,500", "$15,500", "$10,000"], answer: 2, why: "Adjust by the change needed: $25,500 − $10,000." },
    { q: "Under the allowance method, writing off a $5,000 account:", options: ["Increases expense", "Reduces both the allowance and receivables, with no income effect", "Reduces net realizable value by $5,000", "Increases cash"], answer: 1, why: "The expense was recognized when estimated." },
    { q: "Collecting a previously written-off account first requires:", options: ["Debiting Uncollectible Accounts Expense", "Reversing the write-off", "Crediting Cash", "No entry"], answer: 1, why: "Reinstate the receivable, then record the collection." },
    { q: "Credit sales $3,000,000; average net receivables $300,000. Turnover is:", options: ["0.1", "10", "36.5", "3"], answer: 1, why: "$3,000,000 ÷ $300,000 = 10." },
    { q: "With turnover of 10, days outstanding is about:", options: ["10 days", "36.5 days", "3.65 days", "100 days"], answer: 1, why: "365 ÷ 10." },
    { q: "Rising days outstanding may signal:", options: ["Faster collections", "Weakening business conditions and higher bad debt risk", "Lower sales prices", "Better credit policies"], answer: 1, why: "Slower payment is an early warning sign." }
  ]
});

/* Lesson 7.2 · Accounting for Uncollectible Receivables */
HUB.register("7-2", {
  summary: "Some customers never pay. The direct write-off method is simple but breaks the matching principle, so allowance methods are required unless bad debts are immaterial.",
  objectives: [
    "Record a direct write-off of an uncollectible account",
    "Explain materiality",
    "Explain why direct write-off mismatches revenues and expenses",
    "Explain why allowance methods are required"
  ],
  html: `
<section class="sec" data-toc="Bad debts">
  <div class="eyebrow kind">Concept</div>
  <h2>Some receivables are never collected</h2>
  <p>Customers go broke, become unhappy and refuse to pay, or simply don’t keep their end of the bargain. Legal action often fails. So accounting needs a way to measure and report these <b>uncollectible accounts</b>, often called <b>bad debts</b>.</p>
</section>

<section class="sec" data-toc="Direct write-off">
  <div class="eyebrow kind">Concept</div>
  <h2>The direct write-off method</h2>
  <p>Remove a specific receivable when it’s finally determined to be uncollectible:</p>
  <div data-widget="journal" data-key="direct"></div>
  <p>Simple, but acceptable <b>only when bad debts are immaterial</b>. (Tax rules often require it, but that’s a separate matter.)</p>
  <div class="callout def">
    <div class="label">Materiality</div>
    <p>An item is <b>material</b> if it’s large enough to affect the judgment of an informed financial statement user. When the effect isn’t material, accounting expediency can permit a technically “incorrect” approach, like recording the card service charge in lesson 7.1 at collection. Deciding what’s material is a matter of judgment.</p>
  </div>
</section>

<section class="sec" data-toc="The matching problem">
  <div class="eyebrow kind try">Compare</div>
  <h2>What’s wrong with direct write-off</h2>
  <p>The <b>matching principle</b> says costs of producing revenue belong in the same period as that revenue. With direct write-off, many periods may pass before an account is written off, so revenue lands in one year and its bad debt cost in another.</p>
  <div class="panel">
    <div class="seg" role="group" aria-label="Method"><button type="button" class="on" data-voice-state data-m="direct">Direct write-off</button><button type="button" data-voice-state data-m="allow">Allowance method</button></div>
    <p class="hint" style="margin-top:10px">Year 1 credit sales $100,000, expenses other than bad debts $70,000. $3,000 of Year 1 sales prove uncollectible and are written off in Year 2. Year 2 has the same sales and expenses.</p>
    <div class="grid2" id="match"></div>
    <p class="verdict" id="match-say" aria-live="polite"></p>
  </div>
  <p>Allowance methods record an <b>estimated</b> bad debt expense in the same period as the related sales, and they report receivables at a fairer amount on the balance sheet. The actual write-off later generally doesn’t affect income at all. Lesson 7.3 shows how.</p>
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
    <li><span><b>Direct write-off</b>: debit Uncollectible Accounts Expense, credit Accounts Receivable when an account is deemed uncollectible.</span></li>
    <li><span>It’s acceptable only when bad debts are <b>immaterial</b>.</span></li>
    <li><span>It violates <b>matching</b>: the expense often lands in a later period than the sale.</span></li>
    <li><span><b>Allowance methods</b> estimate bad debts in the period of sale and give a fairer receivable balance.</span></li>
  </ol>
</section>`,

  data: {
    direct: { entries: [{ date: "", lines: [["Uncollectible Accounts Expense", 500, 0], ["Accounts Receivable", 0, 500]], memo: "Wrote off the account of a customer who went bankrupt" }] }
  },

  cards: {
    terms: [
      { term: "Bad debts", back: "Receivables that won’t be collected; also called uncollectible accounts." },
      { term: "Direct write-off method", back: "Expense a specific receivable when it’s determined uncollectible. Acceptable only if bad debts are immaterial." },
      { term: "Material", back: "Large enough to affect the judgment of an informed financial statement user." },
      { term: "Matching principle", back: "Costs of producing revenue are reported in the same period as that revenue." },
      { term: "Allowance method", back: "Estimating bad debts in the period of sale; required unless bad debts are immaterial." }
    ]
  },

  quiz: [
    { q: "Under direct write-off, writing off a $500 account is recorded as:", options: ["Debit Accounts Receivable, credit Uncollectible Accounts Expense", "Debit Uncollectible Accounts Expense, credit Accounts Receivable", "Debit Allowance, credit Accounts Receivable", "No entry"], answer: 1, why: "The expense is recognized when the account is written off." },
    { q: "Direct write-off is acceptable for financial reporting when:", options: ["Bad debts are material", "Bad debts are immaterial", "The company is large", "Sales are on credit"], answer: 1, why: "Otherwise an allowance method is required." },
    { q: "An item is material if:", options: ["It exceeds $1,000", "It could affect the judgment of an informed user", "It’s an expense", "It’s audited"], answer: 1, why: "Materiality is a judgment about user decisions." },
    { q: "The main flaw of the direct write-off method is that it:", options: ["Overstates cash", "Mismatches revenues and the related bad debt expense", "Is too complex", "Ignores receivables"], answer: 1, why: "The expense can land years after the sale." },
    { q: "Under an allowance method, bad debt expense is recorded:", options: ["When an account is written off", "In the same period as the related credit sales, as an estimate", "Only for tax purposes", "Never"], answer: 1, why: "Estimating matches the expense with the sales." }
  ],

  init: function (root) {
    function stmt(y, exp) {
      return { entity: "Year " + y, title: "Income", cols: 1, rows: [
        { l: "Sales", a: 100000 }, { l: "Other expenses", a: -70000 }, { l: "Uncollectible accounts expense", a: -exp, ua: true }, { l: "Net income", a: 30000 - exp, bold: true, uua: true } ] };
    }
    function draw(m) {
      var box = root.querySelector("#match");
      box.innerHTML = '<div id="m1"></div><div id="m2"></div>';
      HUB.widgets.statement(box.querySelector("#m1"), stmt(1, m === "direct" ? 0 : 3000));
      HUB.widgets.statement(box.querySelector("#m2"), stmt(2, m === "direct" ? 3000 : 0));
      root.querySelector("#match-say").innerHTML = m === "direct"
        ? "Direct write-off: Year 1 income is overstated at $30,000, and Year 2 absorbs a $3,000 expense for sales it didn’t make. Revenue and its cost are <b>mismatched</b>."
        : "Allowance method: the $3,000 estimate is expensed in Year 1 alongside the sales that caused it. Year 2’s write-off doesn’t touch income. Revenue and cost are <b>matched</b>.";
    }
    root.querySelectorAll("[data-m]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-m]").forEach(function (x) { x.classList.toggle("on", x === b); }); draw(b.getAttribute("data-m")); }); });
    draw("direct");
  }
});

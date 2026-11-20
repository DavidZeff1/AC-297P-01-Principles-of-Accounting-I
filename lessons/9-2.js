/* Lesson 9.2 · Debt Securities (trading and available-for-sale) */
HUB.register("9-2", {
  summary: "Trading and available-for-sale debt are both carried at fair value. The difference is where the change in value goes: net income or other comprehensive income.",
  objectives: [
    "Account for trading debt securities",
    "Record available-for-sale debt securities and their fair value changes",
    "Explain other comprehensive income and the all-inclusive concept",
    "Present AFS securities on the income statement and balance sheet"
  ],
  html: `
<section class="sec" data-toc="Trading">
  <div class="eyebrow kind">Concept</div>
  <h2>Trading debt: just like Chapter 6</h2>
  <p>Debt securities bought to capture gains from near-term price swings are <b>trading securities</b>, accounted for exactly like Chapter 6’s short-term investments: fair value at each balance sheet date, with changes reported as unrealized gains and losses in that period’s income.</p>
</section>

<section class="sec" data-toc="Available-for-sale">
  <div class="eyebrow kind try">Compare</div>
  <h2>Available-for-sale: fair value, but through OCI</h2>
  <p>Webster buys $50,000 of Merriam Corporation’s debt on March 3, 20X6, not for trading. By March 31 its value falls to $45,000; by April 30 it recovers to $60,000. Toggle to see how the same facts are recorded under each category.</p>
  <div class="panel">
    <div class="seg" role="group" aria-label="Category"><button type="button" class="on" data-voice-state data-cat2="afs">Available-for-sale</button><button type="button" data-voice-state data-cat2="tr">Trading</button></div>
    <div id="cmp-j" style="margin-top:12px"></div>
    <p class="verdict" id="cmp-say" aria-live="polite"></p>
  </div>
  <p>Either way the investment ends at $60,000, its market value. For AFS, OCI has been adjusted by a net $10,000 credit ($5,000 debit, $15,000 credit), matching the total rise in value. As with trading securities, some companies keep the investment at cost and use a separate Valuation Adjustments account instead.</p>
</section>

<section class="sec" data-toc="What OCI is">
  <div class="eyebrow kind">Concept</div>
  <h2>Other comprehensive income</h2>
  <p>Accounting follows an <b>all-inclusive</b> approach to income: essentially everything flows through net income. (Once, only operating items did: the “current operating” concept.) A few exceptions get special treatment, and AFS value changes are one. They go to <b>other comprehensive income (OCI)</b> rather than net income.</p>
  <p>The rationale: with an intent to hold for the longer term, temporary market swings shouldn’t move net income. Companies report OCI either in a combined <b>statement of comprehensive income</b> or in a separate schedule reconciling net income to comprehensive income. <b>Interest received</b> on AFS debt is still ordinary income.</p>
  <div data-widget="journal" data-key="int"></div>
</section>

<section class="sec" data-toc="On the statements">
  <div class="eyebrow kind">Example</div>
  <h2>Webster’s statements</h2>
  <p>Webster’s operations earned $10,000 of net income in April. AFS securities are usually classified as long-term investments, and the accumulated OCI is shown in stockholders’ equity.</p>
  <div class="grid3">
    <div data-widget="statement" data-key="ci"></div>
    <div data-widget="statement" data-key="bs1"></div>
    <div data-widget="statement" data-key="bs2"></div>
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
    <li><span><b>Trading</b> debt: fair value; changes in net income.</span></li>
    <li><span><b>Available-for-sale</b> debt: fair value; changes in <b>Unrealized Gain/Loss – OCI</b>.</span></li>
    <li><span>Interest income on AFS debt goes to net income.</span></li>
    <li><span>Comprehensive income = net income + OCI; accumulated OCI is part of stockholders’ equity.</span></li>
    <li><span>AFS securities are usually long-term investments.</span></li>
  </ol>
</section>`,

  data: {
    int: { entries: [{ date: "Apr. 30", lines: [["Cash", 500, 0], ["Interest Income", 0, 500]], memo: "Interest received on the Merriam debt" }] },
    ci: { entity: "Webster Company", title: "Statement of Comprehensive Income (lower portion)", date: "For the Month Ended April 30, 20X6", rows: [
      { l: "Net income", a: 10000 },
      { l: "Other comprehensive income: unrealized gain on available-for-sale debt", a: 15000, ua: true },
      { l: "Comprehensive income", a: 25000, bold: true, uua: true }
    ]},
    bs1: { entity: "Webster Company", title: "Balance Sheet (excerpt)", date: "March 31, 20X6", rows: [
      { l: "Long-term investments", head: true },
      { l: "Available-for-sale debt securities", a: 45000, ind: 1 },
      { l: "Stockholders’ equity", head: true },
      { l: "Accumulated other comprehensive income", a: -5000, ind: 1, link: "aoci" }
    ]},
    bs2: { entity: "Webster Company", title: "Balance Sheet (excerpt)", date: "April 30, 20X6", rows: [
      { l: "Long-term investments", head: true },
      { l: "Available-for-sale debt securities", a: 60000, ind: 1 },
      { l: "Stockholders’ equity", head: true },
      { l: "Accumulated other comprehensive income", a: 10000, ind: 1, link: "aoci" }
    ]}
  },

  cards: {
    terms: [
      { term: "Trading securities (debt)", back: "Fair value, with unrealized gains and losses in net income." },
      { term: "Available-for-sale securities", back: "Fair value, with unrealized gains and losses in other comprehensive income." },
      { term: "Other comprehensive income (OCI)", back: "Certain gains and losses excluded from net income, such as AFS value changes." },
      { term: "All-inclusive concept", back: "The view that essentially all transactions and events flow through net income." },
      { term: "Comprehensive income", back: "Net income plus other comprehensive income." },
      { term: "Accumulated OCI", back: "The running total of OCI, reported in stockholders’ equity." }
    ]
  },

  quiz: [
    { q: "Trading and available-for-sale debt securities are both reported at:", options: ["Amortized cost", "Fair value", "Historical cost", "Face value"], answer: 1, why: "They differ only in where value changes go." },
    { q: "A $5,000 decline in AFS debt is recorded with a debit to:", options: ["Unrealized Loss in net income", "Unrealized Gain/Loss – OCI", "Interest Expense", "Retained Earnings"], answer: 1, why: "AFS changes bypass net income." },
    { q: "Why are AFS value changes kept out of net income?", options: ["They aren’t real", "With intent to hold longer, temporary swings shouldn’t move net income", "GAAP forbids recording them", "They’re tax items"], answer: 1, why: "That’s the rationale for OCI." },
    { q: "Interest received on AFS debt is reported in:", options: ["OCI", "Net income", "Equity directly", "Not reported"], answer: 1, why: "Interest income is ordinary income." },
    { q: "Net income $10,000 and an AFS unrealized gain of $15,000. Comprehensive income is:", options: ["$10,000", "$15,000", "$25,000", "$5,000"], answer: 2, why: "Net income + OCI." },
    { q: "Accumulated other comprehensive income appears in:", options: ["Current assets", "Stockholders’ equity", "Long-term liabilities", "The income statement only"], answer: 1, why: "It’s appended to equity." }
  ],

  init: function (root) {
    function draw(c) {
      var acct = c === "afs" ? "Available-for-Sale Debt Securities" : "Trading Debt Securities", gl = c === "afs" ? "Unrealized Gain/Loss – OCI" : "Unrealized Loss on Investments", gg = c === "afs" ? "Unrealized Gain/Loss – OCI" : "Unrealized Gain on Investments";
      HUB.widgets.journal(root.querySelector("#cmp-j"), { entries: [
        { date: "Mar. 3", lines: [[acct, 50000, 0], ["Cash", 0, 50000]], memo: "Bought Merriam debt" },
        { date: "Mar. 31", lines: [[gl, 5000, 0], [acct, 0, 5000]], memo: "Value fell to $45,000" },
        { date: "Apr. 30", lines: [[acct, 15000, 0], [gg, 0, 15000]], memo: "Value rose to $60,000" } ] });
      root.querySelector("#cmp-say").innerHTML = c === "afs" ? "Available-for-sale: the $5,000 loss and $15,000 gain go to <b>other comprehensive income</b>. Net income isn’t affected."
        : "Trading: the $5,000 loss hits <b>March net income</b> and the $15,000 gain hits <b>April net income</b>.";
    }
    root.querySelectorAll("[data-cat2]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-cat2]").forEach(function (x) { x.classList.toggle("on", x === b); }); draw(b.getAttribute("data-cat2")); }); });
    draw("afs");
  }
});

/* Lesson 3.1 · "Measurement Triggering" Transactions and Events */
HUB.register("3-1", {
  summary: "What triggers an accounting measurement: mostly exchange transactions, sometimes non-exchange events like a fire. Learn how revenues, expenses, gains, and losses combine into income.",
  objectives: [
    "Contrast economic income with accounting income",
    "Define revenues, expenses, gains, and losses",
    "Compute income as revenues + gains − expenses − losses",
    "Record a non-exchange event such as an uninsured loss"
  ],
  html: `
<section class="sec" data-toc="Two ideas of income">
  <div class="eyebrow kind">Concept</div>
  <h2>Economists and accountants measure income differently</h2>
  <div class="grid2">
    <div class="tile alt"><span class="k">Economic income</span><h4>“Better-offness”</h4><p>Any increase in your command over goods and services. It includes operating success <b>and</b> good fortune, like land you own rising in value.</p></div>
    <div class="tile"><span class="k">Accounting income</span><h4>Based on exchanges</h4><p>Focuses on transactions with other parties, recorded at historical cost. Land stays at its purchase price until it’s sold.</p></div>
  </div>
  <p>Accounting rules worldwide have gradually accepted <b>fair value</b> for selected items, and the debate over when to record changes in value continues. The rules will keep evolving.</p>
</section>

<section class="sec" data-toc="Four building blocks">
  <div class="eyebrow kind">Concept</div>
  <h2>Revenues, expenses, gains, and losses</h2>
  <p>Two general rules: measurements are usually based on <b>historical cost</b> from an exchange with another party, and income is determined from those transactions. More precisely:</p>
  <div class="grid2">
    <div class="tile"><span class="k">Revenues</span><p>Inflows and enhancements from delivering goods and services that are the company’s <b>central, ongoing operations</b>.</p></div>
    <div class="tile warn"><span class="k">Expenses</span><p>Outflows and obligations from producing those goods and services: central, ongoing operations.</p></div>
    <div class="tile"><span class="k">Gains</span><p>Like revenues, but from <b>peripheral</b> transactions or events, outside the main line of business.</p></div>
    <div class="tile warn"><span class="k">Losses</span><p>Like expenses, but from peripheral transactions or events.</p></div>
  </div>
  <div class="big-eq"><span class="a">Revenues</span> + <span class="a">Gains</span> − <span class="l">Expenses</span> − <span class="l">Losses</span> = <span class="e">Income</span></div>
  <p class="hint">In some countries “revenues” is an all-inclusive term that covers both revenues and gains.</p>
  <div class="panel">
    <div class="panel-title"><h3>Revenue, gain, expense, or loss?</h3><span class="hint">For a company that runs a chain of bakeries</span></div>
    <div data-widget="sorter" data-key="rgel"></div>
  </div>
  <div class="panel">
    <div class="panel-title"><h3>Compute income</h3><span class="hint">Drag the sliders</span></div>
    <div data-widget="calc" data-key="income"></div>
  </div>
</section>

<section class="sec" data-toc="Non-exchange events">
  <div class="eyebrow kind try">Example</div>
  <h2>Some events must be recorded without an exchange</h2>
  <p>Most income measurement is triggered by exchanges, but correct statements also require recording certain <b>non-exchange events</b>. Suppose an uninsured building is destroyed by fire or a storm. No one bought or sold anything, but the asset is gone, so it must come off the books as an immediate loss.</p>
  <div class="panel"><div data-widget="worked" data-key="fire"></div></div>
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
    <li><span><b>Economic income</b> is “better-offness,” including holding gains. <b>Accounting income</b> is mostly based on exchange transactions at historical cost.</span></li>
    <li><span><b>Revenues and expenses</b> come from central, ongoing operations; <b>gains and losses</b> come from peripheral activities.</span></li>
    <li><span><b>Income = revenues + gains − expenses − losses.</b></span></li>
    <li><span>Non-exchange events, like an uninsured fire loss, are still recorded: debit a loss, credit the asset.</span></li>
  </ol>
</section>`,

  data: {
    income: {
      inputs: [
        { id: "r", label: "Revenues", min: 0, max: 200000, step: 20000, value: 120000, fmt: "$" },
        { id: "g", label: "Gains", min: 0, max: 20000, step: 5000, value: 5000, fmt: "$" },
        { id: "e", label: "Expenses", min: 0, max: 200000, step: 20000, value: 80000, fmt: "$" },
        { id: "l", label: "Losses", min: 0, max: 20000, step: 5000, value: 0, fmt: "$" }
      ],
      run: function (v, money) {
        var inc = v.r + v.g - v.e - v.l;
        return {
          html: '<div class="big-eq" style="font-size:20px">' + money(v.r) + ' + ' + money(v.g) + ' − ' + money(v.e) + ' − ' + money(v.l) + ' = <span class="' + (inc >= 0 ? "e" : "l") + '">' + money(inc) + '</span></div>',
          say: inc >= 0 ? "Net income is <b>" + money(inc) + "</b>." : "That’s a net loss of <b>" + money(-inc) + "</b>."
        };
      }
    },
    fireEntry: { entries: [{ date: "", lines: [["Loss from Storm", 80000, 0], ["Warehouse", 0, 80000]], memo: "Uninsured warehouse destroyed by storm" }] },
    fire: {
      q: "<p>A storm destroys an uninsured warehouse that was carried on the books at <b>$80,000</b>. Record it.</p>",
      steps: [
        "There’s no exchange with another party, but the asset no longer exists. Leaving it on the books would overstate assets.",
        "It’s outside central operations, so it’s a <b>loss</b>, recognized immediately.",
        "Losses behave like expenses, so they increase with a <b>debit</b>. The building (an asset) decreases with a <b>credit</b>."
      ],
      answer: '<div data-widget="journal" data-key="fireEntry"></div><p><b>Debit Loss from Storm $80,000; credit Warehouse $80,000.</b></p>'
    }
  },

  sorters: {
    rgel: {
      categories: [{ id: "rev", label: "Revenue" }, { id: "gain", label: "Gain" }, { id: "exp", label: "Expense" }, { id: "loss", label: "Loss" }],
      items: [
        { text: "Sales of bread and pastries", cat: "rev", why: "Selling baked goods is the company’s central, ongoing operation." },
        { text: "Wages paid to bakers", cat: "exp", why: "A cost of producing the company’s main products." },
        { text: "Sold an old delivery van for more than its book value", cat: "gain", why: "Selling a van is peripheral to running bakeries." },
        { text: "An uninsured oven destroyed in a kitchen fire", cat: "loss", why: "A peripheral event that reduces assets with nothing received." },
        { text: "Flour and sugar used in baking", cat: "exp", why: "Ingredients are costs of the central operation." },
        { text: "Sold a vacant lot at less than its cost", cat: "loss", why: "Land sales are peripheral; selling below cost produces a loss." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Economic income", back: "An increase in command over goods and services (“better-offness”), including holding gains." },
      { term: "Exchange transaction", back: "A transaction with another party, such as a purchase or sale, that triggers accounting measurement." },
      { term: "Revenues", back: "Inflows from delivering goods and services that constitute central, ongoing operations." },
      { term: "Expenses", back: "Outflows and obligations from producing goods and services in central, ongoing operations." },
      { term: "Gains", back: "Increases like revenues, but from peripheral transactions or events." },
      { term: "Losses", back: "Decreases like expenses, but from peripheral transactions or events." },
      { term: "Non-exchange event", back: "An event with no external exchange that must still be recorded, such as an uninsured casualty loss." }
    ]
  },

  quiz: [
    { q: "Economists describe income as a measure of:", options: ["Cash collected", "“Better-offness”", "Historical cost", "Sales volume"], answer: 1, why: "Economic income is an increase in command over goods and services." },
    { q: "Accounting income is generally based on:", options: ["Changes in market value of all assets", "Exchange transactions measured at historical cost", "Management’s estimate of company value", "Cash receipts only"], answer: 1, why: "Accounting measurements tend to rely on exchanges with other parties." },
    { q: "Gains differ from revenues because gains arise from:", options: ["Central, ongoing operations", "Peripheral transactions or events", "Owner investments", "Borrowing"], answer: 1, why: "Revenues come from central operations; gains from peripheral activities." },
    { q: "Revenues $100,000, gains $4,000, expenses $70,000, losses $9,000. Income is:", options: ["$25,000", "$34,000", "$30,000", "$183,000"], answer: 0, why: "$100,000 + $4,000 − $70,000 − $9,000 = $25,000." },
    { q: "An uninsured building worth $50,000 is destroyed by a storm. The entry is:", options: ["Debit Building, credit Loss", "Debit Loss, credit Building", "No entry; there was no exchange", "Debit Cash, credit Building"], answer: 1, why: "Losses increase with debits; the asset decreases with a credit." },
    { q: "For a software company, selling an old office building at a profit produces a:", options: ["Revenue", "Gain", "Expense", "Loss"], answer: 1, why: "Selling buildings is peripheral to a software business." }
  ]
});

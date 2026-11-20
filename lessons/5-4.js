/* Lesson 5.4 · Income Statement Enhancements */
HUB.register("5-4", {
  summary: "Single-step or multiple-step? See how the format of the income statement can reveal or mask what’s really happening, and use margins to track performance.",
  objectives: [
    "Prepare single-step and multiple-step income statements",
    "Explain why gains, interest, and taxes are shown separately",
    "Compute gross profit margin and net profit on sales",
    "Describe global practices: expenses by nature or function"
  ],
  html: `
<section class="sec" data-toc="Two formats">
  <div class="eyebrow kind try">Compare</div>
  <h2>Single-step or multiple-step</h2>
  <p>Accountants consider how much detail readers can absorb. A <b>single-step</b> statement lists all revenues and gains together, then all expenses and losses, and subtracts once. A <b>multiple-step</b> statement divides results into stages. Toggle between them for Hunter Company.</p>
  <div class="panel">
    <div class="seg" role="group" aria-label="Format"><button type="button" class="on" data-voice-state data-fmt="multi">Multiple-step</button><button type="button" data-voice-state data-fmt="single">Single-step</button></div>
    <div class="grid2" style="margin-top:14px"><div id="hunter"></div><div class="tile" id="hunter-note" aria-live="polite"></div></div>
  </div>
  <div class="callout watch">
    <div class="label">Watch out</div>
    <p>Look past the bottom line. A company’s core operations could be weak while net income looks fine because of a one-time gain on selling assets. Unmasking effects like that is a strong argument for the multiple-step format.</p>
  </div>
</section>

<section class="sec" data-toc="The steps explained">
  <div class="eyebrow kind">Concept</div>
  <h2>What each step separates</h2>
  <div data-widget="steps" data-key="parts"></div>
</section>

<section class="sec" data-toc="Margins">
  <div class="eyebrow kind">Concept</div>
  <h2>Watch the percentages, not just the dollars</h2>
  <div class="grid2">
    <div class="tile"><span class="k">Gross profit margin</span><h4>Gross profit ÷ Net sales</h4><p>Hunter: $370,000 ÷ $653,000 = <b>56.66%</b></p></div>
    <div class="tile"><span class="k">Net profit on sales</span><h4>Net income ÷ Net sales</h4><p>Hunter: $39,000 ÷ $653,000 = <b>5.97%</b></p></div>
  </div>
  <div class="panel"><div data-widget="worked" data-key="liu"></div></div>
  <p>Even slight changes in business conditions can shift the relationship between revenues and costs. Smart managers and investors watch gross and net profit percentages over time.</p>
</section>

<section class="sec" data-toc="Global practice">
  <div class="eyebrow kind">Concept</div>
  <h2>The global view</h2>
  <p>International standards don’t prescribe a detailed income statement format, so “single-step” and “multiple-step” matter less. The focus is on revenues, financing costs, shares of profit from ventures and investments, tax expense, and profit or loss. Expenses can be classified either way:</p>
  <div class="grid2">
    <div class="tile"><span class="k">By nature</span><p>What the cost is: utilities, salaries, advertising, insurance.</p></div>
    <div class="tile alt"><span class="k">By function</span><p>What it’s for: manufacturing, administrative, sales. Supplemental notes then give the nature of the costs.</p></div>
  </div>
  <p>Global rules can be more permissive about recording gains and losses from changing values of land and buildings, so a company may add a <b>statement of recognized income and expense</b> reconciling net income to that broader measure.</p>
  <div class="panel">
    <div class="panel-title"><h3>Nature or function?</h3><span class="hint">How is each expense label classified?</span></div>
    <div data-widget="sorter" data-key="nf"></div>
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
    <li><span><b>Single-step</b>: total revenues and gains − total expenses and losses. Simple but can mask weak operations.</span></li>
    <li><span><b>Multiple-step</b>: gross profit, operating expenses (selling and G&amp;A), income from operations, other items, income before tax, tax, net income.</span></li>
    <li><span>Gains and losses, interest, and income taxes are shown separately for clarity.</span></li>
    <li><span><b>Gross profit margin</b> = gross profit ÷ net sales; <b>net profit on sales</b> = net income ÷ net sales.</span></li>
    <li><span>IFRS classifies expenses by <b>nature</b> or <b>function</b>.</span></li>
  </ol>
</section>`,

  data: {
    parts: { numbered: false, items: [
      { t: "Gross profit", b: "<p>Net sales − cost of goods sold: the margin on merchandise.</p>" },
      { t: "Selling vs. G&A", b: "<p><b>Selling expenses</b> relate to selling merchandise; <b>general and administrative</b> expenses to managing the business. Some costs are allocated between them, like depreciation on a headquarters used for both.</p>" },
      { t: "Gains and losses", b: "<p>Incidental or peripheral items, like a gain on selling land or a fire loss, are reported separately from ongoing revenues and expenses. (Discontinued operations come later.)</p>" },
      { t: "Interest", b: "<p>Financing costs are broken out so readers can judge whether borrowing (“leverage”) produces enough extra income to cover its cost. Interest is still a real cost.</p>" },
      { t: "Income taxes", b: "<p>Income before tax, then tax, then net income.</p>" }
    ]},
    liu: {
      q: "<p>Liu’s Janitorial Supply sells plastic trash cans. Year 1: sales $3,000,000, cost $2,700,000. In Year 2, oil prices fall, Liu passes the savings on, and sales drop to $1,000,000 with cost $700,000. Should Liu despair?</p>",
      steps: [
        "Gross profit in Year 1: $3,000,000 − $2,700,000 = <b>$300,000</b>. Margin: $300,000 ÷ $3,000,000 = <b>10%</b>.",
        "Gross profit in Year 2: $1,000,000 − $700,000 = <b>$300,000</b>. Margin: $300,000 ÷ $1,000,000 = <b>30%</b>."
      ],
      answer: "<p>No. Gross profit is the same $300,000 and the margin tripled. Liu may actually be better off with far less sales volume to support.</p>"
    }
  },

  sorters: {
    nf: {
      categories: [{ id: "n", label: "Nature" }, { id: "f", label: "Function" }],
      items: [
        { text: "Salaries expense", cat: "n", why: "It describes what the cost is." },
        { text: "Administrative expenses", cat: "f", why: "It describes what the cost is for." },
        { text: "Utilities expense", cat: "n", why: "A type of cost." },
        { text: "Selling expenses", cat: "f", why: "A purpose: selling." },
        { text: "Manufacturing costs", cat: "f", why: "A purpose: production." },
        { text: "Insurance expense", cat: "n", why: "A type of cost." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Single-step income statement", back: "All revenues and gains together, minus all expenses and losses together." },
      { term: "Multiple-step income statement", back: "Results divided into stages: gross profit, operating income, other items, pretax income, tax, net income." },
      { term: "Selling expenses", back: "Costs associated with selling merchandise." },
      { term: "General and administrative expenses", back: "Costs of managing the business." },
      { term: "Leverage", back: "Using borrowed money to finance operations and growth." },
      { term: "Gross profit margin", back: "Gross profit ÷ net sales." },
      { term: "Net profit on sales", back: "Net income ÷ net sales." },
      { term: "Expenses by nature / by function", back: "Classified by what they are (salaries, utilities) or what they’re for (sales, administration)." }
    ]
  },

  quiz: [
    { q: "A single-step income statement:", options: ["Shows gross profit as a separate step", "Groups all revenues and gains, then subtracts all expenses and losses", "Excludes income taxes", "Is required by IFRS"], answer: 1, why: "One subtraction produces net income." },
    { q: "Why might a single-step statement be misleading?", options: ["It always overstates income", "It can mask weak core operations behind a one-time gain", "It omits revenue", "It doesn’t balance"], answer: 1, why: "The multiple-step format separates operations from peripheral items." },
    { q: "Why is interest expense often shown separately?", options: ["It isn’t a real cost", "To separate operating results from the cost of financing", "Because it’s a gain", "GAAP prohibits including it"], answer: 1, why: "It lets users judge whether borrowing pays off." },
    { q: "Hunter’s gross profit is $370,000 on net sales of $653,000. The gross profit margin is about:", options: ["5.97%", "56.66%", "43.34%", "176%"], answer: 1, why: "$370,000 ÷ $653,000 ≈ 56.66%." },
    { q: "Hunter’s net income is $39,000 on net sales of $653,000. Net profit on sales is about:", options: ["5.97%", "56.66%", "10%", "3.9%"], answer: 0, why: "$39,000 ÷ $653,000 ≈ 5.97%." },
    { q: "Liu’s sales fall from $3,000,000 to $1,000,000, but gross profit stays at $300,000. The gross profit margin:", options: ["Falls from 30% to 10%", "Rises from 10% to 30%", "Stays at 10%", "Becomes negative"], answer: 1, why: "Same profit on a third of the sales." },
    { q: "Classifying expenses as manufacturing, administrative, and sales is classification by:", options: ["Nature", "Function", "Liquidity", "Period"], answer: 1, why: "Those labels describe purpose." }
  ],

  init: function (root) {
    var W = HUB.widgets;
    var M = { entity: "Hunter Company", title: "Income Statement (multiple-step)", date: "For the Year Ended December 31, 20X5", cols: 2, rows: [
      { l: "Net sales", b: 653000 }, { l: "Cost of goods sold", b: -283000, ub: true }, { l: "Gross profit", b: 370000, bold: true },
      { l: "Operating expenses", head: true }, { l: "Selling expenses", a: 160000, ind: 1 }, { l: "General and administrative expenses", a: 140000, ind: 1, ua: true },
      { l: "Total operating expenses", b: -300000, ub: true }, { l: "Income from operations", b: 70000, bold: true },
      { l: "Other items", head: true }, { l: "Gain on sale of land", a: 5000, ind: 1 }, { l: "Interest expense", a: -20000, ind: 1, ua: true },
      { l: "Total other items", b: -15000, ub: true }, { l: "Income before income taxes", b: 55000 }, { l: "Income taxes", b: -16000, ub: true },
      { l: "Net income", b: 39000, bold: true, uub: true } ] };
    var S = { entity: "Hunter Company", title: "Income Statement (single-step)", date: "For the Year Ended December 31, 20X5", cols: 2, rows: [
      { l: "Revenues and gains", head: true }, { l: "Net sales", a: 653000, ind: 1 }, { l: "Gain on sale of land", a: 5000, ind: 1, ua: true }, { l: "Total revenues and gains", b: 658000 },
      { l: "Expenses", head: true }, { l: "Cost of goods sold", a: 283000, ind: 1 }, { l: "Selling expenses", a: 160000, ind: 1 }, { l: "General and administrative", a: 140000, ind: 1 },
      { l: "Interest expense", a: 20000, ind: 1 }, { l: "Income taxes", a: 16000, ind: 1, ua: true }, { l: "Total expenses", b: -619000, ub: true },
      { l: "Net income", b: 39000, bold: true, uub: true } ] };
    function draw(k) {
      W.statement(root.querySelector("#hunter"), k === "multi" ? M : S);
      root.querySelector("#hunter-note").innerHTML = k === "multi"
        ? '<span class="k">Multiple-step</span><p>You can see gross profit ($370,000), operating income ($70,000), the separate $5,000 gain and $20,000 of interest, and taxes before arriving at $39,000.</p>'
        : '<span class="k">Single-step</span><p>Same $39,000 bottom line, but gross profit and operating income aren’t shown, and the land gain is mixed in with sales.</p>';
    }
    root.querySelectorAll("[data-fmt]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-fmt]").forEach(function (x) { x.classList.toggle("on", x === b); }); draw(b.getAttribute("data-fmt")); }); });
    draw("multi");
  }
});

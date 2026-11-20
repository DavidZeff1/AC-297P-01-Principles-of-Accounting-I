/* Lesson 3.2 · The Periodicity Assumption */
HUB.register("3-2", {
  summary: "Business never stops, but reports need a cutoff. The periodicity assumption divides activity into months, quarters, and years, which is what makes accrual accounting necessary.",
  objectives: [
    "Explain the periodicity assumption and why it’s needed",
    "Distinguish a calendar year from a fiscal year",
    "Explain why shorter periods make measurement harder",
    "Define accrual-basis accounting"
  ],
  html: `
<section class="sec" data-toc="A line in the sand">
  <div class="eyebrow kind">Concept</div>
  <h2>Drawing a line in the sand of time</h2>
  <p>Business activity is fluid: earning revenue and incurring expenses never stop just because a calendar page turns. But to measure performance you have to draw a line somewhere. The <b>periodicity assumption</b> says business activity can be divided into measurement intervals such as <b>months, quarters, and years</b>.</p>
</section>

<section class="sec" data-toc="Calendar vs. fiscal year">
  <div class="eyebrow kind try">Explore</div>
  <h2>Calendar year or fiscal year</h2>
  <p>An annual period can follow the <b>calendar year</b>, January 1 through December 31, usually split into four <b>quarters</b> of three months. Or a company can adopt a <b>fiscal year</b>: any twelve-month period. Fiscal years often follow the natural business cycle. A retailer might end its year on <b>January 31</b> so the holiday rush, and the returns that follow, all land in the same year.</p>
  <div class="panel">
    <div class="seg" role="group" aria-label="Year type"><button type="button" class="on" data-voice-state data-yr="cal">Calendar year</button><button type="button" data-voice-state data-yr="fis">Retailer’s fiscal year</button></div>
    <div class="yearbar" id="yearbar"></div>
    <p class="verdict" id="year-say" aria-live="polite"></p>
  </div>
  <p>Note the naming convention: a fiscal year is named for the year in which it <b>ends</b>. February 1, 20X7 through January 31, 20X8 is the <b>20X8 fiscal year</b>. Companies may also prepare internal reports monthly.</p>
</section>

<section class="sec" data-toc="Shorter is harder">
  <div class="eyebrow kind">Concept</div>
  <h2>The shorter the period, the harder the measurement</h2>
  <p>Continuous activity must be divided among periods. The more periods there are, the more often a single transaction has to be split across more than one of them.</p>
  <div class="panel"><div data-widget="worked" data-key="software"></div></div>
  <h3>Why not just wait until everything is finished?</h3>
  <div class="grid2">
    <div class="tile"><span class="k">Reason 1</span><p>You might wait a very long time for activities to close and become measurable with certainty.</p></div>
    <div class="tile"><span class="k">Reason 2</span><p>Investors can’t wait years to learn how a business is doing. Timeliness is critical to the relevance of information.</p></div>
  </div>
</section>

<section class="sec" data-toc="Accrual basis">
  <div class="eyebrow kind">Concept</div>
  <h2>Accrual-basis accounting</h2>
  <p>Once the period is set, the accountant applies GAAP to assign revenues and expenses to it. This is <b>accrual-basis accounting</b>: measuring revenues <b>as earned</b> and expenses <b>as incurred</b>. (To <i>accrue</i> means to come about as a natural growth or increase.)</p>
  <p>Assigning revenues and expenses to the right period is pivotal: it determines reported income, which investors and creditors care about deeply. The next two lessons give the basic rules for revenue and expense recognition.</p>
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
    <li><span>The <b>periodicity assumption</b> divides continuous activity into months, quarters, and years.</span></li>
    <li><span>A <b>calendar year</b> runs January–December; a <b>fiscal year</b> is any 12 months and is named for the year it ends.</span></li>
    <li><span>Shorter periods mean more transactions must be split across periods.</span></li>
    <li><span><b>Accrual-basis accounting</b> records revenues as earned and expenses as incurred.</span></li>
    <li><span>We accept the difficulty because timely information is more relevant.</span></li>
  </ol>
</section>`,

  data: {
    software: {
      q: "<p>A software company sells a product for <b>$25,000</b> in 20X1 and promises free updates throughout 20X2 and 20X3. How much revenue is earned in each year?</p>",
      steps: [
        "If the company reported only once, for the whole three years, the answer would be easy: <b>$25,000</b>.",
        "Because it must report <b>every year</b>, it has to decide how much of the $25,000 belongs to the sale itself in 20X1 and how much to the updates delivered in 20X2 and 20X3.",
        "Answering requires more facts about the product and the updates. Lesson 3.3 introduces the rules that guide this allocation."
      ],
      answer: "<p>The <b>periodicity assumption</b> is what makes the question hard: it forces one transaction to be divided among three reporting periods.</p>"
    }
  },

  cards: {
    terms: [
      { term: "Periodicity assumption", back: "The assumption that business activity can be divided into measurement intervals: months, quarters, years." },
      { term: "Calendar year", back: "An annual period from January 1 through December 31." },
      { term: "Fiscal year", back: "Any 12-month reporting year, named for the year in which it ends." },
      { term: "Quarter", back: "A three-month reporting period; four per year." },
      { term: "Natural business year", back: "A fiscal year chosen to end at a natural low point in activity, such as January 31 for a retailer." },
      { term: "Accrual-basis accounting", back: "Measuring revenues as earned and expenses as incurred, assigned to the proper period." }
    ]
  },

  quiz: [
    { q: "The periodicity assumption states that:", options: ["Businesses will operate forever", "Business activity can be divided into measurement intervals", "All assets are recorded at fair value", "Revenue is recorded when cash is received"], answer: 1, why: "It lets accountants report on months, quarters, and years." },
    { q: "A fiscal year that runs February 1, 20X7 through January 31, 20X8 is called the:", options: ["20X7 fiscal year", "20X8 fiscal year", "20X7–X8 calendar year", "Second quarter"], answer: 1, why: "Fiscal years are named for the year in which they end." },
    { q: "Why might a retailer end its fiscal year on January 31?", options: ["Tax law requires it", "So the holiday rush and its returns fall in the same year", "Because sales peak in January", "To avoid quarterly reports"], answer: 1, why: "It follows the natural business cycle." },
    { q: "As reporting periods get shorter, measurement becomes:", options: ["Easier", "More challenging", "Unnecessary", "Exact"], answer: 1, why: "More transactions must be allocated across more than one period." },
    { q: "Accrual-basis accounting measures:", options: ["Revenues when cash is received and expenses when paid", "Revenues as earned and expenses as incurred", "Only cash transactions", "Changes in fair value"], answer: 1, why: "That’s the definition of the accrual basis." },
    { q: "Why don’t accountants simply wait until all activities are complete before reporting?", options: ["It’s illegal to wait", "Investors need timely information to make decisions", "Waiting would make income higher", "Auditors require monthly reports"], answer: 1, why: "Timeliness is critical to the relevance of information." }
  ],

  init: function (root) {
    var M = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var bar = root.querySelector("#yearbar"), say = root.querySelector("#year-say");
    function draw(kind) {
      var months = kind === "cal" ? M.map(function (m) { return [m, "20X8"]; }) : M.slice(1).map(function (m) { return [m, "20X7"]; }).concat([["Jan", "20X8"]]);
      var h = '<div class="yb-months">';
      months.forEach(function (m, i) { h += '<div class="yb-m q' + (Math.floor(i / 3) + 1) + (kind === "fis" && i >= 9 ? " rush" : "") + '"><b>' + m[0] + '</b><span>' + m[1] + '</span></div>'; });
      h += '</div><div class="yb-qs">' + [1, 2, 3, 4].map(function (q) { return '<div>Q' + q + '</div>'; }).join("") + '</div>';
      bar.innerHTML = h;
      say.innerHTML = kind === "cal" ? "The <b>20X8 calendar year</b> runs January 1 through December 31, 20X8, in four quarters of three months."
        : "The retailer’s <b>20X8 fiscal year</b> runs February 1, 20X7 through January 31, 20X8. The holiday season and January returns land in the same fourth quarter.";
    }
    root.querySelectorAll("[data-yr]").forEach(function (b) {
      b.addEventListener("click", function () { root.querySelectorAll("[data-yr]").forEach(function (x) { x.classList.toggle("on", x === b); }); draw(b.getAttribute("data-yr")); });
    });
    draw("cal");
  }
});

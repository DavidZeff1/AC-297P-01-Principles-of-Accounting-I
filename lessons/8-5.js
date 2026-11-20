/* Lesson 8.5 · Inventory Estimation Techniques */
HUB.register("8-5", {
  summary: "When a physical count isn’t possible or practical, estimate inventory with the gross profit method (Tiki’s fire) or the retail method (Crock Buster’s pots).",
  objectives: [
    "Explain when inventory must be estimated",
    "Estimate inventory with the gross profit method",
    "Estimate inventory with the retail method"
  ],
  html: `
<section class="sec" data-toc="When to estimate">
  <div class="eyebrow kind">Concept</div>
  <h2>When counting isn’t possible</h2>
  <p>Periodic or perpetual, a company should take a physical count from time to time, and the count is presumed correct. But sometimes a count is impossible or not cost-effective: monthly or quarterly statements, or a fire that destroyed the goods. Then inventory is estimated.</p>
</section>

<section class="sec" data-toc="Gross profit method">
  <div class="eyebrow kind try">Try it</div>
  <h2>The gross profit method</h2>
  <p>Use the company’s normal gross profit rate to estimate cost of goods sold, then back into ending inventory. Tiki’s inventory was destroyed by fire. Before the fire: sales $1,000,000, beginning inventory $500,000, purchases $800,000. Tiki normally earns a 40% gross profit rate.</p>
  <div class="panel"><div data-widget="calc" data-key="gp"></div></div>
</section>

<section class="sec" data-toc="Retail method">
  <div class="eyebrow kind try">Example</div>
  <h2>The retail method</h2>
  <p>Widely used by merchants, but only for categories with a consistent markup. Multiply ending inventory <b>at retail</b> by the <b>cost-to-retail percentage</b>. Ending retail can come from a count at retail prices, or from goods available at retail minus sales.</p>
  <div class="panel"><div data-widget="worked" data-key="crock"></div></div>
  <div class="callout watch"><div class="label">Watch the direction</div><p>To convert cost to retail, <b>divide</b> by the cost-to-retail percentage. To convert retail back to cost, <b>multiply</b> by it.</p></div>
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
    <li><span>Physical counts are presumed correct; estimates are used when counts are impossible or impractical.</span></li>
    <li><span><b>Gross profit method</b>: COGS = sales × (1 − gross profit rate); ending inventory = goods available − estimated COGS.</span></li>
    <li><span><b>Retail method</b>: ending inventory at cost = ending inventory at retail × cost-to-retail percentage.</span></li>
  </ol>
</section>`,

  data: {
    gp: {
      inputs: [{ id: "r", label: "Normal gross profit rate", min: 20, max: 60, step: 10, value: 40, fmt: "%" }],
      run: function (v, money) {
        var cogs = 1000000 * (1 - v.r / 100), est = 1300000 - cogs;
        return { html: '<div class="statement two"><div class="st-row"><span class="st-l">Beginning inventory</span><span class="st-a"></span><span class="st-b">' + money(500000) + '</span></div><div class="st-row"><span class="st-l">Purchases</span><span class="st-a"></span><span class="st-b"><span class="u">' + money(800000) + '</span></span></div><div class="st-row"><span class="st-l">Goods available for sale</span><span class="st-a"></span><span class="st-b">' + money(1300000) + '</span></div>' +
          '<div class="st-row"><span class="st-l">Sales</span><span class="st-a">' + money(1000000) + '</span><span class="st-b"></span></div><div class="st-row"><span class="st-l">Less: estimated gross profit (' + v.r + '%)</span><span class="st-a"><span class="u">' + money(-1000000 * v.r / 100) + '</span></span><span class="st-b"></span></div>' +
          '<div class="st-row"><span class="st-l">Estimated cost of goods sold</span><span class="st-a"></span><span class="st-b"><span class="u">' + money(-cogs) + '</span></span></div><div class="st-row bold"><span class="st-l">Estimated inventory destroyed</span><span class="st-a"></span><span class="st-b"><span class="uu">' + money(est) + '</span></span></div></div>',
          say: "At a " + v.r + " percent gross profit rate, cost of goods sold is about " + money(cogs) + ", so the fire destroyed an estimated <b>" + money(est) + "</b> of inventory." };
      }
    },
    crock: {
      q: "<p>Crock Buster buys pots for $7.50 and sells them for $10, a <b>75%</b> cost-to-retail percentage. Beginning inventory cost $200,000, purchases cost $300,000, and sales were $460,000 at retail. Estimate ending inventory at cost.</p>",
      steps: [
        "Convert cost to retail by dividing by 75%: beginning $200,000 ÷ 0.75 = <b>$266,667</b>; purchases $300,000 ÷ 0.75 = <b>$400,000</b>.",
        "Goods available at retail: $266,667 + $400,000 = <b>$666,667</b> (at cost: $500,000).",
        "Subtract sales at retail: $666,667 − $460,000 = <b>$206,667</b> ending inventory at retail.",
        "Convert back to cost by multiplying by 75%: $206,667 × 0.75 = <b>$155,000</b>."
      ],
      answer: "<p>Estimated ending inventory at cost: <b>$155,000</b>.</p>"
    }
  },

  cards: {
    terms: [
      { term: "Gross profit method", back: "Estimating inventory by applying the normal gross profit rate to sales to estimate cost of goods sold." },
      { term: "Gross profit rate", back: "Gross profit as a percentage of sales." },
      { term: "Retail method", back: "Estimating inventory cost by applying the cost-to-retail percentage to ending inventory at retail." },
      { term: "Cost-to-retail percentage", back: "Cost ÷ retail price, e.g., $7.50 ÷ $10 = 75%." }
    ]
  },

  quiz: [
    { q: "Which situation calls for estimating inventory?", options: ["A year-end count is completed", "A fire destroyed the inventory", "Inventory was just purchased", "The perpetual records are current"], answer: 1, why: "The goods can’t be counted." },
    { q: "Sales $1,000,000 with a 40% gross profit rate. Estimated cost of goods sold is:", options: ["$400,000", "$600,000", "$1,400,000", "$1,000,000"], answer: 1, why: "$1,000,000 × 60%." },
    { q: "Beginning inventory $500,000, purchases $800,000, estimated COGS $600,000. Estimated ending inventory is:", options: ["$700,000", "$1,300,000", "$200,000", "$600,000"], answer: 0, why: "$1,300,000 − $600,000." },
    { q: "Goods cost $7.50 and sell for $10. The cost-to-retail percentage is:", options: ["25%", "75%", "133%", "7.5%"], answer: 1, why: "$7.50 ÷ $10." },
    { q: "Ending inventory at retail is $206,667 with a 75% cost-to-retail percentage. At cost it’s:", options: ["$275,556", "$155,000", "$206,667", "$51,667"], answer: 1, why: "Multiply by 75%." },
    { q: "The retail method works only when:", options: ["Prices are falling", "The inventory category has a consistent markup", "LIFO is used", "There are no sales"], answer: 1, why: "A single cost-to-retail percentage must apply." }
  ]
});

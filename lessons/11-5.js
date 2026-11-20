/* Lesson 11.5 · Natural Resources */
HUB.register("11-5", {
  summary: "Oil, minerals, and timber are recorded at cost and then depleted per unit extracted. Depletion on unsold output stays in inventory, and extraction equipment may be depreciated over the resource’s life.",
  objectives: [
    "Determine the cost of a natural resource",
    "Compute a depletion rate per unit",
    "Split depletion between cost of goods sold and inventory",
    "Choose the right life for equipment used in extraction"
  ],
  html: `
<section class="sec" data-toc="Cost and depletion">
  <div class="eyebrow kind">Concept</div>
  <h2>Depletion is depreciation for natural resources</h2>
  <p>Oil and gas reserves, mineral deposits, thermal energy sources, and standing timber are natural resource assets (with many industry-specific rules). They’re recorded at direct cost plus related items: legal fees, surveying, exploration, and development. That cost is then allocated to the periods benefited through <b>depletion</b>. Depletion is to natural resources what depreciation is to PP&amp;E.</p>
  <div class="big-eq" style="font-size:20px">Depletion per unit = (Cost − Residual value) ÷ Estimated units</div>
</section>

<section class="sec" data-toc="The mine">
  <div class="eyebrow kind try">Try it</div>
  <h2>A mine site</h2>
  <p>A mine site costs $9,000,000, plus $3,000,000 to develop. It holds an estimated 5,000,000 tons of ore. When mining ends, it will be flooded and sold as a recreational lake for an estimated $2,000,000. Depletion: ($12,000,000 − $2,000,000) ÷ 5,000,000 tons = <b>$2 per ton</b>.</p>
  <div class="panel"><div data-widget="calc" data-key="mine"></div></div>
</section>

<section class="sec" data-toc="Extraction equipment">
  <div class="eyebrow kind">Concept</div>
  <h2>Equipment used to extract resources</h2>
  <p>Extraction equipment is depreciated over its useful life, and that life may be tied to the resource rather than to the equipment’s physical life.</p>
  <div class="grid2">
    <div class="tile"><span class="k">Track into the mine</span><p>Useless once the mine closes, even if it could physically carry trains for decades. Depreciate over the <b>life of the mine</b>.</p></div>
    <div class="tile alt"><span class="k">The train</span><p>Can be moved and used elsewhere. Depreciate over the <b>life of the train</b>.</p></div>
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
    <li><span>Natural resources are recorded at cost plus legal, survey, exploration, and development costs.</span></li>
    <li><span>Depletion per unit = (cost − residual value) ÷ estimated units.</span></li>
    <li><span>Depletion on units sold goes to cost of goods sold; on units unsold, to inventory.</span></li>
    <li><span>Equipment that can’t be moved is depreciated over the resource’s life.</span></li>
  </ol>
</section>`,

  data: {
    mine: {
      inputs: [
        { id: "x", label: "Tons extracted this year", min: 500000, max: 1500000, step: 250000, value: 1000000, fmt: "n" },
        { id: "s", label: "Percent of extracted tons sold", min: 50, max: 100, step: 25, value: 75, fmt: "%" }
      ],
      run: function (v, money) {
        var dep = v.x * 2, sold = dep * v.s / 100, inv = dep - sold;
        var t = '<div class="scroll-x"><table class="journal nodate"><thead><tr><th>Accounts</th><th class="num">Debit</th><th class="num">Credit</th></tr></thead><tbody class="jr-entry"><tr><td class="jr-acct">Cost of Goods Sold</td><td class="num">' + sold.toLocaleString() + '</td><td class="num"></td></tr>' +
          (inv ? '<tr><td class="jr-acct">Ore Inventory</td><td class="num">' + inv.toLocaleString() + '</td><td class="num"></td></tr>' : '') +
          '<tr><td class="jr-acct cr">Accumulated Depletion</td><td class="num"></td><td class="num">' + dep.toLocaleString() + '</td></tr></tbody></table></div>';
        return { html: '<div class="big-eq" style="font-size:20px">' + v.x.toLocaleString() + ' tons × $2 = <span class="l">' + money(dep) + '</span></div>' + t,
          say: "Depletion of " + money(dep) + ": " + money(sold) + " to cost of goods sold" + (inv ? " and <b>" + money(inv) + "</b> to ore inventory for tons not yet sold." : ".") };
      }
    }
  },

  cards: {
    terms: [
      { term: "Natural resources", back: "Assets like oil and gas, minerals, thermal energy, and timber." },
      { term: "Depletion", back: "Allocating a natural resource’s cost to the periods benefited, per unit extracted." },
      { term: "Depletion rate", back: "(Cost − residual value) ÷ estimated units in the deposit." },
      { term: "Accumulated depletion", back: "Contra-asset holding depletion recorded to date." }
    ]
  },

  quiz: [
    { q: "Depletion is to natural resources as ______ is to PP&E.", options: ["Amortization", "Depreciation", "Impairment", "Capitalization"], answer: 1, why: "Both allocate cost to periods benefited." },
    { q: "Cost $9,000,000 + development $3,000,000, residual $2,000,000, 5,000,000 tons. The depletion rate is:", options: ["$1.80", "$2.00", "$2.40", "$2.20"], answer: 1, why: "$10,000,000 ÷ 5,000,000." },
    { q: "1,000,000 tons extracted at $2 per ton; 750,000 sold. Cost of goods sold from depletion is:", options: ["$2,000,000", "$1,500,000", "$500,000", "$750,000"], answer: 1, why: "750,000 × $2." },
    { q: "The depletion on the 250,000 unsold tons goes to:", options: ["Expense", "Inventory on the balance sheet", "Retained earnings", "Nowhere"], answer: 1, why: "Unsold extracted ore is inventory." },
    { q: "Railroad track built into a mine is depreciated over:", options: ["Its physical life", "The life of the mine", "Five years", "Forty years"], answer: 1, why: "It’s useless once the mine closes." }
  ]
});

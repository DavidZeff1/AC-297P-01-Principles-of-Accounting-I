/* Lesson 8.4 · Lower of Cost or Net Realizable Value */
HUB.register("8-4", {
  summary: "Conservatism says don’t overstate assets. When inventory can’t be sold for what it cost, write it down to net realizable value, item by item or in aggregate.",
  objectives: [
    "Explain conservatism",
    "Compute net realizable value for inventory",
    "Apply lower of cost or NRV item by item and in aggregate",
    "Record a write-down and know it can’t be reversed under U.S. GAAP"
  ],
  html: `
<section class="sec" data-toc="Conservatism">
  <div class="eyebrow kind">Concept</div>
  <h2>A touch of conservatism</h2>
  <p>Accountants aim to be unbiased, but they apply some <b>conservatism</b>: avoid overstating assets and income, and lean toward the higher amount for liabilities when things are uncertain. It’s a general measurement principle, not a hard rule.</p>
  <p>Inventory can face an uncertain future: obsolescence, oversupply, defects, big price declines. If inventory is carried above what it can realistically bring in, it’s <b>written down</b> to its <b>net realizable value (NRV)</b>. The write-down is a loss that reduces income.</p>
  <div data-widget="journal" data-key="wd"></div>
</section>

<section class="sec" data-toc="What NRV is">
  <div class="eyebrow kind try">Try it</div>
  <h2>Net realizable value</h2>
  <p>NRV is the estimated selling price in the normal course of business, minus reasonably predictable costs to complete, dispose of, and transport the goods. These estimates take judgment.</p>
  <div class="panel"><div data-widget="calc" data-key="nrv"></div></div>
  <p class="hint">Companies using LIFO or the retail method apply “lower of cost or <b>market</b>” instead, a technical variation covered in advanced courses.</p>
</section>

<section class="sec" data-toc="Item or aggregate">
  <div class="eyebrow kind try">Compare</div>
  <h2>Item by item, or the inventory as a whole</h2>
  <p>The comparison can be made for each item, or for all inventory together. In aggregate, gains on some items offset declines on others, so a write-down is needed only if total NRV is below total cost.</p>
  <div class="panel">
    <div class="seg" role="group" aria-label="Approach"><button type="button" class="on" data-voice-state data-ap="item">Item by item</button><button type="button" data-voice-state data-ap="agg">Aggregate</button></div>
    <div class="scroll-x" style="margin-top:12px"><table class="plain" id="lc"></table></div>
    <p class="verdict" id="lc-say" aria-live="polite"></p>
  </div>
  <div class="callout watch">
    <div class="label">No write-ups</div>
    <p>Once written down, the reduced amount becomes inventory’s new basis. Under U.S. GAAP, a write-down is <b>not</b> reversed even if the value later recovers. International standards do allow reversals.</p>
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
    <li><span><b>Conservatism</b>: avoid overstating assets and income.</span></li>
    <li><span><b>NRV</b> = estimated selling price − costs to complete, dispose, and transport.</span></li>
    <li><span>If cost exceeds NRV, debit Loss for Decline in NRV and credit Inventory.</span></li>
    <li><span>Apply item by item or in aggregate; aggregate lets gains offset declines.</span></li>
    <li><span>U.S. GAAP doesn’t allow reversing a write-down; IFRS does.</span></li>
  </ol>
</section>`,

  data: {
    wd: { entries: [{ date: "Dec. 31", lines: [["Loss for Decline in NRV", 1500, 0], ["Inventory", 0, 1500]], memo: "Wrote inventory down from cost to net realizable value" }] },
    nrv: {
      inputs: [
        { id: "p", label: "Expected selling price per unit", min: 60, max: 120, step: 10, value: 100, fmt: "$" },
        { id: "c", label: "Costs to complete, sell, and ship per unit", min: 0, max: 30, step: 5, value: 15, fmt: "$" }
      ],
      run: function (v, money) {
        var nrv = v.p - v.c, cost = 80, wd = Math.max(0, cost - nrv);
        return { html: '<div class="statement"><div class="st-row"><span class="st-l">Selling price</span><span class="st-b">' + money(v.p) + '</span></div><div class="st-row"><span class="st-l">Less: completion, disposal, transport</span><span class="st-b"><span class="u">' + money(-v.c) + '</span></span></div><div class="st-row bold"><span class="st-l">Net realizable value</span><span class="st-b">' + money(nrv) + '</span></div><div class="st-row"><span class="st-l">Cost per unit</span><span class="st-b">' + money(cost) + '</span></div><div class="st-row bold"><span class="st-l">Report at (lower)</span><span class="st-b"><span class="uu">' + money(Math.min(cost, nrv)) + '</span></span></div></div>',
          say: wd ? "NRV of " + money(nrv) + " is below the $80 cost: write each unit down by <b>" + money(wd) + "</b>." : "NRV of " + money(nrv) + " is at or above the $80 cost, so <b>no write-down</b> is needed." };
      }
    }
  },

  cards: {
    terms: [
      { term: "Conservatism", back: "A tendency to avoid overstating assets and income under uncertainty." },
      { term: "Net realizable value (inventory)", back: "Estimated selling price less predictable costs of completion, disposal, and transportation." },
      { term: "Lower of cost or NRV", back: "Report inventory at the lower of its cost or net realizable value." },
      { term: "Loss for Decline in NRV", back: "The income statement charge recorded when inventory is written down." },
      { term: "Aggregate application", back: "Comparing total cost with total NRV, letting gains offset declines." }
    ]
  },

  quiz: [
    { q: "Conservatism suggests that accountants should:", options: ["Overstate assets when uncertain", "Avoid overstating assets and income", "Ignore liabilities", "Always use fair value"], answer: 1, why: "Uncertainty is resolved toward lower assets and income." },
    { q: "Selling price $100, costs to complete and sell $15. NRV is:", options: ["$115", "$85", "$100", "$15"], answer: 1, why: "$100 − $15 = $85." },
    { q: "Inventory cost $80 per unit; NRV $70. The inventory is reported at:", options: ["$80", "$70", "$75", "$150"], answer: 1, why: "The lower of cost or NRV." },
    { q: "A write-down to NRV is recorded as:", options: ["Debit Inventory, credit Loss", "Debit Loss for Decline in NRV, credit Inventory", "Debit Cost of Goods Sold, credit Cash", "No entry"], answer: 1, why: "The loss reduces income; inventory decreases." },
    { q: "Applied in aggregate, a write-down is needed only when:", options: ["Any item’s NRV is below cost", "Total NRV is below total cost", "Prices rise", "LIFO is used"], answer: 1, why: "Gains on some items offset declines on others." },
    { q: "Under U.S. GAAP, if written-down inventory recovers in value the next year:", options: ["It’s written back up", "The write-down isn’t reversed", "A gain is recorded", "It’s reclassified"], answer: 1, why: "The written-down amount becomes the new basis." }
  ],

  init: function (root) {
    var ITEMS = [["Item A", 10000, 12000], ["Item B", 8000, 6500], ["Item C", 5000, 5200]];
    function draw(ap) {
      var tc = 0, tn = 0, lower = 0;
      var rows = ITEMS.map(function (it) { tc += it[1]; tn += it[2]; var lw = Math.min(it[1], it[2]); lower += lw;
        return '<tr><td>' + it[0] + '</td><td class="num">$' + it[1].toLocaleString() + '</td><td class="num">$' + it[2].toLocaleString() + '</td><td class="num">' + (ap === "item" ? '$' + lw.toLocaleString() : '') + '</td></tr>'; }).join("");
      var aggLower = Math.min(tc, tn), report = ap === "item" ? lower : aggLower, wd = tc - report;
      root.querySelector("#lc").innerHTML = '<thead><tr><th>Item</th><th class="num">Cost</th><th class="num">NRV</th><th class="num">Lower</th></tr></thead><tbody>' + rows +
        '<tr class="bold"><td><b>Total</b></td><td class="num"><b>$' + tc.toLocaleString() + '</b></td><td class="num"><b>$' + tn.toLocaleString() + '</b></td><td class="num"><b>$' + report.toLocaleString() + '</b></td></tr></tbody>';
      root.querySelector("#lc-say").innerHTML = ap === "item"
        ? "Item by item, only Item B is below cost. Inventory is reported at <b>$" + report.toLocaleString() + "</b>, a <b>$" + wd.toLocaleString() + "</b> write-down."
        : "In aggregate, total NRV of $" + tn.toLocaleString() + " exceeds total cost of $" + tc.toLocaleString() + ", so <b>no write-down</b> is needed: Item A’s and C’s gains offset Item B’s decline.";
    }
    root.querySelectorAll("[data-ap]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-ap]").forEach(function (x) { x.classList.toggle("on", x === b); }); draw(b.getAttribute("data-ap")); }); });
    draw("item");
  }
});

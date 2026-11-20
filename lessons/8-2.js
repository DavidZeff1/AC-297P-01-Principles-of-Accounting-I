/* Lesson 8.2 · Inventory Costing Methods */
(function () {
  /* Mueller Hardware nail barrel (from the reading) */
  var LAYERS = [[100, 1.01], [80, 1.10], [90, 1.30]];
  /* Gonzales Chemical: beginning 4,000 @ $12; sales 7,000 @ $22 and 6,000 @ $25; 5,000 counted at year end.
     Purchases filled in: 6,000 @ $14 and 8,000 @ $16. */
  var G = { lots: [["Beginning inventory", 4000, 12], ["Mar. 5 purchase", 6000, 14], ["Sep. 20 purchase", 8000, 16]], sales: 304000, end: 5000 };

  function cost(lots) { return lots.reduce(function (s, l) { return s + l[1] * l[2]; }, 0); }
  function units(lots) { return lots.reduce(function (s, l) { return s + l[1]; }, 0); }
  function gonz(method) {
    var avail = cost(G.lots), u = units(G.lots), endCost;
    if (method === "avg") endCost = Math.round(avail / u * G.end);
    else {
      var order = method === "fifo" ? G.lots.slice().reverse() : G.lots.slice(), left = G.end; endCost = 0;
      order.forEach(function (l) { var take = Math.min(left, l[1]); endCost += take * l[2]; left -= take; });
    }
    return { avail: avail, end: endCost, cogs: avail - endCost, gp: G.sales - (avail - endCost) };
  }

  HUB.register("8-2", {
    summary: "Inventory measurement drives income. Learn what goes into inventory cost, then compare FIFO, LIFO, weighted average, and specific identification on a nail barrel and a chemical company.",
    objectives: [
      "Explain how ending inventory and cost of goods sold trade off",
      "Identify which costs are inventoriable",
      "Apply FIFO, LIFO, and weighted average",
      "Compare the methods’ effects and explain LIFO conformity and specific identification"
    ],
    html: `
<section class="sec" data-toc="Why it matters">
  <div class="eyebrow kind">Concept</div>
  <h2>Every dollar of inventory is a dollar of income</h2>
  <p>Stock prices react to earnings, and inventory measurement feeds directly into earnings. Goods available for sale are split between ending inventory and cost of goods sold. Put $1 less in ending inventory and $1 more flows to cost of goods sold, lowering gross profit by $1.</p>
  <div class="big-eq" style="font-size:20px">Goods available = <span class="a">Ending inventory</span> + <span class="l">Cost of goods sold</span></div>
</section>

<section class="sec" data-toc="What’s in the cost">
  <div class="eyebrow kind">Concept</div>
  <h2>Ordinary and necessary costs to get goods in place and in condition</h2>
  <div class="grid2">
    <div class="tile"><span class="k">Include in inventory</span><ul><li>Invoice price</li><li>Freight-in</li><li>Similar costs of getting goods ready for sale</li></ul></div>
    <div class="tile warn"><span class="k">Expense as incurred</span><ul><li>Carrying costs: interest on money borrowed to buy inventory, storage, insurance on goods awaiting sale</li><li>Selling costs: freight-out, sales commissions</li></ul></div>
  </div>
</section>

<section class="sec" data-toc="The nail barrel">
  <div class="eyebrow kind try">Try it</div>
  <h2>Mueller Hardware’s nail barrel</h2>
  <p>Mueller’s barrel was filled three times: 100 lb at $1.01, 80 lb at $1.10, and 90 lb at $1.30, for $306 in total. Customers picked all through it, so no one knows which nails remain. At year end, <b>120 lb</b> are left. What did they cost?</p>
  <p>A company must adopt a <b>cost flow assumption</b> and apply it consistently. The assumption doesn’t have to match how goods physically move; it’s just a systematic way to assign costs.</p>
  <div class="panel">
    <div class="seg" role="group" aria-label="Method"><button type="button" class="on" data-voice-state data-cf="fifo">FIFO</button><button type="button" data-voice-state data-cf="lifo">LIFO</button><button type="button" data-voice-state data-cf="avg">Weighted average</button></div>
    <div class="barrel-wrap"><div class="barrel" id="barrel"></div><div id="barrel-out"></div></div>
    <p class="verdict" id="barrel-say" aria-live="polite"></p>
  </div>
  <div class="grid3">
    <div class="tile"><span class="k">FIFO</span><p><b>First-in, first-out.</b> The oldest costs go to cost of goods sold; the newest stay in ending inventory.</p></div>
    <div class="tile"><span class="k">LIFO</span><p><b>Last-in, first-out.</b> The newest costs go to cost of goods sold; the oldest stay in inventory.</p></div>
    <div class="tile"><span class="k">Weighted average</span><p>Total cost ÷ total units available gives an average cost: $306 ÷ 270 lb = $1.1333 per lb.</p></div>
  </div>
  <p class="hint">FIFO and LIFO are pronounced with a long “i” and a long “o”: “FIE-foe,” “LIE-foe.”</p>
</section>

<section class="sec" data-toc="Gonzales Chemical">
  <div class="eyebrow kind try">Example</div>
  <h2>Gonzales Chemical: same facts, three answers</h2>
  <p>Gonzales began the year with 4,000 units at $12, bought more twice, and sold 7,000 units at $22 and 6,000 at $25, for sales of <b>$304,000</b>. A count found <b>5,000 units</b> on hand. Sales don’t depend on the method; cost of goods sold and gross profit do.</p>
  <div class="panel scroll-x">
    <table class="plain">
      <thead><tr><th>Goods available</th><th class="num">Units</th><th class="num">Unit cost</th><th class="num">Total</th></tr></thead>
      <tbody>
        <tr><td>Beginning inventory</td><td class="num">4,000</td><td class="num">$12</td><td class="num">$48,000</td></tr>
        <tr><td>Mar. 5 purchase</td><td class="num">6,000</td><td class="num">$14</td><td class="num">$84,000</td></tr>
        <tr><td>Sep. 20 purchase</td><td class="num">8,000</td><td class="num">$16</td><td class="num">$128,000</td></tr>
        <tr><td><b>Total available</b></td><td class="num"><b>18,000</b></td><td></td><td class="num"><b>$260,000</b></td></tr>
      </tbody>
    </table>
  </div>
  <div class="panel">
    <div class="seg" role="group" aria-label="Method"><button type="button" class="on" data-voice-state data-g="fifo">FIFO</button><button type="button" data-voice-state data-g="lifo">LIFO</button><button type="button" data-voice-state data-g="avg">Weighted average</button></div>
    <div class="grid2" style="margin-top:14px"><div id="g-calc"></div><div id="g-is"></div></div>
    <p class="verdict" id="g-say" aria-live="polite"></p>
  </div>
  <div class="panel scroll-x">
    <table class="plain" id="g-compare"></table>
  </div>
</section>

<section class="sec" data-toc="Choosing a method">
  <div class="eyebrow kind">Concept</div>
  <h2>Choosing a method</h2>
  <p>When prices are <b>rising</b>, as for Gonzales, <b>LIFO gives the lowest income</b>, <b>FIFO the highest</b>, and weighted average falls between.</p>
  <div class="grid2">
    <div class="tile"><span class="k">Why choose LIFO?</span><p>Lower income means lower taxes. U.S. <b>LIFO conformity rules</b> generally require a company using LIFO for taxes to use it in its financial statements too. Many countries don’t permit LIFO at all, and the U.S. has discussed following suit.</p></div>
    <div class="tile alt"><span class="k">Which is “better”?</span><p>LIFO matches recent costs with recent revenues on the income statement. FIFO shows recent costs in inventory on the balance sheet. Either way, the method must be disclosed, LIFO companies often show what FIFO inventory would be, and the method should be applied consistently, changing only if reporting improves.</p></div>
  </div>
  <h3>Specific identification</h3>
  <p>Track each unit’s actual cost until it’s sold. It’s tedious, so it’s used for unique, high-cost items like cars and fine jewelry. Classic Cars started with 5 cars costing $125,000 and bought 100 more for $3,000,000. The 3 cars left at year end, looked up by serial number, cost $225,000. So cost of goods sold is $3,125,000 − $225,000 = <b>$2,900,000</b>.</p>
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
    <li><span>Inventory cost includes what’s ordinary and necessary to get goods in place and in condition for sale; carrying and selling costs are expensed.</span></li>
    <li><span><b>FIFO</b> keeps newest costs in inventory; <b>LIFO</b> keeps oldest; <b>weighted average</b> uses total cost ÷ total units.</span></li>
    <li><span>With rising prices: FIFO → highest income, LIFO → lowest, average → between.</span></li>
    <li><span>LIFO conformity: use LIFO for taxes, use it for reporting. Disclose the method and apply it consistently.</span></li>
    <li><span><b>Specific identification</b> tracks each unit’s actual cost; used for unique, high-value goods.</span></li>
  </ol>
</section>`,

    cards: {
      terms: [
        { term: "Inventoriable costs", back: "Ordinary and necessary costs to put goods in place and in condition for resale: invoice price, freight-in." },
        { term: "Carrying costs", back: "Interest, storage, and insurance on goods awaiting sale; expensed, not inventoried." },
        { term: "Cost flow assumption", back: "A systematic rule for assigning costs to units sold and on hand; needn’t match physical flow." },
        { term: "FIFO", back: "First-in, first-out: oldest costs to cost of goods sold, newest to ending inventory." },
        { term: "LIFO", back: "Last-in, first-out: newest costs to cost of goods sold, oldest to ending inventory." },
        { term: "Weighted average", back: "Cost of goods available ÷ units available, applied to units sold and on hand." },
        { term: "LIFO conformity rule", back: "U.S. rule: if LIFO is used for taxes, it must generally be used for financial reporting." },
        { term: "Specific identification", back: "Tracking each unit’s actual cost; used for unique, high-cost goods." }
      ]
    },

    quiz: [
      { q: "If $1 less is assigned to ending inventory, gross profit:", options: ["Rises $1", "Falls $1", "Doesn’t change", "Rises $2"], answer: 1, why: "$1 more goes to cost of goods sold." },
      { q: "Which cost is included in inventory?", options: ["Freight-in", "Freight-out", "Storage costs", "Sales commissions"], answer: 0, why: "Freight-in is needed to get goods in place." },
      { q: "Mueller’s 120 lb of nails under FIFO cost:", options: ["$123", "$136", "$150", "$156"], answer: 2, why: "90 lb × $1.30 + 30 lb × $1.10 = $117 + $33 = $150." },
      { q: "Under LIFO, Mueller’s ending inventory is:", options: ["$123", "$136", "$150", "$183"], answer: 0, why: "100 lb × $1.01 + 20 lb × $1.10 = $101 + $22 = $123." },
      { q: "Under weighted average, Mueller’s ending inventory is:", options: ["$123", "$136", "$150", "$170"], answer: 1, why: "$306 ÷ 270 × 120 = $136." },
      { q: "When prices are rising, which method generally produces the highest income?", options: ["LIFO", "FIFO", "Weighted average", "They’re all equal"], answer: 1, why: "FIFO assigns the cheapest, oldest costs to cost of goods sold." },
      { q: "A company that uses LIFO for U.S. taxes generally must:", options: ["Use FIFO for reporting", "Use LIFO for financial reporting too", "Use specific identification", "Disclose nothing"], answer: 1, why: "That’s the LIFO conformity rule." },
      { q: "Specific identification is best suited to:", options: ["Nails in a barrel", "Unique, high-cost items like cars", "Grain", "Office supplies"], answer: 1, why: "Each unit can be identified and costed." },
      { q: "Do cost flow assumptions have to match the physical flow of goods?", options: ["Yes, always", "No, they’re just a systematic way to assign costs", "Only for LIFO", "Only for FIFO"], answer: 1, why: "They bear no required relation to physical flow." }
    ],

    init: function (root) {
      var W = HUB.widgets;
      function money2(n) { return "$" + n.toFixed(2); }
      function barrel(m) {
        var keep = 120, left = keep, stay = [0, 0, 0];
        if (m !== "avg") { (m === "fifo" ? [2, 1, 0] : [0, 1, 2]).forEach(function (i) { var t = Math.min(left, LAYERS[i][0]); stay[i] = t; left -= t; }); }
        var endCost = m === "avg" ? 136 : stay.reduce(function (s, q, i) { return s + q * LAYERS[i][1]; }, 0), cogs = 306 - endCost;
        var h = "";
        LAYERS.slice().reverse().forEach(function (l, ri) {
          var i = 2 - ri, frac = m === "avg" ? keep / 270 : stay[i] / l[0];
          h += '<div class="layer l' + i + '" style="flex:' + l[0] + '"><span class="layer-in" style="width:' + Math.round(frac * 100) + '%"></span><span class="layer-t">' + l[0] + ' lb @ $' + l[1].toFixed(2) + (m === "avg" ? '' : ' · ' + stay[i] + ' lb stay') + '</span></div>';
        });
        root.querySelector("#barrel").innerHTML = h;
        root.querySelector("#barrel-out").innerHTML = '<div class="statement"><div class="st-row"><span class="st-l">Goods available (270 lb)</span><span class="st-b">$306</span></div><div class="st-row"><span class="st-l">Ending inventory (120 lb)</span><span class="st-b">$' + Math.round(endCost) + '</span></div><div class="st-row bold"><span class="st-l">Cost of goods sold (150 lb)</span><span class="st-b"><span class="uu">$' + Math.round(cogs) + '</span></span></div></div><p class="hint">Shaded: cost that stays in ending inventory.</p>';
        root.querySelector("#barrel-say").innerHTML = m === "fifo" ? "FIFO keeps the <b>newest</b> costs in inventory: 90 lb at $1.30 and 30 lb at $1.10 = $150. Cost of goods sold is $156."
          : m === "lifo" ? "LIFO keeps the <b>oldest</b> costs in inventory: 100 lb at $1.01 and 20 lb at $1.10 = $123. Cost of goods sold is $183."
          : "Weighted average: $306 ÷ 270 lb = about $1.1333 per lb. Ending inventory 120 lb = $136; cost of goods sold 150 lb = $170.";
      }
      function gz(m) {
        var r = gonz(m);
        var how = m === "fifo" ? "5,000 newest units × $16" : m === "lifo" ? "4,000 × $12 + 1,000 × $14" : "5,000 × $14.444 average";
        W.statement(root.querySelector("#g-calc"), { title: "Cost of goods sold (" + m.toUpperCase().replace("AVG", "weighted average") + ")", cols: 1, rows: [
          { l: "Goods available for sale", a: r.avail }, { l: "Less: Ending inventory (" + how + ")", a: -r.end, ua: true }, { l: "Cost of goods sold", a: r.cogs, bold: true, uua: true } ] });
        W.statement(root.querySelector("#g-is"), { entity: "Gonzales Chemical", title: "Income statement excerpt", cols: 1, rows: [
          { l: "Sales", a: G.sales }, { l: "Cost of goods sold", a: -r.cogs, ua: true }, { l: "Gross profit", a: r.gp, bold: true, uua: true } ] });
        root.querySelector("#g-say").innerHTML = "Using " + (m === "avg" ? "weighted average" : m.toUpperCase()) + ", ending inventory is <b>$" + r.end.toLocaleString() + "</b> and gross profit is <b>$" + r.gp.toLocaleString() + "</b>.";
      }
      var rows = ["fifo", "avg", "lifo"].map(function (m) { var r = gonz(m); return '<tr><td>' + (m === "avg" ? "Weighted average" : m.toUpperCase()) + '</td><td class="num">$' + r.end.toLocaleString() + '</td><td class="num">$' + r.cogs.toLocaleString() + '</td><td class="num">$' + r.gp.toLocaleString() + '</td></tr>'; }).join("");
      root.querySelector("#g-compare").innerHTML = '<thead><tr><th>Method</th><th class="num">Ending inventory</th><th class="num">Cost of goods sold</th><th class="num">Gross profit</th></tr></thead><tbody>' + rows + '</tbody>';
      root.querySelectorAll("[data-cf]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-cf]").forEach(function (x) { x.classList.toggle("on", x === b); }); barrel(b.getAttribute("data-cf")); }); });
      root.querySelectorAll("[data-g]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-g]").forEach(function (x) { x.classList.toggle("on", x === b); }); gz(b.getAttribute("data-g")); }); });
      barrel("fifo"); gz("fifo");
    }
  });
})();

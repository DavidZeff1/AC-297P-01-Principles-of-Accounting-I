/* Lesson 8.3 · Perpetual Inventory Systems */
(function () {
  /* Gonzales Chemical events (dates from the reading where given) */
  var EV = [
    { d: "Jan. 1", t: "beg", q: 4000, c: 12 },
    { d: "Mar. 5", t: "buy", q: 6000, c: 14 },
    { d: "Apr. 17", t: "sell", q: 7000, p: 22 },
    { d: "Sep. 20", t: "buy", q: 8000, c: 16 },
    { d: "Nov. 12", t: "sell", q: 6000, p: 25 }
  ];
  function run(method) {
    var layers = [], rows = [], cogs = 0;
    EV.forEach(function (e) {
      var out = 0, detail = "";
      if (e.t !== "sell") {
        if (method === "avg") {
          var u = layers.reduce(function (s, l) { return s + l[0]; }, 0) + e.q, c = layers.reduce(function (s, l) { return s + l[0] * l[1]; }, 0) + e.q * e.c;
          layers = [[u, c / u]];
        } else layers.push([e.q, e.c]);
        detail = e.q.toLocaleString() + " @ $" + e.c;
      } else {
        var need = e.q, parts = [];
        if (method === "avg") { out = e.q * layers[0][1]; layers[0][0] -= e.q; parts.push(e.q.toLocaleString() + " @ $" + layers[0][1].toFixed(4)); }
        else {
          while (need > 0) {
            var i = method === "fifo" ? 0 : layers.length - 1, take = Math.min(need, layers[i][0]);
            out += take * layers[i][1]; parts.push(take.toLocaleString() + " @ $" + layers[i][1]);
            layers[i][0] -= take; need -= take; if (!layers[i][0]) layers.splice(i, 1);
          }
        }
        cogs += out; detail = parts.join(" + ");
      }
      var bal = layers.filter(function (l) { return l[0]; });
      rows.push({ d: e.d, what: e.t === "sell" ? "Sold " + e.q.toLocaleString() : e.t === "beg" ? "Beginning" : "Bought " + e.q.toLocaleString(), detail: detail, out: out,
        bal: bal.map(function (l) { return l[0].toLocaleString() + " @ $" + (method === "avg" ? l[1].toFixed(4) : l[1]); }).join("<br>"),
        total: bal.reduce(function (s, l) { return s + l[0] * l[1]; }, 0) });
    });
    return { rows: rows, cogs: cogs, end: rows[rows.length - 1].total, gp: 304000 - cogs };
  }
  function m2(n) { return "$" + n.toLocaleString("en-US", { minimumFractionDigits: Math.round(n) === n ? 0 : 2, maximumFractionDigits: 2 }); }

  HUB.register("8-3", {
    summary: "A perpetual system keeps a running count and cost of inventory. Follow Gonzales Chemical layer by layer under perpetual FIFO, LIFO, and moving average.",
    objectives: [
      "Maintain a perpetual inventory record by cost layers",
      "Record perpetual purchases and sales",
      "Explain why perpetual FIFO matches periodic FIFO but LIFO may differ",
      "Compute a moving average"
    ],
    html: `
<section class="sec" data-toc="Running records">
  <div class="eyebrow kind">Concept</div>
  <h2>A running count, all the time</h2>
  <p>Lesson 8.2 used the periodic system: count at year end, then assign costs. A <b>perpetual</b> system keeps a running record of units and cost after every purchase and sale. Modern systems make detailed tracking practical. Here is Gonzales Chemical again, with the same facts: beginning inventory, two purchases, and two sales totaling $304,000.</p>
</section>

<section class="sec" data-toc="Layer by layer">
  <div class="eyebrow kind try">Try it</div>
  <h2>Peeling layers as you go</h2>
  <p>Each sale removes cost layers. Under FIFO, the April 17 sale of 7,000 units takes all 4,000 beginning units plus 3,000 of the 6,000 bought March 5, leaving 3,000 units at $14. Switch methods to compare.</p>
  <div class="panel">
    <div class="seg" role="group" aria-label="Method"><button type="button" class="on" data-voice-state data-pm="fifo">Perpetual FIFO</button><button type="button" data-voice-state data-pm="lifo">Perpetual LIFO</button><button type="button" data-voice-state data-pm="avg">Moving average</button></div>
    <div class="scroll-x" style="margin-top:12px"><table class="plain perp" id="perp"></table></div>
    <p class="verdict" id="perp-say" aria-live="polite"></p>
  </div>
  <div class="panel scroll-x"><table class="plain" id="perp-cmp"></table></div>
  <div class="grid2">
    <div class="tile"><span class="k">FIFO: same either way</span><p>Perpetual FIFO equals periodic FIFO ($180,000 cost of goods sold). The oldest layers are peeled off in the same order whether you calculate as you go or at year end.</p></div>
    <div class="tile alt"><span class="k">LIFO: usually different</span><p>Perpetual LIFO takes the latest layer <i>at the time of each sale</i>, so the April sale can’t use September’s purchase. Periodic LIFO, figured at year end, can. That’s why the results differ.</p></div>
  </div>
  <p>As with the periodic system, LIFO produced the lowest gross profit, FIFO the highest, and moving average fell between.</p>
</section>

<section class="sec" data-toc="Journal entries">
  <div class="eyebrow kind">Concept</div>
  <h2>The entries (perpetual FIFO)</h2>
  <p>Inventory is debited for purchases and credited, at cost, for each sale. Under LIFO or moving average the entries are the same; only the cost amounts change.</p>
  <div data-widget="journal" data-key="je"></div>
</section>

<section class="sec" data-toc="Moving average">
  <div class="eyebrow kind">Concept</div>
  <h2>Moving average</h2>
  <p>Applied perpetually, the average method becomes a <b>moving average</b>: a new average unit cost is computed after every purchase. After March 5: $132,000 ÷ 10,000 units = $13.20. After September 20: (3,000 × $13.20 + $128,000) ÷ 11,000 = about $15.2364.</p>
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
    <li><span>A perpetual system tracks units and cost layers after every transaction.</span></li>
    <li><span>Purchases debit Inventory; each sale also debits Cost of Goods Sold and credits Inventory at cost.</span></li>
    <li><span>Perpetual FIFO = periodic FIFO; perpetual LIFO usually differs from periodic LIFO.</span></li>
    <li><span><b>Moving average</b> recomputes average cost after each purchase.</span></li>
  </ol>
</section>`,

    data: {
      je: { entries: [
        { date: "Mar. 5", lines: [["Inventory", 84000, 0], ["Accounts Payable", 0, 84000]], memo: "Bought 6,000 units at $14" },
        { date: "Apr. 17", lines: [["Accounts Receivable", 154000, 0], ["Sales", 0, 154000]], memo: "Sold 7,000 units at $22" },
        { date: "Apr. 17", lines: [["Cost of Goods Sold", 90000, 0], ["Inventory", 0, 90000]], memo: "FIFO cost: 4,000 × $12 + 3,000 × $14" },
        { date: "Sep. 20", lines: [["Inventory", 128000, 0], ["Accounts Payable", 0, 128000]], memo: "Bought 8,000 units at $16" },
        { date: "Nov. 12", lines: [["Accounts Receivable", 150000, 0], ["Sales", 0, 150000]], memo: "Sold 6,000 units at $25" },
        { date: "Nov. 12", lines: [["Cost of Goods Sold", 90000, 0], ["Inventory", 0, 90000]], memo: "FIFO cost: 3,000 × $14 + 3,000 × $16" }
      ]}
    },

    cards: {
      terms: [
        { term: "Perpetual inventory system", back: "A running record of units and costs updated with every purchase and sale." },
        { term: "Cost layer", back: "A group of units acquired at the same unit cost." },
        { term: "Perpetual LIFO", back: "Each sale takes the most recent layer available at that moment; usually differs from periodic LIFO." },
        { term: "Moving average", back: "Average cost recomputed after each purchase under a perpetual system." }
      ]
    },

    quiz: [
      { q: "Under perpetual FIFO, Gonzales’ April 17 sale of 7,000 units costs:", options: ["$84,000", "$90,000", "$96,000", "$92,400"], answer: 1, why: "4,000 × $12 + 3,000 × $14 = $48,000 + $42,000." },
      { q: "Perpetual FIFO compared with periodic FIFO gives:", options: ["Always different results", "The same results", "Higher income", "Lower income"], answer: 1, why: "Layers are removed in the same order either way." },
      { q: "Why does perpetual LIFO usually differ from periodic LIFO?", options: ["It uses different prices", "Each sale can only use layers that existed at the time of the sale", "It ignores beginning inventory", "It uses averages"], answer: 1, why: "Periodic LIFO can use year-end layers bought after the sale." },
      { q: "Under perpetual LIFO, the April 17 sale of 7,000 units costs:", options: ["$90,000", "$96,000", "$92,400", "$84,000"], answer: 1, why: "6,000 × $14 + 1,000 × $12." },
      { q: "After Gonzales buys 6,000 units at $14 (with 4,000 on hand at $12), the moving average cost is:", options: ["$13.00", "$13.20", "$14.00", "$12.80"], answer: 1, why: "$132,000 ÷ 10,000 units." },
      { q: "In a perpetual system, each sale requires:", options: ["One entry at selling price only", "An entry at selling price and an entry at cost", "Only a cost entry", "No entry until year end"], answer: 1, why: "Record the revenue and move the cost out of inventory." }
    ],

    init: function (root) {
      function draw(m) {
        var r = run(m);
        root.querySelector("#perp").innerHTML = '<thead><tr><th>Date</th><th>Event</th><th>Layers used</th><th class="num">Cost of goods sold</th><th>Layers on hand</th><th class="num">Inventory</th></tr></thead><tbody>' +
          r.rows.map(function (x) { return '<tr><td>' + x.d + '</td><td>' + x.what + '</td><td class="mono">' + x.detail + '</td><td class="num">' + (x.out ? m2(Math.round(x.out * 100) / 100) : "") + '</td><td class="mono">' + x.bal + '</td><td class="num">' + m2(Math.round(x.total * 100) / 100) + '</td></tr>'; }).join("") + '</tbody>';
        root.querySelector("#perp-say").innerHTML = (m === "avg" ? "Moving average" : "Perpetual " + m.toUpperCase()) + ": cost of goods sold <b>" + m2(Math.round(r.cogs * 100) / 100) + "</b>, ending inventory " + m2(Math.round(r.end * 100) / 100) + ", gross profit " + m2(Math.round(r.gp * 100) / 100) + ".";
      }
      root.querySelector("#perp-cmp").innerHTML = '<thead><tr><th>Perpetual method</th><th class="num">Cost of goods sold</th><th class="num">Ending inventory</th><th class="num">Gross profit</th></tr></thead><tbody>' +
        ["fifo", "avg", "lifo"].map(function (m) { var r = run(m); return '<tr><td>' + (m === "avg" ? "Moving average" : m.toUpperCase()) + '</td><td class="num">' + m2(Math.round(r.cogs * 100) / 100) + '</td><td class="num">' + m2(Math.round(r.end * 100) / 100) + '</td><td class="num">' + m2(Math.round(r.gp * 100) / 100) + '</td></tr>'; }).join("") + '</tbody>';
      root.querySelectorAll("[data-pm]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-pm]").forEach(function (x) { x.classList.toggle("on", x === b); }); draw(b.getAttribute("data-pm")); }); });
      draw("fifo");
    }
  });
})();

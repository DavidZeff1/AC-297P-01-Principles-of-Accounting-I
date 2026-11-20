/* Lesson 8.6 · Inventory Management */
HUB.register("8-6", {
  summary: "Balance the cost of holding inventory against the cost of running out, track inventory turnover, and see how a counting error ripples through two years of income.",
  objectives: [
    "Explain the trade-off in managing inventory levels",
    "Compute and interpret inventory turnover",
    "Trace the effect of ending and beginning inventory errors on income",
    "Explain why inventory errors counterbalance"
  ],
  html: `
<section class="sec" data-toc="The balancing act">
  <div class="eyebrow kind">Concept</div>
  <h2>Not too much, not too little</h2>
  <p>Well-run companies minimize their investment in inventory: it’s costly to hold and can be lost or spoil. But running out loses customers. Inventory levels need careful attention.</p>
  <div class="big-eq" style="font-size:20px">Inventory turnover = <span class="l">Cost of goods sold</span> ÷ <span class="a">Average inventory</span></div>
  <div class="panel"><div data-widget="calc" data-key="turn"></div></div>
  <p>Whether a turnover is good depends on the business. Eight times a year would be terrible for a bakery and fine for a lumber yard. Compare with similar companies and with the company’s own past. A falling rate may point to poor management, slow-moving goods, or a weakening economy. Remember that the inventory method chosen affects the ratio.</p>
</section>

<section class="sec" data-toc="Inventory errors">
  <div class="eyebrow kind try">Try it</div>
  <h2>How a counting error ripples</h2>
  <p>Counting mistakes are easy: goods overlooked, counted twice, or mis-added. Choose an error in Year 1’s ending inventory and watch both years. (Purchases are recorded correctly, and the correct ending inventory is $4,000.)</p>
  <div class="panel">
    <div class="seg" role="group" aria-label="Error"><button type="button" class="on" data-voice-state data-err="0">No error</button><button type="button" data-voice-state data-err="1000">Overstated by $1,000</button><button type="button" data-voice-state data-err="-1000">Understated by $1,000</button></div>
    <div class="grid2" style="margin-top:14px" id="err"></div>
    <p class="verdict" id="err-say" aria-live="polite"></p>
  </div>
  <div class="grid2">
    <div class="tile"><span class="k">Ending inventory error</span><p>Overstated ending inventory → understated cost of goods sold → <b>overstated</b> income that year. Understated → understated income.</p></div>
    <div class="tile alt"><span class="k">Beginning inventory error</span><p>Last year’s ending error becomes this year’s beginning error, with the <b>opposite</b> effect: overstated beginning inventory → <b>understated</b> income.</p></div>
  </div>
  <p>So inventory errors <b>counterbalance</b>: two-year total income is right ($13,000 + $13,000 = $14,000 + $12,000), but each year is badly wrong.</p>
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
    <li><span>Hold enough inventory to serve customers, but no more than necessary.</span></li>
    <li><span><b>Inventory turnover</b> = cost of goods sold ÷ average inventory; compare with peers and prior years.</span></li>
    <li><span>Overstated ending inventory overstates that year’s income and understates the next year’s.</span></li>
    <li><span>Inventory errors counterbalance over two years, but each year’s income is wrong.</span></li>
  </ol>
</section>`,

  data: {
    turn: {
      inputs: [
        { id: "c", label: "Annual cost of goods sold", min: 2000000, max: 12000000, step: 2000000, value: 8000000, fmt: "$" },
        { id: "a", label: "Average inventory", min: 500000, max: 2000000, step: 500000, value: 1000000, fmt: "$" }
      ],
      run: function (v) {
        var t = v.c / v.a, d = 365 / t;
        return { html: '<div class="big-eq" style="font-size:22px"><span class="e">' + t.toFixed(1) + ' times</span> a year ≈ every ' + Math.round(d) + ' days</div>',
          say: "Inventory turns over <b>" + t.toFixed(1) + " times</b> a year, about once every " + Math.round(d) + " days." };
      }
    }
  },

  cards: {
    terms: [
      { term: "Inventory turnover", back: "Cost of goods sold ÷ average inventory: how many times inventory is sold during the year." },
      { term: "Ending inventory error", back: "Overstatement overstates that year’s income; understatement understates it." },
      { term: "Beginning inventory error", back: "Overstatement understates that year’s income; understatement overstates it." },
      { term: "Counterbalancing", back: "An inventory error reverses itself over two years: total income is right, each year is wrong." }
    ]
  },

  quiz: [
    { q: "Cost of goods sold $8,000,000; average inventory $1,000,000. Turnover is:", options: ["0.125", "8", "45", "9"], answer: 1, why: "$8,000,000 ÷ $1,000,000." },
    { q: "A turnover of 8 means inventory is sold about every:", options: ["8 days", "45 days", "80 days", "365 days"], answer: 1, why: "365 ÷ 8 ≈ 45 days." },
    { q: "A declining inventory turnover might indicate:", options: ["Faster-selling goods", "Slow-moving goods or a weakening economy", "Better management", "Lower prices"], answer: 1, why: "Goods are sitting longer." },
    { q: "Ending inventory is overstated by $1,000. That year’s income is:", options: ["Understated by $1,000", "Overstated by $1,000", "Correct", "Overstated by $2,000"], answer: 1, why: "Cost of goods sold is understated." },
    { q: "Beginning inventory is overstated by $1,000. That year’s income is:", options: ["Overstated by $1,000", "Understated by $1,000", "Correct", "Understated by $2,000"], answer: 1, why: "Cost of goods sold is overstated." },
    { q: "Over two years, an ending inventory error:", options: ["Doubles", "Counterbalances, so total income is correct", "Never affects income", "Affects only the balance sheet"], answer: 1, why: "It reverses in the second year." }
  ],

  init: function (root) {
    function yr(n, beg, end) {
      var avail = beg + (n === 1 ? 9000 : 7000), cogs = avail - end;
      return { title: "Year " + n, cols: 1, rows: [
        { l: "Sales", a: 20000 }, { l: "Beginning inventory", a: beg, ind: 1 }, { l: "Purchases", a: n === 1 ? 9000 : 7000, ind: 1, ua: true },
        { l: "Goods available", a: avail, ind: 1 }, { l: "Ending inventory", a: -end, ind: 1, ua: true }, { l: "Cost of goods sold", a: -cogs, ua: true },
        { l: "Income", a: 20000 - cogs, bold: true, uua: true } ] };
    }
    function draw(e) {
      var box = root.querySelector("#err");
      box.innerHTML = '<div id="y1"></div><div id="y2"></div>';
      HUB.widgets.statement(box.querySelector("#y1"), yr(1, 2000, 4000 + e));
      HUB.widgets.statement(box.querySelector("#y2"), yr(2, 4000 + e, 4000));
      var i1 = 13000 + e, i2 = 13000 - e;
      root.querySelector("#err-say").innerHTML = e === 0 ? "Correct counts: income is <b>$13,000</b> each year."
        : "Year 1 income is <b>$" + i1.toLocaleString() + "</b> and Year 2 is <b>$" + i2.toLocaleString() + "</b>. Each year is off by $1,000 in opposite directions, but the two-year total is still $26,000.";
    }
    root.querySelectorAll("[data-err]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-err]").forEach(function (x) { x.classList.toggle("on", x === b); }); draw(+b.getAttribute("data-err")); }); });
    draw(0);
  }
});

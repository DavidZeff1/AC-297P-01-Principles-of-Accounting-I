/* Lesson 5.3 · Alternative Inventory System (perpetual) */
HUB.register("5-3", {
  summary: "The perpetual system updates inventory and cost of goods sold with every purchase and sale, giving managers real-time data. Scan sales at a register and watch the books update, then reconcile with a physical count.",
  objectives: [
    "Explain the weakness of the periodic system",
    "Record purchases and sales under the perpetual system",
    "Explain why physical counts are still needed"
  ],
  html: `
<section class="sec" data-toc="Why perpetual">
  <div class="eyebrow kind">Concept</div>
  <h2>Real-time inventory data</h2>
  <p>Under the periodic system, inventory records are updated only at closing, after a physical count. That gives no real-time information about inventory levels or gross profit, which can be very costly when inventory is significant. Managers need to know what’s selling and what isn’t.</p>
  <p>That’s why many merchants use <b>perpetual</b> inventory systems. Bar code scanners at checkout speed up the line and feed the accounting system, so each purchase or sale immediately updates inventory and cost of sales.</p>
  <div class="panel scroll-x">
    <table class="plain">
      <thead><tr><th></th><th>Periodic</th><th>Perpetual</th></tr></thead>
      <tbody>
        <tr><td><b>Buying goods</b></td><td>Debit Purchases</td><td>Debit Inventory</td></tr>
        <tr><td><b>Selling goods</b></td><td>Record the sale only</td><td>Record the sale <i>and</i> debit Cost of Goods Sold, credit Inventory</td></tr>
        <tr><td><b>Freight-in</b></td><td>Freight-in account</td><td>Added to Inventory</td></tr>
        <tr><td><b>Discounts and returns</b></td><td>Separate contra-purchase accounts</td><td>Reduce Inventory</td></tr>
        <tr><td><b>Cost of goods sold</b></td><td>Calculated at period end</td><td>Read straight from the ledger</td></tr>
        <tr><td><b>Real-time data</b></td><td>No</td><td>Yes</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="sec" data-toc="The entries">
  <div class="eyebrow kind">Concept</div>
  <h2>Perpetual entries</h2>
  <div data-widget="journal" data-key="entries"></div>
  <p>Every sale takes <b>two</b> entries: one at selling price for the revenue, and one at cost to move the goods from Inventory to Cost of Goods Sold.</p>
</section>

<section class="sec" data-toc="Run the register">
  <div class="eyebrow kind try">Try it</div>
  <h2>Run the register</h2>
  <p>The shop starts with $3,000 of inventory. Scan items to sell them and watch both entries post instantly.</p>
  <div class="panel" id="register">
    <div class="reg-items" id="reg-items"></div>
    <div class="grid2" style="margin-top:14px"><div id="reg-books"></div><div id="reg-last"></div></div>
    <p class="verdict" id="reg-say" aria-live="polite"></p>
    <div class="w-ctl"><button type="button" class="btn ghost small" id="reg-count" data-voice-state>Do a physical count</button><button type="button" class="btn ghost small" id="reg-reset">Start over</button></div>
  </div>
</section>

<section class="sec" data-toc="Not as simple as it looks">
  <div class="eyebrow kind">Watch out</div>
  <h2>Simpler entries, harder system</h2>
  <div class="grid2">
    <div class="tile"><span class="k">Costing every sale</span><p>Perpetual looks simpler, but it requires knowing the <b>cost of each item</b> as it’s sold. In a big retail store that’s nearly impossible without sophisticated software, which has become commonplace as computers got cheaper.</p></div>
    <div class="tile warn"><span class="k">Counts are still needed</span><p>Theft, spoilage, waste, and errors make the records drift from what’s really on the shelves. Merchants still take <b>physical counts</b> occasionally and adjust Inventory to match.</p></div>
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
    <li><span>The periodic system gives no real-time inventory or gross profit data.</span></li>
    <li><span><b>Perpetual</b>: purchases debit Inventory; each sale also debits Cost of Goods Sold and credits Inventory at cost.</span></li>
    <li><span>No Purchases account: freight-in increases Inventory; discounts and returns decrease it.</span></li>
    <li><span>Physical counts still catch theft, spoilage, and errors.</span></li>
  </ol>
</section>`,

  data: {
    entries: { entries: [
      { date: "", lines: [["Inventory", 5000, 0], ["Accounts Payable", 0, 5000]], memo: "Purchased inventory on account" },
      { date: "", lines: [["Accounts Receivable", 1500, 0], ["Sales", 0, 1500]], memo: "Sold goods at their selling price" },
      { date: "", lines: [["Cost of Goods Sold", 1000, 0], ["Inventory", 0, 1000]], memo: "…and moved their $1,000 cost out of inventory" }
    ]}
  },

  cards: {
    terms: [
      { term: "Perpetual inventory system", back: "Inventory and cost of goods sold are updated with every purchase and sale." },
      { term: "Cost of Goods Sold (perpetual)", back: "Debited at cost each time goods are sold; its ledger balance is the period’s COGS." },
      { term: "Shrinkage", back: "Inventory lost to theft, spoilage, waste, or error, found by comparing records with a physical count." },
      { term: "Physical count", back: "Counting goods on hand; still needed under a perpetual system to correct the records." }
    ]
  },

  quiz: [
    { q: "The main weakness of the periodic system is:", options: ["It requires bar code scanners", "It gives no real-time data on inventory or gross profit", "It can’t record sales", "It isn’t allowed by GAAP"], answer: 1, why: "Inventory is updated only at closing." },
    { q: "Under a perpetual system, purchasing inventory on account is recorded as:", options: ["Debit Purchases, credit Accounts Payable", "Debit Inventory, credit Accounts Payable", "Debit Cost of Goods Sold, credit Accounts Payable", "Debit Accounts Payable, credit Inventory"], answer: 1, why: "The Purchases account isn’t used." },
    { q: "Goods costing $1,000 are sold for $1,500 on account (perpetual). The second entry is:", options: ["Debit Inventory $1,000, credit Cost of Goods Sold $1,000", "Debit Cost of Goods Sold $1,000, credit Inventory $1,000", "Debit Cost of Goods Sold $1,500, credit Inventory $1,500", "No second entry"], answer: 1, why: "The goods’ cost moves from inventory to expense." },
    { q: "Under a perpetual system, freight-in is:", options: ["Added to Inventory", "A selling expense", "Recorded in a Freight-in account", "Ignored"], answer: 0, why: "It’s part of the cost of the goods." },
    { q: "Why do perpetual-system merchants still take physical counts?", options: ["The law requires it daily", "Theft, spoilage, waste, and errors create differences from the records", "To compute purchases", "To close the Purchases account"], answer: 1, why: "Records drift from reality; counts correct them." },
    { q: "What makes a perpetual system hard to run in a large store?", options: ["Recording purchases", "Determining the cost of each item as it’s sold", "Computing sales tax", "Closing the books"], answer: 1, why: "Costing every sale requires sophisticated software." }
  ],

  init: function (root) {
    var ITEMS = [["Hiking boots", 120, 75], ["Tent", 300, 180], ["Water bottle", 25, 10]];
    var inv, cogs, sales, last, counted;
    function reset() { inv = 3000; cogs = 0; sales = 0; last = null; counted = false; paint(); root.querySelector("#reg-say").textContent = "Scan an item to sell it."; }
    function money(n) { return "$" + n.toLocaleString(); }
    function paint() {
      root.querySelector("#reg-items").innerHTML = ITEMS.map(function (it, i) { return '<button type="button" class="reg-item" data-i="' + i + '" data-voice-state><b>' + it[0] + '</b><span>Price ' + money(it[1]) + ' · Cost ' + money(it[2]) + '</span><span class="reg-scan">Scan</span></button>'; }).join("");
      root.querySelector("#reg-books").innerHTML = '<div class="statement"><div class="st-head"><b>Live ledger balances</b></div><div class="st-row"><span class="st-l">Sales</span><span class="st-b">' + money(sales) + '</span></div><div class="st-row"><span class="st-l">Cost of goods sold</span><span class="st-b">' + money(cogs) + '</span></div><div class="st-row bold"><span class="st-l">Gross profit</span><span class="st-b">' + money(sales - cogs) + '</span></div><div class="st-row"><span class="st-l">Inventory on the books</span><span class="st-b">' + money(inv) + '</span></div></div>';
      var el = root.querySelector("#reg-last");
      if (last) HUB.widgets.journal(el, { entries: last }); else el.innerHTML = '<p class="hint">The entries for each scan appear here.</p>';
    }
    root.querySelector("#reg-items").addEventListener("click", function (e) {
      var b = e.target.closest(".reg-item"); if (!b) return;
      var it = ITEMS[+b.getAttribute("data-i")];
      if (inv < it[2]) { root.querySelector("#reg-say").textContent = "Out of stock on the books."; return; }
      sales += it[1]; cogs += it[2]; inv -= it[2];
      last = [{ date: "Sale", lines: [["Cash", it[1], 0], ["Sales", 0, it[1]]], memo: it[0] + " sold" }, { date: "", lines: [["Cost of Goods Sold", it[2], 0], ["Inventory", 0, it[2]]], memo: "Its cost leaves inventory" }];
      paint();
      root.querySelector("#reg-say").textContent = "Sold " + it[0].toLowerCase() + ": sales up " + money(it[1]) + ", cost of goods sold up " + money(it[2]) + ", inventory now " + money(inv) + ".";
    });
    root.querySelector("#reg-count").addEventListener("click", function () {
      var shrink = Math.min(60, inv);
      inv -= shrink; cogs += shrink;
      last = [{ date: "Count", lines: [["Cost of Goods Sold (shrinkage)", shrink, 0], ["Inventory", 0, shrink]], memo: "Physical count found $" + shrink + " less than the records" }];
      paint();
      root.querySelector("#reg-say").textContent = "The physical count found $" + shrink + " of goods missing, from theft, spoilage, or error. Inventory is adjusted down to " + money(inv) + ".";
    });
    root.querySelector("#reg-reset").addEventListener("click", reset);
    reset();
  }
});

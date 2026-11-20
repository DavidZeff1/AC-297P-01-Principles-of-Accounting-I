/* Lesson 5.2 · Purchase Considerations for Merchandising Businesses */
HUB.register("5-2", {
  summary: "How a merchant records inventory purchases under the periodic system: returns, purchase discounts (gross and net methods), freight terms, net purchases, cost of goods sold, and the merchandising closing entries.",
  objectives: [
    "Record purchases and purchase returns under the periodic system",
    "Compare the gross and net methods for purchase discounts",
    "Apply F.O.B. shipping point and destination terms",
    "Compute net purchases and cost of goods sold, and close a merchant’s books"
  ],
  html: `
<section class="sec" data-toc="Periodic purchases">
  <div class="eyebrow kind">Concept</div>
  <h2>Inventory needs careful attention</h2>
  <p>Walk into almost any store and you’ll see a big investment in inventory. Even a profitable merchant can get into trouble if goods sit unsold and go out of style or become obsolete. (Chapter 8 is devoted to inventory; this lesson covers what’s unique to a merchant’s purchases.)</p>
  <div class="grid2">
    <div class="tile"><span class="k">Periodic system</span><p>Easier to implement, but less robust. Purchases are recorded in a <b>Purchases</b> account; inventory is counted at period end.</p></div>
    <div class="tile alt"><span class="k">Perpetual system</span><p>Constant, real-time updating. A far better management tool. Covered in lesson 5.3.</p></div>
  </div>
  <div data-widget="journal" data-key="purch"></div>
  <p>The <b>Purchases</b> account is neither an asset nor an expense by itself. It accumulates everything bought during the period, and that total is later divided between <b>cost of goods sold</b> (goods resold) and <b>inventory</b> (goods still on hand).</p>
</section>

<section class="sec" data-toc="Returns and discounts">
  <div class="eyebrow kind">Concept</div>
  <h2>Purchase returns and discounts</h2>
  <p>Between businesses, returns aren’t casual. The supplier may require a <b>Return Merchandise Authorization (RMA)</b> first. When goods go back, the buyer may prepare a <b>debit memorandum</b> to debit its Accounts Payable:</p>
  <div data-widget="journal" data-key="pret"></div>
  <p>Cash discounts look small but are worth taking. Common terms include <b>1/15, n/30</b> (1% within 15 days, net in 30), <b>1/10, n/eom</b> (net due at end of month), and <b>.5/10, n/60</b>.</p>
  <div class="panel">
    <div class="panel-title"><h3>What does skipping a discount cost?</h3><span class="hint">Annual equivalent, as computed in the reading</span></div>
    <div data-widget="calc" data-key="cost"></div>
  </div>
  <p>Businesses should set up systems to take every reasonable discount: filing invoices by discount date, or automated payments and wire transfers timed for the last allowed day. Some vendors will even accept a discounted payment after the period ends. Is it good business, or ethical, to “bend the terms”? Are those the same question?</p>
</section>

<section class="sec" data-toc="Gross vs. net method">
  <div class="eyebrow kind try">Try it</div>
  <h2>Gross method vs. net method</h2>
  <p>A $5,000 purchase on terms 2/10, n/30. The <b>gross method</b> records the purchase at the full invoice amount and tracks discounts <i>taken</i>. The <b>net method</b> records it net of the expected discount and tracks discounts <i>lost</i>.</p>
  <div class="panel">
    <div class="seg" role="group" aria-label="Payment timing"><button type="button" class="on" data-voice-state data-pay="in">Paid within 10 days</button><button type="button" data-voice-state data-pay="late">Paid after 10 days</button></div>
    <div class="grid2" style="margin-top:14px">
      <div><h3 class="poster-h">Gross method</h3><div id="gross-j"></div></div>
      <div><h3 class="poster-h">Net method</h3><div id="net-j"></div></div>
    </div>
    <p class="verdict" id="gn-say" aria-live="polite"></p>
  </div>
  <p><b>Purchase Discounts</b> (gross method) is subtracted from purchases. <b>Purchase Discounts Lost</b> (net method) is reported as an expense after gross profit, and it highlights missed discounts, usually a bad sign.</p>
</section>

<section class="sec" data-toc="Freight terms">
  <div class="eyebrow kind try">Try it</div>
  <h2>Freight: who pays, and when ownership changes</h2>
  <p>Freight can exceed 10% of a transaction’s value, so freight terms are part of every negotiation. In the U.S., the <b>F.O.B.</b> (“free on board”) point is where <b>ownership transfers</b>. Beyond it, the buyer bears the risk of loss, pays for the goods, and pays the freight. Global trade uses the International Chamber of Commerce’s “incoterms” (FCA, DDU, and others).</p>
  <div class="panel">
    <div class="seg" role="group" aria-label="Freight terms"><button type="button" class="on" data-voice-state data-fob="dest">F.O.B. destination</button><button type="button" data-voice-state data-fob="ship">F.O.B. shipping point</button><button type="button" data-voice-state data-fob="pre">Shipping point, freight prepaid</button></div>
    <div class="fob" id="fob"></div>
    <div class="grid2"><div><h3 class="poster-h">Seller’s entries</h3><div id="fob-s"></div></div><div><h3 class="poster-h">Buyer’s entries</h3><div id="fob-b"></div></div></div>
    <p class="verdict" id="fob-say" aria-live="polite"></p>
  </div>
  <div class="grid2">
    <div class="tile"><span class="k">Freight-out</span><p>Freight paid by the <b>seller</b>: a <b>selling expense</b> subtracted from gross profit.</p></div>
    <div class="tile alt"><span class="k">Freight-in</span><p>Freight paid by the <b>buyer</b>: added to purchases as part of the cost of the goods.</p></div>
  </div>
  <p>Cash discounts usually don’t apply to freight: 2% on the $10,400 above is $200 (2% of $10,000), not $208. Terms can also name a city: “F.O.B. St. Louis” means the seller pays from New York to St. Louis and the buyer from St. Louis on.</p>
</section>

<section class="sec" data-toc="Net purchases and COGS">
  <div class="eyebrow kind">Concept</div>
  <h2>Net purchases and cost of goods sold</h2>
  <p>Net purchases are the ordinary and necessary costs of getting goods to their location for resale. Storage, insurance, and interest are <b>period costs</b>: expensed as operating expenses, not attached to the product.</p>
  <div data-widget="statement" data-key="netp"></div>
  <p>Total cost must then be split between goods sold and goods still on hand. Under the periodic system, ending inventory comes from a <b>physical count</b>.</p>
  <div class="big-eq" style="font-size:20px">Beginning inventory + Net purchases = <span class="a">Goods available for sale</span> − Ending inventory = <span class="l">Cost of goods sold</span></div>
  <div class="panel"><div data-widget="calc" data-key="cogs"></div></div>
</section>

<section class="sec" data-toc="Detailed income statement">
  <div class="eyebrow kind">Example</div>
  <h2>Bill’s Sporting Goods: a detailed income statement</h2>
  <p>Notice (1) the net sales calculation, (2) net purchases including freight-in, (3) cost of goods sold and gross profit, and (4) freight-out among the selling expenses. Many companies show less detail, depending on materiality.</p>
  <div data-widget="statement" data-key="bill"></div>
</section>

<section class="sec" data-toc="Closing a merchant">
  <div class="eyebrow kind">Concept</div>
  <h2>Closing entries for a merchant</h2>
  <p>Closing now includes all the new accounts, and one surprise: <b>Inventory</b>, a real account, appears in closing. Under the periodic system, purchases go to Purchases and nothing reduces Inventory as goods are sold, so Inventory still holds the <b>beginning</b> balance all year. Closing removes the beginning balance and establishes the counted ending balance. Together these entries reduce Income Summary by cost of goods sold.</p>
  <div data-widget="journal" data-key="close"></div>
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
    <li><span>Periodic system: debit <b>Purchases</b>; returns credit <b>Purchase Returns and Allowances</b>.</span></li>
    <li><span><b>Gross method</b> tracks discounts taken; <b>net method</b> tracks discounts lost. Missing 2/10, n/30 costs about 36% a year.</span></li>
    <li><span><b>F.O.B. destination</b>: seller pays freight-out (selling expense). <b>F.O.B. shipping point</b>: buyer pays freight-in (added to purchases).</span></li>
    <li><span>Net purchases = purchases + freight-in − discounts − returns. COGS = beginning inventory + net purchases − ending inventory.</span></li>
    <li><span>Merchant closing also removes beginning inventory and records the ending count.</span></li>
  </ol>
</section>`,

  data: {
    purch: { entries: [{ date: "", lines: [["Purchases", 5000, 0], ["Accounts Payable", 0, 5000]], memo: "Bought merchandise on account (periodic system)" }] },
    pret: { entries: [{ date: "", lines: [["Accounts Payable", 1000, 0], ["Purchase Returns and Allowances", 0, 1000]], memo: "Returned merchandise to the supplier; debit memorandum" }] },
    cost: {
      inputs: [
        { id: "d", label: "Discount", min: 1, max: 3, step: 1, value: 2, fmt: "%" },
        { id: "w", label: "Extra days gained by skipping it", min: 10, max: 50, step: 10, value: 20, fmt: "n" }
      ],
      run: function (v) {
        var periods = 365 / v.w, rate = v.d * periods;
        return { html: '<div class="big-eq" style="font-size:22px">' + v.d + '% × (365 ÷ ' + v.w + ') ≈ <span class="l">' + rate.toFixed(1) + '% a year</span></div><p class="hint">Skipping the discount only defers payment ' + v.w + ' days. There are about ' + periods.toFixed(1) + ' such periods in a year.</p>',
          say: "Skipping a " + v.d + " percent discount to gain " + v.w + " days is like paying about <b>" + Math.round(rate) + " percent</b> annual interest." };
      }
    },
    netp: { entity: "", title: "Calculation of Net Purchases", cols: 2, rows: [
      { l: "Purchases", a: 400000 },
      { l: "Add: Freight-in", a: 40000, ua: true },
      { l: "Subtotal", a: 440000, ind: 1 },
      { l: "Less: Purchase discounts", a: -8000, ind: 1 },
      { l: "Less: Purchase returns and allowances", a: -12000, ind: 1, ua: true },
      { l: "Net purchases", b: 420000, bold: true, uub: true }
    ]},
    cogs: {
      inputs: [
        { id: "b", label: "Beginning inventory", min: 25000, max: 150000, step: 25000, value: 75000, fmt: "$" },
        { id: "p", label: "Net purchases", min: 300000, max: 500000, step: 40000, value: 420000, fmt: "$" },
        { id: "e", label: "Ending inventory (count)", min: 25000, max: 150000, step: 25000, value: 100000, fmt: "$" }
      ],
      run: function (v, money) {
        var av = v.b + v.p, cg = av - v.e, pe = Math.round(100 * v.e / av);
        return { html: '<div class="split-bar"><span class="sb-a" style="width:' + (100 - pe) + '%">COGS ' + money(cg) + '</span><span class="sb-b" style="width:' + pe + '%">Inventory ' + money(v.e) + '</span></div><p>Goods available for sale: <b>' + money(av) + '</b></p>',
          say: "Goods available of " + money(av) + " are split: <b>" + money(cg) + "</b> to cost of goods sold and " + money(v.e) + " to ending inventory." };
      }
    },
    bill: { entity: "Bill’s Sporting Goods", title: "Income Statement", date: "For the Year Ended December 31, 20X5", cols: 2, rows: [
      { l: "Sales", a: 900000 },
      { l: "Less: Sales returns and allowances", a: -15000, ind: 1 },
      { l: "Less: Sales discounts", a: -5000, ind: 1, ua: true },
      { l: "Net sales", b: 880000 },
      { l: "Cost of goods sold", head: true },
      { l: "Beginning inventory, Jan. 1", a: 75000, ind: 1 },
      { l: "Purchases $400,000 + freight-in $40,000 − discounts $8,000 − returns $12,000", a: 420000, ind: 1, ua: true },
      { l: "Goods available for sale", a: 495000, ind: 1 },
      { l: "Less: Ending inventory, Dec. 31", a: -95000, ind: 1, ua: true },
      { l: "Cost of goods sold", b: -400000, ub: true },
      { l: "Gross profit", b: 480000, bold: true },
      { l: "Selling expenses", head: true },
      { l: "Sales salaries", a: 120000, ind: 1 },
      { l: "Advertising", a: 40000, ind: 1 },
      { l: "Freight-out", a: 20000, ind: 1, ua: true },
      { l: "Total selling expenses", b: 180000 },
      { l: "General and administrative expenses", head: true },
      { l: "Office salaries", a: 150000, ind: 1 },
      { l: "Rent", a: 30000, ind: 1 },
      { l: "Utilities", a: 20000, ind: 1, ua: true },
      { l: "Total general and administrative", b: 200000, ub: true },
      { l: "Total operating expenses", b: -380000, ub: true },
      { l: "Net income", b: 100000, bold: true, uub: true }
    ]},
    close: { entries: [
      { date: "Dec. 31", lines: [["Sales", 900000, 0], ["Purchase Returns and Allowances", 12000, 0], ["Purchase Discounts", 8000, 0], ["Inventory (ending count)", 95000, 0], ["Income Summary", 0, 1015000]], memo: "Close credit-balance accounts and record ending inventory" },
      { date: "Dec. 31", lines: [["Income Summary", 915000, 0], ["Sales Returns and Allowances", 0, 15000], ["Sales Discounts", 0, 5000], ["Purchases", 0, 400000], ["Freight-in", 0, 40000], ["Inventory (beginning)", 0, 75000], ["Sales Salaries", 0, 120000], ["Advertising Expense", 0, 40000], ["Freight-out", 0, 20000], ["Office Salaries", 0, 150000], ["Rent Expense", 0, 30000], ["Utilities Expense", 0, 20000]], memo: "Close debit-balance accounts and remove beginning inventory" },
      { date: "Dec. 31", lines: [["Income Summary", 100000, 0], ["Retained Earnings", 0, 100000]], memo: "Close net income to Retained Earnings" }
    ]}
  },

  cards: {
    terms: [
      { term: "Periodic inventory system", back: "Purchases are recorded in a Purchases account; inventory is determined by a physical count at period end." },
      { term: "Purchases", back: "Periodic-system account accumulating goods bought; later split between COGS and inventory." },
      { term: "RMA", sub: "Return Merchandise Authorization", back: "A supplier’s approval to accept returned goods." },
      { term: "Debit memorandum", back: "Buyer’s document for a return, indicating Accounts Payable is debited." },
      { term: "Gross method", back: "Record purchases at full invoice price; discounts taken go to Purchase Discounts." },
      { term: "Net method", back: "Record purchases net of the discount; missed discounts go to Purchase Discounts Lost (an expense)." },
      { term: "F.O.B. point", back: "Where ownership transfers; the buyer pays freight beyond it and bears the risk of loss." },
      { term: "Freight-in", back: "Freight paid by the buyer; added to purchases." },
      { term: "Freight-out", back: "Freight paid by the seller; a selling expense." },
      { term: "Net purchases", back: "Purchases + freight-in − purchase discounts − purchase returns and allowances." },
      { term: "Goods available for sale", back: "Beginning inventory + net purchases." },
      { term: "Period costs", back: "Costs like storage, insurance, and interest that are expensed as incurred, not added to inventory." }
    ]
  },

  quiz: [
    { q: "Under the periodic system, buying merchandise on account is recorded as:", options: ["Debit Inventory, credit Accounts Payable", "Debit Purchases, credit Accounts Payable", "Debit Cost of Goods Sold, credit Cash", "Debit Accounts Payable, credit Purchases"], answer: 1, why: "The periodic system uses a Purchases account." },
    { q: "Returning goods to a supplier is recorded by the buyer as:", options: ["Debit Purchase Returns and Allowances, credit Accounts Payable", "Debit Accounts Payable, credit Purchase Returns and Allowances", "Debit Sales Returns, credit Accounts Receivable", "Debit Inventory, credit Purchases"], answer: 1, why: "The payable falls; the contra-purchases account is credited." },
    { q: "Under the net method, a missed discount is recorded in:", options: ["Purchase Discounts", "Purchase Discounts Lost", "Sales Discounts", "Freight-in"], answer: 1, why: "Discounts lost are an expense under the net method." },
    { q: "A $5,000 purchase, 2/10, n/30, gross method, paid within 10 days. The payment entry credits Cash $4,900 and credits:", options: ["Purchases $100", "Purchase Discounts $100", "Accounts Payable $100", "Purchase Discounts Lost $100"], answer: 1, why: "Accounts Payable is debited $5,000; the $100 discount is credited to Purchase Discounts." },
    { q: "Goods are shipped F.O.B. shipping point. Who pays the freight?", options: ["The seller, as freight-out", "The buyer, as freight-in", "The carrier", "They split it"], answer: 1, why: "Ownership transfers at shipping, so the buyer pays to bring the goods home." },
    { q: "Freight-out is reported as:", options: ["Part of cost of goods sold", "A selling expense", "A reduction of sales", "An asset"], answer: 1, why: "It’s the seller’s cost of delivering goods." },
    { q: "Purchases $400,000, freight-in $40,000, purchase discounts $8,000, purchase returns $12,000. Net purchases are:", options: ["$400,000", "$420,000", "$440,000", "$460,000"], answer: 1, why: "$400,000 + $40,000 − $8,000 − $12,000 = $420,000." },
    { q: "Beginning inventory $75,000, net purchases $420,000, ending inventory $95,000. COGS is:", options: ["$400,000", "$495,000", "$590,000", "$345,000"], answer: 0, why: "$75,000 + $420,000 − $95,000 = $400,000." },
    { q: "Missing a 2/10, n/30 discount is roughly equivalent to paying annual interest of about:", options: ["2%", "10%", "36%", "60%"], answer: 2, why: "2% for a 20-day deferral, about 18 times a year." },
    { q: "Why does Inventory appear in a periodic-system merchant’s closing entries?", options: ["It’s a temporary account", "It must be updated from the beginning balance to the counted ending balance", "It’s closed to zero", "It records freight"], answer: 1, why: "Nothing updated Inventory during the year under the periodic system." }
  ],

  init: function (root) {
    var J = HUB.widgets.journal;
    function gn(t) {
      var p = { date: "Purchase", lines: [["Purchases", 5000, 0], ["Accounts Payable", 0, 5000]] };
      var pn = { date: "Purchase", lines: [["Purchases", 4900, 0], ["Accounts Payable", 0, 4900]] };
      J(root.querySelector("#gross-j"), { entries: [p, t === "in"
        ? { date: "Payment", lines: [["Accounts Payable", 5000, 0], ["Cash", 0, 4900], ["Purchase Discounts", 0, 100]], memo: "Paid within the discount period" }
        : { date: "Payment", lines: [["Accounts Payable", 5000, 0], ["Cash", 0, 5000]], memo: "Paid late; full amount due" }] });
      J(root.querySelector("#net-j"), { entries: [pn, t === "in"
        ? { date: "Payment", lines: [["Accounts Payable", 4900, 0], ["Cash", 0, 4900]], memo: "Paid within the discount period" }
        : { date: "Payment", lines: [["Accounts Payable", 4900, 0], ["Purchase Discounts Lost", 100, 0], ["Cash", 0, 5000]], memo: "Paid late; the lost discount is an expense" }] });
      root.querySelector("#gn-say").innerHTML = t === "in" ? "Discount taken: both methods account for <b>$4,900</b>. Gross shows $5,000 of purchases less a $100 discount; net simply shows $4,900."
        : "Discount lost: both methods account for <b>$5,000</b>. Gross shows $5,000 of purchases; net shows $4,900 of purchases plus $100 of discounts lost.";
    }
    var FOB = {
      dest: { pay: "seller", s: [{ date: "", lines: [["Accounts Receivable", 10000, 0], ["Sales", 0, 10000]], memo: "Sale" }, { date: "", lines: [["Freight-out", 400, 0], ["Cash", 0, 400]], memo: "Seller pays the trucking company" }],
        b: [{ date: "", lines: [["Purchases", 10000, 0], ["Accounts Payable", 0, 10000]], memo: "Purchase; no freight cost to the buyer" }],
        say: "F.O.B. destination: the seller owns the goods until they arrive, so the <b>seller</b> pays the $400 freight as freight-out." },
      ship: { pay: "buyer", s: [{ date: "", lines: [["Accounts Receivable", 10000, 0], ["Sales", 0, 10000]], memo: "Sale" }],
        b: [{ date: "", lines: [["Purchases", 10000, 0], ["Accounts Payable", 0, 10000]], memo: "Purchase" }, { date: "", lines: [["Freight-in", 400, 0], ["Cash", 0, 400]], memo: "Buyer pays the trucking company" }],
        say: "F.O.B. shipping point: ownership passes when the goods ship, so the <b>buyer</b> pays the $400 freight as freight-in." },
      pre: { pay: "both", s: [{ date: "", lines: [["Accounts Receivable", 10400, 0], ["Sales", 0, 10000], ["Cash", 0, 400]], memo: "Seller prepays freight as a favor and bills the buyer for it" }],
        b: [{ date: "", lines: [["Purchases", 10000, 0], ["Freight-in", 400, 0], ["Accounts Payable", 0, 10400]], memo: "Buyer owes the goods plus the prepaid freight" }],
        say: "Shipping point, freight prepaid: the seller pays the trucker as an accommodation, but the <b>buyer</b> still bears the cost by reimbursing the seller $400." }
    };
    function fob(k) {
      var f = FOB[k];
      root.querySelector("#fob").innerHTML = '<div class="fob-row"><span class="fob-end">Seller<br><small>New York</small></span><span class="fob-truck ' + f.pay + '">$400 freight paid by <b>' + (f.pay === "both" ? "seller, then reimbursed by buyer" : f.pay) + '</b></span><span class="fob-end">Buyer<br><small>Los Angeles</small></span></div><div class="fob-own"><span>Ownership transfers: <b>' + (k === "dest" ? "on arrival at the buyer" : "when goods leave the seller") + '</b></span></div>';
      J(root.querySelector("#fob-s"), { entries: f.s });
      J(root.querySelector("#fob-b"), { entries: f.b });
      root.querySelector("#fob-say").innerHTML = f.say;
    }
    root.querySelectorAll("[data-pay]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-pay]").forEach(function (x) { x.classList.toggle("on", x === b); }); gn(b.getAttribute("data-pay")); }); });
    root.querySelectorAll("[data-fob]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-fob]").forEach(function (x) { x.classList.toggle("on", x === b); }); fob(b.getAttribute("data-fob")); }); });
    gn("in"); fob("dest");
  }
});

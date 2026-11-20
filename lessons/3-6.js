/* Lesson 3.6 · Accrual Versus Cash-Basis Accounting */
HUB.register("3-6", {
  summary: "GAAP requires the accrual basis; some small businesses use the cash basis. Ortiz Company’s April shows how far apart the two can be, and why it mattered when a buyer offered 100 times monthly income.",
  objectives: [
    "Contrast cash-basis and accrual-basis accounting",
    "Describe the modified cash basis",
    "Convert a cash-basis income statement to the accrual basis",
    "Explain why accrual results better reflect performance"
  ],
  html: `
<section class="sec" data-toc="Two bases">
  <div class="eyebrow kind">Concept</div>
  <h2>Cash basis versus accrual basis</h2>
  <div class="grid3">
    <div class="tile"><span class="k">Accrual basis</span><p>Revenues recognized when <b>earned</b>, expenses when <b>incurred</b>. Required by GAAP and used by virtually all large companies.</p></div>
    <div class="tile alt"><span class="k">Cash basis</span><p>Revenue recorded when cash is <b>received</b>, expenses when <b>paid</b>, no matter when earned or incurred. Simple, but can be very misleading in the short run. Not GAAP.</p></div>
    <div class="tile"><span class="k">Modified cash basis</span><p>Cash basis, except large purchases of long-lived assets are recorded as assets and depreciated over time.</p></div>
  </div>
  <p>A small business without a broad base of shareholders or creditors doesn’t necessarily have to follow GAAP, so some use the cash basis. Proper income measurement, though, requires the accrual basis.</p>
</section>

<section class="sec" data-toc="Ortiz’s checkbook">
  <div class="eyebrow kind">Example</div>
  <h2>Ortiz Company’s April checkbook</h2>
  <p>Ortiz designs websites and uses the cash basis. It tracks receipts and payments in a spreadsheet: a checkbook register, with deposits spread to a revenue column and checks spread to expense columns. Cash rose <b>$15,732.70</b> in April, from $7,911.12 to $23,643.82.</p>
  <div class="panel scroll-x">
    <table class="plain sheet">
      <thead><tr><th>Date</th><th>Party</th><th class="num">Check</th><th class="num">Deposit</th><th class="num">Balance</th><th class="num">Revenue</th><th class="num">Payroll</th><th class="num">Rent</th><th class="num">Server</th><th class="num">Admin.</th></tr></thead>
      <tbody>
        <tr><td>Apr. 1</td><td>Beginning balance</td><td></td><td></td><td class="num">7,911.12</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>Apr. 3</td><td>Payroll</td><td class="num">700.00</td><td></td><td class="num">7,211.12</td><td></td><td class="num">700.00</td><td></td><td></td><td></td></tr>
        <tr><td>Apr. 5</td><td>Landlord</td><td class="num">1,500.00</td><td></td><td class="num">5,711.12</td><td></td><td></td><td class="num">1,500.00</td><td></td><td></td></tr>
        <tr><td>Apr. 7</td><td>Lakeview Clinic</td><td></td><td class="num">9,000.00</td><td class="num">14,711.12</td><td class="num">9,000.00</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>Apr. 15</td><td>Hosting provider</td><td class="num">1,416.22</td><td></td><td class="num">13,294.90</td><td></td><td></td><td></td><td class="num">1,416.22</td><td></td></tr>
        <tr><td>Apr. 17</td><td>Payroll</td><td class="num">2,100.00</td><td></td><td class="num">11,194.90</td><td></td><td class="num">2,100.00</td><td></td><td></td><td></td></tr>
        <tr><td>Apr. 20</td><td>Dunmore Supply</td><td></td><td class="num">11,788.45</td><td class="num">22,983.35</td><td class="num">11,788.45</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>Apr. 24</td><td>Office services</td><td class="num">589.53</td><td></td><td class="num">22,393.82</td><td></td><td></td><td></td><td></td><td class="num">589.53</td></tr>
        <tr><td>Apr. 26</td><td>Pine Bakery</td><td></td><td class="num">1,250.00</td><td class="num">23,643.82</td><td class="num">1,250.00</td><td></td><td></td><td></td><td></td></tr>
      </tbody>
      <tfoot><tr><td></td><td><b>Totals</b></td><td class="num">6,305.75</td><td class="num">22,038.45</td><td class="num"><b>23,643.82</b></td><td class="num">22,038.45</td><td class="num">2,800.00</td><td class="num">1,500.00</td><td class="num">1,416.22</td><td class="num">589.53</td></tr></tfoot>
    </table>
  </div>
</section>

<section class="sec" data-toc="The offer">
  <div class="eyebrow kind try">Try it</div>
  <h2>A buyer offers 100 times monthly income</h2>
  <p>Mega Impressions, a much larger firm, offers to buy Ortiz for <b>100 times its monthly net income under GAAP</b>. An accounting firm prepares April’s statement on the accrual basis, using these facts:</p>
  <div class="grid2">
    <div class="tile"><span class="k">Revenues</span><ul><li>The $9,000 deposit on April 7 is an advance for work done equally in April, May, and June.</li><li>The $11,788.45 deposit on April 20 collects an account for work done in January and February.</li><li>$2,000 of services were performed and billed in April but not yet collected.</li></ul></div>
    <div class="tile warn"><span class="k">Expenses</span><ul><li><b>Payroll:</b> $650 of the April 3 check was for March; another $350 is owed for April but unpaid.</li><li><b>Rent:</b> the amount paid equals the amount used.</li><li><b>Server:</b> $500 of the April 15 payment was for March usage.</li><li><b>Administrative:</b> another $600 is owed for April but unpaid.</li></ul></div>
  </div>
  <div class="panel">
    <div class="seg" role="group" aria-label="Basis"><button type="button" class="on" data-voice-state data-basis2="cash">Cash basis</button><button type="button" data-voice-state data-basis2="accrual">Accrual basis (GAAP)</button></div>
    <div class="grid2" style="margin-top:14px"><div id="ortiz-stmt"></div><div class="offer" id="ortiz-offer" aria-live="polite"></div></div>
  </div>
  <h3>Supporting calculations</h3>
  <div data-widget="steps" data-key="calc"></div>
  <p>Ortiz was very disappointed and rejected the deal. Cash-basis statements depend heavily on <b>when</b> cash happens to move, so a single period can look nothing like the business’s real economic activity. The accrual basis portrays each period’s results far better.</p>
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
    <li><span><b>GAAP requires the accrual basis</b>: revenues when earned, expenses when incurred.</span></li>
    <li><span>The <b>cash basis</b> records revenue when received and expense when paid. It’s simpler but can badly distort a period’s results.</span></li>
    <li><span>The <b>modified cash basis</b> capitalizes and depreciates long-lived assets but is otherwise cash basis.</span></li>
    <li><span>Converting to accrual removes cash from other periods’ activity and adds earned-but-uncollected revenue and incurred-but-unpaid expenses.</span></li>
  </ol>
</section>`,

  data: {
    calc: { items: [
      { t: "Revenue: $6,250", b: "<ul><li>April’s share of the $9,000 advance: $9,000 ÷ 3 = <b>$3,000</b></li><li>The $11,788.45 collection was earned in January–February: <b>$0</b> in April</li><li>Billed but uncollected April work: <b>$2,000</b></li><li>Pine Bakery job done and paid in April: <b>$1,250</b></li></ul>" },
      { t: "Payroll: $2,500", b: "<p>$2,800 paid − $650 for March + $350 owed for April = <b>$2,500</b>.</p>" },
      { t: "Rent: $1,500", b: "<p>Paid equals used: <b>$1,500</b>.</p>" },
      { t: "Server: $916.22", b: "<p>$1,416.22 paid − $500 for March = <b>$916.22</b>.</p>" },
      { t: "Administrative: $1,189.53", b: "<p>$589.53 paid + $600 owed = <b>$1,189.53</b>.</p>" },
      { t: "Net income: $144.25", b: "<p>$6,250.00 − $6,105.75 of expenses = <b>$144.25</b>, compared with $15,732.70 on the cash basis.</p>" }
    ]}
  },

  cards: {
    terms: [
      { term: "Accrual basis", back: "Revenues recognized when earned and expenses when incurred. Required by GAAP." },
      { term: "Cash basis", back: "Revenue recorded when cash is received and expenses when paid. Not GAAP." },
      { term: "Modified cash basis", back: "Cash basis except long-lived assets are recorded as assets and depreciated." },
      { term: "Why accrual is better", back: "It shows each period’s actual economic activity instead of the timing of cash flows." }
    ]
  },

  quiz: [
    { q: "Generally accepted accounting principles require:", options: ["The cash basis", "The accrual basis", "The modified cash basis", "Any basis the owner prefers"], answer: 1, why: "GAAP requires accrual accounting." },
    { q: "Under the cash basis, revenue is recorded when:", options: ["Earned", "Cash is received", "A contract is signed", "Goods are produced"], answer: 1, why: "Cash basis ignores when revenue is earned." },
    { q: "The modified cash basis differs from the cash basis because it:", options: ["Records all revenue when earned", "Records long-lived assets as assets and depreciates them", "Is required by GAAP", "Ignores expenses"], answer: 1, why: "Large outflows for long-lived assets are capitalized and depreciated." },
    { q: "Ortiz received $9,000 in April for work done equally in April, May, and June. Accrual-basis April revenue from it is:", options: ["$9,000", "$3,000", "$0", "$6,000"], answer: 1, why: "Only one-third is earned in April." },
    { q: "A collection in April for work performed in January is, for April accrual revenue:", options: ["Included in full", "Excluded; it was earned in January", "Split evenly", "Recorded as a gain"], answer: 1, why: "Revenue belongs to the period in which it was earned." },
    { q: "$2,800 of payroll was paid in April, $650 of it for March, and $350 is owed for April work. April payroll expense is:", options: ["$2,800", "$2,500", "$3,150", "$2,150"], answer: 1, why: "$2,800 − $650 + $350 = $2,500." },
    { q: "Why are accrual-basis statements generally more useful?", options: ["They’re easier to prepare", "They reflect each period’s economic activity rather than the timing of cash flows", "They always show higher income", "They ignore estimates"], answer: 1, why: "Cash timing can make a period look very different from its real performance." }
  ],

  init: function (root) {
    var money = function (n) { return (n < 0 ? "(" : "") + "$" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + (n < 0 ? ")" : ""); };
    var S = {
      cash: { rev: 22038.45, ex: [["Payroll", 2800], ["Rent", 1500], ["Server", 1416.22], ["Administrative", 589.53]] },
      accrual: { rev: 6250, ex: [["Payroll", 2500], ["Rent", 1500], ["Server", 916.22], ["Administrative", 1189.53]] }
    };
    function draw(k) {
      var s = S[k], tot = s.ex.reduce(function (a, x) { return a + x[1]; }, 0), ni = Math.round((s.rev - tot) * 100) / 100;
      var h = '<div class="statement two"><div class="st-head"><b>Ortiz Company</b><span>Income Statement (' + (k === "cash" ? "cash basis" : "accrual basis") + ')</span><span>For the Month Ended April 30</span></div>';
      h += '<div class="st-row"><span class="st-l">Revenue</span><span class="st-a"></span><span class="st-b">' + money(s.rev) + '</span></div><div class="st-row head"><span class="st-l">Expenses</span><span class="st-a"></span><span class="st-b"></span></div>';
      s.ex.forEach(function (x, i) { h += '<div class="st-row" style="--ind:1"><span class="st-l">' + x[0] + '</span><span class="st-a"><span class="' + (i === s.ex.length - 1 ? "u" : "") + '">' + money(x[1]) + '</span></span><span class="st-b"></span></div>'; });
      h += '<div class="st-row"><span class="st-l">Total expenses</span><span class="st-a"></span><span class="st-b"><span class="u">' + money(tot) + '</span></span></div><div class="st-row bold"><span class="st-l">Net income</span><span class="st-a"></span><span class="st-b"><span class="uu">' + money(ni) + '</span></span></div></div>';
      root.querySelector("#ortiz-stmt").innerHTML = h;
      root.querySelector("#ortiz-offer").innerHTML = '<span class="wk-k">Mega’s price: 100 × monthly income</span><div class="offer-n">' + money(ni * 100) + '</div><p>' + (k === "cash" ? "On the cash basis, April looks spectacular: net income equals the increase in cash." : "On the GAAP accrual basis, April earned just $144.25. The offer is worth $14,425.") + '</p>';
    }
    root.querySelectorAll("[data-basis2]").forEach(function (b) {
      b.addEventListener("click", function () { root.querySelectorAll("[data-basis2]").forEach(function (x) { x.classList.toggle("on", x === b); }); draw(b.getAttribute("data-basis2")); });
    });
    draw("cash");
  }
});

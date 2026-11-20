/* Lesson 9.3 · Held-to-Maturity Securities */
(function () {
  /* $5,000 face, 5% annual (paid semiannually: $125), 3 years from Jan. 1, 20X3 */
  var DATES = ["Jun. 30, 20X3", "Dec. 31, 20X3", "Jun. 30, 20X4", "Dec. 31, 20X4", "Jun. 30, 20X5", "Dec. 31, 20X5"];
  function table(price) {
    var cost = 5000 * price / 100, diff = cost - 5000, amort = diff / 6, bal = cost, rows = [];
    DATES.forEach(function (d) { bal -= amort; rows.push([d, 125, 125 - amort, -amort, bal]); });
    return { cost: cost, amort: amort, rows: rows };
  }
  function money(n) { var r = Math.round(n * 100) / 100; return (r < 0 ? "(" : "") + "$" + Math.abs(r).toLocaleString("en-US", { minimumFractionDigits: r % 1 ? 2 : 0, maximumFractionDigits: 2 }) + (r < 0 ? ")" : ""); }

  HUB.register("9-3", {
    summary: "Bonds held until maturity are carried at amortized cost. See how a premium or discount is spread over the bond’s life with the straight-line method, and why the cash always ties to the income.",
    objectives: [
      "Describe a bond’s face value, stated rate, and term",
      "Explain why bonds sell at par, a premium, or a discount",
      "Record a held-to-maturity investment and its interest",
      "Amortize a premium or discount using the straight-line method"
    ],
    html: `
<section class="sec" data-toc="What a bond is">
  <div class="eyebrow kind">Concept</div>
  <h2>Splitting a giant loan into small pieces</h2>
  <p>A person borrows from a bank. A corporate giant may need more than any single lender can provide, so it issues <b>bonds</b>, splitting one huge loan into many small units. $500,000,000 could be borrowed as 500,000 bonds of $1,000 each, and anyone who buys a bond is lending to the company.</p>
  <div class="grid3">
    <div class="tile"><span class="k">Face value</span><p>The principal repaid at maturity, e.g., $1,000.</p></div>
    <div class="tile"><span class="k">Stated (contract) rate</span><p>Annual interest as a percentage of face. 5% on $1,000 pays $50 a year.</p></div>
    <div class="tile"><span class="k">Term</span><p>How long until maturity, e.g., 10 years from the issue date.</p></div>
  </div>
</section>

<section class="sec" data-toc="Par, premium, discount">
  <div class="eyebrow kind">Concept</div>
  <h2>Why price differs from face</h2>
  <p>The price depends on the issuer’s creditworthiness, the time to maturity, and market conditions. If similar bonds pay 8%, nobody wants a 5% bond unless it’s sold at a <b>discount</b>. If similar bonds pay 3%, a 5% bond is attractive and may sell at a <b>premium</b>. Prices are quoted as a percentage of face: <b>103</b> means 103%, or $1,030 per $1,000 bond.</p>
  <p>The investor records an <b>Investment in Bonds</b> account at the purchase price plus brokerage fees and other acquisition costs. Premiums and discounts are <b>not</b> recorded in separate accounts.</p>
</section>

<section class="sec" data-toc="Amortization">
  <div class="eyebrow kind try">Try it</div>
  <h2>A $5,000, 5%, 3-year bond investment</h2>
  <p>Bought January 1, 20X3, held to maturity. Interest of $125 ($5,000 × 5% × ½) is received every June 30 and December 31. Pick the purchase price. Any premium or discount is spread evenly over the six interest periods: the <b>straight-line method</b>.</p>
  <div class="panel">
    <div class="seg" role="group" aria-label="Purchase price"><button type="button" data-voice-state data-px="97">97 (discount)</button><button type="button" data-voice-state data-px="100">100 (par)</button><button type="button" class="on" data-voice-state data-px="106">106 (premium)</button></div>
    <div style="display:grid;gap:14px;margin-top:14px"><div id="bond-j"></div><div id="bond-sum" style="max-width:520px"></div></div>
    <div class="scroll-x"><table class="plain" id="bond-t"></table></div>
    <p class="verdict" id="bond-say" aria-live="polite"></p>
  </div>
  <div class="grid2">
    <div class="tile"><span class="k">Premium (106)</span><p>The investor pays $5,300 but gets back only $5,000. That $300 “cost” reduces interest income: of each $125 received, $75 is income and $50 is a return of the investment. In exchange, the bond pays more interest than others available.</p></div>
    <div class="tile alt"><span class="k">Discount (97)</span><p>The investor pays $4,850 and gets back $5,000. The $150 benefit increases interest income by $25 each period, added to the investment. In exchange, the bond pays less interest than others.</p></div>
  </div>
  <p>The <b>effective-interest method</b> (Chapter 13) is conceptually better. Straight-line is acceptable when the results aren’t materially different.</p>
</section>

<section class="sec" data-toc="Follow the cash">
  <div class="eyebrow kind">Concept</div>
  <h2>Income is just the change in money</h2>
  <div class="panel scroll-x">
    <table class="plain">
      <thead><tr><th>Price</th><th class="num">Cash paid</th><th class="num">Cash received</th><th class="num">Difference = total interest income</th></tr></thead>
      <tbody>
        <tr><td>106 (premium)</td><td class="num">$5,300</td><td class="num">$5,750</td><td class="num">$450 ($75 × 6)</td></tr>
        <tr><td>100 (par)</td><td class="num">$5,000</td><td class="num">$5,750</td><td class="num">$750 ($125 × 6)</td></tr>
        <tr><td>97 (discount)</td><td class="num">$4,850</td><td class="num">$5,750</td><td class="num">$900 ($150 × 6)</td></tr>
      </tbody>
    </table>
  </div>
  <p>Cash received is always six $125 payments plus $5,000 at maturity. Think about the balance sheet too: on December 31, 20X4 in the premium case, cash rises $125 and the investment falls $50, a net $75 increase in assets matched by $75 of income in retained earnings.</p>
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
    <li><span>Held-to-maturity bonds are carried at <b>amortized cost</b>.</span></li>
    <li><span>Bonds sell at a <b>premium</b> when their rate beats the market, at a <b>discount</b> when it trails.</span></li>
    <li><span>The investment is recorded at cost; premiums and discounts aren’t separate accounts.</span></li>
    <li><span>Straight-line amortization: premium reduces interest income each period; discount increases it. The investment reaches face value at maturity.</span></li>
    <li><span>Total interest income = cash received − cash paid.</span></li>
  </ol>
</section>`,

    cards: {
      terms: [
        { term: "Face value", sub: "par", back: "The principal repaid at maturity." },
        { term: "Stated rate", back: "The contract interest rate applied to face value to compute interest payments." },
        { term: "Premium", back: "A price above face value, paid when the bond’s rate exceeds the market rate." },
        { term: "Discount", back: "A price below face value, accepted when the bond’s rate is below the market rate." },
        { term: "Amortized cost", back: "Cost adjusted over time for amortization of premium or discount, reaching face at maturity." },
        { term: "Straight-line amortization", back: "Spreading a premium or discount evenly over the interest periods." }
      ]
    },

    quiz: [
      { q: "A $1,000, 5%, 10-year bond pays annual interest of:", options: ["$5", "$50", "$100", "$500"], answer: 1, why: "$1,000 × 5%." },
      { q: "A bond quoted at 103 costs, per $1,000 of face:", options: ["$103", "$1,003", "$1,030", "$970"], answer: 2, why: "103% of $1,000." },
      { q: "A bond sells at a premium when its stated rate is:", options: ["Below the market rate", "Above the market rate", "Equal to the market rate", "Zero"], answer: 1, why: "Investors pay extra for the higher interest." },
      { q: "A $5,000 bond bought at 106 for 3 years with semiannual interest: premium amortization per period is:", options: ["$300", "$100", "$50", "$25"], answer: 2, why: "$300 ÷ 6 periods." },
      { q: "For that premium bond, each $125 interest receipt is recorded as:", options: ["$125 of interest income", "$75 of interest income and a $50 credit to the investment", "$175 of interest income", "$50 of interest income"], answer: 1, why: "Part of each receipt returns the premium." },
      { q: "A $5,000 bond bought at 97: each period’s interest income is:", options: ["$125", "$100", "$150", "$25"], answer: 2, why: "$125 cash + $25 discount amortization." },
      { q: "Total interest income on the discount bond over its life is:", options: ["$750", "$900", "$450", "$150"], answer: 1, why: "$5,750 received − $4,850 paid." },
      { q: "Held-to-maturity bonds are accounted for at:", options: ["Fair value through income", "Fair value through OCI", "Amortized cost", "Lower of cost or market"], answer: 2, why: "That’s the amortized cost approach." }
    ],

    init: function (root) {
      function draw(px) {
        var t = table(px), prem = px > 100, par = px === 100;
        var line = par ? [["Cash", 125, 0], ["Interest Income", 0, 125]]
          : prem ? [["Cash", 125, 0], ["Investment in Bonds", 0, -t.amort], ["Interest Income", 0, 125 - t.amort]]
          : [["Cash", 125, 0], ["Investment in Bonds", t.amort * -1, 0], ["Interest Income", 0, 125 - t.amort]];
        HUB.widgets.journal(root.querySelector("#bond-j"), { entries: [
          { date: "Jan. 1, 20X3", lines: [["Investment in Bonds", t.cost, 0], ["Cash", 0, t.cost]], memo: "Bought at " + px },
          { date: "Each Jun. 30 and Dec. 31", lines: line.map(function (l) { return [l[0], Math.abs(l[1]), Math.abs(l[2])]; }), memo: par ? "Interest received" : "Interest received; " + (prem ? "premium" : "discount") + " amortized" },
          { date: "Dec. 31, 20X5", lines: [["Cash", 5000, 0], ["Investment in Bonds", 0, 5000]], memo: "Principal repaid at maturity" } ] });
        root.querySelector("#bond-sum").innerHTML = '<div class="statement"><div class="st-row"><span class="st-l">Cash paid</span><span class="st-b">' + money(t.cost) + '</span></div><div class="st-row"><span class="st-l">Cash received (6 × $125 + $5,000)</span><span class="st-b">$5,750</span></div><div class="st-row bold"><span class="st-l">Total interest income</span><span class="st-b"><span class="uu">' + money(5750 - t.cost) + '</span></span></div></div>';
        root.querySelector("#bond-t").innerHTML = '<thead><tr><th>Date</th><th class="num">Cash received</th><th class="num">Interest income</th><th class="num">Change in investment</th><th class="num">Investment balance</th></tr></thead><tbody><tr><td>Jan. 1, 20X3</td><td></td><td></td><td></td><td class="num">' + money(t.cost) + '</td></tr>' +
          t.rows.map(function (r) { return '<tr><td>' + r[0] + '</td><td class="num">' + money(r[1]) + '</td><td class="num">' + money(r[2]) + '</td><td class="num">' + (r[3] ? money(r[3]) : "—") + '</td><td class="num">' + money(r[4]) + '</td></tr>'; }).join("") + '</tbody>';
        root.querySelector("#bond-say").innerHTML = par ? "Bought at par: each $125 receipt is all interest income, and the investment stays at $5,000."
          : prem ? "Bought at 106 for $5,300: each period records $75 of income and reduces the investment by $50, reaching $5,000 at maturity."
          : "Bought at 97 for $4,850: each period records $150 of income and increases the investment by $25, reaching $5,000 at maturity.";
      }
      root.querySelectorAll("[data-px]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-px]").forEach(function (x) { x.classList.toggle("on", x === b); }); draw(+b.getAttribute("data-px")); }); });
      draw(106);
    }
  });
})();

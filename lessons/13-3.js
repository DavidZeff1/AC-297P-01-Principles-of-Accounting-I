/* Lesson 13.3 · Accounting for Bonds Payable */
(function () {
  /* Schultz Company: 100 bonds, $1,000 face, 5-year, 8% paid semiannually ($4,000), issued Jan. 1, 20X3 */
  var DATES = [];
  for (var y = 3; y <= 7; y++) DATES.push("Jun. 30, 20X" + y, "Dec. 31, 20X" + y);
  function m2(n, cents) { var r = Math.round(n * 100) / 100; return (r < 0 ? "(" : "") + "$" + Math.abs(r).toLocaleString("en-US", { minimumFractionDigits: cents || r % 1 ? 2 : 0, maximumFractionDigits: 2 }) + (r < 0 ? ")" : ""); }
  function price(mkt) {
    var i = mkt / 200, fa = (1 - Math.pow(1 + i, -10)) / i, fl = Math.pow(1 + i, -10);
    return { i: i, fa: fa, fl: fl, pi: 4000 * fa, pf: 100000 * fl, p: Math.round(4000 * fa + 100000 * fl) };
  }
  var SC = { 6: "premium", 8: "par", 10: "discount" };

  HUB.register("13-3", {
    summary: "A bond is an annuity of interest plus a lump sum at maturity, so its price is a present value. Price Schultz Company’s bonds at par, a premium, and a discount, then record them with straight-line amortization.",
    objectives: [
      "Explain how the market rate determines a bond’s issue price",
      "Compute a bond’s price with present value factors",
      "Record bonds issued at par, a premium, and a discount",
      "Amortize a premium or discount by the straight-line method and present bonds on the balance sheet"
    ],
    html: `
<section class="sec" data-toc="Pricing a bond">
  <div class="eyebrow kind try">Try it</div>
  <h2>What will investors pay?</h2>
  <p>A bond promises a series of interest payments (an <b>annuity</b>) plus the face amount at maturity (a <b>lump sum</b>). Its price is the present value of both, discounted at the <b>market rate</b> investors demand. Schultz Company issues 100 five-year, 8% bonds of $1,000 each, paying interest every six months: $4,000 per period for 10 periods. Change the market rate.</p>
  <div class="panel">
    <div class="seg" role="group" aria-label="Market rate"><button type="button" data-voice-state data-sc="6">Market 6%</button><button type="button" class="on" data-voice-state data-sc="8">Market 8%</button><button type="button" data-voice-state data-sc="10">Market 10%</button></div>
    <div class="scroll-x" style="margin-top:14px"><table class="plain" id="px-t"></table></div>
    <p class="verdict" id="px-say" aria-live="polite"></p>
  </div>
  <div class="grid3">
    <div class="tile"><span class="k">Market = stated</span><p>Sells at <b>par</b>: $100,000.</p></div>
    <div class="tile"><span class="k">Market &lt; stated</span><p>The bond pays more than investors require, so they pay a <b>premium</b>: $108,530.</p></div>
    <div class="tile alt"><span class="k">Market &gt; stated</span><p>The bond pays less than the market, so it sells at a <b>discount</b>: $92,278.</p></div>
  </div>
  <p class="hint">Bond prices are quoted in 32nds. A quote of 103.08 means 103 and 8/32, or 103.25% of face: $1,032.50 per $1,000 bond, not $1,030.80.</p>
</section>

<section class="sec" data-toc="Recording the issue">
  <div class="eyebrow kind try">Try it</div>
  <h2>Issue, interest, and maturity</h2>
  <p>Count the money. Whatever the price, Schultz pays back $140,000: ten $4,000 interest payments plus $100,000 at maturity. Total interest expense is the difference between what it repays and what it borrowed. The <b>straight-line method</b> spreads that evenly over the 10 periods.</p>
  <div class="panel">
    <div class="seg" role="group" aria-label="Issue price"><button type="button" data-voice-state data-sc2="6">Premium (6%)</button><button type="button" data-voice-state data-sc2="8">Par (8%)</button><button type="button" class="on" data-voice-state data-sc2="10">Discount (10%)</button></div>
    <div class="grid2" style="margin-top:14px"><div id="iss-sum"></div><div id="iss-bs"></div></div>
    <div id="iss-j"></div>
    <p class="verdict" id="iss-say" aria-live="polite"></p>
  </div>
  <p>Unlike an investor’s Investment in Bonds account (Chapter 9), the issuer keeps premiums and discounts in <b>separate accounts</b>. <b>Premium on Bonds Payable</b> is an <b>adjunct</b> account added to Bonds Payable; <b>Discount on Bonds Payable</b> is a <b>contra</b> account subtracted from it.</p>
</section>

<section class="sec" data-toc="Carrying value">
  <div class="eyebrow kind">Visual</div>
  <h2>Every path ends at face value</h2>
  <p>The carrying value (bonds plus premium, or minus discount) moves in a straight line toward $100,000 as amortization is recorded each period.</p>
  <div class="dep-chart" id="cv-chart" style="max-width:640px"></div>
  <div class="scroll-x"><table class="plain" id="sl-t"></table></div>
</section>

<section class="sec" data-toc="The shortcoming">
  <div class="eyebrow kind">Concept</div>
  <h2>Why straight-line isn’t quite right</h2>
  <p>With a premium, interest expense is $6,294 every year ($3,147 × 2), yet the liability shrinks each year. In the first year that’s about <b>5.8%</b> of the $108,530 owed; by the last year it’s about <b>6.2%</b> of a smaller balance. Neither matches the 6% effective rate that priced the bonds. The <b>effective-interest method</b> (next lesson) fixes this and is actually <b>required</b>, unless straight-line results aren’t materially different.</p>
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
    <li><span>Bond price = PV of the interest annuity + PV of the face amount, at the market rate per period.</span></li>
    <li><span>Market rate below the stated rate: premium. Above: discount. Equal: par.</span></li>
    <li><span>Total interest expense = total cash repaid − cash borrowed.</span></li>
    <li><span>Straight-line: amortize the premium or discount equally each period. Premium lowers expense; discount raises it.</span></li>
    <li><span>Premium is an adjunct account; discount is a contra account. Both reach zero at maturity.</span></li>
  </ol>
</section>`,

    cards: {
      terms: [
        { term: "Market (effective) rate", back: "The interest rate investors demand for similar bonds; used to discount a bond’s cash flows." },
        { term: "Stated (contract) rate", back: "The rate printed on the bond that sets the cash interest payment." },
        { term: "Bond premium", back: "Excess of issue price over face; arises when the stated rate exceeds the market rate." },
        { term: "Bond discount", back: "Shortfall of issue price below face; arises when the stated rate is below the market rate." },
        { term: "Adjunct account", back: "An account added to another; Premium on Bonds Payable is added to Bonds Payable." },
        { term: "Contra account", back: "An account subtracted from another; Discount on Bonds Payable reduces Bonds Payable." },
        { term: "Straight-line amortization", back: "Spreading a premium or discount evenly over the bond’s interest periods." },
        { term: "Carrying value", back: "Bonds Payable plus unamortized premium, or minus unamortized discount." }
      ]
    },

    quiz: [
      { q: "An 8% bond is issued when the market rate is 6%. It sells at:", options: ["Par", "A premium", "A discount", "Face value minus interest"], answer: 1, why: "It pays more than the market requires." },
      { q: "For a 5-year bond paying interest semiannually at an 8% market rate, the present value factors use:", options: ["5 periods at 8%", "10 periods at 4%", "10 periods at 8%", "5 periods at 4%"], answer: 1, why: "Ten six-month periods at half the annual rate." },
      { q: "A bond quoted at 103.08 costs, per $1,000 of face:", options: ["$1,030.80", "$1,032.50", "$1,038.00", "$1,308.00"], answer: 1, why: "103 and 8/32 = 103.25%." },
      { q: "Schultz issues $100,000 of bonds for $108,530 and repays $140,000 in total. Total interest expense over the bond’s life is:", options: ["$40,000", "$31,470", "$48,530", "$8,530"], answer: 1, why: "$140,000 − $108,530." },
      { q: "Straight-line interest expense each period on that premium bond is:", options: ["$4,000", "$4,853", "$3,147", "$853"], answer: 2, why: "$4,000 cash − $853 premium amortization." },
      { q: "Issued for $92,278, the discount bond’s straight-line interest expense per period is:", options: ["$4,000", "$3,227.80", "$4,772.20", "$772.20"], answer: 2, why: "$4,000 + $772.20 discount amortization." },
      { q: "Discount on Bonds Payable is reported as:", options: ["An asset", "An expense", "A contra account subtracted from Bonds Payable", "An adjunct account added to Bonds Payable"], answer: 2, why: "Premium is the adjunct." },
      { q: "At maturity, the balance in Premium on Bonds Payable is:", options: ["The original premium", "Half the original premium", "Zero", "Equal to face value"], answer: 2, why: "It’s fully amortized." }
    ],

    init: function (root) {
      function drawPrice(mkt) {
        var p = price(mkt), kind = SC[mkt], r = mkt / 2;
        root.querySelector("#px-t").innerHTML = '<thead><tr><th>Cash flow</th><th class="num">Amount</th><th>Factor (10 periods at ' + r + '%)</th><th class="num">Present value</th></tr></thead><tbody>' +
          '<tr><td>Interest annuity</td><td class="num">$4,000 each period</td><td>' + p.fa.toFixed(5) + '</td><td class="num">' + m2(p.pi, 1) + '</td></tr>' +
          '<tr><td>Face at maturity</td><td class="num">$100,000</td><td>' + p.fl.toFixed(5) + '</td><td class="num">' + m2(p.pf, 1) + '</td></tr>' +
          '<tr class="tot"><td><b>Price of the bonds</b></td><td></td><td></td><td class="num"><b>' + m2(p.p) + '</b></td></tr></tbody>';
        root.querySelector("#px-say").innerHTML = kind === "par" ? "At an 8% market rate, the bonds sell at <b>par</b>: $100,000, or $1,000 per bond."
          : kind === "premium" ? "At a 6% market rate, investors pay <b>$108,530</b>, an $8,530 <b>premium</b> ($1,085.30 per bond), because 8% beats what the market offers."
          : "At a 10% market rate, investors pay only <b>$92,278</b>, a $7,722 <b>discount</b> ($922.78 per bond), because 8% falls short of the market.";
      }
      function drawIssue(mkt) {
        var p = price(mkt).p, kind = SC[mkt], diff = p - 100000, am = diff / 10, exp = 4000 - am, tot = 140000 - p;
        var ent = [{ date: "Jan. 1, 20X3", lines: kind === "par" ? [["Cash", 100000, 0], ["Bonds Payable", 0, 100000]]
          : kind === "premium" ? [["Cash", p, 0], ["Premium on Bonds Payable", 0, diff], ["Bonds Payable", 0, 100000]]
          : [["Cash", p, 0], ["Discount on Bonds Payable", -diff, 0], ["Bonds Payable", 0, 100000]], memo: "Issued 100 bonds at " + (kind === "par" ? "par" : "a " + kind) }];
        ent.push({ date: "Every Jun. 30 and Dec. 31", lines: kind === "par" ? [["Interest Expense", 4000, 0], ["Cash", 0, 4000]]
          : kind === "premium" ? [["Interest Expense", exp, 0], ["Premium on Bonds Payable", am, 0], ["Cash", 0, 4000]]
          : [["Interest Expense", exp, 0], ["Discount on Bonds Payable", 0, -am], ["Cash", 0, 4000]], memo: kind === "par" ? "Semiannual interest" : "Semiannual interest; " + kind + " amortized" });
        ent.push({ date: "Dec. 31, 20X7", lines: [["Bonds Payable", 100000, 0], ["Cash", 0, 100000]], memo: "Repay face at maturity" });
        HUB.widgets.journal(root.querySelector("#iss-j"), { entries: ent });
        root.querySelector("#iss-sum").innerHTML = '<div class="statement"><div class="st-head"><b>Count the money</b></div>' +
          '<div class="st-row"><span class="st-l">Interest payments (10 × $4,000)</span><span class="st-b">$40,000</span></div>' +
          '<div class="st-row"><span class="st-l">Face at maturity</span><span class="st-b"><span class="u">$100,000</span></span></div>' +
          '<div class="st-row"><span class="st-l">Total repaid</span><span class="st-b">$140,000</span></div>' +
          '<div class="st-row"><span class="st-l">Less: cash borrowed</span><span class="st-b"><span class="u">' + m2(-p) + '</span></span></div>' +
          '<div class="st-row bold"><span class="st-l">Total interest expense</span><span class="st-b"><span class="uu">' + m2(tot) + '</span></span></div>' +
          '<div class="st-row"><span class="st-l">Per period (÷ 10)</span><span class="st-b">' + m2(tot / 10, kind === "discount") + '</span></div></div>';
        var unam = diff - am * 2; /* after Jun. 30 and Dec. 31, 20X3 */
        root.querySelector("#iss-bs").innerHTML = '<div class="statement two"><div class="st-head"><b>Schultz Company</b><span>Balance Sheet (excerpt)</span><span>December 31, 20X3</span></div>' +
          '<div class="st-row head"><span class="st-l">Long-term liabilities</span><span class="st-a"></span><span class="st-b"></span></div>' +
          '<div class="st-row" style="--ind:1"><span class="st-l">Bonds payable</span><span class="st-a">$100,000</span><span class="st-b"></span></div>' +
          (kind === "par" ? '<div class="st-row bold" style="--ind:1"><span class="st-l">Carrying value</span><span class="st-a"></span><span class="st-b">$100,000</span></div>'
            : '<div class="st-row" style="--ind:1"><span class="st-l">' + (kind === "premium" ? "Plus: premium on bonds payable" : "Less: discount on bonds payable") + '</span><span class="st-a"><span class="u">' + m2(Math.abs(unam), kind === "discount") + '</span></span><span class="st-b"></span></div>' +
              '<div class="st-row bold" style="--ind:1"><span class="st-l">Carrying value</span><span class="st-a"></span><span class="st-b">' + m2(100000 + unam, kind === "discount") + '</span></div>') + '</div>';
        root.querySelector("#iss-say").innerHTML = kind === "par" ? "Issued at par: interest expense equals the $4,000 cash paid every period, $8,000 a year."
          : kind === "premium" ? "Issued at a premium: each period, $853 of premium is amortized, so interest expense is <b>$3,147</b>, less than the $4,000 paid. Yearly expense is $6,294."
          : "Issued at a discount: each period, $772.20 of discount is amortized, so interest expense is <b>$4,772.20</b>, more than the $4,000 paid. Yearly expense is $9,544.40.";
        drawChart(mkt);
        drawTable(mkt);
      }
      function drawChart(sel) {
        var W = 560, H = 240, L = 70, R = 14, T = 14, B = 34, lo = 90000, hi = 110000;
        function X(k) { return L + k * (W - L - R) / 10; } function Y(v) { return T + (hi - v) * (H - T - B) / (hi - lo); }
        var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Carrying value of the bonds over ten periods, converging to $100,000">';
        [90000, 95000, 100000, 105000, 110000].forEach(function (v) { s += '<line class="dc-grid" x1="' + L + '" x2="' + (W - R) + '" y1="' + Y(v) + '" y2="' + Y(v) + '"/><text class="dc-ax" x="' + (L - 8) + '" y="' + (Y(v) + 4) + '" text-anchor="end">' + (v / 1000) + 'k</text>'; });
        for (var k = 0; k <= 10; k += 2) s += '<text class="dc-ax" x="' + X(k) + '" y="' + (H - 12) + '" text-anchor="middle">' + k + '</text>';
        [6, 8, 10].forEach(function (m) {
          var p = price(m).p; s += '<line class="bc-line bc-' + SC[m] + (m === sel ? "" : " bc-dim") + '" x1="' + X(0) + '" y1="' + Y(p) + '" x2="' + X(10) + '" y2="' + Y(100000) + '"/>';
          s += '<circle class="bc-dot bc-' + SC[m] + (m === sel ? "" : " bc-dim") + '" cx="' + X(0) + '" cy="' + Y(p) + '" r="5"/>';
        });
        s += '</svg><div class="dc-key"><span class="bk-premium">Premium</span><span class="bk-par">Par</span><span class="bk-discount">Discount</span><span style="margin-left:auto">Periods →</span></div>';
        root.querySelector("#cv-chart").innerHTML = s;
      }
      function drawTable(mkt) {
        var p = price(mkt).p, kind = SC[mkt], am = (p - 100000) / 10, bal = p, cents = kind === "discount";
        var lab = kind === "premium" ? "Premium amortized" : kind === "discount" ? "Discount amortized" : "Amortization";
        var h = '<thead><tr><th>Date</th><th class="num">Cash paid</th><th class="num">Interest expense</th><th class="num">' + lab + '</th><th class="num">Carrying value</th></tr></thead><tbody><tr><td>Jan. 1, 20X3</td><td></td><td></td><td></td><td class="num">' + m2(p, cents) + '</td></tr>';
        DATES.forEach(function (d) { bal -= am; h += '<tr><td>' + d + '</td><td class="num">$4,000</td><td class="num">' + m2(4000 - am, cents) + '</td><td class="num">' + (am ? m2(Math.abs(am), cents) : "—") + '</td><td class="num">' + m2(bal, cents) + '</td></tr>'; });
        root.querySelector("#sl-t").innerHTML = h + '</tbody>';
      }
      root.querySelectorAll("[data-sc]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-sc]").forEach(function (x) { x.classList.toggle("on", x === b); }); drawPrice(+b.getAttribute("data-sc")); }); });
      root.querySelectorAll("[data-sc2]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-sc2]").forEach(function (x) { x.classList.toggle("on", x === b); }); drawIssue(+b.getAttribute("data-sc2")); }); });
      drawPrice(8); drawIssue(10);
    }
  });
})();

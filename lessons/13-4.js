/* Lesson 13.4 · Effective-Interest Amortization Methods */
(function () {
  var DATES = [];
  for (var y = 3; y <= 7; y++) DATES.push("Jun. 30, 20X" + y, "Dec. 31, 20X" + y);
  function m2(n) { var r = Math.round(n * 100) / 100; return "$" + Math.abs(r).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function r2(n) { return Math.round(n * 100) / 100; }
  /* Schultz: $108,530 at 6% (3% per period) or $92,278 at 10% (5% per period) */
  function sched(kind) {
    var cv = kind === "prem" ? 108530 : 92278, i = kind === "prem" ? 0.03 : 0.05, sl = 4000 - (cv - 100000) / 10, rows = [];
    for (var k = 0; k < 10; k++) {
      var exp = r2(cv * i), am = r2(Math.abs(4000 - exp));
      if (k === 9) { am = r2(Math.abs(cv - 100000)); exp = kind === "prem" ? 4000 - am : 4000 + am; }
      cv = kind === "prem" ? r2(cv - am) : r2(cv + am);
      rows.push({ d: DATES[k], exp: exp, am: am, cv: cv, sl: sl });
    }
    return { start: kind === "prem" ? 108530 : 92278, rate: i * 200, rows: rows };
  }

  HUB.register("13-4", {
    summary: "The effective-interest method charges interest at the market rate on the bond’s current carrying value, so expense changes each period and always reflects the rate that priced the bonds.",
    objectives: [
      "Compute interest expense as carrying value × effective rate per period",
      "Compute amortization as the difference between interest expense and cash paid",
      "Build an effective-interest amortization table for a premium and a discount",
      "Record the periodic entry and present the bonds on the balance sheet"
    ],
    html: `
<section class="sec" data-toc="The method">
  <div class="eyebrow kind">Concept</div>
  <h2>A constant rate, not a constant amount</h2>
  <p>Straight-line charges the same dollars each period. The <b>effective-interest method</b> charges the same <b>percentage</b>: the market rate that priced the bonds, applied to their carrying value at the start of each period. Because it matches how the bonds were priced, it’s theoretically preferable, and it’s the required method unless straight-line results aren’t materially different.</p>
  <div class="grid3">
    <div class="tile"><span class="k">1 · Interest expense</span><p>Carrying value × effective rate × time.</p></div>
    <div class="tile"><span class="k">2 · Amortization</span><p>The difference between interest expense and the cash paid.</p></div>
    <div class="tile alt"><span class="k">3 · New carrying value</span><p>Premium: carrying value goes <b>down</b> by the amortization. Discount: it goes <b>up</b>.</p></div>
  </div>
</section>

<section class="sec" data-toc="Amortization table">
  <div class="eyebrow kind try">Try it</div>
  <h2>Schultz’s bonds, period by period</h2>
  <p>Recall Schultz issued $100,000 of 5-year, 8% bonds paying $4,000 every six months, on January 1, 20X3. Choose the premium or discount scenario and step through the periods.</p>
  <div class="panel">
    <div class="seg" role="group" aria-label="Scenario"><button type="button" class="on" data-voice-state data-ei="prem">Premium: $108,530 to yield 6%</button><button type="button" data-voice-state data-ei="disc">Discount: $92,278 to yield 10%</button></div>
    <div class="big-eq" id="ei-eq" style="font-size:19px;margin-top:14px"></div>
    <div class="seg" role="group" aria-label="Period" id="ei-per" style="margin-top:10px"></div>
    <p class="verdict" id="ei-say" aria-live="polite"></p>
    <div class="scroll-x"><table class="plain" id="ei-t"></table></div>
  </div>
</section>

<section class="sec" data-toc="Compared with straight-line">
  <div class="eyebrow kind">Visual</div>
  <h2>Expense drifts with the balance</h2>
  <p>Bars show effective-interest expense each period; the dashed line is the flat straight-line amount. Total interest over the 10 periods is identical either way. Only the timing differs.</p>
  <div class="dep-chart" id="ei-chart" style="max-width:640px"></div>
</section>

<section class="sec" data-toc="Entries and balance sheet">
  <div class="eyebrow kind">Example</div>
  <h2>The first interest entry</h2>
  <p>The issue and maturity entries are the same as under straight-line. Each interest entry comes straight from the table; here is June 30, 20X3.</p>
  <div class="grid2">
    <div><h4>Premium</h4><div data-widget="journal" data-key="jp"></div><div data-widget="statement" data-key="bp"></div></div>
    <div><h4>Discount</h4><div data-widget="journal" data-key="jd"></div><div data-widget="statement" data-key="bd"></div></div>
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
    <li><span>Interest expense = carrying value × market rate per period.</span></li>
    <li><span>Amortization = the gap between interest expense and cash interest paid.</span></li>
    <li><span>Premium: expense falls each period as carrying value falls. Discount: expense rises as carrying value rises.</span></li>
    <li><span>Total interest is the same as straight-line; effective-interest is required unless the difference isn’t material.</span></li>
  </ol>
</section>`,

    data: {
      jp: { entries: [{ date: "Jun. 30, 20X3", lines: [["Interest Expense", 3255.90, 0], ["Premium on Bonds Payable", 744.10, 0], ["Cash", 0, 4000]], memo: "$108,530 × 6% × 6/12" }] },
      jd: { entries: [{ date: "Jun. 30, 20X3", lines: [["Interest Expense", 4613.90, 0], ["Discount on Bonds Payable", 0, 613.90], ["Cash", 0, 4000]], memo: "$92,278 × 10% × 6/12" }] },
      bp: { entity: "Schultz Company", title: "Balance Sheet (excerpt)", date: "June 30, 20X3", rows: [
        { l: "Long-term liabilities", head: true },
        { l: "Bonds payable", a: 100000, ind: 1 },
        { l: "Plus: premium on bonds payable", a: 7785.90, ind: 1, ua: true },
        { l: "Carrying value", b: 107785.90, ind: 1, bold: true }
      ]},
      bd: { entity: "Schultz Company", title: "Balance Sheet (excerpt)", date: "June 30, 20X3", rows: [
        { l: "Long-term liabilities", head: true },
        { l: "Bonds payable", a: 100000, ind: 1 },
        { l: "Less: discount on bonds payable", a: 7108.10, ind: 1, ua: true },
        { l: "Carrying value", b: 92891.90, ind: 1, bold: true }
      ]}
    },

    cards: {
      terms: [
        { term: "Effective-interest method", back: "Interest expense = carrying value × market rate; amortization is the difference from cash paid." },
        { term: "Carrying value", back: "Face value plus unamortized premium, or minus unamortized discount." },
        { term: "Effective rate", back: "The market rate at issuance that priced the bonds." },
        { term: "Amortization (effective-interest)", back: "Cash interest paid minus interest expense (premium), or interest expense minus cash paid (discount)." },
        { term: "Why it’s preferred", back: "Expense is a constant percentage of the liability, consistent with how the bond was priced." }
      ]
    },

    quiz: [
      { q: "Under the effective-interest method, interest expense equals:", options: ["Face × stated rate", "Carrying value × market rate", "Premium ÷ periods", "Cash paid"], answer: 1, why: "The market rate on the current carrying value." },
      { q: "Schultz’s premium bonds: carrying value $108,530, market rate 6%. First six-month interest expense is:", options: ["$4,000.00", "$3,255.90", "$3,147.00", "$6,511.80"], answer: 1, why: "$108,530 × 6% × 6/12." },
      { q: "With $4,000 of cash interest, the first period’s premium amortization is:", options: ["$853.00", "$744.10", "$3,255.90", "$613.90"], answer: 1, why: "$4,000 − $3,255.90." },
      { q: "For a bond issued at a premium, interest expense under the effective-interest method each period:", options: ["Increases", "Decreases", "Stays the same", "Equals cash paid"], answer: 1, why: "The carrying value falls, so expense falls." },
      { q: "Schultz’s discount bonds: carrying value $92,278 at 10%. First-period interest expense is:", options: ["$4,613.90", "$4,000.00", "$4,772.20", "$9,227.80"], answer: 0, why: "$92,278 × 10% × 6/12." },
      { q: "After that first discount period, the carrying value is:", options: ["$92,278.00", "$91,664.10", "$92,891.90", "$100,000.00"], answer: 2, why: "$92,278 + $613.90 amortization." },
      { q: "Compared with straight-line, total interest expense over the bond’s life under effective-interest is:", options: ["Higher", "Lower", "The same", "Unrelated"], answer: 2, why: "Only the timing differs." },
      { q: "Straight-line may be used instead when:", options: ["Never", "Results aren’t materially different", "The bond is callable", "The bond sells at par"], answer: 1, why: "Effective-interest is otherwise required." }
    ],

    init: function (root) {
      var kind = "prem", per = 0;
      function draw() {
        var s = sched(kind), r = s.rows[per], prev = per ? s.rows[per - 1].cv : s.start, cash = 4000, half = s.rate / 2;
        root.querySelector("#ei-eq").innerHTML = m2(prev) + ' × ' + half + '% = <span class="e">' + m2(r.exp) + '</span> interest expense';
        root.querySelector("#ei-say").innerHTML = r.d + ": interest expense is " + m2(r.exp) + ". Cash paid is $4,000, so " + (kind === "prem" ? "premium" : "discount") + " amortization is <b>" + m2(r.am) + "</b> and the carrying value " + (kind === "prem" ? "falls" : "rises") + " to <b>" + m2(r.cv) + "</b>." + (per === 9 ? " The final period rounds to land exactly on $100,000." : "");
        var h = '<thead><tr><th>Date</th><th class="num">Cash paid</th><th class="num">Interest expense</th><th class="num">' + (kind === "prem" ? "Premium" : "Discount") + ' amortized</th><th class="num">Carrying value</th><th class="num">Straight-line expense</th></tr></thead><tbody><tr><td>Jan. 1, 20X3</td><td></td><td></td><td></td><td class="num">' + m2(s.start) + '</td><td></td></tr>';
        s.rows.forEach(function (x, k) { h += '<tr' + (k === per ? ' class="hl"' : '') + '><td>' + x.d + '</td><td class="num">' + m2(cash) + '</td><td class="num">' + m2(x.exp) + '</td><td class="num">' + m2(x.am) + '</td><td class="num">' + m2(x.cv) + '</td><td class="num">' + m2(x.sl) + '</td></tr>'; });
        var te = s.rows.reduce(function (a, x) { return a + x.exp; }, 0);
        h += '<tr class="tot"><td><b>Total</b></td><td class="num">$40,000.00</td><td class="num"><b>' + m2(te) + '</b></td><td></td><td></td><td class="num">' + m2(s.rows[0].sl * 10) + '</td></tr></tbody>';
        root.querySelector("#ei-t").innerHTML = h;
        chart(s);
      }
      function chart(s) {
        var W = 560, H = 230, L = 64, R = 12, T = 12, B = 32, lo = kind === "prem" ? 3000 : 4000, hi = kind === "prem" ? 3300 : 5000;
        function Y(v) { return T + (hi - v) * (H - T - B) / (hi - lo); }
        var bw = (W - L - R) / 10, svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Interest expense per period, effective-interest versus straight-line">';
        for (var g = 0; g <= 4; g++) { var v = lo + (hi - lo) * g / 4; svg += '<line class="dc-grid" x1="' + L + '" x2="' + (W - R) + '" y1="' + Y(v) + '" y2="' + Y(v) + '"/><text class="dc-ax" x="' + (L - 6) + '" y="' + (Y(v) + 4) + '" text-anchor="end">' + v.toLocaleString() + '</text>'; }
        s.rows.forEach(function (x, k) { var x0 = L + k * bw + 5; svg += '<rect class="ei-bar' + (kind === "prem" ? " prem" : "") + '" x="' + x0 + '" y="' + Y(x.exp) + '" width="' + (bw - 10) + '" height="' + (Y(lo) - Y(x.exp)) + '" rx="3"' + (k === per ? '' : ' opacity=".55"') + '/><text class="dc-ax" x="' + (x0 + (bw - 10) / 2) + '" y="' + (H - 12) + '" text-anchor="middle">' + (k + 1) + '</text>'; });
        svg += '<line class="ei-sl" x1="' + L + '" x2="' + (W - R) + '" y1="' + Y(s.rows[0].sl) + '" y2="' + Y(s.rows[0].sl) + '"/></svg>';
        root.querySelector("#ei-chart").innerHTML = svg + '<div class="dc-key"><span class="' + (kind === "prem" ? "bk-premium" : "bk-discount") + '">Effective-interest expense</span><span class="bk-sl">Straight-line (' + m2(s.rows[0].sl) + ')</span></div>';
      }
      var pc = root.querySelector("#ei-per");
      pc.innerHTML = DATES.map(function (d, k) { return '<button type="button" data-voice-state data-ep="' + k + '"' + (k ? '' : ' class="on"') + '>' + (k + 1) + '</button>'; }).join("");
      pc.querySelectorAll("[data-ep]").forEach(function (b) { b.setAttribute("aria-label", "Period " + (+b.getAttribute("data-ep") + 1)); b.addEventListener("click", function () { pc.querySelectorAll("[data-ep]").forEach(function (x) { x.classList.toggle("on", x === b); }); per = +b.getAttribute("data-ep"); draw(); }); });
      root.querySelectorAll("[data-ei]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-ei]").forEach(function (x) { x.classList.toggle("on", x === b); }); kind = b.getAttribute("data-ei"); draw(); }); });
      draw();
    }
  });
})();

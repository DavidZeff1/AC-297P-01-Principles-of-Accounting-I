/* Lesson 13.5 · Bonds Issued Between Interest Dates, Retirements, and Fair Value */
(function () {
  function money(n) { var r = Math.round(n); return (r < 0 ? "(" : "") + "$" + Math.abs(r).toLocaleString() + (r < 0 ? ")" : ""); }

  HUB.register("13-5", {
    summary: "Buyers pay for interest that has already accrued when bonds are sold between interest dates; year-end entries accrue what’s owed; early retirements produce gains or losses; and companies may choose to carry bonds at fair value.",
    objectives: [
      "Record bonds issued between interest dates",
      "Accrue bond interest at year end",
      "Record an early bond retirement and its gain or loss",
      "Explain the fair value option for bonds payable"
    ],
    html: `
<section class="sec" data-toc="Between interest dates">
  <div class="eyebrow kind">Example</div>
  <h2>Selling bonds after their date</h2>
  <p>Thompson Corporation’s $100,000 of 12% bonds are dated <b>April 1, 20X1</b>, but delays push the sale to <b>June 1</b>. The terms still call for a full six months of interest, $6,000, on September 30. So buyers pay the price <b>plus</b> two months of accrued interest ($100,000 × 12% × 2/12 = $2,000), which Thompson hands back inside the September payment.</p>
  <div class="yearbar" aria-hidden="true" id="th-bar"></div>
  <div data-widget="journal" data-key="th"></div>
  <p>Net, Thompson bears $4,000 of interest for the four months it actually had the money (June–September). If the bonds had been issued at a premium or discount, the period-end entries would also amortize it.</p>
</section>

<section class="sec" data-toc="Early retirement">
  <div class="eyebrow kind try">Try it</div>
  <h2>Paying bonds off early</h2>
  <p>Companies retire debt early when they have spare cash or can <b>refinance</b> at a lower rate. Remove the old debt’s carrying value; the difference from the cash paid is a gain or loss.</p>
  <p>Cabano Corporation retires $200,000 of 6% bonds on June 30, 20X5, at the call price set in the indenture. The last interest date was April 30, when the unamortized discount was $6,000 with 5 years (60 months) left.</p>
  <div data-widget="steps" data-key="cab"></div>
  <div class="panel"><div data-widget="calc" data-key="ret"></div></div>
</section>

<section class="sec" data-toc="Fair value option">
  <div class="eyebrow kind try">Try it</div>
  <h2>When market rates move</h2>
  <p>A bond’s value depends on its stated rate compared with the going market rate. When market rates <b>rise</b>, the present value of a bond’s fixed payments <b>falls</b>, and vice versa. Companies may, but needn’t, carry their bonds payable at fair value, reporting unrealized gains and losses in earnings each period.</p>
  <div class="panel"><div data-widget="calc" data-key="fv"></div></div>
  <div class="grid3">
    <div class="tile"><span class="k">Level 1</span><p>The debt trades in a public market: use its observable price.</p></div>
    <div class="tile"><span class="k">Level 2</span><p>No clear market: price it from similar securities.</p></div>
    <div class="tile alt"><span class="k">Level 3</span><p>Rarely, nothing observable: management’s own pricing model.</p></div>
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
    <li><span>Bonds sold between interest dates: collect accrued interest from buyers, return it with the first payment.</span></li>
    <li><span>Accrue interest (and amortize any premium or discount) from the last payment date to year end.</span></li>
    <li><span>Early retirement: update interest and amortization first, then remove the carrying value; the difference from cash paid is a gain or loss.</span></li>
    <li><span>Rising market rates lower a bond’s fair value; under the fair value option, the change goes to earnings.</span></li>
  </ol>
</section>`,

    data: {
      th: { step: true, entries: [
        { date: "Jun. 1, 20X1", lines: [["Cash", 102000, 0], ["Bonds Payable", 0, 100000], ["Interest Payable", 0, 2000]], memo: "Sold at par plus 2 months’ accrued interest" },
        { date: "Sep. 30, 20X1", lines: [["Interest Payable", 2000, 0], ["Interest Expense", 4000, 0], ["Cash", 0, 6000]], memo: "Full six months paid: $2,000 returned, $4,000 is Thompson’s cost" },
        { date: "Dec. 31, 20X1", lines: [["Interest Expense", 3000, 0], ["Interest Payable", 0, 3000]], memo: "Accrue October through December: $100,000 × 12% × 3/12" },
        { date: "Mar. 31, 20X2", lines: [["Interest Payable", 3000, 0], ["Interest Expense", 3000, 0], ["Cash", 0, 6000]], memo: "Payment covers the accrual plus January through March" }
      ]},
      cab: { items: [
        { t: "Bring interest up to date", b: "<p>Two months since April 30: accrued interest is $200,000 × 6% × 2/12 = <b>$2,000</b>. The discount amortizes at $6,000 ÷ 60 months = $100 a month, so <b>$200</b>.</p><div data-widget=\"journal\" data-key=\"cab1\"></div>" },
        { t: "Find the carrying value", b: "<p>Unamortized discount is now $6,000 − $200 = $5,800, so the carrying value is $200,000 − $5,800 = <b>$194,200</b>.</p>" },
        { t: "Retire the bonds", b: "<p>Cabano pays the $210,000 call price plus $2,000 of accrued interest. Paying $210,000 for debt carried at $194,200 is a <b>$15,800 loss</b>.</p><div data-widget=\"journal\" data-key=\"cab2\"></div>" }
      ]},
      cab1: { entries: [{ date: "Jun. 30, 20X5", lines: [["Interest Expense", 2200, 0], ["Discount on Bonds Payable", 0, 200], ["Interest Payable", 0, 2000]], memo: "Interest and amortization for May and June" }] },
      cab2: { entries: [{ date: "Jun. 30, 20X5", lines: [["Bonds Payable", 200000, 0], ["Interest Payable", 2000, 0], ["Loss on Bond Retirement", 15800, 0], ["Discount on Bonds Payable", 0, 5800], ["Cash", 0, 212000]], memo: "Retired at the call price" }] },
      ret: {
        inputs: [{ id: "p", label: "Price paid to retire (excluding interest)", min: 186000, max: 210000, step: 4000, value: 210000, fmt: "$" }],
        run: function (v) {
          var gl = 194200 - v.p;
          return { html: '<div class="big-eq" style="font-size:20px">$194,200 carrying value − ' + money(v.p) + ' paid = <span class="e">' + (gl === 0 ? "no gain or loss" : money(Math.abs(gl)) + (gl > 0 ? " gain" : " loss")) + '</span></div>',
            say: gl === 0 ? "Paying exactly the carrying value produces no gain or loss." : gl > 0 ? "Paying " + money(v.p) + ", less than the $194,200 carrying value, produces a <b>" + money(gl) + " gain</b>." : "Paying " + money(v.p) + ", more than the $194,200 carrying value, produces a <b>" + money(-gl) + " loss</b>." };
        }
      },
      fv: {
        inputs: [{ id: "m", label: "Current market rate", min: 4, max: 12, step: 2, value: 8, fmt: "%" }],
        run: function (v) {
          var i = v.m / 200, n = 10, val = 4000 * (1 - Math.pow(1 + i, -n)) / i + 100000 * Math.pow(1 + i, -n), d = 100000 - val;
          return { html: '<p class="hint" style="margin-top:0">$100,000 of 8% bonds, 5 years (10 semiannual periods) left, carried at $100,000.</p><div class="big-eq" style="font-size:20px">Fair value <span class="e">' + money(val) + '</span></div>',
            say: Math.abs(d) < 1 ? "At an 8% market rate the bonds are worth their $100,000 carrying value." : "At a " + v.m + "% market rate the bonds are worth " + money(val) + ". The liability " + (d > 0 ? "fell" : "rose") + " by " + money(Math.abs(d)) + ", an unrealized <b>" + (d > 0 ? "gain" : "loss") + "</b> under the fair value option." };
        }
      }
    },

    cards: {
      terms: [
        { term: "Accrued interest on issuance", back: "Interest since the bond date, collected from buyers when bonds are sold between interest dates." },
        { term: "Early retirement (extinguishment)", back: "Paying off bonds before maturity; remove the carrying value and record a gain or loss." },
        { term: "Refinancing", back: "Replacing old debt with new debt, often at a lower interest rate." },
        { term: "Call price", back: "The price stated in the indenture at which the issuer may retire bonds early." },
        { term: "Fair value option", back: "An election to carry bonds payable at fair value, reporting unrealized gains and losses in earnings." },
        { term: "Level 1 / 2 / 3", back: "Fair value inputs: quoted prices; similar securities; management models." }
      ]
    },

    quiz: [
      { q: "$100,000 of 12% bonds dated April 1 are sold June 1. Accrued interest collected from buyers is:", options: ["$1,000", "$2,000", "$4,000", "$6,000"], answer: 1, why: "$100,000 × 12% × 2/12." },
      { q: "On the first September 30 payment of $6,000, Thompson’s interest expense is:", options: ["$6,000", "$4,000", "$2,000", "$3,000"], answer: 1, why: "$2,000 was collected from buyers." },
      { q: "With interest paid through September 30, the December 31 accrual is:", options: ["$1,000", "$3,000", "$6,000", "$12,000"], answer: 1, why: "Three months at 12% on $100,000." },
      { q: "Before recording an early retirement, the company first:", options: ["Reverses all prior interest", "Brings interest and amortization up to date", "Records a gain", "Writes off the entire discount"], answer: 1, why: "The carrying value must be current." },
      { q: "Cabano’s bonds have a carrying value of $194,200 and are retired for $210,000. The result is:", options: ["$15,800 gain", "$15,800 loss", "$10,000 loss", "No gain or loss"], answer: 1, why: "It paid more than the carrying value." },
      { q: "If market interest rates rise, the fair value of a company’s fixed-rate bonds payable:", options: ["Rises", "Falls", "Stays at face", "Equals the call price"], answer: 1, why: "Higher discount rates mean lower present values." },
      { q: "Under the fair value option, changes in the bonds’ value are reported:", options: ["Only in the notes", "In earnings", "Directly in common stock", "Never"], answer: 1, why: "Unrealized gains and losses go to earnings." },
      { q: "A company’s bonds trade on a public exchange. Fair value is a:", options: ["Level 1 measurement", "Level 2 measurement", "Level 3 measurement", "Management estimate"], answer: 0, why: "Observable market price." }
    ],

    init: function (root) {
      var months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];
      root.querySelector("#th-bar").innerHTML = '<div class="yb-months" style="grid-template-columns:repeat(6,minmax(0,1fr))">' + months.map(function (m, k) { return '<div class="yb-m ' + (k < 2 ? "q2" : "q1") + '">' + m + '<span>' + (k < 2 ? "accrued" : "owed") + '</span></div>'; }).join("") + '</div>' +
        '<div class="cal-key"><span class="k-acc">Accrued before the sale: buyers pay $2,000</span><span class="k-use">Thompson has the money: $4,000 cost</span></div>';
    }
  });
})();

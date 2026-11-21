/* Lesson 13.1 · Long-Term Notes */
(function () {
  function m2(n) { var r = Math.round(n * 100) / 100; return "$" + r.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function pvAnn(i, n) { return (1 - Math.pow(1 + i, -n)) / i; }

  HUB.register("13-1", {
    summary: "Longer loans: interest-only term notes, and the time value of money (future value, present value, annuities) that determines level loan payments like a mortgage’s.",
    objectives: [
      "Record a multi-year interest-only term note",
      "Compute future value and present value of a lump sum",
      "Compute the future and present value of an annuity",
      "Compute a level loan payment and build an amortization table"
    ],
    html: `
<section class="sec" data-toc="Term notes">
  <div class="eyebrow kind">Example</div>
  <h2>An interest-only term note</h2>
  <p>Borrowers often want two, three, five, or more years. A <b>term loan</b> pays interest only during the loan, with the full balance due at maturity. A $10,000, five-year, 8% term note is issued October 1, 20X3: $800 of interest a year, paid each September 30, with interest accrued every December 31.</p>
  <div data-widget="journal" data-key="term"></div>
  <p>Other loans require <b>level payments</b> that cover interest and principal so the loan is fully paid at the end, common in real estate. Secured by the property, these are <b>mortgage notes</b>. Computing those payments takes present value.</p>
</section>

<section class="sec" data-toc="Time value of money">
  <div class="eyebrow kind try">Try it</div>
  <h2>Future value and present value</h2>
  <p><b>Compounding</b> means earning interest on interest. $1 at 10% grows to $1.10 after a year and $1.21 after two (simple interest would give only $1.20).</p>
  <div class="grid2">
    <div class="tile"><span class="k">Future value of a lump sum</span><h4>(1 + i)<sup>n</sup></h4><p>$1,000 for 5 years at 6% grows to $1,338.23.</p></div>
    <div class="tile alt"><span class="k">Present value of a lump sum</span><h4>1 ÷ (1 + i)<sup>n</sup></h4><p>$1,000 received in 5 years at 7% is worth $712.99 today.</p></div>
  </div>
  <div class="panel">
    <div class="seg" role="group" aria-label="Calculation"><button type="button" class="on" data-voice-state data-tv="fv">Future value</button><button type="button" data-voice-state data-tv="pv">Present value</button><button type="button" data-voice-state data-tv="pva">PV of an annuity</button></div>
    <div class="calc" style="margin-top:14px">
      <div class="calc-in">
        <div class="calc-field"><div class="calc-top"><label for="tv-amt">Amount</label><output class="num" id="tv-amt-o"></output></div><input type="range" id="tv-amt" min="1000" max="50000" step="7000" value="1000"></div>
        <div class="calc-field"><div class="calc-top"><label for="tv-r">Interest rate per period</label><output class="num" id="tv-r-o"></output></div><input type="range" id="tv-r" min="2" max="10" step="1" value="6"></div>
        <div class="calc-field"><div class="calc-top"><label for="tv-n">Periods</label><output class="num" id="tv-n-o"></output></div><input type="range" id="tv-n" min="1" max="10" step="1" value="5"></div>
      </div>
      <div class="calc-out"><div id="tv-out"></div><p class="verdict" id="tv-say" aria-live="polite"></p></div>
    </div>
  </div>
  <p>An <b>annuity</b> is a stream of level payments at regular intervals. $1 deposited at the start of each year for 5 years at 5% accumulates to $5.80. The present value of $1,000 received at the end of each year for 5 years at 8% is $3,992.71 (factor 3.99271). Tables, calculators, and spreadsheets all give these factors.</p>
</section>

<section class="sec" data-toc="Loan payments">
  <div class="eyebrow kind try">Try it</div>
  <h2>Computing a level loan payment</h2>
  <p>The amount borrowed is the present value of the payments: <b>Loan = Payment × annuity PV factor</b>, so <b>Payment = Loan ÷ factor</b>. A $100,000, 5-year, 6% loan: $100,000 ÷ 4.21236 = <b>$23,739.64</b> a year. Each payment first covers the period’s interest; the rest reduces principal.</p>
  <div class="panel"><div data-widget="calc" data-key="loan"></div></div>
  <div data-widget="journal" data-key="lj"></div>
  <p class="hint">Payments needn’t be annual. A $10,000, 8% loan paid quarterly over two years uses 8 periods at 2%: $10,000 ÷ 7.32548 = $1,365.10 per quarter. Payments may also fall at the beginning of each period instead of the end.</p>
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
    <li><span>Term notes pay interest periodically and principal at maturity; accrue interest at each year end.</span></li>
    <li><span>Future value = amount × (1 + i)<sup>n</sup>; present value = amount ÷ (1 + i)<sup>n</sup>.</span></li>
    <li><span>An annuity is a level stream of payments; its PV discounts out the interest.</span></li>
    <li><span>Loan payment = loan ÷ annuity PV factor; each payment covers interest first, then principal.</span></li>
  </ol>
</section>`,

    data: {
      term: { entries: [
        { date: "Oct. 1, 20X3", lines: [["Cash", 10000, 0], ["Notes Payable", 0, 10000]], memo: "Issued a 5-year, 8% term note" },
        { date: "Dec. 31 (each year)", lines: [["Interest Expense", 200, 0], ["Interest Payable", 0, 200]], memo: "Accrue 3 months: $10,000 × 8% × 3/12" },
        { date: "Sep. 30 (each year)", lines: [["Interest Payable", 200, 0], ["Interest Expense", 600, 0], ["Cash", 0, 800]], memo: "Pay the year’s interest" },
        { date: "Sep. 30, 20X8", lines: [["Notes Payable", 10000, 0], ["Interest Payable", 200, 0], ["Interest Expense", 600, 0], ["Cash", 0, 10800]], memo: "Final interest plus principal at maturity" }
      ], step: true },
      loan: {
        inputs: [
          { id: "a", label: "Amount borrowed", min: 50000, max: 200000, step: 50000, value: 100000, fmt: "$" },
          { id: "r", label: "Annual interest rate", min: 4, max: 10, step: 2, value: 6, fmt: "%" },
          { id: "n", label: "Years", min: 3, max: 7, step: 1, value: 5, fmt: "yr" }
        ],
        run: function (v) {
          var i = v.r / 100, f = pvAnn(i, v.n), pay = v.a / f, bal = v.a, rows = "";
          for (var y = 1; y <= v.n; y++) {
            var int = bal * i, prin = y === v.n ? bal : pay - int; bal -= prin;
            rows += '<tr><td>' + y + '</td><td class="num">' + m2(y === v.n ? prin + int : pay) + '</td><td class="num">' + m2(int) + '</td><td class="num">' + m2(prin) + '</td><td class="num">' + m2(Math.max(0, bal)) + '</td></tr>';
          }
          return { html: '<div class="big-eq" style="font-size:20px">' + m2(v.a) + ' ÷ ' + f.toFixed(5) + ' = <span class="e">' + m2(pay) + '</span> a year</div><div class="scroll-x"><table class="plain"><thead><tr><th>Year</th><th class="num">Payment</th><th class="num">Interest</th><th class="num">Principal</th><th class="num">Balance</th></tr></thead><tbody>' + rows + '</tbody></table></div>',
            say: "Each annual payment is <b>" + m2(pay) + "</b>, using a present value factor of " + f.toFixed(5) + "." };
        }
      },
      lj: { entries: [{ date: "End of Year 1", lines: [["Interest Expense", 6000, 0], ["Notes Payable", 17739.64, 0], ["Cash", 0, 23739.64]], memo: "First payment: $6,000 interest (6% × $100,000), the rest reduces principal" }] }
    },

    cards: {
      terms: [
        { term: "Term loan", back: "A loan with interest-only payments and the full principal due at maturity." },
        { term: "Mortgage note", back: "A loan secured by real estate, usually repaid with level payments." },
        { term: "Compounding", back: "Earning interest on previously earned interest." },
        { term: "Future value of a lump sum", back: "Amount × (1 + i)ⁿ." },
        { term: "Present value of a lump sum", back: "Amount × 1/(1 + i)ⁿ." },
        { term: "Annuity", back: "A stream of level payments at regular intervals." },
        { term: "Loan payment", back: "Loan amount ÷ present value of an annuity factor." },
        { term: "Amortization table", back: "Schedule splitting each payment into interest and principal and showing the remaining balance." }
      ]
    },

    quiz: [
      { q: "$1 invested at 10% for two years with compounding grows to:", options: ["$1.20", "$1.21", "$1.10", "$1.25"], answer: 1, why: "$1.10 × 1.10." },
      { q: "The future value factor for 5 periods at 6% is about 1.33823. $1,000 grows to:", options: ["$1,060.00", "$1,300.00", "$1,338.23", "$747.26"], answer: 2, why: "$1,000 × 1.33823." },
      { q: "The present value of $1,000 received in 5 years at 7% is:", options: ["$1,402.55", "$712.99", "$930.00", "$650.00"], answer: 1, why: "$1,000 ÷ 1.07⁵." },
      { q: "An annuity is:", options: ["A single lump sum", "A stream of level payments at regular intervals", "A type of bond", "An annual report"], answer: 1, why: "Level payments, regular intervals." },
      { q: "A $100,000, 5-year, 6% loan has an annuity PV factor of 4.21236. The annual payment is:", options: ["$20,000", "$23,739.64", "$21,236", "$26,000"], answer: 1, why: "$100,000 ÷ 4.21236." },
      { q: "In the first payment on that loan, interest is:", options: ["$23,739.64", "$6,000", "$17,739.64", "$1,424"], answer: 1, why: "6% × $100,000." },
      { q: "A $10,000, 5-year, 8% term note pays annual interest of:", options: ["$80", "$800", "$400", "$10,800"], answer: 1, why: "$10,000 × 8%." },
      { q: "For a quarterly loan at 8% a year over 2 years, use:", options: ["2 periods at 8%", "8 periods at 2%", "4 periods at 4%", "8 periods at 8%"], answer: 1, why: "Periods and rate both adjust to quarters." }
    ],

    init: function (root) {
      var mode = "fv";
      function draw() {
        var a = +root.querySelector("#tv-amt").value, r = +root.querySelector("#tv-r").value, n = +root.querySelector("#tv-n").value, i = r / 100, f, res, txt;
        root.querySelector("#tv-amt-o").textContent = "$" + a.toLocaleString();
        root.querySelector("#tv-r-o").textContent = r + "%";
        root.querySelector("#tv-n-o").textContent = n;
        if (mode === "fv") { f = Math.pow(1 + i, n); res = a * f; txt = "$" + a.toLocaleString() + " invested for " + n + " periods at " + r + "% grows to <b>" + m2(res) + "</b>."; }
        else if (mode === "pv") { f = 1 / Math.pow(1 + i, n); res = a * f; txt = "$" + a.toLocaleString() + " received in " + n + " periods at " + r + "% is worth <b>" + m2(res) + "</b> today."; }
        else { f = pvAnn(i, n); res = a * f; txt = "Receiving $" + a.toLocaleString() + " at the end of each of " + n + " periods at " + r + "% is worth <b>" + m2(res) + "</b> today."; }
        root.querySelector("#tv-out").innerHTML = '<div class="big-eq" style="font-size:20px">$' + a.toLocaleString() + ' × ' + f.toFixed(5) + ' = <span class="e">' + m2(res) + '</span></div>';
        root.querySelector("#tv-say").innerHTML = txt;
      }
      ["#tv-amt", "#tv-r", "#tv-n"].forEach(function (s) { root.querySelector(s).addEventListener("input", draw); });
      root.querySelectorAll("[data-tv]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-tv]").forEach(function (x) { x.classList.toggle("on", x === b); }); mode = b.getAttribute("data-tv"); draw(); }); });
      draw();
    }
  });
})();

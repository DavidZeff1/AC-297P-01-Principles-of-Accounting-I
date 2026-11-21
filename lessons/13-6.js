/* Lesson 13.6 · Analysis, Commitments, and Leases */
(function () {
  function m2(n) { var r = Math.round(n * 100) / 100; return "$" + r.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

  HUB.register("13-6", {
    summary: "Debt ratios and times interest earned gauge how heavily a company leans on borrowing; commitments call for disclosure; and financing leases put both an asset and a loan-like obligation on the lessee’s balance sheet.",
    objectives: [
      "Compute debt to total assets, debt to equity, and times interest earned",
      "Interpret debt ratios with care across industries",
      "Distinguish recorded liabilities from disclosed commitments",
      "Record a financing lease and its payments"
    ],
    html: `
<section class="sec" data-toc="Debt ratios">
  <div class="eyebrow kind try">Try it</div>
  <h2>How much is borrowed, and can it be serviced?</h2>
  <div class="grid3">
    <div class="tile"><span class="k">Debt to total assets</span><h4>Total debt ÷ Total assets</h4><p>The share of the company financed by creditors.</p></div>
    <div class="tile"><span class="k">Debt to equity</span><h4>Total debt ÷ Total equity</h4><p>Creditor financing compared with owner financing.</p></div>
    <div class="tile alt"><span class="k">Times interest earned</span><h4>Income before interest and taxes ÷ Interest</h4><p>How many times earnings cover the unavoidable interest bill.</p></div>
  </div>
  <div class="panel"><div data-widget="calc" data-key="rat"></div></div>
  <p>Small debt ratios are often read as strength and large ones as vulnerability, but “small” and “large” are relative. Utilities rely heavily on debt yet can be very healthy; a tech company with little debt may still be fragile if its value rests on fleeting intangibles. Watch trends, compare within an industry, and don’t lean on any single measure.</p>
</section>

<section class="sec" data-toc="Commitments">
  <div class="eyebrow kind">Concept</div>
  <h2>Promises that aren’t liabilities yet</h2>
  <p>Companies sign long-term agreements of every kind: to buy set quantities of supplies, to deliver products at fixed prices, to make lease payments. Many create no liability today but may tomorrow.</p>
  <div class="grid2">
    <div class="tile"><span class="k">Disclose</span><p>Notes generally report the total committed future payments, with a <b>year-by-year</b> breakdown.</p></div>
    <div class="tile warn"><span class="k">Recognize losses</span><p>If a company is locked into a deal that will hurt it, such as buying at a price well above today’s market, it may have to record the loss now.</p></div>
  </div>
  <div class="panel"><div data-widget="sorter" data-key="rec"></div></div>
</section>

<section class="sec" data-toc="Financing leases">
  <div class="eyebrow kind">Example</div>
  <h2>Leasing that’s really buying</h2>
  <p>A <b>financing lease</b> (Chapter 10) gives the lessee an asset right, and the payment stream acts like a note payable. Accounting follows <b>economic substance over legal form</b>, so both go on the lessee’s balance sheet.</p>
  <p>On January 1, 20X1, equipment with a five-year life is leased for five year-end payments of $23,739.64. The lessee’s <b>incremental borrowing rate</b> (what it would pay on similar debt) is 6%, so the payments’ present value is <b>$100,000</b>. The numbers match the mortgage note in lesson 13.1.</p>
  <div data-widget="journal" data-key="lease"></div>
  <div class="panel">
    <div class="seg" role="group" aria-label="Year"><button type="button" class="on" data-voice-state data-ly="1">Year 1</button><button type="button" data-voice-state data-ly="2">Year 2</button><button type="button" data-voice-state data-ly="3">Year 3</button><button type="button" data-voice-state data-ly="4">Year 4</button><button type="button" data-voice-state data-ly="5">Year 5</button></div>
    <div class="grid2" style="margin-top:14px"><div id="ls-j"></div><div id="ls-b"></div></div>
    <p class="verdict" id="ls-say" aria-live="polite"></p>
  </div>
  <p>Notice the payment produces <b>interest expense</b>, not rent expense. The asset follows its own path: it’s depreciated like owned equipment, here straight-line over five years at $20,000 a year.</p>
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
    <li><span>Debt to total assets and debt to equity measure leverage; times interest earned measures ability to pay interest.</span></li>
    <li><span>Interpret ratios by industry and trend, never in isolation.</span></li>
    <li><span>Commitments are disclosed (year by year); unfavorable locked-in deals may require a loss.</span></li>
    <li><span>Financing lease: record an asset and an obligation at the present value of the payments.</span></li>
    <li><span>Each payment splits into interest expense and principal reduction; the asset is depreciated separately.</span></li>
  </ol>
</section>`,

    data: {
      rat: {
        inputs: [
          { id: "d", label: "Total debt (total assets $1,000,000)", min: 200000, max: 800000, step: 100000, value: 400000, fmt: "$" },
          { id: "e", label: "Income before interest and taxes", min: 40000, max: 240000, step: 40000, value: 120000, fmt: "$" },
          { id: "i", label: "Interest charges", min: 10000, max: 50000, step: 10000, value: 30000, fmt: "$" }
        ],
        run: function (v, money) {
          var eq = 1000000 - v.d, da = v.d / 1000000, de = v.d / eq, tie = v.e / v.i;
          return { html: '<div class="grid3"><div class="tile"><span class="k">Debt to total assets</span><h4>' + Math.round(da * 100) + '%</h4></div><div class="tile"><span class="k">Debt to equity</span><h4>' + de.toFixed(2) + '</h4><p>Equity ' + money(eq) + '</p></div><div class="tile ' + (tie < 2 ? "warn" : "alt") + '"><span class="k">Times interest earned</span><h4>' + tie.toFixed(1) + '×</h4></div></div>',
            say: "Creditors finance " + Math.round(da * 100) + "% of assets, debt to equity is " + de.toFixed(2) + ", and earnings cover interest <b>" + tie.toFixed(1) + " times</b>." + (tie < 2 ? " That thin cushion could signal trouble meeting interest." : "") };
        }
      },
      lease: { entries: [{ date: "Jan. 1, 20X1", lines: [["Leased Equipment", 100000, 0], ["Obligation Under Financing Lease", 0, 100000]], memo: "Present value of five $23,739.64 payments at 6%" }] }
    },

    sorters: {
      rec: {
        categories: [{ id: "rec", label: "Record a liability" }, { id: "dis", label: "Disclose as a commitment" }],
        items: [
          { text: "A financing lease for equipment signed today", cat: "rec", why: "The obligation is recorded at present value." },
          { text: "An agreement to buy 10,000 units of supplies each year for five years", cat: "dis", why: "A commitment, disclosed with future payments." },
          { text: "Bonds payable issued last year", cat: "rec", why: "An existing liability." },
          { text: "A contract to deliver products at fixed prices next year", cat: "dis", why: "Disclose; record a loss only if it’s locked in unfavorably." }
        ]
      }
    },

    cards: {
      terms: [
        { term: "Debt to total assets ratio", back: "Total debt ÷ total assets." },
        { term: "Debt to equity ratio", back: "Total debt ÷ total equity." },
        { term: "Times interest earned", back: "Income before interest and taxes ÷ interest charges." },
        { term: "Commitment", back: "A long-term agreement that may create a future obligation; disclosed in the notes." },
        { term: "Financing lease", back: "A lease that in substance acquires an asset right; recorded as an asset and an obligation." },
        { term: "Incremental borrowing rate", back: "The rate the lessee would pay to borrow on similar terms; used to discount lease payments." },
        { term: "Obligation Under Financing Lease", back: "The lessee’s liability, reduced by each payment’s principal portion." }
      ]
    },

    quiz: [
      { q: "Total debt $400,000, total assets $1,000,000. Debt to total assets is:", options: ["0.67", "40%", "60%", "2.5"], answer: 1, why: "$400,000 ÷ $1,000,000." },
      { q: "With those figures, debt to equity is:", options: ["0.40", "0.67", "1.50", "2.50"], answer: 1, why: "Equity is $600,000; $400,000 ÷ $600,000." },
      { q: "Income before interest and taxes $120,000; interest $30,000. Times interest earned is:", options: ["0.25", "4", "3", "90,000"], answer: 1, why: "$120,000 ÷ $30,000." },
      { q: "A high debt ratio for a utility:", options: ["Always means distress", "May be normal for the industry", "Is impossible", "Means it has no assets"], answer: 1, why: "Interpret ratios by industry." },
      { q: "A long-term purchase commitment usually requires:", options: ["Recording a liability for all payments", "Note disclosure of future payments", "Nothing", "Recording an asset"], answer: 1, why: "Disclose, with a year-by-year breakdown." },
      { q: "A financing lease is initially recorded at:", options: ["The total of all payments", "The present value of the lease payments", "Zero", "The first payment"], answer: 1, why: "Discounted at the incremental borrowing rate." },
      { q: "The first $23,739.64 payment on a $100,000, 6% financing lease includes interest expense of:", options: ["$23,739.64", "$6,000", "$17,739.64", "$0 (it’s rent)"], answer: 1, why: "6% × $100,000; the rest reduces the obligation." },
      { q: "Recording leases as assets and liabilities reflects:", options: ["Legal form over substance", "Economic substance over legal form", "Conservatism only", "Tax rules"], answer: 1, why: "The lessee effectively acquires the asset." }
    ],

    init: function (root) {
      function draw(y) {
        var bal = 100000, pay = 23739.64, rows = [];
        for (var k = 1; k <= 5; k++) { var int = Math.round(bal * 6) / 100, pr = k === 5 ? bal : Math.round((pay - int) * 100) / 100; if (k === 5) int = Math.round((pay - pr) * 100) / 100; bal = Math.round((bal - pr) * 100) / 100; rows.push({ int: int, pr: pr, bal: bal, beg: bal + pr }); }
        var r = rows[y - 1];
        HUB.widgets.journal(root.querySelector("#ls-j"), { entries: [{ date: "Dec. 31, 20X" + y, lines: [["Interest Expense", r.int, 0], ["Obligation Under Financing Lease", r.pr, 0], ["Cash", 0, pay]], memo: "Lease payment " + y + " of 5" }, { date: "Dec. 31, 20X" + y, lines: [["Depreciation Expense", 20000, 0], ["Accumulated Depreciation", 0, 20000]], memo: "$100,000 ÷ 5 years" }] });
        root.querySelector("#ls-b").innerHTML = '<div class="statement two"><div class="st-head"><b>Lessee</b><span>Balance Sheet (excerpt)</span><span>December 31, 20X' + y + '</span></div>' +
          '<div class="st-row" style="--ind:0"><span class="st-l">Leased equipment</span><span class="st-a">$100,000.00</span><span class="st-b"></span></div>' +
          '<div class="st-row" style="--ind:1"><span class="st-l">Less: accumulated depreciation</span><span class="st-a"><span class="u">' + m2(20000 * y) + '</span></span><span class="st-b">' + m2(100000 - 20000 * y) + '</span></div>' +
          '<div class="st-row"><span class="st-l">Obligation under financing lease</span><span class="st-a"></span><span class="st-b">' + m2(r.bal) + '</span></div></div>';
        root.querySelector("#ls-say").innerHTML = "Year " + y + ": interest is 6% of the " + m2(r.beg) + " owed, <b>" + m2(r.int) + "</b>, so " + m2(r.pr) + " of the payment reduces the obligation to " + m2(r.bal) + ".";
      }
      root.querySelectorAll("[data-ly]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-ly]").forEach(function (x) { x.classList.toggle("on", x === b); }); draw(+b.getAttribute("data-ly")); }); });
      draw(1);
    }
  });
})();

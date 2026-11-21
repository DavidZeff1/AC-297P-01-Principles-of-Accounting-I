/* Lesson 12.3 · Contingent Liabilities */
HUB.register("12-3", {
  summary: "Lawsuits, spills, and warranties may become liabilities. Record them when probable and estimable, disclose them when reasonably possible, and estimate warranty obligations when goods are sold.",
  objectives: [
    "Distinguish contingent liabilities from general business risks",
    "Decide whether to record, disclose, or ignore a contingency",
    "Apply the timing rule for events near year end",
    "Account for warranty liabilities"
  ],
  html: `
<section class="sec" data-toc="What they are">
  <div class="eyebrow kind">Concept</div>
  <h2>Possible obligations of uncertain timing and amount</h2>
  <p><b>Contingent liabilities</b> may eventually become liabilities, but their timing and amount aren’t yet certain: legal disputes, environmental contamination, product warranties. Don’t confuse these firm-specific contingencies with <b>general business risks</b> like war or storms, which are an unfortunate part of life and aren’t accounted for in advance.</p>
</section>

<section class="sec" data-toc="Record or disclose?">
  <div class="eyebrow kind try">Try it</div>
  <h2>Record, disclose, or say nothing?</h2>
  <p>It takes a subjective judgment of how likely an unfavorable outcome is. Choose the likelihood and whether the amount can be estimated.</p>
  <div class="panel">
    <div class="seg" role="group" aria-label="Likelihood"><button type="button" class="on" data-voice-state data-lk="prob">Probable</button><button type="button" data-voice-state data-lk="poss">Reasonably possible</button><button type="button" data-voice-state data-lk="rem">Remote</button></div>
    <div class="seg" role="group" aria-label="Estimable" style="margin-left:6px"><button type="button" class="on" data-voice-state data-es="y">Can be estimated</button><button type="button" data-voice-state data-es="n">Can’t be estimated</button></div>
    <div class="cont-out" id="cont" aria-live="polite"></div>
  </div>
  <div class="grid2">
    <div class="tile"><span class="k">Estimating a range</span><p>If the loss can only be estimated as a range, U.S. rules generally record the <b>low end</b>; international standards use the <b>midpoint</b>.</p></div>
    <div class="tile warn"><span class="k">Read the notes</span><p>Accounting is usually conservative, but not here: many significant risks never reach the balance sheet because recording requires “probable” and “reasonably estimable.” Read the notes before investing or lending.</p></div>
  </div>
  <ul>
    <li><b>Acquired contingencies</b> in a business acquisition are recorded at an estimate of actual value.</li>
    <li><b>Business decision risks</b>, like dropping insurance coverage to save premiums, aren’t required to be disclosed but aren’t discouraged.</li>
    <li><b>Contingent gains</b>, like a patent infringement claim against another company, are almost never recognized before payment is received.</li>
  </ul>
</section>

<section class="sec" data-toc="Timing">
  <div class="eyebrow kind">Concept</div>
  <h2>When did the event happen?</h2>
  <p>What matters is when the <b>event</b> occurred, not when the company learned of it.</p>
  <div class="grid2">
    <div class="tile"><span class="k">Injury in Year 1, notice in Year 2</span><p>If notice arrives before Year 1’s statements are issued, the expected loss affects <b>Year 1</b>, because the injury happened in Year 1.</p></div>
    <div class="tile alt"><span class="k">Injury in Year 2</span><p>Year 1’s statements aren’t adjusted, however bad the effect, but a note may explain the material adverse event after year end.</p></div>
  </div>
</section>

<section class="sec" data-toc="Warranties">
  <div class="eyebrow kind try">Try it</div>
  <h2>Warranties: probable and estimable</h2>
  <p>Warranties are presumed to create a probable, estimable liability. When goods are sold, record estimated warranty expense and a Warranty Liability; as warranty work is done, reduce the liability. The expense lands in the period of the sale: <b>matching</b>.</p>
  <p>Zeff Company began the year with a $25,000 warranty liability, sold $3,500,000 of goods with estimated warranty costs of 2% of sales, and spent $80,000 on warranty work.</p>
  <div data-widget="journal" data-key="wj"></div>
  <div class="panel"><div data-widget="calc" data-key="w"></div></div>
  <p>Coupons, rebates, prizes, air miles, and free stays work the same way: estimate the liability as sales occur.</p>
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
    <li><span><b>Probable and estimable</b>: record a loss and liability. <b>Reasonably possible</b>, or probable but not estimable: disclose in a note. <b>Remote</b>: nothing.</span></li>
    <li><span>For a range, the U.S. records the low end; IFRS the midpoint.</span></li>
    <li><span>Contingent gains are rarely recognized before settlement.</span></li>
    <li><span>The year the underlying event occurs determines which statements are affected.</span></li>
    <li><span>Warranties: debit Warranty Expense, credit Warranty Liability at sale; debit the liability as work is done.</span></li>
  </ol>
</section>`,

  data: {
    wj: { entries: [
      { date: "During year", lines: [["Warranty Expense", 70000, 0], ["Warranty Liability", 0, 70000]], memo: "Estimated warranty cost: 2% of $3,500,000 sales" },
      { date: "During year", lines: [["Warranty Liability", 80000, 0], ["Cash (and parts)", 0, 80000]], memo: "Warranty work performed" }
    ]},
    w: {
      inputs: [
        { id: "r", label: "Estimated warranty rate", min: 1, max: 4, step: 1, value: 2, fmt: "%" },
        { id: "s", label: "Warranty work performed", min: 40000, max: 120000, step: 20000, value: 80000, fmt: "$" }
      ],
      run: function (v, money) {
        var acc = 3500000 * v.r / 100, end = 25000 + acc - v.s;
        return { html: '<div class="taccts"><div class="tacct"><div class="t-name">Warranty Liability</div><div class="t-body"><div class="t-cell dr"></div><div class="t-cell cr"><span class="t-lbl">Beg.</span><span class="num">25,000</span></div><div class="t-cell dr"><span class="t-lbl">Work done</span><span class="num">' + v.s.toLocaleString() + '</span></div><div class="t-cell cr"><span class="t-lbl">Accrued</span><span class="num">' + acc.toLocaleString() + '</span></div><div class="t-cell dr bal">' + (end < 0 ? '<span class="t-lbl">Bal.</span><span class="num">' + (-end).toLocaleString() + '</span>' : '') + '</div><div class="t-cell cr bal">' + (end >= 0 ? '<span class="t-lbl">Bal.</span><span class="num">' + end.toLocaleString() + '</span>' : '') + '</div></div></div></div>',
          say: "Beginning $25,000 plus " + money(acc) + " accrued, minus " + money(v.s) + " of work, leaves a warranty liability of <b>" + money(end) + "</b>." + (end < 0 ? " A debit balance would mean the estimate rate is too low." : "") };
      }
    }
  },

  cards: {
    terms: [
      { term: "Contingent liability", back: "A potential obligation whose timing and amount are uncertain, such as a lawsuit or warranty." },
      { term: "Probable and reasonably estimable", back: "Criteria for recording a contingent liability: debit loss, credit liability." },
      { term: "Reasonably possible", back: "Disclose in a note; don’t record." },
      { term: "Remote", back: "No disclosure needed." },
      { term: "Contingent gain", back: "A potential gain, almost never recognized before settlement." },
      { term: "Warranty Liability", back: "Estimated future warranty costs, recorded when goods are sold." }
    ]
  },

  quiz: [
    { q: "A contingent liability should be recorded when it is:", options: ["Reasonably possible", "Probable and reasonably estimable", "Remote", "Any amount over $10,000"], answer: 1, why: "Both conditions are required." },
    { q: "A reasonably possible loss is:", options: ["Recorded", "Disclosed in a note", "Ignored", "Recorded at the midpoint"], answer: 1, why: "Disclose, don’t record." },
    { q: "A probable loss that can’t be estimated is:", options: ["Recorded at zero", "Disclosed in a note", "Ignored", "Recorded as a gain"], answer: 1, why: "It must be disclosed." },
    { q: "U.S. rules for a loss estimated as a range generally record:", options: ["The high end", "The midpoint", "The low end", "Nothing"], answer: 2, why: "IFRS uses the midpoint." },
    { q: "Risk of war or storms is:", options: ["A contingent liability", "A general business risk, not accounted for in advance", "Always disclosed", "Recorded as a liability"], answer: 1, why: "It’s not firm-specific." },
    { q: "A customer was injured in Year 1; the company learns of it in Year 2 before issuing Year 1 statements. The probable loss affects:", options: ["Year 2 only", "Year 1", "Neither", "Retained earnings directly"], answer: 1, why: "The event occurred in Year 1." },
    { q: "Zeff: beginning warranty liability $25,000, accrued $70,000, work performed $80,000. Ending liability is:", options: ["$15,000", "$35,000", "$175,000", "$5,000"], answer: 0, why: "$25,000 + $70,000 − $80,000." },
    { q: "A company’s patent infringement claim against a competitor is usually:", options: ["Recorded as a gain immediately", "Not recognized until payment is received", "Recorded as a receivable", "Disclosed as a liability"], answer: 1, why: "Contingent gains are rarely recognized early." }
  ],

  init: function (root) {
    var lk = "prob", es = "y";
    function draw() {
      var r = lk === "rem" ? ["Do nothing", "Remote risks, like a frivolous lawsuit, aren’t disclosed; they’d just be clutter.", "none"]
        : lk === "poss" ? ["Disclose in a note", "Only reasonably possible: describe it in the notes, but don’t record a liability.", "note"]
        : es === "y" ? ["Record it", "Probable and estimable: debit a loss and credit a liability now, before settlement, like the cleanup cost of a hazardous waste spill.", "rec"]
        : ["Disclose in a note", "Probable, but the amount can’t be estimated: disclose it in the notes.", "note"];
      root.querySelector("#cont").innerHTML = '<div class="cont-res ' + r[2] + '"><b>' + r[0] + '</b><p>' + r[1] + '</p></div>';
    }
    root.querySelectorAll("[data-lk]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-lk]").forEach(function (x) { x.classList.toggle("on", x === b); }); lk = b.getAttribute("data-lk"); draw(); }); });
    root.querySelectorAll("[data-es]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-es]").forEach(function (x) { x.classList.toggle("on", x === b); }); es = b.getAttribute("data-es"); draw(); }); });
    draw();
  }
});

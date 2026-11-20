/* Lesson 10.4 · Depreciation Methods */
(function () {
  var COST = 100000, SALV = 10000, LIFE = 4, HOURS = [1000, 3000, 2000, 2000];
  /* returns [[label, expense, accumulated, book]] */
  function schedule(m, april) {
    var rows = [], acc = 0, base = COST - SALV, frac = april ? 0.75 : 1, years = april ? LIFE + 1 : LIFE;
    for (var y = 1; y <= years; y++) {
      var e;
      if (m === "sl") e = base / LIFE * (y === 1 ? frac : (april && y === years ? 1 - frac : 1));
      else if (m === "uo") e = base * HOURS[y - 1] / 8000;
      else { e = (COST - acc) * (2 / LIFE) * (y === 1 ? frac : 1); if (acc + e > base) e = base - acc; }
      if (m === "uo" && y > LIFE) break;
      e = Math.round(e * 100) / 100; acc += e;
      rows.push(["Year " + y + (m === "uo" ? " (" + HOURS[y - 1].toLocaleString() + " hrs)" : ""), e, acc, COST - acc]);
    }
    return rows;
  }
  function money(n) { return "$" + n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }); }

  HUB.register("10-4", {
    summary: "Compute straight-line, units-of-output, and double-declining balance depreciation, including partial years, then revise depreciation when estimates change.",
    objectives: [
      "Compute straight-line depreciation, including partial periods",
      "Compute units-of-output depreciation",
      "Compute double-declining balance depreciation and respect salvage value",
      "Revise depreciation prospectively for a change in estimate"
    ],
    html: `
<section class="sec" data-toc="Build a schedule">
  <div class="eyebrow kind try">Try it</div>
  <h2>One asset, three methods</h2>
  <p>An asset costs <b>$100,000</b>, has a <b>$10,000</b> salvage value, and a <b>four-year</b> life. For units-of-output, think of it as Dat Nguyen Painting’s air filtration system, rated for 8,000 hours and expected to run 1,000, 3,000, 2,000, and 2,000 hours over four years. Choose a method and an acquisition date.</p>
  <div class="panel">
    <div class="seg" role="group" aria-label="Method"><button type="button" class="on" data-voice-state data-dm="sl">Straight-line</button><button type="button" data-voice-state data-dm="uo">Units-of-output</button><button type="button" data-voice-state data-dm="ddb">Double-declining</button></div>
    <div class="seg" role="group" aria-label="Acquired" style="margin-left:6px"><button type="button" class="on" data-voice-state data-st="jan">Bought Jan. 1</button><button type="button" data-voice-state data-st="apr">Bought Apr. 1</button></div>
    <div class="grid2" style="margin-top:14px"><div class="scroll-x"><table class="plain" id="dep-t"></table></div><div id="dep-bars" class="dep-chart"></div></div>
    <p class="verdict" id="dep-say2" aria-live="polite"></p>
  </div>
  <div data-widget="steps" data-key="how"></div>
</section>

<section class="sec" data-toc="Entries and reporting">
  <div class="eyebrow kind">Concept</div>
  <h2>The entry and the balance sheet</h2>
  <p>Every method uses the same entry; only the amount changes. Depreciation appears on each year’s income statement (in manufacturing, some is assigned to inventory instead, a managerial accounting topic).</p>
  <div class="grid2">
    <div data-widget="journal" data-key="je"></div>
    <div data-widget="statement" data-key="bs"></div>
  </div>
  <p class="hint">Spreadsheets have built-in functions for these methods; for example, a double-declining function returns the $12,500 Year 3 amount.</p>
</section>

<section class="sec" data-toc="Changes in estimates">
  <div class="eyebrow kind">Concept</div>
  <h2>When estimates change</h2>
  <p>Useful life and salvage value are estimates, and new information may show they were off. Prior statements are <b>not</b> restated: they used the best information available. Instead the change is applied <b>prospectively</b>: the remaining depreciable base is spread over the remaining life.</p>
  <div class="panel"><div data-widget="worked" data-key="chg"></div></div>
  <p class="hint">International standards also allow <b>revaluing</b> PP&amp;E to fair value. Then every asset in the class must be revalued annually, with the offset in equity, which keeps changing future depreciation.</p>
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
    <li><span><b>Straight-line</b>: (cost − salvage) ÷ life. Partial years use a fraction of the annual amount.</span></li>
    <li><span><b>Units-of-output</b>: (cost − salvage) × units used ÷ total expected units.</span></li>
    <li><span><b>Double-declining balance</b>: 2 × straight-line rate × beginning book value; ignore salvage until accumulated depreciation reaches the depreciable base.</span></li>
    <li><span>Changes in estimates are applied prospectively: remaining base ÷ remaining life.</span></li>
  </ol>
</section>`,

    data: {
      how: { numbered: false, items: [
        { t: "Straight-line", b: "<p>Depreciable base ÷ life: ($100,000 − $10,000) ÷ 4 = <b>$22,500</b> a year. Bought April 1, the asset is used 9 months in Year 1, so Year 1 gets 9/12 × $22,500 = $16,875, and the last $5,625 falls in Year 5.</p>" },
        { t: "Units-of-output", b: "<p>Best when life is measured in use: hours, miles, copies. $90,000 ÷ 8,000 hours = <b>$11.25 per hour</b>. Year 2’s 3,000 hours give $33,750. If actual usage changes, the schedule is revised.</p>" },
        { t: "Double-declining", b: "<p>Accelerated: large early, small later. Rate = 2 × 25% = <b>50%</b> of beginning book value. Year 1: $50,000; Year 2: $25,000; Year 3: $12,500. Year 4’s 50% would be $6,250, but only <b>$2,500</b> brings accumulated depreciation to the $90,000 base, so depreciation stops there. With no salvage value, switch to straight-line near the end to finish. For a partial first year, take a fraction of Year 1 only. 150% and 125% declining balance use those multiples instead of 200%.</p>" }
      ]},
      je: { entries: [{ date: "Dec. 31", lines: [["Depreciation Expense", 22500, 0], ["Accumulated Depreciation", 0, 22500]], memo: "Annual straight-line depreciation" }] },
      bs: { title: "Balance sheet, end of Year 3 (straight-line)", cols: 1, rows: [{ l: "Equipment", a: 100000 }, { l: "Less: Accumulated depreciation", a: -67500, ua: true }, { l: "Book value", a: 32500, bold: true, uua: true }] },
      chg: {
        q: "<p>After two years of straight-line depreciation on the $100,000 asset ($22,500 a year), new information says its total life will be <b>seven years</b> (three more than planned) and salvage value will be <b>$5,000</b>. What’s the new annual depreciation?</p>",
        steps: [
          "Depreciation already taken: 2 × $22,500 = <b>$45,000</b>. These years are not restated.",
          "Revised remaining depreciable base: $100,000 − $45,000 − $5,000 = <b>$50,000</b>.",
          "Remaining life: 7 − 2 = <b>5 years</b>."
        ],
        answer: "<p>$50,000 ÷ 5 = <b>$10,000 per year</b> for Years 3 through 7.</p>"
      }
    },

    cards: {
      terms: [
        { term: "Straight-line method", back: "(Cost − salvage) ÷ service life, the same each full year." },
        { term: "Units-of-output method", back: "(Cost − salvage) ÷ total expected units, times units used in the period." },
        { term: "Double-declining balance", back: "Twice the straight-line rate times beginning book value; stop at the depreciable base." },
        { term: "Fractional period", back: "Partial-year depreciation for assets acquired mid-period." },
        { term: "Change in estimate", back: "Revised life or salvage applied prospectively; prior periods aren’t restated." },
        { term: "Revaluation (IFRS)", back: "Permitted remeasurement of PP&E to fair value, applied to a whole class annually." }
      ]
    },

    quiz: [
      { q: "Cost $100,000, salvage $10,000, life 4 years. Straight-line depreciation is:", options: ["$25,000", "$22,500", "$27,500", "$20,000"], answer: 1, why: "$90,000 ÷ 4." },
      { q: "That asset is bought April 1. Year 1 straight-line depreciation is:", options: ["$22,500", "$16,875", "$5,625", "$18,750"], answer: 1, why: "9/12 × $22,500." },
      { q: "Units-of-output: $90,000 base, 8,000 expected hours, 3,000 hours used this year. Depreciation is:", options: ["$22,500", "$33,750", "$30,000", "$11,250"], answer: 1, why: "$11.25 × 3,000." },
      { q: "The double-declining rate for a four-year life is:", options: ["25%", "40%", "50%", "200%"], answer: 2, why: "Twice the 25% straight-line rate." },
      { q: "DDB Year 1 depreciation on the $100,000 asset (salvage $10,000) is:", options: ["$45,000", "$50,000", "$22,500", "$40,000"], answer: 1, why: "Salvage is ignored initially: 50% × $100,000." },
      { q: "DDB Year 4 depreciation is only $2,500 because:", options: ["Of a math error", "Depreciation stops once accumulated depreciation reaches the $90,000 depreciable base", "The rate drops", "Of a change in estimate"], answer: 1, why: "Book value can’t go below salvage." },
      { q: "A change in an asset’s estimated life is handled by:", options: ["Restating prior years", "Spreading the remaining depreciable base over the remaining life", "Ignoring it", "Recording a loss"], answer: 1, why: "Changes in estimates are prospective." },
      { q: "After 2 years at $22,500, the life is revised to 7 years total with $5,000 salvage. New annual depreciation is:", options: ["$10,000", "$12,857", "$7,857", "$22,500"], answer: 0, why: "($100,000 − $45,000 − $5,000) ÷ 5." }
    ],

    init: function (root) {
      var m = "sl", apr = false;
      function draw() {
        var s = schedule(m, apr);
        root.querySelector("#dep-t").innerHTML = '<thead><tr><th>Year</th><th class="num">Expense</th><th class="num">Accumulated</th><th class="num">Book value</th></tr></thead><tbody>' +
          s.map(function (r) { return '<tr><td>' + r[0] + '</td><td class="num">' + money(r[1]) + '</td><td class="num">' + money(r[2]) + '</td><td class="num">' + money(r[3]) + '</td></tr>'; }).join("") + '</tbody>';
        var max = 50000, h = '<svg viewBox="0 0 ' + (40 + s.length * 80) + ' 200" role="img" aria-label="Depreciation expense by year">';
        s.forEach(function (r, i) { var hh = r[1] / max * 150, x = 30 + i * 80; h += '<rect class="dc-dep" x="' + x + '" y="' + (170 - hh) + '" width="44" height="' + hh + '"/><text class="dc-tot" x="' + (x + 22) + '" y="' + (164 - hh) + '" text-anchor="middle">' + Math.round(r[1] / 1000 * 10) / 10 + 'k</text><text class="dc-ax" x="' + (x + 22) + '" y="190" text-anchor="middle">Yr ' + (i + 1) + '</text>'; });
        root.querySelector("#dep-bars").innerHTML = h + '</svg>';
        var name = m === "sl" ? "Straight-line" : m === "uo" ? "Units-of-output" : "Double-declining balance";
        root.querySelector("#dep-say2").innerHTML = name + (apr && m !== "uo" ? ", bought April 1" : "") + ": Year 1 expense <b>" + money(s[0][1]) + "</b>; total depreciation " + money(s[s.length - 1][2]) + ", leaving the $10,000 salvage value.";
      }
      root.querySelectorAll("[data-dm]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-dm]").forEach(function (x) { x.classList.toggle("on", x === b); }); m = b.getAttribute("data-dm"); draw(); }); });
      root.querySelectorAll("[data-st]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-st]").forEach(function (x) { x.classList.toggle("on", x === b); }); apr = b.getAttribute("data-st") === "apr"; draw(); }); });
      draw();
    }
  });
})();

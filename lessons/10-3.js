/* Lesson 10.3 · Depreciation Concepts */
HUB.register("10-3", {
  summary: "Why there are several depreciation methods, and the vocabulary you need: cost, service life, salvage value, depreciable base, and book value.",
  objectives: [
    "Explain why different depreciation patterns can be justified",
    "Define cost, service life, salvage value, depreciable base, and book value",
    "Infer an asset’s age from its accumulated depreciation"
  ],
  html: `
<section class="sec" data-toc="Why several methods">
  <div class="eyebrow kind try">Compare</div>
  <h2>Why more than one method?</h2>
  <p>A <b>depreciation method</b> is the pattern for allocating cost over the service life. Three popular methods are <b>straight-line</b>, <b>units-of-output</b>, and <b>double-declining balance</b>. To see why choice matters, depreciate a $100 asset over four years when maintenance costs rise as it ages.</p>
  <div class="panel">
    <div class="seg" role="group" aria-label="Pattern"><button type="button" class="on" data-voice-state data-pat="sl">Straight-line</button><button type="button" data-voice-state data-pat="acc">Accelerated</button></div>
    <div id="dep-chart" class="dep-chart"></div>
    <p class="verdict" id="dep-say" aria-live="polite"></p>
  </div>
  <p>With rising maintenance, accelerated depreciation can produce a level total cost each year, arguably a better match of costs and benefits. That doesn’t make accelerated depreciation always better. Facts vary, which is why several methods exist and each can be justified.</p>
</section>

<section class="sec" data-toc="Terminology">
  <div class="eyebrow kind">Concept</div>
  <h2>Precise terms</h2>
  <div class="grid3">
    <div class="tile"><span class="k">Cost</span><p>The ordinary and necessary amount spent to get the asset in place and in condition for use.</p></div>
    <div class="tile"><span class="k">Service life</span><p>The expected period of productive use to the company.</p></div>
    <div class="tile"><span class="k">Salvage value</span><p>Also <b>residual value</b>: what you expect to get for the asset at the end of its service life.</p></div>
    <div class="tile"><span class="k">Depreciable base</span><p>Cost − salvage value: the amount to be allocated over the service life.</p></div>
    <div class="tile"><span class="k">Book value</span><p>Also <b>net book value</b>: cost − accumulated depreciation at a point in time.</p></div>
  </div>
</section>

<section class="sec" data-toc="Reading a building">
  <div class="eyebrow kind try">Try it</div>
  <h2>How old is this building?</h2>
  <p>A building cost $2,300,000, has a $300,000 salvage value, and a 20-year life (straight-line). Its depreciable base, $2,000,000, spreads to $100,000 a year. Slide its age to see the balance sheet.</p>
  <div class="panel"><div data-widget="calc" data-key="bldg"></div></div>
  <p>Working backward: if accumulated depreciation is $1,500,000, the building must be 15 years old ($1,500,000 ÷ $100,000).</p>
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
    <li><span>A depreciation method is a pattern of cost allocation; straight-line, units-of-output, and double-declining balance are common.</span></li>
    <li><span>Accelerated methods can level total cost when maintenance rises with age.</span></li>
    <li><span><b>Depreciable base</b> = cost − salvage value; <b>book value</b> = cost − accumulated depreciation.</span></li>
  </ol>
</section>`,

  data: {
    bldg: {
      inputs: [{ id: "y", label: "Years in service", min: 0, max: 20, step: 5, value: 15, fmt: "yr" }],
      run: function (v, money) {
        var acc = 100000 * v.y, bv = 2300000 - acc;
        return { html: '<div class="statement"><div class="st-row"><span class="st-l">Building (cost)</span><span class="st-b">' + money(2300000) + '</span></div><div class="st-row"><span class="st-l">Less: Accumulated depreciation</span><span class="st-b"><span class="u">' + money(-acc) + '</span></span></div><div class="st-row bold"><span class="st-l">Book value</span><span class="st-b"><span class="uu">' + money(bv) + '</span></span></div></div>',
          say: "After " + v.y + " years, accumulated depreciation is " + money(acc) + " and book value is <b>" + money(bv) + "</b>." + (v.y === 20 ? " At the end of its life, book value equals the $300,000 salvage value." : "") };
      }
    }
  },

  cards: {
    terms: [
      { term: "Depreciation method", back: "The pattern by which cost is allocated over the service life." },
      { term: "Accelerated depreciation", back: "More depreciation early in an asset’s life, less later." },
      { term: "Salvage value", sub: "residual value", back: "Expected proceeds at the end of the service life." },
      { term: "Depreciable base", back: "Cost minus salvage value." },
      { term: "Book value", sub: "net book value", back: "Cost minus accumulated depreciation." }
    ]
  },

  quiz: [
    { q: "Depreciable base equals:", options: ["Cost", "Cost − salvage value", "Cost − accumulated depreciation", "Salvage value"], answer: 1, why: "The amount to allocate over the life." },
    { q: "Book value equals:", options: ["Market value", "Cost − accumulated depreciation", "Cost − salvage value", "Depreciation expense"], answer: 1, why: "In the PP&E context." },
    { q: "Why might accelerated depreciation be justified?", options: ["It always lowers taxes", "With rising maintenance costs, it can level total yearly cost", "It’s required by GAAP", "It ignores salvage value"], answer: 1, why: "Better matching in that scenario." },
    { q: "A $2,300,000 building with $300,000 salvage and a 20-year life has annual straight-line depreciation of:", options: ["$115,000", "$100,000", "$130,000", "$2,000,000"], answer: 1, why: "$2,000,000 ÷ 20." },
    { q: "Accumulated depreciation on that building is $1,500,000. Its age is:", options: ["10 years", "13 years", "15 years", "20 years"], answer: 2, why: "$1,500,000 ÷ $100,000." },
    { q: "Salvage value is also called:", options: ["Book value", "Residual value", "Depreciable base", "Fair value"], answer: 1, why: "Same thing." }
  ],

  init: function (root) {
    var M = [0, 10, 20, 30], P = { sl: [25, 25, 25, 25], acc: [40, 30, 20, 10] };
    function draw(k) {
      var d = P[k], h = '<svg viewBox="0 0 420 220" role="img" aria-label="Depreciation and maintenance by year">';
      [0, 20, 40].forEach(function (t) { var y = 190 - t * 3.5; h += '<line x1="40" x2="410" y1="' + y + '" y2="' + y + '" class="dc-grid"/><text x="32" y="' + (y + 4) + '" class="dc-ax" text-anchor="end">$' + t + '</text>'; });
      d.forEach(function (v, i) {
        var x = 70 + i * 90, hd = v * 3.5, hm = M[i] * 3.5;
        h += '<rect x="' + x + '" y="' + (190 - hd) + '" width="50" height="' + hd + '" class="dc-dep"/>';
        h += '<rect x="' + x + '" y="' + (190 - hd - hm) + '" width="50" height="' + hm + '" class="dc-mnt"/>';
        h += '<text x="' + (x + 25) + '" y="' + (184 - hd - hm) + '" class="dc-tot" text-anchor="middle">$' + (v + M[i]) + '</text>';
        h += '<text x="' + (x + 25) + '" y="208" class="dc-ax" text-anchor="middle">Year ' + (i + 1) + '</text>';
      });
      root.querySelector("#dep-chart").innerHTML = h + '</svg><div class="dc-key"><span class="dep">Depreciation</span><span class="mnt">Maintenance</span></div>';
      root.querySelector("#dep-say").innerHTML = k === "sl" ? "Straight-line: $25 of depreciation every year, but rising maintenance makes total cost climb from <b>$25 to $55</b>."
        : "Accelerated: $40, $30, $20, $10 of depreciation plus rising maintenance gives a level <b>$40</b> total every year.";
    }
    root.querySelectorAll("[data-pat]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-pat]").forEach(function (x) { x.classList.toggle("on", x === b); }); draw(b.getAttribute("data-pat")); }); });
    draw("sl");
  }
});

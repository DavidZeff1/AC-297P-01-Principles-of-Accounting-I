/* Lesson 11.3 · Accounting for Asset Exchanges */
HUB.register("11-3", {
  summary: "Trading one asset for another. Exchanges with commercial substance are recorded at fair value, recognizing a gain or loss, and any cash (boot) just adds a line to the entry.",
  objectives: [
    "Explain commercial substance",
    "Record exchanges at fair value with a gain or loss",
    "Handle boot given or received"
  ],
  html: `
<section class="sec" data-toc="Exchanges">
  <div class="eyebrow kind">Concept</div>
  <h2>Trade-ins and swaps</h2>
  <p>Trading in an old car for a new one is a classic exchange. Businesses swap copiers, equipment, even land, sometimes motivated by tax rules (an exchange may not be a taxable event where a cash sale would be). Either way, the accountant must measure it.</p>
  <div class="grid2">
    <div class="tile"><span class="k">Commercial substance</span><p>Future cash flows are expected to change. Record at <b>fair value</b>: one productive asset is liquidated and another takes its place, so the earnings process is complete and a gain or loss is recognized.</p></div>
    <div class="tile alt"><span class="k">No commercial substance</span><p>E.g., two companies swap inventory and neither expects cash flows to change. Gains aren’t recorded; details come in advanced courses.</p></div>
  </div>
</section>

<section class="sec" data-toc="Truck for a boat">
  <div class="eyebrow kind try">Try it</div>
  <h2>Company A trades its truck for a boat</h2>
  <p>The old truck cost <b>$1,000,000</b> with <b>$750,000</b> of accumulated depreciation: a <b>$250,000</b> book value. <b>Boot</b> is extra cash that accompanies an exchange. Set the truck’s fair value and any cash Company A adds.</p>
  <div class="panel"><div data-widget="calc" data-key="ex"></div></div>
  <div data-widget="steps" data-key="cases"></div>
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
    <li><span>Exchanges with <b>commercial substance</b> are recorded at fair value.</span></li>
    <li><span>Gain or loss = fair value of the asset given − its book value.</span></li>
    <li><span><b>Boot</b> (cash) given is credited, boot received is debited; the gain or loss balances the entry.</span></li>
  </ol>
</section>`,

  data: {
    ex: {
      inputs: [
        { id: "fv", label: "Fair value of the old truck", min: 100000, max: 400000, step: 50000, value: 150000, fmt: "$" },
        { id: "b", label: "Cash (boot) Company A adds", min: 0, max: 100000, step: 50000, value: 0, fmt: "$" }
      ],
      run: function (v, money) {
        var boat = v.fv + v.b, gl = v.fv - 250000;
        var lines = [["Boat", boat, 0], ["Accumulated Depreciation", 750000, 0]];
        if (gl < 0) lines.push(["Loss on Exchange", -gl, 0]);
        lines.push(["Truck", 0, 1000000]);
        if (v.b) lines.push(["Cash", 0, v.b]);
        if (gl > 0) lines.push(["Gain on Exchange", 0, gl]);
        var t = '<div class="scroll-x"><table class="journal nodate"><thead><tr><th>Accounts</th><th class="num">Debit</th><th class="num">Credit</th></tr></thead><tbody class="jr-entry">' +
          lines.map(function (l) { return '<tr><td class="jr-acct' + (l[2] ? " cr" : "") + '">' + l[0] + '</td><td class="num">' + (l[1] ? l[1].toLocaleString() : "") + '</td><td class="num">' + (l[2] ? l[2].toLocaleString() : "") + '</td></tr>'; }).join("") + '</tbody></table></div>';
        return { html: '<div class="statement"><div class="st-row"><span class="st-l">Boat recorded at fair value</span><span class="st-b">' + money(boat) + '</span></div><div class="st-row"><span class="st-l">Fair value of truck − $250,000 book value</span><span class="st-b"><span class="uu">' + money(gl) + '</span></span></div></div>' + t,
          say: "The boat is recorded at " + money(boat) + ". " + (gl > 0 ? "A <b>" + money(gl) + " gain</b> is recognized." : gl < 0 ? "A <b>" + money(-gl) + " loss</b> is recognized." : "There’s no gain or loss.") };
      }
    },
    cases: { numbered: false, items: [
      { t: "A: loss implied", b: "<p>Truck (and boat) worth $150,000. The boat is recorded at $150,000, below the truck’s $250,000 book value: a <b>$100,000 loss</b>.</p>" },
      { t: "B: gain implied", b: "<p>Truck (and boat) worth $350,000. The boat is recorded at $350,000, above book value: a <b>$100,000 gain</b>.</p>" },
      { t: "C: boot given", b: "<p>Truck worth $100,000 plus $50,000 cash for a boat worth $150,000. Company A gave up $300,000 of book value and cash ($250,000 + $50,000) for a $150,000 boat: a <b>$150,000 loss</b>, with Cash credited $50,000. Had boot been received, Cash would be debited, shrinking the loss or creating a gain.</p>" }
    ]}
  },

  cards: {
    terms: [
      { term: "Exchange", back: "Trading one asset for another, such as a trade-in." },
      { term: "Commercial substance", back: "An exchange expected to change future cash flows; recorded at fair value with gain or loss." },
      { term: "Boot", back: "Cash or other monetary consideration that accompanies an exchange." },
      { term: "Gain/loss on exchange", back: "Fair value of the asset given up minus its book value." }
    ]
  },

  quiz: [
    { q: "Exchanges with commercial substance are recorded at:", options: ["Book value", "Fair value", "Original cost", "Tax basis"], answer: 1, why: "The earnings process is considered complete." },
    { q: "A truck with $250,000 book value and $150,000 fair value is traded for a boat. The result is a:", options: ["$100,000 gain", "$100,000 loss", "$150,000 loss", "No gain or loss"], answer: 1, why: "$150,000 − $250,000." },
    { q: "Same truck, fair value $350,000. The result is a:", options: ["$100,000 gain", "$100,000 loss", "$350,000 gain", "No gain or loss"], answer: 0, why: "$350,000 − $250,000." },
    { q: "Boot is:", options: ["A type of truck", "Additional cash or consideration in an exchange", "A tax rule", "A loss account"], answer: 1, why: "It adds one more account to the entry." },
    { q: "Truck (book value $250,000, fair value $100,000) plus $50,000 cash for a $150,000 boat. The loss is:", options: ["$50,000", "$100,000", "$150,000", "$200,000"], answer: 2, why: "$300,000 given up for $150,000." },
    { q: "An inventory swap where neither party’s cash flows change lacks:", options: ["Fair value", "Commercial substance", "Boot", "A journal entry"], answer: 1, why: "Gains aren’t recorded on such exchanges." }
  ]
});

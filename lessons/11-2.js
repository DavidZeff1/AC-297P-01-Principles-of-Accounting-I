/* Lesson 11.2 · Disposal of PP&E */
HUB.register("11-2", {
  summary: "When an asset is scrapped or sold, bring depreciation up to date, remove the asset and its accumulated depreciation, and record any gain or loss against book value.",
  objectives: [
    "Update depreciation before recording a disposal",
    "Record the abandonment of an asset",
    "Record a sale at a loss or a gain"
  ],
  html: `
<section class="sec" data-toc="Disposals">
  <div class="eyebrow kind">Concept</div>
  <h2>Abandon, sell, or exchange</h2>
  <p>Assets may be disposed of by <b>abandonment</b>, <b>sale</b>, or <b>exchange</b> (lesson 11.3). In every case, <b>first update depreciation to the disposal date</b>. Only then record the disposal: remove the asset’s cost, remove its accumulated depreciation, and record any cash and any gain or loss.</p>
  <p>Our equipment cost <b>$100,000</b> and has <b>$75,000</b> of accumulated depreciation (updated to today): a <b>$25,000</b> net book value.</p>
</section>

<section class="sec" data-toc="Abandonment">
  <div class="eyebrow kind">Example</div>
  <h2>Scrapping the asset</h2>
  <p>Nothing is received, so the undepreciated $25,000 book value becomes a loss.</p>
  <div data-widget="journal" data-key="aband"></div>
</section>

<section class="sec" data-toc="Sale">
  <div class="eyebrow kind try">Try it</div>
  <h2>Selling the asset</h2>
  <p>Compare the cash received with the $25,000 book value. Sold for $10,000: a $15,000 loss. Sold for $30,000: a $30,000 asset (cash) replaces one reported at $25,000, a $5,000 gain.</p>
  <div class="panel"><div data-widget="calc" data-key="sale"></div></div>
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
    <li><span>Update depreciation to the disposal date first.</span></li>
    <li><span>Remove the asset (credit cost) and its accumulated depreciation (debit).</span></li>
    <li><span>Gain or loss = cash received − net book value. Abandonment produces a loss equal to book value.</span></li>
  </ol>
</section>`,

  data: {
    aband: { entries: [{ date: "", lines: [["Accumulated Depreciation", 75000, 0], ["Loss on Disposal", 25000, 0], ["Equipment", 0, 100000]], memo: "Abandoned equipment" }] },
    sale: {
      inputs: [{ id: "p", label: "Cash received", min: 0, max: 40000, step: 5000, value: 10000, fmt: "$" }],
      run: function (v, money) {
        var gl = v.p - 25000;
        var lines = [["Cash", v.p, 0], ["Accumulated Depreciation", 75000, 0]];
        if (gl < 0) lines.push(["Loss on Sale", -gl, 0]);
        lines.push(["Equipment", 0, 100000]);
        if (gl > 0) lines.push(["Gain on Sale", 0, gl]);
        lines = lines.filter(function (l) { return l[1] || l[2]; });
        var t = '<div class="scroll-x"><table class="journal nodate"><thead><tr><th>Accounts</th><th class="num">Debit</th><th class="num">Credit</th></tr></thead><tbody class="jr-entry">' +
          lines.map(function (l) { return '<tr><td class="jr-acct' + (l[2] ? " cr" : "") + '">' + l[0] + '</td><td class="num">' + (l[1] ? l[1].toLocaleString() : "") + '</td><td class="num">' + (l[2] ? l[2].toLocaleString() : "") + '</td></tr>'; }).join("") + '</tbody></table></div>';
        return { html: '<div class="big-eq" style="font-size:20px">' + money(v.p) + ' − ' + money(25000) + ' book value = <span class="' + (gl >= 0 ? "e" : "l") + '">' + (gl > 0 ? money(gl) + " gain" : gl < 0 ? money(-gl) + " loss" : "no gain or loss") + '</span></div>' + t,
          say: gl > 0 ? "Selling for " + money(v.p) + " gives a <b>" + money(gl) + " gain</b>." : gl < 0 ? "Selling for " + money(v.p) + " gives a <b>" + money(-gl) + " loss</b>." : "Selling for exactly book value gives <b>no gain or loss</b>." };
      }
    }
  },

  cards: {
    terms: [
      { term: "Abandonment", back: "Scrapping an asset; book value not yet depreciated is a loss." },
      { term: "Gain or loss on sale", back: "Cash received minus net book value." },
      { term: "Update depreciation", back: "Record depreciation through the disposal date before recording the disposal." }
    ]
  },

  quiz: [
    { q: "Before recording a disposal, you must:", options: ["Record a gain", "Update depreciation to the disposal date", "Reverse prior depreciation", "Revalue the asset"], answer: 1, why: "Book value must be current." },
    { q: "Equipment costing $100,000 with $75,000 accumulated depreciation is scrapped. The loss is:", options: ["$100,000", "$75,000", "$25,000", "$0"], answer: 2, why: "The undepreciated book value." },
    { q: "The same equipment is sold for $10,000. The result is a:", options: ["$10,000 gain", "$15,000 loss", "$25,000 loss", "$15,000 gain"], answer: 1, why: "$10,000 − $25,000." },
    { q: "It’s sold for $30,000 instead. The result is a:", options: ["$5,000 gain", "$30,000 gain", "$5,000 loss", "$70,000 loss"], answer: 0, why: "$30,000 − $25,000." },
    { q: "In the disposal entry, accumulated depreciation is:", options: ["Credited", "Debited to remove it", "Left on the books", "Added to the gain"], answer: 1, why: "Both the asset and its contra account are removed." }
  ]
});

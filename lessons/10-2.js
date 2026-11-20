/* Lesson 10.2 · Service Life and Cost Allocation */
HUB.register("10-2", {
  summary: "Depreciation allocates cost; it doesn’t measure value. Before computing it, estimate the asset’s service life from physical deterioration, obsolescence, and inadequacy.",
  objectives: [
    "Explain depreciation as allocation, not valuation",
    "Identify the factors that determine service life",
    "Distinguish service life from physical life"
  ],
  html: `
<section class="sec" data-toc="Allocation, not valuation">
  <div class="eyebrow kind">Concept</div>
  <h2>Depreciation is allocation, not valuation</h2>
  <p>In everyday talk, depreciation means losing value or getting used up. In accounting it means <b>allocating an asset’s cost to the periods that benefit from it</b>. It is not an attempt to measure what the asset is worth. Once cost is known, the next step is estimating the periods benefited: the asset’s <b>service life</b>.</p>
</section>

<section class="sec" data-toc="What limits service life">
  <div class="eyebrow kind">Concept</div>
  <h2>Three factors limit service life</h2>
  <div class="grid3">
    <div class="tile"><span class="k">Physical deterioration</span><p>Wear and tear eventually makes an asset useless. It sets the <b>outer limit</b> on service life.</p></div>
    <div class="tile"><span class="k">Obsolescence</span><p>Technological advances make the asset out of date and less desirable.</p></div>
    <div class="tile"><span class="k">Inadequacy</span><p>The asset is no longer fast enough or large enough to meet the company’s competitive and productive needs.</p></div>
  </div>
  <p>Sometimes all three matter; sometimes one controls. <b>Service life can be very different from physical life</b>: computers are routinely replaced while they still work fine. And some assets, notably <b>land</b>, have an indefinite life and aren’t depreciated.</p>
  <div class="panel">
    <div class="panel-title"><h3>What’s ending its service life?</h3></div>
    <div data-widget="sorter" data-key="why"></div>
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
    <li><span>Depreciation allocates cost to periods benefited; it doesn’t value the asset.</span></li>
    <li><span>Service life depends on <b>physical deterioration</b>, <b>obsolescence</b>, and <b>inadequacy</b>.</span></li>
    <li><span>Service life can be shorter than physical life. Land isn’t depreciated.</span></li>
  </ol>
</section>`,

  sorters: {
    why: {
      categories: [{ id: "phys", label: "Deterioration" }, { id: "obs", label: "Obsolescence" }, { id: "inad", label: "Inadequacy" }],
      items: [
        { text: "A delivery truck’s engine and frame are worn out after 300,000 miles", cat: "phys", why: "Wear and tear." },
        { text: "Office laptops still work but can’t run the new software", cat: "obs", why: "Technology moved on." },
        { text: "A warehouse is too small for the company’s growing volume", cat: "inad", why: "No longer big enough for the company’s needs." },
        { text: "A printing press is replaced by a far faster digital model", cat: "obs", why: "Technological advance made it outdated." },
        { text: "A conveyor belt can’t keep up with demand after the company doubles output", cat: "inad", why: "Not fast enough for productive needs." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Depreciation (accounting)", back: "Allocation of an asset’s cost to the periods benefited, not a valuation." },
      { term: "Service life", back: "The period an asset is useful to the company." },
      { term: "Physical deterioration", back: "Wear and tear; sets the outer limit on service life." },
      { term: "Obsolescence", back: "Shortened service life from technological advances." },
      { term: "Inadequacy", back: "An asset no longer fast enough or large enough for the company’s needs." }
    ]
  },

  quiz: [
    { q: "In accounting, depreciation is best described as:", options: ["A decline in market value", "Allocation of cost to the periods benefited", "A cash reserve for replacement", "A valuation of the asset"], answer: 1, why: "Allocation, not valuation." },
    { q: "Which factor sets the outer limit on service life?", options: ["Obsolescence", "Inadequacy", "Physical deterioration", "Inflation"], answer: 2, why: "Eventually wear and tear makes it useless." },
    { q: "A computer replaced because newer models are far better is an example of:", options: ["Physical deterioration", "Obsolescence", "Inadequacy", "Impairment"], answer: 1, why: "Technological advance." },
    { q: "A factory that’s too small for the company’s needs illustrates:", options: ["Obsolescence", "Inadequacy", "Deterioration", "Depletion"], answer: 1, why: "Not large enough." },
    { q: "Which asset is not depreciated?", options: ["Building", "Land", "Equipment", "Parking lot"], answer: 1, why: "Land has an indefinite life." }
  ]
});

/* Lesson 10.1 · What Costs Are Included in PP&E? */
HUB.register("10-1", {
  summary: "Which costs become part of a long-lived asset and which are expensed: capital expenditures, land vs. land improvements, interest and training, lump-sum purchases, and materiality.",
  objectives: [
    "Describe the PP&E section of the balance sheet",
    "Distinguish capital expenditures from expenses",
    "Separate land from land improvements",
    "Allocate a lump-sum purchase price"
  ],
  html: `
<section class="sec" data-toc="The PP&E section">
  <div class="eyebrow kind">Concept</div>
  <h2>Assets used in operations</h2>
  <p><b>Property, plant, and equipment (PP&amp;E)</b> are physical assets used productively in the business: land, buildings, equipment. Idle facilities and land held for speculation belong elsewhere, such as long-term investments. Within PP&amp;E, items are listed by expected life: land, then buildings, then equipment. Manufacturers and real estate companies may have huge PP&amp;E; service and knowledge businesses may have little.</p>
  <div data-widget="statement" data-key="ppe"></div>
  <p class="hint">Many companies show a single “property, plant, and equipment, net of accumulated depreciation” line and put this detail in a note.</p>
</section>

<section class="sec" data-toc="Capital expenditures">
  <div class="eyebrow kind try">Example</div>
  <h2>Ordinary and necessary costs to get it ready</h2>
  <p>An asset’s cost includes everything <b>ordinary and necessary</b> to get it in place and in condition for its intended use: purchase price less discounts, permits, freight, ordinary installation, initial setup, calibration, and programming. These are <b>capital expenditures</b>. Costs that aren’t ordinary and necessary, or benefit only the current period, are expensed.</p>
  <div class="panel"><div data-widget="worked" data-key="lathe"></div></div>
  <div class="grid2">
    <div class="tile"><span class="k">Interest</span><p>Interest on money borrowed to <b>buy</b> PP&amp;E is expensed. Exception: interest during active <b>construction</b> of plant and equipment is capitalized (detailed rules come in intermediate accounting).</p></div>
    <div class="tile alt"><span class="k">Training</span><p>Usually expensed: the training belongs to the employee, not the machine, and the company doesn’t own its employees. Rarely, highly specialized, company-specific training that benefits many periods is capitalized.</p></div>
  </div>
</section>

<section class="sec" data-toc="Land vs. improvements">
  <div class="eyebrow kind">Concept</div>
  <h2>Land vs. land improvements</h2>
  <div class="grid2">
    <div class="tile"><span class="k">Land (not depreciated)</span><p>Purchase price, title and legal fees, surveys, zoning fees, and site preparation: grading, draining, and razing an old structure. Land has an indefinite life.</p></div>
    <div class="tile alt"><span class="k">Land improvements (depreciated)</span><p>Parking lots, sidewalks, landscaping, irrigation systems. These wear out, which is why they’re kept separate from land.</p></div>
  </div>
  <div class="panel">
    <div class="panel-title"><h3>Where does each cost go?</h3></div>
    <div data-widget="sorter" data-key="where"></div>
  </div>
</section>

<section class="sec" data-toc="Lump-sum purchases">
  <div class="eyebrow kind try">Try it</div>
  <h2>Allocating a lump-sum price</h2>
  <p>A company may buy a whole facility (land, building, and equipment) for one “turnkey” price. The total must be allocated to the pieces in proportion to their estimated values. Dibitanzl buys Malloy’s plant. Bought separately, the land would be worth $500,000, the building $750,000, and the equipment $1,250,000: $2,500,000 in all.</p>
  <div class="panel"><div data-widget="calc" data-key="lump"></div></div>
  <p>This allocation isn’t used if the package is a <b>business</b>; that was Chapter 9’s consolidation.</p>
  <div class="callout analogy">
    <div class="label">Judgment matters</div>
    <p>The values were estimates, and different estimates would shift the split. That matters: land isn’t depreciated, and buildings and equipment depreciate at different rates, so the allocation shapes future depreciation and income, which investors watch closely.</p>
  </div>
</section>

<section class="sec" data-toc="Materiality">
  <div class="eyebrow kind">Concept</div>
  <h2>Small items: just expense them</h2>
  <p>Trash cans and telephones last years, but tracking and depreciating them costs more than it’s worth. Many businesses expense small items immediately. Either way, it won’t affect anyone’s decisions about the company: that’s <b>materiality</b>, another call for professional judgment.</p>
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
    <li><span>PP&amp;E: productive physical assets, listed land, buildings, equipment.</span></li>
    <li><span>Capitalize ordinary and necessary costs to get the asset in place and in condition for use; expense abnormal costs.</span></li>
    <li><span>Interest to buy PP&amp;E and training are usually expensed; interest during construction is capitalized.</span></li>
    <li><span>Land (with site prep) isn’t depreciated; land improvements are.</span></li>
    <li><span>Allocate lump-sum prices by relative value; expense immaterial items.</span></li>
  </ol>
</section>`,

  data: {
    ppe: { entity: "Example Company", title: "Property, plant, and equipment (excerpt)", date: "December 31, 20X5", cols: 2, rows: [
      { l: "Land", b: 200000 },
      { l: "Land improvements", a: 80000, ind: 1 }, { l: "Less: Accumulated depreciation", a: -30000, ind: 1, ua: true }, { l: "Net land improvements", b: 50000 },
      { l: "Buildings", a: 1500000, ind: 1 }, { l: "Less: Accumulated depreciation", a: -400000, ind: 1, ua: true }, { l: "Net buildings", b: 1100000 },
      { l: "Equipment", a: 700000, ind: 1 }, { l: "Less: Accumulated depreciation", a: -250000, ind: 1, ua: true }, { l: "Net equipment", b: 450000, ub: true },
      { l: "Total property, plant, and equipment", b: 1800000, bold: true, uub: true }
    ]},
    lathe: {
      q: "<p>Pechlat buys a lathe listed at $90,000, negotiating a 10% discount. It pays $5,000 for freight and installation. During installation the spindle is bent and replaced for $2,000. Record it.</p>",
      steps: [
        "Price after discount: $90,000 × 90% = <b>$81,000</b>.",
        "Freight and installation are ordinary and necessary: add <b>$5,000</b>. Equipment cost = <b>$86,000</b>.",
        "Repairing abnormal damage during installation is not ordinary and necessary: <b>expense the $2,000</b>."
      ],
      answer: '<div data-widget="journal" data-key="latheJ"></div>'
    },
    latheJ: { entries: [{ date: "", lines: [["Equipment", 86000, 0], ["Repair Expense", 2000, 0], ["Cash", 0, 88000]], memo: "Purchased and installed lathe; repaired spindle bent during installation" }] },
    lump: {
      inputs: [{ id: "p", label: "Lump-sum purchase price", min: 1500000, max: 2500000, step: 250000, value: 2000000, fmt: "$" }],
      run: function (v, money) {
        var r = v.p / 2500000, L = 500000 * r, B = 750000 * r, E = 1250000 * r;
        return { html: '<div class="split-bar"><span class="sb-b" style="width:20%">Land</span><span class="sb-a" style="width:30%;background:var(--mgr-soft);color:var(--mgr)">Building</span><span class="sb-a" style="width:50%">Equipment</span></div>' +
          '<div class="statement"><div class="st-row"><span class="st-l">Land: 20% of ' + money(v.p) + '</span><span class="st-b">' + money(L) + '</span></div><div class="st-row"><span class="st-l">Building: 30%</span><span class="st-b">' + money(B) + '</span></div><div class="st-row"><span class="st-l">Equipment: 50%</span><span class="st-b"><span class="u">' + money(E) + '</span></span></div><div class="st-row bold"><span class="st-l">Total</span><span class="st-b"><span class="uu">' + money(v.p) + '</span></span></div></div>',
          say: "The price is " + Math.round(r * 100) + " percent of the $2,500,000 total value, so land gets " + money(L) + ", the building " + money(B) + ", and equipment <b>" + money(E) + "</b>." };
      }
    }
  },

  sorters: {
    where: {
      categories: [{ id: "land", label: "Land" }, { id: "imp", label: "Land improvements" }, { id: "exp", label: "Expense" }],
      items: [
        { text: "Legal fees and title search to buy a lot", cat: "land", why: "Ordinary and necessary to acquire the land." },
        { text: "Tearing down an old building on the lot", cat: "land", why: "Site preparation is a land cost." },
        { text: "Paving a parking lot", cat: "imp", why: "It wears out, so it’s a depreciable land improvement." },
        { text: "Installing an irrigation system", cat: "imp", why: "A depreciable land improvement." },
        { text: "Grading and draining the site", cat: "land", why: "Site preparation." },
        { text: "Fixing a machine damaged when the forklift dropped it during delivery", cat: "exp", why: "Abnormal damage isn’t ordinary and necessary." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Property, plant, and equipment", back: "Physical assets used productively in operations: land, buildings, equipment." },
      { term: "Capital expenditure", back: "A cost added to an asset account because it’s ordinary and necessary to get the asset ready for use." },
      { term: "Land improvements", back: "Depreciable improvements such as parking lots, sidewalks, landscaping, irrigation." },
      { term: "Capitalized interest", back: "Interest during active construction of plant and equipment, added to the asset’s cost." },
      { term: "Lump-sum acquisition", back: "Buying several assets for one price, allocated by relative value." },
      { term: "Materiality (PP&E)", back: "Small long-lived items may be expensed because it won’t affect decisions." }
    ]
  },

  quiz: [
    { q: "Land held for speculation is reported in:", options: ["PP&E", "Long-term investments", "Current assets", "Intangible assets"], answer: 1, why: "PP&E is for assets used in operations." },
    { q: "A lathe lists for $90,000 with a 10% discount, plus $5,000 freight and installation. Its cost is:", options: ["$95,000", "$86,000", "$88,000", "$90,000"], answer: 1, why: "$81,000 + $5,000." },
    { q: "Repairing damage caused during installation is:", options: ["Capitalized", "Expensed", "Added to land", "Ignored"], answer: 1, why: "Abnormal costs aren’t ordinary and necessary." },
    { q: "Interest on a loan used to buy equipment is normally:", options: ["Capitalized", "Expensed", "Added to land", "A contra asset"], answer: 1, why: "Only interest during construction is capitalized." },
    { q: "Which is a land improvement?", options: ["Title fees", "Razing an old building", "A parking lot", "Grading"], answer: 2, why: "Parking lots wear out and are depreciated." },
    { q: "Land worth $500,000, building $750,000, equipment $1,250,000; lump-sum price $2,000,000. Land’s cost is:", options: ["$500,000", "$400,000", "$666,667", "$625,000"], answer: 1, why: "$2,000,000 × 20%." },
    { q: "Why does the lump-sum allocation matter?", options: ["It doesn’t", "Land isn’t depreciated and other assets depreciate at different rates, affecting future income", "It changes the purchase price", "It determines taxes only"], answer: 1, why: "The split shapes future depreciation." },
    { q: "A company expenses a $40 trash can rather than depreciating it because of:", options: ["Conservatism", "Materiality", "Matching", "Periodicity"], answer: 1, why: "The amount won’t affect decisions." }
  ]
});

/* Lesson 11.1 · Costs Subsequent to Asset Acquisition */
HUB.register("11-1", {
  summary: "After an asset is bought, which later costs are capitalized and which are expensed? Routine upkeep is expensed; restorations and improvements that add future benefits are capitalized.",
  objectives: [
    "Apply the criteria for capitalizing costs after acquisition",
    "Distinguish routine maintenance, restorations, and betterments",
    "Record a restoration by debiting accumulated depreciation",
    "Record a betterment by debiting the asset"
  ],
  html: `
<section class="sec" data-toc="Capital or revenue expenditure">
  <div class="eyebrow kind">Concept</div>
  <h2>Do future benefits result?</h2>
  <p>Most PP&amp;E needs ongoing spending to stay in good order. A later cost is a <b>capital expenditure</b> (capitalized) if it produces future economic benefits by:</p>
  <div class="grid3">
    <div class="tile"><span class="k">Prolonging</span><p>the asset’s service life,</p></div>
    <div class="tile"><span class="k">Increasing</span><p>the quantity of services expected, or</p></div>
    <div class="tile"><span class="k">Improving</span><p>the quality of services expected.</p></div>
  </div>
  <p>Otherwise it’s a <b>revenue expenditure</b>, expensed as incurred. Judgment is required. Read literally, even fueling a car “extends its life,” but that misses the intent: <b>routine</b> costs to maintain normal operating condition are expensed. The capitalization criteria aim at <b>nonrecurring</b> costs.</p>
</section>

<section class="sec" data-toc="Restore or improve">
  <div class="eyebrow kind">Concept</div>
  <h2>Restoration vs. betterment</h2>
  <div class="grid2">
    <div class="tile"><span class="k">Restoration</span><p>Restores some of the original condition, like replacing a truck’s worn-out engine. It’s like “un-depreciating” the asset, so debit <b>Accumulated Depreciation</b>, which raises book value.</p></div>
    <div class="tile alt"><span class="k">Betterment</span><p>Improves the asset beyond its original condition. Debit the <b>asset account</b> directly.</p></div>
  </div>
  <div class="grid2">
    <div data-widget="journal" data-key="restore"></div>
    <div data-widget="journal" data-key="better"></div>
  </div>
  <div class="panel">
    <div class="panel-title"><h3>Expense, restoration, or betterment?</h3></div>
    <div data-widget="sorter" data-key="kind"></div>
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
    <li><span>Capitalize later costs that prolong life, increase quantity, or improve quality of service.</span></li>
    <li><span>Routine maintenance is a revenue expenditure: expense it.</span></li>
    <li><span><b>Restoration</b>: debit Accumulated Depreciation. <b>Betterment</b>: debit the asset.</span></li>
  </ol>
</section>`,

  data: {
    restore: { entries: [{ date: "", lines: [["Accumulated Depreciation", 8000, 0], ["Cash", 0, 8000]], memo: "Restoration: replaced the truck’s worn-out engine" }] },
    better: { entries: [{ date: "", lines: [["Truck", 6000, 0], ["Cash", 0, 6000]], memo: "Betterment: added a hydraulic lift the truck never had" }] }
  },

  sorters: {
    kind: {
      categories: [{ id: "exp", label: "Expense" }, { id: "res", label: "Restoration" }, { id: "bet", label: "Betterment" }],
      items: [
        { text: "Regular oil changes and fuel for the delivery van", cat: "exp", why: "Routine upkeep to maintain normal condition." },
        { text: "Replacing a truck’s worn-out engine with a comparable one", cat: "res", why: "Restores original condition: debit Accumulated Depreciation." },
        { text: "Adding a second story to a warehouse", cat: "bet", why: "Increases the quantity of service beyond the original." },
        { text: "Repainting an office", cat: "exp", why: "Routine maintenance." },
        { text: "Rebuilding a machine’s worn components to extend its life", cat: "res", why: "Restores condition and prolongs life." },
        { text: "Upgrading a production line to a faster, more precise system", cat: "bet", why: "Improves quality and quantity beyond the original." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Capital expenditure (subsequent)", back: "A later cost that prolongs life, increases quantity, or improves quality of service; capitalized." },
      { term: "Revenue expenditure", back: "A cost that doesn’t meet the criteria, such as routine maintenance; expensed as incurred." },
      { term: "Restoration", back: "Restoring original condition; recorded as a debit to Accumulated Depreciation." },
      { term: "Betterment", back: "Improving an asset beyond its original condition; recorded as a debit to the asset." }
    ]
  },

  quiz: [
    { q: "Which later cost should be capitalized?", options: ["Routine oil changes", "A cost that prolongs the asset’s service life", "Fuel", "Cleaning"], answer: 1, why: "Prolonging life is one of the three criteria." },
    { q: "Routine maintenance is a:", options: ["Capital expenditure", "Revenue expenditure (expensed)", "Betterment", "Restoration"], answer: 1, why: "It maintains normal operating condition." },
    { q: "Replacing a truck’s worn engine is recorded with a debit to:", options: ["Repair Expense", "Accumulated Depreciation", "Truck", "Cash"], answer: 1, why: "A restoration “un-depreciates” the asset." },
    { q: "Improving an asset beyond its original condition is recorded with a debit to:", options: ["Accumulated Depreciation", "The asset account", "Expense", "Retained Earnings"], answer: 1, why: "That’s a betterment." },
    { q: "Debiting Accumulated Depreciation for a restoration:", options: ["Lowers book value", "Raises book value", "Has no effect on book value", "Creates a gain"], answer: 1, why: "Less accumulated depreciation means higher net book value." }
  ]
});

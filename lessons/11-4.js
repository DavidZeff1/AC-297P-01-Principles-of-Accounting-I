/* Lesson 11.4 · Asset Impairment */
HUB.register("11-4", {
  summary: "When an asset can no longer generate enough cash to recover its book value, it’s impaired: write it down to fair value and depreciate the new amount.",
  objectives: [
    "Define impairment",
    "Apply the U.S. recoverability test, then measure the loss at fair value",
    "Recognize signs that an asset may be impaired"
  ],
  html: `
<section class="sec" data-toc="What impairment is">
  <div class="eyebrow kind">Concept</div>
  <h2>When book value can’t be recovered</h2>
  <p>An <b>impairment</b> occurs when a long-lived asset’s (or asset group’s) carrying amount isn’t recoverable from expected future cash flows: the owner no longer expects to get enough cash out of it to recapture its net book value. A loss is recognized to reduce the asset to its <b>fair value</b> (debit loss, credit the asset). The written-down amount is depreciated over the remaining life.</p>
  <div class="grid2">
    <div class="tile"><span class="k">Signs to watch for</span><ul><li>A significant drop in market value</li><li>Unexpected decline in physical condition</li><li>No longer used as intended</li><li>Legal or regulatory obstacles</li><li>The business itself threatened by poor performance</li></ul></div>
    <div class="tile alt"><span class="k">U.S. vs. global</span><p>U.S. rules first ask whether expected cash flows recover book value; only then is the loss measured at fair value. Global standards use a more restrictive fair value test. Either way, judgment is involved.</p></div>
  </div>
</section>

<section class="sec" data-toc="Test an asset">
  <div class="eyebrow kind try">Try it</div>
  <h2>Is this machine impaired?</h2>
  <p>A machine cost $500,000 and has $200,000 of accumulated depreciation: a <b>$300,000</b> book value.</p>
  <div class="panel"><div data-widget="calc" data-key="imp"></div></div>
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
    <li><span>Impaired: expected future cash flows can’t recover book value (U.S. test).</span></li>
    <li><span>Loss = book value − fair value; debit Loss on Impairment, credit the asset.</span></li>
    <li><span>Depreciate the reduced carrying value over the remaining life.</span></li>
  </ol>
</section>`,

  data: {
    imp: {
      inputs: [
        { id: "cf", label: "Expected future cash flows from the machine", min: 150000, max: 400000, step: 50000, value: 250000, fmt: "$" },
        { id: "fv", label: "Fair value of the machine", min: 100000, max: 300000, step: 40000, value: 180000, fmt: "$" }
      ],
      run: function (v, money) {
        var imp = v.cf < 300000, loss = imp ? Math.max(0, 300000 - v.fv) : 0;
        return { html: '<div class="statement"><div class="st-row"><span class="st-l">Step 1: cash flows vs. $300,000 book value</span><span class="st-b">' + (imp ? "Not recoverable" : "Recoverable") + '</span></div><div class="st-row bold"><span class="st-l">Step 2: impairment loss (book value − fair value)</span><span class="st-b"><span class="uu">' + (imp ? money(loss) : "None") + '</span></span></div></div>',
          say: imp ? "Expected cash flows of " + money(v.cf) + " don’t recover the $300,000 book value, so the machine is impaired: write it down to " + money(v.fv) + ", a <b>" + money(loss) + " loss</b>." : "Expected cash flows of " + money(v.cf) + " recover the book value, so <b>no impairment</b> is recorded." };
      }
    }
  },

  cards: {
    terms: [
      { term: "Impairment", back: "When a long-lived asset’s carrying amount isn’t recoverable from expected future cash flows." },
      { term: "Recoverability test (U.S.)", back: "Compare expected future cash flows with book value; if lower, the asset is impaired." },
      { term: "Impairment loss", back: "Book value minus fair value; debit loss, credit the asset." }
    ]
  },

  quiz: [
    { q: "An asset is impaired when:", options: ["Its market value rises", "Its carrying amount isn’t recoverable from expected future cash flows", "It’s fully depreciated", "It’s sold"], answer: 1, why: "That’s the definition." },
    { q: "Book value $300,000; expected cash flows $250,000; fair value $180,000. The impairment loss is:", options: ["$50,000", "$120,000", "$70,000", "$0"], answer: 1, why: "$300,000 − $180,000." },
    { q: "Book value $300,000; expected cash flows $350,000. Under U.S. rules:", options: ["Record a $50,000 gain", "No impairment is recorded", "Record a loss to fair value", "Revalue upward"], answer: 1, why: "The cash flows recover book value." },
    { q: "After an impairment write-down, the asset’s new carrying value is:", options: ["Never depreciated", "Depreciated over its remaining life", "Expensed immediately", "Restored next year"], answer: 1, why: "It becomes the new basis." },
    { q: "Which could signal impairment?", options: ["Rising sales", "A significant drop in the asset’s market value", "Routine maintenance", "A dividend"], answer: 1, why: "One of the listed indicators." }
  ]
});

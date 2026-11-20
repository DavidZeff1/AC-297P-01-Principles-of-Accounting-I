/* Lesson 10.5 · Tax Laws */
HUB.register("10-5", {
  summary: "Tax depreciation and book depreciation often differ. Governments use fast tax write-offs to encourage investment, and companies keep records of the differences.",
  objectives: [
    "Explain why tax and financial accounting depreciation differ",
    "Describe MACRS in general terms",
    "Explain why companies track book-tax differences"
  ],
  html: `
<section class="sec" data-toc="Two sets of rules">
  <div class="eyebrow kind">Concept</div>
  <h2>Tax rules aren’t accounting rules</h2>
  <p>Tax methods and financial accounting methods aren’t always the same, especially for depreciation. When the economy slows, governments often encourage investment by allowing <b>rapid tax depreciation</b>, sometimes even an immediate write-off. Bigger deductions reduce taxable income and taxes, a strong incentive to buy equipment.</p>
  <div class="grid2">
    <div class="tile"><span class="k">Financial accounting</span><p>Measures economic activity, assigning revenues and costs to the right periods.</p></div>
    <div class="tile alt"><span class="k">Tax law</span><p>Must be followed as written, and is often changed to meet the government’s revenue or social goals.</p></div>
  </div>
</section>

<section class="sec" data-toc="MACRS">
  <div class="eyebrow kind">Concept</div>
  <h2>MACRS</h2>
  <p>U.S. tax depreciation rules have changed many times, so generalizing is hard. One system is the <b>Modified Accelerated Cost Recovery System (MACRS)</b>, pronounced “makers.” It has a general and an alternative system, with provisions for 200% declining balance, 150% declining balance, and straight-line.</p>
  <p>Tax codes typically <b>specify</b> asset lives instead of leaving them to the taxpayer, identifying assets and their lives in detail. They tend to favor taxpayers, so tax depreciation usually runs faster than GAAP depreciation.</p>
</section>

<section class="sec" data-toc="Keeping track">
  <div class="eyebrow kind">Concept</div>
  <h2>Living with the differences</h2>
  <p>Is it troubling to use one method for the books and another for taxes? Not really: the two systems have different purposes. But the result is temporary (and sometimes not-so-temporary) differences between accounting and tax measurements. Companies must keep records of these differences, which makes accounting for a complex business even more challenging.</p>
  <div class="panel">
    <div class="panel-title"><h3>Book or tax?</h3><span class="hint">Which set of rules does each describe?</span></div>
    <div data-widget="sorter" data-key="bt"></div>
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
    <li><span>Tax and book depreciation often differ; governments use fast tax depreciation to spur investment.</span></li>
    <li><span><b>MACRS</b> is a U.S. tax system using declining balance and straight-line methods with lives set by the tax code.</span></li>
    <li><span>Tax depreciation is usually faster than GAAP depreciation.</span></li>
    <li><span>Companies must track book-tax differences.</span></li>
  </ol>
</section>`,

  sorters: {
    bt: {
      categories: [{ id: "book", label: "Financial (GAAP)" }, { id: "tax", label: "Tax" }],
      items: [
        { text: "Asset lives are specified in a code, not estimated by the company", cat: "tax", why: "Tax codes stipulate lives." },
        { text: "The goal is to match costs with the periods benefited", cat: "book", why: "That’s financial accounting’s purpose." },
        { text: "Rules change to stimulate investment in a slowdown", cat: "tax", why: "Tax law serves government objectives." },
        { text: "The company estimates useful life and salvage value", cat: "book", why: "GAAP relies on management’s estimates." },
        { text: "An immediate write-off of new equipment may be allowed", cat: "tax", why: "A tax incentive, not an accounting measurement." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Tax depreciation", back: "Depreciation computed under tax law, often faster than GAAP depreciation." },
      { term: "MACRS", sub: "“makers”", back: "Modified Accelerated Cost Recovery System: U.S. tax depreciation using declining balance and straight-line methods." },
      { term: "Book-tax difference", back: "A difference between financial accounting and tax measurements that must be tracked." }
    ]
  },

  quiz: [
    { q: "Why might a government allow very rapid tax depreciation?", options: ["To raise more tax revenue", "To stimulate investment in equipment", "To match GAAP", "To simplify accounting"], answer: 1, why: "Faster deductions lower taxes and encourage buying assets." },
    { q: "MACRS stands for:", options: ["Modified Accelerated Cost Recovery System", "Managerial Accounting Cost Reporting Standard", "Maximum Asset Cost Recovery Schedule", "Modified Asset Capital Reporting System"], answer: 0, why: "A U.S. tax depreciation system." },
    { q: "Compared with GAAP, tax depreciation typically:", options: ["Is slower", "Is faster", "Is identical", "Is not allowed"], answer: 1, why: "Tax codes tend to favor taxpayers." },
    { q: "Under tax codes, asset lives are usually:", options: ["Estimated by management", "Stipulated by the code", "Ignored", "Set by auditors"], answer: 1, why: "Codes identify assets and their lives." },
    { q: "Using different depreciation methods for books and taxes:", options: ["Is illegal", "Is acceptable, but differences must be tracked", "Requires restating statements", "Is required for all assets"], answer: 1, why: "The systems have different purposes." }
  ]
});

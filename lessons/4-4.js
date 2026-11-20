/* Lesson 4.4 · Classified Balance Sheets */
HUB.register("4-4", {
  summary: "A classified balance sheet groups assets and liabilities into meaningful categories, like current vs. long-term, so readers can analyze a company’s condition. Notes fill in what numbers can’t.",
  objectives: [
    "Name the asset sections of a classified balance sheet",
    "Classify liabilities as current or long-term, including a split note",
    "Describe equity for corporations, proprietorships, and partnerships",
    "Explain the full disclosure principle and the role of notes"
  ],
  html: `
<section class="sec" data-toc="Why classify?">
  <div class="eyebrow kind">Concept</div>
  <h2>Grouping accounts makes analysis possible</h2>
  <p>Remember, not everything on a balance sheet is at fair value: some assets are at historical cost, and some, like a brand name or internally developed patents, aren’t reported at all. Even so, the balance sheet is essential for judging financial condition. To help, accountants divide it into categories with subtotals. The result is a <b>classified balance sheet</b>.</p>
</section>

<section class="sec" data-toc="Asset sections">
  <div class="eyebrow kind">Concept</div>
  <h2>Up to five asset sections</h2>
  <div data-widget="steps" data-key="assets"></div>
  <div class="callout def">
    <div class="label">The operating cycle</div>
    <p>The time it takes to turn cash back into cash: buy inventory, sell it on account, collect the receivable. It’s usually less than a year. “Current” means within <b>one year or the operating cycle, whichever is longer</b>.</p>
  </div>
  <div class="panel">
    <div class="panel-title"><h3>Which asset section?</h3><span class="hint">Classify each item</span></div>
    <div data-widget="sorter" data-key="aSort"></div>
  </div>
</section>

<section class="sec" data-toc="Liabilities and equity">
  <div class="eyebrow kind">Concept</div>
  <h2>Current and long-term liabilities</h2>
  <div class="grid2">
    <div class="tile warn"><span class="k">Current liabilities</span><p>Obligations to be paid within one year or the operating cycle, whichever is longer. Normally paid with current assets.</p></div>
    <div class="tile warn"><span class="k">Long-term liabilities</span><p>Everything else: bank loans, mortgage notes, certain deferred taxes.</p></div>
  </div>
  <div class="panel"><div data-widget="worked" data-key="split"></div></div>
  <h3>Equity depends on the form of business</h3>
  <div class="grid3">
    <div class="tile alt"><span class="k">Corporation</span><p><b>Capital stock</b> (amounts received from investors for transferable shares; later chapters add preferred stock, common stock, paid-in capital) and <b>retained earnings</b> (accumulated income less dividends, plowed back into the business).</p></div>
    <div class="tile alt"><span class="k">Sole proprietorship</span><p>A single owner’s capital account. Everything else on the balance sheet looks the same.</p></div>
    <div class="tile alt"><span class="k">Partnership</span><p>A separate capital account for each partner.</p></div>
  </div>
  <p>Newer forms like LLCs and LLPs, and different terms around the world, change the equity labels but not the overall structure.</p>
</section>

<section class="sec" data-toc="Classy Company">
  <div class="eyebrow kind">Example</div>
  <h2>Classy Company’s classified balance sheet</h2>
  <div data-widget="statement" data-key="classy"></div>
</section>

<section class="sec" data-toc="Notes">
  <div class="eyebrow kind">Concept</div>
  <h2>Notes tell the rest of the story</h2>
  <p>Many important facts can’t be expressed in money on the balance sheet. <b>Notes to the financial statements</b> describe accounting policies, major events, pending lawsuits, and other matters. The <b>full disclosure principle</b> requires that the statements and notes include every fact that would influence investors’ and creditors’ judgments. The notes are often longer than the statements themselves.</p>
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
    <li><span>Asset sections: <b>current assets</b> (most liquid first), <b>long-term investments</b>, <b>property, plant, and equipment</b>, <b>intangibles</b>, and <b>other assets</b>.</span></li>
    <li><span>Current means within one year or the operating cycle, whichever is longer.</span></li>
    <li><span>Liabilities are <b>current</b> or <b>long-term</b>; next year’s principal on a long-term note is current.</span></li>
    <li><span>Corporate equity: capital stock and retained earnings. Proprietorships and partnerships use capital accounts.</span></li>
    <li><span><b>Full disclosure</b>: notes report everything that would influence users’ judgments.</span></li>
  </ol>
</section>`,

  data: {
    assets: { items: [
      { t: "Current assets", b: "<p>Cash and assets that will be converted to cash or consumed within one year or the operating cycle, whichever is longer. List the most liquid first: cash, short-term investments, receivables, then inventories and prepaid expenses.</p>" },
      { t: "Long-term investments", b: "<p>Land bought for speculation, funds set aside for a plant expansion, the cash surrender value of life insurance, and investments in other entities.</p>" },
      { t: "Property, plant, and equipment", b: "<p>Land, buildings, and equipment productively in use by the company.</p>" },
      { t: "Intangible assets", b: "<p>Assets without physical existence: purchased patents and copyrights, franchise rights, and <b>goodwill</b>, the amount by which the price of an acquired business exceeds the fair value of its identifiable net assets.</p>" },
      { t: "Other assets", b: "<p>Assets that don’t fit elsewhere, such as a special long-term receivable.</p>" }
    ]},
    split: {
      q: "<p>Classy owes a <b>$400,000</b> note payable. <b>$50,000</b> of principal is due within the next year; the rest is due later. How is it classified?</p>",
      steps: [
        "Principal due within one year (or the operating cycle, if longer) is a <b>current liability</b>: $50,000.",
        "The remaining $400,000 − $50,000 = <b>$350,000</b> is due after that, so it’s a <b>long-term liability</b>."
      ],
      answer: "<p>Current portion of note payable $50,000; long-term note payable $350,000.</p>"
    },
    classy: { entity: "Classy Company", title: "Balance Sheet", date: "December 31, 20X5", cols: 2, rows: [
      { l: "Current assets", head: true },
      { l: "Cash", a: 100000, ind: 1 },
      { l: "Short-term investments", a: 50000, ind: 1 },
      { l: "Accounts receivable", a: 75000, ind: 1 },
      { l: "Inventory", a: 200000, ind: 1 },
      { l: "Prepaid expenses", a: 25000, ind: 1, ua: true },
      { l: "Total current assets", b: 450000 },
      { l: "Long-term investments", head: true },
      { l: "Land held for speculation", b: 100000 },
      { l: "Property, plant, and equipment", head: true },
      { l: "Land", a: 125000, ind: 1 },
      { l: "Building and equipment", a: 600000, ind: 1 },
      { l: "Less: Accumulated depreciation", a: -200000, ind: 1, ua: true },
      { l: "Total property, plant, and equipment", b: 525000 },
      { l: "Intangible assets", head: true },
      { l: "Patents and goodwill", b: 75000 },
      { l: "Other assets", head: true },
      { l: "Long-term receivable", b: 25000, ub: true },
      { l: "Total assets", b: 1175000, bold: true, uub: true },
      { gap: true },
      { l: "Current liabilities", head: true },
      { l: "Accounts payable", a: 80000, ind: 1 },
      { l: "Salaries payable", a: 20000, ind: 1 },
      { l: "Current portion of note payable", a: 50000, ind: 1, ua: true },
      { l: "Total current liabilities", b: 150000 },
      { l: "Long-term liabilities", head: true },
      { l: "Note payable", b: 350000, ub: true },
      { l: "Total liabilities", b: 500000 },
      { l: "Stockholders’ equity", head: true },
      { l: "Capital stock", a: 400000, ind: 1 },
      { l: "Retained earnings", a: 275000, ind: 1, ua: true },
      { l: "Total stockholders’ equity", b: 675000, ub: true },
      { l: "Total liabilities and equity", b: 1175000, bold: true, uub: true }
    ]}
  },

  sorters: {
    aSort: {
      categories: [{ id: "ca", label: "Current" }, { id: "lti", label: "LT investment" }, { id: "ppe", label: "PP&E" }, { id: "int", label: "Intangible" }],
      items: [
        { text: "Accounts receivable from customers", cat: "ca", why: "Receivables convert to cash within the operating cycle." },
        { text: "Land purchased to resell later at a profit", cat: "lti", why: "Land held for speculation isn’t used in operations." },
        { text: "The factory building the company operates in", cat: "ppe", why: "Buildings in productive use are PP&E." },
        { text: "A purchased patent", cat: "int", why: "Patents lack physical existence." },
        { text: "Prepaid insurance for the next six months", cat: "ca", why: "Prepaids are consumed within a year." },
        { text: "Cash set aside for a plant expansion in three years", cat: "lti", why: "Funds for a future expansion are a long-term investment." },
        { text: "Goodwill from acquiring another business", cat: "int", why: "Goodwill is an intangible asset." },
        { text: "Delivery equipment", cat: "ppe", why: "Equipment in use is PP&E." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Classified balance sheet", back: "A balance sheet divided into categories with subtotals, such as current and long-term." },
      { term: "Operating cycle", back: "The time to convert cash back into cash: buy inventory, sell it on account, collect." },
      { term: "Current assets", back: "Cash and assets converted to cash or consumed within one year or the operating cycle, whichever is longer." },
      { term: "Long-term investments", back: "Investments such as speculative land, expansion funds, life insurance cash value, and stakes in other entities." },
      { term: "Property, plant, and equipment", back: "Land, buildings, and equipment in productive use." },
      { term: "Intangible assets", back: "Assets lacking physical existence: patents, copyrights, franchises, goodwill." },
      { term: "Goodwill", back: "The excess of an acquired business’s price over the fair value of its identifiable net assets." },
      { term: "Current liabilities", back: "Obligations due within one year or the operating cycle, whichever is longer." },
      { term: "Full disclosure principle", back: "Statements and notes must include all facts that would influence users’ judgments." }
    ]
  },

  quiz: [
    { q: "Current assets are those converted to cash or consumed within:", options: ["Six months", "One year or the operating cycle, whichever is shorter", "One year or the operating cycle, whichever is longer", "Five years"], answer: 2, why: "Whichever is longer." },
    { q: "The operating cycle is:", options: ["One fiscal year", "The time to convert cash back into cash", "The life of a building", "The time between paydays"], answer: 1, why: "Buy inventory, sell on account, collect the cash." },
    { q: "Land purchased for speculation is classified as:", options: ["Property, plant, and equipment", "A long-term investment", "A current asset", "An intangible asset"], answer: 1, why: "It isn’t used in operations." },
    { q: "Which is an intangible asset?", options: ["Inventory", "Goodwill", "Equipment", "Prepaid rent"], answer: 1, why: "Goodwill lacks physical existence." },
    { q: "A $400,000 note with $50,000 due next year is reported as:", options: ["$400,000 current", "$400,000 long-term", "$50,000 current and $350,000 long-term", "$350,000 current and $50,000 long-term"], answer: 2, why: "Next year’s principal is current; the rest is long-term." },
    { q: "In current assets, items are listed:", options: ["Alphabetically", "In order of liquidity, most liquid first", "Largest first", "Any order"], answer: 1, why: "Cash, short-term investments, receivables, then inventories and prepaids." },
    { q: "A sole proprietorship’s equity section shows:", options: ["Capital stock and retained earnings", "A single owner’s capital account", "One capital account per partner", "Only retained earnings"], answer: 1, why: "One owner, one capital account." },
    { q: "The full disclosure principle requires:", options: ["All assets at fair value", "Disclosure of all facts that would influence users’ judgments", "Monthly statements", "Notes shorter than the statements"], answer: 1, why: "Statements plus notes must give a fair presentation." }
  ]
});

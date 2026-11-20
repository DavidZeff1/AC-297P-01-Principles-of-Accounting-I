/* Lesson 9.1 · Nature and Intent-Based Accounting */
HUB.register("9-1", {
  summary: "How an investment is accounted for depends on what it is (debt or equity) and why it’s held. Get the map of methods for the whole chapter.",
  objectives: [
    "Distinguish investments in debt from investments in equity",
    "Match debt investments to trading, available-for-sale, or held-to-maturity",
    "Match equity ownership levels to fair value, the equity method, or consolidation",
    "Describe the fair value option"
  ],
  html: `
<section class="sec" data-toc="Nature and intent">
  <div class="eyebrow kind">Concept</div>
  <h2>What it is, and why you hold it</h2>
  <p>Chapter 6 covered highly liquid investments held to resell soon: current assets at fair value, with changes in income. Many investments are held longer, and the accounting depends on the <b>nature</b> of the investment and the investor’s <b>intent</b>.</p>
  <div class="grid2">
    <div class="tile"><span class="k">Debt</span><p>A <b>bond</b> is a promise (bond) to pay (payable): the issuer gets money now and promises to repay it with interest. Here we take the <b>investor’s</b> view; Chapter 13 covers the issuer.</p></div>
    <div class="tile alt"><span class="k">Equity</span><p>Buying another company’s stock to profit from a rising price, to collect dividends, to gain significant influence, or to take control.</p></div>
  </div>
</section>

<section class="sec" data-toc="The map">
  <div class="eyebrow kind">Concept</div>
  <h2>The chapter on one page</h2>
  <div class="panel scroll-x">
    <table class="plain">
      <thead><tr><th>Investment</th><th>Situation</th><th>Accounting</th><th>Lesson</th></tr></thead>
      <tbody>
        <tr><td rowspan="3"><b>Debt</b></td><td>Trading: seeking gains from near-term price swings</td><td>Fair value; changes in <b>net income</b></td><td>9.2</td></tr>
        <tr><td>Available-for-sale: intend to hold, but willing to sell</td><td>Fair value; changes in <b>other comprehensive income</b></td><td>9.2</td></tr>
        <tr><td>Held-to-maturity: intend to hold until final payment</td><td><b>Amortized cost</b></td><td>9.3</td></tr>
        <tr><td rowspan="3"><b>Equity</b></td><td>Less than about 20%: no significant influence</td><td>Fair value; changes in net income</td><td>9.4</td></tr>
        <tr><td>About 20% to 50%: significant influence</td><td><b>Equity method</b></td><td>9.4</td></tr>
        <tr><td>Over 50%: control (parent and subsidiary)</td><td><b>Consolidation</b></td><td>9.5</td></tr>
      </tbody>
    </table>
  </div>
  <div class="panel">
    <div class="panel-title"><h3>Which method for this equity stake?</h3><span class="hint">Slide the ownership percentage</span></div>
    <div data-widget="calc" data-key="own"></div>
  </div>
  <div class="panel">
    <div class="panel-title"><h3>Which category for this bond?</h3><span class="hint">It depends on intent</span></div>
    <div data-widget="sorter" data-key="debt"></div>
  </div>
</section>

<section class="sec" data-toc="Fair value option">
  <div class="eyebrow kind">Concept</div>
  <h2>The fair value option</h2>
  <p>Companies may <b>elect</b> to measure certain financial assets (and liabilities) at fair value, bypassing the table above except where the equity method or consolidation applies. Unrealized gains and losses then go to operating income, as with Chapter 6’s short-term investments. The choice is <b>irrevocable</b> for that investment, and it reflects the FASB’s continuing shift toward value-based accounting.</p>
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
    <li><span>Accounting for investments depends on their <b>nature</b> (debt or equity) and <b>intent</b>.</span></li>
    <li><span>Debt: <b>trading</b> (fair value, income), <b>available-for-sale</b> (fair value, OCI), <b>held-to-maturity</b> (amortized cost).</span></li>
    <li><span>Equity: under ~20% fair value; ~20–50% <b>equity method</b>; over 50% <b>consolidation</b>.</span></li>
    <li><span>The <b>fair value option</b> is an irrevocable election to use fair value through income.</span></li>
  </ol>
</section>`,

  data: {
    own: {
      inputs: [{ id: "p", label: "Percentage of the investee’s stock owned", min: 5, max: 95, step: 10, value: 15, fmt: "%" }],
      run: function (v) {
        var m = v.p < 20 ? ["Fair value", "No significant influence: report at fair value, with changes in net income."]
          : v.p <= 50 ? ["Equity method", "Significant influence: use the equity method (lesson 9.4)."]
          : ["Consolidation", "Control: the investor is the parent and must consolidate the subsidiary (lesson 9.5)."];
        return { html: '<div class="own-bar"><span style="width:' + v.p + '%"></span><i style="left:20%"></i><i style="left:50%"></i></div><div class="own-scale"><span>0%</span><span style="left:20%">20%</span><span style="left:50%">50%</span><span style="right:0">100%</span></div><div class="big-eq" style="font-size:22px">' + m[0] + '</div>',
          say: "At " + v.p + " percent ownership: <b>" + m[0] + "</b>. " + m[1] };
      }
    }
  },

  sorters: {
    debt: {
      categories: [{ id: "tr", label: "Trading" }, { id: "afs", label: "Available-for-sale" }, { id: "htm", label: "Held-to-maturity" }],
      items: [
        { text: "Bought bonds to profit from next week’s expected price jump", cat: "tr", why: "Near-term price gains: trading." },
        { text: "Bought 10-year bonds and plans to keep them until they’re repaid", cat: "htm", why: "Intent and ability to hold to maturity." },
        { text: "Bought bonds to hold for now, but may sell if cash is needed", cat: "afs", why: "Intent to hold, with willingness to sell." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Bond", back: "A debt security: the issuer receives money now and promises to repay it with interest." },
      { term: "Trading securities", back: "Held for near-term price gains; fair value with changes in net income." },
      { term: "Available-for-sale", back: "Held with willingness to sell; fair value with changes in other comprehensive income." },
      { term: "Held-to-maturity", back: "Debt held until its final payment date; accounted for at amortized cost." },
      { term: "Equity method", back: "Used for significant influence, generally 20–50% ownership." },
      { term: "Consolidation", back: "Combining a controlled subsidiary’s accounts with the parent’s, generally over 50% ownership." },
      { term: "Fair value option", back: "An irrevocable election to measure certain financial assets at fair value through income." }
    ]
  },

  quiz: [
    { q: "Debt bought to profit from near-term price changes is classified as:", options: ["Held-to-maturity", "Available-for-sale", "Trading", "Equity method"], answer: 2, why: "Trading securities seek short-term gains." },
    { q: "Changes in the fair value of available-for-sale debt are reported in:", options: ["Net income", "Other comprehensive income", "Retained earnings directly", "They aren’t reported"], answer: 1, why: "That’s the distinguishing feature of AFS." },
    { q: "Held-to-maturity debt is accounted for at:", options: ["Fair value", "Amortized cost", "Lower of cost or market", "Replacement cost"], answer: 1, why: "The amortized cost approach." },
    { q: "Owning 35% of another company’s stock usually calls for:", options: ["Fair value", "The equity method", "Consolidation", "Amortized cost"], answer: 1, why: "20–50% suggests significant influence." },
    { q: "Owning 70% of another company’s stock requires:", options: ["Fair value", "The equity method", "Consolidation", "Held-to-maturity accounting"], answer: 2, why: "Over 50% is control." },
    { q: "The fair value option, once elected for an investment, is:", options: ["Revocable each year", "Irrevocable", "Only for liabilities", "Only for equity method investments"], answer: 1, why: "The election can’t be undone." }
  ]
});

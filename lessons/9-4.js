/* Lesson 9.4 · Equity Securities */
HUB.register("9-4", {
  summary: "Small stock investments are carried at fair value. Once an investor can significantly influence the investee (generally above 20%), the equity method tracks its share of the investee’s equity.",
  objectives: [
    "Account for equity investments below 20% at fair value",
    "Explain significant influence",
    "Record an equity method investment, its share of income, and dividends",
    "Explain why dividends reduce the investment under the equity method"
  ],
  html: `
<section class="sec" data-toc="Small stakes">
  <div class="eyebrow kind">Concept</div>
  <h2>Below 20%: fair value</h2>
  <p>Equity securities give the investor an ownership claim: capital stock and options to buy stock. Most equity investments are small, under 20%, and don’t give control or significant influence. The goal is usually price appreciation and dividends.</p>
  <p>Short-term or long-term, these are accounted for the same way as Chapter 6’s investments: <b>fair value on the balance sheet, with changes in income</b> each period. The only difference is placement: current assets if short-term, long-term investments otherwise.</p>
</section>

<section class="sec" data-toc="Significant influence">
  <div class="eyebrow kind">Concept</div>
  <h2>Significant influence calls for the equity method</h2>
  <p>With enough stock, an investor has <b>significant influence</b>: some direction over corporate policy, sway over who’s elected to the board, and a voice in governance. Generally this starts above <b>20%</b> ownership, but it’s ultimately a judgment based on all the facts. Globally, these are called <b>associate investments</b>.</p>
  <p>Under the <b>equity method</b>, market value adjustments usually aren’t used. Instead, the investment account tracks the investor’s share of the investee’s <b>equity</b>: when the investee earns income, its equity rises, and so does the investor’s account.</p>
</section>

<section class="sec" data-toc="Legg Company">
  <div class="eyebrow kind try">Try it</div>
  <h2>Owning 25% of Legg Company</h2>
  <p>An investor buys 25% of Legg Company for $250,000 on April 1, 20X3. For the quarter ending June 30, Legg earns $10,000 and pays $4,000 of dividends.</p>
  <div class="panel"><div data-widget="journal" data-key="legg"></div></div>
  <div class="grid2">
    <div class="tile"><span class="k">Share of income</span><p>Legg’s equity rose $10,000; the investor records 25%, <b>$2,500</b>, as both an increase in the investment and income. A loss works the opposite way.</p></div>
    <div class="tile alt"><span class="k">Dividends are not income</span><p>Income was recorded as Legg <i>earned</i> it. A dividend shrinks Legg’s equity, so the investor’s share, <b>$1,000</b>, is a return of investment and reduces the account.</p></div>
  </div>
  <div class="panel">
    <div class="panel-title"><h3>Track the investment</h3><span class="hint">Change Legg’s results for the quarter</span></div>
    <div data-widget="calc" data-key="eq"></div>
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
    <li><span>Equity investments below ~20%: <b>fair value</b>, changes in income.</span></li>
    <li><span><b>Significant influence</b> (generally over 20%) requires the <b>equity method</b>.</span></li>
    <li><span>Record the investment at cost; add the investor’s share of investee income (debit Investment, credit Investment Income).</span></li>
    <li><span>Dividends received reduce the Investment account (debit Cash, credit Investment). They’re not income.</span></li>
  </ol>
</section>`,

  data: {
    legg: { step: true, entries: [
      { date: "Apr. 1", lines: [["Investment in Legg", 250000, 0], ["Cash", 0, 250000]], memo: "Bought 25% of Legg’s stock" },
      { date: "Jun. 30", lines: [["Investment in Legg", 2500, 0], ["Investment Income", 0, 2500]], memo: "25% of Legg’s $10,000 quarterly income" },
      { date: "Jun. 30", lines: [["Cash", 1000, 0], ["Investment in Legg", 0, 1000]], memo: "25% of Legg’s $4,000 dividend: a return of investment" }
    ]},
    eq: {
      inputs: [
        { id: "ni", label: "Legg’s net income (loss)", min: -20000, max: 40000, step: 10000, value: 10000, fmt: "$" },
        { id: "dv", label: "Legg’s dividends", min: 0, max: 20000, step: 4000, value: 4000, fmt: "$" }
      ],
      run: function (v, money) {
        var share = v.ni * 0.25, div = v.dv * 0.25, bal = 250000 + share - div;
        return { html: '<div class="statement"><div class="st-row"><span class="st-l">Cost, April 1</span><span class="st-b">' + money(250000) + '</span></div><div class="st-row"><span class="st-l">25% of net ' + (v.ni < 0 ? "loss" : "income") + '</span><span class="st-b">' + money(share) + '</span></div><div class="st-row"><span class="st-l">Less: 25% of dividends</span><span class="st-b"><span class="u">' + money(-div) + '</span></span></div><div class="st-row bold"><span class="st-l">Investment balance, June 30</span><span class="st-b"><span class="uu">' + money(bal) + '</span></span></div></div>',
          say: "The investor records " + (share < 0 ? "a loss of " + money(-share) : "income of " + money(share)) + ", and the investment ends at <b>" + money(bal) + "</b>." };
      }
    }
  },

  cards: {
    terms: [
      { term: "Equity securities", back: "Ownership claims: capital stock and options to acquire stock." },
      { term: "Significant influence", back: "Some direction over an investee’s policies and governance; generally presumed above 20% ownership." },
      { term: "Equity method", back: "Investment tracks the investor’s share of the investee’s equity: up for income, down for losses and dividends." },
      { term: "Associate investment", back: "The international term for an equity method investment." },
      { term: "Investment income (equity method)", back: "The investor’s share of the investee’s net income." }
    ]
  },

  quiz: [
    { q: "A 10% investment in another company’s stock is generally reported at:", options: ["Cost", "Fair value, with changes in income", "The equity method", "Consolidation"], answer: 1, why: "No significant influence below about 20%." },
    { q: "Significant influence is generally presumed at ownership above:", options: ["5%", "20%", "50%", "75%"], answer: 1, why: "But it’s ultimately a judgment." },
    { q: "An investor owns 25% of Legg, which earns $10,000. The investor records:", options: ["$10,000 of income", "$2,500 of income and an increase in the investment", "Nothing until dividends", "$2,500 of dividends"], answer: 1, why: "Its share of Legg’s income." },
    { q: "Legg pays $4,000 of dividends. The 25% investor:", options: ["Records $1,000 of dividend income", "Debits Cash and credits the Investment $1,000", "Records $4,000 of income", "Makes no entry"], answer: 1, why: "Dividends are a return of investment." },
    { q: "Why are dividends not income under the equity method?", options: ["They’re taxed", "Income was already recorded when the investee earned it", "They’re too small", "GAAP prohibits dividends"], answer: 1, why: "Counting them would double-count." },
    { q: "Cost $250,000, share of income $2,500, dividends received $1,000. The investment balance is:", options: ["$250,000", "$251,500", "$253,500", "$248,500"], answer: 1, why: "$250,000 + $2,500 − $1,000." }
  ]
});

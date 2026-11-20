/* Lesson 6.5 · Short-Term Investments */
HUB.register("6-5", {
  summary: "Investments bought to resell soon are marked to fair value at each reporting date, with unrealized gains and losses in income. Follow Webster Company’s investment in Merriam stock.",
  objectives: [
    "Classify short-term investments as current assets",
    "Record purchase at cost and mark to fair value",
    "Explain “unrealized” gains and losses and the rationale for fair value",
    "Record dividend and interest income; describe derivatives"
  ],
  html: `
<section class="sec" data-toc="Short-term intent">
  <div class="eyebrow kind">Concept</div>
  <h2>Bought to sell soon: a current asset at fair value</h2>
  <p>Investments acquired for the long term, or to gain control of another company, are noncurrent (Chapter 9). Investments bought simply to <b>resell in the very near future for a profit</b> are <b>current assets</b>, listed right after cash.</p>
  <div class="grid2">
    <div class="tile"><span class="k">At purchase</span><p>Recorded at <b>cost</b>, including brokerage fees.</p></div>
    <div class="tile alt"><span class="k">At each reporting date</span><p>Adjusted to <b>fair value</b>, with the change reported in income. This is <b>mark-to-market</b> accounting.</p></div>
  </div>
  <p><b>Fair value</b> is the price that would be received to sell the asset in an orderly transaction between market participants.</p>
</section>

<section class="sec" data-toc="Webster and Merriam">
  <div class="eyebrow kind try">Try it</div>
  <h2>Webster Company buys Merriam stock</h2>
  <p>Webster has excess cash earning very little and expects business to pick up for competitor Merriam Corporation, whose stock trades at $10. On March 3, 20X6, Webster buys <b>5,000 shares for $50,000</b>, planning a quick profit. Step through the entries.</p>
  <div class="panel"><div data-widget="journal" data-key="web"></div></div>
  <p>After all three entries, the investment is carried at $50,000 − $5,000 + $15,000 = <b>$60,000</b>, its market value (5,000 × $12). March income shows a $5,000 loss and April a $15,000 gain: a cumulative $10,000 gain, matching the total rise in value. With a portfolio, every investment is adjusted the same way.</p>
  <div class="panel">
    <div class="panel-title"><h3>Mark it to market</h3><span class="hint">Pick the share price at each month end</span></div>
    <div data-widget="calc" data-key="mtm"></div>
  </div>
</section>

<section class="sec" data-toc="Why fair value?">
  <div class="eyebrow kind">Concept</div>
  <h2>Why not historical cost here?</h2>
  <p>Market values for these investments are readily available, and because the company intends to sell soon, value changes likely translate directly into the cash it will eventually receive. So the rules recognize changes as they happen. The loss is called <b>unrealized</b> because it’s recognized even though the final cash result isn’t yet known.</p>
  <div class="grid2">
    <div class="tile"><span class="k">Valuation adjustment account</span><p>Some companies keep the investment at cost and use a separate <b>Valuation Adjustment</b> account added to or subtracted from it. Results are the same, and the original cost stays visible, which helps for taxes: tax rules generally compute gain or loss from original cost and don’t accept fair value.</p></div>
    <div class="tile alt"><span class="k">Dividends and interest</span><p>Usually small since these investments turn over quickly, but recorded as income when received. They don’t change the fair value approach.</p></div>
  </div>
  <div data-widget="journal" data-key="div"></div>
</section>

<section class="sec" data-toc="Derivatives">
  <div class="eyebrow kind">Concept</div>
  <h2>Derivatives</h2>
  <p>Commodity futures, interest rate swaps, options, and similar instruments are <b>derivatives</b>: their value derives from something else (a cotton futures contract takes its value from cotton). They follow the same approach: measured at fair value, with changes recorded in income as they happen.</p>
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
    <li><span>Short-term investments are bought to resell soon and are <b>current assets</b>.</span></li>
    <li><span>Record at cost (with fees), then <b>mark to fair value</b> each reporting date; changes go to income as unrealized gains or losses.</span></li>
    <li><span>Rationale: values are readily determinable and likely to affect near-term cash.</span></li>
    <li><span>Dividends and interest received are income. Derivatives also use fair value through income.</span></li>
  </ol>
</section>`,

  data: {
    web: { step: true, entries: [
      { date: "Mar. 3", lines: [["Short-Term Investments", 50000, 0], ["Cash", 0, 50000]], memo: "Bought 5,000 Merriam shares at $10" },
      { date: "Mar. 31", lines: [["Unrealized Loss on Investments", 5000, 0], ["Short-Term Investments", 0, 5000]], memo: "Price fell to $9: 5,000 × $1 decline" },
      { date: "Apr. 30", lines: [["Short-Term Investments", 15000, 0], ["Unrealized Gain on Investments", 0, 15000]], memo: "Price rose to $12: 5,000 × $3 increase" }
    ]},
    div: { entries: [{ date: "May 15", lines: [["Cash", 1000, 0], ["Dividend Income", 0, 1000]], memo: "Received a $0.20 per share dividend on 5,000 Merriam shares" }] },
    mtm: {
      inputs: [
        { id: "m", label: "Price at March 31", min: 7, max: 13, step: 1, value: 9, fmt: "n" },
        { id: "a", label: "Price at April 30", min: 7, max: 13, step: 1, value: 12, fmt: "n" }
      ],
      run: function (v, money) {
        var mar = (v.m - 10) * 5000, apr = (v.a - v.m) * 5000;
        function word(x) { return x > 0 ? "an unrealized gain of " + money(x) : x < 0 ? "an unrealized loss of " + money(-x) : "no change"; }
        return { html: '<div class="statement two"><div class="st-row"><span class="st-l">Cost, March 3 ($10 × 5,000)</span><span class="st-a"></span><span class="st-b">' + money(50000) + '</span></div>' +
          '<div class="st-row"><span class="st-l">March adjustment</span><span class="st-a">' + money(mar) + '</span><span class="st-b">' + money(v.m * 5000) + '</span></div>' +
          '<div class="st-row"><span class="st-l">April adjustment</span><span class="st-a">' + money(apr) + '</span><span class="st-b">' + money(v.a * 5000) + '</span></div>' +
          '<div class="st-row bold"><span class="st-l">Cumulative effect on income</span><span class="st-a"></span><span class="st-b"><span class="uu">' + money(mar + apr) + '</span></span></div></div>',
          say: "March shows " + word(mar) + "; April shows " + word(apr) + ". The investment is carried at <b>" + money(v.a * 5000) + "</b>." };
      }
    }
  },

  cards: {
    terms: [
      { term: "Short-term investments", back: "Securities bought to resell in the near future for profit; current assets reported at fair value." },
      { term: "Mark-to-market", back: "Adjusting an investment to fair value at each reporting date, with changes in income." },
      { term: "Fair value", back: "The price received to sell an asset in an orderly transaction between market participants." },
      { term: "Unrealized gain or loss", back: "A change in value recognized before the investment is sold, so the final cash result isn’t yet known." },
      { term: "Valuation Adjustment account", back: "An account added to or subtracted from the investment at cost, so original cost stays visible." },
      { term: "Derivative", back: "An instrument whose value derives from something else, like a futures contract; carried at fair value through income." }
    ]
  },

  quiz: [
    { q: "Investments bought to resell in the very near future are classified as:", options: ["Long-term investments", "Current assets", "Intangible assets", "Liabilities"], answer: 1, why: "They follow cash in current assets." },
    { q: "Short-term investments are initially recorded at:", options: ["Fair value at year end", "Cost, including brokerage fees", "Par value", "The expected selling price"], answer: 1, why: "Purchase is recorded at cost." },
    { q: "Webster’s 5,000 shares bought at $10 fall to $9. The entry is:", options: ["Debit Short-Term Investments $5,000, credit Unrealized Gain", "Debit Unrealized Loss on Investments $5,000, credit Short-Term Investments $5,000", "No entry until sold", "Debit Cash $5,000"], answer: 1, why: "The investment is written down to fair value with a charge to income." },
    { q: "The shares then rise from $9 to $12. The April entry records an unrealized gain of:", options: ["$10,000", "$15,000", "$60,000", "$5,000"], answer: 1, why: "5,000 × $3 = $15,000." },
    { q: "Why is the loss called “unrealized”?", options: ["It’s not recorded", "It’s recognized before the final cash result is known", "It’s a tax loss", "It’s an error"], answer: 1, why: "The investment hasn’t been sold yet." },
    { q: "Dividends received on a short-term investment are:", options: ["Added to the investment’s cost", "Recorded as income", "Ignored", "A reduction of fair value"], answer: 1, why: "Debit Cash, credit Dividend Income." },
    { q: "A cotton futures contract is an example of a:", options: ["Cash equivalent", "Derivative", "Long-term investment", "Inventory"], answer: 1, why: "Its value derives from cotton." }
  ]
});

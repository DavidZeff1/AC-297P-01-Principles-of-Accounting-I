/* Lesson 4.5 · Business Liquidity and the Operating Cycle */
HUB.register("4-5", {
  summary: "Can the company pay its bills as they come due? Measure liquidity with working capital, the current ratio, and the tougher quick ratio, and learn how these numbers can mislead.",
  objectives: [
    "Define liquidity and working capital",
    "Compute and interpret the current ratio",
    "Compute and interpret the quick ratio",
    "Explain how ratios can be manipulated or misread"
  ],
  html: `
<section class="sec" data-toc="Liquidity">
  <div class="eyebrow kind">Concept</div>
  <h2>Liquidity: paying near-term bills</h2>
  <p><b>Liquidity</b> is a firm’s ability to meet its near-term obligations as they come due. Poor liquidity can doom even a company with bright long-term prospects and lots of noncash assets.</p>
  <div class="big-eq">Working capital = <span class="a">Current assets</span> − <span class="l">Current liabilities</span></div>
  <p>Classy Company (lesson 4.4) has current assets of $450,000 and current liabilities of $150,000, so working capital is <b>$300,000</b>. You’d hope to see a positive number; a negative one may signal financial stress.</p>
  <div class="grid2">
    <div class="tile"><span class="k">But be careful</span><p>Negative working capital isn’t always bad. A company may have a standby bank line of credit to borrow as needed.</p></div>
    <div class="tile alt"><span class="k">The fast-food example</span><p>A burger chain has almost no receivables (customers pay cash) and little inventory (bread and milk don’t keep), yet sizable payables and short-term debt. It thrives because cash flows through it so quickly, at good margins, that it pays its bills and funds new locations.</p></div>
  </div>
</section>

<section class="sec" data-toc="The ratios">
  <div class="eyebrow kind">Concept</div>
  <h2>Ratios put working capital in proportion</h2>
  <p>Is $1,000,000 of working capital a lot? For a corporate giant it could be a drop in the bucket; for a family business it could be plenty. Ratios compare the pieces instead:</p>
  <div class="grid2">
    <div class="tile"><span class="k">Current ratio</span><h4>Current assets ÷ Current liabilities</h4><p>Classy: $450,000 ÷ $150,000 = <b>3:1</b>.</p></div>
    <div class="tile"><span class="k">Quick ratio (tougher)</span><h4>(Cash + Short-term investments + Accounts receivable) ÷ Current liabilities</h4><p>Classy: ($100,000 + $50,000 + $75,000) ÷ $150,000 = <b>1.5:1</b>.</p></div>
  </div>
  <p>The quick ratio leaves out inventory and prepaids. A company might hold lots of inventory that won’t sell easily: its current ratio looks fine while it struggles to pay bills. The quick ratio catches that.</p>
</section>

<section class="sec" data-toc="Play with Classy">
  <div class="eyebrow kind try">Try it</div>
  <h2>Move Classy’s numbers</h2>
  <p>Ratios can be manipulated. Pay off some payables with cash, and watch the current ratio “improve” even though nothing about the business got better. Then pile up inventory and see which ratio notices.</p>
  <div class="panel"><div data-widget="calc" data-key="ratios"></div></div>
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
    <li><span><b>Liquidity</b> is the ability to meet near-term obligations as they come due.</span></li>
    <li><span><b>Working capital</b> = current assets − current liabilities.</span></li>
    <li><span><b>Current ratio</b> = current assets ÷ current liabilities.</span></li>
    <li><span><b>Quick ratio</b> = (cash + short-term investments + receivables) ÷ current liabilities, a stricter test.</span></li>
    <li><span>Ratios can be manipulated and misread. Avoid blanket conclusions from any single number.</span></li>
  </ol>
</section>`,

  data: {
    ratios: {
      inputs: [
        { id: "pay", label: "Use cash to pay off payables", min: 0, max: 75000, step: 25000, value: 0, fmt: "$" },
        { id: "inv", label: "Inventory", min: 100000, max: 400000, step: 50000, value: 200000, fmt: "$" }
      ],
      run: function (v, money) {
        var cash = 100000 - v.pay, quick = cash + 50000 + 75000, ca = quick + v.inv + 25000, cl = 150000 - v.pay;
        var cr = ca / cl, qr = quick / cl;
        function bar(label, r, max, cls) { return '<div class="meter"><div class="meter-top"><span>' + label + '</span><span class="num">' + r.toFixed(2) + ' : 1</span></div><div class="meter-track"><div class="meter-fill ' + (cls || "") + '" style="width:' + Math.min(100, r / max * 100) + '%"></div></div></div>'; }
        return {
          html: '<div class="statement"><div class="st-row"><span class="st-l">Current assets</span><span class="st-b">' + money(ca) + '</span></div><div class="st-row"><span class="st-l">Quick assets</span><span class="st-b">' + money(quick) + '</span></div><div class="st-row"><span class="st-l">Current liabilities</span><span class="st-b">' + money(cl) + '</span></div><div class="st-row bold"><span class="st-l">Working capital</span><span class="st-b"><span class="uu">' + money(ca - cl) + '</span></span></div></div>' +
            bar("Current ratio", cr, 6) + bar("Quick ratio", qr, 6, "amber"),
          say: "Current ratio " + cr.toFixed(2) + " to 1, quick ratio " + qr.toFixed(2) + " to 1." + (v.pay ? " Paying off " + money(v.pay) + " of debt raised the current ratio without improving the business." : "") + (v.inv > 200000 ? " Extra inventory lifts the current ratio, but the quick ratio doesn’t budge." : "")
        };
      }
    }
  },

  cards: {
    terms: [
      { term: "Liquidity", back: "The ability to meet near-term obligations as they come due." },
      { term: "Working capital", back: "Current assets minus current liabilities." },
      { term: "Current ratio", back: "Current assets ÷ current liabilities." },
      { term: "Quick assets", back: "Cash, short-term investments, and accounts receivable." },
      { term: "Quick ratio", back: "Quick assets ÷ current liabilities: a more stringent test that excludes inventory and prepaids." }
    ]
  },

  quiz: [
    { q: "Liquidity refers to a company’s ability to:", options: ["Earn a profit", "Meet near-term obligations as they come due", "Issue stock", "Grow sales"], answer: 1, why: "It’s about paying bills on time." },
    { q: "Current assets $450,000 and current liabilities $150,000. Working capital is:", options: ["$600,000", "$300,000", "3:1", "$150,000"], answer: 1, why: "$450,000 − $150,000 = $300,000." },
    { q: "The current ratio for the same company is:", options: ["1:3", "3:1", "1.5:1", "4:1"], answer: 1, why: "$450,000 ÷ $150,000 = 3." },
    { q: "Quick assets include:", options: ["Cash, short-term investments, and receivables", "Inventory and prepaids", "All current assets", "Equipment"], answer: 0, why: "Inventory and prepaids are excluded." },
    { q: "Cash $100,000, short-term investments $50,000, receivables $75,000, current liabilities $150,000. The quick ratio is:", options: ["3:1", "1.5:1", "2:1", "0.67:1"], answer: 1, why: "$225,000 ÷ $150,000 = 1.5." },
    { q: "Classy pays $50,000 of payables with cash. Its current ratio moves from 3:1 to:", options: ["2:1", "3:1", "4:1", "5:1"], answer: 2, why: "($450,000 − $50,000) ÷ ($150,000 − $50,000) = 4." },
    { q: "Why might a fast-food chain be healthy despite negative working capital?", options: ["It has huge inventories", "Its cash flows through so quickly that it pays obligations as they come due", "It never has payables", "Working capital doesn’t apply to restaurants"], answer: 1, why: "High cash velocity can offset low current assets." }
  ]
});

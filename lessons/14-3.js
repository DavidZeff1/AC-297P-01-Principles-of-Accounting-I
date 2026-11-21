/* Lesson 14.3 · Treasury Stock */
HUB.register("14-3", {
  summary: "When a company buys back its own shares, cash and equity fall by the same amount. Treasury stock is a contra equity account, and no gain or loss is ever reported on dealings in a company’s own stock.",
  objectives: [
    "Explain why companies buy back their own stock",
    "Record treasury stock purchases under the cost method",
    "Present treasury stock as a contra equity account",
    "Record reissuance of treasury shares"
  ],
  html: `
<section class="sec" data-toc="Why buy back?">
  <div class="eyebrow kind">Concept</div>
  <h2>A company buying its own shares</h2>
  <p><b>Treasury stock</b> is a company’s own stock that it has reacquired. Common reasons:</p>
  <div class="grid3">
    <div class="tile"><span class="k">Undervalued</span><p>Management believes the market price is unrealistically low, so buying supports the price and benefits shareholders who keep their shares.</p></div>
    <div class="tile"><span class="k">Going private</span><p>Part of a reorganization to delist from an exchange.</p></div>
    <div class="tile alt"><span class="k">Employee awards</span><p>Reacquired shares are reissued under employee stock plans.</p></div>
  </div>
</section>

<section class="sec" data-toc="The cost method">
  <div class="eyebrow kind try">Try it</div>
  <h2>Cash down, equity down</h2>
  <p>Whatever the reason, it’s purely an <b>equity</b> transaction. Under the widely accepted <b>cost method</b>, debit Treasury Stock and credit Cash for what was paid. Embassy Corporation buys back 10,000 of its common shares at $60.</p>
  <div data-widget="journal" data-key="buy"></div>
  <p>Cash and total equity both drop $600,000, no matter what the shares originally sold for. A company never reports a gain or loss on issuing or reacquiring its own stock: this isn’t an investment, it’s the company expanding or shrinking its own equity.</p>
  <div class="panel">
    <div class="seg" role="group" aria-label="Equity section"><button type="button" data-voice-state data-tb="0">Before the buyback</button><button type="button" class="on" data-voice-state data-tb="1">After the buyback</button></div>
    <div id="tb-st" style="margin-top:14px"></div>
    <p class="verdict" id="tb-say" aria-live="polite"></p>
  </div>
  <p>Treasury Stock is <b>not an asset</b>. It’s a <b>contra equity</b> account subtracted at the bottom of stockholders’ equity, and it creates the gap between shares <b>issued</b> (400,000) and <b>outstanding</b> (390,000).</p>
</section>

<section class="sec" data-toc="Reissuing shares">
  <div class="eyebrow kind try">Try it</div>
  <h2>Selling treasury shares again</h2>
  <p>When treasury shares are reissued, debit Cash for the amount received and credit Treasury Stock for their <b>cost</b>. Any difference goes to <b>Paid-in Capital in Excess of Par</b>, never to income. Embassy reissues 4,000 of the shares it bought at $60.</p>
  <div class="panel"><div data-widget="calc" data-key="re"></div></div>
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
    <li><span>Treasury stock is the company’s own reacquired stock.</span></li>
    <li><span>Cost method: debit Treasury Stock, credit Cash for the price paid.</span></li>
    <li><span>It’s a contra equity account, not an asset; issued shares minus treasury shares = outstanding.</span></li>
    <li><span>No gains or losses on a company’s own stock: reissue differences go to paid-in capital.</span></li>
  </ol>
</section>`,

  data: {
    buy: { entries: [{ date: "", lines: [["Treasury Stock", 600000, 0], ["Cash", 0, 600000]], memo: "Reacquired 10,000 common shares at $60" }] },
    re: {
      inputs: [{ id: "p", label: "Reissue price per share (cost was $60)", min: 50, max: 70, step: 5, value: 70, fmt: "$" }],
      run: function (v, money) {
        var cash = 4000 * v.p, cost = 240000, d = cash - cost, lines = [["Cash", cash, 0]];
        if (d < 0) lines.push(["Paid-in Capital in Excess of Par", -d, 0]);
        lines.push(["Treasury Stock", 0, cost]);
        if (d > 0) lines.push(["Paid-in Capital in Excess of Par", 0, d]);
        var el = document.createElement("div"); HUB.widgets.journal(el, { entries: [{ date: "", lines: lines, memo: "Reissued 4,000 treasury shares at $" + v.p }] });
        return { html: el.innerHTML,
          say: d === 0 ? "Reissued at cost: debit Cash and credit Treasury Stock for $240,000. No difference." : "Reissued for " + money(cash) + " against a cost of $240,000: the " + money(Math.abs(d)) + " difference " + (d > 0 ? "increases" : "reduces") + " <b>Paid-in Capital in Excess of Par</b>, not income." };
      }
    }
  },

  cards: {
    terms: [
      { term: "Treasury stock", back: "A company’s own shares that it has reacquired." },
      { term: "Cost method", back: "Record treasury stock at the price paid: debit Treasury Stock, credit Cash." },
      { term: "Contra equity account", back: "An account subtracted in stockholders’ equity, such as Treasury Stock." },
      { term: "Outstanding shares", back: "Issued shares minus treasury shares." },
      { term: "Reissuance", back: "Debit Cash, credit Treasury Stock at cost; the difference goes to paid-in capital." }
    ]
  },

  quiz: [
    { q: "Treasury stock is:", options: ["Stock held by the U.S. Treasury", "A company’s own reacquired stock", "Stock of another company", "Unissued authorized stock"], answer: 1, why: "It’s reacquired, not retired." },
    { q: "Under the cost method, buying back 10,000 shares at $60 debits Treasury Stock for:", options: ["$10,000", "$600,000", "Par value only", "The original issue price"], answer: 1, why: "Record what was paid." },
    { q: "Treasury stock is reported as:", options: ["A current asset", "A long-term investment", "A deduction from stockholders’ equity", "An expense"], answer: 2, why: "It’s contra equity." },
    { q: "A treasury stock purchase causes total equity to:", options: ["Increase", "Decrease", "Stay the same", "Double"], answer: 1, why: "Cash and equity fall together." },
    { q: "400,000 shares issued and 10,000 held in treasury means outstanding shares are:", options: ["410,000", "400,000", "390,000", "10,000"], answer: 2, why: "Issued − treasury." },
    { q: "Treasury shares that cost $60 are reissued for $70. The $10 a share difference is:", options: ["A gain on the income statement", "Credited to Paid-in Capital in Excess of Par", "Credited to Retained Earnings as income", "Ignored"], answer: 1, why: "No gains on a company’s own stock." },
    { q: "Why might a company buy back its own stock?", options: ["To record a gain", "It believes the stock is undervalued", "To increase total assets", "To avoid paying taxes on dividends"], answer: 1, why: "A common stated reason." }
  ],

  init: function (root) {
    function draw(after) {
      HUB.widgets.statement(root.querySelector("#tb-st"), HUB.cases.embassy.equity({ treasury: after }));
      root.querySelector("#tb-say").innerHTML = after ? "After the buyback, 390,000 common shares are outstanding and treasury stock of $600,000 reduces total equity to <b>$99,400,000</b>." : "Before the buyback, all 400,000 issued common shares are outstanding and total equity is <b>$100,000,000</b>.";
    }
    root.querySelectorAll("[data-tb]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-tb]").forEach(function (x) { x.classList.toggle("on", x === b); }); draw(b.getAttribute("data-tb") === "1"); }); });
    draw(true);
  }
});

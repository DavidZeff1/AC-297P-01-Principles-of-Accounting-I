/* Lesson 14.4 · Stock Splits and Stock Dividends */
HUB.register("14-4", {
  summary: "Splits and stock dividends hand shareholders more shares without changing what they own. A split needs only a memo; a stock dividend moves retained earnings into paid-in capital at market (small) or par (large).",
  objectives: [
    "Explain the effect of a stock split on shares, par, and ownership",
    "Explain why companies split their stock",
    "Record small and large stock dividends",
    "Show that splits and stock dividends don’t change total equity"
  ],
  html: `
<section class="sec" data-toc="Your slice of the pie">
  <div class="eyebrow kind try">Try it</div>
  <h2>More slices, same pie</h2>
  <p>You own 1,000 of a company’s 100,000 shares, trading at $60. Apply a split or stock dividend.</p>
  <div class="panel">
    <div class="seg" role="group" aria-label="Event"><button type="button" class="on" data-voice-state data-ev="1">None</button><button type="button" data-voice-state data-ev="2">2-for-1 split</button><button type="button" data-voice-state data-ev="3">3-for-1 split</button><button type="button" data-voice-state data-ev="1.25">25% stock dividend</button><button type="button" data-voice-state data-ev="0.5">1-for-2 reverse split</button></div>
    <div class="pie-row" id="pie" style="margin-top:14px"></div>
    <p class="verdict" id="pie-say" aria-live="polite"></p>
  </div>
</section>

<section class="sec" data-toc="Stock splits">
  <div class="eyebrow kind">Concept</div>
  <h2>Stock splits: cosmetic, but useful</h2>
  <p>A <b>stock split</b> increases the number of shares and reduces par per share in proportion. Shareholders get the new shares free, the market price per share should fall proportionately, and nobody’s share of the company changes. The point is the market: a lower price can attract more future investors, so fast-growing companies split to keep their price from reaching stratospheric levels. Splits can be 3-for-2, 5-for-4, even 1,000-for-1, or <b>reverse</b> (1-for-5), which shrinks the share count and raises the price.</p>
  <p>Total par doesn’t change, so <b>no journal entry</b> is made, just a memorandum notation. Here’s Embassy Corporation after a 4-for-1 split of its common stock: par falls from $1.00 to $0.25 and issued shares rise from 400,000 to 1,600,000 ($1.00 × 400,000 = $0.25 × 1,600,000 = $400,000). No balance changes.</p>
  <div data-widget="statement" data-key="split"></div>
</section>

<section class="sec" data-toc="Stock dividends">
  <div class="eyebrow kind try">Try it</div>
  <h2>Stock dividends move retained earnings</h2>
  <p>A <b>stock dividend</b> issues more shares to existing owners in proportion: own 100 shares, receive a 25% stock dividend, own 125 (much like a 5-for-4 split). Shareholders barely notice the difference from a split, but the accounting does: retained earnings are moved to paid-in capital.</p>
  <div class="grid2">
    <div class="tile"><span class="k">Small (under about 20–25%)</span><p>Recorded at <b>market price</b> on the declaration date.</p></div>
    <div class="tile alt"><span class="k">Large (over about 20–25%)</span><p>Recorded at <b>par value</b>.</p></div>
  </div>
  <p>Childers Corporation has 1,000,000 shares of $1 par stock outstanding, priced at $20 when the stock dividend is declared and issued.</p>
  <div class="panel"><div data-widget="calc" data-key="sd"></div></div>
</section>

<section class="sec" data-toc="Compare the effects">
  <div class="eyebrow kind">Summary</div>
  <h2>Rearranging, not changing, equity</h2>
  <div class="panel scroll-x">
    <table class="plain">
      <thead><tr><th>Childers event</th><th class="num">Common stock</th><th class="num">Paid-in capital in excess</th><th class="num">Retained earnings</th><th class="num">Total equity</th></tr></thead>
      <tbody>
        <tr><td>2-for-1 split</td><td class="num">No change</td><td class="num">No change</td><td class="num">No change</td><td class="num">No change</td></tr>
        <tr><td>10% stock dividend (small)</td><td class="num">+$100,000</td><td class="num">+$1,900,000</td><td class="num">−$2,000,000</td><td class="num">No change</td></tr>
        <tr><td>40% stock dividend (large)</td><td class="num">+$400,000</td><td class="num">No change</td><td class="num">−$400,000</td><td class="num">No change</td></tr>
      </tbody>
    </table>
  </div>
  <p>The different treatments are mostly bookkeeping: total par must match the shares outstanding. Every one of these leaves total equity unchanged.</p>
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
    <li><span>A split multiplies shares and divides par; total par and every balance stay the same: memo only.</span></li>
    <li><span>Ownership percentages never change with splits or stock dividends.</span></li>
    <li><span>Small stock dividend: move market value from retained earnings to common stock (par) and paid-in capital (excess).</span></li>
    <li><span>Large stock dividend: move par value from retained earnings to common stock.</span></li>
    <li><span>Total equity is unchanged by all of them.</span></li>
  </ol>
</section>`,

  data: {
    split: HUB.cases.embassy.equity({ split: 4 }),
    sd: {
      inputs: [{ id: "p", label: "Stock dividend percentage", min: 5, max: 50, step: 5, value: 10, fmt: "%" }],
      run: function (v, money) {
        var sh = 10000 * v.p, small = v.p < 20 || (v.p === 20), amt = small ? sh * 20 : sh, lines = [["Retained Earnings", amt, 0], ["Common Stock", 0, sh]];
        if (small) lines.push(["Paid-in Capital in Excess of Par", 0, amt - sh]);
        var el = document.createElement("div"); HUB.widgets.journal(el, { entries: [{ date: "", lines: lines, memo: v.p + "% stock dividend: " + sh.toLocaleString() + " new shares " + (small ? "× $20 market price" : "× $1 par") }] });
        return { html: el.innerHTML + (v.p >= 20 && v.p <= 25 ? '<p class="hint">20–25% is the gray zone between small and large.</p>' : ''),
          say: "A " + v.p + "% stock dividend issues " + sh.toLocaleString() + " shares. It’s " + (small ? "small, so it’s recorded at the $20 market price: <b>" + money(amt) + "</b> moves out of retained earnings." : "large, so it’s recorded at $1 par: <b>" + money(amt) + "</b> moves out of retained earnings.") };
      }
    }
  },

  cards: {
    terms: [
      { term: "Stock split", back: "Increases shares and reduces par per share proportionately; no journal entry." },
      { term: "Reverse split", back: "Reduces the number of shares (e.g., 1-for-5) and raises the price per share." },
      { term: "Memorandum entry", back: "A notation of the new par and share count, used for a split instead of a journal entry." },
      { term: "Stock dividend", back: "A proportional distribution of additional shares to existing shareholders." },
      { term: "Small stock dividend", back: "Under about 20–25% of shares outstanding; recorded at market value." },
      { term: "Large stock dividend", back: "Over about 20–25%; recorded at par value." }
    ]
  },

  quiz: [
    { q: "After a 2-for-1 split, a shareholder who owned 1,000 of 100,000 shares owns:", options: ["1,000 of 200,000", "2,000 of 200,000", "2,000 of 100,000", "500 of 50,000"], answer: 1, why: "Same 1% ownership." },
    { q: "A stock split requires:", options: ["A debit to Retained Earnings", "Only a memorandum notation", "A credit to Cash", "A gain"], answer: 1, why: "Total par is unchanged." },
    { q: "Embassy’s 4-for-1 split changes $1 par on 400,000 shares to:", options: ["$4 par on 100,000", "$0.25 par on 1,600,000", "$1 par on 1,600,000", "$0.25 par on 400,000"], answer: 1, why: "Total par stays $400,000." },
    { q: "Why do growing companies split their stock?", options: ["To raise cash", "To keep the share price from getting too high for investors", "To reduce equity", "To pay taxes"], answer: 1, why: "It’s mostly about marketability." },
    { q: "Childers (1,000,000 shares, $1 par, $20 market) declares a 10% stock dividend. Retained Earnings is debited for:", options: ["$100,000", "$2,000,000", "$1,900,000", "$200,000"], answer: 1, why: "Small: 100,000 shares × $20." },
    { q: "A 40% stock dividend by Childers debits Retained Earnings for:", options: ["$400,000", "$8,000,000", "$40,000", "$7,600,000"], answer: 0, why: "Large: 400,000 shares × $1 par." },
    { q: "A stock dividend’s effect on total stockholders’ equity is:", options: ["Increase", "Decrease", "No change", "Depends on size"], answer: 2, why: "Equity is rearranged, not changed." },
    { q: "A shareholder with 100 shares receives a 25% stock dividend. Now they own:", options: ["100", "125", "250", "75"], answer: 1, why: "Similar to a 5-for-4 split." }
  ],

  init: function (root) {
    function pie(f) {
      var sh = Math.round(100000 * f), mine = Math.round(1000 * f), px = 60 / f;
      var slices = Math.round(4 * f), s = '<svg viewBox="-60 -60 120 120" class="pie-svg" aria-hidden="true">';
      for (var k = 0; k < slices; k++) { var a0 = k / slices * 2 * Math.PI - Math.PI / 2, a1 = (k + 1) / slices * 2 * Math.PI - Math.PI / 2;
        s += '<path d="M0 0 L' + (50 * Math.cos(a0)).toFixed(2) + ' ' + (50 * Math.sin(a0)).toFixed(2) + ' A50 50 0 0 1 ' + (50 * Math.cos(a1)).toFixed(2) + ' ' + (50 * Math.sin(a1)).toFixed(2) + ' Z" class="pie-sl' + (k % 2 ? " b" : "") + '"/>'; }
      s += '<text x="0" y="5" text-anchor="middle" class="pie-n">' + slices + (slices === 1 ? " slice" : " slices") + '</text></svg>';
      root.querySelector("#pie").innerHTML = s + '<div class="grid2" style="flex:1"><div class="tile"><span class="k">Shares outstanding</span><h4>' + sh.toLocaleString() + '</h4></div><div class="tile"><span class="k">Your shares</span><h4>' + mine.toLocaleString() + '</h4></div><div class="tile"><span class="k">Expected price per share</span><h4>$' + px.toFixed(2) + '</h4></div><div class="tile alt"><span class="k">You own</span><h4>1% · $' + (mine * px).toLocaleString("en-US", { maximumFractionDigits: 0 }) + '</h4></div></div>';
      root.querySelector("#pie-say").innerHTML = f === 1 ? "You own 1,000 of 100,000 shares: 1% of the company, worth $60,000." : "Now there are " + sh.toLocaleString() + " shares and you hold " + mine.toLocaleString() + ". The price should adjust to about $" + px.toFixed(2) + ", so you still own <b>1%</b>, worth about $60,000.";
    }
    root.querySelectorAll("[data-ev]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-ev]").forEach(function (x) { x.classList.toggle("on", x === b); }); pie(+b.getAttribute("data-ev")); }); });
    pie(1);
  }
});

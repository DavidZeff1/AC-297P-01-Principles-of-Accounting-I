/* Lesson 14.2 · Common and Preferred Stock */
HUB.register("14-2", {
  summary: "Common and preferred stock carry different rights. Learn what par value means, record stock issuances, follow the dates of a cash dividend, and split dividends between cumulative preferred and common shareholders.",
  objectives: [
    "Compare the typical features of common and preferred stock",
    "Explain par value and record stock issued for cash or other assets",
    "Identify the declaration, ex-dividend, record, and payment dates",
    "Allocate dividends between cumulative preferred and common stock"
  ],
  html: `
<section class="sec" data-toc="Common vs. preferred">
  <div class="eyebrow kind try">Compare</div>
  <h2>Two kinds of ownership</h2>
  <p>Companies can issue several kinds of stock. A family business that goes public might create <b>Class A</b> shares (family, voting) and <b>Class B</b> shares (public, non-voting) to raise capital without giving up control. Beyond common stock, <b>preferred stock</b> is another way to raise money. Features vary company by company; here are the typical ones.</p>
  <div class="panel">
    <div class="seg" role="group" aria-label="Stock type"><button type="button" class="on" data-voice-state data-st="c">Common stock</button><button type="button" data-voice-state data-st="p">Preferred stock</button></div>
    <div class="grid2" style="margin-top:14px" id="st-f" aria-live="polite"></div>
  </div>
  <p>Mix and match: <b>cumulative, mandatorily redeemable</b> preferred behaves much like debt (fixed payments and a fixed payoff), while <b>noncallable, noncumulative, convertible</b> preferred behaves more like common stock.</p>
</section>

<section class="sec" data-toc="Par value">
  <div class="eyebrow kind">Example</div>
  <h2>What is par?</h2>
  <p>Many states require a <b>par value</b> (or stated value) per share, which represents the firm’s <b>legal capital</b>. In theory, buyers who paid less than par could owe the difference, but par is usually set far below the issue price, often $1 or even $0.01, so that rarely matters. It does matter in the books: par and the excess over par go in <b>separate accounts</b>.</p>
  <div data-widget="journal" data-key="iss"></div>
  <ul>
    <li><b>No-par stock</b>: credit Common Stock for the whole issue price; no excess account is needed.</li>
    <li><b>Stock issued for land or other assets</b>: debit the asset at its fair value (or the stock’s fair value if that’s clearer).</li>
  </ul>
</section>

<section class="sec" data-toc="Dividend dates">
  <div class="eyebrow kind try">Try it</div>
  <h2>Who gets the dividend?</h2>
  <p>Common dividends are at the board’s discretion. Paying one takes enough cash and a positive retained earnings balance. Some companies prize a long record of rising dividends; others reinvest everything for growth. There is no liability until the board <b>declares</b> a dividend; from that moment it’s legally enforceable.</p>
  <div data-widget="journal" data-key="div"></div>
  <p>Remember: Dividends isn’t an expense. It’s a distribution of income that reduces retained earnings directly. If shares are sold between declaration and payment, the board’s <b>date of record</b> decides who’s paid, and because records lag a few days, the stock goes <b>ex-dividend</b> just before it.</p>
  <div class="panel">
    <div class="xd" id="xd" aria-hidden="true"></div>
    <div class="seg" role="group" aria-label="When the original owner sells"><button type="button" class="on" data-voice-state data-xd="0">Sell July 10</button><button type="button" data-voice-state data-xd="1">Sell July 27</button><button type="button" data-voice-state data-xd="2">Sell July 29 or later</button></div>
    <p class="verdict" id="xd-say" aria-live="polite"></p>
  </div>
</section>

<section class="sec" data-toc="Preferred dividends">
  <div class="eyebrow kind try">Try it</div>
  <h2>Preferred comes first, arrears and all</h2>
  <p>Embassy Corporation’s equity section describes each class: shares <b>authorized</b> (allowed), <b>issued</b> (actually sold), and <b>outstanding</b> (issued minus any reacquired). <b>Legal capital</b> is total par, $20,400,000; <b>total paid-in capital</b> adds the excess over par, $56,400,000.</p>
  <div data-widget="statement" data-key="emb"></div>
  <p>The 8% cumulative preferred is owed $8 a share, $1,600,000 a year. Missed years become <b>dividends in arrears</b>, all of which must be paid before common gets anything. Embassy skipped the last two years and wants to pay $5,000,000 this year.</p>
  <div class="panel"><div data-widget="calc" data-key="pd"></div></div>
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
    <li><span>Common: votes, residual dividends and liquidation proceeds, possibly a preemptive right. Preferred: dividend and liquidation priority, usually no vote.</span></li>
    <li><span>Record par in the stock account and the excess in Paid-in Capital in Excess of Par.</span></li>
    <li><span>Declaration creates the liability; the record date (preceded by the ex-dividend date) decides who’s paid.</span></li>
    <li><span>Cumulative preferred must receive all arrears plus the current year before common gets anything.</span></li>
  </ol>
</section>`,

  data: {
    iss: { entries: [
      { date: "", lines: [["Cash", 1000000, 0], ["Common Stock", 0, 100000], ["Paid-in Capital in Excess of Par", 0, 900000]], memo: "Godkneckt Corporation issues 100,000 shares of $1 par stock at $10" }
    ]},
    div: { entries: [
      { date: "Jul. 1", lines: [["Dividends", 200000, 0], ["Dividends Payable", 0, 200000]], memo: "Board declares a $0.50 dividend on 400,000 common shares" },
      { date: "Aug. 15", lines: [["Dividends Payable", 200000, 0], ["Cash", 0, 200000]], memo: "Dividend paid" }
    ]},
    emb: HUB.cases.embassy.equity(),
    pd: {
      inputs: [
        { id: "t", label: "Total dividends paid this year", min: 1000000, max: 7000000, step: 1000000, value: 5000000, fmt: "$" },
        { id: "a", label: "Years of preferred dividends in arrears", min: 0, max: 3, step: 1, value: 2 }
      ],
      run: function (v, money) {
        var need = 1600000 * (v.a + 1), pc = Math.min(v.t, need), cc = v.t - pc, pn = Math.min(v.t, 1600000), cn = v.t - pn;
        return { html: '<div class="grid2"><div class="tile"><span class="k">If cumulative (Embassy’s case)</span><p>Preferred: <b>' + money(pc) + '</b>' + (v.a ? ' (' + (v.a + 1) + ' years × $1,600,000' + (pc < need ? ', still short' : '') + ')' : '') + '<br>Common: <b>' + money(cc) + '</b> (' + money(cc / 400000).replace(/\.00$/, "") + ' a share)</p></div>' +
          '<div class="tile alt"><span class="k">If it were noncumulative</span><p>Preferred: <b>' + money(pn) + '</b> (current year only)<br>Common: <b>' + money(cn) + '</b></p></div></div>',
          say: "With cumulative preferred, preferred receives " + money(pc) + " and common gets <b>" + money(cc) + "</b>. If the preferred were noncumulative, common would get " + money(cn) + "." };
      }
    }
  },

  cards: {
    terms: [
      { term: "Preemptive right", back: "A common stockholder’s option to buy a proportional share of new stock issues, avoiding dilution." },
      { term: "Cumulative preferred", back: "Missed dividends accumulate as dividends in arrears and must be paid before common dividends." },
      { term: "Callable preferred", back: "The company can buy it back at a set call price, e.g., 105% of par." },
      { term: "Convertible preferred", back: "Can be exchanged for common stock at a preset ratio." },
      { term: "Par value", back: "A nominal per-share amount required by many states; total par is legal capital." },
      { term: "Paid-in Capital in Excess of Par", back: "Amounts received for stock above par value." },
      { term: "Authorized / issued / outstanding", back: "Allowed by the charter / actually sold / issued minus treasury shares." },
      { term: "Date of declaration", back: "The board declares the dividend; a liability is recorded." },
      { term: "Date of record", back: "Owners on this date receive the dividend." },
      { term: "Ex-dividend date", back: "Just before the record date; buyers on or after it don’t get the dividend." }
    ]
  },

  quiz: [
    { q: "Which is a typical feature of preferred stock?", options: ["Voting rights", "Priority for dividends", "A preemptive right", "Last in liquidation"], answer: 1, why: "Preferred is paid before common." },
    { q: "Godkneckt issues 100,000 shares of $1 par stock for $10 a share. Paid-in Capital in Excess of Par is credited for:", options: ["$100,000", "$900,000", "$1,000,000", "$10"], answer: 1, why: "$1,000,000 received − $100,000 par." },
    { q: "Stock issued for land is recorded at:", options: ["Par value", "The fair value of the land (or stock, if clearer)", "Zero", "The seller’s cost"], answer: 1, why: "Fair value governs noncash issuances." },
    { q: "A liability for a cash dividend is recorded on the:", options: ["Date of record", "Ex-dividend date", "Date of declaration", "Payment date"], answer: 2, why: "Declaration makes it legally enforceable." },
    { q: "The Dividends account is:", options: ["An expense", "A reduction of retained earnings", "A liability", "An asset"], answer: 1, why: "It’s a distribution of income, not an expense." },
    { q: "Embassy has $1,600,000 of annual cumulative preferred dividends and two years in arrears. Of a $5,000,000 dividend, common receives:", options: ["$3,400,000", "$1,800,000", "$200,000", "$0"], answer: 2, why: "Preferred gets 3 × $1,600,000 = $4,800,000." },
    { q: "Shares issued minus shares reacquired equals shares:", options: ["Authorized", "Outstanding", "Legal", "Preferred"], answer: 1, why: "Treasury shares aren’t outstanding." },
    { q: "Total paid-in capital is:", options: ["Total par value only", "Legal capital plus amounts paid in excess of par", "Retained earnings", "Total assets"], answer: 1, why: "Embassy: $20,400,000 + $36,000,000." }
  ],

  init: function (root) {
    var F = {
      c: [["Dividends", "A share of whatever dividends the board declares for common."], ["Preemptive right", "An option to buy a proportional part of new share issues to avoid dilution. Many companies have dropped it."], ["Voting", "Votes on directors, stock award plans, mergers, and similar matters."], ["Liquidation", "Receives what’s left after creditors and other priority claims."], ["Financial reports", "The right to periodic reports on performance."]],
      p: [["Dividend preference", "Paid before common, usually a percentage of par. Often <b>cumulative</b>: missed dividends become arrears that must be paid before common. Noncumulative misses are gone for good."], ["No vote", "Usually lacks voting rights."], ["Liquidation priority", "Paid off before common, after creditors."], ["Callable", "The company can force a cash-out at a call price, e.g., 105 means 105% of par. That caps the upside."], ["Convertible", "Can be exchanged for common at a preset ratio, e.g., 3 common for 1 preferred: real upside if common rises."], ["Fixed maturity", "“Mandatorily redeemable” on a set future date."]]
    };
    function drawF(k) { root.querySelector("#st-f").innerHTML = F[k].map(function (x, i) { return '<div class="tile' + (i % 2 ? " alt" : "") + '"><span class="k">' + x[0] + '</span><p>' + x[1] + '</p></div>'; }).join(""); }
    root.querySelectorAll("[data-st]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-st]").forEach(function (x) { x.classList.toggle("on", x === b); }); drawF(b.getAttribute("data-st")); }); });
    drawF("c");

    var D = [["Jul. 1", "Declaration"], ["Jul. 29", "Ex-dividend"], ["Aug. 1", "Record"], ["Aug. 15", "Payment"]], SELL = ["Jul. 10", "Jul. 27", "Jul. 29+"];
    var SAY = ["Sold on July 10, before the ex-dividend date: the <b>new owner</b> gets the dividend.",
      "Sold on July 27, still before the ex-dividend date: the <b>new owner</b> gets the dividend.",
      "Held through the ex-dividend date: the <b>original owner</b> gets the dividend, even if they sell on July 29 or later."];
    function drawX(k) {
      var pos = [12, 42, 62], h = '<div class="xd-line"><span class="xd-zone" style="left:' + 0 + '%;width:56%"></span><span class="xd-zone ok" style="left:56%;width:44%"></span>';
      [0, 56, 72, 100].forEach(function (p, i) { h += '<span class="xd-pt' + (i % 2 ? " r2" : "") + (i === 3 ? " end" : i === 0 ? " start" : "") + '" style="left:' + p + '%"><b>' + D[i][1] + '</b><span>' + D[i][0] + '</span></span>'; });
      h += '<span class="xd-sell" style="left:' + pos[k] + '%">Sell ' + SELL[k] + '</span></div>';
      root.querySelector("#xd").innerHTML = h + '<div class="cal-key" style="margin-top:8px"><span class="k-acc">Sell here: the buyer gets the dividend</span><span class="k-use">Sell here: the seller keeps it</span></div>';
      root.querySelector("#xd-say").innerHTML = SAY[k];
    }
    root.querySelectorAll("[data-xd]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-xd]").forEach(function (x) { x.classList.toggle("on", x === b); }); drawX(+b.getAttribute("data-xd")); }); });
    drawX(0);
  }
});

/* Lesson 14.5 · Statement of Stockholders' Equity */
(function () {
  /* Barrington Corporation, $1 par common, year 20X5 (illustrative) */
  var COLS = ["Common stock", "Paid-in capital in excess of par", "Retained earnings", "Treasury stock", "Total"];
  var ROWS = [
    { l: "Balance, January 1, 20X5", v: [300000, 2700000, 1500000, 0], say: "Start with each equity account’s beginning balance: total equity of $4,500,000." },
    { l: "Issued 50,000 shares at $12", v: [50000, 550000, 0, 0], say: "Issuing 50,000 shares of $1 par stock at $12 adds $50,000 to common stock and $550,000 to paid-in capital: $600,000 in all." },
    { l: "Net income", v: [0, 0, 800000, 0], say: "Net income of $800,000 increases retained earnings." },
    { l: "Cash dividends", v: [0, 0, -200000, 0], say: "Cash dividends of $200,000 reduce retained earnings and total equity." },
    { l: "10% stock dividend (35,000 shares at $14)", v: [35000, 455000, -490000, 0], say: "A small stock dividend moves $490,000 of market value from retained earnings into common stock and paid-in capital. Total equity doesn’t change." },
    { l: "Purchased 5,000 treasury shares at $15", v: [0, 0, 0, -75000], say: "Buying back 5,000 shares at $15 adds $75,000 of treasury stock, reducing total equity." },
  ];
  function money(n) { return n === 0 ? "—" : (n < 0 ? "(" : "") + "$" + Math.abs(n).toLocaleString() + (n < 0 ? ")" : ""); }

  HUB.register("14-5", {
    summary: "The statement of stockholders’ equity explains every change in every equity account in one table. Its retained earnings column is the statement of retained earnings.",
    objectives: [
      "Explain why companies present a statement of stockholders’ equity",
      "Prepare a statement of stockholders’ equity from the year’s transactions",
      "Relate the retained earnings column to the statement of retained earnings",
      "Describe the international statement of recognized income and expense"
    ],
    html: `
<section class="sec" data-toc="Why it exists">
  <div class="eyebrow kind">Concept</div>
  <h2>One statement for every equity change</h2>
  <p>Companies must present an income statement, balance sheet, statement of retained earnings, and statement of cash flows. They also have to explain changes in the <b>other</b> equity accounts, through notes or separate schedules. Most find it simplest to combine everything into a single <b>statement of stockholders’ equity</b>: one column per equity account, one row per kind of event.</p>
</section>

<section class="sec" data-toc="Build the statement">
  <div class="eyebrow kind try">Try it</div>
  <h2>Barrington Corporation’s year, row by row</h2>
  <p>Step through the year’s equity transactions and watch each column change.</p>
  <div class="panel">
    <div class="seg" role="group" aria-label="Row" id="se-btns"></div>
    <p class="verdict" id="se-say" aria-live="polite"></p>
    <div class="scroll-x"><table class="plain se-t" id="se-t"></table></div>
  </div>
  <p>Read down the <b>Retained earnings</b> column: beginning balance, plus net income, minus dividends (cash and stock), equals ending balance. That column <b>is</b> the statement of retained earnings. The <b>Total</b> column ties to total stockholders’ equity on the balance sheet. Companies may add comparative data for several years.</p>
</section>

<section class="sec" data-toc="International approach">
  <div class="eyebrow kind">Concept</div>
  <h2>The international variation</h2>
  <p>Under international reporting guidelines, this statement is sometimes replaced by a <b>statement of recognized income and expense</b>, which also includes allowed <b>asset revaluations</b> (“revaluation surpluses”). Explanatory notes then describe the changes in the other equity accounts.</p>
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
    <li><span>The statement of stockholders’ equity explains changes in all equity accounts in one place.</span></li>
    <li><span>Columns are equity accounts; rows are events such as stock issued, net income, dividends, and treasury purchases.</span></li>
    <li><span>The retained earnings column is the statement of retained earnings; the total ties to the balance sheet.</span></li>
    <li><span>Stock dividends shift amounts between columns without changing the total.</span></li>
  </ol>
</section>`,

    cards: {
      terms: [
        { term: "Statement of stockholders’ equity", back: "A statement reconciling the beginning and ending balance of every equity account." },
        { term: "Statement of retained earnings", back: "Beginning retained earnings + net income − dividends = ending retained earnings; a column of the equity statement." },
        { term: "Statement of recognized income and expense", back: "An international alternative that includes allowed asset revaluations." },
        { term: "Revaluation surplus", back: "Equity increase from revaluing assets upward, allowed under international rules." }
      ]
    },

    quiz: [
      { q: "A statement of stockholders’ equity shows:", options: ["Only cash flows", "Changes in every equity account during the period", "Only revenues and expenses", "Only retained earnings"], answer: 1, why: "It combines all equity changes." },
      { q: "Which column of the statement of stockholders’ equity corresponds to the statement of retained earnings?", options: ["Common stock", "Treasury stock", "Retained earnings", "Total"], answer: 2, why: "Beginning + net income − dividends." },
      { q: "Barrington issues 50,000 shares of $1 par stock at $12. The paid-in capital in excess of par column increases by:", options: ["$50,000", "$550,000", "$600,000", "$12"], answer: 1, why: "$600,000 − $50,000 par." },
      { q: "A small stock dividend affects the Total column by:", options: ["Increasing it", "Decreasing it", "Nothing", "The market value"], answer: 2, why: "It moves amounts between columns." },
      { q: "Beginning retained earnings $1,500,000, net income $800,000, cash dividends $200,000, stock dividend $490,000. Ending retained earnings:", options: ["$2,100,000", "$1,610,000", "$2,300,000", "$1,810,000"], answer: 1, why: "$1,500,000 + $800,000 − $200,000 − $490,000." },
      { q: "Buying treasury stock appears in the statement as:", options: ["An increase in the treasury stock column (a reduction of total equity)", "Net income", "An increase in retained earnings", "Nothing"], answer: 0, why: "It reduces total equity." },
      { q: "Under international guidelines, a statement may include:", options: ["Revaluation surpluses from asset revaluations", "Only par value", "No retained earnings", "Cash flows only"], answer: 0, why: "The statement of recognized income and expense." }
    ],

    init: function (root) {
      var labels = ["Beginning", "Issue stock", "Net income", "Cash dividends", "Stock dividend", "Treasury stock", "Ending"];
      var bt = root.querySelector("#se-btns");
      bt.innerHTML = labels.map(function (l, k) { return '<button type="button" data-voice-state data-se="' + k + '"' + (k ? '' : ' class="on"') + '>' + l + '</button>'; }).join("");
      function draw(n) {
        var tot = [0, 0, 0, 0], h = '<thead><tr><th></th>' + COLS.map(function (c) { return '<th class="num">' + c + '</th>'; }).join("") + '</tr></thead><tbody>';
        ROWS.forEach(function (r, k) {
          if (k > n && n < 6) return;
          r.v.forEach(function (x, j) { tot[j] += x; });
          var t = r.v.reduce(function (a, b) { return a + b; }, 0);
          h += '<tr' + (k === n ? ' class="hl"' : '') + '><td>' + r.l + '</td>' + r.v.map(function (x) { return '<td class="num">' + money(x) + '</td>'; }).join("") + '<td class="num">' + money(t) + '</td></tr>';
        });
        if (n === 6) h += '<tr class="tot hl"><td><b>Balance, December 31, 20X5</b></td>' + tot.map(function (x) { return '<td class="num"><b>' + money(x) + '</b></td>'; }).join("") + '<td class="num"><b>' + money(tot.reduce(function (a, b) { return a + b; }, 0)) + '</b></td></tr>';
        root.querySelector("#se-t").innerHTML = h + '</tbody>';
        root.querySelector("#se-say").innerHTML = n === 6 ? "Ending balances: common stock $385,000, paid-in capital $3,705,000, retained earnings $1,610,000, less treasury stock $75,000, for total equity of <b>$5,625,000</b>." : ROWS[n].say;
      }
      bt.querySelectorAll("[data-se]").forEach(function (b) { b.addEventListener("click", function () { bt.querySelectorAll("[data-se]").forEach(function (x) { x.classList.toggle("on", x === b); }); draw(+b.getAttribute("data-se")); }); });
      draw(0);
    }
  });
})();

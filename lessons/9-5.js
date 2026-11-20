/* Lesson 9.5 · Investments Requiring Consolidation */
(function () {
  /* [account, Premier, Sledge, elimination debit, elimination credit] */
  var WS = [
    ["Cash", 150000, 60000, 0, 0], ["Accounts receivable", 120000, 70000, 0, 0], ["Inventory", 180000, 95000, 0, 0],
    ["Land", 25000, 75000, 35000, 0], ["Building and equipment", 325000, 150000, 0, 0], ["Investment in Sledge", 400000, 0, 0, 400000],
    ["Goodwill", 0, 0, 65000, 0], ["Accounts payable", -200000, -50000, 0, 0], ["Notes payable", -300000, -100000, 0, 0],
    ["Capital stock", -400000, -200000, 200000, 0], ["Retained earnings", -300000, -100000, 100000, 0]
  ];
  function fmt(n) { return n ? (n < 0 ? "(" : "") + Math.abs(n).toLocaleString() + (n < 0 ? ")" : "") : ""; }

  HUB.register("9-5", {
    summary: "Owning more than half of another company means controlling it, and the parent must consolidate the subsidiary. Work through Premier Tools’ purchase of Sledge Hammer, including goodwill and the consolidation worksheet.",
    objectives: [
      "Explain control and the economic entity concept",
      "Compute the acquisition differential and goodwill",
      "Prepare a consolidated balance sheet at acquisition",
      "Describe consolidation issues for income and intercompany items"
    ],
    html: `
<section class="sec" data-toc="Why companies buy companies">
  <div class="eyebrow kind">Concept</div>
  <h2>Control and the economic entity</h2>
  <p>Thousands of acquisitions happen every year: to eliminate a competitor, gain technology, secure a supply chain, expand distribution, or reach new customers. Usually the acquirer buys a <b>majority</b> of the target’s stock, which gives it <b>control</b>. Control generally starts above 50%, though management contracts and similar arrangements can create control at other levels.</p>
  <p>Premier Tools buys 100% of Sledge Hammer Company. Sledge keeps operating as its own legal company, a <b>subsidiary</b> of its new <b>parent</b>. But accountants see one <b>economic entity</b>, so the parent must <b>consolidate</b>: report all the assets, liabilities, and results of every controlled subsidiary. A conglomerate’s statements are really a combined picture of many companies.</p>
</section>

<section class="sec" data-toc="Paying more than book value">
  <div class="eyebrow kind">Example</div>
  <h2>$400,000 for $300,000 of equity</h2>
  <p>Premier paid <b>$400,000</b> to Sledge’s former owners, not to Sledge. Sledge itself is unaffected, except for having a new owner. Sledge’s books show assets of $450,000 and liabilities of $150,000: equity, or net book value, of <b>$300,000</b>.</p>
  <div class="grid2">
    <div data-widget="statement" data-key="premier"></div>
    <div data-widget="statement" data-key="sledge"></div>
  </div>
  <h3>Explaining the $100,000 acquisition differential</h3>
  <div data-widget="steps" data-key="diff"></div>
</section>

<section class="sec" data-toc="Goodwill">
  <div class="eyebrow kind try">Try it</div>
  <h2>Goodwill</h2>
  <p>When one business buys another for more than the fair value of all its identifiable pieces, the excess is <b>goodwill</b>. A rental store with a great location and loyal customers is worth more than its equipment; a law firm is worth more than its desks and computers; a long-built reputation has value. Many companies have such value, but goodwill is recorded <b>only</b> when it’s purchased in an acquisition.</p>
  <div class="panel"><div data-widget="calc" data-key="gw"></div></div>
</section>

<section class="sec" data-toc="Consolidating">
  <div class="eyebrow kind">Example</div>
  <h2>The consolidation worksheet</h2>
  <p>The first two columns come straight from each company’s books. A <b>worksheet-only</b> entry eliminates Premier’s $400,000 investment against Sledge’s $300,000 of equity and assigns the $100,000 differential to land ($35,000) and goodwill ($65,000). Adding across gives the consolidated amounts.</p>
  <div class="panel scroll-x"><table class="plain consol" id="consol"></table></div>
  <div data-widget="journal" data-key="elim"></div>
  <div class="grid2">
    <div data-widget="statement" data-key="cons"></div>
    <div class="tile"><span class="k">What to notice</span><ul><li>The Investment in Sledge account is gone, replaced by Sledge’s actual assets and liabilities.</li><li>Land is $135,000: Premier’s $25,000 plus Sledge’s land at its <b>$110,000 fair value</b>, not its $75,000 book value.</li><li>Consolidated equity equals Premier’s own equity. Premier already owned Sledge through the investment account.</li></ul></div>
  </div>
</section>

<section class="sec" data-toc="After acquisition">
  <div class="eyebrow kind">Concept</div>
  <h2>After the acquisition</h2>
  <div class="grid2">
    <div class="tile"><span class="k">Consolidated income</span><p>Future income statements add the parent’s and subsidiary’s revenues and expenses. If the parent paid a premium for depreciable assets or inventory, consolidated depreciation or cost of goods sold must be adjusted to the values in the consolidated balance sheet.</p></div>
    <div class="tile warn"><span class="k">Intercompany items</span><p>Sales between affiliates aren’t real sales, and amounts the companies owe each other must be eliminated. Showing money owed to yourself as an asset would be highly inappropriate.</p></div>
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
    <li><span>Control (generally over 50%) makes parent and subsidiary one <b>economic entity</b>; the parent <b>consolidates</b>.</span></li>
    <li><span><b>Acquisition differential</b> = price − subsidiary’s net book value; it’s assigned first to fair value adjustments, the rest to <b>goodwill</b>.</span></li>
    <li><span>Consolidation replaces the investment with the subsidiary’s assets and liabilities at fair value; equity equals the parent’s.</span></li>
    <li><span>Goodwill is recorded only when purchased.</span></li>
    <li><span>Intercompany sales and balances are eliminated.</span></li>
  </ol>
</section>`,

    data: {
      premier: { entity: "Premier Tools Company", title: "Balance Sheet (separate)", date: "Immediately after acquisition", cols: 2, rows: [
        { l: "Cash", a: 150000 }, { l: "Accounts receivable", a: 120000 }, { l: "Inventory", a: 180000 }, { l: "Land", a: 25000 },
        { l: "Building and equipment", a: 325000 }, { l: "Investment in Sledge", a: 400000, ua: true, link: "inv" }, { l: "Total assets", b: 1200000, bold: true, uub: true },
        { l: "Accounts payable", a: 200000 }, { l: "Notes payable", a: 300000, ua: true }, { l: "Total liabilities", b: 500000 },
        { l: "Capital stock", a: 400000 }, { l: "Retained earnings", a: 300000, ua: true }, { l: "Total equity", b: 700000, ub: true },
        { l: "Total liabilities and equity", b: 1200000, bold: true, uub: true } ] },
      sledge: { entity: "Sledge Hammer Company", title: "Balance Sheet", date: "Date of acquisition", cols: 2, rows: [
        { l: "Cash", a: 60000 }, { l: "Accounts receivable", a: 70000 }, { l: "Inventory", a: 95000 }, { l: "Land (fair value $110,000)", a: 75000 },
        { l: "Building and equipment", a: 150000, ua: true }, { l: "Total assets", b: 450000, bold: true, uub: true },
        { l: "Accounts payable", a: 50000 }, { l: "Notes payable", a: 100000, ua: true }, { l: "Total liabilities", b: 150000 },
        { l: "Capital stock", a: 200000 }, { l: "Retained earnings", a: 100000, ua: true }, { l: "Total equity", b: 300000, ub: true, link: "inv" },
        { l: "Total liabilities and equity", b: 450000, bold: true, uub: true } ] },
      diff: { items: [
        { t: "The differential", b: "<p>$400,000 price − $300,000 book value = <b>$100,000</b> paid in excess of book value: the <b>acquisition differential</b>.</p>" },
        { t: "Fair value of land", b: "<p>Assets aren’t necessarily on the books at fair value. Sledge’s land is carried at $75,000 but worth $110,000: <b>$35,000</b> of the differential. All other identifiable assets and liabilities are assumed to be at fair value.</p>" },
        { t: "Goodwill", b: "<p>The remaining $100,000 − $35,000 = <b>$65,000</b> is goodwill.</p>" }
      ]},
      gw: {
        inputs: [{ id: "p", label: "Price Premier pays for 100% of Sledge", min: 350000, max: 500000, step: 50000, value: 400000, fmt: "$" }],
        run: function (v, money) {
          var d = v.p - 300000, gw = d - 35000;
          return { html: '<div class="statement"><div class="st-row"><span class="st-l">Purchase price</span><span class="st-b">' + money(v.p) + '</span></div><div class="st-row"><span class="st-l">Less: Sledge’s book value</span><span class="st-b"><span class="u">' + money(-300000) + '</span></span></div><div class="st-row"><span class="st-l">Acquisition differential</span><span class="st-b">' + money(d) + '</span></div><div class="st-row"><span class="st-l">Less: land written up to fair value</span><span class="st-b"><span class="u">' + money(-35000) + '</span></span></div><div class="st-row bold"><span class="st-l">Goodwill</span><span class="st-b"><span class="uu">' + money(gw) + '</span></span></div></div>',
            say: "Paying " + money(v.p) + " creates a " + money(d) + " differential: $35,000 to land and <b>" + money(gw) + "</b> of goodwill." };
        }
      },
      elim: { entries: [{ date: "Worksheet only", lines: [["Capital Stock (Sledge)", 200000, 0], ["Retained Earnings (Sledge)", 100000, 0], ["Land", 35000, 0], ["Goodwill", 65000, 0], ["Investment in Sledge", 0, 400000]], memo: "Eliminate the investment against Sledge’s equity and allocate the differential" }] },
      cons: { entity: "Premier Tools and Subsidiary", title: "Consolidated Balance Sheet", date: "Date of acquisition", cols: 2, rows: [
        { l: "Cash", a: 210000 }, { l: "Accounts receivable", a: 190000 }, { l: "Inventory", a: 275000 }, { l: "Land", a: 135000 },
        { l: "Building and equipment", a: 475000 }, { l: "Goodwill", a: 65000, ua: true }, { l: "Total assets", b: 1350000, bold: true, uub: true },
        { l: "Accounts payable", a: 250000 }, { l: "Notes payable", a: 400000, ua: true }, { l: "Total liabilities", b: 650000 },
        { l: "Capital stock", a: 400000 }, { l: "Retained earnings", a: 300000, ua: true }, { l: "Total equity", b: 700000, ub: true },
        { l: "Total liabilities and equity", b: 1350000, bold: true, uub: true } ] }
    },

    cards: {
      terms: [
        { term: "Control", back: "Power over another company, generally from owning more than 50% of its stock." },
        { term: "Parent / subsidiary", back: "The controlling company and the company it controls." },
        { term: "Economic entity concept", back: "Parent and subsidiaries are reported as one economic unit despite being separate legal companies." },
        { term: "Consolidation", back: "Combining the parent’s and subsidiaries’ financial statements into one set." },
        { term: "Acquisition differential", back: "Price paid minus the subsidiary’s net book value." },
        { term: "Goodwill", back: "The excess of an acquisition’s price over the fair value of identifiable net assets; recorded only when purchased." },
        { term: "Elimination entry", back: "A worksheet-only entry that removes the investment and intercompany items during consolidation." }
      ]
    },

    quiz: [
      { q: "Control of another company is generally established at ownership above:", options: ["20%", "35%", "50%", "90%"], answer: 2, why: "A majority stake usually gives control." },
      { q: "Premier pays $400,000 for Sledge, whose equity is $300,000. The acquisition differential is:", options: ["$300,000", "$100,000", "$400,000", "$65,000"], answer: 1, why: "$400,000 − $300,000." },
      { q: "Sledge’s land is worth $35,000 more than book value. Goodwill is:", options: ["$100,000", "$65,000", "$35,000", "$135,000"], answer: 1, why: "$100,000 − $35,000." },
      { q: "On the consolidated balance sheet, Land is:", options: ["$100,000 ($25,000 + $75,000)", "$135,000 ($25,000 + $110,000)", "$110,000", "$75,000"], answer: 1, why: "The subsidiary’s land enters at fair value." },
      { q: "After consolidation, the Investment in Sledge account:", options: ["Is reported as a long-term investment", "Is eliminated and replaced by Sledge’s assets and liabilities", "Becomes goodwill", "Is added to equity"], answer: 1, why: "Consolidation replaces the investment with what it represents." },
      { q: "Consolidated stockholders’ equity at acquisition equals:", options: ["Premier’s equity plus Sledge’s equity", "Premier’s equity", "Sledge’s equity", "Total assets"], answer: 1, why: "Sledge’s equity is eliminated against the investment." },
      { q: "Goodwill is recorded:", options: ["Whenever a company has a good reputation", "Only when it arises from acquiring another business", "Every year based on appraisals", "Never"], answer: 1, why: "Internally developed goodwill isn’t recorded." },
      { q: "Sales between a parent and its subsidiary are:", options: ["Reported as consolidated revenue", "Eliminated in consolidation", "Reported as gains", "Reported only by the parent"], answer: 1, why: "Internal transactions aren’t real sales." }
    ],

    init: function (root) {
      var h = '<thead><tr><th>Account</th><th class="num">Premier</th><th class="num">Sledge</th><th class="num">Debit</th><th class="num">Credit</th><th class="num">Consolidated</th></tr></thead><tbody>';
      WS.forEach(function (r) { var c = r[1] + r[2] + r[3] - r[4]; h += '<tr><td>' + r[0] + '</td><td class="num">' + fmt(r[1]) + '</td><td class="num">' + fmt(r[2]) + '</td><td class="num">' + fmt(r[3]) + '</td><td class="num">' + fmt(r[4]) + '</td><td class="num"><b>' + fmt(c) + '</b></td></tr>'; });
      root.querySelector("#consol").innerHTML = h + '</tbody><tfoot><tr><td colspan="6" class="hint">Credit balances shown in parentheses.</td></tr></tfoot>';
    }
  });
})();

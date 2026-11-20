/* Lesson 1.3 · The Accounting Equation */
HUB.register("1-3", {
  summary: "The 500-year-old equation every accounting system is built on, what assets, liabilities, and owners’ equity are, and how the equation becomes the balance sheet.",
  objectives: [
    "State the accounting equation and rearrange it",
    "Define assets, liabilities, and owners’ equity with examples",
    "Name three business entity forms and how their equity is shown",
    "Connect the equation to the balance sheet"
  ],
  html: `
<section class="sec" data-toc="The equation">
  <div class="eyebrow kind">Concept</div>
  <h2>One equation holds the whole system together</h2>
  <p>Today’s accounting model goes back more than 500 years to <b>Luca Pacioli</b>, a Renaissance-era monk who devised a method for tracking whether trading ventures succeeded or failed. His approach is still the cornerstone of even the most elaborate computerized systems.</p>
  <p>The core idea: a business is a collection of <b>assets</b> plus the <b>claims</b> against those assets. Creditors have claims (liabilities), and owners have claims (owners’ equity).</p>
  <div class="big-eq"><span class="a">Assets</span> = <span class="l">Liabilities</span> + <span class="e">Owners’ Equity</span></div>
  <p>Because it’s an equation, you can rearrange it. The most useful variation: <b>Assets − Liabilities = Owners’ Equity</b>. Whatever is left after paying every creditor belongs to the owners.</p>
  <div class="panel">
    <div class="panel-title"><h3>Solve for owners’ equity</h3><span class="hint">Drag the sliders</span></div>
    <div data-widget="calc" data-key="solve"></div>
  </div>
</section>

<section class="sec" data-toc="The three elements">
  <div class="eyebrow kind">Concept</div>
  <h2>Assets, liabilities, and owners’ equity</h2>
  <div class="grid3">
    <div class="tile"><span class="k">Assets</span><h4>What the business owns</h4><p>The entity’s <b>economic resources</b>, which carry probable future economic benefits.</p><ul><li>Cash</li><li>Accounts receivable (amounts customers owe the firm)</li><li>Inventories</li><li>Land, buildings, equipment</li><li>Intangibles such as patents and other legal rights</li></ul></div>
    <div class="tile warn"><span class="k">Liabilities</span><h4>What the business owes</h4><p>Amounts owed to others from loans, purchases on credit, and other obligations arising in the course of business.</p><p>The key idea is an <b>existing obligation</b> to pay or to perform some duty.</p></div>
    <div class="tile alt"><span class="k">Owners’ equity</span><h4>The owners’ stake</h4><p>What’s left for the owners. It’s also called <b>net assets</b>, because it equals assets minus liabilities.</p></div>
  </div>
  <div class="panel">
    <div class="panel-title"><h3>Classify each item</h3><span class="hint">Asset, liability, or equity?</span></div>
    <div data-widget="sorter" data-key="classify"></div>
  </div>
</section>

<section class="sec" data-toc="Who are the owners?">
  <div class="eyebrow kind">Concept</div>
  <h2>Who the “owners” are depends on the entity’s legal form</h2>
  <div class="panel scroll-x">
    <table class="plain">
      <thead><tr><th>Entity form</th><th>Owned by</th><th>How equity is shown</th></tr></thead>
      <tbody>
        <tr><td><b>Sole proprietorship</b></td><td>One person</td><td>A single owner’s capital account</td></tr>
        <tr><td><b>Partnership</b></td><td>Two or more people</td><td>A separate capital account for each partner</td></tr>
        <tr><td><b>Corporation</b></td><td>Shareholders, who hold easily transferable shares of stock</td><td>Stockholders’ equity: capital stock plus retained earnings</td></tr>
      </tbody>
    </table>
  </div>
  <h3>A corporation’s equity has two main parts</h3>
  <div class="grid2">
    <div class="tile"><span class="k">Capital stock</span><p>What shareholders <b>invested</b> in the company in exchange for its stock.</p></div>
    <div class="tile alt"><span class="k">Retained earnings</span><p>Earnings the company has generated and <b>kept</b> rather than paid out as dividends.</p><p><b>Up:</b> net income. <b>Down:</b> net losses and dividends.</p></div>
  </div>
  <p><b>Dividends</b> are distributions to shareholders as a return on their investment. They reduce retained earnings because earnings that are paid out are no longer retained.</p>
</section>

<section class="sec" data-toc="The balance sheet">
  <div class="eyebrow kind try">Example</div>
  <h2>The balance sheet is the equation on paper</h2>
  <p>The <b>balance sheet</b> (also called the <b>statement of financial position</b>) lists the assets, liabilities, and equity at one moment in time. Here is Edelweiss Corporation. Its assets total $895,000, creditors are owed $175,000, and that leaves $720,000 of stockholders’ equity.</p>
  <div data-widget="statement" data-key="edelweiss"></div>
  <div class="big-eq"><span class="a">$895,000</span> = <span class="l">$175,000</span> + <span class="e">$720,000</span></div>
  <p>The $720,000 of equity has two sources: <b>$120,000</b> stockholders originally invested (capital stock) and <b>$600,000</b> the company earned and retained over its life.</p>
  <div class="callout watch">
    <div class="label">Watch out</div>
    <p><b>Is Edelweiss worth $720,000? No.</b> Many assets aren’t reported at current value: the land cost $125,000, but the balance sheet doesn’t show what it’s worth today. The company may also have valuable resources that aren’t recorded at all, like a trade secret or a strong brand, or risks that aren’t obvious, like a pending lawsuit. Financial statements are important for investment and credit decisions, but they are not the only source of information.</p>
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
    <li><span><b>Assets = Liabilities + Owners’ Equity</b>, and therefore Assets − Liabilities = Owners’ Equity.</span></li>
    <li><span><b>Assets</b> are economic resources with probable future benefits. <b>Liabilities</b> are existing obligations to others. <b>Equity</b> is the owners’ stake, or net assets.</span></li>
    <li><span>A proprietorship has one capital account, a partnership has one per partner, and a corporation reports <b>stockholders’ equity</b>: capital stock plus retained earnings.</span></li>
    <li><span><b>Retained earnings</b> rise with income and fall with losses and dividends.</span></li>
    <li><span>The <b>balance sheet</b> presents the equation at a point in time. Equity on the balance sheet is not the value of the business.</span></li>
  </ol>
</section>`,

  data: {
    solve: {
      inputs: [
        { id: "a", label: "Total assets", min: 0, max: 1000000, step: 50000, value: 900000, fmt: "$" },
        { id: "l", label: "Total liabilities", min: 0, max: 1000000, step: 50000, value: 200000, fmt: "$" }
      ],
      run: function (v, money) {
        var e = v.a - v.l;
        var pa = v.a ? Math.round(100 * Math.min(v.l, v.a) / v.a) : 0;
        var html = '<div class="big-eq" style="font-size:22px"><span class="a">' + money(v.a) + '</span> − <span class="l">' + money(v.l) + '</span> = <span class="e">' + money(e) + '</span></div>' +
          '<div class="meter"><div class="meter-top"><span>Share of assets claimed by creditors</span><span class="num">' + (v.a ? pa + "%" : "—") + '</span></div><div class="meter-track"><div class="meter-fill amber" style="width:' + pa + '%"></div></div></div>';
        var say = e > 0 ? "Owners’ equity is <b>" + money(e) + "</b>. That’s what would be left for the owners after every creditor is paid."
          : e === 0 ? "Owners’ equity is <b>zero</b>. Creditors have claims on every dollar of assets."
          : "Liabilities exceed assets by <b>" + money(-e) + "</b>. Owners’ equity is negative, a deficit.";
        return { html: html, say: say };
      }
    },
    edelweiss: {
      entity: "Edelweiss Corporation", title: "Balance Sheet", date: "December 31, 20X5", cols: 2,
      rows: [
        { l: "Assets", head: true },
        { l: "Cash", a: 25000, ind: 1 },
        { l: "Accounts receivable", a: 50000, ind: 1 },
        { l: "Inventory", a: 45000, ind: 1 },
        { l: "Land", a: 125000, ind: 1 },
        { l: "Building", a: 400000, ind: 1 },
        { l: "Equipment", a: 250000, ind: 1, ua: true },
        { l: "Total assets", b: 895000, bold: true, uub: true },
        { gap: true },
        { l: "Liabilities", head: true },
        { l: "Accounts payable", a: 50000, ind: 1 },
        { l: "Loans payable", a: 125000, ind: 1, ua: true },
        { l: "Total liabilities", b: 175000, bold: true },
        { l: "Stockholders’ equity", head: true },
        { l: "Capital stock", a: 120000, ind: 1 },
        { l: "Retained earnings", a: 600000, ind: 1, ua: true },
        { l: "Total stockholders’ equity", b: 720000, bold: true, ub: true },
        { l: "Total liabilities and equity", b: 895000, bold: true, uub: true }
      ]
    }
  },

  sorters: {
    classify: {
      categories: [{ id: "a", label: "Asset" }, { id: "l", label: "Liability" }, { id: "e", label: "Equity" }],
      items: [
        { text: "Cash in the company’s bank account", cat: "a", why: "Cash is the most basic economic resource." },
        { text: "Accounts receivable: amounts customers owe the company", cat: "a", why: "The right to collect from customers is a resource with future benefit." },
        { text: "A bank loan the company must repay next year", cat: "l", why: "It’s an existing obligation to pay someone else." },
        { text: "A patent on the company’s product design", cat: "a", why: "Intangible legal rights are assets too." },
        { text: "Capital stock issued to investors", cat: "e", why: "Capital stock is the owners’ investment in a corporation." },
        { text: "Amounts owed to suppliers for goods bought on credit", cat: "l", why: "Purchases on credit create obligations to pay." },
        { text: "Retained earnings", cat: "e", why: "Earnings kept in the business belong to the owners." },
        { text: "Delivery trucks and warehouse equipment", cat: "a", why: "Equipment is a resource the business owns and uses." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Accounting equation", back: "Assets = Liabilities + Owners’ Equity." },
      { term: "Assets", back: "Economic resources of the entity that carry probable future economic benefits." },
      { term: "Accounts receivable", back: "Amounts owed to a firm by its customers." },
      { term: "Liabilities", back: "Existing obligations to pay or perform, from loans, credit, and other business activity." },
      { term: "Owners’ equity", sub: "also called net assets", back: "The owners’ stake in the business: assets minus liabilities." },
      { term: "Sole proprietorship", back: "A business owned by one person, with a single owner’s capital account." },
      { term: "Partnership", back: "A business owned by more than one person, with a capital account for each partner." },
      { term: "Corporation", back: "An entity whose ownership is divided into transferable shares of stock." },
      { term: "Capital stock", back: "The amount shareholders invested in the corporation for its stock." },
      { term: "Retained earnings", back: "Earnings kept in the business. Increased by income, decreased by losses and dividends." },
      { term: "Dividends", back: "Distributions to shareholders as a return on their investment." },
      { term: "Balance sheet", sub: "statement of financial position", back: "A statement of assets, liabilities, and equity at a specific date." }
    ]
  },

  quiz: [
    { q: "Which is the fundamental accounting equation?", options: ["Assets + Liabilities = Owners’ Equity", "Assets = Liabilities + Owners’ Equity", "Assets = Liabilities − Owners’ Equity", "Revenues − Expenses = Assets"], answer: 1, why: "Assets equal the claims against them: liabilities (creditors) plus owners’ equity (owners)." },
    { q: "A company has assets of $500,000 and liabilities of $180,000. Owners’ equity is:", options: ["$680,000", "$180,000", "$320,000", "$500,000"], answer: 2, why: "Assets − Liabilities = Equity: $500,000 − $180,000 = $320,000." },
    { q: "Which item is an asset?", options: ["Loans payable", "Retained earnings", "Accounts receivable", "Capital stock"], answer: 2, why: "Accounts receivable, amounts customers owe, is a resource with future benefit." },
    { q: "The key idea behind a liability is:", options: ["An existing obligation to pay or perform a duty", "A resource that will produce future benefits", "The owners’ investment in the business", "Income that has not been paid out"], answer: 0, why: "Liabilities are existing obligations to others." },
    { q: "Owners’ equity is sometimes called:", options: ["Net income", "Net assets", "Gross assets", "Working capital"], answer: 1, why: "Because equity equals assets minus liabilities, it’s also called net assets." },
    { q: "A business owned by one person whose equity is a single capital account is a:", options: ["Corporation", "Partnership", "Sole proprietorship", "Not-for-profit"], answer: 2, why: "A sole proprietorship has one owner and one owner’s capital account." },
    { q: "Which of these decreases retained earnings?", options: ["Net income", "Issuing capital stock", "Collecting a receivable", "Dividends"], answer: 3, why: "Retained earnings falls with dividends and net losses and rises with net income." },
    { q: "Edelweiss reports stockholders’ equity of $720,000. What does this tell you?", options: ["The business would sell for exactly $720,000", "Assets minus liabilities, measured mostly at historical cost, equal $720,000", "The company has $720,000 in cash", "Shareholders invested $720,000"], answer: 1, why: "Equity is a residual based on recorded amounts, many at historical cost. It isn’t the market value of the business." },
    { q: "Another name for the balance sheet is the:", options: ["Statement of financial position", "Statement of operations", "Statement of cash flows", "Statement of retained earnings"], answer: 0, why: "The balance sheet is also called the statement of financial position." }
  ]
});

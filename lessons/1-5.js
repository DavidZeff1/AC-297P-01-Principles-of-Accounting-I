/* Lesson 1.5 · Four Core Financial Statements */
HUB.register("1-5", {
  summary: "What financial reports can and can’t tell an investor, the four core statements with their headings and dates, and how the statements lock together so the balance sheet balances.",
  objectives: [
    "Name the four core financial statements and what each reports",
    "Head each statement correctly: point in time or period of time",
    "Explain why cash from operations can differ from net income",
    "Trace how the statements tie together (articulate)"
  ],
  html: `
<section class="sec" data-toc="What investors want">
  <div class="eyebrow kind">Concept</div>
  <h2>What would you want to know before investing?</h2>
  <p>Someday you’ll have chances to buy a company’s <b>stock</b> or lend it money by buying its <b>bonds</b>. <b>Public</b> companies have securities traded on organized stock markets. Many more companies are <b>private</b>: their stock and debt are held by a small group of investors and banks.</p>
  <p>Before investing, almost everyone asks the same kinds of questions. Some are financial and can be answered in numbers. Others can’t be expressed in strict mathematical terms.</p>
  <div class="panel">
    <div class="panel-title"><h3>Will the financial statements answer it?</h3><span class="hint">Sort each question</span></div>
    <div data-widget="sorter" data-key="cloud"></div>
  </div>
  <h3>Other sources of information</h3>
  <p>Notes to the statements add insight, and investors also read company websites (many have investor sections), filings with securities regulators, and the financial press. Most companies hold annual shareholder meetings and quarterly webcasts where investors can question management.</p>
  <div class="callout watch">
    <div class="label">Watch out</div>
    <p>Don’t expect a company to give you private “special insight.” Securities laws strictly limit disclosing information to one investor or group. Anonymous message boards are rarely helpful, and analysts’ reports can be thought-provoking but aren’t always objective.</p>
  </div>
</section>

<section class="sec" data-toc="The four statements">
  <div class="eyebrow kind">Concept</div>
  <h2>Four standardized reports</h2>
  <p>Financial accounting communicates through a standard set of statements. Rules govern their form and content, but there’s room for variation in layout: a balance sheet can be <b>horizontal</b> (assets beside claims) or <b>vertical</b> (assets above claims), and both are acceptable.</p>
  <div class="panel scroll-x">
    <table class="plain">
      <thead><tr><th>Statement</th><th>Answers</th><th>Time frame</th></tr></thead>
      <tbody>
        <tr><td><b>Income statement</b></td><td>How much did we earn? Revenues − expenses = net income or net loss</td><td>A period: “For the Year Ended…”</td></tr>
        <tr><td><b>Statement of retained earnings</b></td><td>How did retained earnings change? Beginning + net income − dividends = ending</td><td>A period</td></tr>
        <tr><td><b>Balance sheet</b></td><td>What do we own and owe? Assets = liabilities + equity</td><td>A point in time: “December 31, 20X3”</td></tr>
        <tr><td><b>Statement of cash flows</b></td><td>Where did cash come from and go? Operating, investing, financing</td><td>A period</td></tr>
      </tbody>
    </table>
  </div>
  <p>The balance sheet portrays <b>financial position</b> at a moment. The other statements report <b>results of operations</b> over a span of time, which is why their headings say “For the Year Ended.”</p>
</section>

<section class="sec" data-toc="Quartz statements">
  <div class="eyebrow kind try">Example</div>
  <h2>Quartz Corporation’s statements</h2>
  <p>Step through the four statements for one company. The figures are connected: the next section shows how.</p>
  <div data-widget="steps" data-key="tour"></div>
  <div class="grid2">
    <div data-widget="statement" data-key="is"></div>
    <div data-widget="statement" data-key="re"></div>
  </div>
  <div class="grid2">
    <div data-widget="statement" data-key="bs"></div>
    <div data-widget="statement" data-key="cf"></div>
  </div>
</section>

<section class="sec" data-toc="Cash vs. income">
  <div class="eyebrow kind">Concept</div>
  <h2>Cash from operations isn’t the same as net income</h2>
  <p>Quartz earned <b>$80,000</b> of net income but generated only <b>$35,000</b> of cash from operating activities. Some items create income and cash in different periods. Remember Edelweiss providing services on account: income went up, but no cash came in yet. These timing differences tend to even out over time.</p>
  <div class="grid2">
    <div class="tile"><span class="k">Dividends</span><p>Paying dividends is a <b>financing</b> cash outflow, but it’s <b>not an expense</b>. Dividends are a distribution of income, so they appear on the statement of retained earnings, not the income statement.</p></div>
    <div class="tile alt"><span class="k">Loan proceeds</span><p>Borrowing brings in cash but isn’t income. It’s a <b>financing</b> inflow.</p></div>
  </div>
  <p>Don’t worry if the cash flow statement isn’t fully clear yet. It takes a fairly complete knowledge of accounting, and a later chapter is devoted to it.</p>
</section>

<section class="sec" data-toc="How they tie together">
  <div class="eyebrow kind try">Try it</div>
  <h2>The statements articulate</h2>
  <p>The income statement, statement of retained earnings, and balance sheet <b>articulate</b>: they mesh together and balance themselves. <b>Tap a highlighted figure</b> to light up everywhere it appears.</p>
  <div class="grid3">
    <div data-widget="statement" data-key="is2"></div>
    <div data-widget="statement" data-key="re2"></div>
    <div data-widget="statement" data-key="bs2"></div>
  </div>
  <div data-widget="steps" data-key="tie"></div>
  <p>It can seem almost magical that carrying ending retained earnings to the balance sheet makes it balance exactly. That’s the brilliance of Pacioli’s model, and why it has lasted for centuries.</p>
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
    <li><span>The four core statements: <b>income statement</b>, <b>statement of retained earnings</b>, <b>balance sheet</b>, and <b>statement of cash flows</b>.</span></li>
    <li><span>The balance sheet is dated at a <b>point in time</b>; the others cover a <b>period</b> (“For the Year Ended…”).</span></li>
    <li><span>Cash flows are grouped into <b>operating</b>, <b>investing</b>, and <b>financing</b> activities. Operating cash flow can differ from net income.</span></li>
    <li><span><b>Dividends are not an expense.</b> They reduce retained earnings and are a financing cash outflow.</span></li>
    <li><span>Net income flows into retained earnings, and ending retained earnings flows onto the balance sheet, which then balances.</span></li>
  </ol>
</section>`,

  data: (function () {
    var IS = { entity: "Quartz Corporation", title: "Income Statement", date: "For the Year Ended December 31, 20X3", cols: 2, rows: [
      { l: "Revenues", head: true },
      { l: "Sales", a: 650000, ind: 1 },
      { l: "Interest income", a: 10000, ind: 1, ua: true },
      { l: "Total revenues", b: 660000 },
      { l: "Expenses", head: true },
      { l: "Cost of goods sold", a: 350000, ind: 1 },
      { l: "Selling expenses", a: 75000, ind: 1 },
      { l: "General and administrative", a: 90000, ind: 1 },
      { l: "Interest expense", a: 20000, ind: 1 },
      { l: "Income taxes", a: 45000, ind: 1, ua: true },
      { l: "Total expenses", b: 580000, ub: true },
      { l: "Net income", b: 80000, bold: true, uub: true, link: "ni" }
    ]};
    var RE = { entity: "Quartz Corporation", title: "Statement of Retained Earnings", date: "For the Year Ended December 31, 20X3", rows: [
      { l: "Retained earnings, January 1", a: 220000 },
      { l: "Plus: Net income", a: 80000, ua: true, link: "ni" },
      { l: "Subtotal", a: 300000, ind: 1 },
      { l: "Less: Dividends", a: -30000, ua: true, link: "div" },
      { l: "Retained earnings, December 31", a: 270000, bold: true, uua: true, link: "re" }
    ]};
    var BS = { entity: "Quartz Corporation", title: "Balance Sheet", date: "December 31, 20X3", cols: 2, rows: [
      { l: "Assets", head: true },
      { l: "Cash", a: 60000, ind: 1, link: "cash" },
      { l: "Accounts receivable", a: 90000, ind: 1 },
      { l: "Inventory", a: 130000, ind: 1 },
      { l: "Land", a: 100000, ind: 1 },
      { l: "Building and equipment", a: 420000, ind: 1, ua: true },
      { l: "Total assets", b: 800000, bold: true, uub: true, link: "bal" },
      { gap: true },
      { l: "Liabilities", head: true },
      { l: "Accounts payable", a: 70000, ind: 1 },
      { l: "Loans payable", a: 210000, ind: 1, ua: true },
      { l: "Total liabilities", b: 280000 },
      { l: "Stockholders’ equity", head: true },
      { l: "Capital stock", a: 250000, ind: 1 },
      { l: "Retained earnings", a: 270000, ind: 1, ua: true, link: "re" },
      { l: "Total stockholders’ equity", b: 520000, ub: true },
      { l: "Total liabilities and equity", b: 800000, bold: true, uub: true, link: "bal" }
    ]};
    var CF = { entity: "Quartz Corporation", title: "Statement of Cash Flows", date: "For the Year Ended December 31, 20X3", cols: 2, rows: [
      { l: "Operating activities", head: true },
      { l: "Cash received from customers", a: 630000, ind: 1 },
      { l: "Interest received", a: 10000, ind: 1 },
      { l: "Cash paid for inventory", a: -380000, ind: 1 },
      { l: "Cash paid for selling and administrative costs", a: -160000, ind: 1 },
      { l: "Interest paid", a: -20000, ind: 1 },
      { l: "Income taxes paid", a: -45000, ind: 1, ua: true },
      { l: "Cash provided by operating activities", b: 35000 },
      { l: "Investing activities", head: true },
      { l: "Purchase of equipment", b: -60000 },
      { l: "Financing activities", head: true },
      { l: "Proceeds of loan", a: 50000, ind: 1 },
      { l: "Dividends paid", a: -30000, ind: 1, ua: true, link: "div" },
      { l: "Cash provided by financing activities", b: 20000, ub: true },
      { l: "Net decrease in cash", b: -5000 },
      { l: "Cash, January 1", b: 65000, ub: true },
      { l: "Cash, December 31", b: 60000, bold: true, uub: true, link: "cash" }
    ]};
    function short(st, keep) { return { entity: st.entity, title: st.title, date: st.date, cols: st.cols, rows: st.rows.filter(keep) }; }
    return {
      is: IS, re: RE, bs: BS, cf: CF,
      is2: short(IS, function (r) { return /Total|Net income/.test(r.l); }),
      re2: RE,
      bs2: short(BS, function (r) { return /Total|Retained|Capital/.test(r.l); }),
      tour: { items: [
        { t: "Income statement", b: "<p>Revenues of $660,000 minus expenses of $580,000 leave <b>net income of $80,000</b> for the year. Its heading names a <b>period</b>: “For the Year Ended December 31, 20X3.”</p>" },
        { t: "Retained earnings", b: "<p>Retained earnings started the year at $220,000, grew by the $80,000 of net income, and fell by $30,000 of dividends, ending at <b>$270,000</b>. It’s a bridge between two successive balance sheets.</p>" },
        { t: "Balance sheet", b: "<p>At <b>December 31, 20X3</b>, Quartz has $800,000 of assets, claimed by $280,000 of liabilities and $520,000 of stockholders’ equity, including the $270,000 of retained earnings.</p>" },
        { t: "Cash flows", b: "<p>Operating activities provided $35,000, investing used $60,000 for equipment, and financing provided $20,000 (a $50,000 loan less $30,000 of dividends). Cash fell $5,000, from $65,000 to <b>$60,000</b>, the amount on the balance sheet.</p>" }
      ]},
      tie: { items: [
        { t: "Income to retained earnings", b: "<p>The <b>$80,000</b> net income on the income statement is added on the statement of retained earnings.</p>" },
        { t: "Retained earnings to balance sheet", b: "<p>Ending retained earnings of <b>$270,000</b> appears in stockholders’ equity on the balance sheet.</p>" },
        { t: "The balance sheet balances", b: "<p>With retained earnings in place, liabilities and equity total <b>$800,000</b>, exactly matching total assets.</p>" },
        { t: "Cash ties too", b: "<p>The statement of cash flows ends at <b>$60,000</b>, the same cash reported on the balance sheet.</p>" }
      ]}
    };
  })(),

  sorters: {
    cloud: {
      categories: [{ id: "fs", label: "Financial statements" }, { id: "other", label: "Other sources" }],
      items: [
        { text: "How much income is the company generating?", cat: "fs", why: "Net income is reported on the income statement." },
        { text: "What assets does the company own?", cat: "fs", why: "The balance sheet lists the assets." },
        { text: "Does the company pay dividends?", cat: "fs", why: "Dividends appear on the statement of retained earnings and in financing cash flows." },
        { text: "What is the corporate policy on ethics and the environment?", cat: "other", why: "Policies like these can’t be stated in strict numbers. Look to supplemental disclosures and company reports." },
        { text: "How much does the company owe its lenders?", cat: "fs", why: "Liabilities are reported on the balance sheet." },
        { text: "How capable and trustworthy is its management team?", cat: "other", why: "Management quality isn’t measured in the statements." },
        { text: "Where did this year’s cash come from?", cat: "fs", why: "That’s exactly what the statement of cash flows shows." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Public company", back: "A company whose securities trade on organized stock markets." },
      { term: "Private company", back: "A company whose stock and debt are held by a narrow group of investors and banks." },
      { term: "Bonds", back: "Debt instruments a company sells to borrow money from investors." },
      { term: "Income statement", back: "Revenues and expenses for a period, ending in net income or net loss." },
      { term: "Statement of retained earnings", back: "Beginning retained earnings + net income − dividends = ending retained earnings, for a period." },
      { term: "Statement of stockholders’ equity", back: "Used in place of the retained earnings statement; shows changes in all equity accounts." },
      { term: "Balance sheet", back: "Assets, liabilities, and equity at a specific date: financial position." },
      { term: "Statement of cash flows", back: "Cash inflows and outflows for a period, grouped into operating, investing, and financing activities." },
      { term: "Articulation", back: "The way the statements mesh together: net income flows to retained earnings, which flows to the balance sheet." },
      { term: "Financing activities", back: "Cash flows with owners and lenders, such as loan proceeds and dividends paid." }
    ]
  },

  quiz: [
    { q: "Which is NOT one of the four core financial statements?", options: ["Income statement", "Balance sheet", "Statement of cash flows", "Statement of management goals"], answer: 3, why: "The four are the income statement, statement of retained earnings, balance sheet, and statement of cash flows." },
    { q: "Which statement is dated at a single point in time?", options: ["Income statement", "Balance sheet", "Statement of retained earnings", "Statement of cash flows"], answer: 1, why: "The balance sheet shows financial position as of a specific date; the others cover a period." },
    { q: "Which heading is correct for an income statement?", options: ["December 31, 20X3", "As of December 31, 20X3", "For the Year Ended December 31, 20X3", "Fiscal Position 20X3"], answer: 2, why: "The income statement reports results over a period, so its heading names the period." },
    { q: "Beginning retained earnings $220,000, net income $80,000, dividends $30,000. Ending retained earnings is:", options: ["$270,000", "$330,000", "$300,000", "$170,000"], answer: 0, why: "$220,000 + $80,000 − $30,000 = $270,000." },
    { q: "Dividends paid to shareholders are:", options: ["An operating expense", "A distribution of income, not an expense", "Revenue", "An investing activity"], answer: 1, why: "Dividends reduce retained earnings and are a financing outflow, but they aren’t an expense." },
    { q: "The three sections of the statement of cash flows are:", options: ["Assets, liabilities, and equity", "Revenues, expenses, and dividends", "Operating, investing, and financing", "Current, long-term, and equity"], answer: 2, why: "Cash flows are grouped by operating, investing, and financing activities." },
    { q: "Why can cash from operations differ from net income?", options: ["Because some items create income and cash in different periods", "Because net income includes dividends", "Because cash flows ignore revenue", "They can never differ"], answer: 0, why: "For example, revenue earned on account raises income before any cash arrives." },
    { q: "Proceeds from a bank loan appear on the statement of cash flows as a(n):", options: ["Operating inflow", "Investing inflow", "Financing inflow", "Revenue"], answer: 2, why: "Borrowing is a financing activity, and it isn’t income." },
    { q: "When we say the statements articulate, we mean:", options: ["They are written clearly", "Net income ties into retained earnings, and ending retained earnings ties into the balance sheet", "They are audited", "They all cover the same period"], answer: 1, why: "The statements mesh together, which is what makes the balance sheet balance." }
  ]
});

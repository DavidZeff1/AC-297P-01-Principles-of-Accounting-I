/* Lesson 1.1 · Accounting Information
   Source: Canvas module "Accounting Information (1.1)", rewritten for clarity. */
(function () {
  var ICON = {
    receipt: '<path d="M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    ruler: '<rect x="2" y="8" width="20" height="8" rx="1"/><path d="M6 8v3M10 8v4M14 8v3M18 8v4"/>',
    book: '<path d="M3 5h6a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H3z"/><path d="M21 5h-6a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h7z"/>',
    report: '<path d="M6 2h9l4 4v16H6z"/><path d="M14 2v5h5"/><path d="M9 18v-3M12 18v-6M15 18v-4"/>',
    decide: '<circle cx="12" cy="7" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/>',
    pie: '<circle cx="12" cy="12" r="9"/><path d="M12 3v9h9"/>',
    note: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 9v6M18 9v6"/>',
    capitol: '<path d="M3 21h18M5 21v-9M9.5 21v-9M14.5 21v-9M19 21v-9M2 12h20L12 4z"/>',
    lens: '<circle cx="10" cy="10" r="6"/><path d="M14.5 14.5L21 21"/><path d="M7 12l2-2 2 1.5 2-3"/>',
    badge: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.6-3.8 3.4-6 7-6s6.4 2.2 7 6"/><path d="M9 3h6"/>',
    ledger: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 3v18M11 8h6M11 12h6M11 16h6"/>'
  };
  function icon(name, size) {
    return '<svg viewBox="0 0 24 24" width="' + (size || 24) + '" height="' + (size || 24) + '" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[name] + '</svg>';
  }

  /* ----- data used by the interactive pieces ----- */
  var FLOW = [
    { name: "Event", icon: "receipt", title: "Something happens", text: "A customer buys a car from Lakeside Motors for <b>$30,000</b>. Transactions and events like this are the raw material of accounting.", snip: "Invoice #1047 · 1 sedan · $30,000" },
    { name: "Measure", icon: "ruler", title: "Put a dollar amount on it", text: "Accounting <b>measures</b> the event in money: $30,000 of sales revenue. The car that left the lot had cost the dealer $24,000.", snip: "Sales revenue $30,000 · Cost of car sold $24,000" },
    { name: "Record", icon: "book", title: "Capture and summarize", text: "The sale is entered in the accounting system and added to running totals, so thousands of sales become a handful of meaningful numbers.", snip: "Month-to-date sales: $412,000 → $442,000" },
    { name: "Report", icon: "report", title: "Report to interested parties", text: "At month-end the totals are organized into financial reports. Our $30,000 sale is now part of one line: Sales.", snip: "Income statement · Sales ........ $442,000" },
    { name: "Decide", icon: "decide", title: "Someone acts on it", text: "A reader uses the report to make a decision: an investor buys shares, a bank approves a loan, a manager orders more inventory.", snip: "Decision: buy · hold · lend · expand · pass" }
  ];

  var USERS = {
    managers: { name: "Business managers", short: "Managers", icon: "briefcase", side: "in", wants: "Information to plan, control operations, and make sound leadership decisions.", asks: "Which product line should we expand next year?", uses: "Budgets, product-cost reports, department results" },
    owners: { name: "Owners and investors", short: "Owners", icon: "pie", side: "out", wants: "Profits, which may eventually lead to distributions from the business such as <b>dividends</b>.", asks: "Is this company earning enough to grow and pay me a return?", uses: "Income statement, statement of owners’ equity" },
    creditors: { name: "Creditors", short: "Creditors", icon: "note", side: "out", wants: "Confidence that the entity can <b>repay what it owes</b>, with interest, on time.", asks: "If we lend $500,000, will we get it back?", uses: "Balance sheet, cash flow statement" },
    government: { name: "Governmental units", short: "Government", icon: "capitol", side: "out", wants: "Information to <b>tax</b> the business and <b>regulate</b> it.", asks: "How much income tax does this company owe?", uses: "Tax filings, regulatory reports" },
    analysts: { name: "Financial analysts", short: "Analysts", icon: "lens", side: "out", wants: "Data to form opinions on which they base <b>investment recommendations</b>.", asks: "Should we tell clients to buy, hold, or sell this stock?", uses: "Published financial statements, trends across years" },
    employees: { name: "Employees", short: "Employees", icon: "badge", side: "out", wants: "A successful employer to build a career with. Bonuses and stock options are often <b>tied to company performance</b>.", asks: "Is this company stable, and will my bonus pay out?", uses: "Published results, company announcements" }
  };
  var USER_ORDER = ["managers", "owners", "creditors", "government", "analysts", "employees"];

  var ERAS = [
    { when: "Before computers", name: "Paper ledgers", machine: "Nothing. Every entry is handwritten.", human: "Copying, adding columns by hand, and hunting for arithmetic errors." },
    { when: "1980s–1990s", name: "Spreadsheets and desktop software", machine: "Arithmetic, totals, and printing reports.", human: "Typing in every transaction, then checking and formatting reports." },
    { when: "2000s–2010s", name: "Integrated, cloud-based systems", machine: "Sales, purchases, and payroll flow into the books automatically from other systems.", human: "Reviewing exceptions, controlling the system, and analyzing results." },
    { when: "Today", name: "AI-assisted processing", machine: "AI tools read invoices and receipts and enter the data accurately on their own.", human: "Judgment, estimation, and advising managers on decisions. Accounting is now a decision-making discipline." }
  ];

  /* warranty example: claims are (month, amount) */
  var CLAIMS = [[4, 120, "Brake sensor"], [11, 310, "A/C compressor"], [19, 85, "Window motor"], [27, 400, "Transmission sensor"], [33, 125, "Infotainment screen"]];
  var EST = 900, PRICE = 30000, COST = 24000, TERM = 36;

  /* land example (hypothetical appraisals, in dollars) */
  var YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
  var MARKET = [250000, 258000, 270000, 284000, 296000, 310000, 345000, 392000, 380000, 371000, 389000, 404000];
  var LAND_COST = 250000;

  var html = `
<style>
  .flow { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px; }
  .flow li { position: relative; min-width: 0; }
  .flow li + li::before { content: "→"; position: absolute; left: -10px; top: 22px; transform: translateX(-50%); color: var(--ink-3); font-size: 16px; }
  .flow-step { width: 100%; display: grid; justify-items: center; gap: 6px; background: none; border: 0; cursor: pointer; padding: 4px 0; color: var(--ink-3); }
  .flow-step .disc { width: 52px; height: 52px; border-radius: 50%; display: grid; place-items: center; border: 1.5px solid var(--rule); background: var(--card); transition: background .2s, color .2s, border-color .2s; }
  .flow-step .flow-name { font: 600 13px/1.2 var(--f-body); }
  .flow-step.done { color: var(--ledger); }
  .flow-step.done .disc { border-color: var(--ledger); }
  .flow-step.on { color: var(--ink); }
  .flow-step.on .disc { background: var(--ledger); color: var(--ledger-ink); border-color: var(--ledger); }
  .flow-detail { margin-top: 18px; display: grid; gap: 8px; min-height: 150px; }
  .flow-detail .step-k { font: 600 12px/1 var(--f-body); letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3); }
  .flow-detail h4 { font-size: 20px; }
  .snip { font-family: var(--f-mono); font-size: 14px; background: var(--greenbar); border-radius: 6px; padding: 8px 12px; color: var(--ink); overflow-x: auto; white-space: nowrap; }
  .flow-ctrl { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
  @media (max-width: 520px) { .flow-step .disc { width: 42px; height: 42px; } .flow li + li::before { top: 17px; } .flow { gap: 6px; } .flow li + li::before { left: -6px; } }

  .users-wrap { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: 20px; align-items: center; }
  @media (max-width: 760px) { .users-wrap { grid-template-columns: minmax(0, 1fr); } }
  .users-svg { width: 100%; height: auto; display: block; }
  .users-svg .spoke { stroke: var(--rule); stroke-width: 2; stroke-dasharray: 5 7; animation: flowdash 1.6s linear infinite; }
  .users-svg .spoke.on { stroke: var(--ledger); stroke-width: 3; }
  @keyframes flowdash { to { stroke-dashoffset: -24; } }
  @media (prefers-reduced-motion: reduce) { .users-svg .spoke { animation: none; } }
  .users-svg .hub-c { fill: var(--bar); }
  .users-svg .hub-t { fill: #e9f3ee; font: 700 15px var(--f-display); }
  .users-svg .node { cursor: pointer; }
  .users-svg .node circle { fill: var(--card); stroke: var(--ledger); stroke-width: 2.5; transition: fill .2s; }
  .users-svg .node.in circle { stroke: var(--mgr); }
  .users-svg .node .ic { color: var(--ledger); }
  .users-svg .node.in .ic { color: var(--mgr); }
  .users-svg .node.on circle { fill: var(--ledger); }
  .users-svg .node.in.on circle { fill: var(--mgr); }
  .users-svg .node.on .ic { color: var(--card); }
  .users-svg .node text { fill: var(--ink); font: 600 17px var(--f-body); }
  .users-svg .node:focus { outline: none; }
  .users-svg .node:focus-visible circle { stroke-width: 5; }
  .legend { display: flex; gap: 16px; flex-wrap: wrap; font-size: 14px; color: var(--ink-2); margin-top: 8px; }
  .legend i { display: inline-block; width: 12px; height: 12px; border-radius: 50%; border: 2.5px solid var(--ledger); margin-right: 6px; vertical-align: -1px; }
  .legend i.in { border-color: var(--mgr); }
  .user-card { display: grid; gap: 12px; }
  .user-card .side { font: 700 12px/1 var(--f-body); letter-spacing: .1em; text-transform: uppercase; color: var(--ledger); }
  .user-card .side.in { color: var(--mgr); }
  .user-card h4 { font-size: 24px; font-stretch: 85%; }
  .user-card dl { margin: 0; display: grid; gap: 10px; }
  .user-card dt { font-size: 13px; color: var(--ink-3); font-weight: 600; }
  .user-card dd { margin: 2px 0 0; line-height: 1.45; }
  .user-card .ask { font-size: 18px; font-style: italic; }

  .lanes { display: grid; gap: 12px; }
  .lane-src { text-align: center; background: var(--ink); color: var(--paper); border-radius: 8px; padding: 10px; font-weight: 600; }
  .lane-split { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 12px; }
  .lane { border-radius: var(--r); padding: 16px; display: grid; gap: 8px; align-content: start; position: relative; }
  .lane::before { content: "↓"; position: absolute; top: -18px; left: 50%; transform: translateX(-50%); color: var(--ink-3); }
  .lane.fin { background: var(--ledger-soft); }
  .lane.mgr { background: var(--mgr-soft); }
  .lane h4 { font-size: 21px; font-stretch: 85%; }
  .lane.fin h4 { color: var(--ledger); }
  .lane.mgr h4 { color: var(--mgr); }
  .lane .row { display: flex; gap: 8px; font-size: 15px; line-height: 1.4; }
  .lane .row b { min-width: 5.5em; flex: none; color: var(--ink-2); font-weight: 600; }
  @media (max-width: 560px) { .lane-split { grid-template-columns: minmax(0, 1fr); gap: 22px; } .lane .row { flex-direction: column; gap: 0; } }

  .setters { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); gap: 12px; align-items: stretch; }
  .setter { border: 1px solid var(--rule); border-radius: var(--r); padding: 16px; background: var(--card); display: grid; gap: 6px; align-content: start; }
  .setter .abbr { font: 800 34px/1 var(--f-display); font-stretch: 75%; color: var(--ledger); }
  .setter .full { font-weight: 600; line-height: 1.3; }
  .setter .where { font-size: 14px; color: var(--ink-3); }
  .setter p { font-size: 15px; line-height: 1.45; }
  .converge { display: grid; place-items: center; text-align: center; gap: 4px; padding: 0 4px; color: var(--ink-2); font-size: 13px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
  .converge .arrows { font-size: 26px; color: var(--ledger); letter-spacing: 0; }
  .goal { margin-top: 12px; text-align: center; border: 2px dashed var(--ledger); border-radius: var(--r); padding: 14px; }
  .goal b { font-family: var(--f-display); font-size: 18px; }
  @media (max-width: 620px) { .setters { grid-template-columns: minmax(0, 1fr); } .converge .arrows { transform: rotate(90deg); } }

  .eras { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0; position: relative; }
  .eras::before { content: ""; position: absolute; left: 12%; right: 12%; top: 15px; height: 2px; background: var(--rule); }
  .era-btn { position: relative; width: 100%; background: none; border: 0; cursor: pointer; display: grid; justify-items: center; gap: 8px; padding: 0 4px; color: var(--ink-3); text-align: center; }
  .era-btn .dot { width: 32px; height: 32px; border-radius: 50%; background: var(--card); border: 2px solid var(--rule); display: grid; place-items: center; font: 600 13px/1 var(--f-mono); }
  .era-btn .w { font-size: 13px; line-height: 1.25; }
  .era-btn.on { color: var(--ink); }
  .era-btn.on .dot { background: var(--ledger); border-color: var(--ledger); color: var(--ledger-ink); }
  .era-body { margin-top: 18px; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 12px; }
  .era-body h4 { grid-column: 1 / -1; font-size: 20px; }
  .era-col { border-radius: 8px; padding: 12px 14px; line-height: 1.45; font-size: 15px; }
  .era-col .k { display: block; font: 700 12px/1 var(--f-body); letter-spacing: .1em; text-transform: uppercase; margin-bottom: 6px; }
  .era-col.m { background: var(--rule-2); }
  .era-col.h { background: var(--ledger-soft); }
  .era-col.h .k { color: var(--ledger); }
  @media (max-width: 560px) { .era-body { grid-template-columns: minmax(0, 1fr); } }

  .sim { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 20px; }
  @media (max-width: 760px) { .sim { grid-template-columns: minmax(0, 1fr); } }
  .sim-ctrl { display: grid; gap: 14px; align-content: start; }
  .sim-ctrl label { font-weight: 600; }
  .sim-month { font: 800 34px/1 var(--f-display); font-stretch: 78%; font-variant-numeric: tabular-nums; }
  .timeline { position: relative; height: 54px; margin: 6px 8px 0; }
  .timeline .base { position: absolute; left: 0; right: 0; top: 20px; height: 8px; border-radius: 4px; background: var(--rule-2); }
  .timeline .known { position: absolute; left: 0; top: 20px; height: 8px; border-radius: 4px; background: var(--ledger); }
  .timeline .claim { position: absolute; top: 14px; width: 20px; height: 20px; margin-left: -10px; border-radius: 50%; background: var(--card); border: 2px solid var(--rule); font: 600 10px/16px var(--f-mono); text-align: center; color: var(--ink-3); }
  .timeline .claim.hit { border-color: var(--bad); color: var(--bad); }
  .timeline .tick { position: absolute; top: 36px; font: 500 11px/1 var(--f-mono); color: var(--ink-3); transform: translateX(-50%); white-space: nowrap; }
  .timeline .tick:first-of-type { transform: none; }
  .timeline .tick.end { transform: translateX(-100%); }
  .verdict { border-left: 3px solid var(--ledger); padding: 4px 0 4px 12px; line-height: 1.45; }
  .verdict.late { border-color: var(--mgr); }

  .land { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); gap: 20px; }
  @media (max-width: 820px) { .land { grid-template-columns: minmax(0, 1fr); } }
  .chart { width: 100%; height: auto; display: block; }
  .chart .grid { stroke: var(--rule-2); stroke-width: 1; }
  .chart .axis { fill: var(--ink-3); font: 500 12px var(--f-mono); }
  .chart .mkt { fill: none; stroke: var(--mgr); stroke-width: 3; stroke-linejoin: round; }
  .chart .hc { fill: none; stroke: var(--ledger); stroke-width: 3; }
  .chart .gap { fill: var(--mgr); opacity: .12; }
  .chart .cursor { stroke: var(--ink); stroke-width: 1.5; stroke-dasharray: 3 4; }
  .chart .pt-m { fill: var(--mgr); stroke: var(--card); stroke-width: 2; }
  .chart .pt-h { fill: var(--ledger); stroke: var(--card); stroke-width: 2; }
  .chart .lbl { font: 600 13px var(--f-body); }
  .chart .lbl.m { fill: var(--mgr); }
  .chart .lbl.h { fill: var(--ledger); }
  .scale { width: 100%; max-width: 280px; height: auto; display: block; margin: 0 auto; }
  .scale .beam { transition: transform .5s; transform-origin: 140px 46px; }
  .scale .post, .scale .chain { stroke: var(--ink-3); stroke-width: 2; fill: none; }
  .scale .pan { fill: var(--rule-2); stroke: var(--ink-3); stroke-width: 1.5; }
  .scale .base { fill: var(--ink-3); }
  .scale text { fill: var(--ink); font: 600 13px var(--f-body); text-anchor: middle; }
  @media (prefers-reduced-motion: reduce) { .scale .beam { transition: none; } }

  .recap { counter-reset: r; list-style: none; padding: 0; margin: 0; display: grid; gap: 0; max-width: 72ch; }
  .recap li { counter-increment: r; display: grid; grid-template-columns: 2.4em minmax(0, 1fr); gap: 8px; padding: 12px 0; border-top: 1px solid var(--rule); line-height: 1.5; }
  .recap li::before { content: counter(r, decimal-leading-zero); font: 600 15px/1.6 var(--f-mono); color: var(--ledger); }
</style>

<section class="sec" data-toc="The big idea">
  <div class="eyebrow kind">Concept</div>
  <h2>Accounting turns business activity into decision-ready information</h2>
  <div class="callout analogy">
    <div class="label">Think of it like medicine</div>
    <p>You already know roughly what a surgeon does, but nobody operates without first learning human anatomy. Accounting works the same way. You probably know it “summarizes business numbers into reports,” but doing that well takes technical knowledge plus a lot of <b>measurement judgment</b>. This chapter is your anatomy class: the overall structure of accounting and the basic parts of reporting.</p>
  </div>
  <div class="callout def">
    <div class="label">Definition</div>
    <p><b>Accounting</b> is a set of concepts and techniques used to <mark>measure</mark> and <mark>report</mark> financial information about an <mark>economic unit</mark>.</p>
  </div>
  <p>The <b>economic unit</b> is usually a separate enterprise, such as one company. Its finances are kept apart from the personal finances of its owners. The information is reported to many kinds of people, and each of them cares about their own stake in the business.</p>
  <div class="panel">
    <div class="panel-title"><h3>Follow one sale through the system</h3><span class="hint">Tap a stage or press Play</span></div>
    <ol class="flow" id="flow"></ol>
    <div class="flow-detail" id="flow-detail" aria-live="polite"></div>
    <div class="flow-ctrl">
      <button type="button" class="btn small" id="flow-play">▶ Play</button>
      <button type="button" class="btn ghost small" id="flow-next">Next stage</button>
    </div>
  </div>
</section>

<section class="sec" data-toc="Who uses it">
  <div class="eyebrow kind try">Explore</div>
  <h2>Six groups read the reports, each for a different reason</h2>
  <p>Every user of accounting information is asking a question about <i>their own</i> interest in the business. Tap each group to see what they want to know.</p>
  <div class="panel">
    <div class="users-wrap">
      <div>
        <svg class="users-svg" id="users-svg" viewBox="0 0 600 400" role="group" aria-label="Users of accounting information"></svg>
        <div class="legend"><span><i class="in"></i>Inside the firm</span><span><i></i>Outside the firm</span></div>
      </div>
      <div class="user-card" id="user-card" aria-live="polite"></div>
    </div>
  </div>
  <p>Notice the split: <b>managers</b> sit inside the business and can ask for any report they like. Everyone else is <b>outside</b> and has to rely on whatever the company publishes. That one difference creates the two main branches of accounting.</p>
</section>

<section class="sec" data-toc="Financial vs. managerial">
  <div class="eyebrow kind">Concept</div>
  <h2>Two branches: financial and managerial accounting</h2>
  <p>Both branches report financial facts drawn from the same underlying data. What differs is <b>who the report is for</b>, and that changes the rules.</p>
  <div class="lanes">
    <div class="lane-src">One set of business transactions</div>
    <div class="lane-split">
      <div class="lane fin">
        <h4>Financial accounting</h4>
        <div class="row"><b>For</b><span>Outsiders: owners, creditors, analysts, government</span></div>
        <div class="row"><b>Rules</b><span>Must follow GAAP, so reports are standardized</span></div>
        <div class="row"><b>Output</b><span>General-purpose financial statements</span></div>
        <div class="row"><b>Goal</b><span>Comparable, neutral reports anyone can trust</span></div>
      </div>
      <div class="lane mgr">
        <h4>Managerial accounting</h4>
        <div class="row"><b>For</b><span>Insiders: the company’s managers</span></div>
        <div class="row"><b>Rules</b><span>No mandatory rules; management sets them</span></div>
        <div class="row"><b>Output</b><span>Budgets, product-cost data, custom reports</span></div>
        <div class="row"><b>Goal</b><span>Planning, controlling, and decision making</span></div>
      </div>
    </div>
  </div>
  <h3>Why outsiders need standard rules</h3>
  <p>External users don’t control how the reports are prepared, and they can’t see the underlying details. The only way they can understand the numbers, and <b>compare one company with another</b>, is if every company follows the same principles. Without standardization, two companies’ reports could be hard to read and nearly impossible to compare.</p>
  <h3>Why managers can make their own rules</h3>
  <p>Inside the company, management decides what it wants to see. For example, GAAP may require certain product development costs to be deducted when computing income. Management might view those costs as a long-term investment and choose to judge internal decisions on an income number that <b>excludes</b> them. That is management’s prerogative. Internal reports should still be logical and rational, but they don’t have to follow any mandatory guidelines.</p>
  <div class="panel">
    <div class="panel-title"><h3>Sort it: financial or managerial?</h3><span class="hint">Pick a branch for each item</span></div>
    <div data-widget="sorter" data-key="branches" id="sorter-branches"></div>
  </div>
</section>

<section class="sec" data-toc="Who sets the rules">
  <div class="eyebrow kind">Concept</div>
  <h2>Standard setters write the rules for financial reporting</h2>
  <p>The rules come from organized standard-setting bodies. The resulting body of rules is called <b>generally accepted accounting principles (GAAP)</b>.</p>
  <div class="setters">
    <div class="setter">
      <div class="abbr">FASB</div>
      <div class="full">Financial Accounting Standards Board</div>
      <div class="where">United States · private sector</div>
      <p>Primarily responsible for developing the rules that form the foundation of U.S. financial reporting.</p>
      <a href="https://www.fasb.org/" target="_blank" rel="noopener">fasb.org ↗</a>
    </div>
    <div class="converge"><span class="arrows">⇄</span>Working toward convergence</div>
    <div class="setter">
      <div class="abbr">IASB</div>
      <div class="full">International Accounting Standards Board</div>
      <div class="where">Global counterpart to the FASB</div>
      <p>Issues International Financial Reporting Standards (<b>IFRS</b>), used by companies in many countries.</p>
      <a href="https://www.ifrs.org/" target="_blank" rel="noopener">ifrs.org ↗</a>
    </div>
  </div>
  <div class="goal"><b>The goal: one consistent set of global standards.</b><br><span class="hint">Driven by growth in global trade and finance. Standardization lets you compare companies within one economy; global standards let you compare businesses across borders.</span></div>

  <h3>What a GAAP report is supposed to be</h3>
  <p>Reports prepared under GAAP are <b>general purpose</b>. They aren’t tailored to owners, creditors, or any one group. Standard setters aim for reports with these qualities, so they’re useful for investment and credit decisions. Tap each card.</p>
  <div data-widget="cards" data-key="qualities"></div>
</section>

<section class="sec" data-toc="A quality system">
  <div class="eyebrow kind try">Explore</div>
  <h2>Technology took over the bookkeeping</h2>
  <p>Financial and managerial accounting both depend on a strong <b>information system</b> that reliably captures and summarizes transaction data. Information technology has radically reshaped this once-mundane part of the job, and artificial intelligence is pushing it further. Step through the eras to see the accountant’s job shift.</p>
  <div class="panel">
    <ol class="eras" id="eras"></ol>
    <div class="era-body" id="era-body" aria-live="polite"></div>
  </div>
</section>

<section class="sec" data-toc="Judgment and estimates">
  <div class="eyebrow kind try">Try it</div>
  <h2>Accounting numbers involve judgment and estimates</h2>
  <p>Accounting data are <b>not absolute or concrete</b>. Producing a month’s, quarter’s, or year’s numbers takes considerable judgment and estimation. Here’s the classic example from the reading.</p>
  <div class="callout">
    <div class="label">The problem</div>
    <p>Lakeside Motors sells a car for <span class="num">$30,000</span> (it cost <span class="num">$24,000</span>) with a <b>3-year warranty</b>. How much profit did it earn? Nobody will know the true warranty cost for three years. The dealer estimates it at <span class="num est">$900</span>.</p>
  </div>
  <div class="panel">
    <div class="sim">
      <div class="sim-ctrl">
        <label for="warranty-month">When should the profit be reported?</label>
        <div class="sim-month" id="sim-month">Month 0</div>
        <input type="range" id="warranty-month" min="0" max="36" step="1" value="0" aria-describedby="sim-verdict">
        <div class="timeline" id="timeline" aria-hidden="true"></div>
        <div class="meter"><div class="meter-top"><span>Certainty: warranty period already observed</span><span class="num" id="m-cert">0%</span></div><div class="meter-track"><div class="meter-fill" id="f-cert"></div></div></div>
        <div class="meter"><div class="meter-top"><span>Timeliness: how fresh the news is for readers</span><span class="num" id="m-time">100%</span></div><div class="meter-track"><div class="meter-fill amber" id="f-time"></div></div></div>
      </div>
      <div style="display:grid;gap:14px;align-content:start;min-width:0">
        <div class="stmt" id="stmt"></div>
        <p class="verdict" id="sim-verdict" aria-live="polite"></p>
      </div>
    </div>
  </div>
  <p>Waiting for certainty would make the information <b>stale</b> by the time anyone saw it, and stale information loses its usefulness. So in order to present information on time, accountants routinely make <b>reasonable estimates</b> when they prepare periodic financial reports.</p>
</section>

<section class="sec" data-toc="Historical cost vs. fair value">
  <div class="eyebrow kind try">Try it</div>
  <h2>Historical cost or fair value?</h2>
  <p>Accounting hasn’t advanced to the point where it can put a reliable value on a whole business. So many items are reported using the <b>historical cost principle</b>: they are recorded at the price actually paid, which is tied to an objective, verifiable past transaction. Land, for example, stays on the books at its purchase price.</p>
  <p>The alternative is <b>fair value</b>: valuing items, and periodically revaluing them, based on assessments of what they’re worth today. Those assessments are subjective, which is why fair value is the subject of so much debate.</p>
  <div class="panel">
    <div class="panel-title"><h3>Land bought in 2015 for $250,000</h3><span class="hint">Market values are hypothetical</span></div>
    <div class="land">
      <div style="min-width:0">
        <svg class="chart" id="land-chart" viewBox="0 0 640 290" role="img" aria-label="Market value of the land compared with its historical cost, 2015 to 2026"></svg>
        <label for="land-year" class="hint">Balance sheet date</label>
        <input type="range" id="land-year" min="0" max="11" step="1" value="11">
      </div>
      <div style="display:grid;gap:14px;align-content:start;min-width:0">
        <div class="seg" role="group" aria-label="Measurement basis">
          <button type="button" data-basis="hc" class="on">Historical cost</button>
          <button type="button" data-basis="fv">Fair value</button>
        </div>
        <div class="stmt" id="land-stmt"></div>
        <svg class="scale" id="scale" viewBox="0 0 280 150" aria-hidden="true">
          <path class="base" d="M110 140h60l-6-8h-48z"/>
          <path class="post" d="M140 132V46"/>
          <g class="beam" id="beam">
            <path class="post" d="M40 46h200"/>
            <path class="chain" d="M40 46l-22 50M40 46l22 50M240 46l-22 50M240 46l22 50"/>
            <path class="pan" d="M12 96h56a28 12 0 0 1-56 0z"/>
            <path class="pan" d="M212 96h56a28 12 0 0 1-56 0z"/>
            <text x="40" y="128">Relevance</text>
            <text x="240" y="128">Reliability</text>
          </g>
          <circle cx="140" cy="46" r="5" class="base"/>
        </svg>
        <p class="verdict" id="land-note" aria-live="polite"></p>
      </div>
    </div>
  </div>
  <p>The debate is usually framed as a tradeoff between the <b>relevance</b> of fair value information and the <b>reliability</b> of historical cost information. Global standard setters are gradually accepting fair value for selected items, so the rules will keep evolving. Expect the accountant of the future to be increasingly skilled at valuation.</p>
</section>

<section class="sec" data-toc="Key terms">
  <div class="eyebrow kind">Review</div>
  <h2>Key terms</h2>
  <p>Say the definition out loud before you flip each card.</p>
  <div data-widget="cards" data-key="terms"></div>
</section>

<section class="sec" data-toc="Practice check">
  <div class="eyebrow kind check">Check</div>
  <h2>Did you learn it?</h2>
  <p>Twelve questions in the style of the Canvas “Did You Learn? (1.1)” quiz. Each answer explains itself. Score 75% or better to mark this lesson complete.</p>
  <div class="panel"><div data-widget="quiz"></div></div>
</section>

<section class="sec" data-toc="Recap">
  <div class="eyebrow kind">Recap</div>
  <h2>Remember this</h2>
  <ol class="recap">
    <li><span><b>Accounting</b> measures and reports financial information about an economic unit, usually a separate enterprise.</span></li>
    <li><span><b>Users</b> include managers, owners and investors, creditors, governmental units, analysts, and employees. Each cares about their own interest in the entity.</span></li>
    <li><span><b>Financial accounting</b> serves outsiders and follows GAAP. <b>Managerial accounting</b> serves management and follows whatever rules management sets.</span></li>
    <li><span>The <b>FASB</b> (U.S.) and <b>IASB</b> (global, IFRS) set standards and are working toward convergence. GAAP reports are general purpose, neutral, relevant, and representationally faithful.</span></li>
    <li><span><b>Technology and AI</b> now handle much of the routine data entry, turning accounting into a decision-making discipline.</span></li>
    <li><span>Accounting numbers rely on <b>estimates</b> for timeliness, and many items are carried at <b>historical cost</b>. Fair value trades some reliability for relevance.</span></li>
  </ol>
</section>
`;

  HUB.register("1-1", {
    summary: "What accounting is, who relies on it, the two branches of the field, who writes the rules, and why accounting numbers always involve judgment.",
    objectives: [
      "Define accounting and name the economic unit it reports on",
      "Match each user group to the question it asks",
      "Tell financial accounting apart from managerial accounting",
      "Explain why estimates and historical cost are part of every report"
    ],
    html: html,

    sorters: {
      branches: {
        categories: [{ id: "fin", label: "Financial" }, { id: "mgr", label: "Managerial" }],
        items: [
          { text: "The annual report sent to the company’s shareholders", cat: "fin", why: "Shareholders are outside the firm, so they receive general-purpose financial statements prepared under GAAP." },
          { text: "A budget for next quarter’s marketing spending", cat: "mgr", why: "Budgets are planning tools for management and aren’t reported externally." },
          { text: "Must follow generally accepted accounting principles", cat: "fin", why: "GAAP applies to external reporting. Internal reports need not follow any mandatory guidelines." },
          { text: "The cost to build one unit, used to set a selling price", cat: "mgr", why: "Product costing data supports management decisions such as pricing." },
          { text: "Financial statements a bank reviews before approving a loan", cat: "fin", why: "A creditor is an outside user relying on standardized statements." },
          { text: "Report layout and contents chosen by the company’s managers", cat: "mgr", why: "Management may dictate how internal information is gathered and presented." },
          { text: "Designed so one company can be compared with another", cat: "fin", why: "Comparability across companies is the whole point of standardized financial reporting." },
          { text: "An income figure that leaves out product development costs, used for internal decisions", cat: "mgr", why: "GAAP may require those costs to be deducted, but management can view them as an investment for its own decision making." }
        ]
      }
    },

    cards: {
      qualities: [
        { term: "General purpose", sub: "Who is the report for?", back: "Not prepared for any one group. It’s meant to be equally useful to owners, creditors, analysts, and every other external user." },
        { term: "Neutral", sub: "Is it slanted?", back: "Free from bias. The report doesn’t tilt the numbers to favor any particular user or outcome." },
        { term: "Relevant", sub: "Does it matter?", back: "The information is capable of making a difference in investment and credit decisions." },
        { term: "Representationally faithful", sub: "Is it true to life?", back: "The numbers faithfully depict the real economic events they claim to represent." }
      ],
      terms: [
        { term: "Accounting", back: "A set of concepts and techniques used to measure and report financial information about an economic unit." },
        { term: "Economic unit", back: "The entity being accounted for, generally a separate enterprise kept apart from its owners." },
        { term: "Financial accounting", back: "The branch concerned with external reporting to parties outside the firm, under standardized rules (GAAP)." },
        { term: "Managerial accounting", back: "The branch that provides information for internal management. Management sets its own rules." },
        { term: "FASB", sub: "Financial Accounting Standards Board", back: "U.S. private-sector group primarily responsible for developing financial reporting rules." },
        { term: "IASB", sub: "International Accounting Standards Board", back: "The FASB’s global counterpart, which issues IFRS." },
        { term: "IFRS", sub: "International Financial Reporting Standards", back: "The international standards issued by the IASB, the basis for a possible single global set of standards." },
        { term: "GAAP", sub: "Generally accepted accounting principles", back: "The rules issued by standard-setting bodies that external financial reports must follow." },
        { term: "Convergence", back: "The FASB and IASB effort to move toward one harmonious set of international standards." },
        { term: "Dividends", back: "Distributions of profits from the business to its owners." },
        { term: "Historical cost principle", back: "Record and carry items at the price actually paid, an objective and verifiable past transaction amount." },
        { term: "Fair value", back: "An item’s current worth, based on assessments that can be subjective. Its use is growing for selected items." },
        { term: "Relevance vs. reliability", back: "The tradeoff in the fair value debate: fair value is more relevant, historical cost is more reliable." },
        { term: "Estimate", back: "A reasonable approximation, such as future warranty costs, used so that reports can be timely." }
      ]
    },

    quiz: [
      { q: "Which statement best defines accounting?", options: ["Recording every cash receipt and payment a business makes", "A set of concepts and techniques used to measure and report financial information about an economic unit", "Determining the market value of a business so it can be sold", "Preparing a company’s income tax return"], answer: 1, why: "Accounting measures and reports financial information about an economic unit. Cash records and tax returns are only small parts of it, and accounting cannot yet value a whole business." },
      { q: "Which branch of accounting is mainly concerned with reporting to parties outside the firm?", options: ["Managerial accounting", "Cost accounting", "Financial accounting", "Budgeting"], answer: 2, why: "Financial accounting targets external users. Managerial accounting (which includes costing and budgets) serves internal management." },
      { q: "Which user group is primarily concerned with the entity’s ability to repay its obligations?", options: ["Creditors", "Employees", "Governmental units", "Financial analysts"], answer: 0, why: "Creditors have lent money or extended credit, so they care most about being repaid." },
      { q: "A manager wants internal reports that exclude product development costs from income, even though GAAP requires them to be deducted. This is:", options: ["Prohibited, because all reports must follow GAAP", "Allowed only with FASB approval", "Required to be disclosed to shareholders", "Management’s prerogative, because internal reports need not follow mandatory guidelines"], answer: 3, why: "Managerial accounting serves management’s own needs. It should be logical and rational, but no mandatory rules apply." },
      { q: "In the United States, the private-sector body primarily responsible for developing financial reporting rules is the:", options: ["IASB", "FASB", "IRS", "IFRS"], answer: 1, why: "The Financial Accounting Standards Board (FASB). The IASB is its global counterpart, and IFRS are the IASB’s standards, not an organization." },
      { q: "Why is standardization especially important in financial accounting?", options: ["External users don’t control preparation or see the details, so they need consistent rules to understand and compare reports", "It lets managers design reports in any format they choose", "It removes the need for estimates", "It guarantees every company will be profitable"], answer: 0, why: "Outsiders depend on standard principles to understand reports and compare companies." },
      { q: "General-purpose financial reports are intended to be:", options: ["Prepared mainly for the company’s creditors", "Prepared mainly for the company’s owners", "Equally useful to all user groups and free from bias", "Customized for each analyst who requests them"], answer: 2, why: "General purpose means not tailored to any one group. Neutrality (freedom from bias) keeps them fair to everyone." },
      { q: "What is the main driver behind the FASB and IASB working toward convergence?", options: ["Reducing the number of accountants needed", "Growth in global trade and finance, which calls for comparable reporting across countries", "Eliminating managerial accounting", "Requiring all assets to be reported at fair value"], answer: 1, why: "Just as standardization allows comparisons within one economy, global standards allow business evaluations across borders." },
      { q: "A company bought land for $80,000. It’s now appraised at $120,000. Under the historical cost principle, the land is reported at:", options: ["$120,000", "$100,000", "$40,000", "$80,000"], answer: 3, why: "Historical cost keeps the land at its purchase price, an objective, verifiable amount." },
      { q: "A car is sold with a 3-year warranty. Why do accountants estimate warranty costs instead of waiting three years to report the profit?", options: ["Waiting would make the information too stale to be useful, so reasonable estimates make timely reporting possible", "Warranty costs are always zero", "GAAP forbids reporting any profit until cash is collected", "Estimates are always exactly right"], answer: 0, why: "Timeliness matters. Reasonable estimations are routinely embraced in periodic financial reports." },
      { q: "The debate over fair value versus historical cost is usually framed as a tradeoff between:", options: ["Profit and loss", "Assets and liabilities", "Relevance and reliability", "Financial and managerial accounting"], answer: 2, why: "Fair value is more relevant (current), while historical cost is more reliable (objective and verifiable)." },
      { q: "How have information technology and AI changed the practice of accounting?", options: ["They eliminated the need for judgment and estimation", "They automate routine data entry, making accounting more of a dynamic decision-making discipline", "They replaced financial statements with spreadsheets", "They had little effect on accounting"], answer: 1, why: "AI-powered tools can read and enter data, leaving the more interesting judgment work to accounting professionals." }
    ],

    init: function (root, api) {
      /* ----- flow stepper ----- */
      var flowEl = root.querySelector("#flow"), detail = root.querySelector("#flow-detail");
      flowEl.innerHTML = FLOW.map(function (s, i) {
        return '<li><button type="button" class="flow-step" data-i="' + i + '" aria-label="Stage ' + (i + 1) + ': ' + s.name + '"><span class="disc">' + icon(s.icon, 24) + '</span><span class="flow-name">' + s.name + '</span></button></li>';
      }).join("");
      var cur = 0, timer = null;
      function show(i) {
        cur = i;
        flowEl.querySelectorAll(".flow-step").forEach(function (b, j) { b.classList.toggle("on", j === i); b.classList.toggle("done", j < i); });
        var s = FLOW[i];
        detail.innerHTML = '<span class="step-k">Stage ' + (i + 1) + ' of ' + FLOW.length + '</span><h4>' + s.title + '</h4><p>' + s.text + '</p><div class="snip">' + s.snip + '</div>';
      }
      function stop() { clearInterval(timer); timer = null; root.querySelector("#flow-play").textContent = "▶ Play"; }
      flowEl.addEventListener("click", function (e) { var b = e.target.closest(".flow-step"); if (b) { stop(); show(+b.getAttribute("data-i")); } });
      root.querySelector("#flow-next").addEventListener("click", function () { stop(); show((cur + 1) % FLOW.length); });
      root.querySelector("#flow-play").addEventListener("click", function () {
        if (timer) { stop(); return; }
        show(0); this.textContent = "❚❚ Pause";
        timer = setInterval(function () { if (HUB.voice && HUB.voice.busy()) return; if (cur >= FLOW.length - 1) { stop(); return; } show(cur + 1); }, 2600);
      });
      show(0);

      /* ----- users hub ----- */
      var svg = root.querySelector("#users-svg"), card = root.querySelector("#user-card");
      var cx = 300, cy = 200, rx = 215, ry = 132;
      var s = '';
      var pos = USER_ORDER.map(function (k, i) {
        var a = (-90 + i * 60) * Math.PI / 180;
        return { k: k, x: Math.round(cx + rx * Math.cos(a)), y: Math.round(cy + ry * Math.sin(a)) };
      });
      pos.forEach(function (p) { s += '<line class="spoke" data-k="' + p.k + '" x1="' + cx + '" y1="' + cy + '" x2="' + p.x + '" y2="' + p.y + '"/>'; });
      s += '<circle class="hub-c" cx="' + cx + '" cy="' + cy + '" r="64"/>';
      s += '<g transform="translate(' + (cx - 14) + ',' + (cy - 40) + ')" style="color:#9fd8bd"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + ICON.ledger + '</svg></g>';
      s += '<text class="hub-t" x="' + cx + '" y="' + (cy + 10) + '" text-anchor="middle">The business</text>';
      s += '<text class="hub-t" x="' + cx + '" y="' + (cy + 30) + '" text-anchor="middle" style="font-weight:500;font-size:13px">reports</text>';
      pos.forEach(function (p) {
        var u = USERS[p.k], below = p.y < cy - 100 ? -48 : 56;
        s += '<g class="node' + (u.side === "in" ? " in" : "") + '" data-k="' + p.k + '" tabindex="0" role="button" aria-label="' + u.name + '">';
        s += '<circle cx="' + p.x + '" cy="' + p.y + '" r="34"/>';
        s += '<g class="ic" transform="translate(' + (p.x - 15) + ',' + (p.y - 15) + ')"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + ICON[u.icon] + '</svg></g>';
        s += '<text x="' + p.x + '" y="' + (p.y + below) + '" text-anchor="middle">' + u.short + '</text></g>';
      });
      svg.innerHTML = s;
      function pick(k) {
        var u = USERS[k];
        svg.querySelectorAll(".node").forEach(function (n) { n.classList.toggle("on", n.getAttribute("data-k") === k); n.setAttribute("aria-pressed", n.getAttribute("data-k") === k); });
        svg.querySelectorAll(".spoke").forEach(function (n) { n.classList.toggle("on", n.getAttribute("data-k") === k); });
        card.innerHTML = '<span class="side' + (u.side === "in" ? " in" : "") + '">' + (u.side === "in" ? "Inside the firm · managerial accounting" : "Outside the firm · financial accounting") + '</span>' +
          '<h4>' + u.name + '</h4><dl><div><dt>What they want</dt><dd>' + u.wants + '</dd></div>' +
          '<div><dt>The question they ask</dt><dd class="ask">“' + u.asks + '”</dd></div>' +
          '<div><dt>Reports they lean on</dt><dd>' + u.uses + '</dd></div></dl>';
      }
      svg.querySelectorAll(".node").forEach(function (n) {
        n.addEventListener("click", function () { pick(n.getAttribute("data-k")); });
        n.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(n.getAttribute("data-k")); } });
      });
      pick("creditors");

      /* ----- eras ----- */
      var erasEl = root.querySelector("#eras"), eraBody = root.querySelector("#era-body");
      erasEl.innerHTML = ERAS.map(function (e, i) {
        return '<li><button type="button" class="era-btn" data-i="' + i + '"><span class="dot">' + (i + 1) + '</span><span class="w">' + e.when + '</span></button></li>';
      }).join("");
      function era(i) {
        erasEl.querySelectorAll(".era-btn").forEach(function (b, j) { b.classList.toggle("on", j === i); });
        var e = ERAS[i];
        eraBody.innerHTML = '<h4>' + e.name + '</h4><div class="era-col m"><span class="k">The system handles</span>' + e.machine + '</div><div class="era-col h"><span class="k">The accountant focuses on</span>' + e.human + '</div>';
      }
      erasEl.addEventListener("click", function (ev) { var b = ev.target.closest(".era-btn"); if (b) era(+b.getAttribute("data-i")); });
      era(3);

      /* ----- warranty simulator ----- */
      var range = root.querySelector("#warranty-month"), tl = root.querySelector("#timeline");
      var t = '<div class="base"></div><div class="known" id="tl-known"></div>';
      [0, 12, 24, 36].forEach(function (m) { t += '<span class="tick' + (m === TERM ? ' end' : '') + '" style="left:' + (100 * m / TERM) + '%">' + (m === 0 ? "Sale" : "Yr " + m / 12) + '</span>'; });
      CLAIMS.forEach(function (c, i) { t += '<span class="claim" data-i="' + i + '" style="left:' + (100 * c[0] / TERM) + '%" title="Month ' + c[0] + ': ' + c[2] + ' $' + c[1] + '">$</span>'; });
      tl.innerHTML = t;
      function sim() {
        var m = +range.value, known = 0, hits = [];
        CLAIMS.forEach(function (c, i) { if (c[0] <= m) { known += c[1]; hits.push(i); } });
        var remaining = m >= TERM ? 0 : Math.max(EST - known, 0);
        var profit = PRICE - COST - known - remaining;
        root.querySelector("#sim-month").textContent = m === 0 ? "At the sale" : "Month " + m + (m === TERM ? " · warranty over" : "");
        root.querySelector("#tl-known").style.width = (100 * m / TERM) + "%";
        tl.querySelectorAll(".claim").forEach(function (el, i) { el.classList.toggle("hit", hits.indexOf(i) >= 0); });
        var cert = Math.round(100 * m / TERM);
        root.querySelector("#m-cert").textContent = cert + "%";
        root.querySelector("#m-time").textContent = (100 - cert) + "%";
        root.querySelector("#f-cert").style.width = cert + "%";
        root.querySelector("#f-time").style.width = (100 - cert) + "%";
        var st = '<div class="stmt-head"><b>Lakeside Motors</b>Profit on one car sale, reported at ' + (m === 0 ? "the sale date" : "month " + m) + '</div>';
        st += '<div class="stmt-row"><span>Sales</span><span>' + api.money(PRICE) + '</span></div>';
        st += '<div class="stmt-row"><span>Cost of car sold</span><span>' + api.money(-COST) + '</span></div>';
        st += '<div class="stmt-row indent"><span>Warranty: actual claims so far</span><span>' + api.money(-known) + '</span></div>';
        st += '<div class="stmt-row indent"><span class="est">Warranty: estimate for the rest</span><span class="est"><span class="u">' + api.money(-remaining) + '</span></span></div>';
        st += '<div class="stmt-row"><span><b>Profit</b></span><span class="uu">' + api.money(profit) + '</span></div>';
        root.querySelector("#stmt").innerHTML = st;
        var v = root.querySelector("#sim-verdict");
        v.classList.toggle("late", m > 0);
        if (m === 0) v.innerHTML = "<b>Timely, built on an estimate.</b> Readers learn about the sale right away. This is what accountants actually do.";
        else if (m < TERM) v.innerHTML = "<b>Still not certain.</b> After " + m + " months you’ve waited, yet $" + remaining.toLocaleString() + " of the warranty cost is still an estimate. Waiting only made the news older.";
        else v.innerHTML = "<b>Certain, but three years late.</b> Actual warranty cost was $1,040 versus the $900 estimate. The $140 difference is under 0.5% of the sale price, a small price for timely information.";
      }
      range.addEventListener("input", sim);
      sim();

      /* ----- land: historical cost vs fair value ----- */
      var chart = root.querySelector("#land-chart"), yr = root.querySelector("#land-year");
      var L = 64, R = 620, T = 18, B = 250, lo = 200000, hi = 450000;
      function X(i) { return L + (R - L) * i / (YEARS.length - 1); }
      function Y(v) { return B - (B - T) * (v - lo) / (hi - lo); }
      var c = '';
      [200000, 250000, 300000, 350000, 400000, 450000].forEach(function (v) {
        c += '<line class="grid" x1="' + L + '" x2="' + R + '" y1="' + Y(v) + '" y2="' + Y(v) + '"/><text class="axis" x="' + (L - 8) + '" y="' + (Y(v) + 4) + '" text-anchor="end">$' + v / 1000 + 'k</text>';
      });
      YEARS.forEach(function (y, i) { if (i % 2 === 0 || i === YEARS.length - 1) c += '<text class="axis" x="' + X(i) + '" y="' + (B + 22) + '" text-anchor="middle">' + y + '</text>'; });
      var mk = MARKET.map(function (v, i) { return X(i) + "," + Y(v); });
      c += '<polygon class="gap" points="' + mk.join(" ") + ' ' + X(YEARS.length - 1) + ',' + Y(LAND_COST) + ' ' + X(0) + ',' + Y(LAND_COST) + '"/>';
      c += '<polyline class="hc" points="' + X(0) + ',' + Y(LAND_COST) + ' ' + X(YEARS.length - 1) + ',' + Y(LAND_COST) + '"/>';
      c += '<polyline class="mkt" points="' + mk.join(" ") + '"/>';
      c += '<text class="lbl m" x="' + X(5) + '" y="' + (Y(MARKET[5]) - 14) + '" text-anchor="middle">Appraised market value</text>';
      c += '<text class="lbl h" x="' + X(8) + '" y="' + (Y(LAND_COST) + 22) + '" text-anchor="middle">Historical cost $250k</text>';
      c += '<line class="cursor" id="cur" y1="' + T + '" y2="' + B + '"/><circle class="pt-m" id="pm" r="6"/><circle class="pt-h" id="ph" r="6"/>';
      chart.innerHTML = c;
      var basis = "hc";
      function land() {
        var i = +yr.value, mv = MARKET[i];
        chart.querySelector("#cur").setAttribute("x1", X(i)); chart.querySelector("#cur").setAttribute("x2", X(i));
        chart.querySelector("#pm").setAttribute("cx", X(i)); chart.querySelector("#pm").setAttribute("cy", Y(mv));
        chart.querySelector("#ph").setAttribute("cx", X(i)); chart.querySelector("#ph").setAttribute("cy", Y(LAND_COST));
        var lowA = Math.round(mv * 0.95 / 1000) * 1000, highA = Math.round(mv * 1.04 / 1000) * 1000;
        var shown = basis === "hc" ? LAND_COST : mv;
        var st = '<div class="stmt-head"><b>Balance sheet (excerpt)</b>December 31, ' + YEARS[i] + '</div>';
        st += '<div class="stmt-row"><span>Land</span><span class="uu">' + api.money(shown) + '</span></div>';
        st += '<div class="stmt-row"><span class="hint">Basis</span><span class="hint">' + (basis === "hc" ? "price paid in 2015" : "current appraisal") + '</span></div>';
        root.querySelector("#land-stmt").innerHTML = st;
        root.querySelector("#beam").style.transform = "rotate(" + (basis === "hc" ? 9 : -9) + "deg)";
        var gap = mv - LAND_COST;
        root.querySelector("#land-note").innerHTML = basis === "hc"
          ? "<b>Reliable:</b> $250,000 is backed by a real, verifiable purchase. <b>But</b> it’s " + (gap ? api.money(gap) + " away from what the land is worth today." : "exactly what it’s worth this year.")
          : "<b>Relevant:</b> " + api.money(mv) + " reflects what the land is worth now. <b>But</b> it’s an opinion: two appraisers might say " + api.money(lowA) + " and " + api.money(highA) + ".";
      }
      yr.addEventListener("input", land);
      root.querySelectorAll("[data-basis]").forEach(function (b) {
        b.addEventListener("click", function () {
          basis = b.getAttribute("data-basis");
          root.querySelectorAll("[data-basis]").forEach(function (x) { x.classList.toggle("on", x === b); });
          land();
        });
      });
      land();
    }
  });
})();

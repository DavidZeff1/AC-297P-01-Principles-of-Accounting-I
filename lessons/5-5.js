/* Lesson 5.5 · The Control Structure */
HUB.register("5-5", {
  summary: "Internal control protects assets and keeps information reliable. Learn the core control procedures, how retailers guard inventory, and how the purchasing cycle makes sure you pay only for what you ordered and received.",
  objectives: [
    "State the goals and components of internal control",
    "Describe limited access, separation of duties, and accountability procedures",
    "Identify retail controls over inventory and cash",
    "Apply purchasing cycle controls, including document matching"
  ],
  html: `
<section class="sec" data-toc="Goals">
  <div class="eyebrow kind">Concept</div>
  <h2>What internal control is for</h2>
  <div class="grid2">
    <div class="tile"><span class="k">Goals</span><ul><li>Safeguard assets</li><li>Check the reliability and accuracy of accounting information</li><li>Ensure compliance with management policies</li><li>Evaluate operating performance and efficiency</li></ul></div>
    <div class="tile alt"><span class="k">Built from</span><ul><li>The accounting system</li><li>The <b>control environment</b>: the combined effect of the firm’s policies and attitudes toward control</li><li>Control procedures</li></ul></div>
  </div>
</section>

<section class="sec" data-toc="Control procedures">
  <div class="eyebrow kind">Concept</div>
  <h2>Control procedures</h2>
  <div data-widget="steps" data-key="proc"></div>
  <div class="callout def"><div class="label">Cost vs. benefit</div><p>Don’t build a control system that costs more to set up and run than it’s worth to the company.</p></div>
  <div class="panel">
    <div class="panel-title"><h3>Name the control</h3><span class="hint">Which procedure is at work?</span></div>
    <div data-widget="sorter" data-key="which"></div>
  </div>
</section>

<section class="sec" data-toc="Retail controls">
  <div class="eyebrow kind">Concept</div>
  <h2>Walk through an electronics store</h2>
  <p>A retailer has a huge investment in inventory that can’t easily be locked away, so theft and spoilage are constant risks. The goal is simple: make sure only <b>purchased</b> merchandise leaves the store.</p>
  <div data-widget="steps" data-key="store"></div>
</section>

<section class="sec" data-toc="Purchasing cycle">
  <div class="eyebrow kind">Concept</div>
  <h2>Purchasing cycle controls</h2>
  <p>Customers never see these, but they matter just as much, in any kind of business. There’s no single right process, but these ideas apply:</p>
  <div data-widget="steps" data-key="buy"></div>
  <div class="panel">
    <div class="panel-title"><h3>Pay it or hold it?</h3><span class="hint">Match the purchase order, receiving report, and invoice</span></div>
    <div data-widget="sorter" data-key="match"></div>
  </div>
  <p>In automated systems these documents are electronic, but the controls are just as important.</p>
</section>

<section class="sec" data-toc="Auditing controls">
  <div class="eyebrow kind">Concept</div>
  <h2>Why auditors study controls</h2>
  <p>An auditor doesn’t just check whether a pile of debits and credits is right. The control environment is studied and tested to see if it works as planned. If it does, the system should produce correct data, and far less time is needed on individual transactions. Designing and testing controls is a big part of what accountants do.</p>
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
    <li><span>Internal control safeguards assets, keeps information reliable, ensures policy compliance, and evaluates efficiency.</span></li>
    <li><span>Key procedures: <b>limited access</b>, <b>separation of duties</b>, duty authorization, prenumbered documents, independent verification, outside review.</span></li>
    <li><span>Retailers protect inventory and cash at the “front end”: guards, sensors, cameras, cages, keyed terminals, drawer audits, daily deposits.</span></li>
    <li><span>Purchasing: authorized requests, bids, purchase orders, inspected receipts, receiving reports, and invoices matched to both before payment.</span></li>
    <li><span>Controls should be worth their cost.</span></li>
  </ol>
</section>`,

  data: {
    proc: { numbered: false, items: [
      { t: "Limited access", b: "<p>Only authorized, responsible employees can get to key assets. Example: only department supervisors can enter the supplies stockroom.</p>" },
      { t: "Separation of duties", b: "<p>Different people <b>authorize</b> transactions, <b>record</b> them, and have <b>custody</b> of assets. Cross-checking reduces errors, and fraud would require collusion.</p>" },
      { t: "Duty authorization", b: "<p>Certain functions may be performed only by a specific person. Example: only a sales manager can approve merchandise returns for credit.</p>" },
      { t: "Prenumbered documents", b: "<p>Missing items stand out. Checks are prenumbered so a missing one is spotted quickly.</p>" },
      { t: "Independent verification", b: "<p>Compare cash in a register with the sales it recorded; reconcile bank accounts regularly.</p>" },
      { t: "Outside review", b: "<p>An accounting firm or CPA reviews the records and controls, tests whether the system works as planned, and suggests improvements.</p>" }
    ]},
    store: { items: [
      { t: "Entrance", b: "<p>Planters or posts that look decorative but prevent crash entry. A guard watches separate entrances and exits and matches receipts to goods leaving.</p>" },
      { t: "Sales floor", b: "<p>Hidden sensors sound an alarm if not deactivated at checkout. Cameras overhead. The most expensive items are display-only: you present a claim ticket at a caged area only authorized employees can enter.</p>" },
      { t: "Checkout", b: "<p>Point-of-sale terminals are opened with a key assigned to an employee, so each sale is traced to a person. Bags may be checked and photo IDs examined.</p>" },
      { t: "Cash", b: "<p>Several times a day, cash drawers are pulled, replaced, and audited. Daily bank runs, perhaps by armored courier, get funds deposited quickly and safely.</p>" }
    ]},
    buy: { items: [
      { t: "Authorize", b: "<p>Purchases are initiated only by appropriate supervisors, in line with budgets or other plans.</p>" },
      { t: "Trained buyers", b: "<p>Purchasing staff who negotiate the best terms, understanding freight and discount issues. Strict rules: no gifts, limits on related-party dealings.</p>" },
      { t: "Bids and purchase order", b: "<p>Large purchases get bids from several vendors. A <b>purchase order</b> initiates the actual order.</p>" },
      { t: "Receive and inspect", b: "<p>Receiving inspects goods and matches them to an open purchase order, then prepares a <b>receiving report</b> showing goods arrived in good order.</p>" },
      { t: "Match the invoice", b: "<p>The invoice is matched to the purchase order and receiving report, and scheduled to catch any discount. Pay only for goods <b>ordered and received</b>. The person paying may never see the goods, so documentation matters.</p>" },
      { t: "Final review", b: "<p>An independent supervisor reviews all documents one last time before payment is released.</p>" }
    ]}
  },

  sorters: {
    which: {
      categories: [{ id: "acc", label: "Limited access" }, { id: "sep", label: "Separation of duties" }, { id: "pre", label: "Prenumbering" }, { id: "ver", label: "Independent check" }],
      items: [
        { text: "The employee who records cash receipts never handles the cash", cat: "sep", why: "Recording and custody are split between people." },
        { text: "A manager counts each register drawer and compares it to the register’s sales total", cat: "ver", why: "Comparing cash to recorded sales is independent verification." },
        { text: "Checks are numbered in sequence and a gap is investigated", cat: "pre", why: "Prenumbering makes missing documents obvious." },
        { text: "Only supervisors have keys to the supplies room", cat: "acc", why: "Access to assets is restricted." },
        { text: "The person who approves purchases can’t also sign the checks", cat: "sep", why: "Authorization is separated from asset custody." },
        { text: "The bank account is reconciled every month", cat: "ver", why: "Reconciliation independently verifies the records." }
      ]
    },
    match: {
      categories: [{ id: "pay", label: "Pay" }, { id: "hold", label: "Hold" }],
      items: [
        { text: "PO: 100 chairs at $40. Receiving report: 100 chairs, good condition. Invoice: 100 chairs at $40.", cat: "pay", why: "All three documents agree." },
        { text: "PO: 100 chairs. Receiving report: 90 chairs. Invoice: 100 chairs.", cat: "hold", why: "Only pay for goods actually received." },
        { text: "Invoice for 50 desks, but no purchase order exists.", cat: "hold", why: "Nothing authorized the order." },
        { text: "PO and receiving report agree at 20 lamps; invoice charges $45 each instead of the $35 on the PO.", cat: "hold", why: "The price doesn’t match what was ordered." },
        { text: "PO: 10 printers. Receiving: 10 printers, good order. Invoice: 10 printers at the PO price, terms 2/10, n/30.", cat: "pay", why: "Everything matches. Schedule it to take the discount." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Internal control", back: "Measures to safeguard assets, ensure reliable information, ensure policy compliance, and evaluate efficiency." },
      { term: "Control environment", back: "The combined effect of a firm’s policies and attitudes toward control." },
      { term: "Separation of duties", back: "Authorization, recording, and custody of assets are handled by different employees." },
      { term: "Collusion", back: "Employees acting together to commit fraud, which separation of duties forces." },
      { term: "Purchase order", back: "Document that initiates an order with a vendor." },
      { term: "Receiving report", back: "Document showing goods were received in good order." },
      { term: "Document matching", back: "Comparing the invoice with the purchase order and receiving report before paying." }
    ]
  },

  quiz: [
    { q: "Which is NOT a goal of internal control?", options: ["Safeguard assets", "Ensure reliable accounting information", "Maximize sales volume", "Ensure compliance with management policies"], answer: 2, why: "Controls protect assets and information; they don’t aim to raise sales." },
    { q: "Separation of duties means different employees should:", options: ["Share all tasks equally", "Authorize, record, and have custody of assets", "Report to different banks", "Work different shifts"], answer: 1, why: "Splitting these functions reduces errors and requires collusion for fraud." },
    { q: "Why are checks prenumbered?", options: ["To look professional", "So missing checks can be identified rapidly", "Banks require it", "To speed up printing"], answer: 1, why: "Gaps in the sequence reveal missing documents." },
    { q: "Comparing the cash in a register with the sales it recorded is an example of:", options: ["Limited access", "Independent verification", "Duty authorization", "Separation of duties"], answer: 1, why: "It independently checks the records against the asset." },
    { q: "Before paying an invoice, it should be matched to the:", options: ["Sales invoice and credit memo", "Purchase order and receiving report", "Balance sheet", "Trial balance"], answer: 1, why: "Pay only for goods ordered and received." },
    { q: "When goods arrive, the receiving department should first:", options: ["Pay the vendor", "Inspect them and match them to an open purchase order", "Record a sale", "Return them"], answer: 1, why: "Make sure what arrived was actually ordered." },
    { q: "Why do auditors study and test the control environment?", options: ["It replaces financial statements", "If controls work, the system should produce correct data and less transaction testing is needed", "It’s required daily", "To prepare tax returns"], answer: 1, why: "Strong controls reduce the need to examine every transaction." }
  ]
});

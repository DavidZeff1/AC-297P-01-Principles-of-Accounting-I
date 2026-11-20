/* Lesson 6.2 · Cash Management */
HUB.register("6-2", {
  summary: "Having enough cash, investing idle cash, and protecting it. Learn ways to improve cash flow and the controls over cash sales, mail receipts, and disbursements.",
  objectives: [
    "Explain the treasurer’s role and the cash budget",
    "Compare external and internal ways to improve cash flow",
    "Describe controls over cash receipts and disbursements"
  ],
  html: `
<section class="sec" data-toc="Planning cash">
  <div class="eyebrow kind">Concept</div>
  <h2>Enough cash, and no idle cash</h2>
  <p>A company must have enough cash to meet its obligations and should invest any idle cash. The <b>treasurer</b> studies the company’s cash flows to pinpoint periods of expected surplus or shortage. A <b>cash budget</b>, the plan of cash inflows and outflows for a period, is the core of cash planning (a later course covers it in depth).</p>
  <p>A cash shortage isn’t always a sign of weakness. Successful, growing companies need cash for new locations, more inventory, and growing receivables. Growth has to be planned for.</p>
</section>

<section class="sec" data-toc="Raising cash">
  <div class="eyebrow kind">Concept</div>
  <h2>Ways to improve cash flow</h2>
  <div class="grid2">
    <div class="tile"><span class="k">External: issue stock</span><p>Cash with no obligation to repay. But existing shareholders are <b>diluted</b>: in effect they sell off part of the business.</p></div>
    <div class="tile"><span class="k">External: borrow</span><p>No dilution, but the money must be repaid with interest, adding cost and risk. Many companies pay a fee for a standing <b>line of credit</b>.</p></div>
    <div class="tile alt"><span class="k">Internal: collect faster</span><p>Electronic payments, credit cards, and cash discounts for prompt payment.</p></div>
    <div class="tile alt"><span class="k">Internal: pay later</span><p>Delay payments as long as allowed. Mailing a check uses the <b>float</b>. But writing a check without sufficient funds in the bank is <b>illegal</b>.</p></div>
  </div>
  <div class="panel">
    <div class="panel-title"><h3>External or internal?</h3><span class="hint">And what’s the trade-off?</span></div>
    <div data-widget="sorter" data-key="ei"></div>
  </div>
</section>

<section class="sec" data-toc="Controlling cash">
  <div class="eyebrow kind">Concept</div>
  <h2>Controls over cash</h2>
  <p>The same control features from lesson 5.5 apply: limit access to a few authorized people, separate incompatible duties, and add accountability features like prenumbered checks.</p>
  <h3>Cash sales</h3>
  <p>Control starts at the point of sale and continues to the bank: use point-of-sale terminals, compare actual cash at day’s end to register reports, and deposit daily.</p>
  <h3>Receipts by mail</h3>
  <p>Separation of duties is built right into the flow. Step through it:</p>
  <div data-widget="steps" data-key="mail"></div>
  <h3>Disbursements</h3>
  <ul>
    <li>Allow only authorized payments, with proper separation of duties.</li>
    <li>Pay by check or electronic equivalent, never loose cash.</li>
    <li>Reconcile the bank account regularly (lesson 6.3).</li>
    <li>Use a petty cash system for small payments (lesson 6.4).</li>
    <li>Verify supporting documents before paying.</li>
  </ul>
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
    <li><span>The treasurer plans for cash surpluses and shortages using a <b>cash budget</b>.</span></li>
    <li><span>External sources: issuing stock (dilution) or borrowing (interest and risk). Internal: collect faster, pay later (legally).</span></li>
    <li><span>Cash sales: terminals, end-of-day comparison, daily deposits.</span></li>
    <li><span>Mail receipts: one person lists checks, a cashier deposits, accounting records and compares the list to the deposit slip.</span></li>
    <li><span>Disbursements: authorized, by check, supported by documents, reconciled.</span></li>
  </ol>
</section>`,

  data: {
    mail: { items: [
      { t: "Open the mail", b: "<p>The person opening the mail prepares a <b>list of checks received</b> and sends the list to the accounting department.</p>" },
      { t: "Cashier deposits", b: "<p>The checks themselves go to a <b>cashier</b>, who prepares the daily bank deposit.</p>" },
      { t: "Accounting records", b: "<p>The accounting department records the receipts from the list. It never touches the checks.</p>" },
      { t: "Compare", b: "<p>Accounting compares the list with a copy of the cashier’s deposit slip. A mismatch flags a problem.</p>" }
    ]}
  },

  sorters: {
    ei: {
      categories: [{ id: "ext", label: "External" }, { id: "int", label: "Internal" }],
      items: [
        { text: "Issue new shares of stock", cat: "ext", why: "Outside investors provide cash, but existing owners are diluted." },
        { text: "Offer customers 2/10, n/30 terms", cat: "int", why: "Faster collection from customers." },
        { text: "Draw on a bank line of credit", cat: "ext", why: "Borrowed money must be repaid with interest." },
        { text: "Accept credit cards and electronic payments", cat: "int", why: "Speeds up collections." },
        { text: "Pay suppliers on the last allowed day", cat: "int", why: "Postponing outflows preserves cash." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Treasurer", back: "The officer who manages the company’s cash: planning surpluses, shortages, and investments." },
      { term: "Cash budget", back: "A plan of cash inflows and outflows for a stated period." },
      { term: "Dilution", back: "The reduction in existing shareholders’ ownership percentage when new shares are issued." },
      { term: "Line of credit", back: "A standing arrangement with a bank to borrow as needed." },
      { term: "Float", back: "The time between writing a check and the funds leaving the account." }
    ]
  },

  quiz: [
    { q: "The main component of a cash planning system is the:", options: ["Balance sheet", "Cash budget", "Trial balance", "Bank statement"], answer: 1, why: "It plans cash inflows and outflows." },
    { q: "A drawback of issuing additional stock to raise cash is:", options: ["Interest must be paid", "Existing shareholders are diluted", "It must be repaid", "It reduces sales"], answer: 1, why: "New shares reduce existing owners’ proportion." },
    { q: "A drawback of borrowing is:", options: ["Dilution", "Repayment with interest increases cost and risk", "It can’t be done quickly", "It reduces revenue"], answer: 1, why: "Debt must be repaid with interest." },
    { q: "Which is an internal way to improve cash flow?", options: ["Issue bonds", "Accelerate collections from customers", "Issue stock", "Take out a mortgage"], answer: 1, why: "It uses the company’s own operations." },
    { q: "In controlling mail receipts, who records the receipts in the accounts?", options: ["The person who opens the mail", "The cashier", "The accounting department, from the list of checks", "The customer"], answer: 2, why: "Accounting works from the list and never handles the checks." },
    { q: "Which is a control over disbursements?", options: ["Paying with loose currency", "Verifying supporting documents before paying", "Letting any employee sign checks", "Skipping bank reconciliations"], answer: 1, why: "Only properly supported, authorized payments should be made." }
  ]
});

/* Lesson 6.3 · Bank Reconciliation */
HUB.register("6-3", {
  summary: "Reconcile the bank statement to the books to catch errors and unrecorded items. Work through The Tackle Shop’s July reconciliation, then see why a proof of cash catches what a reconciliation misses.",
  objectives: [
    "Explain why bank reconciliations are prepared, and by whom",
    "Classify reconciling items as bank-side or book-side",
    "Prepare a two-sided bank reconciliation and the resulting entries",
    "Describe debit card issues, proof of cash, and kiting"
  ],
  html: `
<section class="sec" data-toc="Why reconcile?">
  <div class="eyebrow kind">Concept</div>
  <h2>Two records of the same cash</h2>
  <p>A <b>bank reconciliation</b> compares the cash balance on the monthly <b>bank statement</b> (the bank’s summary of deposits and other credits, and checks and other debits) with the Cash balance in the general ledger. It identifies errors, irregularities, and needed adjustments.</p>
  <p>It should be prepared promptly by someone <b>not otherwise involved</b> with cash receipts or disbursements. That separation of duties deters fraud by requiring collusion.</p>
  <div class="grid2">
    <div class="tile"><span class="k">On the books, not yet at the bank</span><ul><li><b>Deposits in transit</b>: receipts recorded but not yet processed by the bank</li><li><b>Outstanding checks</b>: checks written that haven’t cleared</li></ul></div>
    <div class="tile alt"><span class="k">At the bank, not yet on the books</span><ul><li><b>NSF checks</b>: deposited “hot” checks returned for nonpayment</li><li>Bank service charges</li><li>Notes receivable collected by the bank</li><li>Interest earned</li><li>Electronic withdrawals and debit card charges</li></ul></div>
  </div>
  <p>Both sides are adjusted to the same <b>correct cash balance</b>. Then journal entries are made for every <b>book-side</b> item, because those events affect cash but haven’t been recorded yet.</p>
</section>

<section class="sec" data-toc="The Tackle Shop">
  <div class="eyebrow kind try">Try it</div>
  <h2>The Tackle Shop’s July reconciliation</h2>
  <p>Bank statement balance at July 31: <b>$50,670.23</b>. General ledger Cash balance: <b>$47,535.30</b>. Here’s what the accountant found comparing the bank statement with the check register:</p>
  <ul>
    <li>Check #5454, written in June, cleared July 2. There were no other June reconciling items.</li>
    <li>The utility company drafts the account directly each month (an EFT on July 11), not yet recorded by the company.</li>
    <li>A customer’s check bounced (NSF), and the bank added a fee. The Tackle Shop expects to recover both.</li>
    <li>The bank collected a $5,000 note for the company plus 9% interest: $5,450.</li>
    <li>The credit card company’s July 25 remittance was already recorded by the company when the email notice arrived.</li>
    <li>The $3,565.93 deposit was made late on July 31.</li>
  </ul>
  <div class="panel">
    <div class="panel-title"><h3>Where does each item go?</h3><span class="hint">Add or subtract, on the bank side or the book side</span></div>
    <div data-widget="sorter" data-key="items"></div>
  </div>
  <div class="grid2">
    <div data-widget="statement" data-key="bank"></div>
    <div data-widget="statement" data-key="book"></div>
  </div>
  <p>Both sides arrive at <b>$52,503.51</b>, so the reconciliation is complete. The book side required increasing Cash by $4,968.21. Every book-side item gets an entry:</p>
  <div data-widget="journal" data-key="entry"></div>
  <p>The $462.06 debit to Accounts Receivable shows the shop will try to collect the bad check and fee from the customer. Interest income of $569.34 is the bank’s $119.34 plus $450 on the note.</p>
</section>

<section class="sec" data-toc="Debit cards">
  <div class="eyebrow kind">Watch out</div>
  <h2>Debit cards complicate things</h2>
  <p>A debit card transaction is like an electronic check that withdraws funds almost immediately. Each one appears on the bank statement and must be recorded in the books, and approval and documentation can be hard to control. Reconciliations often uncover debit card withdrawals that still need recording.</p>
</section>

<section class="sec" data-toc="Proof of cash and kiting">
  <div class="eyebrow kind">Concept</div>
  <h2>What a reconciliation misses</h2>
  <div class="grid2">
    <div class="tile warn"><span class="k">The gap</span><p>An employee writes an unauthorized $5,000 check to himself early in the month and deposits $5,000 back near month end, recording neither. The ending balances still agree, so the reconciliation shows nothing.</p></div>
    <div class="tile"><span class="k">Proof of cash</span><p>Also reconcile <b>total deposits</b> per bank to total receipts per books, and <b>total checks</b> per bank to total disbursements per books. The unauthorized “loan” makes the bank’s totals exceed the books’ for both. Highly recommended when volumes and amounts are large.</p></div>
  </div>
  <div class="callout watch">
    <div class="label">Kiting (illegal)</div>
    <p>Opening accounts at several banks and writing checks from one to deposit in another, over and over, so every account seems to have money while checks are “floating.” Eventually the perpetrator withdraws cash and vanishes. Holds on deposited funds, and faster electronic clearing, make kiting much harder.</p>
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
    <li><span>A bank reconciliation, done by someone independent of cash handling, brings both balances to the <b>correct cash balance</b>.</span></li>
    <li><span><b>Bank side</b>: add deposits in transit, subtract outstanding checks.</span></li>
    <li><span><b>Book side</b>: add collections and interest; subtract NSF checks, service charges, and unrecorded withdrawals.</span></li>
    <li><span>Only book-side items need journal entries.</span></li>
    <li><span>A <b>proof of cash</b> also reconciles total receipts and disbursements, catching offsetting unrecorded activity.</span></li>
  </ol>
</section>`,

  data: {
    bank: { entity: "The Tackle Shop", title: "Bank side", date: "July 31, 20X3", cols: 2, rows: [
      { l: "Balance per bank statement", b: 50670.23 },
      { l: "Add: Deposit in transit", b: 3565.93, ub: true },
      { l: "Subtotal", b: 54236.16 },
      { l: "Less: Outstanding checks", head: true },
      { l: "#5521", a: 1250.00, ind: 1 },
      { l: "#5530", a: 482.65, ind: 1, ua: true },
      { l: "Total outstanding checks", b: -1732.65, ub: true },
      { l: "Correct cash balance", b: 52503.51, bold: true, uub: true, link: "ccb" }
    ]},
    book: { entity: "The Tackle Shop", title: "Book side", date: "July 31, 20X3", cols: 2, rows: [
      { l: "Balance per company records", b: 47535.30 },
      { l: "Add: Note collected by bank", a: 5000.00, ind: 1 },
      { l: "Add: Interest on note", a: 450.00, ind: 1 },
      { l: "Add: Interest earned on account", a: 119.34, ind: 1, ua: true },
      { l: "Total additions", b: 5569.34, ub: true },
      { l: "Subtotal", b: 53104.64 },
      { l: "Less: NSF check and fee", a: 462.06, ind: 1 },
      { l: "Less: Utility EFT", a: 124.07, ind: 1 },
      { l: "Less: Bank service charge", a: 15.00, ind: 1, ua: true },
      { l: "Total deductions", b: -601.13, ub: true },
      { l: "Correct cash balance", b: 52503.51, bold: true, uub: true, link: "ccb" }
    ]},
    entry: { entries: [{ date: "Jul. 31", lines: [["Cash", 4968.21, 0], ["Accounts Receivable", 462.06, 0], ["Utilities Expense", 124.07, 0], ["Bank Service Charges", 15.00, 0], ["Notes Receivable", 0, 5000.00], ["Interest Income", 0, 569.34]], memo: "Record book-side reconciling items" }] }
  },

  sorters: {
    items: {
      categories: [{ id: "ba", label: "Bank +" }, { id: "bs", label: "Bank −" }, { id: "ka", label: "Book +" }, { id: "ks", label: "Book −" }],
      items: [
        { text: "$3,565.93 deposit made late on July 31", cat: "ba", why: "A deposit in transit: on the books, not yet processed by the bank." },
        { text: "Checks #5521 and #5530, written in July, not yet cleared", cat: "bs", why: "Outstanding checks reduce the bank balance once they clear." },
        { text: "$5,450 note and interest collected by the bank", cat: "ka", why: "The bank recorded it; the company hasn’t yet." },
        { text: "Customer’s NSF check returned, plus the bank’s fee", cat: "ks", why: "Cash the company thought it had isn’t there." },
        { text: "Utility company’s automatic EFT withdrawal", cat: "ks", why: "The bank paid it; the books don’t show it yet." },
        { text: "Interest the bank credited to the account", cat: "ka", why: "The bank added it; record it on the books." },
        { text: "Monthly bank service charge", cat: "ks", why: "A bank deduction not yet recorded by the company." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Bank reconciliation", back: "A comparison of the bank statement balance with the ledger Cash balance, adjusting both to the correct cash balance." },
      { term: "Deposit in transit", back: "A receipt recorded by the company but not yet processed by the bank. Add to the bank balance." },
      { term: "Outstanding check", back: "A check written but not yet cleared. Subtract from the bank balance." },
      { term: "NSF check", back: "A deposited check returned for nonpayment. Subtract on the book side." },
      { term: "EFT", sub: "electronic funds transfer", back: "An electronic payment or withdrawal, such as an automatic utility draft." },
      { term: "Proof of cash", back: "A reconciliation of beginning and ending balances plus total receipts and total disbursements." },
      { term: "Kiting", back: "An illegal scheme of writing checks between accounts at different banks to create illusory balances." }
    ]
  },

  quiz: [
    { q: "Who should prepare the bank reconciliation?", options: ["The cashier who makes deposits", "Someone not involved in cash receipts and disbursements", "The person who signs checks", "The bank"], answer: 1, why: "Independence supports separation of duties." },
    { q: "A deposit in transit is:", options: ["Added to the book balance", "Added to the bank balance", "Subtracted from the bank balance", "Subtracted from the book balance"], answer: 1, why: "The bank hasn’t recorded it yet." },
    { q: "Outstanding checks are:", options: ["Added to the bank balance", "Subtracted from the bank balance", "Subtracted from the book balance", "Ignored"], answer: 1, why: "They’ll reduce the bank balance when they clear." },
    { q: "An NSF check is:", options: ["Subtracted from the book balance", "Added to the bank balance", "Added to the book balance", "Subtracted from the bank balance"], answer: 0, why: "The company recorded cash it didn’t actually get." },
    { q: "Which reconciling items require journal entries?", options: ["Bank-side items", "Book-side items", "Both", "Neither"], answer: 1, why: "Book-side items are events not yet recorded by the company." },
    { q: "The bank collected a $5,000 note plus $450 interest for the company. The entry includes:", options: ["Credit Cash $5,450", "Credit Notes Receivable $5,000 and Interest Income $450", "Debit Notes Receivable $5,000", "No entry"], answer: 1, why: "Cash increases; the note is settled and interest is earned." },
    { q: "An employee writes an unrecorded $5,000 check to himself and later redeposits $5,000. What detects it?", options: ["A standard reconciliation", "A proof of cash", "A trial balance", "Nothing can"], answer: 1, why: "Total receipts and disbursements per bank would exceed the books." },
    { q: "Kiting relies on:", options: ["Checks floating between accounts at different banks", "Stealing stamps", "Overstating inventory", "Bank interest"], answer: 0, why: "Illusory balances are created by uncleared checks." }
  ]
});

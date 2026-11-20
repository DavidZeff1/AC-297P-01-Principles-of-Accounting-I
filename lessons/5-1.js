/* Lesson 5.1 · The Merchandising Operation: Sales */
HUB.register("5-1", {
  summary: "Merchants buy inventory and resell it at a profit. Learn gross profit, how sales, returns, and allowances are recorded, and how trade discounts, credit cards, and cash discounts work.",
  objectives: [
    "Explain gross profit and why it’s reported separately",
    "Record sales and sales returns and allowances, and compute net sales",
    "Treat trade discounts and credit card fees correctly",
    "Record sales with cash discount terms such as 2/10, n/30"
  ],
  html: `
<section class="sec" data-toc="Gross profit">
  <div class="eyebrow kind">Concept</div>
  <h2>Merchants earn a gross profit</h2>
  <p>Earlier chapters used service businesses like law firms and architects. <b>Merchants</b> buy inventory and resell it at a higher price, in stores or online. Their income statements show an intermediate amount: <b>gross profit</b> = sales − cost of goods sold.</p>
  <div class="grid2">
    <div data-widget="statement" data-key="chair"></div>
    <div class="tile"><span class="k">Why it matters</span><p>Gross profit shows the company sells merchandise for more than it costs. If the <b>gross profit rate</b> is thin, the business may struggle to make money even when sales rise. If it’s strong, more sales can sharply improve net income, especially when operating expenses don’t change.</p></div>
  </div>
  <div class="panel">
    <div class="panel-title"><h3>Do more sales always help?</h3><span class="hint">Operating expenses stay at $150,000</span></div>
    <div data-widget="calc" data-key="gp"></div>
  </div>
</section>

<section class="sec" data-toc="Sales and returns">
  <div class="eyebrow kind">Concept</div>
  <h2>Recording sales, returns, and allowances</h2>
  <p>The <b>Sales</b> account is a revenue account for merchandise sold. A $4,000 sale is recorded one of two ways:</p>
  <div data-widget="journal" data-key="sale"></div>
  <p>When a customer returns $1,000 of goods bought on account, the sale isn’t simply canceled. A <b>contra-revenue</b> account is debited instead:</p>
  <div data-widget="journal" data-key="ret"></div>
  <div class="grid2">
    <div class="tile"><span class="k">Why a separate account?</span><p>Sales − sales returns and allowances = <b>net sales</b>. Keeping returns separate lets managers and analysts track returns relative to sales, a measure of customer satisfaction.</p></div>
    <div class="tile alt"><span class="k">Credit memorandum</span><p>A return on account is documented with a <b>credit memorandum</b>: notice that the customer’s receivable has been credited and payment isn’t expected. A cash refund would credit Cash instead.</p></div>
  </div>
  <p><b>Returns vs. allowances:</b> a customer with a slightly defective item might keep it if the price is reduced. That reduction is an <b>allowance</b>, recorded with the same accounts (or a separate allowance account).</p>
  <div data-widget="statement" data-key="chair2"></div>
</section>

<section class="sec" data-toc="Trade discounts">
  <div class="eyebrow kind">Concept</div>
  <h2>Trade discounts are never recorded</h2>
  <p>Catalogs show a <b>list price</b> that may bear little relation to what customers actually pay. A <b>trade discount</b> reduces the list price; the buyer owes the <b>invoice price</b>. Because the sale is measured at the exchange price, only the invoice price is recorded.</p>
  <div class="big-eq" style="font-size:20px">List $5,000 − 20% trade discount = <span class="a">$4,000 recorded as the sale</span></div>
</section>

<section class="sec" data-toc="Credit cards">
  <div class="eyebrow kind">Concept</div>
  <h2>Credit cards</h2>
  <div class="grid2">
    <div class="tile"><span class="k">Store-issued cards</span><p>They encourage spending and can earn interest revenue, but bring costs: customers who never pay (bad debts), a credit department, billing.</p></div>
    <div class="tile alt"><span class="k">Visa, Mastercard, etc.</span><p>The merchant is paid almost instantly, minus a service charge of roughly <b>1% to 3%</b>. The card company handles billing and collection.</p></div>
  </div>
  <p>Many merchants record the full sale as revenue and the card company’s fee as an expense. A $1,000 sale with a 2% fee:</p>
  <div data-widget="journal" data-key="card"></div>
</section>

<section class="sec" data-toc="Cash discounts">
  <div class="eyebrow kind try">Try it</div>
  <h2>Cash discounts: 2/10, n/30</h2>
  <p>When selling to businesses on <b>open account</b> (a standing agreement to extend credit), a seller may offer a <b>cash discount</b>, also called a <b>sales discount</b>, for prompt payment. Terms of <b>2/10, n/30</b> mean a 2% discount if paid within 10 days; otherwise the net amount is due within 30 days.</p>
  <p>Barber Shop Supply sells $1,000 of goods to Hair Port Landing on those terms. Slide the payment date to see what the customer pays and how Barber Shop Supply records it.</p>
  <div class="panel"><div data-widget="calc" data-key="terms"></div></div>
  <p>Either way, Accounts Receivable is credited for the <b>full</b> $1,000, because the payment settles the whole obligation. The discount goes to <b>Sales Discounts</b>, another contra-revenue account subtracted in computing net sales.</p>
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
    <li><span><b>Gross profit</b> = sales − cost of goods sold, reported as an intermediate amount.</span></li>
    <li><span>Returns and allowances are debited to the contra-revenue <b>Sales Returns and Allowances</b>; net sales = sales − returns and allowances (− sales discounts).</span></li>
    <li><span><b>Trade discounts</b> aren’t recorded; sales are recorded at invoice price.</span></li>
    <li><span>Bank card fees (about 1–3%) are usually recorded as an expense.</span></li>
    <li><span><b>2/10, n/30</b>: 2% off if paid within 10 days, otherwise due in 30. A discount taken is debited to <b>Sales Discounts</b>.</span></li>
  </ol>
</section>`,

  data: {
    chair: { entity: "Chair Depot", title: "Income Statement", date: "For the Year Ended December 31, 20X5", rows: [
      { l: "Sales", a: 500000 },
      { l: "Cost of goods sold", a: -300000, ua: true },
      { l: "Gross profit", a: 200000, bold: true },
      { l: "Operating expenses", a: -150000, ua: true },
      { l: "Net income", a: 50000, bold: true, uua: true }
    ]},
    chair2: { entity: "Chair Depot", title: "Income Statement (with returns)", date: "For the Year Ended December 31, 20X5", cols: 2, rows: [
      { l: "Sales", a: 520000 },
      { l: "Less: Sales returns and allowances", a: -20000, ua: true },
      { l: "Net sales", b: 500000 },
      { l: "Cost of goods sold", b: -300000, ub: true },
      { l: "Gross profit", b: 200000, bold: true },
      { l: "Operating expenses", b: -150000, ub: true },
      { l: "Net income", b: 50000, bold: true, uub: true }
    ]},
    gp: {
      inputs: [
        { id: "rate", label: "Gross profit rate", min: 10, max: 50, step: 10, value: 40, fmt: "%" },
        { id: "grow", label: "Sales growth", min: 0, max: 50, step: 25, value: 0, fmt: "%" }
      ],
      run: function (v, money) {
        var sales = 500000 * (1 + v.grow / 100), gp = sales * v.rate / 100, ni = gp - 150000;
        return { html: '<div class="statement"><div class="st-row"><span class="st-l">Sales</span><span class="st-b">' + money(sales) + '</span></div><div class="st-row"><span class="st-l">Gross profit (' + v.rate + '%)</span><span class="st-b">' + money(gp) + '</span></div><div class="st-row"><span class="st-l">Operating expenses</span><span class="st-b"><span class="u">' + money(-150000) + '</span></span></div><div class="st-row bold"><span class="st-l">Net income</span><span class="st-b"><span class="uu">' + money(ni) + '</span></span></div></div>',
          say: (ni >= 0 ? "Net income is <b>" + money(ni) + "</b>." : "That’s a net loss of <b>" + money(-ni) + "</b>.") + (v.rate <= 20 ? " With a thin gross profit rate, even growing sales barely helps." : v.grow ? " With a healthy rate, extra sales flow strongly to the bottom line." : "") };
      }
    },
    sale: { entries: [
      { date: "", lines: [["Cash", 4000, 0], ["Sales", 0, 4000]], memo: "Cash sale" },
      { date: "", lines: [["Accounts Receivable", 4000, 0], ["Sales", 0, 4000]], memo: "Sale on account" }
    ]},
    ret: { entries: [{ date: "", lines: [["Sales Returns and Allowances", 1000, 0], ["Accounts Receivable", 0, 1000]], memo: "Customer returned merchandise; credit memorandum issued" }] },
    card: { entries: [{ date: "", lines: [["Cash", 980, 0], ["Credit Card Expense", 20, 0], ["Sales", 0, 1000]], memo: "Bank card sale, net of the 2% service charge" }] },
    terms: {
      inputs: [{ id: "d", label: "Days after the March 1 invoice", min: 1, max: 30, step: 1, value: 8, fmt: "n" }],
      run: function (v, money) {
        var ok = v.d <= 10, pay = ok ? 980 : 1000;
        var entry = '<div class="scroll-x"><table class="journal"><tbody class="jr-entry"><tr><td class="jr-acct">Cash</td><td class="num">' + pay.toLocaleString() + '</td><td class="num"></td></tr>' +
          (ok ? '<tr><td class="jr-acct">Sales Discounts</td><td class="num">20</td><td class="num"></td></tr>' : '') +
          '<tr><td class="jr-acct cr">Accounts Receivable</td><td class="num"></td><td class="num">1,000</td></tr></tbody></table></div>';
        return { html: '<div class="invoice"><div class="inv-top"><b>Barber Shop Supply</b><span>Invoice #2817 · March 1</span></div><div>Sold to: Hair Port Landing</div><div>Terms: <b>2/10, n/30</b> · Amount: <b>$1,000.00</b></div><div class="inv-pay ' + (ok ? "ok" : "late") + '">Paid March ' + (1 + v.d) + ': ' + money(pay) + (ok ? " (discount taken)" : " (no discount)") + '</div></div>' + entry,
          say: ok ? "Paid within 10 days: the customer sends <b>$980</b>. Debit Cash $980 and Sales Discounts $20; credit Accounts Receivable $1,000."
            : "Paid after the 10-day window: the customer owes the full <b>$1,000</b>. Debit Cash and credit Accounts Receivable $1,000." };
      }
    }
  },

  cards: {
    terms: [
      { term: "Merchant", back: "A business that buys inventory and resells it at a higher price." },
      { term: "Gross profit", back: "Sales minus cost of goods sold." },
      { term: "Sales Returns and Allowances", back: "A contra-revenue account for returned goods and price reductions given to keep goods." },
      { term: "Net sales", back: "Sales minus sales returns and allowances (and sales discounts)." },
      { term: "Credit memorandum", back: "A document showing that a customer’s receivable has been reduced, e.g., for a return." },
      { term: "Trade discount", back: "A reduction from list price; not recorded. Sales are recorded at invoice price." },
      { term: "Open account", back: "A standing agreement to extend credit for purchases." },
      { term: "Cash (sales) discount", back: "A discount for prompt payment, recorded in the contra-revenue account Sales Discounts." },
      { term: "2/10, n/30", back: "2% discount if paid within 10 days; otherwise the net amount is due within 30 days." }
    ]
  },

  quiz: [
    { q: "Gross profit equals:", options: ["Sales − operating expenses", "Sales − cost of goods sold", "Net sales − net income", "Revenue − all expenses"], answer: 1, why: "It’s the margin on the merchandise itself." },
    { q: "A customer returns $500 of goods bought on account. The seller debits:", options: ["Sales", "Sales Returns and Allowances", "Accounts Receivable", "Cash"], answer: 1, why: "The contra-revenue account is debited; Accounts Receivable is credited." },
    { q: "Sales $520,000 and returns and allowances $20,000. Net sales are:", options: ["$540,000", "$520,000", "$500,000", "$20,000"], answer: 2, why: "$520,000 − $20,000 = $500,000." },
    { q: "Goods listed at $5,000 are sold with a 20% trade discount. The sale is recorded at:", options: ["$5,000", "$4,000", "$1,000", "$5,000 with a $1,000 discount account"], answer: 1, why: "Trade discounts aren’t recorded; the invoice price is." },
    { q: "Terms 2/10, n/30 mean:", options: ["2% interest after 10 days", "A 2% discount if paid within 10 days; otherwise due in 30 days", "Pay 10% within 2 days", "Net due in 10 days"], answer: 1, why: "That’s the standard reading of the terms." },
    { q: "A $1,000 invoice at 2/10, n/30 is paid within 10 days. The seller credits Accounts Receivable for:", options: ["$980", "$1,000", "$20", "$1,020"], answer: 1, why: "The payment settles the full obligation; $20 goes to Sales Discounts." },
    { q: "Sales Discounts is a:", options: ["Expense", "Contra-revenue account", "Liability", "Asset"], answer: 1, why: "It’s subtracted in computing net sales." },
    { q: "A $1,000 Visa sale with a 2% fee is commonly recorded as:", options: ["Debit Cash $1,000, credit Sales $1,000", "Debit Cash $980 and Credit Card Expense $20, credit Sales $1,000", "Debit Cash $980, credit Sales $980", "Debit Accounts Receivable $1,000, credit Sales $1,000"], answer: 1, why: "Full sale as revenue, fee as expense." }
  ]
});

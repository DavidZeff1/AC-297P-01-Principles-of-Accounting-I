/* Lesson 6.1 · Cash Composition */
HUB.register("6-1", {
  summary: "What counts as cash on the balance sheet, what doesn’t, and what “cash equivalents” are.",
  objectives: [
    "Define cash for accounting purposes",
    "Classify items that look like cash but aren’t",
    "Explain compensating balances, sinking funds, and restricted currency",
    "Define cash equivalents"
  ],
  html: `
<section class="sec" data-toc="What is cash?">
  <div class="eyebrow kind">Concept</div>
  <h2>Cash: acceptable for deposit and free to use</h2>
  <p>Cash includes items that a bank will accept for deposit and that are <b>free from restrictions</b>, meaning available to pay current debts.</p>
  <div class="grid2">
    <div class="tile"><span class="k">Cash</span><ul><li>Coins and currency</li><li>Funds on deposit with a bank</li><li>Checks (undeposited, current-dated)</li><li>Money orders</li></ul></div>
    <div class="tile warn"><span class="k">Not cash, and where it goes</span><ul><li>Postdated checks → receivables</li><li>Certificates of deposit → short-term investments</li><li>IOUs → receivables</li><li>Stamps → supplies or prepaids</li><li>Travel advances → prepaid expenses or receivables</li></ul></div>
  </div>
  <div class="panel">
    <div class="panel-title"><h3>Cash or not?</h3><span class="hint">Sort each item</span></div>
    <div data-widget="sorter" data-key="cash"></div>
  </div>
</section>

<section class="sec" data-toc="Restricted funds">
  <div class="eyebrow kind">Concept</div>
  <h2>Cash with strings attached</h2>
  <div class="grid3">
    <div class="tile"><span class="k">Compensating balances</span><p>Amounts a bank requires you to leave on deposit and not withdraw. They must be <b>disclosed</b>, and reported separately from cash if significant.</p></div>
    <div class="tile"><span class="k">Sinking funds</span><p>Money that must be set aside to pay off debts. Often reported among <b>long-term investments</b>.</p></div>
    <div class="tile"><span class="k">Restricted foreign currency</span><p>Holdings that can’t easily be transferred or converted. Also may be reported in long-term investments.</p></div>
  </div>
</section>

<section class="sec" data-toc="Cash equivalents">
  <div class="eyebrow kind">Concept</div>
  <h2>Cash and cash equivalents</h2>
  <p>Many companies park cash in very short-term, highly secure instruments that will convert back to cash within <b>90 days</b>, such as short-term government treasury bills. These are very marketable if cash is needed quickly. They’re reported together with cash:</p>
  <div class="grid2">
    <div data-widget="statement" data-key="bs"></div>
    <div class="tile"><span class="k">Note to the statements</span><p>Cash and cash equivalents include currency, bank deposits, and highly liquid investments with original maturities of three months or less, such as treasury bills.</p></div>
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
    <li><span><b>Cash</b>: items acceptable for deposit and free from restrictions: coins, currency, bank deposits, checks, money orders.</span></li>
    <li><span>Postdated checks, CDs, IOUs, stamps, and travel advances are <b>not</b> cash.</span></li>
    <li><span>Disclose compensating balances; sinking funds and restricted foreign currency may go in long-term investments.</span></li>
    <li><span><b>Cash equivalents</b> are secure instruments converting to cash within 90 days, like treasury bills.</span></li>
  </ol>
</section>`,

  data: {
    bs: { entity: "Example Company", title: "Balance Sheet (excerpt)", date: "December 31, 20X5", rows: [
      { l: "Current assets", head: true },
      { l: "Cash and cash equivalents", a: 185000, ind: 1 },
      { l: "Short-term investments", a: 60000, ind: 1 },
      { l: "Accounts receivable", a: 140000, ind: 1 }
    ]}
  },

  sorters: {
    cash: {
      categories: [{ id: "c", label: "Cash" }, { id: "n", label: "Not cash" }],
      items: [
        { text: "Currency in the cash register", cat: "c", why: "Coins and currency are cash." },
        { text: "A customer’s check dated next month (postdated)", cat: "n", why: "It can’t be deposited yet; treat it as a receivable." },
        { text: "Balance in the company checking account", cat: "c", why: "Funds on deposit with a bank are cash." },
        { text: "A one-year certificate of deposit", cat: "n", why: "CDs are short-term investments." },
        { text: "Postage stamps", cat: "n", why: "Stamps are supplies or prepaid expenses." },
        { text: "A money order received from a customer", cat: "c", why: "Banks accept money orders for deposit." },
        { text: "An employee’s IOU for a cash advance", cat: "n", why: "It’s a receivable." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Cash", back: "Items acceptable to a bank for deposit and free from restrictions: coins, currency, deposits, checks, money orders." },
      { term: "Postdated check", back: "A check dated in the future; a receivable, not cash." },
      { term: "Compensating balance", back: "An amount that must be left on deposit; disclosed and reported separately if significant." },
      { term: "Sinking fund", back: "Money set aside to satisfy debts; may be a long-term investment." },
      { term: "Cash equivalents", back: "Highly secure short-term instruments converting to cash within 90 days, like treasury bills." }
    ]
  },

  quiz: [
    { q: "For accounting purposes, cash generally includes items that are:", options: ["Valuable", "Acceptable for deposit and free from restrictions", "Held for more than a year", "Owned by employees"], answer: 1, why: "That’s the general definition." },
    { q: "Which is classified as cash?", options: ["A postdated check", "Postage stamps", "A money order", "An IOU"], answer: 2, why: "Money orders are acceptable for deposit." },
    { q: "A certificate of deposit is usually classified as a:", options: ["Cash item", "Short-term investment", "Supply", "Liability"], answer: 1, why: "CDs are investments, not cash." },
    { q: "A compensating balance should be:", options: ["Ignored", "Disclosed and, if significant, reported separately", "Reported as revenue", "Reported as a liability"], answer: 1, why: "It isn’t freely available to pay debts." },
    { q: "Cash equivalents convert to cash within:", options: ["One year", "90 days", "One week", "The operating cycle"], answer: 1, why: "Three months or less, like short-term treasury bills." },
    { q: "Money set aside to pay off a debt (a sinking fund) may be reported in:", options: ["Cash", "Long-term investments", "Revenue", "Accounts payable"], answer: 1, why: "It isn’t available for current needs." }
  ]
});

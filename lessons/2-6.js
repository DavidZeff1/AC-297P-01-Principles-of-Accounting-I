/* Lesson 2.6 · T-Accounts */
HUB.register("2-6", {
  summary: "The T-account is accountants’ scratch pad: a quick way to think through a handful of transactions. Compare it with the running-balance ledger and build a few yourself.",
  objectives: [
    "Describe what a T-account is and when it’s used",
    "Prepare a T-account that matches a ledger account",
    "Compute a T-account balance"
  ],
  html: `
<section class="sec" data-toc="The scratch pad">
  <div class="eyebrow kind">Concept</div>
  <h2>A T-account is a scratch pad, not a record</h2>
  <p>A <b>T-account</b> is shaped like the letter T. <b>Debits go on the left, credits on the right.</b> The balance is the amount by which one side exceeds the other.</p>
  <div class="grid2">
    <div class="tile"><span class="k">Use it for</span><ul><li>Working out how a few transactions affect a company</li><li>Illustrating and discussing transactions</li><li>Thinking through tricky entries</li></ul></div>
    <div class="tile warn"><span class="k">Don’t use it for</span><ul><li>Actually maintaining a business’s accounts. T-accounts become unwieldy fast.</li></ul></div>
  </div>
</section>

<section class="sec" data-toc="T-account vs. ledger">
  <div class="eyebrow kind try">Example</div>
  <h2>Xao’s Cash, two ways</h2>
  <p>Here is Xao’s Cash account as a T-account and as the running-balance ledger account. The debits total <b>$33,800</b>, the credits total <b>$7,500</b>, and the excess of debits over credits, <b>$26,300</b>, is the balance in both.</p>
  <div class="grid2">
    <div data-widget="taccounts" data-key="cash"></div>
    <div data-widget="ledger" data-key="cashLedger"></div>
  </div>
  <div class="big-eq" style="font-size:20px">$33,800 debits − $7,500 credits = <span class="a">$26,300 debit balance</span></div>
</section>

<section class="sec" data-toc="All of Xao’s accounts">
  <div class="eyebrow kind">Example</div>
  <h2>Xao’s whole month on a scratch pad</h2>
  <p>Every one of Xao’s January entries, in T-account form. Notice how quickly you can see each account’s activity and balance, and that the balances match the trial balance from lesson 2.4.</p>
  <div data-widget="taccounts" data-key="all"></div>
</section>

<section class="sec" data-toc="Build a balance">
  <div class="eyebrow kind try">Try it</div>
  <h2>Find the balance yourself</h2>
  <div class="panel"><div data-widget="worked" data-key="practice"></div></div>
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
    <li><span>A <b>T-account</b> has debits on the left and credits on the right.</span></li>
    <li><span>It’s a quick analysis and communication tool, not a way to keep a business’s books.</span></li>
    <li><span>The balance is the excess of debits over credits, or credits over debits, and it matches the ledger account.</span></li>
  </ol>
</section>`,

  data: {
    cash: { accounts: [HUB.cases.xao.tacct("Cash")] },
    cashLedger: HUB.cases.xao.ledger("Cash"),
    all: { accounts: HUB.cases.xao.chart.map(function (c) { return HUB.cases.xao.tacct(c[0]); }) },
    practice: {
      q: "<p>Accounts Payable starts the month with a $1,200 credit balance. During the month the company buys $3,000 of supplies on account and pays $2,500 to suppliers. Set up the T-account and find the ending balance.</p>",
      steps: [
        "Accounts Payable is a liability, so <b>credits increase it</b> and debits decrease it.",
        "Right (credit) side: beginning balance $1,200 and purchases on account $3,000. Total credits: <b>$4,200</b>.",
        "Left (debit) side: payments to suppliers <b>$2,500</b>.",
        "Credits exceed debits: $4,200 − $2,500 = <b>$1,700</b>."
      ],
      answer: "<p>Ending balance: <b>$1,700 credit</b>, a normal balance for a liability.</p>"
    }
  },

  cards: {
    terms: [
      { term: "T-account", back: "A T-shaped scratch-pad account with debits on the left and credits on the right." },
      { term: "T-account balance", back: "The amount by which debits exceed credits, or credits exceed debits." },
      { term: "Running-balance account", back: "The ledger format used to actually keep the books, showing the balance after each entry." }
    ]
  },

  quiz: [
    { q: "In a T-account, debits are recorded on the:", options: ["Right side", "Left side", "Top", "Either side"], answer: 1, why: "Debits left, credits right." },
    { q: "T-accounts are mainly used to:", options: ["Maintain a large company’s official records", "Quickly analyze and illustrate a small number of transactions", "Prepare tax returns", "Replace the journal"], answer: 1, why: "They’re a scratch pad; they become unwieldy for real record keeping." },
    { q: "Xao’s Cash T-account has debits of $33,800 and credits of $7,500. The balance is:", options: ["$41,300 debit", "$26,300 credit", "$26,300 debit", "$7,500 credit"], answer: 2, why: "Debits exceed credits by $26,300." },
    { q: "A liability T-account shows credits of $4,200 and debits of $2,500. The balance is:", options: ["$1,700 debit", "$1,700 credit", "$6,700 credit", "$2,500 debit"], answer: 1, why: "Credits exceed debits by $1,700, a normal credit balance." },
    { q: "A T-account balance should match:", options: ["The related running-balance ledger account", "Total assets", "Net income", "The chart of accounts number"], answer: 0, why: "They show the same activity in different formats." }
  ]
});

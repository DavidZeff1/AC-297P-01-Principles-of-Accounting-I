/* Lesson 2.3 · The General Ledger */
HUB.register("2-3", {
  summary: "The ledger gives every account its own page. Posting copies each journal entry onto those pages, so every balance is always up to date.",
  objectives: [
    "Describe the general ledger and its running-balance accounts",
    "Post journal entries to the ledger with cross-references",
    "List the steps from source document to ledger",
    "Distinguish the journal from the ledger"
  ],
  html: `
<section class="sec" data-toc="One page per account">
  <div class="eyebrow kind">Concept</div>
  <h2>The ledger has one page per account</h2>
  <p>The journal is a notebook of transactions, page after page in date order. The <b>general ledger</b> is a second notebook with <b>one page for every account</b> the company uses. Xao used nine accounts in January, so its ledger has nine pages:</p>
  <div class="grid3">
    <div class="tile"><span class="k">Assets</span><ul><li>Cash</li><li>Accounts Receivable</li><li>Land</li></ul></div>
    <div class="tile warn"><span class="k">Liabilities and equity</span><ul><li>Accounts Payable</li><li>Notes Payable</li><li>Capital Stock</li></ul></div>
    <div class="tile alt"><span class="k">Revenue and expenses</span><ul><li>Service Revenue</li><li>Advertising Expense</li><li>Utilities Expense</li></ul></div>
  </div>
</section>

<section class="sec" data-toc="Posting">
  <div class="eyebrow kind try">Try it</div>
  <h2>Posting moves each entry onto the ledger pages</h2>
  <p>To <b>post</b> is to copy each journal entry’s debits and credits into the matching columns of the right ledger accounts. Press <b>Post next entry</b> and watch each amount land in its account. The ✓ in the journal marks an entry as posted, and each ledger row cites the journal page it came from.</p>
  <div class="panel" id="poster">
    <div class="poster-grid">
      <div><h3 class="poster-h">General journal</h3><div class="scroll-x"><table class="journal" id="post-journal"></table></div></div>
      <div><h3 class="poster-h">General ledger</h3><div id="post-ledger" class="post-ledger"></div></div>
    </div>
    <p class="verdict" id="post-say" aria-live="polite">Nothing posted yet.</p>
    <div class="w-ctl"><button type="button" class="btn small" id="post-next" data-voice-repeat>Post next entry</button><button type="button" class="btn ghost small" id="post-all">Post everything</button><button type="button" class="btn ghost small" id="post-reset">Start over</button></div>
  </div>
</section>

<section class="sec" data-toc="The audit trail">
  <div class="eyebrow kind">Concept</div>
  <h2>Cross-references create an audit trail</h2>
  <div class="grid2">
    <div class="tile"><span class="k">In the ledger</span><p>The description column cites the <b>journal page</b> the amount came from. That keeps the ledger short and lets anyone trace any amount back to the original entry.</p></div>
    <div class="tile alt"><span class="k">In the journal</span><p>A <b>check mark</b> shows the entry has been posted. In a manual system, without these marks it would be easy to skip an entry or post it twice.</p></div>
  </div>
  <p>Here are two of Xao’s finished ledger pages. Cash ends January at $26,300, the same answer you got by hunting through the journal, but now it’s right there.</p>
  <div class="grid2">
    <div data-widget="ledger" data-key="cash"></div>
    <div data-widget="ledger" data-key="ar"></div>
  </div>
</section>

<section class="sec" data-toc="The steps so far">
  <div class="eyebrow kind">Concept</div>
  <h2>The accounting steps so far</h2>
  <div data-widget="steps" data-key="steps"></div>
  <div class="panel">
    <div class="panel-title"><h3>Journal or ledger?</h3><span class="hint">Which one does each describe?</span></div>
    <div data-widget="sorter" data-key="jl"></div>
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
    <li><span>The <b>general ledger</b> is the collection of all accounts, one page each, with a running balance.</span></li>
    <li><span><b>Posting</b> copies journal debits and credits into the ledger accounts.</span></li>
    <li><span>Journal page references in the ledger and check marks in the journal create an <b>audit trail</b> and prevent missed or double postings.</span></li>
    <li><span>Steps so far: <b>analyze</b> each transaction, <b>journalize</b> it, then periodically <b>post</b> to the ledger.</span></li>
  </ol>
</section>`,

  data: {
    cash: HUB.cases.xao.ledger("Cash"),
    ar: HUB.cases.xao.ledger("Accounts Receivable"),
    steps: { items: [
      { t: "Analyze", b: "<p>Analyze each transaction, usually from a source document such as an invoice, to determine the accounts involved.</p>" },
      { t: "Journalize", b: "<p>Enter a journal entry in the general journal for each transaction.</p>" },
      { t: "Post", b: "<p>Periodically post the journal entries to the right general ledger accounts.</p>" }
    ]}
  },

  sorters: {
    jl: {
      categories: [{ id: "j", label: "Journal" }, { id: "l", label: "Ledger" }],
      items: [
        { text: "Lists transactions in date order", cat: "j", why: "The journal is chronological." },
        { text: "Shows the current balance of Cash", cat: "l", why: "Each ledger account keeps a running balance." },
        { text: "The book of original entry", cat: "j", why: "Transactions are first recorded in the journal." },
        { text: "Has a separate page for each account", cat: "l", why: "That’s the defining feature of the ledger." },
        { text: "Gets a check mark when an entry has been posted", cat: "j", why: "Check marks in the journal show what’s been posted." },
        { text: "Cites the journal page each amount came from", cat: "l", why: "Ledger descriptions cross-reference the journal." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "General ledger", back: "A collection of accounts, one page for each account in use, with running balances." },
      { term: "Posting", back: "Copying the debits and credits from journal entries into the ledger accounts." },
      { term: "Running balance", back: "A ledger account format that shows the updated balance after every entry." },
      { term: "Cross-reference", back: "The journal page noted in a ledger account (and the posting mark in the journal) linking the two records." },
      { term: "Audit trail", back: "The path that lets anyone trace an amount from the statements back to the original transaction." }
    ]
  },

  quiz: [
    { q: "The general ledger is best described as:", options: ["A chronological list of transactions", "A collection of all accounts, one page per account", "A list of source documents", "The income statement"], answer: 1, why: "The ledger gives each account its own page." },
    { q: "To post means to:", options: ["Analyze a source document", "Copy journal entries into the ledger accounts", "Prepare the balance sheet", "Write a check"], answer: 1, why: "Posting transfers journal debits and credits to the ledger." },
    { q: "In a manual system, a check mark next to a journal entry indicates that:", options: ["The entry is correct", "The entry has been posted to the ledger", "The entry was approved", "Cash was received"], answer: 1, why: "It prevents skipping an entry or posting it twice." },
    { q: "Why does each ledger row cite a journal page?", options: ["To provide an audit trail back to the original entry", "Because GAAP requires page numbers on statements", "To compute the balance", "To show the date"], answer: 0, why: "The cross-reference lets you trace any amount to its source." },
    { q: "Which is the correct order of steps?", options: ["Post, journalize, analyze", "Journalize, analyze, post", "Analyze, journalize, post", "Analyze, post, journalize"], answer: 2, why: "Analyze the transaction, journalize it, then post it." },
    { q: "Xao’s January transactions used how many accounts, and therefore how many ledger pages?", options: ["Four", "Six", "Nine", "Twelve"], answer: 2, why: "Cash, Accounts Receivable, Land, Accounts Payable, Notes Payable, Capital Stock, Service Revenue, Advertising Expense, and Utilities Expense." },
    { q: "Where would you look to quickly find the balance in Accounts Receivable?", options: ["The general journal", "The ledger account for Accounts Receivable", "A source document", "The special journal"], answer: 1, why: "The ledger account carries a running balance." }
  ],

  init: function (root) {
    var X = HUB.cases.xao, W = HUB.widgets, n = 0;
    var jt = root.querySelector("#post-journal"), lg = root.querySelector("#post-ledger"), sayEl = root.querySelector("#post-say");
    var names = X.chart.map(function (c) { return c[0]; });
    function paint(speak) {
      var h = '<thead><tr><th>Date</th><th>Accounts</th><th class="num">Debit</th><th class="num">Credit</th><th>Post</th></tr></thead>';
      X.entries.forEach(function (e, i) {
        h += '<tbody class="' + (i === n - 1 ? "just" : "") + '">';
        e.lines.forEach(function (ln, k) {
          h += '<tr><td class="jr-date">' + (k ? "" : e.date) + '</td><td class="jr-acct' + (ln[2] ? " cr" : "") + '">' + ln[0] + '</td><td class="num">' + (ln[1] ? ln[1].toLocaleString() : "") + '</td><td class="num">' + (ln[2] ? ln[2].toLocaleString() : "") + '</td><td class="post-mark">' + (i < n ? "✓" : "") + '</td></tr>';
        });
        h += '</tbody>';
      });
      jt.innerHTML = h;
      var touched = n ? X.entries[n - 1].lines.map(function (l) { return l[0]; }) : [];
      lg.innerHTML = "";
      names.forEach(function (name) {
        var d = X.ledger(name), done = [];
        var k = 0;
        X.entries.forEach(function (e, i) { e.lines.forEach(function (ln) { if (ln[0] === name) { if (i < n) done.push(d.rows[k]); k++; } }); });
        var box = document.createElement("div");
        box.className = "post-acct" + (touched.indexOf(name) >= 0 ? " hit" : "");
        lg.appendChild(box);
        W.ledger(box, { account: name, no: d.no, normal: d.normal, rows: done.length ? done : [] });
        if (!done.length) box.querySelector("tbody").innerHTML = '<tr><td colspan="5" class="hint">No postings yet</td></tr>';
      });
      root.querySelector("#post-next").disabled = n >= X.entries.length;
      if (!speak) return;
      var e = X.entries[n - 1];
      sayEl.textContent = n ? "Posted " + e.date + ": " + e.lines.map(function (l) { return (l[1] ? "debit of $" + l[1].toLocaleString() : "credit of $" + l[2].toLocaleString()) + " to " + l[0]; }).join(", ") + ". Journal page " + e.page + " is cited in each account." : "Nothing posted yet.";
    }
    root.querySelector("#post-next").addEventListener("click", function () { if (n < X.entries.length) { n++; paint(true); } });
    root.querySelector("#post-all").addEventListener("click", function () { n = X.entries.length; paint(false); sayEl.textContent = "All eight entries posted. Cash ends January at $26,300."; });
    root.querySelector("#post-reset").addEventListener("click", function () { n = 0; paint(false); sayEl.textContent = "Nothing posted yet."; });
    paint(false);
  }
});

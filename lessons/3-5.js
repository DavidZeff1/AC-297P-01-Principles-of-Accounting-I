/* Lesson 3.5 · The Adjusting Process and Related Entries */
HUB.register("3-5", {
  summary: "Before statements are prepared, the accounts must catch up with time. Learn the adjusting entries for prepaid expenses, supplies, depreciation, unearned revenue, and accruals.",
  objectives: [
    "Explain why adjusting entries are needed and when they’re made",
    "Record adjustments for prepaid expenses, supplies, and depreciation",
    "Record adjustments for unearned revenue",
    "Record accrued salaries, interest, rent, and revenue"
  ],
  html: `
<section class="sec" data-toc="Why adjust?">
  <div class="eyebrow kind">Concept</div>
  <h2>Time changes balances without a transaction</h2>
  <p>The tentative statements in Chapter 2 came straight from the trial balance, with a warning: adjustments may be needed. Ongoing business activity changes account balances without any journal entry capturing it. Adjusting at period end is like briefly shutting off the flow through a pipeline to measure what’s in it.</p>
  <div class="grid2">
    <div class="tile"><span class="k">Multi-period items</span><p>Revenues and expenses that relate to <b>more than one period</b>.</p><ul><li>Prepaid expenses</li><li>Depreciation</li><li>Unearned revenues</li></ul></div>
    <div class="tile alt"><span class="k">Accrued items</span><p>Revenues and expenses <b>earned or incurred</b> this period but <b>not yet recorded</b>.</p><ul><li>Accrued expenses (salaries, interest, rent)</li><li>Accrued revenues</li></ul></div>
  </div>
  <p>No list could cover every possible adjustment. What you need is an understanding of the business plus the measurement principles. Learn these examples conceptually and you’ll be able to extend them to almost any situation.</p>
</section>

<section class="sec" data-toc="Prepaid expenses">
  <div class="eyebrow kind">Multi-period</div>
  <h2>Prepaid expenses: an asset that gets used up</h2>
  <p>Businesses often pay in advance: insurance for a year, rent at the start of each month, supplies bought before they’re needed. At purchase, the payment buys a future benefit, so it’s an <b>asset</b>. As time passes, the asset shrinks, and an adjustment moves the used-up portion to <b>expense</b>.</p>
  <div class="panel">
    <div class="panel-title"><h3>$300 paid June 1 for three months of lawn mowing</h3></div>
    <div data-widget="journal" data-key="mow"></div>
    <div data-widget="taccounts" data-key="mowT"></div>
    <p class="hint">Each month $100 leaves the balance sheet and becomes expense: the asset falls, expense rises, and income and equity fall.</p>
  </div>
  <h3>Prepaid insurance</h3>
  <p>A three-year policy is bought January 1, 20X1 for $9,000. By December 31, one-third has expired.</p>
  <div data-widget="journal" data-key="ins"></div>
  <p>The 20X1 income statement shows insurance expense of <b>$3,000</b>; the year-end balance sheet shows prepaid insurance of <b>$6,000</b>. The rest is expensed by similar adjustments at the end of 20X2 and 20X3.</p>
  <h3>Prepaid rent</h3>
  <p>A two-month lease is paid in advance on March 1 for $3,000, and statements are prepared March 31. Half the period has passed.</p>
  <div data-widget="journal" data-key="rent"></div>
  <div class="callout def">
    <div class="label">How often do you adjust?</div>
    <p>The insurance was adjusted in December but the rent in March. The difference: statements were only prepared at year end in the first case, but at the end of March in the second. <b>Adjust every time statements are prepared</b>, so each period gets the right amount of expense and the rest stays on the balance sheet.</p>
  </div>
</section>

<section class="sec" data-toc="Supplies">
  <div class="eyebrow kind try">Try it</div>
  <h2>Supplies: back into the amount used</h2>
  <p>Buying supplies is recorded as debit Supplies, credit Cash. At period end you count what’s left and “back into” the amount used: whatever was available but isn’t on the shelf must have been used.</p>
  <div data-widget="journal" data-key="supplies"></div>
  <div class="panel">
    <div class="panel-title"><h3>Supplies used calculator</h3><span class="hint">20X2: began with $200, bought $1,000, counted $300</span></div>
    <div data-widget="calc" data-key="supCalc"></div>
  </div>
</section>

<section class="sec" data-toc="Depreciation">
  <div class="eyebrow kind try">Try it</div>
  <h2>Depreciation and the contra asset</h2>
  <p>Buildings and equipment benefit many periods, so part of their cost is allocated to each period: <b>depreciation</b>. The simplest method, <b>straight-line</b>, assigns an equal amount to each year. A $150,000 truck with a 3-year life, bought January 1 of Year 1, depreciates $50,000 a year.</p>
  <div data-widget="journal" data-key="dep"></div>
  <p>Notice the credit goes to <b>Accumulated Depreciation</b>, not to the Truck account. Accumulated depreciation is a <b>contra asset</b>: an account subtracted from a related account. Because it offsets a debit-balance asset, its rules are reversed: it increases with credits.</p>
  <div class="panel"><div data-widget="calc" data-key="rig"></div></div>
  <p>Cost minus accumulated depreciation is the asset’s <b>book value</b> (net book value). At the end of its life the truck is fully depreciated, with a book value of zero, and is usually removed from the accounts when retired.</p>
</section>

<section class="sec" data-toc="Unearned revenues">
  <div class="eyebrow kind">Multi-period</div>
  <h2>Unearned revenue: cash first, revenue later</h2>
  <p>Businesses often collect before delivering, like a magazine publisher selling a multi-year subscription. The receipt is recorded as debit Cash, credit <b>Unearned Revenue</b>, a <b>liability</b> because the company owes future delivery. Revenue can’t be recognized until the earnings process is complete.</p>
  <div data-widget="journal" data-key="unearned"></div>
  <p>At period end, the balance sheet shows the unearned revenue still owed, and the income statement shows only revenue for what was actually delivered.</p>
</section>

<section class="sec" data-toc="Accrued salaries">
  <div class="eyebrow kind">Accrual</div>
  <h2>Accrued salaries</h2>
  <p><b>Accruals</b> are revenues and expenses that build up gradually during a period. Payroll is the classic case: few businesses pay daily. Employees here earn <b>$1,000 per day</b>. The last payday was Friday, December 26; they then worked December 29, 30, and 31, but won’t be paid until January 9.</p>
  <div class="panel"><div class="cal" id="cal" aria-label="December 20X8 and January 20X9 calendar"></div></div>
  <div data-widget="journal" data-key="sal"></div>
  <p>On January 9 the $10,000 payroll is partly last year’s liability ($3,000) and partly this year’s expense ($7,000 for seven workdays in January).</p>
</section>

<section class="sec" data-toc="Interest, rent, revenue">
  <div class="eyebrow kind">Accrual</div>
  <h2>Accrued interest, rent, and revenue</h2>
  <h3>Interest = Principal × Rate × Time</h3>
  <p>$100,000 borrowed at 6% per year for 18 months costs $100,000 × 6% × 1.5 = <b>$9,000</b> of interest. Even if it’s all paid at the end, it’s accrued as time passes so each period carries its share. The loan runs July 1, 20X1 to December 31, 20X2, with a December year end.</p>
  <div data-widget="journal" data-key="int"></div>
  <h3>Accrued rent</h3>
  <p>Accrued rent is the opposite of prepaid rent: the space has been used but not yet paid for. Cabul Company pays $400 rent within 10 days <i>after</i> each month ends.</p>
  <div data-widget="journal" data-key="cabul"></div>
  <h3>Accrued revenue</h3>
  <p>An accounting firm tracks hours on client projects and bills them the following month. Revenue earned in December must be recorded in December, even though the bill goes out in January.</p>
  <div data-widget="journal" data-key="accrev"></div>
</section>

<section class="sec" data-toc="Sort the adjustments">
  <div class="eyebrow kind check">Practice</div>
  <h2>Name that adjustment</h2>
  <div class="panel"><div data-widget="sorter" data-key="kind"></div></div>
</section>

<section class="sec" data-toc="Adjusted trial balance">
  <div class="eyebrow kind">Concept</div>
  <h2>The adjusted trial balance, and an alternate procedure</h2>
  <p>After adjusting entries are posted, a second trial balance, the <b>adjusted trial balance</b>, proves debits still equal credits. Correct financial statements can be prepared directly from it (more in Chapter 4).</p>
  <p>Prepaids and unearned revenues can also be handled with an <b>income statement approach</b>: record the whole payment as expense (or the whole receipt as revenue) at first, then adjust out the portion that belongs to future periods. Both approaches give identical year-end balances.</p>
  <div class="grid2">
    <div><h3 class="poster-h">Balance sheet approach</h3><div data-widget="journal" data-key="bsApp"></div></div>
    <div><h3 class="poster-h">Income statement approach</h3><div data-widget="journal" data-key="isApp"></div></div>
  </div>
  <p>The income statement approach has one advantage: if the item is fully used up (or fully earned) by period end, no adjusting entry is needed at all.</p>
  <div class="callout analogy"><div class="label">The big lesson</div><p>Perhaps the single most important element of accounting judgment is measuring revenues and expenses correctly. Business doesn’t start and stop at month end, but accounting must divide that flow into periods.</p></div>
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
    <li><span>Adjust at the end of every period for which statements are prepared.</span></li>
    <li><span><b>Prepaid expense:</b> debit Expense, credit Prepaid (asset) for the part used up. <b>Supplies used</b> = beginning + purchases − ending count.</span></li>
    <li><span><b>Depreciation:</b> debit Depreciation Expense, credit Accumulated Depreciation (contra asset). Book value = cost − accumulated depreciation.</span></li>
    <li><span><b>Unearned revenue:</b> debit Unearned Revenue (liability), credit Revenue for the part delivered.</span></li>
    <li><span><b>Accrued expense:</b> debit Expense, credit Payable. <b>Accrued revenue:</b> debit Receivable, credit Revenue. Interest = principal × rate × time.</span></li>
  </ol>
</section>`,

  data: {
    mow: { entries: [
      { date: "Jun. 1", lines: [["Prepaid Mowing", 300, 0], ["Cash", 0, 300]], memo: "Paid in advance for three months of mowing" },
      { date: "Jun. 30", lines: [["Mowing Expense", 100, 0], ["Prepaid Mowing", 0, 100]], memo: "Adjusting entry: June mowing used" },
      { date: "Jul. 31", lines: [["Mowing Expense", 100, 0], ["Prepaid Mowing", 0, 100]], memo: "Adjusting entry: July mowing used" },
      { date: "Aug. 31", lines: [["Mowing Expense", 100, 0], ["Prepaid Mowing", 0, 100]], memo: "Adjusting entry: August mowing used" }
    ], step: true },
    mowT: { accounts: [{ name: "Prepaid Mowing", dr: [["Jun. 1", 300]], cr: [["Jun. 30", 100], ["Jul. 31", 100], ["Aug. 31", 100]] }] },
    ins: { entries: [
      { date: "Jan. 1, 20X1", lines: [["Prepaid Insurance", 9000, 0], ["Cash", 0, 9000]], memo: "Paid for a three-year policy" },
      { date: "Dec. 31, 20X1", lines: [["Insurance Expense", 3000, 0], ["Prepaid Insurance", 0, 3000]], memo: "Adjusting entry: one year expired ($9,000 × 1/3)" }
    ]},
    rent: { entries: [
      { date: "Mar. 1", lines: [["Prepaid Rent", 3000, 0], ["Cash", 0, 3000]], memo: "Paid two months’ rent in advance" },
      { date: "Mar. 31", lines: [["Rent Expense", 1500, 0], ["Prepaid Rent", 0, 1500]], memo: "Adjusting entry: one month used" }
    ]},
    supplies: { entries: [
      { date: "Dec. 8, 20X1", lines: [["Supplies", 900, 0], ["Cash", 0, 900]], memo: "Purchased supplies" },
      { date: "Dec. 31, 20X1", lines: [["Supplies Expense", 700, 0], ["Supplies", 0, 700]], memo: "Adjusting entry: $900 available − $200 counted = $700 used" },
      { date: "During 20X2", lines: [["Supplies", 1000, 0], ["Cash", 0, 1000]], memo: "Purchased more supplies" },
      { date: "Dec. 31, 20X2", lines: [["Supplies Expense", 900, 0], ["Supplies", 0, 900]], memo: "Adjusting entry: $200 + $1,000 − $300 counted = $900 used" }
    ]},
    supCalc: {
      inputs: [
        { id: "b", label: "Beginning supplies", min: 0, max: 1000, step: 100, value: 200, fmt: "$" },
        { id: "p", label: "Purchases", min: 0, max: 2000, step: 250, value: 1000, fmt: "$" },
        { id: "e", label: "Ending count", min: 0, max: 1000, step: 100, value: 300, fmt: "$" }
      ],
      run: function (v, money) {
        var avail = v.b + v.p, used = avail - v.e;
        if (used < 0) return { html: '<p class="hint">You can’t count more supplies than were available.</p>', say: "The ending count can’t exceed the " + money(avail) + " available." };
        return { html: '<div class="statement"><div class="st-row"><span class="st-l">Beginning balance</span><span class="st-b">' + money(v.b) + '</span></div><div class="st-row"><span class="st-l">Plus purchases</span><span class="st-b"><span class="u">' + money(v.p) + '</span></span></div><div class="st-row"><span class="st-l">Available for use</span><span class="st-b">' + money(avail) + '</span></div><div class="st-row"><span class="st-l">Less ending count</span><span class="st-b"><span class="u">' + money(-v.e) + '</span></span></div><div class="st-row bold"><span class="st-l">Supplies used (expense)</span><span class="st-b"><span class="uu">' + money(used) + '</span></span></div></div>',
          say: "Adjusting entry: debit Supplies Expense and credit Supplies for <b>" + money(used) + "</b>." };
      }
    },
    dep: { entries: [{ date: "Dec. 31, Yr. 1", lines: [["Depreciation Expense", 50000, 0], ["Accumulated Depreciation", 0, 50000]], memo: "Annual depreciation: $150,000 ÷ 3 years" }] },
    rig: {
      inputs: [{ id: "y", label: "Year-end", min: 1, max: 3, step: 1, value: 1, fmt: "n" }],
      run: function (v, money) {
        var acc = 50000 * v.y, bv = 150000 - acc;
        return { html: '<div class="grid2"><div class="statement"><div class="st-head"><b>Income statement</b><span>Year ' + v.y + '</span></div><div class="st-row"><span class="st-l">Depreciation expense</span><span class="st-b">' + money(50000) + '</span></div></div>' +
          '<div class="statement"><div class="st-head"><b>Balance sheet</b><span>December 31, Year ' + v.y + '</span></div><div class="st-row"><span class="st-l">Truck</span><span class="st-b">' + money(150000) + '</span></div><div class="st-row"><span class="st-l">Less: Accumulated depreciation</span><span class="st-b"><span class="u">' + money(-acc) + '</span></span></div><div class="st-row bold"><span class="st-l">Book value</span><span class="st-b"><span class="uu">' + money(bv) + '</span></span></div></div></div>',
          say: "At the end of year " + v.y + ", accumulated depreciation is " + money(acc) + " and the truck’s book value is <b>" + money(bv) + "</b>." };
      }
    },
    unearned: { entries: [
      { date: "Jan. 1, 20X1", lines: [["Cash", 3600, 0], ["Unearned Revenue", 0, 3600]], memo: "Collected for three-year magazine subscriptions" },
      { date: "Dec. 31, 20X1", lines: [["Unearned Revenue", 1200, 0], ["Subscription Revenue", 0, 1200]], memo: "Adjusting entry: one year of magazines delivered" }
    ]},
    sal: { entries: [
      { date: "Dec. 31, 20X8", lines: [["Salaries Expense", 3000, 0], ["Salaries Payable", 0, 3000]], memo: "Adjusting entry: three days earned, not yet paid" },
      { date: "Jan. 9, 20X9", lines: [["Salaries Expense", 7000, 0], ["Salaries Payable", 3000, 0], ["Cash", 0, 10000]], memo: "Payday: $7,000 of 20X9 expense plus the $3,000 owed from 20X8" }
    ]},
    int: { entries: [
      { date: "Jul. 1, 20X1", lines: [["Cash", 100000, 0], ["Note Payable", 0, 100000]], memo: "Borrowed at 6% for 18 months" },
      { date: "Dec. 31, 20X1", lines: [["Interest Expense", 3000, 0], ["Interest Payable", 0, 3000]], memo: "Adjusting entry: $100,000 × 6% × 6/12" },
      { date: "Dec. 31, 20X2", lines: [["Interest Expense", 6000, 0], ["Interest Payable", 3000, 0], ["Note Payable", 100000, 0], ["Cash", 0, 109000]], memo: "Repaid the note with 18 months of interest; 20X2 carries 12 months ($6,000)" }
    ]},
    cabul: { entries: [
      { date: "Dec. 31, 20X1", lines: [["Rent Expense", 400, 0], ["Rent Payable", 0, 400]], memo: "Adjusting entry: December rent owed" },
      { date: "Jan. 10, 20X2", lines: [["Rent Payable", 400, 0], ["Cash", 0, 400]], memo: "Paid December rent" }
    ]},
    accrev: { entries: [{ date: "Dec. 31", lines: [["Accounts Receivable", 8000, 0], ["Service Revenue", 0, 8000]], memo: "Adjusting entry: December client hours earned, to be billed in January" }] },
    bsApp: { entries: [
      { date: "Jan. 1", lines: [["Prepaid Insurance", 9000, 0], ["Cash", 0, 9000]] },
      { date: "Dec. 31", lines: [["Insurance Expense", 3000, 0], ["Prepaid Insurance", 0, 3000]], memo: "Ends with expense $3,000, prepaid $6,000" }
    ]},
    isApp: { entries: [
      { date: "Jan. 1", lines: [["Insurance Expense", 9000, 0], ["Cash", 0, 9000]] },
      { date: "Dec. 31", lines: [["Prepaid Insurance", 6000, 0], ["Insurance Expense", 0, 6000]], memo: "Ends with expense $3,000, prepaid $6,000" }
    ]}
  },

  sorters: {
    kind: {
      categories: [{ id: "pre", label: "Prepaid expense" }, { id: "une", label: "Unearned revenue" }, { id: "ae", label: "Accrued expense" }, { id: "ar", label: "Accrued revenue" }],
      items: [
        { text: "Part of a one-year insurance policy paid in advance has expired", cat: "pre", why: "Paid first, used up over time: debit Insurance Expense, credit Prepaid Insurance." },
        { text: "Employees worked the last two days of the year; payday is next week", cat: "ae", why: "Incurred but unpaid: debit Salaries Expense, credit Salaries Payable." },
        { text: "Customers paid in advance; some of the service has now been performed", cat: "une", why: "Cash came first; reduce the liability as you earn it." },
        { text: "Consultants worked billable hours in December that will be billed in January", cat: "ar", why: "Earned but not yet billed: debit Accounts Receivable, credit Revenue." },
        { text: "Interest has built up on a loan but isn’t due until next year", cat: "ae", why: "Interest expense accrues with time: debit Interest Expense, credit Interest Payable." },
        { text: "Rent paid on the first of the month for the next two months", cat: "pre", why: "Prepaid rent is an asset used up as time passes." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Adjusting entry", back: "An end-of-period entry that updates accounts for changes time has caused but no transaction recorded." },
      { term: "Multi-period item", back: "A revenue or expense item that relates to more than one accounting period." },
      { term: "Accrued item", back: "A revenue or expense earned or incurred in the period but not yet recorded." },
      { term: "Prepaid expense", back: "An asset created by paying in advance for goods or services, expensed as used." },
      { term: "Contra account", back: "An account subtracted from a related account, with opposite debit/credit rules." },
      { term: "Accumulated depreciation", back: "Contra-asset account holding all depreciation recorded to date; increased with credits." },
      { term: "Book value", sub: "net book value", back: "Asset cost minus accumulated depreciation." },
      { term: "Straight-line method", back: "Depreciation that assigns an equal amount of cost to each year of service life." },
      { term: "Unearned revenue", back: "A liability for cash collected before goods or services are delivered." },
      { term: "Interest formula", back: "Principal × Rate × Time." },
      { term: "Adjusted trial balance", back: "A trial balance prepared after adjusting entries; correct statements can be prepared from it." },
      { term: "Income statement approach", back: "Recording prepayments as expense (or receipts as revenue) at first, then adjusting out the future portion." }
    ]
  },

  quiz: [
    { q: "A three-year insurance policy costing $9,000 was bought January 1. The December 31 adjusting entry is:", options: ["Debit Prepaid Insurance $3,000, credit Insurance Expense $3,000", "Debit Insurance Expense $3,000, credit Prepaid Insurance $3,000", "Debit Insurance Expense $9,000, credit Cash $9,000", "No entry is needed"], answer: 1, why: "One year has expired: move $3,000 from the asset to expense." },
    { q: "Supplies began at $200, $1,000 were purchased, and $300 are on hand at year end. Supplies expense is:", options: ["$1,000", "$1,200", "$900", "$300"], answer: 2, why: "$200 + $1,000 − $300 = $900 used." },
    { q: "Accumulated Depreciation is a:", options: ["Liability", "Expense", "Contra asset", "Revenue"], answer: 2, why: "It’s subtracted from the related asset on the balance sheet." },
    { q: "A $150,000 truck with a 3-year life has been used for 2 years (straight-line). Its book value is:", options: ["$150,000", "$100,000", "$50,000", "$0"], answer: 2, why: "$150,000 − $100,000 accumulated depreciation = $50,000." },
    { q: "Cash collected in advance for future services is initially recorded as a credit to:", options: ["Service Revenue", "Unearned Revenue", "Accounts Receivable", "Prepaid Expense"], answer: 1, why: "It’s a liability until the services are delivered." },
    { q: "Employees earn $1,000 per day and have worked 3 unpaid days at year end. The adjusting entry is:", options: ["Debit Salaries Payable, credit Cash $3,000", "Debit Salaries Expense, credit Salaries Payable $3,000", "Debit Cash, credit Salaries Expense $3,000", "No entry until payday"], answer: 1, why: "The expense was incurred in this period, and the amount is owed." },
    { q: "Interest on $100,000 at 6% for 18 months totals:", options: ["$6,000", "$9,000", "$18,000", "$3,000"], answer: 1, why: "$100,000 × 6% × 1.5 = $9,000." },
    { q: "Work done in December for a client that will be billed in January requires a December entry to:", options: ["Debit Accounts Receivable, credit Service Revenue", "Debit Service Revenue, credit Accounts Receivable", "Debit Cash, credit Unearned Revenue", "No entry until billed"], answer: 0, why: "Revenue is recognized when earned, even before billing." },
    { q: "Adjusting entries should be made:", options: ["Only at the end of the fiscal year", "Every time financial statements are prepared", "Only when cash changes hands", "Only for multi-year items"], answer: 1, why: "Each set of statements needs correctly assigned revenues and expenses." },
    { q: "Under the income statement approach, a $9,000 insurance payment on January 1 is first debited to:", options: ["Prepaid Insurance", "Insurance Expense", "Cash", "Insurance Payable"], answer: 1, why: "The adjusting entry later moves the unexpired portion to Prepaid Insurance." }
  ],

  init: function (root) {
    var el = root.querySelector("#cal");
    function month(name, first, days, mark) {
      var h = '<div class="cal-m"><b>' + name + '</b><div class="cal-g">' + ["S", "M", "T", "W", "T", "F", "S"].map(function (d) { return '<span class="cal-h">' + d + '</span>'; }).join("");
      for (var i = 0; i < first; i++) h += '<span></span>';
      for (var d = 1; d <= days; d++) h += '<span class="' + (mark[d] || "") + '">' + d + '</span>';
      return h + '</div></div>';
    }
    el.innerHTML = month("December 20X8", 1, 31, { 26: "pay", 29: "owed", 30: "owed", 31: "owed" }) + month("January 20X9", 4, 31, { 1: "work", 2: "work", 5: "work", 6: "work", 7: "work", 8: "work", 9: "pay work" }) +
      '<div class="cal-key"><span class="pay">Payday</span><span class="owed">Worked, owed at year end ($3,000)</span><span class="work">January workdays in the Jan. 9 pay ($7,000)</span></div>';
  }
});

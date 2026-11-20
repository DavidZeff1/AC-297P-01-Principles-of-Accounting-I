/* Lesson 3.4 · Basic Elements of Expense Recognition */
HUB.register("3-4", {
  summary: "Expenses are recognized in one of three ways: matched to the revenue they create, spread systematically over the periods they benefit, or recognized immediately. Payment timing doesn’t decide it.",
  objectives: [
    "Describe the three approaches to expense recognition",
    "Explain the matching principle",
    "Explain why payment isn’t the trigger for recognizing revenue or expense"
  ],
  html: `
<section class="sec" data-toc="Three approaches">
  <div class="eyebrow kind">Concept</div>
  <h2>Three ways to decide when a cost becomes an expense</h2>
  <div data-widget="steps" data-key="three"></div>
  <div class="panel">
    <div class="panel-title"><h3>Which approach fits?</h3><span class="hint">Sort each cost</span></div>
    <div data-widget="sorter" data-key="which"></div>
  </div>
</section>

<section class="sec" data-toc="Spreading a cost">
  <div class="eyebrow kind try">Try it</div>
  <h2>Systematic and rational allocation in action</h2>
  <p>A truck lasts many years, and no single sale “caused” it. So its cost is spread over the years it’s used, a process called <b>depreciation</b> (Chapter 10 covers it in depth). Change the truck’s cost and life to see the yearly expense.</p>
  <div class="panel"><div data-widget="calc" data-key="truck"></div></div>
</section>

<section class="sec" data-toc="Payment isn’t the trigger">
  <div class="eyebrow kind">Concept</div>
  <h2>Payment is not the trigger</h2>
  <p>Receiving or paying cash is <b>not</b> what triggers recognition. Revenue is recognized at the point of sale, whether the customer pays cash or owes a receivable. Expenses follow one of the three approaches, no matter when they’re paid.</p>
  <p>Much business is done on credit. If income simply tracked cash in and cash out, it could badly misrepresent how a business actually performed.</p>
  <div class="panel">
    <div class="panel-title"><h3>Is it a January expense?</h3><span class="hint">Accrual basis, January income statement</span></div>
    <div data-widget="sorter" data-key="jan"></div>
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
    <li><span><b>Cause and effect</b> (the matching principle): expense costs in the same period as the revenue they produce, like commissions and cost of goods sold.</span></li>
    <li><span><b>Systematic and rational allocation</b>: spread costs that benefit many periods, like depreciation of a truck.</span></li>
    <li><span><b>Immediate recognition</b>: costs with no link to revenue and no future benefit, like severance pay.</span></li>
    <li><span>Cash receipts and payments don’t determine when revenue or expense is recognized.</span></li>
  </ol>
</section>`,

  data: {
    three: { numbered: false, items: [
      { t: "Cause and effect", b: "<p>Many costs are linked to the revenue they help produce. A sales commission is based on a sale, so commission expense belongs in the same period as the sale. The cost of inventory delivered to a customer is expensed when the sale is recognized.</p><p>This is also called the <b>matching principle</b>.</p>" },
      { t: "Systematic and rational allocation", b: "<p>When there’s no clear link to specific revenue, but the cost benefits many periods, spread it over those periods. A truck may last many years, so a portion of its cost is assigned to each year of use through <b>depreciation</b>.</p>" },
      { t: "Immediate recognition", b: "<p>Some costs can’t be linked to any revenue and don’t benefit future periods. Expense them right away. Example: severance pay to a terminated employee, expensed when the employee is let go.</p>" }
    ]},
    truck: {
      inputs: [
        { id: "c", label: "Truck cost", min: 20000, max: 100000, step: 10000, value: 60000, fmt: "$" },
        { id: "y", label: "Years of use", min: 2, max: 10, step: 1, value: 5, fmt: "yr" }
      ],
      run: function (v, money) {
        var per = Math.round(v.c / v.y), bars = "";
        for (var i = 1; i <= v.y; i++) bars += '<div class="mini-bar"><span style="height:' + Math.round(100 / v.y * 3) + 'px"></span><small>Yr ' + i + '</small></div>';
        return { html: '<div class="mini-bars">' + bars + '</div><div class="big-eq" style="font-size:20px">' + money(v.c) + ' ÷ ' + v.y + ' = <span class="l">' + money(per) + ' per year</span></div>',
          say: "Each of the " + v.y + " years gets <b>" + money(per) + "</b> of depreciation expense." };
      }
    }
  },

  sorters: {
    which: {
      categories: [{ id: "ce", label: "Cause & effect" }, { id: "sys", label: "Systematic" }, { id: "imm", label: "Immediate" }],
      items: [
        { text: "Sales commissions earned on this month’s sales", cat: "ce", why: "Commissions are caused by specific sales; match them to those sales." },
        { text: "Cost of merchandise delivered to customers", cat: "ce", why: "Expense it when the related sale is recognized." },
        { text: "A delivery truck expected to last six years", cat: "sys", why: "It benefits many periods, so spread its cost through depreciation." },
        { text: "Severance pay to a fired employee", cat: "imm", why: "No link to revenue and no future benefit: expense it immediately." },
        { text: "An office building used for 40 years", cat: "sys", why: "Its cost is allocated across its years of use." },
        { text: "Legal settlement for an old lawsuit", cat: "imm", why: "It produces no revenue and benefits no future period." }
      ]
    },
    jan: {
      categories: [{ id: "yes", label: "January expense" }, { id: "no", label: "Not January" }],
      items: [
        { text: "January wages, paid on February 3", cat: "yes", why: "The cost was incurred in January, regardless of when it was paid." },
        { text: "Paid in January for advertising that runs in March", cat: "no", why: "The benefit comes in March, so it’s a March expense even though cash left in January." },
        { text: "January utility bill, paid in January", cat: "yes", why: "Incurred and paid in January." },
        { text: "Commission on a January sale, paid in February", cat: "yes", why: "Matching: the commission belongs with the January sale." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Matching principle", back: "Associating cause and effect: recognize costs in the same period as the revenues they help produce." },
      { term: "Systematic and rational allocation", back: "Spreading a cost over the periods it benefits when there’s no direct link to revenue." },
      { term: "Depreciation", back: "The systematic allocation of a long-lived asset’s cost, like a truck’s, to the periods of use." },
      { term: "Immediate recognition", back: "Expensing costs at once when they have no link to revenue and no future benefit." },
      { term: "Payment vs. recognition", back: "Cash timing doesn’t determine when revenues or expenses are recognized." }
    ]
  },

  quiz: [
    { q: "Recording sales commissions in the same period as the related sales is an example of:", options: ["Immediate recognition", "Systematic and rational allocation", "Associating cause and effect", "Cash-basis accounting"], answer: 2, why: "Commissions are caused by sales, so they’re matched to them." },
    { q: "Associating cause and effect is also known as the:", options: ["Periodicity assumption", "Matching principle", "Historical cost principle", "Revenue principle"], answer: 1, why: "Costs are matched with the revenues they produce." },
    { q: "Depreciating a truck over its useful life is an example of:", options: ["Systematic and rational allocation", "Immediate recognition", "Cause and effect", "Revenue recognition"], answer: 0, why: "The cost benefits many periods and is spread across them." },
    { q: "Severance pay to a terminated employee is recognized:", options: ["Over the next five years", "When the employee is terminated", "When paid", "Matched against future sales"], answer: 1, why: "It has no link to revenue or future benefit, so it’s recognized immediately." },
    { q: "A $60,000 truck used for 5 years with straight allocation gives yearly depreciation of:", options: ["$60,000", "$12,000", "$5,000", "$15,000"], answer: 1, why: "$60,000 ÷ 5 = $12,000." },
    { q: "Under accrual accounting, which statement is true?", options: ["Revenue is recognized only when cash is received", "Expenses are recognized when paid", "Payment timing is not the criterion for recognizing revenues or expenses", "Credit sales are never revenue"], answer: 2, why: "Recognition follows earning and incurring, not cash flow." }
  ]
});

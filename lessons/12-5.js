/* Lesson 12.5 · Other Components of Employee Compensation */
HUB.register("12-5", {
  summary: "Compensated absences, pensions, and retiree benefits are costs of today’s work paid in the future. Accrue them while employees work, and know why defined benefit plans are so uncertain.",
  objectives: [
    "State the conditions for accruing compensated absences",
    "Contrast defined contribution and defined benefit pension plans",
    "Explain why post-retirement benefits are expensed during employment"
  ],
  html: `
<section class="sec" data-toc="Compensated absences">
  <div class="eyebrow kind">Concept</div>
  <h2>Paid time off builds up as people work</h2>
  <p>Employees may earn paid vacation, sick leave, holidays, family emergency time, jury duty, and military reserve time. Often these accumulate with tenure: say, one day of vacation and half a day of sick leave per month worked. Because the cost can be significant, it’s expensed and a liability recorded when <b>all four</b> conditions hold:</p>
  <div class="grid2">
    <div class="tile"><span class="k">1</span><p>It relates to services <b>already rendered</b>.</p></div>
    <div class="tile"><span class="k">2</span><p>It’s a right that <b>vests or accumulates</b>.</p></div>
    <div class="tile"><span class="k">3</span><p>Payment is <b>probable</b>.</p></div>
    <div class="tile"><span class="k">4</span><p>The amount can be <b>reasonably estimated</b>.</p></div>
  </div>
  <p>Vacation pay typically meets all four. Other absences depend on the company’s policies and history.</p>
  <div data-widget="journal" data-key="vac"></div>
</section>

<section class="sec" data-toc="Pension plans">
  <div class="eyebrow kind try">Compare</div>
  <h2>Two kinds of pension plans</h2>
  <div class="panel">
    <div class="seg" role="group" aria-label="Plan type"><button type="button" class="on" data-voice-state data-pl="dc">Defined contribution</button><button type="button" data-voice-state data-pl="db">Defined benefit</button></div>
    <div class="grid2" style="margin-top:14px" id="plan" aria-live="polite"></div>
  </div>
  <div class="panel"><div data-widget="calc" data-key="db"></div></div>
</section>

<section class="sec" data-toc="Retiree benefits">
  <div class="eyebrow kind">Concept</div>
  <h2>Other post-retirement benefits</h2>
  <p>Some companies provide retirees with health care, prescription coverage, and life insurance. Matching requires expensing these costs while employees are <b>working</b> and earning the rights, not when they retire. The company records estimated expense over many years, building a liability on the balance sheet.</p>
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
    <li><span>Accrue compensated absences when they relate to past service, vest or accumulate, are probable, and are estimable.</span></li>
    <li><span><b>Defined contribution</b>: the employer’s contribution is fixed and expensed; the trust handles the rest.</span></li>
    <li><span><b>Defined benefit</b>: the promised benefit is fixed, cost is uncertain; actuaries estimate expense, and underfunding is a liability.</span></li>
    <li><span>Post-retirement benefits are expensed during employment.</span></li>
  </ol>
</section>`,

  data: {
    vac: { entries: [{ date: "Month end", lines: [["Vacation Pay Expense", 2400, 0], ["Vacation Pay Liability", 0, 2400]], memo: "Vacation earned this month by employees, to be taken later" }] },
    db: {
      inputs: [
        { id: "y", label: "Years of service", min: 10, max: 40, step: 5, value: 30, fmt: "yr" },
        { id: "s", label: "Final annual salary", min: 40000, max: 120000, step: 20000, value: 60000, fmt: "$" }
      ],
      run: function (v, money) {
        var pct = v.y * 2, pay = v.s * pct / 100;
        return { html: '<div class="big-eq" style="font-size:20px">2% × ' + v.y + ' years = ' + pct + '% of ' + money(v.s) + ' = <span class="e">' + money(pay) + ' a year</span></div><p class="hint">For how many years? That depends on how long the retiree lives, which is what makes the cost uncertain.</p>',
          say: "A defined benefit formula of 2 percent per year of service pays this retiree <b>" + money(pay) + " a year</b> for life." };
      }
    }
  },

  cards: {
    terms: [
      { term: "Compensated absences", back: "Paid time off such as vacation, sick leave, holidays, and jury duty." },
      { term: "Vesting", back: "Earning a right that the employee keeps even after leaving." },
      { term: "Defined contribution plan", back: "Employer contributes a set amount to a separate pension account; its obligation is known and fixed." },
      { term: "Defined benefit plan", back: "Employer promises a set retirement benefit, e.g., 2% per year of service × final salary; cost is uncertain." },
      { term: "Actuary", back: "A specialist who estimates life expectancy and workforce trends for pension calculations." },
      { term: "Underfunded pension", back: "Pension promises exceed trust assets; a liability is reported." },
      { term: "Post-retirement benefits", back: "Retiree health care, prescriptions, and life insurance; expensed while employees work." }
    ]
  },

  quiz: [
    { q: "Which is NOT a condition for accruing compensated absences?", options: ["Relates to services already rendered", "The right vests or accumulates", "Payment is probable", "The employee has worked 10 years"], answer: 3, why: "The four conditions don’t include a tenure requirement." },
    { q: "Vacation pay is typically:", options: ["Expensed when taken", "Accrued as employees earn it", "Never expensed", "A contingent gain"], answer: 1, why: "It usually meets all four conditions." },
    { q: "Under a defined contribution plan, the employer’s obligation is:", options: ["Uncertain", "Known and fixed", "Determined by actuaries", "A lifetime payment"], answer: 1, why: "It’s the agreed contribution." },
    { q: "Under a defined benefit plan paying 2% per year of service, a 30-year employee with a $60,000 final salary receives:", options: ["$1,200", "$18,000", "$36,000", "$60,000"], answer: 2, why: "60% of $60,000." },
    { q: "Who estimates the cost of a defined benefit plan?", options: ["Auditors", "Actuaries", "Employees", "The IRS"], answer: 1, why: "They assess life expectancy and workforce trends." },
    { q: "Post-retirement health benefits are expensed:", options: ["When paid to retirees", "During the employees’ working years", "Never", "When the plan is terminated"], answer: 1, why: "Matching ties the cost to the service period." }
  ],

  init: function (root) {
    var P = {
      dc: ['<div class="tile"><span class="k">The promise</span><p>The employer contributes a set amount, usually a percentage of salary, often matched in part by the employee, into a separate account. After a vesting period, the money belongs to the employee.</p></div>',
        '<div class="tile alt"><span class="k">The accounting</span><p>The obligation is <b>known and fixed</b>. Expense the contribution as incurred; the separate pension trust holds the assets. The employer usually deducts its contribution for taxes, while the employee isn’t taxed until withdrawal.</p></div>'],
      db: ['<div class="tile"><span class="k">The promise</span><p>A defined <b>benefit</b>, such as 2% of final salary per year of service. Work 30 years and retire on 60% of salary. How long will retirees live? How long will employees work? What will salaries be?</p></div>',
        '<div class="tile alt"><span class="k">The accounting</span><p><b>Actuaries</b> estimate annual pension expense, recognized during employees’ working years. Money is transferred to a pension trust, but the company is liable for shortfalls; an <b>underfunded</b> plan creates a balance sheet liability. Because of the complexity and risk, these plans are becoming less common.</p></div>']
    };
    function draw(k) { root.querySelector("#plan").innerHTML = P[k].join(""); }
    root.querySelectorAll("[data-pl]").forEach(function (b) { b.addEventListener("click", function () { root.querySelectorAll("[data-pl]").forEach(function (x) { x.classList.toggle("on", x === b); }); draw(b.getAttribute("data-pl")); }); });
    draw("dc");
  }
});

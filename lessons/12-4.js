/* Lesson 12.4 · Payroll */
(function () {
  /* rates used in the reading (illustrative): social security 6.5%, Medicare 1.5%;
     withholding chosen so a $3,000 month nets $1,834 as in the reading */
  function stub(g) {
    var d = [["Federal income tax", Math.round(g * 0.15)], ["State income tax", Math.round(g * 0.04)], ["Social security (6.5%)", Math.round(g * 0.065)],
      ["Medicare (1.5%)", Math.round(g * 0.015)], ["Health insurance", 156], ["Retirement (5%)", Math.round(g * 0.05)], ["United Way", 50]];
    var tot = d.reduce(function (s, x) { return s + x[1]; }, 0);
    return { d: d, tot: tot, net: g - tot };
  }

  HUB.register("12-4", {
    summary: "From gross pay to net pay: withholdings, FICA, other deductions, the payroll entry, the employer’s own payroll costs, and why payroll must be handled with great care.",
    objectives: [
      "Distinguish employees from independent contractors",
      "Compute net pay from gross pay and deductions",
      "Record the payroll entry and the employer’s payroll costs",
      "Describe W-2s and payroll controls"
    ],
    html: `
<section class="sec" data-toc="Employee or contractor">
  <div class="eyebrow kind">Concept</div>
  <h2>Employee or independent contractor?</h2>
  <div class="grid2">
    <div class="tile"><span class="k">Independent contractor</span><p>Performs a designated task; the company controls only the <b>result</b>. Janitorial, legal, repair, and audit services are typical. Usually no tax withholding, though the payer may report payments to the IRS on <b>Form 1099</b>. The contractor pays its own taxes.</p></div>
    <div class="tile alt"><span class="k">Employee</span><p>Works for the business, which directs <b>what</b> is done and <b>how</b>. The employer must withhold taxes, pay its own payroll taxes, and keep detailed records.</p></div>
  </div>
</section>

<section class="sec" data-toc="Gross to net">
  <div class="eyebrow kind try">Try it</div>
  <h2>From gross pay to take-home pay</h2>
  <p><b>Gross pay</b> is total earnings: hours × rate, or a flat salary, plus any required overtime. <b>Net pay</b> is what’s left after deductions. I. M. Fictitious earns $3,000 a month and takes home $1,834. Change the gross pay to see the stub update.</p>
  <div class="panel"><div data-widget="calc" data-key="stub"></div></div>
  <div data-widget="steps" data-key="ded"></div>
</section>

<section class="sec" data-toc="The payroll entry">
  <div class="eyebrow kind">Example</div>
  <h2>Recording the paycheck</h2>
  <p>Match each amount to the stub. Every withheld amount is a <b>liability</b>: the employer collected it for someone else. When it’s remitted, the payable is debited and Cash credited.</p>
  <div data-widget="journal" data-key="pay"></div>
</section>

<section class="sec" data-toc="Employer costs">
  <div class="eyebrow kind">Concept</div>
  <h2>What the employer pays on top</h2>
  <div class="grid2">
    <div class="tile"><span class="k">Matching FICA</span><p>The employer matches social security and Medicare dollar for dollar, so the true burden is twice what employees see.</p></div>
    <div class="tile"><span class="k">Unemployment taxes</span><p>Fund payments to people seeking work. Here: federal (FUTA) 0.5% and state (SUTA) 3% on the first $10,000 per employee, capping at $50 and $300. Employers with stable workforces earn lower state rates.</p></div>
    <div class="tile"><span class="k">Workers’ compensation</span><p>Insurance paying workers injured on the job and shielding the employer from further claims. Very costly for risky work like construction.</p></div>
    <div class="tile"><span class="k">Benefits</span><p>Health insurance and retirement contributions can exceed what employees contribute. Certain employers must provide health coverage or face penalties.</p></div>
  </div>
  <p>The total cost of an employee is often <b>125% to 150%</b> of gross pay. For I. M. Fictitious this month, FUTA and SUTA caps were already reached, the employer matches insurance and retirement contributions, and workers’ comp costs $300:</p>
  <div data-widget="journal" data-key="emp"></div>
</section>

<section class="sec" data-toc="Reports and controls">
  <div class="eyebrow kind">Concept</div>
  <h2>W-2s and careful systems</h2>
  <p>After year end, the employer prepares a <b>W-2</b> wage and tax statement for each employee and the government, so employees can file accurately and the government can verify returns.</p>
  <p>Accuracy is vital. Many businesses hire an outside payroll firm. Those that don’t keep a payroll journal or database by employee and often a <b>separate payroll bank account</b> for paychecks and tax payments, an added control. Withheld taxes don’t belong to the employer: failing to remit them on time brings harsh penalties, and employees involved in misusing them face serious legal consequences.</p>
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
    <li><span>Employers withhold from employees; independent contractors pay their own taxes (Form 1099).</span></li>
    <li><span>Net pay = gross pay − income tax withholding − FICA − other deductions.</span></li>
    <li><span>Withheld amounts are current liabilities until remitted.</span></li>
    <li><span>Employers also pay matching FICA, FUTA, SUTA, workers’ comp, and benefits: often 125–150% of gross pay in total.</span></li>
    <li><span>W-2s summarize the year; payroll needs strong controls.</span></li>
  </ol>
</section>`,

    data: {
      stub: {
        inputs: [{ id: "g", label: "Gross pay this month", min: 2000, max: 8000, step: 1000, value: 3000, fmt: "$" }],
        run: function (v, money) {
          var s = stub(v.g), emp = Math.round(v.g * 0.065) + Math.round(v.g * 0.015) + 156 + Math.round(v.g * 0.05) + Math.round(v.g * 0.10);
          return { html: '<div class="statement two"><div class="st-head"><b>I. M. Fictitious</b><span>Monthly pay stub</span></div><div class="st-row bold"><span class="st-l">Gross pay</span><span class="st-a"></span><span class="st-b">' + money(v.g) + '</span></div>' +
            s.d.map(function (x, i) { return '<div class="st-row" style="--ind:1"><span class="st-l">' + x[0] + '</span><span class="st-a"><span class="' + (i === s.d.length - 1 ? "u" : "") + '">' + money(x[1]) + '</span></span><span class="st-b"></span></div>'; }).join("") +
            '<div class="st-row"><span class="st-l">Total deductions</span><span class="st-a"></span><span class="st-b"><span class="u">' + money(-s.tot) + '</span></span></div><div class="st-row bold"><span class="st-l">Net pay</span><span class="st-a"></span><span class="st-b"><span class="uu">' + money(s.net) + '</span></span></div></div>' +
            '<p class="hint">Employer’s extra cost (matching FICA, insurance, retirement, workers’ comp): about ' + money(emp) + ', so the employee costs about ' + money(v.g + emp) + ' (' + Math.round((v.g + emp) / v.g * 100) + '% of gross).</p>',
            say: "On " + money(v.g) + " of gross pay, deductions total " + money(s.tot) + " and take-home pay is <b>" + money(s.net) + "</b>." };
        }
      },
      ded: { numbered: false, items: [
        { t: "Income taxes", b: "<p>Federal, state, and city (where applicable) income taxes are withheld and remitted by the employer, acting as the government’s agent. Amounts depend on income, pay frequency, marital status, and allowances claimed on the employee’s <b>Form W-4</b>.</p>" },
        { t: "Social security", b: "<p>Part of <b>FICA</b> (Federal Insurance Contributions Act), funding income for retirees and others who can’t fully provide for themselves. Illustrated at <b>6.5%</b> up to $150,000 of annual pay; $3,000 × 6.5% = $195. Withholding stops once the annual maximum is reached.</p>" },
        { t: "Medicare", b: "<p>The other FICA component, supporting health care for retirees and others. Illustrated at <b>1.5%</b> on every dollar, with no maximum: $3,000 × 1.5% = $45.</p>" },
        { t: "Other deductions", b: "<p>Health insurance cost sharing, retirement savings, charitable gifts, tax-advantaged health and child care accounts. The employer has a fiduciary duty to pass each amount on.</p>" }
      ]},
      pay: { entries: [{ date: "", lines: [["Salaries Expense", 3000, 0], ["Federal Income Tax Payable", 0, 450], ["State Income Tax Payable", 0, 120], ["Social Security Tax Payable", 0, 195], ["Medicare Tax Payable", 0, 45], ["Health Insurance Payable", 0, 156], ["Retirement Plan Payable", 0, 150], ["United Way Payable", 0, 50], ["Cash", 0, 1834]], memo: "I. M. Fictitious’s monthly pay" }] },
      emp: { entries: [{ date: "", lines: [["Payroll Tax Expense", 240, 0], ["Employee Benefits Expense", 606, 0], ["Social Security Tax Payable", 0, 195], ["Medicare Tax Payable", 0, 45], ["Health Insurance Payable", 0, 156], ["Retirement Plan Payable", 0, 150], ["Workers’ Compensation Payable", 0, 300]], memo: "Employer’s costs for the month (FUTA and SUTA already capped)" }] }
    },

    cards: {
      terms: [
        { term: "Independent contractor", back: "Performs a task; the company controls only the result. No withholding; may get a Form 1099." },
        { term: "Employee", back: "Directed by the business in what and how work is done; subject to withholding." },
        { term: "Gross pay", back: "Total earnings before deductions." },
        { term: "Net pay", back: "Gross pay minus all deductions: take-home pay." },
        { term: "FICA", back: "Federal Insurance Contributions Act: social security and Medicare taxes, matched by the employer." },
        { term: "FUTA / SUTA", back: "Federal and state unemployment taxes paid by the employer up to a wage cap." },
        { term: "Form W-4", back: "Employee’s withholding allowance certificate." },
        { term: "Form W-2", back: "Annual wage and tax statement given to employees and the government." },
        { term: "Workers’ compensation", back: "Insurance covering on-the-job injuries." }
      ]
    },

    quiz: [
      { q: "A company controls only the result of a contractor’s work. That person is:", options: ["An employee", "An independent contractor", "A partner", "A shareholder"], answer: 1, why: "Employees are directed in how they work." },
      { q: "Gross pay $3,000; social security at 6.5% is:", options: ["$45", "$195", "$300", "$65"], answer: 1, why: "$3,000 × 6.5%." },
      { q: "Unlike social security, the Medicare tax:", options: ["Isn’t matched by employers", "Has no annual maximum", "Is optional", "Is paid only by employers"], answer: 1, why: "It applies to every dollar earned." },
      { q: "Withheld income taxes not yet remitted are reported as:", options: ["Expenses", "Current liabilities", "Revenue", "Assets"], answer: 1, why: "They’re collected for the government." },
      { q: "In the payroll entry, Cash is credited for:", options: ["Gross pay", "Net pay", "Total withholdings", "Employer taxes"], answer: 1, why: "Only take-home pay is paid to the employee." },
      { q: "Which is an employer payroll cost, not an employee deduction?", options: ["Federal income tax withholding", "FUTA", "The employee’s retirement contribution", "Charitable contribution"], answer: 1, why: "Unemployment tax is paid by the employer." },
      { q: "An employee’s total cost to an employer is often:", options: ["Exactly gross pay", "Net pay", "125% to 150% of gross pay", "50% of gross pay"], answer: 2, why: "Taxes and benefits add significantly." },
      { q: "A W-2 is:", options: ["An employee’s withholding certificate", "An annual wage and tax statement", "A contractor payment form", "A bank form"], answer: 1, why: "It summarizes the year for employee and government." }
    ]
  });
})();

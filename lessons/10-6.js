/* Lesson 10.6 · Equipment Leases */
HUB.register("10-6", {
  summary: "Lease accounting looks past legal ownership to economic substance. Finance leases put an asset and a liability on the lessee’s books; operating leases over a year create a right-of-use asset and liability too.",
  objectives: [
    "Identify the lessee and lessor",
    "Explain substance over form in lease accounting",
    "Distinguish finance leases from operating leases",
    "Explain why reporting leases matters, e.g., for airlines"
  ],
  html: `
<section class="sec" data-toc="Substance over form">
  <div class="eyebrow kind">Concept</div>
  <h2>Look through the legal form</h2>
  <p>Many businesses get assets by leasing. The <b>lessee</b> pays the <b>lessor</b> for the right to use an asset for a stated period. Legally, the lessor still owns it. But accounting follows the <b>economic substance</b> of the agreement, not its legal form.</p>
</section>

<section class="sec" data-toc="Two kinds of leases">
  <div class="eyebrow kind">Concept</div>
  <h2>Finance leases and operating leases</h2>
  <div class="grid2">
    <div class="tile"><span class="k">Finance lease</span><p>Substantially like buying the asset on credit. The lessee records the <b>leased asset</b> (usually in PP&amp;E), depreciates it over its useful life to the lessee, and records a <b>liability</b> for the remaining payments, accounted for like a note payable with part of each payment as interest expense.</p></div>
    <div class="tile alt"><span class="k">Operating lease</span><p><b>One year or less:</b> rent is simply expensed as incurred.<br><b>Longer:</b> the lessee records a <b>right-of-use asset</b> and a matching liability. Both decline over time as rent is paid and expensed, usually straight-line.</p></div>
  </div>
  <div class="panel">
    <div class="panel-title"><h3>How would the lessee account for it?</h3></div>
    <div data-widget="sorter" data-key="lease"></div>
  </div>
</section>

<section class="sec" data-toc="Why it matters">
  <div class="eyebrow kind">Concept</div>
  <h2>Why go to the trouble?</h2>
  <p>Think of commercial airlines, which rely heavily on finance leases for their planes. Leaving the aircraft, and the fixed commitment to pay for them, off the financial statements would hide the true nature of the business. Reporting leases shows readers the assets the company really uses and the obligations it has really taken on.</p>
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
    <li><span>The <b>lessee</b> pays the <b>lessor</b> for the right to use an asset; accounting follows economic substance.</span></li>
    <li><span><b>Finance lease</b>: record and depreciate the asset; record a liability with interest, like a note.</span></li>
    <li><span><b>Operating lease</b>: one year or less, expense the rent; longer, record a right-of-use asset and liability.</span></li>
    <li><span>Reporting leases reveals assets used and payment commitments.</span></li>
  </ol>
</section>`,

  sorters: {
    lease: {
      categories: [{ id: "fin", label: "Finance lease" }, { id: "opl", label: "Operating, over 1 year" }, { id: "ops", label: "Operating, 1 year or less" }],
      items: [
        { text: "An airline leases a jet for most of its useful life, essentially buying it on credit", cat: "fin", why: "Substantially equivalent to a credit purchase." },
        { text: "A company rents a forklift for three months during peak season", cat: "ops", why: "Short-term: expense the rent as incurred." },
        { text: "A retailer leases store space for five years, with no transfer of ownership", cat: "opl", why: "Record a right-of-use asset and lease liability." },
        { text: "A manufacturer leases a machine with a lease that transfers ownership at the end", cat: "fin", why: "Economically a purchase." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Lessee", back: "The party paying for the right to use a leased asset." },
      { term: "Lessor", back: "The owner of a leased asset." },
      { term: "Finance lease", back: "A lease substantially equivalent to a credit purchase; asset and liability recorded, asset depreciated, interest recognized." },
      { term: "Operating lease", back: "Other leases: expensed if one year or less; otherwise a right-of-use asset and liability." },
      { term: "Right-of-use asset", back: "The lessee’s asset representing its right to use a leased item under a longer operating lease." },
      { term: "Substance over form", back: "Accounting based on economic reality rather than legal form." }
    ]
  },

  quiz: [
    { q: "In a lease, the party paying for use of the asset is the:", options: ["Lessor", "Lessee", "Owner", "Trustee"], answer: 1, why: "The lessee uses the asset." },
    { q: "Lease accounting is based on:", options: ["Legal ownership", "Economic substance", "Tax rules", "Cash payments only"], answer: 1, why: "It looks through legal form." },
    { q: "Under a finance lease, the lessee:", options: ["Expenses all payments as rent", "Records the asset and a liability, depreciates the asset, and recognizes interest", "Records nothing", "Records only a liability"], answer: 1, why: "It’s like buying on credit." },
    { q: "An operating lease of one year or less is accounted for by:", options: ["Recording a right-of-use asset", "Expensing rent as incurred", "Depreciating the asset", "Recording a note payable"], answer: 1, why: "Short leases are simply expensed." },
    { q: "Why does lease reporting matter for airlines?", options: ["Planes are cheap", "Omitting leased aircraft and commitments would misrepresent the business", "Airlines don’t lease", "It lowers taxes"], answer: 1, why: "Leased planes are core assets and obligations." }
  ]
});

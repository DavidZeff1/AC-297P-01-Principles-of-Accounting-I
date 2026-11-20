/* Lesson 3.3 · Basic Elements of Revenue Recognition */
HUB.register("3-3", {
  summary: "When is revenue earned? Learn the two conditions for recognizing revenue, and the five-step model used for complex contracts like a phone bundled with a service plan.",
  objectives: [
    "Define recognition",
    "State the two conditions for recognizing revenue",
    "Apply them to manufacturing and ordering situations",
    "Walk through the five-step revenue recognition model"
  ],
  html: `
<section class="sec" data-toc="Two conditions">
  <div class="eyebrow kind">Concept</div>
  <h2>Revenue needs an exchange and a completed earnings process</h2>
  <p>To <b>recognize</b> an item means to record it in the accounting records. Revenue is normally recognized when services are rendered, or when goods are sold and delivered. Two conditions must <b>both</b> be met:</p>
  <div class="grid2">
    <div class="tile"><span class="k">Condition 1</span><h4>An exchange transaction</h4><p>Goods or services are exchanged with a customer.</p></div>
    <div class="tile"><span class="k">Condition 2</span><h4>The earnings process is complete</h4><p>The company has done what it promised: performed the service or delivered the goods.</p></div>
  </div>
  <div class="grid2">
    <div class="tile warn"><span class="k">Not yet: off the assembly line</span><p>Production is complete, but nothing has been sold. There’s no exchange.</p></div>
    <div class="tile warn"><span class="k">Not yet: customer places an order</span><p>There’s an agreement, but the product hasn’t been made and delivered. The earnings process isn’t complete.</p></div>
  </div>
  <div class="panel">
    <div class="panel-title"><h3>Recognize revenue now?</h3><span class="hint">Check both conditions</span></div>
    <div data-widget="sorter" data-key="now"></div>
  </div>
</section>

<section class="sec" data-toc="Complex contracts">
  <div class="eyebrow kind">Concept</div>
  <h2>Modern contracts are complicated</h2>
  <p>Today’s transactions often involve <b>bundles</b> (a phone with a service contract), <b>intangibles</b> (a software license), <b>order routing</b> (an online retailer forwarding your order to the manufacturer to ship directly), and <b>milestones</b> (payment only when research results are achieved). Many past accounting failures came from misapplying revenue recognition, so standard setters created a five-step approach.</p>
  <div data-widget="steps" data-key="five"></div>
</section>

<section class="sec" data-toc="A bundle example">
  <div class="eyebrow kind try">Example</div>
  <h2>The five steps on a phone bundle</h2>
  <p class="hint">An illustration with round numbers. Applying the model to real contracts takes considerable judgment, a topic for advanced courses.</p>
  <div class="panel"><div data-widget="worked" data-key="phone"></div></div>
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
    <li><span>To <b>recognize</b> is to record in the accounts.</span></li>
    <li><span>Revenue requires <b>(a) an exchange transaction</b> and <b>(b) a completed earnings process</b>, normally at delivery of goods or performance of services.</span></li>
    <li><span>Neither finishing production nor receiving an order is enough.</span></li>
    <li><span>Five steps: identify the contract, identify performance obligations, determine the price, allocate the price, recognize revenue as each obligation is satisfied.</span></li>
  </ol>
</section>`,

  data: {
    five: { items: [
      { t: "Identify the contract", b: "<p>Identify the contract (or contracts) with the customer.</p>" },
      { t: "Identify the obligations", b: "<p>Identify each <b>performance obligation</b>: each distinct good or service promised in the contract.</p>" },
      { t: "Determine the price", b: "<p>Determine the <b>transaction price</b>: what the customer will pay.</p>" },
      { t: "Allocate the price", b: "<p>Allocate the transaction price among the performance obligations.</p>" },
      { t: "Recognize revenue", b: "<p>Recognize revenue <b>when (or as)</b> each performance obligation is satisfied.</p>" }
    ]},
    phone: {
      q: "<p>A carrier sells a phone with a 12-month service plan for one price of <b>$600</b>. Sold separately, the phone would be $300 and the plan $500. How much revenue is recognized at the sale, and how much each month?</p>",
      steps: [
        "<b>Contract:</b> one contract with the customer.",
        "<b>Obligations:</b> two. Deliver the phone, and provide 12 months of service.",
        "<b>Price:</b> $600.",
        "<b>Allocate</b> by stand-alone prices, which total $800. Phone: $600 × 300/800 = <b>$225</b>. Service: $600 × 500/800 = <b>$375</b>.",
        "<b>Recognize:</b> the phone obligation is satisfied when it’s handed over, so $225 is revenue at the sale. Service is satisfied over time: $375 ÷ 12 = <b>$31.25 per month</b>."
      ],
      answer: "<p>$225 at the sale, then $31.25 each month for 12 months. Total: $600.</p>"
    }
  },

  sorters: {
    now: {
      categories: [{ id: "yes", label: "Yes" }, { id: "no", label: "Not yet" }],
      items: [
        { text: "A finished car rolls off the assembly line into the factory lot", cat: "no", why: "Production is complete, but no exchange with a customer has happened." },
        { text: "A customer orders a custom table that hasn’t been built yet", cat: "no", why: "The earnings process isn’t complete until it’s built and delivered." },
        { text: "A lawn service mows a client’s lawn; the client will pay next month", cat: "yes", why: "The service is performed and exchanged. Payment timing doesn’t matter." },
        { text: "A store sells and hands over a TV for cash", cat: "yes", why: "Exchange and delivery are both complete." },
        { text: "A gym collects a full year of membership fees in advance", cat: "no", why: "The gym hasn’t provided the year of service yet." },
        { text: "A wholesaler ships ordered goods that the customer receives", cat: "yes", why: "Sold and delivered: both conditions are met." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Recognize", back: "To record an item in the accounting records." },
      { term: "Revenue recognition conditions", back: "(a) An exchange transaction and (b) a completed earnings process." },
      { term: "Performance obligation", back: "A distinct good or service promised to the customer in a contract." },
      { term: "Transaction price", back: "The amount the customer will pay under the contract." },
      { term: "Bundled sale", back: "One price for several goods or services, such as a phone with a service plan." },
      { term: "Five-step model", back: "Contract → obligations → price → allocate → recognize as each obligation is satisfied." }
    ]
  },

  quiz: [
    { q: "To “recognize” revenue means to:", options: ["Collect the cash", "Record it in the accounting records", "Disclose it in a footnote", "Estimate it"], answer: 1, why: "Recognition is recording the item in the accounts." },
    { q: "The two conditions for revenue recognition are:", options: ["Cash received and goods produced", "An exchange transaction and a completed earnings process", "A signed order and a deposit", "Production complete and goods in inventory"], answer: 1, why: "Both conditions must be met." },
    { q: "A manufactured product rolls off the assembly line. Should revenue be recognized?", options: ["Yes, production is complete", "No, there has been no exchange transaction", "Yes, if the product is valuable", "Only at year end"], answer: 1, why: "Production alone doesn’t create a sale." },
    { q: "Which is the FIRST step of the five-step model?", options: ["Determine the transaction price", "Identify the contract with a customer", "Recognize revenue", "Allocate the price"], answer: 1, why: "Everything starts with identifying the contract." },
    { q: "A distinct good or service promised in a contract is a:", options: ["Transaction price", "Performance obligation", "Milestone", "Source document"], answer: 1, why: "Each promised distinct item is a performance obligation." },
    { q: "Revenue is recognized when (or as):", options: ["The contract is signed", "Cash is received", "Each performance obligation is satisfied", "The fiscal year ends"], answer: 2, why: "That’s step 5 of the model." },
    { q: "A $600 bundle: phone stand-alone $300, plan $500. Revenue allocated to the phone is:", options: ["$300", "$225", "$375", "$600"], answer: 1, why: "$600 × 300/800 = $225." }
  ]
});

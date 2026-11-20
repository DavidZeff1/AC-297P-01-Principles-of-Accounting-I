/* Lesson 11.6 · Intangibles */
HUB.register("11-6", {
  summary: "Patents, copyrights, franchises, trademarks, and goodwill have no physical form but drive earnings. Purchased intangibles with a definite life are amortized; indefinite-life ones are tested for impairment.",
  objectives: [
    "Define intangible assets and when they’re recorded",
    "Amortize a purchased intangible with a definite life",
    "Identify intangibles with indefinite lives",
    "Describe patents, copyrights, franchises, trademarks, and goodwill"
  ],
  html: `
<section class="sec" data-toc="What they are">
  <div class="eyebrow kind">Concept</div>
  <h2>Valuable without physical form</h2>
  <p><b>Intangible assets</b> lack physical existence but contribute to earnings: patents, copyrights, trademarks, brands, franchises. Internally developed intangibles are recognized globally in some cases, but U.S. rules are far more restrictive: self-created intangibles seldom appear on the balance sheet. <b>Purchased</b> intangibles are recorded at cost.</p>
  <div class="grid2">
    <div class="tile"><span class="k">Definite life: amortize</span><p>Spread the cost over its economic life. <b>Amortization</b> is to intangibles what depreciation is to PP&amp;E.</p></div>
    <div class="tile alt"><span class="k">Indefinite life: test for impairment</span><p>Not amortized. If never impaired, it stays on the balance sheet indefinitely.</p></div>
  </div>
  <p>Intangibles are reported in their own section right after property, plant, and equipment.</p>
</section>

<section class="sec" data-toc="Mercury’s patent">
  <div class="eyebrow kind">Example</div>
  <h2>Mercury Pharmaceutical’s patent</h2>
  <p>Mercury buys a patent for $50,000 with an estimated five-year useful life: $10,000 of amortization a year.</p>
  <div data-widget="journal" data-key="pat"></div>
  <p>Unlike PP&amp;E, amortization usually credits the <b>asset account directly</b>; there’s usually no accumulated amortization account.</p>
</section>

<section class="sec" data-toc="Specific intangibles">
  <div class="eyebrow kind">Concept</div>
  <h2>A field guide to intangibles</h2>
  <div data-widget="steps" data-key="types"></div>
  <div class="panel">
    <div class="panel-title"><h3>Amortize, or test for impairment only?</h3></div>
    <div data-widget="sorter" data-key="life"></div>
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
    <li><span>Intangibles lack physical form; purchased ones are recorded at cost. U.S. rules rarely record self-created intangibles.</span></li>
    <li><span>Definite life: <b>amortize</b> over economic life, usually crediting the asset directly.</span></li>
    <li><span>Indefinite life (trademarks, brands, domains, goodwill): no amortization; test for impairment (goodwill at least annually).</span></li>
    <li><span>Patents: amortize over useful life, no more than 20 years. Copyrights: life of creator + 70 years legally, usually shorter economically.</span></li>
    <li><span>Private companies may amortize goodwill over 10 years.</span></li>
  </ol>
</section>`,

  data: {
    pat: { entries: [
      { date: "Jan. 1", lines: [["Patent", 50000, 0], ["Cash", 0, 50000]], memo: "Purchased a patent" },
      { date: "Dec. 31 (each year)", lines: [["Amortization Expense", 10000, 0], ["Patent", 0, 10000]], memo: "Annual amortization: $50,000 ÷ 5 years" }
    ]},
    types: { numbered: false, items: [
      { t: "Patents", b: "<p>Exclusive rights to use or make a product. Includes the purchase cost and costs to register and protect it. Amortize over the useful life, <b>not more than the 20-year legal life</b>.</p>" },
      { t: "Copyrights", b: "<p>Exclusive rights to produce or sell an artistic or published work. Legal life: the creator’s life <b>plus 70 years</b>. Amortize over the usually shorter economic life.</p>" },
      { t: "Franchises", b: "<p>Rights to make or sell certain products or perform services on an exclusive or semi-exclusive basis. Amortize over the estimated useful life.</p>" },
      { t: "Trademarks, brands, domains", b: "<p>Short legal lives, but renewable again and again, so they have <b>indefinite</b> lives and aren’t amortized.</p>" },
      { t: "Goodwill", b: "<p>Arises only from acquiring a business: the excess of the price over the fair value of identifiable net assets, perhaps for outstanding management or an earnings record. Indefinite life: not amortized, but tested for impairment <b>at least annually</b>.</p><p>Companies without public shareholders may simplify: combine certain customer-related intangibles and noncompete agreements with goodwill, and amortize goodwill over <b>10 years</b>.</p>" }
    ]}
  },

  sorters: {
    life: {
      categories: [{ id: "am", label: "Amortize" }, { id: "imp", label: "Impairment test only" }],
      items: [
        { text: "A purchased patent with 8 useful years left", cat: "am", why: "Definite life." },
        { text: "Goodwill from acquiring a public competitor", cat: "imp", why: "Indefinite life; tested at least annually." },
        { text: "A registered trademark that can be renewed indefinitely", cat: "imp", why: "Renewable, so indefinite life." },
        { text: "A 10-year franchise to operate a restaurant", cat: "am", why: "Amortize over the useful life." },
        { text: "A purchased copyright expected to earn royalties for 6 years", cat: "am", why: "Amortize over the economic life." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Intangible asset", back: "An asset lacking physical existence that contributes to earnings." },
      { term: "Amortization", back: "Allocating an intangible’s cost over its useful life." },
      { term: "Patent", back: "Exclusive right to use or make a product; amortized over useful life, max 20 years." },
      { term: "Copyright", back: "Exclusive right to a creative work; legal life of creator plus 70 years." },
      { term: "Franchise", back: "Right to sell products or services on an exclusive or semi-exclusive basis." },
      { term: "Trademark / brand", back: "Renewable legal protection; indefinite life, not amortized." },
      { term: "Goodwill", back: "Excess of acquisition price over fair value of identifiable net assets; indefinite life, impairment-tested annually." }
    ]
  },

  quiz: [
    { q: "The defining characteristic of an intangible asset is:", options: ["High cost", "Lack of physical existence", "Short life", "It’s always purchased"], answer: 1, why: "Patents, copyrights, brands, and so on." },
    { q: "A $50,000 patent with a five-year life is amortized by:", options: ["$5,000 a year", "$10,000 a year", "$2,500 a year", "Nothing; patents aren’t amortized"], answer: 1, why: "$50,000 ÷ 5." },
    { q: "The amortization entry for a patent usually credits:", options: ["Accumulated Amortization", "Patent", "Cash", "Amortization Expense"], answer: 1, why: "The asset is reduced directly." },
    { q: "A patent’s amortization period can’t exceed:", options: ["5 years", "10 years", "20 years", "40 years"], answer: 2, why: "Its legal life." },
    { q: "Which intangible is NOT amortized (for a public company)?", options: ["Patent", "Franchise", "Goodwill", "Copyright"], answer: 2, why: "Indefinite life; tested for impairment instead." },
    { q: "Goodwill should be tested for impairment:", options: ["Never", "At least annually", "Every five years", "Only when sold"], answer: 1, why: "That’s the rule." },
    { q: "Under U.S. GAAP, internally created intangibles are:", options: ["Always recorded at fair value", "Seldom recorded on the balance sheet", "Amortized over 40 years", "Recorded as goodwill"], answer: 1, why: "U.S. rules are restrictive." }
  ]
});

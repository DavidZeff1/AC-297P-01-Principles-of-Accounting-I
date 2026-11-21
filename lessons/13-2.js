/* Lesson 13.2 · Bonds Payable */
HUB.register("13-2", {
  summary: "Bonds split a big loan into many small ones. The bond indenture sets the terms: security, priority, registration, sinking funds, serial maturities, conversion, call features, and a trustee to enforce it all.",
  objectives: [
    "Describe a bond issue and the bond indenture",
    "Distinguish secured and debenture bonds, registered and bearer bonds",
    "Explain sinking fund, serial, convertible, and callable features",
    "Describe the role of the bond trustee"
  ],
  html: `
<section class="sec" data-toc="The indenture">
  <div class="eyebrow kind">Concept</div>
  <h2>A big loan in small pieces</h2>
  <p><b>Bonds payable</b> arise when a borrower splits a large loan into many small units, each essentially a note payable. Investors who buy them are lending to the company (Chapter 9 took the investor’s view). The terms are set out in a <b>bond indenture</b>, which covers interest, life, and much more.</p>
  <div data-widget="steps" data-key="features"></div>
</section>

<section class="sec" data-toc="Match the feature">
  <div class="eyebrow kind check">Practice</div>
  <h2>Name that bond</h2>
  <div class="panel"><div data-widget="sorter" data-key="name"></div></div>
</section>

<section class="sec" data-toc="The trustee">
  <div class="eyebrow kind">Concept</div>
  <h2>Who enforces the indenture?</h2>
  <p>The indenture names a <b>bond trustee</b>, such as an investment company or law firm, independent of the issuer. The trustee monitors compliance with the indenture’s terms (its <b>covenants</b>) and has a fiduciary duty to step in and protect bondholders if the company violates them.</p>
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
    <li><span>The <b>bond indenture</b> sets the bond’s terms; a <b>trustee</b> enforces them for bondholders.</span></li>
    <li><span>Secured bonds have collateral; <b>debentures</b> rely on the issuer’s general credit.</span></li>
    <li><span>Most bonds today are <b>registered</b>; coupon and bearer bonds are rare.</span></li>
    <li><span><b>Sinking funds</b> set money aside for repayment; <b>serial bonds</b> mature in installments.</span></li>
    <li><span><b>Convertible</b> bonds can become stock; <b>callable</b> bonds can be bought back early.</span></li>
  </ol>
</section>`,

  data: {
    features: { numbered: false, items: [
      { t: "Security", b: "<p><b>Secured</b> bonds are backed by specific assets pledged as collateral. <b>Debenture</b> bonds have no specific collateral; they’re only as good as the issuer’s general faith and credit.</p>" },
      { t: "Priority", b: "<p>If the company fails, the indenture may give some bonds preference in liquidation, paid before others.</p>" },
      { t: "Registered vs. coupon", b: "<p><b>Coupon</b> bonds once had detachable interest coupons to clip and cash. Today most bonds are <b>registered</b> to an owner and interest is paid electronically. <b>Bearer</b> bonds, owned by whoever holds them, are rare.</p>" },
      { t: "Sinking fund", b: "<p>Not as bad as it sounds: a required account into which money is periodically transferred to make sure funds will be available to repay the bonds at maturity.</p>" },
      { t: "Serial bonds", b: "<p>Portions of the issue mature on dates spread over time instead of all at once.</p>" },
      { t: "Convertible", b: "<p>Holders can exchange bonds for a set number of shares. If the stock soars, they convert. Investors accept a lower rate for this option, and the company may effectively sell stock at a higher price later. Convertibles are almost always callable, so the company can force conversion and stop paying interest.</p>" },
      { t: "Callable", b: "<p>The company can buy back the bonds early at a set price, useful if interest rates fall. Some bonds can’t be called: investors who bought high-yield <b>junk bonds</b> from a struggling company don’t want their yield taken away if it recovers.</p>" },
      { t: "Nonredeemable vs. nonrefundable", b: "<p><b>Nonredeemable</b> bonds can’t be paid off early. <b>Nonrefundable</b> bonds can, but only with money from operations, not new borrowing. Some securities legally structured as equity have mandatory redemption, so they’re accounted for like debt.</p>" }
    ]}
  },

  sorters: {
    name: {
      categories: [{ id: "deb", label: "Debenture" }, { id: "conv", label: "Convertible" }, { id: "call", label: "Callable" }, { id: "ser", label: "Serial" }],
      items: [
        { text: "Backed only by the company’s general credit, with no collateral", cat: "deb", why: "That’s a debenture." },
        { text: "Can be exchanged for 40 shares of common stock", cat: "conv", why: "Convertible into stock." },
        { text: "The company may repurchase it at 103 after five years", cat: "call", why: "A call provision." },
        { text: "$1 million of the issue matures each year for ten years", cat: "ser", why: "Maturities are spread out: serial bonds." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Bond indenture", back: "The agreement setting out a bond issue’s terms." },
      { term: "Debenture", back: "An unsecured bond backed only by the issuer’s general credit." },
      { term: "Registered bond", back: "A bond recorded in the owner’s name; interest is paid to the registered owner." },
      { term: "Bearer bond", back: "A bond owned by whoever holds it; rare today." },
      { term: "Sinking fund", back: "A required fund built up over time to repay bonds at maturity." },
      { term: "Serial bonds", back: "Bonds in one issue that mature on different dates." },
      { term: "Convertible bond", back: "A bond the holder can exchange for a set number of shares." },
      { term: "Callable bond", back: "A bond the issuer can buy back early at a set price." },
      { term: "Junk bonds", back: "High-interest bonds of financially distressed issuers." },
      { term: "Bond trustee", back: "An independent party that monitors compliance and protects bondholders." }
    ]
  },

  quiz: [
    { q: "The terms of a bond issue are set out in the:", options: ["Charter", "Bond indenture", "Prospectus only", "Trial balance"], answer: 1, why: "The indenture is the governing agreement." },
    { q: "A bond backed only by the issuer’s general credit is a:", options: ["Secured bond", "Debenture", "Serial bond", "Coupon bond"], answer: 1, why: "No specific collateral." },
    { q: "A sinking fund is:", options: ["A sign of a failing company", "Money set aside periodically to repay bonds at maturity", "A type of stock", "Interest paid early"], answer: 1, why: "It ensures repayment funds." },
    { q: "Why might investors accept a lower rate on convertible bonds?", options: ["They’re secured", "They can be exchanged for stock if the price rises", "They mature sooner", "They pay in cash"], answer: 1, why: "The conversion option has value." },
    { q: "Why would a company want callable bonds?", options: ["To raise the interest rate", "To refinance if interest rates fall", "To avoid a trustee", "To make bonds convertible"], answer: 1, why: "It can escape higher-cost debt." },
    { q: "Bonds that can be repaid early only with money from operations, not new borrowing, are:", options: ["Nonredeemable", "Nonrefundable", "Bearer", "Serial"], answer: 1, why: "Don’t confuse with nonredeemable." },
    { q: "The bond trustee:", options: ["Sets interest rates", "Monitors compliance and protects bondholders", "Buys all the bonds", "Is the company’s CEO"], answer: 1, why: "A fiduciary for the investors." }
  ]
});

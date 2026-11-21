/* Lesson 14.1 · The Corporate Form of Organization */
HUB.register("14-1", {
  summary: "A corporation is a legal person separate from its owners. See how one is formed, why it’s popular (shared ownership, easy transfer, perpetual life, limited liability), and what it costs (double taxation and regulation).",
  objectives: [
    "Describe how a corporation is formed and begins operations",
    "Explain the advantages of the corporate form",
    "Explain double taxation and the burden of regulation",
    "Describe an IPO and a prospectus"
  ],
  html: `
<section class="sec" data-toc="Forming a corporation">
  <div class="eyebrow kind">Concept</div>
  <h2>An artificial person</h2>
  <p>A <b>corporation</b> is a legal entity with an existence separate from its owners, the <b>stockholders</b>. It exists only because the law says so. Here’s how one comes to life:</p>
  <div data-widget="steps" data-key="form"></div>
  <p class="hint">In a small start-up, the same few people may be incorporators, shareholders, directors, and officers all at once. So why bother incorporating?</p>
</section>

<section class="sec" data-toc="Advantages">
  <div class="eyebrow kind">Concept</div>
  <h2>Why corporations are so popular</h2>
  <div class="grid2">
    <div class="tile"><span class="k">Shared ownership</span><p>Unrelated people can pool large amounts of capital in one entity. Shares show exactly who owns what proportion, and shareholders vote (usually one vote per share) on directors, auditors, stock option plans, and mergers. The ballot is called a <b>proxy</b>.</p></div>
    <div class="tile"><span class="k">Transferability</span><p>Shares change hands easily, giving owners <b>liquidity</b>. A growing company can issue more stock and eventually be <b>listed</b> on an exchange.</p></div>
    <div class="tile"><span class="k">Perpetual existence</span><p>The company can outlive its owners; ownership changes don’t stop operations. It ends only through merger, failure, or a decision to liquidate.</p></div>
    <div class="tile alt"><span class="k">Limited liability</span><p>Stockholders can lose their investment but generally aren’t liable for company debts beyond it. Exceptions: personal guarantees, or owners of closely held companies who commingle finances or skip legal formalities.</p></div>
  </div>
  <p>An <b>IPO</b> (initial public offering) is a company’s first public sale of stock. It requires regulatory filings and a <b>prospectus</b> giving investors detailed information, and public companies face continuing reporting rules aimed at full and fair disclosure. A <b>limited liability company (LLC)</b>, allowed by state law, can be taxed as a corporation, partnership, or individual while shielding its members from some debts.</p>
</section>

<section class="sec" data-toc="Disadvantages">
  <div class="eyebrow kind try">Try it</div>
  <h2>Taxed twice</h2>
  <p>Most corporations pay income tax on their profits. When the after-tax profit is paid out as dividends, shareholders pay tax on it again: <b>double taxation</b>.</p>
  <div class="panel"><div data-widget="calc" data-key="tax"></div></div>
  <p>Relief varies with politics: dividends-received deductions between affiliated companies, lower tax rates on dividends, and <b>S corporation</b> rules that let closely held companies pass income to shareholders and skip one level of tax. Some countries offer tax holidays for new companies.</p>
  <div class="tile warn"><span class="k">Costly regulation</span><p>Without regulators, stock fraud flourishes and investors lose the confidence that lets them pool money. But compliance is expensive: public companies file quarterly and annual reports with the <b>SEC</b>, many certified or audited, and must maintain strong internal controls and even ethics training.</p></div>
</section>

<section class="sec" data-toc="Sort it">
  <div class="eyebrow kind check">Practice</div>
  <h2>Advantage or disadvantage?</h2>
  <div class="panel"><div data-widget="sorter" data-key="ad"></div></div>
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
    <li><span>Articles of incorporation → charter → stock issued → bylaws and board → officers.</span></li>
    <li><span>Advantages: pooled ownership with voting, transferable shares, perpetual life, limited liability.</span></li>
    <li><span>Disadvantages: double taxation of dividends and costly regulation.</span></li>
    <li><span>An IPO requires registration and a prospectus; public companies report to the SEC.</span></li>
  </ol>
</section>`,

  data: {
    form: { items: [
      { t: "File articles", b: "<p>One or more <b>incorporators</b> file <b>articles of incorporation</b> with a Secretary of State, describing the entity’s purpose and how it will be governed.</p>" },
      { t: "Receive a charter", b: "<p>After review, the state issues a <b>charter</b> (certificate of incorporation) authorizing the corporation.</p>" },
      { t: "Issue stock", b: "<p>The incorporators collect the initial investment in exchange for <b>stock</b>, the instrument showing each person’s ownership.</p>" },
      { t: "Shareholders meet", b: "<p>The shareholders adopt <b>bylaws</b> and elect a <b>board of directors</b>.</p>" },
      { t: "Appoint officers", b: "<p>The directors appoint <b>officers</b>, who start running the business.</p>" }
    ]},
    tax: {
      inputs: [
        { id: "c", label: "Corporate income tax rate", min: 10, max: 35, step: 5, value: 20, fmt: "%" },
        { id: "s", label: "Shareholder tax rate on dividends", min: 0, max: 30, step: 5, value: 15, fmt: "%" }
      ],
      run: function (v, money) {
        var ct = 1000 * v.c / 100, div = 1000 - ct, st = div * v.s / 100, keep = div - st, gov = ct + st;
        return { html: '<div class="statement"><div class="st-head"><b>$1,000 of corporate profit</b></div>' +
          '<div class="st-row"><span class="st-l">Corporate income tax (' + v.c + '%)</span><span class="st-b">' + money(-ct) + '</span></div>' +
          '<div class="st-row"><span class="st-l">Paid out as dividends</span><span class="st-b">' + money(div) + '</span></div>' +
          '<div class="st-row"><span class="st-l">Shareholder tax (' + v.s + '%)</span><span class="st-b"><span class="u">' + money(-st) + '</span></span></div>' +
          '<div class="st-row bold"><span class="st-l">Shareholder keeps</span><span class="st-b"><span class="uu">' + money(keep) + '</span></span></div></div>',
          say: "Of $1,000 earned, taxes take " + money(gov) + " in two layers, so the shareholder keeps <b>" + money(keep) + "</b>, an effective rate of " + Math.round(gov / 10) + "%." };
      }
    }
  },

  sorters: {
    ad: {
      categories: [{ id: "adv", label: "Advantage" }, { id: "dis", label: "Disadvantage" }],
      items: [
        { text: "Shareholders can sell their stock quickly", cat: "adv", why: "Transferability gives liquidity." },
        { text: "Dividends are taxed after the company already paid tax on its profit", cat: "dis", why: "Double taxation." },
        { text: "The business continues when a major owner dies", cat: "adv", why: "Perpetual existence." },
        { text: "Quarterly and annual SEC filings, many audited", cat: "dis", why: "Costly regulation." },
        { text: "An investor can lose no more than the amount invested", cat: "adv", why: "Limited liability." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Corporation", back: "A legal entity separate and distinct from its owners." },
      { term: "Articles of incorporation", back: "The filing with a Secretary of State that describes a proposed corporation’s purpose and governance." },
      { term: "Charter", back: "The certificate of incorporation issued by the state." },
      { term: "Bylaws", back: "Rules governing the corporation, adopted by shareholders." },
      { term: "Proxy", back: "The shareholder voting ballot." },
      { term: "IPO", back: "Initial public offering: a company’s first sale of stock to the public." },
      { term: "Prospectus", back: "A document giving potential investors detailed information about the company." },
      { term: "Limited liability", back: "Stockholders aren’t liable for company debts beyond their investment." },
      { term: "Double taxation", back: "Corporate profits are taxed, then dividends from them are taxed again to shareholders." },
      { term: "S corporation", back: "A closely held corporation whose income passes through to shareholders, avoiding one level of tax." }
    ]
  },

  quiz: [
    { q: "A corporation is created when the state issues a:", options: ["Bylaw", "Charter", "Proxy", "Prospectus"], answer: 1, why: "The charter (certificate of incorporation) authorizes it." },
    { q: "Corporate officers are appointed by the:", options: ["Shareholders", "Secretary of State", "Board of directors", "SEC"], answer: 2, why: "Shareholders elect the board; the board appoints officers." },
    { q: "Which is an advantage of the corporate form?", options: ["Double taxation", "Limited liability", "SEC reporting", "Unlimited personal liability"], answer: 1, why: "Investors risk only their investment." },
    { q: "A shareholder voting ballot is called a:", options: ["Charter", "Proxy", "Prospectus", "Debenture"], answer: 1, why: "Proxies are used to vote." },
    { q: "An IPO must be accompanied by a:", options: ["Prospectus", "Proxy", "Charter", "W-2"], answer: 0, why: "It details corporate information for investors." },
    { q: "Corporate tax 20%, dividend tax 15%. Of $1,000 earned and fully paid out, the shareholder keeps:", options: ["$650", "$680", "$800", "$850"], answer: 1, why: "$1,000 − $200 = $800; $800 − $120 = $680." },
    { q: "Shareholders of a closely held company may lose limited liability protection if they:", options: ["Vote by proxy", "Commingle personal and company finances", "Receive dividends", "Elect directors"], answer: 1, why: "Failing to keep the corporation separate can expose them." },
    { q: "Perpetual existence means:", options: ["The company can never be merged", "Changes in ownership don’t end the company", "Stock never changes price", "Directors serve for life"], answer: 1, why: "The corporation can outlive its owners." }
  ]
});

/* Lesson 8.1 · The Components of Inventory */
HUB.register("8-1", {
  summary: "Which goods belong in inventory? Manufacturers’ three kinds of inventory, goods in transit under F.O.B. terms, and consigned goods.",
  objectives: [
    "Name the inventories of merchants and manufacturers",
    "Decide whether goods in transit belong in inventory",
    "Identify the consignor and consignee and who reports consigned goods"
  ],
  html: `
<section class="sec" data-toc="Kinds of inventory">
  <div class="eyebrow kind">Concept</div>
  <h2>Merchants and manufacturers</h2>
  <p>A merchant’s inventory is the goods available for resale. Manufacturers have three kinds, all usually <b>current assets</b> (managerial accounting covers manufacturing inventory in detail):</p>
  <div class="grid3">
    <div class="tile"><span class="k">Raw materials</span><p>Goods to be used in making products.</p></div>
    <div class="tile"><span class="k">Work in process</span><p>Products being manufactured but not yet completed.</p></div>
    <div class="tile"><span class="k">Finished goods</span><p>Completed products awaiting sale.</p></div>
  </div>
</section>

<section class="sec" data-toc="Goods in transit">
  <div class="eyebrow kind">Concept</div>
  <h2>Goods in transit belong to whoever owns them</h2>
  <p>F.O.B. terms decide not just who pays freight but who <b>owns</b> goods on the way, and the owner includes them in inventory.</p>
  <div class="grid2">
    <div class="tile"><span class="k">F.O.B. shipping point</span><p>The buyer owns the goods once they ship. At year end, the <b>buyer</b> includes goods still in transit.</p></div>
    <div class="tile alt"><span class="k">F.O.B. destination</span><p>The seller owns the goods until they arrive. The <b>seller</b> includes goods still in transit.</p></div>
  </div>
</section>

<section class="sec" data-toc="Consignment">
  <div class="eyebrow kind">Concept</div>
  <h2>Consigned goods belong to the consignor</h2>
  <p><b>Consigned goods</b> are in one party’s physical custody but owned by another.</p>
  <div class="grid2">
    <div class="tile"><span class="k">Consignor</span><p>Holds legal title. <b>Includes the goods in its inventory.</b></p></div>
    <div class="tile alt"><span class="k">Consignee</span><p>Holds the goods, takes care of them, and tries to sell them. Does <b>not</b> include them in inventory. When it sells one, it keeps part of the price and sends the rest to the consignor.</p></div>
  </div>
  <p>Why consign? An auto parts maker needs its specialized, expensive parts on store shelves, but a retailer can’t afford to stock every variety and fears being stuck with obsolete parts. Consigning solves both problems. The catch is record keeping: the count must separate goods consigned <i>out</i> (included) from goods consigned <i>in</i> (excluded) and track when consigned units actually sell.</p>
  <div class="panel">
    <div class="panel-title"><h3>Is it in our year-end inventory?</h3><span class="hint">“We” are a merchant counting inventory on December 31</span></div>
    <div data-widget="sorter" data-key="inc"></div>
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
    <li><span>Manufacturers hold <b>raw materials</b>, <b>work in process</b>, and <b>finished goods</b>.</span></li>
    <li><span>Goods in transit belong to the legal owner: the buyer under F.O.B. shipping point, the seller under F.O.B. destination.</span></li>
    <li><span>Consigned goods belong in the <b>consignor’s</b> inventory, not the consignee’s.</span></li>
  </ol>
</section>`,

  sorters: {
    inc: {
      categories: [{ id: "y", label: "Include" }, { id: "n", label: "Exclude" }],
      items: [
        { text: "Goods we bought F.O.B. shipping point, still on the truck Dec. 31", cat: "y", why: "Ownership passed to us when they shipped." },
        { text: "Goods we bought F.O.B. destination, still on the truck Dec. 31", cat: "n", why: "The seller owns them until they arrive." },
        { text: "Goods we sold F.O.B. destination, still on the truck Dec. 31", cat: "y", why: "We own them until they reach the customer." },
        { text: "Goods we sold F.O.B. shipping point, shipped Dec. 30", cat: "n", why: "The buyer owns them once shipped." },
        { text: "Another company’s goods on our shelves on consignment", cat: "n", why: "We’re the consignee; the consignor owns them." },
        { text: "Our goods on consignment at a dealer’s store", cat: "y", why: "We’re the consignor and still hold title." }
      ]
    }
  },

  cards: {
    terms: [
      { term: "Raw materials", back: "Goods to be used in manufacturing products." },
      { term: "Work in process", back: "Products being manufactured but not yet complete." },
      { term: "Finished goods", back: "Completed products awaiting sale." },
      { term: "Goods in transit", back: "Goods being shipped; included in the inventory of the party holding legal ownership." },
      { term: "Consignor", back: "The owner of consigned goods; includes them in inventory." },
      { term: "Consignee", back: "The party holding and selling consigned goods; does not include them in inventory." }
    ]
  },

  quiz: [
    { q: "Products partly completed by a manufacturer are:", options: ["Raw materials", "Work in process", "Finished goods", "Supplies"], answer: 1, why: "Being manufactured but not done." },
    { q: "Goods shipped F.O.B. shipping point and in transit at year end belong in the inventory of the:", options: ["Seller", "Buyer", "Carrier", "Neither"], answer: 1, why: "Ownership transfers at shipment." },
    { q: "Goods shipped F.O.B. destination and in transit at year end belong in the inventory of the:", options: ["Seller", "Buyer", "Carrier", "Both"], answer: 0, why: "The seller owns them until arrival." },
    { q: "Consigned goods are included in the inventory of the:", options: ["Consignee", "Consignor", "Both", "End customer"], answer: 1, why: "The consignor holds title." },
    { q: "Why might a manufacturer consign goods to retailers?", options: ["To avoid paying taxes", "Retailers won’t pay for specialized goods unless they sell, but the maker needs them on shelves", "Consignment is required by law", "To reduce sales"], answer: 1, why: "Consignment gets goods into the channel without the retailer bearing the risk." }
  ]
});

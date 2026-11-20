/* Course map for AC-297P-01 Principles of Accounting I.
   Lessons are the reading pages from Canvas. A lesson becomes "ready" when
   a file in /lessons calls HUB.register("<id>", {...}). */
window.HUB = window.HUB || { lessons: {} };

HUB.course = {
  code: "AC-297P-01",
  name: "Principles of Accounting I",
  term: "Spring 2027",
  units: [
    {
      name: "The Accounting Cycle",
      exam: "Accounting Cycle Exam",
      chapters: [
        { n: 1, title: "Welcome to the World of Accounting", lessons: [
          "Accounting Information",
          "Accounting Profession",
          "The Accounting Equation",
          "How Transactions Impact the Equation",
          "Four Core Financial Statements"
        ]},
        { n: 2, title: "Information Processing", lessons: [
          "Accounts, Debits, and Credits",
          "The Journal",
          "The General Ledger",
          "The Trial Balance",
          "Computerized Processing Systems",
          "T-Accounts"
        ]},
        { n: 3, title: "Income Measurement", lessons: [
          "“Measurement Triggering” Transactions and Events",
          "The Periodicity Assumption",
          "Basic Elements of Revenue Recognition",
          "Basic Elements of Expense Recognition",
          "The Adjusting Process and Related Entries",
          "Accrual Versus Cash-Basis Accounting"
        ]},
        { n: 4, title: "The Reporting Cycle", lessons: [
          "Preparing Financial Statements",
          "The Accounting Cycle and Closing Process",
          "Reversing Entries",
          "Classified Balance Sheets",
          "Business Liquidity and the Operating Cycle"
        ]}
      ]
    },
    {
      name: "Current Assets",
      exam: "Current Assets Exam",
      chapters: [
        { n: 5, title: "Special Issues for Merchants", lessons: [
          "The Merchandising Operation: Sales",
          "Purchase Considerations for Merchandising Businesses",
          "Alternative Inventory System",
          "Income Statement Enhancements",
          "The Control Structure"
        ]},
        { n: 6, title: "Cash and Highly Liquid Investments", lessons: [
          "Cash Composition",
          "Cash Management",
          "Bank Reconciliation",
          "Petty Cash",
          "Short-Term Investments"
        ]},
        { n: 7, title: "Accounts Receivable", lessons: [
          "The Costs and Benefits of Selling on Credit",
          "Accounting for Uncollectible Receivables",
          "Allowance Method for Uncollectibles",
          "Notes Receivable"
        ]},
        { n: 8, title: "Inventory", lessons: [
          "The Components of Inventory",
          "Inventory Costing Methods",
          "Perpetual Inventory Systems",
          "Lower of Cost or Net Realizable Value",
          "Inventory Estimation Techniques",
          "Inventory Management"
        ]}
      ]
    },
    {
      name: "Long-term Assets",
      exam: "Long-term Assets Exam",
      chapters: [
        { n: 9, title: "Long-term Investments", lessons: [
          "Nature and Intent-Based Accounting",
          "Debt Securities",
          "Held-to-Maturity Securities",
          "Equity Securities",
          "Investments Requiring Consolidation"
        ]},
        { n: 10, title: "Property, Plant, and Equipment", lessons: [
          "What Costs Are Included in PP&E?",
          "Service Life and Cost Allocation",
          "Depreciation Concepts",
          "Depreciation Methods",
          "Tax Laws",
          "Equipment Leases"
        ]},
        { n: 11, title: "Advanced PP&E Issues, Natural Resources, and Intangibles", lessons: [
          "Costs Subsequent to Asset Acquisition",
          "Disposal of PP&E",
          "Accounting for Asset Exchanges",
          "Asset Impairment",
          "Natural Resources",
          "Intangibles"
        ]}
      ]
    },
    {
      name: "Liabilities and Equity",
      exam: "Liabilities/Equity Exam",
      chapters: [
        { n: 12, title: "Current Liabilities and Employer Obligations", lessons: [
          "Current Liabilities",
          "Notes Payable",
          "Contingent Liabilities",
          "Payroll",
          "Other Components of Employee Compensation"
        ]},
        { n: 13, title: "Long-Term Obligations", lessons: [
          "Long-Term Notes",
          "Bonds Payable",
          "Accounting for Bonds Payable",
          "Effective-Interest Amortization Methods",
          "Bonds Issued Between Interest Dates, Bond Retirements, and Fair Value",
          "Analysis, Commitments, and Leases"
        ]},
        { n: 14, title: "Corporate Equity Accounting", lessons: [
          "The Corporate Form of Organization",
          "Common and Preferred Stock",
          "Treasury Stock",
          "Stock Splits and Stock Dividends",
          "Statement of Stockholders’ Equity"
        ]}
      ]
    }
  ]
};

/* Flatten into an ordered lesson list: { id: "1-1", num: "1.1", title, chapter, unit } */
HUB.order = [];
HUB.course.units.forEach(function (u, ui) {
  u.chapters.forEach(function (c) {
    c.lessons.forEach(function (t, i) {
      HUB.order.push({ id: c.n + "-" + (i + 1), num: c.n + "." + (i + 1), title: t, chapter: c, unit: u, unitIndex: ui });
    });
  });
});

HUB.register = function (id, def) { HUB.lessons[id] = def; };

import { useState } from "react";

const FAQS = [
  {
    q: "Why does the exchange rate vary?",
    a: "Exchange rate fluctuates based on market condition, we update our rate in real-time.",
  },
  {
    q: "Do you charge hidden fees?",
    a: "No, we believe in complete transparency. All fees are clearly displayed before transactions",
  },
  {
    q: "How can I reduce my exchange fees?",
    a: "You can reduce fees by holding VITAL tokens. token holders receive a 50% discount on all transactions.",
  },
  {
    q: "How long does currency exchange take?",
    a: "Most exchanges are processed instantly. Bank transfer typically takes 1-3 business days.",
  },
  {
    q: "What are the minimum and maximum exchange limits?",
    a: "Minimum exchange is $10USD equivalent. minimum limits depends on your account verification.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 px-6 bg-blue-50">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-base">Find the answers you're looking for</p>
        </div>

        {/* FAQ items */}
        <div className="flex flex-col gap-4">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* Question row */}
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors"
              >
                {/* Number badge */}
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>

                {/* Question text */}
                <span className="flex-1 text-gray-900 text-base">
                  {faq.q}
                </span>

                {/* Chevron */}
                <span className="text-gray-400 text-lg flex-shrink-0 transition-transform duration-300"
                  style={{ transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  ⌄
                </span>
              </button>

              {/* Answer */}
              {openIndex === i && (
                <div className="px-6 pb-5 pl-18">
                  <p className="text-gray-500 text-sm leading-relaxed ml-12">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
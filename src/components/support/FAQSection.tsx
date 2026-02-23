"use client";

import { useState } from "react";

const FAQSection = ({ faqs }: { faqs: typeof import("@/constants/faq").faqs }) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6 sm:mb-8 text-center">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg mb-4 overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 cursor-pointer text-left text-sm sm:text-base font-semibold text-gray-800 hover:text-primary transition-all duration-300 flex justify-between items-center"
            >
              {faq.question}
              <svg
                className={`w-5 sm:w-6 h-5 sm:h-6 text-gray-400 transform transition-transform duration-300 ${
                  openFAQ === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              className={`px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-gray-600 transition-all duration-300 ${
                openFAQ === index ? "block" : "hidden"
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;

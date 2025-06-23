import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

const faqs = [
  {
    question: "Is P!CPAC really free?",
    answer:
      "Yes! Everything is 100% free — no bookings, no payments. Just pick a border, strike a pose, and enjoy!",
  },
  {
    question: "Do I need to sign up or create an account?",
    answer:
      "Nope! You can start taking photos right away without logging in or signing up.",
  },
  {
    question: "Can I download my photos?",
    answer:
      "Absolutely! Once you’re done, you can instantly download your picture in high quality.",
  },
  {
    question: "What kind of borders are available?",
    answer:
      "We’ve designed a wide variety — from funky summer vibes to classy minimalist frames. There’s something for everyone!",
  },
  {
    question: "Can I use P!CPAC on my phone?",
    answer:
      "Yes! P!CPAC is mobile-friendly and works great on most modern browsers and devices.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8DBCC7] to-[#6A9CA9] px-4 sm:px-6 py-10 sm:py-16 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 md:p-12 rounded-3xl shadow-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-indigo-600 mb-10 sm:mb-12 drop-shadow-lg">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6 sm:space-y-8">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-gray-200 pb-4 sm:pb-6"
              aria-expanded={openIndex === index}
            >
              <button
                onClick={() => toggle(index)}
                className="flex items-center justify-between w-full text-left focus:outline-none"
                aria-controls={`faq-answer-${index}`}
                aria-expanded={openIndex === index}
              >
                <div className="flex items-center gap-2 sm:gap-3 text-left">
                  <AiOutlineQuestionCircle className="text-indigo-500 text-2xl sm:text-3xl" />
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                    {faq.question}
                  </h2>
                </div>
                <div className="text-indigo-600">
                  {openIndex === index ? (
                    <FiChevronUp size={24} className="sm:size-6" />
                  ) : (
                    <FiChevronDown size={24} className="sm:size-6" />
                  )}
                </div>
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`mt-2 sm:mt-4 text-gray-700 text-base sm:text-lg leading-relaxed transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
                style={{ transitionProperty: 'max-height, opacity' }}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

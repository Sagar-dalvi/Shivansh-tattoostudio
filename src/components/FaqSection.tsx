import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { STUDIO_FAQS, FAQItem } from '../studioConfig';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0714] relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="text-xs uppercase tracking-[0.25em] text-[#ea7af4] font-semibold mb-2">
            Questions & Answers
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base font-light">
            Everything you need to know about our booking process, custom consultations, hygiene protocols, and studio policies.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {STUDIO_FAQS.map((faq: FAQItem, index: number) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#140c1e] border-[#ea7af4]/50 shadow-[0_0_20px_rgba(234,122,244,0.18)]'
                    : 'bg-[#100918] border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white tracking-wide">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#ea7af4] text-white rotate-180'
                        : 'bg-white/5 text-zinc-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pricing Notice */}
        <div className="mt-10 text-center p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-zinc-400 font-light">
          <span className="text-[#ea7af4] font-semibold">Important Pricing Note: </span>
          Pricing depends on size, placement, complexity and design. Contact the studio for a quote.
        </div>
      </div>
    </section>
  );
};

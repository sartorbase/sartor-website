'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { WHATSAPP_LINK } from '../lib/constants';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How do guided video consultations work for overseas clients?",
    answer: "Master Tailor Abdul Ghaffar connects with you 1-on-1 on WhatsApp video call to guide your measurement assistant through our 28-point biometric measurement protocol. We capture posture, scye depth, apex coordinates, and shoulder slope to guarantee a 100% bespoke fit without traveling to Lahore."
  },
  {
    question: "What are your delivery timelines for the UK, USA, Canada, and UAE?",
    answer: "Crafting turnaround ranges from 7–10 business days for bespoke formals and sarees, and 4–8 weeks for intricate hand-embroidered bridal lehengas. Once dispatched, your garment arrives in 3–5 business days via fully tracked, insured DHL Express."
  },
  {
    question: "Do your stitched outfits include margins for future alterations?",
    answer: "Yes, every custom SARTOR garment is constructed with 1.5 to 2.5 inches of finished, overlocked internal seam allowance. This ensures any local tailor in London, Toronto, or New York can easily let out or take in the garment if your measurements fluctuate."
  },
  {
    question: "What is your 4-step milestone payment structure?",
    answer: "We operate with total transparency: 10% token booking to reserve your cutting slot, 30% upon approval of 4K macro video clips of your custom adda handwork swatch, 30% mid-production review of assembled panels, and the final 30% balance only upon video sign-off of your finished outfit on our dress form before DHL dispatch."
  }
];

export const HomeFAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-stone-950 border-b border-stone-850">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
            Bespoke Tailoring &amp; Overseas Shipping FAQs
          </h2>
          <p className="mt-2 text-stone-400 text-xs sm:text-sm">
            Everything you need to know about our Model Town atelier craftsmanship and global DHL delivery.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-stone-900/60 border border-stone-800 transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 text-sm font-semibold text-stone-200 hover:text-amber-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-stone-300 leading-relaxed border-t border-stone-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <a
            href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Assalam-o-Alaikum Master Tailor Abdul Ghaffar, I have a custom tailoring inquiry.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Have a specific question? Ask Master Tailor Abdul Ghaffar on WhatsApp &rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQSection;

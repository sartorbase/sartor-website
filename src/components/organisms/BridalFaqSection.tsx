import React, { useEffect, useMemo, useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  BookOpen,
  ArrowUpRight,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  AggregatedBridalFaq,
  BridalFaqTopic,
  buildHomepageFaqPageSchema,
  getTopHomepageBridalFaqs,
} from '../../seo/faqAggregator';
import { navigateTo } from '../../utils/navigation';
import { buildWhatsAppLink } from '../../services/analytics';
import { SITE_CONFIG } from '../../config/site';

export const HOMEPAGE_FAQ_SCHEMA_SCRIPT_ID = 'homepage-faq-schema';

const TOPIC_FILTERS: Array<'All Topics' | BridalFaqTopic> = [
  'All Topics',
  'Remote Fitting & Escrow',
  'Velvet, Silk & Textiles',
  'Fit, Boning & Waistbands',
  'Zardozi & Embroidery',
  'Pricing & Global Shipping',
];

export const BridalFaqSection: React.FC = () => {
  const topBridalFaqs = useMemo<AggregatedBridalFaq[]>(() => getTopHomepageBridalFaqs(8), []);
  const [activeTopic, setActiveTopic] = useState<'All Topics' | BridalFaqTopic>('All Topics');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    topBridalFaqs.slice(0, 2).forEach((faq) => {
      initial[faq.id] = true;
    });
    return initial;
  });

  const visibleFaqs = useMemo(() => {
    if (activeTopic === 'All Topics') return topBridalFaqs;
    return topBridalFaqs.filter((faq) => faq.topic === activeTopic);
  }, [activeTopic, topBridalFaqs]);

  // Keep FAQPage JSON-LD synchronized in document.head with the exact top bridal Q&As rendered on /
  useEffect(() => {
    if (typeof document === 'undefined' || topBridalFaqs.length === 0) return;

    const schemaPayload = JSON.stringify(buildHomepageFaqPageSchema(topBridalFaqs));
    let scriptEl = document.getElementById(HOMEPAGE_FAQ_SCHEMA_SCRIPT_ID) as HTMLScriptElement | null;

    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = HOMEPAGE_FAQ_SCHEMA_SCRIPT_ID;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    if (scriptEl.textContent !== schemaPayload) {
      scriptEl.textContent = schemaPayload;
    }

    return () => {
      const existing = document.getElementById(HOMEPAGE_FAQ_SCHEMA_SCRIPT_ID);
      if (existing) {
        existing.remove();
      }
    };
  }, [topBridalFaqs]);

  const toggleItem = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const whatsappBookingUrl = buildWhatsAppLink(
    `Assalam-o-Alaikum Master Tailor Abdul Ghaffar,
I reviewed the SARTOR Bridal Engineering FAQs and would like to schedule a 28-point remote bridal measurement call.`,
    'homepage_bridal_faq_cta'
  );

  return (
    <section
      id="bridal-faq"
      aria-labelledby="bridal-faq-heading"
      className="py-20 bg-stone-950 text-stone-100 border-b border-stone-850"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 mb-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            Programmatic Couture Grounding &bull; {topBridalFaqs.length} Verified Answers
          </span>
          <h2
            id="bridal-faq-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-100 tracking-tight"
          >
            Bridal Tailoring Engineering FAQs
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
            Direct technical answers curated from Master Tailor Abdul Ghaffar&apos;s Lahore bridal
            masterclasses—covering 28-point remote fittings, Micro-Velvet 9000 vs. pure silk velvet,
            boned choli architecture, 10/30/30/30 escrow milestones, and insured DHL delivery.
          </p>
        </div>

        {/* Topic Filter Bar */}
        <div
          role="tablist"
          aria-label="Filter bridal tailoring FAQs by engineering topic"
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
        >
          {TOPIC_FILTERS.map((topic) => {
            const count =
              topic === 'All Topics'
                ? topBridalFaqs.length
                : topBridalFaqs.filter((f) => f.topic === topic).length;
            if (topic !== 'All Topics' && count === 0) return null;
            const isActive = activeTopic === topic;

            return (
              <button
                key={topic}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTopic(topic)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/15 border-amber-500/60 text-amber-300 shadow-sm shadow-amber-950/30'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                }`}
              >
                {topic} ({count})
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion Cards */}
        <div className="space-y-4">
          {visibleFaqs.map((faq, idx) => {
            const isOpen = !!expandedIds[faq.id];
            const panelId = `bridal-faq-panel-${faq.id}`;
            const buttonId = `bridal-faq-trigger-${faq.id}`;

            return (
              <article
                key={faq.id}
                className={`rounded-2xl border transition-colors ${
                  isOpen
                    ? 'bg-stone-900/95 border-amber-500/40 shadow-lg shadow-stone-950/50'
                    : 'bg-stone-900/70 border-stone-800 hover:border-stone-700'
                }`}
              >
                <h3 className="text-base sm:text-lg font-serif font-semibold text-stone-100">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-amber-400">
                        <span>0{idx + 1}</span>
                        <span className="text-stone-600">&bull;</span>
                        <span>{faq.topic}</span>
                      </div>
                      <span className="block text-stone-100 leading-snug">{faq.question}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-400 shrink-0 mt-1 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={isOpen ? 'px-5 sm:px-6 pb-5 pt-0 block' : 'hidden'}
                >
                  <p className="text-stone-300 text-sm sm:text-base leading-relaxed border-t border-stone-800/80 pt-4">
                    {faq.answer}
                  </p>
                  <div className="mt-4 pt-3 border-t border-stone-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-stone-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Verified by Master Tailor Abdul Ghaffar &bull; Model Town, Lahore</span>
                    </span>
                    <a
                      href={`/blog/${faq.sourceSlug}`}
                      onClick={(e) => navigateTo(`/blog/${faq.sourceSlug}`, e)}
                      className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span className="line-clamp-1 max-w-[260px] sm:max-w-xs">
                        Read Masterclass: {faq.sourceTitle}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Grounding & Portal CTA Bar */}
        <div className="mt-10 p-6 sm:p-7 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pre-Beta Digital Measurement Portal &bull; 10/30/30/30 Milestone Protection</span>
            </div>
            <p className="text-stone-200 text-sm sm:text-base font-medium">
              Ready to lock your 28-point bridal sizing profile or inspect ivory, burgundy, and
              emerald rolls live from {SITE_CONFIG.address.locality}, {SITE_CONFIG.address.city}?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={SITE_CONFIG.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <span>Log Measurements at app.sartor.pk</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={whatsappBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-950/40"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Book Video Consultation</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BridalFaqSection;

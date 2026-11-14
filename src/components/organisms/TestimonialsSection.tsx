import React, { useEffect, useMemo, useState } from 'react';
import {
  Star,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';
import { SectionHeading } from '../atoms/SectionHeading';
import { TestimonialCard } from '../molecules/TestimonialCard';
import { buildWhatsAppLink } from '../../services/analytics';
import { SITE_CONFIG } from '../../config/site';
import {
  buildLahoreReviewSchema,
  getLahoreReviewSummary,
  LAHORE_REVIEW_SCHEMA_ID,
} from '../../seo/reviewSchema';

type FilterCategory = 'all' | 'bridal' | 'saree' | 'pret';

export const TestimonialsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const summary = useMemo(() => getLahoreReviewSummary(TESTIMONIALS), []);

  // Programmatically inject & sync LocalBusiness Review + AggregateRating JSON-LD on homepage
  useEffect(() => {
    if (typeof document === 'undefined' || TESTIMONIALS.length === 0) return;

    const payload = JSON.stringify(buildLahoreReviewSchema(TESTIMONIALS));
    let scriptEl = document.getElementById(LAHORE_REVIEW_SCHEMA_ID) as HTMLScriptElement | null;

    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = LAHORE_REVIEW_SCHEMA_ID;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    if (scriptEl.textContent !== payload) {
      scriptEl.textContent = payload;
    }

    return () => {
      const existing = document.getElementById(LAHORE_REVIEW_SCHEMA_ID);
      if (existing) {
        existing.remove();
      }
    };
  }, []);

  const filteredTestimonials = useMemo(() => {
    return TESTIMONIALS.filter((item) => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'bridal') {
        return (
          item.suitCrafted.toLowerCase().includes('lehenga') ||
          item.suitCrafted.toLowerCase().includes('bridal') ||
          item.title.toLowerCase().includes('bride')
        );
      }
      if (activeFilter === 'saree') {
        return (
          item.suitCrafted.toLowerCase().includes('saree') ||
          item.suitCrafted.toLowerCase().includes('sarhi') ||
          item.suitCrafted.toLowerCase().includes('kalidar')
        );
      }
      if (activeFilter === 'pret') {
        return (
          item.suitCrafted.toLowerCase().includes('pret') ||
          item.suitCrafted.toLowerCase().includes('suit') ||
          item.suitCrafted.toLowerCase().includes('kurti')
        );
      }
      return true;
    });
  }, [activeFilter]);

  return (
    <section
      id="testimonials"
      aria-labelledby="lahore-reviews-heading"
      className="py-16 sm:py-20 bg-stone-900/40 border-b border-stone-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Programmatic AggregateRating Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex flex-wrap items-center justify-center gap-2.5 px-4 py-2 rounded-full bg-stone-900 border border-amber-500/40 shadow-lg shadow-amber-950/20 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-0.5" aria-label={`Rated ${summary.averageRating} out of 5`}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </span>
            <span className="font-bold text-stone-100 tracking-tight">
              {summary.averageRating.toFixed(2)} / 5.0 Verified Atelier Rating ({summary.reviewCount} Reviews)
            </span>
            <span className="hidden sm:inline text-stone-600">&bull;</span>
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Model Town, Lahore Studio &amp; Overseas Diaspora</span>
            </span>
          </div>
        </div>

        <SectionHeading
          badge="Verified Atelier Reviews"
          title="Authentic Client Reviews from Lahore & Overseas"
          subtitle="Programmatically grounded client ratings from bridal lehenga trials, padded saree blouses, 16-kali kalidars, and remote diaspora orders coordinated from Moon Tower, Model Town, Lahore."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'all', label: `All Verified Reviews (${TESTIMONIALS.length})` },
            { id: 'bridal', label: 'Bridal & Lehengas' },
            { id: 'saree', label: 'Sarees & Kalidars' },
            { id: 'pret', label: 'Pret & Designer Suits' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id as FilterCategory)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-stone-900/80 text-stone-400 hover:text-stone-200 border border-stone-800 hover:border-stone-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Review Cards Grid (1:1 parity with LocalBusiness ReviewSchema) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* High Conversion WhatsApp Consultation Card */}
        <div className="mt-8 text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 border border-stone-800 max-w-2xl mx-auto shadow-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-600/40 text-xs font-semibold mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Guaranteed Custom Fit &bull; 2-Inch Seam Margins &bull; Free Lahore Pickup</span>
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-100 mb-2">
            Commission Your Outfit with Master Tailor Abdul Ghaffar
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 mb-5 max-w-lg mx-auto">
            Book complimentary doorstep fabric pickup across Lahore or schedule a live 28-point digital video measurement session from the UK, USA, Canada, or UAE.
          </p>
          <a
            href={buildWhatsAppLink(
              'Assalam-o-Alaikum SARTOR Atelier,\nI was reading your verified client reviews and would like to book a bespoke tailoring consultation.\nPlease guide me on doorstep fabric pickup in Lahore or remote video sizing.',
              'contact'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-950/50 border border-emerald-400/40 transition-all active:scale-95 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-current shrink-0" />
            <span>Book Consultation on WhatsApp ({SITE_CONFIG.whatsapp.local})</span>
          </a>
        </div>
      </div>
    </section>
  );
};

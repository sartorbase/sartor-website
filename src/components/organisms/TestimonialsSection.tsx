import React, { useState } from 'react';
import { Star, ShieldCheck, Sparkles, CheckCircle2, Clock, MapPin, Quote, MessageSquare } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';
import { SectionHeading } from '../atoms/SectionHeading';
import { TestimonialCard } from '../molecules/TestimonialCard';
import { buildWhatsAppLink } from '../../services/analytics';

type FilterCategory = 'featured' | 'all' | 'bridal' | 'saree' | 'pret';

// 3 quick customer testimonials focused specifically on fitting quality and timely delivery
const SPOTLIGHT_REVIEWS = [
  {
    id: 'spotlight-1',
    clientName: 'Dr. Mahnoor Malik',
    title: 'Consultant Physician',
    location: 'Model Town Block C, Lahore',
    suitCrafted: 'Banarsi Saree & Padded Sweetheart Blouse (PKR 7,000)',
    focusTag: 'Fitting Quality',
    quote:
      'Finding decent saree tailoring in Lahore is always a gamble — usually blouses either gape at the back or slip off the shoulders. SARTOR added secure inner bra-strap fasteners and hook loops that stayed in place all evening. The fall and piko were spotless.',
    highlight: 'Zero shoulder slip, secure inner loops & flawless blouse contour',
    rating: 5.0,
    turnaround: '6-day turnaround',
  },
  {
    id: 'spotlight-2',
    clientName: 'Fatima Elahi',
    title: 'Overseas Client (UK & Cantt)',
    location: 'Manchester / Lahore Cantt',
    suitCrafted: 'Wardrobe of 4 Luxury Pret Suits (Organza & Lawn)',
    focusTag: 'Timely Delivery',
    quote:
      'I only had 10 days in Lahore for my cousin’s wedding. Sent measurements over WhatsApp before flying out. 3 suits fit perfectly straight away; one trouser hem was adjusted and returned the very next day. Saved me from fighting with neighborhood tailors.',
    highlight: 'Delivered in 5 days; alteration returned within 24 hours',
    rating: 4.9,
    turnaround: '5-day turnaround',
  },
  {
    id: 'spotlight-3',
    clientName: 'Ayesha Raza',
    title: 'Bride (Barat Ceremony)',
    location: 'DHA Phase 5, Lahore',
    suitCrafted: 'Micro-Velvet Bridal Lehenga Choli & Double Dupatta (PKR 10,000)',
    focusTag: 'Fitting Quality & Punctuality',
    quote:
      'I was anxious about my Barat lehenga because heavy micro-velvet is notorious for pulling. Master alter the choli waist in 30 minutes in their Moon Tower lounge. The can-can flare was balanced and comfortable to walk in for 6 hours. Delivered right on schedule.',
    highlight: '30-minute in-studio waist adjustment & balanced can-can flare',
    rating: 5.0,
    turnaround: 'Delivered before event date',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('featured');

  const filteredTestimonials = TESTIMONIALS.filter((item) => {
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

  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-stone-900/40 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Google Review Badge Banner */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900 border border-amber-500/40 shadow-lg shadow-amber-950/20 text-xs sm:text-sm">
            <span className="flex items-center text-amber-400 text-base sm:text-lg">★</span>
            <span className="font-bold text-stone-100 tracking-tight">
              ★ 4.8 Rating on Google (Model Town, Lahore)
            </span>
            <span className="hidden sm:inline text-stone-500">|</span>
            <span className="hidden sm:inline text-emerald-400 font-semibold text-xs">
              100% Verified Fitting Quality &amp; On-Time Delivery
            </span>
          </div>
        </div>

        <SectionHeading
          badge="Social Proof & Fitting Trials"
          title="Authentic Client Reviews from Across Lahore"
          subtitle="Real feedback from bridal lehenga trials, padded saree blouses, kalidar hems, and door-to-door deliveries in Model Town, DHA, Gulberg, and Cantt."
        />

        {/* 3 Quick Spotlight Customer Testimonials Focused on Fitting Quality & Timely Delivery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {SPOTLIGHT_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="flex flex-col justify-between bg-stone-900/90 border border-stone-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-300 shadow-md relative group"
            >
              <div>
                {/* Header with Star Rating & Focus Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="ml-1 text-xs font-mono font-bold text-amber-400">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-600/40 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                    {review.focusTag}
                  </span>
                </div>

                {/* Review Quote */}
                <p className="text-stone-200 text-xs sm:text-sm leading-relaxed mb-4">
                  “{review.quote}”
                </p>

                {/* Specific Experience Highlight */}
                <div className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800/80 text-[11px] text-amber-300 font-medium mb-4">
                  <span className="text-amber-500 font-bold mr-1">✓ Highlight:</span>
                  {review.highlight}
                </div>

                {/* Outfit Info */}
                <div className="text-[11px] text-stone-400 pb-3 border-b border-stone-800/80">
                  <span className="text-stone-300 font-medium">Outfit:</span> {review.suitCrafted}
                </div>
              </div>

              {/* Client Info & Turnaround */}
              <div className="mt-4 flex items-center justify-between gap-2 pt-1 text-xs">
                <div>
                  <div className="flex items-center gap-1 font-semibold text-stone-100">
                    <span>{review.clientName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  </div>
                  <span className="text-[11px] text-stone-400">{review.location}</span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-amber-400 font-mono">
                  <Clock className="w-3 h-3 text-stone-400" />
                  <span>{review.turnaround}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More / Toggle All Reviews */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'featured', label: 'Top 3 Highlights' },
              { id: 'all', label: 'All Reviews (6)' },
              { id: 'bridal', label: 'Bridal & Lehengas' },
              { id: 'saree', label: 'Sarees & Blouses' },
              { id: 'pret', label: 'Everyday Pret & Suits' },
            ].map((tab) => (
              <button
                key={tab.id}
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

          {activeFilter !== 'featured' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full animate-in fade-in duration-300">
              {filteredTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          )}
        </div>

        {/* High Conversion WhatsApp Consultation Card */}
        <div className="mt-8 text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 border border-stone-800 max-w-2xl mx-auto shadow-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-600/40 text-xs font-semibold mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Guaranteed Perfect Fitting or Free Immediate Adjustment</span>
          </div>
          <h4 className="font-serif text-lg sm:text-xl font-bold text-stone-100 mb-2">
            Experience Lahore's Best Women's Tailoring
          </h4>
          <p className="text-xs sm:text-sm text-stone-300 mb-5 max-w-lg mx-auto">
            Book door-to-door fabric pickup in Lahore or schedule a private fitting at our Moon Tower Model Town atelier.
          </p>
          <a
            href={buildWhatsAppLink(
              'Assalam-o-Alaikum SARTOR Atelier,\nI was reading your customer reviews and would like to book a bespoke tailoring consultation.\nPlease guide me on doorstep fabric pickup in Lahore and stitching timeframes.',
              'contact'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-950/50 border border-emerald-400/40 transition-all active:scale-95 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-current shrink-0" />
            <span>Book Order on WhatsApp (0335-2209991)</span>
          </a>
        </div>

      </div>
    </section>
  );
};

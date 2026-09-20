import React, { useState } from 'react';
import { Star, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';
import { SectionHeading } from '../atoms/SectionHeading';
import { TestimonialCard } from '../molecules/TestimonialCard';
import { WhatsAppButton } from '../molecules/WhatsAppButton';

type FilterCategory = 'all' | 'bridal' | 'saree' | 'pret';

export const TestimonialsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

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
        <SectionHeading
          badge="Client Endorsements & Trials"
          title="Real Experiences from Fittings Across Lahore"
          subtitle="Honest notes from bridal lehenga trials, padded saree blouses, kalidar hems, and everyday suits across DHA, Model Town, Gulberg, and overseas clients."
        />

        {/* Realistic Credibility Overview */}
        <div className="max-w-3xl mx-auto mb-10 p-5 rounded-2xl bg-stone-900/90 border border-stone-800/90 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-stone-800">
          <div className="pt-2 sm:pt-0">
            <div className="flex items-center justify-center gap-1.5 text-2xl font-bold font-mono text-amber-600">
              <span>4.85</span>
              <span className="text-stone-400 text-sm font-sans font-normal">/ 5.0</span>
            </div>
            <div className="flex items-center justify-center gap-0.5 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i === 4
                      ? 'fill-amber-500/70 text-amber-500'
                      : 'fill-amber-500 text-amber-500'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-stone-400 mt-1 block">
              Based on 340+ Client Orders
            </span>
          </div>

          <div className="pt-3 sm:pt-0">
            <div className="text-2xl font-bold font-mono text-stone-100">98.4%</div>
            <div className="flex items-center justify-center gap-1 mt-1 text-[11px] text-emerald-600 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>First-Trial Fit Rate</span>
            </div>
            <span className="text-[11px] text-stone-400 mt-1 block">
              Free in-studio adjustment if needed
            </span>
          </div>

          <div className="pt-3 sm:pt-0">
            <div className="text-2xl font-bold font-mono text-stone-100">PKR 2.5k–10k</div>
            <div className="flex items-center justify-center gap-1 mt-1 text-[11px] text-stone-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Upfront Pricing</span>
            </div>
            <span className="text-[11px] text-stone-400 mt-1 block">
              Zero hidden finishing charges
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Reviews (6)' },
            { id: 'bridal', label: 'Bridal & Ceremonial' },
            { id: 'saree', label: 'Sarees & Kalidars' },
            { id: 'pret', label: 'Pret & Double Suits' },
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Real Fitting & Inquiry Consultation Banner */}
        <div className="mt-12 text-center p-6 sm:p-8 rounded-2xl bg-stone-900/80 border border-stone-800 max-w-2xl mx-auto shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/40 text-amber-600 border border-amber-800/30 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Studio Trials at Moon Tower</span>
          </div>
          <h4 className="font-serif text-lg font-bold text-stone-100 mb-1.5">
            Want to Discuss Fabric Yardage or Try a Fitting?
          </h4>
          <p className="text-xs sm:text-sm text-stone-400 mb-5 max-w-lg mx-auto">
            Visit our Moon Tower atelier in Model Town for a private consultation, or send us your fabric photos and measurements on WhatsApp.
          </p>
          <WhatsAppButton
            channel="hero"
            label="Chat with Master Tailor on WhatsApp"
            variant="whatsapp"
            size="md"
            message="Assalam-o-Alaikum SARTOR, I would like to inquire about stitching rates and schedule a fitting consultation."
          />
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';
import { SectionHeading } from '../atoms/SectionHeading';
import { TestimonialCard } from '../molecules/TestimonialCard';
import { WhatsAppButton } from '../molecules/WhatsAppButton';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-stone-900/40 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          badge="Client Endorsements"
          title="Endorsed by Discerning Women Across Lahore"
          subtitle="From bridal lehenga ensembles and pleated designer sarees in DHA & Gulberg to festive wardrobes for overseas Pakistanis, experience what our clients say about SARTOR’s master atelier."
        />

        {/* Aggregate Credibility Bar */}
        <div className="max-w-xl mx-auto mb-12 p-4 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-around text-center">
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400">5.0 / 5.0</div>
            <div className="flex items-center justify-center gap-0.5 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[11px] text-stone-400 mt-1 block">Atelier Rating</span>
          </div>
          <div className="h-8 w-px bg-stone-800" />
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-stone-100">1,800+</div>
            <span className="text-[11px] text-stone-400 mt-1 block">Outfits Tailored</span>
          </div>
          <div className="h-8 w-px bg-stone-800" />
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">100%</div>
            <span className="text-[11px] text-stone-400 mt-1 block">Bespoke Guarantee</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Bridal & Festive Consultation Prompt */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-stone-900/60 border border-stone-800 max-w-2xl mx-auto">
          <h4 className="font-serif text-lg font-bold text-stone-100 mb-1">
            Planning a Wedding or Festive Occasion in Lahore?
          </h4>
          <p className="text-xs sm:text-sm text-stone-400 mb-4">
            Book a private fitting session at our Moon Tower studio or request doorstep fabric pickup anywhere in Lahore.
          </p>
          <WhatsAppButton
            channel="hero"
            label="Book Bridal & Festive Fitting on WhatsApp"
            variant="whatsapp"
            size="md"
            message="Assalam-o-Alaikum SARTOR, I am planning for an upcoming wedding in Lahore and would like to schedule a bridal or festive stitching consultation."
          />
        </div>

      </div>
    </section>
  );
};

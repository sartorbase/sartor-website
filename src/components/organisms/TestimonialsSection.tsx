import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';
import { SectionHeading } from '../atoms/SectionHeading';
import { TestimonialCard } from '../molecules/TestimonialCard';
import { WhatsAppButton } from '../molecules/WhatsAppButton';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-stone-900/40 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          badge="Distinguished Clientele"
          title="Endorsed by Gentlemen of Distinction"
          subtitle="From high court advocates and wedding grooms in DHA & Gulberg to overseas Pakistani connoisseurs, hear what our clients say about SARTOR’s bespoke craftsmanship."
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
            <span className="text-[11px] text-stone-400 mt-1 block">Bespoke Rating</span>
          </div>
          <div className="h-8 w-px bg-stone-800" />
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-stone-100">1,200+</div>
            <span className="text-[11px] text-stone-400 mt-1 block">Custom Suits Crafted</span>
          </div>
          <div className="h-8 w-px bg-stone-800" />
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">100%</div>
            <span className="text-[11px] text-stone-400 mt-1 block">Fit Guarantee</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Wedding Groom Consultation Prompt */}
        <div className="mt-14 text-center">
          <p className="text-xs sm:text-sm text-stone-400 mb-4">
            Planning your wedding in Lahore? Book a dedicated groom styling consultation with Master Tailor.
          </p>
          <WhatsAppButton
            channel="hero"
            label="Inquire Groom Wedding Packages on WhatsApp"
            variant="whatsapp"
            size="md"
            message="Hello SARTOR, I am planning my wedding in Lahore and would like to schedule a private groom consultation for sherwani and tuxedo."
          />
        </div>

      </div>
    </section>
  );
};

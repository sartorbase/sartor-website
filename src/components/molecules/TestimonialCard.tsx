import React from 'react';
import { CheckCircle2, MapPin, Quote, Star } from 'lucide-react';
import { Testimonial } from '../../types';

export interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div
      id={`testimonial-card-${testimonial.id}`}
      className="flex flex-col justify-between bg-stone-900/80 border border-stone-800 rounded-xl p-6 hover:border-stone-700 transition-colors shadow-lg relative group"
    >
      <div className="absolute top-6 right-6 text-stone-800 group-hover:text-amber-900/40 transition-colors">
        <Quote className="w-10 h-10 opacity-30" />
      </div>

      <div>
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
          <span className="ml-2 text-xs font-semibold text-stone-400">5.0 Certified</span>
        </div>

        {/* Quote text */}
        <p className="text-stone-300 text-sm leading-relaxed italic relative z-10">
          "{testimonial.quote}"
        </p>

        {/* Suit Crafted Tag */}
        <div className="mt-4 inline-block text-[11px] font-medium text-amber-400 bg-amber-950/40 border border-amber-900/40 px-2.5 py-1 rounded">
          Crafted: {testimonial.suitCrafted}
        </div>
      </div>

      {/* Client Meta */}
      <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="font-serif text-sm font-semibold text-stone-100">
              {testimonial.clientName}
            </h4>
            {testimonial.verified && (
              <span title="Verified SARTOR Client">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </span>
            )}
          </div>
          <p className="text-xs text-stone-400">{testimonial.title}</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-stone-500 font-medium">
          <MapPin className="w-3.5 h-3.5 text-stone-400" />
          <span>{testimonial.location}</span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { CheckCircle2, Clock, MapPin, Quote, Star, Tag } from 'lucide-react';
import { Testimonial } from '../../types';

export interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const fullStars = Math.floor(testimonial.rating);
  const hasHalfStar = testimonial.rating % 1 !== 0;

  return (
    <div
      id={`testimonial-card-${testimonial.id}`}
      className="flex flex-col justify-between bg-stone-900/90 border border-stone-800/90 rounded-2xl p-6 hover:border-stone-700/80 transition-all duration-300 shadow-sm relative group"
    >
      <div className="absolute top-6 right-6 text-stone-700/30 group-hover:text-amber-800/30 transition-colors pointer-events-none">
        <Quote className="w-8 h-8" />
      </div>

      <div>
        {/* Rating Header & Service Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(fullStars)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            ))}
            {hasHalfStar && (
              <div className="relative w-3.5 h-3.5">
                <Star className="w-3.5 h-3.5 text-stone-400/50" />
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                </div>
              </div>
            )}
            <span className="ml-1.5 text-xs font-mono font-semibold text-amber-600">
              {testimonial.rating.toFixed(1)}
            </span>
          </div>

          {testimonial.orderType && (
            <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-stone-800/80 text-stone-300 border border-stone-700/50">
              {testimonial.orderType}
            </span>
          )}
        </div>

        {/* Realistic Review Quote */}
        <p className="text-stone-300 text-sm leading-relaxed relative z-10 font-normal">
          “{testimonial.quote}”
        </p>

        {/* Practical Experience Highlight */}
        {testimonial.experienceHighlight && (
          <div className="mt-3.5 flex items-center gap-1.5 text-[11px] text-amber-700 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />
            <span>Note: {testimonial.experienceHighlight}</span>
          </div>
        )}

        {/* Suit Crafted Tag */}
        <div className="mt-4 pt-3 border-t border-stone-800/60 flex items-start gap-1.5 text-[11px] text-stone-400">
          <Tag className="w-3 h-3 text-stone-500 mt-0.5 flex-shrink-0" />
          <span className="line-clamp-2">
            <strong className="text-stone-300 font-medium">Attire:</strong> {testimonial.suitCrafted}
          </span>
        </div>
      </div>

      {/* Client Meta Footer */}
      <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="font-serif text-sm font-semibold text-stone-100">
              {testimonial.clientName}
            </h4>
            {testimonial.verified && (
              <span title="Verified Client Order & Fitting in Lahore">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              </span>
            )}
          </div>
          <p className="text-[11px] text-stone-400">{testimonial.title}</p>
        </div>

        <div className="text-right flex flex-col items-end gap-0.5">
          <div className="flex items-center gap-1 text-[11px] text-stone-400 font-medium">
            <MapPin className="w-3 h-3 text-stone-500" />
            <span>{testimonial.location}</span>
          </div>
          {testimonial.turnaroundDays && (
            <div className="flex items-center gap-1 text-[10px] text-stone-500 font-mono">
              <Clock className="w-2.5 h-2.5" />
              <span>{testimonial.turnaroundDays}-day turnaround</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

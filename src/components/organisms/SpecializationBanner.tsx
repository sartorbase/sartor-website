import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Scissors, Crown, Truck, CheckCircle2 } from 'lucide-react';

export const SpecializationBanner: React.FC = () => {
  return (
    <section
      id="specialization"
      aria-label="Atelier Specialization"
      className="relative bg-gradient-to-r from-stone-950 via-amber-950/40 to-stone-950 border-y border-amber-500/30 py-8 px-4 sm:px-8 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-left">
          {/* Distinct Specialization Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-bold uppercase tracking-widest shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Specialization</span>
          </div>

          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-serif font-bold text-stone-100 tracking-tight">
              Exclusively Crafting Bespoke Women's Fashion &amp; Online Tailoring Services in Lahore &amp; Nationwide.
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 font-sans">
              Dedicated 100% to female haute couture, designer lawn suites, pleated sarees, festive maxis, and royal bridal lehengas.
            </p>
          </div>
        </div>

        {/* 4 Core Pillars matching Schema.org */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full md:w-auto shrink-0 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900/90 border border-stone-800 text-stone-200">
            <Scissors className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs">Bespoke Couture</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900/90 border border-stone-800 text-stone-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs">Saree &amp; Blouse</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900/90 border border-stone-800 text-stone-200">
            <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs">Bridal Lehengas</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900/90 border border-stone-800 text-stone-200">
            <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs">Nationwide Pickup</span>
          </div>
        </div>
      </div>
    </section>
  );
};

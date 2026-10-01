import React from 'react';
import { ShieldCheck, Ruler, Scissors, Truck, Award, Sparkles } from 'lucide-react';

export const SpecializationBanner: React.FC = () => {
  const highlights = [
    {
      icon: Ruler,
      title: '1.5–2.0 Inch Seam Margin',
      description: 'Generous internal alteration allowance preserved on every side seam. Never get locked out of your favorite dress.',
    },
    {
      icon: Scissors,
      title: 'Radial Kalidar Curves',
      description: 'Pattern-drafted 16-kali kalidars and sarees cut on graduated geometric curves, avoiding front-hem sag.',
    },
    {
      icon: ShieldCheck,
      title: 'Anti-Curl Interfacing',
      description: 'Micro-woven fusible interfacings shaped to the collarbone. Never stiff cardboard that blisters in wash.',
    },
    {
      icon: Truck,
      title: 'Doorstep Lahore Pickup',
      description: 'Complimentary doorstep fabric pickup & delivery across Model Town, DHA, Gulberg, Johar Town, and Cantt.',
    },
  ];

  return (
    <section className="py-12 bg-stone-900/80 border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 mb-2">
            <Award className="w-4 h-4 text-amber-400" />
            The Master Atelier Standard
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
            Tailoring Discipline, Not Bazaar Gambles
          </h2>
          <p className="mt-2 text-stone-300 text-sm sm:text-base leading-relaxed">
            Every garment tailored at SARTOR is drafted with pattern-cutting rigor, grainline respect, and meticulous finishing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-stone-850/70 border border-stone-800 hover:border-amber-500/40 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-stone-100 text-base mb-2 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

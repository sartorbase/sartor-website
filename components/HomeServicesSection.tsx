import React from 'react';
import { ArrowRight } from 'lucide-react';

export const HomeServicesSection: React.FC = () => {
  return (
    <section className="py-16 bg-stone-900/40 border-b border-stone-850">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-amber-400 font-mono text-xs uppercase tracking-wider font-semibold">
              Bespoke Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 mt-1">
              Precision Women&apos;s Tailoring in Model Town, Lahore
            </h2>
          </div>
          <a
            href="/services"
            className="text-amber-400 hover:text-amber-300 text-sm font-semibold flex items-center gap-1.5 mt-2 md:mt-0"
          >
            <span>View Full Services &amp; Pricing Directory</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-amber-400 font-semibold uppercase">High Couture</span>
              <h3 className="text-xl font-serif font-bold text-stone-100 mt-1">
                Custom Bridal Lehengas &amp; Ghararas
              </h3>
              <p className="text-stone-300 text-sm mt-3 leading-relaxed">
                Authentic hand-embroidered Zardozi, kora, dabka, and marori on pure 80g/100g raw silk. Structured 3-tier canvas waistband suspension and custom flare.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
              <span className="text-stone-400 text-xs font-mono">Bespoke from $2,000+</span>
              <a href="/custom-bridal" className="text-amber-400 text-xs font-semibold hover:underline">
                Bridal Suite &rarr;
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-amber-400 font-semibold uppercase">Heritage Drapes</span>
              <h3 className="text-xl font-serif font-bold text-stone-100 mt-1">
                Saree Stitching &amp; Fall Finishing
              </h3>
              <p className="text-stone-300 text-sm mt-3 leading-relaxed">
                Tailor-fitted blouses with bra-cup structuring, back tie-ups, seamless cotton falls, and pico edging. Perfect drape for organza, silk, and banarsi sarees.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
              <span className="text-stone-400 text-xs font-mono">Local &amp; Overseas Delivery</span>
              <a href="/services" className="text-amber-400 text-xs font-semibold hover:underline">
                View Rates &rarr;
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-amber-400 font-semibold uppercase">Festive Pret</span>
              <h3 className="text-xl font-serif font-bold text-stone-100 mt-1">
                16-Kali Kalidars &amp; Luxury Suits
              </h3>
              <p className="text-stone-300 text-sm mt-3 leading-relaxed">
                Flawless panel alignment, bias-cut flare, pure malmal slip linings, and hand-embroidered necklines. Crafted to accentuate grace without bulk.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
              <span className="text-stone-400 text-xs font-mono">Free Lahore Pickup</span>
              <a href="/services" className="text-amber-400 text-xs font-semibold hover:underline">
                Explore Designs &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeServicesSection;

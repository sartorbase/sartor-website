import React, { useState } from 'react';
import { Sparkles, MessageSquare, Eye, ZoomIn, CheckCircle2 } from 'lucide-react';
import { BESPOKE_SUITES, BespokeSuite } from '../../data/showcaseGallery';
import { ShowcaseLightbox } from '../molecules/ShowcaseLightbox';
import { buildWhatsAppLink } from '../../services/analytics';

export const ServiceShowcase: React.FC = () => {
  const [selectedSuite, setSelectedSuite] = useState<BespokeSuite | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'bridal', label: 'Bridal Lehengas' },
    { id: 'festive', label: 'Festive & Kalidar' },
    { id: 'saree', label: 'Sarees & Sets' },
    { id: 'formal', label: 'Luxury Pret & Suits' },
  ];

  const filteredSuites = activeCategory === 'all'
    ? BESPOKE_SUITES
    : BESPOKE_SUITES.filter((suite) => {
        if (activeCategory === 'bridal') return suite.id.includes('bridal') || suite.category?.toLowerCase().includes('bridal');
        if (activeCategory === 'festive') return suite.id.includes('kalidar') || suite.id.includes('frock') || suite.category?.toLowerCase().includes('festive');
        if (activeCategory === 'saree') return suite.id.includes('sarhi') || suite.id.includes('saree') || suite.category?.toLowerCase().includes('saree');
        if (activeCategory === 'formal') return suite.id.includes('suit') || suite.category?.toLowerCase().includes('suit');
        return true;
      });

  return (
    <section id="portfolio" className="py-20 bg-stone-950 text-stone-100 border-b border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Masterpiece Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-100 tracking-tight">
            Crafted in Our Lahore Atelier
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
            From regal hand-embroidered crimson Barat lehengas to gossamer silk kalidars. Browse authentic bespoke creations drafted by Master Tailor Abdul Ghaffar.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-6 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-950/40'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-850 border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSuites.map((suite) => {
            const suiteWhatsAppMsg = `*ATELIER PORTFOLIO ENQUIRY - SARTOR LAHORE*
---------------------------------------
• Outfit: ${suite.title}
• Base Price: ${suite.priceDisplay}
• Code: ${suite.id}

Assalam-o-Alaikum SARTOR Atelier,
I saw "${suite.title}" in your portfolio and would like to consult on fabric options, stitching timeframes, and doorstep fabric pickup in Lahore.`;
            const suiteWhatsAppUrl = buildWhatsAppLink(suiteWhatsAppMsg, 'portfolio_card');

            return (
              <div
                key={suite.id}
                className="group rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-950/20 transition-all flex flex-col"
              >
                {/* Image Container with Zoom Overlay */}
                <div
                  className="relative aspect-[4/5] bg-stone-950 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedSuite(suite)}
                >
                  <img
                    src={suite.primaryImage}
                    alt={suite.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md border border-stone-700 text-stone-200 text-xs font-semibold">
                    {suite.category || 'Bespoke Atelier'}
                  </div>

                  {/* Quick Zoom Button */}
                  <div className="absolute bottom-3 right-3 p-2.5 rounded-full bg-stone-900/90 text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md border border-stone-700">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <h3 className="font-serif font-bold text-lg text-stone-100 group-hover:text-amber-300 transition-colors">
                        {suite.title}
                      </h3>
                      <span className="font-mono text-xs text-amber-400 font-bold shrink-0">
                        {suite.priceDisplay}
                      </span>
                    </div>

                    <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mb-4">
                      {suite.description}
                    </p>

                    {/* Features list */}
                    {suite.needleworkHighlights && (
                      <ul className="space-y-1.5 mb-6 text-xs text-stone-300">
                        {suite.needleworkHighlights.slice(0, 3).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="pt-4 border-t border-stone-800 flex items-center gap-2.5">
                    <button
                      onClick={() => setSelectedSuite(suite)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>

                    <a
                      href={suiteWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-emerald-950/40"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp Order</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-100 mb-1">
              Have a Custom Celebrity Inspiration or Runway Sketch?
            </h3>
            <p className="text-stone-400 text-sm max-w-xl">
              Send your Pinterest board, bridal moodboard, or Instagram reference directly to our master cutter for a quick yardage &amp; stitching quotation.
            </p>
          </div>
          <a
            href={buildWhatsAppLink(
              'Assalam-o-Alaikum SARTOR Atelier,\nI have custom dress inspiration photos and would like to discuss fabric requirement and tailoring rates in Lahore.',
              'portfolio_banner'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2.5 shrink-0 shadow-lg shadow-emerald-950/50 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Consult on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedSuite && (
        <ShowcaseLightbox
          isOpen={true}
          suite={selectedSuite}
          onClose={() => setSelectedSuite(null)}
        />
      )}
    </section>
  );
};

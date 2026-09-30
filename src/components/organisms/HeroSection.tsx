import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  Layers,
  MessageSquare,
  Scissors,
  Sparkles,
  Truck,
} from 'lucide-react';
import { PRICING_LIST } from '../../data/sizes';
import { analytics, buildWhatsAppLink } from '../../services/analytics';
import { openSartorChat } from '../../services/geminiChat';
import { PricingItem } from '../../types';

// Subtle, high-end atelier animation variants
const easeCurve = [0.22, 1, 0.36, 1] as const;

const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: easeCurve,
    },
  },
};

export const HeroSection: React.FC = () => {
  const getOutfitWhatsAppUrl = (item: PricingItem) => {
    if (item.id === 'custom-designs') {
      const customMsg = `Assalam-o-Alaikum SARTOR Atelier,
I have a custom dress design / celebrity photo inspiration and would like an estimate on fabric requirement and stitching rates in Lahore.`;
      return buildWhatsAppLink(customMsg, 'hero_pricing_card');
    }

    let outfitLabel = item.title;
    if (item.id === 'simple-suit') outfitLabel = 'Simple Suit (Starting PKR 2,500)';
    else if (item.id === 'sarhi-set') outfitLabel = 'Saree & Blouse Set (Starting PKR 7,000)';
    else if (item.id === 'panneled-frock') outfitLabel = 'Festive Maxi & Kalidar (Starting PKR 7,000)';
    else if (item.id === 'bridal-set') outfitLabel = 'Bridal Set (Starting PKR 10,000)';
    else if (item.id === 'double-suit') outfitLabel = 'Double Suit / Lined Pret (Starting PKR 4,000)';
    else if (item.id === 'ready-made-alteration') outfitLabel = 'Luxury Alteration & Fitting (Starting PKR 1,500)';

    const msg = `*ORDER ON WHATSAPP - SARTOR LAHORE*
---------------------------------------
• Outfit: ${outfitLabel}
• Price: ${item.priceDisplay}
• Studio: Moon Tower, International Market, Model Town, Lahore

Assalam-o-Alaikum SARTOR Atelier,
I would like to order custom stitching for: *${outfitLabel}*.
Please guide me on sending fabric / fabric pickup in Lahore and sharing measurements.`;

    return buildWhatsAppLink(msg, 'hero_pricing_card');
  };

  const heroMainWhatsAppUrl = buildWhatsAppLink(
    `Assalam-o-Alaikum SARTOR Atelier,
I would like to book an order for bespoke women's tailoring (0335-2209991).
Please guide me on doorstep fabric pickup in Lahore, sharing measurements, and turnaround time.`,
    'hero_cta'
  );

  const handleOrderOutfit = (item: PricingItem) => {
    analytics.trackEvent('pricing_whatsapp_click', {
      outfit: item.title,
      price: typeof item.pricePKR === 'number' ? item.pricePKR : 0,
    });
    window.open(getOutfitWhatsAppUrl(item), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative bg-stone-950 text-stone-100">
      
      {/* 1. Clean, Serene Hero Banner */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-stone-800/80">
        {/* Glow backdrop effects */}
        <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-stone-800/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* Grand Main Headline */}
            <motion.h1
              variants={fadeUpVariant}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-stone-100 tracking-tight leading-[1.14]"
            >
              Bespoke Women&apos;s Tailoring{' '}
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                &amp; Luxury Embroidery
              </span>
            </motion.h1>

            {/* Subheadline / Summary */}
            <motion.p
              variants={fadeUpVariant}
              className="mt-6 text-stone-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-sans"
            >
              Precision stitching for sarees, festive maxis, 16-kali kalidars, and bridal lehengas with free doorstep fabric pickup &amp; delivery across Lahore.
            </motion.p>

            {/* Single WhatsApp CTA Button */}
            <motion.div variants={fadeUpVariant} className="mt-8 flex justify-center w-full">
              <a
                id="hero-whatsapp-main-cta"
                href={heroMainWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base sm:text-lg shadow-xl shadow-emerald-950/50 hover:shadow-emerald-900/60 border border-emerald-400/40 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 fill-current shrink-0" />
                <span>Book Order on WhatsApp (0335-2209991)</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Bespoke Atelier Services Highlight */}
      <section id="services" className="py-12 bg-stone-900/40 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: easeCurve }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8"
          >
            <div>
              <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold block mb-1">
                Comprehensive Atelier Services
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                End-to-End Couture Services in Lahore
              </h2>
            </div>
            <p className="text-xs text-stone-400 max-w-md">
              From raw fabric selection to intricate needlework and doorstep delivery, we handle every stage with artisan care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Hand Embroidery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.05, ease: easeCurve }}
              className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-600/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-400 block mb-1">
                  Artisanal Karigari
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-100 mb-1">
                  Hand Embroidery
                </h3>
                <span className="text-xs font-serif text-stone-400 font-semibold block mb-2">
                  دستی کڑھائی (ہینڈ ایمبرائیڈری)
                </span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Traditional Pakistani zardozi, tilla, dabka, resham silk threadwork, pearls, and cut-dana crafted by generational master karigars for festive and bridal attire.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-amber-300/80 font-medium">
                Zardozi • Tilla • Dabka • Resham
              </div>
            </motion.div>

            {/* 2. Machine Embroidery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.15, ease: easeCurve }}
              className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-600/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                  <Scissors className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-400 block mb-1">
                  Precision Craft
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-100 mb-1">
                  Machine Embroidery
                </h3>
                <span className="text-xs font-serif text-stone-400 font-semibold block mb-2">
                  مشین و کمپیوٹرائزڈ کڑھائی
                </span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  High-density computerized and machine embroidery for lawn borders, schiffli eyelets, intricate gala necklines, sleeve cuffs, and custom geometric motifs.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-amber-300/80 font-medium">
                Computerized • Schiffli • Border Motifs
              </div>
            </motion.div>

            {/* 3. Fabric & Material Sourcing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.25, ease: easeCurve }}
              className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-600/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-400 block mb-1">
                  Direct Mill Sourcing
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-100 mb-1">
                  Fabric & Material Sourcing
                </h3>
                <span className="text-xs font-serif text-stone-400 font-semibold block mb-2">
                  کپڑا اور مٹیریل کی فراہمی
                </span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Don't have time to shop for fabric? We source pure raw silk, organza, chiffon, imported velvet, lawn, premium lining, laces, and designer buttons on your behalf.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-amber-300/80 font-medium">
                Pure Raw Silk • Chiffon • Velvet • Laces
              </div>
            </motion.div>

            {/* 4. Pick & Drop in Lahore */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.35, ease: easeCurve }}
              className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-600/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-400 block mb-1">
                  Doorstep Convenience
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-100 mb-1">
                  Pick & Drop in Lahore
                </h3>
                <span className="text-xs font-serif text-stone-400 font-semibold block mb-2">
                  لاہور میں پک اینڈ ڈراپ سروس
                </span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Convenient courier pickup of your unstitched cloth or sample garment from your home, and safe delivery of your finished, steam-pressed suit anywhere in Lahore.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-emerald-400/90 font-medium">
                Model Town • Gulberg • DHA • Cantt • Johar Town
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. Official SARTOR Pricing List & Photo Showcase */}
      <section id="pricing" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-8 relative">
        <div id="rates" className="absolute -top-24" />
        <div id="stitching-rates" className="absolute -top-24" />
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: easeCurve }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Official Tailoring Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-100 tracking-tight">
            Transparent Tailoring Pricing List
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base leading-relaxed">
            Starting rates for women's bespoke stitching in Pakistani Rupees (PKR). Click any card for a direct, pre-filled order on WhatsApp.
          </p>
        </motion.div>

        {/* Pricing Cards Grid (Simple Suit, Saree, Maxi, Bridal Set featured) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRICING_LIST.map((item, idx) => {
            const isStartingRate = typeof item.pricePKR === 'number';
            const startingRateText = isStartingRate ? `Starting at ${item.priceDisplay}` : 'Custom Estimate';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: easeCurve }}
                className="group rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 hover:border-amber-500/60 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Outfit Photo */}
                  <div className="relative h-72 w-full overflow-hidden bg-stone-950">
                    <img
                      src={item.imageUrl}
                      alt={`${item.title} - SARTOR Lahore Bespoke Tailoring`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/30" />

                    {/* Tag badge */}
                    {item.tag && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-stone-950/90 border border-stone-700/80 text-[11px] font-semibold text-amber-300 backdrop-blur-md">
                        {item.tag}
                      </div>
                    )}

                    {/* Starting Rate overlay badge */}
                    <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-amber-500 text-neutral-950 font-mono font-bold text-xs sm:text-sm shadow-lg">
                      {startingRateText}
                    </div>
                  </div>

                  {/* Content Box */}
                  <div className="p-6">
                    <div className="mb-2">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-serif text-xl font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      {item.titleUrdu && (
                        <span className="text-xs font-serif text-stone-400 font-semibold block mt-0.5">
                          {item.titleUrdu}
                        </span>
                      )}
                    </div>

                    <div className="mb-3 inline-block px-2.5 py-0.5 rounded-md bg-stone-800/80 border border-stone-700/60 text-[11px] font-mono text-amber-300 font-semibold">
                      Rate: {startingRateText}
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2 border-t border-stone-800/80 pt-4 mb-5">
                      {item.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs text-stone-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer with Direct "Order on WhatsApp" Pre-filled Link */}
                <div className="p-6 pt-0">
                  <a
                    id={`order-btn-${item.id}`}
                    href={getOutfitWhatsAppUrl(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      analytics.trackEvent('pricing_whatsapp_click', {
                        outfit: item.title,
                        price: typeof item.pricePKR === 'number' ? item.pricePKR : 0,
                      });
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-900/50 transition-all active:scale-95 cursor-pointer text-center"
                  >
                    <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                    <span>Order on WhatsApp</span>
                  </a>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Custom Design Banner Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: easeCurve }}
          className="mt-12 rounded-2xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-stone-950 border border-amber-700/40 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-stone-100">
                Have a Custom Dress Photo or Celebrity Inspiration?
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
                Send your photo, Pinterest pin, or design sketch to our WhatsApp. Our master cutter will calculate exact fabric yardage, provide an embroidery estimate, and quote your custom stitching.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => openSartorChat("I have a custom dress design and want advice on fabric requirements, styling, and Lahore stitching rates.")}
              className="px-4 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-100 border border-amber-500/40 hover:border-amber-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Ask AI Stylist</span>
            </button>

            <button
              onClick={() => handleOrderOutfit(PRICING_LIST[5])}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-lg"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Consult on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

      </section>

    </div>
  );
};

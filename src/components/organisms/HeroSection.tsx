import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  MapPin,
  MessageSquare,
  Ruler,
  Scissors,
  Sparkles,
  Truck,
} from 'lucide-react';
import {
  PRICING_LIST,
  bridalSetImg,
  doubleSuitImg,
  panneledFrockImg,
  sarhiSetImg,
  simpleSuitImg,
} from '../../data/sizes';
import {
  SARTOR_GOOGLE_MAPS_LINK,
  SARTOR_PHONE_LOCAL,
  analytics,
  buildWhatsAppLink,
} from '../../services/analytics';
import { openSartorChat } from '../../services/geminiChat';
import { SartorLogo } from '../atoms/SartorLogo';
import { Button } from '../atoms/Button';
import { PricingItem } from '../../types';

// Subtle, high-end atelier animation variants
const easeCurve = [0.22, 1, 0.36, 1] as const;

const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
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
  const handleOrderOutfit = (item: PricingItem) => {
    analytics.trackEvent('pricing_whatsapp_click', {
      outfit: item.title,
      price: typeof item.pricePKR === 'number' ? item.pricePKR : 0,
    });

    const msg = `*ORDER INQUIRY - SARTOR LAHORE*
---------------------------------------
• Outfit: ${item.title} (${item.titleUrdu || ''})
• Listed Price: ${item.priceDisplay}
• SARTOR Location: Moon Tower, Model Town, Lahore

Assalam-o-Alaikum SARTOR Atelier,
I want to order/stitch the *${item.title}* (${item.priceDisplay}).
Please let me know how to send my fabric or if you provide fabric sourcing and Lahore pick-and-drop.`;

    const url = buildWhatsAppLink(msg, 'hero_pricing_card');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleGeneralWhatsAppInquiry = () => {
    analytics.trackEvent('whatsapp_hero_direct', { channel: 'hero_main' });
    const msg = `Assalam-o-Alaikum SARTOR Lahore,
I am inquiring about your women's bespoke tailoring, embroidery, and stitching services at Moon Tower, Model Town.

• Simple Suit (PKR 2,500)
• Double Suit (PKR 4,000)
• Sarhi Set (PKR 7,000)
• Panneled Frock Set (PKR 7,000)
• Bridal Set (PKR 10,000)
• Custom Designs & Embroidery Consultation

Please guide me on consultation and booking.`;
    const url = buildWhatsAppLink(msg, 'hero_cta');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative bg-stone-950 text-stone-100">
      
      {/* 1. Main Hero Header Banner */}
      <section className="relative overflow-hidden pt-6 pb-14 md:pt-14 md:pb-20 border-b border-stone-800/80">
        {/* Glow backdrop effects */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-stone-800/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Top atelier badges with gentle fade-in */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeCurve }}
            className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-amber-950/70 border border-amber-600/50 text-amber-300 text-[11px] sm:text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-semibold">Women's Bespoke Atelier</span>
              <span className="text-amber-500/60">·</span>
              <span>Model Town, Lahore</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3 sm:py-1.5 rounded-full bg-stone-900 border border-stone-800 text-stone-300 text-[11px] sm:text-xs font-medium">
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              <span>Pick & Drop Across Lahore</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-stone-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Hand & Machine Embroidery</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            
            {/* Left Column: Headline, Subtitle, Direct Above-the-Fold CTA & Pricing */}
            <motion.div
              variants={containerStagger}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 flex flex-col items-start"
            >
              {/* SARTOR Signature Silk Brand Emblem */}
              <motion.div variants={fadeUpVariant} className="mb-4 sm:mb-5">
                <SartorLogo variant="hero" />
              </motion.div>
              
              {/* Location Tag */}
              <motion.div variants={fadeUpVariant} className="flex items-center gap-2 text-xs font-medium text-amber-400 mb-2 font-mono">
                <a
                  href={SARTOR_GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1.5 text-stone-300 hover:text-amber-300"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>Moon Tower, International Market, Model Town</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </motion.div>

              {/* Grand Main Headline */}
              <motion.h1
                variants={fadeUpVariant}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-100 tracking-tight leading-[1.15]"
              >
                Master Women's Tailoring, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                  Embroidery & Bespoke Stitching.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUpVariant}
                className="mt-3 sm:mt-5 text-stone-300 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed"
              >
                Welcome to <strong>SARTOR</strong>. We specialize in precision stitching for sarees, festive maxis, 16-kali kalidar frocks, structured double suits, and royal bridal lehengas. Complete with master hand & machine embroidery, authentic fabric sourcing, and doorstep pick & drop throughout Lahore.
              </motion.p>

              {/* Primary CTAs (Placed directly below headline for immediate above-the-fold conversion) */}
              <motion.div variants={fadeUpVariant} className="mt-5 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <Button
                  id="hero-whatsapp-main-cta"
                  variant="whatsapp"
                  size="lg"
                  onClick={handleGeneralWhatsAppInquiry}
                  leftIcon={<MessageSquare className="w-5 h-5 fill-current" />}
                >
                  Order on WhatsApp ({SARTOR_PHONE_LOCAL})
                </Button>

                <Button
                  id="hero-ai-stylist-cta"
                  variant="secondary"
                  size="lg"
                  onClick={() => openSartorChat()}
                  leftIcon={<Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />}
                  className="bg-stone-900 hover:bg-stone-800 text-stone-100 border border-amber-500/40 hover:border-amber-400"
                >
                  Ask AI Stylist (Google Search)
                </Button>

                <a href="#size-chart" className="inline-flex">
                  <Button
                    id="hero-size-chart-cta"
                    variant="outline"
                    size="lg"
                    fullWidth
                    leftIcon={<Ruler className="w-4 h-4 text-amber-400" />}
                  >
                    Brand Size Chart
                  </Button>
                </a>
              </motion.div>

              {/* Quick assurance info & trust micro-copy */}
              <motion.div variants={fadeUpVariant} className="mt-3.5 flex flex-wrap items-center gap-3 text-xs text-stone-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Direct WhatsApp reply &lt; 15 mins
                </span>
                <span className="text-stone-600 hidden sm:inline">•</span>
                <span className="text-stone-300">Free Fabric Pickup in Lahore</span>
                <span className="text-stone-600 hidden sm:inline">•</span>
                <span className="text-stone-300">Fitting Guarantee</span>
              </motion.div>

              {/* Transparent Quick Rates Ticker */}
              <motion.div variants={fadeUpVariant} className="mt-6 pt-4 border-t border-stone-800/80 w-full">
                <div className="text-[11px] uppercase tracking-wider text-amber-500/90 font-mono font-semibold mb-2">
                  Transparent Stitching Rates (PKR):
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <a href="#pricing" className="px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-200 transition-colors hover:border-amber-600/40">
                    Simple Suit: <strong className="text-amber-400">PKR 2,500</strong>
                  </a>
                  <a href="#pricing" className="px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-200 transition-colors hover:border-amber-600/40">
                    Double Suit: <strong className="text-amber-400">PKR 4,000</strong>
                  </a>
                  <a href="#pricing" className="px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-200 transition-colors hover:border-amber-600/40">
                    Sarhi Set: <strong className="text-amber-400">PKR 7,000</strong>
                  </a>
                  <a href="#pricing" className="px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-200 transition-colors hover:border-amber-600/40">
                    Panneled Frock: <strong className="text-amber-400">PKR 7,000</strong>
                  </a>
                  <a href="#pricing" className="px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-200 transition-colors hover:border-amber-600/40">
                    Bridal Set: <strong className="text-amber-400">PKR 10,000</strong>
                  </a>
                </div>
              </motion.div>

            </motion.div>

            {/* Right Column: Hero Visual Portfolio Collage (Optimized LCP Image) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeCurve }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Visual Card with Preview */}
                <div className="relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl group aspect-[4/5] sm:aspect-auto">
                  <img
                    src={bridalSetImg}
                    alt="SARTOR Pakistani Bridal Lehenga Choli & Maxi Stitching Lahore"
                    className="w-full h-80 sm:h-96 lg:h-[430px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                  {/* Overlaid Card Info */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-stone-950/90 border border-stone-800/90 backdrop-blur-md">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold block">
                          SARTOR Master Atelier
                        </span>
                        <h3 className="font-serif text-base font-bold text-stone-100 mt-0.5">
                          Bridal Set — PKR 10,000
                        </h3>
                        <p className="text-[11px] text-stone-300 mt-0.5">
                          Heavy lehenga, padded choli, can-can & double-dupatta framing
                        </p>
                      </div>
                      <button
                        onClick={() => handleOrderOutfit(PRICING_LIST[4])}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-stone-100 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-current" />
                        <span>Order</span>
                      </button>
                    </div>
                  </div>

                  {/* Mini floating pill */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-stone-950/80 border border-stone-700/80 text-[11px] font-medium text-stone-200 backdrop-blur-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Zardozi & Tilla Hand Embroidery</span>
                  </div>

                </div>

                {/* Thumbnail strip showing the other photo styles */}
                <div className="mt-3 grid grid-cols-4 gap-2">
                  <div className="relative rounded-lg overflow-hidden border border-stone-800 h-16 bg-stone-900 group">
                    <img
                      src={panneledFrockImg}
                      alt="Panneled Frock"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 inset-x-0 bg-stone-950/80 text-[9px] text-center font-mono text-amber-300 py-0.5">
                      Frock 7k
                    </span>
                  </div>
                  <div className="relative rounded-lg overflow-hidden border border-stone-800 h-16 bg-stone-900 group">
                    <img
                      src={doubleSuitImg}
                      alt="Double Suit"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 inset-x-0 bg-stone-950/80 text-[9px] text-center font-mono text-amber-300 py-0.5">
                      Double 4k
                    </span>
                  </div>
                  <div className="relative rounded-lg overflow-hidden border border-stone-800 h-16 bg-stone-900 group">
                    <img
                      src={sarhiSetImg}
                      alt="Sarhi Set"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 inset-x-0 bg-stone-950/80 text-[9px] text-center font-mono text-amber-300 py-0.5">
                      Sarhi 7k
                    </span>
                  </div>
                  <div className="relative rounded-lg overflow-hidden border border-stone-800 h-16 bg-stone-900 group">
                    <img
                      src={simpleSuitImg}
                      alt="Simple Suit"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 inset-x-0 bg-stone-950/80 text-[9px] text-center font-mono text-amber-300 py-0.5">
                      Simple 2.5k
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
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
      <section id="pricing" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-8">
        
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
            All prices are in Pakistani Rupees (PKR). Click any outfit card to dispatch your stitching order directly to our master atelier on WhatsApp.
          </p>
        </motion.div>

        {/* Pricing Cards Grid (All 6 requested categories with photos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRICING_LIST.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: easeCurve }}
              className="group rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 hover:border-amber-600/60 transition-all duration-300 shadow-xl flex flex-col justify-between"
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

                  {/* Price overlay badge */}
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-amber-500 text-neutral-950 font-mono font-bold text-sm shadow-lg">
                    {item.priceDisplay}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6">
                  <div className="mb-2">
                    <h3 className="font-serif text-xl font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    {item.titleUrdu && (
                      <span className="text-xs font-serif text-stone-400 font-semibold block mt-0.5">
                        {item.titleUrdu}
                      </span>
                    )}
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

              {/* Card Footer with 1-Click WhatsApp Order Button */}
              <div className="p-6 pt-0">
                <Button
                  id={`order-btn-${item.id}`}
                  variant="whatsapp"
                  size="md"
                  fullWidth
                  onClick={() => handleOrderOutfit(item)}
                  leftIcon={<MessageSquare className="w-4 h-4 fill-current" />}
                >
                  {item.pricePKR === 'Consult' ? 'Consult on WhatsApp' : `Order ${item.title} (${item.priceDisplay})`}
                </Button>
              </div>

            </motion.div>
          ))}
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

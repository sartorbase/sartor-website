import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Crown,
  Expand,
  ExternalLink,
  Layers,
  MapPin,
  Maximize2,
  MessageSquare,
  Pause,
  Play,
  Scissors,
  Sparkles,
  Truck,
  X,
} from 'lucide-react';
import {
  bridalSetImg,
  doubleSuitImg,
  embroideredJacketImg,
  panneledFrockImg,
  sarhiSetImg,
  simpleSuitImg,
} from '../../data/sizes';
import { analytics, buildWhatsAppLink } from '../../services/analytics';
import { SartorLogo } from '../atoms/SartorLogo';
import { Button } from '../atoms/Button';

export interface TailoringResult {
  id: string;
  title: string;
  titleUrdu: string;
  category: 'Bridal & Couture' | 'Festive Suits & Frocks' | 'Bespoke Ensembles' | 'Everyday Pret';
  priceDisplay: string;
  priceValue?: number;
  imageUrl: string;
  turnaroundTime: string;
  silhouette: string;
  fabricDetails: string;
  needleworkHighlights: string[];
  clientLocation: string;
  description: string;
}

export const TAILORING_RESULTS: TailoringResult[] = [
  {
    id: 'bridal-couture-lehenga',
    title: 'Royal Bridal Lehenga & Gown Set',
    titleUrdu: 'شاہی عروسی لہنگا و گاؤن سیٹ',
    category: 'Bridal & Couture',
    priceDisplay: 'PKR 10,000',
    priceValue: 10000,
    imageUrl: bridalSetImg,
    turnaroundTime: '10 - 14 Days',
    silhouette: 'Heavy flared lehenga with built-in multi-layer can-can, padded choli & dual-dupatta draping',
    fabricDetails: 'Pure Banarsi Silk, Scarlet Raw Silk & Embellished Organza',
    needleworkHighlights: [
      'Authentic zardozi, hand tilla & micro-dabka needlework',
      'Dual dupatta framing with kiran border application',
      'Dedicated master cutter with personalized trial fitting',
      'Heavy structural flare with reinforced French seams',
    ],
    clientLocation: 'DHA Phase 5, Lahore',
    description: 'A regal bridal ensemble tailored for a Barat wedding. Crafted with multi-layered architectural can-can, hand-finished piping, and structured padded bustier choli.',
  },
  {
    id: 'panneled-kalidar-frock',
    title: '16-Kali Kalidar Panneled Frock',
    titleUrdu: '۱۶ کلی گھیر دار پینل فراک',
    category: 'Festive Suits & Frocks',
    priceDisplay: 'PKR 7,000',
    priceValue: 7000,
    imageUrl: panneledFrockImg,
    turnaroundTime: '5 - 7 Days',
    silhouette: '16 symmetrical geometric kalis with voluminous flare, sculpted bodice & churidar',
    fabricDetails: 'Pure Chiffon, Cotton Silk Inner & Organza Dupatta',
    needleworkHighlights: [
      'Precision laser lace setting & hemline scalloping',
      'Even kalidar flare distribution with zero seam puckering',
      'Handcrafted neckline cord piping with potli loop finish',
      'Complimentary press & tissue-lined hanger dispatch',
    ],
    clientLocation: 'Model Town, Lahore',
    description: 'Designed with 16 precisely measured panels that create dramatic swirl and volume without bulkiness around the waistline. Tailored to perfection for festive occasions.',
  },
  {
    id: 'structured-double-suit',
    title: 'Structured Layered Double Suit',
    titleUrdu: 'ڈبل سوٹ مع کڑھائی دار اوورلے',
    category: 'Festive Suits & Frocks',
    priceDisplay: 'PKR 4,000',
    priceValue: 4000,
    imageUrl: doubleSuitImg,
    turnaroundTime: '4 - 6 Days',
    silhouette: 'Floor-length sheer organza coat over tailored slip kurti with matching cigarette pants',
    fabricDetails: 'Embroidered Organza Overcoat with Pure Viscose Silk Inner',
    needleworkHighlights: [
      'Double-stitched concealed slip lining for comfortable fit',
      'Fine resham thread embroidery along collars and front slit',
      'Tapered trouser finish with custom-fit ankle opening',
      'Hand-attached fabric buttons and delicate sleeve borders',
    ],
    clientLocation: 'Gulberg III, Lahore',
    description: 'Two-tier modern Pakistani silhouette featuring an embellished translucent coat draped over an opaque inner slip, calibrated for evening dinners and gatherings.',
  },
  {
    id: 'bespoke-sarhi-blouse',
    title: 'Handcrafted Pleated Sarhi & Blouse',
    titleUrdu: 'ہاتھ کی بنی ساڑھی اور بلاؤز',
    category: 'Bridal & Couture',
    priceDisplay: 'PKR 7,000',
    priceValue: 7000,
    imageUrl: sarhiSetImg,
    turnaroundTime: '6 - 8 Days',
    silhouette: 'Graceful pleated pallu fall with anti-slip waist binding, padded blouse & matching petticoat',
    fabricDetails: 'Pure Georgette Chiffon & Embroidered Raw Silk',
    needleworkHighlights: [
      'Padded bustier blouse with teardrop back & invisible zipper',
      'Weighted satin fall application for flawless pleat drape',
      'Embellished armhole and neckline border stitching',
      'Includes custom-tailored drawstring satin petticoat',
    ],
    clientLocation: 'Cantt / Lahore Garrison',
    description: 'Engineered for seamless elegance. The pallu pleats sit naturally without shifting, while the sculpted blouse offers comfortable contouring for hours of wear.',
  },
  {
    id: 'luxury-pret-simple-suit',
    title: 'Luxury Pret Simple Kurti & Trouser',
    titleUrdu: 'کلاسک سادہ قمیض و شلوار',
    category: 'Everyday Pret',
    priceDisplay: 'PKR 2,500',
    priceValue: 2500,
    imageUrl: simpleSuitImg,
    turnaroundTime: '3 - 4 Days',
    silhouette: 'Crisp straight-cut A-line kurti with side slits and straight cigarette pants',
    fabricDetails: 'Designer Digital Printed Lawn & Jacquard Cotton',
    needleworkHighlights: [
      'Zero-pucker round neckline with clean facing finish',
      'Precision side chalk (slit) stitching with reinforcement',
      'Tailored sleeve cuff hem with subtle contrast piping',
      'Full overlock interior seams to prevent fraying',
    ],
    clientLocation: 'Johar Town, Lahore',
    description: 'Everyday sophistication stitched to brand standards (Sapphire, Khaadi, Maria.B). Perfect for daily wear, work, and university with durable reinforced stitching.',
  },
  {
    id: 'haute-couture-jacket',
    title: 'Haute Couture Embroidered Jacket',
    titleUrdu: 'کسٹم کڑھائی والی دستکاری جیکٹ',
    category: 'Bespoke Ensembles',
    priceDisplay: 'Consult / Custom',
    imageUrl: embroideredJacketImg,
    turnaroundTime: '7 - 10 Days',
    silhouette: 'Sculpted formal blazer with structured shoulder pads, lapels & fusion tailored trousers',
    fabricDetails: 'Deep Ruby Micro-Velvet with Pure Silk Satin Lining',
    needleworkHighlights: [
      'Traditional heavy zardozi, metallic tilla & bullion wire work',
      'Bespoke welt pockets and fabric-wrapped buttons',
      'Interior silk lining with invisible hand-basting',
      'Custom sizing tailored from client inspiration photos',
    ],
    clientLocation: 'Moon Tower Atelier, Model Town',
    description: 'A fusion of Eastern karigari and sharp Western silhouette. Crafted for formal galas and winter receptions, featuring intricate metallic hand needlework on the lapels.',
  },
];

const easeCurve = [0.22, 1, 0.36, 1] as const;

// Framer-motion transition variants for image slide
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: easeCurve,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.97,
    transition: {
      duration: 0.45,
      ease: easeCurve,
    },
  }),
};

// Motion variants for content details
const contentVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeCurve },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.35, ease: easeCurve },
  },
};

const AUTOPLAY_INTERVAL = 6000; // 6 seconds per slide

export const ServiceShowcase: React.FC = () => {
  const [[currentIndex, direction], setPage] = useState<[number, number]>([0, 0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const categories = ['All', 'Bridal & Couture', 'Festive Suits & Frocks', 'Bespoke Ensembles', 'Everyday Pret'] as const;

  const filteredItems = selectedFilter === 'All'
    ? TAILORING_RESULTS
    : TAILORING_RESULTS.filter((item) => item.category === selectedFilter);

  // Keep index clamped within filtered items
  const activeItemIndex = currentIndex % filteredItems.length;
  const currentItem = filteredItems[activeItemIndex] || TAILORING_RESULTS[0];

  const paginate = useCallback((newDirection: number) => {
    setPage(([prevIndex]) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = filteredItems.length - 1;
      if (nextIndex >= filteredItems.length) nextIndex = 0;
      return [nextIndex, newDirection];
    });
  }, [filteredItems.length]);

  const jumpToSlide = (targetIndex: number) => {
    const dir = targetIndex > activeItemIndex ? 1 : -1;
    setPage([targetIndex, dir]);
  };

  // Autoplay management
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      paginate(1);
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, paginate, activeItemIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen && e.key === 'Escape') {
        setLightboxOpen(false);
        return;
      }
      if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, paginate]);

  // WhatsApp CTA for this specific tailoring result
  const handleInquireAboutOutfit = (item: TailoringResult) => {
    analytics.trackEvent('whatsapp_click', {
      channel: 'service_showcase',
      outfit: item.title,
      category: item.category,
    });

    const msg = `*TAILORING SHOWCASE INQUIRY - SARTOR LAHORE*
---------------------------------------------
• Finished Result: ${item.title} (${item.titleUrdu})
• Category: ${item.category}
• Listed Stitching: ${item.priceDisplay}
• Atelier: Moon Tower, Model Town, Lahore

Assalam-o-Alaikum SARTOR Master Tailor,
I was viewing your portfolio photo for *${item.title}*. 
I would like to get similar stitching / embroidery done for my fabric. 

Please let me know how to send my measurements or arrange unstitched fabric pick-up in Lahore.`;

    const url = buildWhatsAppLink(msg, 'service_showcase');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="service-showcase"
      className="relative py-16 md:py-24 bg-stone-950 text-stone-100 border-b border-stone-800 overflow-hidden"
      aria-label="Tailoring Results Showcase Gallery"
    >
      {/* Decorative ambient background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-600/5 blur-[120px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: easeCurve }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-600/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Finished Atelier Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-100 tracking-tight">
              Service Showcase: <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                Master Tailoring Results
              </span>
            </h2>
            <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
              Explore actual finished client garments stitched at our Moon Tower Model Town atelier. From regal bridal lehengas to precision simple suits, witness the artisan standard of our master cutters and karigars.
            </p>
          </div>

          {/* Autoplay & Navigation Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              id="showcase-autoplay-toggle"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause auto cycling' : 'Start auto cycling'}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs font-medium text-stone-300 hover:text-amber-400 hover:border-amber-600/50 transition-colors shadow-sm"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-400" />
                  <span>Auto Cycling</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-stone-400" />
                  <span>Paused</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-900 border border-stone-800">
              <button
                id="showcase-prev-btn"
                onClick={() => paginate(-1)}
                aria-label="Previous tailoring result"
                className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-stone-400 px-2 select-none">
                {activeItemIndex + 1} / {filteredItems.length}
              </span>
              <button
                id="showcase-next-btn"
                onClick={() => paginate(1)}
                aria-label="Next tailoring result"
                className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedFilter(cat);
                  setPage([0, 0]);
                }}
                className={`relative px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'text-amber-300 font-semibold shadow-md'
                    : 'text-stone-400 hover:text-stone-200 bg-stone-900/60 border border-stone-800/80 hover:border-stone-700'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 rounded-xl bg-amber-950/80 border border-amber-600/60 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Progress Bar for Autoplay */}
        {isPlaying && (
          <div className="w-full h-1 bg-stone-800/70 rounded-full mb-8 overflow-hidden">
            <motion.div
              key={`${activeItemIndex}-${selectedFilter}`}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
            />
          </div>
        )}

        {/* Main Showcase Stage: Two-Column Interactive Canvas */}
        <div className="relative rounded-3xl bg-stone-900/80 border border-stone-800/90 shadow-2xl overflow-hidden backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[520px]">
            
            {/* Left Column: Photo Stage with Framer-Motion Transitions */}
            <div className="lg:col-span-6 relative overflow-hidden bg-stone-950 flex items-center justify-center min-h-[380px] lg:min-h-[520px]">
              
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentItem.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={currentItem.imageUrl}
                    alt={currentItem.title}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle vignette gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-stone-950/10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-stone-900/40 hidden lg:block" />
                </motion.div>
              </AnimatePresence>

              {/* Badges on the image */}
              <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-stone-950/85 backdrop-blur-md border border-amber-600/50 text-amber-300 text-xs font-semibold shadow-lg">
                  {currentItem.category}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-stone-700 text-[11px] font-mono text-stone-300">
                  {currentItem.priceDisplay}
                </span>
              </div>

              {/* Fullscreen Magnify Trigger */}
              <button
                id="showcase-expand-btn"
                onClick={() => setLightboxOpen(true)}
                aria-label="View photo in high resolution lightbox"
                className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-stone-950/80 backdrop-blur-md border border-stone-700/80 text-stone-300 hover:text-amber-400 hover:border-amber-500 transition-all shadow-lg"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Bottom Image Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 text-xs font-medium text-stone-300 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-800">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Client Stitched in {currentItem.clientLocation}</span>
                </div>
              </div>

            </div>

            {/* Right Column: Tailoring Craft Specifications & Direct Order Callout */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-stone-800/80 bg-stone-900/90">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id}
                  variants={contentVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-5"
                >
                  {/* Top Metadata & Urdu Title */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-amber-400 text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-1">
                        <Crown className="w-3.5 h-3.5" />
                        <span>SARTOR Master Tailoring</span>
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 leading-snug">
                        {currentItem.title}
                      </h3>
                    </div>

                    <span className="font-urdu text-sm text-amber-200/90 bg-amber-950/60 border border-amber-800/40 px-3 py-1 rounded-lg shrink-0">
                      {currentItem.titleUrdu}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-stone-300 text-sm leading-relaxed">
                    {currentItem.description}
                  </p>

                  {/* Spec Grid: Silhouette, Fabric, Turnaround */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    
                    <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                      <span className="text-[11px] font-mono uppercase text-stone-400 flex items-center gap-1 mb-1">
                        <Scissors className="w-3 h-3 text-amber-400" />
                        <span>Silhouette & Fit</span>
                      </span>
                      <p className="text-xs text-stone-200 font-medium line-clamp-2">
                        {currentItem.silhouette}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                      <span className="text-[11px] font-mono uppercase text-stone-400 flex items-center gap-1 mb-1">
                        <Layers className="w-3 h-3 text-amber-400" />
                        <span>Fabric & Base</span>
                      </span>
                      <p className="text-xs text-stone-200 font-medium line-clamp-2">
                        {currentItem.fabricDetails}
                      </p>
                    </div>

                  </div>

                  {/* Master Craftsmanship Bullet Points */}
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                      Artisan Stitching Standards:
                    </span>
                    <ul className="space-y-1.5">
                      {currentItem.needleworkHighlights.map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Turnaround & Price Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-800">
                    <div className="flex items-center gap-2 text-xs text-stone-300">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      <span>Atelier Turnaround: <strong className="text-stone-100 font-mono">{currentItem.turnaroundTime}</strong></span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-stone-400">
                      <Truck className="w-4 h-4 text-amber-400" />
                      <span>Doorstep Lahore Pick & Drop</span>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  id={`showcase-order-${currentItem.id}`}
                  variant="whatsapp"
                  size="md"
                  onClick={() => handleInquireAboutOutfit(currentItem)}
                  className="flex-1 justify-center shadow-lg shadow-emerald-950/40"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span>Stitch Similar on WhatsApp</span>
                </Button>

                <a
                  href="#size-chart"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors text-center"
                >
                  <span>View Size Chart</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5 text-stone-400" />
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* Clickable Thumbnail Strip Carousel */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3 text-xs text-stone-400 font-mono">
            <span>Select Any Finished Garment:</span>
            <span>Keyboard: ← / → Arrow Keys</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {filteredItems.map((item, idx) => {
              const isSelected = idx === activeItemIndex;
              return (
                <button
                  key={item.id}
                  id={`showcase-thumb-${item.id}`}
                  onClick={() => jumpToSlide(idx)}
                  className={`group relative rounded-xl overflow-hidden text-left border transition-all ${
                    isSelected
                      ? 'border-amber-500 ring-2 ring-amber-500/40 shadow-lg'
                      : 'border-stone-800 hover:border-amber-700/60 bg-stone-900/60 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-stone-950 relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    
                    {isSelected && (
                      <motion.div
                        layoutId="activeThumbHighlight"
                        className="absolute inset-0 border-2 border-amber-400 rounded-xl pointer-events-none"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}
                  </div>

                  <div className="p-2 bg-stone-900">
                    <p className="text-[11px] font-semibold text-stone-200 truncate group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-amber-400/90 font-mono">
                      {item.priceDisplay}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Lahore Atelier Assurance Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900/90 to-amber-950/30 border border-stone-800 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <SartorLogo variant="emblem" size="sm" />
            <div>
              <h4 className="text-sm font-semibold text-stone-100">
                Have a customized picture or design in mind?
              </h4>
              <p className="text-xs text-stone-400">
                Share any Instagram photo, celebrity outfit, or designer sketch directly with our Master Cutter at Moon Tower Model Town.
              </p>
            </div>
          </div>

          <Button
            id="showcase-custom-whatsapp-cta"
            variant="outline"
            size="sm"
            onClick={() => {
              const msg = `Assalam-o-Alaikum SARTOR Lahore,
I have a picture/sketch of a custom outfit that I would like stitched. Can I share the photo for a consultation and price estimate?`;
              const url = buildWhatsAppLink(msg, 'service_showcase');
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
            className="shrink-0 text-amber-300 border-amber-600/50 hover:bg-amber-950/40"
          >
            <MessageSquare className="w-3.5 h-3.5 mr-2 text-emerald-400" />
            <span>Send Photo on WhatsApp</span>
          </Button>
        </div>

      </div>

      {/* Lightbox Modal for High-Resolution Tailoring Examination */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              id="lightbox-close-btn"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close high resolution viewer"
              className="absolute top-5 right-5 p-2.5 rounded-full bg-stone-900/80 border border-stone-700 text-stone-200 hover:text-white hover:bg-stone-800 transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <div
              className="max-w-4xl max-h-[90vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.35, ease: easeCurve }}
                src={currentItem.imageUrl}
                alt={currentItem.title}
                className="max-h-[75vh] w-auto max-w-full rounded-2xl border border-stone-800 shadow-2xl object-contain"
                referrerPolicy="no-referrer"
              />
              
              <div className="mt-4 text-center">
                <h3 className="text-lg font-serif font-bold text-stone-100">
                  {currentItem.title} ({currentItem.titleUrdu})
                </h3>
                <p className="text-xs text-amber-400 font-mono mt-0.5">
                  {currentItem.priceDisplay} • {currentItem.silhouette}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

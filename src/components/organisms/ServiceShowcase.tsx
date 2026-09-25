import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Crown,
  Layers,
  MapPin,
  Maximize2,
  MessageSquare,
  Pause,
  Play,
  Scissors,
  Sparkles,
  Truck,
  Image as ImageIcon,
  Grid,
  Sparkle,
  Upload,
  Code2,
  Check,
  Camera,
  FolderOpen,
  Link2,
} from 'lucide-react';
import {
  BESPOKE_SUITES,
  BespokeSuite,
  ShowcaseCategory,
} from '../../data/showcaseGallery';
import { ShowcaseLightbox } from '../molecules/ShowcaseLightbox';
import { analytics, buildWhatsAppLink } from '../../services/analytics';
import { SartorLogo } from '../atoms/SartorLogo';
import { Button } from '../atoms/Button';
import { LazyImage } from '../atoms/LazyImage';

// Maintain backward compatibility interface
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

// Backward compatibility export mapped to BESPOKE_SUITES
export const TAILORING_RESULTS: TailoringResult[] = BESPOKE_SUITES.map((suite) => ({
  id: suite.id,
  title: suite.title,
  titleUrdu: suite.titleUrdu,
  category:
    suite.category === 'bridal'
      ? 'Bridal & Couture'
      : suite.category === 'partywear'
      ? 'Festive Suits & Frocks'
      : 'Everyday Pret',
  priceDisplay: suite.priceDisplay,
  priceValue: suite.priceValue,
  imageUrl: suite.primaryImage,
  turnaroundTime: suite.turnaroundTime,
  silhouette: suite.silhouette,
  fabricDetails: suite.fabricDetails,
  needleworkHighlights: suite.needleworkHighlights,
  clientLocation: suite.clientLocation,
  description: suite.description,
}));

const easeCurve = [0.22, 1, 0.36, 1] as const;

// Framer-motion transition variants for image slide
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 70 : -70,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeCurve,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -70 : 70,
    opacity: 0,
    scale: 0.97,
    transition: {
      duration: 0.4,
      ease: easeCurve,
    },
  }),
};

const contentVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeCurve },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: easeCurve },
  },
};

const AUTOPLAY_INTERVAL = 6000;

export const ServiceShowcase: React.FC = () => {
  const [viewMode, setViewMode] = useState<'spotlight' | 'grid' | 'guide'>('spotlight');
  const [selectedCategory, setSelectedCategory] = useState<'all' | ShowcaseCategory>('all');
  const [[currentIndex, direction], setPage] = useState<[number, number]>([0, 0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [activeSuiteForLightbox, setActiveSuiteForLightbox] = useState<string>(BESPOKE_SUITES[0].id);
  const [lightboxInitialPhotoIndex, setLightboxInitialPhotoIndex] = useState<number>(0);

  // In-App Custom Photo Tester State
  const [testCustomImageUrl, setTestCustomImageUrl] = useState<string>('');
  const [testCustomTitle, setTestCustomTitle] = useState<string>('My Custom Stitched Outfit');
  const [testCustomCategory, setTestCustomCategory] = useState<ShowcaseCategory>('bridal');
  const [previewActive, setPreviewActive] = useState<boolean>(false);
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);

  // Filter items
  const filteredSuites = selectedCategory === 'all'
    ? BESPOKE_SUITES
    : BESPOKE_SUITES.filter((item) => item.category === selectedCategory);

  // Clamp index within filtered suites
  const activeItemIndex = currentIndex % filteredSuites.length;
  const currentSuite = filteredSuites[activeItemIndex] || BESPOKE_SUITES[0];

  const paginate = useCallback((newDirection: number) => {
    setPage(([prevIndex]) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = filteredSuites.length - 1;
      if (nextIndex >= filteredSuites.length) nextIndex = 0;
      return [nextIndex, newDirection];
    });
  }, [filteredSuites.length]);

  const jumpToSlide = (targetIndex: number) => {
    const dir = targetIndex > activeItemIndex ? 1 : -1;
    setPage([targetIndex, dir]);
  };

  // Autoplay management (only active in spotlight view)
  useEffect(() => {
    if (!isPlaying || viewMode !== 'spotlight') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      paginate(1);
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, paginate, activeItemIndex, viewMode]);

  // Keyboard navigation when lightbox is closed
  useEffect(() => {
    if (lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'spotlight') return;
      if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, paginate, viewMode]);

  // Open Lightbox
  const handleOpenLightbox = (suiteId: string, photoIndex: number = 0) => {
    setActiveSuiteForLightbox(suiteId);
    setLightboxInitialPhotoIndex(photoIndex);
    setLightboxOpen(true);
  };

  // WhatsApp CTA for a specific suite
  const handleInquireAboutSuite = (item: BespokeSuite) => {
    analytics.trackEvent('whatsapp_click', {
      channel: 'service_showcase',
      outfit: item.title,
      category: item.categoryLabel,
    });

    const msg = `*TAILORING SHOWCASE INQUIRY - SARTOR LAHORE*
---------------------------------------------
• Finished Result: ${item.title} (${item.titleUrdu})
• Category: ${item.categoryLabel}
• Listed Stitching: ${item.priceDisplay}
• Atelier: Moon Tower, Model Town, Lahore

Assalam-o-Alaikum SARTOR Master Tailor,
I was viewing your portfolio photo for *${item.title}*. 
I would like to get similar custom stitching / embroidery done for my fabric. 

Please let me know how to arrange fabric pick-up in Lahore or send my measurements.`;

    const url = buildWhatsAppLink(msg, 'service_showcase');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Handle local file preview in tester
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setTestCustomImageUrl(objectUrl);
      setPreviewActive(true);
    }
  };

  // Sample code snippet for copy
  const sampleCodeSnippet = `// In src/data/showcaseGallery.ts
import myDressImg from '../assets/images/my_dress.jpg';

// Add to BESPOKE_SUITES array:
{
  id: 'my-custom-dress',
  title: '${testCustomTitle || "My Custom Bespoke Outfit"}',
  titleUrdu: 'کسٹم سوٹ',
  category: '${testCustomCategory}',
  categoryLabel: '${testCustomCategory === "bridal" ? "Bridal Bespoke" : testCustomCategory === "partywear" ? "Party Wear & Festive" : "Casual Bespoke"}',
  priceDisplay: 'PKR 4,500',
  turnaroundTime: '5 - 7 Days',
  silhouette: 'Custom tailored silhouette',
  fabricDetails: 'Pure Raw Silk / Chiffon',
  needleworkHighlights: ['Hand embroidery', 'French seams'],
  clientLocation: 'Model Town, Lahore',
  description: 'Custom bespoke stitching tailored to perfection.',
  primaryImage: myDressImg, // Or direct URL
  gallery: [
    { url: myDressImg, caption: 'Full front silhouette', angle: 'Full Silhouette' },
  ],
}`;

  return (
    <section
      id="portfolio"
      className="relative py-16 md:py-24 bg-stone-950 text-stone-100 border-b border-stone-800 overflow-hidden"
      aria-label="Tailoring Results Showcase Gallery"
    >
      <div id="service-showcase" className="absolute -top-20" />
      {/* Decorative ambient background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[360px] bg-amber-600/5 blur-[130px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: easeCurve }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-600/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Finished Atelier Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-100 tracking-tight">
              Service Showcase: <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                Bridal, Party Wear & Casual Suites
              </span>
            </h2>
            <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
              Examine high-resolution tailoring craftsmanship stitched at our Moon Tower Model Town atelier. Click any garment to inspect multi-angle embroidery close-ups and silhouette details in our interactive Lightbox.
            </p>
          </div>

          {/* View Mode Switcher (Spotlight / Portfolio Grid / Put Your Own Images) */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-end">
            <div className="flex items-center p-1 rounded-xl bg-stone-900 border border-stone-800">
              <button
                id="showcase-mode-spotlight"
                onClick={() => setViewMode('spotlight')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  viewMode === 'spotlight'
                    ? 'bg-amber-600 text-stone-950 font-semibold shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Sparkle className="w-3.5 h-3.5" />
                <span>Spotlight Stage</span>
              </button>

              <button
                id="showcase-mode-grid"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-amber-600 text-stone-950 font-semibold shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Portfolio Grid</span>
              </button>

              <button
                id="showcase-mode-guide"
                onClick={() => setViewMode('guide')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  viewMode === 'guide'
                    ? 'bg-amber-600 text-stone-950 font-semibold shadow-sm'
                    : 'text-stone-300 hover:text-amber-300 hover:bg-stone-800'
                }`}
                title="Learn how to put your own images into this gallery"
              >
                <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">How to Add Images</span>
                <span className="sm:hidden">Add Images</span>
              </button>
            </div>

            {/* Autoplay & Navigation Controls (in spotlight view) */}
            {viewMode === 'spotlight' && (
              <div className="flex items-center gap-2">
                <button
                  id="showcase-autoplay-toggle"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? 'Pause auto cycling' : 'Start auto cycling'}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs font-medium text-stone-300 hover:text-amber-400 hover:border-amber-600/50 transition-colors"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-amber-400" />
                      <span className="hidden sm:inline">Auto</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-stone-400" />
                      <span className="hidden sm:inline">Play</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1 p-1 rounded-xl bg-stone-900 border border-stone-800">
                  <button
                    id="showcase-prev-btn"
                    onClick={() => paginate(-1)}
                    aria-label="Previous tailoring result"
                    className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-stone-400 px-1.5 select-none">
                    {activeItemIndex + 1}/{filteredSuites.length}
                  </span>
                  <button
                    id="showcase-next-btn"
                    onClick={() => paginate(1)}
                    aria-label="Next tailoring result"
                    className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {[
            { id: 'all', label: `All Suites (${BESPOKE_SUITES.length})` },
            {
              id: 'bridal',
              label: `Bridal Bespoke (${BESPOKE_SUITES.filter((s) => s.category === 'bridal').length})`,
            },
            {
              id: 'partywear',
              label: `Party Wear & Festive (${BESPOKE_SUITES.filter((s) => s.category === 'partywear').length})`,
            },
            {
              id: 'casual',
              label: `Casual Bespoke (${BESPOKE_SUITES.filter((s) => s.category === 'casual').length})`,
            },
          ].map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id as 'all' | ShowcaseCategory);
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
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* VIEW 1: SPOTLIGHT STAGE */}
        {viewMode === 'spotlight' && (
          <div className="space-y-8">
            {/* Dynamic Progress Bar for Autoplay */}
            {isPlaying && (
              <div className="w-full h-1 bg-stone-800/70 rounded-full overflow-hidden">
                <motion.div
                  key={`${activeItemIndex}-${selectedCategory}`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: 'linear' }}
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                />
              </div>
            )}

            {/* Two-Column Interactive Canvas */}
            <div className="relative rounded-3xl bg-stone-900/80 border border-stone-800/90 shadow-2xl overflow-hidden backdrop-blur-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[520px]">
                
                {/* Left Column: Photo Stage with Framer-Motion Transitions */}
                <div
                  className="lg:col-span-6 relative overflow-hidden bg-stone-950 flex items-center justify-center min-h-[380px] lg:min-h-[520px] group cursor-pointer"
                  onClick={() => handleOpenLightbox(currentSuite.id, 0)}
                >
                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                      key={currentSuite.id}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 w-full h-full"
                    >
                      <LazyImage
                        src={currentSuite.primaryImage}
                        alt={currentSuite.title}
                        priority={activeItemIndex === 0}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-stone-950/10 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-stone-900/40 hidden lg:block pointer-events-none" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Badges on the image */}
                  <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-stone-950/85 backdrop-blur-md border border-amber-600/50 text-amber-300 text-xs font-semibold shadow-lg">
                      {currentSuite.categoryLabel}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-stone-700 text-[11px] font-mono text-stone-300">
                      {currentSuite.priceDisplay}
                    </span>
                  </div>

                  {/* High Resolution Lightbox Trigger Button */}
                  <button
                    id="showcase-expand-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenLightbox(currentSuite.id, 0);
                    }}
                    aria-label="Open full high-resolution gallery lightbox"
                    className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-950/85 backdrop-blur-md border border-stone-700/80 text-stone-200 hover:text-amber-400 hover:border-amber-500 transition-all shadow-lg text-xs"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Open Lightbox</span>
                    {currentSuite.gallery.length > 1 && (
                      <span className="ml-1 px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono">
                        {currentSuite.gallery.length} Angles
                      </span>
                    )}
                  </button>

                  {/* Bottom Image Caption & Multi-Angle Hints */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-2 text-xs font-medium text-stone-300 bg-stone-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-800">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Client Stitched in {currentSuite.clientLocation}</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-1 text-[11px] text-amber-300 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-900/60">
                      <Camera className="w-3 h-3 text-amber-400" />
                      <span>Click to zoom</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Tailoring Craft Specifications */}
                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-stone-800/80 bg-stone-900/90">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSuite.id}
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
                            <span>SARTOR Bespoke Atelier</span>
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 leading-snug">
                            {currentSuite.title}
                          </h3>
                        </div>

                        <span className="font-urdu text-sm text-amber-200/90 bg-amber-950/60 border border-amber-800/40 px-3 py-1 rounded-lg shrink-0">
                          {currentSuite.titleUrdu}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-stone-300 text-sm leading-relaxed">
                        {currentSuite.description}
                      </p>

                      {/* Spec Grid: Silhouette, Fabric */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                        <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                          <span className="text-[11px] font-mono uppercase text-stone-400 flex items-center gap-1 mb-1">
                            <Scissors className="w-3 h-3 text-amber-400" />
                            <span>Silhouette & Fit</span>
                          </span>
                          <p className="text-xs text-stone-200 font-medium line-clamp-2">
                            {currentSuite.silhouette}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                          <span className="text-[11px] font-mono uppercase text-stone-400 flex items-center gap-1 mb-1">
                            <Layers className="w-3 h-3 text-amber-400" />
                            <span>Fabric & Base</span>
                          </span>
                          <p className="text-xs text-stone-200 font-medium line-clamp-2">
                            {currentSuite.fabricDetails}
                          </p>
                        </div>
                      </div>

                      {/* Master Craftsmanship Bullet Points */}
                      <div className="space-y-2 pt-1">
                        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                          Artisan Stitching Standards:
                        </span>
                        <ul className="space-y-1.5">
                          {currentSuite.needleworkHighlights.map((hl, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Turnaround & Price Tag */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-stone-800">
                        <div className="flex items-center gap-2 text-xs text-stone-300">
                          <Clock className="w-4 h-4 text-emerald-400" />
                          <span>
                            Atelier Turnaround: <strong className="text-stone-100 font-mono">{currentSuite.turnaroundTime}</strong>
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-stone-400">
                          <Truck className="w-4 h-4 text-amber-400" />
                          <span>Doorstep Lahore Pick & Drop</span>
                        </div>
                      </div>

                      {/* Angle Thumbnails Preview for current suite */}
                      {currentSuite.gallery.length > 1 && (
                        <div className="pt-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-mono text-stone-400">
                              Available Photo Angles ({currentSuite.gallery.length}):
                            </span>
                            <button
                              onClick={() => handleOpenLightbox(currentSuite.id, 0)}
                              className="text-[11px] text-amber-400 hover:text-amber-300 underline"
                            >
                              Expand in Lightbox →
                            </button>
                          </div>
                          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                            {currentSuite.gallery.map((photo, pIdx) => (
                              <button
                                key={pIdx}
                                onClick={() => handleOpenLightbox(currentSuite.id, pIdx)}
                                className="group relative w-14 h-14 rounded-lg overflow-hidden border border-stone-700 hover:border-amber-400 transition-all shrink-0"
                                title={photo.caption}
                              >
                                <LazyImage
                                  src={photo.url}
                                  alt={photo.caption}
                                  priority={false}
                                  wrapperClassName="w-full h-full"
                                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors pointer-events-none" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Action Buttons */}
                  <div className="pt-6 mt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <Button
                      id={`showcase-order-${currentSuite.id}`}
                      variant="whatsapp"
                      size="md"
                      onClick={() => handleInquireAboutSuite(currentSuite)}
                      className="flex-1 justify-center shadow-lg shadow-emerald-950/40"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      <span>Stitch Similar on WhatsApp</span>
                    </Button>

                    <button
                      onClick={() => handleOpenLightbox(currentSuite.id, 0)}
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors text-center"
                    >
                      <Maximize2 className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                      <span>Inspect Details</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>

            {/* Clickable Thumbnail Strip */}
            <div>
              <div className="flex items-center justify-between mb-3 text-xs text-stone-400 font-mono">
                <span>Select Any Finished Bespoke Suite:</span>
                <span>Keyboard: ← / → Arrow Keys</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {filteredSuites.map((item, idx) => {
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
                        <LazyImage
                          src={item.primaryImage}
                          alt={item.title}
                          priority={false}
                          wrapperClassName="w-full h-full"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors pointer-events-none" />

                        {/* Angles Count Badge */}
                        <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[9px] font-mono text-stone-300">
                          {item.gallery.length} 📷
                        </div>

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
          </div>
        )}

        {/* VIEW 2: PORTFOLIO GALLERY GRID */}
        {viewMode === 'grid' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSuites.map((suite) => (
                <div
                  key={suite.id}
                  className="group rounded-2xl bg-stone-900/90 border border-stone-800 hover:border-amber-600/60 transition-all overflow-hidden flex flex-col justify-between shadow-xl"
                >
                  {/* Image Container with Hover Effects */}
                  <div
                    className="relative aspect-[4/3] overflow-hidden bg-stone-950 cursor-pointer"
                    onClick={() => handleOpenLightbox(suite.id, 0)}
                  >
                    <LazyImage
                      src={suite.primaryImage}
                      alt={suite.title}
                      priority={false}
                      wrapperClassName="w-full h-full"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-black/30 pointer-events-none" />

                    {/* Category & Price Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-stone-950/80 backdrop-blur-md border border-amber-600/50 text-amber-300 text-[11px] font-semibold">
                        {suite.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-stone-700 text-[11px] font-mono text-stone-200">
                        {suite.priceDisplay}
                      </span>
                    </div>

                    {/* Bottom overlay: Title and angle count */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div className="min-w-0 pr-2">
                        <span className="text-[10px] font-mono text-stone-400 block">
                          Client: {suite.clientLocation}
                        </span>
                        <h4 className="text-sm font-serif font-bold text-stone-100 truncate group-hover:text-amber-300 transition-colors">
                          {suite.title}
                        </h4>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenLightbox(suite.id, 0);
                        }}
                        className="p-2 rounded-lg bg-stone-900/90 text-stone-300 group-hover:text-amber-400 group-hover:bg-stone-800 transition-all border border-stone-700"
                        title="Expand in Lightbox"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                      {suite.description}
                    </p>

                    {/* Multi-angle Mini Thumbnails */}
                    {suite.gallery.length > 1 && (
                      <div className="space-y-1.5 pt-2 border-t border-stone-800/80">
                        <span className="text-[10px] font-mono text-stone-400 flex items-center justify-between">
                          <span>{suite.gallery.length} Camera Angles:</span>
                          <span className="text-amber-400">Click angle to zoom</span>
                        </span>
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                          {suite.gallery.map((photo, pIdx) => (
                            <button
                              key={pIdx}
                              onClick={() => handleOpenLightbox(suite.id, pIdx)}
                              className="group/thumb relative w-10 h-10 rounded-md overflow-hidden border border-stone-700 hover:border-amber-400 transition-all shrink-0"
                              title={photo.caption}
                            >
                              <LazyImage
                                src={photo.url}
                                alt={photo.caption}
                                priority={false}
                                wrapperClassName="w-full h-full"
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-2">
                      <span className="text-[11px] text-stone-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        <span>{suite.turnaroundTime}</span>
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenLightbox(suite.id, 0)}
                          className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-medium border border-stone-700 transition-colors"
                        >
                          View Angles
                        </button>
                        <Button
                          variant="whatsapp"
                          size="sm"
                          onClick={() => handleInquireAboutSuite(suite)}
                          className="text-xs py-1.5 px-3"
                        >
                          <MessageSquare className="w-3.5 h-3.5 mr-1" />
                          <span>Inquire</span>
                        </Button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* VIEW 3: HOW TO PUT YOUR OWN IMAGES (GUIDE & LIVE TESTER) */}
        {viewMode === 'guide' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8 max-w-5xl mx-auto"
          >
            {/* Guide Header Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-stone-900 border border-amber-600/40 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <FolderOpen className="w-6 h-6 text-amber-400" />
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">
                  How to Put Your Own Images in the Gallery
                </h3>
              </div>
              <p className="text-sm text-stone-300 leading-relaxed">
                You can easily add your own photographs for bridal lehengas, party wear suits, and casual pret outfits. SARTOR supports three seamless methods: local assets, public folder links, or direct cloud image URLs.
              </p>
            </div>

            {/* 3 Methods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Method 1: Local Files */}
              <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
                    1
                  </div>
                  <h4 className="text-base font-serif font-bold text-stone-100">
                    Local Image File
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Save your photo inside <code className="text-amber-300 font-mono bg-stone-950 px-1.5 py-0.5 rounded">src/assets/images/</code> (e.g. <code className="text-stone-300 font-mono">my_bridal_suit.jpg</code>).
                  </p>
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] font-mono text-stone-300 overflow-x-auto">
                    <span className="text-stone-500">// in showcaseGallery.ts:</span><br />
                    import myImg from &apos;../assets/images/my_suit.jpg&apos;;<br /><br />
                    primaryImage: myImg
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Best for production builds</span>
                </div>
              </div>

              {/* Method 2: Public Folder */}
              <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
                    2
                  </div>
                  <h4 className="text-base font-serif font-bold text-stone-100">
                    Public Folder Reference
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Drop your photos into <code className="text-amber-300 font-mono bg-stone-950 px-1.5 py-0.5 rounded">public/portfolio/</code> without needing any TypeScript import statements.
                  </p>
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] font-mono text-stone-300 overflow-x-auto">
                    <span className="text-stone-500">// in showcaseGallery.ts:</span><br /><br />
                    primaryImage: &apos;/portfolio/bridal-01.jpg&apos;
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Direct URL paths</span>
                </div>
              </div>

              {/* Method 3: Cloud / CDN URLs */}
              <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
                    3
                  </div>
                  <h4 className="text-base font-serif font-bold text-stone-100">
                    Cloud / CDN URLs
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Upload to Cloudinary, AWS S3, Imgur, or Shopify CDN and paste the HTTPS URL directly into the gallery.
                  </p>
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] font-mono text-stone-300 overflow-x-auto">
                    <span className="text-stone-500">// in showcaseGallery.ts:</span><br /><br />
                    primaryImage: &apos;https://cdn.com/suit.jpg&apos;
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Instant updates without rebuild</span>
                </div>
              </div>

            </div>

            {/* Interactive Image Tester: Try your own image live! */}
            <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-lg font-serif font-bold text-stone-100 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-amber-400" />
                    <span>Live In-Browser Image Tester</span>
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Test your own image right now to preview how it looks in the SARTOR Lightbox:
                  </p>
                </div>

                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 cursor-pointer transition-colors shrink-0">
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  <span>Upload Local File from Device</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* URL Input Form */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-8 relative">
                  <Link2 className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={testCustomImageUrl}
                    onChange={(e) => {
                      setTestCustomImageUrl(e.target.value);
                      setPreviewActive(true);
                    }}
                    placeholder="Or paste any image HTTPS URL here (e.g. Unsplash, Cloudinary, Imgur)..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-4 flex items-center gap-2">
                  <select
                    value={testCustomCategory}
                    onChange={(e) => setTestCustomCategory(e.target.value as ShowcaseCategory)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="bridal">Bridal Bespoke</option>
                    <option value="partywear">Party Wear & Festive</option>
                    <option value="casual">Casual Bespoke</option>
                  </select>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      if (!testCustomImageUrl) {
                        setTestCustomImageUrl(
                          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80'
                        );
                      }
                      setPreviewActive(true);
                    }}
                    className="shrink-0 text-xs py-2.5"
                  >
                    Test Preview
                  </Button>
                </div>
              </div>

              {/* Live Preview Display */}
              {previewActive && testCustomImageUrl && (
                <div className="p-4 rounded-2xl bg-stone-950 border border-amber-600/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Live Render Result:</span>
                    </span>
                    <button
                      onClick={() => {
                        // Open temporary suite in lightbox
                        const tempSuite: BespokeSuite = {
                          id: 'custom-preview',
                          title: testCustomTitle,
                          titleUrdu: 'کسٹم سوٹ',
                          category: testCustomCategory,
                          categoryLabel:
                            testCustomCategory === 'bridal'
                              ? 'Bridal Bespoke'
                              : testCustomCategory === 'partywear'
                              ? 'Party Wear & Festive'
                              : 'Casual Bespoke',
                          priceDisplay: 'PKR 4,500',
                          turnaroundTime: '5 - 7 Days',
                          silhouette: 'Custom bespoke tailored silhouette',
                          fabricDetails: 'Client Specified Fabric',
                          needleworkHighlights: ['Hand embroidered detailing', 'Precision trial fitting'],
                          clientLocation: 'Model Town, Lahore',
                          description: 'Custom previewed client outfit in the SARTOR atelier.',
                          primaryImage: testCustomImageUrl,
                          gallery: [
                            { url: testCustomImageUrl, caption: 'Custom previewed photo angle', angle: 'Full Silhouette' },
                          ],
                        };
                        // Temporarily mount into suites for lightbox
                        setActiveSuiteForLightbox(tempSuite.id);
                        setLightboxOpen(true);
                      }}
                      className="text-xs text-amber-400 hover:text-amber-300 underline flex items-center gap-1"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Open in Fullscreen Lightbox</span>
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-36 h-36 rounded-xl overflow-hidden bg-stone-900 border border-stone-800 shrink-0">
                      <LazyImage
                        src={testCustomImageUrl}
                        alt="Custom outfit preview"
                        priority={true}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1.5 text-xs text-stone-300">
                      <p className="font-semibold text-stone-100 text-sm">
                        {testCustomTitle}
                      </p>
                      <p className="text-stone-400">
                        Category:{' '}
                        <span className="text-amber-400 font-mono">
                          {testCustomCategory.toUpperCase()}
                        </span>
                      </p>
                      <p className="text-emerald-400 text-[11px] flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Valid image! Ready to paste into `src/data/showcaseGallery.ts`</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Ready-to-copy code snippet */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-stone-400 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Copy-Paste Template for `src/data/showcaseGallery.ts`:</span>
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(sampleCodeSnippet);
                      setCopiedSnippet(true);
                      setTimeout(() => setCopiedSnippet(false), 2000);
                    }}
                    className="text-xs text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1"
                  >
                    {copiedSnippet ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <span>Copy Snippet</span>
                    )}
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-[11px] font-mono text-stone-300 overflow-x-auto leading-relaxed">
                  {sampleCodeSnippet}
                </pre>
              </div>

            </div>

          </motion.div>
        )}

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

      {/* Lightbox Modal Component */}
      <ShowcaseLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        suites={
          activeSuiteForLightbox === 'custom-preview'
            ? [
                {
                  id: 'custom-preview',
                  title: testCustomTitle,
                  titleUrdu: 'کسٹم سوٹ',
                  category: testCustomCategory,
                  categoryLabel:
                    testCustomCategory === 'bridal'
                      ? 'Bridal Bespoke'
                      : testCustomCategory === 'partywear'
                      ? 'Party Wear & Festive'
                      : 'Casual Bespoke',
                  priceDisplay: 'PKR 4,500',
                  turnaroundTime: '5 - 7 Days',
                  silhouette: 'Custom bespoke tailored silhouette',
                  fabricDetails: 'Client Specified Fabric',
                  needleworkHighlights: ['Hand embroidered detailing', 'Precision trial fitting'],
                  clientLocation: 'Model Town, Lahore',
                  description: 'Custom previewed client outfit in the SARTOR atelier.',
                  primaryImage: testCustomImageUrl,
                  gallery: [
                    {
                      url: testCustomImageUrl,
                      caption: 'Custom previewed photo angle',
                      angle: 'Full Silhouette',
                    },
                  ],
                },
                ...BESPOKE_SUITES,
              ]
            : BESPOKE_SUITES
        }
        activeSuiteId={activeSuiteForLightbox}
        initialPhotoIndex={lightboxInitialPhotoIndex}
        onSelectSuite={(id) => setActiveSuiteForLightbox(id)}
      />

    </section>
  );
};

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  MessageSquare,
  Sparkles,
  Clock,
} from 'lucide-react';
import { BespokeSuite, GalleryPhoto } from '../../data/showcaseGallery';
import { buildWhatsAppLink, analytics } from '../../services/analytics';
import { Button } from '../atoms/Button';
import { LazyImage } from '../atoms/LazyImage';

interface ShowcaseLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  suites: BespokeSuite[];
  activeSuiteId: string;
  initialPhotoIndex?: number;
  onSelectSuite?: (suiteId: string) => void;
}

export const ShowcaseLightbox: React.FC<ShowcaseLightboxProps> = ({
  isOpen,
  onClose,
  suites,
  activeSuiteId,
  initialPhotoIndex = 0,
  onSelectSuite,
}) => {
  const [currentSuiteId, setCurrentSuiteId] = useState<string>(activeSuiteId);
  const [photoIndex, setPhotoIndex] = useState<number>(initialPhotoIndex);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const imageRef = useRef<HTMLImageElement>(null);

  // Sync state when props change
  useEffect(() => {
    if (isOpen) {
      setCurrentSuiteId(activeSuiteId);
      setPhotoIndex(initialPhotoIndex);
      setIsZoomed(false);
      setImageLoading(true);
    }
  }, [isOpen, activeSuiteId, initialPhotoIndex]);

  const activeSuite = suites.find((s) => s.id === currentSuiteId) || suites[0];
  const galleryPhotos: GalleryPhoto[] =
    activeSuite.gallery && activeSuite.gallery.length > 0
      ? activeSuite.gallery
      : [{ url: activeSuite.primaryImage, caption: activeSuite.title, angle: 'Full Silhouette' }];

  const currentPhoto = galleryPhotos[photoIndex] || galleryPhotos[0];

  const handleNextPhoto = useCallback(() => {
    setImageLoading(true);
    setIsZoomed(false);
    setPhotoIndex((prev) => (prev + 1) % galleryPhotos.length);
  }, [galleryPhotos.length]);

  const handlePrevPhoto = useCallback(() => {
    setImageLoading(true);
    setIsZoomed(false);
    setPhotoIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
  }, [galleryPhotos.length]);

  const handleNextSuite = useCallback(() => {
    const currentIndex = suites.findIndex((s) => s.id === currentSuiteId);
    const nextIndex = (currentIndex + 1) % suites.length;
    const nextSuite = suites[nextIndex];
    setCurrentSuiteId(nextSuite.id);
    setPhotoIndex(0);
    setIsZoomed(false);
    setImageLoading(true);
    if (onSelectSuite) onSelectSuite(nextSuite.id);
  }, [suites, currentSuiteId, onSelectSuite]);

  const handlePrevSuite = useCallback(() => {
    const currentIndex = suites.findIndex((s) => s.id === currentSuiteId);
    const prevIndex = (currentIndex - 1 + suites.length) % suites.length;
    const prevSuite = suites[prevIndex];
    setCurrentSuiteId(prevSuite.id);
    setPhotoIndex(0);
    setIsZoomed(false);
    setImageLoading(true);
    if (onSelectSuite) onSelectSuite(prevSuite.id);
  }, [suites, currentSuiteId, onSelectSuite]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNextPhoto();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      } else if (e.key === 'z' || e.key === 'Z') {
        setIsZoomed((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNextPhoto, handlePrevPhoto]);

  // WhatsApp Inquiry for the exact photo/angle viewed
  const handleWhatsAppInquiry = () => {
    analytics.trackEvent('whatsapp_click', {
      channel: 'lightbox_gallery',
      suite: activeSuite.title,
      angle: currentPhoto.angle,
      price: activeSuite.priceDisplay,
    });

    const msg = `*PORTFOLIO GALLERY INQUIRY - SARTOR LAHORE*
---------------------------------------------
• Bespoke Suite: ${activeSuite.title} (${activeSuite.titleUrdu})
• Category: ${activeSuite.categoryLabel}
• Photo Angle: ${currentPhoto.angle}
• Listed Stitching: ${activeSuite.priceDisplay}
• Atelier Turnaround: ${activeSuite.turnaroundTime}
• Fabric Details: ${activeSuite.fabricDetails}

Assalam-o-Alaikum SARTOR Master Tailor,
I was reviewing your high-resolution portfolio photo for *${activeSuite.title}* (Viewing: ${currentPhoto.caption}).

I would like to inquire about getting a similar bespoke outfit stitched for my measurements. Could you please share fabric requirements or arrange pick-up in Lahore?`;

    const url = buildWhatsAppLink(msg, 'service_showcase');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex flex-col justify-between select-none overflow-hidden"
        onClick={() => {
          if (isZoomed) {
            setIsZoomed(false);
          } else {
            onClose();
          }
        }}
      >
        {/* Top Control Bar */}
        <div
          className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-stone-900/80 border-b border-stone-800/80 backdrop-blur-md"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Suite Title & Badge */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="px-2.5 py-1 rounded-md bg-amber-950/70 border border-amber-600/40 text-amber-300 text-[11px] font-semibold uppercase tracking-wider shrink-0">
              {activeSuite.categoryLabel}
            </span>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-serif font-bold text-stone-100 truncate">
                {activeSuite.title}
              </h3>
              <p className="text-[11px] text-stone-400 truncate hidden sm:block">
                {currentPhoto.angle} • {currentPhoto.caption}
              </p>
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Zoom Toggle */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              aria-label={isZoomed ? 'Reset zoom' : 'Zoom in'}
              className="p-2 rounded-lg bg-stone-800/90 text-stone-300 hover:text-amber-400 hover:bg-stone-700 transition-colors border border-stone-700 text-xs flex items-center gap-1"
              title="Toggle Zoom (Press Z)"
            >
              {isZoomed ? (
                <>
                  <ZoomOut className="w-4 h-4" />
                  <span className="hidden md:inline">1x</span>
                </>
              ) : (
                <>
                  <ZoomIn className="w-4 h-4" />
                  <span className="hidden md:inline">2x Zoom</span>
                </>
              )}
            </button>

            {/* Inquire on WhatsApp */}
            <Button
              variant="whatsapp"
              size="sm"
              onClick={handleWhatsAppInquiry}
              className="shadow-sm text-xs py-1.5 px-3"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden sm:inline">Stitch This Design</span>
              <span className="sm:hidden">Inquire</span>
            </Button>

            {/* Close Button */}
            <button
              id="lightbox-close-button"
              onClick={onClose}
              aria-label="Close lightbox (Esc)"
              className="p-2 rounded-lg bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors border border-stone-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Central Stage: High-Resolution Photo Viewer */}
        <div
          className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              if (isZoomed) setIsZoomed(false);
              else onClose();
            }
          }}
        >
          {/* Previous Angle / Photo Button */}
          {galleryPhotos.length > 1 && (
            <button
              id="lightbox-prev-photo"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
              aria-label="Previous image angle"
              className="absolute left-3 sm:left-6 z-20 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-amber-300 border border-stone-700/80 backdrop-blur-md transition-all shadow-xl hover:scale-105"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Main Photo Display */}
          <div
            className={`relative max-h-[70vh] sm:max-h-[75vh] w-full flex items-center justify-center transition-transform duration-300 ${
              isZoomed ? 'scale-150 cursor-grab active:cursor-grabbing overflow-auto' : 'cursor-zoom-in'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(!isZoomed);
            }}
          >
            {/* Loading Skeleton */}
            {imageLoading && (
              <div className="absolute inset-0 max-w-2xl max-h-[60vh] mx-auto rounded-2xl bg-stone-900 animate-pulse flex flex-col items-center justify-center gap-3 border border-stone-800">
                <Sparkles className="w-8 h-8 text-amber-500/50 animate-spin" />
                <span className="text-xs font-mono text-stone-400">Loading High-Resolution View...</span>
              </div>
            )}

            <motion.img
              ref={imageRef}
              key={`${currentSuiteId}-${photoIndex}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: imageLoading ? 0 : 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              src={currentPhoto.url}
              alt={currentPhoto.caption}
              loading="eager"
              decoding="async"
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
              className="max-h-[68vh] sm:max-h-[74vh] max-w-full w-auto object-contain rounded-xl sm:rounded-2xl border border-stone-800 shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Next Angle / Photo Button */}
          {galleryPhotos.length > 1 && (
            <button
              id="lightbox-next-photo"
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
              aria-label="Next image angle"
              className="absolute right-3 sm:right-6 z-20 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-amber-300 border border-stone-700/80 backdrop-blur-md transition-all shadow-xl hover:scale-105"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Angle Badge Overlay */}
          <div className="absolute bottom-4 left-4 sm:left-8 z-10 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-950/80 backdrop-blur-md border border-stone-800 text-xs text-stone-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Angle: <strong>{currentPhoto.angle}</strong></span>
            <span className="text-stone-500">•</span>
            <span>{currentPhoto.caption}</span>
          </div>

          {/* Photo Counter Pill */}
          <div className="absolute top-4 right-4 sm:right-8 z-10 pointer-events-none px-2.5 py-1 rounded-md bg-stone-950/80 backdrop-blur-md border border-stone-800 text-[11px] font-mono text-stone-300">
            {photoIndex + 1} / {galleryPhotos.length}
          </div>
        </div>

        {/* Bottom Thumbnail Strip & Multi-Angle Navigator */}
        <div
          className="relative z-20 px-4 sm:px-6 py-3 bg-stone-900/90 border-t border-stone-800/90 backdrop-blur-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Outfits Switcher Dropdown / Buttons */}
            <div className="flex items-center gap-2 self-start md:self-auto overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-[11px] font-mono text-stone-400 uppercase shrink-0">
                Suites ({suites.length}):
              </span>
              {suites.map((suite) => {
                const isSelected = suite.id === currentSuiteId;
                return (
                  <button
                    key={suite.id}
                    onClick={() => {
                      setCurrentSuiteId(suite.id);
                      setPhotoIndex(0);
                      setIsZoomed(false);
                      setImageLoading(true);
                      if (onSelectSuite) onSelectSuite(suite.id);
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
                      isSelected
                        ? 'bg-amber-600 text-stone-950 font-bold'
                        : 'bg-stone-800/80 text-stone-300 hover:text-white hover:bg-stone-750 border border-stone-700/60'
                    }`}
                  >
                    {suite.title.split(' ')[0]} {suite.title.split(' ')[1] || ''}
                  </button>
                );
              })}
            </div>

            {/* Thumbnail Strip for the Active Suite */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-[11px] font-mono text-stone-400 uppercase shrink-0">
                Angles ({galleryPhotos.length}):
              </span>
              {galleryPhotos.map((photo, idx) => {
                const isActive = idx === photoIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setImageLoading(true);
                      setIsZoomed(false);
                      setPhotoIndex(idx);
                    }}
                    className={`group relative w-12 h-12 rounded-lg overflow-hidden border transition-all shrink-0 ${
                      isActive
                        ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105 shadow-md'
                        : 'border-stone-700/80 opacity-70 hover:opacity-100 hover:border-stone-500'
                    }`}
                    title={`${photo.angle}: ${photo.caption}`}
                  >
                    <LazyImage
                      src={photo.url}
                      alt={photo.caption}
                      priority={false}
                      wrapperClassName="w-full h-full"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none" />
                  </button>
                );
              })}
            </div>

            {/* Price & Turnaround Specs */}
            <div className="flex items-center gap-3 text-xs text-stone-300 self-end md:self-auto shrink-0">
              <span className="font-mono text-amber-400 font-bold bg-stone-950/70 px-2.5 py-1 rounded border border-stone-800">
                {activeSuite.priceDisplay}
              </span>
              <span className="text-stone-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{activeSuite.turnaroundTime}</span>
              </span>
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

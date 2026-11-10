import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  X,
  Check,
  Sparkles,
  Eye,
  Loader2,
} from 'lucide-react';
import { downloadImageWithSartorWatermark } from '../../utils/watermark';

export interface ArticleHeroImageViewerProps {
  src: string;
  alt: string;
  title: string;
  slug?: string;
  category?: string;
  readingTime?: string;
  author?: string;
  className?: string;
  aspectRatio?: string;
}

export const ArticleHeroImageViewer: React.FC<ArticleHeroImageViewerProps> = ({
  src,
  alt,
  title,
  slug = 'couture-guide',
  category,
  readingTime,
  author = 'Abdul Ghaffar, Master Tailor',
  className = '',
  aspectRatio = 'aspect-[16/9]',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-' || e.key === '_') {
        handleZoomOut();
      } else if (e.key === '0' || e.key.toLowerCase() === 'r') {
        handleResetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, zoom]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(3.5, Number((prev + 0.4).toFixed(1))));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(1, Number((prev - 0.4).toFixed(1)));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleDoubleClick = () => {
    if (zoom > 1.1) {
      handleResetZoom();
    } else {
      setZoom(2.2);
    }
  };

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch pan handlers for mobile/tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom <= 1 || e.touches.length !== 1) return;
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX - pan.x,
      y: e.touches[0].clientY - pan.y,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || zoom <= 1 || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleDownload = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isDownloading) return;

    try {
      setIsDownloading(true);
      await downloadImageWithSartorWatermark(src, {
        title,
        slug,
        designer: author,
        atelier: 'SARTOR Bespoke Atelier • Model Town, Lahore',
      });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to download watermarked image:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      {/* Inline Article Hero Image Container */}
      <div
        className={`group relative mb-12 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-900 ${aspectRatio} cursor-zoom-in select-none ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <picture>
          <source type="image/webp" srcSet={webpSrc} />
          <img
            src={src}
            alt={alt || title}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width={1200}
            height={675}
            onError={(e) => {
              const target = e.currentTarget;
              const picture = target.parentElement;
              if (picture && picture.tagName.toLowerCase() === 'picture') {
                const sources = picture.querySelectorAll('source');
                sources.forEach((s) => s.remove());
              }
            }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </picture>

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/40 pointer-events-none" />

        {/* Top Badges & Actions */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
          {category && (
            <span className="px-3 py-1 rounded-full bg-stone-950/85 backdrop-blur-md border border-stone-700/80 text-amber-300 text-xs font-semibold tracking-wider uppercase shadow-lg">
              ✨ {category}
            </span>
          )}

          {/* Action Pills */}
          <div className="flex items-center gap-2">
            {/* Download with Watermark button */}
            <button
              type="button"
              onClick={handleDownload}
              title="Download High-Res with SARTOR Watermark"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-950/85 hover:bg-amber-500 hover:text-stone-950 text-stone-200 border border-stone-700/80 hover:border-amber-400 text-xs font-semibold backdrop-blur-md transition-all shadow-xl cursor-pointer"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="hidden sm:inline">Watermarking...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Saved!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Save with Sartor Watermark</span>
                  <span className="sm:hidden">Save</span>
                </>
              )}
            </button>

            {/* Inspect / Fullscreen Button */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              title="Inspect Couture Details Fullscreen"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-950/85 hover:bg-stone-850 text-stone-300 hover:text-amber-300 border border-stone-700/80 text-xs font-medium backdrop-blur-md transition-all shadow-xl cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Inspect Details</span>
            </button>
          </div>
        </div>

        {/* Bottom Hover Hint */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-stone-300 z-10 opacity-90 transition-opacity">
          <div className="flex items-center gap-2 drop-shadow-md">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium text-[11px] sm:text-xs">
              Click to view high-resolution embroidery details
            </span>
          </div>

          <span className="hidden sm:inline-block font-mono text-[10px] text-stone-400 bg-stone-950/70 px-2 py-0.5 rounded border border-stone-800">
            Hasselblad 8K Inspection
          </span>
        </div>
      </div>

      {/* Lightbox High-Resolution Modal Image Viewer */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="High-Resolution Couture Image Viewer"
          className="fixed inset-0 z-50 flex flex-col bg-stone-950/95 backdrop-blur-2xl text-stone-100 select-none animate-in fade-in duration-200"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Header Controls Bar */}
          <header className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-stone-800/90 bg-stone-950/90 backdrop-blur-md shrink-0 z-20">
            {/* Atelier Brand and Title */}
            <div className="flex items-center gap-3 max-w-[40%] sm:max-w-md">
              <span className="font-serif font-bold text-lg tracking-widest text-amber-400 shrink-0">
                SARTOR
              </span>
              <span className="hidden sm:inline text-stone-700">|</span>
              <div className="truncate hidden sm:block">
                <p className="text-xs font-semibold text-stone-200 truncate">{title}</p>
                <p className="text-[10px] text-amber-400/90 font-mono uppercase tracking-wider">
                  Couture Inspiration Inspection
                </p>
              </div>
            </div>

            {/* Center Zoom Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 bg-stone-900/90 border border-stone-800 px-2 py-1 rounded-full shadow-lg">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                title="Zoom Out (-)"
                className="p-1.5 rounded-full hover:bg-stone-850 text-stone-300 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono font-semibold px-2 text-stone-300 min-w-[50px] text-center">
                {Math.round(zoom * 100)}%
              </span>

              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= 3.5}
                title="Zoom In (+)"
                className="p-1.5 rounded-full hover:bg-stone-850 text-stone-300 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {zoom !== 1 && (
                <button
                  type="button"
                  onClick={handleResetZoom}
                  title="Reset Zoom (0)"
                  className="p-1.5 rounded-full hover:bg-stone-850 text-amber-400 transition-colors ml-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Right Actions: Download Watermark + Close */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleDownload()}
                disabled={isDownloading}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold tracking-wider transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Watermarking...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Download with Sartor Watermark</span>
                    <span className="md:hidden">Save</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close Viewer (Esc)"
                className="p-2 rounded-full bg-stone-900 hover:bg-stone-850 text-stone-300 hover:text-stone-100 border border-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Main Inspection Viewport Area */}
          <div
            ref={containerRef}
            className={`flex-1 relative overflow-hidden flex items-center justify-center p-4 sm:p-8 ${
              zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
            }`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onDoubleClick={handleDoubleClick}
          >
            <div
              className="relative max-w-full max-h-full transition-transform duration-100 ease-out flex items-center justify-center"
              style={{
                transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                transformOrigin: 'center center',
              }}
            >
              <img
                src={src}
                alt={alt || title}
                draggable={false}
                className="max-h-[80vh] max-w-[95vw] object-contain rounded-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-stone-800/80 pointer-events-auto"
              />
            </div>
          </div>

          {/* Bottom Caption & Interactive Instructions Bar */}
          <footer className="px-4 sm:px-6 py-3 border-t border-stone-800/90 bg-stone-950/90 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-400 shrink-0 z-20">
            <p className="truncate max-w-2xl text-stone-300 text-center sm:text-left">
              {alt || title}
            </p>

            <div className="flex items-center gap-3 text-[11px] text-stone-400">
              <span className="hidden sm:inline">
                💡 Double-click or use &plus;/&minus; to zoom &bull; Drag to inspect threadwork
              </span>
              <span className="text-amber-400/90 font-medium">
                Official Sartor Atelier Watermark Included
              </span>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default ArticleHeroImageViewer;

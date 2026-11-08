'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { ArrowUp, Check, Clock } from 'lucide-react';

export interface ArticleScrollProgressProps {
  /** The total estimated reading time string, e.g. "12 min read" */
  readingTime?: string;
  /** Optional title of the article for aria-labels or tooltips */
  title?: string;
  /** Additional container classes if needed */
  className?: string;
}

/**
 * Parses total reading minutes from strings like "12 min read" or "8 mins"
 */
function parseReadingMinutes(readingTimeStr?: string): number {
  if (!readingTimeStr) return 8;
  const match = readingTimeStr.match(/\d+/);
  return match ? parseInt(match[0], 10) : 8;
}

export const ArticleScrollProgress: React.FC<ArticleScrollProgressProps> = ({
  readingTime,
  title,
  className = '',
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [showScrollTopTooltip, setShowScrollTopTooltip] = useState<boolean>(false);

  const totalMinutes = parseReadingMinutes(readingTime);

  // Calculate dynamic minutes left based on remaining progress percentage
  const remainingMinutes = Math.max(
    0,
    Math.round(totalMinutes * (1 - progress / 100))
  );

  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return;

    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    // Detect if page has scrolled sufficiently past initial header
    setIsScrolled(scrollY > 120);

    // Prefer tracking the <article> tag containing the primary editorial text
    const articleEl = document.querySelector('article') || document.querySelector('main');
    if (articleEl) {
      const rect = articleEl.getBoundingClientRect();
      const articleTop = rect.top + scrollY;
      const articleHeight = rect.height;

      // Start calculating when approaching the article body
      const startPoint = Math.max(0, articleTop - 100);
      // Reach 100% when the article's conclusion enters the comfortable reading zone
      const endPoint = articleTop + articleHeight - windowHeight * 0.7;
      const totalDistance = endPoint - startPoint;

      if (totalDistance <= 0) {
        setProgress(scrollY > startPoint ? 100 : 0);
        return;
      }

      const currentDistance = scrollY - startPoint;
      const rawPct = (currentDistance / totalDistance) * 100;
      const clampedPct = Math.min(Math.max(Math.round(rawPct), 0), 100);
      setProgress(clampedPct);
      return;
    }

    // Fallback: document scroll height
    const scrollHeight = document.documentElement.scrollHeight - windowHeight;
    if (scrollHeight <= 0) {
      setProgress(0);
      return;
    }
    const rawPct = (scrollY / scrollHeight) * 100;
    setProgress(Math.min(Math.max(Math.round(rawPct), 0), 100));
  }, []);

  useEffect(() => {
    // Initial calculation on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Ultra-Thin Luxury Progress Bar Fixed at Top of Viewport */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 pointer-events-none ${className}`}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={title ? `Reading progress for ${title}` : 'Article reading progress'}
      >
        <div className="w-full h-[3px] bg-stone-900/40 backdrop-blur-xs">
          <div
            className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-200 transition-[width] duration-150 ease-out shadow-[0_0_10px_rgba(245,158,11,0.6)] relative"
            style={{ width: `${progress}%` }}
          >
            {/* Luminous leading pip */}
            {progress > 0 && progress < 100 && (
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-yellow-100 shadow-[0_0_6px_#fde68a]" />
            )}
          </div>
        </div>
      </div>

      {/* 2. Floating High-End Reading Tracker Badge */}
      <div
        className={`fixed top-16 right-4 sm:right-8 z-40 transition-all duration-300 ease-out ${
          isScrolled
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        onMouseEnter={() => setShowScrollTopTooltip(true)}
        onMouseLeave={() => setShowScrollTopTooltip(false)}
      >
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/90 hover:bg-stone-850 active:scale-95 backdrop-blur-md border border-stone-800 hover:border-amber-500/50 text-stone-300 shadow-xl shadow-stone-950/60 transition-all cursor-pointer"
          aria-label="Scroll back to top"
        >
          {/* Progress State Icon */}
          <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
            {progress >= 100 ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <div className="relative w-3.5 h-3.5 rounded-full border border-stone-700">
                {/* Micro SVG Ring indicating progress circle */}
                <svg className="w-3.5 h-3.5 -rotate-90 transform" viewBox="0 0 16 16">
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    className="stroke-stone-800"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    className="stroke-amber-400 transition-all duration-150 ease-out"
                    strokeWidth="2"
                    strokeDasharray={37.7}
                    strokeDashoffset={37.7 - (37.7 * progress) / 100}
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Reading Metric Display */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-mono text-amber-400 font-semibold tabular-nums">
              {progress}%
            </span>
            <span className="text-stone-600" aria-hidden="true">
              ·
            </span>
            <span className="text-stone-300 font-medium whitespace-nowrap">
              {progress >= 100 ? (
                <span className="text-emerald-400">Complete</span>
              ) : remainingMinutes <= 1 ? (
                '&lt; 1 min left'
              ) : (
                `${remainingMinutes}m left`
              )}
            </span>
          </div>

          {/* Scroll to top hover arrow */}
          <ArrowUp className="w-3 h-3 text-stone-500 group-hover:text-amber-400 transition-colors ml-0.5 shrink-0" />
        </button>

        {/* Unobtrusive Micro-Tooltip on Desktop Hover */}
        {showScrollTopTooltip && (
          <div className="absolute right-0 top-full mt-1.5 px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-[10px] text-stone-400 whitespace-nowrap shadow-lg animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
            {progress >= 100
              ? 'Guide completed • Click to jump to top'
              : `${progress}% read • Click to jump to top`}
          </div>
        )}
      </div>
    </>
  );
};

export default ArticleScrollProgress;

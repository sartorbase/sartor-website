'use client';

/**
 * ==============================================================================
 * SARTOR ATELIER - REUSABLE HIGH-CONVERTING WHATSAPP CTA COMPONENT
 * Incorporates Meta Pixel & Google Ads Conversion Tracking on Every Click
 * Built with Pure Tailwind CSS & Native HTML5 (Zero External UI Dependencies)
 * ==============================================================================
 */

import React from 'react';
import { buildWhatsAppLink, trackWhatsAppClick, TRACKING_CONFIG } from '../lib/analytics';

export interface WhatsAppButtonProps {
  /** Identifier for where on the page this CTA was clicked (for analytics funnel tracking) */
  sourceLocation?: string;
  /** Custom pre-filled WhatsApp inquiry message */
  message?: string;
  /** Visual presentation style */
  variant?: 'primary' | 'floating' | 'gold' | 'outline' | 'minimal';
  /** Full width button */
  fullWidth?: boolean;
  /** Display trust subtext underneath button */
  subtext?: string;
  /** Custom button label or children */
  children?: React.ReactNode;
  /** Additional custom Tailwind CSS classes */
  className?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  sourceLocation = 'general_inquiry',
  message = 'Hi Sartor, I am interested in getting a custom bridal/couture outfit stitched. I would like a consultation.',
  variant = 'primary',
  fullWidth = false,
  subtext,
  children,
  className = '',
}) => {
  // Generate encoded WhatsApp link with custom or default message
  const whatsappUrl = buildWhatsAppLink(message);

  const handleClick = () => {
    // 1. Fire Google Ads, GA4, and Meta Pixel lead conversions
    trackWhatsAppClick(sourceLocation);
  };

  // --------------------------------------------------------------------------
  // Variant Styling (Tailwind CSS Luxury Noir & Emerald / Champagne Palette)
  // --------------------------------------------------------------------------
  if (variant === 'floating') {
    return (
      <aside
        aria-label="Direct WhatsApp Concierge"
        className="fixed bottom-5 right-5 z-50 flex items-center select-none"
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          aria-label={`Chat with SARTOR Master Atelier on WhatsApp (+${TRACKING_CONFIG.WHATSAPP_PHONE})`}
          className={`group relative flex items-center gap-3 pl-3.5 pr-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-950/80 border border-emerald-400/40 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer ${className}`}
        >
          {/* Pulsing Emerald Beacon */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
          </span>

          {/* WhatsApp SVG Icon (No external icon package required) */}
          <svg
            className="w-5 h-5 fill-current shrink-0"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.044.073.044.42-.1 1.025zM12 2C6.477 2 2 6.477 2 12c0 1.891.526 3.662 1.444 5.178L2 22l4.954-1.399C8.397 21.493 10.15 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.637 0-3.155-.477-4.434-1.298l-.318-.203-2.934.828.84-2.842-.224-.336C4.053 14.996 3.567 13.535 3.567 12c0-4.65 3.783-8.433 8.433-8.433 4.651 0 8.433 3.783 8.433 8.433 0 4.65-3.782 8.433-8.433 8.433z" />
          </svg>

          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-200 font-semibold leading-tight">
              Bridal Concierge
            </span>
            <span className="text-xs font-serif font-bold text-white tracking-wide">
              WhatsApp Atelier
            </span>
          </div>
        </a>
      </aside>
    );
  }

  // Base layout styling for inline buttons
  let styleClasses =
    'inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-sm tracking-wide uppercase transition-all duration-200 cursor-pointer text-center select-none shadow-xl ';

  if (variant === 'primary') {
    styleClasses +=
      'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/60 border border-emerald-400/40 hover:-translate-y-0.5 active:translate-y-0';
  } else if (variant === 'gold') {
    styleClasses +=
      'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black shadow-amber-950/40 border border-amber-300/60 hover:-translate-y-0.5 active:translate-y-0';
  } else if (variant === 'outline') {
    styleClasses +=
      'bg-stone-900/80 hover:bg-stone-800 text-amber-300 border border-amber-500/50 hover:border-amber-400';
  } else {
    styleClasses +=
      'bg-stone-900 hover:bg-stone-800 text-white border border-stone-700';
  }

  return (
    <div className={`flex flex-col ${fullWidth ? 'w-full' : 'inline-flex'}`}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`${styleClasses} ${fullWidth ? 'w-full' : ''} ${className}`}
      >
        {/* WhatsApp Icon */}
        <svg
          className="w-5 h-5 fill-current shrink-0"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.044.073.044.42-.1 1.025zM12 2C6.477 2 2 6.477 2 12c0 1.891.526 3.662 1.444 5.178L2 22l4.954-1.399C8.397 21.493 10.15 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.637 0-3.155-.477-4.434-1.298l-.318-.203-2.934.828.84-2.842-.224-.336C4.053 14.996 3.567 13.535 3.567 12c0-4.65 3.783-8.433 8.433-8.433 4.651 0 8.433 3.783 8.433 8.433 0 4.65-3.782 8.433-8.433 8.433z" />
        </svg>

        <span>{children || 'Inquire on WhatsApp'}</span>
      </a>

      {subtext && (
        <p className="text-[11px] text-stone-400 mt-2 text-center tracking-normal font-sans">
          {subtext}
        </p>
      )}
    </div>
  );
};

export default WhatsAppButton;

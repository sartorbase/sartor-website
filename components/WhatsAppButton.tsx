'use client';

/**
 * ==============================================================================
 * SARTOR ATELIER - REUSABLE HIGH-CONVERTING WHATSAPP CTA COMPONENT
 * Incorporates Meta Pixel & Google Ads Conversion Tracking on Every Click
 * Built with Pure Tailwind CSS & Native HTML5 (Zero External UI Dependencies)
 * ==============================================================================
 */

import React from 'react';
import { MessageSquare } from 'lucide-react';
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

          <MessageSquare className="w-5 h-5 fill-current shrink-0" />

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
        <MessageSquare className="w-5 h-5 fill-current shrink-0" />

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

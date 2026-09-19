import React from 'react';
import sartorLogoImg from '../../assets/images/sartor_brand_logo_1789818353419.jpg';
import { SARTOR_PHONE_LOCAL } from '../../services/analytics';

export interface SartorLogoProps {
  variant?: 'navbar' | 'emblem' | 'hero' | 'footer' | 'chat' | 'card';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  showPhone?: boolean;
  className?: string;
}

export const SartorLogo: React.FC<SartorLogoProps> = ({
  variant = 'navbar',
  size = 'md',
  showSubtitle = true,
  showPhone = false,
  className = '',
}) => {
  // Size mapping for pure emblems
  const emblemSizes = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  if (variant === 'emblem') {
    return (
      <div
        className={`relative rounded-xl overflow-hidden shadow-lg border border-amber-500/30 group shrink-0 ${emblemSizes[size]} ${className}`}
      >
        <img
          src={sartorLogoImg}
          alt="SARTOR Logo — Tailoring Made Easy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-amber-500/20 rounded-xl pointer-events-none" />
      </div>
    );
  }

  if (variant === 'chat') {
    return (
      <div
        className={`relative rounded-full overflow-hidden shadow-md border border-amber-500/40 shrink-0 ${emblemSizes[size]} ${className}`}
      >
        <img
          src={sartorLogoImg}
          alt="SARTOR Atelier Logo"
          className="w-full h-full object-cover"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div
        className={`inline-flex items-center gap-3.5 p-2 pr-4 rounded-2xl bg-stone-900/90 border border-amber-500/30 shadow-xl backdrop-blur-md ${className}`}
      >
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-amber-500/40 shadow-inner shrink-0">
          <img
            src={sartorLogoImg}
            alt="SARTOR Tailoring Made Easy"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            loading="eager"
            fetchPriority="high"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-amber-400/30 rounded-xl pointer-events-none" />
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.2em] text-stone-100">
              SARTOR
            </span>
            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Atelier
            </span>
          </div>
          <span className="text-xs sm:text-sm font-sans text-amber-200/90 tracking-wide font-medium -mt-0.5">
            Tailoring made easy
          </span>
          <span className="text-[10px] text-stone-400 font-mono mt-0.5">
            Model Town, Lahore • {SARTOR_PHONE_LOCAL}
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-3.5 ${className}`}>
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-amber-500/40 shadow-lg shrink-0">
          <img
            src={sartorLogoImg}
            alt="SARTOR Logo"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-amber-500/20 rounded-xl pointer-events-none" />
        </div>
        <div className="flex flex-col">
          <span className="font-serif text-2xl font-bold tracking-[0.25em] text-stone-100">
            SARTOR
          </span>
          <span className="text-xs font-sans tracking-wider text-amber-400 font-semibold">
            Tailoring made easy
          </span>
          <span className="text-[11px] text-stone-400 font-mono mt-0.5">
            for more info: <strong className="text-stone-300">{SARTOR_PHONE_LOCAL}</strong>
          </span>
        </div>
      </div>
    );
  }

  // Default: 'navbar'
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group ${className}`}>
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-amber-500/40 shadow-md group-hover:border-amber-400 transition-colors shrink-0">
        <img
          src={sartorLogoImg}
          alt="SARTOR Brand Emblem"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="eager"
          fetchPriority="high"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-amber-400/20 rounded-xl pointer-events-none" />
      </div>

      <div className="flex flex-col text-left">
        <span className="font-serif text-xl sm:text-2xl font-extrabold tracking-[0.2em] text-stone-100 group-hover:text-amber-400 transition-colors leading-none">
          SARTOR
        </span>
        {showSubtitle && (
          <span className="text-[9px] sm:text-[10px] tracking-[0.18em] text-amber-400 font-semibold uppercase mt-1 leading-none">
            Tailoring made easy
          </span>
        )}
      </div>
    </div>
  );
};

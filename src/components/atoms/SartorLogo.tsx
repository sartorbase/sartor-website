import React from 'react';

export interface SartorLogoProps {
  variant?: 'navbar' | 'footer' | 'hero';
  className?: string;
}

export const SartorLogo: React.FC<SartorLogoProps> = ({
  variant = 'navbar',
  className = '',
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="font-serif font-bold tracking-[0.25em] text-xl sm:text-2xl text-amber-400 uppercase select-none">
        SARTOR
      </span>
      <span className="text-[9px] font-mono tracking-[0.3em] text-stone-400 uppercase -mt-1 select-none">
        Bespoke Atelier
      </span>
    </div>
  );
};

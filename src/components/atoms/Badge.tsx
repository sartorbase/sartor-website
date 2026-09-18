import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'emerald' | 'stone' | 'outline' | 'blue';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'stone',
  className = '',
  icon,
}) => {
  const variantStyles = {
    gold: 'bg-amber-950/70 text-amber-300 border-amber-800/60',
    emerald: 'bg-emerald-950/70 text-emerald-300 border-emerald-800/60',
    stone: 'bg-stone-850 text-stone-300 border-stone-700/80',
    outline: 'bg-transparent text-stone-400 border-stone-700',
    blue: 'bg-sky-950/70 text-sky-300 border-sky-800/60',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border tracking-wider uppercase whitespace-nowrap ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

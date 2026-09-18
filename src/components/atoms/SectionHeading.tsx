import React from 'react';

export interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignStyles = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div className={`flex flex-col ${alignStyles} mb-12 sm:mb-16 ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="h-px w-6 bg-amber-600/60" />
          <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold">
            {badge}
          </span>
          <span className="h-px w-6 bg-amber-600/60" />
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-100 tracking-tight leading-tight max-w-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3.5 text-stone-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-0.5 w-12 bg-amber-600/40 rounded-full ${align === 'center' ? 'mx-auto' : ''}`} />
    </div>
  );
};

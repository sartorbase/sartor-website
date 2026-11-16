import React from 'react';

export type ImageSkeletonVariant = 'hero' | 'card' | 'portrait' | 'swatch';

export interface ImageSkeletonProps {
  variant?: ImageSkeletonVariant;
  isLoaded?: boolean;
  className?: string;
}

/**
 * Zero-CLS luxury dark-stone & subtle amber shimmer skeleton overlay for Next.js `<Image>` containers.
 * Renders cleanly inside `relative aspect-[...]` frames and fades out once image decoding finishes.
 */
export const ImageSkeleton: React.FC<ImageSkeletonProps> = ({
  variant = 'card',
  isLoaded = false,
  className = '',
}) => {
  const accentWidth =
    variant === 'hero'
      ? 'w-1/3 max-w-[220px]'
      : variant === 'portrait'
        ? 'w-1/2 max-w-[140px]'
        : 'w-2/5 max-w-[160px]';

  return (
    <div
      aria-hidden="true"
      data-testid="image-skeleton"
      data-loaded={isLoaded ? 'true' : 'false'}
      className={`absolute inset-0 overflow-hidden bg-stone-900 pointer-events-none transition-opacity duration-500 ease-out ${
        isLoaded ? 'opacity-0' : 'opacity-100'
      } ${className}`}
    >
      {/* Ambient pulsing stone base */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800/80 to-stone-950 animate-pulse" />

      {/* Horizontal diagonal couture shimmer wave */}
      <div
        className="absolute inset-0 animate-sartor-shimmer bg-gradient-to-r from-transparent via-amber-400/[0.08] to-transparent"
      />

      {/* Subtle architectural wireframe hint (prevents blank flat boxes without visual clutter) */}
      <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2 opacity-50">
        <div className={`h-2 rounded-full bg-stone-800/90 ${accentWidth}`} />
        {variant === 'hero' && (
          <div className="h-1.5 w-1/4 max-w-[120px] rounded-full bg-stone-800/70" />
        )}
      </div>
    </div>
  );
};

export default ImageSkeleton;

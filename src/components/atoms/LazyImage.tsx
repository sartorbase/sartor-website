import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from '../../utils/nextImage';
import { SHIMMER_BLUR_DATA_URL, DEFAULT_FALLBACK_IMAGE } from '../../utils/imagePlaceholder';

export interface LazyImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src?: string | null;
  alt: string;
  fallbackSrc?: string;
}

/**
 * Responsive Next.js `<Image>` integration wrapper tailored for SARTOR Vite + Sharp optimization (`/_next/image`).
 * Enforces `referrerPolicy="no-referrer"`, explicit sizing (`fill` or width/height) to prevent CLS,
 * shimmer `blurDataURL` placeholders, and clean client-side fallback recovery.
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  quality = 85,
  placeholder = 'blur',
  blurDataURL = SHIMMER_BLUR_DATA_URL,
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  sizes = '(max-width: 768px) 100vw, 50vw',
  onError,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const activeSrc = hasError || !src ? fallbackSrc : src;

  return (
    <Image
      src={activeSrc}
      alt={alt || 'SARTOR Bespoke Atelier Lahore'}
      priority={priority}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      sizes={sizes}
      referrerPolicy="no-referrer"
      onError={(e) => {
        if (!hasError && activeSrc !== fallbackSrc) {
          setHasError(true);
        }
        if (onError) {
          onError(e);
        }
      }}
      className={className}
      {...props}
    />
  );
};

export default LazyImage;

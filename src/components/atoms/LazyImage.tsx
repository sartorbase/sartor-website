import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { ImageOff } from 'lucide-react';
import Image, { ImageProps } from '../../utils/nextImage';
import {
  SHIMMER_BLUR_DATA_URL,
  DEFAULT_FALLBACK_IMAGE,
  sanitizeImageSrc,
} from '../../utils/imagePlaceholder';
import { ImageSkeleton, ImageSkeletonVariant } from './ImageSkeleton';

export interface LazyImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src?: string | null;
  alt: string;
  fallbackSrc?: string;
  showSkeleton?: boolean;
  skeletonVariant?: ImageSkeletonVariant;
  skeletonClassName?: string;
}

/**
 * Responsive Next.js `<Image>` wrapper for SARTOR.
 * Combines pre-optimized static WebP breakpoints (`sartorImageLoader`),
 * shimmer `blurDataURL`, animated `<ImageSkeleton>` overlay for zero CLS,
 * `referrerPolicy="no-referrer"`, root-relative path sanitization, and clean client-side fallback recovery.
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
  showSkeleton = true,
  skeletonVariant = 'card',
  skeletonClassName = '',
  fill,
  width,
  height,
  onLoad,
  onError,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isDegraded, setIsDegraded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const safeFallback = sanitizeImageSrc(fallbackSrc, DEFAULT_FALLBACK_IMAGE);
  const safeSrc = src ? sanitizeImageSrc(src, safeFallback) : safeFallback;
  const activeSrc = hasError ? safeFallback : safeSrc;

  useEffect(() => {
    setHasError(false);
    setIsDegraded(false);
    setIsLoaded(false);
  }, [safeSrc]);

  // Immediately clear skeleton if the browser already decoded a cached/preloaded image
  useLayoutEffect(() => {
    const imgEl = imgRef.current;
    if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [activeSrc]);

  const degradedFallback = (
    <div
      role="img"
      aria-label={alt || 'SARTOR Bespoke Atelier Lahore'}
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-stone-900 p-4 text-center text-stone-400"
    >
      <ImageOff className="w-5 h-5 text-amber-400/70" />
      <span className="text-[11px] font-medium text-stone-300 line-clamp-2 max-w-[85%]">
        {alt || 'SARTOR Couture'}
      </span>
    </div>
  );

  const imageElement = isDegraded ? (
    degradedFallback
  ) : (
    <Image
      ref={imgRef}
      src={activeSrc}
      alt={alt || 'SARTOR Bespoke Atelier Lahore'}
      fill={fill}
      width={width}
      height={height}
      priority={priority}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      sizes={sizes}
      referrerPolicy="no-referrer"
      onLoad={(e) => {
        setIsLoaded(true);
        if (onLoad) {
          onLoad(e);
        }
      }}
      onError={(e) => {
        if (!hasError && activeSrc !== safeFallback) {
          setHasError(true);
        } else {
          setIsDegraded(true);
          setIsLoaded(true);
        }
        if (onError) {
          onError(e);
        }
      }}
      className={`${className} transition-opacity duration-500 ease-out ${
        isLoaded || priority ? 'opacity-100' : 'opacity-0'
      }`}
      {...props}
    />
  );

  // When `fill` is used, parent already defines `relative aspect-[...]` so render skeleton as sibling layer
  if (fill) {
    return (
      <>
        {showSkeleton && (
          <ImageSkeleton
            variant={skeletonVariant}
            isLoaded={isLoaded}
            className={`z-[1] ${skeletonClassName}`}
          />
        )}
        {imageElement}
      </>
    );
  }

  // Non-fill usage: wrap in a sized relative box so skeleton matches exact width/height without CLS
  return (
    <div
      className="relative overflow-hidden bg-stone-900"
      style={
        width && height
          ? { aspectRatio: `${Number(width)} / ${Number(height)}` }
          : undefined
      }
    >
      {showSkeleton && (
        <ImageSkeleton
          variant={skeletonVariant}
          isLoaded={isLoaded}
          className={`z-[1] ${skeletonClassName}`}
        />
      )}
      {imageElement}
    </div>
  );
};

export default LazyImage;

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Image, { ImageProps } from '../../utils/nextImage';
import { SHIMMER_BLUR_DATA_URL, DEFAULT_FALLBACK_IMAGE } from '../../utils/imagePlaceholder';
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
 * `referrerPolicy="no-referrer"`, and clean client-side fallback recovery.
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
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const activeSrc = hasError || !src ? fallbackSrc : src;

  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  // Immediately clear skeleton if the browser already decoded a cached/preloaded image
  useLayoutEffect(() => {
    const imgEl = imgRef.current;
    if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [activeSrc]);

  const imageElement = (
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
        if (!hasError && activeSrc !== fallbackSrc) {
          setHasError(true);
        } else {
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

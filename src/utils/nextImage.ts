import React from 'react';
import RawNextImage, { type ImageLoader, type ImageLoaderProps, type ImageProps } from 'next/image';
import { DEFAULT_BRIDAL_FALLBACK_IMAGE, sanitizeImageSrc } from './imagePlaceholder';

const BaseNextImage = (
  (RawNextImage as unknown as { default?: typeof RawNextImage }).default ?? RawNextImage
) as typeof RawNextImage;

export function buildResponsiveStaticImageUrl(
  src: string,
  width: number,
  quality?: number
): string {
  const sanitized = sanitizeImageSrc(src, DEFAULT_BRIDAL_FALLBACK_IMAGE);
  const q = quality ?? (width <= 640 ? 78 : width <= 1080 ? 82 : 85);

  if (!sanitized || sanitized.startsWith('data:') || sanitized.startsWith('blob:')) {
    return sanitized;
  }

  // Handle remote Unsplash / CDN images via native sizing
  if (/^https?:\/\//i.test(sanitized)) {
    try {
      const parsed = new URL(sanitized);
      if (parsed.hostname === 'images.unsplash.com') {
        parsed.searchParams.set('auto', 'format');
        parsed.searchParams.set('fit', 'max');
        parsed.searchParams.set('w', String(width));
        parsed.searchParams.set('q', String(q));
        return parsed.toString();
      }
      if (parsed.hostname === 'sartor.pk' || parsed.hostname === 'www.sartor.pk') {
        return buildResponsiveStaticImageUrl(parsed.pathname, width, q);
      }
      parsed.searchParams.set('w', String(width));
      parsed.searchParams.set('q', String(q));
      return parsed.toString();
    } catch {
      return sanitized;
    }
  }

  // Local path is guaranteed root-relative without query/hash by sanitizeImageSrc
  const cleanPath = sanitized.split('?')[0].split('#')[0];

  // For showcase/blog/service imagery under /images/, serve pre-generated static WebP breakpoints
  // cleanly without query strings so Next.js localPatterns, Vercel Edge CDN, and Express all
  // resolve them reliably even when visitors arrive with UTM/social query parameters.
  if (cleanPath.startsWith('/images/') && /\.(jpe?g|png|webp)$/i.test(cleanPath)) {
    const baseNoExt = cleanPath
      .replace(/-(?:640|1080)w\.webp$/i, '')
      .replace(/\.(jpe?g|png|webp)$/i, '');

    if (width <= 640) {
      return `${baseNoExt}-640w.webp`;
    }
    if (width <= 1080) {
      return `${baseNoExt}-1080w.webp`;
    }
    return `${baseNoExt}.webp`;
  }

  return cleanPath;
}

export const sartorImageLoader: ImageLoader = ({
  src,
  width,
  quality,
}: ImageLoaderProps): string => {
  return buildResponsiveStaticImageUrl(src, width, quality);
};

const SartorImage = React.forwardRef<HTMLImageElement | null, ImageProps>(
  ({ loader, src, ...props }, ref) => {
    const safeSrc =
      typeof src === 'string' ? sanitizeImageSrc(src, DEFAULT_BRIDAL_FALLBACK_IMAGE) : src;

    return React.createElement(BaseNextImage, {
      ...props,
      src: safeSrc,
      ref,
      loader: loader ?? sartorImageLoader,
    });
  }
);

SartorImage.displayName = 'SartorNextImage';

export { SartorImage as Image };
export type { ImageProps, ImageLoader, ImageLoaderProps };
export default SartorImage;

import React from 'react';
import RawNextImage, { type ImageLoader, type ImageLoaderProps, type ImageProps } from 'next/image';

const BaseNextImage = (
  (RawNextImage as unknown as { default?: typeof RawNextImage }).default ?? RawNextImage
) as typeof RawNextImage;

export function buildResponsiveStaticImageUrl(
  src: string,
  width: number,
  quality?: number
): string {
  const trimmed = src.trim();
  const q = quality ?? (width <= 640 ? 78 : width <= 1080 ? 82 : 85);

  if (!trimmed || trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed;
  }

  // Handle remote Unsplash images via native CDN sizing
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed);
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
      return trimmed;
    }
  }

  // Normalize local path without query/hash
  const cleanPath = trimmed.split('?')[0].split('#')[0];

  // For showcase/blog/service imagery under /images/, serve pre-generated static WebP breakpoints
  // so Vercel static CDN and Express both return instant 200 OK with zero serverless dependency.
  if (cleanPath.startsWith('/images/') && /\.(jpe?g|png|webp)$/i.test(cleanPath)) {
    const baseNoExt = cleanPath
      .replace(/-(?:640|1080)w\.webp$/i, '')
      .replace(/\.(jpe?g|png|webp)$/i, '');

    if (width <= 640) {
      return `${baseNoExt}-640w.webp?w=${width}&q=${q}`;
    }
    if (width <= 1080) {
      return `${baseNoExt}-1080w.webp?w=${width}&q=${q}`;
    }
    return `${baseNoExt}.webp?w=${width}&q=${q}`;
  }

  return `${cleanPath}?w=${width}&q=${q}`;
}

export const sartorImageLoader: ImageLoader = ({
  src,
  width,
  quality,
}: ImageLoaderProps): string => {
  return buildResponsiveStaticImageUrl(src, width, quality);
};

const SartorImage = React.forwardRef<HTMLImageElement | null, ImageProps>(
  ({ loader, ...props }, ref) => {
    return React.createElement(BaseNextImage, {
      ...props,
      ref,
      loader: loader ?? sartorImageLoader,
    });
  }
);

SartorImage.displayName = 'SartorNextImage';

export { SartorImage as Image };
export type { ImageProps, ImageLoader, ImageLoaderProps };
export default SartorImage;

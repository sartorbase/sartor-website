import React, { useState } from 'react';

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  priority?: boolean;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  priority = false,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const webpSrc = src && /\.(jpe?g|png)$/i.test(src) ? src.replace(/\.(jpe?g|png)$/i, '.webp') : undefined;

  return (
    <div className={`relative overflow-hidden bg-stone-900 ${wrapperClassName}`}>
      <picture>
        {webpSrc && <source type="image/webp" srcSet={webpSrc} />}
        <img
          src={src}
          alt={alt || ''}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          // @ts-expect-error fetchPriority is supported in modern browsers
          fetchpriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          referrerPolicy="no-referrer"
          className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          {...props}
        />
      </picture>
    </div>
  );
};

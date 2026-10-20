import React, { useState } from 'react';

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  priority?: boolean;
  fallbackSrc?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  priority = false,
  fallbackSrc = '/images/services/simple-suit.webp',
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const activeSrc = hasError ? fallbackSrc : (src || fallbackSrc);
  const webpSrc = activeSrc && /\.(jpe?g|png)$/i.test(activeSrc)
    ? activeSrc.replace(/\.(jpe?g|png)$/i, '.webp')
    : undefined;

  return (
    <div className={`relative overflow-hidden bg-stone-900 ${wrapperClassName}`}>
      <picture>
        {webpSrc && <source type="image/webp" srcSet={webpSrc} />}
        <img
          src={activeSrc}
          alt={alt || 'SARTOR Bespoke Atelier Lahore'}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          onError={() => {
            if (!hasError) {
              setHasError(true);
            }
          }}
          referrerPolicy="no-referrer"
          className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          {...props}
        />
      </picture>
    </div>
  );
};

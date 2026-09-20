import React, { useState } from 'react';
import { Sparkles, ImageOff } from 'lucide-react';

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
  showSkeleton?: boolean;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  priority = false,
  showSkeleton = true,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  return (
    <div className={`relative overflow-hidden bg-stone-950 ${wrapperClassName}`}>
      {/* Shimmering Skeleton Placeholder */}
      {showSkeleton && !isLoaded && !hasError && (
        <div className="absolute inset-0 bg-stone-900/90 animate-pulse flex items-center justify-center pointer-events-none z-0">
          <Sparkles className="w-5 h-5 text-amber-500/20 animate-spin" />
        </div>
      )}

      {/* Fallback state on error */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-900 p-2 text-stone-500 z-10">
          <ImageOff className="w-6 h-6 mb-1 text-stone-600" />
          <span className="text-[10px] font-mono text-center line-clamp-1">SARTOR Atelier View</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'low'}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};

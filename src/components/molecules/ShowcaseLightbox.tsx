import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { BespokeSuite } from '../../data/showcaseGallery';
import { buildWhatsAppLink } from '../../services/analytics';

export interface ShowcaseLightboxProps {
  suite: BespokeSuite;
  initialPhotoIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ShowcaseLightbox: React.FC<ShowcaseLightboxProps> = ({
  suite,
  initialPhotoIndex = 0,
  isOpen,
  onClose,
}) => {
  const [photoIndex, setPhotoIndex] = useState(initialPhotoIndex);

  useEffect(() => {
    setPhotoIndex(initialPhotoIndex);
  }, [initialPhotoIndex, suite.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        setPhotoIndex((prev) => (prev > 0 ? prev - 1 : suite.gallery.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setPhotoIndex((prev) => (prev < suite.gallery.length - 1 ? prev + 1 : 0));
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, suite.gallery.length]);

  if (!isOpen) return null;

  const currentPhoto = suite.gallery[photoIndex] || {
    url: suite.primaryImage,
    caption: suite.title,
    angle: 'Full Silhouette',
  };

  const whatsappMsg = `Assalam-o-Alaikum SARTOR Atelier,
I was viewing your portfolio photo for *${suite.title}* (${currentPhoto.angle}).
Please let me know how to arrange custom stitching or fabric pickup in Lahore.`;
  const whatsappUrl = buildWhatsAppLink(whatsappMsg, 'lightbox');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center gap-6">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <picture>
          <source
            type="image/webp"
            srcSet={currentPhoto.url.replace(/\.(jpe?g|png)$/i, '.webp')}
          />
          <img
            src={currentPhoto.url}
            alt={currentPhoto.caption}
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== '/images/services/simple-suit.webp') {
                target.src = '/images/services/simple-suit.webp';
              }
            }}
            className="object-contain max-h-[85vh] max-w-full rounded-xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </picture>

        {suite.gallery.length > 1 && (
          <div className="absolute bottom-8 flex gap-2">
            <button
              onClick={() => setPhotoIndex((prev) => (prev > 0 ? prev - 1 : suite.gallery.length - 1))}
              className="flex-1 py-2 rounded-full bg-stone-900/80 border border-stone-700 text-stone-300 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setPhotoIndex((prev) => (prev < suite.gallery.length - 1 ? prev + 1 : 0))}
              className="flex-1 py-2 rounded-full bg-stone-900/80 border border-stone-700 text-stone-300 hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-2xl text-center">
          <p className="text-xs text-stone-300 max-w-xl text-center sm:text-left">
            {currentPhoto.caption}
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-lg transition-colors"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Inquire on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

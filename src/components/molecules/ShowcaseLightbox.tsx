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
    };
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
    <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between text-stone-300">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
            {suite.categoryLabel}
          </span>
          <h3 className="font-serif text-lg font-bold text-stone-100">
            {suite.title}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {suite.gallery.length > 1 && (
          <button
            onClick={() => setPhotoIndex((prev) => (prev > 0 ? prev - 1 : suite.gallery.length - 1))}
            className="absolute left-2 z-10 p-2.5 rounded-full bg-stone-900/80 border border-stone-700 text-stone-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <img
          src={currentPhoto.url}
          alt={currentPhoto.caption}
          className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl"
          referrerPolicy="no-referrer"
        />

        {suite.gallery.length > 1 && (
          <button
            onClick={() => setPhotoIndex((prev) => (prev < suite.gallery.length - 1 ? prev + 1 : 0))}
            className="absolute right-2 z-10 p-2.5 rounded-full bg-stone-900/80 border border-stone-700 text-stone-300 hover:text-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-800 pt-4">
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
  );
};

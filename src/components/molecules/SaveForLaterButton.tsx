'use client';

import React, { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useSavedArticles } from '../../hooks/useSavedArticles';

export interface SaveForLaterButtonProps {
  slug: string;
  title?: string;
  variant?: 'header' | 'compact' | 'icon';
  className?: string;
}

export const SaveForLaterButton: React.FC<SaveForLaterButtonProps> = ({
  slug,
  title,
  variant = 'header',
  className = '',
}) => {
  const { isSaved, toggleSaveArticle, hasHydrated } = useSavedArticles();
  const [justSavedFeedback, setJustSavedFeedback] = useState(false);

  const saved = hasHydrated ? isSaved(slug) : false;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const nowSaved = toggleSaveArticle(slug);
    if (nowSaved) {
      setJustSavedFeedback(true);
      setTimeout(() => setJustSavedFeedback(false), 1800);
    } else {
      setJustSavedFeedback(false);
    }
  };

  const accessibleLabel = saved
    ? `Remove "${title || 'article'}" from saved articles`
    : `Save "${title || 'article'}" for later`;

  if (variant === 'icon') {
    return (
      <motion.button
        type="button"
        whileTap={{ scale: 0.92 }}
        onClick={handleClick}
        aria-pressed={saved}
        aria-label={accessibleLabel}
        title={saved ? 'Saved for later (click to remove)' : 'Save for later'}
        className={`inline-flex items-center justify-center w-9 h-9 rounded-full backdrop-blur-md border transition-colors cursor-pointer ${
          saved
            ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-lg shadow-amber-500/25'
            : 'bg-stone-950/85 hover:bg-stone-900 text-stone-200 hover:text-amber-300 border-stone-700/80 hover:border-amber-500/50'
        } ${className}`}
      >
        {saved ? (
          <BookmarkCheck className="w-4 h-4 fill-current" />
        ) : (
          <Bookmark className="w-4 h-4" />
        )}
      </motion.button>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.button
        type="button"
        whileTap={{ scale: 0.96 }}
        onClick={handleClick}
        aria-pressed={saved}
        aria-label={accessibleLabel}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
          saved
            ? 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/40'
            : 'bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-amber-300 border-stone-800 hover:border-amber-500/40'
        } ${className}`}
      >
        {saved ? (
          <>
            <BookmarkCheck className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            <span>{justSavedFeedback ? 'Saved!' : 'Saved'}</span>
          </>
        ) : (
          <>
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span>Save for Later</span>
          </>
        )}
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={accessibleLabel}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
        saved
          ? 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/50 shadow-md shadow-amber-950/40'
          : 'bg-stone-900 hover:bg-stone-850 text-stone-200 hover:text-amber-300 border-stone-700/80 hover:border-amber-500/40'
      } ${className}`}
    >
      {saved ? (
        <>
          <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400/25 shrink-0" />
          <span>{justSavedFeedback ? 'Saved to Reading List' : 'Saved for Later'}</span>
        </>
      ) : (
        <>
          <Bookmark className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Save for Later</span>
        </>
      )}
    </motion.button>
  );
};

export default SaveForLaterButton;

'use client';

import React, { useMemo, useState } from 'react';
import {
  Bookmark,
  BookmarkCheck,
  Calendar,
  ChevronRight,
  Clock,
  Trash2,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BLOG_POSTS, BlogPostData } from '../../data/blogPosts';
import { useSavedArticles } from '../../hooks/useSavedArticles';
import { navigateTo } from '../../utils/navigation';
import { LazyImage } from '../atoms/LazyImage';
import {
  DEFAULT_BRIDAL_FALLBACK_IMAGE,
  sanitizeImageSrc,
} from '../../utils/imagePlaceholder';

export interface SavedArticlesSectionProps {
  posts?: BlogPostData[];
  onPostClick?: (slug: string) => void;
  nativeNavigation?: boolean;
  className?: string;
}

interface ResolvedSavedPost {
  post: BlogPostData;
  savedAt: string;
}

export const SavedArticlesSection: React.FC<SavedArticlesSectionProps> = ({
  posts = BLOG_POSTS,
  onPostClick,
  nativeNavigation = false,
  className = '',
}) => {
  const {
    savedItems,
    hasHydrated,
    removeSavedArticle,
    clearSavedArticles,
  } = useSavedArticles();

  const [confirmClear, setConfirmClear] = useState(false);

  const savedPosts = useMemo<ResolvedSavedPost[]>(() => {
    if (!savedItems.length) return [];
    const postMap = new Map(posts.map((p) => [p.slug, p]));
    const resolved: ResolvedSavedPost[] = [];

    for (const item of savedItems) {
      const matched = postMap.get(item.slug);
      if (matched) {
        resolved.push({ post: matched, savedAt: item.savedAt });
      }
    }
    return resolved;
  }, [posts, savedItems]);

  const handleOpenPost = (
    slug: string,
    e?: React.MouseEvent<HTMLElement>
  ) => {
    if (onPostClick) {
      e?.preventDefault();
      onPostClick(slug);
      return;
    }

    if (nativeNavigation) {
      return;
    }

    if (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
        return;
      }
      e.preventDefault();
    }
    navigateTo(`/blog/${slug}`);
  };

  if (!hasHydrated) {
    return null;
  }

  if (savedPosts.length === 0) {
    return (
      <section
        aria-label="Saved Articles"
        className={`mb-10 rounded-2xl border border-stone-800/90 bg-stone-900/50 px-5 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${className}`}
      >
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 flex items-center justify-center shrink-0">
            <Bookmark className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-serif text-base sm:text-lg font-bold text-stone-100">
              Saved Articles
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              Bookmark any guide with &ldquo;Save for Later&rdquo; in its header or card corner to build your couture reading list here.
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-stone-950 border border-stone-800 text-[11px] font-mono text-stone-400 shrink-0">
          0 Saved
        </span>
      </section>
    );
  }

  return (
    <section
      aria-label="Saved Articles"
      className={`mb-14 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-stone-900/95 via-stone-900/80 to-amber-950/20 p-6 sm:p-8 shadow-2xl ${className}`}
    >
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-5 border-b border-stone-800/80">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold mb-1.5">
            <BookmarkCheck className="w-4 h-4" />
            <span>Your Personal Reading List</span>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100 tracking-tight">
              Saved Articles
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-mono font-semibold">
              {savedPosts.length}
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-stone-400">
            Quick access to the tailoring masterclasses and measurement blueprints you bookmarked on this device.
          </p>
        </div>

        {/* Clear All Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {confirmClear ? (
            <div className="inline-flex items-center gap-2 bg-stone-950/90 border border-stone-700 rounded-xl p-1.5">
              <button
                type="button"
                onClick={() => {
                  clearSavedArticles();
                  setConfirmClear(false);
                }}
                className="px-3 py-1 rounded-lg bg-red-600/90 hover:bg-red-500 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Confirm Clear
              </button>
              <button
                type="button"
                onClick={() => setConfirmClear(false)}
                className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmClear(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-950/80 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-stone-200 text-xs font-medium transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Saved Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {savedPosts.map(({ post }) => {
            const coverImg = sanitizeImageSrc(
              post.coverImage,
              DEFAULT_BRIDAL_FALLBACK_IMAGE
            );
            const href = `/blog/${post.slug}`;

            return (
              <motion.article
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="group relative rounded-2xl bg-stone-950/80 border border-stone-800 hover:border-amber-500/50 overflow-hidden flex flex-col transition-colors shadow-lg"
              >
                {/* Remove Bookmark Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    removeSavedArticle(post.slug);
                  }}
                  aria-label={`Remove "${post.title}" from saved articles`}
                  title="Remove from Saved Articles"
                  className="absolute top-3 right-3 z-20 inline-flex items-center justify-center w-8 h-8 rounded-full bg-stone-950/85 hover:bg-red-950/90 text-stone-300 hover:text-red-300 border border-stone-700/80 hover:border-red-500/40 backdrop-blur-md transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                <a
                  href={href}
                  onClick={(e) => handleOpenPost(post.slug, e)}
                  className="flex-1 flex flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/9] bg-stone-900 overflow-hidden">
                    <LazyImage
                      src={coverImg}
                      alt={post.coverImageAlt || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={80}
                      skeletonVariant="card"
                      fallbackSrc={DEFAULT_BRIDAL_FALLBACK_IMAGE}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent pointer-events-none z-[2]" />
                    <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-stone-950/85 backdrop-blur-md border border-stone-700/80 text-amber-300 text-[10px] font-mono uppercase tracking-wider font-semibold">
                      {post.category || 'Atelier Masterclass'}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-400/80" />
                          {post.readingTime || '10 min read'}
                        </span>
                        <span className="text-stone-700">•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-stone-500" />
                          {post.date}
                        </span>
                      </div>

                      <h3 className="font-serif text-base sm:text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors leading-snug line-clamp-2 mb-2">
                        {post.title}
                      </h3>

                      <p className="text-xs text-stone-400 leading-relaxed line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1 text-amber-300/90 font-medium">
                        <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Saved</span>
                      </span>
                      <span className="font-semibold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Revisit Guide</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </a>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SavedArticlesSection;

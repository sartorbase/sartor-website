import React, { useState } from 'react';
import {
  Share2,
  Check,
  Copy,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

export interface ArticleShareBarProps {
  title: string;
  excerpt: string;
  slug: string;
  variant?: 'compact' | 'full';
}

export const ArticleShareBar: React.FC<ArticleShareBarProps> = ({
  title,
  excerpt,
  slug,
  variant = 'compact',
}) => {
  const [shareStatus, setShareStatus] = useState<'idle' | 'shared' | 'copied'>('idle');

  const getShareUrl = (): string => {
    if (typeof window !== 'undefined' && window.location?.href) {
      return window.location.href;
    }
    return `${SITE_CONFIG.url}/blog/${slug}`;
  };

  const getCanonicalShareUrl = (): string => `${SITE_CONFIG.url}/blog/${slug}`;

  const copyArticleLink = async (urlToCopy: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(urlToCopy);
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2400);
    }
  };

  const handleWebShare = async () => {
    const shareUrl = getShareUrl();
    const shareData: ShareData = {
      title,
      text: excerpt || title,
      url: shareUrl,
    };

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData);
        setShareStatus('shared');
        setTimeout(() => setShareStatus('idle'), 2400);
        return;
      } catch (err) {
        // User dismissed native share sheet cleanly — do not trigger fallback copy
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
      }
    }

    // Fallback when Web Share API is unsupported or blocked in desktop/iframe contexts
    try {
      await copyArticleLink(shareUrl);
    } catch {
      setShareStatus('idle');
    }
  };

  const canonicalUrl = getCanonicalShareUrl();
  const encodedUrl = encodeURIComponent(canonicalUrl);
  const encodedTitleAndUrl = encodeURIComponent(`${title} — ${canonicalUrl}`);
  const encodedTitle = encodeURIComponent(title);

  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-2">
        <button
          type="button"
          onClick={handleWebShare}
          aria-label={`Share ${title}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-amber-300 border border-stone-800 hover:border-amber-500/40 text-xs font-medium transition-colors cursor-pointer"
        >
          {shareStatus === 'shared' ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Shared</span>
            </>
          ) : shareStatus === 'copied' ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Share</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => copyArticleLink(getShareUrl())}
          aria-label="Copy article link"
          title="Copy article link"
          className="inline-flex items-center justify-center p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 transition-colors cursor-pointer"
        >
          {shareStatus === 'copied' ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    );
  }

  return (
    <section
      aria-label="Share this article"
      className="mt-12 p-6 rounded-2xl bg-stone-900/80 border border-stone-800 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
    >
      <div className="space-y-1">
        <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
          <Share2 className="w-3.5 h-3.5" />
          <span>Share This Masterclass</span>
        </div>
        <p className="text-sm text-stone-300 max-w-xl">
          Send this engineering guide to your bridal coordinator, family, or tailoring group on WhatsApp and social media.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 shrink-0">
        <button
          type="button"
          onClick={handleWebShare}
          aria-label={`Share ${title}`}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
        >
          {shareStatus === 'shared' ? (
            <>
              <Check className="w-4 h-4" />
              <span>Shared</span>
            </>
          ) : shareStatus === 'copied' ? (
            <>
              <Check className="w-4 h-4" />
              <span>Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </>
          )}
        </button>

        <a
          href={`https://wa.me/?text=${encodedTitleAndUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-stone-850 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-semibold transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          <span>X / Twitter</span>
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-stone-850 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-semibold transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          <span>LinkedIn</span>
        </a>

        <button
          type="button"
          onClick={() => copyArticleLink(getShareUrl())}
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
        >
          {shareStatus === 'copied' ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};

export default ArticleShareBar;

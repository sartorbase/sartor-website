'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

export const SAVED_ARTICLES_STORAGE_KEY = 'sartor_saved_articles_v1';
export const SAVED_ARTICLES_CHANGE_EVENT = 'sartor:saved-articles-change';

export interface SavedArticleRecord {
  slug: string;
  savedAt: string;
}

export function cleanArticleSlug(rawSlug?: string | null): string {
  if (!rawSlug || typeof rawSlug !== 'string') return '';
  const stripped = rawSlug.split('?')[0].split('#')[0].replace(/^\/+|\/+$/g, '').trim();
  if (!stripped) return '';
  try {
    return decodeURIComponent(stripped);
  } catch {
    return stripped;
  }
}

export function readSavedArticlesFromStorage(): SavedArticleRecord[] {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(SAVED_ARTICLES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const seen = new Set<string>();
    const normalized: SavedArticleRecord[] = [];

    for (const entry of parsed) {
      let slug = '';
      let savedAt = '';

      if (typeof entry === 'string') {
        slug = cleanArticleSlug(entry);
        savedAt = new Date().toISOString();
      } else if (entry && typeof entry === 'object' && typeof entry.slug === 'string') {
        slug = cleanArticleSlug(entry.slug);
        savedAt =
          typeof entry.savedAt === 'string' && entry.savedAt.trim()
            ? entry.savedAt
            : new Date().toISOString();
      }

      if (slug && !seen.has(slug)) {
        seen.add(slug);
        normalized.push({ slug, savedAt });
      }
    }

    return normalized;
  } catch {
    return [];
  }
}

export function writeSavedArticlesToStorage(records: SavedArticleRecord[]): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  try {
    window.localStorage.setItem(SAVED_ARTICLES_STORAGE_KEY, JSON.stringify(records));
    window.dispatchEvent(new CustomEvent(SAVED_ARTICLES_CHANGE_EVENT));
  } catch {
    // Gracefully ignore storage quota or privacy-mode restrictions
  }
}

export function useSavedArticles() {
  const [savedItems, setSavedItems] = useState<SavedArticleRecord[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const syncFromStorage = () => {
      setSavedItems(readSavedArticlesFromStorage());
      setHasHydrated(true);
    };

    syncFromStorage();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === SAVED_ARTICLES_STORAGE_KEY) {
        syncFromStorage();
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(SAVED_ARTICLES_CHANGE_EVENT, syncFromStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(SAVED_ARTICLES_CHANGE_EVENT, syncFromStorage);
    };
  }, []);

  const savedSlugs = useMemo(
    () => savedItems.map((item) => item.slug),
    [savedItems]
  );

  const savedSlugSet = useMemo(() => new Set(savedSlugs), [savedSlugs]);

  const isSaved = useCallback(
    (slug?: string | null): boolean => {
      const cleaned = cleanArticleSlug(slug);
      return cleaned ? savedSlugSet.has(cleaned) : false;
    },
    [savedSlugSet]
  );

  const saveArticle = useCallback((slug: string) => {
    const cleaned = cleanArticleSlug(slug);
    if (!cleaned) return;

    const current = readSavedArticlesFromStorage();
    if (current.some((item) => item.slug === cleaned)) return;

    const next: SavedArticleRecord[] = [
      { slug: cleaned, savedAt: new Date().toISOString() },
      ...current,
    ];
    setSavedItems(next);
    writeSavedArticlesToStorage(next);
  }, []);

  const removeSavedArticle = useCallback((slug: string) => {
    const cleaned = cleanArticleSlug(slug);
    if (!cleaned) return;

    const current = readSavedArticlesFromStorage();
    const next = current.filter((item) => item.slug !== cleaned);
    setSavedItems(next);
    writeSavedArticlesToStorage(next);
  }, []);

  const toggleSaveArticle = useCallback((slug: string): boolean => {
    const cleaned = cleanArticleSlug(slug);
    if (!cleaned) return false;

    const current = readSavedArticlesFromStorage();
    const exists = current.some((item) => item.slug === cleaned);
    const next = exists
      ? current.filter((item) => item.slug !== cleaned)
      : [{ slug: cleaned, savedAt: new Date().toISOString() }, ...current];

    setSavedItems(next);
    writeSavedArticlesToStorage(next);
    return !exists;
  }, []);

  const clearSavedArticles = useCallback(() => {
    setSavedItems([]);
    writeSavedArticlesToStorage([]);
  }, []);

  return {
    savedItems,
    savedSlugs,
    hasHydrated,
    isSaved,
    saveArticle,
    removeSavedArticle,
    toggleSaveArticle,
    clearSavedArticles,
  };
}

import React, { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    types: {
      'application/rss+xml': [
        {
          url: 'https://www.sartor.pk/rss.xml',
          title: 'SARTOR Lahore Atelier & Fashion-Tech Journal',
        },
      ],
    },
  },
};

/**
 * SARTOR Blog Segment Layout (Next.js App Router)
 * Wraps /blog and /blog/[slug] inside a deterministic Suspense boundary
 * without invoking useSearchParams() on static asset paths, ensuring
 * ?utm_source=Pinterest&utm_medium=organic and social query strings never
 * alter hero image resolution or block static rendering.
 */
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 antialiased">
      <Suspense
        fallback={
          <div className="min-h-screen bg-stone-950 text-stone-100 flex items-center justify-center px-4">
            <div className="w-full max-w-4xl space-y-6 py-16">
              <div className="h-8 w-48 rounded-lg bg-stone-900 animate-pulse" />
              <div className="h-12 w-3/4 rounded-xl bg-stone-900 animate-pulse" />
              <div className="aspect-[16/9] w-full rounded-2xl bg-stone-900 border border-stone-800 animate-pulse" />
            </div>
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '../../lib/mdx';
import { WhatsAppButton } from '../../components/WhatsAppButton';

export const metadata: Metadata = {
  title: "Atelier Journal & Couture Guides | SARTOR Bespoke Lahore",
  description: "Insights on luxury Pakistani bridal tailoring, zardozi embroidery craftsmanship, size measurement guides for overseas brides, and Lahore atelier updates.",
  openGraph: {
    title: "Atelier Journal & Couture Guides | SARTOR Bespoke Lahore",
    description: "Insights on luxury Pakistani bridal tailoring, zardozi embroidery craftsmanship, size measurement guides for overseas brides, and Lahore atelier updates.",
    type: "website",
    url: "https://sartor.pk/blog",
    images: [
      {
        url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Sartor Atelier Journal & Tailoring Guides",
      },
    ],
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-stone-800/80 bg-stone-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-widest text-amber-400 transition-colors group-hover:text-amber-300">
              SARTOR
            </span>
            <span className="hidden text-xs uppercase tracking-widest text-stone-400 sm:inline-block">
              | Atelier Journal
            </span>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link
              href="/"
              className="text-stone-300 transition-colors hover:text-amber-300"
            >
              Atelier Home
            </Link>
            <Link
              href="/custom-bridal"
              className="hidden text-stone-300 transition-colors hover:text-amber-300 sm:inline-block"
            >
              Custom Bridal ($2k+)
            </Link>
            <WhatsAppButton
              sourceLocation="blog_header_consultation"
              message="Hi Sartor, I am browsing your Atelier Journal and would like a tailoring consultation."
              variant="outline"
              className="!py-1.5 !px-3.5 !text-xs"
            >
              Ask Atelier
            </WhatsAppButton>
          </nav>
        </div>
      </header>

      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-stone-800 bg-gradient-to-b from-stone-900/60 to-stone-950 py-16 sm:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-60" />
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-amber-300 uppercase">
            <span>✨</span> Knowledge & Couture Masterclasses
          </div>
          <h1 className="mt-5 font-serif text-3xl font-medium tracking-tight text-stone-50 sm:text-5xl lg:text-6xl">
            The Sartor Atelier Journal
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-stone-300 sm:text-lg">
            Essential guides for discerning brides and fashion lovers. Explore artisan zardozi techniques, overseas measurement blueprints, and insider advice from Lahore’s master ustads.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-stone-800 bg-stone-900/50 p-12 text-center">
            <p className="text-stone-400">No blog posts found in /content/posts/.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-800/80 bg-stone-900/40 transition-all duration-300 hover:border-amber-500/40 hover:bg-stone-900/70 hover:shadow-xl hover:shadow-amber-500/5"
              >
                {/* Cover Image */}
                {post.frontmatter.coverImage && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.frontmatter.coverImage}
                      alt={post.frontmatter.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                    {post.frontmatter.category && (
                      <span className="absolute top-4 left-4 rounded-md border border-stone-700/60 bg-stone-900/90 px-2.5 py-1 text-xs font-semibold tracking-wider text-amber-300 uppercase backdrop-blur-sm">
                        {post.frontmatter.category}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                  <div>
                    {/* Post Meta */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400">
                      <time dateTime={post.frontmatter.date}>
                        {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                      {post.frontmatter.readingTime && (
                        <>
                          <span>•</span>
                          <span>{post.frontmatter.readingTime}</span>
                        </>
                      )}
                      <span>•</span>
                      <span className="text-stone-300">{post.frontmatter.author}</span>
                    </div>

                    {/* Post Title */}
                    <h2 className="mt-3 font-serif text-xl font-semibold text-stone-100 transition-colors group-hover:text-amber-300 sm:text-2xl">
                      <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {post.frontmatter.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="mt-3 text-sm leading-relaxed text-stone-300 line-clamp-3">
                      {post.frontmatter.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-800/80">
                    {/* Tags */}
                    {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.frontmatter.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-stone-800/90 px-2.5 py-0.5 text-[11px] font-medium text-stone-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                      <span>Read Full Masterclass</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Global Conversion CTA Banner */}
        <section className="mt-20 overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-stone-900 via-stone-900/95 to-amber-950/30 p-8 sm:p-12 text-center shadow-2xl">
          <span className="inline-block text-2xl mb-2">🧵</span>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-stone-100 sm:text-3xl">
            Have a Specific Design or Sizing Question?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-stone-300 leading-relaxed">
            Our Lahore master tailors and bridal consultants provide complimentary fabric consultations, yardage estimates, and live video measurements for clients worldwide.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <WhatsAppButton
              sourceLocation="blog_archive_bottom_cta"
              message="Hi Sartor, I was reading your Atelier Journal and would like to speak with a master tailor about an upcoming outfit."
              variant="primary"
              className="!py-3.5 !px-8 text-sm"
            >
              Chat With Master Tailor on WhatsApp
            </WhatsAppButton>
            <Link
              href="/custom-bridal"
              className="rounded-xl border border-stone-700 bg-stone-800/60 px-6 py-3.5 text-sm font-semibold text-stone-200 transition-colors hover:border-amber-400 hover:text-amber-300"
            >
              Explore Bespoke Bridal Service
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

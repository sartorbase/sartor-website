import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import { getPostBySlug, getAllPostSlugs } from '../../../lib/mdx';
import { WhatsAppButton } from '../../../components/WhatsAppButton';

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

/**
 * Pre-generate static routes for all available MDX blog posts
 */
export async function generateStaticParams() {
  return await getAllPostSlugs();
}

/**
 * Dynamic SEO metadata generator for Next.js App Router
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | SARTOR Atelier',
      description: 'The requested journal entry could not be located.',
    };
  }

  const { title, excerpt, date, author, coverImage, tags } = post.frontmatter;

  return {
    title: `${title} | SARTOR Atelier Journal`,
    description: excerpt,
    authors: [{ name: author }],
    keywords: tags,
    openGraph: {
      title: `${title} | SARTOR Atelier`,
      description: excerpt,
      type: 'article',
      publishedTime: date,
      authors: [author],
      tags: tags,
      images: coverImage
        ? [
            {
              url: coverImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: excerpt,
      images: coverImage ? [coverImage] : undefined,
    },
  };
}

/**
 * Custom MDX Component mapping
 */
const mdxComponents = {
  // Enhanced responsive images
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={props.alt || 'Sartor Atelier Visual Proof'}
      className="my-8 w-full rounded-2xl border border-stone-800 object-cover shadow-2xl"
      loading="lazy"
    />
  ),
  // Blockquotes with atelier styling
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLElement>) => (
    <blockquote
      {...props}
      className="my-6 rounded-r-xl border-l-4 border-amber-400 bg-stone-900/60 py-3 px-5 font-serif italic text-stone-200"
    />
  ),
  // Tables formatted for responsive reading
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-stone-800 bg-stone-900/40">
      <table {...props} className="w-full text-left text-sm text-stone-300" />
    </div>
  ),
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { title, excerpt, date, author, coverImage, tags, category, readingTime } =
    post.frontmatter;

  return (
    <article className="min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Sticky Reader Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-stone-800/80 bg-stone-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-400 transition-colors hover:text-amber-300"
            >
              <span>←</span>
              <span>All Articles</span>
            </Link>
            <span className="hidden text-stone-700 sm:inline">|</span>
            <Link
              href="/"
              className="hidden font-serif text-sm font-bold tracking-widest text-amber-400 sm:inline"
            >
              SARTOR
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/custom-bridal"
              className="hidden text-xs font-medium text-stone-300 transition-colors hover:text-amber-300 md:inline-block"
            >
              Custom Bridal
            </Link>
            <WhatsAppButton
              sourceLocation={`article_header_${slug}`}
              message={`Hi Sartor, I am reading "${title}" and would like to ask a tailoring question.`}
              variant="outline"
              className="!py-1.5 !px-3.5 !text-xs"
            >
              Consult Atelier
            </WhatsAppButton>
          </div>
        </div>
      </header>

      {/* Article Header Banner */}
      <section className="relative border-b border-stone-800/80 bg-gradient-to-b from-stone-900/60 to-stone-950 pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Category & Date Meta */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-stone-400">
            {category && (
              <span className="rounded-md border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-amber-300 uppercase tracking-wider font-semibold">
                {category}
              </span>
            )}
            <span>•</span>
            <time dateTime={date}>
              {new Date(date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            {readingTime && (
              <>
                <span>•</span>
                <span>{readingTime}</span>
              </>
            )}
            <span>•</span>
            <span className="text-stone-300">{author}</span>
          </div>

          {/* Article Title */}
          <h1 className="mt-4 font-serif text-2xl font-bold tracking-tight text-stone-50 sm:text-4xl lg:text-5xl leading-tight sm:leading-tight">
            {title}
          </h1>

          {/* Lead Excerpt */}
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-stone-300 font-light">
            {excerpt}
          </p>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-stone-900 border border-stone-800 px-3 py-1 text-xs text-stone-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Cover Image (Hero) */}
      {coverImage && (
        <div className="mx-auto max-w-4xl px-4 -mt-6 sm:-mt-8 sm:px-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-stone-800 bg-stone-900 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImage}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      {/* MDX Body Content */}
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="prose prose-lg prose-invert prose-amber max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-stone-100 prose-p:text-stone-300 prose-p:leading-relaxed prose-li:text-stone-300 prose-strong:text-amber-200 prose-a:text-amber-400 prose-a:underline hover:prose-a:text-amber-300 prose-hr:border-stone-800">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                rehypePlugins: [rehypeHighlight, rehypeSlug],
              },
            }}
            components={mdxComponents}
          />
        </div>

        {/* High-Converting Bottom CTA Card */}
        <section className="mt-16 rounded-3xl border border-amber-500/40 bg-gradient-to-br from-stone-900 via-stone-900/90 to-amber-950/40 p-6 sm:p-10 shadow-2xl">
          <div className="flex items-center gap-3 text-amber-400">
            <span className="text-2xl">💎</span>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Sartor Bespoke Concierge
            </span>
          </div>

          <h2 className="mt-3 font-serif text-2xl font-bold tracking-tight text-stone-100 sm:text-3xl">
            Inspired by this article? Let&apos;s create your heirloom outfit.
          </h2>

          <p className="mt-3 text-sm sm:text-base text-stone-300 leading-relaxed">
            Whether you need exact bridal lehenga tailoring, custom replica zardozi work, or luxury festive stitched ensembles delivered overseas via DHL Express, our master karigars are at your service.
          </p>

          {/* Micro Trust Indicators */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 border-y border-stone-800/80 py-4 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">✓</span>
              <span>Live 4K Adda Frame Swatch</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">✓</span>
              <span>2.5&quot; Inseam Fit Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">✓</span>
              <span>DHL Tracked Worldwide</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <WhatsAppButton
              sourceLocation={`article_cta_bottom_${slug}`}
              message={`Hi Sartor, I just read your article "${title}" and would like to get a consultation and pricing estimate for a custom outfit.`}
              variant="primary"
              className="w-full sm:w-auto !py-3.5 !px-8 text-sm"
            >
              Start WhatsApp Consultation
            </WhatsAppButton>

            <Link
              href="/custom-bridal"
              className="w-full sm:w-auto text-center rounded-xl border border-stone-700 bg-stone-800/80 px-6 py-3.5 text-sm font-semibold text-stone-200 transition-colors hover:border-amber-400 hover:text-amber-300"
            >
              View 4-Step Milestone Process
            </Link>
          </div>
        </section>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>← Back to all Atelier Journal entries</span>
          </Link>
        </div>
      </main>
    </article>
  );
}

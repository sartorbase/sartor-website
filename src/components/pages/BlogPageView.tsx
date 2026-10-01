import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  BookOpen,
  MessageSquare,
  Sparkles,
  Tag,
  Check,
  ChevronRight,
  ShieldCheck,
  Scissors,
} from 'lucide-react';
import { BLOG_POSTS, BlogPostData, getBlogPostBySlug } from '../../data/blogPosts';
import { buildWhatsAppLink } from '../../services/analytics';
import { navigateTo } from '../../utils/navigation';

export interface BlogPageViewProps {
  slug?: string;
}

export const BlogPageView: React.FC<BlogPageViewProps> = ({ slug }) => {
  const [activeSlug, setActiveSlug] = useState<string | undefined>(slug);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setActiveSlug(slug);
  }, [slug]);

  // Handle route change via popstate
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/blog/')) {
        const currentSlug = path.replace('/blog/', '').replace(/\/$/, '');
        setActiveSlug(currentSlug);
      } else if (path === '/blog' || path === '/blog/') {
        setActiveSlug(undefined);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const activePost: BlogPostData | undefined = activeSlug
    ? getBlogPostBySlug(activeSlug)
    : undefined;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // If viewing a single post
  if (activePost) {
    const postWhatsAppMsg = `*SARTOR ATELIER JOURNAL ENQUIRY*
---------------------------------------
Article: ${activePost.title}
URL: https://sartor.pk/blog/${activePost.slug}

Assalam-o-Alaikum SARTOR Atelier,
I read your tailoring guide and would like to consult on bespoke stitching and fabric pickup in Lahore.`;
    const postWhatsAppUrl = buildWhatsAppLink(postWhatsAppMsg, 'blog_post');

    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Navigation Bar */}
          <div className="mb-8 flex items-center justify-between gap-4">
            <button
              onClick={() => navigateTo('/blog')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-400 hover:text-amber-400 uppercase tracking-wider transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Atelier Journal</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-850 text-stone-300 border border-stone-800 text-xs transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Guide</span>
                </>
              )}
            </button>
          </div>

          {/* Article Header */}
          <header className="mb-10 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-4 text-xs">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono uppercase tracking-wider font-semibold">
                {activePost.category || 'Atelier Masterclass'}
              </span>
              <span className="text-stone-500">•</span>
              <span className="text-stone-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activePost.readingTime || '8 min read'}
              </span>
              <span className="text-stone-500">•</span>
              <span className="text-stone-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {activePost.date}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-100 tracking-tight leading-[1.18] mb-6">
              {activePost.title}
            </h1>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-3xl">
              {activePost.excerpt}
            </p>

            <div className="mt-6 pt-6 border-t border-stone-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-600/30 border border-amber-500/40 text-amber-400 flex items-center justify-center font-serif font-bold text-base">
                AG
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-200">{activePost.author}</p>
                <p className="text-xs text-stone-400">Master Tailor &amp; Head Cutter, SARTOR Lahore</p>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          {activePost.coverImage && (
            <div className="mb-12 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-900 aspect-[16/9]">
              <img
                src={activePost.coverImage}
                alt={activePost.coverImageAlt || activePost.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Markdown Content with Editorial Component Styling */}
          <article className="prose prose-invert prose-stone max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-stone-100 prose-p:text-stone-300 prose-p:leading-relaxed prose-li:text-stone-300 prose-strong:text-stone-100 prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline prose-table:text-sm prose-th:text-amber-400 prose-th:font-mono prose-th:bg-stone-900 prose-td:border-stone-800 prose-hr:border-stone-800">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                blockquote: ({ children }) => (
                  <div className="my-6 p-6 rounded-2xl bg-stone-900/90 border-l-4 border-amber-500 border-stone-800 text-stone-200 shadow-lg font-sans">
                    {children}
                  </div>
                ),
                table: ({ children }) => (
                  <div className="my-8 overflow-x-auto rounded-xl border border-stone-800 bg-stone-900/60 shadow-lg">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="py-3 px-4 bg-stone-850 text-amber-400 font-mono text-[11px] uppercase tracking-wider border-b border-stone-800">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="py-3 px-4 border-b border-stone-800 text-stone-300">
                    {children}
                  </td>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 mt-12 mb-4 pb-2 border-b border-stone-850">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-serif font-bold text-stone-200 mt-8 mb-3">
                    {children}
                  </h3>
                ),
                hr: () => <hr className="my-10 border-stone-800" />,
              }}
            >
              {activePost.content.replace(/^---[\s\S]*?---\s*/, '')}
            </ReactMarkdown>
          </article>

          {/* Author Block */}
          <div className="mt-16 p-8 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-stone-950 flex items-center justify-center font-serif font-bold text-2xl shrink-0 shadow-lg">
              AG
            </div>
            <div className="text-center sm:text-left flex-1">
              <span className="text-xs uppercase font-mono text-amber-400 font-semibold tracking-wider">
                About the Master Tailor
              </span>
              <h3 className="text-xl font-serif font-bold text-stone-100 mt-1">
                Abdul Ghaffar — Master Tailor, SARTOR
              </h3>
              <p className="mt-2 text-stone-400 text-sm leading-relaxed">
                With 35+ years of cutting and pattern drafting at Lahore ateliers, Master Tailor Abdul Ghaffar oversees all garment drafting, seam margin preservation, and quality inspections at SARTOR Model Town.
              </p>
            </div>
          </div>

          {/* Final Call to Action */}
          <div className="mt-12 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-950 border border-amber-500/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <span className="text-xs uppercase font-mono text-amber-400 font-semibold tracking-widest block mb-1">
                Ready to Experience Master Craftsmanship?
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-100">
                Book Bespoke Tailoring in Lahore
              </h3>
              <p className="mt-2 text-stone-300 text-sm max-w-xl">
                Have unstitched designer lawn, festive silks, or bridal fabric? Send your measurements or sample suit via free doorstep pickup across Lahore.
              </p>
            </div>

            <a
              href={postWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base flex items-center gap-3 transition-all shadow-xl shadow-emerald-950/60 shrink-0 cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>Ask SARTOR on WhatsApp</span>
            </a>
          </div>

          {/* Related Articles Navigation */}
          <div className="mt-16 pt-10 border-t border-stone-800">
            <h3 className="font-serif font-bold text-lg text-stone-100 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span>Continue Reading in Atelier Journal</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BLOG_POSTS.filter((p) => p.slug !== activePost.slug).map((post) => (
                <div
                  key={post.slug}
                  onClick={() => navigateTo(`/blog/${post.slug}`)}
                  className="p-5 rounded-xl bg-stone-900/60 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-all cursor-pointer group"
                >
                  <span className="text-[11px] font-mono uppercase text-amber-400 block mb-1">
                    {post.category}
                  </span>
                  <h4 className="font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors text-sm line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="mt-2 text-stone-400 text-xs line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-amber-400 font-semibold">
                    <span>Read Article</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Blog Archive List View
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 mb-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            Atelier Journal &amp; Guides
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-100 tracking-tight">
            Tailoring Masterclasses &amp; Fitting Insights
          </h1>
          <p className="mt-4 text-stone-300 text-base leading-relaxed">
            Practical advice from Lahore master tailors on choosing the right artisan, sizing bridal lehengas, fabric yardage, and avoiding fitting nightmares.
          </p>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              onClick={() => navigateTo(`/blog/${post.slug}`)}
              className="group rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-950/20 transition-all flex flex-col cursor-pointer"
            >
              {post.coverImage && (
                <div className="relative aspect-[16/9] bg-stone-950 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.coverImageAlt || post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md border border-stone-700 text-stone-200 text-xs font-semibold">
                    {post.category}
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-stone-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTime}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors leading-snug mb-3">
                    {post.title}
                  </h2>

                  <p className="text-stone-300 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-xs text-stone-400 font-medium">{post.author}</span>
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Full Guide</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

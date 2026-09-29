import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Clock, Sparkles, MessageCircle, ChevronRight, Share2, Check, Home } from 'lucide-react';
import { BLOG_POSTS, BlogPostData, getBlogPostBySlug } from '../../data/blogPosts';
import { buildWhatsAppLink } from '../../services/analytics';
import { trackWhatsAppClick } from '../../../lib/analytics';
import { navigateTo, handleInternalLinkClick } from '../../utils/navigation';

interface BlogPageViewProps {
  initialSlug?: string | null;
  onNavigateHome: () => void;
  onNavigateCustomBridal: () => void;
}

export const BlogPageView: React.FC<BlogPageViewProps> = ({
  initialSlug,
  onNavigateHome,
  onNavigateCustomBridal,
}) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug || null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync state whenever initialSlug prop changes
  useEffect(() => {
    if (initialSlug !== undefined) {
      setSelectedSlug(initialSlug);
    }
  }, [initialSlug]);

  // Handle client-side hash migration if user arrived via #blog/slug or #blog
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (hash.startsWith('#blog/')) {
      const slug = hash.replace('#blog/', '').trim();
      if (slug) {
        window.history.replaceState(null, '', `/blog/${slug}`);
        setSelectedSlug(slug);
      }
    } else if (hash === '#blog') {
      window.history.replaceState(null, '', '/blog');
      setSelectedSlug(null);
    }
  }, []);

  const activePost: BlogPostData | null = selectedSlug
    ? getBlogPostBySlug(selectedSlug) || null
    : null;

  // Dynamically update document title, canonical link, and JSON-LD structured data on client side
  useEffect(() => {
    if (typeof document === 'undefined') return;

    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.rel = 'canonical';
      document.head.appendChild(canonicalEl);
    }

    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }

    // Dynamic schema container for blog posts
    let schemaScript = document.getElementById('sartor-blog-dynamic-ldjson') as HTMLScriptElement;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'sartor-blog-dynamic-ldjson';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    if (activePost) {
      // 1. Specific Article SEO
      const articleUrl = `https://sartor.pk/blog/${activePost.slug}`;
      document.title = `${activePost.title} | SARTOR Atelier`;
      canonicalEl.href = articleUrl;
      metaDesc.content = activePost.excerpt;

      // Inject BlogPosting + BreadcrumbList JSON-LD
      const schemaData = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BlogPosting',
            '@id': `${articleUrl}#article`,
            'isPartOf': {
              '@type': 'Blog',
              '@id': 'https://sartor.pk/blog',
              'name': 'SARTOR Atelier Journal',
            },
            'headline': activePost.title,
            'description': activePost.excerpt,
            'image': activePost.coverImage
              ? (activePost.coverImage.startsWith('http') ? activePost.coverImage : `https://sartor.pk${activePost.coverImage}`)
              : 'https://sartor.pk/digital-measurements-guide.jpg',
            'datePublished': `${activePost.date}T00:00:00+05:00`,
            'dateModified': `${activePost.date}T00:00:00+05:00`,
            'author': {
              '@type': 'Person',
              'name': 'Abdul Ghaffar',
              'jobTitle': 'Master Tailor & Cutting Artisan',
              'worksFor': {
                '@type': 'Organization',
                'name': 'SARTOR Bespoke Atelier',
              },
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'SARTOR Bespoke Atelier',
              'url': 'https://sartor.pk',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://sartor.pk/logo.png',
              },
            },
            'mainEntityOfPage': {
              '@type': 'WebPage',
              '@id': articleUrl,
            },
            'articleSection': activePost.category,
            'keywords': activePost.tags.join(', '),
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${articleUrl}#breadcrumb`,
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://sartor.pk/',
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Atelier Journal',
                'item': 'https://sartor.pk/blog',
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': activePost.title,
                'item': articleUrl,
              },
            ],
          },
        ],
      };
      schemaScript.textContent = JSON.stringify(schemaData);
    } else {
      // 2. Blog Archive Listing SEO
      document.title = 'SARTOR Atelier Journal | Bespoke Tailoring & Couture Guides';
      canonicalEl.href = 'https://sartor.pk/blog';
      metaDesc.content =
        'Guides for discerning brides and couture enthusiasts. Discover authentic zardozi embroidery techniques, international measurement advice, and craftsmanship updates from Lahore.';
      
      const archiveSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': 'https://sartor.pk/blog',
        'name': 'SARTOR Atelier Journal',
        'url': 'https://sartor.pk/blog',
        'description':
          'Guides for discerning brides and couture enthusiasts. Discover authentic zardozi embroidery techniques, international measurement advice, and craftsmanship updates from Lahore.',
        'breadcrumb': {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://sartor.pk/',
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Atelier Journal',
              'item': 'https://sartor.pk/blog',
            },
          ],
        },
      };
      schemaScript.textContent = JSON.stringify(archiveSchema);
    }
  }, [activePost]);

  const handleSelectPost = (slug: string, e?: React.MouseEvent) => {
    setSelectedSlug(slug);
    navigateTo(`/blog/${slug}`, e);
  };

  const handleBackToList = (e?: React.MouseEvent) => {
    setSelectedSlug(null);
    navigateTo('/blog', e);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      const shareUrl = activePost
        ? `${window.location.origin}/blog/${activePost.slug}`
        : `${window.location.origin}/blog`;
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top sticky navigation bar */}
      <header className="sticky top-0 z-40 border-b border-stone-800/80 bg-stone-950/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="group flex items-center gap-2 text-stone-400 hover:text-amber-400 text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Studio Home</span>
            </a>
            <span className="text-stone-700 hidden sm:inline">|</span>
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                handleBackToList(e);
              }}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <span className="font-serif text-lg font-bold tracking-widest text-amber-400 group-hover:text-amber-300">
                SARTOR
              </span>
              <span className="text-xs uppercase tracking-widest text-stone-400 group-hover:text-stone-200">
                Atelier Journal
              </span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/custom-bridal"
              onClick={(e) => {
                e.preventDefault();
                onNavigateCustomBridal();
              }}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-950/60 border border-amber-500/40 text-amber-300 hover:bg-amber-900/60 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Custom Bridal ($2k+)</span>
            </a>

            <a
              href={buildWhatsAppLink(
                'Hi Sartor, I am reading your Atelier Journal and would like to ask a tailoring question.',
                'blog_header'
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('blog_top_header_cta')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Ask Atelier</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {activePost ? (
        /* SINGLE ARTICLE DETAIL VIEW */
        <article className="pb-24">
          {/* Article Banner Header with Breadcrumbs */}
          <div className="border-b border-stone-800/80 bg-gradient-to-b from-stone-900/70 to-stone-950 py-10 sm:py-14">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              {/* Semantic SEO Breadcrumb Navigation */}
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex flex-wrap items-center gap-2 text-xs text-stone-400">
                  <li className="flex items-center gap-1.5">
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigateHome();
                      }}
                      className="hover:text-amber-400 flex items-center gap-1 transition-colors"
                    >
                      <Home className="w-3.5 h-3.5" />
                      <span>Home</span>
                    </a>
                  </li>
                  <li className="text-stone-600">/</li>
                  <li>
                    <a
                      href="/blog"
                      onClick={(e) => {
                        e.preventDefault();
                        handleBackToList(e);
                      }}
                      className="hover:text-amber-400 transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li className="text-stone-600">/</li>
                  <li className="text-amber-300 font-medium truncate max-w-[260px] sm:max-w-md" aria-current="page">
                    {activePost.title}
                  </li>
                </ol>
              </nav>

              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 mb-4">
                <span className="rounded-md border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-amber-300 uppercase tracking-wider font-semibold">
                  {activePost.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <time dateTime={activePost.date}>
                    {new Date(activePost.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>{activePost.readingTime}</span>
                </span>
                <span>•</span>
                <span className="text-stone-300 font-medium">{activePost.author}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-50 leading-tight sm:leading-tight">
                {activePost.title}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-stone-300 leading-relaxed font-light">
                {activePost.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {activePost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-stone-900 border border-stone-800 px-2.5 py-1 text-xs text-stone-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 transition-colors"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Article</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Hero Cover Image */}
          {activePost.coverImage && (
            <div className="max-w-4xl mx-auto px-4 -mt-6 sm:-mt-8 sm:px-6">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-stone-800 bg-stone-900 shadow-2xl">
                <img
                  src={activePost.coverImage}
                  alt={activePost.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Markdown Content */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <div className="prose prose-invert prose-amber max-w-none font-sans text-stone-300 leading-relaxed prose-headings:font-serif prose-headings:font-normal prose-headings:text-stone-100 prose-p:my-4 prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-xl prose-ul:my-4 prose-li:my-1 prose-strong:text-amber-300 prose-hr:border-stone-800 prose-table:my-8 prose-th:border-b prose-th:border-stone-700 prose-td:border-b prose-td:border-stone-800 prose-td:py-3 prose-th:py-3 prose-th:text-stone-200">
              <ReactMarkdown>{activePost.content}</ReactMarkdown>
            </div>

            {/* Conversion CTA Block at the bottom of article */}
            <section className="mt-16 rounded-3xl border border-amber-500/40 bg-gradient-to-br from-stone-900 via-stone-900/90 to-amber-950/40 p-6 sm:p-10 shadow-2xl">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                  Sartor Bespoke Concierge
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100 tracking-tight">
                Inspired by this article? Let&apos;s design your outfit.
              </h2>

              <p className="mt-3 text-sm sm:text-base text-stone-300 leading-relaxed">
                Whether you need custom bridal lehenga tailoring, replica designer work, or bespoke festive ensembles delivered overseas via DHL Express, our master karigars are ready to assist.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 border-y border-stone-800/80 py-4 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span>Live 4K Adda Frame Swatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span>2.5&quot; Inseam Fit Allowance</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span>DHL Tracked Worldwide</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={buildWhatsAppLink(
                    `Hi Sartor Atelier, I just read "${activePost.title}" and would like to ask about custom tailoring and pricing.`,
                    `blog_bottom_${activePost.slug}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(`blog_article_${activePost.slug}`)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-950/50 border border-emerald-400/30 transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Consult Master Tailor on WhatsApp</span>
                </a>

                <a
                  href="/custom-bridal"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateCustomBridal();
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-xl border border-stone-700 bg-stone-800/80 hover:bg-stone-800 text-stone-200 hover:text-amber-300 text-sm font-semibold transition-colors"
                >
                  <span>View 4-Step Milestone Process</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </section>

            <div className="mt-12 text-center">
              <a
                href="/blog"
                onClick={(e) => {
                  e.preventDefault();
                  handleBackToList(e);
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to all Atelier Journal entries</span>
              </a>
            </div>
          </div>
        </article>
      ) : (
        /* ARCHIVE / LISTING VIEW */
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Breadcrumb for Archive */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs text-stone-400">
              <li className="flex items-center gap-1.5">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateHome();
                  }}
                  className="hover:text-amber-400 flex items-center gap-1 transition-colors"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Home</span>
                </a>
              </li>
              <li className="text-stone-600">/</li>
              <li className="text-amber-300 font-medium" aria-current="page">
                Atelier Journal
              </li>
            </ol>
          </nav>

          {/* Hero Banner */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-amber-300 uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Knowledge & Couture Masterclasses</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-stone-50">
              The Sartor Atelier Journal
            </h1>
            <p className="mt-4 text-base sm:text-lg text-stone-300">
              Guides for discerning brides and couture enthusiasts. Discover authentic zardozi embroidery techniques, international measurement advice, and craftsmanship updates from Lahore.
            </p>
          </div>

          {/* Posts Grid with crawlable <a href="/blog/[slug]"> links */}
          <div className="grid gap-8 sm:grid-cols-2">
            {BLOG_POSTS.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                onClick={(e) => handleSelectPost(post.slug, e)}
                className="group flex flex-col overflow-hidden rounded-2xl border border-stone-800/80 bg-stone-900/40 hover:border-amber-500/40 hover:bg-stone-900/70 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 text-left"
              >
                {post.coverImage && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-900">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 rounded-md border border-stone-700/60 bg-stone-900/90 px-2.5 py-1 text-xs font-semibold tracking-wider text-amber-300 uppercase backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                )}

                <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400 mb-3">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                      <span>•</span>
                      <span className="text-stone-300">{post.author}</span>
                    </div>

                    <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-100 group-hover:text-amber-300 transition-colors">
                      {post.title}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-stone-300 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-800/80">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-stone-800/90 px-2.5 py-0.5 text-[11px] font-medium text-stone-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                      <span>Read Full Masterclass</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Bottom Conversion Section */}
          <section className="mt-20 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-stone-900 via-stone-900/95 to-amber-950/30 p-8 sm:p-12 text-center shadow-2xl">
            <span className="text-3xl inline-block mb-3">🧵</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100 tracking-tight">
              Have Questions About Overseas Sizing or Delivery?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-stone-300 leading-relaxed">
              Our master tailors and bridal concierges in Lahore offer 1-on-1 WhatsApp video measurement consultations and custom quotes.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={buildWhatsAppLink(
                  'Hi Sartor, I am exploring your Atelier Journal and would like a tailoring consultation.',
                  'journal_bottom'
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('blog_archive_bottom_cta')}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-950/50 border border-emerald-400/30 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat With Master Tailor on WhatsApp</span>
              </a>

              <a
                href="/custom-bridal"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateCustomBridal();
                }}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-stone-700 bg-stone-800/60 hover:bg-stone-800 text-stone-200 hover:text-amber-300 text-sm font-semibold transition-colors"
              >
                Explore Custom Bridal ($2k+)
              </a>
            </div>
          </section>
        </main>
      )}
    </div>
  );
};

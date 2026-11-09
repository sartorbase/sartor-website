import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Tag,
  BookOpen,
  Calendar,
  Clock,
  ChevronRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { BLOG_POSTS, BlogPostData } from '../../data/blogPosts';
import { navigateTo } from '../../utils/navigation';

export interface BlogSearchGridProps {
  posts?: BlogPostData[];
  onPostClick?: (slug: string) => void;
  className?: string;
}

// Curated topic filters that map to common high-intent categories and tags
interface TopicFilter {
  label: string;
  keywords: string[];
}

const TOPIC_FILTERS: TopicFilter[] = [
  { label: 'All Topics', keywords: [] },
  { label: 'Walima & Sarees', keywords: ['walima', 'saree', 'tissue', 'corset', 'pre-pleated'] },
  { label: 'Barat Lehengas', keywords: ['barat', 'lehenga', 'crimson', 'waistband'] },
  { label: 'Zardozi Bullion', keywords: ['zardozi', 'bullion', 'kora', 'dabka', 'naqshi', 'tilla', 'embroidery'] },
  { label: 'Scye Depth & Blouses', keywords: ['scye depth', 'blouse', 'armscye', 'gaping', 'boning'] },
  { label: 'Peshwas & Kalidars', keywords: ['peshwas', 'kalidar', 'angrakha', 'ghera', 'twirl'] },
  { label: 'Overseas Diaspora', keywords: ['overseas', 'diaspora', 'sizing', 'london', 'toronto', 'houston', 'dubai'] },
  { label: 'Pure Katan Silk', keywords: ['katan', 'silk', 'gsm', 'tensile', 'fabric'] },
];

const SUGGESTED_SEARCHES = [
  'Walima Saree',
  'Barat Lehenga',
  'Zardozi Bullion',
  'Scye Depth',
  'Peshwas Flare',
  'Katan Silk',
  'Farshi Gharara',
  'Pre-Pleated Tissue',
];

export const BlogSearchGrid: React.FC<BlogSearchGridProps> = ({
  posts = BLOG_POSTS,
  onPostClick,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState('All Topics');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Normalize search query
  const query = searchQuery.trim().toLowerCase();

  // Filter posts based on title, excerpt, tags, category, and active topic filter
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // 1. Direct tag filter
      if (activeTag) {
        const matchesActiveTag = post.tags?.some(
          (t) => t.toLowerCase() === activeTag.toLowerCase()
        );
        if (!matchesActiveTag) return false;
      }

      // 2. Active topic filter
      if (activeTopic !== 'All Topics') {
        const topic = TOPIC_FILTERS.find((t) => t.label === activeTopic);
        if (topic && topic.keywords.length > 0) {
          const postText = [
            post.title,
            post.excerpt,
            post.category,
            ...(post.tags || []),
          ]
            .join(' ')
            .toLowerCase();

          const hasTopicKeyword = topic.keywords.some((kw) => postText.includes(kw));
          if (!hasTopicKeyword) return false;
        }
      }

      // 3. Search query filter (matches title, tags, excerpt, or category)
      if (query) {
        const titleMatch = post.title.toLowerCase().includes(query);
        const excerptMatch = post.excerpt.toLowerCase().includes(query);
        const categoryMatch = post.category?.toLowerCase().includes(query);
        const tagMatch = post.tags?.some((t) => t.toLowerCase().includes(query));

        if (!titleMatch && !excerptMatch && !categoryMatch && !tagMatch) {
          return false;
        }
      }

      return true;
    });
  }, [posts, query, activeTopic, activeTag]);

  const handleCardClick = (slug: string) => {
    if (onPostClick) {
      onPostClick(slug);
    } else {
      navigateTo(`/blog/${slug}`);
    }
  };

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    if (activeTag?.toLowerCase() === tag.toLowerCase()) {
      setActiveTag(null);
    } else {
      setActiveTag(tag);
      setActiveTopic('All Topics');
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveTopic('All Topics');
    setActiveTag(null);
  };

  const isFiltered = query.length > 0 || activeTopic !== 'All Topics' || activeTag !== null;

  return (
    <div className={`w-full ${className}`}>
      {/* Search Bar & Filter Controls Container */}
      <div className="mb-12 max-w-4xl mx-auto">
        {/* Main Search Input */}
        <div className="relative flex items-center">
          <div className="absolute left-4.5 pointer-events-none text-amber-400/80 flex items-center justify-center">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search masterclasses by title or tag (e.g., Walima, Zardozi, Scye Depth, Lehenga)..."
            aria-label="Search blog posts by title or tag"
            className="w-full pl-12 pr-12 py-4 bg-stone-900/95 border border-stone-800 rounded-2xl text-stone-100 placeholder-stone-500 text-sm sm:text-base focus:outline-none focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/20 shadow-2xl transition-all"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Topic Pills & Active Filters */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase font-mono text-stone-400 mr-1 hidden sm:inline-block">
            Filter by:
          </span>

          {TOPIC_FILTERS.map((topic) => {
            const isSelected = activeTopic === topic.label && !activeTag;
            return (
              <button
                key={topic.label}
                type="button"
                onClick={() => {
                  setActiveTopic(topic.label);
                  setActiveTag(null);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-md shadow-amber-500/20'
                    : 'bg-stone-900 hover:bg-stone-850 text-stone-300 border border-stone-800 hover:border-stone-700'
                }`}
              >
                {topic.label}
              </button>
            );
          })}
        </div>

        {/* Active Filter Status Bar */}
        <div className="mt-4 pt-3 border-t border-stone-850/80 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong className="text-stone-200">{filteredPosts.length}</strong> of{' '}
              <strong className="text-stone-200">{posts.length}</strong> couture masterclasses
            </span>

            {activeTag && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono">
                <Tag className="w-3 h-3" />
                <span>#{activeTag}</span>
                <button
                  type="button"
                  onClick={() => setActiveTag(null)}
                  className="hover:text-amber-100 ml-0.5 cursor-pointer"
                  aria-label="Remove tag filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {query && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 font-mono">
                <span>matching &ldquo;{query}&rdquo;</span>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="hover:text-stone-100 ml-0.5 cursor-pointer"
                  aria-label="Remove keyword search"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Empty State when no articles match filter */}
      {filteredPosts.length === 0 ? (
        <div className="max-w-2xl mx-auto rounded-3xl border border-stone-800 bg-stone-900/60 p-10 sm:p-14 text-center shadow-2xl">
          <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
            <Search className="w-6 h-6" />
          </div>

          <h3 className="font-serif text-2xl font-bold text-stone-100 mb-2">
            No Masterclasses Found
          </h3>

          <p className="text-stone-300 text-sm leading-relaxed mb-6">
            We couldn&rsquo;t find any articles matching{' '}
            <strong className="text-amber-300">&ldquo;{query || activeTag || activeTopic}&rdquo;</strong>.
            Try another search term or explore one of our signature atelier topics:
          </p>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {SUGGESTED_SEARCHES.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => {
                  setSearchQuery(term);
                  setActiveTopic('All Topics');
                  setActiveTag(null);
                }}
                className="px-3 py-1.5 rounded-xl bg-stone-850 hover:bg-stone-800 border border-stone-750 text-stone-200 text-xs font-medium hover:border-amber-500/40 transition-colors cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs tracking-wider uppercase transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>View All {posts.length} Masterclasses</span>
          </button>
        </div>
      ) : (
        /* Blog Post Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => {
            const coverImg = post.coverImage || '/images/royal-crimson-barat-lehenga-zardozi-architecture-guide.jpg';
            const webpImg = coverImg.replace(/\.(jpe?g|png)$/i, '.webp');

            return (
              <article
                key={post.slug}
                onClick={() => handleCardClick(post.slug)}
                className="group rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-amber-500/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9),0_0_20px_-3px_rgba(245,158,11,0.2)] flex flex-col cursor-pointer will-change-transform"
              >
                {/* Cover Image with WebP Picture */}
                {post.coverImage && (
                  <div className="relative aspect-[16/9] bg-stone-950 overflow-hidden">
                    <picture>
                      <source type="image/webp" srcSet={webpImg} />
                      <img
                        src={coverImg}
                        alt={post.coverImageAlt || post.title}
                        loading="lazy"
                        decoding="async"
                        width={640}
                        height={360}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          const picture = target.parentElement;
                          if (picture && picture.tagName.toLowerCase() === 'picture') {
                            const sources = picture.querySelectorAll('source');
                            sources.forEach((s) => s.remove());
                          }
                          if (target.src !== '/images/royal-crimson-barat-lehenga-zardozi-architecture-guide.jpg') {
                            target.src = '/images/royal-crimson-barat-lehenga-zardozi-architecture-guide.jpg';
                          }
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </picture>

                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-stone-950/85 backdrop-blur-md border border-stone-700/80 text-stone-200 text-xs font-semibold">
                      {post.category || 'Atelier Masterclass'}
                    </div>
                  </div>
                )}

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta Bar */}
                    <div className="flex items-center gap-3 text-xs text-stone-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readingTime || '10 min read'}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors leading-snug mb-3">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-stone-300 text-sm leading-relaxed mb-5 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags row with interactive filtering */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {post.tags.slice(0, 4).map((tag) => {
                          const isTagActive = activeTag?.toLowerCase() === tag.toLowerCase();
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={(e) => handleTagClick(e, tag)}
                              className={`rounded-full px-2.5 py-0.5 text-[11px] font-mono transition-colors cursor-pointer ${
                                isTagActive
                                  ? 'bg-amber-500 text-stone-950 font-bold'
                                  : 'bg-stone-850 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800'
                              }`}
                            >
                              #{tag}
                            </button>
                          );
                        })}
                        {post.tags.length > 4 && (
                          <span className="rounded-full bg-stone-900 px-2 py-0.5 text-[10px] text-stone-400 font-mono">
                            +{post.tags.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                    <span className="text-xs text-stone-400 font-medium">
                      {post.author ? post.author.replace(', Master Tailor', '') : 'Abdul Ghaffar'}
                    </span>
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Read Full Guide</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BlogSearchGrid;

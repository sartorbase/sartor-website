import React from 'react';
import { BookOpen, Calendar, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { BlogPostData } from '../../data/blogPosts';
import { navigateTo } from '../../utils/navigation';

export interface RelatedArticlesSectionProps {
  articles: BlogPostData[];
  currentCategory?: string;
  className?: string;
}

export const RelatedArticlesSection: React.FC<RelatedArticlesSectionProps> = ({
  articles,
  currentCategory,
  className = '',
}) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section className={`mt-16 pt-12 border-t border-stone-800/80 ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Recommended Reading</span>
          </div>
          <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-100 tracking-tight">
            Related Masterclasses &amp; Guides
          </h3>
          <p className="mt-1.5 text-stone-400 text-sm max-w-2xl leading-relaxed">
            Curated technical insights sharing silhouettes, embroidery disciplines, and anatomical fit engineering.
          </p>
        </div>

        <button
          onClick={() => navigateTo('/blog')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-400 hover:text-amber-400 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <span>View All 45 Guides</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3-Card Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((post) => {
          const coverImg = post.coverImage || '/images/royal-bridal-peshwas-angrakha-flare-zardozi-guide.jpg';
          const webpImg = coverImg.replace(/\.(jpe?g|png)$/i, '.webp');

          return (
            <article
              key={post.slug}
              onClick={() => navigateTo(`/blog/${post.slug}`)}
              className="group rounded-2xl bg-stone-900/60 hover:bg-stone-900 border border-stone-800/90 hover:border-amber-500/50 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9),0_0_20px_-3px_rgba(245,158,11,0.2)] flex flex-col overflow-hidden cursor-pointer will-change-transform"
            >
              {/* Card Image */}
              <div className="relative aspect-[16/10] bg-stone-950 overflow-hidden">
                <picture>
                  <source type="image/webp" srcSet={webpImg} />
                  <img
                    src={coverImg}
                    alt={post.coverImageAlt || post.title}
                    loading="lazy"
                    decoding="async"
                    width={480}
                    height={300}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const picture = target.parentElement;
                      if (picture && picture.tagName.toLowerCase() === 'picture') {
                        const sources = picture.querySelectorAll('source');
                        sources.forEach((s) => s.remove());
                      }
                      if (target.src !== '/images/royal-bridal-peshwas-angrakha-flare-zardozi-guide.jpg') {
                        target.src = '/images/royal-bridal-peshwas-angrakha-flare-zardozi-guide.jpg';
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </picture>

                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Quiet Category Tag */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-stone-950/85 backdrop-blur-md border border-stone-800 text-stone-300 text-[11px] font-mono uppercase tracking-wider font-semibold">
                  {post.category || 'Atelier Masterclass'}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Meta Bar */}
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-2.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-500" />
                      <span>{post.readingTime || '10 min read'}</span>
                    </span>
                    <span className="text-stone-700" aria-hidden="true">
                      ·
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-500" />
                      <span>{post.date}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors text-base leading-snug line-clamp-2 mb-2">
                    {post.title}
                  </h4>

                  {/* Excerpt */}
                  <p className="text-stone-400 text-xs leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-medium truncate max-w-[140px]">
                    {post.author ? post.author.replace(', Master Tailor', '') : 'Abdul Ghaffar'}
                  </span>
                  <span className="font-semibold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Guide</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedArticlesSection;

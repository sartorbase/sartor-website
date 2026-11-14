import { BLOG_POSTS, BlogPostData, getBlogPostBySlug, getRelatedPosts } from '../data/blogPosts';
import {
  buildLocationAndDiasporaGraph,
  buildPrimaryBreadcrumbSchema,
  DIASPORA_IN_LANGUAGE,
  getPrimaryBreadcrumbItems,
} from '../seo/geoSchemas';
import { buildHomepageFaqPageSchema, getTopHomepageBridalFaqs } from '../seo/faqAggregator';
import {
  ATELIER_SERVICES,
  buildServicesCatalogGraph,
  SERVICES_CATALOG_SCHEMA_ID,
} from '../seo/servicesCatalog';
import { TESTIMONIALS } from '../data/testimonials';
import {
  buildLahoreReviewSchema,
  getLahoreReviewSummary,
  LAHORE_REVIEW_SCHEMA_ID,
} from '../seo/reviewSchema';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderSsrBreadcrumbHtml(pageUrl: string): string {
  const items = getPrimaryBreadcrumbItems(pageUrl);
  return `<nav aria-label="Breadcrumb" class="mb-6 text-xs text-stone-400"><ol class="flex flex-wrap items-center gap-2">${items
    .map((crumb, idx) => {
      const isLast = idx === items.length - 1;
      const sep = idx > 0 ? '<span aria-hidden="true" class="text-stone-600">&rsaquo;</span>' : '';
      return isLast
        ? `${sep}<li><span aria-current="page" class="text-amber-300 font-semibold">${escapeHtml(crumb.name)}</span></li>`
        : `${sep}<li><a href="${crumb.path}" class="text-stone-400 hover:text-amber-300 underline">${escapeHtml(crumb.name)}</a></li>`;
    })
    .join('')}</ol></nav>`;
}

export function generateSitemapXml(): string {
  const baseUrl = 'https://sartor.pk';
  const currentDate = new Date().toISOString().split('T')[0];

  const staticUrls = [
    { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily', lastmod: currentDate },
    { loc: `${baseUrl}/services`, priority: '0.9', changefreq: 'weekly', lastmod: currentDate },
    { loc: `${baseUrl}/custom-bridal`, priority: '0.9', changefreq: 'weekly', lastmod: currentDate },
    { loc: `${baseUrl}/blog`, priority: '0.9', changefreq: 'daily', lastmod: currentDate },
  ];

  const blogUrls = BLOG_POSTS.map((post) => ({
    loc: `${baseUrl}/blog/${post.slug}`,
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: post.date || currentDate,
  }));

  const allUrls = [...staticUrls, ...blogUrls];

  const xmlEntries = allUrls
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
}

function formatInline(text: string): string {
  let res = escapeHtml(text);
  res = res.replace(/!\[(.*?)\]\((.*?)\)/g, '<span class="my-8 block w-full rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-900 aspect-[16/9]"><img src="$2" alt="$1" class="w-full h-full object-cover" loading="eager" /></span>');
  res = res.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-amber-300 text-xs font-mono">$1</code>');
  res = res.replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="text-stone-100 font-bold"><em class="italic">$1</em></strong>');
  res = res.replace(/\*\*(.*?)\*\*/g, '<strong class="text-stone-100 font-bold">$1</strong>');
  res = res.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  res = res.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-amber-400 hover:text-amber-300 underline underline-offset-4 font-medium transition-colors">$1</a>');
  return res;
}

function markdownToHtml(md: string): string {
  const cleanMd = md
    .replace(/^\s*---[\s\S]*?---\s*/, '')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  const lines = cleanMd.split('\n');
  const htmlLines: string[] = [];
  let inTable = false;
  let inUl = false;
  let inOl = false;
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let quoteBuffer: string[] = [];

  const flushQuote = () => {
    if (quoteBuffer.length === 0) return;
    const innerText = quoteBuffer.join('\n');
    quoteBuffer = [];

    const parsedQuote = innerText
      .split('\n')
      .map((qLine) => {
        const trimmed = qLine.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('### ')) {
          return `<h3 class="text-amber-700 dark:text-amber-400 font-serif font-bold text-lg mb-2 mt-1 tracking-wide uppercase">${formatInline(trimmed.slice(4))}</h3>`;
        }
        if (trimmed.startsWith('## ')) {
          return `<h2 class="text-amber-700 dark:text-amber-400 font-serif font-bold text-xl mb-2 mt-1 tracking-wide uppercase">${formatInline(trimmed.slice(3))}</h2>`;
        }
        return `<p class="my-2 leading-relaxed text-stone-200">${formatInline(trimmed)}</p>`;
      })
      .filter(Boolean)
      .join('\n');

    htmlLines.push(
      `<div class="my-8 rounded-2xl border border-stone-800/80 border-l-4 border-l-amber-600 bg-stone-900/90 p-5 sm:p-7 shadow-lg shadow-stone-950/10">
        <blockquote class="font-sans not-italic text-stone-200 text-base leading-relaxed [&>p]:text-stone-200 [&>p>strong]:text-stone-100 dark:[&>p>strong]:text-amber-300 [&>strong]:text-stone-100 dark:[&>strong]:text-amber-300">${parsedQuote}</blockquote>
      </div>`
    );
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (trimmed.startsWith('```')) {
      flushQuote();
      if (inTable) { htmlLines.push('</tbody></table></div>'); inTable = false; }
      if (inUl) { htmlLines.push('</ul>'); inUl = false; }
      if (inOl) { htmlLines.push('</ol>'); inOl = false; }

      if (inCodeBlock) {
        htmlLines.push(`<pre class="my-6 p-4 sm:p-6 rounded-2xl bg-stone-900 border border-stone-800 text-amber-300 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed shadow-lg"><code>${escapeHtml(codeBuffer.join('\n'))}</code></pre>`);
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeBuffer = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(rawLine);
      continue;
    }

    if (trimmed.startsWith('>')) {
      if (inTable) { htmlLines.push('</tbody></table></div>'); inTable = false; }
      if (inUl) { htmlLines.push('</ul>'); inUl = false; }
      if (inOl) { htmlLines.push('</ol>'); inOl = false; }
      quoteBuffer.push(trimmed.replace(/^>\s?/, ''));
      continue;
    } else {
      flushQuote();
    }

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (inUl) { htmlLines.push('</ul>'); inUl = false; }
      if (inOl) { htmlLines.push('</ol>'); inOl = false; }
      if (!inTable) {
        htmlLines.push('<div class="my-8 overflow-x-auto rounded-2xl border border-stone-800 bg-stone-900/60 shadow-xl"><table class="w-full min-w-[540px] border-collapse text-left text-sm">');
        const headers = trimmed.split('|').filter(c => c.trim().length > 0);
        htmlLines.push('<thead><tr class="bg-stone-900 border-b border-stone-700">');
        headers.forEach(h => htmlLines.push(`<th class="p-3.5 font-semibold uppercase tracking-wider text-xs text-amber-300 border-r border-stone-800/80 last:border-r-0">${formatInline(h.trim())}</th>`));
        htmlLines.push('</tr></thead><tbody>');
        inTable = true;
        continue;
      } else {
        if (trimmed.includes('---')) continue;
        const cells = trimmed.split('|').filter(c => c !== '');
        htmlLines.push('<tr class="hover:bg-stone-800/40 border-b border-stone-800/60 transition-colors">');
        cells.forEach(c => htmlLines.push(`<td class="p-3.5 text-stone-300 border-r border-stone-800/60 last:border-r-0 leading-relaxed">${formatInline(c.trim())}</td>`));
        htmlLines.push('</tr>');
        continue;
      }
    } else if (inTable) {
      htmlLines.push('</tbody></table></div>');
      inTable = false;
    }

    if (trimmed === '---') {
      if (inUl) { htmlLines.push('</ul>'); inUl = false; }
      if (inOl) { htmlLines.push('</ol>'); inOl = false; }
      htmlLines.push('<hr class="my-10 border-stone-800/90" />');
      continue;
    }

    if (trimmed.startsWith('# ')) {
      htmlLines.push(`<h1 class="text-3xl sm:text-4xl font-serif font-bold text-stone-50 my-6 leading-tight">${formatInline(trimmed.slice(2))}</h1>`);
      continue;
    }
    if (trimmed.startsWith('## ')) {
      htmlLines.push(`<h2 class="text-2xl sm:text-3xl font-serif font-bold text-stone-100 mt-12 mb-5 pb-3 border-b border-stone-800/80 leading-snug tracking-tight">${formatInline(trimmed.slice(3))}</h2>`);
      continue;
    }
    if (trimmed.startsWith('### ')) {
      htmlLines.push(`<h3 class="text-xl sm:text-2xl font-serif font-semibold text-amber-200/90 mt-8 mb-3 leading-snug">${formatInline(trimmed.slice(4))}</h3>`);
      continue;
    }

    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      if (!inUl) { htmlLines.push('<ul class="list-disc list-outside ml-6 space-y-2.5 my-5 text-stone-300">'); inUl = true; }
      htmlLines.push(`<li class="leading-relaxed pl-1 marker:text-amber-400">${formatInline(trimmed.slice(2))}</li>`);
      continue;
    } else if (inUl) {
      htmlLines.push('</ul>');
      inUl = false;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      if (!inOl) { htmlLines.push('<ol class="list-decimal list-outside ml-6 space-y-2.5 my-5 text-stone-300 font-sans">'); inOl = true; }
      const itemText = trimmed.replace(/^\d+\.\s/, '');
      htmlLines.push(`<li class="leading-relaxed pl-1 marker:text-amber-400">${formatInline(itemText)}</li>`);
      continue;
    } else if (inOl) {
      htmlLines.push('</ol>');
      inOl = false;
    }

    const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      htmlLines.push(`<div class="my-8 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-900 aspect-[16/9]"><img src="${imgMatch[2]}" alt="${escapeHtml(imgMatch[1])}" class="w-full h-full object-cover" loading="eager" /></div>`);
      continue;
    }

    if (trimmed.length > 0) {
      htmlLines.push(`<p class="my-4 text-stone-300 leading-relaxed font-sans text-base sm:text-lg">${formatInline(trimmed)}</p>`);
    }
  }

  flushQuote();
  if (inTable) htmlLines.push('</tbody></table></div>');
  if (inUl) htmlLines.push('</ul>');
  if (inOl) htmlLines.push('</ol>');

  return htmlLines.join('\n');
}

export function injectSeoIntoHtml(baseHtml: string, pathname: string): { status: number; html: string } {
  const cleanPath = pathname.toLowerCase().split('?')[0].split('#')[0];

  if (cleanPath.startsWith('/blog/') || cleanPath.startsWith('/journal/')) {
    const slug = cleanPath.replace(/^\/(blog|journal)\//, '').split('/')[0];
    const post = getBlogPostBySlug(slug);

    if (!post) {
      return { status: 404, html: baseHtml };
    }

    const articleUrl = `https://sartor.pk/blog/${post.slug}`;
    const pageTitle = `${post.title} | SARTOR Atelier`;
    const renderedBody = markdownToHtml(post.content);

    // Extract FAQs for Schema.org JSON-LD (supports numbered headings and optional (FAQ) suffix)
    const faqMatches: { question: string; answer: string }[] = [];
    const faqSectionMatch = post.content.match(/##\s*(?:\d+[\.\)]\s*)?Frequently Asked Questions(?:\s*\(FAQ\))?([\s\S]*?)(?:\n---|\n##\s+[^#]|$)/i);
    if (faqSectionMatch) {
      const faqText = faqSectionMatch[1];
      const qaRegex = /###\s+(.+?)\n([\s\S]*?)(?=\n###|\n---|$)/g;
      let match;
      while ((match = qaRegex.exec(faqText)) !== null) {
        const question = match[1].trim();
        const answer = match[2].trim().replace(/\n+/g, ' ');
        if (question && answer) {
          faqMatches.push({ question, answer });
        }
      }
    }

    let faqJsonLd = '';
    if (faqMatches.length > 0) {
      const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        inLanguage: [...DIASPORA_IN_LANGUAGE],
        mainEntity: faqMatches.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      };
      faqJsonLd = `<script type="application/ld+json">${JSON.stringify(schemaData)}</script>`;
    }

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      keywords: post.tags?.join(', '),
      inLanguage: [...DIASPORA_IN_LANGUAGE],
      image: post.coverImage ? `https://sartor.pk${post.coverImage}` : 'https://sartor.pk/images/sartor-logo.jpg',
      author: {
        '@type': 'Person',
        name: post.author || 'Abdul Ghaffar, Master Tailor',
        jobTitle: 'Master Tailor & Cutting Master',
        worksFor: {
          '@type': 'ClothingStore',
          name: 'SARTOR Bespoke Atelier Lahore',
          url: 'https://sartor.pk',
        },
      },
      publisher: {
        '@type': 'Organization',
        name: 'SARTOR Bespoke Atelier',
        url: 'https://sartor.pk',
        logo: {
          '@type': 'ImageObject',
          url: 'https://sartor.pk/logo.webp',
        },
      },
      isPartOf: {
        '@type': 'Blog',
        '@id': 'https://sartor.pk/blog',
        name: 'SARTOR Atelier Journal & Masterclasses',
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'blockquote'],
      },
      datePublished: post.date,
      dateModified: post.date || '2026-11-14',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleUrl,
        inLanguage: [...DIASPORA_IN_LANGUAGE],
      },
    };
    const articleJsonLd = `<script type="application/ld+json">${JSON.stringify(articleSchema)}</script>`;

    const breadcrumbsSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      inLanguage: [...DIASPORA_IN_LANGUAGE],
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://sartor.pk/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Journal',
          item: 'https://sartor.pk/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: articleUrl,
        },
      ],
    };
    const breadcrumbsJsonLd = `<script type="application/ld+json">${JSON.stringify(breadcrumbsSchema)}</script>`;

    const ogImage = post.coverImage ? `https://sartor.pk${post.coverImage}` : 'https://sartor.pk/images/sartor-logo.jpg';
    const ogImageTags = `
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
<meta name="geo.region" content="PK-PB" />
<meta name="geo.placename" content="Model Town, Lahore, Pakistan" />
<meta name="geo.position" content="31.4826;74.3142" />
<meta name="ICBM" content="31.4826, 74.3142" />
<meta property="og:title" content="${escapeHtml(pageTitle)}" />
<meta property="og:description" content="${escapeHtml(post.excerpt)}" />
<meta property="og:image" content="${ogImage}" />
<meta property="og:url" content="${articleUrl}" />
<meta property="og:type" content="article" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(pageTitle)}" />
<meta name="twitter:description" content="${escapeHtml(post.excerpt)}" />
<meta name="twitter:image" content="${ogImage}" />
`;

    let transformedHtml = baseHtml
      .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(pageTitle)}</title>`)
      .replace(/<meta[^>]*name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(post.excerpt)}" />`)
      .replace(/<meta\s+property="og:(?:title|description|image|url|type)"\s+content="[^"]*"\s*\/?>\s*/gi, '')
      .replace(/<meta\s+name="twitter:(?:card|title|description|image)"\s+content="[^"]*"\s*\/?>\s*/gi, '')
      .replace(/<meta\s+name="(?:robots|geo\.[^"]+|ICBM)"\s+content="[^"]*"\s*\/?>\s*/gi, '');

    if (transformedHtml.includes('<link rel="canonical"')) {
      transformedHtml = transformedHtml.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${articleUrl}" />`);
    } else {
      transformedHtml = transformedHtml.replace('</head>', `<link rel="canonical" href="${articleUrl}" />\n</head>`);
    }

    transformedHtml = transformedHtml.replace('</head>', `${ogImageTags}\n${articleJsonLd}\n${breadcrumbsJsonLd}\n</head>`);

    if (faqJsonLd) {
      transformedHtml = transformedHtml.replace('</head>', `${faqJsonLd}\n</head>`);
    }

    const heroImageHtml = post.coverImage && !post.content.includes(post.coverImage)
      ? `<div class="mb-10 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-900 aspect-[16/9]">
          <picture>
            <source type="image/webp" srcset="${post.coverImage.replace(/\.(jpe?g|png)$/i, '.webp')}" />
            <img src="${post.coverImage}" alt="${escapeHtml(post.coverImageAlt || post.title)}" class="w-full h-full object-cover" />
          </picture>
        </div>`
      : '';

    const relatedPosts = getRelatedPosts(post.slug, 3);
    const relatedSectionHtml = relatedPosts.length > 0 ? `
      <section class="mt-16 pt-10 border-t border-stone-800">
        <h3 class="font-serif font-bold text-2xl text-stone-100 mb-6">Related Masterclasses &amp; Guides</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${relatedPosts.map(rel => `
            <article class="p-5 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between">
              <div>
                <span class="text-xs text-amber-400 font-mono uppercase">${escapeHtml(rel.category)}</span>
                <h4 class="font-serif font-bold text-stone-100 text-base my-2">
                  <a href="/blog/${rel.slug}" class="hover:text-amber-300 transition-colors">${escapeHtml(rel.title)}</a>
                </h4>
                <p class="text-stone-400 text-xs line-clamp-2">${escapeHtml(rel.excerpt)}</p>
              </div>
              <div class="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-amber-400 font-semibold">
                <span>Read Masterclass</span>
                <span>&rarr;</span>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    ` : '';

    transformedHtml = transformedHtml.replace('<div id="root"></div>', `<div id="root"><main class="max-w-3xl mx-auto px-4 py-12">${heroImageHtml}${renderedBody}${relatedSectionHtml}</main></div>`);

    return { status: 200, html: transformedHtml };
  }

  const applyPageHead = (
    html: string,
    opts: { title: string; description: string; url: string; schemas?: object[]; schemaTags?: string[] }
  ): string => {
    const geoGraph = buildLocationAndDiasporaGraph(opts.url);
    const breadcrumbSchema = buildPrimaryBreadcrumbSchema(opts.url);
    const schemaScripts = [
      `<script id="location-diaspora-structured-data" type="application/ld+json">${JSON.stringify(geoGraph)}</script>`,
      `<script id="primary-breadcrumb-structured-data" type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`,
      ...(opts.schemaTags || []),
      ...(opts.schemas || []).map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`),
    ].join('\n');

    const hreflangTags = [
      `<link rel="alternate" hreflang="x-default" href="${opts.url}" />`,
      `<link rel="alternate" hreflang="en-PK" href="${opts.url}" />`,
      `<link rel="alternate" hreflang="en-GB" href="${opts.url}" />`,
      `<link rel="alternate" hreflang="en-US" href="${opts.url}" />`,
      `<link rel="alternate" hreflang="en-CA" href="${opts.url}" />`,
      `<link rel="alternate" hreflang="en-AE" href="${opts.url}" />`,
    ].join('\n');

    return html
      .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(opts.title)}</title>`)
      .replace(/<meta[^>]*name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(opts.description)}" />`)
      .replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${opts.url}" />`)
      .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(opts.title)}" />`)
      .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(opts.description)}" />`)
      .replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${opts.url}" />`)
      .replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(opts.title)}" />`)
      .replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(opts.description)}" />`)
      .replace('</head>', `${hreflangTags}\n${schemaScripts}\n</head>`);
  };

  if (cleanPath === '/blog' || cleanPath === '/journal') {
    const pageTitle = 'Atelier Journal & Couture Masterclasses | SARTOR Bespoke Lahore';
    const pageDesc = 'Explore 60+ technical masterclasses by Master Tailor Abdul Ghaffar on Pakistani bridal lehengas, zardozi, groom sherwanis, remote video fittings, and bespoke tailoring.';
    const archiveUrl = 'https://sartor.pk/blog';

    const collectionSchema = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: pageTitle,
      description: pageDesc,
      url: archiveUrl,
      inLanguage: [...DIASPORA_IN_LANGUAGE],
      isPartOf: { '@id': 'https://sartor.pk/#website' },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: BLOG_POSTS.length,
        itemListElement: BLOG_POSTS.slice(0, 30).map((p, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: p.title,
          url: `https://sartor.pk/blog/${p.slug}`,
        })),
      },
    };

    const blogCardsHtml = `
      <main class="max-w-6xl mx-auto px-4 py-12">
        <h1 class="text-3xl font-serif font-bold text-amber-400 mb-4">Atelier Journal &amp; Couture Masterclasses</h1>
        <p class="text-stone-300 mb-8 max-w-3xl">Authored by Master Tailor Abdul Ghaffar at Shop F-9, Moon Tower, Model Town, Lahore. Complete architectural engineering guides for overseas Pakistani brides, grooms, and bespoke formals across the UK, USA, Canada, and UAE.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${BLOG_POSTS.map(post => `
            <article class="p-6 rounded-2xl bg-stone-900 border border-stone-800">
              ${post.coverImage ? `
                <div class="relative aspect-[16/9] mb-4 rounded-xl overflow-hidden bg-stone-950">
                  <picture>
                    <source type="image/webp" srcset="${post.coverImage.replace(/\.(jpe?g|png)$/i, '.webp')}" />
                    <img src="${post.coverImage}" alt="${escapeHtml(post.coverImageAlt || post.title)}" class="w-full h-full object-cover" loading="lazy" />
                  </picture>
                </div>
              ` : ''}
              <span class="text-xs text-amber-400 uppercase tracking-widest font-mono">${escapeHtml(post.category)}</span>
              <h2 class="text-xl font-serif font-bold text-stone-100 my-2">
                <a href="/blog/${post.slug}" class="hover:text-amber-300 transition-colors">${escapeHtml(post.title)}</a>
              </h2>
              <p class="text-stone-400 text-sm line-clamp-3">${escapeHtml(post.excerpt)}</p>
            </article>
          `).join('')}
        </div>
      </main>
    `;

    const transformedHtml = applyPageHead(baseHtml, {
      title: pageTitle,
      description: pageDesc,
      url: archiveUrl,
      schemas: [collectionSchema],
    }).replace('<div id="root"></div>', `<div id="root">${blogCardsHtml}</div>`);

    return { status: 200, html: transformedHtml };
  }

  if (cleanPath === '/custom-bridal') {
    const bridalTitle = 'Custom Bridal Lehengas Lahore | Live Video Measurement Calls & Insured Worldwide Delivery | SARTOR';
    const bridalDesc = 'Commission bespoke Pakistani custom bridal lehengas with authentic hand-embroidered Zardozi on pure raw silk. 28-point digital measurements, pre-closure baste-fit video checkpoints, 2-inch seam margins, and 10/30/30/30 escrow milestones with 3–5 day DHL Express shipping.';
    const bridalUrl = 'https://sartor.pk/custom-bridal';

    const bridalFaqs = [
      {
        q: 'How does SARTOR guarantee a bridal lehenga fits overseas clients without flying to Lahore?',
        a: 'Master Tailor Abdul Ghaffar conducts a live 28-point biometric video measurement call logged on app.sartor.pk, executes a mid-production baste-fitting video checkpoint before closing the pure Habotai silk lining, and leaves 2-inch internal silk-bound seam margins plus 3-column brass hook-and-eye canvas waistbands.'
      },
      {
        q: 'How do SARTOR 10/30/30/30 milestone payments protect overseas brides?',
        a: 'You pay 10% booking token to reserve your adda slot, 30% upon approving a 4K daylight video of an 8x8-inch hand-embroidered swatch, 30% after inspecting your baste-fitted choli and waistband live on video prior to lining closure, and the final 30% after 360-degree mannequin sign-off before DHL Express dispatch.'
      },
      {
        q: 'What are the turnaround times and DHL Express transit speeds to the USA, UK, Canada, and UAE?',
        a: 'Full hand-embroidered Zardozi bridal lehengas require 10 to 14 weeks on wooden adda frames (precision bespoke stitching of prepared yardage takes 7–10+ business days). Insured DHL Express and FedEx Priority arrive in 3–5 business days (2–3 days to UAE), structured cleanly around $800 US and £135 UK customs rules.'
      }
    ];

    const bridalServiceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Bespoke Pakistani Bridal Lehenga & Zardozi Couture Tailoring',
      inLanguage: [...DIASPORA_IN_LANGUAGE],
      provider: { '@id': 'https://sartor.pk/#localbusiness' },
      areaServed: ['United States', 'United Kingdom', 'Canada', 'United Arab Emirates', 'Pakistan'],
      description: bridalDesc,
      url: bridalUrl,
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: '2000',
        highPrice: '6200',
      },
    };
    const bridalFaqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: [...DIASPORA_IN_LANGUAGE],
      mainEntity: bridalFaqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };
    const bridalSpeakable = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url: bridalUrl,
      name: bridalTitle,
      inLanguage: [...DIASPORA_IN_LANGUAGE],
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'blockquote'] },
    };

    const bridalSsrHtml = `
      <main class="max-w-5xl mx-auto px-4 py-12 text-stone-100">
        ${renderSsrBreadcrumbHtml(bridalUrl)}
        <h1 class="text-4xl font-serif font-bold text-stone-100 mb-4">Bespoke Pakistani Bridal Couture — Tailored to Your Exact Fit with Live Video Consultations</h1>
        <blockquote class="my-6 p-6 rounded-2xl bg-stone-900 border-l-4 border-amber-500 text-stone-200">
          <strong>Quick Answer:</strong> SARTOR Model Town Lahore (Shop F-9, Moon Tower, led by Master Tailor Abdul Ghaffar) crafts heirloom pure Katan silk Zardozi bridal lehengas ($2,000+ / £1,750+) with 28-point digital measurements on <a href="https://app.sartor.pk" class="text-amber-400 underline">app.sartor.pk</a>, pre-closure baste-fit video checkpoints, 2-inch internal seam allowances, 3-tier canvas hook-and-eye waistbands, 10/30/30/30 milestone payments, and 3–5 day insured DHL Express shipping worldwide.
        </blockquote>
        <h2 class="text-2xl font-serif font-bold text-amber-400 mt-10 mb-4">4-Step Milestone Escrow Workflow (10 / 30 / 30 / 30)</h2>
        <ul class="list-disc ml-6 space-y-2 text-stone-300">
          <li><strong>Step 1 (10% Booking):</strong> 28-point biometric video sizing logged on <a href="https://app.sartor.pk" class="text-amber-400 underline">app.sartor.pk</a>.</li>
          <li><strong>Step 2 (30% Adda Swatch):</strong> 4K daylight macro video approval of your 8x8-inch Kora/Dabka swatch before cutting panels.</li>
          <li><strong>Step 3 (30% Baste-Fit Checkpoint):</strong> Live steel-ruler inspection of your basted choli and waistband before sealing the pure Habotai silk lining.</li>
          <li><strong>Step 4 (30% Final Dispatch):</strong> 360-degree studio mannequin sign-off ahead of insured 3–5 day DHL Express delivery ($800 US / £135 UK threshold compliant).</li>
        </ul>
        <h2 class="text-2xl font-serif font-bold text-amber-400 mt-10 mb-4">Frequently Asked Questions</h2>
        ${bridalFaqs.map((f) => `<h3 class="text-lg font-serif font-semibold text-stone-100 mt-6 mb-2">${escapeHtml(f.q)}</h3><p class="text-stone-300">${escapeHtml(f.a)}</p>`).join('')}
        <p class="mt-8 text-sm text-stone-400">Explore <a href="/services" class="text-amber-400 underline">all tailoring services</a>, <a href="/blog" class="text-amber-400 underline">60 tailoring masterclasses</a>, or book on <a href="https://wa.me/923320500904" class="text-emerald-400 underline">WhatsApp (+92 332 0500904)</a>.</p>
      </main>
    `;

    const transformedHtml = applyPageHead(baseHtml, {
      title: bridalTitle,
      description: bridalDesc,
      url: bridalUrl,
      schemas: [bridalServiceSchema, bridalFaqSchema, bridalSpeakable],
    }).replace('<div id="root"></div>', `<div id="root">${bridalSsrHtml}</div>`);

    return { status: 200, html: transformedHtml };
  }

  if (cleanPath === '/services') {
    const servicesTitle = 'Tailor Model Town Lahore | Lehenga, Saree & Bespoke Groom Sherwani Tailoring | SARTOR';
    const servicesDesc = 'Master bespoke tailoring in Model Town, Lahore & online worldwide: bridal lehengas, pre-pleated sarees, 16-kali kalidars, unstitched designer suits, and custom Jamawar groom sherwanis. Guided video fittings, 2-inch seam margins, and 3–5 day DHL Express shipping.';
    const servicesUrl = 'https://sartor.pk/services';

    const servicesFaqs = [
      {
        q: 'What bespoke tailoring disciplines and transparent rates does SARTOR Lahore offer?',
        a: 'SARTOR at Shop F-9, Moon Tower, Model Town, Lahore stitches everyday pret suits (PKR 2,500+), double suits (PKR 4,000+), 16-kali kalidars (PKR 7,000+), pre-pleated sarees and boned blouses (PKR 7,000+), bespoke Jamawar groom sherwanis and Boski menswear ($380–$1,450), and custom Zardozi bridal lehengas (PKR 10,000+ stitching / $2,200–$4,500 full couture).'
      },
      {
        q: 'Do you offer free fabric pickup in Lahore and express shipping overseas?',
        a: 'Yes. We provide complimentary doorstep fabric pickup across Model Town, DHA, Gulberg, Cantt, Johar Town, and Bahria Town in Lahore, plus parcel consolidation for Maria.B, Elan, and Suffuse orders shipped via 3–5 day insured DHL Express to the USA, UK, Canada, and UAE.'
      },
      {
        q: 'How fast is SARTOR stitching turnaround?',
        a: 'Precision bespoke stitching completes in 7–10+ business days depending on seasonal atelier queue and garment complexity, while full hand-embroidered adda bridals require 10–14 weeks.'
      }
    ];

    const servicesCatalogGraph = buildServicesCatalogGraph(ATELIER_SERVICES);
    const servicesCatalogSchemaTag = `<script id="${SERVICES_CATALOG_SCHEMA_ID}" type="application/ld+json">${JSON.stringify(servicesCatalogGraph)}</script>`;
    const servicesFaqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: [...DIASPORA_IN_LANGUAGE],
      mainEntity: servicesFaqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };

    const servicesSsrHtml = `
      <main class="max-w-5xl mx-auto px-4 py-12 text-stone-100">
        ${renderSsrBreadcrumbHtml(servicesUrl)}
        <h1 class="text-4xl font-serif font-bold text-stone-100 mb-4">Master Bespoke Tailoring Services in Lahore</h1>
        <blockquote class="my-6 p-6 rounded-2xl bg-stone-900 border-l-4 border-amber-500 text-stone-200">
          <strong>Quick Answer:</strong> Located at Shop F-9, Moon Tower, International Market, Model Town, Lahore, Master Tailor Abdul Ghaffar provides precision cutting for bridal lehengas, pre-pleated sarees, 16-kali kalidars, unstitched designer suits (Maria.B, Elan, Suffuse), farshi ghararas, and floating-canvas groom sherwanis—backed by 2-inch internal seam allowances, 28-point digital profiles at <a href="https://app.sartor.pk" class="text-amber-400 underline">app.sartor.pk</a>, complimentary Lahore doorstep pickup, and 3–5 day insured DHL Express delivery.
        </blockquote>
        <h2 class="text-2xl font-serif font-bold text-amber-400 mt-10 mb-4">Bespoke Tailoring &amp; Couture Service Offerings</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${ATELIER_SERVICES.map(
            (svc) => `
            <article id="${svc.id}" class="p-6 rounded-2xl bg-stone-900 border border-stone-800">
              <span class="text-xs font-mono text-amber-400 uppercase">${escapeHtml(svc.categoryLabel)}</span>
              <h3 class="text-xl font-serif font-bold text-stone-100 mt-1 mb-2">${escapeHtml(svc.name)}</h3>
              <p class="text-stone-300 text-sm mb-3">${escapeHtml(svc.description)}</p>
              <ul class="list-disc ml-5 text-xs text-stone-400 space-y-1 mb-3">
                ${svc.features.map((feat) => `<li>${escapeHtml(feat)}</li>`).join('')}
              </ul>
              <p class="text-xs font-mono text-stone-200 font-semibold">${escapeHtml(svc.priceDisplay)}</p>
              <p class="text-xs mt-2"><a href="/blog/${svc.relatedBlogSlug}" class="text-amber-400 underline">${escapeHtml(svc.relatedBlogLabel)}</a></p>
            </article>
          `
          ).join('')}
        </div>
        <h2 class="text-2xl font-serif font-bold text-amber-400 mt-10 mb-4">Frequently Asked Questions</h2>
        ${servicesFaqs.map((f) => `<h3 class="text-lg font-serif font-semibold text-stone-100 mt-6 mb-2">${escapeHtml(f.q)}</h3><p class="text-stone-300">${escapeHtml(f.a)}</p>`).join('')}
      </main>
    `;

    const servicesSpeakable = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url: servicesUrl,
      name: servicesTitle,
      inLanguage: [...DIASPORA_IN_LANGUAGE],
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'blockquote'] },
    };

    const transformedHtml = applyPageHead(baseHtml, {
      title: servicesTitle,
      description: servicesDesc,
      url: servicesUrl,
      schemaTags: [servicesCatalogSchemaTag],
      schemas: [servicesFaqSchema, servicesSpeakable],
    }).replace('<div id="root"></div>', `<div id="root">${servicesSsrHtml}</div>`);

    return { status: 200, html: transformedHtml };
  }

  if (cleanPath === '/' || cleanPath === '') {
    const homeTitle = 'Pakistani Tailor & Bespoke Tailors Lahore | Express USA/UK/UAE Shipping | SARTOR';
    const homeDesc = 'Master bespoke Pakistani tailor at Model Town, Lahore led by Abdul Ghaffar. Handcrafted bridal lehengas, 16-kali kalidars, sarees, unstitched designer suits & custom groom sherwanis. 28-point digital measurements on app.sartor.pk, 2-inch seam margins & 3–5 day DHL Express shipping.';
    const homeUrl = 'https://sartor.pk/';

    const homeFaqs = getTopHomepageBridalFaqs(8);
    const homeFaqSchema = buildHomepageFaqPageSchema(homeFaqs);
    const homeFaqSchemaTag = `<script id="homepage-faq-schema" type="application/ld+json">${JSON.stringify(homeFaqSchema)}</script>`;
    const homeReviewSummary = getLahoreReviewSummary(TESTIMONIALS);
    const homeReviewSchema = buildLahoreReviewSchema(TESTIMONIALS);
    const homeReviewSchemaTag = `<script id="${LAHORE_REVIEW_SCHEMA_ID}" type="application/ld+json">${JSON.stringify(homeReviewSchema)}</script>`;
    const homeSpeakable = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url: homeUrl,
      name: homeTitle,
      inLanguage: [...DIASPORA_IN_LANGUAGE],
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'blockquote'] },
    };

    const homeSsrHtml = `
      <main class="max-w-5xl mx-auto px-4 py-12 text-stone-100">
        <h1 class="text-4xl font-serif font-bold text-stone-100 mb-4">SARTOR — Bespoke Pakistani Couture, Bridal Lehengas &amp; Precision Tailoring in Lahore</h1>
        <blockquote class="my-6 p-6 rounded-2xl bg-stone-900 border-l-4 border-amber-500 text-stone-200">
          <strong>Quick Answer:</strong> Led by Master Tailor Abdul Ghaffar at Shop F-9, Moon Tower, Block 30-M, International Market, Model Town, Lahore, SARTOR engineers custom bridal lehengas, 16-kali kalidars, pre-pleated sarees, unstitched designer suits, and floating-canvas groom sherwanis with 28-point biometric sizing on <a href="https://app.sartor.pk" class="text-amber-400 underline">app.sartor.pk</a>, 2-inch internal seam allowances, 10/30/30/30 milestone approvals, and 3–5 day insured DHL Express delivery to the USA, UK, Canada, and UAE.
        </blockquote>
        <nav aria-label="Primary sections" class="my-6 flex flex-wrap gap-4 text-amber-400 underline">
          <a href="/custom-bridal">Custom Bridal Couture</a>
          <a href="/services">Lahore Tailoring Services &amp; Rates</a>
          <a href="/blog">Atelier Journal (${BLOG_POSTS.length} Masterclasses)</a>
          <a href="https://app.sartor.pk">Pre-Beta Digital Measurement Portal</a>
          <a href="/llms.txt">LLM Knowledge Index</a>
        </nav>
        <h2 class="text-2xl font-serif font-bold text-amber-400 mt-10 mb-4">Latest Tailoring &amp; Bridal Masterclasses</h2>
        <ul class="list-disc ml-6 space-y-2 text-stone-300">
          ${BLOG_POSTS.slice(0, 12).map((p) => `<li><a href="/blog/${p.slug}" class="text-amber-400 hover:underline">${escapeHtml(p.title)}</a> — ${escapeHtml(p.excerpt)}</li>`).join('')}
        </ul>
        <h2 class="text-2xl font-serif font-bold text-amber-400 mt-10 mb-4">Authentic Client Reviews from Lahore &amp; Overseas (${homeReviewSummary.averageRating.toFixed(2)} / 5.0 across ${homeReviewSummary.reviewCount} Reviews)</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${TESTIMONIALS.map(
            (rev) =>
              `<article id="testimonial-card-${rev.id}" class="p-5 rounded-2xl bg-stone-900 border border-stone-800"><div class="text-amber-400 font-mono text-xs mb-1">Rated ${rev.rating.toFixed(1)} / 5.0 &bull; ${escapeHtml(rev.orderType || 'Verified Client')}</div><p class="text-stone-200 text-sm mb-3">&ldquo;${escapeHtml(rev.quote)}&rdquo;</p><p class="text-xs text-stone-400"><strong>${escapeHtml(rev.clientName)}</strong> (${escapeHtml(rev.location)}) &mdash; ${escapeHtml(rev.suitCrafted)}</p></article>`
          ).join('')}
        </div>
        <h2 class="text-2xl font-serif font-bold text-amber-400 mt-10 mb-4">Bridal Tailoring Engineering FAQs</h2>
        ${homeFaqs
          .map(
            (f) =>
              `<article class="mt-6 pb-4 border-b border-stone-800"><h3 class="text-lg font-serif font-semibold text-stone-100 mb-2">${escapeHtml(f.question)}</h3><p class="text-stone-300">${escapeHtml(f.answer)}</p><p class="text-xs text-amber-400 mt-2"><a href="/blog/${f.sourceSlug}">Source Masterclass: ${escapeHtml(f.sourceTitle)}</a></p></article>`
          )
          .join('')}
      </main>
    `;

    const transformedHtml = applyPageHead(baseHtml, {
      title: homeTitle,
      description: homeDesc,
      url: homeUrl,
      schemaTags: [homeFaqSchemaTag, homeReviewSchemaTag],
      schemas: [homeSpeakable],
    }).replace('<div id="root"></div>', `<div id="root">${homeSsrHtml}</div>`);

    return { status: 200, html: transformedHtml };
  }

  return { status: 200, html: baseHtml };
}

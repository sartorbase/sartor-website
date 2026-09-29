import fs from 'fs';
import path from 'path';
import { BLOG_POSTS, BlogPostData, getBlogPostBySlug } from '../data/blogPosts';

/**
 * Escapes HTML characters for safe attribute and text injection
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Generates dynamic XML Sitemap containing canonical URLs for all routes & articles
 */
export function generateSitemapXml(): string {
  const baseUrl = 'https://sartor.pk';
  const currentDate = new Date().toISOString().split('T')[0];

  const staticUrls = [
    { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily', lastmod: currentDate },
    { loc: `${baseUrl}/blog`, priority: '0.9', changefreq: 'daily', lastmod: currentDate },
    { loc: `${baseUrl}/custom-bridal`, priority: '0.9', changefreq: 'weekly', lastmod: currentDate },
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

/**
 * Simple, robust Markdown to semantic HTML parser for SSR pre-rendering
 */
function markdownToHtml(md: string): string {
  const lines = md.split('\n');
  const htmlLines: string[] = [];
  let inTable = false;
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // End table if line doesn't start with pipe
    if (inTable && !line.startsWith('|')) {
      htmlLines.push('</tbody></table></div>');
      inTable = false;
    }

    // End list if line is not a bullet
    if (inList && !line.startsWith('* ') && !line.startsWith('- ')) {
      htmlLines.push('</ul>');
      inList = false;
    }

    if (!line) {
      continue;
    }

    // Horizontal rule
    if (line === '---' || line === '***') {
      htmlLines.push('<hr class="my-8 border-stone-800" />');
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      htmlLines.push(`<h1 class="text-3xl sm:text-4xl font-serif font-bold text-stone-100 my-6">${escapeHtml(line.slice(2))}</h1>`);
      continue;
    }
    if (line.startsWith('## ')) {
      htmlLines.push(`<h2 class="text-2xl sm:text-3xl font-serif font-semibold text-stone-100 mt-10 mb-4">${escapeHtml(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith('### ')) {
      htmlLines.push(`<h3 class="text-xl sm:text-2xl font-serif font-semibold text-stone-200 mt-8 mb-3">${escapeHtml(line.slice(4))}</h3>`);
      continue;
    }

    // Artisan notes / blockquotes
    if (line.startsWith('> ')) {
      const quoteText = line.slice(2);
      htmlLines.push(
        `<blockquote class="my-6 border-l-4 border-amber-500 bg-amber-500/10 p-4 rounded-r-lg text-amber-200 font-serif italic">${formatInline(quoteText)}</blockquote>`
      );
      continue;
    }

    // Tables
    if (line.startsWith('|')) {
      const cells = line
        .split('|')
        .slice(1, -1)
        .map((c) => c.trim());

      // Divider line
      if (cells.every((c) => /^:?-+:?$/.test(c))) {
        continue;
      }

      if (!inTable) {
        inTable = true;
        htmlLines.push('<div class="overflow-x-auto my-8"><table class="w-full border-collapse border border-stone-800 text-left text-sm">');
        htmlLines.push('<thead><tr class="bg-stone-900 border-b border-stone-700">');
        cells.forEach((c) => {
          htmlLines.push(`<th class="p-3 font-semibold text-amber-300 border border-stone-800">${formatInline(c)}</th>`);
        });
        htmlLines.push('</tr></thead><tbody>');
      } else {
        htmlLines.push('<tr class="border-b border-stone-800/80 hover:bg-stone-900/40">');
        cells.forEach((c) => {
          htmlLines.push(`<td class="p-3 text-stone-300 border border-stone-800/80">${formatInline(c)}</td>`);
        });
        htmlLines.push('</tr>');
      }
      continue;
    }

    // Unordered lists
    if (line.startsWith('* ') || line.startsWith('- ')) {
      if (!inList) {
        inList = true;
        htmlLines.push('<ul class="list-disc list-inside space-y-2 my-4 text-stone-300">');
      }
      htmlLines.push(`<li>${formatInline(line.slice(2))}</li>`);
      continue;
    }

    // Paragraph
    htmlLines.push(`<p class="my-4 text-stone-300 leading-relaxed">${formatInline(line)}</p>`);
  }

  if (inTable) htmlLines.push('</tbody></table></div>');
  if (inList) htmlLines.push('</ul>');

  return htmlLines.join('\n');
}

/**
 * Format inline markdown: bold, italic, links
 */
function formatInline(text: string): string {
  let res = escapeHtml(text);
  // Bold **text**
  res = res.replace(/\*\*(.*?)\*\*/g, '<strong class="text-amber-300 font-semibold">$1</strong>');
  // Italic *text*
  res = res.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  // Markdown links [label](url)
  res = res.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-amber-400 hover:text-amber-300 underline underline-offset-4 font-medium">$1</a>');
  return res;
}

/**
 * Injects SEO tags, OpenGraph, Canonical, JSON-LD, and pre-rendered article body into index.html
 */
export function injectSeoIntoHtml(baseHtml: string, pathname: string): { status: number; html: string } {
  const cleanPath = pathname.toLowerCase().split('?')[0].split('#')[0];

  // 1. ARTICLE DETAIL ROUTE: /blog/:slug
  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '').split('/')[0];
    const post = getBlogPostBySlug(slug);

    if (!post) {
      // 404 for non-existent blog post
      const notFoundHtml = baseHtml
        .replace(/<title>.*?<\/title>/, `<title>Article Not Found | SARTOR Atelier</title>`)
        .replace(
          '<div id="root"></div>',
          `<div id="root">
            <div style="min-height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem; background: #0c0a09; color: #f5f5f4;">
              <h1 style="font-size: 2.5rem; font-family: serif; color: #f59e0b; margin-bottom: 1rem;">Article Not Found</h1>
              <p style="color: #a8a29e; max-width: 500px; margin-bottom: 2rem;">The journal entry you requested does not exist or has been relocated.</p>
              <a href="/blog" style="padding: 0.75rem 1.5rem; border-radius: 9999px; background: #d97706; color: #ffffff; text-decoration: none; font-weight: bold;">Browse Atelier Journal</a>
            </div>
          </div>`
        );
      return { status: 404, html: notFoundHtml };
    }

    const articleUrl = `https://sartor.pk/blog/${post.slug}`;
    const pageTitle = `${post.title} | SARTOR Atelier`;
    const imageUrl = post.coverImage?.startsWith('http')
      ? post.coverImage
      : `https://sartor.pk${post.coverImage || '/digital-measurements-guide.jpg'}`;

    // Schema.org BlogPosting
    const blogPostingSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${articleUrl}#article`,
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': articleUrl,
      },
      'headline': post.title,
      'description': post.excerpt,
      'image': [imageUrl],
      'datePublished': `${post.date}T00:00:00+05:00`,
      'dateModified': `${post.date}T00:00:00+05:00`,
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
      'articleSection': post.category,
      'keywords': post.tags.join(', '),
    };

    // Schema.org BreadcrumbList
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
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
          'name': 'Blog',
          'item': 'https://sartor.pk/blog',
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': post.title,
          'item': articleUrl,
        },
      ],
    };

    const schemaTags = `
    <!-- Article & Breadcrumb Structured Data -->
    <script type="application/ld+json">
    ${JSON.stringify(blogPostingSchema, null, 2)}
    </script>
    <script type="application/ld+json">
    ${JSON.stringify(breadcrumbSchema, null, 2)}
    </script>
    `;

    // Semantic pre-rendered HTML for search engine crawlers and View Source
    const renderedBodyHtml = `
    <div id="root">
      <div class="min-h-screen bg-stone-950 text-stone-100">
        <!-- Top Navigation -->
        <header class="border-b border-stone-800 bg-stone-950 px-4 py-4">
          <div class="max-w-4xl mx-auto flex items-center justify-between">
            <a href="/" class="text-amber-400 font-serif font-bold text-lg">SARTOR</a>
            <nav class="flex items-center gap-4 text-xs">
              <a href="/" class="text-stone-400 hover:text-white">Home</a>
              <a href="/blog" class="text-stone-400 hover:text-white">Journal</a>
              <a href="/custom-bridal" class="text-amber-300">Custom Bridal</a>
            </nav>
          </div>
        </header>

        <article class="max-w-4xl mx-auto px-4 py-12">
          <!-- Breadcrumb Navigation -->
          <nav aria-label="Breadcrumb" class="mb-6">
            <ol class="flex items-center gap-2 text-xs text-stone-400">
              <li><a href="/" class="hover:text-amber-300">Home</a></li>
              <li class="text-stone-600">/</li>
              <li><a href="/blog" class="hover:text-amber-300">Blog</a></li>
              <li class="text-stone-600">/</li>
              <li class="text-amber-300 font-medium" aria-current="page">${escapeHtml(post.title)}</li>
            </ol>
          </nav>

          <header class="mb-8">
            <div class="flex items-center gap-3 text-xs text-stone-400 mb-3">
              <span class="rounded bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-amber-300 font-semibold">${escapeHtml(post.category)}</span>
              <time datetime="${post.date}">${post.date}</time>
              <span>•</span>
              <span>${post.readingTime}</span>
              <span>•</span>
              <span class="text-stone-300">${escapeHtml(post.author)}</span>
            </div>
            <h1 class="text-3xl sm:text-5xl font-serif font-bold text-stone-50 leading-tight">${escapeHtml(post.title)}</h1>
            <p class="mt-4 text-lg text-stone-300 font-light leading-relaxed">${escapeHtml(post.excerpt)}</p>
          </header>

          ${
            post.coverImage
              ? `<div class="mb-10 overflow-hidden rounded-2xl border border-stone-800 shadow-2xl">
                  <img src="${post.coverImage}" alt="${escapeHtml(post.title)}" class="w-full aspect-[16/9] object-cover" />
                </div>`
              : ''
          }

          <div class="prose prose-invert prose-amber max-w-none text-stone-300">
            ${markdownToHtml(post.content)}
          </div>
        </article>
      </div>
    </div>
    `.trim();

    let transformedHtml = baseHtml
      // Replace Title
      .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(pageTitle)}</title>`)
      // Replace Meta Description
      .replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${escapeHtml(post.excerpt)}" />`)
      // Replace Canonical
      .replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${articleUrl}" />`)
      // Replace OpenGraph Title
      .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(pageTitle)}" />`)
      // Replace OpenGraph Description
      .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(post.excerpt)}" />`)
      // Replace OpenGraph URL
      .replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${articleUrl}" />`)
      // Replace OpenGraph Type
      .replace(/<meta\s+property="og:type"\s+content=".*?"\s*\/?>/i, `<meta property="og:type" content="article" />`)
      // Replace OpenGraph Image
      .replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i, `<meta property="og:image" content="${imageUrl}" />`)
      // Replace Twitter Title
      .replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(pageTitle)}" />`)
      // Replace Twitter Description
      .replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(post.excerpt)}" />`)
      // Replace Twitter Image
      .replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:image" content="${imageUrl}" />`)
      // Inject Schemas before </head>
      .replace('</head>', `${schemaTags}\n</head>`)
      // Replace <div id="root"></div> with Pre-rendered HTML
      .replace('<div id="root"></div>', renderedBodyHtml);

    return { status: 200, html: transformedHtml };
  }

  // 2. BLOG ARCHIVE ROUTE: /blog
  if (cleanPath === '/blog') {
    const pageTitle = 'SARTOR Atelier Journal | Bespoke Tailoring & Couture Guides';
    const pageDesc =
      'Guides for discerning brides and couture enthusiasts. Discover authentic zardozi embroidery techniques, international measurement advice, and craftsmanship updates from Lahore.';
    const archiveUrl = 'https://sartor.pk/blog';

    const archiveBreadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${archiveUrl}#breadcrumb`,
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
          'name': 'Blog',
          'item': archiveUrl,
        },
      ],
    };

    const schemaTags = `
    <!-- Blog Archive Breadcrumb Structured Data -->
    <script type="application/ld+json">
    ${JSON.stringify(archiveBreadcrumbSchema, null, 2)}
    </script>
    `;

    const renderedArchiveHtml = `
    <div id="root">
      <div class="min-h-screen bg-stone-950 text-stone-100">
        <header class="border-b border-stone-800 bg-stone-950 px-4 py-4">
          <div class="max-w-7xl mx-auto flex items-center justify-between">
            <a href="/" class="text-amber-400 font-serif font-bold text-lg">SARTOR</a>
            <nav class="flex items-center gap-4 text-xs">
              <a href="/" class="text-stone-400 hover:text-white">Home</a>
              <a href="/blog" class="text-amber-300">Journal</a>
              <a href="/custom-bridal" class="text-stone-400 hover:text-white">Custom Bridal</a>
            </nav>
          </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 py-12">
          <nav aria-label="Breadcrumb" class="mb-6">
            <ol class="flex items-center gap-2 text-xs text-stone-400">
              <li><a href="/" class="hover:text-amber-300">Home</a></li>
              <li class="text-stone-600">/</li>
              <li class="text-amber-300 font-medium" aria-current="page">Blog</li>
            </ol>
          </nav>

          <div class="text-center max-w-3xl mx-auto mb-16">
            <h1 class="text-4xl font-serif font-bold text-stone-50">The Sartor Atelier Journal</h1>
            <p class="mt-4 text-stone-300">${escapeHtml(pageDesc)}</p>
          </div>

          <div class="grid gap-8 sm:grid-cols-2">
            ${BLOG_POSTS.map(
              (p) => `
              <article class="rounded-2xl border border-stone-800 bg-stone-900/40 p-6">
                <span class="text-xs font-semibold text-amber-300 uppercase">${escapeHtml(p.category)}</span>
                <h2 class="text-2xl font-serif font-bold text-stone-100 mt-2 mb-3">
                  <a href="/blog/${p.slug}" class="hover:text-amber-300 transition-colors">${escapeHtml(p.title)}</a>
                </h2>
                <p class="text-sm text-stone-300 mb-4 line-clamp-3">${escapeHtml(p.excerpt)}</p>
                <a href="/blog/${p.slug}" class="text-xs font-semibold text-amber-400 hover:text-amber-300">Read Article →</a>
              </article>`
            ).join('\n')}
          </div>
        </main>
      </div>
    </div>
    `.trim();

    let transformedHtml = baseHtml
      .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(pageTitle)}</title>`)
      .replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${escapeHtml(pageDesc)}" />`)
      .replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${archiveUrl}" />`)
      .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(pageTitle)}" />`)
      .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(pageDesc)}" />`)
      .replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${archiveUrl}" />`)
      .replace('</head>', `${schemaTags}\n</head>`)
      .replace('<div id="root"></div>', renderedArchiveHtml);

    return { status: 200, html: transformedHtml };
  }

  // 3. CUSTOM BRIDAL ROUTE: /custom-bridal
  if (cleanPath === '/custom-bridal') {
    const bridalTitle = 'Custom Bridal ($2k+) & Overseas Bespoke Wedding Tailoring | SARTOR';
    const bridalDesc = 'Commission bespoke bridal lehengas, royal farshi ghararas, and grooms sherwanis directly from master artisans in Lahore with 4-step milestone payments and DHL express worldwide delivery.';
    const bridalUrl = 'https://sartor.pk/custom-bridal';

    let transformedHtml = baseHtml
      .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(bridalTitle)}</title>`)
      .replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${escapeHtml(bridalDesc)}" />`)
      .replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${bridalUrl}" />`)
      .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(bridalTitle)}" />`)
      .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(bridalDesc)}" />`)
      .replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${bridalUrl}" />`);

    return { status: 200, html: transformedHtml };
  }

  // Default: Homepage
  return { status: 200, html: baseHtml };
}

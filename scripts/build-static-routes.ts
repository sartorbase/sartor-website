import fs from 'fs';
import path from 'path';
import { BLOG_POSTS } from '../src/data/blogPosts';
import { injectSeoIntoHtml, generateSitemapXml } from '../src/server/seoRenderer';

/**
 * Pre-renders all application routes into static HTML files in /dist
 * This ensures Vercel, Netlify, Apache, Nginx, or any CDN directly serves
 * HTTP 200 with complete article metadata, canonical link, and visible content
 * without requiring server-side compute or redirecting to the homepage.
 */
function buildStaticRoutes() {
  const distDir = path.join(process.cwd(), 'dist');

  if (!fs.existsSync(distDir)) {
    console.error('Error: dist directory does not exist. Run vite build first.');
    process.exit(1);
  }

  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('Error: dist/index.html not found.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  // List of all valid routes to pre-render
  const routes = [
    '/blog',
    '/custom-bridal',
    ...BLOG_POSTS.map((post) => `/blog/${post.slug}`),
  ];

  console.log(`Pre-rendering ${routes.length} static routes for production deployment...`);

  for (const route of routes) {
    const { status, html } = injectSeoIntoHtml(baseHtml, route);

    if (status !== 200) {
      console.warn(`Warning: Route ${route} returned status ${status}`);
      continue;
    }

    // 1. Write as /dist/[route]/index.html (standard directory index)
    const targetDir = path.join(distDir, route.replace(/^\//, ''));
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');

    // 2. Also write as /dist/[route].html (for cleanUrls: true support)
    const cleanUrlPath = path.join(distDir, `${route.replace(/^\//, '')}.html`);
    const cleanUrlDir = path.dirname(cleanUrlPath);
    if (!fs.existsSync(cleanUrlDir)) {
      fs.mkdirSync(cleanUrlDir, { recursive: true });
    }
    fs.writeFileSync(cleanUrlPath, html, 'utf-8');

    console.log(`✓ Pre-rendered: ${route} -> ${route}/index.html & ${route}.html`);
  }

  // Generate 404.html so invalid URLs return true 404 instead of falling back to homepage
  const { html: notFoundHtml } = injectSeoIntoHtml(baseHtml, '/blog/non-existent-404-trigger');
  const custom404Html = notFoundHtml
    .replace(/<title>.*?<\/title>/, '<title>404: Page Not Found | SARTOR Atelier</title>')
    .replace('<head>', '<head>\n    <meta name="robots" content="noindex, follow" />');

  fs.writeFileSync(path.join(distDir, '404.html'), custom404Html, 'utf-8');
  console.log('✓ Generated dist/404.html for explicit 404 handling');

  // Ensure sitemap.xml in dist is fresh and accurate
  const sitemapXml = generateSitemapXml();
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log('✓ Synchronized dist/sitemap.xml and public/sitemap.xml');

  console.log('Static route pre-rendering complete!');
}

buildStaticRoutes();

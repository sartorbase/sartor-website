import fs from 'fs';
import path from 'path';
import { BLOG_POSTS } from '../src/data/blogPosts';
import { injectSeoIntoHtml, generateSitemapXml } from '../src/server/seoRenderer';

async function buildStaticRoutes() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const indexHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.warn('dist/index.html not found, skipping static routes pre-rendering');
    return;
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  // Pre-render /blog
  const blogDir = path.join(distDir, 'blog');
  fs.mkdirSync(blogDir, { recursive: true });
  const blogSeo = injectSeoIntoHtml(baseHtml, '/blog');
  fs.writeFileSync(path.join(blogDir, 'index.html'), blogSeo.html);
  console.log('Pre-rendered /blog/index.html');

  // Pre-render /custom-bridal
  const bridalDir = path.join(distDir, 'custom-bridal');
  fs.mkdirSync(bridalDir, { recursive: true });
  const bridalSeo = injectSeoIntoHtml(baseHtml, '/custom-bridal');
  fs.writeFileSync(path.join(bridalDir, 'index.html'), bridalSeo.html);
  console.log('Pre-rendered /custom-bridal/index.html');

  // Pre-render each blog post
  for (const post of BLOG_POSTS) {
    const postDir = path.join(blogDir, post.slug);
    fs.mkdirSync(postDir, { recursive: true });
    const postSeo = injectSeoIntoHtml(baseHtml, `/blog/${post.slug}`);
    fs.writeFileSync(path.join(postDir, 'index.html'), postSeo.html);
    console.log(`Pre-rendered /blog/${post.slug}/index.html`);
  }

  // Generate sitemap.xml in dist/
  const sitemapXml = generateSitemapXml();
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml);
  console.log('Generated dist/sitemap.xml');
}

buildStaticRoutes().catch((err) => {
  console.error('Error during static route generation:', err);
  process.exit(1);
});

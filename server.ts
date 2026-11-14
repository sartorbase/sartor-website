import express, { Request, Response } from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import compression from 'compression';
import { GoogleGenAI } from '@google/genai';
import { ATELIER_SYSTEM_INSTRUCTION } from './src/constants/atelierPrompt';
import { injectSeoIntoHtml, generateSitemapXml } from './src/server/seoRenderer';

dotenv.config();

// Server-wide base root directory
const appRoot = process.cwd();
const __dirname = appRoot;

function getCliPort(): number {
  const portIndex = process.argv.indexOf('--port');
  if (portIndex !== -1 && process.argv[portIndex + 1]) {
    const parsed = Number(process.argv[portIndex + 1]);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return Number(process.env.PORT) || 3000;
}

function getCliHost(): string {
  const hostIndex = process.argv.indexOf('--host');
  if (hostIndex !== -1 && process.argv[hostIndex + 1]) {
    return process.argv[hostIndex + 1];
  }
  return '0.0.0.0';
}

const app = express();
const httpServer = http.createServer(app);
const PORT = getCliPort();
const HOST = getCliHost();
const isProd = process.env.NODE_ENV === 'production';

// High-performance gzip/deflate compression for mobile payload minimization
app.use(
  compression({
    level: 6,
    threshold: 1024,
    filter: (req, res) => {
      if (req.headers['x-no-compression']) return false;
      return compression.filter(req, res);
    },
  })
);

app.use(express.json());

// Smart WebP Content Negotiation & Static Image Caching Middleware
app.use((req: Request, res: Response, next) => {
  const urlPath = req.path;
  const acceptHeader = req.headers.accept || '';
  const supportsWebp = acceptHeader.includes('image/webp');

  if (/\.(jpe?g|png|webp)$/i.test(urlPath)) {
    res.setHeader('Vary', 'Accept');
    res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');

    // 1. If client supports WebP and requested JPG/PNG, try WebP first
    if (supportsWebp && /\.(jpe?g|png)$/i.test(urlPath)) {
      const webpRelPath = urlPath.replace(/\.(jpe?g|png)$/i, '.webp');
      const webpCandidates = [
        path.join(__dirname, 'public', webpRelPath),
        path.join(__dirname, 'dist', webpRelPath),
      ];
      for (const cand of webpCandidates) {
        if (fs.existsSync(cand) && !fs.statSync(cand).isDirectory()) {
          res.setHeader('Content-Type', 'image/webp');
          return res.sendFile(cand, (err) => {
            if (err && !res.headersSent) next();
          });
        }
      }
    }

    // 2. Direct file match in public or dist
    const directCandidates = [
      path.join(__dirname, 'public', urlPath),
      path.join(__dirname, 'dist', urlPath),
    ];
    for (const cand of directCandidates) {
      if (fs.existsSync(cand) && !fs.statSync(cand).isDirectory()) {
        const ext = path.extname(cand).toLowerCase();
        const contentType = ext === '.webp' ? 'image/webp' : ext === '.png' ? 'image/png' : 'image/jpeg';
        res.setHeader('Content-Type', contentType);
        return res.sendFile(cand, (err) => {
          if (err && !res.headersSent) next();
        });
      }
    }
  } else if (urlPath.startsWith('/assets/')) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (urlPath === '/sw.js') {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    const swPath = path.join(__dirname, 'dist', 'sw.js');
    if (fs.existsSync(swPath)) {
      return res.sendFile(swPath);
    }
  } else if (urlPath.startsWith('/workbox-')) {
    const wbPath = path.join(__dirname, 'dist', path.basename(urlPath));
    if (fs.existsSync(wbPath)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      return res.sendFile(wbPath);
    }
  } else if (urlPath === '/manifest.webmanifest' || urlPath === '/manifest.json') {
    res.setHeader('Content-Type', 'application/manifest+json; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    const manifestPath = path.join(__dirname, 'dist', 'manifest.webmanifest');
    if (fs.existsSync(manifestPath)) {
      return res.sendFile(manifestPath);
    }
  }

  next();
});

// Canonical 301 Redirect Middleware (apex sartor.pk -> https://www.sartor.pk)
app.use((req: Request, res: Response, next) => {
  const host = req.headers.host || '';
  if (host === 'sartor.pk') {
    return res.redirect(301, `https://www.sartor.pk${req.originalUrl || req.url}`);
  }
  next();
});

// 1. Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'SARTOR Bespoke Atelier Lahore',
    timestamp: new Date().toISOString(),
  });
});

// 1b. Lead Capture Endpoint
app.post('/api/leads', async (req: Request, res: Response) => {
  try {
    const lead = req.body;
    console.log('[SARTOR Lead Captured at /api/leads]', JSON.stringify(lead));
    res.json({ success: true, timestamp: new Date().toISOString() });
  } catch (err: any) {
    console.error('Error in /api/leads:', err);
    res.status(500).json({ error: err.message || 'Failed to record lead.' });
  }
});

// 1c. Atelier Blog Comments & Moderation Engine
const commentsFilePath = path.resolve(__dirname, 'data/comments.json');

function loadComments(): any[] {
  try {
    if (fs.existsSync(commentsFilePath)) {
      const data = fs.readFileSync(commentsFilePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading comments file:', err);
  }
  return [];
}

function saveComments(comments: any[]): void {
  try {
    const dir = path.dirname(commentsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(commentsFilePath, JSON.stringify(comments, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving comments file:', err);
  }
}

// GET comments by post slug or all
app.get('/api/comments', (req: Request, res: Response) => {
  try {
    const { slug, includeAll } = req.query;
    let comments = loadComments();

    if (slug) {
      comments = comments.filter((c: any) => c.slug === slug);
    }

    if (includeAll !== 'true') {
      // Normal public feed: hide rejected items
      comments = comments.filter((c: any) => c.status !== 'rejected');
    }

    // Sort newest first
    comments.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Hide private email addresses from public response
    const sanitized = comments.map((c: any) => {
      const { authorEmail, ...rest } = c;
      return rest;
    });

    res.json({ success: true, comments: sanitized, count: sanitized.length });
  } catch (err: any) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: 'Failed to retrieve comments.' });
  }
});

// POST new comment
app.post('/api/comments', (req: Request, res: Response) => {
  try {
    const { slug, authorName, authorEmail, location, content, topic } = req.body;

    if (!slug || !authorName || !content) {
      res.status(400).json({ error: 'Post slug, author name, and comment content are required.' });
      return;
    }

    if (content.trim().length < 5) {
      res.status(400).json({ error: 'Comment content is too short (minimum 5 characters).' });
      return;
    }

    const comments = loadComments();
    const newComment = {
      id: `cmt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      slug: String(slug).trim(),
      authorName: String(authorName).trim().slice(0, 80),
      authorEmail: authorEmail ? String(authorEmail).trim().slice(0, 120) : undefined,
      location: location ? String(location).trim().slice(0, 80) : 'Diaspora Client',
      topic: topic ? String(topic).trim().slice(0, 80) : undefined,
      content: String(content).trim().slice(0, 2000),
      createdAt: new Date().toISOString(),
      status: 'approved',
      likes: 0,
      flagCount: 0,
      isVerifiedClient: false,
    };

    comments.unshift(newComment);
    saveComments(comments);

    // Return sanitized comment (without email)
    const { authorEmail: _omitted, ...safeComment } = newComment;
    res.status(201).json({ success: true, comment: safeComment, message: 'Comment submitted successfully.' });
  } catch (err: any) {
    console.error('Error posting comment:', err);
    res.status(500).json({ error: 'Failed to submit comment.' });
  }
});

// POST flag comment for atelier review
app.post('/api/comments/:id/flag', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { reason = 'Reported for atelier inspection' } = req.body;

    const comments = loadComments();
    const target = comments.find((c: any) => c.id === id);

    if (!target) {
      res.status(404).json({ error: 'Comment not found.' });
      return;
    }

    target.status = 'flagged';
    target.flagCount = (target.flagCount || 0) + 1;
    target.flagReason = String(reason).trim().slice(0, 200);
    target.flaggedAt = new Date().toISOString();

    saveComments(comments);

    const { authorEmail: _omitted, ...safeTarget } = target;
    res.json({
      success: true,
      message: 'Comment has been flagged for Atelier Master Tailor review.',
      comment: safeTarget,
    });
  } catch (err: any) {
    console.error('Error flagging comment:', err);
    res.status(500).json({ error: 'Failed to flag comment.' });
  }
});

// POST like/unlike comment
app.post('/api/comments/:id/like', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { action = 'like' } = req.body;

    const comments = loadComments();
    const target = comments.find((c: any) => c.id === id);

    if (!target) {
      res.status(404).json({ error: 'Comment not found.' });
      return;
    }

    if (action === 'unlike') {
      target.likes = Math.max(0, (target.likes || 1) - 1);
    } else {
      target.likes = (target.likes || 0) + 1;
    }

    saveComments(comments);

    const { authorEmail: _omitted, ...safeTarget } = target;
    res.json({
      success: true,
      likes: target.likes,
      comment: safeTarget,
    });
  } catch (err: any) {
    console.error('Error toggling comment like:', err);
    res.status(500).json({ error: 'Failed to update like count.' });
  }
});

// POST atelier moderation action (approve, reject, delete, reply)
app.post('/api/comments/:id/moderate', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { action, replyContent, authorName } = req.body;

    const comments = loadComments();
    const index = comments.findIndex((c: any) => c.id === id);

    if (index === -1) {
      res.status(404).json({ error: 'Comment not found.' });
      return;
    }

    const comment = comments[index];

    if (action === 'delete') {
      comments.splice(index, 1);
      saveComments(comments);
      res.json({ success: true, message: 'Comment permanently deleted.', id });
      return;
    }

    if (action === 'approve') {
      comment.status = 'approved';
      comment.flagReason = undefined;
    } else if (action === 'flag') {
      comment.status = 'flagged';
      comment.flagReason = req.body.reason || 'Flagged by Atelier Moderator';
      comment.flaggedAt = new Date().toISOString();
    } else if (action === 'reject') {
      comment.status = 'rejected';
    } else if (action === 'reply') {
      if (!replyContent || replyContent.trim().length === 0) {
        res.status(400).json({ error: 'Reply content is required.' });
        return;
      }
      comment.atelierReply = {
        author: authorName || 'Master Tailor Abdul Ghaffar',
        role: 'Head of Atelier, SARTOR Lahore',
        content: String(replyContent).trim().slice(0, 2000),
        createdAt: new Date().toISOString(),
      };
      comment.status = 'approved';
    } else {
      res.status(400).json({ error: 'Invalid moderation action.' });
      return;
    }

    saveComments(comments);

    const { authorEmail: _omitted, ...safeComment } = comment;
    res.json({ success: true, comment: safeComment, message: `Comment action "${action}" completed.` });
  } catch (err: any) {
    console.error('Error moderating comment:', err);
    res.status(500).json({ error: 'Failed to execute moderation action.' });
  }
});

// 2. Sitemap
app.get('/sitemap.xml', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/xml');
  res.send(generateSitemapXml());
});

// 2b. Machine-Readable Knowledge Base for LLMs & AI Agents
app.get('/llms.txt', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  const filePath = path.resolve(__dirname, 'public/llms.txt');
  if (fs.existsSync(filePath)) {
    res.send(fs.readFileSync(filePath, 'utf-8'));
  } else {
    res.status(404).send('Not Found');
  }
});

app.get('/llms-full.txt', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  const filePath = path.resolve(__dirname, 'public/llms-full.txt');
  if (fs.existsSync(filePath)) {
    res.send(fs.readFileSync(filePath, 'utf-8'));
  } else {
    res.status(404).send('Not Found');
  }
});

// 3. Server-side Gemini AI Stylist Chatbot Route
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { history = [], message, model, enableSearch } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message string is required.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
      return;
    }

    const ai = new GoogleGenAI({ apiKey });

    // Map model
    let modelId = 'gemini-2.5-flash';
    if (model === 'gemini-3.8-flash' || model === 'gemini-3.1-pro-preview' || model === 'gemini-3.1-flash-lite') {
      modelId = model;
    }

    const formattedContents = [
      ...history.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      })),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    const tools: any[] = [];
    if (enableSearch !== false) {
      tools.push({ googleSearch: {} });
    }

    const response = await ai.models.generateContent({
      model: modelId,
      contents: formattedContents,
      config: {
        systemInstruction: ATELIER_SYSTEM_INSTRUCTION,
        ...(tools.length > 0 ? { tools } : {}),
      },
    });

    const responseText = response.text || '';
    const groundingSources: { uri: string; title: string }[] = [];

    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const candidate = candidates[0];
      const metadata = (candidate as any).groundingMetadata;
      if (metadata && metadata.groundingChunks) {
        for (const chunk of metadata.groundingChunks) {
          if (chunk.web && chunk.web.uri) {
            groundingSources.push({
              uri: chunk.web.uri,
              title: chunk.web.title || chunk.web.uri,
            });
          }
        }
      }
    }

    res.json({
      text: responseText,
      groundingSources,
      modelUsed: modelId,
    });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    res.status(500).json({
      error: err.message || 'Failed to process chat query.',
    });
  }
});

// 4. Setup Vite in dev or static serving in production
async function startServer() {
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: false,
        ws: false,
      },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.use('*', async (req: Request, res: Response, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        const wsHmrShim = `<script>
(function() {
  if (typeof window === 'undefined') return;
  var NativeWebSocket = window.WebSocket;
  if (!NativeWebSocket) return;
  window.WebSocket = function(url, protocols) {
    var isViteHmr = (protocols === 'vite-hmr') || (Array.isArray(protocols) && protocols.indexOf('vite-hmr') !== -1);
    if (!isViteHmr) return new NativeWebSocket(url, protocols);
    var listeners = {};
    var fakeWs = {
      readyState: 1,
      OPEN: 1,
      CLOSED: 3,
      CLOSING: 2,
      CONNECTING: 0,
      url: url,
      protocol: 'vite-hmr',
      send: function() {},
      close: function() {
        fakeWs.readyState = 3;
        var fns = listeners['close'] || [];
        fns.forEach(function(fn) { fn({ type: 'close' }); });
      },
      addEventListener: function(type, fn) {
        listeners[type] = listeners[type] || [];
        listeners[type].push(fn);
        if (type === 'open') {
          setTimeout(function() { fn({ type: 'open' }); }, 0);
        }
      },
      removeEventListener: function(type, fn) {
        if (!listeners[type]) return;
        listeners[type] = listeners[type].filter(function(cb) { return cb !== fn; });
      },
      dispatchEvent: function() { return true; }
    };
    return fakeWs;
  };
  window.WebSocket.prototype = NativeWebSocket.prototype;
  window.WebSocket.CONNECTING = 0;
  window.WebSocket.OPEN = 1;
  window.WebSocket.CLOSING = 2;
  window.WebSocket.CLOSED = 3;
  window.addEventListener('unhandledrejection', function(e) {
    var str = String(e && e.reason && (e.reason.message || e.reason) || '');
    if (str.indexOf('WebSocket') !== -1 || str.indexOf('closed without opened') !== -1) {
      e.preventDefault();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    }
  }, true);
})();
</script>`;
        template = template.replace('<head>', '<head>' + wsHmrShim);
        const { status, html } = injectSeoIntoHtml(template, url);
        res.status(status).set({
          'Content-Type': 'text/html',
          'Link': '</llms.txt>; rel="alternate"; type="text/markdown"',
          'X-Robots-Tag': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        }).end(html);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath, {
      index: false,
      maxAge: '365d',
      immutable: true,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800');
        }
      },
    }));

    app.use('*', (req: Request, res: Response) => {
      const url = req.originalUrl;
      const indexHtmlPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexHtmlPath)) {
        const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
        const { status, html } = injectSeoIntoHtml(baseHtml, url);
        res.status(status).set({
          'Content-Type': 'text/html',
          'Link': '</llms.txt>; rel="alternate"; type="text/markdown"',
          'X-Robots-Tag': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
          'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
        }).end(html);
      } else {
        res.status(404).send('Not Found');
      }
    });
  }

  httpServer.listen(PORT, HOST, () => {
    console.log(`SARTOR server listening on ${HOST}:${PORT} (isProd: ${isProd})`);
  });
}

startServer();

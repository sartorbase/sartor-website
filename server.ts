import express, { Request, Response } from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { ATELIER_SYSTEM_INSTRUCTION } from './src/constants/atelierPrompt';
import { injectSeoIntoHtml, generateSitemapXml } from './src/server/seoRenderer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.use(express.json());

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

// 2. Sitemap
app.get('/sitemap.xml', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/xml');
  res.send(generateSitemapXml());
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
        res.status(status).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath, { index: false }));

    app.use('*', (req: Request, res: Response) => {
      const url = req.originalUrl;
      const indexHtmlPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexHtmlPath)) {
        const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
        const { status, html } = injectSeoIntoHtml(baseHtml, url);
        res.status(status).set({ 'Content-Type': 'text/html' }).end(html);
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

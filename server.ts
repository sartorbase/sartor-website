import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { ATELIER_SYSTEM_INSTRUCTION } from './src/constants/atelierPrompt';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy GoogleGenAI client
let aiClient: GoogleGenAI | null = null;
let lastKeyUsed: string | null = null;

function getGenAI(apiKey: string): GoogleGenAI {
  if (!aiClient || lastKeyUsed !== apiKey) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    lastKeyUsed = apiKey;
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY),
  });
});

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// POST /api/chat
app.post('/api/chat', async (req, res) => {
  try {
    const {
      messages,
      model = 'gemini-2.5-flash',
      enableSearch = true,
    } = req.body as {
      messages: ChatMessage[];
      model?: string;
      enableSearch?: boolean;
    };

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'A non-empty messages array is required.' });
    }

    // Safely check if Gemini API key is configured without throwing unhandled exception
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length === 0) {
      return res.status(200).json({
        text: "Assalam-o-Alaikum! Welcome to Sartor Atelier. Our AI Fashion Stylist is currently preparing consultations. For immediate bespoke design inquiries, fabric yardage estimates, and stitching bookings, please contact our Master Tailors at Moon Town Lahore directly via WhatsApp at 0335-2209991.",
        error: 'Gemini API key is not configured. Please set GEMINI_API_KEY or VITE_GEMINI_API_KEY in your environment or Settings > Secrets.',
        isApiKeyMissing: true,
        isQuotaExceeded: false,
        model: 'gemini-2.5-flash',
        groundingChunks: [],
        webSearchQueries: [],
        hasSearchGrounding: false,
      });
    }

    const ai = getGenAI(apiKey.trim());

    const selectedModel = 'gemini-2.5-flash';

    // Format contents for multi-turn chat
    const formattedContents = messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    // Configure tools: Google Search if enabled
    const tools = enableSearch ? [{ googleSearch: {} }] : undefined;

    let response;
    try {
      response = await ai.models.generateContent({
        model: selectedModel,
        contents: formattedContents,
        config: {
          systemInstruction: ATELIER_SYSTEM_INSTRUCTION,
          ...(tools ? { tools } : {}),
        },
      });
    } catch (genError: any) {
      console.error('Gemini SDK generateContent error in server.ts:', genError);
      const rawMessage = genError?.message || 'Gemini API call failed.';
      const isQuotaExceeded =
        rawMessage.includes('429') ||
        rawMessage.includes('RESOURCE_EXHAUSTED') ||
        genError?.status === 429;
      const isApiKeyMissing =
        rawMessage.includes('GEMINI_API_KEY') ||
        rawMessage.includes('API key') ||
        rawMessage.includes('API_KEY_INVALID');

      let userFriendlyError = rawMessage;
      if (isQuotaExceeded) {
        userFriendlyError =
          'Gemini API quota exceeded for your current key. If you are using a free tier key, you can upgrade your plan or select a billing-enabled key in Settings > Secrets.';
      }

      return res.status(200).json({
        text: `I apologize, but I encountered an issue connecting with the styling service (${userFriendlyError}). You can also reach our atelier directly on WhatsApp at 0335-2209991.`,
        error: userFriendlyError,
        details: {
          message: rawMessage,
          status: genError?.status,
          code: genError?.code,
        },
        isQuotaExceeded,
        isApiKeyMissing,
        model: selectedModel,
        groundingChunks: [],
        webSearchQueries: [],
        hasSearchGrounding: false,
      });
    }

    const replyText = response.text || 'I apologize, but I could not generate a response. Please try again.';
    const candidate = response.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;
    const groundingChunks = groundingMetadata?.groundingChunks || [];
    const webSearchQueries = groundingMetadata?.webSearchQueries || [];

    return res.json({
      text: replyText,
      model: selectedModel,
      groundingChunks,
      webSearchQueries,
      hasSearchGrounding: Boolean(groundingChunks && groundingChunks.length > 0),
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    let rawMessage = error?.message || 'An unexpected error occurred while communicating with Gemini.';
    let cleanMessage = rawMessage;
    let isQuotaExceeded = false;
    let isApiKeyMissing = rawMessage.includes('GEMINI_API_KEY');

    try {
      const parsed = JSON.parse(rawMessage);
      if (parsed?.error?.code === 429 || parsed?.error?.status === 'RESOURCE_EXHAUSTED') {
        isQuotaExceeded = true;
        cleanMessage =
          'Gemini API quota exceeded for your current key. If you are using a free tier key, you can upgrade your plan or select a billing-enabled key in Settings > Secrets.';
      } else if (parsed?.error?.message) {
        cleanMessage = parsed.error.message;
      }
    } catch {
      if (rawMessage.includes('429') || rawMessage.includes('RESOURCE_EXHAUSTED')) {
        isQuotaExceeded = true;
        cleanMessage =
          'Gemini API quota exceeded for your current key. If you are using a free tier key, you can upgrade your plan or select a billing-enabled key in Settings > Secrets.';
      }
    }

    // Graceful error response without causing unhandled server crash or 500
    const statusCode = isQuotaExceeded ? 429 : 200;
    return res.status(statusCode).json({
      error: cleanMessage,
      isQuotaExceeded,
      isApiKeyMissing,
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SARTOR Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

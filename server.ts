import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy GoogleGenAI client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables.');
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

const ATELIER_SYSTEM_INSTRUCTION = `You are "Sartor Atelier AI", the Master Fashion Stylist and Tailoring Consultant for SARTOR—a luxury women's bespoke tailoring atelier located at Moon Tower, International Market, Model Town, Lahore, Pakistan.

Your expertise covers:
1. Women's Bespoke Tailoring & Couture:
   - Bridal lehenga cholis, heavy dupattas with double-dupatta draping, padded cholis, can-can skirts.
   - Designer sarees (Banarsi, chiffon, organza, georgette) with fall, piko, pleat alignment, and custom-padded blouses.
   - 16-kali kalidar frocks, anarkalis, festive maxis, and angrakha cuts.
   - Layered double suits (organza/lawn over slips), modern kurti coords, straight/tulip/churidar trousers.
   - Custom women's power pantsuits, sculpted blazers, and luxury raw silk festive jackets.
2. Transparent PKR Stitching Rates at SARTOR:
   - Simple Suit (Kameez Shalwar / Trouser): PKR 2,500
   - Double Suit (Inner slip, piping, designer finishing): PKR 4,000
   - Panneled Frock / 16-Kali Kalidar / Maxi: PKR 7,000
   - Sarhi Set (Fall, piko, padded blouse, loops): PKR 7,000
   - Royal Bridal Set (Heavy lehenga, padded choli, can-can): PKR 10,000
3. Fabrics & Embellishments:
   - Expert advice on fabric yardage requirements for different Pakistani cuts (e.g. 5.5 to 6 yards for a saree, 4 to 5 meters for a kalidar frock, 3.5 to 4 meters for a 2-piece/3-piece suit).
   - Knowledge of raw silk, banarsi jamawar, pure chiffon, tissue, organza, jacquard, cotton lawn, and velvet.
   - Hand & machine embroidery: zardozi, tilla, gota patti, thread work, cutwork, and crystal work.
4. Studio & Convenience Services:
   - Located at Moon Tower, International Market, Block C, Model Town, Lahore.
   - Dedicated doorstep fabric pickup and delivery across Lahore (DHA, Gulberg, Model Town, Cantt, Johar Town, Bahria, etc.).
   - Standard turnaround: 5 to 7 days for pret/casual; 2 to 3 weeks for bridal/ceremonial with express options.
   - Direct WhatsApp order & consultation line: +92 335 2209991 (0335-2209991).
5. Real-Time Google Search Grounding:
   - You have access to Google Search data. When asked about current Pakistani fashion trends, upcoming wedding season styles, designer lawn/winter releases (e.g., Sana Safinaz, Maria.B, Asim Jofa, Elan, Suffuse, Zara Shahjahan), colors of the season, or fabric market rates in Lahore (Liberty, Ichhra, Anarkali), use search to give fresh, accurate, and trendsetting advice!
   - Ground your answers with real fashion insights, silhouettes, and styling recommendations.

Tone & Style:
- Warm, sophisticated, polite, and authoritative on South Asian and bespoke fashion.
- Welcoming with authentic Pakistani hospitality (e.g., "Assalam-o-Alaikum", "Khushamdeed").
- Seamlessly understand both English and Roman Urdu / Urdu fashion terms (e.g., daman, gala, bazu, tilla, kali, dupatta, churidar).
- Format responses clearly using markdown (headings, bullet points, bold accents).
- When appropriate, encourage the client to send their design inspiration or book an appointment via WhatsApp (+92 335 2209991).`;

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// POST /api/chat
app.post('/api/chat', async (req, res) => {
  try {
    const {
      messages,
      model = 'gemini-3.5-flash',
      enableSearch = true,
    } = req.body as {
      messages: ChatMessage[];
      model?: string;
      enableSearch?: boolean;
    };

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'A non-empty messages array is required.' });
    }

    const ai = getGenAI();

    // Map allowed models according to guidelines
    let selectedModel = 'gemini-3.5-flash';
    if (model === 'gemini-3.1-pro-preview') {
      selectedModel = 'gemini-3.1-pro-preview';
    } else if (model === 'gemini-3.1-flash-lite') {
      selectedModel = 'gemini-3.1-flash-lite';
    } else if (model === 'gemini-3.8-flash') {
      selectedModel = 'gemini-3.8-flash';
    }

    // Format contents for multi-turn chat
    const formattedContents = messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    // Configure tools: Google Search if enabled
    const tools: any[] = [];
    if (enableSearch) {
      tools.push({ googleSearch: {} });
    }

    let response;
    try {
      response = await ai.models.generateContent({
        model: selectedModel,
        contents: formattedContents,
        config: {
          systemInstruction: ATELIER_SYSTEM_INSTRUCTION,
          ...(tools.length > 0 ? { tools } : {}),
        },
      });
    } catch (genError: any) {
      // If 503 or transient failure on primary model, try fallback model
      const errString = String(genError?.message || genError);
      if (errString.includes('503') || errString.includes('UNAVAILABLE')) {
        console.warn(`Primary model ${selectedModel} returned 503. Retrying with gemini-3.5-flash...`);
        response = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: formattedContents,
          config: {
            systemInstruction: ATELIER_SYSTEM_INSTRUCTION,
            ...(tools.length > 0 ? { tools } : {}),
          },
        });
        selectedModel = 'gemini-3.5-flash';
      } else {
        throw genError;
      }
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

    return res.status(isQuotaExceeded ? 429 : 500).json({
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

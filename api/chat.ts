import { GoogleGenAI } from '@google/genai';
import { ATELIER_SYSTEM_INSTRUCTION } from '../src/constants/atelierPrompt';

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

export default async function handler(req: any, res: any) {
  // CORS support for Vercel Serverless
  if (res.setHeader) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
  }

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const {
      messages,
      model = 'gemini-2.5-flash',
      enableSearch = true,
    } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'A non-empty messages array is required.' });
    }

    // Safely check if Gemini API key is configured
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length === 0) {
      // Graceful JSON error message instead of throwing an unhandled exception or 500 server crash
      return res.status(200).json({
        error: 'Gemini API key is not configured. Please add GEMINI_API_KEY or VITE_GEMINI_API_KEY in your deployment environment or Settings > Secrets.',
        isApiKeyMissing: true,
        isQuotaExceeded: false,
        model: 'gemini-2.5-flash',
      });
    }

    const ai = getGenAI(apiKey.trim());

    // Map model ID ensuring valid identifier (e.g. gemini-2.5-flash)
    let selectedModel = 'gemini-2.5-flash';
    if (model === 'gemini-2.5-flash' || model === 'gemini-1.5-flash') {
      selectedModel = 'gemini-2.5-flash';
    } else if (model === 'gemini-3.8-flash') {
      selectedModel = 'gemini-3.8-flash';
    } else if (model === 'gemini-3.1-pro-preview') {
      selectedModel = 'gemini-3.1-pro-preview';
    } else if (model === 'gemini-3.1-flash-lite') {
      selectedModel = 'gemini-3.1-flash-lite';
    }

    const formattedContents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

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
      const errString = String(genError?.message || genError);
      // If 503 or transient unavailability, try fallback to gemini-2.5-flash
      if ((errString.includes('503') || errString.includes('UNAVAILABLE')) && selectedModel !== 'gemini-2.5-flash') {
        console.warn(`Primary model ${selectedModel} unavailable. Retrying with gemini-2.5-flash...`);
        response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: formattedContents,
          config: {
            systemInstruction: ATELIER_SYSTEM_INSTRUCTION,
            ...(tools.length > 0 ? { tools } : {}),
          },
        });
        selectedModel = 'gemini-2.5-flash';
      } else {
        throw genError;
      }
    }

    const replyText = response?.text || 'I apologize, but I could not generate a response. Please try again.';
    const candidate = response?.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;
    const groundingChunks = groundingMetadata?.groundingChunks || [];
    const webSearchQueries = groundingMetadata?.webSearchQueries || [];

    return res.status(200).json({
      text: replyText,
      model: selectedModel,
      groundingChunks,
      webSearchQueries,
      hasSearchGrounding: Boolean(groundingChunks && groundingChunks.length > 0),
    });
  } catch (error: any) {
    console.error('Error in Vercel /api/chat handler:', error);
    const rawMessage = error?.message || 'An unexpected error occurred while communicating with Gemini API.';
    let cleanMessage = rawMessage;
    let isQuotaExceeded = false;
    let isApiKeyMissing = rawMessage.includes('GEMINI_API_KEY') || rawMessage.includes('API key');

    try {
      const parsed = JSON.parse(rawMessage);
      if (parsed?.error?.code === 429 || parsed?.error?.status === 'RESOURCE_EXHAUSTED') {
        isQuotaExceeded = true;
        cleanMessage = 'Gemini API quota exceeded for your current key. Please select a billing-enabled key in Settings > Secrets.';
      } else if (parsed?.error?.message) {
        cleanMessage = parsed.error.message;
      }
    } catch {
      if (rawMessage.includes('429') || rawMessage.includes('RESOURCE_EXHAUSTED')) {
        isQuotaExceeded = true;
        cleanMessage = 'Gemini API quota exceeded for your current key. Please select a billing-enabled key in Settings > Secrets.';
      }
    }

    // Return structured error without crashing runtime or throwing 500
    const statusCode = isQuotaExceeded ? 429 : 200;
    return res.status(statusCode).json({
      error: cleanMessage,
      isQuotaExceeded,
      isApiKeyMissing,
    });
  }
}


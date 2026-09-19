import { GoogleGenAI } from '@google/genai';
import { ATELIER_SYSTEM_INSTRUCTION } from '../src/constants/atelierPrompt';

let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY or VITE_GEMINI_API_KEY is not configured in environment variables.');
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

    const ai = getGenAI();

    // Map model ID ensuring valid identifier
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

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: formattedContents,
      config: {
        systemInstruction: ATELIER_SYSTEM_INSTRUCTION,
        ...(tools.length > 0 ? { tools } : {}),
      },
    });

    const replyText = response.text || 'I apologize, but I could not generate a response. Please try again.';
    const candidate = response.candidates?.[0];
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
    let isApiKeyMissing = rawMessage.includes('GEMINI_API_KEY');

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

    return res.status(isQuotaExceeded ? 429 : 500).json({
      error: cleanMessage,
      isQuotaExceeded,
      isApiKeyMissing,
    });
  }
}

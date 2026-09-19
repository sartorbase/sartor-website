import { GoogleGenAI } from '@google/genai';

// Inlined to guarantee zero relative module resolution errors in Vercel Serverless Node ESM environments
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
   - When asked about current Pakistani fashion trends, upcoming wedding season styles, designer lawn/winter releases, colors of the season, or fabric market rates in Lahore (Liberty, Ichhra, Anarkali), provide fresh, accurate, and trendsetting advice!
   - Ground your answers with real fashion insights, silhouettes, and styling recommendations.

Tone & Style:
- Warm, sophisticated, polite, and authoritative on South Asian and bespoke fashion.
- Welcoming with authentic Pakistani hospitality (e.g., "Assalam-o-Alaikum", "Khushamdeed").
- Seamlessly understand both English and Roman Urdu / Urdu fashion terms (e.g., daman, gala, bazu, tilla, kali, dupatta, churidar).
- Format responses clearly using markdown (headings, bullet points, bold accents).
- When appropriate, encourage the client to send their design inspiration or book an appointment via WhatsApp (+92 335 2209991).`;

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

    // 1. Robust Environment Variable Check
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length === 0) {
      // Return 200 JSON payload with graceful fallback message instead of throwing an unhandled exception or 500 error
      return res.status(200).json({
        text: "Assalam-o-Alaikum! Welcome to Sartor Atelier. Our AI Fashion Stylist is currently preparing consultations. For immediate bespoke design inquiries, fabric yardage estimates, and stitching bookings, please contact our Master Tailors at Moon Tower, Model Town, Lahore directly via WhatsApp at 0335-2209991.",
        error: 'Gemini API key is not configured. Please set GEMINI_API_KEY or VITE_GEMINI_API_KEY in your environment variables.',
        isApiKeyMissing: true,
        isQuotaExceeded: false,
        model: 'gemini-2.5-flash',
        groundingChunks: [],
        webSearchQueries: [],
        hasSearchGrounding: false,
      });
    }

    // 2. SDK Version & Model Verification
    const ai = getGenAI(apiKey.trim());
    const selectedModel = 'gemini-2.5-flash';

    const formattedContents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text || '' }],
    }));

    // 3. Search Grounding / Tool Configuration
    // Official Gemini SDK schema: tools: [{ googleSearch: {} }]
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
    } catch (sdkError: any) {
      console.error('Gemini SDK generateContent error in /api/chat:', sdkError);
      const rawMessage = sdkError?.message || 'Gemini API call failed.';
      const isQuotaExceeded =
        rawMessage.includes('429') ||
        rawMessage.includes('RESOURCE_EXHAUSTED') ||
        sdkError?.status === 429;
      const isApiKeyMissing =
        rawMessage.includes('GEMINI_API_KEY') ||
        rawMessage.includes('API key') ||
        rawMessage.includes('API_KEY_INVALID');

      let userFriendlyError = rawMessage;
      if (isQuotaExceeded) {
        userFriendlyError =
          'Gemini API quota exceeded for your current key. Please select a billing-enabled key in Settings > Secrets.';
      }

      // Return detailed JSON error details for debugging without throwing 500
      return res.status(200).json({
        text: `I apologize, but I encountered an issue connecting with the styling service (${userFriendlyError}). You can also reach our atelier directly on WhatsApp at 0335-2209991.`,
        error: userFriendlyError,
        details: {
          message: rawMessage,
          status: sdkError?.status,
          code: sdkError?.code,
        },
        isQuotaExceeded,
        isApiKeyMissing,
        model: selectedModel,
        groundingChunks: [],
        webSearchQueries: [],
        hasSearchGrounding: false,
      });
    }

    const replyText =
      response?.text ||
      'Assalam-o-Alaikum! How may I assist you with your bespoke tailoring and styling requirements today?';
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
    console.error('Unhandled exception in /api/chat handler:', error);
    // Never crash or return 500; always return a graceful JSON payload
    return res.status(200).json({
      text: 'Our AI Stylist is temporarily unavailable. Please contact Sartor Atelier directly at 0335-2209991.',
      error: error?.message || 'An unexpected error occurred.',
      details: String(error),
      isApiKeyMissing: false,
      isQuotaExceeded: false,
      model: 'gemini-2.5-flash',
    });
  }
}

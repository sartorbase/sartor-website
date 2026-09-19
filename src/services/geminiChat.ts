import { GoogleGenAI } from '@google/genai';
import { ATELIER_SYSTEM_INSTRUCTION } from '../constants/atelierPrompt';
import { ChatMessage, ChatRequestPayload, ChatResponsePayload, GeminiChatModel } from '../types/chat';

// Note: Client-side Gemini API key support via import.meta.env.VITE_GEMINI_API_KEY as requested.
// WARNING: Whenever possible in production, prefer server-side routes (/api/chat) to protect API keys.
function getClientApiKey(): string | undefined {
  try {
    const viteKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (viteKey && typeof viteKey === 'string' && viteKey.trim().length > 0) {
      return viteKey.trim();
    }
  } catch {
    // ignore
  }

  try {
    if (typeof process !== 'undefined' && process.env) {
      const pKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
      if (pKey && typeof pKey === 'string' && pKey.trim().length > 0) {
        return pKey.trim();
      }
    }
  } catch {
    // ignore
  }

  return undefined;
}

// Map requested model to a valid Gemini API model identifier
function resolveModelId(requestedModel?: string): string {
  if (!requestedModel) return 'gemini-2.5-flash';
  if (requestedModel === 'gemini-2.5-flash' || requestedModel === 'gemini-1.5-flash') {
    return 'gemini-2.5-flash';
  }
  if (requestedModel === 'gemini-3.8-flash') {
    return 'gemini-3.8-flash';
  }
  if (requestedModel === 'gemini-3.1-pro-preview') {
    return 'gemini-3.1-pro-preview';
  }
  if (requestedModel === 'gemini-3.1-flash-lite') {
    return 'gemini-3.1-flash-lite';
  }
  return 'gemini-2.5-flash';
}

/**
 * Direct client-side execution with Gemini API using import.meta.env.VITE_GEMINI_API_KEY
 */
async function executeClientSideChat(
  history: ChatMessage[],
  newMessage: string,
  options?: {
    model?: GeminiChatModel;
    enableSearch?: boolean;
    signal?: AbortSignal;
  }
): Promise<ChatResponsePayload> {
  const apiKey = getClientApiKey();
  if (!apiKey) {
    throw new Error(
      'Gemini API key is missing. Please set VITE_GEMINI_API_KEY in your environment (.env / Settings > Secrets) or ensure the /api/chat server route is deployed.'
    );
  }

  const modelId = resolveModelId(options?.model);
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build-client',
      },
    },
  });

  const formattedContents = [
    ...history.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    })),
    {
      role: 'user',
      parts: [{ text: newMessage }],
    },
  ];

  const tools: any[] = [];
  if (options?.enableSearch !== false) {
    tools.push({ googleSearch: {} });
  }

  try {
    const response = await ai.models.generateContent({
      model: modelId,
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

    return {
      text: replyText,
      model: modelId,
      groundingChunks,
      webSearchQueries,
      hasSearchGrounding: Boolean(groundingChunks && groundingChunks.length > 0),
    };
  } catch (apiError: any) {
    console.error('Client-side Gemini API execution error:', apiError);
    const parsedMessage = extractExactApiErrorMessage(apiError);
    throw new Error(parsedMessage);
  }
}

/**
 * Parses and extracts exact, human-readable API error messages
 */
function extractExactApiErrorMessage(error: any): string {
  if (!error) return 'An unknown error occurred while communicating with Gemini API.';

  const rawMessage = typeof error === 'string' ? error : error?.message || String(error);

  // Try parsing JSON error response often returned by Google GenAI HTTP errors
  try {
    const parsed = JSON.parse(rawMessage);
    if (parsed?.error) {
      const code = parsed.error.code;
      const status = parsed.error.status;
      const msg = parsed.error.message;

      if (code === 429 || status === 'RESOURCE_EXHAUSTED') {
        return `Gemini API quota exceeded (429 RESOURCE_EXHAUSTED): ${msg || 'Rate limit reached. Please verify billing in Google AI Studio or use another key.'}`;
      }
      if (code === 403 || status === 'PERMISSION_DENIED') {
        return `Gemini API Permission Denied (403): ${msg || 'The provided API key does not have permission to access this model.'}`;
      }
      if (code === 400 || status === 'INVALID_ARGUMENT') {
        return `Gemini API Invalid Argument (400): ${msg || 'Bad request or unsupported parameters.'}`;
      }
      if (code === 404 || status === 'NOT_FOUND') {
        return `Gemini API Model Not Found (404): ${msg || 'The requested model could not be found. Please use gemini-2.5-flash.'}`;
      }
      if (msg) return msg;
    }
  } catch {
    // Not raw JSON
  }

  if (rawMessage.includes('429') || rawMessage.includes('RESOURCE_EXHAUSTED')) {
    return 'Gemini API quota exceeded (429): If you are using a free tier key, you can upgrade your plan or select a billing-enabled key in Settings > Secrets.';
  }
  if (rawMessage.includes('API_KEY_INVALID') || rawMessage.includes('API key not valid')) {
    return 'The provided Gemini API key is invalid. Please check your VITE_GEMINI_API_KEY in Settings > Secrets.';
  }
  if (rawMessage.includes('Failed to fetch') || rawMessage.includes('NetworkError')) {
    return 'Network connection error: Unable to reach Gemini API servers. Please check your internet connection.';
  }

  return rawMessage;
}

export async function sendChatMessage(
  history: ChatMessage[],
  newMessage: string,
  options?: {
    model?: GeminiChatModel;
    enableSearch?: boolean;
    signal?: AbortSignal;
  }
): Promise<ChatResponsePayload> {
  const modelToUse = resolveModelId(options?.model);
  const clientKey = getClientApiKey();

  // Prepare server payload
  const payloadMessages = [
    ...history.map((m) => ({
      role: m.role,
      text: m.text,
    })),
    {
      role: 'user' as const,
      text: newMessage,
    },
  ];

  const payload: ChatRequestPayload = {
    messages: payloadMessages,
    model: modelToUse as GeminiChatModel,
    enableSearch: options?.enableSearch !== false,
  };

  let serverResponse: Response | null = null;
  let serverHttpError: string | null = null;
  let is404NotFound = false;

  try {
    serverResponse = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: options?.signal,
    });

    if (serverResponse.ok) {
      return await serverResponse.json();
    }

    is404NotFound = serverResponse.status === 404;
    const errorJson = await serverResponse.json().catch(() => null);

    if (errorJson && errorJson.error) {
      serverHttpError = errorJson.error;
    } else {
      serverHttpError = `Server responded with status ${serverResponse.status} (${serverResponse.statusText || 'Error'})`;
    }
  } catch (fetchErr: any) {
    console.warn('/api/chat fetch failed or unavailable:', fetchErr?.message);
    serverHttpError = fetchErr?.message || 'Failed to reach /api/chat';
    // If running in an environment without server backend, flag for client fallback
    is404NotFound = true;
  }

  // If server route returned 404 (or failed to connect) and we have client-side key, fallback seamlessly
  if ((is404NotFound || serverResponse?.status === 404) && clientKey) {
    console.info('/api/chat returned 404; seamlessly executing via client-side VITE_GEMINI_API_KEY with model:', modelToUse);
    return await executeClientSideChat(history, newMessage, options);
  }

  // If 404 occurred and no client key is configured, provide an actionable explanation
  if (is404NotFound || serverResponse?.status === 404) {
    throw new Error(
      `Endpoint /api/chat was not found (404). If running client-side or on Vercel/static hosting, ensure VITE_GEMINI_API_KEY is configured in your environment or Settings > Secrets. (Model: ${modelToUse})`
    );
  }

  // Otherwise throw the surfaced exact server error
  throw new Error(serverHttpError || 'An unexpected error occurred during chat query submission.');
}

export function openSartorChat(prompt?: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-sartor-chat', { detail: { prompt } }));
  }
}

export type GeminiChatModel =
  | 'gemini-2.5-flash'
  | 'gemini-3.8-flash'
  | 'gemini-3.1-pro-preview'
  | 'gemini-3.1-flash-lite'
  | 'gemini-1.5-flash';

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface ChatMessage {
  id?: string;
  role: 'user' | 'model';
  text: string;
  timestamp?: number | Date;
  groundingSources?: GroundingSource[];
  modelUsed?: string;
}

export interface ChatRequestPayload {
  messages: Array<{
    role: 'user' | 'model';
    text: string;
  }>;
  model?: GeminiChatModel;
  enableSearch?: boolean;
}

export interface ChatResponsePayload {
  text: string;
  model?: string;
  modelUsed?: string;
  groundingChunks?: Array<{
    web?: {
      uri: string;
      title: string;
    };
  }>;
  groundingSources?: GroundingSource[];
  webSearchQueries?: string[];
  hasSearchGrounding?: boolean;
  error?: string;
  isApiKeyMissing?: boolean;
  isQuotaExceeded?: boolean;
}

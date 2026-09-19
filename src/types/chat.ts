export type GeminiChatModel =
  | 'gemini-2.5-flash'
  | 'gemini-1.5-flash'
  | 'gemini-3.8-flash'
  | 'gemini-3.1-pro-preview'
  | 'gemini-3.1-flash-lite';

export interface GroundingChunkWeb {
  uri?: string;
  title?: string;
}

export interface GroundingChunk {
  web?: GroundingChunkWeb;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  groundingChunks?: GroundingChunk[];
  webSearchQueries?: string[];
  isError?: boolean;
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
  model: string;
  groundingChunks?: GroundingChunk[];
  webSearchQueries?: string[];
  hasSearchGrounding?: boolean;
  error?: string;
}

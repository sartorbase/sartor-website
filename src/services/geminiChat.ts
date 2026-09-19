import { ChatMessage, ChatRequestPayload, ChatResponsePayload, GeminiChatModel } from '../types/chat';

export async function sendChatMessage(
  history: ChatMessage[],
  newMessage: string,
  options?: {
    model?: GeminiChatModel;
    enableSearch?: boolean;
    signal?: AbortSignal;
  }
): Promise<ChatResponsePayload> {
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
    model: options?.model || 'gemini-3.5-flash',
    enableSearch: options?.enableSearch !== false,
  };

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    signal: options?.signal,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.error || `Server responded with status ${response.status}`;
    throw new Error(message);
  }

  return response.json();
}

export function openSartorChat(prompt?: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-sartor-chat', { detail: { prompt } }));
  }
}

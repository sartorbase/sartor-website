import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  Sparkles,
  Bot,
  User,
  ExternalLink,
  ChevronDown,
  RefreshCw,
  Search,
  CheckCircle,
} from 'lucide-react';
import { useChatUI } from '../../context/ChatUIContext';
import { sendGeminiChatMessage, openSartorChat } from '../../services/geminiChat';
import { ChatMessage, GroundingSource, GeminiChatModel } from '../../types/chat';
import { buildWhatsAppLink } from '../../services/analytics';

const QUICK_PROMPTS = [
  'How much fabric do I need for a 16-kali kalidar?',
  'What is the difference between Zardozi and Dabka?',
  'What are your stitching rates in Lahore?',
  'How do I take my shoulder and chest measurements?',
  'Can I send fabric via doorstep pickup in Model Town / DHA?',
];

export const GeminiChatbot: React.FC = () => {
  const { isChatOpen, closeChat, openChat, initialPrompt } = useChatUI();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      text: `Assalam-o-Alaikum! I am your SARTOR Atelier AI Stylist & Master Cutter Assistant.\n\nWhether you need advice on fabric yardage for a kalidar, embroidery styles (Zardozi vs Dabka), tailoring pricing in Lahore, or how to measure at home—ask me anything!`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [enableSearch, setEnableSearch] = useState(true);
  const [selectedModel, setSelectedModel] = useState<GeminiChatModel>('gemini-2.5-flash');
  const [errorText, setErrorText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen to open-sartor-chat custom event
  useEffect(() => {
    const handleOpenChatEvent = (e: any) => {
      const prompt = e.detail?.prompt;
      openChat(prompt);
      if (prompt) {
        setInputValue(prompt);
      }
    };
    window.addEventListener('open-sartor-chat', handleOpenChatEvent);
    return () => window.removeEventListener('open-sartor-chat', handleOpenChatEvent);
  }, [openChat]);

  // Handle initialPrompt from context
  useEffect(() => {
    if (initialPrompt && isChatOpen) {
      setInputValue(initialPrompt);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [initialPrompt, isChatOpen]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    setErrorText(null);
    setInputValue('');

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date(),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const response = await sendGeminiChatMessage(messages, query, {
        model: selectedModel,
        enableSearch,
      });

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: response.text,
        groundingSources: response.groundingSources,
        modelUsed: response.modelUsed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorText(err.message || 'Failed to receive advice from Atelier AI. Please try again.');
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-msg-${Date.now()}`,
        role: 'model',
        text: `Chat reset. Assalam-o-Alaikum! How may our Lahore Master Atelier assist you today?`,
        timestamp: new Date(),
      },
    ]);
    setErrorText(null);
  };

  if (!isChatOpen) {
    return (
      <div className="fixed bottom-6 left-6 z-30 print:hidden">
        <button
          onClick={() => openChat()}
          aria-label="Open AI Atelier Stylist Chat"
          className="flex items-center gap-2.5 px-4 py-3 bg-stone-900/90 hover:bg-stone-850 text-amber-300 rounded-full shadow-2xl shadow-stone-950/80 border border-amber-500/30 hover:border-amber-400 transition-all group cursor-pointer backdrop-blur-md"
        >
          <Sparkles className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span className="text-xs uppercase tracking-wider font-bold">
            Ask AI Atelier Stylist
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm print:hidden animate-fade-in">
      <div className="relative w-full max-w-2xl h-[90vh] max-h-[750px] bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-100">
        {/* Header */}
        <div className="px-5 py-3.5 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold font-serif text-stone-100">
                  SARTOR AI Stylist &amp; Cutter
                </h3>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                Lahore Atelier Guidance • Fabric Yardage • Sizing • Rates
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleResetChat}
              title="Reset conversation"
              className="p-2 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={closeChat}
              title="Close chat"
              className="p-2 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Grounding Bar & Model Tag */}
        <div className="px-4 py-2 bg-stone-950/60 border-b border-stone-850 flex items-center justify-between text-xs text-stone-400">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={enableSearch}
              onChange={(e) => setEnableSearch(e.target.checked)}
              className="rounded bg-stone-800 border-stone-700 text-amber-500 focus:ring-amber-500 w-3.5 h-3.5"
            />
            <span className="flex items-center gap-1">
              <Search className="w-3 h-3 text-amber-400" />
              <span>Google Search Grounding (Live Fashion &amp; Prices)</span>
            </span>
          </label>
          <span className="font-mono text-[10px] text-stone-500">
            Model: {selectedModel}
          </span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isModel = msg.role === 'model';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isModel ? 'items-start' : 'items-start flex-row-reverse'}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    isModel
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-stone-700 text-stone-200'
                  }`}
                >
                  {isModel ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isModel
                      ? 'bg-stone-850 text-stone-200 border border-stone-800 rounded-tl-sm shadow-md'
                      : 'bg-amber-600 text-stone-950 font-medium rounded-tr-sm shadow-md shadow-amber-950/30'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans">{msg.text}</div>

                  {/* Grounding Sources */}
                  {msg.groundingSources && msg.groundingSources.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-stone-750 text-xs">
                      <div className="text-[11px] font-semibold text-amber-400/90 mb-1 flex items-center gap-1">
                        <Search className="w-3 h-3" />
                        <span>Grounding References:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.groundingSources.map((source, idx) => (
                          <a
                            key={idx}
                            href={source.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stone-900 hover:bg-stone-800 text-[11px] text-amber-300 border border-stone-750 transition-colors"
                          >
                            <span className="truncate max-w-[150px]">{source.title || 'Source'}</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* WhatsApp Action Button if recommended */}
                  {isModel && (
                    <div className="mt-3 pt-2 border-t border-stone-800 flex justify-end">
                      <a
                        href={buildWhatsAppLink(
                          `Assalam-o-Alaikum SARTOR Atelier,\nI am following up on recommendations from the AI Stylist:\n"${msg.text.slice(0, 160)}..."`,
                          'chat_recommendation'
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-300 border border-emerald-600/40 text-xs font-semibold transition-colors"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Send to WhatsApp (0335-2209991)</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-stone-850 rounded-2xl rounded-tl-sm px-4 py-3 border border-stone-800 flex items-center gap-2.5 text-xs text-stone-400">
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span>Consulting atelier cutting archives &amp; pattern logs...</span>
              </div>
            </div>
          )}

          {errorText && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs leading-relaxed">
              <strong>Error:</strong> {errorText}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-stone-950/80 border-t border-stone-850 overflow-x-auto no-scrollbar flex items-center gap-2">
          <span className="text-[11px] text-stone-500 shrink-0 font-medium">Quick suggestions:</span>
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-xs whitespace-nowrap px-2.5 py-1 rounded-full bg-stone-850 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800 hover:border-amber-500/30 transition-colors cursor-pointer shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-stone-950 border-t border-stone-800 flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Ask about fabrics, custom stitching rates, yardage, or measurements..."
            className="flex-1 bg-stone-850 border border-stone-750 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder:text-stone-500 outline-none transition-all disabled:opacity-50"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send message"
            className="px-4 py-3 bg-amber-500 hover:bg-amber-400 disabled:bg-stone-800 text-stone-950 font-bold rounded-xl shadow-md transition-all flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:text-stone-600"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

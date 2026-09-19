import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import {
  Bot,
  User,
  Send,
  Sparkles,
  Search,
  Globe,
  ExternalLink,
  RotateCcw,
  X,
  Copy,
  Check,
  MessageSquare,
  ChevronDown,
  Minimize2,
  Maximize2,
  AlertCircle,
  Loader2,
  Info,
} from 'lucide-react';
import { ChatMessage, GeminiChatModel, GroundingChunk } from '../../types/chat';
import { sendChatMessage } from '../../services/geminiChat';
import { buildWhatsAppLink, SARTOR_PHONE_LOCAL } from '../../services/analytics';
import { useChatUI } from '../../context/ChatUIContext';
import { SartorLogo } from '../atoms/SartorLogo';

interface GeminiChatbotProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  initialPrompt?: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    role: 'model',
    text: `**Assalam-o-Alaikum! Khushamdeed to SARTOR.**\n\nI am your **AI Atelier Stylist & Tailoring Consultant**, backed by real-time Google Search data. I can help you with:\n\n- **Real-Time Pakistani Bridal & Festive Trends:** Trending 2026 lehenga shades, neckline embroidery, and designer cuts.\n- **SARTOR Stitching Rates (PKR):** Transparent pricing for simple suits (2.5k), double suits (4k), kalidar frocks (7k), sarees (7k), and royal bridal sets (10k).\n- **Fabric Yardage Calculation:** Accurate meter/yard estimates for kalidar frocks, flared maxis, sarees, and suits.\n- **Doorstep Pick & Drop:** Booking fabric collection anywhere in Lahore.\n\nHow may I assist your wardrobe today?`,
    timestamp: 'Just now',
  },
];

const SUGGESTED_PROMPTS = [
  'What are the trending bridal lehenga colors & fabrics for 2026 in Lahore?',
  'How much fabric do I need for a 16-kali kalidar frock?',
  'What is SARTOR’s stitching rate for a Banarsi saree with padded blouse?',
  'How does SARTOR custom sizing compare to Khaadi & Sapphire Medium?',
  'How do I book doorstep fabric pickup in DHA or Gulberg?',
];

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  isOpen: controlledIsOpen,
  onOpenChange,
  onClose,
  initialPrompt,
}) => {
  const {
    isChatOpen: contextIsOpen,
    setIsChatOpen: setContextIsOpen,
    chatPrompt,
    setChatPrompt,
  } = useChatUI();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen =
    controlledIsOpen !== undefined
      ? controlledIsOpen
      : (contextIsOpen || internalIsOpen);

  const effectivePrompt = initialPrompt || chatPrompt;

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('sartor_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // Fallback to initial
      }
    }
    return INITIAL_MESSAGES;
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState<GeminiChatModel>('gemini-2.5-flash');
  const [enableSearch, setEnableSearch] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sartor_chat_history', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Apply initial prompt if passed
  useEffect(() => {
    if (effectivePrompt && isOpen) {
      setInput(effectivePrompt);
      if (setChatPrompt) setChatPrompt(null);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 120);
    }
  }, [effectivePrompt, isOpen, setChatPrompt]);

  // Listen for global open-sartor-chat custom events
  useEffect(() => {
    const handleCustomOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ prompt?: string }>;
      setInternalIsOpen(true);
      setContextIsOpen(true);
      onOpenChange?.(true);
      if (customEvent.detail?.prompt) {
        setInput(customEvent.detail.prompt);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 150);
      }
    };
    window.addEventListener('open-sartor-chat', handleCustomOpen);
    return () => window.removeEventListener('open-sartor-chat', handleCustomOpen);
  }, [setContextIsOpen, onOpenChange]);

  const handleToggle = () => {
    const next = !isOpen;
    if (controlledIsOpen !== undefined && onClose && !next) {
      onClose();
    } else {
      setInternalIsOpen(next);
      setContextIsOpen(next);
      onOpenChange?.(next);
    }
  };

  const handleClose = () => {
    setInternalIsOpen(false);
    setContextIsOpen(false);
    onClose?.();
    onOpenChange?.(false);
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    setInput('');
    setErrorMessage(null);

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(messages, query, {
        model,
        enableSearch,
      });

      const modelMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundingChunks: response.groundingChunks,
        webSearchQueries: response.webSearchQueries,
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      const errorText =
        err?.message || 'Unable to connect to Sartor AI Stylist. Please verify your connection or contact us via WhatsApp.';
      setErrorMessage(errorText);

      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: `**Notice:** ${errorText}\n\nYou can also speak directly with our Master Tailor at Moon Tower on WhatsApp at [0335-2209991](${buildWhatsAppLink(
          `Assalam-o-Alaikum, I would like tailoring advice: ${query}`,
          'chatbot'
        )}).`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Reset conversation history with Sartor AI Stylist?')) {
      setMessages(INITIAL_MESSAGES);
      localStorage.removeItem('sartor_chat_history');
      setErrorMessage(null);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDomain = (url?: string) => {
    if (!url) return '';
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain;
    } catch {
      return url;
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Always visible on bottom-right, paired with WhatsApp) */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-24 right-6 z-40"
        >
          <button
            onClick={handleToggle}
            id="open-gemini-chatbot-btn"
            className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-stone-900/95 border border-amber-500/40 hover:border-amber-400 text-stone-100 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 cursor-pointer backdrop-blur-md"
            aria-label="Open Sartor AI Stylist Chatbot"
          >
            <div className="relative shrink-0">
              <SartorLogo variant="emblem" size="xs" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-stone-950" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                  Sartor AI Stylist
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Google Search
                </span>
              </div>
              <p className="text-[10px] text-stone-400">Ask trends, yardage & rates</p>
            </div>
          </button>
        </motion.div>
      )}

      {/* Main Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed z-50 flex flex-col bg-stone-950 border border-stone-800 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 ${
              isExpanded
                ? 'inset-4 sm:inset-10 max-w-4xl mx-auto'
                : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[460px] h-[640px] max-h-[85vh]'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 bg-stone-900/90 border-b border-stone-800 text-stone-200">
              <div className="flex items-center gap-2.5">
                <div className="relative shrink-0">
                  <SartorLogo variant="chat" size="sm" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-stone-950" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-serif font-bold text-stone-100">
                      SARTOR AI Stylist
                    </h3>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 flex items-center gap-1">
                      <Search className="w-2.5 h-2.5" />
                      Live Search
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-400">
                    Moon Tower Atelier • {model}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-stone-400">
                <button
                  onClick={handleClearHistory}
                  title="Clear conversation"
                  className="p-1.5 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                  aria-label="Clear chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? 'Restore size' : 'Expand window'}
                  className="p-1.5 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer hidden sm:block"
                  aria-label="Toggle full size"
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleClose}
                  title="Close chat"
                  className="p-1.5 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Controls Sub-Bar: Model & Search Grounding Toggle */}
            <div className="px-4 py-2 bg-stone-900/40 border-b border-stone-800/60 flex items-center justify-between text-xs text-stone-400 gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-wider text-stone-500 font-mono">
                  Model:
                </span>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value as GeminiChatModel)}
                  className="bg-stone-800 text-stone-200 text-[11px] rounded px-2 py-0.5 border border-stone-700 outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="gemini-2.5-flash">Gemini 2.5 Flash (Recommended)</option>
                  <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                  <option value="gemini-3.8-flash">Gemini 3.8 Flash</option>
                  <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Deep Reasoning)</option>
                  <option value="gemini-3.1-flash-lite">Gemini 3.1 Lite (Fast)</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setEnableSearch(!enableSearch)}
                className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                  enableSearch
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                    : 'bg-stone-800 border-stone-700 text-stone-400'
                }`}
                title="Toggle Google Search live web grounding"
              >
                <Globe className="w-3 h-3" />
                <span>Google Search: {enableSearch ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            {/* Message Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-stone-400 font-mono">
                      {isUser ? (
                        <>
                          <span>You</span>
                          <span>•</span>
                          <span>{msg.timestamp}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-amber-400 font-serif font-bold">SARTOR Stylist</span>
                          <span>•</span>
                          <span>{msg.timestamp}</span>
                        </>
                      )}
                    </div>

                    <div
                      className={`relative group max-w-[88%] sm:max-w-[82%] rounded-2xl p-3.5 sm:p-4 leading-relaxed ${
                        isUser
                          ? 'bg-amber-600 text-stone-50 rounded-tr-sm'
                          : msg.isError
                          ? 'bg-red-950/70 border border-red-800 text-red-200 rounded-tl-sm'
                          : 'bg-stone-900 border border-stone-800 text-stone-200 rounded-tl-sm shadow-md'
                      }`}
                    >
                      {/* Markdown Body */}
                      <div className="markdown-body space-y-2 prose prose-invert prose-xs sm:prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0.5 prose-strong:text-amber-300">
                        <Markdown>{msg.text}</Markdown>
                      </div>

                      {/* Google Search Grounding Sources / Citations */}
                      {msg.groundingChunks && msg.groundingChunks.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-stone-800/80">
                          <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-mono mb-2">
                            <Search className="w-3 h-3" />
                            <span>Grounded with Google Search data</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.groundingChunks
                              .filter((c) => c.web?.uri)
                              .slice(0, 4)
                              .map((chunk, idx) => {
                                const uri = chunk.web?.uri;
                                const title = chunk.web?.title || formatDomain(uri);
                                return (
                                  <a
                                    key={idx}
                                    href={uri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-stone-800/90 hover:bg-stone-700 text-stone-300 hover:text-stone-100 text-[10px] border border-stone-700 transition-colors"
                                  >
                                    <Globe className="w-2.5 h-2.5 text-amber-400" />
                                    <span className="truncate max-w-[140px] sm:max-w-[180px]">
                                      {title}
                                    </span>
                                    <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-60" />
                                  </a>
                                );
                              })}
                          </div>
                        </div>
                      )}

                      {/* Web Search Queries Used */}
                      {msg.webSearchQueries && msg.webSearchQueries.length > 0 && (
                        <div className="mt-2 text-[10px] text-stone-400 flex flex-wrap items-center gap-1 font-mono">
                          <span className="text-stone-400">Searched:</span>
                          {msg.webSearchQueries.map((q, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-0.5 rounded bg-stone-800/60 text-stone-300 border border-stone-700/60"
                            >
                              "{q}"
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Message actions (Copy / WhatsApp order consultation) */}
                      {!isUser && (
                        <div className="mt-3 pt-2 border-t border-stone-800/50 flex items-center justify-between text-[11px] text-stone-400">
                          <button
                            onClick={() => handleCopyText(msg.id, msg.text)}
                            className="flex items-center gap-1 hover:text-stone-200 transition-colors cursor-pointer"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          <a
                            href={buildWhatsAppLink(
                              `Assalam-o-Alaikum SARTOR, I am consulting with your AI Stylist regarding: "${msg.text.slice(
                                0,
                                120
                              )}..." and would like to confirm my bespoke order.`,
                              'chatbot'
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                          >
                            <MessageSquare className="w-3 h-3 fill-current" />
                            <span>Discuss on WhatsApp</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-stone-400 font-mono">
                    <span className="text-amber-400 font-serif font-bold">SARTOR Stylist</span>
                    <span>•</span>
                    <span>Searching & Thinking...</span>
                  </div>
                  <div className="bg-stone-900 border border-stone-800 rounded-2xl rounded-tl-sm p-3.5 text-stone-300 flex items-center gap-3">
                    <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                    <div className="space-y-0.5">
                      <p className="text-xs text-stone-200 font-medium">
                        {enableSearch
                          ? 'Searching Google & consulting atelier archives...'
                          : 'Styling recommendation in progress...'}
                      </p>
                      <p className="text-[10px] text-stone-400">
                        Synthesizing cuts, measurements & fabric guidance
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Starter Chips */}
            {messages.length <= 2 && !isLoading && (
              <div className="px-4 py-2 border-t border-stone-800/80 bg-stone-900/30">
                <p className="text-[10px] font-mono text-stone-400 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                  <span>Suggested Stylist Questions:</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt)}
                      className="text-left text-[11px] px-2.5 py-1 rounded-full bg-stone-800/80 hover:bg-amber-950/50 hover:border-amber-500/50 text-stone-300 hover:text-amber-200 border border-stone-700/80 transition-colors cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Error Banner if API error is active */}
            {errorMessage && (
              <div className="px-3 py-2 bg-rose-950/90 border-t border-rose-800/80 text-rose-200 text-xs flex items-start justify-between gap-2">
                <div className="flex-1">
                  <span className="font-semibold text-rose-300">API Notice: </span>
                  <span className="break-words">{errorMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setErrorMessage(null)}
                  className="text-rose-400 hover:text-rose-200 p-0.5 cursor-pointer shrink-0"
                  title="Dismiss error notice"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Input Form */}
            <div className="p-3 bg-stone-900/90 border-t border-stone-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-end gap-2"
              >
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about 2026 trends, fabric meter yardage, bridal lehengas or rates..."
                    className="w-full resize-none rounded-xl bg-stone-800/90 border border-stone-700 px-3 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all max-h-28"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-md"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Ask AI</span>
                </button>
              </form>

              <div className="mt-1.5 flex items-center justify-between text-[10px] text-stone-400 px-1">
                <span>Direct WhatsApp: 0335-2209991 • Moon Tower, Model Town</span>
                <span>Press Enter ↵ to send</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

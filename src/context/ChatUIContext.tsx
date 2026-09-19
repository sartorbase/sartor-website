import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export interface ChatUIContextType {
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  openChat: (prompt?: string) => void;
  closeChat: () => void;
  toggleChat: () => void;
  chatPrompt: string | null;
  setChatPrompt: (prompt: string | null) => void;
}

const ChatUIContext = createContext<ChatUIContextType | undefined>(undefined);

export const ChatUIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isChatOpen, setIsChatOpenState] = useState(false);
  const [chatPrompt, setChatPrompt] = useState<string | null>(null);

  const setIsChatOpen = useCallback((open: boolean) => {
    setIsChatOpenState(open);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('sartor-chat-state-change', {
          detail: { isOpen: open },
        })
      );
    }
  }, []);

  const openChat = useCallback((prompt?: string) => {
    if (prompt) {
      setChatPrompt(prompt);
    }
    setIsChatOpen(true);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-sartor-chat', {
          detail: { prompt },
        })
      );
    }
  }, [setIsChatOpen]);

  const closeChat = useCallback(() => {
    setIsChatOpen(false);
  }, [setIsChatOpen]);

  const toggleChat = useCallback(() => {
    setIsChatOpenState((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('sartor-chat-state-change', {
            detail: { isOpen: next },
          })
        );
      }
      return next;
    });
  }, []);

  // Listen to window-level custom events in case components trigger via global helper
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ prompt?: string }>;
      if (customEvent.detail?.prompt) {
        setChatPrompt(customEvent.detail.prompt);
      }
      setIsChatOpenState(true);
    };

    const handleStateChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      if (typeof customEvent.detail?.isOpen === 'boolean') {
        setIsChatOpenState(customEvent.detail.isOpen);
      }
    };

    window.addEventListener('open-sartor-chat', handleOpen);
    window.addEventListener('sartor-chat-state-change', handleStateChange);
    return () => {
      window.removeEventListener('open-sartor-chat', handleOpen);
      window.removeEventListener('sartor-chat-state-change', handleStateChange);
    };
  }, []);

  return (
    <ChatUIContext.Provider
      value={{
        isChatOpen,
        setIsChatOpen,
        openChat,
        closeChat,
        toggleChat,
        chatPrompt,
        setChatPrompt,
      }}
    >
      {children}
    </ChatUIContext.Provider>
  );
};

export const useChatUI = (): ChatUIContextType => {
  const context = useContext(ChatUIContext);
  if (!context) {
    // Fallback if rendered outside provider so it never throws
    return {
      isChatOpen: false,
      setIsChatOpen: () => {},
      openChat: () => {},
      closeChat: () => {},
      toggleChat: () => {},
      chatPrompt: null,
      setChatPrompt: () => {},
    };
  }
  return context;
};

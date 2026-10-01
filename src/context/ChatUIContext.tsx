import React, { createContext, useContext, useState, useEffect } from 'react';

interface ChatUIContextType {
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  openChat: (prompt?: string) => void;
  closeChat: () => void;
  chatPrompt: string | undefined;
  setChatPrompt: (prompt: string | undefined) => void;
  initialPrompt?: string;
}

const ChatUIContext = createContext<ChatUIContextType>({
  isChatOpen: false,
  setIsChatOpen: () => {},
  openChat: () => {},
  closeChat: () => {},
  chatPrompt: undefined,
  setChatPrompt: () => {},
  initialPrompt: undefined,
});

export const ChatUIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPrompt, setChatPrompt] = useState<string | undefined>(undefined);

  const openChat = (prompt?: string) => {
    setIsChatOpen(true);
    if (prompt) {
      setChatPrompt(prompt);
    }
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  useEffect(() => {
    const handleOpenChat = (e: any) => {
      openChat(e.detail?.prompt);
    };

    window.addEventListener('open-sartor-chat', handleOpenChat);
    return () => window.removeEventListener('open-sartor-chat', handleOpenChat);
  }, []);

  return (
    <ChatUIContext.Provider
      value={{
        isChatOpen,
        setIsChatOpen,
        openChat,
        closeChat,
        chatPrompt,
        setChatPrompt,
        initialPrompt: chatPrompt,
      }}
    >
      {children}
    </ChatUIContext.Provider>
  );
};

export const useChatUI = () => useContext(ChatUIContext);

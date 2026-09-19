import React from 'react';
import { ThemeProvider } from '../../context/ThemeContext';
import { ChatUIProvider } from '../../context/ChatUIContext';
import { WhatsAppFloatingButton } from '../molecules/WhatsAppButton';
import { Footer } from '../organisms/Footer';
import { GeminiChatbot } from '../organisms/GeminiChatbot';
import { Navbar } from '../organisms/Navbar';

export interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <ChatUIProvider>
        <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans transition-colors duration-400 selection:bg-amber-800 selection:text-white">
          {/* Navigation Bar */}
          <Navbar />

          {/* Main Page Body */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <Footer />

          {/* Multi-turn Gemini AI Stylist Chatbot with Google Search Grounding (z-50) */}
          <GeminiChatbot />

          {/* Floating Sticky WhatsApp Button (z-30, automatically hidden when Chatbot modal is open) */}
          <WhatsAppFloatingButton />
        </div>
      </ChatUIProvider>
    </ThemeProvider>
  );
};


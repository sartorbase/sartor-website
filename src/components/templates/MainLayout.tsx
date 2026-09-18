import React, { useState } from 'react';
import { WhatsAppFloatingButton } from '../molecules/WhatsAppButton';
import { AnalyticsDrawer } from '../organisms/AnalyticsDrawer';
import { Footer } from '../organisms/Footer';
import { Navbar } from '../organisms/Navbar';

export interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-800 selection:text-white">
      {/* Navigation Bar */}
      <Navbar onOpenAnalytics={() => setIsAnalyticsOpen(true)} />

      {/* Main Page Body */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer onOpenAnalytics={() => setIsAnalyticsOpen(true)} />

      {/* Floating Sticky WhatsApp Button */}
      <WhatsAppFloatingButton />

      {/* Analytics Dashboard Drawer / Modal */}
      <AnalyticsDrawer
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />
    </div>
  );
};

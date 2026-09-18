/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ContactSection } from './components/organisms/ContactSection';
import { HeroSection } from './components/organisms/HeroSection';
import { SizeChartGuide } from './components/organisms/SizeChartGuide';
import { SuitCustomizerBooking } from './components/organisms/SuitCustomizerBooking';
import { MainLayout } from './components/templates/MainLayout';

export default function App() {
  return (
    <MainLayout>
      {/* 1. Hero Section with Women's Bespoke Focus, WhatsApp CTA & Lahore Location */}
      <HeroSection />

      {/* 2. Custom Women's Suit Commission & WhatsApp Scheduling CTA */}
      <SuitCustomizerBooking />

      {/* 3. Dedicated Size Chart & Interactive Measuring Guide */}
      <SizeChartGuide />

      {/* 4. Customer Inquiries Contact Form */}
      <ContactSection />
    </MainLayout>
  );
}



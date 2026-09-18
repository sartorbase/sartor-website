/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeroSection } from './components/organisms/HeroSection';
import { ServiceShowcase } from './components/organisms/ServiceShowcase';
import { SizeChartGuide } from './components/organisms/SizeChartGuide';
import { MainLayout } from './components/templates/MainLayout';

export default function App() {
  return (
    <MainLayout>
      {/* 1. Hero Experience: Women's Atelier, Services, Pricing List (PKR) & Outfit Photos */}
      <HeroSection />

      {/* 2. ServiceShowcase: Animated cycling gallery of finished tailoring results */}
      <ServiceShowcase />

      {/* 3. Pakistani Brand Size Chart (Khaadi, Sapphire, Sana Safinaz, Maria.B Standard) */}
      <SizeChartGuide />
    </MainLayout>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeroSection } from './components/organisms/HeroSection';
import { LocationMapSection } from './components/organisms/LocationMapSection';
import { ServiceShowcase } from './components/organisms/ServiceShowcase';
import { SizeChartGuide } from './components/organisms/SizeChartGuide';
import { TestimonialsSection } from './components/organisms/TestimonialsSection';
import { MainLayout } from './components/templates/MainLayout';

export default function App() {
  return (
    <MainLayout>
      {/* 1. Hero Experience: Women's Atelier, Services, Transparent Rates (PKR) & Outfit Photos */}
      <HeroSection />

      {/* 2. ServiceShowcase: Animated cycling gallery of finished tailoring results */}
      <ServiceShowcase />

      {/* 3. Client Testimonials: Authentic social proof from women clients across Lahore */}
      <TestimonialsSection />

      {/* 4. Pakistani Brand Size Chart (Khaadi, Sapphire, Sana Safinaz, Maria.B Standard) */}
      <SizeChartGuide />

      {/* 5. Moon Tower Studio Location, Google Maps & Directions */}
      <LocationMapSection />
    </MainLayout>
  );
}

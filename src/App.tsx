/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { HeroSection } from './components/organisms/HeroSection';
import { SpecializationBanner } from './components/organisms/SpecializationBanner';
import { AboutTailoringSection } from './components/organisms/AboutTailoringSection';
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

      {/* 2. Specialization Section: Exclusively Crafting Bespoke Women's Fashion & Online Tailoring */}
      <SpecializationBanner />

      {/* 3. About Our Tailoring Services: Local SEO keywords, Lahore tailoring, nationwide delivery */}
      <AboutTailoringSection />

      {/* 3. ServiceShowcase: Animated cycling gallery of finished tailoring results */}
      <ServiceShowcase />

      {/* 4. Client Testimonials: Authentic social proof from women clients across Lahore */}
      <TestimonialsSection />

      {/* 5. Pakistani Brand Size Chart (Khaadi, Sapphire, Sana Safinaz, Maria.B Standard) */}
      <SizeChartGuide />

      {/* 6. Moon Tower Studio Location, Google Maps & Directions */}
      <LocationMapSection />

      {/* Vercel Web Analytics & Speed Insights */}
      <Analytics />
      <SpeedInsights />
    </MainLayout>
  );
}

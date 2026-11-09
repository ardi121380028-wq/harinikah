'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInvitation } from '@/context/InvitationContext';

// Layout Components
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';

// Landing Page Sections
import { HeroSection } from '@/components/landing/HeroSection';
import { TrustBar } from '@/components/landing/TrustBar';
import { DualProductSection } from '@/components/landing/DualProductSection';
import { DoneForYouSection } from '@/components/landing/DoneForYouSection';
import { BundlingSection } from '@/components/landing/BundlingSection';
import { CatalogSection } from '@/components/landing/CatalogSection';
import { PhysicalCalculator } from '@/components/landing/PhysicalCalculator';
import { ShowroomSection } from '@/components/landing/ShowroomSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { FAQSection } from '@/components/landing/FAQSection';

// Modals
import { SampleModal } from '@/components/modals/SampleModal';
import { AuthModal } from '@/components/modals/AuthModal';
import { OnboardingWizardModal } from '@/components/modals/OnboardingWizardModal';
import { DiscountGiftModal } from '@/components/modals/DiscountGiftModal';
import { ActivationModal } from '@/components/modals/ActivationModal';

export default function HomePage() {
  const router = useRouter();
  const { themeMode } = useInvitation();
  const isLight = themeMode === 'light';

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'diy' | 'dfy'>('diy');
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [activationModalOpen, setActivationModalOpen] = useState(false);
  const [wizardModalOpen, setWizardModalOpen] = useState(false);

  const handleStartDIY = () => {
    router.push('/editor');
  };

  const handleStartDFY = () => {
    setAuthMode('dfy');
    setAuthModalOpen(true);
  };

  const handleSelectTheme = (themeName: string) => {
    router.push('/editor');
  };

  const handleSelectTier = (tierName: string) => {
    if (tierName.includes('Terima Beres')) {
      setAuthMode('dfy');
      setAuthModalOpen(true);
    } else {
      setActivationModalOpen(true);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      isLight ? 'bg-[#FAF8F5] text-stone-900' : 'bg-[#051817] text-stone-100'
    }`}>
      {/* 1. Header Navigation */}
      <Navbar
        onOpenAuth={() => { setAuthMode('diy'); setAuthModalOpen(true); }}
        onOpenSampleModal={() => setSampleModalOpen(true)}
        onOpenEditor={() => router.push('/editor')}
        onOpenDiscount={() => setDiscountModalOpen(true)}
      />

      {/* 2. Main Sections */}
      <main className="flex-grow">
        <HeroSection
          onStartDIY={handleStartDIY}
          onOpenSampleModal={() => setSampleModalOpen(true)}
          onOpenEditor={() => router.push('/editor')}
        />

        <TrustBar />

        <DualProductSection
          onStartDigital={handleStartDIY}
          onOpenSampleModal={() => setSampleModalOpen(true)}
        />

        <DoneForYouSection
          onStartDIY={handleStartDIY}
          onStartDFY={handleStartDFY}
        />

        <BundlingSection
          onOpenSampleModal={() => setSampleModalOpen(true)}
        />

        <CatalogSection
          onSelectTheme={handleSelectTheme}
        />

        <PhysicalCalculator
          onOpenSampleModal={() => setSampleModalOpen(true)}
        />

        <ShowroomSection />

        <PricingSection
          onSelectTier={handleSelectTier}
          onOpenSampleModal={() => setSampleModalOpen(true)}
        />

        <TestimonialsSection />

        <FAQSection />
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Floating WhatsApp Concierge */}
      <FloatingWhatsApp />

      {/* Modals */}
      <SampleModal
        isOpen={sampleModalOpen}
        onClose={() => setSampleModalOpen(false)}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authMode}
      />

      <OnboardingWizardModal
        isOpen={wizardModalOpen}
        onClose={() => setWizardModalOpen(false)}
        onSelectStep={() => router.push('/editor')}
        onOpenActivation={() => setActivationModalOpen(true)}
      />

      <DiscountGiftModal
        isOpen={discountModalOpen}
        onClose={() => setDiscountModalOpen(false)}
        onContinueToPayment={() => setActivationModalOpen(true)}
      />

      <ActivationModal
        isOpen={activationModalOpen}
        onClose={() => setActivationModalOpen(false)}
      />
    </div>
  );
}


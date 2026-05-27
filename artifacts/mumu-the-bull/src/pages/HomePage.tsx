import { motion as m } from "motion/react";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Onboarding from "@/components/Onboarding";
import ContractAddress from "@/components/ContractAddress";
import HeroSection from "@/components/main/HeroSection/HeroSection";
import LoreSection from "@/components/main/LoreSection/LoreSection";
import HerdSection from "@/components/main/HerdSection/HerdSection";
import GallerySection from "@/components/main/GallerySection/GallerySection";
import FAQSection from "@/components/main/FAQSection/FAQSection";
import FooterSection from "@/components/main/FooterSection/FooterSection";
import MigrationUpdateSection from "@/components/migration/MigrationUpdateSection/MigrationUpdateSection";
import LiveMetricsSection from "@/components/migration/LiveMetricsSection/LiveMetricsSection";
import WhyMumuMigratedSection from "@/components/migration/WhyMumuMigratedSection/WhyMumuMigratedSection";
import HowMigrationWorkedSection from "@/components/migration/HowMigrationWorked/HowMigrationWorkedSection";
import HiringSection from "@/components/main/HiringSection/HiringSection";

export default function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [shouldShowFlash, setShouldShowFlash] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (!isMobile) {
      const hasSeenOnboarding = localStorage.getItem("mumu_onboarding_seen");
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
      }
    }
    setIsInitialized(true);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("mumu_onboarding_seen", "true");
    setShowOnboarding(false);
    setShouldShowFlash(true);
  };

  if (!isInitialized) {
    return <div className="fixed inset-0 bg-black z-[100]" />;
  }

  return (
    <>
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
      <main className="w-full h-auto relative" data-scroll-container>
        {shouldShowFlash && (
          <m.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
            onAnimationComplete={() => setShouldShowFlash(false)}
            className="fixed inset-0 bg-white h-screen w-full z-[100] pointer-events-none"
          />
        )}
        <div className="fixed bottom-12 right-12 z-30">
          <ContractAddress />
        </div>
        <Navbar />
        <HeroSection />
        <LoreSection />
        <MigrationUpdateSection />
        <WhyMumuMigratedSection />
        <HerdSection />
        <HowMigrationWorkedSection />
        <LiveMetricsSection />
        <GallerySection />
        <HiringSection />
        <FAQSection />
        <FooterSection />
      </main>
    </>
  );
}

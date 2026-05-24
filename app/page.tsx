"use client";

import { motion as m } from "framer-motion";
import React, { useEffect, useState } from "react";
import ContractAddress from "@/app/components/ContractAddress";
import FAQSection from "@/app/components/main/FAQSection/FAQSection";
import FooterSection from "@/app/components/main/FooterSection/FooterSection";
import GallerySection from "@/app/components/main/GallerySection/GallerySection";
import HerdSection from "@/app/components/main/HerdSection/HerdSection";
import HeroSection from "@/app/components/main/HeroSection/HeroSection";
import LoreSection from "@/app/components/main/LoreSection/LoreSection";
// import PartnersSection from "@/app/components/main/PartnersSection/PartnersSection";
import HowMigrationWorkedSection from "@/app/components/migration/HowMigrationWorked/HowMigrationWorkedSection";
import LiveMetricsSection from "@/app/components/migration/LiveMetricsSection/LiveMetricsSection";
import MigrationUpdateSection from "@/app/components/migration/MigrationUpdateSection/MigrationUpdateSection";
import WhyMumuMigratedSection from "@/app/components/migration/WhyMumuMigratedSection/WhyMumuMigratedSection";
import Navbar from "@/app/components/Navbar";
import Onboarding from "@/app/components/Onboarding";

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [shouldShowFlash, setShouldShowFlash] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("mumu_onboarding_seen");
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
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
      <main className="w-full h-auto relative">
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
        {/*<PartnersSection />*/}
        <LiveMetricsSection />
        <GallerySection />
        <FAQSection />
        <FooterSection />
      </main>
    </>
  );
}

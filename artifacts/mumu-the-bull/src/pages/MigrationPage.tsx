import React from "react";
import Navbar from "@/components/Navbar";
import MigrationHeroSection from "@/components/migration/HeroSection/HeroSection";
import MigrationUpdateSection from "@/components/migration/MigrationUpdateSection/MigrationUpdateSection";
import LiveMetricsSection from "@/components/migration/LiveMetricsSection/LiveMetricsSection";
import WhyMumuMigratedSection from "@/components/migration/WhyMumuMigratedSection/WhyMumuMigratedSection";
import HowMigrationWorkedSection from "@/components/migration/HowMigrationWorked/HowMigrationWorkedSection";
import TimelineSection from "@/components/migration/TimelineSection/TimelineSection";
import SecurityWarningsSection from "@/components/migration/SecurityWarningsSection/SecurityWarningsSection";
import BuySection from "@/components/main/BuySection/BuySection";
import TickerSection from "@/components/main/TickerSection/TickerSection";
import FAQSection from "@/components/main/FAQSection/FAQSection";
import FooterSection from "@/components/main/FooterSection/FooterSection";

export default function MigrationPage() {
  return (
    <main className="w-full h-auto relative bg-mumu-green-9">
      <Navbar />
      <MigrationHeroSection />
      <MigrationUpdateSection />
      <LiveMetricsSection />
      <WhyMumuMigratedSection />
      <HowMigrationWorkedSection />
      <TimelineSection />
      <SecurityWarningsSection />
      <BuySection />
      <TickerSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}

import BuySection from "@/app/components/main/BuySection/BuySection";
import FAQSection from "@/app/components/main/FAQSection/FAQSection";
import FooterSection from "@/app/components/main/FooterSection/FooterSection";
import TickerSection from "@/app/components/main/TickerSection/TickerSection";
// import CountdownSection from "@/app/components/migration/CountdownSection/CountdownSection";
import HeroSection from "@/app/components/migration/HeroSection/HeroSection";
import HowMigrationWorkedSection from "@/app/components/migration/HowMigrationWorked/HowMigrationWorkedSection";
import LiveMetricsSection from "@/app/components/migration/LiveMetricsSection/LiveMetricsSection";
import MigrationUpdateSection from "@/app/components/migration/MigrationUpdateSection/MigrationUpdateSection";
// import OfficialLinksSection from "@/app/components/migration/OfficialLinksSection/OfficialLinksSection";
import SecurityWarningsSection from "@/app/components/migration/SecurityWarningsSection/SecurityWarningsSection";
import TimelineSection from "@/app/components/migration/TimelineSection/TimelineSection";
import WhyMumuMigratedSection from "@/app/components/migration/WhyMumuMigratedSection/WhyMumuMigratedSection";
import Navbar from "@/app/components/Navbar";

export default function Home() {
  return (
    <main className="w-full h-auto relative">
      <Navbar />
      <HeroSection />
      <MigrationUpdateSection />
      <LiveMetricsSection />
      <WhyMumuMigratedSection />
      <HowMigrationWorkedSection />
      <TimelineSection />
      <SecurityWarningsSection />
      {/* Tutorial videos section */}
      {/*<section*/}
      {/*  id="tutorial-videos"*/}
      {/*  className="w-full py-20 px-4 md:px-8 bg-[#F9EEE6]"*/}
      {/*>*/}
      {/*  <div className="max-w-4xl mx-auto">*/}
      {/*    <h2 className="text-4xl md:text-5xl font-nerko mb-12 text-center uppercase text-black-9">*/}
      {/*      Tutorial videos*/}
      {/*    </h2>*/}
      {/*    <div className="aspect-video w-full rounded-[40px] overflow-hidden shadow-container border border-black/5 bg-black">*/}
      {/*      /!** biome-ignore lint/a11y/useMediaCaption: <explanation> *!/*/}
      {/*      <video*/}
      {/*        src="/videos/mumu-the-bull-intro.mp4"*/}
      {/*        controls*/}
      {/*        className="w-full h-full object-cover"*/}
      {/*        poster="/images/migrating.png"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
      {/*<OfficialLinksSection />*/}
      <BuySection />
      <TickerSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}

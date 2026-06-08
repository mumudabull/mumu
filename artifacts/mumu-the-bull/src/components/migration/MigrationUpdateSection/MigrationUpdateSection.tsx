import React from "react";
import SectionDivider from "@/components/SectionDivider";

function MigrationUpdateSection() {
  return (
    <section
      className="h-auto w-full bg-[#F9EEE6] relative overflow-hidden"
      style={{
        backgroundImage: 'url("/images/bg-pattern-black.png")',
        backgroundRepeat: "repeat",
        backgroundBlendMode: "soft-light",
      }}
    >
      <div className="max-w-container w-full container mx-auto pt-14 pb-20 flex flex-col items-center">
        <h2 className="font-nerko text-4xl md:text-6xl text-black-9 mb-4 text-center">
          $MUMU is migrating
        </h2>
        <p className="font-nerko text-2xl md:text-4xl text-mumu-orange-6 mb-12 text-center uppercase">
          Migration is live · Closes June 8th · 9AM EST
        </p>

        <div className="relative w-full max-w-[600px] min-h-[344px] flex flex-col items-center">
          <div className="bg-[#572500] rounded-[40px] p-8 md:p-12 text-white font-nerko text-center z-20 shadow-container relative mb-12">
            <h3 className="text-xl md:text-3xl mb-4">
              The Migration Portal Is Live
            </h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6">
              Deposit your old $MUMU at migrate.fun before the portal closes June
              8th at 9AM EST — that's when $MUMU relaunches on Pump.fun and token
              claims open.
            </p>
            <a
              href="https://migrate.fun/migrate/mig181"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white hover:bg-gray-100 text-black font-nerko text-lg md:text-2xl px-8 md:px-10 py-3 md:py-4 rounded-buttons shadow-container uppercase tracking-wide transition-all active:translate-y-1 hover:-rotate-3"
            >
              Go to Migration Portal
            </a>
          </div>
        </div>
        <div className="w-full max-w-[640px] flex items-center justify-center">
          <img
            src="/images/mumu-pumpfun-rocket.jpg"
            alt="Mumu blasting off to Pump.fun on a green pill rocket, leaving the old Migrate.fun world behind"
            className="w-full aspect-[3/2] object-cover rounded-[32px] border-4 border-white shadow-container -rotate-1"
          />
        </div>
      </div>

      <SectionDivider color="#024000" />
    </section>
  );
}

export default MigrationUpdateSection;

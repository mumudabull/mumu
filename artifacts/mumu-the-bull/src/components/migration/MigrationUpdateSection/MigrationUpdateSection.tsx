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
      <div className="max-w-container w-full container mx-auto min-h-[950px] pt-14 flex flex-col items-center">
        <h2 className="font-nerko text-4xl md:text-6xl text-black-9 mb-4 text-center">
          $MUMU is migrating
        </h2>
        <p className="font-sans text-sm md:text-lg text-black-9 mb-12 text-center opacity-80">
          We are now in the claim period of the migration — claim your new
          tokens now
        </p>

        <div className="relative w-full max-w-[600px] min-h-[344px] flex flex-col items-center">
          <div className="bg-[#572500] rounded-[40px] p-8 md:p-12 text-white font-nerko text-center md:text-left z-20 shadow-container relative mb-16 md:mb-32">
            <h3 className="text-xl md:text-2xl mb-6">
              $MUMU Migration Update — Claim Period Now Open
            </h3>
            <div className="space-y-6 text-sm md:text-base leading-relaxed opacity-70">
              <p>
                The deposit window has closed, but the migration is still
                ongoing — we're now in the 90-day claim period (now through
                ~June 8th).
              </p>
              <p>
                If you deposited during the window (Feb 24 – Mar 10): You can
                now claim your new $MUMU tokens at a 1:1 ratio. Head to
                migrate.fun to claim.
              </p>
              <p>
                If you missed the deposit window: You can still migrate during
                the claim period, but a 5% penalty applies.
              </p>
              <p className="pt-4">
                Don't wait — you have until ~June 8th to claim or migrate.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full absolute z-10 bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="w-[378px] h-[378px] aspect-square relative">
            <img
              src="/images/migrating.png"
              alt="Hero Image"
              className="absolute inset-0 w-full h-full aspect-square object-contain object-bottom"
            />
          </div>
        </div>
      </div>

      <SectionDivider color="#024000" />
    </section>
  );
}

export default MigrationUpdateSection;

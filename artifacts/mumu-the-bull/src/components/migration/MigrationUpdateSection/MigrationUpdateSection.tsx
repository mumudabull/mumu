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
        <p className="font-nerko text-2xl md:text-4xl text-mumu-orange-6 mb-12 text-center uppercase">
          Migration to Pump.fun opens June 1st
        </p>

        <div className="relative w-full max-w-[600px] min-h-[344px] flex flex-col items-center">
          <div className="bg-[#572500] rounded-[40px] p-8 md:p-12 text-white font-nerko text-center z-20 shadow-container relative mb-16 md:mb-32">
            <h3 className="text-xl md:text-3xl mb-4">
              Migration Portal Opens June 1st
            </h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              The $MUMU → Pump.fun migration portal goes live on June 1st.
              Check back then to migrate your tokens.
            </p>
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

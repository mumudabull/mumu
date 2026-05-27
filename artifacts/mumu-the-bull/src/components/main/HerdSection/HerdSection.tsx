import React from "react";
import SectionDivider from "@/components/SectionDivider";

function HerdSection() {
  return (
    <section
      id="community"
      className="bg-[#ebebeb] relative pt-32 pb-20 px-4 md:px-0 overflow-hidden"
      style={{
        backgroundImage: 'url("/images/bg-pattern-black.png")',
        backgroundRepeat: "repeat",
      }}
    >
      <div className="max-w-container container mx-auto relative z-10 flex flex-col items-center">
        <h2 className="text-black text-5xl md:text-7xl font-nerko text-center uppercase mb-6">
          THE HERD NEVER LEFT
        </h2>

        <p className="text-[#3C3C3C] font-nerko text-lg md:text-xl text-center max-w-3xl mb-12 leading-relaxed">
          The greatest meme IP ever conceived. When the bear market arrived, the
          bulls were ridiculed, and the warrior stumbled. Yet, the unwavering
          bull perseveres.
        </p>

        <div className="w-full max-w-5xl flex flex-col gap-4">
          <div className="bg-[#095626] rounded-3xl lg:rounded-[40px] pt-12 lg:pt-0 flex flex-col md:flex-row items-center gap-8 shadow-container relative overflow-hidden">
            <div className="order-2 lg:order-1 relative w-full md:w-1/2 h-48 md:h-64 z-10">
              <img
                src="/images/herd-hero.png"
                alt="Bull playing violin"
                className="absolute inset-0 w-full h-full object-contain object-bottom"
              />
            </div>

            <div className="order-1 lg:order-2 flex flex-col items-center md:items-start text-center md:text-left z-10">
              <span className="text-white font-nerko text-5xl md:text-7xl mb-2">
                250,000+
              </span>
              <p className="text-white/80 font-nerko text-lg md:text-xl mb-6">
                Followers across X / Instagram / TikTok
              </p>
              <button
                type="button"
                className="bg-[#3eff8b] text-black font-nerko text-xl md:text-2xl px-10 py-3 rounded-buttons shadow-container transition-all hover:scale-105 active:scale-95 uppercase"
              >
                JOIN THE COMMUNITY
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#cc722e] rounded-3xl lg:rounded-[40px] p-10 flex flex-col items-center text-center shadow-container">
              <span className="text-white font-nerko text-5xl md:text-7xl mb-2">
                $800M
              </span>
              <p className="text-white/80 font-nerko text-lg md:text-xl">
                All-time high market cap
              </p>
            </div>

            <div className="bg-[#11873D] rounded-3xl lg:rounded-[40px] p-10 flex flex-col items-center text-center shadow-container">
              <span className="text-white font-nerko text-5xl md:text-7xl mb-2">
                100k+
              </span>
              <p className="text-white/80 font-nerko text-lg md:text-xl">
                Unique holders. 20% of $MUMUv1 airdropped to OG Solana communities in March 2024.
              </p>
            </div>
          </div>
        </div>
      </div>

      <SectionDivider color="#750000" />
    </section>
  );
}

export default HerdSection;

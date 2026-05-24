import Image from "next/image";
import React from "react";

function BuySection() {
  return (
    <section
      className="min-h-[calc(var(--unit)*420)] bg-mumu-green-10 relative overflow-hidden flex items-center"
      style={{
        backgroundImage: 'url("/images/bg-pattern-white.png")',
        backgroundRepeat: "repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-container mx-auto relative z-10 w-full pt-6 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          {/* Left side: Mumu Illustration */}
          <div className="order-2 lg:order-1 w-full flex justify-center lg:justify-end">
            <div className="relative w-[496px] h-[200px] lg:h-[440px]">
              <Image
                src="/images/buy-in-okx-dex.png"
                alt="Buy in OKX DEX"
                fill
                className="object-contain object-bottom"
                priority
                sizes="(max-width: 1024px) 496px, 496px"
              />
            </div>
          </div>

          {/* Right side: Content */}
          <div className="order-1 lg:order-2 w-full text-center lg:text-left">
            <h2 className="font-nerko text-white text-7xl md:text-5xl uppercase leading-tight mb-4">
              BUY IN OKX DEX
            </h2>
            <p className="text-white font-nerko text-lg md:text-xl lg:text-base mb-10 md:max-w-[calc(var(--unit)*600)] mx-auto lg:mx-0 opacity-90 leading-relaxed">
              A fast, secure, and decentralized trading platform. Trade directly
              from your wallet with full control of your assets, low fees, and
              seamless swaps across multiple tokens. No middlemen, just pure
              DeFi efficiency.
            </p>
            <button
              type="button"
              className="hover:rotate-4 bg-[#3eff8b] hover:bg-[#34e67d] text-black font-nerko text-2xl md:text-3xl px-[calc(var(--unit)*48)] py-4 rounded-buttons lg:py-[calc(var(--unit)*12)] shadow-container transition-all hover:scale-105 active:scale-95 uppercase cursor-pointer max-w-[250px] w-full"
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BuySection;

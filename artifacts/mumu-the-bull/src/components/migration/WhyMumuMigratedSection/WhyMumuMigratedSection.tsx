import React from "react";

function WhyMumuMigratedSection() {
  const cards = [
    {
      title: "Creator Fees",
      description:
        "Every trade on PumpSwap generates a creator fee for Mumu — a tiered percentage that starts at 0.30% at lower market caps and adjusts as the project grows. No flat promises: revenue is real, on-chain, and flows directly back into the $MUMU ecosystem to fund buybacks, listings, marketing, and community initiatives.",
      image: "/images/migrated-1.png",
    },
    {
      title: "Healthier LP",
      description:
        "Old Mumu's supply was modeled after the total US Dollar supply in 2024 — resulting in a bloated MC-to-LP ratio of ~2:1 vs. the 10-30+:1 typical on PumpSwap, meaning price barely moved. The new token has a clean 1B supply, rebalancing the LP for real price discovery on the upside, with surplus SOL providing downside protection.",
      image: "/images/migrated-2.png",
    },
    {
      title: "Where the culture and liquidity live now",
      description:
        "Pump.fun is the dominant discovery layer for Solana tokens: the retail degens, crypto-native traders, and new entrants is exactly who MUMU is built for. Legacy Raydium pools are old infrastructure. MUMU's value is cultural bullish energy and Pump.fun is where that energy lives.",
      image: "/images/migrated-3.png",
    },
    {
      title: "Fresh Start",
      description:
        "Mumu now has a fresh chart and a fresh narrative, while keeping the same community and the same infinite meme. Same Mumu, new momentum.",
      image: "/images/migrated-4.png",
    },
  ];

  return (
    <section
      className="h-auto w-full bg-[#024000] relative overflow-hidden"
      style={{
        backgroundImage: 'url("/images/bg-pattern-white.png")',
        backgroundRepeat: "repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-container w-full container mx-auto px-4 py-16 md:py-24 flex flex-col items-center">
        <h2 className="font-nerko text-4xl md:text-6xl text-white mb-12 text-center">
          Why We Migrated
        </h2>

        <div className="flex flex-col gap-6 w-full max-w-[800px]">
          {cards.map((card, index) => (
            <div
              key={index.toString()}
              className="bg-[#15bf55] rounded-[30px] flex flex-col md:flex-row items-center md:items-end justify-center shadow-container min-h-[136px] overflow-hidden"
            >
              <div className="order-2 lg:order-1 min-w-[225px] h-[136px] relative">
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover object-bottom"
                />
              </div>

              <div className="order-1 lg:order-2 py-2 pr-6 pl-4 flex flex-col text-center md:text-left">
                <h3 className="font-nerko text-2xl md:text-3xl text-white mb-2">
                  {card.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-white/90 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyMumuMigratedSection;

import Image from "next/image";
import React from "react";

function WhyMumuMigratedSection() {
  const cards = [
    {
      title: "Creator Fees",
      description:
        "PumpSwap’s creator fees now generate ongoing revenue for Mumu. With a 0.5% fee, every dollar of volume directly funds buybacks, listings, marketing, art, and community initiatives — all with full transparency and weekly reporting.",
      image: "/images/migrated-1.png",
    },
    {
      title: "Healthier LP",
      description:
        "Old Mumu had a MC-to-LP ratio of roughly 2:1, while most PumpSwap tokens range 10-30+:1. The oversized LP meant price barely moved on buys or sells. The rebalanced LP now allows for stronger price movement on the upside, while the surplus SOL provides downside protection.",
      image: "/images/migrated-2.png",
    },
    {
      title: "Supply Control",
      description:
        "The migration enabled proper supply management. Old Mumu was swapped 1:1 for new Mumu, and ~450M excess tokens will be burned after the claim period to match the old circulating supply — preventing any dilution",
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
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-bottom object-cover"
                  sizes="225px"
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

import Image from "next/image";
import React from "react";

function TickerSection() {
  const items = Array(15).fill(0);
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <section className="bg-[#024000] w-full overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee py-2 md:py-6 shrink-0">
        {duplicatedItems.map((_, i) => (
          <div key={i.toString()} className="flex items-center gap-4 px-4">
            <h2 className="text-white font-nerko text-2xl md:text-4xl uppercase tracking-wider">
              MUMU THE BULL
            </h2>
            <div className="relative w-8 h-8 md:w-12 md:h-12">
              <Image
                src="/images/mumu-logo-icon.svg"
                alt="Mumu Bull icon"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 32px, 48px"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TickerSection;

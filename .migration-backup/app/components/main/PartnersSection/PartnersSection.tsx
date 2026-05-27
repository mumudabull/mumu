import Image from "next/image";
import React from "react";
import SectionDivider from "@/app/components/SectionDivider";

const partners = [
  { src: "/images/partners/partners-1.png", alt: "Partner 1" },
  { src: "/images/partners/partners-2.png", alt: "Partner 2" },
  { src: "/images/partners/partners-3.png", alt: "Partner 3" },
  { src: "/images/partners/partners-4.png", alt: "Partner 4" },
  { src: "/images/partners/partners-5.png", alt: "Partner 5" },
  { src: "/images/partners/partners-6.png", alt: "Partner 6" },
  { src: "/images/partners/partners-7.png", alt: "Partner 7" },
  { src: "/images/partners/partners-8.png", alt: "Partner 8" },
  { src: "/images/partners/partners-9.png", alt: "Partner 9" },
];

function PartnersSection() {
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="bg-[#024600] h-[157px] w-full flex items-center overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee shrink-0 will-change-transform">
        {duplicatedPartners.map((partner, index) => (
          <div
            key={index.toString()}
            className="relative h-8 md:h-12 w-auto flex items-center px-4 md:px-6 shrink-0"
          >
            <Image
              src={partner.src}
              alt={partner.alt}
              width={142}
              height={83}
              className="h-full w-auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default PartnersSection;

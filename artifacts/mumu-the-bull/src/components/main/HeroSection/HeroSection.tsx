import { useEffect, useState } from "react";
import { Link } from "wouter";
import Galaxy from "@/components/Galaxy";

function HeroSection() {
  const [travelers, setTravelers] = useState<
    { id: number; top: string; delay: string }[]
  >([]);

  useEffect(() => {
    setTravelers(
      Array.from({ length: 8 }, (_, i) => ({
        id: i + 3,
        top: `${Math.random() * 80 + 10}%`,
        delay: `${Math.random() * -10}s`,
      })),
    );
  }, []);

  const handleAnimationIteration = (id: number) => {
    setTravelers((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, top: `${Math.random() * 80 + 10}%` } : t,
      ),
    );
  };

  return (
    <section
      className="bg-black w-full h-auto relative overflow-hidden"
      style={{
        backgroundImage: 'url("/images/hero-bg.png")',
        backgroundRepeat: "repeat",
      }}
    >
      <h1 className="sr-only">
        Mumu is a muuvement to unite everyone in crypto. Backed by number go up technology and Solana OGs.
      </h1>
      <img
        id="mumu-subject"
        src="/images/hero-mumu.png"
        alt="Hero Mumu"
        width={550}
        height={550}
        className="object-contain aspect-square absolute top-1/2 left-1/2 z-30 animate-mumu-travel w-[200px] md:w-[400px] lg:w-[550px] will-change-transform"
      />

      <img
        id="de-1"
        className="absolute top-[15%] left-[10%] animate-float-de1 w-[50px] md:w-[80px] lg:w-[100px] will-change-transform"
        src="/images/hero-mumu-de-1.png"
        alt="Design Element"
        width={100}
        height={100}
      />

      <img
        id="de-2"
        className="absolute bottom-[20%] right-[10%] animate-float-de2 w-[50px] md:w-[80px] lg:w-[100px] will-change-transform"
        src="/images/hero-mumu-de-2.png"
        alt="Design Element"
        width={100}
        height={100}
      />

      {travelers.map((traveler) => (
        <img
          key={traveler.id}
          id={`de-${traveler.id}`}
          onAnimationIteration={() => handleAnimationIteration(traveler.id)}
          style={{ top: traveler.top, animationDelay: traveler.delay }}
          className="object-contain aspect-square absolute left-1/2 z-20 animate-mumu-travel w-[50px] md:w-[80px] lg:w-[100px] will-change-transform"
          src={`/images/hero-mumu-de-${traveler.id}.png`}
          alt="Design Element"
          width={100}
          height={100}
        />
      ))}

      <div className="min-h-screen lg:min-h-[calc(245.5*4px)] max-w-container container flex items-center justify-center w-full mx-auto relative">
        <div className="absolute flex flex-col top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-0 w-[70%] max-w-[960px]">
          <img
            src="/images/hero-mumu-title.svg"
            alt="Hero Mumu"
            width={960}
            height={464}
            className="z-10 object-contain"
          />

          <div className="z-20 w-full text-center px-4 mt-6">
            <p className="text-white font-nerko text-2xl md:text-4xl lg:text-5xl tracking-tight animate-pop-in">
              Mumu is a muuvement to unite everyone in crypto. Backed by number go up technology and Solana OGs.
            </p>
          </div>
        </div>

        <div className="absolute bottom-48 md:bottom-24 left-1/2 -translate-x-1/2 z-40">
          <Link
            href="/migration"
            className="bg-white hover:bg-gray-100 text-black font-nerko text-xl px-8 py-3 rounded-buttons shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all active:translate-y-1 active:shadow-none hover:-rotate-3"
          >
            MIGRATE NOW
          </Link>
        </div>
      </div>

      <div
        style={{ width: "100%", height: "100vh" }}
        className="z-0 absolute top-0 left-0"
      >
        <Galaxy
          mouseRepulsion={false}
          mouseInteraction={false}
          density={0.5}
          glowIntensity={0.1}
          saturation={0}
          hueShift={320}
          twinkleIntensity={0.1}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.2}
          speed={0.1}
        />
      </div>
    </section>
  );
}

export default HeroSection;

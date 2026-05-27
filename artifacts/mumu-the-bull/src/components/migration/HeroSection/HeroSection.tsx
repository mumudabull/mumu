import { animate } from "motion/react";
import React, { useEffect, useState } from "react";
import SectionDivider from "@/components/SectionDivider";

function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-06-02T00:00:00Z").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="h-auto w-full bg-mumu-green-9 relative pt-32"
      style={{
        backgroundImage: 'url("/images/bg-pattern-white.png")',
        backgroundRepeat: "repeat",
      }}
    >
      <div className="min-h-[calc(var(--unit)*982)] max-w-container w-full container mx-auto grid grid-cols-12 gap-6 pt-[calc(var(--unit)*222)] pb-20 px-0">
        <div className="col-span-12 md:col-start-2 md:col-end-12 lg:col-start-4 lg:col-end-10 lg:col-span-6 flex flex-col items-center justify-center relative">
          <div className="bg-mumu-orange-6 w-full rounded-2xl md:rounded-4xl shadow-container relative flex flex-col items-center p-6 md:p-12 pb-12 md:pb-16">
            <div className="absolute z-10 -top-[calc(var(--unit)*180)] md:-top-[calc(var(--unit)*222)] left-1/2 -translate-x-1/2">
              <div
                className="max-w-[calc(var(--unit)*240)] md:max-w-[calc(var(--unit)*302)] h-[calc(var(--unit)*177)] md:h-[calc(var(--unit)*223)] relative w-[calc(var(--unit)*240)] md:w-[calc(var(--unit)*302)]"
                style={{
                  width: "min(240px, calc(var(--unit)*240))",
                  height: "min(177px, calc(var(--unit)*177))",
                }}
              >
                <img
                  src="/images/hero.png"
                  alt="Hero Image"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <h2 className="text-white text-xl md:text-3xl font-nerko text-center mb-2 mt-4 md:mt-0">
              Migration to Pump.fun
            </h2>
            <p className="text-white/70 font-nerko text-base md:text-xl text-center mb-6 md:mb-8">
              Portal opens June 2nd
            </p>

            <div className="grid grid-cols-4 gap-2 md:gap-4 w-full max-w-sm mb-8 md:mb-12">
              <div className="flex flex-col items-center">
                <span className="text-white text-4xl md:text-6xl font-nerko leading-none w-[2ch] text-center">
                  {timeLeft.days.toString().padStart(2, "0")}
                </span>
                <span className="text-white/60 text-xs md:text-sm font-nerko uppercase mt-1 md:mt-2">
                  Days
                </span>
              </div>
              <div className="flex flex-col items-center relative">
                <span className="absolute -left-1 top-0 text-white/60 text-2xl md:text-4xl font-nerko leading-none">
                  :
                </span>
                <span className="text-white text-4xl md:text-6xl font-nerko leading-none w-[2ch] text-center">
                  {timeLeft.hours.toString().padStart(2, "0")}
                </span>
                <span className="text-white/60 text-xs md:text-sm font-nerko uppercase mt-1 md:mt-2">
                  Hours
                </span>
              </div>
              <div className="flex flex-col items-center relative">
                <span className="absolute -left-1 top-0 text-white/60 text-2xl md:text-4xl font-nerko leading-none">
                  :
                </span>
                <span className="text-white text-4xl md:text-6xl font-nerko leading-none w-[2ch] text-center">
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </span>
                <span className="text-white/60 text-xs md:text-sm font-nerko uppercase mt-1 md:mt-2">
                  Mins
                </span>
              </div>
              <div className="flex flex-col items-center relative">
                <span className="absolute -left-1 top-0 text-white/60 text-2xl md:text-4xl font-nerko leading-none">
                  :
                </span>
                <span className="text-white text-4xl md:text-6xl font-nerko leading-none w-[2ch] text-center">
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </span>
                <span className="text-white/60 text-xs md:text-sm font-nerko uppercase mt-1 md:mt-2">
                  Sec
                </span>
              </div>
            </div>

            <div className="bg-black/20 rounded-full px-4 md:px-6 py-2 md:py-3 w-full max-w-lg mb-4">
              <p className="text-white text-center text-xs md:text-sm font-nerko">
                Migration portal goes live in{" "}
                <span className="text-[#56D491]">{timeLeft.days} days</span>
              </p>
            </div>
          </div>

          <div className="mt-[-30px] md:mt-[-40px] z-20">
            <button
              type="button"
              disabled
              className="cursor-not-allowed opacity-50 bg-white text-black font-nerko text-xl md:text-2xl px-8 md:px-12 py-3 md:py-4 rounded-buttons shadow-container uppercase tracking-wide"
            >
              OPENS JUNE 2ND
            </button>
          </div>

          <div className="w-full mt-12 md:mt-16 flex flex-col gap-6 md:gap-8">
            <div className="flex flex-row justify-between items-center gap-4">
              <div className="bg-[#FAF1E9] rounded-full px-4 py-2 flex items-center gap-2 border border-black/10">
                <img
                  src="/icons/migration.svg"
                  width={20}
                  height={20}
                  alt="Migration Progress"
                  className="opacity-60"
                />
                <span className="text-black font-nerko text-sm">
                  Migration Progress
                </span>
              </div>

              <div className="bg-white/20 rounded-full px-4 py-2 border border-black/10">
                <span className="text-white/60 font-nerko text-sm">
                  Not Yet Open
                </span>
              </div>
            </div>

            <div className="w-full bg-black/30 h-6 rounded-full overflow-hidden relative border border-black/20 shadow-inner">
              <div
                className="bg-white/20 h-full rounded-full"
                style={{ width: "0%" }}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              <div className="flex flex-col items-center md:items-start gap-1">
                <span className="text-white/30 text-2xl md:text-3xl font-nerko leading-none">
                  —
                </span>
                <span className="text-white/40 text-xs md:text-sm font-nerko uppercase">
                  Tokens Migrated
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-white/30 text-2xl md:text-3xl font-nerko leading-none">
                  —
                </span>
                <span className="text-white/40 text-xs md:text-sm font-nerko uppercase">
                  Total Supply
                </span>
              </div>
              <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-end gap-1">
                <span className="text-white/30 text-2xl md:text-3xl font-nerko leading-none">
                  —
                </span>
                <span className="text-white/40 text-xs md:text-sm font-nerko uppercase">
                  Deposited
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="bg-white/10 rounded-full px-6 py-2 flex items-center gap-3 border border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                <span className="text-white/50 font-nerko text-sm">
                  Portal opens June 2nd
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SectionDivider color="#F9EEE6" />
    </section>
  );
}

export default HeroSection;

"use client";

import React, { useEffect, useState } from "react";

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-06-08T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="w-full py-20 px-4 md:px-8 bg-orange-500 text-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="absolute top-10 left-10 w-64 h-64 border-8 border-white rounded-full" />
         <div className="absolute bottom-10 right-10 w-96 h-96 border-8 border-white rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-nerko mb-12 uppercase tracking-widest">
          Migration Deadline Countdown
        </h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-white text-orange-500 w-20 h-20 md:w-32 md:h-32 rounded-3xl flex items-center justify-center text-3xl md:text-5xl font-nerko shadow-xl mb-4">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base font-bold uppercase opacity-80">
                {item.label}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-12 text-white/80 max-w-xl mx-auto text-sm md:text-base">
          All remaining tokens must be claimed or migrated by June 8th. 
          After this date, the migration portal will be permanently closed.
        </p>
      </div>
    </section>
  );
};

export default CountdownSection;

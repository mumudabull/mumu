"use client";

import { useEffect } from "react";

export default function LocomotiveScroll() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll({
        lenisOptions: {
          wrapper: window,
          content: document.querySelector("[data-scroll-container]") as HTMLElement,
          lerp: 0.1,
          duration: 1.2,
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          infinite: false,
        },
      });

      return () => {
        locomotiveScroll.destroy();
      };
    })();
  }, []);

  return null;
}

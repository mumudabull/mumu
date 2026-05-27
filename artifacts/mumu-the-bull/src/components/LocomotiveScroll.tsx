import { useEffect } from "react";

export default function LocomotiveScroll() {
  useEffect(() => {
    let destroyed = false;
    let locomotiveScroll: { destroy: () => void } | null = null;

    (async () => {
      const container = document.querySelector("[data-scroll-container]") as HTMLElement | null;
      if (!container) return;

      try {
        const LocomotiveScrollModule = (await import("locomotive-scroll")).default;
        if (destroyed) return;
        locomotiveScroll = new LocomotiveScrollModule({
          lenisOptions: {
            wrapper: window,
            content: container,
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
      } catch (e) {
        console.warn("LocomotiveScroll: failed to initialize", e);
      }
    })();

    return () => {
      destroyed = true;
      locomotiveScroll?.destroy();
    };
  }, []);

  return null;
}

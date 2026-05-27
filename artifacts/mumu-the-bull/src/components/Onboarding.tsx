import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const finish = () => {
    setIsFlashing(true);
    setTimeout(() => {
      onComplete();
      document.body.style.overflow = "";
      setIsFlashing(false);
      setTimeout(() => setIsVisible(false), 1000);
    }, 400);
  };

  const handleContinue = () => {
    setIsPlaying(true);
    const video = videoRef.current;
    if (!video) {
      finish();
      return;
    }
    video.currentTime = 0;
    video.play().catch(() => {
      finish();
    });
  };

  const handleVideoEnded = () => {
    finish();
  };

  if (!isVisible && !isFlashing) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-1000",
        !isVisible && "opacity-0 pointer-events-none",
      )}
    >
      {!isPlaying && (
        <div className="absolute left-1/2 bottom-24 -translate-x-1/2 flex flex-col items-center gap-8 z-10">
          <button
            type="button"
            onClick={handleContinue}
            className="animate-bounce bg-black text-white font-nerko text-xl px-12 py-4 rounded-2xl transition-all hover:scale-110 active:scale-95 uppercase cursor-pointer"
          >
            CONTINUE
          </button>
        </div>
      )}

      <video
        ref={videoRef}
        src="/videos/mumu-the-bull-intro.mp4"
        poster="/images/onboarding-poster.png"
        preload="auto"
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
        )}
        muted
        playsInline
        onEnded={handleVideoEnded}
      />

      <div
        className={cn(
          "fixed inset-0 bg-white pointer-events-none transition-opacity duration-700 z-[110]",
          isFlashing ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
};

export default Onboarding;

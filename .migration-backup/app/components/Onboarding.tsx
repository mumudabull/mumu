"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
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
    // Lock scroll
    document.body.style.overflow = "hidden";
    return () => {
      // Unlock scroll
      document.body.style.overflow = "";
    };
  }, []);

  const handleContinue = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error("Video playback failed", err);
        // If playback fails, we could potentially just skip or show a fallback
        // But for now, we'll try to play it as requested.
      });
    }
  };

  const handleVideoEnded = () => {
    setIsFlashing(true);
    // 1. Wait for the flash to fully cover (fade in)
    setTimeout(() => {
      onComplete(); // Reveal main page behind the flash
      document.body.style.overflow = ""; // Ensure overflow is reset

      // 2. Start fading out the flash
      setIsFlashing(false);

      // 3. Finally hide the entire onboarding component once the flash is gone
      setTimeout(() => {
        setIsVisible(false);
      }, 1000); // Wait for the transition-opacity duration-1000 of the main container
    }, 400); // 400ms for the flash to fully cover (matches/slightly exceeds its 300ms transition)
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
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
        )}
        muted
        playsInline
        onEnded={handleVideoEnded}
      />

      {/* White Flash Transition - Fades in and out */}
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

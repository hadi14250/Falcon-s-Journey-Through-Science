"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { useGameStore } from "@/lib/store";
import { sounds } from "@/lib/sounds";
import GlobalSettings from "@/components/GlobalSettings";
import AssetPreloader from "@/components/AssetPreloader";

/* Wires persisted user preferences (sound, reduced motion) to runtime:
   - sounds.setMuted() so every sound call respects the toggle
   - MotionConfig reducedMotion disables all NEW framer-motion animations
   - .reduce-motion class on <html> kills all CSS transitions/animations
   - key prop on children forces remount so currently-running infinite
     animations (mascot idle, orbit, starfield) actually stop */

export default function SettingsProvider({ children }: { children: React.ReactNode }) {
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const reducedMotion = useGameStore((s) => s.reducedMotion);

  useEffect(() => {
    sounds.setMuted(!soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    const html = document.documentElement;
    if (reducedMotion) {
      html.classList.add("reduce-motion");
    } else {
      html.classList.remove("reduce-motion");
    }
  }, [reducedMotion]);

  return (
    <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>
      <div key={reducedMotion ? "rm-on" : "rm-off"} className="contents">
        {children}
        <GlobalSettings />
        <AssetPreloader />
      </div>
    </MotionConfig>
  );
}

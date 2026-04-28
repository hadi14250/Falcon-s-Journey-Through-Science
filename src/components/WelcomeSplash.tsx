"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface WelcomeSplashProps {
  onDone: () => void;
}

/* Brief UAE-themed splash before the landing hero loads.
   Shows once per browser session. */
export default function WelcomeSplash({ onDone }: WelcomeSplashProps) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 700);
    const t2 = setTimeout(() => setPhase("out"), 2200);
    const t3 = setTimeout(onDone, 2900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #FFF8E6 0%, #FFE9A8 50%, #FFF8E6 100%)" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "out" ? 0 : 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Decorative background — radial gold rays */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const r3 = (n: number) => Math.round(n * 1000) / 1000;
          return (
            <line
              key={i}
              x1={400}
              y1={300}
              x2={r3(400 + Math.cos(a) * 600)}
              y2={r3(300 + Math.sin(a) * 600)}
              stroke="#D4AF37"
              strokeWidth="1"
              opacity="0.3"
            />
          );
        })}
      </svg>

      <div className="relative flex flex-col items-center gap-6 max-w-md px-6">
        {/* Big UAE flag */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-xl border-2 border-[#1A1A2E]"
          initial={{ scale: 0, rotate: -10, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.1 }}
          style={{ boxShadow: "0 8px 0 rgba(184,134,46,0.4)" }}
        >
          <svg width="200" height="120" viewBox="0 0 200 120" aria-label="UAE flag">
            {/* fly side: green / white / black horizontal stripes */}
            <rect x="60" width="140" height="40" y="0" fill="#009639" />
            <rect x="60" width="140" height="40" y="40" fill="white" />
            <rect x="60" width="140" height="40" y="80" fill="#1A1A2E" />
            {/* red hoist on the LEFT */}
            <rect width="60" height="120" fill="#CE1126" />
          </svg>
        </motion.div>

        {/* Welcome text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase font-heading text-desert-night/60 mb-1">
            Welcome To
          </p>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-desert-night">
            The Emirates
          </h1>
          <p className="text-xl md:text-2xl font-body mt-1 text-gold-dark" dir="rtl">
            مرحبًا بكم في الإمارات
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-sm md:text-base font-body text-desert-night/65 text-center max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          A science journey through the eyes of an Emirati explorer
        </motion.p>

        {/* Khaleeji 8-point star spinner */}
        <motion.svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ marginTop: 8 }}
        >
          <path
            d="M12 0 L14.4 9.6 L24 12 L14.4 14.4 L12 24 L9.6 14.4 L0 12 L9.6 9.6 Z"
            fill="#D4AF37"
            stroke="#1A1A2E"
            strokeWidth="0.8"
          />
        </motion.svg>
      </div>
    </motion.div>
  );
}

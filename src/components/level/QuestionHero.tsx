"use client";

import { motion } from "framer-motion";

type Biome = "desert" | "oasis" | "sky" | "clouds" | "stratosphere" | "space";

interface QuestionHeroProps {
  biome: Biome;
  className?: string;
}

/* Per-biome subject illustration sitting above the question text.
   Subtly animated to give the card life without distracting from the question. */

function SunHero() {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      className="w-full h-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="qh-sun-c" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#FFE9A8" />
          <stop offset="55%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#7A2E07" />
        </radialGradient>
      </defs>
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const long = i % 2 === 0;
        const r1 = 38;
        const r2 = long ? 56 : 48;
        const r3 = (n: number) => Math.round(n * 1000) / 1000;
        return (
          <line
            key={i}
            x1={r3(60 + Math.cos(a) * r1)}
            y1={r3(60 + Math.sin(a) * r1)}
            x2={r3(60 + Math.cos(a) * r2)}
            y2={r3(60 + Math.sin(a) * r2)}
            stroke="#FCD34D"
            strokeWidth={long ? 2 : 1.2}
            strokeLinecap="round"
            opacity={long ? 0.7 : 0.45}
          />
        );
      })}
      <circle cx="60" cy="60" r="30" fill="url(#qh-sun-c)" />
      <circle cx="60" cy="60" r="30" fill="none" stroke="#FCD34D" strokeWidth="0.5" opacity="0.6" />
    </motion.svg>
  );
}

function EarthMoonHero() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="qh-earth" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#7AC4FF" />
          <stop offset="100%" stopColor="#1E3A5F" />
        </radialGradient>
      </defs>
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 60px" }}
      >
        <circle cx="60" cy="60" r="28" fill="url(#qh-earth)" />
        <path d="M40,50 Q52,46 56,56 Q48,64 40,50Z" fill="#16A34A" opacity="0.7" />
        <path d="M62,52 Q72,48 78,58 Q72,68 62,62Z" fill="#16A34A" opacity="0.6" />
        <path d="M48,72 Q58,68 64,76 Q56,82 48,72Z" fill="#16A34A" opacity="0.5" />
        <circle cx="60" cy="60" r="28" fill="none" stroke="#93C5FD" strokeWidth="0.5" opacity="0.4" />
      </motion.g>
      {/* Moon orbiting */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 60px" }}
      >
        <circle cx="60" cy="14" r="7" fill="#CBD5E1" />
        <circle cx="58" cy="12" r="2" fill="#94A3B8" opacity="0.4" />
        <circle cx="62" cy="16" r="1.4" fill="#94A3B8" opacity="0.3" />
      </motion.g>
    </svg>
  );
}

function MarsHero() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="qh-mars" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </radialGradient>
      </defs>
      {/* Tilted orbit ring */}
      <ellipse
        cx="60"
        cy="60"
        rx="50"
        ry="18"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="0.8"
        strokeDasharray="2 3"
        opacity="0.5"
        transform="rotate(-15 60 60)"
      />
      <motion.circle
        cx="60"
        cy="60"
        r="28"
        fill="url(#qh-mars)"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 60px" }}
      />
      <circle cx="50" cy="52" r="4" fill="#7F1D1D" opacity="0.4" />
      <circle cx="68" cy="62" r="3" fill="#7F1D1D" opacity="0.35" />
      <path d="M48,38 Q60,34 72,38 Q66,42 54,42Z" fill="#FEE2E2" opacity="0.55" />
    </svg>
  );
}

function AsteroidHero() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
      {/* Sun in the middle */}
      <circle cx="60" cy="60" r="6" fill="#F59E0B" />
      <circle cx="60" cy="60" r="9" fill="none" stroke="#FCD34D" strokeWidth="0.6" opacity="0.5" />
      {/* Belt */}
      <ellipse
        cx="60"
        cy="60"
        rx="44"
        ry="16"
        fill="none"
        stroke="#A8A29E"
        strokeWidth="6"
        opacity="0.18"
        transform="rotate(-12 60 60)"
      />
      {/* Orbiting asteroid */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 60px" }}
      >
        <g transform="translate(0 -42) rotate(-12)">
          <path
            d="M58,52 L66,55 L70,62 L66,68 L58,68 L52,62 L52,56 Z"
            fill="#78716C"
            stroke="#44403C"
            strokeWidth="0.8"
          />
          <circle cx="60" cy="60" r="1.5" fill="#44403C" opacity="0.5" />
        </g>
      </motion.g>
      {/* Static rocks */}
      {[
        { x: 22, y: 50, r: 2.5 },
        { x: 102, y: 70, r: 2 },
        { x: 32, y: 80, r: 2 },
        { x: 90, y: 40, r: 1.8 },
      ].map((a, i) => (
        <circle key={i} cx={a.x} cy={a.y} r={a.r} fill="#78716C" opacity="0.7" />
      ))}
    </svg>
  );
}

function GasGiantHero() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="qh-jupiter" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#92400E" />
        </radialGradient>
      </defs>
      <ellipse
        cx="60"
        cy="62"
        rx="52"
        ry="13"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="2"
        opacity="0.5"
      />
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 60px" }}
      >
        <circle cx="60" cy="60" r="30" fill="url(#qh-jupiter)" />
        <path d="M30,52 Q60,48 90,52" stroke="#92400E" strokeWidth="2" fill="none" opacity="0.45" />
        <path d="M28,60 Q60,56 92,60" stroke="#B45309" strokeWidth="2.4" fill="none" opacity="0.4" />
        <path d="M30,68 Q60,64 90,68" stroke="#92400E" strokeWidth="2" fill="none" opacity="0.35" />
        <ellipse cx="74" cy="64" rx="8" ry="5" fill="#DC2626" opacity="0.55" />
      </motion.g>
      {/* Front of ring */}
      <path d="M14,64 Q60,72 106,64" stroke="#D4AF37" strokeWidth="2" fill="none" opacity="0.55" />
    </svg>
  );
}

function HopeProbeHero() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="qh-mars2" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </radialGradient>
      </defs>
      {/* Mars */}
      <circle cx="60" cy="68" r="30" fill="url(#qh-mars2)" />
      <circle cx="50" cy="60" r="4" fill="#7F1D1D" opacity="0.4" />
      <path d="M48,46 Q60,42 72,46 Q66,50 54,50Z" fill="#FEE2E2" opacity="0.5" />
      {/* Orbit ring */}
      <ellipse
        cx="60"
        cy="68"
        rx="48"
        ry="16"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="0.6"
        strokeDasharray="2 3"
        opacity="0.5"
        transform="rotate(-18 60 68)"
      />
      {/* Orbiting Hope Probe */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 68px" }}
      >
        <g transform="translate(0 -50) rotate(-18)">
          {/* Body */}
          <rect x="56" y="62" width="10" height="6" rx="1.2" fill="#D4AF37" stroke="#9C7C28" strokeWidth="0.4" />
          {/* Solar panels */}
          <rect x="44" y="63" width="11" height="4" rx="0.6" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="0.3" />
          <rect x="67" y="63" width="11" height="4" rx="0.6" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="0.3" />
          {/* Antenna */}
          <line x1="61" y1="62" x2="61" y2="58" stroke="#D4AF37" strokeWidth="0.7" />
          <circle cx="61" cy="57.5" r="0.9" fill="#D4AF37" />
        </g>
      </motion.g>
    </svg>
  );
}

const heroes: Record<Biome, React.ComponentType> = {
  desert: SunHero,
  oasis: EarthMoonHero,
  sky: MarsHero,
  clouds: AsteroidHero,
  stratosphere: GasGiantHero,
  space: HopeProbeHero,
};

export default function QuestionHero({ biome, className = "" }: QuestionHeroProps) {
  const Hero = heroes[biome];
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="w-20 h-20 md:w-24 md:h-24">
        <Hero />
      </div>
    </div>
  );
}

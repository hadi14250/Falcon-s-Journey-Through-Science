"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LearningCard } from "@/data/levels";
import { sounds } from "@/lib/sounds";
import Companion from "@/components/mascot/Companion";
import { Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";

interface LearningCardsProps {
  cards: LearningCard[];
  darkBg?: boolean;
  onComplete: () => void;
}

const COMPANION_HINTS = [
  "Yalla, let's learn!",
  "Amazing fact!",
  "Cool, right?",
  "Keep going!",
  "Almost there!",
];

/* ---- Themed card illustrations ---- */
function CardIllustration({ type }: { type: string }) {
  const illustrations: Record<string, React.ReactNode> = {
    /* Level 1 — Sun */
    "sun-glow": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <radialGradient id="sg1" cx="50%" cy="50%"><stop offset="0%" stopColor="#FDE68A" /><stop offset="100%" stopColor="#F59E0B" /></radialGradient>
        </defs>
        {[0,30,60,90,120,150,180,210,240,270,300,330].map(a=>(
          <line key={a} x1="60" y1="60" x2={Math.round((60+Math.cos(a*Math.PI/180)*50)*1000)/1000} y2={Math.round((60+Math.sin(a*Math.PI/180)*50)*1000)/1000} stroke="#FCD34D" strokeWidth="2.5" strokeLinecap="round" opacity="0.6">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" begin={`${a/360}s`} />
          </line>
        ))}
        <circle cx="60" cy="60" r="28" fill="url(#sg1)">
          <animate attributeName="r" values="26;30;26" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="52" cy="52" r="8" fill="#FDE68A" opacity="0.5" />
      </svg>
    ),
    "sun-temperature": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <radialGradient id="st1" cx="50%" cy="50%"><stop offset="0%" stopColor="#FEF3C7" /><stop offset="40%" stopColor="#F59E0B" /><stop offset="100%" stopColor="#DC2626" /></radialGradient>
        </defs>
        <circle cx="60" cy="60" r="35" fill="url(#st1)" />
        <circle cx="60" cy="60" r="15" fill="#FDE68A" opacity="0.6" />
        {/* Heatwaves */}
        {[0,1,2].map(i=>(
          <circle key={i} cx="60" cy="60" r={40+i*8} fill="none" stroke="#EF4444" strokeWidth="1" opacity="0.2">
            <animate attributeName="r" values={`${40+i*8};${46+i*8};${40+i*8}`} dur="2s" repeatCount="indefinite" begin={`${i*0.3}s`} />
          </circle>
        ))}
      </svg>
    ),
    "sun-earth": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="25" cy="60" r="18" fill="#F59E0B" />
        <circle cx="25" cy="60" r="10" fill="#FDE68A" opacity="0.5" />
        {/* Light rays to earth */}
        <line x1="43" y1="55" x2="75" y2="55" stroke="#FCD34D" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
        <line x1="43" y1="60" x2="75" y2="60" stroke="#FCD34D" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
        <line x1="43" y1="65" x2="75" y2="65" stroke="#FCD34D" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
        <circle cx="90" cy="60" r="14" fill="#3B82F6" />
        <path d="M82,52 Q88,50 92,55 Q96,58 90,62 Q86,56 82,52Z" fill="#22C55E" opacity="0.6" />
        <path d="M86,65 Q92,62 96,66 Q92,70 86,65Z" fill="#22C55E" opacity="0.5" />
      </svg>
    ),
    /* Level 2 — Earth & Moon */
    "earth": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs><radialGradient id="e1" cx="40%" cy="40%"><stop offset="0%" stopColor="#60A5FA" /><stop offset="100%" stopColor="#2563EB" /></radialGradient></defs>
        <circle cx="60" cy="60" r="35" fill="url(#e1)" />
        <path d="M40,35 Q50,30 55,40 Q60,48 48,55 Q42,50 40,35Z" fill="#16A34A" opacity="0.7" />
        <path d="M62,42 Q72,38 78,48 Q72,58 62,52Z" fill="#16A34A" opacity="0.6" />
        <path d="M45,65 Q55,60 62,70 Q52,76 45,65Z" fill="#16A34A" opacity="0.5" />
        <circle cx="60" cy="60" r="35" fill="none" stroke="#93C5FD" strokeWidth="1" opacity="0.4" />
        <circle cx="52" cy="45" r="8" fill="#93C5FD" opacity="0.15" />
      </svg>
    ),
    "day-night": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <clipPath id="dn-left"><rect x="0" y="0" width="60" height="120" /></clipPath>
          <clipPath id="dn-right"><rect x="60" y="0" width="60" height="120" /></clipPath>
        </defs>
        {/* Day side */}
        <g clipPath="url(#dn-left)">
          <circle cx="60" cy="60" r="32" fill="#3B82F6" />
          <path d="M40,40 Q52,36 56,46 Q48,54 40,40Z" fill="#22C55E" opacity="0.6" />
        </g>
        {/* Night side */}
        <g clipPath="url(#dn-right)">
          <circle cx="60" cy="60" r="32" fill="#1E3A5F" />
          <circle cx="70" cy="50" r="1" fill="#FDE68A" opacity="0.8" />
          <circle cx="80" cy="65" r="0.8" fill="#FDE68A" opacity="0.6" />
        </g>
        <circle cx="60" cy="60" r="32" fill="none" stroke="#94A3B8" strokeWidth="1" />
        {/* Sun indicator */}
        <circle cx="15" cy="30" r="8" fill="#F59E0B" opacity="0.6" />
        {/* Moon indicator */}
        <circle cx="105" cy="30" r="6" fill="#CBD5E1" opacity="0.6" />
      </svg>
    ),
    "moon": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="60" r="30" fill="#CBD5E1" />
        <circle cx="50" cy="50" r="6" fill="#94A3B8" opacity="0.4" />
        <circle cx="70" cy="55" r="4" fill="#94A3B8" opacity="0.3" />
        <circle cx="55" cy="72" r="5" fill="#94A3B8" opacity="0.35" />
        <circle cx="65" cy="45" r="3" fill="#94A3B8" opacity="0.25" />
        <circle cx="60" cy="60" r="30" fill="none" stroke="#E2E8F0" strokeWidth="1" />
        {/* Stars */}
        <circle cx="15" cy="20" r="1" fill="white" opacity="0.6" />
        <circle cx="100" cy="25" r="1.2" fill="white" opacity="0.5" />
        <circle cx="20" cy="90" r="0.8" fill="white" opacity="0.4" />
        <circle cx="95" cy="85" r="1" fill="white" opacity="0.5" />
      </svg>
    ),
    "moon-phases": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* 4 moon phases in a row */}
        {[
          { cx: 20, shadow: 0 },
          { cx: 47, shadow: 8 },
          { cx: 73, shadow: 0 },
          { cx: 100, shadow: -8 },
        ].map((m,i)=>(
          <g key={i}>
            <circle cx={m.cx} cy="60" r="12" fill="#CBD5E1" />
            {m.shadow !== 0 && <circle cx={m.cx + m.shadow} cy="60" r="11" fill="#1E293B" />}
            {m.shadow === 0 && i === 0 && <circle cx={m.cx} cy="60" r="11" fill="#1E293B" />}
          </g>
        ))}
        <text x="20" y="85" textAnchor="middle" fill="#64748B" fontSize="7" fontFamily="sans-serif">New</text>
        <text x="47" y="85" textAnchor="middle" fill="#64748B" fontSize="7" fontFamily="sans-serif">Quarter</text>
        <text x="73" y="85" textAnchor="middle" fill="#64748B" fontSize="7" fontFamily="sans-serif">Full</text>
        <text x="100" y="85" textAnchor="middle" fill="#64748B" fontSize="7" fontFamily="sans-serif">Waning</text>
      </svg>
    ),
    /* Level 3 — Inner Planets */
    "mercury": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="60" r="22" fill="#9CA3AF" />
        <circle cx="52" cy="52" r="4" fill="#6B7280" opacity="0.5" />
        <circle cx="68" cy="58" r="3" fill="#6B7280" opacity="0.4" />
        <circle cx="56" cy="68" r="5" fill="#6B7280" opacity="0.3" />
        <circle cx="64" cy="48" r="2.5" fill="#6B7280" opacity="0.35" />
        {/* Speed lines */}
        <line x1="90" y1="50" x2="110" y2="50" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <line x1="92" y1="58" x2="108" y2="58" stroke="#D1D5DB" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
        <line x1="88" y1="66" x2="106" y2="66" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
    "venus": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs><radialGradient id="v1" cx="40%" cy="40%"><stop offset="0%" stopColor="#FDE68A" /><stop offset="100%" stopColor="#D97706" /></radialGradient></defs>
        <circle cx="60" cy="60" r="28" fill="url(#v1)" />
        {/* Cloud bands */}
        <path d="M35,50 Q48,46 60,50 Q72,54 85,50" stroke="#FEF3C7" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M38,60 Q50,56 62,60 Q74,64 82,60" stroke="#FEF3C7" strokeWidth="2" fill="none" opacity="0.4" />
        <path d="M40,70 Q52,66 64,70 Q76,74 80,70" stroke="#FEF3C7" strokeWidth="1.5" fill="none" opacity="0.3" />
      </svg>
    ),
    "mars": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs><radialGradient id="m1" cx="40%" cy="40%"><stop offset="0%" stopColor="#F87171" /><stop offset="100%" stopColor="#B91C1C" /></radialGradient></defs>
        <circle cx="60" cy="60" r="26" fill="url(#m1)" />
        <circle cx="50" cy="52" r="5" fill="#991B1B" opacity="0.4" />
        <circle cx="68" cy="62" r="4" fill="#991B1B" opacity="0.3" />
        {/* Polar cap */}
        <path d="M48,38 Q60,34 72,38 Q66,42 54,42Z" fill="#FEE2E2" opacity="0.5" />
      </svg>
    ),
    "rocky-planets": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="25" cy="70" r="8" fill="#9CA3AF" />
        <circle cx="50" cy="55" r="11" fill="#D97706" />
        <circle cx="78" cy="60" r="13" fill="#3B82F6" />
        <path d="M70,52 Q76,50 80,54 Q84,56 78,60Z" fill="#22C55E" opacity="0.5" />
        <circle cx="105" cy="68" r="10" fill="#EF4444" />
      </svg>
    ),
    /* Level 4 — Asteroids */
    "asteroids": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <path d="M60,30 L72,38 L78,52 L74,64 L62,70 L48,66 L42,54 L46,40Z" fill="#78716C" stroke="#57534E" strokeWidth="1.5" />
        <circle cx="55" cy="48" r="3" fill="#57534E" opacity="0.4" />
        <circle cx="65" cy="58" r="2.5" fill="#57534E" opacity="0.3" />
        <path d="M20,80 L26,76 L30,82 L24,86Z" fill="#A8A29E" />
        <path d="M95,35 L100,32 L103,37 L98,40Z" fill="#A8A29E" />
        <circle cx="85" cy="85" r="4" fill="#A8A29E" />
      </svg>
    ),
    "asteroid-belt": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Sun */}
        <circle cx="60" cy="60" r="8" fill="#F59E0B" />
        {/* Belt */}
        <ellipse cx="60" cy="60" rx="45" ry="20" fill="none" stroke="#A8A29E" strokeWidth="8" opacity="0.15" transform="rotate(-10 60 60)" />
        {/* Scattered rocks */}
        {[{x:18,y:52,r:2.5},{x:30,y:42,r:2},{x:95,y:55,r:3},{x:85,y:72,r:2},{x:42,y:75,r:2.5},{x:72,y:40,r:2},{x:102,y:62,r:1.8}].map((a,i)=>(
          <circle key={i} cx={a.x} cy={a.y} r={a.r} fill="#78716C" />
        ))}
      </svg>
    ),
    "asteroid-shapes": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <path d="M30,50 L38,42 L48,44 L52,54 L46,62 L34,58Z" fill="#78716C" stroke="#57534E" strokeWidth="1" />
        <path d="M65,35 L78,32 L85,42 L82,55 L70,52 L64,44Z" fill="#A8A29E" stroke="#78716C" strokeWidth="1" />
        <path d="M50,75 L60,68 L72,72 L75,82 L65,90 L52,85Z" fill="#57534E" stroke="#44403C" strokeWidth="1" />
        <circle cx="40" cy="52" r="1.5" fill="#44403C" opacity="0.4" />
        <circle cx="74" cy="44" r="2" fill="#57534E" opacity="0.3" />
      </svg>
    ),
    /* Level 5 — Outer Planets */
    "jupiter": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs><radialGradient id="j1" cx="40%" cy="40%"><stop offset="0%" stopColor="#FDE68A" /><stop offset="100%" stopColor="#D97706" /></radialGradient></defs>
        <circle cx="60" cy="60" r="35" fill="url(#j1)" />
        <path d="M28,48 Q60,44 92,48" stroke="#92400E" strokeWidth="3" fill="none" opacity="0.4" />
        <path d="M26,56 Q60,52 94,56" stroke="#B45309" strokeWidth="2.5" fill="none" opacity="0.35" />
        <path d="M28,68 Q60,64 92,68" stroke="#92400E" strokeWidth="3" fill="none" opacity="0.3" />
        <path d="M30,76 Q60,72 90,76" stroke="#B45309" strokeWidth="2" fill="none" opacity="0.25" />
        {/* Great Red Spot */}
        <ellipse cx="72" cy="62" rx="8" ry="5" fill="#DC2626" opacity="0.5" />
      </svg>
    ),
    "saturn": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs><radialGradient id="s1" cx="40%" cy="40%"><stop offset="0%" stopColor="#FDE68A" /><stop offset="100%" stopColor="#D97706" /></radialGradient></defs>
        <ellipse cx="60" cy="65" rx="50" ry="12" fill="none" stroke="#D4AF37" strokeWidth="4" opacity="0.4" />
        <circle cx="60" cy="58" r="24" fill="url(#s1)" />
        <path d="M38,50 Q60,46 82,50" stroke="#B45309" strokeWidth="1.5" fill="none" opacity="0.3" />
        <path d="M40,58 Q60,54 80,58" stroke="#92400E" strokeWidth="1" fill="none" opacity="0.25" />
        {/* Front of ring */}
        <path d="M36,65 Q60,72 84,65" stroke="#D4AF37" strokeWidth="4" fill="none" opacity="0.4" />
      </svg>
    ),
    "ice-giants": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Uranus */}
        <circle cx="40" cy="55" r="18" fill="#67E8F9" />
        <circle cx="40" cy="55" r="18" fill="none" stroke="#06B6D4" strokeWidth="1" />
        <ellipse cx="40" cy="55" rx="6" ry="22" fill="none" stroke="#A5F3FC" strokeWidth="1.5" opacity="0.4" transform="rotate(80 40 55)" />
        {/* Neptune */}
        <circle cx="85" cy="60" r="20" fill="#3B82F6" />
        <circle cx="85" cy="60" r="20" fill="none" stroke="#2563EB" strokeWidth="1" />
        <path d="M68,55 Q85,50 102,55" stroke="#93C5FD" strokeWidth="1.5" fill="none" opacity="0.3" />
        <path d="M70,62 Q85,58 100,62" stroke="#93C5FD" strokeWidth="1" fill="none" opacity="0.25" />
        <circle cx="78" cy="58" r="3" fill="#1D4ED8" opacity="0.4" />
      </svg>
    ),
    "gas-vs-rocky": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Rocky side */}
        <circle cx="25" cy="60" r="8" fill="#9CA3AF" />
        <circle cx="42" cy="55" r="10" fill="#3B82F6" />
        {/* Divider */}
        <line x1="60" y1="30" x2="60" y2="90" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="3 3" />
        {/* Gas side */}
        <circle cx="82" cy="50" r="16" fill="#D97706" opacity="0.8" />
        <circle cx="100" cy="68" r="12" fill="#67E8F9" opacity="0.8" />
      </svg>
    ),
    /* Level 6 — Hope Probe */
    "hope-probe": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Probe body */}
        <rect x="48" y="35" width="24" height="18" rx="3" fill="#D4AF37" stroke="#B8962E" strokeWidth="1" />
        {/* Solar panels */}
        <rect x="18" y="38" width="28" height="12" rx="2" fill="#3B82F6" stroke="#2563EB" strokeWidth="0.5" />
        <rect x="74" y="38" width="28" height="12" rx="2" fill="#3B82F6" stroke="#2563EB" strokeWidth="0.5" />
        {/* Panel lines */}
        <line x1="28" y1="38" x2="28" y2="50" stroke="#2563EB" strokeWidth="0.4" opacity="0.5" />
        <line x1="36" y1="38" x2="36" y2="50" stroke="#2563EB" strokeWidth="0.4" opacity="0.5" />
        <line x1="84" y1="38" x2="84" y2="50" stroke="#2563EB" strokeWidth="0.4" opacity="0.5" />
        <line x1="92" y1="38" x2="92" y2="50" stroke="#2563EB" strokeWidth="0.4" opacity="0.5" />
        {/* Antenna */}
        <line x1="60" y1="35" x2="60" y2="22" stroke="#D4AF37" strokeWidth="1.5" />
        <circle cx="60" cy="20" r="3" fill="#D4AF37" />
        {/* Mars below */}
        <circle cx="60" cy="90" r="18" fill="#EF4444" opacity="0.3" />
        <circle cx="60" cy="90" r="14" fill="#EF4444" opacity="0.2" />
      </svg>
    ),
    "hope-mars": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs><radialGradient id="hm1" cx="40%" cy="40%"><stop offset="0%" stopColor="#F87171" /><stop offset="100%" stopColor="#B91C1C" /></radialGradient></defs>
        <circle cx="60" cy="60" r="35" fill="url(#hm1)" />
        <circle cx="50" cy="50" r="5" fill="#991B1B" opacity="0.4" />
        <circle cx="72" cy="62" r="4" fill="#991B1B" opacity="0.3" />
        {/* Orbit line */}
        <ellipse cx="60" cy="60" rx="48" ry="18" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" transform="rotate(-15 60 60)" />
        {/* Tiny probe */}
        <rect x="95" y="42" width="6" height="4" rx="1" fill="#D4AF37" />
        <rect x="88" y="43" width="6" height="2" fill="#3B82F6" />
        <rect x="102" y="43" width="6" height="2" fill="#3B82F6" />
      </svg>
    ),
    "uae-astronaut": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Helmet */}
        <circle cx="60" cy="45" r="20" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1.5" />
        <circle cx="60" cy="45" r="14" fill="#1E3A5F" />
        <circle cx="56" cy="42" r="3" fill="#3B82F6" opacity="0.3" />
        {/* Body */}
        <rect x="44" y="65" width="32" height="30" rx="8" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" />
        {/* UAE flag patch */}
        <rect x="50" y="72" width="10" height="7" rx="1" fill="#009639" />
        <rect x="50" y="72" width="3" height="7" fill="#CE1126" />
        {/* Stars */}
        <circle cx="15" cy="20" r="1" fill="white" opacity="0.5" />
        <circle cx="105" cy="30" r="1.2" fill="white" opacity="0.4" />
        <circle cx="20" cy="95" r="0.8" fill="white" opacity="0.3" />
      </svg>
    ),
    "mars-city": (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Mars surface */}
        <rect x="0" y="80" width="120" height="40" rx="0" fill="#B91C1C" opacity="0.3" />
        <path d="M0,80 Q30,75 60,80 Q90,85 120,78 L120,80 L0,80Z" fill="#EF4444" opacity="0.4" />
        {/* Dome buildings */}
        <path d="M25,80 Q25,60 40,60 Q55,60 55,80Z" fill="#94A3B8" opacity="0.6" stroke="#64748B" strokeWidth="0.5" />
        <path d="M60,80 Q60,55 80,55 Q100,55 100,80Z" fill="#94A3B8" opacity="0.5" stroke="#64748B" strokeWidth="0.5" />
        <rect x="38" y="72" width="4" height="8" fill="#3B82F6" opacity="0.5" />
        <rect x="78" y="68" width="4" height="12" fill="#3B82F6" opacity="0.5" />
        {/* UAE flag */}
        <rect x="50" y="35" width="1.5" height="30" fill="#9CA3AF" />
        <rect x="52" y="35" width="12" height="3" fill="#CE1126" />
        <rect x="52" y="38" width="12" height="3" fill="#009639" />
        <rect x="52" y="41" width="12" height="3" fill="white" />
      </svg>
    ),
  };

  return (
    <div className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-2 md:mb-4 rounded-2xl bg-gradient-to-br from-sand-beige/50 to-white/30 p-1.5 md:p-2 border border-gold/10">
      {illustrations[type] || (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <circle cx="60" cy="60" r="35" fill="#E8D5B7" />
          <circle cx="60" cy="60" r="25" fill="#D4AF37" opacity="0.3" />
          <circle cx="60" cy="55" r="5" fill="#B8962E" opacity="0.5" />
          <path d="M45,70 Q60,80 75,70" stroke="#B8962E" strokeWidth="2" fill="none" opacity="0.4" />
        </svg>
      )}
    </div>
  );
}

export default function LearningCards({ cards, darkBg = false, onComplete }: LearningCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const headerText = darkBg ? "text-white/70" : "text-desert-night/60";
  const subText = darkBg ? "text-white/50" : "text-desert-night/50";

  const handleNext = () => {
    sounds.next();
    if (currentIndex < cards.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      sounds.tap();
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const card = cards[currentIndex];
  const isLastCard = currentIndex === cards.length - 1;
  const hint = COMPANION_HINTS[currentIndex % COMPANION_HINTS.length];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 280 : -280,
      opacity: 0,
      scale: 0.92,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 280 : -280,
      opacity: 0,
      scale: 0.92,
      transition: { duration: 0.25, ease: "easeIn" as const },
    }),
  };

  return (
    <motion.div
      className="h-dvh flex flex-col px-3 md:px-4 pt-3 md:pt-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* ---- HEADER: progress bar + counter ---- */}
      <motion.div
        className="w-full max-w-md mx-auto shrink-0 pt-12 md:pt-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className={`inline-flex items-center gap-1.5 text-xs font-heading ${headerText}`}>
            <Lightbulb className="w-3.5 h-3.5 text-gold" />
            Card {currentIndex + 1} / {cards.length}
          </span>
          <span className={`text-[10px] font-heading ${subText}`}>
            Learning phase
          </span>
        </div>

        {/* Progress bar */}
        <div className="relative h-2.5 bg-sand-warm/20 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold to-amber-400"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* ---- COMPANION STRIP — inline hint, its own row ---- */}
      <motion.div
        key={`comp-${currentIndex}`}
        className="shrink-0 flex items-end gap-1.5 mt-2 max-w-md mx-auto w-full px-1"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.2 }}
      >
        {/* Companion clipped to its visual size so the bubble sits right next to it */}
        <div className="w-10 h-10 shrink-0 overflow-hidden relative">
          <div className="scale-50 origin-top-left absolute top-0 left-0">
            <Companion size="sm" mood="happy" />
          </div>
        </div>
        <div className="bg-white rounded-2xl rounded-bl-none shadow-md border border-gold/20 px-3 py-1.5 text-xs font-body text-desert-night max-w-[260px]">
          {hint}
        </div>
      </motion.div>

      {/* ---- CARD CONTENT — fills available space, no scroll ---- */}
      <div className="flex-1 min-h-0 flex items-center justify-center py-2 md:py-4">
        <div className="max-w-md w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-white/95 rounded-2xl md:rounded-3xl shadow-xl p-3.5 md:p-5 border-2 border-gold/20 relative"
            >
              {/* Corner ornaments */}
              <svg className="absolute top-0 left-0 w-8 h-8 md:w-10 md:h-10 text-gold/20 pointer-events-none" viewBox="0 0 40 40" aria-hidden="true">
                <path d="M0 0 L20 0 Q10 10 0 20 Z" fill="currentColor" />
                <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.5" />
              </svg>
              <svg className="absolute top-0 right-0 w-8 h-8 md:w-10 md:h-10 text-gold/20 rotate-90 pointer-events-none" viewBox="0 0 40 40" aria-hidden="true">
                <path d="M0 0 L20 0 Q10 10 0 20 Z" fill="currentColor" />
                <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.5" />
              </svg>

              {/* Illustration */}
              <CardIllustration type={card.illustration} />

              {/* Title */}
              <h2 className="text-base md:text-xl font-heading font-bold text-desert-night text-center mb-2">
                {card.title}
              </h2>

              {/* Body */}
              <p className="text-xs md:text-base font-body text-desert-night/80 leading-snug md:leading-relaxed mb-2 md:mb-3">
                {card.body}
              </p>

              {/* Fun fact */}
              <div className="bg-gradient-to-r from-gold/10 to-amber-50 rounded-lg md:rounded-xl p-2 md:p-3 border border-gold/20">
                <p className="text-[11px] md:text-sm font-body text-desert-night/70 leading-snug">
                  <span className="inline-flex items-center gap-1 font-heading font-semibold text-gold-dark text-[11px] md:text-sm">
                    <Lightbulb className="w-3 h-3 md:w-4 md:h-4 text-gold" />
                    Fun Fact:
                  </span>{" "}
                  {card.funFact}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ---- STICKY BOTTOM BAR: back + next ---- */}
      <div className="shrink-0 pt-2 pb-3 px-1">

        <div className="max-w-md mx-auto flex items-center gap-2">
          <motion.button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-xl bg-white border-2 border-sand-warm/40 flex items-center justify-center shadow-md transition-opacity ${
              currentIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-100 hover:bg-sand-beige"
            }`}
            whileTap={{ scale: 0.92 }}
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5 text-desert-night" />
          </motion.button>

          <motion.button
            onClick={handleNext}
            className={`flex-1 flex items-center justify-center gap-2 px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-heading font-bold text-sm md:text-base text-white shadow-lg ${
              isLastCard
                ? "bg-gradient-to-r from-uae-red to-red-700 shadow-red-500/30"
                : "bg-gradient-to-r from-gold to-amber-500 shadow-amber-500/30"
            }`}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {isLastCard ? (
              <>
                Start Quiz!
                <ChevronRight className="w-5 h-5" />
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </motion.button>

          {/* Invisible mirror of the Back button so Continue stays centered */}
          <div className="shrink-0 w-11 h-11 md:w-12 md:h-12 invisible" aria-hidden="true" />
        </div>
      </div>
    </motion.div>
  );
}

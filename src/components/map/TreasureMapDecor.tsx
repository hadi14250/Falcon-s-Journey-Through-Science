"use client";

import { motion } from "framer-motion";

/* Vintage map decorations — compass rose, scroll edges, faded coordinate ticks.
   Sits as a fixed-position non-interactive layer on the JourneyMap (desktop). */

function CompassRose({ size = 90 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      animate={{ rotate: 360 }}
      transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
      style={{ opacity: 0.55 }}
    >
      <defs>
        <radialGradient id="compass-bg">
          <stop offset="0%" stopColor="rgba(212,175,55,0.15)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="url(#compass-bg)" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="#5C4510" strokeWidth="0.6" opacity="0.6" />
      <circle cx="50" cy="50" r="36" fill="none" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="1 2" opacity="0.7" />
      {/* Cardinal points */}
      {[
        { angle: -90, label: "N" },
        { angle: 0, label: "E" },
        { angle: 90, label: "S" },
        { angle: 180, label: "W" },
      ].map(({ angle, label }) => {
        const a = (angle * Math.PI) / 180;
        const x = 50 + Math.cos(a) * 38;
        const y = 50 + Math.sin(a) * 38;
        return (
          <text
            key={label}
            x={x}
            y={y + 2}
            textAnchor="middle"
            fontSize="6"
            fontFamily="serif"
            fill="#5C4510"
            opacity="0.7"
          >
            {label}
          </text>
        );
      })}
      {/* Star points */}
      {[0, 90, 180, 270].map((angle) => {
        const a = (angle * Math.PI) / 180;
        const r3 = (n: number) => Math.round(n * 1000) / 1000;
        const x1 = r3(50 + Math.cos(a) * 6);
        const y1 = r3(50 + Math.sin(a) * 6);
        const x2 = r3(50 + Math.cos(a) * 30);
        const y2 = r3(50 + Math.sin(a) * 30);
        return (
          <polygon
            key={angle}
            points={`${x1},${y1} ${r3(50 + Math.cos(a + Math.PI / 4) * 4)},${r3(50 + Math.sin(a + Math.PI / 4) * 4)} ${x2},${y2} ${r3(50 + Math.cos(a - Math.PI / 4) * 4)},${r3(50 + Math.sin(a - Math.PI / 4) * 4)}`}
            fill="#8B6914"
            stroke="#5C4510"
            strokeWidth="0.3"
            opacity="0.7"
          />
        );
      })}
      <circle cx="50" cy="50" r="3" fill="#D4AF37" stroke="#8B6914" strokeWidth="0.5" />
    </motion.svg>
  );
}

export default function TreasureMapDecor() {
  return (
    <div className="hidden md:block fixed inset-0 pointer-events-none z-0">
      {/* Compass rose — bottom-left */}
      <div className="absolute bottom-24 left-6 opacity-90">
        <CompassRose />
      </div>

      {/* Scroll-edge gradient at top + bottom (subtle parchment vignette) */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-amber-900/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-950/20 to-transparent" />

      {/* Latitude/longitude tick marks — faded along the right edge */}
      <svg
        className="absolute top-1/4 right-3 w-3 h-1/2 opacity-30"
        viewBox="0 0 12 200"
        aria-hidden="true"
      >
        {Array.from({ length: 11 }).map((_, i) => (
          <g key={i}>
            <line x1="0" y1={i * 20} x2={i % 2 === 0 ? 8 : 4} y2={i * 20} stroke="#5C4510" strokeWidth="0.5" />
            {i % 2 === 0 && (
              <text x="10" y={i * 20 + 2} fontSize="6" fontFamily="serif" fill="#5C4510">
                {30 - i * 6}°
              </text>
            )}
          </g>
        ))}
      </svg>

      {/* Aged corner ornaments */}
      {(
        [
          { top: "8%", left: "6%", deg: 0 },
          { top: "8%", right: "6%", deg: 90 },
        ] as const
      ).map((pos, i) => {
        const { deg, ...rest } = pos;
        return (
          <svg
            key={i}
            className="absolute w-12 h-12 opacity-30"
            viewBox="0 0 40 40"
            style={{ ...rest, transform: `rotate(${deg}deg)` }}
            aria-hidden="true"
          >
            <path d="M0,0 L20,0 Q10,10 0,20 Z" fill="#8B6914" />
            <circle cx="6" cy="6" r="1.5" fill="#5C4510" />
            <path d="M3 14 Q10 10 14 3" stroke="#5C4510" strokeWidth="0.5" fill="none" />
          </svg>
        );
      })}
    </div>
  );
}

"use client";

import { USER_STICKER_SVGS } from "./userStickers";
import { motion } from "framer-motion";

/* =====================================================================
   STICKER ILLUSTRATIONS — Grade-4 friendly, flat-color sticker style.
   - Big shapes, single fills, thick #1A1A2E or #2D2D4A outlines.
   - No gradients (except subtle radials for sun glow).
   - Each piece designed to stand alone at 200-400px.
   - All 24x24 viewBox-mapped to 240x240 working canvas for stroke clarity.
   ===================================================================== */

export type StickerName =
  | "sun"
  | "sun-hot"
  | "sun-and-earth"
  | "earth"
  | "moon"
  | "moon-full"
  | "moon-crescent"
  | "moon-phases"
  | "day-night"
  | "mercury"
  | "venus"
  | "mars"
  | "rocky-planets"
  | "asteroid"
  | "asteroid-belt"
  | "asteroid-shapes"
  | "jupiter"
  | "saturn"
  | "ice-giants"
  | "gas-vs-rocky"
  | "hope-probe"
  | "hope-mars"
  | "uae-astronaut"
  | "mars-city"
  | "rocket"
  | "telescope"
  | "star"
  | "comet"
  | "uae-flag"
  | "dallah"
  | "ghaf-tree"
  // UAE landmarks
  | "burj-khalifa"
  | "sheikh-zayed-mosque"
  | "burj-al-arab"
  | "louvre-abu-dhabi"
  | "dhow-boat"
  | "qasr-al-hosn"
  // Heritage subject — emirate signature stickers
  | "al-noor-mosque"
  | "ajman-fort"
  | "flamingo"
  | "uaq-fort"
  | "cormorant"
  | "jebel-jais"
  | "al-bidya-mosque"
  | "snoopy-island"
  | "pearl-oyster"
  // Abu Dhabi step-level stickers
  | "abu-dhabi-map"
  | "gazelle"
  | "mosque-domes-closeup"
  | "mosque-night"
  | "mosque-arch"
  | "liwa-dunes"
  | "tal-moreeb"
  | "sheikh-zayed-portrait"
  | "qasr-al-watan"
  | "bedouin-tent"
  // Dubai step-level stickers
  | "dubai-map"
  | "palm-jumeirah"
  | "dubai-creek"
  | "dubai-frame"
  | "pearl-diver"
  | "burj-khalifa-night"
  | "gold-souq"
  | "wind-tower"
  | "hatta-dam"
  | "dubai-skyline"
  // Sharjah step-level stickers
  | "sharjah-map"
  | "two-seas-map"
  | "sharjah-museum"
  | "mleiha-tools"
  | "khor-fakkan-beach"
  | "khor-fakkan-amphitheater"
  | "sharjah-book"
  | "algebra-scroll"
  | "cultural-square"
  | "hajar-mountains"
  // Ajman step-level stickers
  | "ajman-map"
  | "dhow-yard"
  | "mowaihat-tomb"
  | "ajman-corniche"
  | "mangrove-trees"
  | "bronze-age-pottery"
  | "pearl-shell"
  | "coral-stone-wall"
  | "fisherman-net"
  | "ajman-skyline"
  // Umm Al Quwain step-level stickers
  | "uaq-map"
  | "al-sinniyah-island"
  | "ed-dur-ruins"
  | "falaj"
  | "roman-trade"
  | "lagoon-mangrove"
  | "pearling-village"
  | "seabird-flock"
  | "gazelle-island"
  | "uaq-skyline"
  // Ras Al Khaimah step-level stickers
  | "rak-map"
  | "dhayah-fort"
  | "pearl-farm"
  | "zipline-rider"
  | "snowy-peak"
  | "mountain-village"
  | "oyster-rope"
  | "ancient-port"
  | "palm-tent"
  | "rak-skyline"
  // Fujairah step-level stickers
  | "fujairah-map"
  | "wadi"
  | "mango-orchard"
  | "sea-turtle"
  | "coral-reef"
  | "clownfish"
  | "fujairah-fort"
  | "bidya-domes-closeup"
  | "gulf-of-oman"
  | "fujairah-skyline"
  // Space subject — Sun & Earth/Moon level extras
  | "sun-rays"
  | "sun-corona"
  | "sun-vs-earth-size"
  | "sunlight-travel"
  | "plant-photosynthesis"
  | "sun-temperature"
  | "earth-water"
  | "earth-rotation"
  | "moon-orbit"
  | "moon-reflect"
  | "tides"
  | "moon-cycle"
  | "earth-from-space"
  | "earth-night"
  // Space subject — Inner Planets (L3) extras
  | "mercury-craters"
  | "mercury-fast"
  | "venus-clouds"
  | "venus-hot"
  | "mars-rover"
  | "mars-poles"
  | "mars-canyon"
  | "inner-orbit"
  | "red-planet-closeup"
  | "rocky-vs-gas"
  // Space subject — Asteroid Belt (L4) extras
  | "asteroid-cluster"
  | "asteroid-shape-variety"
  | "asteroid-collision"
  | "belt-from-above"
  | "meteor-shower"
  | "dwarf-planet"
  | "asteroid-mining"
  | "belt-position"
  | "comet-tail"
  | "space-rock"
  // Space subject — Outer Planets (L5) extras
  | "jupiter-bands"
  | "jupiter-storm"
  | "jupiter-moons"
  | "saturn-rings-closeup"
  | "saturn-tilt"
  | "uranus-tilt"
  | "neptune-storm"
  | "gas-giant-comparison"
  | "outer-orbit"
  | "huge-jupiter"
  // Space subject — Hope Probe (L6) extras
  | "hope-launch"
  | "hope-orbit-mars"
  | "hope-camera"
  | "hope-team"
  | "mars-from-hope"
  | "mars-atmosphere-data"
  | "uae-50th-anniversary"
  | "mbrsc-center"
  | "astronaut-neyadi"
  | "mars-2117"
  // Heritage subject — emirate map node art
  | "node-abu-dhabi"
  | "node-dubai"
  | "node-sharjah"
  | "node-ajman"
  | "node-umm-al-quwain"
  | "node-ras-al-khaimah"
  | "node-fujairah"
  // Space subject — level node art
  | "node-sun"
  | "node-earth-moon"
  | "node-inner-planets"
  | "node-asteroid-belt"
  | "node-outer-planets"
  | "node-hope-probe"
  // Heritage extras (user-supplied SVGs)
  | "abu-dhabi-skyline"
  | "liwa-oasis";

interface StickerProps {
  name: StickerName;
  /** Fixed pixel size. Omit to make the sticker fill its parent (recommended). */
  size?: number;
  className?: string;
  animated?: boolean;
}

const STROKE = "#1A1A2E";
const STROKE_W = 4; // viewBox is 240 wide, so this reads as ~1.5% — about right
const SOFT_STROKE = "#2D2D4A";

/* Round trig results to a stable string so SSR and client render identical
   coordinates (avoids React 19 hydration mismatches from float precision drift). */
const r3 = (n: number) => Math.round(n * 1000) / 1000;

/* Sun face — friendly, with rays, slight smile */
function SunFace({ animated = true, hot = false }: { animated?: boolean; hot?: boolean }) {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Background glow */}
      <defs>
        <radialGradient id="sun-glow">
          <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FCD34D" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="120" cy="120" r="115" fill="url(#sun-glow)" />

      {/* Rays */}
      <motion.g
        animate={animated ? { rotate: 360 } : undefined}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "120px 120px" }}
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x1 = r3(120 + Math.cos(a) * 70);
          const y1 = r3(120 + Math.sin(a) * 70);
          const x2 = r3(120 + Math.cos(a) * 105);
          const y2 = r3(120 + Math.sin(a) * 105);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={STROKE}
              strokeWidth="6"
              strokeLinecap="round"
            />
          );
        })}
      </motion.g>

      {/* Body */}
      <circle cx="120" cy="120" r="64" fill={hot ? "#F97316" : "#FCD34D"} stroke={STROKE} strokeWidth={STROKE_W} />
      <circle cx="120" cy="120" r="50" fill={hot ? "#FB923C" : "#FDE68A"} opacity="0.7" />

      {/* Friendly face */}
      {/* Eyes */}
      <motion.g
        animate={animated ? { scaleY: [1, 0.1, 1] } : undefined}
        transition={{ duration: 0.18, repeat: Infinity, repeatDelay: 4.2 }}
        style={{ transformOrigin: "120px 110px" }}
      >
        <circle cx="100" cy="110" r="8" fill={STROKE} />
        <circle cx="103" cy="107" r="2.5" fill="white" />
        <circle cx="140" cy="110" r="8" fill={STROKE} />
        <circle cx="143" cy="107" r="2.5" fill="white" />
      </motion.g>
      {/* Smile */}
      <path
        d="M 95 138 Q 120 158 145 138"
        stroke={STROKE}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Cheek blush */}
      <ellipse cx="92" cy="135" rx="7" ry="4" fill="#FF6B7E" opacity="0.5" />
      <ellipse cx="148" cy="135" rx="7" ry="4" fill="#FF6B7E" opacity="0.5" />
    </svg>
  );
}

/* Earth — friendly globe with continents */
function EarthSticker({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <motion.g
        animate={animated ? { rotate: 360 } : undefined}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "120px 120px" }}
      >
        {/* Ocean */}
        <circle cx="120" cy="120" r="90" fill="#3B82F6" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Continents (simplified) */}
        <path
          d="M 70 90 Q 90 75 110 85 Q 120 100 105 115 Q 85 120 75 110 Z"
          fill="#22C55E"
          stroke={STROKE}
          strokeWidth="2.5"
        />
        <path
          d="M 130 80 Q 165 75 175 100 Q 170 120 150 115 Q 135 105 130 80 Z"
          fill="#22C55E"
          stroke={STROKE}
          strokeWidth="2.5"
        />
        <path
          d="M 95 135 Q 130 130 155 145 Q 150 165 120 170 Q 90 165 85 150 Z"
          fill="#22C55E"
          stroke={STROKE}
          strokeWidth="2.5"
        />
        {/* Cloud highlight */}
        <ellipse cx="80" cy="80" rx="22" ry="9" fill="white" opacity="0.5" />
      </motion.g>
    </svg>
  );
}

/* Moon — friendly with craters, optional phase mask */
function MoonSticker({ phase = "full" }: { phase?: "full" | "crescent" }) {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <defs>
        <clipPath id="moon-clip">
          <circle cx="120" cy="120" r="80" />
        </clipPath>
      </defs>
      {/* Stars in the bg */}
      {[
        [40, 50],
        [200, 60],
        [50, 200],
        [205, 195],
        [30, 130],
      ].map(([x, y], i) => (
        <g key={i}>
          <path
            d={`M ${x} ${y - 6} L ${x + 1.5} ${y - 1.5} L ${x + 6} ${y} L ${x + 1.5} ${y + 1.5} L ${x} ${y + 6} L ${x - 1.5} ${y + 1.5} L ${x - 6} ${y} L ${x - 1.5} ${y - 1.5} Z`}
            fill="#FCD34D"
            stroke={STROKE}
            strokeWidth="1.5"
          />
        </g>
      ))}
      {/* Moon body */}
      <circle cx="120" cy="120" r="80" fill="#E5E7EB" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Craters */}
      <g clipPath="url(#moon-clip)">
        <circle cx="100" cy="100" r="14" fill="#9CA3AF" stroke={STROKE} strokeWidth="2" />
        <circle cx="100" cy="100" r="8" fill="#6B7280" />
        <circle cx="145" cy="115" r="9" fill="#9CA3AF" stroke={STROKE} strokeWidth="2" />
        <circle cx="115" cy="150" r="11" fill="#9CA3AF" stroke={STROKE} strokeWidth="2" />
        <circle cx="155" cy="155" r="6" fill="#9CA3AF" stroke={STROKE} strokeWidth="2" />
        {/* Phase shadow */}
        {phase === "crescent" && (
          <circle cx="148" cy="115" r="74" fill="#1A1A4A" />
        )}
      </g>
    </svg>
  );
}

/* Mars — red planet with polar cap. No face; lit-side highlight + offset
   surface marks so they don't accidentally form eyes/mouth. */
function MarsSticker({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <motion.g
        animate={animated ? { rotate: 360 } : undefined}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "120px 120px" }}
      >
        <circle cx="120" cy="120" r="85" fill="#EF4444" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Lit highlight upper-left for volume */}
        <ellipse cx="100" cy="100" rx="34" ry="22" fill="#F87171" opacity="0.55" />
        {/* Asymmetric surface marks (no face pattern) */}
        <ellipse cx="80" cy="138" rx="20" ry="12" fill="#B91C1C" opacity="0.7" />
        <ellipse cx="148" cy="160" rx="16" ry="10" fill="#B91C1C" opacity="0.7" />
        <ellipse cx="158" cy="100" rx="12" ry="7" fill="#B91C1C" opacity="0.6" />
        <ellipse cx="120" cy="170" rx="14" ry="6" fill="#B91C1C" opacity="0.55" />
        {/* Crater pock */}
        <circle cx="135" cy="125" r="6" fill="#7F1D1D" opacity="0.6" />
      </motion.g>
    </svg>
  );
}

/* Mercury — small grey planet with speed lines */
function MercurySticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Speed lines */}
      {[180, 200, 220].map((x, i) => (
        <line
          key={i}
          x1={x}
          y1={120 - 18 + i * 18}
          x2={x - 30}
          y2={120 - 18 + i * 18}
          stroke={STROKE}
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.7"
        />
      ))}
      <circle cx="120" cy="120" r="65" fill="#9CA3AF" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Lit upper-left highlight */}
      <ellipse cx="105" cy="105" rx="24" ry="16" fill="#D1D5DB" opacity="0.55" />
      {/* Asymmetric craters — no face pattern */}
      <circle cx="88" cy="135" r="13" fill="#6B7280" stroke={STROKE} strokeWidth="2" />
      <circle cx="88" cy="135" r="6" fill="#4B5563" />
      <circle cx="148" cy="105" r="9" fill="#6B7280" stroke={STROKE} strokeWidth="2" />
      <circle cx="142" cy="148" r="11" fill="#6B7280" stroke={STROKE} strokeWidth="2" />
      <circle cx="100" cy="160" r="6" fill="#6B7280" stroke={STROKE} strokeWidth="1.5" />
      <circle cx="160" cy="155" r="5" fill="#6B7280" stroke={STROKE} strokeWidth="1.5" />
    </svg>
  );
}

/* Venus — yellow planet with cloud bands. No face. */
function VenusSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="80" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx="102" cy="100" rx="32" ry="20" fill="#FFE9A8" opacity="0.6" />
      <path d="M 50 90 Q 120 80 190 90" stroke="#D97706" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M 50 110 Q 120 100 190 110" stroke="#92400E" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M 50 130 Q 120 120 190 130" stroke="#D97706" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.55" />
      <path d="M 50 150 Q 120 140 190 150" stroke="#92400E" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M 50 168 Q 120 158 190 168" stroke="#D97706" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

/* Jupiter — banded gas giant with red spot */
function JupiterSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="100" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      <path d="M 30 95 Q 120 85 210 95" stroke="#92400E" strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M 30 120 Q 120 110 210 120" stroke="#B45309" strokeWidth="11" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M 30 150 Q 120 140 210 150" stroke="#92400E" strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M 30 175 Q 120 167 210 175" stroke="#B45309" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.55" />
      {/* Great Red Spot */}
      <ellipse cx="160" cy="135" rx="22" ry="14" fill="#DC2626" stroke={STROKE} strokeWidth="3" />
      {/* Face */}
      <circle cx="95" cy="115" r="6" fill={STROKE} />
      <circle cx="125" cy="115" r="6" fill={STROKE} />
      <path d="M 95 138 Q 110 145 125 138" stroke={STROKE} strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* Saturn — with ring */
function SaturnSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Ring back */}
      <ellipse
        cx="120"
        cy="125"
        rx="115"
        ry="22"
        fill="none"
        stroke={STROKE}
        strokeWidth={STROKE_W}
      />
      <ellipse cx="120" cy="125" rx="115" ry="22" fill="none" stroke="#D4AF37" strokeWidth="9" opacity="0.85" />
      <ellipse cx="120" cy="125" rx="100" ry="16" fill="none" stroke="#FCD34D" strokeWidth="4" opacity="0.7" />
      {/* Body — drawn after rings to occlude back half */}
      <path
        d="M 120 50 A 70 70 0 1 1 120 190 A 70 70 0 1 1 120 50 Z"
        fill="#FCD34D"
        stroke={STROKE}
        strokeWidth={STROKE_W}
      />
      {/* Bands */}
      <path d="M 60 105 Q 120 100 180 105" stroke="#92400E" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.55" />
      <path d="M 60 135 Q 120 130 180 135" stroke="#B45309" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.5" />
      {/* Front of ring (passes over the body) */}
      <path
        d="M 8 130 Q 120 165 232 130"
        stroke="#D4AF37"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />
      {/* Face */}
      <circle cx="105" cy="105" r="5" fill={STROKE} />
      <circle cx="135" cy="105" r="5" fill={STROKE} />
      <path d="M 105 125 Q 120 132 135 125" stroke={STROKE} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* Asteroid — chunky lumpy rock */
function AsteroidSticker({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <motion.g
        animate={animated ? { rotate: [-3, 3, -3] } : undefined}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "120px 120px" }}
      >
        <path
          d="M 120 40 L 165 60 L 195 100 L 200 145 L 170 195 L 115 200 L 60 180 L 40 130 L 50 80 L 90 50 Z"
          fill="#78716C"
          stroke={STROKE}
          strokeWidth={STROKE_W}
        />
        {/* Craters */}
        <circle cx="100" cy="95" r="12" fill="#44403C" stroke={STROKE} strokeWidth="2" />
        <circle cx="100" cy="95" r="7" fill="#292524" />
        <circle cx="150" cy="120" r="10" fill="#44403C" stroke={STROKE} strokeWidth="2" />
        <circle cx="115" cy="160" r="8" fill="#44403C" stroke={STROKE} strokeWidth="2" />
        <circle cx="155" cy="160" r="6" fill="#44403C" stroke={STROKE} strokeWidth="2" />
      </motion.g>
    </svg>
  );
}

/* Hope Probe — gold body with blue solar panels */
function HopeProbeSticker({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <motion.g
        animate={animated ? { y: [0, -6, 0] } : undefined}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Solar panel left */}
        <rect x="20" y="100" width="65" height="40" rx="4" fill="#3B82F6" stroke={STROKE} strokeWidth={STROKE_W} />
        {[35, 50, 65].map((x) => (
          <line key={x} x1={x} y1="100" x2={x} y2="140" stroke={STROKE} strokeWidth="1.5" />
        ))}
        {[115, 125].map((y) => (
          <line key={y} x1="20" y1={y} x2="85" y2={y} stroke={STROKE} strokeWidth="1.5" />
        ))}
        {/* Solar panel right */}
        <rect x="155" y="100" width="65" height="40" rx="4" fill="#3B82F6" stroke={STROKE} strokeWidth={STROKE_W} />
        {[170, 185, 200].map((x) => (
          <line key={x} x1={x} y1="100" x2={x} y2="140" stroke={STROKE} strokeWidth="1.5" />
        ))}
        {[115, 125].map((y) => (
          <line key={y} x1="155" y1={y} x2="220" y2={y} stroke={STROKE} strokeWidth="1.5" />
        ))}

        {/* Body */}
        <rect x="85" y="90" width="70" height="60" rx="6" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} />
        <rect x="85" y="90" width="70" height="14" fill="#9C7C28" />
        {/* Window */}
        <circle cx="120" cy="130" r="9" fill="#7AC4FF" stroke={STROKE} strokeWidth="2.5" />
        <circle cx="117" cy="127" r="3" fill="white" />
        {/* UAE flag patch — red hoist + green/white/black stripes */}
        <rect x="96" y="142" width="9" height="2" fill="#009639" />
        <rect x="96" y="144" width="9" height="2" fill="white" />
        <rect x="96" y="146" width="9" height="2" fill="#1A1A2E" />
        <rect x="93" y="142" width="3" height="6" fill="#CE1126" />
        <rect x="93" y="142" width="12" height="6" fill="none" stroke={STROKE} strokeWidth="0.8" />

        {/* Antenna */}
        <line x1="120" y1="90" x2="120" y2="50" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
        <circle cx="120" cy="48" r="6" fill="#D4AF37" stroke={STROKE} strokeWidth="2.5" />
        {/* Dish */}
        <path d="M 105 70 Q 120 55 135 70" fill="white" stroke={STROKE} strokeWidth="2.5" />
      </motion.g>
    </svg>
  );
}

/* Astronaut Hazza — friendly sticker */
function UaeAstronautSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Stars */}
      {[
        [25, 40],
        [210, 50],
        [40, 200],
        [200, 195],
      ].map(([x, y], i) => (
        <path
          key={i}
          d={`M ${x} ${y - 5} L ${x + 1} ${y - 1} L ${x + 5} ${y} L ${x + 1} ${y + 1} L ${x} ${y + 5} L ${x - 1} ${y + 1} L ${x - 5} ${y} L ${x - 1} ${y - 1} Z`}
          fill="#FCD34D"
          stroke={STROKE}
          strokeWidth="1.5"
        />
      ))}
      {/* Suit body */}
      <path
        d="M 80 130 L 80 215 Q 80 225 90 225 L 150 225 Q 160 225 160 215 L 160 130 Z"
        fill="white"
        stroke={STROKE}
        strokeWidth={STROKE_W}
      />
      {/* Shoulders + arms */}
      <ellipse cx="65" cy="135" rx="15" ry="22" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx="175" cy="135" rx="15" ry="22" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* UAE flag patch on chest — red hoist + green/white/black stripes */}
      <rect x="100" y="160" width="40" height="22" rx="2" fill="white" stroke={STROKE} strokeWidth="2.5" />
      <rect x="111" y="160" width="29" height="7.3" fill="#009639" />
      <rect x="111" y="167.3" width="29" height="7.3" fill="white" />
      <rect x="111" y="174.6" width="29" height="7.4" fill={STROKE} />
      <rect x="100" y="160" width="11" height="22" fill="#CE1126" />
      <rect x="100" y="160" width="40" height="22" rx="2" fill="none" stroke={STROKE} strokeWidth="2.5" />

      {/* Helmet — round */}
      <circle cx="120" cy="95" r="48" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Visor */}
      <path
        d="M 88 95 A 32 32 0 0 1 152 95 L 152 100 A 32 28 0 0 1 88 100 Z"
        fill="#1F2937"
        stroke={STROKE}
        strokeWidth="2.5"
      />
      {/* Visor reflection */}
      <path d="M 95 90 Q 105 80 115 88" stroke="#7AC4FF" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Helmet accent */}
      <circle cx="120" cy="95" r="48" fill="none" stroke="#D4AF37" strokeWidth="3" opacity="0.55" />
      {/* Antenna */}
      <line x1="120" y1="47" x2="120" y2="35" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      <circle cx="120" cy="32" r="4" fill="#D4AF37" stroke={STROKE} strokeWidth="2" />
    </svg>
  );
}

/* Mars City — Mars 2117 dome city */
function MarsCitySticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Mars sky gradient */}
      <rect width="240" height="170" fill="#FCA5A5" />
      {/* Stars */}
      {[
        [30, 30],
        [200, 30],
        [120, 20],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="white" />
      ))}
      {/* Distant Mars surface */}
      <path d="M 0 170 L 240 170 L 240 240 L 0 240 Z" fill="#7F1D1D" />
      <path d="M 0 170 Q 60 160 120 170 Q 180 180 240 170 L 240 200 L 0 200 Z" fill="#B91C1C" />

      {/* Big dome left */}
      <path
        d="M 30 170 Q 30 110 80 110 Q 130 110 130 170 Z"
        fill="#A7E0FF"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        opacity="0.85"
      />
      {/* Buildings inside dome */}
      <rect x="55" y="138" width="14" height="32" fill="#FCD34D" stroke={STROKE} strokeWidth="2.5" />
      <rect x="73" y="125" width="16" height="45" fill="#3B82F6" stroke={STROKE} strokeWidth="2.5" />
      <rect x="93" y="143" width="14" height="27" fill="#22C55E" stroke={STROKE} strokeWidth="2.5" />

      {/* Big dome right */}
      <path
        d="M 130 170 Q 130 100 175 100 Q 220 100 220 170 Z"
        fill="#A7E0FF"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        opacity="0.85"
      />
      <rect x="148" y="135" width="16" height="35" fill="#FCD34D" stroke={STROKE} strokeWidth="2.5" />
      <rect x="168" y="120" width="18" height="50" fill="#3B82F6" stroke={STROKE} strokeWidth="2.5" />
      <rect x="190" y="140" width="14" height="30" fill="#EF4444" stroke={STROKE} strokeWidth="2.5" />

      {/* UAE flag pole — red hoist + green/white/black stripes */}
      <line x1="50" y1="170" x2="50" y2="115" stroke={STROKE} strokeWidth="3" />
      <rect x="56" y="115" width="16" height="6" fill="#009639" />
      <rect x="56" y="121" width="16" height="6" fill="white" />
      <rect x="56" y="127" width="16" height="6" fill={STROKE} />
      <rect x="50" y="115" width="6" height="18" fill="#CE1126" />
      <rect x="50" y="115" width="22" height="18" fill="none" stroke={STROKE} strokeWidth="1" />

      {/* Connecting tunnel */}
      <rect x="120" y="155" width="20" height="12" fill="#A7E0FF" stroke={STROKE} strokeWidth="2.5" />
    </svg>
  );
}

/* Asteroid Belt — sun in middle, ring of rocks */
function AsteroidBeltSticker({ animated = true }: { animated?: boolean }) {
  const rocks = Array.from({ length: 12 }).map((_, i) => {
    const a = (i / 12) * Math.PI * 2;
    const r = 75 + (i % 3) * 12;
    return { x: r3(120 + Math.cos(a) * r), y: r3(120 + Math.sin(a) * r * 0.45), size: 4 + (i % 3) * 2.5 };
  });
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Belt outline */}
      <ellipse cx="120" cy="120" rx="100" ry="48" fill="none" stroke={SOFT_STROKE} strokeWidth="2" strokeDasharray="6 6" opacity="0.4" />
      {/* Sun */}
      <circle cx="120" cy="120" r="32" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      <circle cx="120" cy="120" r="22" fill="#FDE68A" />
      {/* Orbiting rocks */}
      <motion.g
        animate={animated ? { rotate: 360 } : undefined}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "120px 120px" }}
      >
        {rocks.map((r, i) => (
          <g key={i}>
            <circle
              cx={r.x}
              cy={r.y}
              r={r.size}
              fill="#78716C"
              stroke={STROKE}
              strokeWidth="2"
            />
          </g>
        ))}
      </motion.g>
    </svg>
  );
}

/* Star — generic 8-point gold */
function StarSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <path
        d="M 120 30 L 138 100 L 210 102 L 152 142 L 175 215 L 120 173 L 65 215 L 88 142 L 30 102 L 102 100 Z"
        fill="#FCD34D"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      <path
        d="M 120 65 L 130 105 L 160 110 L 135 130 L 145 165 L 120 145 L 95 165 L 105 130 L 80 110 L 110 105 Z"
        fill="#FDE68A"
      />
      {/* Face */}
      <circle cx="105" cy="120" r="5" fill={STROKE} />
      <circle cx="135" cy="120" r="5" fill={STROKE} />
      <path d="M 105 138 Q 120 148 135 138" stroke={STROKE} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* Comet */
function CometSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Tail */}
      <path
        d="M 165 75 L 30 200 L 75 175 L 50 220 L 100 195 L 90 235"
        fill="#FCD34D"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
        opacity="0.8"
      />
      {/* Head */}
      <circle cx="170" cy="75" r="32" fill="#3B82F6" stroke={STROKE} strokeWidth={STROKE_W} />
      <circle cx="160" cy="65" r="10" fill="#7AC4FF" />
    </svg>
  );
}

/* Rocky planets row */
function RockyPlanetsSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="50" cy="120" r="22" fill="#9CA3AF" stroke={STROKE} strokeWidth={STROKE_W} />
      <circle cx="100" cy="120" r="30" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      <circle cx="150" cy="120" r="34" fill="#3B82F6" stroke={STROKE} strokeWidth={STROKE_W} />
      <path d="M 130 110 Q 145 105 155 115 Q 145 125 132 122 Z" fill="#22C55E" stroke={STROKE} strokeWidth="2" />
      <circle cx="200" cy="120" r="28" fill="#EF4444" stroke={STROKE} strokeWidth={STROKE_W} />
    </svg>
  );
}

/* Ice giants — two cyan/blue planets */
function IceGiantsSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Uranus - tilted ring */}
      <ellipse cx="80" cy="120" rx="48" ry="12" fill="none" stroke="#D4AF37" strokeWidth="3" transform="rotate(70 80 120)" opacity="0.7" />
      <circle cx="80" cy="120" r="42" fill="#67E8F9" stroke={STROKE} strokeWidth={STROKE_W} />
      <path d="M 50 105 Q 80 100 110 105" stroke="#06B6D4" strokeWidth="3" fill="none" />
      {/* Neptune */}
      <circle cx="170" cy="120" r="48" fill="#3B82F6" stroke={STROKE} strokeWidth={STROKE_W} />
      <path d="M 130 110 Q 170 100 210 110" stroke="#1E40AF" strokeWidth="4" fill="none" opacity="0.7" />
      <path d="M 130 130 Q 170 120 210 130" stroke="#1E40AF" strokeWidth="3" fill="none" opacity="0.5" />
      <ellipse cx="160" cy="120" rx="8" ry="5" fill="#1D4ED8" stroke={STROKE} strokeWidth="2" />
    </svg>
  );
}

/* Sun + Earth pairing */
// Pre-rounded ray endpoints for the SunAndEarth sticker (12 rays around
// the sun, centered at (68, 120) inside the 240×240 canvas).
const SAE_SUN_RAYS = Array.from({ length: 12 }).map((_, i) => {
  const a = (i / 12) * Math.PI * 2;
  return {
    x1: r3(68 + Math.cos(a) * 50),
    y1: r3(120 + Math.sin(a) * 50),
    x2: r3(68 + Math.cos(a) * 70),
    y2: r3(120 + Math.sin(a) * 70),
  };
});

function SunAndEarthSticker() {
  // Big warm Sun on the left, big detailed Earth on the right, with three
  // warm light beams arcing between them and a soft halo backing the scene.
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* warm halo on the sun side */}
      <circle cx="76" cy="120" r="78" fill="#FCD981" opacity="0.4" />
      {/* cool halo on the earth side */}
      <circle cx="180" cy="120" r="62" fill="#A7E2F0" opacity="0.4" />

      {/* SUN — bigger, with full ray crown */}
      <g>
        {SAE_SUN_RAYS.map((p, i) => (
          <line
            key={i}
            x1={p.x1}
            y1={p.y1}
            x2={p.x2}
            y2={p.y2}
            stroke="#F59E0B"
            strokeWidth="5"
            strokeLinecap="round"
          />
        ))}
        <circle cx="68" cy="120" r="46" fill="#FFCB47" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* hot upper-left highlight */}
        <ellipse cx="56" cy="106" rx="22" ry="14" fill="#FFE9A8" opacity="0.6" />
        {/* warm lower glow */}
        <path
          d="M 28 130 Q 68 174 108 130 Q 106 154 86 166 Q 68 174 50 166 Q 30 154 28 130 Z"
          fill="#F59E0B"
          opacity="0.35"
        />
      </g>

      {/* Three straight warm light beams from sun to earth */}
      <g stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" fill="none">
        <line x1="115" y1="106" x2="158" y2="106" />
        <line x1="116" y1="120" x2="160" y2="120" />
        <line x1="115" y1="134" x2="158" y2="134" />
      </g>

      {/* EARTH — bigger, with continents, ocean swells, cloud wisps */}
      <g>
        <circle cx="186" cy="124" r="38" fill="#3B82F6" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* day-side highlight */}
        <ellipse cx="174" cy="112" rx="14" ry="10" fill="#7AC4FF" opacity="0.55" />
        {/* ocean swells */}
        <g fill="#5AAFE6" opacity="0.55">
          <ellipse cx="172" cy="108" rx="10" ry="3" />
          <ellipse cx="200" cy="138" rx="12" ry="3" />
        </g>
        {/* continents */}
        <g fill="#22C55E" stroke={STROKE} strokeWidth="2" strokeLinejoin="round">
          <path d="M 170 116 Q 184 110 196 118 Q 200 128 188 134 Q 174 134 168 124 Z" />
          <path d="M 196 144 Q 208 140 214 150 Q 208 158 198 154 Z" />
        </g>
        {/* darker continent shading */}
        <path d="M 178 122 Q 188 120 192 128 Q 184 130 178 126 Z" fill="#16A34A" opacity="0.55" />
        {/* cloud wisps on top */}
        <ellipse cx="190" cy="92" rx="14" ry="3" fill="white" opacity="0.6" />
        <ellipse cx="174" cy="148" rx="10" ry="2.5" fill="white" opacity="0.55" />
      </g>

      {/* sparkle stars for atmosphere */}
      <g fill="#1A1A2E">
        <circle cx="18" cy="42" r="2" />
        <circle cx="218" cy="206" r="2" />
        <circle cx="32" cy="206" r="1.6" />
      </g>
      <g fill="#FCD34D">
        <path d="M 220 50 L 222 55 L 227 57 L 222 59 L 220 64 L 218 59 L 213 57 L 218 55 Z" />
      </g>
    </svg>
  );
}

/* Day-night Earth */
function DayNightSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <defs>
        <clipPath id="dn-l">
          <rect x="0" y="0" width="120" height="240" />
        </clipPath>
        <clipPath id="dn-r">
          <rect x="120" y="0" width="120" height="240" />
        </clipPath>
      </defs>
      {/* Sun on left */}
      <circle cx="40" cy="55" r="20" fill="#FCD34D" stroke={STROKE} strokeWidth="3" />
      {/* Moon on right */}
      <circle cx="200" cy="55" r="16" fill="#E5E7EB" stroke={STROKE} strokeWidth="3" />
      <circle cx="195" cy="50" r="3" fill="#9CA3AF" />
      {/* Earth body */}
      <g clipPath="url(#dn-l)">
        <circle cx="120" cy="135" r="75" fill="#3B82F6" stroke={STROKE} strokeWidth={STROKE_W} />
        <path d="M 75 110 Q 95 100 105 120 Q 95 135 80 120 Z" fill="#22C55E" stroke={STROKE} strokeWidth="2" />
      </g>
      <g clipPath="url(#dn-r)">
        <circle cx="120" cy="135" r="75" fill="#1E3A8A" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="160" cy="115" r="2" fill="white" />
        <circle cx="180" cy="135" r="2" fill="white" />
        <circle cx="155" cy="155" r="2" fill="white" />
      </g>
      {/* Outline over both */}
      <circle cx="120" cy="135" r="75" fill="none" stroke={STROKE} strokeWidth={STROKE_W} />
    </svg>
  );
}

/* Moon Phases */
function MoonPhasesSticker() {
  const phases = [
    { cx: 30, cover: 24 },
    { cx: 90, cover: 12 },
    { cx: 150, cover: 0 },
    { cx: 210, cover: -12 },
  ];
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {phases.map((p, i) => (
        <g key={i}>
          <circle cx={p.cx} cy="120" r="22" fill="#E5E7EB" stroke={STROKE} strokeWidth="3" />
          {p.cover !== 0 && (
            <circle
              cx={p.cx + p.cover}
              cy="120"
              r="22"
              fill="#1A1A4A"
              stroke="none"
            />
          )}
          {/* Outline always */}
          <circle cx={p.cx} cy="120" r="22" fill="none" stroke={STROKE} strokeWidth="3" />
        </g>
      ))}
    </svg>
  );
}

/* UAE Flag */
function UaeFlagSticker() {
  // Real UAE flag layout: red vertical hoist band on the LEFT, then three
  // horizontal stripes filling the fly side — green top, white middle,
  // black bottom.
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* flagpole */}
      <line x1="55" y1="35" x2="55" y2="220" stroke="#5C4510" strokeWidth="6" strokeLinecap="round" />
      <circle cx="55" cy="35" r="8" fill="#D4AF37" stroke={STROKE} strokeWidth="2" />
      {/* Flag — outer outline */}
      <rect x="55" y="50" width="140" height="105" fill="none" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Three horizontal stripes on the fly side (right of the red hoist) */}
      <rect x="90" y="50" width="105" height="35" fill="#009639" />
      <rect x="90" y="85" width="105" height="35" fill="white" />
      <rect x="90" y="120" width="105" height="35" fill={STROKE} />
      {/* Red vertical hoist band on the LEFT */}
      <rect x="55" y="50" width="35" height="105" fill="#CE1126" />
      {/* Re-draw outer outline on top so it sits cleanly over fills */}
      <rect x="55" y="50" width="140" height="105" fill="none" stroke={STROKE} strokeWidth={STROKE_W} />
    </svg>
  );
}

/* Rocket — friendly cartoon */
function RocketSticker({ animated = true }: { animated?: boolean }) {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <motion.g
        animate={animated ? { y: [0, -8, 0] } : undefined}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Body */}
        <path
          d="M 120 30 Q 90 70 90 140 L 90 175 Q 90 185 100 185 L 140 185 Q 150 185 150 175 L 150 140 Q 150 70 120 30 Z"
          fill="white"
          stroke={STROKE}
          strokeWidth={STROKE_W}
        />
        {/* Window */}
        <circle cx="120" cy="100" r="18" fill="#7AC4FF" stroke={STROKE} strokeWidth="3" />
        <circle cx="116" cy="96" r="5" fill="white" />
        {/* UAE flag stripe */}
        <rect x="100" y="135" width="40" height="8" fill="#CE1126" stroke={STROKE} strokeWidth="1" />
        <rect x="100" y="143" width="40" height="8" fill="#009639" stroke={STROKE} strokeWidth="1" />
        {/* Fins */}
        <path d="M 90 150 L 65 195 L 90 185 Z" fill="#CE1126" stroke={STROKE} strokeWidth={STROKE_W} />
        <path d="M 150 150 L 175 195 L 150 185 Z" fill="#CE1126" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Flames */}
        <motion.g
          animate={animated ? { scaleY: [1, 0.7, 1, 0.85, 1] } : undefined}
          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "120px 185px" }}
        >
          <path
            d="M 102 185 L 115 220 L 120 200 L 125 220 L 138 185 Z"
            fill="#F97316"
            stroke={STROKE}
            strokeWidth={STROKE_W}
            strokeLinejoin="round"
          />
          <path
            d="M 110 195 L 120 215 L 130 195 Z"
            fill="#FCD34D"
          />
        </motion.g>
      </motion.g>
    </svg>
  );
}

/* Telescope */
function TelescopeSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Tripod */}
      <line x1="120" y1="155" x2="80" y2="220" stroke={STROKE} strokeWidth={STROKE_W} strokeLinecap="round" />
      <line x1="120" y1="155" x2="160" y2="220" stroke={STROKE} strokeWidth={STROKE_W} strokeLinecap="round" />
      <line x1="120" y1="155" x2="120" y2="220" stroke={STROKE} strokeWidth={STROKE_W} strokeLinecap="round" />
      {/* Telescope tube */}
      <g transform="rotate(-25 120 110)">
        <rect x="60" y="95" width="120" height="35" rx="4" fill="#9C7C28" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="170" cy="112" r="22" fill="#1A1A4A" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="172" cy="110" r="14" fill="#3B82F6" />
        <path d="M 162 105 Q 168 100 175 108" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="55" y="105" width="14" height="15" fill="#5C4510" stroke={STROKE} strokeWidth="2.5" />
      </g>
    </svg>
  );
}

/* Dallah lamp (UAE coffee pot) */
function DallahSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Base */}
      <path
        d="M 80 170 Q 80 110 100 90 L 100 70 Q 100 60 120 60 L 130 60 Q 140 60 140 70 L 140 90 Q 160 110 160 170 Q 160 200 120 200 Q 80 200 80 170 Z"
        fill="#D4AF37"
        stroke={STROKE}
        strokeWidth={STROKE_W}
      />
      {/* Spout */}
      <path
        d="M 75 110 L 30 95 L 35 110 L 75 130 Z"
        fill="#D4AF37"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Lid pointy top */}
      <path d="M 105 60 L 120 30 L 135 60 Z" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      <circle cx="120" cy="35" r="3" fill="#1A1A2E" />
      {/* Handle */}
      <path d="M 165 110 Q 200 130 165 165" stroke={STROKE} strokeWidth={STROKE_W} fill="none" strokeLinecap="round" />
      <path d="M 165 110 Q 200 130 165 165" stroke="#D4AF37" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Decorative band */}
      <path d="M 80 145 Q 120 152 160 145" stroke={STROKE} strokeWidth="3" fill="none" />
      <circle cx="100" cy="145" r="3" fill={STROKE} />
      <circle cx="120" cy="148" r="3" fill={STROKE} />
      <circle cx="140" cy="145" r="3" fill={STROKE} />
    </svg>
  );
}

/* Ghaf tree (UAE national tree) */
function GhafSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Trunk */}
      <path
        d="M 116 220 Q 118 170 122 130 Q 125 110 120 90 Q 115 75 118 60"
        stroke="#5C4510"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      {/* Branches */}
      <path d="M 122 130 Q 145 115 155 95" stroke="#5C4510" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M 118 100 Q 95 85 88 65" stroke="#5C4510" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 121 80 Q 110 65 115 50" stroke="#5C4510" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Canopy — multiple ellipses */}
      <ellipse cx="120" cy="55" rx="55" ry="40" fill="#2D5016" stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx="80" cy="78" rx="32" ry="24" fill="#3F7522" stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx="160" cy="78" rx="32" ry="24" fill="#3F7522" stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx="115" cy="35" rx="28" ry="20" fill="#4A8E2A" stroke={STROKE} strokeWidth={STROKE_W} />
    </svg>
  );
}

/* === UAE LANDMARK STICKERS === */

/* Burj Khalifa — tallest building in the world */
function BurjKhalifaSticker() {
  return (
    <div
      style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
      dangerouslySetInnerHTML={{ __html: USER_STICKER_SVGS['burj-khalifa'] ?? "" }}
    />
  );
}

/* Sheikh Zayed Grand Mosque — domes + minarets */
function SheikhZayedMosqueSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky behind */}
      <circle cx="120" cy="120" r="105" fill="#E6F3FA" opacity="0.35" />

      {/* Left minaret */}
      <rect x="32" y="100" width="14" height="100" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx="39" cy="100" rx="9" ry="6" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      <path d="M 30 90 L 39 80 L 48 90 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      <line x1="39" y1="80" x2="39" y2="68" stroke={STROKE} strokeWidth="1.6" />
      <circle cx="39" cy="66" r="2" fill="#D4AF37" stroke={STROKE} strokeWidth="1" />
      {/* Right minaret */}
      <rect x="194" y="100" width="14" height="100" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx="201" cy="100" rx="9" ry="6" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      <path d="M 192 90 L 201 80 L 210 90 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      <line x1="201" y1="80" x2="201" y2="68" stroke={STROKE} strokeWidth="1.6" />
      <circle cx="201" cy="66" r="2" fill="#D4AF37" stroke={STROKE} strokeWidth="1" />

      {/* Main building body */}
      <rect x="50" y="140" width="140" height="60" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Side smaller domes */}
      <circle cx="70" cy="138" r="16" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      <circle cx="170" cy="138" r="16" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Center large dome */}
      <path
        d="M 80 130 Q 80 80 120 70 Q 160 80 160 130 Z"
        fill="white"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      <path d="M 110 78 Q 120 70 130 78" stroke="#D4AF37" strokeWidth="1" fill="none" />
      {/* Center spire on dome */}
      <line x1="120" y1="70" x2="120" y2="55" stroke={STROKE} strokeWidth="2" />
      <circle cx="120" cy="53" r="2.5" fill="#D4AF37" stroke={STROKE} strokeWidth="1" />

      {/* Arch entry */}
      <path
        d="M 105 200 Q 105 165 120 165 Q 135 165 135 200 Z"
        fill="#1A1A2E"
        stroke={STROKE}
        strokeWidth={STROKE_W}
      />
      {/* Window arches */}
      <path d="M 60 195 Q 60 175 70 175 Q 80 175 80 195 Z" fill="#3B82F6" opacity="0.4" stroke={STROKE} strokeWidth="1" />
      <path d="M 160 195 Q 160 175 170 175 Q 180 175 180 195 Z" fill="#3B82F6" opacity="0.4" stroke={STROKE} strokeWidth="1" />

      {/* Ground */}
      <rect x="20" y="200" width="200" height="14" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
    </svg>
  );
}

/* Burj Al Arab — sail-shaped iconic hotel */
function BurjAlArabSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sea behind */}
      <rect y="180" width="240" height="60" fill="#7AC4FF" />
      <path d="M 0 180 Q 60 175 120 180 Q 180 185 240 180 L 240 195 Q 180 192 120 195 Q 60 198 0 195 Z" fill="#5AAFE6" />

      {/* Sail building — curved triangle */}
      <path
        d="M 130 30 Q 100 60 90 110 Q 80 160 80 200 L 170 200 L 170 170 Q 165 110 155 70 Q 145 45 130 30 Z"
        fill="white"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* The sail "fabric" texture */}
      <path d="M 95 110 Q 130 100 165 110" stroke="#D4D8E0" strokeWidth="1" fill="none" />
      <path d="M 90 140 Q 130 130 170 140" stroke="#D4D8E0" strokeWidth="1" fill="none" />
      <path d="M 88 170 Q 130 160 172 170" stroke="#D4D8E0" strokeWidth="1" fill="none" />
      {/* Frame structure on the right edge */}
      <line x1="170" y1="60" x2="170" y2="200" stroke={STROKE} strokeWidth="2" />
      <g stroke={STROKE} strokeWidth="1.2">
        <line x1="170" y1="80" x2="155" y2="80" />
        <line x1="170" y1="100" x2="148" y2="100" />
        <line x1="170" y1="120" x2="142" y2="120" />
        <line x1="170" y1="140" x2="138" y2="140" />
        <line x1="170" y1="160" x2="135" y2="160" />
        <line x1="170" y1="180" x2="132" y2="180" />
      </g>
      {/* Helipad on top */}
      <ellipse cx="135" cy="38" rx="14" ry="3" fill="#1A1A2E" />
      <ellipse cx="135" cy="36" rx="13" ry="2" fill="#FF4949" stroke={STROKE} strokeWidth="0.6" />
{/* Land base */}
      <rect x="50" y="200" width="160" height="14" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
    </svg>
  );
}

/* Louvre Abu Dhabi — domed museum */
function LouvreAbuDhabiSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Water */}
      <rect y="170" width="240" height="70" fill="#7AC4FF" />
      <path d="M 0 170 Q 60 165 120 170 Q 180 175 240 170 L 240 185 Q 180 182 120 185 Q 60 188 0 185 Z" fill="#5AAFE6" />

      {/* Dome — perforated lattice look */}
      <path
        d="M 30 170 Q 30 100 120 80 Q 210 100 210 170 Z"
        fill="#E5DCC0"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Dome lattice pattern (stars) */}
      <g fill="#1A1A2E" opacity="0.5">
        {[
          [70, 150], [90, 140], [110, 130], [130, 130], [150, 140], [170, 150],
          [80, 160], [100, 155], [120, 152], [140, 155], [160, 160],
          [85, 130], [105, 120], [125, 115], [145, 120], [165, 130],
          [100, 105], [120, 100], [140, 105],
          [115, 90], [125, 90],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" />
        ))}
      </g>
      {/* Soft "rays" inside the dome (light through holes) */}
      <g stroke="#FCD34D" strokeWidth="0.5" opacity="0.4">
        <line x1="120" y1="80" x2="60" y2="170" />
        <line x1="120" y1="80" x2="180" y2="170" />
        <line x1="120" y1="80" x2="120" y2="170" />
      </g>
      {/* Buildings beneath */}
      <rect x="55" y="155" width="35" height="20" fill="white" stroke={STROKE} strokeWidth="1.5" />
      <rect x="100" y="150" width="40" height="25" fill="white" stroke={STROKE} strokeWidth="1.5" />
      <rect x="150" y="155" width="35" height="20" fill="white" stroke={STROKE} strokeWidth="1.5" />
    </svg>
  );
}

/* Traditional dhow boat */
function DhowBoatSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sun */}
      <circle cx="200" cy="60" r="22" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const r = (a * Math.PI) / 180;
        const x1 = r3(200 + Math.cos(r) * 26);
        const y1 = r3(60 + Math.sin(r) * 26);
        const x2 = r3(200 + Math.cos(r) * 36);
        const y2 = r3(60 + Math.sin(r) * 36);
        return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" />;
      })}

      {/* Sea */}
      <rect y="160" width="240" height="80" fill="#7AC4FF" />
      <path d="M 0 160 Q 30 155 60 160 Q 90 165 120 160 Q 150 155 180 160 Q 210 165 240 160 L 240 175 Q 210 178 180 175 Q 150 172 120 175 Q 90 178 60 175 Q 30 172 0 175 Z" fill="#5AAFE6" />

      {/* Hull */}
      <path
        d="M 40 175 Q 50 200 120 200 Q 190 200 200 175 L 188 165 Q 130 168 52 165 Z"
        fill="#8B6914"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      <path d="M 50 168 Q 130 172 190 168" stroke="#5C4510" strokeWidth="1.5" fill="none" />

      {/* Mast */}
      <line x1="120" y1="165" x2="120" y2="50" stroke="#5C4510" strokeWidth="3" strokeLinecap="round" />
      {/* Triangular sail */}
      <path
        d="M 120 50 L 200 130 L 120 130 Z"
        fill="white"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      <path d="M 120 60 L 188 125" stroke="#D4D8E0" strokeWidth="1" fill="none" />
      <path d="M 120 80 L 178 125" stroke="#D4D8E0" strokeWidth="1" fill="none" />
      <path d="M 120 100 L 168 125" stroke="#D4D8E0" strokeWidth="1" fill="none" />

      {/* UAE flag on the back */}
      <line x1="200" y1="170" x2="200" y2="135" stroke={STROKE} strokeWidth="2" />
      <rect x="200" y="135" width="20" height="6" fill="#CE1126" stroke={STROKE} strokeWidth="0.6" />
      <rect x="200" y="141" width="20" height="6" fill="white" stroke={STROKE} strokeWidth="0.6" />
      <rect x="200" y="147" width="20" height="6" fill={STROKE} />
      <rect x="200" y="135" width="6" height="18" fill="#009639" stroke={STROKE} strokeWidth="0.6" />
    </svg>
  );
}

/* Qasr Al Hosn — historic fort in Abu Dhabi */
function QasrAlHosnSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sandy background */}
      <circle cx="120" cy="120" r="105" fill="#FCD7AB" opacity="0.4" />

      {/* Main fort body */}
      <rect x="50" y="100" width="140" height="100" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Crenellations on top */}
      <g fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round">
        {[50, 70, 90, 110, 130, 150, 170].map((x) => (
          <rect key={x} x={x} y={92} width={12} height={10} />
        ))}
      </g>

      {/* Left tower */}
      <rect x="40" y="80" width="32" height="120" fill="#D4A574" stroke={STROKE} strokeWidth={STROKE_W} />
      <rect x="40" y="72" width="8" height="10" fill="#D4A574" stroke={STROKE} strokeWidth={STROKE_W} />
      <rect x="52" y="72" width="8" height="10" fill="#D4A574" stroke={STROKE} strokeWidth={STROKE_W} />
      <rect x="64" y="72" width="8" height="10" fill="#D4A574" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Window slot */}
      <rect x="50" y="120" width="10" height="20" fill="#1A1A2E" />

      {/* Right tower */}
      <rect x="168" y="80" width="32" height="120" fill="#D4A574" stroke={STROKE} strokeWidth={STROKE_W} />
      <rect x="168" y="72" width="8" height="10" fill="#D4A574" stroke={STROKE} strokeWidth={STROKE_W} />
      <rect x="180" y="72" width="8" height="10" fill="#D4A574" stroke={STROKE} strokeWidth={STROKE_W} />
      <rect x="192" y="72" width="8" height="10" fill="#D4A574" stroke={STROKE} strokeWidth={STROKE_W} />
      <rect x="180" y="120" width="10" height="20" fill="#1A1A2E" />

      {/* Big arched entry */}
      <path
        d="M 95 200 Q 95 150 120 150 Q 145 150 145 200 Z"
        fill="#1A1A2E"
        stroke={STROKE}
        strokeWidth={STROKE_W}
      />
      {/* Door details */}
      <rect x="115" y="170" width="10" height="30" fill="#5C4510" />
      <circle cx="123" cy="185" r="0.8" fill="#D4AF37" />

      {/* Flag pole */}
      <line x1="120" y1="92" x2="120" y2="65" stroke={STROKE} strokeWidth="2" />
      <rect x="120" y="65" width="20" height="5" fill="#CE1126" stroke={STROKE} strokeWidth="0.6" />
      <rect x="120" y="70" width="20" height="5" fill="white" stroke={STROKE} strokeWidth="0.6" />
      <rect x="120" y="75" width="20" height="5" fill={STROKE} />
      <rect x="120" y="65" width="5" height="15" fill="#009639" stroke={STROKE} strokeWidth="0.6" />

      {/* Sand foreground */}
      <path d="M 0 200 Q 60 195 120 200 Q 180 205 240 200 L 240 240 L 0 240 Z" fill="#FCD7AB" stroke={STROKE} strokeWidth="2" />
    </svg>
  );
}

/* Gas vs Rocky */
function GasVsRockySticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Rocky side */}
<circle cx="60" cy="100" r="22" fill="#9CA3AF" stroke={STROKE} strokeWidth={STROKE_W} />
      <circle cx="60" cy="160" r="28" fill="#3B82F6" stroke={STROKE} strokeWidth={STROKE_W} />
      <path d="M 45 150 Q 60 145 70 155 Q 60 165 50 160 Z" fill="#22C55E" stroke={STROKE} strokeWidth="2" />

      {/* Divider */}
      <line x1="120" y1="20" x2="120" y2="220" stroke={STROKE} strokeWidth="2" strokeDasharray="4 4" />

      {/* Gas side */}
<circle cx="180" cy="100" r="40" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      <path d="M 145 95 Q 180 90 215 95" stroke="#92400E" strokeWidth="3" fill="none" opacity="0.5" />
      <path d="M 145 105 Q 180 100 215 105" stroke="#92400E" strokeWidth="3" fill="none" opacity="0.5" />
      <ellipse cx="180" cy="170" rx="38" ry="6" fill="#D4AF37" stroke={STROKE} strokeWidth="2" />
      <circle cx="180" cy="170" r="22" fill="#67E8F9" stroke={STROKE} strokeWidth={STROKE_W} />
    </svg>
  );
}

/* Hope Probe orbiting Mars (subject for Hope mission card) */
function HopeMarsSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Mars body */}
      <circle cx="120" cy="135" r="60" fill="#EF4444" stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx="100" cy="120" rx="14" ry="9" fill="#B91C1C" />
      <ellipse cx="135" cy="145" rx="12" ry="7" fill="#B91C1C" />
      <path d="M 90 95 Q 120 88 150 95 Q 135 105 105 105 Z" fill="white" stroke={STROKE} strokeWidth="2.5" />
      {/* Orbit */}
      <ellipse cx="120" cy="135" rx="100" ry="36" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 4" transform="rotate(-15 120 135)" opacity="0.7" />
      {/* Hope Probe — small */}
      <g transform="translate(190 70) rotate(20)">
        <rect x="-12" y="-7" width="24" height="14" rx="2" fill="#D4AF37" stroke={STROKE} strokeWidth="2" />
        <rect x="-22" y="-5" width="9" height="10" fill="#3B82F6" stroke={STROKE} strokeWidth="1.5" />
        <rect x="13" y="-5" width="9" height="10" fill="#3B82F6" stroke={STROKE} strokeWidth="1.5" />
        <line x1="0" y1="-7" x2="0" y2="-15" stroke={STROKE} strokeWidth="2" />
        <circle cx="0" cy="-16" r="2" fill="#D4AF37" stroke={STROKE} strokeWidth="1" />
      </g>
    </svg>
  );
}

/* ===================================================================
   HERITAGE SUBJECT — emirate signature stickers
   =================================================================== */

/* Al Noor Mosque (Sharjah) — Turkish-style mosque on Khalid Lagoon */
function AlNoorMosqueSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <circle cx="120" cy="120" r="105" fill="#E6F3FA" opacity="0.35" />
      {/* Lagoon water */}
      <rect y="190" width="240" height="50" fill="#7AC4FF" />
      <path d="M 0 190 Q 60 186 120 190 Q 180 194 240 190 L 240 200 Q 180 197 120 200 Q 60 203 0 200 Z" fill="#5AAFE6" />

      {/* Left minaret — taller, slimmer */}
      <rect x="48" y="90" width="11" height="100" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      <circle cx="53.5" cy="90" r="7" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      <path d="M 47 80 L 53.5 70 L 60 80 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      <line x1="53.5" y1="70" x2="53.5" y2="58" stroke={STROKE} strokeWidth="1.5" />
      <circle cx="53.5" cy="56" r="2" fill="#D4AF37" stroke={STROKE} strokeWidth="1" />

      {/* Right minaret */}
      <rect x="181" y="90" width="11" height="100" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      <circle cx="186.5" cy="90" r="7" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      <path d="M 180 80 L 186.5 70 L 193 80 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      <line x1="186.5" y1="70" x2="186.5" y2="58" stroke={STROKE} strokeWidth="1.5" />
      <circle cx="186.5" cy="56" r="2" fill="#D4AF37" stroke={STROKE} strokeWidth="1" />

      {/* Main building (rectangular block) */}
      <rect x="65" y="135" width="110" height="55" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Big central dome (Turkish proportions: tall and round) */}
      <path
        d="M 80 130 Q 80 70 120 60 Q 160 70 160 130 Z"
        fill="white"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Two smaller side semi-domes */}
      <path d="M 65 130 Q 65 105 85 100 Q 90 105 90 130 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      <path d="M 175 130 Q 175 105 155 100 Q 150 105 150 130 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Spire on dome */}
      <line x1="120" y1="60" x2="120" y2="44" stroke={STROKE} strokeWidth="2" />
      <circle cx="120" cy="42" r="3" fill="#D4AF37" stroke={STROKE} strokeWidth="1" />
      <path d="M 117 50 Q 120 47 123 50" stroke="#D4AF37" strokeWidth="1.2" fill="none" />

      {/* Arched entrance */}
      <path d="M 108 190 Q 108 158 120 158 Q 132 158 132 190 Z" fill="#1A1A2E" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Side window arches */}
      <path d="M 75 188 Q 75 170 85 170 Q 95 170 95 188 Z" fill="#3B82F6" opacity="0.4" stroke={STROKE} strokeWidth="1" />
      <path d="M 145 188 Q 145 170 155 170 Q 165 170 165 188 Z" fill="#3B82F6" opacity="0.4" stroke={STROKE} strokeWidth="1" />

      {/* Reflection in lagoon */}
      <path d="M 80 200 Q 80 215 90 218" stroke="white" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M 160 200 Q 160 215 150 218" stroke="white" strokeWidth="2" fill="none" opacity="0.6" />
    </svg>
  );
}

/* Ajman Fort — coral-stone fort with watchtower */
function AjmanFortSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sandy sky */}
      <circle cx="120" cy="120" r="105" fill="#FCD7AB" opacity="0.4" />
      {/* Sun */}
      <circle cx="200" cy="55" r="16" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Main fort body (lower left) */}
      <rect x="30" y="130" width="120" height="80" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Crenellations on top */}
      <path d="M 30 130 L 30 120 L 42 120 L 42 130 M 54 130 L 54 120 L 66 120 L 66 130 M 78 130 L 78 120 L 90 120 L 90 130 M 102 130 L 102 120 L 114 120 L 114 130 M 126 130 L 126 120 L 138 120 L 138 130 M 150 130 L 150 120 M 30 120 L 150 120" stroke={STROKE} strokeWidth={STROKE_W} fill="#D4AF37" strokeLinejoin="round" />
      {/* Arched gate */}
      <path d="M 78 210 L 78 175 Q 78 160 90 160 Q 102 160 102 175 L 102 210 Z" fill="#1A1A2E" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Small windows */}
      <rect x="50" y="160" width="8" height="12" fill="#3B82F6" opacity="0.5" stroke={STROKE} strokeWidth="1" />
      <rect x="120" y="160" width="8" height="12" fill="#3B82F6" opacity="0.5" stroke={STROKE} strokeWidth="1" />
      {/* Brick pattern hint */}
      <g stroke="#B8862E" strokeWidth="0.6" opacity="0.5">
        <line x1="30" y1="150" x2="150" y2="150" />
        <line x1="30" y1="180" x2="78" y2="180" />
        <line x1="102" y1="180" x2="150" y2="180" />
      </g>

      {/* Tall watchtower (right side) */}
      <rect x="160" y="80" width="46" height="130" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Tower crenellations */}
      <path d="M 160 80 L 160 70 L 168 70 L 168 80 M 176 80 L 176 70 L 184 70 L 184 80 M 192 80 L 192 70 L 200 70 L 200 80 M 206 80 L 206 70 M 160 70 L 206 70" stroke={STROKE} strokeWidth={STROKE_W} fill="#D4AF37" strokeLinejoin="round" />
      {/* Tower window */}
      <rect x="175" y="120" width="14" height="20" rx="2" fill="#3B82F6" opacity="0.55" stroke={STROKE} strokeWidth="1.2" />
      {/* Flag pole + UAE flag */}
      <line x1="183" y1="70" x2="183" y2="50" stroke={STROKE} strokeWidth="2" />
      <rect x="183" y="50" width="14" height="3" fill="#CE1126" stroke={STROKE} strokeWidth="0.5" />
      <rect x="183" y="53" width="14" height="3" fill="white" stroke={STROKE} strokeWidth="0.5" />
      <rect x="183" y="56" width="14" height="3" fill={STROKE} />
      <rect x="183" y="50" width="4" height="9" fill="#009639" stroke={STROKE} strokeWidth="0.5" />

      {/* Sand at base */}
      <rect y="210" width="240" height="20" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
    </svg>
  );
}

/* Flamingo (Ajman / Al Zorah mangroves) */
function FlamingoSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <circle cx="120" cy="120" r="105" fill="#E6F3FA" opacity="0.4" />
      {/* Water */}
      <rect y="180" width="240" height="60" fill="#5AAFE6" />
      <path d="M 0 180 Q 60 175 120 180 Q 180 185 240 180 L 240 195 Q 180 192 120 195 Q 60 198 0 195 Z" fill="#3F8AB8" />

      {/* Mangrove background tufts */}
      <ellipse cx="40" cy="170" rx="22" ry="18" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx="200" cy="170" rx="22" ry="18" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Mangrove root lines */}
      <line x1="40" y1="185" x2="40" y2="200" stroke="#5C4510" strokeWidth="2" />
      <line x1="200" y1="185" x2="200" y2="200" stroke="#5C4510" strokeWidth="2" />

      {/* Flamingo body — pink, standing on one leg */}
      {/* Body (oval) */}
      <ellipse cx="120" cy="135" rx="32" ry="22" fill="#F8B4C8" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Tail feathers */}
      <path d="M 90 130 L 78 122 L 80 138 Z" fill="#F8B4C8" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Long S-curve neck */}
      <path d="M 145 125 Q 165 90 155 70 Q 150 55 158 50" fill="none" stroke="#F8B4C8" strokeWidth="14" strokeLinecap="round" />
      <path d="M 145 125 Q 165 90 155 70 Q 150 55 158 50" fill="none" stroke={STROKE} strokeWidth={STROKE_W} strokeLinecap="round" />
      {/* Head */}
      <ellipse cx="162" cy="48" rx="11" ry="9" fill="#F8B4C8" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Beak — black tip, pink base */}
      <path d="M 170 50 L 184 56 L 178 60 Z" fill="#1A1A2E" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Eye */}
      <circle cx="164" cy="46" r="1.8" fill="#1A1A2E" />
      {/* Single standing leg */}
      <line x1="120" y1="156" x2="120" y2="200" stroke="#F08CB0" strokeWidth="4" strokeLinecap="round" />
      <line x1="120" y1="156" x2="120" y2="200" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
      {/* Webbed foot */}
      <path d="M 113 200 L 120 200 L 127 200" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" />
      {/* Tucked leg (folded up) */}
      <path d="M 122 156 Q 132 162 128 172" fill="none" stroke="#F08CB0" strokeWidth="3" strokeLinecap="round" />

      {/* Wing detail */}
      <path d="M 100 130 Q 115 118 135 125 Q 130 142 110 142 Z" fill="#F08CB0" stroke={STROKE} strokeWidth="1.5" />
    </svg>
  );
}

/* Umm Al Quwain Fort — coastal coral-stone fort */
function UaqFortSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <circle cx="120" cy="120" r="105" fill="#E6F3FA" opacity="0.4" />
      {/* Sea on the right (UAQ is on a peninsula) */}
      <rect x="170" y="170" width="70" height="60" fill="#5AAFE6" />
      <path d="M 170 170 Q 200 167 240 170 L 240 180 Q 200 178 170 180 Z" fill="#3F8AB8" />

      {/* Fort base */}
      <rect x="30" y="120" width="180" height="90" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Crenellations along the top */}
      <g fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round">
        <rect x="30" y="110" width="14" height="12" />
        <rect x="56" y="110" width="14" height="12" />
        <rect x="82" y="110" width="14" height="12" />
        <rect x="108" y="110" width="14" height="12" />
        <rect x="134" y="110" width="14" height="12" />
        <rect x="160" y="110" width="14" height="12" />
        <rect x="186" y="110" width="14" height="12" />
      </g>

      {/* Two corner towers */}
      <rect x="30" y="80" width="28" height="130" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
      <rect x="182" y="80" width="28" height="130" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Tower crenellations */}
      <g fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round">
        <rect x="30" y="70" width="8" height="10" />
        <rect x="42" y="70" width="8" height="10" />
        <rect x="54" y="70" width="4" height="10" />
        <rect x="182" y="70" width="8" height="10" />
        <rect x="194" y="70" width="8" height="10" />
        <rect x="206" y="70" width="4" height="10" />
      </g>
      {/* Tower windows */}
      <rect x="38" y="120" width="12" height="18" rx="2" fill="#3B82F6" opacity="0.55" stroke={STROKE} strokeWidth="1.2" />
      <rect x="190" y="120" width="12" height="18" rx="2" fill="#3B82F6" opacity="0.55" stroke={STROKE} strokeWidth="1.2" />
      {/* Center arched gate */}
      <path d="M 105 210 L 105 165 Q 105 150 120 150 Q 135 150 135 165 L 135 210 Z" fill="#1A1A2E" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Wall window slits */}
      <rect x="68" y="160" width="4" height="14" fill="#1A1A2E" />
      <rect x="86" y="160" width="4" height="14" fill="#1A1A2E" />
      <rect x="150" y="160" width="4" height="14" fill="#1A1A2E" />
      <rect x="168" y="160" width="4" height="14" fill="#1A1A2E" />
      {/* Brick lines */}
      <g stroke="#B8862E" strokeWidth="0.6" opacity="0.5">
        <line x1="30" y1="140" x2="210" y2="140" />
        <line x1="30" y1="180" x2="105" y2="180" />
        <line x1="135" y1="180" x2="210" y2="180" />
      </g>

      {/* Sand at base */}
      <rect y="210" width="240" height="20" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
    </svg>
  );
}

/* Cormorant — Socotra cormorant (Umm Al Quwain / Al Sinniyah) */
function CormorantSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <circle cx="120" cy="120" r="105" fill="#E6F3FA" opacity="0.4" />
      {/* Sun */}
      <circle cx="50" cy="55" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} opacity="0.7" />
      {/* Clouds */}
      <ellipse cx="200" cy="60" rx="20" ry="6" fill="white" opacity="0.7" />
      <ellipse cx="190" cy="65" rx="14" ry="4" fill="white" opacity="0.6" />

      {/* Sea */}
      <rect y="160" width="240" height="80" fill="#5AAFE6" />
      <path d="M 0 160 Q 30 156 60 160 Q 90 164 120 160 Q 150 156 180 160 Q 210 164 240 160 L 240 175 Q 210 178 180 175 Q 150 172 120 175 Q 90 178 60 175 Q 30 172 0 175 Z" fill="#3F8AB8" />
      <path d="M 0 195 Q 60 192 120 195 Q 180 198 240 195" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5" />

      {/* Big cormorant — flying with wings spread */}
      {/* Body */}
      <ellipse cx="120" cy="115" rx="22" ry="10" fill="#1A1A2E" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Head */}
      <circle cx="142" cy="108" r="9" fill="#1A1A2E" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Long hooked beak — bright orange */}
      <path d="M 151 109 L 168 110 L 165 116 Q 158 114 151 113 Z" fill="#F97316" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Eye (tiny white dot) */}
      <circle cx="144" cy="106" r="1.5" fill="white" />
      {/* Tail feathers */}
      <path d="M 100 117 L 80 122 L 100 124 Z" fill="#1A1A2E" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Wings — large, spread out, with feather divisions */}
      <path d="M 120 105 Q 70 60 30 80 Q 60 95 95 110 Z" fill="#1A1A2E" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      <path d="M 120 105 Q 170 60 210 80 Q 180 95 145 110 Z" fill="#1A1A2E" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Wing feather lines */}
      <g stroke="#3D3528" strokeWidth="1" fill="none">
        <path d="M 100 100 L 60 78" />
        <path d="M 105 105 L 75 90" />
        <path d="M 140 100 L 180 78" />
        <path d="M 135 105 L 165 90" />
      </g>

      {/* Two smaller distant cormorants flying away */}
      <g opacity="0.7">
        <path d="M 30 130 L 22 126 L 30 130 L 22 134" stroke="#1A1A2E" strokeWidth="2" fill="none" />
        <path d="M 210 130 L 202 126 L 210 130 L 202 134" stroke="#1A1A2E" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/* Jebel Jais — UAE's tallest mountain with snow cap + zipline */
function JebelJaisSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <circle cx="120" cy="120" r="105" fill="#E6F3FA" opacity="0.4" />
      {/* Sun */}
      <circle cx="200" cy="55" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} opacity="0.85" />
      {/* Cloud */}
      <ellipse cx="55" cy="60" rx="20" ry="7" fill="white" opacity="0.8" />
      <ellipse cx="42" cy="65" rx="14" ry="5" fill="white" opacity="0.7" />

      {/* Far back mountain (smaller) */}
      <path d="M 0 200 L 50 130 L 90 170 L 100 160 L 130 200 Z" fill="#9CA3AF" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />

      {/* Main Jebel Jais peak (tall, central) */}
      <path d="M 60 220 L 130 60 L 175 130 L 195 105 L 240 220 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />

      {/* Snow cap on the highest peak */}
      <path d="M 130 60 L 142 80 Q 125 78 116 90 L 110 80 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Snow on side peak */}
      <path d="M 175 130 L 182 142 Q 172 142 168 148 L 165 140 Z" fill="white" stroke={STROKE} strokeWidth="2" strokeLinejoin="round" />

      {/* Snowflakes drifting */}
      <g fill="white" stroke={STROKE} strokeWidth="0.8">
        <circle cx="80" cy="100" r="2.5" />
        <circle cx="155" cy="115" r="2" />
        <circle cx="195" cy="80" r="2" />
      </g>

      {/* Zipline cable — diagonal across the mountain */}
      <line x1="135" y1="68" x2="225" y2="190" stroke="#1A1A2E" strokeWidth="1.8" strokeDasharray="4 3" />
      <line x1="135" y1="68" x2="225" y2="190" stroke="#D4AF37" strokeWidth="0.8" />

      {/* Zipline rider (small figure on the cable) */}
      <g transform="translate(180 132) rotate(35)">
        {/* Trolley */}
        <rect x="-6" y="-5" width="12" height="4" rx="1" fill="#D4AF37" stroke={STROKE} strokeWidth="1.2" />
        {/* Rope down to person */}
        <line x1="0" y1="-1" x2="0" y2="6" stroke={STROKE} strokeWidth="1.5" />
        {/* Person body */}
        <rect x="-4" y="6" width="8" height="10" rx="2" fill="#CE1126" stroke={STROKE} strokeWidth="1.2" />
        {/* Helmet */}
        <circle cx="0" cy="4" r="3.5" fill="#FCD34D" stroke={STROKE} strokeWidth="1.2" />
      </g>

      {/* Ground hint at base */}
      <path d="M 0 218 Q 60 215 120 218 Q 180 221 240 218 L 240 230 L 0 230 Z" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
    </svg>
  );
}

/* Al Bidya Mosque (Fujairah) — oldest mosque in the UAE, four small unequal mud-stone domes */
function AlBidyaMosqueSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <circle cx="120" cy="120" r="105" fill="#FCD7AB" opacity="0.4" />
      {/* Sun */}
      <circle cx="40" cy="55" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} opacity="0.85" />

      {/* Mountains in the background (Hajar mountains, since Fujairah is mountainous) */}
      <path d="M 0 175 L 50 110 L 100 145 L 145 100 L 195 140 L 240 110 L 240 200 L 0 200 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" opacity="0.7" />

      {/* Mosque body — irregular mud/stone shape */}
      <path d="M 60 180 L 60 145 Q 63 138 70 138 L 168 138 Q 175 138 178 145 L 178 180 Z" fill="#C9A574" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />

      {/* Four unequal domes, all mud-coloured */}
      {/* Dome 1 (left, smallest) */}
      <path d="M 65 145 Q 65 122 80 118 Q 95 122 95 145 Z" fill="#C9A574" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Dome 2 (slightly larger) */}
      <path d="M 95 145 Q 95 115 113 110 Q 132 115 132 145 Z" fill="#C9A574" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Dome 3 (largest, center-right) */}
      <path d="M 132 145 Q 132 108 152 102 Q 172 108 172 145 Z" fill="#C9A574" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Dome 4 (smaller, far right) */}
      <path d="M 162 145 Q 162 125 172 122 Q 178 125 178 145 Z" fill="#C9A574" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />

      {/* Tiny knobs on top of the largest two domes */}
      <circle cx="113" cy="110" r="2" fill={STROKE} />
      <circle cx="152" cy="102" r="2" fill={STROKE} />

      {/* Mud-stone texture lines */}
      <g stroke="#8B6914" strokeWidth="0.6" opacity="0.7">
        <line x1="60" y1="160" x2="178" y2="160" />
        <line x1="60" y1="170" x2="178" y2="170" />
        <line x1="80" y1="155" x2="80" y2="180" />
        <line x1="120" y1="155" x2="120" y2="180" />
        <line x1="150" y1="155" x2="150" y2="180" />
      </g>

      {/* Small arched doorway */}
      <path d="M 110 180 L 110 162 Q 110 152 119 152 Q 128 152 128 162 L 128 180 Z" fill="#1A1A2E" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Ground (sandy) */}
      <rect y="180" width="240" height="22" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Small palm at the side */}
      <line x1="210" y1="180" x2="210" y2="160" stroke="#5C4510" strokeWidth="2.5" />
      <path d="M 210 160 Q 195 152 188 156 M 210 160 Q 225 152 232 156 M 210 160 Q 200 148 198 142 M 210 160 Q 220 148 222 142" stroke="#16A34A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* Snoopy Island (Fujairah) — rocky island shaped like a dog lying on its back, in turquoise sea */
function SnoopyIslandSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <circle cx="120" cy="120" r="105" fill="#E6F3FA" opacity="0.4" />
      {/* Sun */}
      <circle cx="200" cy="50" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} opacity="0.85" />

      {/* Turquoise sea */}
      <rect y="130" width="240" height="110" fill="#67E8F9" />
      <path d="M 0 130 Q 60 126 120 130 Q 180 134 240 130 L 240 145 Q 180 142 120 145 Q 60 148 0 145 Z" fill="#22D3EE" />
      {/* Wavelets */}
      <g stroke="#0E8C6B" strokeWidth="1.2" fill="none" opacity="0.5">
        <path d="M 20 175 Q 35 172 50 175" />
        <path d="M 80 195 Q 95 192 110 195" />
        <path d="M 150 180 Q 165 177 180 180" />
        <path d="M 200 200 Q 215 197 230 200" />
      </g>

      {/* The "Snoopy" island — silhouette resembling a dog lying on its back.
          Body is a long horizontal rock; head is a rounded lump on the left
          with an upward-pointing snout; "ears" droop off to the sides. */}
      {/* Main body of the rock */}
      <path
        d="M 60 145 Q 70 100 100 95 Q 115 90 125 100 L 130 92 Q 140 80 150 92 Q 165 88 175 105 Q 200 115 195 145 Q 200 165 175 165 Q 100 165 75 165 Q 55 162 60 145 Z"
        fill="#A8826B"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Snout / nose tip */}
      <ellipse cx="143" cy="86" rx="4" ry="3" fill="#1A1A2E" />
      {/* Texture: vegetation tufts on top */}
      <g fill="#16A34A" stroke={STROKE} strokeWidth="1">
        <ellipse cx="85" cy="120" rx="6" ry="3" />
        <ellipse cx="115" cy="115" rx="5" ry="3" />
        <ellipse cx="170" cy="125" rx="6" ry="3" />
      </g>
      {/* Rock shadow lines */}
      <g stroke="#8B6914" strokeWidth="0.8" opacity="0.6" fill="none">
        <path d="M 70 150 Q 100 155 140 152 Q 170 150 190 155" />
        <path d="M 80 140 Q 120 142 160 140" />
      </g>

      {/* Small turtle in the foreground water */}
      <g transform="translate(50 200)">
        <ellipse cx="0" cy="0" rx="14" ry="8" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Shell pattern */}
        <path d="M -8 -2 L -3 -5 L 3 -5 L 8 -2 L 5 3 L -5 3 Z" fill="#15803D" stroke={STROKE} strokeWidth="0.8" />
        {/* Head */}
        <ellipse cx="13" cy="-1" rx="4" ry="3" fill="#16A34A" stroke={STROKE} strokeWidth="1.2" />
        <circle cx="14.5" cy="-2" r="0.8" fill={STROKE} />
        {/* Flippers */}
        <ellipse cx="-9" cy="6" rx="4" ry="2" fill="#16A34A" stroke={STROKE} strokeWidth="1" transform="rotate(20 -9 6)" />
        <ellipse cx="9" cy="6" rx="4" ry="2" fill="#16A34A" stroke={STROKE} strokeWidth="1" transform="rotate(-20 9 6)" />
      </g>

      {/* Distant clownfish jumping */}
      <g transform="translate(195 185)">
        <ellipse cx="0" cy="0" rx="6" ry="3" fill="#F97316" stroke={STROKE} strokeWidth="1.2" />
        <line x1="-2" y1="-1" x2="-2" y2="1" stroke="white" strokeWidth="1" />
        <line x1="2" y1="-1" x2="2" y2="1" stroke="white" strokeWidth="1" />
        <path d="M -6 0 L -10 -2 L -10 2 Z" fill="#F97316" stroke={STROKE} strokeWidth="0.8" />
      </g>
    </svg>
  );
}

/* Pearl Oyster (Ras Al Khaimah / Suwaidi Pearl Farm) — open oyster with a pearl */
function PearlOysterSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sea behind */}
      <circle cx="120" cy="120" r="105" fill="#67E8F9" opacity="0.35" />
      {/* Bubbles rising */}
      <g fill="white" stroke={STROKE} strokeWidth="1" opacity="0.7">
        <circle cx="50" cy="60" r="4" />
        <circle cx="190" cy="50" r="5" />
        <circle cx="180" cy="90" r="3" />
        <circle cx="60" cy="100" r="3" />
        <circle cx="170" cy="130" r="2.5" />
      </g>

      {/* Bottom shell (lower half) */}
      <path
        d="M 50 165 Q 50 200 120 210 Q 190 200 190 165 Z"
        fill="#D4D8E0"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Bottom shell ribs */}
      <g stroke="#9CA3AF" strokeWidth="1.2" fill="none">
        <path d="M 60 175 Q 90 195 120 200 Q 150 195 180 175" />
        <path d="M 65 185 Q 92 200 120 205 Q 148 200 175 185" />
      </g>

      {/* Inside lining — pearlescent */}
      <path
        d="M 58 165 Q 58 195 120 203 Q 182 195 182 165 Z"
        fill="#FFE9F4"
        opacity="0.85"
        stroke="#F8B4C8"
        strokeWidth="1.5"
      />

      {/* Top shell (upper half, hinged open at the back) */}
      <path
        d="M 50 165 Q 50 100 120 90 Q 190 100 190 165 Z"
        fill="#D4D8E0"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Inside of top shell */}
      <path
        d="M 58 160 Q 58 108 120 100 Q 182 108 182 160 Z"
        fill="#FFE9F4"
        opacity="0.85"
        stroke="#F8B4C8"
        strokeWidth="1.5"
      />
      {/* Top shell ribs */}
      <g stroke="#9CA3AF" strokeWidth="1.2" fill="none">
        <path d="M 60 150 Q 90 110 120 105 Q 150 110 180 150" />
        <path d="M 70 160 Q 95 130 120 125 Q 145 130 170 160" />
      </g>

      {/* Hinge */}
      <ellipse cx="120" cy="167" rx="14" ry="3" fill="#9CA3AF" stroke={STROKE} strokeWidth="1.5" />

      {/* THE PEARL — sitting in the middle, glowing */}
      <circle cx="120" cy="158" r="22" fill="#FFFCEF" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Pearl highlight */}
      <ellipse cx="113" cy="150" rx="8" ry="6" fill="white" opacity="0.85" />
      <circle cx="128" cy="167" r="3" fill="#F8B4C8" opacity="0.6" />
      {/* Subtle radial sheen */}
      <circle cx="120" cy="158" r="22" fill="none" stroke="#F8B4C8" strokeWidth="0.6" opacity="0.6" />

      {/* Sparkle stars */}
      <g fill="#D4AF37" stroke={STROKE} strokeWidth="0.6">
        <path d="M 100 130 L 102 134 L 106 135 L 102 136 L 100 140 L 98 136 L 94 135 L 98 134 Z" />
        <path d="M 145 145 L 147 148 L 150 149 L 147 150 L 145 153 L 143 150 L 140 149 L 143 148 Z" />
      </g>
    </svg>
  );
}

/* ===================================================================
   ABU DHABI step stickers
   =================================================================== */

/* Abu Dhabi map outline — silhouette of the largest emirate */
function AbuDhabiMapSticker() {
  return (
    <div
      style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
      dangerouslySetInnerHTML={{ __html: USER_STICKER_SVGS['abu-dhabi-map'] ?? "" }}
    />
  );
}

/* Gazelle — the animal Abu Dhabi is named after ("Father of the Gazelle") */
function GazelleSticker() {
  // Side profile of an Arabian gazelle: tan body, slim legs, S-curve neck,
  // long curved horns. Standing on a sandy patch.
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* warm halo */}
      <circle cx="120" cy="120" r="108" fill="#FCD981" opacity="0.35" />
      {/* sandy ground */}
      <path d="M 0 200 Q 60 195 120 200 Q 180 205 240 200 L 240 230 L 0 230 Z" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* tail */}
      <path d="M 70 145 L 58 142 L 70 152 Z" fill="#D4A574" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
      {/* body */}
      <ellipse cx="120" cy="150" rx="50" ry="24" fill="#D4A574" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* lighter belly */}
      <ellipse cx="120" cy="162" rx="40" ry="10" fill="#FCD7AB" />
      {/* S-curve neck */}
      <path d="M 158 138 Q 174 110 168 80" fill="none" stroke="#D4A574" strokeWidth="18" strokeLinecap="round" />
      <path d="M 158 138 Q 174 110 168 80" fill="none" stroke={STROKE} strokeWidth={STROKE_W} strokeLinecap="round" />
      {/* head */}
      <ellipse cx="172" cy="74" rx="16" ry="13" fill="#D4A574" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* snout (lighter) */}
      <ellipse cx="186" cy="80" rx="8" ry="5" fill="#FCD7AB" stroke={STROKE} strokeWidth="1.5" />
      {/* eye */}
      <circle cx="174" cy="71" r="2.5" fill={STROKE} />
      {/* ear */}
      <ellipse cx="166" cy="65" rx="5" ry="8" fill="#FCD7AB" stroke={STROKE} strokeWidth="1.5" transform="rotate(-30 166 65)" />
      {/* curved horns — long, slightly back-swept */}
      <path d="M 162 62 Q 158 42 164 24 Q 170 32 168 48" fill="none" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      <path d="M 172 62 Q 180 42 176 24 Q 174 36 178 50" fill="none" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      {/* horn rings (subtle) */}
      <g stroke={STROKE} strokeWidth="1" fill="none" opacity="0.7">
        <line x1="161" y1="50" x2="166" y2="50" />
        <line x1="160" y1="42" x2="166" y2="42" />
        <line x1="174" y1="50" x2="179" y2="50" />
        <line x1="175" y1="42" x2="180" y2="42" />
      </g>
      {/* slim legs */}
      <line x1="92" y1="170" x2="88" y2="200" stroke="#D4A574" strokeWidth="6" strokeLinecap="round" />
      <line x1="92" y1="170" x2="88" y2="200" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
      <line x1="108" y1="170" x2="108" y2="200" stroke="#D4A574" strokeWidth="6" strokeLinecap="round" />
      <line x1="108" y1="170" x2="108" y2="200" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
      <line x1="132" y1="170" x2="132" y2="200" stroke="#D4A574" strokeWidth="6" strokeLinecap="round" />
      <line x1="132" y1="170" x2="132" y2="200" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
      <line x1="148" y1="170" x2="152" y2="200" stroke="#D4A574" strokeWidth="6" strokeLinecap="round" />
      <line x1="148" y1="170" x2="152" y2="200" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* Sheikh Zayed Mosque — close-up of the dome cluster (focuses on the 82 domes) */
function MosqueDomesCloseupSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#E6F3FA" opacity="0.4" />
      {/* Multiple domes in a row + back */}
      {/* Back row */}
      <circle cx="50" cy="140" r="18" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      <circle cx="90" cy="135" r="22" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      <circle cx="150" cy="135" r="22" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      <circle cx="190" cy="140" r="18" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Center large dome (front) */}
      <path
        d="M 60 165 Q 60 80 120 65 Q 180 80 180 165 Z"
        fill="white"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      <line x1="120" y1="65" x2="120" y2="48" stroke={STROKE} strokeWidth="2" />
      <circle cx="120" cy="46" r="3" fill="#D4AF37" stroke={STROKE} strokeWidth="1" />
      {/* Front mini-domes */}
      <circle cx="40" cy="170" r="14" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      <circle cx="200" cy="170" r="14" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Ground */}
      <rect y="180" width="240" height="20" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
    </svg>
  );
}

/* Sheikh Zayed Mosque at night — same silhouette but cool blue + glowing windows */
function MosqueNightSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Night sky */}
      {/* Crescent moon */}
      <g transform="translate(200 35)">
        <circle r="14" fill="#FFFCEF" />
        <circle cx="5" cy="-3" r="11" fill="#0F2A4A" />
      </g>
      {/* Mosque silhouette (white but moonlit) */}
      <rect x="50" y="140" width="140" height="60" fill="#1B3A5C" stroke="#FFFCEF" strokeWidth="1.5" />
      <circle cx="70" cy="138" r="16" fill="#1B3A5C" stroke="#FFFCEF" strokeWidth="1.5" />
      <circle cx="170" cy="138" r="16" fill="#1B3A5C" stroke="#FFFCEF" strokeWidth="1.5" />
      <path d="M 80 130 Q 80 80 120 70 Q 160 80 160 130 Z" fill="#1B3A5C" stroke="#FFFCEF" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Glowing windows */}
      <rect x="68" y="170" width="8" height="14" fill="#FCD34D" />
      <rect x="100" y="170" width="8" height="14" fill="#FCD34D" />
      <rect x="132" y="170" width="8" height="14" fill="#FCD34D" />
      <rect x="164" y="170" width="8" height="14" fill="#FCD34D" />
      {/* Minarets */}
      <rect x="32" y="100" width="14" height="100" fill="#1B3A5C" stroke="#FFFCEF" strokeWidth="1.5" />
      <rect x="194" y="100" width="14" height="100" fill="#1B3A5C" stroke="#FFFCEF" strokeWidth="1.5" />
      {/* Glow on minaret tops */}
      <circle cx="39" cy="100" r="6" fill="#FCD34D" opacity="0.7" />
      <circle cx="201" cy="100" r="6" fill="#FCD34D" opacity="0.7" />
      {/* Ground reflection */}
      <rect y="200" width="240" height="40" fill="#0A1F3A" />
      <path d="M 50 200 Q 70 215 100 215 Q 130 220 160 215 Q 190 210 200 200" stroke="#FFFCEF" strokeWidth="1" fill="none" opacity="0.4" />
    </svg>
  );
}

/* Mosque arched entrance — close-up of the iconic arch with intricate detail */
function MosqueArchSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#FCD7AB" opacity="0.3" />
      {/* Outer wall frame */}
      <rect x="50" y="40" width="140" height="180" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Decorative band on top */}
      <rect x="50" y="40" width="140" height="18" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Geometric pattern in the band */}
      <g stroke="#1A1A2E" strokeWidth="1.5" fill="none">
        {[60, 80, 100, 120, 140, 160, 180].map((x) => (
          <path key={x} d={`M ${x} 44 L ${x + 4} 49 L ${x} 54 L ${x - 4} 49 Z`} />
        ))}
      </g>
      {/* The arch itself — pointed Islamic arch */}
      <path
        d="M 80 220 L 80 130 Q 80 80 120 70 Q 160 80 160 130 L 160 220 Z"
        fill="#1A1A2E"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Arabesque pattern on the arch interior */}
      <g stroke="#D4AF37" strokeWidth="1.2" fill="none" opacity="0.7">
        <path d="M 95 100 Q 120 90 145 100" />
        <path d="M 100 130 Q 120 122 140 130" />
        <path d="M 105 160 Q 120 154 135 160" />
      </g>
      {/* Inner light glow */}
      <ellipse cx="120" cy="190" rx="28" ry="20" fill="#FCD34D" opacity="0.3" />
      {/* Side columns */}
      <rect x="60" y="60" width="14" height="160" fill="#E5DCC0" stroke={STROKE} strokeWidth={STROKE_W} />
      <rect x="166" y="60" width="14" height="160" fill="#E5DCC0" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Column tops */}
      <rect x="56" y="55" width="22" height="8" fill="#D4AF37" stroke={STROKE} strokeWidth="1.5" />
      <rect x="162" y="55" width="22" height="8" fill="#D4AF37" stroke={STROKE} strokeWidth="1.5" />
    </svg>
  );
}

/* Liwa Dunes — vast rolling desert dunes */
function LiwaDunesSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      {/* Sun */}
      <circle cx="180" cy="55" r="22" fill="#F97316" stroke={STROKE} strokeWidth={STROKE_W} />
      <circle cx="180" cy="55" r="35" fill="#F97316" opacity="0.25" />
      {/* Far back dunes (light) */}
      <path d="M 0 130 Q 50 100 100 115 Q 150 95 200 110 Q 230 100 240 105 L 240 240 L 0 240 Z" fill="#FCD7AB" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Mid dunes */}
      <path d="M 0 165 Q 60 135 120 150 Q 180 135 240 150 L 240 240 L 0 240 Z" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Front dunes (deepest gold) */}
      <path d="M 0 200 Q 60 175 120 190 Q 180 175 240 190 L 240 240 L 0 240 Z" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Ridge highlights — wind-swept lines */}
      <g stroke="#B8862E" strokeWidth="1.2" fill="none" opacity="0.6">
        <path d="M 30 145 Q 60 142 90 145" />
        <path d="M 110 175 Q 140 172 170 175" />
        <path d="M 60 215 Q 90 213 120 215" />
      </g>
      {/* Tiny camel silhouette walking on the back dune */}
      <g transform="translate(170 158)">
        <ellipse cx="0" cy="0" rx="9" ry="3.5" fill="#1A1A2E" />
        <path d="M -4 -3 Q 0 -8 5 -3 Z" fill="#1A1A2E" />
        <path d="M 7 -1 L 11 -8 L 13 -8 L 12 0 Z" fill="#1A1A2E" />
        <line x1="-4" y1="3" x2="-4" y2="9" stroke="#1A1A2E" strokeWidth="1.4" />
        <line x1="4" y1="3" x2="4" y2="9" stroke="#1A1A2E" strokeWidth="1.4" />
      </g>
    </svg>
  );
}

/* Tal Moreeb — the famous tallest dune (with a tiny climber for scale) */
function TalMoreebSticker() {
  return (
    <div
      style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
      dangerouslySetInnerHTML={{ __html: USER_STICKER_SVGS['tal-moreeb'] ?? "" }}
    />
  );
}

/* Sheikh Zayed portrait silhouette (respectful, abstract — head + ghutra) */
function SheikhZayedPortraitSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Gold radial background — honor symbol */}
      <circle cx="120" cy="120" r="105" fill="#FCD34D" opacity="0.25" />
      {/* Sunburst rays */}
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const x1 = 120 + Math.cos(a) * 105;
        const y1 = 120 + Math.sin(a) * 105;
        const x2 = 120 + Math.cos(a) * 115;
        const y2 = 120 + Math.sin(a) * 115;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#D4AF37"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />
        );
      })}
      {/* Inner gold disc */}
      <circle cx="120" cy="120" r="80" fill="#FFFCEF" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Silhouette: head + ghutra (traditional headdress) */}
      {/* Ghutra (white headdress) */}
      <path
        d="M 80 110 Q 75 80 120 70 Q 165 80 160 110 L 165 145 Q 165 175 145 175 L 95 175 Q 75 175 75 145 Z"
        fill="white"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Agal (black rope holding ghutra) */}
      <ellipse cx="120" cy="80" rx="42" ry="6" fill="#1A1A2E" />
      <ellipse cx="120" cy="80" rx="42" ry="6" fill="none" stroke={STROKE} strokeWidth="1.5" />
      <circle cx="105" cy="78" r="3.5" fill="#1A1A2E" stroke={STROKE} strokeWidth="0.8" />
      <circle cx="135" cy="78" r="3.5" fill="#1A1A2E" stroke={STROKE} strokeWidth="0.8" />
      {/* Face silhouette inside the ghutra */}
      <path d="M 95 110 Q 95 145 120 150 Q 145 145 145 110 Z" fill="#D4A574" stroke={STROKE} strokeWidth="1.5" />
      {/* Beard hint */}
      <path d="M 100 130 Q 120 155 140 130" fill="#3D3528" stroke={STROKE} strokeWidth="1" opacity="0.7" />
    </svg>
  );
}

/* Qasr Al Watan — Presidential palace with the iconic golden dome */
function QasrAlWatanSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <circle cx="120" cy="120" r="105" fill="#E6F3FA" opacity="0.4" />
      {/* Sun */}
      <circle cx="200" cy="50" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} opacity="0.85" />

      {/* Palace base — wide */}
      <rect x="20" y="155" width="200" height="55" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Side wings (steps) */}
      <rect x="0" y="170" width="30" height="40" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      <rect x="210" y="170" width="30" height="40" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Window arches */}
      <g fill="#3B82F6" opacity="0.45" stroke={STROKE} strokeWidth="1">
        {[40, 70, 100, 130, 160, 190].map((x) => (
          <path key={x} d={`M ${x} 200 L ${x} 175 Q ${x} 165 ${x + 7} 165 Q ${x + 14} 165 ${x + 14} 175 L ${x + 14} 200 Z`} />
        ))}
      </g>

      {/* Center large GOLDEN dome */}
      <path
        d="M 70 160 Q 70 80 120 60 Q 170 80 170 160 Z"
        fill="#D4AF37"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Dome ribs */}
      <g stroke="#B8862E" strokeWidth="1.5" fill="none">
        <path d="M 95 80 Q 100 120 95 155" />
        <path d="M 120 65 L 120 155" />
        <path d="M 145 80 Q 140 120 145 155" />
      </g>
      {/* Spire */}
      <line x1="120" y1="60" x2="120" y2="40" stroke={STROKE} strokeWidth="2.5" />
      <circle cx="120" cy="38" r="3.5" fill="#FCD34D" stroke={STROKE} strokeWidth="1.5" />

      {/* Two side smaller golden domes */}
      <path d="M 30 155 Q 30 130 50 125 Q 65 130 65 155 Z" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      <path d="M 175 155 Q 175 130 190 125 Q 210 130 210 155 Z" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />

      {/* Central grand entrance arch */}
      <path d="M 105 210 L 105 170 Q 105 155 120 155 Q 135 155 135 170 L 135 210 Z" fill="#1A1A2E" stroke={STROKE} strokeWidth={STROKE_W} />
      <path d="M 110 200 L 110 175 Q 110 165 120 165 Q 130 165 130 175 L 130 200 Z" fill="#D4AF37" opacity="0.5" />

      {/* Ground */}
      <rect y="210" width="240" height="20" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
    </svg>
  );
}

/* Bedouin tent — traditional Emirati heritage */
function BedouinTentSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sun */}
      <circle cx="200" cy="50" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Distant dunes */}
      <path d="M 0 175 Q 60 165 120 175 Q 180 185 240 175 L 240 200 L 0 200 Z" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Tent — black goat-hair (bait al-shaar) */}
      {/* Tent ropes */}
      <line x1="55" y1="190" x2="40" y2="200" stroke="#5C4510" strokeWidth="1.8" />
      <line x1="185" y1="190" x2="200" y2="200" stroke="#5C4510" strokeWidth="1.8" />
      <line x1="120" y1="80" x2="120" y2="60" stroke="#5C4510" strokeWidth="1.8" />
      {/* Main tent shape — wide-sloped pyramid */}
      <path
        d="M 50 190 L 70 100 L 170 100 L 190 190 Z"
        fill="#1A1A2E"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Center pole hint at top */}
      <rect x="118" y="80" width="4" height="12" fill="#5C4510" stroke={STROKE} strokeWidth="1" />
      {/* Tent pattern — Sadu-inspired stripes */}
      <g stroke="#CE1126" strokeWidth="1.5" fill="none">
        <path d="M 60 150 L 180 150" />
        <path d="M 65 165 L 175 165" />
      </g>
      <g stroke="#FFFCEF" strokeWidth="1.5" fill="none">
        <path d="M 60 158 L 180 158" />
        <path d="M 65 173 L 175 173" />
      </g>
      {/* Open tent flap (entrance) */}
      <path d="M 110 190 L 110 145 Q 110 130 120 130 Q 130 130 130 145 L 130 190 Z" fill="#FFE9A8" stroke={STROKE} strokeWidth="1.5" />
      {/* Coffee dallah inside the tent */}
      <g transform="translate(120 175)">
        <ellipse cx="0" cy="0" rx="6" ry="4" fill="#5C4510" stroke={STROKE} strokeWidth="1" />
        <path d="M -3 -3 Q 0 -10 3 -3 Z" fill="#5C4510" stroke={STROKE} strokeWidth="1" />
        <path d="M -7 -1 L -10 -3 L -8 1 Z" fill="#5C4510" stroke={STROKE} strokeWidth="1" />
      </g>
      {/* Camel resting beside the tent */}
      <g transform="translate(45 195)">
        <ellipse cx="0" cy="0" rx="14" ry="5" fill="#D4A574" stroke={STROKE} strokeWidth="1.5" />
        <path d="M -6 -3 Q 0 -10 6 -3 Z" fill="#D4A574" stroke={STROKE} strokeWidth="1.5" />
        <path d="M 8 -2 L 13 -10 L 16 -10 L 13 0 Z" fill="#D4A574" stroke={STROKE} strokeWidth="1.5" />
      </g>
      {/* Ground */}
      <rect y="200" width="240" height="20" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
    </svg>
  );
}

/* ===================================================================
   DUBAI step stickers
   =================================================================== */

/* Dubai map outline — emirate silhouette with the creek slicing through */
function DubaiMapSticker() {
  return (
    <div
      style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
      dangerouslySetInnerHTML={{ __html: USER_STICKER_SVGS['dubai-map'] ?? "" }}
    />
  );
}

/* Palm Jumeirah — top-down view of the palm-shaped artificial island */
function PalmJumeirahSticker() {
  return (
    <div
      style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
      dangerouslySetInnerHTML={{ __html: USER_STICKER_SVGS['palm-jumeirah'] ?? "" }}
    />
  );
}

/* Dubai Creek — old-Dubai scene with abras + dhows + Sadu pattern shore */
function DubaiCreekSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="120" fill="#FFE9A8" opacity="0.6" />
      {/* Sun */}
      <circle cx="200" cy="50" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Far skyline (modern Dubai in background) */}
      <g fill="#A8B8C8" stroke={STROKE} strokeWidth="1" opacity="0.6">
        <rect x="20" y="90" width="14" height="30" />
        <rect x="36" y="80" width="10" height="40" />
        <rect x="48" y="100" width="14" height="20" />
        <rect x="64" y="60" width="8" height="60" />
        <rect x="74" y="85" width="14" height="35" />
      </g>
      {/* Creek water */}
      <rect y="120" width="240" height="120" fill="#5AAFE6" />
      <path d="M 0 120 Q 60 116 120 120 Q 180 124 240 120 L 240 132 Q 180 130 120 132 Q 60 134 0 132 Z" fill="#3F8AB8" />
      {/* Wave lines */}
      <g stroke="#3F8AB8" strokeWidth="1.2" fill="none" opacity="0.6">
        <path d="M 20 165 Q 40 162 60 165" />
        <path d="M 140 175 Q 160 172 180 175" />
        <path d="M 80 200 Q 100 197 120 200" />
        <path d="M 180 215 Q 200 212 220 215" />
      </g>
      {/* Foreground dhow */}
      <g transform="translate(60 150)">
        {/* Hull */}
        <path d="M -28 8 Q -22 22 0 22 Q 22 22 28 8 L 22 0 Q 0 4 -22 0 Z" fill="#8B6914" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        {/* Mast */}
        <line x1="0" y1="0" x2="0" y2="-30" stroke="#5C4510" strokeWidth="2" />
        {/* Triangle sail */}
        <path d="M 0 -30 L 22 0 L 0 0 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      </g>
      {/* Abra (small water taxi) in mid distance */}
      <g transform="translate(160 175)">
        <path d="M -15 4 Q -12 12 0 12 Q 12 12 15 4 L 12 0 Q 0 2 -12 0 Z" fill="#5C4510" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="-9" y="-4" width="18" height="6" fill="#D4AF37" stroke={STROKE} strokeWidth="1" />
        <line x1="0" y1="-4" x2="0" y2="-12" stroke={STROKE} strokeWidth="1" />
      </g>
    </svg>
  );
}

/* Dubai Frame — the giant golden picture frame, 150m tall */
function DubaiFrameSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#E6F3FA" opacity="0.4" />
      {/* Sun behind */}
      <circle cx="200" cy="60" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} opacity="0.85" />
      {/* The frame — tall rectangle made of two pillars + top + bottom */}
      {/* Left pillar */}
      <rect x="50" y="40" width="22" height="180" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Right pillar */}
      <rect x="168" y="40" width="22" height="180" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Top crossbar */}
      <rect x="50" y="40" width="140" height="22" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Bottom crossbar */}
      <rect x="50" y="198" width="140" height="22" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Frame ornamentation — geometric pattern */}
      <g stroke="#B8862E" strokeWidth="1" fill="none">
        {/* Corner diamonds */}
        <path d="M 56 46 L 66 46 L 61 56 Z" />
        <path d="M 174 46 L 184 46 L 179 56 Z" />
        <path d="M 56 204 L 66 204 L 61 214 Z" />
        <path d="M 174 204 L 184 204 L 179 214 Z" />
        {/* Vertical pillar lines */}
        <line x1="58" y1="70" x2="58" y2="190" />
        <line x1="64" y1="70" x2="64" y2="190" />
        <line x1="176" y1="70" x2="176" y2="190" />
        <line x1="182" y1="70" x2="182" y2="190" />
      </g>
      {/* Old Dubai (left side of view through frame) */}
      <g fill="#A8826B" stroke={STROKE} strokeWidth="1">
        <rect x="80" y="160" width="14" height="36" />
        <path d="M 80 160 Q 80 152 87 152 Q 94 152 94 160 Z" />
        <line x1="87" y1="152" x2="87" y2="148" stroke={STROKE} strokeWidth="0.8" />
      </g>
      {/* New Dubai (right side, modern skyscraper) */}
      <g fill="#A8B8C8" stroke={STROKE} strokeWidth="1">
        <rect x="140" y="120" width="10" height="76" />
        <path d="M 145 120 L 145 110" stroke={STROKE} strokeWidth="1" />
      </g>
      {/* Diagonal divider (showing "old vs new") */}
      <line x1="118" y1="70" x2="118" y2="195" stroke="#1A1A2E" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      {/* Ground */}
      <rect y="220" width="240" height="20" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
    </svg>
  );
}

/* Pearl Diver — historical diver with rope going up */
function PearlDiverSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="80" fill="#FFE9A8" opacity="0.6" />
      {/* Sun */}
      <circle cx="200" cy="35" r="12" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Sea surface */}
      <rect y="80" width="240" height="160" fill="#5AAFE6" />
      <path d="M 0 80 Q 60 76 120 80 Q 180 84 240 80 L 240 92 Q 180 90 120 92 Q 60 94 0 92 Z" fill="#3F8AB8" />
      {/* Boat at the surface */}
      <g transform="translate(50 80)">
        <path d="M -20 0 Q -15 8 0 8 Q 15 8 20 0 Z" fill="#5C4510" stroke={STROKE} strokeWidth="1.5" />
      </g>
      {/* Diving rope down to diver */}
      <line x1="50" y1="88" x2="120" y2="170" stroke="#5C4510" strokeWidth="1.5" />
      {/* Bubbles */}
      <g fill="white" opacity="0.7" stroke={STROKE} strokeWidth="0.6">
        <circle cx="120" cy="120" r="3" />
        <circle cx="125" cy="100" r="2" />
        <circle cx="118" cy="150" r="2.5" />
      </g>
      {/* Diver */}
      <g transform="translate(120 175)">
        {/* Body */}
        <ellipse cx="0" cy="0" rx="14" ry="20" fill="#D4A574" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Head */}
        <circle cx="0" cy="-22" r="8" fill="#D4A574" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Eye */}
        <circle cx="0" cy="-22" r="1.5" fill={STROKE} />
        {/* Arms outstretched (one holding rope, one with pearl) */}
        <line x1="-8" y1="-8" x2="-25" y2="-20" stroke="#D4A574" strokeWidth="6" strokeLinecap="round" />
        <line x1="-8" y1="-8" x2="-25" y2="-20" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="-8" x2="20" y2="0" stroke="#D4A574" strokeWidth="6" strokeLinecap="round" />
        <line x1="8" y1="-8" x2="20" y2="0" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
        {/* Rope going up from one hand */}
        <line x1="-25" y1="-20" x2="-70" y2="-100" stroke="#5C4510" strokeWidth="1.5" />
        {/* Legs (kicking) */}
        <line x1="-5" y1="20" x2="-12" y2="35" stroke="#D4A574" strokeWidth="6" strokeLinecap="round" />
        <line x1="-5" y1="20" x2="-12" y2="35" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="5" y1="20" x2="12" y2="35" stroke="#D4A574" strokeWidth="6" strokeLinecap="round" />
        <line x1="5" y1="20" x2="12" y2="35" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
        {/* Pearl in hand */}
        <circle cx="22" cy="2" r="5" fill="#FFFCEF" stroke={STROKE} strokeWidth="1.2" />
        <circle cx="20" cy="0" r="2" fill="white" />
      </g>
      {/* Sea floor with oysters */}
      <rect y="225" width="240" height="15" fill="#A8826B" />
      <g transform="translate(60 232)">
        <ellipse cx="0" cy="0" rx="8" ry="3" fill="#9CA3AF" stroke={STROKE} strokeWidth="0.8" />
      </g>
      <g transform="translate(180 232)">
        <ellipse cx="0" cy="0" rx="8" ry="3" fill="#9CA3AF" stroke={STROKE} strokeWidth="0.8" />
      </g>
    </svg>
  );
}

/* Burj Khalifa at night — light show */
function BurjKhalifaNightSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Night sky gradient */}
      {/* Tower silhouette (matches BurjKhalifa shape but coloured) */}
      <path
        d="M 116 230 L 116 200 L 110 200 L 110 170 L 104 170 L 104 140 L 98 140 L 98 110 L 104 110 L 104 80 L 110 80 L 110 50 L 116 50 L 116 30 L 124 30 L 124 50 L 130 50 L 130 80 L 136 80 L 136 110 L 142 110 L 142 140 L 136 140 L 136 170 L 130 170 L 130 200 L 124 200 L 124 230 Z"
        fill="#1B3A5C"
        stroke="#FCD34D"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Antenna */}
      <line x1="120" y1="30" x2="120" y2="10" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />
      <circle cx="120" cy="9" r="3" fill="#FCD34D" />
      {/* Light show beams */}
      <g stroke="#3B82F6" strokeWidth="2" opacity="0.6">
        <line x1="120" y1="40" x2="60" y2="100" strokeLinecap="round" />
        <line x1="120" y1="40" x2="180" y2="100" strokeLinecap="round" />
        <line x1="120" y1="40" x2="40" y2="160" strokeLinecap="round" />
        <line x1="120" y1="40" x2="200" y2="160" strokeLinecap="round" />
      </g>
      {/* Glowing windows */}
      <g fill="#FCD34D" opacity="0.85">
        <rect x="113" y="80" width="2" height="3" />
        <rect x="118" y="85" width="2" height="3" />
        <rect x="123" y="90" width="2" height="3" />
        <rect x="113" y="120" width="2" height="3" />
        <rect x="120" y="125" width="2" height="3" />
        <rect x="113" y="160" width="2" height="3" />
        <rect x="123" y="165" width="2" height="3" />
        <rect x="118" y="190" width="2" height="3" />
      </g>
      {/* Fireworks */}
      <g stroke="#FCD34D" strokeWidth="1.2" fill="none">
        <circle cx="50" cy="50" r="12" opacity="0.5" />
        <circle cx="50" cy="50" r="6" opacity="0.7" />
        <circle cx="190" cy="55" r="10" opacity="0.5" />
      </g>
      <g fill="#F8B4C8">
        <circle cx="50" cy="50" r="2" />
        <circle cx="190" cy="55" r="2" />
      </g>
      {/* Ground reflection */}
      <rect y="225" width="240" height="15" fill="#0A1F3A" />
    </svg>
  );
}

/* Gold Souq — traditional gold market stalls */
function GoldSouqSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Striped souq awning (top) */}
      <path d="M 0 50 L 240 50 L 240 80 Q 220 90 200 80 Q 180 90 160 80 Q 140 90 120 80 Q 100 90 80 80 Q 60 90 40 80 Q 20 90 0 80 Z" fill="#CE1126" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      <g fill="white">
        <rect x="0" y="50" width="240" height="6" />
      </g>
      {/* Awning support poles */}
      <line x1="20" y1="80" x2="20" y2="200" stroke={STROKE} strokeWidth="2.5" />
      <line x1="220" y1="80" x2="220" y2="200" stroke={STROKE} strokeWidth="2.5" />

      {/* Gold display window — central showcase */}
      <rect x="50" y="100" width="140" height="100" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Window frame */}
      <line x1="50" y1="135" x2="190" y2="135" stroke={STROKE} strokeWidth="1.2" />
      <line x1="120" y1="100" x2="120" y2="200" stroke={STROKE} strokeWidth="1.2" />

      {/* Gold necklaces hanging in the window */}
      <g transform="translate(85 110)">
        <path d="M -15 0 Q -10 15 0 18 Q 10 15 15 0" fill="none" stroke="#D4AF37" strokeWidth="2.5" />
        <circle cx="0" cy="20" r="3" fill="#D4AF37" stroke={STROKE} strokeWidth="0.8" />
      </g>
      <g transform="translate(155 110)">
        <path d="M -15 0 Q -10 15 0 18 Q 10 15 15 0" fill="none" stroke="#D4AF37" strokeWidth="2.5" />
        <circle cx="0" cy="20" r="3" fill="#D4AF37" stroke={STROKE} strokeWidth="0.8" />
      </g>
      {/* Gold bracelets / rings on a stand */}
      <g transform="translate(85 165)">
        <ellipse cx="0" cy="0" rx="14" ry="3" fill="#D4AF37" stroke={STROKE} strokeWidth="1" />
        <ellipse cx="0" cy="-6" rx="14" ry="3" fill="#D4AF37" stroke={STROKE} strokeWidth="1" />
        <ellipse cx="0" cy="-12" rx="14" ry="3" fill="#D4AF37" stroke={STROKE} strokeWidth="1" />
      </g>
      <g transform="translate(155 165)">
        <ellipse cx="0" cy="0" rx="14" ry="3" fill="#D4AF37" stroke={STROKE} strokeWidth="1" />
        <ellipse cx="0" cy="-6" rx="14" ry="3" fill="#D4AF37" stroke={STROKE} strokeWidth="1" />
        <ellipse cx="0" cy="-12" rx="14" ry="3" fill="#D4AF37" stroke={STROKE} strokeWidth="1" />
      </g>
      {/* Floor */}
      <rect y="200" width="240" height="20" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} />
      <g stroke="#5C4510" strokeWidth="0.6" opacity="0.6">
        <line x1="0" y1="210" x2="240" y2="210" />
      </g>
    </svg>
  );
}

/* Wind tower — Al Fahidi historic district pre-AC cooling tower */
function WindTowerSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#FCD7AB" opacity="0.4" />
      {/* Sun */}
      <circle cx="200" cy="50" r="12" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} opacity="0.85" />
      {/* Wind direction arrows */}
      <g stroke="#5AAFE6" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6">
        <path d="M 30 70 L 50 75 M 50 75 L 45 71 M 50 75 L 45 79" />
        <path d="M 35 100 L 55 105 M 55 105 L 50 101 M 55 105 L 50 109" />
      </g>
      {/* Main coral-stone house body */}
      <rect x="50" y="140" width="140" height="80" fill="#C9A574" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Brick texture */}
      <g stroke="#8B6914" strokeWidth="0.6" opacity="0.5">
        <line x1="50" y1="160" x2="190" y2="160" />
        <line x1="50" y1="180" x2="190" y2="180" />
        <line x1="50" y1="200" x2="190" y2="200" />
      </g>
      {/* Door */}
      <path d="M 105 220 L 105 185 Q 105 175 120 175 Q 135 175 135 185 L 135 220 Z" fill="#5C4510" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Side windows */}
      <rect x="65" y="170" width="14" height="18" fill="#3B82F6" opacity="0.5" stroke={STROKE} strokeWidth="1" />
      <rect x="161" y="170" width="14" height="18" fill="#3B82F6" opacity="0.5" stroke={STROKE} strokeWidth="1" />

      {/* THE WIND TOWER — tall square tower on top */}
      <rect x="95" y="55" width="50" height="90" fill="#C9A574" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Wind tower openings (the slots that catch the wind on all 4 sides) */}
      <g fill="#1A1A2E">
        <rect x="100" y="65" width="8" height="35" />
        <rect x="115" y="65" width="8" height="35" />
        <rect x="130" y="65" width="8" height="35" />
      </g>
      {/* Decorative top */}
      <rect x="92" y="50" width="56" height="6" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} />
      <path d="M 92 50 L 100 40 L 140 40 L 148 50 Z" fill="#C9A574" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Cap detail */}
      <rect x="105" y="35" width="30" height="5" fill="#D4AF37" stroke={STROKE} strokeWidth="1" />

      {/* Ground */}
      <rect y="220" width="240" height="20" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
    </svg>
  );
}

/* Hatta Dam — kayak on a calm blue mountain dam */
function HattaDamSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="120" fill="#E6F3FA" opacity="0.6" />
      {/* Sun */}
      <circle cx="50" cy="40" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} opacity="0.85" />
      {/* Mountains around the dam */}
      <path d="M 0 120 L 40 60 L 80 100 L 110 50 L 150 90 L 200 55 L 240 100 L 240 130 L 0 130 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Mountain shadows */}
      <path d="M 80 100 L 110 50 L 130 80 Z" fill="#8B6914" />
      <path d="M 150 90 L 200 55 L 220 85 Z" fill="#8B6914" />
      {/* Reflection in water (dark turquoise) */}
      <rect y="130" width="240" height="110" fill="#22D3EE" />
      <path d="M 0 130 Q 60 126 120 130 Q 180 134 240 130 L 240 142 Q 180 140 120 142 Q 60 144 0 142 Z" fill="#0E8C6B" />
      {/* Mountain reflection (mirrored, faded) */}
      <g opacity="0.4" transform="translate(0 260) scale(1 -1)">
        <path d="M 0 120 L 40 60 L 80 100 L 110 50 L 150 90 L 200 55 L 240 100 L 240 130 L 0 130 Z" fill="#A8826B" />
      </g>

      {/* Kayak in the water */}
      <g transform="translate(120 180)">
        {/* Boat body */}
        <path d="M -28 0 Q -22 8 0 8 Q 22 8 28 0 L 24 -3 Q 0 -1 -24 -3 Z" fill="#FFFCEF" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        {/* Kayaker */}
        <ellipse cx="0" cy="-3" rx="6" ry="8" fill="#CE1126" stroke={STROKE} strokeWidth="1.5" />
        <circle cx="0" cy="-12" r="4" fill="#FCD7AB" stroke={STROKE} strokeWidth="1.2" />
        {/* Helmet */}
        <path d="M -4 -14 L 4 -14 L 3 -16 L -3 -16 Z" fill="#FCD34D" stroke={STROKE} strokeWidth="1" />
        {/* Paddle */}
        <line x1="-15" y1="-8" x2="15" y2="2" stroke="#5C4510" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="-16" cy="-8" rx="4" ry="2" fill="#5C4510" stroke={STROKE} strokeWidth="1" />
        <ellipse cx="16" cy="2" rx="4" ry="2" fill="#5C4510" stroke={STROKE} strokeWidth="1" />
      </g>

      {/* Ripples around the kayak */}
      <g stroke="#0E8C6B" strokeWidth="1" fill="none" opacity="0.6">
        <path d="M 80 195 Q 100 192 120 195" />
        <path d="M 120 200 Q 140 197 160 200" />
        <path d="M 100 215 Q 120 212 140 215" />
      </g>
    </svg>
  );
}

/* Dubai skyline — full panorama with notable landmarks */
function DubaiSkylineSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky gradient */}
      <rect width="240" height="80" fill="#67E8F9" opacity="0.5" />
      {/* Sun */}
      <circle cx="40" cy="50" r="16" fill="#F97316" stroke={STROKE} strokeWidth={STROKE_W} />
      <circle cx="40" cy="50" r="28" fill="#F97316" opacity="0.25" />

      {/* Far back haze */}
      <rect y="160" width="240" height="80" fill="#A8B8C8" opacity="0.3" />

      {/* Burj Al Arab (left, sail-shaped) */}
      <path
        d="M 50 200 Q 45 140 55 90 Q 60 70 65 60 Q 70 70 70 100 Q 75 150 75 200 Z"
        fill="white"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Burj Al Arab structure lines */}
      <g stroke="#A8B8C8" strokeWidth="0.6" fill="none">
        <line x1="55" y1="100" x2="73" y2="100" />
        <line x1="52" y1="140" x2="74" y2="140" />
        <line x1="50" y1="180" x2="75" y2="180" />
      </g>

      {/* Mid skyline (assorted modern towers) */}
      <g fill="#A8B8C8" stroke={STROKE} strokeWidth="1.2">
        <rect x="90" y="120" width="14" height="80" />
        <rect x="106" y="100" width="10" height="100" />
        <rect x="118" y="130" width="14" height="70" />
      </g>

      {/* BURJ KHALIFA (center, tall stepped tower) */}
      <path
        d="M 145 200 L 145 175 L 148 175 L 148 150 L 151 150 L 151 120 L 154 120 L 154 90 L 158 90 L 158 60 L 161 60 L 161 30 L 165 30 L 165 60 L 168 60 L 168 90 L 172 90 L 172 120 L 175 120 L 175 150 L 178 150 L 178 175 L 181 175 L 181 200 Z"
        fill="#A8B8C8"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      <line x1="163" y1="30" x2="163" y2="15" stroke={STROKE} strokeWidth="2" />
      <circle cx="163" cy="13" r="2" fill="#D4AF37" stroke={STROKE} strokeWidth="1" />

      {/* Right side mid towers */}
      <g fill="#A8B8C8" stroke={STROKE} strokeWidth="1.2">
        <rect x="190" y="115" width="12" height="85" />
        <rect x="204" y="135" width="10" height="65" />
        <rect x="216" y="100" width="12" height="100" />
      </g>

      {/* Water in foreground */}
      <rect y="200" width="240" height="40" fill="#5AAFE6" />
      <path d="M 0 200 Q 60 196 120 200 Q 180 204 240 200 L 240 210 Q 180 208 120 210 Q 60 212 0 210 Z" fill="#3F8AB8" />

      {/* Tiny dhow on the water */}
      <g transform="translate(110 215)">
        <path d="M -10 0 Q -7 4 0 4 Q 7 4 10 0 L 8 -2 Q 0 -1 -8 -2 Z" fill="#5C4510" stroke={STROKE} strokeWidth="1" />
        <line x1="0" y1="-2" x2="0" y2="-12" stroke="#5C4510" strokeWidth="1" />
        <path d="M 0 -12 L 8 -2 L 0 -2 Z" fill="white" stroke={STROKE} strokeWidth="1" />
      </g>
    </svg>
  );
}

/* ===================================================================
   SHARJAH step stickers
   =================================================================== */

/* Sharjah map — emirate outline with both coasts highlighted */
function SharjahMapSticker() {
  return (
    <div
      style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
      dangerouslySetInnerHTML={{ __html: USER_STICKER_SVGS['sharjah-map'] ?? "" }}
    />
  );
}

/* Two seas map — explicitly shows the Arabian Gulf + Gulf of Oman split */
function TwoSeasMapSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#FCD7AB" opacity="0.4" />
      {/* Land mass (UAE) — central */}
      <path
        d="M 50 70 Q 90 50 140 70 L 175 90 Q 195 100 200 130 Q 200 160 175 175 Q 140 195 90 185 Q 60 175 45 145 Q 35 105 50 70 Z"
        fill="#E8C879"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Sharjah highlight (purple stripe across) */}
      <path
        d="M 60 110 L 195 110 L 195 130 L 60 130 Z"
        fill="#8B5CF6"
        opacity="0.55"
        stroke={STROKE}
        strokeWidth="1.5"
      />
      {/* Arabian Gulf (left) — wave overlay outside the land */}
      <path d="M 0 120 Q 25 116 45 120 L 45 140 Q 25 144 0 140 Z" fill="#5AAFE6" />
      <g stroke="#3F8AB8" strokeWidth="1" fill="none" opacity="0.6">
        <path d="M 0 100 Q 15 96 30 100" />
        <path d="M 0 160 Q 15 156 30 160" />
      </g>
      {/* Gulf of Oman (right) */}
      <path d="M 195 120 Q 215 116 240 120 L 240 140 Q 215 144 195 140 Z" fill="#22D3EE" />
      <g stroke="#0E8C6B" strokeWidth="1" fill="none" opacity="0.6">
        <path d="M 210 100 Q 225 96 240 100" />
        <path d="M 210 160 Q 225 156 240 160" />
      </g>
      {/* Connecting arrows showing both coasts touch Sharjah */}
      <path d="M 30 130 L 55 130" stroke="#1A1A2E" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
      <path d="M 210 130 L 195 130" stroke="#1A1A2E" strokeWidth="2" fill="none" />
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="#1A1A2E" />
        </marker>
      </defs>
      {/* Labels */}
      <g fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#1A1A2E">

</g>
    </svg>
  );
}

/* Sharjah Museum of Islamic Civilization — golden dome + waterfront */
function SharjahMuseumSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#E6F3FA" opacity="0.4" />
      {/* Sun */}
      <circle cx="200" cy="55" r="12" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} opacity="0.85" />
      {/* Building base — wide rectangular */}
      <rect x="30" y="135" width="180" height="65" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Wing extensions */}
      <rect x="10" y="155" width="20" height="45" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      <rect x="210" y="155" width="20" height="45" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Golden dome with geometric pattern */}
      <path
        d="M 70 140 Q 70 70 120 55 Q 170 70 170 140 Z"
        fill="#D4AF37"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Geometric pattern lines on dome */}
      <g stroke="#B8862E" strokeWidth="1" fill="none">
        <path d="M 80 130 Q 120 80 160 130" />
        <path d="M 90 110 Q 120 90 150 110" />
        <line x1="120" y1="55" x2="120" y2="135" />
      </g>
      {/* Spire */}
      <line x1="120" y1="55" x2="120" y2="35" stroke={STROKE} strokeWidth="2.5" />
      <circle cx="120" cy="33" r="3" fill="#FCD34D" stroke={STROKE} strokeWidth="1" />

      {/* Decorative arched entrance */}
      <path d="M 100 200 L 100 165 Q 100 150 120 150 Q 140 150 140 165 L 140 200 Z" fill="#1A1A2E" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Side window arches */}
      <g fill="#3B82F6" opacity="0.45" stroke={STROKE} strokeWidth="1">
        <path d="M 50 195 L 50 175 Q 50 165 60 165 Q 70 165 70 175 L 70 195 Z" />
        <path d="M 80 195 L 80 175 Q 80 165 90 165 Q 100 165 100 175 L 100 195 Z" />
        <path d="M 140 195 L 140 175 Q 140 165 150 165 Q 160 165 160 175 L 160 195 Z" />
        <path d="M 170 195 L 170 175 Q 170 165 180 165 Q 190 165 190 175 L 190 195 Z" />
      </g>

      {/* Waterfront strip */}
      <rect y="200" width="240" height="40" fill="#5AAFE6" />
      <path d="M 0 200 Q 60 197 120 200 Q 180 203 240 200 L 240 210 Q 180 208 120 210 Q 60 212 0 210 Z" fill="#3F8AB8" />
      {/* Reflection */}
      <path d="M 110 215 L 130 215 Q 125 230 120 230 Q 115 230 110 215 Z" fill="#D4AF37" opacity="0.4" />
    </svg>
  );
}

/* Mleiha tools — ancient stone tools on a museum display */
function MleihaToolsSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#FCD7AB" opacity="0.4" />
      {/* Display platform */}
      <rect x="30" y="170" width="180" height="50" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} />
      <rect x="30" y="170" width="180" height="6" fill="#5C4510" />
      {/* Glass case (subtle outline) */}
      <rect x="30" y="60" width="180" height="115" fill="none" stroke="#A8B8C8" strokeWidth="1.5" opacity="0.5" />
      {/* Glass shine */}
      <line x1="40" y1="60" x2="55" y2="100" stroke="white" strokeWidth="1" opacity="0.8" />

      {/* Three stone tools on display */}
      {/* Hand axe (center, biggest) */}
      <path
        d="M 100 150 Q 90 100 120 80 Q 150 100 140 150 Q 130 165 110 165 Z"
        fill="#9CA3AF"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Chip marks */}
      <g stroke="#5C4510" strokeWidth="0.6" fill="none" opacity="0.5">
        <path d="M 105 110 L 115 100 L 110 115" />
        <path d="M 130 105 L 135 95 L 138 110" />
        <path d="M 110 130 L 120 125 L 115 138" />
      </g>

      {/* Smaller arrowhead (left) */}
      <path
        d="M 50 145 L 60 105 L 70 145 L 65 155 L 55 155 Z"
        fill="#9CA3AF"
        stroke={STROKE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Scraper tool (right) */}
      <path
        d="M 180 130 Q 175 110 195 100 Q 215 110 200 130 Q 195 145 185 145 Z"
        fill="#9CA3AF"
        stroke={STROKE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Khor Fakkan beach — beach with Hajar mountain backdrop */
function KhorFakkanBeachSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="100" fill="#FFE9A8" opacity="0.6" />
      {/* Sun */}
      <circle cx="200" cy="40" r="14" fill="#F97316" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Hajar mountains in background */}
      <path d="M 0 110 L 30 50 L 60 90 L 90 40 L 130 80 L 170 35 L 200 75 L 240 60 L 240 130 L 0 130 Z" fill="#8B6914" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Mountain shadows */}
      <path d="M 60 90 L 90 40 L 110 70 Z" fill="#5C4510" />
      <path d="M 130 80 L 170 35 L 190 70 Z" fill="#5C4510" />

      {/* Sea (turquoise — Gulf of Oman) */}
      <rect y="130" width="240" height="80" fill="#22D3EE" />
      <path d="M 0 130 Q 60 126 120 130 Q 180 134 240 130 L 240 142 Q 180 140 120 142 Q 60 144 0 142 Z" fill="#0E8C6B" />
      <g stroke="#0E8C6B" strokeWidth="1.2" fill="none" opacity="0.6">
        <path d="M 20 175 Q 40 172 60 175" />
        <path d="M 100 195 Q 120 192 140 195" />
        <path d="M 180 175 Q 200 172 220 175" />
      </g>

      {/* Sandy beach foreground */}
      <path d="M 0 210 Q 60 205 120 210 Q 180 215 240 210 L 240 240 L 0 240 Z" fill="#FCD7AB" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Two palm trees on the beach */}
      <g transform="translate(40 215)">
        <line x1="0" y1="0" x2="0" y2="-30" stroke="#5C4510" strokeWidth="3" strokeLinecap="round" />
        <path d="M 0 -30 Q -12 -32 -16 -25 M 0 -30 Q 12 -32 16 -25 M 0 -30 Q -10 -42 -14 -45 M 0 -30 Q 10 -42 14 -45" stroke="#16A34A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
      <g transform="translate(200 215)">
        <line x1="0" y1="0" x2="0" y2="-26" stroke="#5C4510" strokeWidth="3" strokeLinecap="round" />
        <path d="M 0 -26 Q -10 -28 -14 -22 M 0 -26 Q 10 -28 14 -22 M 0 -26 Q -8 -38 -12 -41 M 0 -26 Q 8 -38 12 -41" stroke="#16A34A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>

      {/* Beach umbrella */}
      <g transform="translate(120 220)">
        <line x1="0" y1="0" x2="0" y2="-18" stroke={STROKE} strokeWidth="1.8" />
        <path d="M -16 -18 Q 0 -28 16 -18 Z" fill="#CE1126" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/* Khor Fakkan Amphitheater — modern outdoor amphitheater carved into the rock */
function KhorFakkanAmphitheaterSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#E6F3FA" opacity="0.4" />
      {/* Sky */}
      <rect width="240" height="80" fill="#FFE9A8" opacity="0.5" />
      {/* Mountain backdrop */}
      <path d="M 0 130 L 60 60 L 120 90 L 180 50 L 240 100 L 240 240 L 0 240 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Mountain shadows */}
      <path d="M 60 60 L 120 90 L 90 100 Z" fill="#5C4510" opacity="0.5" />

      {/* Amphitheater steps — concentric arcs */}
      <g fill="#FCD7AB" stroke={STROKE} strokeWidth={STROKE_W}>
        <path d="M 30 230 Q 30 200 120 195 Q 210 200 210 230 L 30 230 Z" />
        <path d="M 50 220 Q 50 195 120 190 Q 190 195 190 220 L 50 220 Z" fill="#E8C879" />
        <path d="M 65 210 Q 65 190 120 187 Q 175 190 175 210 L 65 210 Z" fill="#D4AF37" />
        <path d="M 80 200 Q 80 184 120 182 Q 160 184 160 200 L 80 200 Z" fill="#B8862E" />
      </g>

      {/* Stage in the middle */}
      <ellipse cx="120" cy="180" rx="32" ry="8" fill="#1A1A2E" stroke={STROKE} strokeWidth="1.5" />
      {/* Spotlights */}
      <g stroke="#FCD34D" strokeWidth="1" fill="none" opacity="0.7">
        <path d="M 80 130 L 110 175" />
        <path d="M 160 130 L 130 175" />
      </g>
      {/* Tiny audience figures (dots on the seats) */}
      <g fill="#1A1A2E">
        <circle cx="60" cy="218" r="2" />
        <circle cx="80" cy="218" r="2" />
        <circle cx="100" cy="218" r="2" />
        <circle cx="140" cy="218" r="2" />
        <circle cx="160" cy="218" r="2" />
        <circle cx="180" cy="218" r="2" />
        <circle cx="70" cy="208" r="2" />
        <circle cx="120" cy="208" r="2" />
        <circle cx="170" cy="208" r="2" />
      </g>
    </svg>
  );
}

/* Sharjah book — open book referencing book capital status */
function SharjahBookSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#FCD7AB" opacity="0.4" />
      {/* Open book — two pages */}
      {/* Spine */}
      <line x1="120" y1="60" x2="120" y2="195" stroke={STROKE} strokeWidth="3" />
      {/* Left page */}
      <path
        d="M 30 80 Q 30 65 50 65 L 120 60 L 120 195 L 50 200 Q 30 205 30 195 Z"
        fill="white"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Right page */}
      <path
        d="M 210 80 Q 210 65 190 65 L 120 60 L 120 195 L 190 200 Q 210 205 210 195 Z"
        fill="white"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Lines of text on left page */}
      <g stroke="#1A1A2E" strokeWidth="1" opacity="0.6">
        <line x1="45" y1="85" x2="115" y2="83" />
        <line x1="45" y1="95" x2="110" y2="93" />
        <line x1="45" y1="105" x2="115" y2="103" />
        <line x1="45" y1="115" x2="105" y2="113" />
        <line x1="45" y1="125" x2="115" y2="123" />
        <line x1="45" y1="135" x2="100" y2="133" />
        <line x1="45" y1="155" x2="115" y2="153" />
        <line x1="45" y1="165" x2="110" y2="163" />
      </g>
      {/* Arabic-style text on right page (RTL squiggles) */}
      <g stroke="#B8862E" strokeWidth="1.2" opacity="0.7" fill="none">
        <path d="M 195 85 Q 175 88 145 85" />
        <path d="M 195 95 Q 175 98 150 95" />
        <path d="M 195 105 Q 175 108 145 105" />
        <path d="M 195 115 Q 175 118 155 115" />
        <path d="M 195 125 Q 175 128 145 125" />
        <path d="M 195 135 Q 175 138 150 135" />
        <path d="M 195 155 Q 175 158 145 155" />
        <path d="M 195 165 Q 175 168 155 165" />
      </g>
      {/* Ornamental gold "Aleph" letter at top-right */}
{/* Decorative ribbon bookmark */}
      <path d="M 130 60 L 130 220 L 137 215 L 144 220 L 144 60 Z" fill="#CE1126" stroke={STROKE} strokeWidth="1.5" />
      {/* Floating mini books in background */}
      <g transform="translate(40 35) rotate(-15)">
        <rect x="0" y="0" width="14" height="20" fill="#3B82F6" stroke={STROKE} strokeWidth="1" />
        <line x1="3" y1="0" x2="3" y2="20" stroke="#1A1A2E" strokeWidth="0.8" />
      </g>
      <g transform="translate(190 30) rotate(20)">
        <rect x="0" y="0" width="14" height="20" fill="#16A34A" stroke={STROKE} strokeWidth="1" />
        <line x1="3" y1="0" x2="3" y2="20" stroke="#1A1A2E" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

/* Algebra scroll — Islamic math heritage */
function AlgebraScrollSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#FCD7AB" opacity="0.4" />
      {/* Scroll body — long horizontal parchment, slight curl at edges */}
      <path
        d="M 30 80 Q 25 90 30 100 L 30 175 Q 25 185 30 195 L 210 195 Q 215 185 210 175 L 210 100 Q 215 90 210 80 Z"
        fill="#FFFCEF"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Top scroll roll */}
      <ellipse cx="30" cy="138" rx="6" ry="58" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx="210" cy="138" rx="6" ry="58" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Equation written on the scroll */}
      <g fontFamily="serif" fill="#1A1A2E">

</g>
      {/* Decorative arabesque corners */}
      <g fill="none" stroke="#D4AF37" strokeWidth="1.5">
        <path d="M 45 90 Q 55 95 50 105" />
        <path d="M 195 90 Q 185 95 190 105" />
        <path d="M 45 185 Q 55 180 50 170" />
        <path d="M 195 185 Q 185 180 190 170" />
      </g>
      {/* Tiny abacus / counting beads at the bottom */}
      <g transform="translate(120 215)">
        <line x1="-30" y1="0" x2="30" y2="0" stroke={STROKE} strokeWidth="1.5" />
        <circle cx="-22" cy="0" r="3" fill="#CE1126" stroke={STROKE} strokeWidth="0.8" />
        <circle cx="-12" cy="0" r="3" fill="#FCD34D" stroke={STROKE} strokeWidth="0.8" />
        <circle cx="-2" cy="0" r="3" fill="#16A34A" stroke={STROKE} strokeWidth="0.8" />
        <circle cx="8" cy="0" r="3" fill="#3B82F6" stroke={STROKE} strokeWidth="0.8" />
        <circle cx="18" cy="0" r="3" fill="#8B5CF6" stroke={STROKE} strokeWidth="0.8" />
      </g>
    </svg>
  );
}

/* Cultural Square — Al Qasba waterfront with the Eye of the Emirates ferris wheel */
function CulturalSquareSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#E6F3FA" opacity="0.4" />
      {/* Sun */}
      <circle cx="40" cy="40" r="12" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} opacity="0.85" />

      {/* Ferris wheel — center attraction */}
      <g transform="translate(120 100)">
        {/* Wheel rim */}
        <circle cx="0" cy="0" r="55" fill="none" stroke={STROKE} strokeWidth="3" />
        <circle cx="0" cy="0" r="45" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
        {/* Spokes */}
        {[0, 30, 60, 90, 120, 150].map((deg) => {
          const r = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={Math.cos(r) * -55}
              y1={Math.sin(r) * -55}
              x2={Math.cos(r) * 55}
              y2={Math.sin(r) * 55}
              stroke={STROKE}
              strokeWidth="1.2"
            />
          );
        })}
        {/* Hub */}
        <circle cx="0" cy="0" r="6" fill="#D4AF37" stroke={STROKE} strokeWidth="1.5" />
        {/* Cabins (8 around the rim) */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const r = (deg * Math.PI) / 180;
          const x = Math.cos(r) * 55;
          const y = Math.sin(r) * 55;
          const colors = ["#CE1126", "#FCD34D", "#3B82F6", "#16A34A", "#F8B4C8", "#F97316", "#8B5CF6", "#22D3EE"];
          const color = colors[deg / 45];
          return (
            <g key={deg} transform={`translate(${x} ${y})`}>
              <rect x="-5" y="-3" width="10" height="6" rx="2" fill={color} stroke={STROKE} strokeWidth="1" />
            </g>
          );
        })}
      </g>

      {/* Ground / waterfront */}
      <rect y="160" width="240" height="80" fill="#5AAFE6" />
      {/* Wave */}
      <path d="M 0 160 Q 60 156 120 160 Q 180 164 240 160 L 240 172 Q 180 170 120 172 Q 60 174 0 172 Z" fill="#3F8AB8" />
      {/* Tower base for ferris wheel */}
      <path d="M 110 155 L 130 155 L 135 220 L 105 220 Z" fill="#A8B8C8" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Family silhouette walking */}
      <g transform="translate(50 200)">
        <circle cx="0" cy="-10" r="3" fill="#1A1A2E" />
        <rect x="-3" y="-7" width="6" height="10" fill="#1A1A2E" />
        <line x1="-2" y1="3" x2="-3" y2="10" stroke="#1A1A2E" strokeWidth="1.5" />
        <line x1="2" y1="3" x2="3" y2="10" stroke="#1A1A2E" strokeWidth="1.5" />
      </g>
      <g transform="translate(60 200)">
        <circle cx="0" cy="-8" r="2.5" fill="#1A1A2E" />
        <rect x="-2.5" y="-6" width="5" height="8" fill="#1A1A2E" />
        <line x1="-1.5" y1="2" x2="-2" y2="8" stroke="#1A1A2E" strokeWidth="1.2" />
        <line x1="1.5" y1="2" x2="2" y2="8" stroke="#1A1A2E" strokeWidth="1.2" />
      </g>
      {/* Boat in water */}
      <g transform="translate(195 195)">
        <path d="M -12 0 Q -8 6 0 6 Q 8 6 12 0 Z" fill="#5C4510" stroke={STROKE} strokeWidth="1" />
        <line x1="0" y1="0" x2="0" y2="-10" stroke="#5C4510" strokeWidth="1" />
        <path d="M 0 -10 L 8 0 L 0 0 Z" fill="white" stroke={STROKE} strokeWidth="1" />
      </g>
    </svg>
  );
}

/* Hajar Mountains — craggy peak silhouette */
function HajarMountainsSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky gradient */}
      <rect width="240" height="100" fill="#67E8F9" opacity="0.4" />
      {/* Sun */}
      <circle cx="50" cy="50" r="14" fill="#F97316" stroke={STROKE} strokeWidth={STROKE_W} />
      <circle cx="50" cy="50" r="22" fill="#F97316" opacity="0.25" />

      {/* Far back range (lighter) */}
      <path d="M 0 150 L 30 100 L 70 130 L 110 80 L 150 120 L 200 70 L 240 110 L 240 240 L 0 240 Z" fill="#A8826B" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Mid range */}
      <path d="M 0 180 L 50 120 L 100 160 L 140 110 L 180 145 L 210 110 L 240 145 L 240 240 L 0 240 Z" fill="#8B6914" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Front range (darkest) */}
      <path d="M 0 220 L 40 170 L 80 200 L 120 150 L 160 195 L 200 165 L 240 200 L 240 240 L 0 240 Z" fill="#5C4510" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />

      {/* Shadow lines on mid range */}
      <g fill="#5C4510" opacity="0.5">
        <path d="M 100 160 L 140 110 L 130 130 Z" />
        <path d="M 180 145 L 210 110 L 200 135 Z" />
      </g>

      {/* Wadi (dry valley) cutting through the front */}
      <path d="M 95 200 Q 105 215 115 230" stroke="#FCD7AB" strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* Eagle silhouette flying overhead */}
      <g transform="translate(170 60)">
        <path d="M -10 0 Q -5 -3 0 -1 Q 5 -3 10 0 Q 5 2 0 1 Q -5 2 -10 0 Z" fill="#1A1A2E" />
      </g>
      <g transform="translate(50 90)">
        <path d="M -6 0 Q -3 -2 0 -1 Q 3 -2 6 0 Q 3 1 0 0.5 Q -3 1 -6 0 Z" fill="#1A1A2E" opacity="0.6" />
      </g>
    </svg>
  );
}

/* ===================================================================
   AJMAN step stickers
   =================================================================== */

/* Ajman map — small emirate outline with creek */
function AjmanMapSticker() {
  return (
    <div
      style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
      dangerouslySetInnerHTML={{ __html: USER_STICKER_SVGS['ajman-map'] ?? "" }}
    />
  );
}

/* Ajman Dhow Building Yard — workers building boats by hand */
function DhowYardSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#FFE9A8" opacity="0.5" />
      {/* Sun */}
      <circle cx="200" cy="45" r="12" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Workshop ground */}
      <rect y="180" width="240" height="60" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Wood plank texture */}
      <g stroke="#5C4510" strokeWidth="0.6" opacity="0.5">
        <line x1="0" y1="195" x2="240" y2="195" />
        <line x1="0" y1="210" x2="240" y2="210" />
        <line x1="0" y1="225" x2="240" y2="225" />
      </g>

      {/* Half-built dhow (skeleton frame) — center */}
      {/* Hull keel */}
      <path
        d="M 50 175 Q 40 160 60 130 L 180 130 Q 200 160 190 175 Z"
        fill="#8B6914"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Skeleton ribs sticking up (still being built) */}
      <g stroke="#5C4510" strokeWidth="2.5" strokeLinecap="round">
        <line x1="60" y1="130" x2="55" y2="80" />
        <line x1="80" y1="130" x2="78" y2="70" />
        <line x1="100" y1="130" x2="100" y2="60" />
        <line x1="120" y1="130" x2="120" y2="55" />
        <line x1="140" y1="130" x2="140" y2="60" />
        <line x1="160" y1="130" x2="162" y2="70" />
        <line x1="180" y1="130" x2="185" y2="80" />
      </g>
      {/* Cross-beam (keel rib) — being installed */}
      <line x1="55" y1="80" x2="185" y2="80" stroke="#5C4510" strokeWidth="2" />
      {/* Hull plank lines */}
      <path d="M 50 145 Q 120 148 190 145" stroke="#5C4510" strokeWidth="1.5" fill="none" />
      <path d="M 48 158 Q 120 162 192 158" stroke="#5C4510" strokeWidth="1.5" fill="none" />

      {/* Worker on the left holding a tool */}
      <g transform="translate(35 165)">
        <circle cx="0" cy="-22" r="6" fill="#D4A574" stroke={STROKE} strokeWidth="1.5" />
        <rect x="-5" y="-18" width="10" height="14" fill="#FFFCEF" stroke={STROKE} strokeWidth="1.5" />
        {/* Ghutra hint */}
        <path d="M -7 -25 L 7 -25 L 5 -22 L -5 -22 Z" fill="white" stroke={STROKE} strokeWidth="1" />
        {/* Arms holding hammer */}
        <line x1="-5" y1="-12" x2="-12" y2="-6" stroke="#D4A574" strokeWidth="3" strokeLinecap="round" />
        <line x1="5" y1="-12" x2="12" y2="-6" stroke="#D4A574" strokeWidth="3" strokeLinecap="round" />
        <rect x="11" y="-10" width="3" height="8" fill="#5C4510" stroke={STROKE} strokeWidth="1" />
        {/* Legs */}
        <line x1="-2" y1="-4" x2="-3" y2="6" stroke="#FFFCEF" strokeWidth="3" strokeLinecap="round" />
        <line x1="2" y1="-4" x2="3" y2="6" stroke="#FFFCEF" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Worker on the right with planks */}
      <g transform="translate(215 165)">
        <circle cx="0" cy="-22" r="6" fill="#D4A574" stroke={STROKE} strokeWidth="1.5" />
        <rect x="-5" y="-18" width="10" height="14" fill="#FFFCEF" stroke={STROKE} strokeWidth="1.5" />
        <path d="M -7 -25 L 7 -25 L 5 -22 L -5 -22 Z" fill="white" stroke={STROKE} strokeWidth="1" />
        <line x1="-5" y1="-12" x2="-15" y2="-15" stroke="#D4A574" strokeWidth="3" strokeLinecap="round" />
        <rect x="-22" y="-18" width="14" height="4" fill="#8B6914" stroke={STROKE} strokeWidth="1" />
        <line x1="-2" y1="-4" x2="-3" y2="6" stroke="#FFFCEF" strokeWidth="3" strokeLinecap="round" />
        <line x1="2" y1="-4" x2="3" y2="6" stroke="#FFFCEF" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Pile of planks on ground */}
      <g transform="translate(140 195)">
        <rect x="-15" y="-5" width="30" height="3" fill="#8B6914" stroke={STROKE} strokeWidth="1" />
        <rect x="-15" y="-1" width="30" height="3" fill="#8B6914" stroke={STROKE} strokeWidth="1" />
        <rect x="-15" y="3" width="30" height="3" fill="#8B6914" stroke={STROKE} strokeWidth="1" />
      </g>
    </svg>
  );
}

/* Mowaihat Tomb — ancient Bronze Age circular tomb with pottery */
function MowaihatTombSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#FCD7AB" opacity="0.4" />
      {/* Background sandy ground */}
      {/* Circular tomb (top-down view) */}
      <ellipse cx="120" cy="135" rx="90" ry="60" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Inner ring of stones */}
      <ellipse cx="120" cy="135" rx="65" ry="42" fill="#5C4510" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Stone blocks around the rim */}
      <g fill="#9CA3AF" stroke={STROKE} strokeWidth="1.2">
        {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => {
          const r = (deg * Math.PI) / 180;
          const x = 120 + Math.cos(r) * 78;
          const y = 135 + Math.sin(r) * 50;
          return (
            <ellipse
              key={deg}
              cx={x}
              cy={y}
              rx="9"
              ry="6"
              transform={`rotate(${deg} ${x} ${y})`}
            />
          );
        })}
      </g>
      {/* Pot in the center */}
      <g transform="translate(120 135)">
        <ellipse cx="0" cy="0" rx="14" ry="9" fill="#D4A574" stroke={STROKE} strokeWidth={STROKE_W} />
        <path d="M -10 -2 Q -10 -14 0 -16 Q 10 -14 10 -2 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <ellipse cx="0" cy="-15" rx="10" ry="2.5" fill="#5C4510" stroke={STROKE} strokeWidth="1" />
        {/* Pottery decorative bands */}
        <path d="M -10 -8 Q 0 -6 10 -8" stroke="#5C4510" strokeWidth="1" fill="none" />
        <path d="M -8 -3 Q 0 -1 8 -3" stroke="#5C4510" strokeWidth="1" fill="none" />
      </g>
      {/* Crossed arrows pointing in (directions) */}
      <g stroke="#1A1A2E" strokeWidth="1.2" fill="none" opacity="0.55">
        <path d="M 30 90 L 50 110 M 50 110 L 45 105 M 50 110 L 45 115" />
        <path d="M 210 90 L 190 110 M 190 110 L 195 105 M 190 110 L 195 115" />
      </g>
    </svg>
  );
}

/* Ajman Corniche — long sandy beach with cabanas */
function AjmanCornicheSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="100" fill="#FFE9A8" opacity="0.6" />
      {/* Sun */}
      <circle cx="50" cy="40" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Sea (Arabian Gulf) */}
      <rect y="100" width="240" height="80" fill="#5AAFE6" />
      <g stroke="#3F8AB8" strokeWidth="1" fill="none" opacity="0.6">
        <path d="M 0 130 Q 60 126 120 130 Q 180 134 240 130" />
        <path d="M 0 155 Q 60 151 120 155 Q 180 159 240 155" />
      </g>
      {/* Distant horizon ship */}
      <g transform="translate(180 115)">
        <rect x="-8" y="-2" width="16" height="3" fill="#1A1A2E" />
        <rect x="-3" y="-7" width="6" height="5" fill="#1A1A2E" />
      </g>

      {/* Long sandy beach */}
      <path d="M 0 180 Q 60 175 120 180 Q 180 185 240 180 L 240 240 L 0 240 Z" fill="#FCD7AB" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Beach umbrellas */}
      <g transform="translate(40 200)">
        <line x1="0" y1="0" x2="0" y2="-22" stroke={STROKE} strokeWidth="1.8" />
        <path d="M -18 -22 Q 0 -32 18 -22 Z" fill="#CE1126" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="-14" y1="-22" x2="-14" y2="-23" stroke="white" strokeWidth="2" />
        <line x1="0" y1="-25" x2="0" y2="-26" stroke="white" strokeWidth="2" />
        <line x1="14" y1="-22" x2="14" y2="-23" stroke="white" strokeWidth="2" />
      </g>
      <g transform="translate(120 205)">
        <line x1="0" y1="0" x2="0" y2="-22" stroke={STROKE} strokeWidth="1.8" />
        <path d="M -18 -22 Q 0 -32 18 -22 Z" fill="#FCD34D" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
      </g>
      <g transform="translate(200 205)">
        <line x1="0" y1="0" x2="0" y2="-22" stroke={STROKE} strokeWidth="1.8" />
        <path d="M -18 -22 Q 0 -32 18 -22 Z" fill="#16A34A" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
      </g>

      {/* Family on the beach */}
      <g transform="translate(80 215)">
        <circle cx="0" cy="-8" r="3" fill="#D4A574" stroke={STROKE} strokeWidth="0.8" />
        <rect x="-3" y="-5" width="6" height="8" fill="#3B82F6" />
        <line x1="-2" y1="3" x2="-3" y2="9" stroke="#D4A574" strokeWidth="1.5" />
        <line x1="2" y1="3" x2="3" y2="9" stroke="#D4A574" strokeWidth="1.5" />
      </g>
      {/* Sandcastle */}
      <g transform="translate(160 220)">
        <rect x="-6" y="-8" width="12" height="8" fill="#E8C879" stroke={STROKE} strokeWidth="1" />
        <path d="M -6 -8 L -6 -12 L -3 -12 L -3 -8 M 0 -8 L 0 -14 L 3 -14 L 3 -8 M 6 -8 L 6 -12 L 3 -12" fill="#E8C879" stroke={STROKE} strokeWidth="1" />
      </g>
      {/* Footprints */}
      <g fill="#A8826B" opacity="0.55">
        <ellipse cx="20" cy="225" rx="3" ry="1.5" />
        <ellipse cx="35" cy="225" rx="3" ry="1.5" />
        <ellipse cx="50" cy="225" rx="3" ry="1.5" />
      </g>
    </svg>
  );
}

/* Mangrove trees — close-up of mangrove root system */
function MangroveTreesSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="120" fill="#E6F3FA" opacity="0.5" />
      {/* Sun */}
      <circle cx="200" cy="40" r="12" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Brackish water */}
      <rect y="120" width="240" height="120" fill="#0E8C6B" opacity="0.6" />
      <g stroke="#0E8C6B" strokeWidth="1" fill="none" opacity="0.7">
        <path d="M 10 145 Q 30 142 50 145" />
        <path d="M 100 175 Q 120 172 140 175" />
        <path d="M 180 200 Q 200 197 220 200" />
      </g>

      {/* Big central mangrove tree */}
      {/* Canopy (multiple green clouds) */}
      <ellipse cx="120" cy="90" rx="50" ry="32" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx="90" cy="70" rx="22" ry="18" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx="155" cy="70" rx="22" ry="18" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx="120" cy="60" rx="22" ry="18" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} opacity="0.85" />
      {/* Trunk */}
      <rect x="115" y="118" width="10" height="20" fill="#5C4510" stroke={STROKE} strokeWidth="1.5" />

      {/* The famous spider-leg roots (stilts) */}
      <g stroke="#5C4510" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M 120 138 Q 95 165 80 200" />
        <path d="M 120 138 Q 105 160 95 200" />
        <path d="M 120 138 Q 130 165 145 200" />
        <path d="M 120 138 Q 145 165 165 200" />
        <path d="M 120 138 Q 115 160 115 200" />
        <path d="M 120 138 Q 125 160 125 200" />
      </g>

      {/* Side mangroves */}
      <g transform="translate(40 130)">
        <ellipse cx="0" cy="0" rx="20" ry="15" fill="#16A34A" stroke={STROKE} strokeWidth="1.5" />
        <line x1="-2" y1="13" x2="-5" y2="30" stroke="#5C4510" strokeWidth="2" />
        <line x1="2" y1="13" x2="5" y2="30" stroke="#5C4510" strokeWidth="2" />
      </g>
      <g transform="translate(210 135)">
        <ellipse cx="0" cy="0" rx="20" ry="15" fill="#16A34A" stroke={STROKE} strokeWidth="1.5" />
        <line x1="-2" y1="13" x2="-5" y2="30" stroke="#5C4510" strokeWidth="2" />
        <line x1="2" y1="13" x2="5" y2="30" stroke="#5C4510" strokeWidth="2" />
      </g>

      {/* Tiny crab on the water */}
      <g transform="translate(180 215)">
        <ellipse cx="0" cy="0" rx="6" ry="3" fill="#F97316" stroke={STROKE} strokeWidth="1" />
        <circle cx="-2" cy="-1" r="1" fill="#1A1A2E" />
        <circle cx="2" cy="-1" r="1" fill="#1A1A2E" />
        <line x1="-7" y1="-1" x2="-9" y2="-3" stroke="#F97316" strokeWidth="1.5" />
        <line x1="7" y1="-1" x2="9" y2="-3" stroke="#F97316" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/* Bronze-Age pottery — three pieces of ancient pottery on display */
function BronzeAgePotterySticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#FCD7AB" opacity="0.4" />
      {/* Wood display table */}
      <rect x="20" y="180" width="200" height="40" fill="#8B6914" stroke={STROKE} strokeWidth={STROKE_W} />
      <rect x="20" y="180" width="200" height="6" fill="#5C4510" />

      {/* Pot 1 (left) — tall amphora */}
      <g transform="translate(60 145)">
        <path
          d="M 0 35 L -10 10 L -8 -8 Q -8 -15 0 -20 Q 8 -15 8 -8 L 10 10 L 0 35 Z"
          fill="#D4A574"
          stroke={STROKE}
          strokeWidth={STROKE_W}
          strokeLinejoin="round"
        />
        {/* Handles */}
        <path d="M -8 -8 Q -16 -5 -10 5" stroke={STROKE} strokeWidth="2" fill="none" />
        <path d="M 8 -8 Q 16 -5 10 5" stroke={STROKE} strokeWidth="2" fill="none" />
        {/* Painted bands */}
        <line x1="-8" y1="-2" x2="8" y2="-2" stroke="#5C4510" strokeWidth="1" />
        <line x1="-9" y1="6" x2="9" y2="6" stroke="#5C4510" strokeWidth="1" />
        <path d="M -8 12 L -3 16 L 3 12 L 8 16" stroke="#5C4510" strokeWidth="1" fill="none" />
      </g>

      {/* Pot 2 (center) — round bowl */}
      <g transform="translate(120 165)">
        <path
          d="M -22 0 Q -22 18 0 18 Q 22 18 22 0 L 18 -5 Q 0 -3 -18 -5 Z"
          fill="#C9A574"
          stroke={STROKE}
          strokeWidth={STROKE_W}
          strokeLinejoin="round"
        />
        {/* Decoration — zigzag pattern */}
        <path d="M -18 5 L -12 8 L -6 5 L 0 8 L 6 5 L 12 8 L 18 5" stroke="#5C4510" strokeWidth="1.2" fill="none" />
        <path d="M -16 12 L -8 14 L 0 12 L 8 14 L 16 12" stroke="#5C4510" strokeWidth="1.2" fill="none" />
      </g>

      {/* Pot 3 (right) — small jug with spout */}
      <g transform="translate(180 155)">
        <path
          d="M 0 25 L -8 5 L -6 -10 Q -6 -15 0 -16 Q 6 -15 6 -10 L 8 5 L 0 25 Z"
          fill="#E8C879"
          stroke={STROKE}
          strokeWidth={STROKE_W}
          strokeLinejoin="round"
        />
        {/* Spout */}
        <path d="M 6 -10 L 12 -14 L 9 -10 Z" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        {/* Handle on the back */}
        <path d="M -6 -8 Q -12 -2 -8 4" stroke={STROKE} strokeWidth="2" fill="none" />
        {/* Decoration */}
        <line x1="-6" y1="-2" x2="6" y2="-2" stroke="#B8862E" strokeWidth="1" />
        <circle cx="0" cy="3" r="1.5" fill="#B8862E" />
      </g>
    </svg>
  );
}

/* Pearl shell — open clam-style oyster shell with a bright pearl */
function PearlShellSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sea background */}
      <circle cx="120" cy="120" r="105" fill="#67E8F9" opacity="0.35" />
      {/* Bubbles */}
      <g fill="white" stroke={STROKE} strokeWidth="1" opacity="0.7">
        <circle cx="50" cy="80" r="3" />
        <circle cx="190" cy="60" r="4" />
        <circle cx="180" cy="100" r="2" />
      </g>

      {/* Bottom shell */}
      <path
        d="M 40 160 Q 40 200 120 205 Q 200 200 200 160 Z"
        fill="#F8B4C8"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Bottom shell ridges (radial fan) */}
      <g stroke="#D17080" strokeWidth="1.2" fill="none">
        <path d="M 50 165 Q 80 195 120 200" />
        <path d="M 70 162 Q 90 195 120 200" />
        <path d="M 90 161 Q 105 195 120 200" />
        <path d="M 120 160 Q 120 195 120 200" />
        <path d="M 150 161 Q 135 195 120 200" />
        <path d="M 170 162 Q 150 195 120 200" />
        <path d="M 190 165 Q 160 195 120 200" />
      </g>
      {/* Inner mother-of-pearl glow */}
      <ellipse cx="120" cy="178" rx="60" ry="20" fill="#FFE9F4" opacity="0.7" />

      {/* Top shell (hinged open) */}
      <path
        d="M 40 160 Q 40 90 120 75 Q 200 90 200 160 Z"
        fill="#F8B4C8"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Top shell ridges */}
      <g stroke="#D17080" strokeWidth="1.2" fill="none">
        <path d="M 50 155 Q 80 100 120 85" />
        <path d="M 70 156 Q 90 105 120 90" />
        <path d="M 90 158 Q 105 110 120 95" />
        <path d="M 120 158 Q 120 100 120 80" />
        <path d="M 150 158 Q 135 110 120 95" />
        <path d="M 170 156 Q 150 105 120 90" />
        <path d="M 190 155 Q 160 100 120 85" />
      </g>
      {/* Inner top glow */}
      <ellipse cx="120" cy="135" rx="65" ry="35" fill="#FFE9F4" opacity="0.65" />

      {/* The PEARL — large, bright, centered */}
      <circle cx="120" cy="155" r="26" fill="#FFFCEF" stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx="112" cy="146" rx="9" ry="7" fill="white" opacity="0.9" />
      <circle cx="130" cy="165" r="3" fill="#F8B4C8" opacity="0.6" />
      {/* Sparkle */}
      <g fill="#D4AF37" stroke={STROKE} strokeWidth="0.6">
        <path d="M 95 130 L 97 134 L 101 135 L 97 136 L 95 140 L 93 136 L 89 135 L 93 134 Z" />
      </g>
    </svg>
  );
}

/* Coral-stone wall — close-up of coral-stone block construction (Ajman heritage) */
function CoralStoneWallSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#FCD7AB" opacity="0.4" />
      {/* Wall — irregular coral-stone blocks */}
      <rect x="30" y="50" width="180" height="170" fill="#C9A574" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Individual stone block lines (irregular) */}
      <g stroke="#8B6914" strokeWidth="1.5" fill="none">
        {/* Horizontal courses */}
        <line x1="30" y1="80" x2="210" y2="80" />
        <line x1="30" y1="115" x2="210" y2="115" />
        <line x1="30" y1="150" x2="210" y2="150" />
        <line x1="30" y1="185" x2="210" y2="185" />
        {/* Vertical joints (offset like real masonry) */}
        <line x1="65" y1="50" x2="65" y2="80" />
        <line x1="105" y1="50" x2="105" y2="80" />
        <line x1="155" y1="50" x2="155" y2="80" />
        <line x1="80" y1="80" x2="80" y2="115" />
        <line x1="135" y1="80" x2="135" y2="115" />
        <line x1="180" y1="80" x2="180" y2="115" />
        <line x1="60" y1="115" x2="60" y2="150" />
        <line x1="115" y1="115" x2="115" y2="150" />
        <line x1="170" y1="115" x2="170" y2="150" />
        <line x1="85" y1="150" x2="85" y2="185" />
        <line x1="140" y1="150" x2="140" y2="185" />
        <line x1="190" y1="150" x2="190" y2="185" />
        <line x1="55" y1="185" x2="55" y2="220" />
        <line x1="120" y1="185" x2="120" y2="220" />
        <line x1="170" y1="185" x2="170" y2="220" />
      </g>
      {/* Coral texture spots within blocks */}
      <g fill="#A8826B" opacity="0.6">
        <circle cx="50" cy="65" r="1.5" />
        <circle cx="90" cy="98" r="2" />
        <circle cx="160" cy="67" r="1.8" />
        <circle cx="180" cy="100" r="1.5" />
        <circle cx="100" cy="135" r="2" />
        <circle cx="155" cy="170" r="1.8" />
        <circle cx="65" cy="200" r="1.5" />
      </g>
      {/* Small arrow window cut into the wall */}
      <path d="M 115 110 L 125 110 L 125 90 L 122 88 L 118 88 L 115 90 Z" fill="#1A1A2E" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Annotation arrow + label */}
      <g transform="translate(195 60)">
        <line x1="-15" y1="0" x2="-30" y2="-25" stroke={STROKE} strokeWidth="1.5" />
        <rect x="-12" y="-10" width="48" height="20" rx="4" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
</g>
    </svg>
  );
}

/* Fisherman with traditional cast net */
function FishermanNetSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="100" fill="#FFE9A8" opacity="0.6" />
      {/* Sun */}
      <circle cx="50" cy="40" r="14" fill="#F97316" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Sea */}
      <rect y="100" width="240" height="140" fill="#5AAFE6" />
      <g stroke="#3F8AB8" strokeWidth="1" fill="none" opacity="0.6">
        <path d="M 0 130 Q 30 126 60 130" />
        <path d="M 180 150 Q 210 146 240 150" />
        <path d="M 0 200 Q 30 196 60 200" />
        <path d="M 180 220 Q 210 216 240 220" />
      </g>

      {/* Fisherman (right) standing on a small boat */}
      <g transform="translate(170 130)">
        {/* Boat */}
        <path d="M -22 50 Q -16 60 0 60 Q 16 60 22 50 Z" fill="#5C4510" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Body */}
        <rect x="-7" y="20" width="14" height="30" fill="#FFFCEF" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Head */}
        <circle cx="0" cy="14" r="7" fill="#D4A574" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Ghutra */}
        <path d="M -8 9 Q -10 4 -2 2 L 2 2 Q 10 4 8 9 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Beard hint */}
        <path d="M -3 18 Q 0 22 3 18" stroke={STROKE} strokeWidth="1" fill="none" />
        {/* Arm throwing the net */}
        <line x1="-5" y1="25" x2="-25" y2="10" stroke="#D4A574" strokeWidth="4" strokeLinecap="round" />
        <line x1="-5" y1="25" x2="-25" y2="10" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
        {/* Other arm */}
        <line x1="5" y1="25" x2="15" y2="40" stroke="#D4A574" strokeWidth="4" strokeLinecap="round" />
        <line x1="5" y1="25" x2="15" y2="40" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Cast net spreading wide in the air */}
      <g transform="translate(120 130)">
        {/* Net circle outline */}
        <ellipse cx="0" cy="20" rx="60" ry="24" fill="none" stroke="#5C4510" strokeWidth="1.8" />
        {/* Net mesh (radiating lines) */}
        <g stroke="#5C4510" strokeWidth="0.8" fill="none">
          <line x1="0" y1="-4" x2="-58" y2="20" />
          <line x1="0" y1="-4" x2="-30" y2="22" />
          <line x1="0" y1="-4" x2="0" y2="44" />
          <line x1="0" y1="-4" x2="30" y2="22" />
          <line x1="0" y1="-4" x2="58" y2="20" />
          {/* Cross-rings (mesh) */}
          <ellipse cx="0" cy="2" rx="20" ry="8" />
          <ellipse cx="0" cy="10" rx="40" ry="16" />
        </g>
        {/* Top knot of the net */}
        <circle cx="0" cy="-4" r="3" fill="#5C4510" />
        {/* Weights at the bottom rim */}
        <g fill="#1A1A2E">
          <circle cx="-50" cy="40" r="2" />
          <circle cx="-25" cy="44" r="2" />
          <circle cx="0" cy="44" r="2" />
          <circle cx="25" cy="44" r="2" />
          <circle cx="50" cy="40" r="2" />
        </g>
      </g>

      {/* Tiny fish jumping below the net */}
      <g transform="translate(80 195)">
        <path d="M 0 0 Q -3 -3 0 -6 Q 3 -3 0 0 L -6 0 Z" fill="#3B82F6" stroke={STROKE} strokeWidth="0.8" />
      </g>
      <g transform="translate(140 200)">
        <path d="M 0 0 Q -3 -3 0 -6 Q 3 -3 0 0 L -6 0 Z" fill="#3B82F6" stroke={STROKE} strokeWidth="0.8" />
      </g>
    </svg>
  );
}

/* Ajman skyline — small but proud waterfront */
function AjmanSkylineSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="120" fill="#FFE9A8" opacity="0.6" />
      {/* Sun */}
      <circle cx="40" cy="50" r="14" fill="#F97316" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Sea (Arabian Gulf) */}
      <rect y="160" width="240" height="80" fill="#5AAFE6" />
      <path d="M 0 160 Q 60 156 120 160 Q 180 164 240 160 L 240 172 Q 180 170 120 172 Q 60 174 0 172 Z" fill="#3F8AB8" />

      {/* Modest skyline (mid-height towers) */}
      <g fill="#A8B8C8" stroke={STROKE} strokeWidth="1.5">
        <rect x="40" y="120" width="20" height="40" />
        <rect x="62" y="100" width="14" height="60" />
        <rect x="78" y="115" width="18" height="45" />
        <rect x="98" y="90" width="12" height="70" />
        <rect x="112" y="105" width="16" height="55" />
        <rect x="130" y="80" width="20" height="80" />
        <rect x="152" y="100" width="14" height="60" />
        <rect x="168" y="115" width="18" height="45" />
        <rect x="188" y="125" width="14" height="35" />
        <rect x="204" y="110" width="16" height="50" />
      </g>

      {/* Tiny mosque in the middle */}
      <g transform="translate(140 105)">
        <rect x="-10" y="0" width="20" height="20" fill="white" stroke={STROKE} strokeWidth="1.2" />
        <path d="M -10 0 Q -10 -10 0 -12 Q 10 -10 10 0 Z" fill="white" stroke={STROKE} strokeWidth="1.2" strokeLinejoin="round" />
        <line x1="0" y1="-12" x2="0" y2="-18" stroke={STROKE} strokeWidth="1.2" />
        <circle cx="0" cy="-19" r="1.5" fill="#D4AF37" />
      </g>
      {/* Side small dhow on water */}
      <g transform="translate(200 180)">
        <path d="M -10 0 Q -7 4 0 4 Q 7 4 10 0 Z" fill="#5C4510" stroke={STROKE} strokeWidth="1" />
        <line x1="0" y1="0" x2="0" y2="-10" stroke="#5C4510" strokeWidth="1" />
        <path d="M 0 -10 L 8 0 L 0 0 Z" fill="white" stroke={STROKE} strokeWidth="1" />
      </g>

      {/* Beach in the very front */}
      <path d="M 0 220 Q 60 215 120 220 Q 180 225 240 220 L 240 240 L 0 240 Z" fill="#FCD7AB" stroke={STROKE} strokeWidth={STROKE_W} />
    </svg>
  );
}

/* ===================================================================
   UMM AL QUWAIN step stickers
   =================================================================== */

/* UAQ map — long peninsula with surrounding lagoons */
function UaqMapSticker() {
  return (
    <div
      style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
      dangerouslySetInnerHTML={{ __html: USER_STICKER_SVGS['uaq-map'] ?? "" }}
    />
  );
}

/* Al Sinniyah Island — flat sandy island with cormorants colony */
function AlSinniyahIslandSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="120" fill="#E6F3FA" opacity="0.5" />
      {/* Sun */}
      <circle cx="50" cy="40" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Sea */}
      <rect y="120" width="240" height="120" fill="#5AAFE6" />
      <g stroke="#3F8AB8" strokeWidth="1" fill="none" opacity="0.6">
        <path d="M 0 145 Q 30 142 60 145" />
        <path d="M 180 175 Q 200 172 220 175" />
        <path d="M 80 215 Q 110 212 140 215" />
      </g>

      {/* Long flat island */}
      <ellipse cx="120" cy="170" rx="100" ry="30" fill="#FCD7AB" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Sparse vegetation */}
      <g fill="#16A34A" stroke={STROKE} strokeWidth="1">
        <ellipse cx="60" cy="160" rx="6" ry="4" />
        <ellipse cx="100" cy="155" rx="7" ry="5" />
        <ellipse cx="180" cy="160" rx="6" ry="4" />
      </g>

      {/* MANY cormorants — colony of small black birds */}
      <g fill="#1A1A2E">
        {/* Standing birds (arranged in clusters) */}
        {[
          [55, 165, 0], [65, 162, 0], [75, 168, 0], [80, 160, 0],
          [95, 162, 0], [105, 160, 0], [115, 168, 0], [125, 158, 0],
          [140, 160, 0], [150, 162, 0], [160, 165, 0], [170, 158, 0],
          [180, 165, 0],
        ].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <ellipse cx="0" cy="0" rx="3" ry="5" />
            <line x1="0" y1="5" x2="0" y2="9" stroke="#1A1A2E" strokeWidth="1" />
            <path d="M 2 -3 L 6 -2 L 3 -1" fill="#F97316" stroke="#1A1A2E" strokeWidth="0.5" />
          </g>
        ))}
      </g>

      {/* Flying birds in the sky */}
      <g fill="#1A1A2E">
        <path d="M 30 70 Q 35 67 40 69 Q 45 67 50 70 Q 45 71 40 70 Q 35 71 30 70 Z" />
        <path d="M 70 60 Q 75 57 80 59 Q 85 57 90 60 Q 85 61 80 60 Q 75 61 70 60 Z" />
        <path d="M 150 55 Q 155 52 160 54 Q 165 52 170 55 Q 165 56 160 55 Q 155 56 150 55 Z" />
        <path d="M 200 75 Q 205 72 210 74 Q 215 72 220 75 Q 215 76 210 75 Q 205 76 200 75 Z" />
      </g>
    </svg>
  );
}

/* Ed-Dur ruins — ancient archaeological ruins (column + crumbled walls) */
function EdDurRuinsSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#FCD7AB" opacity="0.4" />
      {/* Sky / desert backdrop */}
      <rect width="240" height="200" fill="#FCD7AB" opacity="0.3" />
      {/* Sun */}
      <circle cx="200" cy="50" r="12" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} opacity="0.85" />

      {/* Distant dune */}
      <path d="M 0 175 Q 60 165 120 175 Q 180 185 240 175 L 240 200 L 0 200 Z" fill="#E8C879" stroke={STROKE} strokeWidth="1.5" />

      {/* Standing column (left) */}
      <rect x="40" y="80" width="20" height="120" fill="#E5DCC0" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Column top capital */}
      <rect x="34" y="72" width="32" height="10" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} />
      <rect x="38" y="64" width="24" height="10" fill="#E5DCC0" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Decoration grooves on the column */}
      <g stroke="#A8826B" strokeWidth="0.6">
        <line x1="44" y1="85" x2="44" y2="200" />
        <line x1="50" y1="85" x2="50" y2="200" />
        <line x1="56" y1="85" x2="56" y2="200" />
      </g>

      {/* Broken column (center, partial) */}
      <rect x="105" y="130" width="22" height="70" fill="#E5DCC0" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Jagged top (broken) */}
      <path d="M 105 130 L 110 122 L 115 132 L 120 124 L 127 130 Z" fill="#E5DCC0" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      <g stroke="#A8826B" strokeWidth="0.6">
        <line x1="111" y1="132" x2="111" y2="200" />
        <line x1="118" y1="132" x2="118" y2="200" />
      </g>

      {/* Fallen column piece on the ground */}
      <rect x="155" y="180" width="60" height="14" rx="2" fill="#E5DCC0" stroke={STROKE} strokeWidth={STROKE_W} />
      <line x1="170" y1="180" x2="170" y2="194" stroke="#A8826B" strokeWidth="0.6" />
      <line x1="185" y1="180" x2="185" y2="194" stroke="#A8826B" strokeWidth="0.6" />
      <line x1="200" y1="180" x2="200" y2="194" stroke="#A8826B" strokeWidth="0.6" />

      {/* Crumbled wall (back) */}
      <path d="M 70 120 L 85 110 L 100 120 L 100 145 L 70 145 Z" fill="#C9A574" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />

      {/* Tiny pottery shard near the broken column */}
      <g transform="translate(140 195)">
        <path d="M -5 0 Q -3 -4 0 -5 Q 3 -4 5 0 L 4 2 L -4 2 Z" fill="#A8826B" stroke={STROKE} strokeWidth="1" />
      </g>
    </svg>
  );
}

/* Falaj — ancient water channel system */
function FalajSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      {/* Sun */}
      <circle cx="200" cy="40" r="12" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Mountain (water source) */}
      <path d="M 0 110 L 50 50 L 100 90 L 130 110 L 0 110 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Snow cap on mountain */}
      <path d="M 50 50 L 58 65 Q 50 62 42 70 L 38 60 Z" fill="white" stroke={STROKE} strokeWidth="1.2" />
      {/* Spring at the mountain base */}
      <circle cx="100" cy="100" r="6" fill="#3B82F6" stroke={STROKE} strokeWidth="1.5" />
      <ellipse cx="100" cy="105" rx="10" ry="3" fill="#3B82F6" opacity="0.4" />

      {/* The falaj channel — a long open trough running across */}
      <path
        d="M 100 105 L 120 130 L 150 145 L 180 160 L 215 175"
        fill="none"
        stroke="#A8826B"
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* Water flowing through the falaj */}
      <path
        d="M 100 105 L 120 130 L 150 145 L 180 160 L 215 175"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Channel edges/lining */}
      <path
        d="M 100 105 L 120 130 L 150 145 L 180 160 L 215 175"
        fill="none"
        stroke={STROKE}
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Date palms growing along the falaj */}
      <g transform="translate(140 150)">
        <line x1="0" y1="0" x2="0" y2="-26" stroke="#5C4510" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 0 -26 Q -10 -28 -14 -22 M 0 -26 Q 10 -28 14 -22 M 0 -26 Q -8 -38 -12 -41 M 0 -26 Q 8 -38 12 -41" stroke="#16A34A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
      <g transform="translate(180 165)">
        <line x1="0" y1="0" x2="0" y2="-26" stroke="#5C4510" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 0 -26 Q -10 -28 -14 -22 M 0 -26 Q 10 -28 14 -22 M 0 -26 Q -8 -38 -12 -41 M 0 -26 Q 8 -38 12 -41" stroke="#16A34A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>

      {/* A farmer dipping a cup */}
      <g transform="translate(118 145)">
        <circle cx="0" cy="-18" r="4" fill="#D4A574" stroke={STROKE} strokeWidth="1.2" />
        <rect x="-3" y="-15" width="6" height="9" fill="#FFFCEF" stroke={STROKE} strokeWidth="1.2" />
        <line x1="0" y1="-6" x2="-2" y2="-2" stroke="#FFFCEF" strokeWidth="2" />
        <line x1="0" y1="-6" x2="2" y2="-2" stroke="#FFFCEF" strokeWidth="2" />
        {/* Arm reaching to the falaj */}
        <line x1="3" y1="-12" x2="10" y2="-3" stroke="#D4A574" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Ground */}
      <rect y="200" width="240" height="20" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Crop rows along the bottom */}
      <g stroke="#16A34A" strokeWidth="1.2" fill="none">
        <line x1="20" y1="225" x2="220" y2="225" />
        <line x1="30" y1="232" x2="220" y2="232" />
      </g>
    </svg>
  );
}

/* Roman trade — Roman amphora + UAE pearl + frankincense exchange */
function RomanTradeSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#FCD7AB" opacity="0.4" />
      {/* Background scroll/parchment */}
      <rect x="20" y="40" width="200" height="170" rx="4" fill="#FFFCEF" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Roman amphora (left) */}
      <g transform="translate(70 130)">
        <path
          d="M 0 35 L -10 10 L -8 -8 Q -8 -15 0 -20 Q 8 -15 8 -8 L 10 10 L 0 35 Z"
          fill="#CE1126"
          stroke={STROKE}
          strokeWidth={STROKE_W}
          strokeLinejoin="round"
        />
        {/* Handles */}
        <path d="M -8 -8 Q -16 -5 -10 5" stroke={STROKE} strokeWidth="2" fill="none" />
        <path d="M 8 -8 Q 16 -5 10 5" stroke={STROKE} strokeWidth="2" fill="none" />
        {/* Lid */}
        <ellipse cx="0" cy="-20" rx="8" ry="2" fill="#5C4510" stroke={STROKE} strokeWidth="1" />
        {/* Roman SPQR ish marking */}
</g>

      {/* Exchange arrows in middle */}
      <g stroke="#1A1A2E" strokeWidth="2" fill="none">
        <path d="M 100 120 L 140 120" markerEnd="url(#arrowR)" />
        <path d="M 140 145 L 100 145" markerEnd="url(#arrowR)" />
      </g>
      <defs>
        <marker id="arrowR" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="#1A1A2E" />
        </marker>
      </defs>

      {/* UAE pearls + frankincense (right) */}
      <g transform="translate(170 110)">
        {/* Pearl 1 */}
        <circle cx="0" cy="0" r="9" fill="#FFFCEF" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="-3" cy="-3" rx="3" ry="2" fill="white" />
        {/* Pearl 2 */}
        <circle cx="20" cy="10" r="7" fill="#FFFCEF" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="18" cy="8" rx="2" ry="1.5" fill="white" />
        {/* Pearl 3 */}
        <circle cx="-15" cy="15" r="6" fill="#FFFCEF" stroke={STROKE} strokeWidth={STROKE_W} />
      </g>
      {/* Frankincense (small resin chunks) */}
      <g transform="translate(170 165)">
        <path d="M -10 0 L -5 -5 L 0 -3 L 5 -5 L 10 0 Z" fill="#D4A574" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
</g>
    </svg>
  );
}

/* Lagoon mangrove — wide lagoon with mangrove islands */
function LagoonMangroveSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="100" fill="#E6F3FA" opacity="0.5" />
      {/* Sun */}
      <circle cx="50" cy="40" r="12" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} opacity="0.85" />
      {/* Calm lagoon water */}
      <rect y="100" width="240" height="140" fill="#22D3EE" />
      <g stroke="#0E8C6B" strokeWidth="0.8" fill="none" opacity="0.5">
        <path d="M 10 130 Q 30 128 50 130" />
        <path d="M 100 145 Q 120 143 140 145" />
        <path d="M 180 165 Q 200 163 220 165" />
        <path d="M 30 195 Q 50 193 70 195" />
        <path d="M 150 215 Q 170 213 190 215" />
      </g>

      {/* Three mangrove islands at different distances */}
      {/* Far island */}
      <g transform="translate(180 130)">
        <ellipse cx="0" cy="3" rx="22" ry="3" fill="#A8826B" stroke={STROKE} strokeWidth="1" />
        <ellipse cx="-5" cy="-2" rx="10" ry="6" fill="#16A34A" stroke={STROKE} strokeWidth="1.2" />
        <ellipse cx="6" cy="-3" rx="8" ry="5" fill="#16A34A" stroke={STROKE} strokeWidth="1.2" />
      </g>
      {/* Mid island */}
      <g transform="translate(60 165)">
        <ellipse cx="0" cy="6" rx="32" ry="5" fill="#A8826B" stroke={STROKE} strokeWidth="1.5" />
        <ellipse cx="-10" cy="-3" rx="14" ry="8" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="6" cy="-4" rx="10" ry="6" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="14" cy="0" rx="8" ry="5" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} />
      </g>
      {/* Front island (largest) */}
      <g transform="translate(150 205)">
        <ellipse cx="0" cy="10" rx="55" ry="8" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="-25" cy="-5" rx="16" ry="10" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="-5" cy="-8" rx="14" ry="9" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="15" cy="-6" rx="13" ry="8" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="35" cy="-3" rx="10" ry="6" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Trunk hints */}
        <line x1="-25" y1="5" x2="-25" y2="18" stroke="#5C4510" strokeWidth="1.5" />
        <line x1="-5" y1="3" x2="-5" y2="18" stroke="#5C4510" strokeWidth="1.5" />
        <line x1="15" y1="4" x2="15" y2="18" stroke="#5C4510" strokeWidth="1.5" />
      </g>

      {/* Two paddleboarders / kayakers */}
      <g transform="translate(110 180)">
        <ellipse cx="0" cy="0" rx="14" ry="3" fill="#FFFCEF" stroke={STROKE} strokeWidth="1.2" />
        <circle cx="0" cy="-3" r="2.5" fill="#D4A574" stroke={STROKE} strokeWidth="1" />
        <line x1="-6" y1="-3" x2="6" y2="-1" stroke="#5C4510" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

/* Pearling village — historical settlement of pearl-diver families */
function PearlingVillageSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="120" fill="#FFE9A8" opacity="0.5" />
      {/* Sun */}
      <circle cx="200" cy="45" r="12" fill="#F97316" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Sea (background) */}
      <rect y="120" width="240" height="60" fill="#5AAFE6" />
      <path d="M 0 120 Q 60 116 120 120 Q 180 124 240 120 L 240 132 Q 180 130 120 132 Q 60 134 0 132 Z" fill="#3F8AB8" />

      {/* Two dhows on the sea (pearl-diver boats anchored) */}
      <g transform="translate(50 145)">
        <path d="M -16 0 Q -12 8 0 8 Q 12 8 16 0 Z" fill="#5C4510" stroke={STROKE} strokeWidth="1.5" />
        <line x1="0" y1="0" x2="0" y2="-16" stroke="#5C4510" strokeWidth="1.5" />
        <path d="M 0 -16 L 12 0 L 0 0 Z" fill="white" stroke={STROKE} strokeWidth="1.5" />
      </g>
      <g transform="translate(180 150)">
        <path d="M -16 0 Q -12 8 0 8 Q 12 8 16 0 Z" fill="#5C4510" stroke={STROKE} strokeWidth="1.5" />
        <line x1="0" y1="0" x2="0" y2="-16" stroke="#5C4510" strokeWidth="1.5" />
        <path d="M 0 -16 L 12 0 L 0 0 Z" fill="white" stroke={STROKE} strokeWidth="1.5" />
      </g>

      {/* Beach */}
      <rect y="180" width="240" height="10" fill="#FCD7AB" stroke={STROKE} strokeWidth="1.5" />

      {/* Village huts (arish — palm-frond houses) */}
      <g transform="translate(60 200)">
        <path d="M -16 18 L 0 -8 L 16 18 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        {/* Doorway */}
        <rect x="-3" y="6" width="6" height="12" fill="#1A1A2E" />
        {/* Palm-frond texture lines */}
        <g stroke="#5C4510" strokeWidth="0.6" fill="none">
          <line x1="-12" y1="14" x2="12" y2="14" />
          <line x1="-9" y1="6" x2="9" y2="6" />
          <line x1="-5" y1="-2" x2="5" y2="-2" />
        </g>
      </g>
      <g transform="translate(120 200)">
        <path d="M -18 22 L 0 -12 L 18 22 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <rect x="-3" y="10" width="6" height="12" fill="#1A1A2E" />
        <g stroke="#5C4510" strokeWidth="0.6" fill="none">
          <line x1="-14" y1="16" x2="14" y2="16" />
          <line x1="-10" y1="6" x2="10" y2="6" />
          <line x1="-6" y1="-4" x2="6" y2="-4" />
        </g>
      </g>
      <g transform="translate(180 200)">
        <path d="M -16 18 L 0 -8 L 16 18 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <rect x="-3" y="6" width="6" height="12" fill="#1A1A2E" />
        <g stroke="#5C4510" strokeWidth="0.6" fill="none">
          <line x1="-12" y1="14" x2="12" y2="14" />
          <line x1="-9" y1="6" x2="9" y2="6" />
        </g>
      </g>

      {/* Pearl-diver family on the beach */}
      <g transform="translate(40 215)">
        <circle cx="0" cy="-7" r="3" fill="#D4A574" />
        <rect x="-3" y="-4" width="6" height="9" fill="#FFFCEF" />
        <line x1="-1" y1="5" x2="-2" y2="11" stroke="#FFFCEF" strokeWidth="1.5" />
        <line x1="1" y1="5" x2="2" y2="11" stroke="#FFFCEF" strokeWidth="1.5" />
      </g>
      {/* Drying nets */}
      <g stroke="#5C4510" strokeWidth="0.8" fill="none" opacity="0.6">
        <path d="M 100 218 L 110 215 L 110 225 L 100 228 Z" />
      </g>
    </svg>
  );
}

/* Seabird flock — cormorants flying in formation */
function SeabirdFlockSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      {/* Sun glow */}
      <circle cx="200" cy="50" r="20" fill="#FCD34D" opacity="0.3" />
      <circle cx="200" cy="50" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Sea horizon */}
      <rect y="195" width="240" height="50" fill="#5AAFE6" />
      <path d="M 0 195 Q 60 192 120 195 Q 180 198 240 195 L 240 205 Q 180 203 120 205 Q 60 207 0 205 Z" fill="#3F8AB8" />

      {/* Bird flock — V-formation flying overhead */}
      <g fill="#1A1A2E" stroke={STROKE} strokeWidth="1">
        {/* Lead bird */}
        <g transform="translate(120 90)">
          <ellipse cx="0" cy="0" rx="6" ry="3" />
          <path d="M -4 -1 Q -10 -8 -16 -5 L -8 0 Z" />
          <path d="M 4 -1 Q 10 -8 16 -5 L 8 0 Z" />
          <ellipse cx="6" cy="0" r="2" />
          <path d="M 7 0 L 11 1 L 8 2 Z" fill="#F97316" />
          <path d="M -6 1 L -10 2 L -8 3 Z" />
        </g>
        {/* V left wing */}
        <g transform="translate(95 105)">
          <ellipse cx="0" cy="0" rx="5" ry="2.5" />
          <path d="M -4 0 Q -9 -6 -14 -4 L -7 1 Z" />
          <path d="M 4 0 Q 9 -6 14 -4 L 7 1 Z" />
          <ellipse cx="5" cy="0" r="1.5" />
        </g>
        <g transform="translate(70 120)">
          <ellipse cx="0" cy="0" rx="4" ry="2" />
          <path d="M -3 0 Q -7 -5 -11 -3 L -5 1 Z" />
          <path d="M 3 0 Q 7 -5 11 -3 L 5 1 Z" />
        </g>
        <g transform="translate(45 135)">
          <ellipse cx="0" cy="0" rx="3" ry="1.5" />
          <path d="M -2 0 L -7 -3 L -3 1 Z" />
          <path d="M 2 0 L 7 -3 L 3 1 Z" />
        </g>
        {/* V right wing */}
        <g transform="translate(145 105)">
          <ellipse cx="0" cy="0" rx="5" ry="2.5" />
          <path d="M -4 0 Q -9 -6 -14 -4 L -7 1 Z" />
          <path d="M 4 0 Q 9 -6 14 -4 L 7 1 Z" />
          <ellipse cx="5" cy="0" r="1.5" />
        </g>
        <g transform="translate(170 120)">
          <ellipse cx="0" cy="0" rx="4" ry="2" />
          <path d="M -3 0 Q -7 -5 -11 -3 L -5 1 Z" />
          <path d="M 3 0 Q 7 -5 11 -3 L 5 1 Z" />
        </g>
        <g transform="translate(195 135)">
          <ellipse cx="0" cy="0" rx="3" ry="1.5" />
          <path d="M -2 0 L -7 -3 L -3 1 Z" />
          <path d="M 2 0 L 7 -3 L 3 1 Z" />
        </g>
      </g>

      {/* A few birds on the water */}
      <g fill="#1A1A2E">
        <ellipse cx="40" cy="200" rx="3" ry="1.5" />
        <line x1="40" y1="200" x2="44" y2="198" stroke="#1A1A2E" strokeWidth="1" />
        <ellipse cx="180" cy="205" rx="3" ry="1.5" />
        <line x1="180" y1="205" x2="184" y2="203" stroke="#1A1A2E" strokeWidth="1" />
      </g>
    </svg>
  );
}

/* Gazelle on Al Sinniyah Island */
function GazelleIslandSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="100" fill="#E6F3FA" opacity="0.5" />
      {/* Sun */}
      <circle cx="200" cy="40" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Sea around */}
      <rect y="100" width="240" height="140" fill="#5AAFE6" />
      <g stroke="#3F8AB8" strokeWidth="1" fill="none" opacity="0.6">
        <path d="M 0 130 Q 30 126 60 130" />
        <path d="M 200 200 Q 215 198 230 200" />
      </g>

      {/* Long flat sandy island */}
      <ellipse cx="120" cy="170" rx="105" ry="28" fill="#FCD7AB" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Sparse vegetation */}
      <g fill="#16A34A" stroke={STROKE} strokeWidth="1">
        <ellipse cx="50" cy="160" rx="6" ry="3.5" />
        <ellipse cx="80" cy="155" rx="5" ry="3" />
        <ellipse cx="190" cy="160" rx="6" ry="3.5" />
      </g>

      {/* Big Arabian gazelle in the center */}
      <g transform="translate(120 165)">
        {/* Body */}
        <ellipse cx="0" cy="0" rx="32" ry="14" fill="#D4A574" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Belly */}
        <ellipse cx="0" cy="6" rx="22" ry="6" fill="#FCD7AB" />
        {/* Tail */}
        <path d="M -32 -2 L -38 0 L -32 4 Z" fill="#D4A574" stroke={STROKE} strokeWidth="1" />
        {/* Neck */}
        <path d="M 27 -8 Q 36 -22 32 -36" fill="none" stroke="#D4A574" strokeWidth="10" strokeLinecap="round" />
        <path d="M 27 -8 Q 36 -22 32 -36" fill="none" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
        {/* Head */}
        <ellipse cx="35" cy="-38" rx="9" ry="7" fill="#D4A574" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Snout */}
        <ellipse cx="42" cy="-35" rx="4" ry="3" fill="#FCD7AB" stroke={STROKE} strokeWidth="1" />
        {/* Eye */}
        <circle cx="36" cy="-40" r="1.5" fill={STROKE} />
        {/* Curved horns */}
        <path d="M 30 -42 Q 28 -52 30 -60 Q 32 -56 31 -50" fill="none" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
        {/* Ear */}
        <ellipse cx="29" cy="-40" rx="3" ry="4" fill="#FCD7AB" stroke={STROKE} strokeWidth="1" transform="rotate(-30 29 -40)" />
        {/* Legs */}
        <line x1="-15" y1="12" x2="-17" y2="30" stroke="#D4A574" strokeWidth="4" strokeLinecap="round" />
        <line x1="-15" y1="12" x2="-17" y2="30" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="-5" y1="14" x2="-6" y2="32" stroke="#D4A574" strokeWidth="4" strokeLinecap="round" />
        <line x1="-5" y1="14" x2="-6" y2="32" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="15" y1="12" x2="14" y2="30" stroke="#D4A574" strokeWidth="4" strokeLinecap="round" />
        <line x1="15" y1="12" x2="14" y2="30" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="22" y1="10" x2="22" y2="28" stroke="#D4A574" strokeWidth="4" strokeLinecap="round" />
        <line x1="22" y1="10" x2="22" y2="28" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* UAQ skyline — quiet small-town waterfront */
function UaqSkylineSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="120" fill="#FFE9A8" opacity="0.6" />
      {/* Sun */}
      <circle cx="50" cy="40" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Distant buildings (low, modest) */}
      <g fill="#A8B8C8" stroke={STROKE} strokeWidth="1.2">
        <rect x="40" y="135" width="20" height="40" />
        <rect x="62" y="125" width="14" height="50" />
        <rect x="78" y="140" width="16" height="35" />
        <rect x="96" y="115" width="12" height="60" />
        <rect x="110" y="130" width="14" height="45" />
        <rect x="126" y="120" width="20" height="55" />
        <rect x="148" y="135" width="14" height="40" />
        <rect x="164" y="125" width="16" height="50" />
        <rect x="182" y="140" width="14" height="35" />
        <rect x="198" y="130" width="14" height="45" />
      </g>

      {/* UAQ Fort (a small castle silhouette stands out) */}
      <g transform="translate(120 130)">
        <rect x="-15" y="0" width="30" height="20" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Crenellations */}
        <g fill="#D4AF37" stroke={STROKE} strokeWidth="1">
          <rect x="-15" y="-5" width="6" height="5" />
          <rect x="-3" y="-5" width="6" height="5" />
          <rect x="9" y="-5" width="6" height="5" />
        </g>
        {/* Door */}
        <path d="M -3 20 L -3 12 Q -3 8 0 8 Q 3 8 3 12 L 3 20 Z" fill="#1A1A2E" />
      </g>

      {/* Sea */}
      <rect y="175" width="240" height="65" fill="#5AAFE6" />
      <path d="M 0 175 Q 60 172 120 175 Q 180 178 240 175 L 240 188 Q 180 186 120 188 Q 60 190 0 188 Z" fill="#3F8AB8" />

      {/* Mangrove patches in foreground water (UAQ is famous for them) */}
      <g transform="translate(40 200)">
        <ellipse cx="0" cy="0" rx="14" ry="6" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} />
        <line x1="-2" y1="5" x2="-3" y2="12" stroke="#5C4510" strokeWidth="1.5" />
      </g>
      <g transform="translate(200 210)">
        <ellipse cx="0" cy="0" rx="14" ry="6" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} />
        <line x1="-2" y1="5" x2="-3" y2="12" stroke="#5C4510" strokeWidth="1.5" />
      </g>

      {/* Small dhow */}
      <g transform="translate(120 215)">
        <path d="M -10 0 Q -7 4 0 4 Q 7 4 10 0 Z" fill="#5C4510" stroke={STROKE} strokeWidth="1" />
        <line x1="0" y1="0" x2="0" y2="-12" stroke="#5C4510" strokeWidth="1" />
        <path d="M 0 -12 L 8 0 L 0 0 Z" fill="white" stroke={STROKE} strokeWidth="1" />
      </g>
    </svg>
  );
}

/* ===================================================================
   RAS AL KHAIMAH step stickers
   =================================================================== */

function RakMapSticker() {
  return (
    <div
      style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
      dangerouslySetInnerHTML={{ __html: USER_STICKER_SVGS['rak-map'] ?? "" }}
    />
  );
}

function DhayahFortSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#FCD7AB" opacity="0.4" />
      {/* Sun */}
      <circle cx="200" cy="40" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Steep hill rising up */}
      <path d="M 0 220 L 60 200 L 110 100 L 180 200 L 240 220 L 240 240 L 0 240 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* 239-step path (visible zigzag) */}
      <path d="M 60 200 L 80 175 L 70 165 L 95 145 L 88 135 L 105 110" stroke="#FCD7AB" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M 60 200 L 80 175 L 70 165 L 95 145 L 88 135 L 105 110" stroke={STROKE} strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* Small fort on top of the hill */}
      <g transform="translate(110 100)">
        <rect x="-18" y="-15" width="36" height="20" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Crenellations */}
        <g fill="#D4AF37" stroke={STROKE} strokeWidth="1">
          <rect x="-18" y="-22" width="6" height="7" />
          <rect x="-8" y="-22" width="6" height="7" />
          <rect x="2" y="-22" width="6" height="7" />
          <rect x="12" y="-22" width="6" height="7" />
        </g>
        {/* Door */}
        <path d="M -3 5 L -3 -5 Q -3 -8 0 -8 Q 3 -8 3 -5 L 3 5 Z" fill="#1A1A2E" />
        {/* Tower at one corner */}
        <rect x="14" y="-25" width="10" height="30" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
        <rect x="13" y="-30" width="12" height="6" fill="#D4AF37" stroke={STROKE} strokeWidth="1" />
        {/* Flag */}
        <line x1="19" y1="-30" x2="19" y2="-42" stroke={STROKE} strokeWidth="1.5" />
        <rect x="19" y="-42" width="10" height="2" fill="#CE1126" />
        <rect x="19" y="-40" width="10" height="2" fill="white" />
        <rect x="19" y="-38" width="10" height="2" fill="#1A1A2E" />
      </g>
      {/* Climber on the path */}
      <g transform="translate(78 178)">
        <circle cx="0" cy="-4" r="2" fill="#CE1126" stroke={STROKE} strokeWidth="0.5" />
        <line x1="0" y1="-2" x2="0" y2="3" stroke={STROKE} strokeWidth="1" />
      </g>
    </svg>
  );
}

function PearlFarmSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="100" fill="#E6F3FA" opacity="0.5" />
      {/* Sun */}
      <circle cx="50" cy="40" r="12" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Calm warm sea */}
      <rect y="100" width="240" height="140" fill="#22D3EE" />
      <g stroke="#0E8C6B" strokeWidth="1" fill="none" opacity="0.5">
        <path d="M 10 130 Q 30 128 50 130" />
        <path d="M 180 160 Q 200 158 220 160" />
        <path d="M 50 200 Q 70 198 90 200" />
      </g>

      {/* Floating pontoon platform */}
      <rect x="40" y="115" width="160" height="14" fill="#5C4510" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Wood plank lines */}
      <g stroke="#8B6914" strokeWidth="0.6">
        <line x1="60" y1="115" x2="60" y2="129" />
        <line x1="100" y1="115" x2="100" y2="129" />
        <line x1="140" y1="115" x2="140" y2="129" />
        <line x1="180" y1="115" x2="180" y2="129" />
      </g>
      {/* Posts holding it in place */}
      <line x1="50" y1="129" x2="50" y2="220" stroke="#5C4510" strokeWidth="2.5" />
      <line x1="190" y1="129" x2="190" y2="220" stroke="#5C4510" strokeWidth="2.5" />

      {/* Ropes hanging down with pearl baskets */}
      <g stroke="#5C4510" strokeWidth="1" fill="none">
        <line x1="70" y1="129" x2="70" y2="180" />
        <line x1="100" y1="129" x2="100" y2="180" />
        <line x1="130" y1="129" x2="130" y2="180" />
        <line x1="160" y1="129" x2="160" y2="180" />
      </g>
      {/* Pearl baskets (woven nets at the bottom of each rope) */}
      <g fill="#A8826B" stroke={STROKE} strokeWidth="1.2">
        <rect x="62" y="180" width="16" height="14" rx="2" />
        <rect x="92" y="180" width="16" height="14" rx="2" />
        <rect x="122" y="180" width="16" height="14" rx="2" />
        <rect x="152" y="180" width="16" height="14" rx="2" />
      </g>
      {/* Pearls peeking out */}
      <g fill="#FFFCEF" stroke={STROKE} strokeWidth="0.8">
        <circle cx="68" cy="187" r="2" />
        <circle cx="74" cy="190" r="2" />
        <circle cx="98" cy="187" r="2" />
        <circle cx="104" cy="190" r="2" />
        <circle cx="128" cy="187" r="2" />
        <circle cx="134" cy="190" r="2" />
        <circle cx="158" cy="187" r="2" />
        <circle cx="164" cy="190" r="2" />
      </g>

      {/* Worker on the platform */}
      <g transform="translate(130 105)">
        <circle cx="0" cy="-7" r="4" fill="#D4A574" stroke={STROKE} strokeWidth="1" />
        <path d="M -5 -10 L 5 -10 L 4 -7 L -4 -7 Z" fill="white" stroke={STROKE} strokeWidth="0.8" />
        <rect x="-3" y="-3" width="6" height="9" fill="#FFFCEF" stroke={STROKE} strokeWidth="1" />
        <line x1="-3" y1="0" x2="-7" y2="3" stroke="#D4A574" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function ZiplineRiderSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      {/* Sun */}
      <circle cx="200" cy="40" r="12" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Mountain in background */}
      <path d="M 0 200 L 50 80 L 110 140 L 165 60 L 240 180 L 240 240 L 0 240 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Snow on peaks */}
      <path d="M 50 80 L 60 95 Q 50 92 42 100 Z" fill="white" stroke={STROKE} strokeWidth="1" />
      <path d="M 165 60 L 175 75 Q 165 72 157 80 Z" fill="white" stroke={STROKE} strokeWidth="1" />

      {/* Zipline cable */}
      <line x1="40" y1="80" x2="220" y2="170" stroke={STROKE} strokeWidth="2" />
      {/* Anchor points */}
      <g fill="#5C4510" stroke={STROKE} strokeWidth="1.5">
        <rect x="35" y="75" width="14" height="10" />
        <rect x="215" y="165" width="14" height="10" />
      </g>

      {/* The RIDER — full size flying down */}
      <g transform="translate(120 125) rotate(28)">
        {/* Trolley on the cable */}
        <rect x="-12" y="-6" width="24" height="6" rx="2" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="-6" cy="-3" r="2" fill="#1A1A2E" />
        <circle cx="6" cy="-3" r="2" fill="#1A1A2E" />
        {/* Hanger */}
        <line x1="0" y1="0" x2="0" y2="14" stroke={STROKE} strokeWidth="2" />
        {/* Helmet */}
        <circle cx="0" cy="20" r="9" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Visor */}
        <rect x="-8" y="18" width="16" height="4" fill="#1A1A2E" />
        {/* Body — superman pose, arms forward */}
        <rect x="-6" y="29" width="12" height="22" fill="#CE1126" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Arms forward */}
        <line x1="-3" y1="30" x2="-12" y2="20" stroke="#CE1126" strokeWidth="6" strokeLinecap="round" />
        <line x1="-3" y1="30" x2="-12" y2="20" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="3" y1="30" x2="12" y2="20" stroke="#CE1126" strokeWidth="6" strokeLinecap="round" />
        <line x1="3" y1="30" x2="12" y2="20" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
        {/* Legs back */}
        <line x1="-3" y1="50" x2="-10" y2="65" stroke="#1A1A2E" strokeWidth="6" strokeLinecap="round" />
        <line x1="3" y1="50" x2="10" y2="65" stroke="#1A1A2E" strokeWidth="6" strokeLinecap="round" />
        {/* Speed lines */}
        <g stroke={STROKE} strokeWidth="1.5" opacity="0.6">
          <line x1="-25" y1="30" x2="-15" y2="30" />
          <line x1="-22" y1="40" x2="-10" y2="40" />
          <line x1="-25" y1="50" x2="-15" y2="50" />
        </g>
      </g>
    </svg>
  );
}

function SnowyPeakSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky gradient (winter cool) */}
      <rect width="240" height="100" fill="#E6F3FA" opacity="0.7" />
      {/* Sun (cool winter sun) */}
      <circle cx="200" cy="40" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} opacity="0.7" />
      {/* Falling snowflakes */}
      <g fill="white" stroke={STROKE} strokeWidth="0.6">
        <circle cx="40" cy="60" r="2.5" />
        <circle cx="80" cy="90" r="2" />
        <circle cx="160" cy="70" r="2.5" />
        <circle cx="200" cy="100" r="2" />
        <circle cx="120" cy="50" r="2" />
        <circle cx="60" cy="120" r="2" />
      </g>

      {/* Snowy mountain peak (single dramatic mountain) */}
      <path d="M 20 230 L 120 60 L 220 230 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Heavy snow on the upper third */}
      <path d="M 90 110 L 120 60 L 150 110 Q 130 105 110 115 Q 100 110 90 110 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Snow on the rest */}
      <path d="M 60 175 Q 90 165 120 175 Q 150 165 180 175 L 180 200 Q 120 195 60 200 Z" fill="white" opacity="0.7" stroke="#FCD7AB" strokeWidth="1" />
      {/* Snowman tiny */}
      <g transform="translate(45 220)">
        <circle cx="0" cy="0" r="6" fill="white" stroke={STROKE} strokeWidth="1" />
        <circle cx="0" cy="-9" r="4" fill="white" stroke={STROKE} strokeWidth="1" />
        <circle cx="-1" cy="-10" r="0.5" fill={STROKE} />
        <circle cx="1" cy="-10" r="0.5" fill={STROKE} />
        <path d="M -2 -8 L 2 -8" stroke={STROKE} strokeWidth="0.5" />
      </g>
    </svg>
  );
}

function MountainVillageSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="120" fill="#FFE9A8" opacity="0.5" />
      {/* Sun */}
      <circle cx="50" cy="40" r="12" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Mountains in background */}
      <path d="M 0 130 L 40 70 L 90 110 L 140 60 L 200 110 L 240 90 L 240 240 L 0 240 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Mountain shadows */}
      <path d="M 90 110 L 140 60 L 120 90 Z" fill="#5C4510" opacity="0.5" />

      {/* Wadi / valley floor */}
      <path d="M 0 200 Q 60 195 120 200 Q 180 205 240 200 L 240 240 L 0 240 Z" fill="#FCD7AB" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Stone village houses on the slope */}
      <g fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W}>
        <rect x="40" y="160" width="30" height="35" />
        <path d="M 40 160 L 55 150 L 70 160 Z" strokeLinejoin="round" />
        <rect x="80" y="155" width="34" height="40" />
        <path d="M 80 155 L 97 145 L 114 155 Z" strokeLinejoin="round" />
        <rect x="125" y="160" width="30" height="35" />
        <path d="M 125 160 L 140 150 L 155 160 Z" strokeLinejoin="round" />
        <rect x="165" y="155" width="34" height="40" />
        <path d="M 165 155 L 182 145 L 199 155 Z" strokeLinejoin="round" />
      </g>
      {/* Doors and windows */}
      <g fill="#1A1A2E">
        <rect x="51" y="180" width="8" height="15" />
        <rect x="93" y="180" width="8" height="15" />
        <rect x="136" y="180" width="8" height="15" />
        <rect x="178" y="180" width="8" height="15" />
      </g>
      <g fill="#3B82F6" opacity="0.5">
        <rect x="44" y="167" width="6" height="6" />
        <rect x="60" y="167" width="6" height="6" />
        <rect x="86" y="163" width="6" height="6" />
        <rect x="104" y="163" width="6" height="6" />
        <rect x="129" y="167" width="6" height="6" />
        <rect x="145" y="167" width="6" height="6" />
        <rect x="171" y="163" width="6" height="6" />
        <rect x="189" y="163" width="6" height="6" />
      </g>

      {/* Date palm in the wadi */}
      <g transform="translate(40 215)">
        <line x1="0" y1="0" x2="0" y2="-22" stroke="#5C4510" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 0 -22 Q -10 -24 -14 -18 M 0 -22 Q 10 -24 14 -18 M 0 -22 Q -8 -34 -12 -37 M 0 -22 Q 8 -34 12 -37" stroke="#16A34A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
      <g transform="translate(210 215)">
        <line x1="0" y1="0" x2="0" y2="-22" stroke="#5C4510" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 0 -22 Q -10 -24 -14 -18 M 0 -22 Q 10 -24 14 -18 M 0 -22 Q -8 -34 -12 -37 M 0 -22 Q 8 -34 12 -37" stroke="#16A34A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>

      {/* Goat (mountain village staple) */}
      <g transform="translate(120 218)">
        <ellipse cx="0" cy="0" rx="12" ry="5" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="11" cy="-3" r="4" fill="white" stroke={STROKE} strokeWidth="1.5" />
        <line x1="13" y1="-7" x2="14" y2="-11" stroke={STROKE} strokeWidth="1.5" />
        <line x1="9" y1="-7" x2="8" y2="-11" stroke={STROKE} strokeWidth="1.5" />
        <line x1="-8" y1="5" x2="-8" y2="10" stroke={STROKE} strokeWidth="1.5" />
        <line x1="-2" y1="5" x2="-2" y2="10" stroke={STROKE} strokeWidth="1.5" />
        <line x1="4" y1="5" x2="4" y2="10" stroke={STROKE} strokeWidth="1.5" />
        <line x1="10" y1="5" x2="10" y2="10" stroke={STROKE} strokeWidth="1.5" />
      </g>
    </svg>
  );
}

function OysterRopeSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Underwater background */}
      {/* Bubbles */}
      <g fill="white" stroke={STROKE} strokeWidth="0.8" opacity="0.7">
        <circle cx="40" cy="40" r="4" />
        <circle cx="200" cy="30" r="5" />
        <circle cx="180" cy="80" r="3" />
        <circle cx="50" cy="100" r="3" />
      </g>

      {/* Vertical rope from above */}
      <line x1="120" y1="0" x2="120" y2="220" stroke="#5C4510" strokeWidth="3" />

      {/* Five oyster shells attached at intervals */}
      {[60, 100, 140, 180, 220].map((y, i) => (
        <g key={i} transform={`translate(120 ${y}) rotate(${(i % 2) * 20 - 10})`}>
          {/* Shell — clam form */}
          <path d="M -16 -3 Q 0 -14 16 -3 L 14 4 Q 0 8 -14 4 Z" fill="#9CA3AF" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
          {/* Shell ridges */}
          <path d="M -10 -2 Q 0 -8 10 -2" stroke="#5C4510" strokeWidth="0.6" fill="none" />
          <path d="M -8 0 Q 0 -3 8 0" stroke="#5C4510" strokeWidth="0.6" fill="none" />
          {/* Tied to rope */}
          <line x1="-3" y1="-5" x2="0" y2="-12" stroke="#5C4510" strokeWidth="1" />
        </g>
      ))}

      {/* Sea floor */}
      <rect y="220" width="240" height="20" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Coral cluster */}
      <g transform="translate(40 225)">
        <path d="M 0 0 L -3 -8 L 0 -10 L 3 -8 Z" fill="#F97316" stroke={STROKE} strokeWidth="1" />
        <path d="M -6 0 L -8 -4 L -6 -6 L -4 -4 Z" fill="#F97316" stroke={STROKE} strokeWidth="1" />
      </g>
      <g transform="translate(200 225)">
        <path d="M 0 0 L -3 -8 L 0 -10 L 3 -8 Z" fill="#CE1126" stroke={STROKE} strokeWidth="1" />
      </g>

      {/* Tiny fish */}
      <g transform="translate(60 60)">
        <ellipse cx="0" cy="0" rx="6" ry="3" fill="#3B82F6" stroke={STROKE} strokeWidth="1" />
        <path d="M -6 0 L -10 -2 L -10 2 Z" fill="#3B82F6" stroke={STROKE} strokeWidth="1" />
      </g>

      {/* Annotation */}
      <g transform="translate(180 130)">
        <line x1="-10" y1="0" x2="-30" y2="-10" stroke={STROKE} strokeWidth="1.2" />
        <rect x="-8" y="-10" width="50" height="20" rx="4" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
</g>
    </svg>
  );
}

function AncientPortSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="120" fill="#FFE9A8" opacity="0.6" />
      {/* Sun */}
      <circle cx="50" cy="40" r="14" fill="#F97316" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Sea */}
      <rect y="120" width="240" height="120" fill="#5AAFE6" />
      <path d="M 0 120 Q 60 116 120 120 Q 180 124 240 120 L 240 132 Q 180 130 120 132 Q 60 134 0 132 Z" fill="#3F8AB8" />

      {/* Stone harbor wall (left) */}
      <rect x="0" y="120" width="40" height="60" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} />
      <g stroke="#5C4510" strokeWidth="0.6">
        <line x1="0" y1="135" x2="40" y2="135" />
        <line x1="0" y1="150" x2="40" y2="150" />
        <line x1="0" y1="165" x2="40" y2="165" />
        <line x1="20" y1="120" x2="20" y2="180" />
      </g>

      {/* Multiple wooden dhows in port */}
      <g transform="translate(75 145)">
        <path d="M -22 0 Q -16 12 0 12 Q 16 12 22 0 L 18 -3 Q 0 -1 -18 -3 Z" fill="#5C4510" stroke={STROKE} strokeWidth={STROKE_W} />
        <line x1="0" y1="-3" x2="0" y2="-30" stroke="#5C4510" strokeWidth="2" />
        <path d="M 0 -30 L 18 -3 L 0 -3 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      </g>
      <g transform="translate(140 155)">
        <path d="M -20 0 Q -14 10 0 10 Q 14 10 20 0 L 17 -3 Q 0 -1 -17 -3 Z" fill="#5C4510" stroke={STROKE} strokeWidth={STROKE_W} />
        <line x1="0" y1="-3" x2="0" y2="-26" stroke="#5C4510" strokeWidth="2" />
        <path d="M 0 -26 L 16 -3 L 0 -3 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      </g>
      <g transform="translate(200 165)">
        <path d="M -16 0 Q -10 8 0 8 Q 10 8 16 0 L 14 -3 Q 0 -1 -14 -3 Z" fill="#5C4510" stroke={STROKE} strokeWidth={STROKE_W} />
        <line x1="0" y1="-3" x2="0" y2="-22" stroke="#5C4510" strokeWidth="1.5" />
        <path d="M 0 -22 L 12 -3 L 0 -3 Z" fill="white" stroke={STROKE} strokeWidth="1.5" />
      </g>

      {/* Old port building */}
      <g transform="translate(20 140)">
        <rect x="0" y="40" width="30" height="40" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
        <path d="M 0 40 L 15 30 L 30 40 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} />
        <rect x="11" y="60" width="8" height="20" fill="#1A1A2E" />
      </g>
    </svg>
  );
}

function PalmTentSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sun */}
      <circle cx="200" cy="50" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Distant mountains */}
      <path d="M 0 150 L 40 110 L 80 140 L 130 105 L 180 145 L 240 130 L 240 200 L 0 200 Z" fill="#A8826B" stroke={STROKE} strokeWidth="1.5" opacity="0.6" />

      {/* Palm-frond tent (arish) — woven palm-leaf hut */}
      <g transform="translate(120 150)">
        {/* Frame poles */}
        <line x1="-35" y1="50" x2="-25" y2="-30" stroke="#5C4510" strokeWidth="2" />
        <line x1="35" y1="50" x2="25" y2="-30" stroke="#5C4510" strokeWidth="2" />
        <line x1="-25" y1="-30" x2="25" y2="-30" stroke="#5C4510" strokeWidth="2" />
        {/* Woven palm-frond walls */}
        <path d="M -35 50 L -25 -30 L 25 -30 L 35 50 Z" fill="#D4A574" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        {/* Frond texture (vertical wave lines) */}
        <g stroke="#5C4510" strokeWidth="0.8" fill="none">
          <path d="M -30 40 Q -30 0 -27 -28" />
          <path d="M -22 45 Q -22 0 -20 -28" />
          <path d="M -14 48 Q -14 0 -12 -28" />
          <path d="M -6 50 Q -6 0 -4 -28" />
          <path d="M 2 50 Q 2 0 0 -28" />
          <path d="M 10 48 Q 10 0 8 -28" />
          <path d="M 18 45 Q 18 0 16 -28" />
          <path d="M 26 40 Q 26 0 22 -28" />
        </g>
        {/* Palm-frond roof / thatch */}
        <path d="M -30 -28 L -45 -45 L 45 -45 L 30 -28 Z" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <g stroke="#0E8C6B" strokeWidth="0.8" fill="none">
          <line x1="-40" y1="-30" x2="-32" y2="-44" />
          <line x1="-25" y1="-30" x2="-15" y2="-44" />
          <line x1="-5" y1="-30" x2="0" y2="-44" />
          <line x1="15" y1="-30" x2="20" y2="-44" />
          <line x1="30" y1="-30" x2="38" y2="-44" />
        </g>
        {/* Doorway */}
        <path d="M -8 50 L -8 25 Q -8 18 0 18 Q 8 18 8 25 L 8 50 Z" fill="#1A1A2E" stroke={STROKE} strokeWidth={STROKE_W} />
      </g>

      {/* Date palm beside the tent */}
      <g transform="translate(200 200)">
        <line x1="0" y1="0" x2="0" y2="-30" stroke="#5C4510" strokeWidth="3" strokeLinecap="round" />
        <path d="M 0 -30 Q -12 -32 -16 -25 M 0 -30 Q 12 -32 16 -25 M 0 -30 Q -10 -42 -14 -45 M 0 -30 Q 10 -42 14 -45" stroke="#16A34A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>

      {/* Ground */}
      <rect y="200" width="240" height="20" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* "Top of the Tent" hint */}
      <g transform="translate(120 225)">
</g>
    </svg>
  );
}

function RakSkylineSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="100" fill="#E6F3FA" opacity="0.5" />
      {/* Sun */}
      <circle cx="50" cy="40" r="14" fill="#F97316" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Mountain backdrop */}
      <path d="M 0 110 L 50 60 L 100 90 L 150 50 L 200 95 L 240 70 L 240 240 L 0 240 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Snow on the highest peaks */}
      <path d="M 150 50 L 158 65 Q 150 62 142 70 Z" fill="white" stroke={STROKE} strokeWidth="1" />

      {/* Mid-rise buildings on the coast */}
      <g fill="#A8B8C8" stroke={STROKE} strokeWidth="1.2">
        <rect x="20" y="155" width="14" height="40" />
        <rect x="36" y="140" width="18" height="55" />
        <rect x="56" y="150" width="14" height="45" />
        <rect x="72" y="130" width="20" height="65" />
        <rect x="94" y="145" width="14" height="50" />
        <rect x="170" y="160" width="14" height="35" />
        <rect x="186" y="145" width="16" height="50" />
        <rect x="204" y="155" width="14" height="40" />
      </g>

      {/* Marjan Island silhouette (coral-shape) */}
      <g transform="translate(140 175)">
        <path d="M -20 0 Q -15 -10 0 -8 Q 15 -10 20 0 Q 15 5 0 4 Q -15 5 -20 0 Z" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} />
        <line x1="-10" y1="-3" x2="-12" y2="-8" stroke="#16A34A" strokeWidth="2" />
        <line x1="0" y1="-6" x2="0" y2="-12" stroke="#16A34A" strokeWidth="2" />
        <line x1="10" y1="-3" x2="12" y2="-8" stroke="#16A34A" strokeWidth="2" />
      </g>

      {/* Sea */}
      <rect y="195" width="240" height="45" fill="#5AAFE6" />
      <path d="M 0 195 Q 60 192 120 195 Q 180 198 240 195 L 240 205 Q 180 203 120 205 Q 60 207 0 205 Z" fill="#3F8AB8" />

      {/* Tiny dhow */}
      <g transform="translate(120 220)">
        <path d="M -10 0 Q -7 4 0 4 Q 7 4 10 0 Z" fill="#5C4510" stroke={STROKE} strokeWidth="1" />
        <line x1="0" y1="0" x2="0" y2="-10" stroke="#5C4510" strokeWidth="1" />
        <path d="M 0 -10 L 8 0 L 0 0 Z" fill="white" stroke={STROKE} strokeWidth="1" />
      </g>
    </svg>
  );
}

/* ===================================================================
   FUJAIRAH step stickers
   =================================================================== */

function FujairahMapSticker() {
  return (
    <div
      style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
      dangerouslySetInnerHTML={{ __html: USER_STICKER_SVGS['fujairah-map'] ?? "" }}
    />
  );
}

function WadiSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="100" fill="#E6F3FA" opacity="0.5" />
      {/* Sun */}
      <circle cx="200" cy="40" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Two mountains forming a valley */}
      <path d="M 0 220 L 60 100 L 100 180 L 100 220 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      <path d="M 140 220 L 140 180 L 180 100 L 240 220 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Mountain shadows */}
      <path d="M 60 100 L 100 180 L 80 160 Z" fill="#5C4510" opacity="0.5" />
      <path d="M 180 100 L 140 180 L 160 160 Z" fill="#5C4510" opacity="0.5" />

      {/* Wadi (water channel running through the valley) */}
      <path d="M 100 220 Q 110 200 115 180 Q 120 165 120 145 Q 120 130 122 110" stroke="#FCD7AB" strokeWidth="40" fill="none" strokeLinecap="round" />
      {/* Water in the wadi */}
      <path d="M 100 220 Q 110 200 115 180 Q 120 165 120 145 Q 120 130 122 110" stroke="#3B82F6" strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d="M 100 220 Q 110 200 115 180 Q 120 165 120 145 Q 120 130 122 110" stroke="#5AAFE6" strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* Rocks scattered in the wadi */}
      <g fill="#5C4510" stroke={STROKE} strokeWidth="1">
        <ellipse cx="105" cy="195" rx="5" ry="3" />
        <ellipse cx="125" cy="170" rx="4" ry="2.5" />
        <ellipse cx="118" cy="205" rx="5" ry="3" />
      </g>

      {/* Trees on the wadi banks */}
      <g transform="translate(85 195)">
        <line x1="0" y1="0" x2="0" y2="-15" stroke="#5C4510" strokeWidth="2" />
        <ellipse cx="0" cy="-18" rx="8" ry="6" fill="#16A34A" stroke={STROKE} strokeWidth="1.5" />
      </g>
      <g transform="translate(150 200)">
        <line x1="0" y1="0" x2="0" y2="-15" stroke="#5C4510" strokeWidth="2" />
        <ellipse cx="0" cy="-18" rx="8" ry="6" fill="#16A34A" stroke={STROKE} strokeWidth="1.5" />
      </g>
    </svg>
  );
}

function MangoOrchardSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="120" fill="#E6F3FA" opacity="0.5" />
      {/* Sun */}
      <circle cx="50" cy="40" r="12" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Cloud */}
      <ellipse cx="180" cy="50" rx="22" ry="8" fill="white" opacity="0.7" />
      {/* Mountain backdrop */}
      <path d="M 0 130 L 50 80 L 110 110 L 170 70 L 240 130 L 240 240 L 0 240 Z" fill="#A8826B" stroke={STROKE} strokeWidth="1.5" opacity="0.55" />

      {/* Three mango trees in a row */}
      {[60, 120, 180].map((x, i) => (
        <g key={i} transform={`translate(${x} 200)`}>
          {/* Trunk */}
          <rect x="-3" y="-30" width="6" height="35" fill="#5C4510" stroke={STROKE} strokeWidth="1.5" />
          {/* Canopy */}
          <ellipse cx="0" cy="-50" rx="28" ry="22" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} />
          <ellipse cx="-12" cy="-58" rx="14" ry="12" fill="#16A34A" stroke={STROKE} strokeWidth="1.5" />
          <ellipse cx="12" cy="-55" rx="13" ry="11" fill="#16A34A" stroke={STROKE} strokeWidth="1.5" />
          {/* Mangoes hanging */}
          <ellipse cx="-10" cy="-42" rx="3" ry="4" fill="#F97316" stroke={STROKE} strokeWidth="1" />
          <ellipse cx="0" cy="-38" rx="3" ry="4" fill="#FCD34D" stroke={STROKE} strokeWidth="1" />
          <ellipse cx="12" cy="-42" rx="3" ry="4" fill="#F97316" stroke={STROKE} strokeWidth="1" />
          <ellipse cx="-5" cy="-50" rx="2.5" ry="3" fill="#FCD34D" stroke={STROKE} strokeWidth="1" />
          <ellipse cx="8" cy="-52" rx="2.5" ry="3" fill="#F97316" stroke={STROKE} strokeWidth="1" />
        </g>
      ))}

      {/* Ground */}
      <rect y="200" width="240" height="40" fill="#16A34A" opacity="0.4" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Fallen mango on the ground */}
      <ellipse cx="100" cy="220" rx="6" ry="5" fill="#F97316" stroke={STROKE} strokeWidth="1.5" />
      <ellipse cx="160" cy="225" rx="5" ry="4" fill="#FCD34D" stroke={STROKE} strokeWidth="1.5" />
    </svg>
  );
}

function SeaTurtleSticker() {
  return (
    <div
      style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
      dangerouslySetInnerHTML={{ __html: USER_STICKER_SVGS['sea-turtle'] ?? "" }}
    />
  );
}

function CoralReefSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Underwater */}
      {/* Light rays from above */}
      <g stroke="#FCD34D" strokeWidth="2" opacity="0.4" strokeLinecap="round">
        <line x1="40" y1="0" x2="60" y2="80" />
        <line x1="120" y1="0" x2="130" y2="80" />
        <line x1="200" y1="0" x2="180" y2="80" />
      </g>
      {/* Bubbles */}
      <g fill="white" stroke={STROKE} strokeWidth="0.6" opacity="0.7">
        <circle cx="60" cy="50" r="3" />
        <circle cx="190" cy="40" r="4" />
        <circle cx="180" cy="80" r="2.5" />
      </g>

      {/* Sea floor */}
      <rect y="200" width="240" height="40" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Big coral cluster — center */}
      <g transform="translate(120 175)">
        {/* Pink branching coral */}
        <g fill="#F8B4C8" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round">
          <path d="M 0 25 L 0 10 L -8 -5 L -10 -20 M -8 -5 L 0 -10 L 5 -20 M 0 10 L 8 0 L 10 -15" stroke="#F8B4C8" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M 0 25 L 0 10 L -8 -5 L -10 -20 M -8 -5 L 0 -10 L 5 -20 M 0 10 L 8 0 L 10 -15" stroke={STROKE} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>
      </g>
      {/* Orange brain coral (left) */}
      <g transform="translate(50 195)">
        <ellipse cx="0" cy="0" rx="20" ry="10" fill="#F97316" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Brain pattern */}
        <g stroke="#9A3412" strokeWidth="1" fill="none">
          <path d="M -15 -3 Q -10 -6 -5 -3 Q 0 -6 5 -3 Q 10 -6 15 -3" />
          <path d="M -15 2 Q -10 -1 -5 2 Q 0 -1 5 2 Q 10 -1 15 2" />
        </g>
      </g>
      {/* Yellow tube coral (right) */}
      <g transform="translate(190 190)">
        <g fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W}>
          <ellipse cx="-8" cy="-2" rx="4" ry="12" />
          <ellipse cx="0" cy="-5" rx="4" ry="15" />
          <ellipse cx="8" cy="-3" rx="4" ry="13" />
        </g>
      </g>
      {/* Purple sea fan (back) */}
      <g transform="translate(150 180)">
        <path d="M 0 25 Q -15 0 -10 -20 M 0 25 Q 0 0 -3 -22 M 0 25 Q 15 0 10 -20" stroke="#8B5CF6" strokeWidth="2" fill="none" />
        <path d="M -10 -20 L -8 -25 M -3 -22 L -3 -28 M 10 -20 L 8 -25" stroke="#8B5CF6" strokeWidth="1.5" />
      </g>

      {/* Tiny fish swimming around */}
      <g transform="translate(80 80)">
        <ellipse cx="0" cy="0" rx="6" ry="3" fill="#3B82F6" stroke={STROKE} strokeWidth="1" />
        <path d="M -6 0 L -10 -2 L -10 2 Z" fill="#3B82F6" stroke={STROKE} strokeWidth="1" />
      </g>
      <g transform="translate(180 130)">
        <ellipse cx="0" cy="0" rx="6" ry="3" fill="#FCD34D" stroke={STROKE} strokeWidth="1" />
        <path d="M -6 0 L -10 -2 L -10 2 Z" fill="#FCD34D" stroke={STROKE} strokeWidth="1" />
      </g>
    </svg>
  );
}

function ClownfishSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Underwater */}
      {/* Sea anemone */}
      <g transform="translate(120 195)">
        <g fill="#F8B4C8" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round">
          {Array.from({ length: 14 }).map((_, i) => {
            const a = (i / 14) * Math.PI;
            const x1 = Math.cos(a) * 35;
            const y1 = -Math.sin(a) * 35;
            const x2 = Math.cos(a) * 50;
            const y2 = -Math.sin(a) * 50;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="3" />;
          })}
        </g>
        <ellipse cx="0" cy="0" rx="40" ry="10" fill="#D17080" stroke={STROKE} strokeWidth={STROKE_W} />
      </g>

      {/* BIG clownfish — center */}
      <g transform="translate(120 110)">
        {/* Body */}
        <ellipse cx="0" cy="0" rx="50" ry="30" fill="#F97316" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* White stripes */}
        <path d="M -20 -28 Q -22 0 -20 28 L -10 28 Q -8 0 -10 -28 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <path d="M 18 -27 Q 20 0 18 27 L 28 28 Q 30 0 28 -28 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <path d="M 38 -22 Q 40 0 38 22 L 44 18 Q 46 0 44 -18 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        {/* Tail */}
        <path d="M -50 0 L -75 -15 L -68 0 L -75 15 Z" fill="#F97316" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <line x1="-65" y1="-10" x2="-65" y2="10" stroke="white" strokeWidth="2" />
        {/* Top fin */}
        <path d="M -10 -28 L -5 -42 L 5 -42 L 10 -28 Z" fill="#F97316" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        {/* Bottom fin */}
        <path d="M 0 28 L -5 38 L 5 38 Z" fill="#F97316" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        {/* Side fin */}
        <path d="M 5 8 L 18 22 L 0 18 Z" fill="#F97316" stroke={STROKE} strokeWidth="1.5" />
        {/* Eye */}
        <circle cx="35" cy="-5" r="6" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="36" cy="-5" r="3" fill="#1A1A2E" />
        <circle cx="37" cy="-6" r="1" fill="white" />
        {/* Mouth */}
        <path d="M 48 5 Q 50 8 47 10" stroke="#1A1A2E" strokeWidth="1.5" fill="none" />
      </g>

      {/* Bubbles */}
      <g fill="white" stroke={STROKE} strokeWidth="0.6" opacity="0.7">
        <circle cx="60" cy="60" r="3" />
        <circle cx="180" cy="80" r="4" />
        <circle cx="200" cy="50" r="2.5" />
      </g>
    </svg>
  );
}

function FujairahFortSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#FCD7AB" opacity="0.4" />
      {/* Sun */}
      <circle cx="200" cy="40" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Hill */}
      <path d="M 0 230 L 60 180 L 120 130 L 180 180 L 240 230 L 240 240 L 0 240 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Steps up */}
      <path d="M 60 180 L 80 175 L 95 165 L 110 155 L 120 145" stroke="#FCD7AB" strokeWidth="5" fill="none" strokeLinecap="round" />

      {/* Fort body — square 16th-century fort with multiple towers */}
      <g transform="translate(120 130)">
        {/* Main building */}
        <rect x="-32" y="0" width="64" height="36" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Crenellations on top */}
        <g fill="#D4AF37" stroke={STROKE} strokeWidth="1">
          <rect x="-32" y="-6" width="8" height="6" />
          <rect x="-20" y="-6" width="8" height="6" />
          <rect x="-8" y="-6" width="8" height="6" />
          <rect x="4" y="-6" width="8" height="6" />
          <rect x="16" y="-6" width="8" height="6" />
          <rect x="24" y="-6" width="8" height="6" />
        </g>
        {/* Three corner towers */}
        <rect x="-40" y="-15" width="14" height="50" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
        <rect x="26" y="-15" width="14" height="50" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
        <rect x="-7" y="-30" width="14" height="30" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Tower crenellations */}
        <g fill="#D4AF37" stroke={STROKE} strokeWidth="1">
          <rect x="-40" y="-22" width="6" height="8" />
          <rect x="-32" y="-22" width="6" height="8" />
          <rect x="26" y="-22" width="6" height="8" />
          <rect x="34" y="-22" width="6" height="8" />
          <rect x="-7" y="-37" width="6" height="8" />
          <rect x="1" y="-37" width="6" height="8" />
        </g>
        {/* Door */}
        <path d="M -5 36 L -5 22 Q -5 15 0 15 Q 5 15 5 22 L 5 36 Z" fill="#1A1A2E" />
        {/* Tower windows */}
        <rect x="-36" y="0" width="6" height="10" fill="#3B82F6" opacity="0.5" stroke={STROKE} strokeWidth="0.8" />
        <rect x="30" y="0" width="6" height="10" fill="#3B82F6" opacity="0.5" stroke={STROKE} strokeWidth="0.8" />
        <rect x="-3" y="-22" width="6" height="8" fill="#3B82F6" opacity="0.5" stroke={STROKE} strokeWidth="0.8" />
        {/* Brick texture */}
        <g stroke="#8B6914" strokeWidth="0.6" opacity="0.5">
          <line x1="-32" y1="14" x2="32" y2="14" />
          <line x1="-32" y1="24" x2="-5" y2="24" />
          <line x1="5" y1="24" x2="32" y2="24" />
        </g>
      </g>
    </svg>
  );
}

function BidyaDomesCloseupSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#FCD7AB" opacity="0.4" />
      {/* Backdrop hill */}
      <path d="M 0 175 L 60 130 L 120 160 L 180 130 L 240 175 L 240 240 L 0 240 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" opacity="0.7" />

      {/* Foreground: close-up of just the four uneven domes */}
      <rect x="20" y="170" width="200" height="50" fill="#C9A574" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Dome 1 (smallest, far left) */}
      <path d="M 30 175 Q 30 145 50 138 Q 70 145 70 175 Z" fill="#C9A574" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Dome 2 (medium) */}
      <path d="M 70 175 Q 70 130 95 120 Q 120 130 120 175 Z" fill="#C9A574" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Dome 3 (LARGEST, center) */}
      <path d="M 120 175 Q 120 110 150 100 Q 180 110 180 175 Z" fill="#C9A574" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Dome 4 (smaller, far right) */}
      <path d="M 175 175 Q 175 145 190 138 Q 210 145 210 175 Z" fill="#C9A574" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />

      {/* Tiny ornaments on top of biggest two */}
      <circle cx="95" cy="120" r="2" fill={STROKE} />
      <circle cx="150" cy="100" r="2.5" fill={STROKE} />

      {/* Mud-stone texture */}
      <g stroke="#8B6914" strokeWidth="0.6" opacity="0.7">
        <line x1="20" y1="190" x2="220" y2="190" />
        <line x1="20" y1="200" x2="220" y2="200" />
        <line x1="20" y1="210" x2="220" y2="210" />
        <line x1="60" y1="180" x2="60" y2="220" />
        <line x1="100" y1="180" x2="100" y2="220" />
        <line x1="140" y1="180" x2="140" y2="220" />
        <line x1="180" y1="180" x2="180" y2="220" />
      </g>
      {/* Arched doorway in center */}
      <path d="M 145 220 L 145 195 Q 145 188 150 188 Q 155 188 155 195 L 155 220 Z" fill="#1A1A2E" stroke={STROKE} strokeWidth="1.5" />
    </svg>
  );
}

function GulfOfOmanSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="100" fill="#FFE9A8" opacity="0.6" />
      {/* Sun */}
      <circle cx="60" cy="50" r="18" fill="#F97316" stroke={STROKE} strokeWidth={STROKE_W} />
      <circle cx="60" cy="50" r="28" fill="#F97316" opacity="0.25" />

      {/* Distant mountain shore (Oman side) */}
      <path d="M 0 110 L 30 90 L 60 100 L 100 85 L 140 100 L 180 90 L 240 105 L 240 130 L 0 130 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" opacity="0.6" />

      {/* Sea (the Gulf of Oman, deeper turquoise than the Gulf) */}
      <rect y="130" width="240" height="110" fill="#22D3EE" />
      <path d="M 0 130 Q 60 126 120 130 Q 180 134 240 130 L 240 145 Q 180 142 120 145 Q 60 148 0 145 Z" fill="#0E8C6B" />
      {/* Wave lines */}
      <g stroke="#0E8C6B" strokeWidth="1.5" fill="none" opacity="0.5">
        <path d="M 10 165 Q 30 162 50 165" />
        <path d="M 100 180 Q 120 177 140 180" />
        <path d="M 180 200 Q 200 197 220 200" />
        <path d="M 30 215 Q 50 212 70 215" />
      </g>

      {/* Lighthouse on a small rocky point */}
      <g transform="translate(40 175)">
        <ellipse cx="0" cy="10" rx="20" ry="6" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Lighthouse */}
        <rect x="-5" y="-25" width="10" height="35" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        <rect x="-5" y="-15" width="10" height="5" fill="#CE1126" />
        <rect x="-5" y="-3" width="10" height="5" fill="#CE1126" />
        <rect x="-7" y="-30" width="14" height="6" fill="#1A1A2E" stroke={STROKE} strokeWidth="1" />
        {/* Light beam */}
        <path d="M 0 -27 L 30 -10 L 30 -45 Z" fill="#FCD34D" opacity="0.5" />
      </g>

      {/* Ship in middle distance */}
      <g transform="translate(180 175)">
        <rect x="-22" y="-2" width="44" height="6" fill="#1A1A2E" stroke={STROKE} strokeWidth="1.2" />
        <rect x="-15" y="-12" width="20" height="10" fill="#1A1A2E" stroke={STROKE} strokeWidth="1.2" />
        <line x1="-5" y1="-12" x2="-5" y2="-22" stroke="#1A1A2E" strokeWidth="1.5" />
        <rect x="-5" y="-22" width="10" height="2" fill="#CE1126" />
      </g>
    </svg>
  );
}

function FujairahSkylineSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="120" fill="#E6F3FA" opacity="0.5" />
      {/* Sun */}
      <circle cx="50" cy="40" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Hajar mountains backdrop (Fujairah is mountainous) */}
      <path d="M 0 130 L 40 60 L 90 100 L 140 50 L 200 100 L 240 80 L 240 240 L 0 240 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Mountain shadows */}
      <path d="M 90 100 L 140 50 L 120 80 Z" fill="#5C4510" opacity="0.5" />

      {/* City buildings */}
      <g fill="#A8B8C8" stroke={STROKE} strokeWidth="1.2">
        <rect x="20" y="170" width="14" height="40" />
        <rect x="36" y="155" width="18" height="55" />
        <rect x="56" y="165" width="14" height="45" />
        <rect x="72" y="145" width="20" height="65" />
        <rect x="94" y="160" width="14" height="50" />
        <rect x="180" y="170" width="14" height="40" />
        <rect x="196" y="155" width="16" height="55" />
        <rect x="214" y="165" width="14" height="45" />
      </g>

      {/* Fujairah Fort */}
      <g transform="translate(135 158)">
        <rect x="-20" y="0" width="40" height="35" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
        <g fill="#D4AF37" stroke={STROKE} strokeWidth="1">
          <rect x="-20" y="-6" width="6" height="6" />
          <rect x="-10" y="-6" width="6" height="6" />
          <rect x="0" y="-6" width="6" height="6" />
          <rect x="10" y="-6" width="6" height="6" />
        </g>
        <rect x="-22" y="-12" width="10" height="20" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
        <rect x="14" y="-12" width="10" height="20" fill="#E8C879" stroke={STROKE} strokeWidth={STROKE_W} />
        <path d="M -3 35 L -3 22 Q -3 18 0 18 Q 3 18 3 22 L 3 35 Z" fill="#1A1A2E" />
      </g>

      {/* Sea (Gulf of Oman, turquoise) */}
      <rect y="210" width="240" height="30" fill="#22D3EE" />
      <path d="M 0 210 Q 60 207 120 210 Q 180 213 240 210 L 240 218 Q 180 216 120 218 Q 60 220 0 218 Z" fill="#0E8C6B" />

      {/* Tiny boat */}
      <g transform="translate(200 225)">
        <path d="M -10 0 Q -7 4 0 4 Q 7 4 10 0 Z" fill="#5C4510" stroke={STROKE} strokeWidth="1" />
        <line x1="0" y1="0" x2="0" y2="-10" stroke="#5C4510" strokeWidth="1" />
        <path d="M 0 -10 L 8 0 L 0 0 Z" fill="white" stroke={STROKE} strokeWidth="1" />
      </g>
    </svg>
  );
}

/* ===================================================================
   SPACE — Sun & Earth/Moon step extras
   =================================================================== */

function SunRaysSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#FFE9A8" opacity="0.5" />
      {/* Big sun with very dramatic rays */}
      <g>
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const long = i % 2 === 0;
          const r1 = 50;
          const r2 = long ? 105 : 80;
          const x1 = 120 + Math.cos(a) * r1;
          const y1 = 120 + Math.sin(a) * r1;
          const x2 = 120 + Math.cos(a) * r2;
          const y2 = 120 + Math.sin(a) * r2;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#FCD34D"
              strokeWidth={long ? 5 : 3}
              strokeLinecap="round"
              opacity={long ? 0.85 : 0.55}
            />
          );
        })}
      </g>
      <circle cx="120" cy="120" r="50" fill="#F97316" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Smile */}
      <circle cx="108" cy="115" r="3" fill={STROKE} />
      <circle cx="132" cy="115" r="3" fill={STROKE} />
      <path d="M 105 130 Q 120 142 135 130" fill="none" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function SunCoronaSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Black space background */}
      {/* Sun corona — wispy outer atmosphere */}
      <g fill="#FCD34D" opacity="0.4">
        <ellipse cx="120" cy="120" rx="100" ry="80" />
      </g>
      <g fill="#F97316" opacity="0.6">
        <ellipse cx="120" cy="120" rx="80" ry="70" />
      </g>
      {/* Solar flares */}
      <g fill="#F97316" opacity="0.85">
        <path d="M 60 100 Q 50 80 75 75 Q 70 95 80 110 Z" />
        <path d="M 175 90 Q 195 75 200 100 Q 180 100 170 115 Z" />
        <path d="M 70 170 Q 50 175 55 195 Q 75 180 90 175 Z" />
      </g>
      {/* Sun body */}
      <circle cx="120" cy="120" r="48" fill="#F97316" stroke="#9A3412" strokeWidth={STROKE_W} />
      {/* Surface texture (granulation) */}
      <g fill="#FCD34D" opacity="0.7">
        <circle cx="105" cy="105" r="4" />
        <circle cx="125" cy="115" r="3" />
        <circle cx="115" cy="135" r="4" />
        <circle cx="138" cy="125" r="3" />
        <circle cx="100" cy="130" r="3" />
      </g>
      {/* Sunspots */}
      <g fill="#7A2E07">
        <circle cx="115" cy="120" r="3" />
        <circle cx="135" cy="135" r="2" />
      </g>
    </svg>
  );
}

// Pre-rounded ray endpoints for the SunVsEarth sticker (centered at 150,120)
const SVE_SUN_RAYS = Array.from({ length: 12 }).map((_, i) => {
  const a = (i / 12) * Math.PI * 2;
  return {
    x1: r3(150 + Math.cos(a) * 78),
    y1: r3(120 + Math.sin(a) * 78),
    x2: r3(150 + Math.cos(a) * 92),
    y2: r3(120 + Math.sin(a) * 92),
  };
});

function SunVsEarthSizeSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Big sun on the right — sized to FIT inside the tile (no clipping) */}
      <g>
        {SVE_SUN_RAYS.map((p, i) => (
          <line
            key={i}
            x1={p.x1}
            y1={p.y1}
            x2={p.x2}
            y2={p.y2}
            stroke="#F59E0B"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.85"
          />
        ))}
        <circle cx="150" cy="120" r="70" fill="#F97316" stroke="#9A3412" strokeWidth={STROKE_W} />
        {/* hot upper-left highlight for volume */}
        <ellipse cx="132" cy="100" rx="28" ry="18" fill="#FFE9A8" opacity="0.55" />
      </g>
      {/* Tiny earth on the left — emphasizes the size difference */}
      <g>
        <circle cx="36" cy="122" r="11" fill="#3B82F6" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="32" cy="118" rx="5" ry="3" fill="#7AC4FF" opacity="0.6" />
        <path d="M 28 119 Q 34 117 40 121 Q 36 126 30 124 Z" fill="#22C55E" stroke={STROKE} strokeWidth="1" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function SunlightTravelSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sun (left) */}
      <circle cx="40" cy="120" r="28" fill="#F97316" stroke="#9A3412" strokeWidth={STROKE_W} />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x1 = 40 + Math.cos(a) * 31;
        const y1 = 120 + Math.sin(a) * 31;
        const x2 = 40 + Math.cos(a) * 40;
        const y2 = 120 + Math.sin(a) * 40;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />;
      })}
      {/* Earth (right) */}
      <circle cx="200" cy="120" r="20" fill="#7AC4FF" stroke={STROKE} strokeWidth={STROKE_W} />
      <path d="M 192 118 Q 198 115 204 119 Q 210 122 207 125 Q 198 124 192 122 Z" fill="#16A34A" />

      {/* Light beam traveling */}
      <g stroke="#FCD34D" strokeWidth="3" fill="none" opacity="0.85">
        <line x1="68" y1="120" x2="180" y2="120" strokeDasharray="6 4" />
      </g>
      {/* Photons (zigzag emphasis) */}
      <g fill="#FCD34D" stroke={STROKE} strokeWidth="0.6">
        <circle cx="90" cy="118" r="3" />
        <circle cx="120" cy="120" r="3" />
        <circle cx="150" cy="122" r="3" />
      </g>
      {/* Speed lines */}
      <g stroke="#FCD34D" strokeWidth="1" opacity="0.6">
        <line x1="105" y1="105" x2="115" y2="105" />
        <line x1="135" y1="135" x2="145" y2="135" />
        <line x1="160" y1="105" x2="170" y2="105" />
      </g>
    </svg>
  );
}

function PlantPhotosynthesisSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#E6F3FA" opacity="0.4" />
      {/* Sun */}
      <circle cx="200" cy="50" r="20" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Sun rays going to plant */}
      <g stroke="#FCD34D" strokeWidth="2" opacity="0.7">
        <line x1="185" y1="55" x2="135" y2="120" strokeLinecap="round" />
        <line x1="190" y1="65" x2="140" y2="125" strokeLinecap="round" />
        <line x1="195" y1="75" x2="145" y2="130" strokeLinecap="round" />
      </g>

      {/* Plant in a pot */}
      <g transform="translate(120 200)">
        {/* Pot */}
        <path d="M -30 0 L 30 0 L 24 30 L -24 30 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        {/* Soil */}
        <ellipse cx="0" cy="0" rx="30" ry="5" fill="#5C4510" />
        {/* Stem */}
        <line x1="0" y1="0" x2="0" y2="-50" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
        {/* Leaves */}
        <ellipse cx="-10" cy="-20" rx="14" ry="6" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} transform="rotate(-30 -10 -20)" />
        <ellipse cx="10" cy="-30" rx="14" ry="6" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} transform="rotate(30 10 -30)" />
        <ellipse cx="-10" cy="-40" rx="12" ry="5" fill="#16A34A" stroke={STROKE} strokeWidth={STROKE_W} transform="rotate(-30 -10 -40)" />
        {/* Top flower */}
        <circle cx="0" cy="-55" r="6" fill="#F97316" stroke={STROKE} strokeWidth="1.5" />
        <circle cx="0" cy="-55" r="2" fill="#FCD34D" />
      </g>

      {/* Heart icon (loves the sun) */}
      <g transform="translate(160 130)">
        <path d="M 0 8 C -8 4, -10 -4, -5 -4 C -2 -4, 0 -1, 0 1 C 0 -1, 2 -4, 5 -4 C 10 -4, 8 4, 0 8 Z" fill="#CE1126" stroke={STROKE} strokeWidth="1.2" />
      </g>
    </svg>
  );
}

function SunTemperatureSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#FFE9A8" opacity="0.5" />
      {/* Big hot sun */}
      <circle cx="120" cy="100" r="50" fill="#F97316" stroke="#9A3412" strokeWidth={STROKE_W} />
      {/* Heat-wave squiggles around the sun */}
      <g stroke="#9A3412" strokeWidth="2" fill="none" opacity="0.7">
        <path d="M 80 70 Q 85 65 90 70 Q 95 65 100 70" />
        <path d="M 140 60 Q 145 55 150 60 Q 155 55 160 60" />
        <path d="M 60 110 Q 65 105 70 110 Q 75 105 80 110" />
        <path d="M 160 130 Q 165 125 170 130 Q 175 125 180 130" />
      </g>
      {/* Sweating face on sun */}
      <circle cx="108" cy="95" r="3" fill={STROKE} />
      <circle cx="132" cy="95" r="3" fill={STROKE} />
      <path d="M 105 110 Q 120 118 135 110" stroke={STROKE} strokeWidth="2" fill="none" />
      {/* Sweat drops */}
      <path d="M 92 105 Q 88 113 92 117 Q 96 113 92 105 Z" fill="#5AAFE6" stroke={STROKE} strokeWidth="1" />
      {/* Big thermometer on the right */}
      <g transform="translate(195 130)">
        <rect x="-6" y="-50" width="12" height="80" rx="6" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="0" cy="35" r="14" fill="#CE1126" stroke={STROKE} strokeWidth={STROKE_W} />
        <rect x="-4" y="-10" width="8" height="44" fill="#CE1126" />
        {/* Temperature marks */}
        <g stroke={STROKE} strokeWidth="1">
          <line x1="-6" y1="-30" x2="-1" y2="-30" />
          <line x1="-6" y1="-10" x2="-1" y2="-10" />
          <line x1="-6" y1="10" x2="-1" y2="10" />
        </g>
      </g>
    </svg>
  );
}

function EarthWaterSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Big blue Earth filling the tile */}
      <circle cx="120" cy="120" r="100" fill="#3B82F6" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Day-side highlight */}
      <ellipse cx="98" cy="96" rx="38" ry="26" fill="#7AC4FF" opacity="0.5" />
      {/* Ocean swell bands */}
      <g fill="#5AAFE6" opacity="0.55">
        <ellipse cx="92" cy="78" rx="28" ry="10" />
        <ellipse cx="160" cy="135" rx="32" ry="12" />
        <ellipse cx="80" cy="170" rx="22" ry="8" />
      </g>
      {/* Wave ripple lines */}
      <g stroke="#1E40AF" strokeWidth="2" fill="none" opacity="0.35" strokeLinecap="round">
        <path d="M 50 100 Q 65 96 80 100" />
        <path d="M 150 70 Q 165 66 180 70" />
        <path d="M 60 175 Q 75 171 90 175" />
        <path d="M 145 195 Q 160 191 175 195" />
      </g>
      {/* Three chunky green continents */}
      <g fill="#22C55E" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round">
        <path d="M 60 95 Q 80 80 105 88 Q 118 100 110 118 Q 95 130 78 122 Q 60 115 60 95 Z" />
        <path d="M 130 110 Q 158 102 172 120 Q 178 138 162 152 Q 142 156 132 142 Q 122 124 130 110 Z" />
        <path d="M 95 165 Q 118 158 138 170 Q 142 185 122 192 Q 102 188 92 178 Z" />
      </g>
      {/* Subtle continent shading */}
      <g fill="#16A34A" opacity="0.55">
        <path d="M 70 110 Q 85 105 95 115 Q 88 122 76 118 Z" />
        <path d="M 145 128 Q 160 122 168 134 Q 158 144 146 138 Z" />
      </g>
    </svg>
  );
}

function EarthRotationSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="40" cy="40" r="1.5" />
        <circle cx="200" cy="50" r="1.2" />
        <circle cx="180" cy="200" r="1" />
      </g>
      {/* Earth */}
      <circle cx="120" cy="120" r="60" fill="#7AC4FF" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Continents */}
      <g fill="#16A34A" stroke={STROKE} strokeWidth="1">
        <path d="M 90 100 Q 110 90 125 100 Q 120 115 100 115 Z" />
        <path d="M 130 130 Q 145 125 150 140 Q 140 150 125 145 Z" />
      </g>
      {/* Rotation axis line (tilted) */}
      <line x1="100" y1="55" x2="140" y2="185" stroke="#CE1126" strokeWidth="2" strokeDasharray="4 3" />
      {/* Rotation arrows around the equator */}
      <g stroke="#FCD34D" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M 50 120 Q 60 105 80 105" />
        <path d="M 75 100 L 80 105 L 75 110" />
        <path d="M 190 120 Q 180 135 160 135" />
        <path d="M 165 130 L 160 135 L 165 140" />
      </g>
    </svg>
  );
}

function MoonOrbitSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="30" cy="30" r="1.2" />
        <circle cx="210" cy="200" r="1" />
        <circle cx="200" cy="40" r="1.5" />
      </g>
      {/* Earth in center */}
      <circle cx="120" cy="120" r="40" fill="#7AC4FF" stroke={STROKE} strokeWidth={STROKE_W} />
      <path d="M 105 110 Q 120 100 135 115 Q 130 130 110 125 Z" fill="#16A34A" />
      {/* Orbit ellipse */}
      <ellipse cx="120" cy="120" rx="95" ry="55" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="5 4" opacity="0.7" />
      {/* Moon on orbit */}
      <g transform="translate(195 130)">
        <circle cx="0" cy="0" r="14" fill="#E5E1D2" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="-3" cy="-2" r="2" fill="#A8A48F" />
        <circle cx="3" cy="3" r="1.5" fill="#A8A48F" />
      </g>
      {/* Direction arrow */}
      <g stroke="#FCD34D" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M 200 100 Q 215 110 215 130" />
        <path d="M 213 125 L 215 130 L 218 124" />
      </g>
    </svg>
  );
}

function MoonReflectSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="40" cy="40" r="1.5" />
        <circle cx="200" cy="40" r="1.2" />
      </g>
      {/* Sun on the left */}
      <circle cx="40" cy="120" r="22" fill="#F97316" stroke="#9A3412" strokeWidth={STROKE_W} />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const x1 = 40 + Math.cos(a) * 24;
        const y1 = 120 + Math.sin(a) * 24;
        const x2 = 40 + Math.cos(a) * 32;
        const y2 = 120 + Math.sin(a) * 32;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />;
      })}
      {/* Light traveling to the moon */}
      <g stroke="#FCD34D" strokeWidth="2.5" fill="none" opacity="0.7" strokeDasharray="4 3">
        <line x1="62" y1="120" x2="180" y2="120" />
      </g>
      {/* Moon (right) — partly lit */}
      <g transform="translate(195 120)">
        <circle r="22" fill="#E5E1D2" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Dark side */}
        <path d="M 0 -22 A 22 22 0 0 1 0 22 Z" fill="#5C4510" opacity="0.55" />
        {/* Craters */}
        <circle cx="-6" cy="-4" r="2" fill="#A8A48F" />
        <circle cx="-2" cy="6" r="1.5" fill="#A8A48F" />
      </g>
      {/* Light reflecting back as well (faded line) */}
      <g stroke="#FFFCEF" strokeWidth="1.5" fill="none" opacity="0.45" strokeDasharray="3 3">
        <line x1="180" y1="130" x2="62" y2="130" />
      </g>
    </svg>
  );
}

function TidesSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky */}
      <rect width="240" height="120" fill="#0F2A4A" />
      {/* Moon */}
      <g transform="translate(180 50)">
        <circle r="20" fill="#E5E1D2" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="-5" cy="-3" r="2.5" fill="#A8A48F" />
        <circle cx="3" cy="5" r="1.8" fill="#A8A48F" />
      </g>
      {/* Earth water bulge under the moon */}
      <ellipse cx="120" cy="160" rx="115" ry="40" fill="#3F8AB8" stroke={STROKE} strokeWidth={STROKE_W} />
      <path d="M 0 160 Q 30 150 60 158 Q 90 145 120 130 Q 150 145 180 158 Q 210 150 240 160" stroke="#5AAFE6" strokeWidth="3" fill="none" />
      {/* Beach */}
      <path d="M 0 200 Q 60 195 120 200 Q 180 205 240 200 L 240 240 L 0 240 Z" fill="#FCD7AB" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Wet sand line where the tide is */}
      <path d="M 0 220 Q 60 215 120 220 Q 180 225 240 220" stroke="#5AAFE6" strokeWidth="2" fill="none" opacity="0.7" />
      {/* Arrow showing pull from moon */}
      <g stroke="#FCD34D" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <line x1="170" y1="65" x2="135" y2="125" />
        <path d="M 138 121 L 135 125 L 140 127" />
      </g>
    </svg>
  );
}

function MoonCycleSticker() {
  // Eight phases arranged in a circle. Each phase is two arcs (proper
  // crescent/gibbous geometry, not overlay-ellipse hacks). LIT is a
  // soft moon-grey so it pops on the cream tile; DARK is navy.
  const LIT = "#E8E2D0";
  const DARK = "#1A1A2E";
  const R = 18;
  /* lit = how far the bright side reaches across the disc:
       0   -> new (all dark)
       0.4 -> crescent
       1   -> half (quarter)
       1.6 -> gibbous
       2   -> full */
  function phasePath(lit: number, side: "left" | "right") {
    if (lit <= 0) return null;
    if (lit >= 2) return <circle r={R} fill={LIT} stroke={DARK} strokeWidth={2} />;
    const innerRx = R * (lit - 1);
    const sweep = side === "right" ? 1 : 0;
    const innerSweep = side === "right" ? 0 : 1;
    const d = `M 0 -${R} A ${R} ${R} 0 0 ${sweep} 0 ${R} A ${Math.abs(innerRx)} ${R} 0 0 ${innerSweep} 0 -${R} Z`;
    return <path d={d} fill={LIT} stroke={DARK} strokeWidth={1.2} />;
  }
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {[
        { x: 120, y: 36, lit: 0,   side: "right" as const },  // new
        { x: 188, y: 70, lit: 0.4, side: "right" as const },  // waxing crescent
        { x: 210, y: 130, lit: 1,  side: "right" as const },  // first quarter
        { x: 188, y: 190, lit: 1.6, side: "right" as const }, // waxing gibbous
        { x: 120, y: 220, lit: 2,  side: "right" as const },  // full
        { x: 52, y: 190, lit: 1.6, side: "left" as const },   // waning gibbous
        { x: 30, y: 130, lit: 1,   side: "left" as const },   // third quarter
        { x: 52, y: 70, lit: 0.4,  side: "left" as const },   // waning crescent
      ].map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y})`}>
          {/* Base disc — full circle outline so even "new" reads as a moon */}
          <circle r={R} fill={DARK} stroke={DARK} strokeWidth={2} />
          {phasePath(p.lit, p.side)}
        </g>
      ))}
      {/* Direction arrow */}
      <g stroke="#B8862E" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M 150 50 Q 175 60 192 80" />
        <path d="M 188 75 L 192 80 L 196 73" />
      </g>
    </svg>
  );
}

function EarthFromSpaceSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="30" cy="30" r="1.5" />
        <circle cx="210" cy="40" r="1.2" />
        <circle cx="40" cy="200" r="1" />
        <circle cx="200" cy="210" r="1.5" />
      </g>
      {/* Earth — full disc with continents and clouds */}
      <circle cx="120" cy="120" r="80" fill="#3B82F6" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Continents */}
      <g fill="#16A34A" stroke={STROKE} strokeWidth="1.2">
        <path d="M 80 90 Q 105 80 130 95 Q 125 115 100 120 Q 85 110 80 90 Z" />
        <path d="M 100 130 Q 115 125 125 140 Q 115 150 100 145 Z" />
        <path d="M 140 110 Q 165 100 180 115 Q 175 135 160 135 Q 145 125 140 110 Z" />
        <path d="M 145 150 Q 160 145 170 155 Q 165 165 150 162 Z" />
      </g>
      {/* Cloud whorls */}
      <g fill="white" opacity="0.55">
        <ellipse cx="115" cy="85" rx="24" ry="6" />
        <ellipse cx="100" cy="150" rx="20" ry="5" />
        <ellipse cx="155" cy="170" rx="22" ry="6" />
      </g>
      {/* Atmospheric glow */}
      <circle cx="120" cy="120" r="80" fill="none" stroke="#7AC4FF" strokeWidth="3" opacity="0.5" />
      <circle cx="120" cy="120" r="83" fill="none" stroke="#7AC4FF" strokeWidth="2" opacity="0.3" />
    </svg>
  );
}

function EarthNightSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="30" cy="30" r="1.5" />
        <circle cx="210" cy="200" r="1.2" />
      </g>
      {/* Earth at night — dark side with city lights */}
      <circle cx="120" cy="120" r="80" fill="#1A1A2E" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Atmosphere glow */}
      <circle cx="120" cy="120" r="80" fill="none" stroke="#5AAFE6" strokeWidth="3" opacity="0.4" />
      {/* Continent silhouettes (very dark) */}
      <g fill="#0A0F1F" stroke="none">
        <path d="M 80 90 Q 105 80 130 95 Q 125 115 100 120 Q 85 110 80 90 Z" />
        <path d="M 140 110 Q 165 100 180 115 Q 175 135 160 135 Q 145 125 140 110 Z" />
      </g>
      {/* City light constellations */}
      <g fill="#FCD34D">
        <circle cx="90" cy="100" r="1.5" />
        <circle cx="100" cy="105" r="1" />
        <circle cx="105" cy="100" r="1.5" />
        <circle cx="115" cy="108" r="1" />
        <circle cx="155" cy="115" r="1.5" />
        <circle cx="160" cy="120" r="1" />
        <circle cx="165" cy="118" r="1.5" />
        <circle cx="170" cy="125" r="1" />
        <circle cx="148" cy="155" r="1.5" />
        <circle cx="155" cy="160" r="1" />
        <circle cx="115" cy="145" r="1" />
        <circle cx="105" cy="155" r="1.5" />
      </g>
      {/* Glow halos around city clusters */}
      <g fill="#FCD34D" opacity="0.3">
        <circle cx="105" cy="105" r="8" />
        <circle cx="160" cy="120" r="9" />
      </g>
    </svg>
  );
}

/* ===================================================================
   SPACE — Inner Planets (L3) step extras
   =================================================================== */

function MercuryCratersSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="40" cy="40" r="1.2" />
        <circle cx="200" cy="40" r="1.5" />
      </g>
      {/* Mercury — heavily cratered */}
      <circle cx="120" cy="120" r="78" fill="#9CA3AF" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Many craters */}
      <g fill="#5C5544" stroke={STROKE} strokeWidth="1">
        <circle cx="90" cy="90" r="14" />
        <circle cx="140" cy="100" r="9" />
        <circle cx="105" cy="135" r="11" />
        <circle cx="155" cy="135" r="7" />
        <circle cx="80" cy="155" r="9" />
        <circle cx="135" cy="170" r="6" />
        <circle cx="115" cy="160" r="5" />
        <circle cx="160" cy="80" r="6" />
        <circle cx="75" cy="120" r="6" />
      </g>
      {/* Crater highlights (lighter rim) */}
      <g fill="#D6D3D1" opacity="0.6">
        <ellipse cx="89" cy="86" rx="7" ry="3" />
        <ellipse cx="138" cy="98" rx="5" ry="2" />
        <ellipse cx="103" cy="131" rx="6" ry="3" />
      </g>
    </svg>
  );
}

function MercuryFastSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="40" cy="40" r="1.2" />
        <circle cx="200" cy="200" r="1" />
      </g>
      {/* Sun (left) */}
      <circle cx="50" cy="120" r="22" fill="#F97316" stroke="#9A3412" strokeWidth={STROKE_W} />
      {/* Mercury orbit */}
      <ellipse cx="50" cy="120" rx="120" ry="42" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 3" opacity="0.7" />
      {/* Mercury — small grey planet zooming */}
      <g transform="translate(155 130) rotate(15)">
        <circle r="14" fill="#9CA3AF" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="-3" cy="-2" r="2" fill="#5C5544" />
        <circle cx="3" cy="3" r="1.5" fill="#5C5544" />
      </g>
      {/* Speed lines */}
      <g stroke="#FCD34D" strokeWidth="2" opacity="0.7" strokeLinecap="round">
        <line x1="125" y1="125" x2="100" y2="125" />
        <line x1="120" y1="135" x2="95" y2="135" />
        <line x1="125" y1="145" x2="100" y2="145" />
      </g>
    </svg>
  );
}

function VenusCloudsSticker() {
  // Venus with proper horizontal atmospheric cloud bands.
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* warm halo */}
      <circle cx="120" cy="120" r="100" fill="#FCD981" opacity="0.35" />
      {/* Venus body */}
      <circle cx="120" cy="120" r="78" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Lit highlight upper-left */}
      <ellipse cx="98" cy="98" rx="36" ry="22" fill="#FFE9A8" opacity="0.55" />
      {/* Cloud bands — gentle horizontal strokes following the planet curve */}
      <g stroke="#B8862E" strokeWidth="3" fill="none" opacity="0.7" strokeLinecap="round">
        <path d="M 50 80 Q 120 72 190 80" />
        <path d="M 46 100 Q 120 92 194 100" />
        <path d="M 44 120 Q 120 112 196 120" />
        <path d="M 46 140 Q 120 132 194 140" />
        <path d="M 50 160 Q 120 152 190 160" />
      </g>
      {/* Subtle warm shading on the bottom */}
      <path
        d="M 60 138 Q 120 196 180 138 Q 178 162 156 178 Q 120 192 84 178 Q 62 162 60 138 Z"
        fill="#D97706"
        opacity="0.25"
      />
    </svg>
  );
}

function VenusHotSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="200" cy="40" r="1.5" />
      </g>
      {/* Venus body */}
      <circle cx="100" cy="120" r="55" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      <g fill="#FDE68A" stroke="#B8862E" strokeWidth="1.2">
        <ellipse cx="80" cy="105" rx="32" ry="6" />
        <ellipse cx="115" cy="135" rx="34" ry="7" />
      </g>
      {/* Heat squiggles */}
      <g stroke="#F97316" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M 50 85 Q 55 80 60 85 Q 65 80 70 85" />
        <path d="M 130 75 Q 135 70 140 75 Q 145 70 150 75" />
        <path d="M 35 130 Q 40 125 45 130 Q 50 125 55 130" />
      </g>
      {/* Big thermometer (right) */}
      <g transform="translate(190 130)">
        <rect x="-7" y="-55" width="14" height="85" rx="7" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="0" cy="35" r="16" fill="#CE1126" stroke={STROKE} strokeWidth={STROKE_W} />
        <rect x="-5" y="-30" width="10" height="65" fill="#CE1126" />
      </g>
    </svg>
  );
}

function MarsRoverSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Mars sky (orange) */}
      <rect width="240" height="180" fill="#9A3412" opacity="0.5" />
      {/* Sun */}
      <circle cx="200" cy="40" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} opacity="0.85" />
      {/* Distant mountain */}
      <path d="M 0 180 L 60 120 L 120 160 L 200 110 L 240 175 L 240 200 L 0 200 Z" fill="#7F1D1D" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Mars surface */}
      <rect y="180" width="240" height="60" fill="#EF4444" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Rocks scattered */}
      <g fill="#5C2410" stroke={STROKE} strokeWidth="1">
        <ellipse cx="40" cy="200" rx="6" ry="3" />
        <ellipse cx="150" cy="210" rx="8" ry="4" />
        <ellipse cx="200" cy="195" rx="5" ry="3" />
      </g>

      {/* Mars rover */}
      <g transform="translate(120 175)">
        {/* 6 wheels */}
        <g fill="#1A1A2E" stroke={STROKE} strokeWidth="1.5">
          <circle cx="-30" cy="22" r="8" />
          <circle cx="-10" cy="22" r="8" />
          <circle cx="10" cy="22" r="8" />
          <circle cx="30" cy="22" r="8" />
        </g>
        {/* Rover body */}
        <rect x="-32" y="0" width="64" height="20" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Top platform */}
        <rect x="-22" y="-10" width="44" height="12" fill="#9CA3AF" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Camera mast */}
        <line x1="0" y1="-10" x2="0" y2="-30" stroke="#9CA3AF" strokeWidth="3" />
        <rect x="-5" y="-35" width="10" height="8" fill="#3B82F6" stroke={STROKE} strokeWidth="1.2" />
        <circle cx="-2" cy="-31" r="1.5" fill={STROKE} />
        <circle cx="2" cy="-31" r="1.5" fill={STROKE} />
        {/* Solar panels */}
        <rect x="-32" y="-4" width="14" height="6" fill="#3B82F6" stroke={STROKE} strokeWidth="1" />
        <rect x="18" y="-4" width="14" height="6" fill="#3B82F6" stroke={STROKE} strokeWidth="1" />
        {/* Antenna */}
        <line x1="-22" y1="-10" x2="-25" y2="-22" stroke={STROKE} strokeWidth="1.5" />
        <circle cx="-25" cy="-23" r="2" fill="#FCD34D" stroke={STROKE} strokeWidth="1" />
      </g>
    </svg>
  );
}

function MarsPolesSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="40" cy="40" r="1.5" />
      </g>
      {/* Mars body */}
      <circle cx="120" cy="120" r="78" fill="#EF4444" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* North polar ice cap */}
      <path d="M 70 60 Q 95 45 120 50 Q 145 45 170 60 Q 145 75 120 75 Q 95 75 70 60 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* South polar ice cap */}
      <path d="M 70 180 Q 95 195 120 195 Q 145 195 170 180 Q 145 175 120 170 Q 95 170 70 180 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Surface markings */}
      <ellipse cx="100" cy="120" rx="14" ry="9" fill="#7F1D1D" opacity="0.6" />
      <ellipse cx="135" cy="135" rx="12" ry="7" fill="#7F1D1D" opacity="0.6" />
      <ellipse cx="120" cy="105" rx="10" ry="5" fill="#7F1D1D" opacity="0.6" />
      {/* Annotation arrows */}
      <g stroke="#FCD34D" strokeWidth="1.5" fill="none">
        <line x1="200" y1="60" x2="170" y2="60" />
        <line x1="200" y1="180" x2="170" y2="180" />
      </g>
      {/* Labels */}
      <g fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="white">

</g>
    </svg>
  );
}

function MarsCanyonSticker() {
  // Big Mars planet with a clear horizontal canyon scar (Valles Marineris).
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="100" fill="#EF4444" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Lit highlight upper-left */}
      <ellipse cx="92" cy="92" rx="36" ry="24" fill="#F87171" opacity="0.55" />
      {/* Surface marks (asymmetric, no face) */}
      <g fill="#7F1D1D" opacity="0.65">
        <ellipse cx="72" cy="148" rx="20" ry="11" />
        <ellipse cx="160" cy="172" rx="18" ry="10" />
        <ellipse cx="170" cy="80" rx="14" ry="8" />
      </g>
      {/* Valles Marineris — the famous canyon scar */}
      <g stroke="#5C1A0E" strokeWidth="6" fill="none" strokeLinecap="round">
        <path d="M 50 130 Q 120 138 200 130" />
      </g>
      <g stroke="#7F1D1D" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7">
        <path d="M 56 124 Q 120 132 196 124" />
        <path d="M 56 138 Q 120 144 196 138" />
      </g>
      {/* tiny crater hits */}
      <g fill="#7F1D1D" opacity="0.7">
        <circle cx="100" cy="105" r="4" />
        <circle cx="135" cy="155" r="3" />
        <circle cx="58" cy="100" r="3" />
      </g>
    </svg>
  );
}

function InnerOrbitSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="40" cy="40" r="1.5" />
        <circle cx="200" cy="200" r="1.2" />
      </g>
      {/* Sun in center */}
      <circle cx="120" cy="120" r="20" fill="#F97316" stroke="#9A3412" strokeWidth={STROKE_W} />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const x1 = 120 + Math.cos(a) * 22;
        const y1 = 120 + Math.sin(a) * 22;
        const x2 = 120 + Math.cos(a) * 30;
        const y2 = 120 + Math.sin(a) * 30;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />;
      })}
      {/* Mercury orbit */}
      <ellipse cx="120" cy="120" rx="38" ry="20" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* Venus orbit */}
      <ellipse cx="120" cy="120" rx="60" ry="34" fill="none" stroke="#FCD34D" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* Earth orbit */}
      <ellipse cx="120" cy="120" rx="82" ry="48" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* Mars orbit */}
      <ellipse cx="120" cy="120" rx="105" ry="62" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Planets on their orbits */}
      <circle cx="158" cy="120" r="5" fill="#9CA3AF" stroke={STROKE} strokeWidth="1" />
      <circle cx="180" cy="138" r="6" fill="#FCD34D" stroke={STROKE} strokeWidth="1" />
      <circle cx="40" cy="140" r="7" fill="#3B82F6" stroke={STROKE} strokeWidth="1" />
      <circle cx="218" cy="148" r="6" fill="#EF4444" stroke={STROKE} strokeWidth="1" />
    </svg>
  );
}

function RedPlanetCloseupSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#9A3412" opacity="0.4" />
      {/* Close-up Mars surface texture */}
      <g fill="#EF4444" stroke={STROKE} strokeWidth={STROKE_W}>
        <circle cx="120" cy="120" r="100" />
      </g>
      {/* Surface features (zoomed) */}
      <g fill="#7F1D1D">
        <ellipse cx="60" cy="80" rx="16" ry="8" />
        <ellipse cx="160" cy="100" rx="20" ry="10" />
        <ellipse cx="100" cy="160" rx="18" ry="9" />
        <ellipse cx="180" cy="170" rx="14" ry="8" />
        <ellipse cx="60" cy="170" rx="20" ry="12" />
      </g>
      {/* Dust devils */}
      <g stroke="#FCD7AB" strokeWidth="2" fill="none" opacity="0.7">
        <path d="M 130 120 Q 132 130 130 140" />
        <path d="M 80 130 Q 82 140 80 150" />
      </g>
    </svg>
  );
}

function RockyVsGasSticker() {
  // The four rocky planets in a row — Mercury, Venus, Earth, Mars.
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Mercury */}
      <g transform="translate(45 120)">
        <circle r="20" fill="#9CA3AF" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="-5" cy="-5" rx="9" ry="6" fill="#D1D5DB" opacity="0.55" />
        <circle cx="5" cy="6" r="3" fill="#6B7280" opacity="0.65" />
        <circle cx="-7" cy="8" r="2" fill="#6B7280" opacity="0.55" />
      </g>
      {/* Venus */}
      <g transform="translate(95 120)">
        <circle r="24" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="-5" cy="-6" rx="11" ry="7" fill="#FFE9A8" opacity="0.55" />
        <g stroke="#B8862E" strokeWidth="1.5" fill="none" opacity="0.65">
          <path d="M -18 -6 Q 0 -10 18 -6" />
          <path d="M -20 4 Q 0 0 20 4" />
          <path d="M -18 12 Q 0 16 18 12" />
        </g>
      </g>
      {/* Earth */}
      <g transform="translate(150 120)">
        <circle r="26" fill="#3B82F6" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="-7" cy="-7" rx="10" ry="7" fill="#7AC4FF" opacity="0.55" />
        <path d="M -10 -2 Q 0 -8 10 -2 Q 6 8 -4 6 Z" fill="#22C55E" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
        <ellipse cx="6" cy="11" rx="6" ry="2" fill="white" opacity="0.6" />
      </g>
      {/* Mars */}
      <g transform="translate(208 120)">
        <circle r="22" fill="#EF4444" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="-5" cy="-6" rx="9" ry="6" fill="#F87171" opacity="0.55" />
        <ellipse cx="-2" cy="6" rx="6" ry="3" fill="#7F1D1D" opacity="0.6" />
        <circle cx="6" cy="-3" r="2.5" fill="#7F1D1D" opacity="0.55" />
      </g>
      {/* tiny stars */}
      <g fill="#1A1A2E">
        <circle cx="20" cy="40" r="1.8" />
        <circle cx="220" cy="200" r="1.8" />
      </g>
    </svg>
  );
}

/* ===================================================================
   SPACE — Asteroid Belt (L4) step extras
   =================================================================== */

function AsteroidClusterSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="40" cy="40" r="1.5" />
        <circle cx="200" cy="200" r="1.2" />
      </g>
      {/* Several asteroids of different sizes clustered */}
      <g fill="#9CA3AF" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round">
        <path d="M 60 80 L 80 70 L 100 85 L 95 105 L 75 110 Z" />
        <path d="M 130 60 L 155 55 L 175 70 L 180 95 L 165 110 L 140 100 L 130 80 Z" />
        <path d="M 100 130 L 120 125 L 130 140 L 125 158 L 105 160 L 95 145 Z" />
        <path d="M 170 145 L 185 145 L 195 160 L 188 175 L 168 175 L 160 160 Z" />
        <path d="M 50 160 L 65 155 L 75 170 L 65 185 L 50 180 Z" />
      </g>
      {/* Crater pocks on each */}
      <g fill="#5C5544">
        <circle cx="78" cy="92" r="2" />
        <circle cx="155" cy="80" r="2.5" />
        <circle cx="115" cy="142" r="2" />
        <circle cx="180" cy="160" r="2" />
      </g>
    </svg>
  );
}

function AsteroidShapeVarietySticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Three different asteroid shapes labeled */}
      {/* Round */}
      <g transform="translate(60 90)">
        <circle r="28" fill="#9CA3AF" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="-8" cy="-5" r="4" fill="#5C5544" />
        <circle cx="6" cy="6" r="3" fill="#5C5544" />
      </g>
{/* Lumpy potato */}
      <g transform="translate(170 95)">
        <path d="M -25 0 Q -22 -16 -8 -22 Q 8 -28 22 -18 Q 35 -5 28 12 Q 18 28 0 28 Q -18 25 -25 8 Z" fill="#9CA3AF" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <circle cx="-10" cy="-8" r="3.5" fill="#5C5544" />
        <circle cx="8" cy="8" r="3" fill="#5C5544" />
      </g>
{/* Long peanut */}
      <g transform="translate(120 180)">
        <path d="M -40 0 Q -45 -10 -30 -12 Q -10 -10 -5 -3 Q 0 0 5 -3 Q 10 -10 30 -12 Q 45 -10 40 0 Q 45 10 30 12 Q 10 10 5 3 Q 0 0 -5 3 Q -10 10 -30 12 Q -45 10 -40 0 Z" fill="#9CA3AF" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <circle cx="-25" cy="-2" r="3" fill="#5C5544" />
        <circle cx="25" cy="2" r="3" fill="#5C5544" />
      </g>
</svg>
  );
}

function AsteroidCollisionSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="40" cy="200" r="1.5" />
        <circle cx="200" cy="40" r="1.2" />
      </g>
      {/* Two asteroids about to collide */}
      <g transform="translate(70 80)">
        <path d="M -22 0 Q -18 -16 -5 -22 Q 12 -22 22 -10 Q 22 8 12 18 Q -5 22 -18 12 Z" fill="#9CA3AF" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <circle cx="-8" cy="-3" r="3" fill="#5C5544" />
      </g>
      <g transform="translate(170 160)">
        <path d="M -24 0 Q -20 -14 -3 -22 Q 14 -20 22 -8 Q 22 8 12 22 Q -5 24 -18 14 Z" fill="#9CA3AF" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <circle cx="6" cy="3" r="3" fill="#5C5544" />
      </g>

      {/* Sparks at collision point */}
      <g transform="translate(120 120)" fill="#FCD34D" stroke={STROKE} strokeWidth="0.8">
        <path d="M 0 0 L 4 -10 L 8 -2 Z" />
        <path d="M 0 0 L -10 -4 L -2 0 Z" />
        <path d="M 0 0 L 10 4 L 2 0 Z" />
        <path d="M 0 0 L -4 10 L -8 2 Z" />
      </g>
      {/* Boom outline */}
      <g stroke="#F97316" strokeWidth="2" fill="none">
        <circle cx="120" cy="120" r="20" opacity="0.6" />
        <circle cx="120" cy="120" r="30" opacity="0.4" />
      </g>

      {/* Direction arrows */}
      <g stroke="#FCD34D" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <line x1="50" y1="105" x2="100" y2="120" />
        <line x1="190" y1="135" x2="140" y2="120" />
      </g>
    </svg>
  );
}

function BeltFromAboveSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="40" cy="40" r="1.5" />
      </g>
      {/* Sun in center */}
      <circle cx="120" cy="120" r="14" fill="#F97316" stroke="#9A3412" strokeWidth={STROKE_W} />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const x1 = 120 + Math.cos(a) * 16;
        const y1 = 120 + Math.sin(a) * 16;
        const x2 = 120 + Math.cos(a) * 22;
        const y2 = 120 + Math.sin(a) * 22;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" />;
      })}
      {/* Mars orbit */}
      <ellipse cx="120" cy="120" rx="40" ry="22" fill="none" stroke="#EF4444" strokeWidth="1" strokeDasharray="2 3" />
      {/* Mars */}
      <circle cx="160" cy="125" r="5" fill="#EF4444" stroke={STROKE} strokeWidth="1" />
      {/* Asteroid belt — many small dots in a ring */}
      <g fill="#9CA3AF" stroke={STROKE} strokeWidth="0.6">
        {Array.from({ length: 30 }).map((_, i) => {
          const a = (i / 30) * Math.PI * 2 + (i * 0.7);
          const r = 65 + (i % 4) * 4;
          const x = 120 + Math.cos(a) * r;
          const y = 120 + Math.sin(a) * (r * 0.6);
          return <circle key={i} cx={x} cy={y} r={1.5 + (i % 3)} />;
        })}
      </g>
      {/* Jupiter orbit (just outside) */}
      <ellipse cx="120" cy="120" rx="100" ry="58" fill="none" stroke="#FCD34D" strokeWidth="1" strokeDasharray="2 3" />
      <circle cx="220" cy="130" r="8" fill="#FCD34D" stroke={STROKE} strokeWidth="1.2" />
    </svg>
  );
}

function MeteorShowerSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="40" cy="200" r="1.5" />
        <circle cx="200" cy="190" r="1.2" />
      </g>
      {/* Multiple meteors with bright streaks */}
      <g stroke="#FCD34D" strokeWidth="3" fill="none" strokeLinecap="round">
        <line x1="40" y1="40" x2="80" y2="100" />
        <line x1="120" y1="30" x2="155" y2="100" />
        <line x1="200" y1="50" x2="160" y2="130" />
        <line x1="60" y1="70" x2="100" y2="135" />
        <line x1="180" y1="80" x2="140" y2="155" />
      </g>
      {/* Meteor heads (fireballs) */}
      <g fill="#FCD34D" stroke="#F97316" strokeWidth="1.5">
        <circle cx="80" cy="100" r="5" />
        <circle cx="155" cy="100" r="5" />
        <circle cx="160" cy="130" r="4" />
        <circle cx="100" cy="135" r="4" />
        <circle cx="140" cy="155" r="5" />
      </g>
      {/* Inner glow */}
      <g fill="white" opacity="0.85">
        <circle cx="80" cy="100" r="2" />
        <circle cx="155" cy="100" r="2" />
        <circle cx="140" cy="155" r="2" />
      </g>
      {/* Earth at the bottom */}
      <ellipse cx="120" cy="240" rx="120" ry="20" fill="#3B82F6" stroke={STROKE} strokeWidth={STROKE_W} />
    </svg>
  );
}

function DwarfPlanetSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="40" cy="40" r="1.5" />
      </g>
      {/* Dwarf planet — Ceres-like */}
      <circle cx="120" cy="120" r="55" fill="#A8A48F" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Bright spots (Ceres has these) */}
      <g fill="#FFFCEF" stroke={STROKE} strokeWidth="1">
        <circle cx="105" cy="110" r="4" />
        <circle cx="115" cy="115" r="2" />
      </g>
      {/* Surface texture */}
      <g fill="#5C5544" opacity="0.5">
        <ellipse cx="135" cy="135" rx="9" ry="5" />
        <ellipse cx="100" cy="140" rx="7" ry="4" />
      </g>
      {/* Size comparison hint — tiny earth in corner */}
      <g transform="translate(195 60)">
        <circle r="14" fill="#7AC4FF" stroke={STROKE} strokeWidth="1.2" />
        <path d="M -8 -3 Q -3 -6 4 -2 Q 8 0 5 3 Z" fill="#16A34A" stroke={STROKE} strokeWidth="0.8" />
</g>
    </svg>
  );
}

function AsteroidMiningSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="200" cy="200" r="1.2" />
      </g>
      {/* Big asteroid */}
      <path d="M 30 130 Q 30 70 80 50 Q 140 40 180 80 Q 215 110 200 165 Q 165 200 110 195 Q 50 185 30 130 Z" fill="#9CA3AF" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* Crater */}
      <circle cx="80" cy="100" r="12" fill="#5C5544" />

      {/* Mining spaceship landed on the asteroid */}
      <g transform="translate(135 110)">
        <rect x="-14" y="-6" width="28" height="14" rx="2" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Cockpit */}
        <ellipse cx="0" cy="-9" rx="6" ry="4" fill="#67E8F9" stroke={STROKE} strokeWidth="1.5" />
        {/* Mining drill */}
        <line x1="0" y1="8" x2="0" y2="22" stroke={STROKE} strokeWidth="2" />
        <path d="M -3 22 L 3 22 L 0 30 Z" fill="#5C5544" stroke={STROKE} strokeWidth="1.5" />
        {/* Exhaust */}
        <line x1="-12" y1="8" x2="-15" y2="13" stroke="#F97316" strokeWidth="2" />
        <line x1="12" y1="8" x2="15" y2="13" stroke="#F97316" strokeWidth="2" />
      </g>

      {/* Sparks from drilling */}
      <g fill="#FCD34D">
        <circle cx="135" cy="145" r="1.5" />
        <circle cx="130" cy="150" r="1" />
        <circle cx="140" cy="152" r="1" />
      </g>

      {/* Diamond / gold ore floating up */}
      <g transform="translate(80 70)">
        <path d="M 0 0 L 4 -6 L -4 -6 Z" fill="#FCD34D" stroke={STROKE} strokeWidth="1.2" />
      </g>
      <g transform="translate(170 60)">
        <path d="M 0 0 L 5 -7 L -5 -7 Z" fill="#67E8F9" stroke={STROKE} strokeWidth="1.2" />
      </g>
    </svg>
  );
}

function BeltPositionSticker() {
  // Mars on the left, dense asteroid belt in the middle, Jupiter on the right.
  // No clipped Sun — the headline only mentions Mars and Jupiter.
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Mars — bigger, with polar look removed and surface detail */}
      <g transform="translate(40 120)">
        <circle r="22" fill="#EF4444" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="-6" cy="-7" rx="10" ry="7" fill="#F87171" opacity="0.55" />
        <circle cx="6" cy="4" r="3" fill="#7F1D1D" opacity="0.6" />
        <circle cx="-4" cy="8" r="2.5" fill="#7F1D1D" opacity="0.55" />
      </g>

      {/* Asteroid belt — denser cluster between the planets */}
      <g fill="#78716C" stroke={STROKE} strokeWidth="0.6">
        {Array.from({ length: 28 }).map((_, i) => {
          const col = i % 7;
          const row = Math.floor(i / 7);
          const x = 78 + col * 12 + (i % 3) * 2;
          const y = 100 + row * 10 + (i % 2) * 4;
          const r = 1.6 + (i % 3) * 1.1;
          return <circle key={i} cx={x} cy={y} r={r} />;
        })}
      </g>

      {/* Jupiter — bigger, banded with red spot */}
      <g transform="translate(200 120)">
        <circle r="28" fill="#E8C547" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="-4" cy="-8" rx="14" ry="7" fill="#FFE9A8" opacity="0.55" />
        <g stroke="#B8862E" strokeWidth="2" fill="none" opacity="0.7">
          <path d="M -24 -8 Q 0 -12 24 -8" />
          <path d="M -26 0 Q 0 -4 26 0" />
          <path d="M -24 8 Q 0 12 24 8" />
        </g>
        <ellipse cx="2" cy="6" rx="6" ry="3" fill="#DC2626" stroke={STROKE} strokeWidth="1" />
      </g>
    </svg>
  );
}

function CometTailSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="40" cy="40" r="1.5" />
        <circle cx="200" cy="200" r="1.2" />
      </g>
      {/* Sun in corner */}
      <circle cx="220" cy="40" r="14" fill="#F97316" stroke="#9A3412" strokeWidth={STROKE_W} />
      {/* Comet head */}
      <g transform="translate(80 130)">
        <circle r="14" fill="#67E8F9" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle r="9" fill="white" opacity="0.85" />
        {/* Coma (fuzzy halo) */}
        <circle r="22" fill="#67E8F9" opacity="0.35" />
      </g>
      {/* Long sweeping tail (away from sun) */}
      <g fill="#67E8F9" opacity="0.6">
        <path d="M 70 130 L 30 110 L 10 105 L 5 130 L 25 145 L 60 135 Z" />
      </g>
      <g fill="white" opacity="0.45">
        <path d="M 70 130 L 35 120 L 20 115 L 30 140 L 55 138 Z" />
      </g>
      {/* Ion tail (thin straight) */}
      <g stroke="#FCD34D" strokeWidth="2" fill="none" opacity="0.6">
        <line x1="70" y1="125" x2="20" y2="80" />
        <line x1="70" y1="135" x2="25" y2="90" />
      </g>
    </svg>
  );
}

function SpaceRockSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="40" cy="40" r="1.5" />
        <circle cx="200" cy="200" r="1.2" />
      </g>
      {/* One huge dramatic asteroid — close-up */}
      <path
        d="M 40 120 Q 35 80 60 55 Q 90 35 130 40 Q 175 50 195 90 Q 210 130 195 170 Q 170 200 130 200 Q 80 200 50 175 Q 30 150 40 120 Z"
        fill="#9CA3AF"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Multiple craters */}
      <g fill="#5C5544" stroke={STROKE} strokeWidth="1.2">
        <circle cx="90" cy="90" r="14" />
        <circle cx="150" cy="100" r="9" />
        <circle cx="105" cy="140" r="11" />
        <circle cx="160" cy="155" r="8" />
        <circle cx="75" cy="160" r="6" />
      </g>
      {/* Crater rim highlights */}
      <g fill="#D6D3D1" opacity="0.7">
        <ellipse cx="89" cy="86" rx="7" ry="3" />
        <ellipse cx="148" cy="98" rx="5" ry="2" />
      </g>
      {/* Surface texture lines */}
      <g stroke="#5C5544" strokeWidth="0.6" fill="none" opacity="0.5">
        <path d="M 60 110 Q 90 105 120 115" />
        <path d="M 130 165 Q 160 162 180 170" />
      </g>
    </svg>
  );
}

/* ===================================================================
   SPACE — Outer Planets (L5) step extras
   =================================================================== */

function JupiterBandsSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="40" cy="40" r="1.5" />
      </g>
      {/* Jupiter big body with cloud bands */}
      <circle cx="120" cy="120" r="90" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      <g fill="#B8862E" stroke={STROKE} strokeWidth="1.5" opacity="0.85">
        <ellipse cx="120" cy="80" rx="80" ry="6" />
        <ellipse cx="120" cy="100" rx="86" ry="5" />
        <ellipse cx="120" cy="135" rx="86" ry="6" />
        <ellipse cx="120" cy="155" rx="80" ry="5" />
      </g>
      {/* Lighter cream bands between */}
      <g fill="#FFE9A8" stroke={STROKE} strokeWidth="1" opacity="0.6">
        <ellipse cx="120" cy="92" rx="84" ry="3" />
        <ellipse cx="120" cy="118" rx="88" ry="4" />
        <ellipse cx="120" cy="145" rx="84" ry="4" />
      </g>
    </svg>
  );
}

function JupiterStormSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Jupiter — close-up centered on the Great Red Spot */}
      <circle cx="120" cy="120" r="100" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      <g fill="#B8862E" stroke={STROKE} strokeWidth="1.5" opacity="0.85">
        <ellipse cx="120" cy="70" rx="90" ry="5" />
        <ellipse cx="120" cy="90" rx="95" ry="5" />
        <ellipse cx="120" cy="160" rx="92" ry="6" />
        <ellipse cx="120" cy="180" rx="88" ry="5" />
      </g>
      {/* GREAT RED SPOT */}
      <ellipse cx="135" cy="130" rx="32" ry="20" fill="#CE1126" stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx="135" cy="130" rx="22" ry="13" fill="#9A3412" />
      <ellipse cx="135" cy="130" rx="12" ry="7" fill="#7F1D1D" />
      {/* Swirl lines */}
      <g stroke="white" strokeWidth="1.2" fill="none" opacity="0.6">
        <ellipse cx="135" cy="130" rx="28" ry="17" />
        <ellipse cx="135" cy="130" rx="20" ry="11" />
      </g>
    </svg>
  );
}

function JupiterMoonsSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="40" cy="40" r="1.2" />
      </g>
      {/* Jupiter on the right */}
      <circle cx="170" cy="120" r="50" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      <g stroke="#B8862E" strokeWidth="1.5" fill="none">
        <path d="M 122 105 Q 170 100 218 105" />
        <path d="M 122 135 Q 170 140 218 135" />
      </g>
      <ellipse cx="180" cy="125" rx="6" ry="3.5" fill="#CE1126" />
      {/* Four big Galilean moons in a vertical line on the left */}
      <g transform="translate(50 60)">
        <circle r="9" fill="#F97316" stroke={STROKE} strokeWidth="1.5" />
</g>
      <g transform="translate(50 100)">
        <circle r="11" fill="#FFFCEF" stroke={STROKE} strokeWidth="1.5" />
        <g stroke="#9CA3AF" strokeWidth="0.8" fill="none">
          <line x1="-8" y1="-3" x2="8" y2="-3" />
          <line x1="-8" y1="3" x2="8" y2="3" />
        </g>
</g>
      <g transform="translate(50 145)">
        <circle r="14" fill="#A8826B" stroke={STROKE} strokeWidth="1.5" />
        <circle cx="-3" cy="-3" r="2" fill="#5C4510" />
        <circle cx="4" cy="3" r="1.5" fill="#5C4510" />
</g>
      <g transform="translate(50 195)">
        <circle r="12" fill="#5C5544" stroke={STROKE} strokeWidth="1.5" />
        <g fill="#1A1A2E">
          <circle cx="-3" cy="-2" r="2" />
          <circle cx="3" cy="3" r="1.5" />
        </g>
</g>
    </svg>
  );
}

function SaturnRingsCloseupSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="40" cy="40" r="1.2" />
      </g>
      {/* Saturn body */}
      <circle cx="120" cy="120" r="42" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      <g stroke="#B8862E" strokeWidth="1" fill="none" opacity="0.7">
        <path d="M 80 110 Q 120 105 160 110" />
        <path d="M 80 130 Q 120 135 160 130" />
      </g>
      {/* Multiple distinct rings (with gaps) */}
      <g fill="none" stroke="#D4AF37" strokeWidth="3">
        <ellipse cx="120" cy="120" rx="100" ry="20" opacity="0.85" />
      </g>
      <g fill="none" stroke="#FCD34D" strokeWidth="2.5">
        <ellipse cx="120" cy="120" rx="92" ry="18" opacity="0.7" />
      </g>
      <g fill="none" stroke="#FFE9A8" strokeWidth="2">
        <ellipse cx="120" cy="120" rx="80" ry="15" opacity="0.6" />
      </g>
      <g fill="none" stroke="#D4AF37" strokeWidth="1.5">
        <ellipse cx="120" cy="120" rx="70" ry="13" opacity="0.5" />
      </g>
    </svg>
  );
}

function SaturnTiltSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="200" cy="200" r="1.2" />
      </g>
      {/* Saturn tilted */}
      <g transform="translate(120 120) rotate(25)">
        <circle r="50" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
        <g stroke="#B8862E" strokeWidth="1.5" fill="none">
          <path d="M -45 -10 Q 0 -12 45 -10" />
          <path d="M -45 10 Q 0 12 45 10" />
        </g>
        <ellipse cx="0" cy="0" rx="95" ry="12" fill="none" stroke="#D4AF37" strokeWidth="3" opacity="0.85" />
        <ellipse cx="0" cy="0" rx="85" ry="9" fill="none" stroke="#FFE9A8" strokeWidth="2" opacity="0.65" />
      </g>
      {/* Tilt axis */}
      <line x1="100" y1="60" x2="140" y2="180" stroke="#CE1126" strokeWidth="2" strokeDasharray="4 3" />
    </svg>
  );
}

function UranusTiltSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Uranus rolled on its side */}
      <g transform="translate(120 120) rotate(82)">
        <circle r="55" fill="#67E8F9" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Faint cloud bands */}
        <g fill="#22D3EE" opacity="0.6">
          <ellipse cx="0" cy="-20" rx="50" ry="3" />
          <ellipse cx="0" cy="0" rx="55" ry="4" />
          <ellipse cx="0" cy="20" rx="48" ry="3" />
        </g>
        {/* Vertical rings (because Uranus is tilted on its side) */}
        <ellipse cx="0" cy="0" rx="80" ry="10" fill="none" stroke="#7AC4FF" strokeWidth="2" opacity="0.7" />
      </g>
      {/* Tilt axis (sideways) */}
      <line x1="60" y1="125" x2="180" y2="115" stroke="#CE1126" strokeWidth="2" strokeDasharray="4 3" />
    </svg>
  );
}

function NeptuneStormSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="40" cy="40" r="1.5" />
        <circle cx="200" cy="200" r="1.2" />
      </g>
      {/* Neptune body */}
      <circle cx="120" cy="120" r="80" fill="#3B82F6" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Cloud bands */}
      <g fill="#1E3A8A" opacity="0.7">
        <ellipse cx="120" cy="90" rx="74" ry="5" />
        <ellipse cx="120" cy="155" rx="72" ry="5" />
      </g>
      {/* Great Dark Spot */}
      <ellipse cx="105" cy="115" rx="20" ry="14" fill="#0F2A4A" stroke={STROKE} strokeWidth="1.5" />
      <ellipse cx="100" cy="112" rx="9" ry="6" fill="#1A1A2E" />
      {/* Wind streaks */}
      <g stroke="white" strokeWidth="1.2" fill="none" opacity="0.6">
        <path d="M 75 130 Q 100 128 125 130" />
        <path d="M 130 145 Q 155 143 175 145" />
      </g>
    </svg>
  );
}

function GasGiantComparisonSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Four gas giants in a row, scaled by relative size */}
      <g transform="translate(60 130)">
        <circle r="35" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
        <g stroke="#B8862E" strokeWidth="1" fill="none">
          <path d="M -30 -5 Q 0 -8 30 -5" />
          <path d="M -30 5 Q 0 8 30 5" />
        </g>
        <ellipse cx="-5" cy="3" rx="5" ry="3" fill="#CE1126" />
</g>
      <g transform="translate(135 135)">
        <circle r="26" fill="#FCD34D" stroke={STROKE} strokeWidth="1.5" />
        <ellipse cx="0" cy="0" rx="42" ry="6" fill="none" stroke="#D4AF37" strokeWidth="1.8" />
</g>
      <g transform="translate(190 145)">
        <circle r="14" fill="#67E8F9" stroke={STROKE} strokeWidth="1.5" />
</g>
      <g transform="translate(220 152)">
        <circle r="13" fill="#3B82F6" stroke={STROKE} strokeWidth="1.5" />
</g>
    </svg>
  );
}

function OuterOrbitSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sun */}
      <circle cx="120" cy="120" r="10" fill="#F97316" stroke="#9A3412" strokeWidth={STROKE_W} />
      {/* Outer orbits */}
      <ellipse cx="120" cy="120" rx="35" ry="20" fill="none" stroke="#FCD34D" strokeWidth="1" strokeDasharray="3 3" />
      <ellipse cx="120" cy="120" rx="55" ry="32" fill="none" stroke="#FCD34D" strokeWidth="1" strokeDasharray="3 3" />
      <ellipse cx="120" cy="120" rx="80" ry="46" fill="none" stroke="#67E8F9" strokeWidth="1" strokeDasharray="3 3" />
      <ellipse cx="120" cy="120" rx="105" ry="60" fill="none" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3 3" />
      {/* Planets at various positions */}
      <circle cx="155" cy="120" r="8" fill="#FCD34D" stroke={STROKE} strokeWidth="1" />
      <ellipse cx="65" cy="135" rx="10" ry="6" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
      <circle cx="65" cy="135" r="6" fill="#FCD34D" stroke={STROKE} strokeWidth="1" />
      <circle cx="200" cy="135" r="5" fill="#67E8F9" stroke={STROKE} strokeWidth="1" />
      <circle cx="40" cy="155" r="5" fill="#3B82F6" stroke={STROKE} strokeWidth="1" />
    </svg>
  );
}

function HugeJupiterSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* HUGE Jupiter filling most of the frame */}
      <circle cx="120" cy="120" r="115" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />
      <g fill="#B8862E" stroke={STROKE} strokeWidth="1.5" opacity="0.85">
        <ellipse cx="120" cy="55" rx="115" ry="6" />
        <ellipse cx="120" cy="80" rx="115" ry="5" />
        <ellipse cx="120" cy="155" rx="115" ry="6" />
        <ellipse cx="120" cy="180" rx="115" ry="5" />
      </g>
      <g fill="#FFE9A8" opacity="0.5">
        <ellipse cx="120" cy="105" rx="115" ry="5" />
        <ellipse cx="120" cy="130" rx="115" ry="6" />
      </g>
      {/* Great Red Spot prominent */}
      <ellipse cx="100" cy="145" rx="22" ry="14" fill="#CE1126" stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx="100" cy="145" rx="14" ry="9" fill="#9A3412" />

      {/* Tiny earth in corner */}
      <g transform="translate(220 30)">
        <circle r="10" fill="#7AC4FF" stroke={STROKE} strokeWidth="1.2" />
</g>
    </svg>
  );
}

/* ===================================================================
   SPACE — Hope Probe (L6) step extras
   =================================================================== */

function HopeLaunchSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Sky transitioning to space */}
      <rect width="240" height="100" fill="#3F8AB8" opacity="0.7" />
      <rect width="240" height="50" fill="#FFE9A8" opacity="0.5" />
      {/* Tall rocket launching */}
      <g transform="translate(120 120)">
        {/* Rocket body */}
        <rect x="-10" y="-50" width="20" height="60" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Nose cone */}
        <path d="M -10 -50 L 0 -75 L 10 -50 Z" fill="#CE1126" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        {/* UAE flag patch — red hoist on left + green/white/black stripes */}
        <rect x="-6" y="-30" width="16" height="3" fill="#009639" />
        <rect x="-6" y="-27" width="16" height="3" fill="white" />
        <rect x="-6" y="-24" width="16" height="3" fill="#1A1A2E" />
        <rect x="-10" y="-30" width="4" height="9" fill="#CE1126" />
        <rect x="-10" y="-30" width="20" height="9" fill="none" stroke={STROKE} strokeWidth="0.5" />
        {/* Window */}
        <circle cx="0" cy="-40" r="3" fill="#3B82F6" stroke={STROKE} strokeWidth="1" />
        {/* Fins */}
        <path d="M -10 0 L -20 15 L -10 10 Z" fill="#CE1126" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <path d="M 10 0 L 20 15 L 10 10 Z" fill="#CE1126" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        {/* Engine fire */}
        <path d="M -8 10 L -10 25 L -4 20 L -2 30 L 0 22 L 2 30 L 4 20 L 10 25 L 8 10 Z" fill="#F97316" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M -4 18 L -3 28 L 0 22 L 3 28 L 4 18" fill="#FCD34D" stroke="none" />
      </g>
      {/* Smoke billowing */}
      <g fill="#9CA3AF" opacity="0.7">
        <ellipse cx="100" cy="170" rx="22" ry="15" />
        <ellipse cx="140" cy="175" rx="22" ry="14" />
        <ellipse cx="120" cy="190" rx="35" ry="14" />
      </g>
    </svg>
  );
}

function HopeOrbitMarsSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="40" cy="40" r="1.5" />
        <circle cx="200" cy="200" r="1.2" />
      </g>
      {/* Mars */}
      <circle cx="120" cy="135" r="55" fill="#EF4444" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Polar cap */}
      <path d="M 95 92 Q 120 85 145 92 Q 138 100 120 100 Q 102 100 95 92 Z" fill="white" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Surface */}
      <ellipse cx="105" cy="125" rx="9" ry="6" fill="#7F1D1D" opacity="0.6" />
      <ellipse cx="135" cy="145" rx="11" ry="7" fill="#7F1D1D" opacity="0.6" />
      {/* Orbital path */}
      <ellipse cx="120" cy="135" rx="100" ry="40" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="5 4" transform="rotate(-15 120 135)" opacity="0.7" />
      {/* Hope Probe */}
      <g transform="translate(195 80) rotate(25)">
        <rect x="-12" y="-7" width="24" height="14" rx="2" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} />
        <rect x="-22" y="-5" width="9" height="10" fill="#3B82F6" stroke={STROKE} strokeWidth="1.5" />
        <rect x="13" y="-5" width="9" height="10" fill="#3B82F6" stroke={STROKE} strokeWidth="1.5" />
        <line x1="0" y1="-7" x2="0" y2="-15" stroke={STROKE} strokeWidth="2" />
        <circle cx="0" cy="-16" r="2" fill="#D4AF37" stroke={STROKE} strokeWidth="1" />
      </g>
    </svg>
  );
}

function HopeCameraSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Hope probe close-up */}
      <g transform="translate(75 120)">
        <rect x="-26" y="-15" width="52" height="30" rx="3" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Solar panels */}
        <rect x="-46" y="-10" width="18" height="20" fill="#3B82F6" stroke={STROKE} strokeWidth={STROKE_W} />
        <rect x="28" y="-10" width="18" height="20" fill="#3B82F6" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Solar panel lines */}
        <g stroke="#1A1A2E" strokeWidth="0.6">
          <line x1="-38" y1="-10" x2="-38" y2="10" />
          <line x1="38" y1="-10" x2="38" y2="10" />
        </g>
        {/* Camera lens (bigger) */}
        <circle cx="0" cy="0" r="11" fill="#1A1A2E" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="0" cy="0" r="7" fill="#3B82F6" stroke={STROKE} strokeWidth="1.2" />
        <circle cx="-2" cy="-2" r="2" fill="white" opacity="0.85" />
      </g>

      {/* Camera flash beam to Mars */}
      <g stroke="#FCD34D" strokeWidth="2" opacity="0.7" strokeLinecap="round">
        <line x1="86" y1="115" x2="170" y2="100" />
        <line x1="86" y1="125" x2="170" y2="140" />
      </g>

      {/* Mars on the right */}
      <circle cx="195" cy="120" r="30" fill="#EF4444" stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx="190" cy="115" rx="6" ry="3" fill="#7F1D1D" opacity="0.7" />
    </svg>
  );
}

function HopeTeamSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#FCD7AB" opacity="0.4" />
      {/* Mission control desks */}
      <rect y="180" width="240" height="60" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} />
      <rect y="180" width="240" height="6" fill="#5C4510" />

      {/* Big screen showing Mars + UAE flag */}
      <rect x="35" y="50" width="170" height="100" rx="6" fill="#1A1A2E" stroke={STROKE} strokeWidth={STROKE_W} />
      <rect x="40" y="55" width="160" height="90" rx="3" fill="#0F0F23" />
      {/* Mars on the screen */}
      <circle cx="100" cy="100" r="22" fill="#EF4444" stroke="white" strokeWidth="1.5" />
      {/* UAE flag mini */}
      <g transform="translate(170 90)">
        <rect x="-12" y="-7" width="24" height="4" fill="#CE1126" />
        <rect x="-12" y="-3" width="24" height="4" fill="white" />
        <rect x="-12" y="1" width="24" height="4" fill="#1A1A2E" />
        <rect x="-12" y="-7" width="6" height="12" fill="#009639" />
      </g>
      {/* Mission control logos */}
      <g fontFamily="sans-serif" fontSize="6" fontWeight="bold" fill="white">
</g>

      {/* Three engineers at consoles (bottom) */}
      <g transform="translate(60 195)">
        <circle cx="0" cy="-12" r="6" fill="#D4A574" stroke={STROKE} strokeWidth="1.5" />
        <path d="M -7 -16 L 7 -16 L 5 -12 L -5 -12 Z" fill="white" stroke={STROKE} strokeWidth="1" />
        <rect x="-5" y="-6" width="10" height="14" fill="#FFFCEF" stroke={STROKE} strokeWidth="1.2" />
      </g>
      <g transform="translate(120 195)">
        <circle cx="0" cy="-12" r="6" fill="#D4A574" stroke={STROKE} strokeWidth="1.5" />
        <path d="M -7 -16 L 7 -16 L 5 -12 L -5 -12 Z" fill="white" stroke={STROKE} strokeWidth="1" />
        <rect x="-5" y="-6" width="10" height="14" fill="#FFFCEF" stroke={STROKE} strokeWidth="1.2" />
      </g>
      <g transform="translate(180 195)">
        <circle cx="0" cy="-12" r="6" fill="#D4A574" stroke={STROKE} strokeWidth="1.5" />
        <path d="M -7 -16 L 7 -16 L 5 -12 L -5 -12 Z" fill="black" opacity="0.6" />
        <rect x="-5" y="-6" width="10" height="14" fill="#FFFCEF" stroke={STROKE} strokeWidth="1.2" />
      </g>
      {/* Console screens */}
      <g fill="#3B82F6" stroke={STROKE} strokeWidth="0.8">
        <rect x="50" y="200" width="20" height="14" rx="2" />
        <rect x="110" y="200" width="20" height="14" rx="2" />
        <rect x="170" y="200" width="20" height="14" rx="2" />
      </g>
    </svg>
  );
}

function MarsFromHopeSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Spacecraft window perspective */}
      <circle cx="120" cy="120" r="105" fill="#1A1A2E" />
      {/* Rim of porthole */}
      <circle cx="120" cy="120" r="105" fill="none" stroke="#D4AF37" strokeWidth="6" />
      <circle cx="120" cy="120" r="100" fill="none" stroke={STROKE} strokeWidth="2" />
      {/* Rivets */}
      <g fill="#D4AF37" stroke={STROKE} strokeWidth="0.5">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const r = (deg * Math.PI) / 180;
          return <circle key={deg} cx={120 + Math.cos(r) * 100} cy={120 + Math.sin(r) * 100} r="2.5" />;
        })}
      </g>
      {/* The Mars view */}
      <g clipPath="url(#porthole)">
        <circle cx="120" cy="120" r="100" fill="#0F0F23" />
        {/* Mars huge in the porthole */}
        <circle cx="120" cy="140" r="80" fill="#EF4444" stroke={STROKE} strokeWidth="1.5" />
        {/* Polar cap */}
        <path d="M 80 80 Q 120 70 160 80 Q 145 92 120 92 Q 95 92 80 80 Z" fill="white" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
        {/* Surface details */}
        <ellipse cx="100" cy="125" rx="14" ry="9" fill="#7F1D1D" opacity="0.7" />
        <ellipse cx="140" cy="155" rx="16" ry="10" fill="#7F1D1D" opacity="0.7" />
        <ellipse cx="120" cy="170" rx="10" ry="6" fill="#7F1D1D" opacity="0.6" />
      </g>
      <defs>
        <clipPath id="porthole">
          <circle cx="120" cy="120" r="100" />
        </clipPath>
      </defs>
    </svg>
  );
}

function MarsAtmosphereDataSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Mars partial */}
      <circle cx="80" cy="120" r="60" fill="#EF4444" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Atmosphere layer (transparent halo) */}
      <circle cx="80" cy="120" r="60" fill="none" stroke="#FCD7AB" strokeWidth="6" opacity="0.5" />
      <circle cx="80" cy="120" r="65" fill="none" stroke="#FCD7AB" strokeWidth="3" opacity="0.4" />
      {/* Atmosphere annotations (data lines) */}
      <g stroke="#FCD34D" strokeWidth="1.5" fill="none">
        <line x1="140" y1="80" x2="180" y2="60" />
        <line x1="140" y1="120" x2="180" y2="120" />
        <line x1="140" y1="160" x2="180" y2="180" />
      </g>
      {/* Data labels */}
      <g fontFamily="monospace" fontSize="9" fontWeight="bold" fill="#FCD34D">

</g>
    </svg>
  );
}

function Uae50thAnniversarySticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Gold ceremonial background */}
      <circle cx="120" cy="120" r="105" fill="#FCD34D" opacity="0.3" />
      {/* Sunburst rays */}
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const x1 = 120 + Math.cos(a) * 105;
        const y1 = 120 + Math.sin(a) * 105;
        const x2 = 120 + Math.cos(a) * 115;
        const y2 = 120 + Math.sin(a) * 115;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" opacity="0.7" />;
      })}
      {/* Big circular medallion */}
      <circle cx="120" cy="120" r="80" fill="#FFFCEF" stroke={STROKE} strokeWidth={STROKE_W} />
      <circle cx="120" cy="120" r="80" fill="none" stroke="#D4AF37" strokeWidth="3" />
      <circle cx="120" cy="120" r="70" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
      {/* "50" big number */}
{/* UAE flag laurel */}
      <g transform="translate(70 170)" stroke="#16A34A" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M 0 0 Q -5 -10 -2 -20" />
        <path d="M -3 -3 L -8 -8" />
        <path d="M -3 -10 L -8 -15" />
      </g>
      <g transform="translate(170 170)" stroke="#16A34A" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M 0 0 Q 5 -10 2 -20" />
        <path d="M 3 -3 L 8 -8" />
        <path d="M 3 -10 L 8 -15" />
      </g>
    </svg>
  );
}

function MbrscCenterSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="105" fill="#E6F3FA" opacity="0.4" />
      {/* Sky */}
      <rect width="240" height="120" fill="#67E8F9" opacity="0.45" />
      {/* Sun */}
      <circle cx="200" cy="40" r="14" fill="#FCD34D" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Modern building */}
      <rect x="30" y="120" width="180" height="100" fill="#A8B8C8" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Glass facade — multiple windows */}
      <g fill="#3B82F6" opacity="0.55" stroke={STROKE} strokeWidth="0.8">
        {[
          [40, 140], [60, 140], [80, 140], [100, 140], [120, 140], [140, 140], [160, 140], [180, 140], [200, 140],
          [40, 165], [60, 165], [80, 165], [100, 165], [120, 165], [140, 165], [160, 165], [180, 165], [200, 165],
          [40, 190], [60, 190], [80, 190], [100, 190], [120, 190], [140, 190], [160, 190], [180, 190], [200, 190],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="14" height="18" />
        ))}
      </g>

      {/* MBRSC logo on the front */}
      <g transform="translate(120 90)">
        <circle r="22" fill="#CE1126" stroke={STROKE} strokeWidth={STROKE_W} />
</g>

      {/* Mini Hope Probe model in front of building */}
      <g transform="translate(60 215)">
        <rect x="-7" y="-3" width="14" height="6" fill="#D4AF37" stroke={STROKE} strokeWidth="1" />
        <rect x="-12" y="-2" width="5" height="4" fill="#3B82F6" />
        <rect x="7" y="-2" width="5" height="4" fill="#3B82F6" />
      </g>

      {/* Flagpole + UAE flag */}
      <g transform="translate(180 200)">
        <line x1="0" y1="0" x2="0" y2="-50" stroke={STROKE} strokeWidth="2" />
        <rect x="0" y="-50" width="20" height="3" fill="#CE1126" />
        <rect x="0" y="-47" width="20" height="3" fill="white" />
        <rect x="0" y="-44" width="20" height="3" fill="#1A1A2E" />
        <rect x="0" y="-50" width="6" height="9" fill="#009639" />
      </g>
    </svg>
  );
}

function AstronautNeyadiSticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <g fill="white">
        <circle cx="40" cy="40" r="1.5" />
        <circle cx="200" cy="200" r="1.2" />
      </g>
      {/* Earth in background */}
      <circle cx="200" cy="190" r="35" fill="#3B82F6" stroke={STROKE} strokeWidth={STROKE_W} opacity="0.85" />
      <path d="M 175 178 Q 195 173 215 185 Q 220 195 200 200 Q 185 195 175 178 Z" fill="#16A34A" />

      {/* Astronaut floating */}
      <g transform="translate(105 110)">
        {/* Helmet */}
        <circle r="32" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Visor */}
        <circle r="22" fill="#1A1A2E" stroke={STROKE} strokeWidth="1.5" />
        <ellipse cx="-6" cy="-6" rx="8" ry="4" fill="#3B82F6" opacity="0.7" />
        {/* UAE flag patch on chest */}
        <g transform="translate(-15 30)">
          <rect x="0" y="0" width="14" height="3" fill="#CE1126" />
          <rect x="0" y="3" width="14" height="3" fill="white" />
          <rect x="0" y="6" width="14" height="3" fill="#1A1A2E" />
          <rect x="0" y="0" width="4" height="9" fill="#009639" />
        </g>
        {/* Suit body */}
        <path d="M -22 30 L 22 30 L 32 80 L -32 80 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        {/* Backpack */}
        <rect x="-12" y="40" width="24" height="20" rx="2" fill="#9CA3AF" stroke={STROKE} strokeWidth="1.5" />
        {/* Arms */}
        <line x1="-22" y1="40" x2="-50" y2="60" stroke="white" strokeWidth="14" strokeLinecap="round" />
        <line x1="-22" y1="40" x2="-50" y2="60" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="22" y1="40" x2="55" y2="35" stroke="white" strokeWidth="14" strokeLinecap="round" />
        <line x1="22" y1="40" x2="55" y2="35" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
        {/* Glove (waving) */}
        <circle cx="55" cy="35" r="6" fill="white" stroke={STROKE} strokeWidth="1.5" />
        {/* Tether */}
        <path d="M 12 50 Q 0 80 -10 100" stroke="#5C4510" strokeWidth="1.5" fill="none" />
      </g>
    </svg>
  );
}

function Mars2117Sticker() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* Mars sky */}
      <rect width="240" height="180" fill="#9A3412" opacity="0.5" />
      {/* Two suns? No — just one. Distant Earth in the sky */}
      <circle cx="200" cy="50" r="6" fill="#7AC4FF" stroke={STROKE} strokeWidth="1" />
      {/* Mars surface */}
      <rect y="180" width="240" height="60" fill="#EF4444" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Distant mountain */}
      <path d="M 0 180 L 50 130 L 100 170 L 160 110 L 240 170 L 240 200 L 0 200 Z" fill="#7F1D1D" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />

      {/* Mars City — futuristic dome city */}
      <g transform="translate(120 175)">
        {/* Outer dome */}
        <path d="M -55 0 Q -55 -45 0 -55 Q 55 -45 55 0 Z" fill="#67E8F9" opacity="0.4" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <path d="M -55 0 Q -55 -45 0 -55 Q 55 -45 55 0 Z" fill="none" stroke="#22D3EE" strokeWidth="1.5" />
        {/* Geometric pattern lines on dome */}
        <g stroke="#22D3EE" strokeWidth="1" opacity="0.6">
          <path d="M -55 0 Q 0 -30 55 0" />
          <path d="M -50 -15 Q 0 -45 50 -15" />
          <line x1="0" y1="-55" x2="0" y2="0" />
        </g>
        {/* Buildings inside */}
        <g fill="#FFFCEF" stroke={STROKE} strokeWidth="1.5">
          <rect x="-30" y="-15" width="14" height="15" />
          <rect x="-12" y="-25" width="12" height="25" />
          <rect x="2" y="-35" width="14" height="35" />
          <rect x="18" y="-20" width="12" height="20" />
        </g>
      </g>
      {/* Tiny rover beside */}
      <g transform="translate(50 195)">
        <rect x="-6" y="-2" width="12" height="5" fill="#D4AF37" stroke={STROKE} strokeWidth="1" />
        <circle cx="-4" cy="3" r="2" fill="#1A1A2E" />
        <circle cx="4" cy="3" r="2" fill="#1A1A2E" />
      </g>
    </svg>
  );
}

/* ===================================================================
   HERITAGE — emirate map node art (one per emirate)
   Each one is a tight square illustration of that emirate's signature
   landmark, sized so it reads inside the small map node tile.
   =================================================================== */

function NodeAbuDhabiSticker() {
  // Sheikh Zayed Grand Mosque — drawn big and centered with no background.
  // The tile's own gradient shows through.
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* soft halo behind the mosque */}
      <circle cx="120" cy="120" r="92" fill="#FCD981" opacity="0.55" />
      {/* mosque base */}
      <rect x="35" y="155" width="170" height="55" fill="#FAFAF0" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* arched arcade — three arches */}
      <g fill="#1A1A2E">
        <path d="M 55 210 L 55 188 Q 70 168 85 188 L 85 210 Z" />
        <path d="M 105 210 L 105 184 Q 120 162 135 184 L 135 210 Z" />
        <path d="M 155 210 L 155 188 Q 170 168 185 188 L 185 210 Z" />
      </g>
      {/* main dome */}
      <path d="M 75 155 Q 75 78 120 78 Q 165 78 165 155 Z" fill="#FAFAF0" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* dome finial */}
      <line x1="120" y1="60" x2="120" y2="42" stroke={STROKE} strokeWidth="3" />
      <path d="M 116 42 L 124 42 L 120 30 Z" fill="#D4AF37" stroke={STROKE} strokeWidth="2" strokeLinejoin="round" />
      {/* small flanking domes */}
      <path d="M 30 168 Q 30 132 55 132 Q 80 132 80 168 Z" fill="#FAFAF0" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      <path d="M 160 168 Q 160 132 185 132 Q 210 132 210 168 Z" fill="#FAFAF0" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* minarets */}
      <rect x="12" y="100" width="14" height="110" fill="#FAFAF0" stroke={STROKE} strokeWidth={STROKE_W} />
      <path d="M 12 100 L 26 100 L 19 82 Z" fill="#D4AF37" stroke={STROKE} strokeWidth="2" strokeLinejoin="round" />
      <rect x="214" y="100" width="14" height="110" fill="#FAFAF0" stroke={STROKE} strokeWidth={STROKE_W} />
      <path d="M 214 100 L 228 100 L 221 82 Z" fill="#D4AF37" stroke={STROKE} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function NodeDubaiSticker() {
  // Burj Khalifa — tall stepped tower, transparent background.
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* sun halo behind */}
      <circle cx="190" cy="55" r="26" fill="#F97316" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* small flanking buildings to make the Burj feel tallest */}
      <g fill="#C9B58A" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round">
        <rect x="22" y="170" width="36" height="50" />
        <rect x="62" y="150" width="28" height="70" />
        <rect x="160" y="160" width="30" height="60" />
        <rect x="195" y="140" width="28" height="80" />
      </g>
      {/* Burj Khalifa — taller, fills the height */}
      <g stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round">
        <rect x="100" y="190" width="40" height="30" fill="#E8E8F0" />
        <rect x="104" y="160" width="32" height="30" fill="#E8E8F0" />
        <rect x="108" y="130" width="24" height="30" fill="#D8D8E8" />
        <rect x="111" y="100" width="18" height="30" fill="#D8D8E8" />
        <rect x="113" y="70" width="14" height="30" fill="#C8C8DC" />
        <rect x="115" y="45" width="10" height="25" fill="#C8C8DC" />
        {/* spire */}
        <line x1="120" y1="45" x2="120" y2="18" strokeWidth="3" />
        <circle cx="120" cy="18" r="3" fill="#D4AF37" />
      </g>
      {/* window dots */}
      <g fill="#1A1A2E" opacity="0.55">
        <circle cx="110" cy="200" r="1.6" /><circle cx="120" cy="200" r="1.6" /><circle cx="130" cy="200" r="1.6" />
        <circle cx="113" cy="170" r="1.4" /><circle cx="127" cy="170" r="1.4" />
        <circle cx="115" cy="142" r="1.3" /><circle cx="125" cy="142" r="1.3" />
        <circle cx="116" cy="115" r="1.2" /><circle cx="124" cy="115" r="1.2" />
      </g>
    </svg>
  );
}

function NodeSharjahSticker() {
  // Sharjah — big open book monument (cultural capital), no background.
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* halo */}
      <circle cx="120" cy="125" r="95" fill="#A9D4F0" opacity="0.45" />
      {/* big open book on a tall pedestal — fills the canvas */}
      <g transform="translate(120 160)">
        {/* pedestal */}
        <rect x="-50" y="20" width="100" height="36" fill="#9C7A3F" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <rect x="-58" y="50" width="116" height="14" fill="#7A5C2A" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        {/* book pages — two halves meeting at a center fold */}
        <path d="M -90 -10 L -4 -50 L -4 20 L -90 30 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <path d="M 90 -10 L 4 -50 L 4 20 L 90 30 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        {/* center spine */}
        <path d="M -4 -50 L -4 20 L 4 20 L 4 -50 Z" fill="#FCE99A" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        {/* page lines */}
        <g stroke="#1A1A2E" strokeWidth="1.5" opacity="0.55">
          <line x1="-78" y1="-2" x2="-12" y2="-22" />
          <line x1="-78" y1="6" x2="-12" y2="-14" />
          <line x1="-78" y1="14" x2="-12" y2="-6" />
          <line x1="78" y1="-2" x2="12" y2="-22" />
          <line x1="78" y1="6" x2="12" y2="-14" />
          <line x1="78" y1="14" x2="12" y2="-6" />
        </g>
        {/* ribbon bookmark */}
        <path d="M 0 -50 L 0 -78 L -5 -70 L -10 -78 L -10 -50 Z" fill="#CE1126" stroke={STROKE} strokeWidth="2" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function NodeAjmanSticker() {
  // Ajman — big wooden dhow boat with lateen sail, transparent background.
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* sun halo */}
      <circle cx="55" cy="60" r="26" fill="#F97316" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* a few water arcs to suggest sea, no full band */}
      <g stroke="#3F8AB8" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85">
        <path d="M 15 215 Q 35 208 55 215" />
        <path d="M 75 222 Q 95 215 115 222" />
        <path d="M 135 215 Q 155 208 175 215" />
        <path d="M 195 222 Q 210 215 225 222" />
      </g>
      {/* dhow boat — fills the tile */}
      <g transform="translate(120 175)">
        {/* hull — curved wooden shape */}
        <path d="M -100 -5 Q -75 38 0 42 Q 75 38 100 -5 L 78 -12 L -78 -12 Z" fill="#9C7A3F" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        {/* hull planks */}
        <path d="M -80 -10 Q 0 12 80 -10" stroke="#7A5C2A" strokeWidth="2.5" fill="none" />
        <path d="M -72 14 Q 0 30 72 14" stroke="#7A5C2A" strokeWidth="2.5" fill="none" />
        {/* mast */}
        <line x1="0" y1="-12" x2="0" y2="-128" stroke={STROKE} strokeWidth="5" />
        {/* triangular lateen sail */}
        <path d="M 0 -125 L 78 -22 L 0 -18 Z" fill="#FFF8E1" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        {/* sail seam lines */}
        <g stroke="#C9B58A" strokeWidth="1.5" fill="none" opacity="0.7">
          <path d="M 10 -110 L 60 -28" />
          <path d="M 25 -90 L 55 -32" />
        </g>
        {/* flag */}
        <rect x="0" y="-130" width="18" height="8" fill="#CE1126" stroke={STROKE} strokeWidth="1.5" />
      </g>
    </svg>
  );
}

function NodeUmmAlQuwainSticker() {
  // UAQ — two big mangrove trees, transparent background, water ripples below.
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* sun halo */}
      <circle cx="190" cy="55" r="24" fill="#F97316" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* big foreground mangroves filling the tile */}
      <g transform="translate(75 200)">
        {/* prop roots — characteristic mangrove */}
        <path d="M 0 0 L -20 38 M 0 0 L 20 38 M 0 0 L -8 42 M 0 0 L 8 42 M 0 0 L -32 38 M 0 0 L 32 38" stroke="#7A4A1F" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* canopy */}
        <ellipse cx="0" cy="-22" rx="55" ry="42" fill="#3F8F3F" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="-22" cy="-38" rx="26" ry="18" fill="#4FA84F" />
        <ellipse cx="18" cy="-32" rx="22" ry="16" fill="#4FA84F" />
        {/* leaf dots */}
        <g fill="#2E6B2E">
          <circle cx="-30" cy="-18" r="3" />
          <circle cx="22" cy="-12" r="3" />
          <circle cx="0" cy="-50" r="2.5" />
        </g>
      </g>
      <g transform="translate(180 210)">
        <path d="M 0 0 L -16 30 M 0 0 L 16 30 M 0 0 L 0 32 M 0 0 L -26 28 M 0 0 L 26 28" stroke="#7A4A1F" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <ellipse cx="0" cy="-15" rx="42" ry="32" fill="#3F8F3F" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="-14" cy="-26" rx="20" ry="14" fill="#4FA84F" />
      </g>
      {/* water ripples below — minimal */}
      <g stroke="#3F8AB8" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85">
        <path d="M 10 230 Q 30 224 50 230" />
        <path d="M 90 232 Q 110 226 130 232" />
        <path d="M 165 230 Q 185 224 205 230" />
      </g>
    </svg>
  );
}

function NodeRasAlKhaimahSticker() {
  // RAK — Jebel Jais twin peaks with snow cap, transparent background.
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* sun */}
      <circle cx="40" cy="50" r="22" fill="#FCD981" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* far smaller peak */}
      <path d="M -20 230 L 70 90 L 150 230 Z" fill="#9C7A3F" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      <path d="M 55 108 L 70 90 L 85 108 L 78 118 L 70 108 L 62 118 Z" fill="white" stroke={STROKE} strokeWidth="2" strokeLinejoin="round" />
      {/* main peak — Jebel Jais — fills the tile */}
      <path d="M 60 240 L 165 30 L 270 240 Z" fill="#7A4A1F" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* snow cap */}
      <path d="M 125 100 L 165 30 L 205 100 L 192 118 L 180 105 L 165 125 L 150 105 L 138 118 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      {/* mountain shading streaks */}
      <g stroke="#5C3815" strokeWidth="2.5" fill="none" opacity="0.7">
        <path d="M 145 180 L 175 150" />
        <path d="M 180 200 L 210 170" />
        <path d="M 100 200 L 125 175" />
      </g>
      {/* zipline cable from peak */}
      <line x1="165" y1="30" x2="240" y2="135" stroke={STROKE} strokeWidth="2" />
      <circle cx="220" cy="106" r="6" fill="#CE1126" stroke={STROKE} strokeWidth="2" />
    </svg>
  );
}

function NodeFujairahSticker() {
  // Fujairah — Al Bidya Mosque (oldest in UAE) with mountain backdrop,
  // transparent background.
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      {/* mountains behind — bigger, fill the upper half */}
      <g fill="#9C7A3F" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round">
        <path d="M -10 165 L 60 60 L 130 165 Z" />
        <path d="M 90 165 L 175 40 L 260 165 Z" />
      </g>
      {/* mountain shading */}
      <g stroke="#5C3815" strokeWidth="2" fill="none" opacity="0.7">
        <path d="M 60 60 L 80 95" />
        <path d="M 175 40 L 200 90" />
      </g>
      {/* Al Bidya Mosque — large and centered */}
      <g transform="translate(120 195)">
        {/* base */}
        <rect x="-65" y="-15" width="130" height="55" fill="#C99A5A" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        {/* doorway */}
        <path d="M -10 40 L -10 18 Q 0 4 10 18 L 10 40 Z" fill="#1A1A2E" />
        {/* four characteristic clustered domes on top */}
        <path d="M -55 -15 Q -55 -45 -35 -45 Q -15 -45 -15 -15 Z" fill="#C99A5A" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <path d="M -15 -15 Q -15 -50 5 -50 Q 25 -50 25 -15 Z" fill="#C99A5A" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <path d="M 25 -15 Q 25 -45 45 -45 Q 65 -45 65 -15 Z" fill="#C99A5A" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        {/* finial on the tallest dome */}
        <line x1="5" y1="-50" x2="5" y2="-62" stroke={STROKE} strokeWidth="2.5" />
        <path d="M 1 -62 L 9 -62 L 5 -72 Z" fill="#D4AF37" stroke={STROKE} strokeWidth="2" strokeLinejoin="round" />
        {/* windows */}
        <circle cx="-40" cy="8" r="3.5" fill="#1A1A2E" />
        <circle cx="40" cy="8" r="3.5" fill="#1A1A2E" />
      </g>
    </svg>
  );
}

/* ===================================================================
   SPACE — level node art. Same grammar as the heritage node stickers:
   transparent bg, soft halo, big bold hero scene that fills ~80% of
   the canvas, no labels. ALL trig coords are pre-computed and rounded
   so SSR + CSR floats agree (no hydration mismatches).
   =================================================================== */

// Pre-rounded ray coords for the Sun corona — computed at module load
// (not at render time) so the server and client always serialize the
// same number string for every line endpoint.
const SUN_LONG_RAYS = Array.from({ length: 12 }).map((_, i) => {
  const a = (i / 12) * Math.PI * 2;
  return {
    x1: r3(120 + Math.cos(a) * 85),
    y1: r3(120 + Math.sin(a) * 85),
    x2: r3(120 + Math.cos(a) * 116),
    y2: r3(120 + Math.sin(a) * 116),
  };
});
const SUN_SHORT_RAYS = Array.from({ length: 12 }).map((_, i) => {
  const a = ((i + 0.5) / 12) * Math.PI * 2;
  return {
    x1: r3(120 + Math.cos(a) * 82),
    y1: r3(120 + Math.sin(a) * 82),
    x2: r3(120 + Math.cos(a) * 100),
    y2: r3(120 + Math.sin(a) * 100),
  };
});

function NodeSunSticker() {
  // Clean glowing Sun: warm dual halo, full ray crown, smooth molten body
  // with a hot upper-left highlight and a warm orange lower glow. No
  // sunspots, no surface marks, no face. Just a pure radiant star.
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="116" fill="#FCD981" opacity="0.35" />
      <circle cx="120" cy="120" r="100" fill="#FFB35A" opacity="0.4" />
      <g stroke="#F59E0B" strokeWidth="7" strokeLinecap="round">
        {SUN_LONG_RAYS.map((p, i) => (
          <line key={i} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} />
        ))}
      </g>
      <g stroke="#FFB35A" strokeWidth="5" strokeLinecap="round" opacity="0.85">
        {SUN_SHORT_RAYS.map((p, i) => (
          <line key={i} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} />
        ))}
      </g>
      <circle cx="120" cy="120" r="74" fill="#FFCB47" stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx="98" cy="96" rx="38" ry="26" fill="#FFE9A8" opacity="0.6" />
      <path
        d="M 56 138 Q 120 200 184 138 Q 180 168 154 184 Q 120 196 86 184 Q 60 168 56 138 Z"
        fill="#F59E0B"
        opacity="0.4"
      />
    </svg>
  );
}

function NodeEarthMoonSticker() {
  // Earth as the centerpiece with cloud wisps and continents,
  // a clearly visible orbit ring, and a textured Moon riding the orbit
  // upper-right.
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="116" fill="#A7E2F0" opacity="0.35" />
      <circle cx="120" cy="120" r="92" fill="#FFE9A8" opacity="0.35" />
      <ellipse cx="120" cy="120" rx="102" ry="92" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.35" transform="rotate(-12 120 120)" />
      <ellipse cx="120" cy="120" rx="102" ry="92" fill="none" stroke={STROKE} strokeWidth="2" strokeDasharray="4 6" opacity="0.55" transform="rotate(-12 120 120)" />
      <circle cx="115" cy="130" r="78" fill="#3B82F6" stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx="92" cy="106" rx="32" ry="22" fill="#7AC4FF" opacity="0.55" />
      <g fill="#5AAFE6" opacity="0.55">
        <ellipse cx="90" cy="100" rx="22" ry="9" />
        <ellipse cx="148" cy="142" rx="26" ry="10" />
        <ellipse cx="78" cy="160" rx="18" ry="8" />
        <ellipse cx="160" cy="170" rx="18" ry="6" />
      </g>
      <g fill="#22C55E" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round">
        <path d="M 60 108 Q 80 94 105 102 Q 122 116 110 138 Q 95 148 78 140 Q 58 130 60 108 Z" />
        <path d="M 124 130 Q 152 120 170 138 Q 178 158 160 174 Q 138 180 128 160 Q 118 142 124 130 Z" />
        <path d="M 88 175 Q 112 168 130 180 Q 134 196 116 202 Q 96 200 86 190 Z" />
      </g>
      <g fill="#16A34A" opacity="0.55">
        <path d="M 70 116 Q 88 110 100 122 Q 92 130 78 128 Z" />
        <path d="M 138 144 Q 158 140 168 156 Q 156 166 142 158 Z" />
      </g>
      <g fill="white" opacity="0.6">
        <ellipse cx="118" cy="78" rx="22" ry="5" />
        <ellipse cx="60" cy="142" rx="14" ry="4" />
        <ellipse cx="178" cy="116" rx="14" ry="4" />
      </g>
      <g transform="translate(208 56)">
        <circle r="26" fill="#E8E2D0" stroke={STROKE} strokeWidth={STROKE_W} />
        <path d="M 0 -26 A 26 26 0 0 1 0 26" fill="#A8A48F" opacity="0.35" />
        <g fill="#A8A48F">
          <circle cx="-8" cy="-6" r="4" />
          <circle cx="6" cy="2" r="3" />
          <circle cx="-3" cy="10" r="2.5" />
          <circle cx="10" cy="-12" r="2" />
          <circle cx="-12" cy="6" r="2" />
        </g>
      </g>
      <g fill="#1A1A2E">
        <circle cx="22" cy="48" r="2" />
        <circle cx="208" cy="200" r="2" />
        <circle cx="34" cy="196" r="1.6" />
        <circle cx="184" cy="32" r="1.8" />
      </g>
    </svg>
  );
}

// Pre-rounded sun ray coords for the inner planets corner sun
const INNER_SUN_RAYS = Array.from({ length: 8 }).map((_, i) => {
  const a = (i / 8) * Math.PI * 2;
  return {
    x1: r3(64 + Math.cos(a) * 40),
    y1: r3(184 + Math.sin(a) * 40),
    x2: r3(64 + Math.cos(a) * 56),
    y2: r3(184 + Math.sin(a) * 56),
  };
});

function NodeInnerPlanetsSticker() {
  // Mercury, Venus, Earth, and Mars on three concentric orbits around a
  // visible Sun corner — all four rocky planets fully inside the frame.
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="116" fill="#FFE9A8" opacity="0.35" />
      <g fill="none" stroke={STROKE} strokeWidth="1.5" strokeDasharray="3 5" opacity="0.5">
        <ellipse cx="64" cy="184" rx="56" ry="50" />
        <ellipse cx="64" cy="184" rx="92" ry="80" />
        <ellipse cx="64" cy="184" rx="128" ry="108" />
      </g>
      <g>
        {INNER_SUN_RAYS.map((p, i) => (
          <line key={i} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
        ))}
        <circle cx="64" cy="184" r="34" fill="#FFCB47" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="56" cy="176" rx="14" ry="9" fill="#FFE9A8" opacity="0.6" />
      </g>
      <g transform="translate(108 156)">
        <circle r="14" fill="#A8A48F" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="-4" cy="-2" r="2.5" fill="#6B6750" opacity="0.7" />
        <circle cx="4" cy="3" r="2" fill="#6B6750" opacity="0.6" />
        <circle cx="-2" cy="6" r="1.5" fill="#6B6750" opacity="0.55" />
      </g>
      <g transform="translate(150 116)">
        <circle r="22" fill="#E8C547" stroke={STROKE} strokeWidth={STROKE_W} />
        <g fill="#B8862E" opacity="0.55">
          <ellipse cx="-2" cy="-9" rx="14" ry="3" />
          <ellipse cx="2" cy="-2" rx="16" ry="3" />
          <ellipse cx="-2" cy="5" rx="15" ry="3" />
          <ellipse cx="2" cy="11" rx="13" ry="3" />
        </g>
      </g>
      <g transform="translate(190 78)">
        <circle r="20" fill="#3B82F6" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="-5" cy="-5" rx="9" ry="6" fill="#7AC4FF" opacity="0.55" />
        <path d="M -8 -2 Q 0 -6 8 -2 Q 4 6 -4 4 Z" fill="#22C55E" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
        <ellipse cx="3" cy="9" rx="6" ry="2" fill="white" opacity="0.6" />
      </g>
      <g transform="translate(208 158)">
        <circle r="22" fill="#E26E4D" stroke={STROKE} strokeWidth={STROKE_W} />
        <path d="M -10 -16 Q 0 -22 10 -16 Q 6 -10 0 -12 Q -6 -10 -10 -16 Z" fill="#FEE2E2" stroke={STROKE} strokeWidth="1.2" strokeLinejoin="round" />
        <g fill="#7F1D1D" opacity="0.6">
          <circle cx="-4" cy="0" r="3" />
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="-2" cy="10" r="2" />
        </g>
      </g>
      <g fill="#1A1A2E">
        <circle cx="34" cy="36" r="2" />
        <circle cx="174" cy="36" r="1.6" />
      </g>
    </svg>
  );
}

// Pre-rounded asteroid-belt dust dot positions
const BELT_DUST = Array.from({ length: 22 }).map((_, i) => {
  const a = (i / 22) * Math.PI * 2 + 0.3;
  const r = 92 + (i % 3) * 6;
  return {
    cx: r3(120 + Math.cos(a) * r),
    cy: r3(120 + Math.sin(a) * (r - 12)),
    r: 1.6 + (i % 2) * 0.7,
  };
});

function NodeAsteroidBeltSticker() {
  // A small spacecraft threading through a varied asteroid belt —
  // chunks of different sizes, craters, dust trails.
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="116" fill="#CFCAC2" opacity="0.45" />
      <circle cx="120" cy="120" r="80" fill="#FFE9A8" opacity="0.3" />
      <ellipse cx="120" cy="120" rx="100" ry="86" fill="none" stroke={STROKE} strokeWidth="1.5" strokeDasharray="3 6" opacity="0.4" transform="rotate(-12 120 120)" />
      <ellipse cx="120" cy="120" rx="86" ry="74" fill="none" stroke={STROKE} strokeWidth="1.2" strokeDasharray="2 4" opacity="0.3" transform="rotate(-12 120 120)" />
      <g fill="#78716C">
        {BELT_DUST.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={d.r} opacity="0.65" />
        ))}
      </g>
      <g transform="translate(186 172) rotate(15)">
        <path d="M -32 -8 L -22 -28 L -2 -32 L 18 -26 L 30 -8 L 32 12 L 22 28 L 2 32 L -20 28 L -30 14 Z" fill="#9A9189" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <path d="M -22 8 L -10 18 L 8 22 L 22 14 L 28 24 L 14 32 L -6 32 L -22 24 L -28 14 Z" fill="#6B6357" opacity="0.7" />
        <ellipse cx="-6" cy="-8" rx="10" ry="7" fill="#3F3935" opacity="0.7" />
        <ellipse cx="-6" cy="-8" rx="5" ry="3" fill="#1A1A2E" opacity="0.55" />
        <circle cx="14" cy="6" r="4" fill="#3F3935" opacity="0.55" />
        <circle cx="-16" cy="14" r="3" fill="#3F3935" opacity="0.55" />
        <circle cx="20" cy="-12" r="2.5" fill="#3F3935" opacity="0.55" />
        <ellipse cx="-12" cy="-20" rx="6" ry="3" fill="white" opacity="0.45" />
      </g>
      <g transform="translate(56 76) rotate(-20)">
        <path d="M -22 -6 L -12 -22 L 6 -22 L 18 -10 L 22 6 L 14 20 L -4 24 L -18 18 L -24 6 Z" fill="#A8826B" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <ellipse cx="-4" cy="-4" rx="6" ry="4" fill="#5C4510" opacity="0.6" />
        <circle cx="8" cy="6" r="3" fill="#5C4510" opacity="0.55" />
        <ellipse cx="-12" cy="-16" rx="4" ry="2" fill="white" opacity="0.45" />
      </g>
      <g transform="translate(40 154) rotate(35)">
        <path d="M -16 -4 L -8 -16 L 6 -14 L 14 -2 L 10 12 L -2 18 L -16 12 Z" fill="#D6D3D1" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <circle cx="-2" cy="-2" r="3" fill="#78716C" opacity="0.6" />
        <circle cx="6" cy="6" r="2" fill="#78716C" opacity="0.55" />
      </g>
      <g transform="translate(190 62) rotate(-30)">
        <path d="M -12 -4 L -6 -12 L 6 -10 L 12 -2 L 8 8 L -2 12 L -12 6 Z" fill="#9A9189" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <circle cx="0" cy="-2" r="2" fill="#3F3935" opacity="0.55" />
      </g>
      <g stroke={STROKE} strokeWidth="2" strokeLinejoin="round">
        <path d="M 78 196 L 82 188 L 92 188 L 94 196 L 88 202 Z" fill="#A8A29E" />
        <path d="M 152 36 L 156 30 L 164 32 L 162 40 Z" fill="#D6D3D1" />
        <path d="M 118 198 L 124 192 L 132 196 L 128 204 L 120 204 Z" fill="#9A9189" />
      </g>
      <g transform="translate(120 118) rotate(15)">
        <rect x="-26" y="-3" width="14" height="6" fill="#1E3A8A" stroke={STROKE} strokeWidth="2" />
        <rect x="12" y="-3" width="14" height="6" fill="#1E3A8A" stroke={STROKE} strokeWidth="2" />
        <line x1="-19" y1="-3" x2="-19" y2="3" stroke="#3B82F6" strokeWidth="0.6" />
        <line x1="19" y1="-3" x2="19" y2="3" stroke="#3B82F6" strokeWidth="0.6" />
        <rect x="-12" y="-6" width="24" height="12" rx="2" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} />
        <path d="M 12 -6 L 22 0 L 12 6 Z" fill="#FFD96B" stroke={STROKE} strokeWidth="2" strokeLinejoin="round" />
        <path d="M -12 -3 L -22 -1 L -22 1 L -12 3 Z" fill="#F97316" stroke={STROKE} strokeWidth="1.5" />
        <path d="M -22 -1 L -28 0 L -22 1 Z" fill="#FCD34D" />
      </g>
    </svg>
  );
}

function NodeOuterPlanetsSticker() {
  // Jupiter (banded with GRS), Saturn with proper ring system, Uranus
  // tilted with vertical-ish rings, Neptune with storm spot.
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="116" fill="#FFE9A8" opacity="0.35" />
      <circle cx="120" cy="120" r="92" fill="#C4B5FD" opacity="0.25" />
      {/* JUPITER */}
      <g>
        <circle cx="78" cy="86" r="56" fill="#E8C547" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="78" cy="74" rx="48" ry="20" fill="#FFE9A8" opacity="0.55" />
        <g fill="#B8862E" opacity="0.7">
          <ellipse cx="78" cy="64" rx="50" ry="4" />
          <ellipse cx="78" cy="76" rx="54" ry="3" />
          <ellipse cx="78" cy="88" rx="56" ry="5" />
          <ellipse cx="78" cy="104" rx="52" ry="3.5" />
          <ellipse cx="78" cy="118" rx="46" ry="4" />
        </g>
        <g fill="#9A6A1F" opacity="0.55">
          <ellipse cx="78" cy="98" rx="50" ry="2" />
          <ellipse cx="78" cy="116" rx="44" ry="2" />
        </g>
        <ellipse cx="92" cy="108" rx="11" ry="6" fill="#DC2626" stroke={STROKE} strokeWidth="2" />
        <ellipse cx="92" cy="108" rx="6" ry="3" fill="#9A1B1B" />
      </g>
      {/* SATURN — proper ring system: filled tilted ring band, planet on top, then front half of ring re-drawn over the planet via clipPath */}
      <g>
        <ellipse cx="170" cy="158" rx="68" ry="18" fill="#E8E2D0" stroke={STROKE} strokeWidth={STROKE_W} transform="rotate(-18 170 158)" />
        <ellipse cx="170" cy="158" rx="56" ry="11" fill="none" stroke="#9A8C6E" strokeWidth="2" opacity="0.85" transform="rotate(-18 170 158)" />
        <ellipse cx="170" cy="158" rx="52" ry="9" fill="#C4B099" opacity="0.85" transform="rotate(-18 170 158)" />
        <circle cx="170" cy="158" r="38" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="160" cy="148" rx="22" ry="12" fill="#FFD96B" opacity="0.55" />
        <g stroke="#9A6A1F" strokeWidth="2" fill="none" opacity="0.6">
          <path d="M 138 152 Q 170 148 202 152" />
          <path d="M 134 162 Q 170 158 206 162" />
          <path d="M 138 172 Q 170 168 202 172" />
        </g>
        <defs>
          <clipPath id="saturn-front-half">
            <rect x="80" y="158" width="200" height="60" />
          </clipPath>
        </defs>
        <g clipPath="url(#saturn-front-half)">
          <ellipse cx="170" cy="158" rx="68" ry="18" fill="#E8E2D0" stroke={STROKE} strokeWidth={STROKE_W} transform="rotate(-18 170 158)" />
          <ellipse cx="170" cy="158" rx="56" ry="11" fill="none" stroke="#9A8C6E" strokeWidth="2" opacity="0.85" transform="rotate(-18 170 158)" />
          <ellipse cx="170" cy="158" rx="52" ry="9" fill="#C4B099" opacity="0.85" transform="rotate(-18 170 158)" />
        </g>
      </g>
      {/* URANUS */}
      <g transform="translate(50 178)">
        <ellipse rx="24" ry="6" fill="none" stroke="#7AC4FF" strokeWidth="3" transform="rotate(75)" />
        <ellipse rx="24" ry="6" fill="none" stroke={STROKE} strokeWidth="1.2" transform="rotate(75)" />
        <circle r="20" fill="#7AC4FF" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="-4" cy="-4" rx="9" ry="6" fill="#A7E2F0" opacity="0.6" />
        <ellipse rx="24" ry="6" fill="none" stroke="#7AC4FF" strokeWidth="3" transform="rotate(75)" opacity="0.7" />
      </g>
      {/* NEPTUNE */}
      <g transform="translate(196 60)">
        <circle r="18" fill="#1E3A8A" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="-3" cy="-3" rx="8" ry="5" fill="#3B82F6" opacity="0.55" />
        <ellipse cx="3" cy="4" rx="6" ry="3" fill="#0F1A4A" stroke={STROKE} strokeWidth="1.2" />
        <ellipse cx="3" cy="4" rx="3" ry="1.5" fill="white" opacity="0.45" />
        <ellipse rx="18" ry="2" fill="none" stroke="#0F1A4A" strokeWidth="1.5" opacity="0.6" />
      </g>
    </svg>
  );
}

function NodeHopeProbeSticker() {
  // Mars front and center with detailed terrain (poles, mare, Olympus
  // Mons hint), the Hope Probe in foreground with dish + solar panels +
  // proper UAE flag patch (red hoist + green/white/black stripes).
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true">
      <circle cx="120" cy="120" r="116" fill="#FFD7B5" opacity="0.35" />
      <circle cx="120" cy="120" r="86" fill="#FBA471" opacity="0.3" />
      <ellipse cx="142" cy="128" rx="98" ry="86" fill="none" stroke={STROKE} strokeWidth="2" strokeDasharray="4 6" opacity="0.55" transform="rotate(-15 142 128)" />
      <g>
        <circle cx="142" cy="128" r="62" fill="#E26E4D" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="120" cy="106" rx="26" ry="18" fill="#F4A07F" opacity="0.55" />
        <path d="M 200 132 A 62 62 0 0 1 142 188 Q 178 178 196 152 Z" fill="#9A3412" opacity="0.4" />
        <path d="M 116 76 Q 142 66 168 76 Q 162 86 142 84 Q 122 86 116 76 Z" fill="#FEE2E2" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M 124 184 Q 142 188 156 184 Q 152 178 142 178 Q 132 178 124 184 Z" fill="#FEE2E2" stroke={STROKE} strokeWidth="1.2" strokeLinejoin="round" />
        <g fill="#7F1D1D" opacity="0.6">
          <circle cx="124" cy="124" r="6" />
          <circle cx="158" cy="142" r="5" />
          <circle cx="138" cy="160" r="4" />
          <circle cx="170" cy="120" r="3" />
        </g>
        <path d="M 116 138 L 124 130 L 132 138 L 128 144 L 120 144 Z" fill="#9A3412" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" opacity="0.85" />
        <path d="M 110 150 Q 130 154 160 150" stroke="#7F1D1D" strokeWidth="3" fill="none" opacity="0.7" strokeLinecap="round" />
      </g>
      <g transform="translate(48 60) rotate(-20)">
        <rect x="-46" y="-9" width="28" height="18" fill="#1E3A8A" stroke={STROKE} strokeWidth={STROKE_W} />
        <g stroke="#3B82F6" strokeWidth="0.8">
          <line x1="-39" y1="-9" x2="-39" y2="9" />
          <line x1="-32" y1="-9" x2="-32" y2="9" />
          <line x1="-25" y1="-9" x2="-25" y2="9" />
        </g>
        <rect x="18" y="-9" width="28" height="18" fill="#1E3A8A" stroke={STROKE} strokeWidth={STROKE_W} />
        <g stroke="#3B82F6" strokeWidth="0.8">
          <line x1="25" y1="-9" x2="25" y2="9" />
          <line x1="32" y1="-9" x2="32" y2="9" />
          <line x1="39" y1="-9" x2="39" y2="9" />
        </g>
        <rect x="-16" y="-12" width="32" height="22" fill="#D4AF37" stroke={STROKE} strokeWidth={STROKE_W} />
        <path d="M -10 -12 Q 0 -28 10 -12 Z" fill="#F5F5F5" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
        <line x1="0" y1="-28" x2="0" y2="-34" stroke={STROKE} strokeWidth="2" />
        <circle cx="0" cy="-34" r="2" fill="#9A9189" stroke={STROKE} strokeWidth="1" />
        <g transform="translate(-12 -3)">
          <rect x="0" y="0" width="3.5" height="9" fill="#CE1126" stroke={STROKE} strokeWidth="0.5" />
          <rect x="3.5" y="0" width="9" height="3" fill="#009639" />
          <rect x="3.5" y="3" width="9" height="3" fill="#FFFFFF" />
          <rect x="3.5" y="6" width="9" height="3" fill="#1A1A2E" />
          <rect x="3.5" y="0" width="9" height="9" fill="none" stroke={STROKE} strokeWidth="0.5" />
        </g>
      </g>
      <g fill="#1A1A2E">
        <circle cx="22" cy="180" r="2" />
        <circle cx="36" cy="216" r="1.6" />
        <circle cx="220" cy="44" r="2" />
      </g>
    </svg>
  );
}

/* Heritage extras — user-supplied SVGs (Abu Dhabi skyline + Liwa Oasis). */
function AbuDhabiSkylineSticker() {
  return (
    <div
      style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
      dangerouslySetInnerHTML={{ __html: USER_STICKER_SVGS['abu-dhabi-skyline'] ?? "" }}
    />
  );
}
function LiwaOasisSticker() {
  return (
    <div
      style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
      dangerouslySetInnerHTML={{ __html: USER_STICKER_SVGS['liwa-oasis'] ?? "" }}
    />
  );
}

const STICKERS: Record<StickerName, React.ComponentType<{ animated?: boolean }>> = {
  sun: ({ animated }) => <SunFace animated={animated} />,
  "sun-hot": ({ animated }) => <SunFace animated={animated} hot />,
  "sun-and-earth": () => <SunAndEarthSticker />,
  earth: ({ animated }) => <EarthSticker animated={animated} />,
  moon: () => <MoonSticker phase="full" />,
  "moon-full": () => <MoonSticker phase="full" />,
  "moon-crescent": () => <MoonSticker phase="crescent" />,
  "moon-phases": () => <MoonPhasesSticker />,
  "day-night": () => <DayNightSticker />,
  mercury: () => <MercurySticker />,
  venus: () => <VenusSticker />,
  mars: ({ animated }) => <MarsSticker animated={animated} />,
  "rocky-planets": () => <RockyPlanetsSticker />,
  asteroid: ({ animated }) => <AsteroidSticker animated={animated} />,
  "asteroid-belt": ({ animated }) => <AsteroidBeltSticker animated={animated} />,
  "asteroid-shapes": ({ animated }) => <AsteroidSticker animated={animated} />,
  jupiter: () => <JupiterSticker />,
  saturn: () => <SaturnSticker />,
  "ice-giants": () => <IceGiantsSticker />,
  "gas-vs-rocky": () => <GasVsRockySticker />,
  "hope-probe": ({ animated }) => <HopeProbeSticker animated={animated} />,
  "hope-mars": () => <HopeMarsSticker />,
  "uae-astronaut": () => <UaeFlagSticker />,
  "mars-city": () => <MarsCitySticker />,
  rocket: ({ animated }) => <RocketSticker animated={animated} />,
  telescope: () => <TelescopeSticker />,
  star: () => <StarSticker />,
  comet: () => <CometSticker />,
  "uae-flag": () => <UaeFlagSticker />,
  dallah: () => <DallahSticker />,
  "ghaf-tree": () => <GhafSticker />,
  // UAE landmarks
  "burj-khalifa": () => <BurjKhalifaSticker />,
  "sheikh-zayed-mosque": () => <SheikhZayedMosqueSticker />,
  "burj-al-arab": () => <BurjAlArabSticker />,
  "louvre-abu-dhabi": () => <LouvreAbuDhabiSticker />,
  "dhow-boat": () => <DhowBoatSticker />,
  "qasr-al-hosn": () => <QasrAlHosnSticker />,
  // Heritage emirate stickers
  "al-noor-mosque": () => <AlNoorMosqueSticker />,
  "ajman-fort": () => <AjmanFortSticker />,
  flamingo: () => <FlamingoSticker />,
  "uaq-fort": () => <UaqFortSticker />,
  cormorant: () => <CormorantSticker />,
  "jebel-jais": () => <JebelJaisSticker />,
  "al-bidya-mosque": () => <AlBidyaMosqueSticker />,
  "snoopy-island": () => <SnoopyIslandSticker />,
  "pearl-oyster": () => <PearlOysterSticker />,
  // Abu Dhabi step stickers
  "abu-dhabi-map": () => <AbuDhabiMapSticker />,
  gazelle: () => <GazelleSticker />,
  "mosque-domes-closeup": () => <MosqueDomesCloseupSticker />,
  "mosque-night": () => <MosqueNightSticker />,
  "mosque-arch": () => <MosqueArchSticker />,
  "liwa-dunes": () => <LiwaDunesSticker />,
  "tal-moreeb": () => <TalMoreebSticker />,
  // VIP people are intentionally redirected to the UAE flag instead of
  // a personal portrait — Falcon's Journey policy.
  "sheikh-zayed-portrait": () => <UaeFlagSticker />,
  "qasr-al-watan": () => <QasrAlWatanSticker />,
  "bedouin-tent": () => <BedouinTentSticker />,
  // Dubai step stickers
  "dubai-map": () => <DubaiMapSticker />,
  "palm-jumeirah": () => <PalmJumeirahSticker />,
  "dubai-creek": () => <DubaiCreekSticker />,
  "dubai-frame": () => <DubaiFrameSticker />,
  "pearl-diver": () => <PearlDiverSticker />,
  "burj-khalifa-night": () => <BurjKhalifaNightSticker />,
  "gold-souq": () => <GoldSouqSticker />,
  "wind-tower": () => <WindTowerSticker />,
  "hatta-dam": () => <HattaDamSticker />,
  "dubai-skyline": () => <DubaiSkylineSticker />,
  // Sharjah step stickers
  "sharjah-map": () => <SharjahMapSticker />,
  "two-seas-map": () => <TwoSeasMapSticker />,
  "sharjah-museum": () => <SharjahMuseumSticker />,
  "mleiha-tools": () => <MleihaToolsSticker />,
  "khor-fakkan-beach": () => <KhorFakkanBeachSticker />,
  "khor-fakkan-amphitheater": () => <KhorFakkanAmphitheaterSticker />,
  "sharjah-book": () => <SharjahBookSticker />,
  "algebra-scroll": () => <AlgebraScrollSticker />,
  "cultural-square": () => <CulturalSquareSticker />,
  "hajar-mountains": () => <HajarMountainsSticker />,
  // Ajman step stickers
  "ajman-map": () => <AjmanMapSticker />,
  "dhow-yard": () => <DhowYardSticker />,
  "mowaihat-tomb": () => <MowaihatTombSticker />,
  "ajman-corniche": () => <AjmanCornicheSticker />,
  "mangrove-trees": () => <MangroveTreesSticker />,
  "bronze-age-pottery": () => <BronzeAgePotterySticker />,
  "pearl-shell": () => <PearlShellSticker />,
  "coral-stone-wall": () => <CoralStoneWallSticker />,
  "fisherman-net": () => <FishermanNetSticker />,
  "ajman-skyline": () => <AjmanSkylineSticker />,
  // Umm Al Quwain step stickers
  "uaq-map": () => <UaqMapSticker />,
  "al-sinniyah-island": () => <AlSinniyahIslandSticker />,
  "ed-dur-ruins": () => <EdDurRuinsSticker />,
  falaj: () => <FalajSticker />,
  "roman-trade": () => <RomanTradeSticker />,
  "lagoon-mangrove": () => <LagoonMangroveSticker />,
  "pearling-village": () => <PearlingVillageSticker />,
  "seabird-flock": () => <SeabirdFlockSticker />,
  "gazelle-island": () => <GazelleIslandSticker />,
  "uaq-skyline": () => <UaqSkylineSticker />,
  // Ras Al Khaimah step stickers
  "rak-map": () => <RakMapSticker />,
  "dhayah-fort": () => <DhayahFortSticker />,
  "pearl-farm": () => <PearlFarmSticker />,
  "zipline-rider": () => <ZiplineRiderSticker />,
  "snowy-peak": () => <SnowyPeakSticker />,
  "mountain-village": () => <MountainVillageSticker />,
  "oyster-rope": () => <OysterRopeSticker />,
  "ancient-port": () => <AncientPortSticker />,
  "palm-tent": () => <PalmTentSticker />,
  "rak-skyline": () => <RakSkylineSticker />,
  // Fujairah step stickers
  "fujairah-map": () => <FujairahMapSticker />,
  wadi: () => <WadiSticker />,
  "mango-orchard": () => <MangoOrchardSticker />,
  "sea-turtle": () => <SeaTurtleSticker />,
  "coral-reef": () => <CoralReefSticker />,
  clownfish: () => <ClownfishSticker />,
  "fujairah-fort": () => <FujairahFortSticker />,
  "bidya-domes-closeup": () => <BidyaDomesCloseupSticker />,
  "gulf-of-oman": () => <GulfOfOmanSticker />,
  "fujairah-skyline": () => <FujairahSkylineSticker />,
  // Space — Sun & Earth/Moon step extras
  "sun-rays": () => <SunRaysSticker />,
  "sun-corona": () => <SunCoronaSticker />,
  "sun-vs-earth-size": () => <SunVsEarthSizeSticker />,
  "sunlight-travel": () => <SunlightTravelSticker />,
  "plant-photosynthesis": () => <PlantPhotosynthesisSticker />,
  "sun-temperature": () => <SunTemperatureSticker />,
  "earth-water": () => <EarthWaterSticker />,
  "earth-rotation": () => <EarthRotationSticker />,
  "moon-orbit": () => <MoonOrbitSticker />,
  "moon-reflect": () => <MoonReflectSticker />,
  tides: () => <TidesSticker />,
  "moon-cycle": () => <MoonCycleSticker />,
  "earth-from-space": () => <EarthFromSpaceSticker />,
  "earth-night": () => <EarthNightSticker />,
  // Space — Inner Planets step extras
  "mercury-craters": () => <MercuryCratersSticker />,
  "mercury-fast": () => <MercuryFastSticker />,
  "venus-clouds": () => <VenusCloudsSticker />,
  "venus-hot": () => <VenusHotSticker />,
  "mars-rover": () => <MarsRoverSticker />,
  "mars-poles": () => <MarsPolesSticker />,
  "mars-canyon": () => <MarsCanyonSticker />,
  "inner-orbit": () => <InnerOrbitSticker />,
  "red-planet-closeup": () => <RedPlanetCloseupSticker />,
  "rocky-vs-gas": () => <RockyVsGasSticker />,
  // Space — Asteroid Belt step extras
  "asteroid-cluster": () => <AsteroidClusterSticker />,
  "asteroid-shape-variety": () => <AsteroidShapeVarietySticker />,
  "asteroid-collision": () => <AsteroidCollisionSticker />,
  "belt-from-above": () => <BeltFromAboveSticker />,
  "meteor-shower": () => <MeteorShowerSticker />,
  "dwarf-planet": () => <DwarfPlanetSticker />,
  "asteroid-mining": () => <AsteroidMiningSticker />,
  "belt-position": () => <BeltPositionSticker />,
  "comet-tail": () => <CometTailSticker />,
  "space-rock": () => <SpaceRockSticker />,
  // Space — Outer Planets step extras
  "jupiter-bands": () => <JupiterBandsSticker />,
  "jupiter-storm": () => <JupiterStormSticker />,
  "jupiter-moons": () => <JupiterMoonsSticker />,
  "saturn-rings-closeup": () => <SaturnRingsCloseupSticker />,
  "saturn-tilt": () => <SaturnTiltSticker />,
  "uranus-tilt": () => <UranusTiltSticker />,
  "neptune-storm": () => <NeptuneStormSticker />,
  "gas-giant-comparison": () => <GasGiantComparisonSticker />,
  "outer-orbit": () => <OuterOrbitSticker />,
  "huge-jupiter": () => <HugeJupiterSticker />,
  "hope-launch": () => <HopeLaunchSticker />,
  "hope-orbit-mars": () => <HopeOrbitMarsSticker />,
  "hope-camera": () => <HopeCameraSticker />,
  "hope-team": () => <HopeTeamSticker />,
  "mars-from-hope": () => <MarsFromHopeSticker />,
  "mars-atmosphere-data": () => <MarsAtmosphereDataSticker />,
  "uae-50th-anniversary": () => <Uae50thAnniversarySticker />,
  "mbrsc-center": () => <MbrscCenterSticker />,
  "astronaut-neyadi": () => <UaeFlagSticker />,
  "mars-2117": () => <Mars2117Sticker />,
  "node-abu-dhabi": () => <NodeAbuDhabiSticker />,
  "node-dubai": () => <NodeDubaiSticker />,
  "node-sharjah": () => <NodeSharjahSticker />,
  "node-ajman": () => <NodeAjmanSticker />,
  "node-umm-al-quwain": () => <NodeUmmAlQuwainSticker />,
  "node-ras-al-khaimah": () => <NodeRasAlKhaimahSticker />,
  "node-fujairah": () => <NodeFujairahSticker />,
  "node-sun": () => <NodeSunSticker />,
  "node-earth-moon": () => <NodeEarthMoonSticker />,
  "node-inner-planets": () => <NodeInnerPlanetsSticker />,
  "node-asteroid-belt": () => <NodeAsteroidBeltSticker />,
  "node-outer-planets": () => <NodeOuterPlanetsSticker />,
  "node-hope-probe": () => <NodeHopeProbeSticker />,
  "abu-dhabi-skyline": () => <AbuDhabiSkylineSticker />,
  "liwa-oasis": () => <LiwaOasisSticker />,
};

export default function Sticker({ name, size, className = "", animated = true }: StickerProps) {
  const Comp = STICKERS[name];
  if (!Comp) return null;
  // If size is given, render at that fixed pixel size.
  // If not, fill the parent container — this is the safer default since
  // it lets the tile/card control the bounds and prevents overflow.
  // borderRadius + overflow:hidden on the wrapper softens the corners of
  // any sticker that paints its own full-canvas background, so it doesn't
  // read as a hard "square inside the tile's square".
  const style: React.CSSProperties =
    typeof size === "number"
      ? {
          width: size,
          height: size,
          display: "inline-block",
          borderRadius: "18%",
          overflow: "hidden",
        }
      : {
          width: "100%",
          height: "100%",
          display: "block",
          borderRadius: "18%",
          overflow: "hidden",
        };
  return (
    <div className={className} style={style}>
      <Comp animated={animated} />
    </div>
  );
}

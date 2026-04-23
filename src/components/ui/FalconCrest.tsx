"use client";

interface FalconCrestProps {
  size?: number;
  className?: string;
  variant?: "gold" | "navy";
}

/* Stylized falcon crest — inspired by the UAE coat of arms (not a replica).
   Falcon facing right with seven raised feathers on a round shield, framed
   by an 8-point gold star ring. Used on the Master Explorer certificate. */
export default function FalconCrest({
  size = 96,
  className = "",
  variant = "gold",
}: FalconCrestProps) {
  const isGold = variant === "gold";
  const ringColor = isGold ? "#D4AF37" : "#1A1A2E";
  const ringHi = isGold ? "#FFD96B" : "#3B3B5E";
  const ringLo = isGold ? "#9C7C28" : "#0F0F23";
  const shieldFrom = isGold ? "#FFF3C2" : "#F5F0DC";
  const shieldTo = isGold ? "#E8C879" : "#C8B97A";
  const falconFill = "#1A1A2E";
  const flagRed = "#CE1126";
  const flagGreen = "#009639";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-label="Falcon crest"
      role="img"
    >
      <defs>
        <radialGradient id="fc-ring" cx="50%" cy="40%">
          <stop offset="0%" stopColor={ringHi} />
          <stop offset="60%" stopColor={ringColor} />
          <stop offset="100%" stopColor={ringLo} />
        </radialGradient>
        <radialGradient id="fc-shield" cx="50%" cy="40%">
          <stop offset="0%" stopColor={shieldFrom} />
          <stop offset="100%" stopColor={shieldTo} />
        </radialGradient>
        <filter id="fc-shadow">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      {/* Outer 8-point star ring */}
      <g>
        {Array.from({ length: 8 }).map((_, i) => {
          const r3 = (n: number) => Math.round(n * 1000) / 1000;
          const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
          const r = 47;
          const cx = r3(50 + Math.cos(a) * r);
          const cy = r3(50 + Math.sin(a) * r);
          const star = Array.from({ length: 8 }).map((_, j) => {
            const aa = (j / 8) * Math.PI * 2 - Math.PI / 2;
            const rr = j % 2 === 0 ? 4 : 1.6;
            return `${j === 0 ? "M" : "L"}${r3(cx + Math.cos(aa) * rr)},${r3(cy + Math.sin(aa) * rr)}`;
          }).join(" ") + " Z";
          return (
            <path
              key={i}
              d={star}
              fill={ringHi}
              stroke={ringLo}
              strokeWidth="0.4"
            />
          );
        })}
      </g>

      {/* Outer ring */}
      <circle cx="50" cy="50" r="42" fill="url(#fc-ring)" />
      <circle cx="50" cy="50" r="38" fill="url(#fc-shield)" stroke={ringLo} strokeWidth="0.6" />

      {/* Inner decorative band — Khaleeji geometric */}
      <circle cx="50" cy="50" r="36" fill="none" stroke={ringLo} strokeWidth="0.4" strokeDasharray="1 1.5" opacity="0.6" />

      {/* Flag-colored ribbon at bottom */}
      <path d="M 28 78 Q 50 86 72 78 L 72 82 Q 50 90 28 82 Z" fill={flagRed} />
      <path d="M 28 80 Q 50 87 72 80 L 72 82 Q 50 89 28 82 Z" fill={flagGreen} opacity="0.6" />

      {/* Falcon body — facing right, head up, wings folded behind */}
      <g filter="url(#fc-shadow)">
        {/* Tail feathers (behind) */}
        <path
          d="M 24 56 L 18 58 L 16 62 L 22 60 L 20 64 L 26 60 L 24 64 L 30 60 Z"
          fill={falconFill}
          opacity="0.85"
        />
        {/* Body */}
        <ellipse cx="44" cy="56" rx="14" ry="11" fill={falconFill} />
        {/* Chest highlight */}
        <ellipse cx="44" cy="60" rx="6" ry="5" fill={falconFill} />
        {/* Head */}
        <circle cx="56" cy="46" r="7" fill={falconFill} />
        {/* Beak */}
        <path d="M 62 46 L 68 47 L 62 49 Z" fill="#D4AF37" stroke="#9C7C28" strokeWidth="0.3" />
        {/* Eye */}
        <circle cx="58" cy="44" r="1.4" fill="#FFD96B" />
        <circle cx="58.3" cy="44" r="0.6" fill="#1A1A2E" />
        {/* Hood crest line */}
        <path d="M 53 41 Q 56 38 60 40" stroke="#D4AF37" strokeWidth="0.7" fill="none" />

        {/* Seven raised feathers above the back */}
        {Array.from({ length: 7 }).map((_, i) => {
          const baseX = 32 + i * 3.5;
          const baseY = 47;
          const tipX = baseX + 1.5;
          const tipY = baseY - 14 + Math.abs(i - 3) * 1.4;
          return (
            <path
              key={i}
              d={`M ${baseX} ${baseY} Q ${baseX + 0.5} ${(baseY + tipY) / 2 - 1} ${tipX} ${tipY} Q ${tipX + 1} ${(baseY + tipY) / 2 + 1} ${baseX + 2} ${baseY}`}
              fill={falconFill}
              opacity={0.95}
            />
          );
        })}

        {/* Talon */}
        <path d="M 40 67 L 38 70 M 44 67 L 44 71 M 48 67 L 50 70" stroke="#D4AF37" strokeWidth="0.8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

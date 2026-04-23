"use client";

import BadgeIcon from "./BadgeIcon";
import { badges } from "@/data/badges";

/* === Badge medallion ===========================================
   Layered trophy: outer gold ring + sunburst rays + inner darker
   theme-colored disc with the BadgeIcon on top. Used everywhere a
   badge needs to be shown (rewards page tiles, modals, lesson
   complete celebration). One canonical visual. */
export default function BadgeMedallion({
  badge,
  unlocked,
  size = 64,
}: {
  badge: typeof badges[number];
  unlocked: boolean;
  size?: number;
}) {
  const [g0, g1] = badge.theme.gradient;
  const accent = badge.theme.accent;

  if (!unlocked) {
    return (
      <div
        className="relative rounded-full flex items-center justify-center border-2"
        style={{
          width: size,
          height: size,
          background: "radial-gradient(circle at 30% 25%, #C9C0AC, #8A8270)",
          borderColor: "#5C5544",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 3px 0 rgba(0,0,0,0.15)",
        }}
      >
        {/* Hand-drawn padlock — heavier strokes than lucide, friendlier shape. */}
        <svg
          viewBox="0 0 32 32"
          width={size * 0.5}
          height={size * 0.5}
          aria-hidden="true"
        >
          <path
            d="M 11 14 L 11 10 Q 11 5 16 5 Q 21 5 21 10 L 21 14"
            fill="none"
            stroke="#3D3528"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <rect
            x="8"
            y="14"
            width="16"
            height="13"
            rx="2.5"
            fill="#5C5444"
            stroke="#3D3528"
            strokeWidth="2"
          />
          <circle cx="16" cy="20" r="1.8" fill="#3D3528" />
          <rect x="15.2" y="20" width="1.6" height="4" fill="#3D3528" />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Sunburst rays behind the medallion — gold, very subtle */}
      <svg
        className="absolute inset-0"
        viewBox="0 0 100 100"
        width={size}
        height={size}
        aria-hidden="true"
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x1 = 50 + Math.cos(a) * 38;
          const y1 = 50 + Math.sin(a) * 38;
          const x2 = 50 + Math.cos(a) * 50;
          const y2 = 50 + Math.sin(a) * 50;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={accent}
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.55"
            />
          );
        })}
      </svg>

      {/* Outer gold ring */}
      <div
        className="absolute inset-1 rounded-full border-2"
        style={{
          background: `radial-gradient(circle at 30% 25%, ${accent}, ${g1})`,
          borderColor: "#1A1A2E",
          boxShadow: "inset 0 2px 4px rgba(255,255,255,0.4), 0 3px 0 rgba(0,0,0,0.2)",
        }}
      />

      {/* Inner darker disc holding the icon — gives the medallion depth */}
      <div
        className="absolute rounded-full flex items-center justify-center overflow-hidden"
        style={{
          inset: size * 0.12,
          background: `radial-gradient(circle at 30% 25%, ${g0}, ${g1})`,
          boxShadow:
            "inset 0 -2px 4px rgba(0,0,0,0.25), inset 0 2px 4px rgba(255,255,255,0.35)",
        }}
      >
        <BadgeIcon
          levelId={badge.levelId}
          subjectId={badge.subjectId}
          unlocked
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

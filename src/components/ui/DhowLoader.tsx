"use client";

import { motion, useReducedMotion } from "framer-motion";

/* === FalconLoader =====================================================
   "Forming the Crest" — a Khaleeji geometric seal that draws itself in
   stroke-by-stroke and then re-traces. No mascot, no orbiting. Pure
   craft: arabesque arcs, an 8-point star drawn live, a Sadu band that
   wipes around the rim.

   Each layer animates `pathLength` from 0→1→0 on its own loop, so the
   whole composition perpetually forms and reforms — calligraphy
   meets coin-press. Compact (140px), warm cream + gold, no dark edges.
   =================================================================== */

interface LoaderProps {
  className?: string;
}

const NAVY = "#1A1A2E";
const GOLD = "#D4AF37";
const GOLD_LIGHT = "#FFD96B";
const GOLD_DARK = "#B8862E";
const RED = "#CE1126";
const GREEN = "#009639";

/* The 8 vertices of an 8-point Khaleeji star inscribed in a circle of
   radius `r` centered at (cx, cy). Outer points alternate with inner
   points (radius `inner`). Returns an SVG `d` string. */
function starPath(cx: number, cy: number, r: number, inner: number) {
  const pts: string[] = [];
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2 - Math.PI / 2;
    const rr = i % 2 === 0 ? r : inner;
    const x = cx + Math.cos(a) * rr;
    const y = cy + Math.sin(a) * rr;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
  }
  pts.push("Z");
  return pts.join(" ");
}

/* A path along an arabesque petal — quadratic curves for the four
   cardinal lobes of an Arab geometric flower. Used as a backdrop
   that traces in behind the star. */
function arabesquePath(cx: number, cy: number, r: number) {
  const lobes: string[] = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const x1 = cx + Math.cos(a) * r;
    const y1 = cy + Math.sin(a) * r;
    const a2 = ((i + 1) / 8) * Math.PI * 2;
    const x2 = cx + Math.cos(a2) * r;
    const y2 = cy + Math.sin(a2) * r;
    // Control point pulled inward to make a petal arch
    const mid = (a + a2) / 2;
    const cxp = cx + Math.cos(mid) * (r * 0.55);
    const cyp = cy + Math.sin(mid) * (r * 0.55);
    lobes.push(`M${x1.toFixed(2)},${y1.toFixed(2)} Q${cxp.toFixed(2)},${cyp.toFixed(2)} ${x2.toFixed(2)},${y2.toFixed(2)}`);
  }
  return lobes.join(" ");
}

function FalconStage({ size }: { size: number }) {
  const prefersReduced = useReducedMotion();
  const reduced = prefersReduced ?? false;

  // Path strings (memoized via inline constants — pure geometry, cheap)
  const outerStar = starPath(50, 50, 36, 14);
  const innerStar = starPath(50, 50, 22, 9);
  const arabesque = arabesquePath(50, 50, 30);

  // Common loop: pathLength draws in, holds, wipes back out.
  // Different durations per layer keep them out of phase, so the seal
  // is always partially formed — never empty, never static.
  const drawCycle = (duration: number, delay = 0) => {
    if (reduced) return {};
    // Use a negative `delay` to fast-forward the timeline so the layer is
    // already partly drawn the moment the loader mounts. `initial` matches
    // a roughly mid-cycle pose so there's no flash of the start state.
    return {
      initial: { pathLength: 0.7, opacity: 1 },
      animate: {
        pathLength: [0, 1, 1, 0],
        opacity: [0, 1, 1, 0],
      },
      transition: {
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut" as const,
        times: [0, 0.45, 0.85, 1],
      },
    };
  };

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Soft cream→gold halo behind everything */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,217,107,0.55) 0%, rgba(255,217,107,0) 70%)",
        }}
        animate={
          reduced ? undefined : { scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }
        }
        transition={
          reduced
            ? undefined
            : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={{ display: "block", position: "relative", overflow: "visible" }}
      >
        <defs>
          <radialGradient id="disc-grad-v3" cx="50%" cy="45%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#FFFCEF" />
            <stop offset="100%" stopColor="#FFEFC7" />
          </radialGradient>
        </defs>

        {/* Cream disc base */}
        <circle cx="50" cy="50" r="44" fill="url(#disc-grad-v3)" />
        {/* Thin double rim — like an inked seal */}
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke={GOLD_DARK}
          strokeWidth="0.6"
          opacity="0.75"
        />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke={GOLD_DARK}
          strokeWidth="0.4"
          opacity="0.45"
        />

        {/* Tick marks around the rim — like a compass face */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
          const r1 = i % 3 === 0 ? 38 : 39.5;
          const x1 = 50 + Math.cos(a) * r1;
          const y1 = 50 + Math.sin(a) * r1;
          const x2 = 50 + Math.cos(a) * 41;
          const y2 = 50 + Math.sin(a) * 41;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={GOLD_DARK}
              strokeWidth={i % 3 === 0 ? 0.7 : 0.4}
              strokeLinecap="round"
              opacity="0.55"
            />
          );
        })}

        {/* === Layer 1: arabesque petals (slowest, deepest) === */}
        <motion.path
          d={arabesque}
          fill="none"
          stroke={GOLD}
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.7"
          {...drawCycle(3.6, -1.4)}
        />

        {/* === Layer 2: outer 8-point star, drawn in === */}
        <motion.path
          d={outerStar}
          fill="none"
          stroke={NAVY}
          strokeWidth="1.1"
          strokeLinejoin="round"
          strokeLinecap="round"
          {...drawCycle(3.0, -1.1)}
        />
        {/* Star fill that fades in/out of the stroke */}
        <motion.path
          d={outerStar}
          fill={GOLD}
          stroke="none"
          animate={reduced ? undefined : { opacity: [0, 0, 0.85, 0] }}
          transition={
            reduced
              ? undefined
              : {
                  duration: 3.0,
                  delay: -1.1,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                  times: [0, 0.4, 0.7, 1],
                }
          }
        />

        {/* === Layer 3: inner 8-point star — the focal anchor === */}
        <motion.path
          d={innerStar}
          fill="none"
          stroke={NAVY}
          strokeWidth="1.0"
          strokeLinejoin="round"
          strokeLinecap="round"
          {...drawCycle(2.4, -0.7)}
        />
        <motion.path
          d={innerStar}
          fill={GOLD_LIGHT}
          stroke="none"
          animate={reduced ? undefined : { opacity: [0, 0, 1, 0] }}
          transition={
            reduced
              ? undefined
              : {
                  duration: 2.4,
                  delay: -0.7,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                  times: [0, 0.5, 0.75, 1],
                }
          }
        />

        {/* === Layer 4: tiny center jewel that always sits there === */}
        <motion.circle
          cx="50"
          cy="50"
          r="2.2"
          fill={GOLD_LIGHT}
          stroke={NAVY}
          strokeWidth="0.5"
          animate={reduced ? undefined : { scale: [1, 1.4, 1] }}
          transition={
            reduced
              ? undefined
              : { duration: 2.0, repeat: Infinity, ease: "easeInOut" }
          }
          style={{ transformOrigin: "50px 50px" }}
        />

        {/* === Layer 5: rim wipe — a gold + red + green rotating dash
            pattern around the outer band, like Sadu thread being woven === */}
        {!reduced && (
          <motion.g
            style={{ transformOrigin: "50px 50px" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 7.0, ease: "linear", repeat: Infinity }}
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={GOLD}
              strokeWidth="1.4"
              strokeDasharray="6 4"
              strokeLinecap="round"
              opacity="0.8"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={RED}
              strokeWidth="0.6"
              strokeDasharray="2 12"
              strokeDashoffset="4"
              strokeLinecap="round"
              opacity="0.8"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={GREEN}
              strokeWidth="0.6"
              strokeDasharray="2 12"
              strokeDashoffset="10"
              strokeLinecap="round"
              opacity="0.8"
            />
          </motion.g>
        )}
        {reduced && (
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={GOLD}
            strokeWidth="1.2"
            strokeDasharray="6 4"
            opacity="0.8"
          />
        )}
      </svg>
    </div>
  );
}

export default function DhowLoader({
  className = "",
}: LoaderProps) {
  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center bg-gradient-to-b from-[#FFFCEF] to-[#FFE9A8] ${className}`}
      role="status"
      aria-label="Loading"
    >
      <FalconStage size={140} />
    </div>
  );
}

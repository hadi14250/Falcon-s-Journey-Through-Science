"use client";

import { useEffect, useState } from "react";

/* === InitialPaintLoader ================================================
   Renders a fully-static SVG seal directly in the SSR HTML so a hard
   refresh paints the loader BEFORE any JavaScript runs. Without this,
   client-only pages (most of the app) show a blank screen during the
   ~hundreds of ms between HTML arrival and React hydration.

   The static seal mirrors the visual grammar of `DhowLoader` (cream
   coin, gold rim, compass ticks, 8-point Khaleeji star, sadu-thread
   rim). No framer-motion — pure SVG with one CSS keyframe spin on the
   rim threads so there's a hint of life.

   Once React mounts, this component fades itself out and unmounts so
   the real interactive page takes over.
   =================================================================== */

const NAVY = "#1A1A2E";
const GOLD = "#D4AF37";
const GOLD_LIGHT = "#FFD96B";
const GOLD_DARK = "#B8862E";
const RED = "#CE1126";
const GREEN = "#009639";

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

export default function InitialPaintLoader() {
  // `mounted` flips true once React hydrates. We then fade out and
  // unmount so the real page is interactive.
  const [mounted, setMounted] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Hold for the fade-out, then unmount completely.
    const t = setTimeout(() => setRemoved(true), 350);
    return () => clearTimeout(t);
  }, []);

  if (removed) return null;

  const outerStar = starPath(50, 50, 36, 14);
  const innerStar = starPath(50, 50, 22, 9);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #FFFCEF, #FFE9A8)",
        opacity: mounted ? 0 : 1,
        transition: "opacity 0.3s ease-out",
        pointerEvents: mounted ? "none" : "auto",
      }}
    >
      <style>{`
        @keyframes seal-spin-svg {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes seal-pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.06); opacity: 1; }
        }
        /* Spin the rim using SVG-native rotation: we rotate an inner <g>
           via SMIL-equivalent CSS, anchored to the viewBox center (50,50).
           transform-origin in SVG units works when the element has
           transform-box:view-box on it. */
        .seal-rim {
          transform-box: view-box;
          transform-origin: 50px 50px;
          animation: seal-spin-svg 7s linear infinite;
        }
        .seal-halo { animation: seal-pulse 3.2s ease-in-out infinite; }
      `}</style>
      <div style={{ position: "relative", width: 140, height: 140 }}>
        {/* Soft halo */}
        <div
          className="seal-halo"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,217,107,0.55) 0%, rgba(255,217,107,0) 70%)",
          }}
        />
        <svg
          viewBox="0 0 100 100"
          width={140}
          height={140}
          style={{ display: "block", position: "relative", overflow: "visible" }}
        >
          <defs>
            <radialGradient id="ipl-disc" cx="50%" cy="45%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="65%" stopColor="#FFFCEF" />
              <stop offset="100%" stopColor="#FFEFC7" />
            </radialGradient>
          </defs>

          {/* Cream disc */}
          <circle cx="50" cy="50" r="44" fill="url(#ipl-disc)" />
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

          {/* Compass ticks */}
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

          {/* Outer star — drawn fully */}
          <path
            d={outerStar}
            fill={GOLD}
            stroke={NAVY}
            strokeWidth="1.1"
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Inner star — drawn fully */}
          <path
            d={innerStar}
            fill={GOLD_LIGHT}
            stroke={NAVY}
            strokeWidth="1.0"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Center jewel */}
          <circle
            cx="50"
            cy="50"
            r="2.2"
            fill={GOLD_LIGHT}
            stroke={NAVY}
            strokeWidth="0.5"
          />

          {/* Sadu-thread rim — CSS keyframe spin */}
          <g className="seal-rim">
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
          </g>
        </svg>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

/* Slow horizontal cloud drift for sky/oasis biomes. */
const clouds = [
  { y: 14, scale: 0.9, duration: 90, delay: 0, opacity: 0.45 },
  { y: 28, scale: 0.6, duration: 120, delay: -30, opacity: 0.30 },
  { y: 8,  scale: 1.1, duration: 150, delay: -60, opacity: 0.25 },
  { y: 38, scale: 0.7, duration: 100, delay: -45, opacity: 0.35 },
];

function CloudShape() {
  return (
    <svg viewBox="0 0 120 60" width="120" height="60" aria-hidden="true">
      <defs>
        <filter id="cloud-soft">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>
      <g fill="white" filter="url(#cloud-soft)">
        <ellipse cx="35" cy="35" rx="30" ry="15" />
        <ellipse cx="65" cy="28" rx="28" ry="18" />
        <ellipse cx="90" cy="38" rx="22" ry="13" />
        <ellipse cx="55" cy="42" rx="35" ry="11" />
      </g>
    </svg>
  );
}

export default function CloudDrift({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {clouds.map((c, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${c.y}%`,
            left: 0,
            transform: `scale(${c.scale})`,
            opacity: c.opacity,
          }}
          animate={{ x: ["-15vw", "115vw"] }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            ease: "linear",
            delay: c.delay,
          }}
        >
          <CloudShape />
        </motion.div>
      ))}
    </div>
  );
}

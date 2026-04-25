"use client";

import { motion } from "framer-motion";

interface PathSvgProps {
  nodePositions: { x: number; y: number }[];
  completedLevels: number[];
  currentLevel?: number;
}

/* Hand-drawn ink path for the treasure-map style.
   - Completed segments: solid sepia ink with gold overlay
   - Future segments: dashed dotted-trail
   - Current node gets a small "X marks the spot" rendered at its anchor */
export default function PathSvg({ nodePositions, completedLevels, currentLevel }: PathSvgProps) {
  if (nodePositions.length < 2) return null;

  const gap = 4;

  const segments = nodePositions.slice(0, -1).map((from, i) => {
    const to = nodePositions[i + 1];

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const nx = dx / length;
    const ny = dy / length;

    const sx = from.x + nx * gap;
    const sy = from.y + ny * gap;
    const ex = to.x - nx * gap;
    const ey = to.y - ny * gap;

    // Slight wobble for hand-drawn feel — perpendicular offset on control points
    const perpX = -ny;
    const perpY = nx;
    const wobble = ((i % 2 === 0 ? 1 : -1) * length) * 0.08;

    const cpx1 = sx + (ex - sx) * 0.35 + perpX * wobble;
    const cpy1 = sy + (ey - sy) * 0.35 + perpY * wobble;
    const cpx2 = sx + (ex - sx) * 0.65 - perpX * wobble * 0.6;
    const cpy2 = sy + (ey - sy) * 0.65 - perpY * wobble * 0.6;

    const d = `M ${sx} ${sy} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${ex} ${ey}`;
    const isCompleted = completedLevels.includes(i + 1);

    return { d, isCompleted };
  });

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="ink-bleed" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.15" />
        </filter>
      </defs>

      {segments.map((seg, i) => (
        <g key={i}>
          {seg.isCompleted ? (
            <>
              {/* Sepia ink underlay (slightly thicker, blurred) */}
              <path
                d={seg.d}
                fill="none"
                stroke="#5C4510"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.85"
                filter="url(#ink-bleed)"
              />
              {/* Gold inked overlay */}
              <motion.path
                d={seg.d}
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.75"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: i * 0.25, ease: "easeInOut" }}
              />
            </>
          ) : (
            /* Dotted ink trail for unwalked segments */
            <path
              d={seg.d}
              fill="none"
              stroke="#3A2A0A"
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeDasharray="0.3 1.4"
              opacity="0.55"
            />
          )}
        </g>
      ))}

      {/* "X marks the spot" — drawn at the current level's position */}
      {currentLevel !== undefined && nodePositions[currentLevel - 1] && (
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          transform={`translate(${nodePositions[currentLevel - 1].x} ${nodePositions[currentLevel - 1].y - 8})`}
        >
          <line x1="-2" y1="-2" x2="2" y2="2" stroke="#CE1126" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="-2" y1="2" x2="2" y2="-2" stroke="#CE1126" strokeWidth="0.7" strokeLinecap="round" />
        </motion.g>
      )}
    </svg>
  );
}

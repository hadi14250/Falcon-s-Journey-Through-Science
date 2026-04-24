"use client";

import { motion, AnimatePresence } from "framer-motion";

interface HeartRowProps {
  total: number;
  remaining: number;
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="heart-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF6B7E" />
          <stop offset="100%" stopColor="#E51A33" />
        </linearGradient>
      </defs>
      <path
        d="M16 28 C 6 22, 2 14, 5 9 C 8 4, 13 5, 16 9 C 19 5, 24 4, 27 9 C 30 14, 26 22, 16 28 Z"
        fill={filled ? "url(#heart-grad)" : "#E5E7EB"}
        stroke={filled ? "#B40D20" : "#9CA3AF"}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {filled && (
        <path
          d="M11 11 Q 13 8, 16 9"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      )}
    </svg>
  );
}

/* Display the heart budget at the top of a lesson.
   Lost hearts animate out with a heartbreak-style flicker. */
export default function HeartRow({ total, remaining }: HeartRowProps) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`${remaining} hearts remaining of ${total}`}>
      <AnimatePresence initial={false}>
        {Array.from({ length: total }).map((_, i) => {
          const filled = i < remaining;
          return (
            <motion.div
              key={i}
              initial={{ scale: 1 }}
              animate={
                filled
                  ? { scale: 1, opacity: 1 }
                  : { scale: [1, 1.4, 0.9, 1], opacity: 1 }
              }
              transition={{ duration: 0.45 }}
            >
              <HeartIcon filled={filled} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  showText?: boolean;
  className?: string;
}

export default function ProgressBar({
  current,
  max,
  label = "XP",
  showText = true,
  className = "",
}: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className={`w-full ${className}`}>
      {showText && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-heading font-semibold text-desert-night">
            {label}
          </span>
          <span className="text-sm font-body font-bold text-gold-dark">
            {current} / {max}
          </span>
        </div>
      )}
      <div
        className="relative h-4 rounded-full overflow-hidden bg-sand-warm/50 border border-gold/20"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`${label}: ${current} out of ${max}`}
      >
        {/* Sadu pattern background texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 4px,
              rgba(212, 175, 55, 0.3) 4px,
              rgba(212, 175, 55, 0.3) 6px
            )`,
          }}
          aria-hidden="true"
        />
        {/* Fill */}
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light relative"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}

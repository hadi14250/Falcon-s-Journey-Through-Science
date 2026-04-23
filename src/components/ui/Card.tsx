"use client";

import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  withBorder?: boolean;
}

export default function Card({ children, className = "", withBorder = true }: CardProps) {
  return (
    <motion.div
      className={`
        relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg
        ${withBorder ? "border-2 border-gold/30" : ""}
        ${className}
      `}
      whileHover={{ y: -2, boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.2 }}
    >
      {withBorder && (
        <>
          {/* Arabesque corner decorations */}
          <svg className="absolute top-0 left-0 w-8 h-8 text-gold/40" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M0 0 L16 0 Q8 8 0 16 Z" fill="currentColor" />
            <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.6" />
          </svg>
          <svg className="absolute top-0 right-0 w-8 h-8 text-gold/40 rotate-90" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M0 0 L16 0 Q8 8 0 16 Z" fill="currentColor" />
            <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.6" />
          </svg>
          <svg className="absolute bottom-0 left-0 w-8 h-8 text-gold/40 -rotate-90" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M0 0 L16 0 Q8 8 0 16 Z" fill="currentColor" />
            <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.6" />
          </svg>
          <svg className="absolute bottom-0 right-0 w-8 h-8 text-gold/40 rotate-180" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M0 0 L16 0 Q8 8 0 16 Z" fill="currentColor" />
            <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.6" />
          </svg>
        </>
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

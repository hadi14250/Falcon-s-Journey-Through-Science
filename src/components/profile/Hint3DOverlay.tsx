"use client";

import { motion } from "framer-motion";

/* === Hint3DOverlay — bilingual "tap to view in 3D" pill rendered as
   an overlay at the BOTTOM of the avatar/stage card. Replaces the older
   under-name Hint3D. Sits inside the card so the affordance and its
   caption read as one unit.

   Caller must mount this inside a wrapper that has `group` class so the
   `lg:group-hover:opacity-0` rule fires — once a desktop user hovers
   the card (which animates), the caption is redundant and fades out.
   On mobile / non-hover devices the caption stays visible.

   Caller is responsible for only mounting this when a 3D model is
   actually registered for the current avatar+item combo.
   ==================================================================== */

interface Props {
  className?: string;
  /* Override for the text size class — defaults to the Souq sizing
     (text-[10px] on mobile, text-[13px] on lg). Profile overrides to a
     smaller size since its hero cards are tighter. */
  textSizeClass?: string;
}

export default function Hint3DOverlay({
  className = "",
  textSizeClass = "text-[10px] lg:text-[13px]",
}: Props) {
  return (
    <motion.div
      className={`pointer-events-none absolute top-1.5 left-1.5 lg:top-2.5 lg:left-2.5 z-10 px-1.5 py-0.5 rounded-full bg-[#1A1A2E]/65 backdrop-blur-sm border border-[#D4AF37]/40 lg:group-hover:opacity-0 transition-opacity duration-200 whitespace-nowrap flex items-center justify-center ${className}`}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      aria-hidden="true"
    >
      {/* English-only on the card overlay — the bilingual pair would
          force the pill wider than the smallest tile (110px on mobile)
          and the Arabic phrase wraps awkwardly inside a tiny pill. The
          full bilingual greeting lives in the lightbox where there's
          room. The "3D" badge in the corner already carries the visual
          signal in any language. */}
      <span className={`font-heading font-bold ${textSizeClass} text-[#FFE9A8] uppercase tracking-wider leading-none`}>
        Tap for 3D
      </span>
    </motion.div>
  );
}

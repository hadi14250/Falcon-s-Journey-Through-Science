"use client";

import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";

/* === ModelLoader3D ====================================================
   Shown in TWO places while a 3D character is coming online:
     1. While next/dynamic fetches+parses the AvatarViewer3D bundle
        (Three.js + drei). See AvatarLightbox `dynamic({ loading })`.
     2. While the GLB itself downloads + Draco-decodes — wraps the
        viewer's <Suspense fallback>.
   Sharing one component keeps both states looking identical so the
   user just sees "loading 3D…" for the whole wait, not two visual
   flickers.
   ==================================================================== */

export default function ModelLoader3D() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      {/* Concentric pulsing rings — soft gold, hint that something
          is *happening* even when network is slow. Two rings staggered
          so the pulse feels continuous, not strobe-y. */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-[#B8862E]/40"
          animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-[#B8862E]/40"
          animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
        />

        {/* Solid gold puck with the spinning rotate icon — anchors the
            animation. */}
        <motion.div
          className="relative w-14 h-14 rounded-full bg-gradient-to-b from-[#F5C955] to-[#B8862E] border-2 border-[#1A1A2E] flex items-center justify-center"
          style={{ boxShadow: "0 3px 0 #8A6420" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        >
          <RotateCw className="w-6 h-6 text-[#1A1A2E]" strokeWidth={2.5} />
        </motion.div>
      </div>

      {/* Bilingual caption — matches the Hint3DOverlay pattern. */}
      <div className="text-center">
        <p className="font-heading font-bold text-sm text-[#1A1A2E] leading-none">
          Loading 3D
        </p>
        <p className="font-body text-xs text-[#1A1A2E]/70 mt-1.5 leading-none" dir="rtl">
          جارٍ التحميل
        </p>
      </div>
    </div>
  );
}

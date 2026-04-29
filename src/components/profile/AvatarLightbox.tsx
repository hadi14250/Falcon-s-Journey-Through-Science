"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ModelLoader3D from "@/components/profile/ModelLoader3D";

/* === AvatarLightbox — minimalist big-view of an explorer or companion.
   Used by both the Profile page and the Souq stage. Dimmed backdrop,
   large image (or 3D viewer if `model3DUrl` is set), EN+AR name
   underneath, X to close. Closes on backdrop tap or ESC. Body scroll
   is locked while open.

   Mounted inside an <AnimatePresence> by the caller so enter/exit
   animations chain correctly with show/hide.
   ==================================================================== */

/* Lazy-load the generic 3D viewer — Three.js + drei pull in significant
   bytes that we only want on the wire when the user actually opens the
   lightbox on a character that HAS a 3D model. ssr:false because Three
   needs the browser's WebGL context to initialize. */
const AvatarViewer3D = dynamic(
  () => import("@/components/profile/AvatarViewer3D"),
  {
    ssr: false,
    loading: () => <ModelLoader3D />,
  }
);

interface Props {
  src: string;
  /* The character's English name. */
  name: string;
  /* The character's Arabic name. */
  nameAr: string;
  onClose: () => void;
  /* If set, replace the static <img> with the lazy-loaded 3D viewer
     pointed at this GLB URL. Resolved from `avatarModels3D` registry
     by the caller. Falsy → static image. */
  model3DUrl?: string | null;
}

export default function AvatarLightbox({
  src,
  name,
  nameAr,
  onClose,
  model3DUrl,
}: Props) {
  // ESC closes the lightbox.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll while open so the page underneath doesn't shift.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center px-3 md:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Close ${name} preview`}
    >
      {/* Dim backdrop — heavy blur + dark tint so the modal reads as a
          dedicated focused experience, not an overlay floating over a
          partially-visible shop screen. The blur catches the busy item
          grid + tabs underneath and turns them into a soft wash. */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" aria-hidden="true" />

      {/* Close button — top-right, fixed to the viewport so it's always
          reachable regardless of image size. */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white border-2 border-[#1A1A2E] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        style={{ boxShadow: "0 3px 0 #C9B58A" }}
        aria-label="Close"
      >
        <X className="w-6 h-6 text-[#1A1A2E]" strokeWidth={2.5} />
      </button>

      {/* Content. Click inside is swallowed so it doesn't dismiss. */}
      <motion.div
        className="relative flex flex-col items-center gap-4"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Big image card. Sized to roughly fill the shorter viewport
            dimension, capped so it never spills off-screen on huge displays.
            In 3D mode the card hosts a Canvas instead of an <img>; the
            overflow-hidden is required so the canvas respects the rounded
            corners. */}
        <div
          className="relative rounded-3xl border-[3px] border-[#1A1A2E] bg-gradient-to-b from-[#FFF7DC] to-[#FFE9A8] flex items-center justify-center p-3 md:p-6 overflow-hidden"
          style={{
            /* On mobile, fill almost the whole viewport (94vw, capped
               by 70vh so we leave room for the name + hint below). On
               tablet/desktop, fall back to the original square sizing.
               The CSS calc-min picks whichever is smaller so the card
               never spills off-screen. */
            width: "min(94vw, 70vh, 560px)",
            height: "min(94vw, 70vh, 560px)",
            boxShadow: "0 6px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)",
          }}
        >
          {model3DUrl ? (
            <AvatarViewer3D modelUrl={model3DUrl} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={name}
              className="w-full h-full object-contain"
              draggable={false}
            />
          )}
        </div>
        {model3DUrl && (
          <p className="text-white/65 text-xs font-body italic -mt-1 text-center leading-snug">
            <span>Drag to rotate · Pinch or scroll to zoom</span>
            <br />
            <span dir="rtl">اسحب للتدوير · قرّب أو ابعد للتكبير</span>
          </p>
        )}
        <div className="text-center">
          <p className="font-heading font-bold text-3xl text-white leading-none">
            {name}
          </p>
          <p className="font-body text-lg text-white/80 mt-2 leading-none" dir="rtl">
            {nameAr}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

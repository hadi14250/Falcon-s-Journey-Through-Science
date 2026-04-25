"use client";

import { motion } from "framer-motion";
import { Lock, Check } from "lucide-react";
import type { Level } from "@/data/levels";
import Sticker, { type StickerName } from "@/components/lesson/Sticker";
import { useGameStore } from "@/lib/store";
import { fmtNumber } from "@/lib/numerals";

interface LevelNodeProps {
  level: Level;
  isCompleted: boolean;
  isCurrent: boolean;
  isLocked: boolean;
  onClick: () => void;
}

/* Map each level's biome to the matching sticker so the map nodes
   ARE the lesson illustrations — same visual family. */
const biomeStickerMap: Record<string, StickerName> = {
  desert: "sun",
  oasis: "earth",
  sky: "mars",
  clouds: "asteroid-belt",
  stratosphere: "jupiter",
  space: "hope-probe",
};

export default function LevelNode({
  level,
  isCompleted,
  isCurrent,
  isLocked,
  onClick,
}: LevelNodeProps) {
  const stickerName = (level.nodeSticker as StickerName | undefined) ?? biomeStickerMap[level.biome] ?? "sun";
  const arabicNumerals = useGameStore((s) => s.arabicNumerals);

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`relative flex flex-col items-center gap-2 ${
        isLocked ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      aria-label={`${level.title} - ${
        isLocked ? "Locked" : isCompleted ? "Completed" : "Current level"
      }`}
    >
      {/* === Pulse ring for the current level === */}
      {isCurrent && (
        <motion.div
          className="absolute inset-0 -inset-x-2 -inset-y-2 rounded-3xl border-[3px] border-[#CE1126] pointer-events-none"
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* === Tile — lesson-style 3D shadow card === */}
      <motion.div
        className="relative"
        whileHover={!isLocked ? { y: -3 } : undefined}
        whileTap={!isLocked ? { y: 1 } : undefined}
        transition={{ duration: 0.15 }}
      >
        <div
          className={`
            relative w-20 h-20 md:w-28 md:h-28 rounded-3xl overflow-hidden border-2
            flex items-center justify-center
            ${isCompleted
              ? "bg-gradient-to-b from-[#FFF8DC] to-[#FCE99A] border-[#D4AF37]"
              : isCurrent
              ? "bg-white border-[#CE1126]"
              : "bg-[#EDE3CA] border-[#C9B58A]"}
          `}
          style={{
            boxShadow: isCompleted
              ? "0 6px 0 #B8862E, inset 0 1px 0 rgba(255,255,255,0.6)"
              : isCurrent
              ? "0 6px 0 #8E0B19, inset 0 1px 0 rgba(255,255,255,0.5)"
              : "0 5px 0 #B0A075, inset 0 1px 0 rgba(255,255,255,0.4)",
          }}
        >
          {/* Sticker fills tile */}
          <div className={`w-[80%] h-[80%] ${isLocked ? "opacity-25 grayscale" : ""}`}>
            <Sticker name={stickerName} animated={!isLocked && !isCompleted} />
          </div>

          {/* Lock overlay */}
          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#1A1A2E]/80 border-2 border-[#3D3D5E] flex items-center justify-center">
                <Lock className="w-4 h-4 text-[#E5D9B8]" />
              </div>
            </div>
          )}
        </div>

        {/* Completed checkmark medallion */}
        {isCompleted && (
          <motion.div
            className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#009639] flex items-center justify-center border-2 border-white shadow-md z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 250, delay: 0.3 }}
            style={{ boxShadow: "0 2px 0 #00702A" }}
          >
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </motion.div>

      {/* === Label === */}
      <div
        className={`
          text-center px-3 py-1 rounded-xl
          ${isLocked
            ? "bg-[#3D3D5E]/40 text-[#E5D9B8]/70"
            : isCurrent
            ? "bg-white text-[#1A1A2E] ring-2 ring-[#CE1126]/40"
            : "bg-white/85 text-[#1A1A2E]"}
        `}
        style={
          !isLocked
            ? { boxShadow: "0 2px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.6)" }
            : undefined
        }
      >
        <p className="text-[10px] font-heading uppercase tracking-wider opacity-70">
          Level {fmtNumber(level.id, arabicNumerals)}
        </p>
        <p className="text-xs md:text-sm font-heading font-bold leading-tight max-w-[110px]">
          {level.title}
        </p>
      </div>
    </button>
  );
}

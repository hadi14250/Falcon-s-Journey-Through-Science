"use client";

import { motion } from "framer-motion";
import BadgeIcon from "./BadgeIcon";
import type { SubjectId } from "@/data/subjects";

interface BadgeProps {
  name: string;
  nameAr?: string;
  unlocked: boolean;
  levelId: number;
  subjectId?: SubjectId;
  gradient?: [string, string];
  accent?: string;
  onClick?: () => void;
}

export default function Badge({
  name,
  nameAr,
  unlocked,
  levelId,
  subjectId,
  gradient,
  accent,
  onClick,
}: BadgeProps) {
  const [from, to] = gradient ?? ["#D4AF37", "#B8962E"];

  return (
    <motion.button
      onClick={onClick}
      disabled={!unlocked}
      className={`
        relative flex flex-col items-center gap-2 p-3 rounded-2xl transition-colors
        ${unlocked
          ? "cursor-pointer hover:bg-white/10"
          : "cursor-default"
        }
      `}
      whileHover={unlocked ? { scale: 1.08, y: -4 } : undefined}
      whileTap={unlocked ? { scale: 0.95 } : undefined}
      aria-label={unlocked ? `Badge: ${name}` : `Locked badge: ${name}`}
    >
      {/* Badge circle */}
      <div className="relative">
        {/* Glow ring for unlocked */}
        {unlocked && (
          <motion.div
            className="absolute -inset-1 rounded-full"
            style={{
              background: `radial-gradient(circle, ${accent ?? "#D4AF37"}40 0%, transparent 70%)`,
            }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <div
          className="w-20 h-20 rounded-full flex items-center justify-center relative overflow-hidden"
          style={
            unlocked
              ? { background: `linear-gradient(135deg, ${from}, ${to})` }
              : { background: "#374151" }
          }
        >
          {/* Inner ring */}
          <div
            className="absolute inset-1.5 rounded-full border-2 border-dashed"
            style={{ borderColor: unlocked ? `${accent ?? "#FFF"}60` : "#4B5563" }}
          />

          {/* Icon */}
          <motion.div
            className="relative z-10 text-white"
            initial={unlocked ? { scale: 0, rotate: -180 } : false}
            animate={unlocked ? { scale: 1, rotate: 0 } : undefined}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          >
            <BadgeIcon levelId={levelId} subjectId={subjectId} unlocked={unlocked} />
          </motion.div>

          {/* Lock overlay for locked badges */}
          {!unlocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
              <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
          )}
        </div>

        {/* Level number badge */}
        <div
          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-heading font-bold border-2"
          style={
            unlocked
              ? { background: accent ?? "#D4AF37", color: "#1E293B", borderColor: to }
              : { background: "#4B5563", color: "#9CA3AF", borderColor: "#374151" }
          }
        >
          {levelId}
        </div>
      </div>

      {/* Badge name */}
      <div className="text-center mt-1">
        <span className={`text-xs font-heading leading-tight block ${unlocked ? "text-white" : "text-gray-500"}`}>
          {name}
        </span>
        {nameAr && (
          <span className={`text-[10px] font-body block ${unlocked ? "text-white/60" : "text-gray-600"}`} dir="rtl">
            {nameAr}
          </span>
        )}
      </div>
    </motion.button>
  );
}

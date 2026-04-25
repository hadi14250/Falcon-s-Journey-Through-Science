"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { useRouteTransition } from "@/components/ui/RouteTransition";
import { useGameStore } from "@/lib/store";
import { fmtNumber } from "@/lib/numerals";
import { shopItems, humanSrcFor, companionSrcFor } from "@/data/shop";
import { avatars } from "@/data/avatars";

interface MapDuoCardProps {
  /** Forwarded onto the inner card button so the spotlight tour can
      highlight the entire dirhams + shop CTA in one shot. */
  cardRef?: React.Ref<HTMLButtonElement>;
}

/* === Map duo card ===================================================
   Sticky bottom card showing the player's avatar + companion side by
   side, wearing whatever they've equipped. Doubles as the souq entry
   point — tapping anywhere on the card or the "Shop" button goes to
   /souq. Always visible on the map so the character has constant
   on-screen presence and the Souq is one tap away.

   Mobile-first: ~110px tall, fits above the safe-area / dune. */
function MapDuoCard({ cardRef }: MapDuoCardProps) {
  const { navigate } = useRouteTransition();
  const { student, equipped, dirhams, arabicNumerals, ownedItems } = useGameStore();

  // Cheapest unowned item that the player CAN'T afford yet — used for the
  // motivational hint ("Need 12 more for the UAE Balloon!").
  const cheapestUnowned = shopItems
    .filter((i) => !ownedItems.includes(i.id))
    .sort((a, b) => a.price - b.price)[0];

  const canAffordSomething = shopItems.some(
    (i) => !ownedItems.includes(i.id) && dirhams >= i.price
  );

  const humanSrc = humanSrcFor(student.avatarId, equipped.human);
  const companionSrc = companionSrcFor(student.companionId || "camel", equipped.companion);

  const playerName =
    avatars.find((a) => a.id === student.avatarId)?.name ?? student.name ?? "You";

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none px-3"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 110, damping: 18 }}
    >
      <div className="max-w-md mx-auto pointer-events-auto">
        <button
          ref={cardRef}
          onClick={() => navigate("/souq", { label: "Opening the Souq", labelAr: "نفتح السوق" })}
          className="relative w-full bg-white border-2 border-[#1A1A2E] rounded-3xl overflow-hidden text-left active:scale-[0.99] transition-transform"
          style={{
            boxShadow: "0 5px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
          aria-label="Open the Souq"
        >
          <div className="relative flex items-center gap-2.5 px-3 py-2.5">
            {/* Avatar tile */}
            <div
              className="shrink-0 w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#1A1A2E] bg-gradient-to-b from-[#FFF7DC] to-[#FFE9A8] p-1"
              style={{ boxShadow: "0 2px 0 #C9B58A" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={humanSrc}
                alt=""
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>

            {/* Companion tile */}
            <div
              className="shrink-0 w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#1A1A2E] bg-gradient-to-b from-[#FFF7DC] to-[#FFE9A8] p-1"
              style={{ boxShadow: "0 2px 0 #C9B58A" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={companionSrc}
                alt=""
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>

            {/* Center text block — dirham balance + hint */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/uae-dirham.webp" alt="" width={18} height={18} />
                <span className="font-heading font-bold text-base text-[#1A1A2E] leading-none">
                  {fmtNumber(dirhams, arabicNumerals)}
                </span>
                <span className="text-[10px] font-body text-[#1A1A2E]/55 leading-none">
                  dirhams
                </span>
              </div>
              <p className="text-[10px] font-body text-[#1A1A2E]/65 leading-tight mt-1 line-clamp-2">
                {canAffordSomething
                  ? `Tap to shop!`
                  : cheapestUnowned
                    ? dirhams === 0
                      ? `Play levels to earn dirhams and buy gear!`
                      : `Need ${fmtNumber(cheapestUnowned.price - dirhams, arabicNumerals)} more for ${cheapestUnowned.name}`
                    : `All items collected!`}
              </p>
            </div>

            {/* Shop chip — visual cue this is the souq entry */}
            <div
              className="shrink-0 flex items-center gap-1 bg-[var(--color-duo-green)] text-[#1A1A2E] px-2.5 py-1.5 rounded-xl border-2 border-[var(--color-duo-green-dark)] font-heading font-bold text-xs uppercase tracking-wider"
              style={{ boxShadow: "0 2px 0 var(--color-duo-green-dark)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 7h18l-1 13H4L3 7z" />
                <path d="M8 7V5a4 4 0 0 1 8 0v2" />
              </svg>
              Shop
            </div>
          </div>

          {/* Pulse ring when player can afford something — quiet hint without being noisy */}
          {canAffordSomething && (
            <motion.div
              className="absolute inset-0 rounded-3xl border-[3px] border-[var(--color-duo-green)] pointer-events-none"
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </button>
      </div>
    </motion.div>
  );
}

export default MapDuoCard;

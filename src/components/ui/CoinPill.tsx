"use client";

/* === CoinPill ============================================================
   Shared dirham balance display used by the Souq, Profile, and any other
   place the user sees their spendable currency.

   The visual treatment was previously duplicated inline in two pages with
   slight drift — this consolidates it. Three sizes (sm/md/lg) match the
   contexts where it's used:
     - sm = compact stat strip (e.g. inside a card with other stats)
     - md = page header pill (default)
     - lg = hero / shop spotlight (Souq header)

   Animates the displayed number when `value` changes via Framer Motion's
   `animate(motionValue, target)`. Spend = count down with a pulse, earn =
   count up with a brighter pulse. Both feel like the number is reacting,
   not just snapping.
   ====================================================================== */

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";

export type CoinPillSize = "sm" | "md" | "lg";

interface CoinPillProps {
  /* Current dirham balance to display. Animates from previous value when this
     prop changes (in either direction). */
  value: number;
  size?: CoinPillSize;
  /* When true (default), animate the number on change. Disable for places
     that show a static value where the animation would be distracting. */
  animateOnChange?: boolean;
  /* Optional click handler — used on the Souq when balance is 0 to deep-link
     the player to the map ("Earn by playing"). */
  onClick?: () => void;
  /* Override the displayed numeral system (e.g. Arabic digits). Defaults to
     Western. The caller is responsible for passing a formatter via
     `formatNumber`. */
  formatNumber?: (n: number) => string;
  /* Optional small label rendered to the right of the number — used on
     the Profile pill to disambiguate ("25 coins"). Omit for shop / map. */
  label?: string;
  className?: string;
}

const SIZE_CLASSES: Record<CoinPillSize, {
  container: string;
  iconPx: number;
  textClass: string;
  iconGap: string;
}> = {
  sm: {
    container: "px-2.5 py-1 gap-1",
    iconPx: 16,
    textClass: "text-xs",
    iconGap: "gap-1",
  },
  md: {
    container: "px-3 py-1.5 gap-1.5",
    iconPx: 20,
    textClass: "text-sm",
    iconGap: "gap-1.5",
  },
  lg: {
    container: "px-4 py-2 gap-2",
    iconPx: 26,
    textClass: "text-lg",
    iconGap: "gap-2",
  },
};

export default function CoinPill({
  value,
  size = "md",
  animateOnChange = true,
  onClick,
  formatNumber,
  label,
  className = "",
}: CoinPillProps) {
  const sizes = SIZE_CLASSES[size];

  // Internal display number — Framer animates this between the previous and
  // next value. Initialized to the current value so first paint matches.
  const motionValue = useMotionValue(value);
  const [display, setDisplay] = useState(value);
  // Track previous value via state (not ref) so render-time reads are safe
  // under React 19's stricter rules. Updated inside the value-change effect.
  const [previousValue, setPreviousValue] = useState(value);

  useEffect(() => {
    if (!animateOnChange) {
      setPreviousValue(value);
      setDisplay(value);
      motionValue.set(value);
      return;
    }
    if (previousValue === value) return;

    const controls = animate(motionValue, value, {
      duration: Math.min(0.6, 0.3 + Math.abs(value - previousValue) * 0.012),
      ease: "easeOut",
      onUpdate: (n) => setDisplay(Math.round(n)),
    });
    setPreviousValue(value);
    return controls.stop;
  }, [value, animateOnChange, motionValue, previousValue]);

  // Pulse on change — direction-aware. Earning = brighter, spending = subtle.
  const earning = value > previousValue;
  const pulseKey = `${value}`;

  const Tag = onClick ? motion.button : motion.div;
  const interactionProps = onClick
    ? { onClick, whileTap: { scale: 0.96 } }
    : {};

  return (
    <Tag
      key={pulseKey}
      {...interactionProps}
      className={`flex items-center ${sizes.container} ${sizes.iconGap} bg-white border-2 border-[#1A1A2E] rounded-full ${className}`}
      style={{ boxShadow: "0 3px 0 #C9B58A" }}
      animate={
        animateOnChange && previousValue !== value
          ? { scale: earning ? [1, 1.18, 1] : [1, 1.08, 1] }
          : undefined
      }
      transition={{ duration: 0.35, ease: "easeOut" }}
      aria-label={`${value} dirhams`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/uae-dirham.webp"
        alt=""
        width={sizes.iconPx}
        height={sizes.iconPx}
        draggable={false}
      />
      <span className={`font-heading font-bold ${sizes.textClass} text-[#1A1A2E] tabular-nums`}>
        {formatNumber ? formatNumber(display) : display}
      </span>
      {label && (
        <span className="font-body text-[11px] uppercase tracking-wider text-[#1A1A2E]/60 -ml-0.5">
          {label}
        </span>
      )}
    </Tag>
  );
}

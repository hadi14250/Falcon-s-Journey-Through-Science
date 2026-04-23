"use client";

import { useEffect, useState } from "react";
import { useGameStore } from "@/lib/store";
import { humanVariantFor } from "@/data/shop";

interface Props {
  avatarId: number;
  size?: number | "full";
  className?: string;
  bordered?: boolean;
  /* Set to true to ignore the equipped item and show the plain avatar.
     Useful for previews (e.g. the avatar picker grid). */
  ignoreEquipped?: boolean;
  /* Override the equipped item resolution. Used by Souq previews to show
     a specific variant without actually equipping it. Pass null for plain. */
  overrideItemId?: string | null;
}

const STROKE = "#1A1A2E";
const TOTAL = 10;
// (id range guard — avatars.ts currently has 5 entries; cap is 10)


/* Avatars whose new-style variant set lives in /public/humans/{variant}/{id}.svg
   (plain, flag, scarf, balloon). As the designer hands off batches we add the
   id here. Anything NOT in this set falls back to the legacy /public/avatars/
   files so existing avatars keep rendering during the rollout. */
const NEW_HUMAN_IDS = new Set<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

/* Legacy avatar set — id 0..3 with optional flag variant. */
const LEGACY_FLAG_IDS = new Set<number>([0, 1, 2, 3]);

function resolveSrc(idx: number, itemId: string | null): string {
  if (NEW_HUMAN_IDS.has(idx)) {
    const variant = humanVariantFor(itemId);
    // PNGs (converted from the original SVGs) — much smaller + decode faster.
    return `/humans/${variant}/${idx}.png`;
  }
  // Legacy fallback — only the flag variant exists for ids 0..3.
  if (itemId === "uae-flag" && LEGACY_FLAG_IDS.has(idx)) {
    return `/avatars/${idx}-flag.svg?v=1`;
  }
  return `/avatars/${idx}.svg?v=12`;
}

export default function AvatarSvg({
  avatarId,
  size = "full",
  className = "",
  bordered = false,
  ignoreEquipped = false,
  overrideItemId,
}: Props) {
  const equippedHuman = useGameStore((s) => s.equipped.human);
  const idx = avatarId >= 0 && avatarId < TOTAL ? avatarId : 0;
  const isFixed = typeof size === "number";

  const itemId = ignoreEquipped
    ? null
    : overrideItemId !== undefined
      ? overrideItemId
      : equippedHuman;

  const initialSrc = resolveSrc(idx, itemId);
  const [src, setSrc] = useState(initialSrc);

  useEffect(() => {
    setSrc(initialSrc);
  }, [initialSrc]);

  const wrapperStyle: React.CSSProperties = isFixed
    ? {
        width: size as number,
        height: size as number,
        flexShrink: 0,
        aspectRatio: "1 / 1",
      }
    : {
        width: "100%",
        aspectRatio: "1 / 1",
        flexShrink: 0,
      };

  if (bordered) {
    wrapperStyle.border = `1.6px solid ${STROKE}`;
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#FFF1DC] ${className}`}
      style={wrapperStyle}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          display: "block",
        }}
        draggable={false}
        // If a variant SVG 404s, fall back to plain.
        onError={() => {
          const plain = NEW_HUMAN_IDS.has(idx)
            ? `/humans/plain/${idx}.png`
            : `/avatars/${idx}.svg?v=12`;
          if (src !== plain) setSrc(plain);
        }}
      />
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { enabledCompanions } from "@/data/companions";
import { avatars } from "@/data/avatars";
import { shopItems } from "@/data/shop";

/* Aggressively warm the browser cache with every souq asset (companions
   variants, human variants, item icons) as soon as the app loads. By the
   time the user navigates to /souq the bytes + decoded bitmaps are
   already in memory, so the stage opens instantly.

   Mounted once globally from the root layout. Runs requestIdleCallback
   so we don't compete with first-paint network. */

const NEW_HUMAN_IDS_TO_PRELOAD = new Set<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

function buildUrls(): string[] {
  const urls: string[] = [];
  for (const c of enabledCompanions) {
    urls.push(`/companions/plain/${c.id}.svg`);
    urls.push(`/companions/ghutra/${c.id}.svg`);
    urls.push(`/companions/collar/${c.id}.svg`);
    urls.push(`/companions/glasses/${c.id}.png`);
  }
  for (const a of avatars) {
    if (NEW_HUMAN_IDS_TO_PRELOAD.has(a.id)) {
      urls.push(`/humans/plain/${a.id}.png`);
      urls.push(`/humans/flag/${a.id}.png`);
      urls.push(`/humans/scarf/${a.id}.png`);
      urls.push(`/humans/balloon/${a.id}.png`);
      urls.push(`/humans/glasses/${a.id}.png`);
    } else {
      urls.push(`/avatars/${a.id}.svg`);
      urls.push(`/avatars/${a.id}-flag.svg`);
    }
  }
  for (const item of shopItems) {
    urls.push(`/shop/${item.icon}`);
  }
  return urls;
}

export default function AssetPreloader() {
  useEffect(() => {
    const urls = buildUrls();

    const preload = () => {
      for (const url of urls) {
        const img = new Image();
        img.src = url;
        // Force decode so the bitmap is rasterized to memory now, not
        // when the <img> first paints. Fire-and-forget.
        img.decode().catch(() => {});
      }
    };

    // Wait for the browser to be idle before kicking off, so we don't
    // contend with critical first-paint network/parse work.
    const ric =
      (window as Window & { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback;
    if (typeof ric === "function") {
      ric(preload);
    } else {
      // Fallback for Safari (no requestIdleCallback)
      setTimeout(preload, 800);
    }
  }, []);

  return null;
}

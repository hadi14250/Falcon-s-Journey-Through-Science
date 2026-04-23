"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import SettingsModal, { SettingsButton } from "@/components/ui/SettingsModal";

/* Floating gear button + modal, available on every page.
   Hidden on the landing page (kept clean) and inside a level (the lesson
   flow has its own X-quit button + the heart row would collide on mobile). */
export default function GlobalSettings() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/") return null;
  if (pathname?.startsWith("/level/")) return null;
  // Souq has its own bottom CTA bar; gear collides with it.
  if (pathname?.startsWith("/souq")) return null;
  // Map has the sticky Duo Card at the bottom; gear collides with the Shop button.
  if (pathname === "/map") return null;

  return (
    <>
      <div className="fixed bottom-4 right-4 z-[55]">
        <SettingsButton onClick={() => setOpen(true)} />
      </div>
      <SettingsModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

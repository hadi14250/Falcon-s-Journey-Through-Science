"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import DhowLoader from "./DhowLoader";

/* === RouteTransition ===================================================
   Global overlay that guarantees the themed loader is visible whenever
   the user navigates between top-level routes. Next.js's route-segment
   `loading.tsx` only fires when a server component suspends — most of
   our pages are client-side and load fast, so the fallback never shows.
   This solves it: tapping a link calls `navigate(href)`, which
   immediately mounts the loader, waits a guaranteed minimum (so it
   doesn't flash and disappear), then pushes the route. The overlay
   stays mounted until BOTH the new pathname is active AND the minimum
   has elapsed. */

const MIN_VISIBLE_MS = 1400; // long enough that the inner-star draw cycle (1.6s) reads as a complete beat

/* Unused copy slot kept on the call signature so legacy
   `navigate(href, { label, labelAr })` call sites keep type-checking
   without a sweep. The loader doesn't render labels. */
type LoaderCopy = { label?: string; labelAr?: string };

interface RouteTransitionContextValue {
  navigate: (href: string, copy?: LoaderCopy) => void;
}

const RouteTransitionContext = createContext<RouteTransitionContextValue | null>(null);

export function useRouteTransition() {
  const ctx = useContext(RouteTransitionContext);
  if (!ctx) {
    // Fallback: if used outside the provider, just route normally.
    return { navigate: (href: string) => { window.location.href = href; } };
  }
  return ctx;
}

export default function RouteTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [active, setActive] = useState(false);
  const targetRef = useRef<string | null>(null);
  const startedAtRef = useRef<number>(0);

  /* Hide the overlay when the URL has caught up to our intended target,
     after the minimum visible time has elapsed. */
  useEffect(() => {
    if (!active) return;
    if (targetRef.current && pathname !== targetRef.current) return;

    const elapsed = Date.now() - startedAtRef.current;
    const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0);
    const t = setTimeout(() => {
      setActive(false);
      targetRef.current = null;
    }, remaining);
    return () => clearTimeout(t);
  }, [pathname, active]);

  const navigate = useCallback(
    (href: string) => {
      // Same route — no overlay needed.
      if (href === pathname) return;
      targetRef.current = href;
      startedAtRef.current = Date.now();
      setActive(true);
      // Push on the next frame so the overlay mounts BEFORE the new
      // route starts hydrating — otherwise React batches and we miss
      // the paint.
      requestAnimationFrame(() => router.push(href));
    },
    [pathname, router]
  );

  return (
    <RouteTransitionContext.Provider value={{ navigate }}>
      {children}
      <AnimatePresence>
        {active && (
          <motion.div
            key="route-transition"
            className="fixed inset-0 z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <DhowLoader />
          </motion.div>
        )}
      </AnimatePresence>
    </RouteTransitionContext.Provider>
  );
}

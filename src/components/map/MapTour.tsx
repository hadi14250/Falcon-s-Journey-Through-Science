"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/lib/store";
import { companionSrcFor } from "@/data/shop";
import { FastForward, ChevronLeft, ChevronRight } from "lucide-react";

/* === MapTour ==========================================================
   Single-shot spotlight tour that runs the first time a player lands on
   /map after onboarding. Highlights one element at a time with a gold
   pulsing ring, dims the rest of the screen, and shows a speech bubble
   from the player's companion explaining what the element does.

   On dismiss (finish or skip), flips `tourComplete` in the Zustand store
   so it never re-fires. Replayable from the Profile page.
   =================================================================== */

export interface TourTargets {
  currentLevel: React.RefObject<HTMLElement | null>;
  xp: React.RefObject<HTMLElement | null>;
  dirhams: React.RefObject<HTMLElement | null>;
  trophy: React.RefObject<HTMLElement | null>;
  profile: React.RefObject<HTMLElement | null>;
}

interface MapTourProps {
  targets: TourTargets;
  onDone: () => void;
}

interface TourStep {
  /** Element to spotlight. Omit for an intro/welcome card with no
      highlight (renders centered, dim overlay covers the whole page). */
  key?: keyof TourTargets;
  copy: (name: string, companion: string, subjectName: string) => string;
}

const STEPS: TourStep[] = [
  {
    // Welcome/intro: no spotlight, just sets context for what the app is.
    copy: (name) =>
      `Salam${name ? " " + name : ""}! I'm your guide. We'll explore subjects like the UAE and Space together, with quizzes to test what you learn along the way.`,
  },
  {
    key: "profile",
    copy: () =>
      `Open your profile to change your name, explorer, or companion anytime.`,
  },
  {
    key: "xp",
    copy: () =>
      `This is your XP bar. Finish lessons to fill it up and earn badges.`,
  },
  {
    key: "trophy",
    copy: () =>
      `Your badges and trophies live here. Collect them all to win cool rewards.`,
  },
  {
    key: "currentLevel",
    copy: () =>
      `You can tap here to start your first lesson.`,
  },
  {
    key: "dirhams",
    copy: () =>
      `Earn dirhams from completing lessons. Tap here to spend them in the Souq on outfits for you and me.`,
  },
];

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

function getTargetRect(el: HTMLElement | null): Rect | null {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  if (r.width === 0 && r.height === 0) return null;
  return { x: r.left, y: r.top, width: r.width, height: r.height };
}

export default function MapTour({ targets, onDone }: MapTourProps) {
  const { student, equipped, currentSubject, setTourComplete } = useGameStore();
  const companionId = student.companionId || "your companion";
  const companionSrc = companionSrcFor(student.companionId || "camel", equipped.companion);
  const subjectName =
    currentSubject === "heritage"
      ? "the UAE"
      : currentSubject === "space"
      ? "space"
      : "nature";
  const [stepIdx, setStepIdx] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  // Seed viewport size SYNCHRONOUSLY on first render (when window exists)
  // so the welcome bubble's `initial` position calc isn't 0-based and the
  // bubble doesn't slide in from the top-left corner on first paint.
  const [vw, setVw] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerWidth : 390
  );
  const [vh, setVh] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerHeight : 700
  );
  const sealed = useRef(false);

  // Resolve viewport on mount + on resize
  useEffect(() => {
    const update = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Recompute spotlight rect whenever step or targets change. Poll
  // every 150ms (up to ~3s) until the target is rendered with a real
  // bbox — a fresh mount can race ahead of motion springs / level loop
  // committing the DOM, leaving us with a null rect for the first frame.
  useEffect(() => {
    let cancelled = false;
    const key = STEPS[stepIdx].key;
    // Welcome/intro step: no spotlight target. Clear the rect so the
    // overlay dims the whole page and the bubble centers itself.
    if (!key) {
      setRect(null);
      return () => {
        cancelled = true;
      };
    }
    const el = targets[key].current;
    if (!el) {
      // Element not in DOM yet, try once more in a moment.
      const t = setTimeout(() => {
        if (!cancelled) setStepIdx((s) => s); // force re-run
      }, 200);
      return () => {
        cancelled = true;
        clearTimeout(t);
      };
    }
    // Don't clear the rect here — keeping the previous step's rect lets
    // the spotlight + bubble animate smoothly from old position to new
    // instead of vanishing to "welcome center" for one frame mid-step.
    // Use INSTANT scroll (not smooth) so the bbox we measure right after
    // is the final on-screen bbox; smooth scroll would still be in
    // motion when we measured.
    el.scrollIntoView({ block: "center", behavior: "auto" });
    // Wait one frame for layout to settle, then measure + re-measure on
    // resize (handles soft keyboard, orientation flip, font load, etc.)
    const measure = () => {
      if (cancelled) return;
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        setRect({ x: r.left, y: r.top, width: r.width, height: r.height });
      }
    };
    const id = window.requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(id);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [stepIdx, targets]);

  const finish = () => {
    if (sealed.current) return;
    sealed.current = true;
    setTourComplete(true);
    onDone();
  };

  // Debounce step changes so a fast clicker can't queue 3 transitions on
  // top of each other. Spotlight + bubble crossfade together take ~400ms;
  // we lock for 350ms so it's snappy but not stackable.
  const transitioning = useRef(false);
  const withGuard = (fn: () => void) => () => {
    if (transitioning.current) return;
    transitioning.current = true;
    fn();
    setTimeout(() => {
      transitioning.current = false;
    }, 350);
  };

  const advance = withGuard(() => {
    if (stepIdx < STEPS.length - 1) setStepIdx(stepIdx + 1);
    else finish();
  });

  const goBack = withGuard(() => {
    if (stepIdx > 0) setStepIdx(stepIdx - 1);
  });

  const padding = 12;
  const radius = 24;
  const holeX = rect ? rect.x - padding : 0;
  const holeY = rect ? rect.y - padding : 0;
  const holeW = rect ? rect.width + padding * 2 : 0;
  const holeH = rect ? rect.height + padding * 2 : 0;

  // Bubble placement: anchor `top` to the spotlight ring edge, then let
  // CSS `translateY(-100%)` (applied as a Framer-animatable y value)
  // shift the bubble UP by its own actual rendered height when above.
  //
  // Why this beats subtracting `bubbleH`: bubbleH from ResizeObserver
  // can lag behind a stepIdx change (we'd compute position with the
  // OLD bubble height for the first frame), or miss the box-shadow
  // entirely. Letting CSS handle "shift by my own height" is exact.
  //
  // Both above and below paths use the same `GAP` so the visible gap
  // is identical on both sides.
  const GAP = 24;
  const bubbleAbove = rect ? rect.y > vh / 2 : false;
  // Target is the ring edge (top edge if above, bottom edge if below).
  // The wrapper's `y` translate handles the rest.
  const bubbleY = rect
    ? bubbleAbove
      ? holeY - GAP            // bubble bottom anchors GAP px above ring top
      : holeY + holeH + GAP    // bubble top anchors GAP px below ring bottom
    : 0;
  const bubbleWidth = 304;
  const bubbleX = rect
    ? Math.max(16, Math.min(vw - bubbleWidth - 16, rect.x + rect.width / 2 - bubbleWidth / 2))
    : 16;

  const copy = STEPS[stepIdx].copy(student.name || "explorer", companionId, subjectName);

  return (
    <AnimatePresence>
      <motion.div
        key="map-tour"
        className="fixed inset-0 z-[100]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        aria-live="polite"
      >
        {/* Dim overlay with a punched-out hole around the target. Both
            the mask hole AND the gold ring are <motion.rect>s that animate
            their x/y/width/height between steps so the spotlight glides
            from one element to the next instead of snapping. */}
        <svg width="100%" height="100%" className="absolute inset-0" aria-hidden="true">
          <defs>
            <mask id="map-tour-mask">
              <rect width="100%" height="100%" fill="white" />
              {rect && (
                <motion.rect
                  initial={false}
                  animate={{ x: holeX, y: holeY, width: holeW, height: holeH }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  rx={radius}
                  ry={radius}
                  fill="black"
                />
              )}
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="rgba(10, 10, 30, 0.65)"
            mask="url(#map-tour-mask)"
          />
          {/* Gold pulsing ring traces the hole, animated to follow */}
          {rect && (
            <motion.rect
              initial={false}
              animate={{ x: holeX, y: holeY, width: holeW, height: holeH }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              rx={radius}
              ry={radius}
              fill="none"
              stroke="#D4AF37"
              strokeWidth="3"
              opacity="0.95"
            >
              <animate
                attributeName="stroke-width"
                values="3;6;3"
                dur="1.4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.95;0.55;0.95"
                dur="1.4s"
                repeatCount="indefinite"
              />
            </motion.rect>
          )}
        </svg>

        {/* Speech bubble + companion. When there's no rect (welcome
            intro step, or while a target is still resolving), render
            the bubble centered on the page instead of anchored to a
            spotlight. Only suppress entirely if we're WAITING for a
            spotlight target that hasn't resolved yet. */}
        {/* Position wrapper is ALWAYS mounted while the tour is active.
            Initial values are SEEDED to the welcome-center coords so the
            very first paint sits centered instead of flying in from the
            top-left (which is what `initial={false}` falls back to on a
            fresh mount with no prior animated state). */}
        <motion.div
          className="absolute"
          initial={{
            top: vh / 2 - 80,
            left: vw / 2 - bubbleWidth / 2,
            width: bubbleWidth,
            opacity: 0,
            y: 0,
          }}
          animate={
            rect
              ? {
                  top: bubbleY,
                  left: bubbleX,
                  width: bubbleWidth,
                  opacity: 1,
                  // When bubble sits above the target, its `top` is
                  // anchored at the ring's top edge. Translate UP by
                  // 100% of its OWN rendered height (CSS handles this
                  // exactly, no JS measurement needed) so the bubble's
                  // bottom edge lands at `top` (= GAP px above ring).
                  y: bubbleAbove ? "-100%" : 0,
                }
              : {
                  top: vh / 2 - 80,
                  left: vw / 2 - bubbleWidth / 2,
                  width: bubbleWidth,
                  opacity: 1,
                  y: 0,
                }
          }
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
            {/* Persistent bubble container, content keyed off stepIdx
                via React's normal reconciler. The text inside changes
                mid-glide. */}
            <motion.div
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl border-2 border-[#1A1A2E] p-3"
              style={{
                boxShadow: "0 5px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.55)",
              }}
            >
              <div className="flex items-center gap-2.5">
                {/* Mascot tile — matches MapDuoCard's companion tile exactly:
                    cream→gold gradient, navy border, gold drop shadow.
                    Render the companion as a plain <img> (not the
                    <Companion> component, which hardcodes an 80px width
                    and would overflow this 56px tile). */}
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
                {/* Text crossfades in place when stepIdx changes — `key`
                    triggers React to re-mount the inner motion span, which
                    plays its initial → animate transition. The bubble
                    container itself stays mounted so it never disappears. */}
                <p className="flex-1 min-w-0 text-sm font-body text-[#1A1A2E] leading-snug">
                  <motion.span
                    key={stepIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="inline-block"
                  >
                    {copy}
                  </motion.span>
                </p>
              </div>
              {/* Step dots above the action row so the row stays clean.
                  Inactive dots use navy at 25% alpha so they're legible
                  against the white card (the previous warm beige was nearly
                  invisible). */}
              <div className="flex items-center justify-center gap-1.5 mt-3">
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${
                      i === stepIdx
                        ? "bg-[#1A1A2E]"
                        : i < stepIdx
                        ? "bg-[#D4AF37]"
                        : "bg-[#1A1A2E]/25"
                    }`}
                  />
                ))}
              </div>
              {/* Action row: Skip (text link, far left) | Back + Next (right).
                  Back is hidden on step 1 so the user isn't offered a dead
                  affordance. justify-between keeps Skip pinned left and the
                  right cluster pinned right regardless of how many buttons
                  it contains, so layout doesn't shift between steps. */}
              {/* On the final step Skip is hidden, so center the remaining
                  buttons. Other steps use justify-between to keep Skip pinned
                  left and the right cluster pinned right. */}
              <div
                className={`flex items-center gap-2 mt-2 pt-2 border-t border-[#E5D9B8] ${
                  stepIdx < STEPS.length - 1 ? "justify-between" : "justify-center"
                }`}
              >
                {stepIdx < STEPS.length - 1 && (
                  <button
                    onClick={finish}
                    className="inline-flex items-center gap-1.5 bg-transparent border-2 border-[#1A1A2E]/20 text-[#1A1A2E]/65 hover:text-[#1A1A2E] hover:border-[#1A1A2E]/40 text-xs font-heading font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors"
                    aria-label="Skip tutorial"
                  >
                    Skip
                    <FastForward className="w-3.5 h-3.5" fill="currentColor" strokeWidth={0} />
                  </button>
                )}
                <div className="flex items-center gap-2">
                  {stepIdx > 0 && (
                    <button
                      onClick={goBack}
                      className="inline-flex items-center gap-1 bg-white border-2 border-[#1A1A2E] text-[#1A1A2E] text-xs font-heading font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
                      style={{ boxShadow: "0 2px 0 #C9B58A" }}
                    >
                      <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
                      Back
                    </button>
                  )}
                  <button
                    onClick={advance}
                    className="inline-flex items-center gap-1 bg-[#1A1A2E] text-white text-xs font-heading font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
                    style={{ boxShadow: "0 2px 0 #000" }}
                  >
                    {stepIdx === STEPS.length - 1 ? "Got it!" : "Next"}
                    {stepIdx < STEPS.length - 1 && (
                      <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

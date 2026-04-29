"use client";

/* Web-Audio-generated sound effects — no files needed.
   Each call is a new lightweight AudioContext so sounds stack cleanly. */

let audioContext: AudioContext | null = null;
let muted = false;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    audioContext = new AC();
  }
  // Resume if suspended (browser autoplay policy)
  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

interface ToneOptions {
  freq: number;
  duration: number;
  type?: OscillatorType;
  volume?: number;
  attack?: number;
  decay?: number;
  freqEnd?: number;
}

function tone({
  freq,
  duration,
  type = "sine",
  volume = 0.2,
  attack = 0.01,
  decay = 0.05,
  freqEnd,
}: ToneOptions, startAt = 0) {
  const ctx = getContext();
  if (!ctx || muted) return;
  const t0 = ctx.currentTime + startAt;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (freqEnd !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 1), t0 + duration);
  }

  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(volume, t0 + attack);
  gain.gain.linearRampToValueAtTime(volume * 0.7, t0 + duration - decay);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(t0);
  osc.stop(t0 + duration);
}

export const sounds = {
  setMuted(m: boolean) {
    muted = m;
  },
  isMuted() {
    return muted;
  },
  correct() {
    // Happy ascending triad
    tone({ freq: 523.25, duration: 0.12, type: "triangle", volume: 0.15 }, 0);
    tone({ freq: 659.25, duration: 0.12, type: "triangle", volume: 0.15 }, 0.08);
    tone({ freq: 783.99, duration: 0.25, type: "triangle", volume: 0.18 }, 0.16);
  },
  wrong() {
    // Descending buzz
    tone({ freq: 196, duration: 0.3, type: "sawtooth", volume: 0.12, freqEnd: 130 }, 0);
  },
  streak(tier: 1 | 2 | 3 = 1) {
    // Tier 1 (3-streak): short ascending 4-note flourish.
    // Tier 2 (5-streak): same arc + an extra higher note, slightly louder.
    // Tier 3 (7+ streak): full ascent with a triumphant high note + sparkle accents.
    const v1 = 0.10 + 0.02 * (tier - 1); // 0.10 / 0.12 / 0.14
    const v2 = 0.12 + 0.03 * (tier - 1); // 0.12 / 0.15 / 0.18

    // Shared ascent (all tiers)
    tone({ freq: 523.25, duration: 0.08, type: "square", volume: v1 }, 0);
    tone({ freq: 659.25, duration: 0.08, type: "square", volume: v1 }, 0.06);
    tone({ freq: 783.99, duration: 0.08, type: "square", volume: v1 }, 0.12);
    tone({ freq: 1046.5, duration: 0.18, type: "square", volume: v2 }, 0.18);

    if (tier >= 2) {
      // Extra high cap note — adds urgency.
      tone({ freq: 1318.5, duration: 0.20, type: "square", volume: v2 }, 0.30);
    }
    if (tier >= 3) {
      // Sparkle: a quick chimes pair on top to feel triumphant.
      tone({ freq: 1567.98, duration: 0.10, type: "triangle", volume: v2 }, 0.42);
      tone({ freq: 2093.0, duration: 0.18, type: "triangle", volume: v2 }, 0.50);
    }
  },
  tap() {
    // Soft UI click
    tone({ freq: 600, duration: 0.05, type: "sine", volume: 0.08 }, 0);
  },
  next() {
    // Whoosh / page turn
    tone({ freq: 440, duration: 0.1, type: "sine", volume: 0.08, freqEnd: 660 }, 0);
  },
  complete() {
    // Triumphant fanfare
    tone({ freq: 523.25, duration: 0.14, type: "triangle", volume: 0.16 }, 0);
    tone({ freq: 659.25, duration: 0.14, type: "triangle", volume: 0.16 }, 0.12);
    tone({ freq: 783.99, duration: 0.14, type: "triangle", volume: 0.16 }, 0.24);
    tone({ freq: 1046.5, duration: 0.35, type: "triangle", volume: 0.2 }, 0.36);
    // harmony
    tone({ freq: 659.25, duration: 0.35, type: "sine", volume: 0.1 }, 0.36);
  },
  fail() {
    // Sad trombone descent
    tone({ freq: 330, duration: 0.25, type: "triangle", volume: 0.12, freqEnd: 220 }, 0);
    tone({ freq: 220, duration: 0.4, type: "triangle", volume: 0.12, freqEnd: 165 }, 0.2);
  },
  heartLoss() {
    // Sharp downward thump — the "ouch" sound when a heart is lost
    tone({ freq: 280, duration: 0.18, type: "triangle", volume: 0.18, freqEnd: 110 }, 0);
    tone({ freq: 90, duration: 0.22, type: "sine", volume: 0.12 }, 0.05);
  },
  matchPair() {
    // Gentle two-note bell — like a chime when pairs match in match-pairs
    tone({ freq: 880, duration: 0.12, type: "sine", volume: 0.13 }, 0);
    tone({ freq: 1108.73, duration: 0.18, type: "sine", volume: 0.13 }, 0.08);
  },
};

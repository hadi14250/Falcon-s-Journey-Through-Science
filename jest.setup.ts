import "@testing-library/jest-dom";
import { MotionGlobalConfig } from "framer-motion";

// Disable framer-motion animations in tests so AnimatePresence transitions
// resolve synchronously and assertions don't race the exit animations.
MotionGlobalConfig.skipAnimations = true;

// Mock Next.js navigation hooks for components that use them
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Web Audio API used by sounds.ts
class MockAudioContext {
  state = "running";
  currentTime = 0;
  destination = {};
  createOscillator() {
    return {
      type: "sine",
      frequency: { setValueAtTime: jest.fn(), exponentialRampToValueAtTime: jest.fn() },
      connect: jest.fn(),
      start: jest.fn(),
      stop: jest.fn(),
    };
  }
  createGain() {
    return {
      gain: {
        setValueAtTime: jest.fn(),
        linearRampToValueAtTime: jest.fn(),
        exponentialRampToValueAtTime: jest.fn(),
      },
      connect: jest.fn(),
    };
  }
  resume = jest.fn();
}
(global as unknown as { AudioContext: typeof MockAudioContext }).AudioContext = MockAudioContext;

// Mock matchMedia for components that respect prefers-reduced-motion
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

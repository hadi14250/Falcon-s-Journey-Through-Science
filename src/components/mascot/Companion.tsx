"use client";

/* Public companion entry point. Always renders the static SVG variant via
   CompanionImage. The old per-species React mascots (Hurr, Oryx, etc.) are
   kept on disk for now but are no longer wired up — only camel is enabled
   while we iterate on the new art style. */

import CompanionImage, {
  type CompanionMood,
  type CompanionSize,
} from "./CompanionImage";

interface CompanionProps {
  size?: CompanionSize;
  mood?: CompanionMood;
  className?: string;
  speech?: string;
  hovering?: boolean;
  hideHappyStar?: boolean;
}

export default function Companion(props: CompanionProps) {
  return <CompanionImage {...props} />;
}

/* Legacy export kept for callers (NamePrompt, Profile picker) that used
   to look up per-species React components. With static SVGs there's only
   one renderer, so this map points every id at CompanionImage. */
export const companionComponents: Record<
  string,
  React.ComponentType<CompanionProps>
> = new Proxy(
  {},
  {
    get: () => Companion,
  }
);

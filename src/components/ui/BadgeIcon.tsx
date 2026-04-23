/* Per-subject, per-level badge icon. Loads a static SVG file from
   /public/badges/<subjectId>/<levelId>.svg so each badge has unique art. */

import type { SubjectId } from "@/data/subjects";

export default function BadgeIcon({
  levelId,
  subjectId = "space",
  unlocked = true,
  className = "w-10 h-10",
}: {
  levelId: number;
  subjectId?: SubjectId;
  unlocked?: boolean;
  className?: string;
}) {
  return (
    <img
      src={`/badges/${subjectId}/${levelId}.svg`}
      alt=""
      className={className}
      style={{
        objectFit: "contain",
        filter: unlocked ? undefined : "grayscale(1) opacity(0.55)",
      }}
    />
  );
}

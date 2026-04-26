import { lessons, getLesson } from "@/data/lessons";

describe("lesson data", () => {
  it("provides one lesson per level (1-6)", () => {
    expect(lessons).toHaveLength(6);
    for (let i = 1; i <= 6; i++) {
      expect(lessons.find((l) => l.levelId === i)).toBeDefined();
    }
  });

  it("each lesson has at least 8 exercises", () => {
    for (const lesson of lessons) {
      expect(lesson.exercises.length).toBeGreaterThanOrEqual(8);
    }
  });

  it("each lesson includes a mix of learn + interactive types", () => {
    for (const lesson of lessons) {
      const types = new Set(lesson.exercises.map((e) => e.type));
      expect(types.has("learn")).toBe(true);
      // At least 3 distinct interactive exercise types
      const interactive = ["tap-image", "true-false", "multiple-choice", "match-pairs", "listen-pick"];
      const interactiveCount = interactive.filter((t) => types.has(t as never)).length;
      expect(interactiveCount).toBeGreaterThanOrEqual(3);
    }
  });

  it("multiple-choice exercises have a correctIndex within bounds", () => {
    for (const lesson of lessons) {
      for (const ex of lesson.exercises) {
        if (ex.type === "multiple-choice") {
          expect(ex.correctIndex).toBeGreaterThanOrEqual(0);
          expect(ex.correctIndex).toBeLessThan(ex.options.length);
        }
        if (ex.type === "tap-image" || ex.type === "listen-pick") {
          expect(ex.correctIndex).toBeGreaterThanOrEqual(0);
          expect(ex.correctIndex).toBeLessThan(ex.options.length);
        }
      }
    }
  });

  it("match-pairs has at least 3 pairs", () => {
    for (const lesson of lessons) {
      for (const ex of lesson.exercises) {
        if (ex.type === "match-pairs") {
          expect(ex.pairs.length).toBeGreaterThanOrEqual(3);
        }
      }
    }
  });

  it("getLesson returns the right lesson", () => {
    expect(getLesson(1)?.levelId).toBe(1);
    expect(getLesson(6)?.levelId).toBe(6);
    expect(getLesson(99)).toBeUndefined();
  });
});

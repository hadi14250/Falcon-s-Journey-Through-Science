import { levels } from "@/data/levels";

describe("levels data", () => {
  it("has exactly 6 levels", () => {
    expect(levels).toHaveLength(6);
  });

  it("each level has unique sequential id 1-6", () => {
    const ids = levels.map((l) => l.id);
    expect(ids).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("every level has English and Arabic title", () => {
    levels.forEach((l) => {
      expect(l.title).toBeTruthy();
      expect(l.titleAr).toBeTruthy();
      expect(typeof l.title).toBe("string");
      expect(typeof l.titleAr).toBe("string");
    });
  });

  it("every level has a biome from the allowed set", () => {
    const allowed = ["desert", "oasis", "sky", "clouds", "stratosphere", "space"];
    levels.forEach((l) => {
      expect(allowed).toContain(l.biome);
    });
  });

  it("every level has at least 3 learning cards", () => {
    levels.forEach((l) => {
      expect(l.cards.length).toBeGreaterThanOrEqual(3);
    });
  });

  it("every learning card has title, body, funFact, illustration", () => {
    levels.forEach((l) => {
      l.cards.forEach((c) => {
        expect(c.title).toBeTruthy();
        expect(c.body).toBeTruthy();
        expect(c.funFact).toBeTruthy();
        expect(c.illustration).toBeTruthy();
      });
    });
  });

  it("every level has exactly 5 quiz questions", () => {
    levels.forEach((l) => {
      expect(l.quiz).toHaveLength(5);
    });
  });

  it("every quiz question has 4 options and a valid correctIndex", () => {
    levels.forEach((l) => {
      l.quiz.forEach((q) => {
        expect(q.options).toHaveLength(4);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(4);
        expect(q.options[q.correctIndex]).toBeTruthy();
      });
    });
  });

  it("every quiz question has a non-empty explanation", () => {
    levels.forEach((l) => {
      l.quiz.forEach((q) => {
        expect(q.explanation).toBeTruthy();
        expect(typeof q.explanation).toBe("string");
      });
    });
  });

  it("every level has a badge with EN/AR name and description", () => {
    levels.forEach((l) => {
      expect(l.badge.id).toBe(`badge-level-${l.id}`);
      expect(l.badge.name).toBeTruthy();
      expect(l.badge.nameAr).toBeTruthy();
      expect(l.badge.description).toBeTruthy();
    });
  });

  it("every level awards XP", () => {
    levels.forEach((l) => {
      expect(l.xpReward).toBeGreaterThan(0);
    });
  });

  it("level 6 (capstone) is space biome and references Hope Probe", () => {
    const l6 = levels.find((l) => l.id === 6)!;
    expect(l6.biome).toBe("space");
    expect(l6.title.toLowerCase()).toContain("hope");
  });
});

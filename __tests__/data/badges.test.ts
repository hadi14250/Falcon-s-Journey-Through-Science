import { badges, badgesBySubject, getBadgesForSubject, findBadgeById } from "@/data/badges";

describe("badges data", () => {
  it("has 13 badges total (6 space + 7 heritage; nature placeholder)", () => {
    expect(badges).toHaveLength(13);
  });

  it("space subject has 6 badges, levels 1..6", () => {
    const space = badgesBySubject.space;
    expect(space).toHaveLength(6);
    expect(space.map((b) => b.levelId).sort()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("heritage subject has 7 badges, one per emirate", () => {
    const heritage = badgesBySubject.heritage;
    expect(heritage).toHaveLength(7);
    expect(heritage.map((b) => b.levelId).sort()).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("nature subject is a placeholder (no badges yet)", () => {
    expect(badgesBySubject.nature).toHaveLength(0);
  });

  it("each badge id follows badge-{subjectId}-{levelId}", () => {
    badges.forEach((b) => {
      expect(b.id).toBe(`badge-${b.subjectId}-${b.levelId}`);
    });
  });

  it("each badge has English and Arabic name", () => {
    badges.forEach((b) => {
      expect(b.name).toBeTruthy();
      expect(b.nameAr).toBeTruthy();
    });
  });

  it("each badge has a non-empty description", () => {
    badges.forEach((b) => {
      expect(b.description).toBeTruthy();
    });
  });

  it("each badge has a theme with valid hex gradient and accent", () => {
    const hexRe = /^#[0-9A-F]{6}$/i;
    badges.forEach((b) => {
      expect(b.theme).toBeDefined();
      expect(Array.isArray(b.theme.gradient)).toBe(true);
      expect(b.theme.gradient).toHaveLength(2);
      b.theme.gradient.forEach((c) => expect(c).toMatch(hexRe));
      expect(b.theme.accent).toMatch(hexRe);
    });
  });

  it("Hope Pioneer (space level 6) badge uses UAE flag colors", () => {
    const hope = badges.find((b) => b.subjectId === "space" && b.levelId === 6)!;
    const colors = [...hope.theme.gradient, hope.theme.accent].map((c) => c.toUpperCase());
    const usesUAEColor = colors.some((c) => ["#009639", "#CE1126"].includes(c));
    expect(usesUAEColor).toBe(true);
  });

  it("getBadgesForSubject returns the right list", () => {
    expect(getBadgesForSubject("space")).toHaveLength(6);
    expect(getBadgesForSubject("heritage")).toHaveLength(7);
  });

  it("findBadgeById tolerates legacy badge-level-N ids by mapping them to space badges", () => {
    const legacy = findBadgeById("badge-level-3");
    expect(legacy).toBeDefined();
    expect(legacy!.subjectId).toBe("space");
    expect(legacy!.levelId).toBe(3);
  });
});

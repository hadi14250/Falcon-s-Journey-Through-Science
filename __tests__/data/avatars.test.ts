import { avatars } from "@/data/avatars";

describe("avatars data", () => {
  it("has 4 avatars", () => {
    expect(avatars).toHaveLength(4);
  });

  it("each avatar has unique id 0-3", () => {
    const ids = avatars.map((a) => a.id).sort();
    expect(ids).toEqual([0, 1, 2, 3]);
  });

  it("each avatar has English and Arabic name", () => {
    avatars.forEach((a) => {
      expect(a.name).toBeTruthy();
      expect(a.nameAr).toBeTruthy();
    });
  });

  it("each avatar has a description and gender", () => {
    avatars.forEach((a) => {
      expect(a.description).toBeTruthy();
      expect(["boy", "girl"]).toContain(a.gender);
    });
  });

  it("includes a balanced mix of boys and girls", () => {
    const boys = avatars.filter((a) => a.gender === "boy").length;
    const girls = avatars.filter((a) => a.gender === "girl").length;
    expect(boys).toBe(2);
    expect(girls).toBe(2);
  });

  it("uses authentic Emirati names", () => {
    const names = avatars.map((a) => a.name);
    const expectAtLeastOne = ["Ahmed", "Fatima", "Khalid", "Mariam", "Omar", "Aisha"];
    const hasOne = expectAtLeastOne.some((n) => names.includes(n));
    expect(hasOne).toBe(true);
  });
});

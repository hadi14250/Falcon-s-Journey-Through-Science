import { companions, enabledCompanions } from "@/data/companions";

describe("companions data", () => {
  it("has 8 UAE animal companions", () => {
    expect(companions).toHaveLength(8);
  });

  it("each companion has a unique id from the allowed set", () => {
    const ids = companions.map((c) => c.id).sort();
    expect(ids).toEqual([
      "camel",
      "falcon",
      "hoopoe",
      "oryx",
      "sandcat",
      "sandfox",
      "turtle",
      "wolf",
    ]);
  });

  it("first companion is the camel (Jammool) — currently the only enabled mascot", () => {
    expect(companions[0].id).toBe("camel");
    expect(companions[0].name).toBe("Jammool");
    expect(companions[0].nameAr).toBe("جمّول");
  });

  it("oryx companion uses correct Arabic word for the animal", () => {
    const oryx = companions.find((c) => c.id === "oryx")!;
    // مها (Maha) is the Arabic word for oryx
    expect(oryx.nameAr).toBe("مها");
    expect(oryx.name).toBe("Maha");
  });

  it("each companion has English + Arabic name, animal type, description, and an `enabled` flag", () => {
    companions.forEach((c) => {
      expect(c.name).toBeTruthy();
      expect(c.nameAr).toBeTruthy();
      expect(c.animal).toBeTruthy();
      expect(c.description).toBeTruthy();
      expect(typeof c.enabled).toBe("boolean");
    });
  });

  it("all 8 companions are enabled", () => {
    expect(enabledCompanions.map((c) => c.id).sort()).toEqual([
      "camel",
      "falcon",
      "hoopoe",
      "oryx",
      "sandcat",
      "sandfox",
      "turtle",
      "wolf",
    ]);
  });
});

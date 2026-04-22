export interface CompanionData {
  id: string;
  name: string;
  nameAr: string;
  animal: string;
  description: string;
  /* When false, the companion is hidden from pickers (onboarding + profile)
     and treated as "in development". Static SVG art still wins if present. */
  enabled: boolean;
}

/* Only camel is enabled while we iterate on the new static-SVG art for the
   other 7 species. Re-enable each one as their plain/ghutra/collar files
   land in /public/companions/{variant}/{id}.svg. */
export const companions: CompanionData[] = [
  {
    id: "camel",
    name: "Jammool",
    nameAr: "جمّول",
    animal: "Arabian Camel",
    description: "A friendly camel, an icon of the Arabian desert",
    enabled: true,
  },
  {
    id: "falcon",
    name: "Hurr",
    nameAr: "حُرّ",
    animal: "Saker Falcon",
    description: "A brave falcon, the national bird of the UAE",
    enabled: true,
  },
  {
    id: "oryx",
    name: "Maha",
    nameAr: "مها",
    animal: "Arabian Oryx",
    description: "A graceful oryx, the national animal of the UAE",
    enabled: true,
  },
  {
    id: "sandcat",
    name: "Basbous",
    nameAr: "بسبوس",
    animal: "Arabian Cat",
    description: "A curious cat from the Arabian sands",
    enabled: true,
  },
  {
    id: "sandfox",
    name: "Ta3loob",
    nameAr: "تعلوب",
    animal: "Arabian Red Fox",
    description: "A clever red fox from the Arabian sands",
    enabled: true,
  },
  {
    id: "wolf",
    name: "Diab",
    nameAr: "دِياب",
    animal: "Arabian Wolf",
    description: "A wise wolf from the UAE mountains",
    enabled: true,
  },
  {
    id: "turtle",
    name: "Sal7oof",
    nameAr: "سَلحوف",
    animal: "Hawksbill Turtle",
    description: "A peaceful turtle from the Arabian Gulf",
    enabled: true,
  },
  {
    id: "hoopoe",
    name: "Hadhood",
    nameAr: "هدهود",
    animal: "Hoopoe Bird",
    description: "A colorful hoopoe, mentioned in the Quran",
    enabled: true,
  },
];

export const enabledCompanions = companions.filter((c) => c.enabled);

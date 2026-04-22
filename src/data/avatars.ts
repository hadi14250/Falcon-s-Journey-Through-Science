export interface Avatar {
  id: number;
  name: string;
  nameAr: string;
  description: string;
  gender: "boy" | "girl";
}

export const avatars: Avatar[] = [
  { id: 0, name: "Rashid", nameAr: "راشد", description: "Young Emirati boy in white kandura", gender: "boy" },
  { id: 1, name: "Zayed", nameAr: "زايد", description: "Young Emirati boy in white kandura", gender: "boy" },
  { id: 2, name: "Hadi", nameAr: "هادي", description: "Young Emirati boy in white kandura", gender: "boy" },
  { id: 3, name: "Hamed", nameAr: "حامد", description: "Young Emirati boy in white kandura", gender: "boy" },
  { id: 4, name: "Carlo", nameAr: "كارلو", description: "Young Filipino boy", gender: "boy" },
  { id: 5, name: "Mira", nameAr: "ميرا", description: "Young Emirati girl in shayla", gender: "girl" },
  { id: 6, name: "Mahra", nameAr: "مهرة", description: "Young Emirati girl in shayla", gender: "girl" },
  { id: 7, name: "Aisha", nameAr: "عَيشة", description: "Young Emirati girl in shayla", gender: "girl" },
  { id: 8, name: "Hala", nameAr: "هاله", description: "Young Emirati girl in shayla", gender: "girl" },
  { id: 9, name: "Sofía", nameAr: "صوفيا", description: "Young Latina girl", gender: "girl" },
];

/* Souq catalog.
   Items belong to one of two slots — `target: "human"` items dress the
   student avatar, `target: "companion"` items dress the chosen animal.
   Each slot holds at most one item at a time (enforced in the store). */

export type ItemTarget = "human" | "companion";

export interface ShopItem {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  target: ItemTarget;
  /* Filename inside /public/shop/ — the item icon shown on the souq tile. */
  icon: string;
}

export const FLAG_ITEM_ID = "uae-flag";

export const shopItems: ShopItem[] = [
  {
    id: "uae-flag",
    name: "UAE Flag",
    nameAr: "علمُ الإمارات",
    description: "Wave the colors of the nation, proud and high.",
    descriptionAr: "ارفعْ علمَ الوطنِ بفخرٍ واعتزاز.",
    price: 20,
    target: "human",
    icon: "uae-flag.svg",
  },
  {
    id: "uae-scarf",
    name: "UAE Scarf",
    nameAr: "وشاحُ الإمارات",
    description: "A warm scarf in the colors of the homeland.",
    descriptionAr: "وشاحٌ دافئٌ بألوانِ الوطن.",
    price: 15,
    target: "human",
    icon: "uae-scarf.svg",
  },
  {
    id: "uae-balloon",
    name: "UAE Balloon",
    nameAr: "بالونُ الإمارات",
    description: "Celebrate every win with a balloon of the Emirates.",
    descriptionAr: "احتفلْ بكلِّ إنجازٍ ببالونِ الإمارات.",
    price: 10,
    target: "human",
    icon: "uae-balloon.svg",
  },
  {
    id: "ghutra",
    name: "Ghutra",
    nameAr: "غترة",
    description: "A traditional headpiece for your companion.",
    descriptionAr: "غطاءُ رأسٍ تقليديٌّ لرفيقِك.",
    price: 20,
    target: "companion",
    icon: "ghutra.svg",
  },
  {
    id: "collar",
    name: "UAE Collar",
    nameAr: "قلادةُ الإمارات",
    description: "A handsome collar in UAE colors for your companion.",
    descriptionAr: "قلادةٌ أنيقةٌ بألوانِ الإمارات لرفيقِك.",
    price: 15,
    target: "companion",
    icon: "collar.svg",
  },
  {
    id: "cool-glasses",
    name: "Cool Glasses",
    nameAr: "نظاراتٌ رائعة",
    description: "Shades for your companion. The desert sun is bright.",
    descriptionAr: "نظاراتٌ شمسيةٌ لرفيقِك، شمسُ الصحراءِ ساطعة.",
    price: 25,
    target: "companion",
    icon: "cool-glasses.png",
  },
  {
    id: "cool-glasses-human",
    name: "Cool Glasses",
    nameAr: "نظاراتٌ رائعة",
    description: "Shades for you. The desert sun is bright.",
    descriptionAr: "نظاراتٌ شمسيةٌ لك، شمسُ الصحراءِ ساطعة.",
    price: 25,
    target: "human",
    icon: "cool-glasses.png",
  },
];

export function getItemById(id: string): ShopItem | undefined {
  return shopItems.find((item) => item.id === id);
}

export function itemsForTarget(target: ItemTarget): ShopItem[] {
  return shopItems.filter((item) => item.target === target);
}

/* Resolve the equipped item id (or null) into a variant name used by
   the static SVG path convention:
     human:     /public/humans/{variant}/{id}.png      -> "plain" | "flag" | "scarf" | "balloon" | "glasses"
     companion: /public/companions/{variant}/{id}.svg  -> "plain" | "ghutra" | "collar" | "glasses"
   Unknown / unequipped → "plain". */
export function humanVariantFor(
  itemId: string | null
): "plain" | "flag" | "scarf" | "balloon" | "glasses" {
  switch (itemId) {
    case "uae-flag":
      return "flag";
    case "uae-scarf":
      return "scarf";
    case "uae-balloon":
      return "balloon";
    case "cool-glasses-human":
      return "glasses";
    default:
      return "plain";
  }
}

/* Single source of truth for "which image file should I show?" Pass the
   avatar/companion id + the equipped item id from the store. Use these
   ANY TIME you render the player as "you, currently dressed". For the
   picker grids in profile/onboarding/souq, render `plain` directly so
   the player can see the underlying identity, not the outfit. */
export function humanSrcFor(avatarId: number, equippedHuman: string | null): string {
  return `/humans/${humanVariantFor(equippedHuman)}/${avatarId}.png`;
}

export function companionSrcFor(companionId: string, equippedCompanion: string | null): string {
  const variant = companionVariantFor(equippedCompanion);
  // The original variants ship as SVG; the glasses variant is PNG art.
  const ext = variant === "glasses" ? "png" : "svg";
  return `/companions/${variant}/${companionId}.${ext}`;
}

export function companionVariantFor(itemId: string | null): "plain" | "ghutra" | "collar" | "glasses" {
  switch (itemId) {
    case "ghutra":
      return "ghutra";
    case "collar":
      return "collar";
    case "cool-glasses":
      return "glasses";
    default:
      return "plain";
  }
}

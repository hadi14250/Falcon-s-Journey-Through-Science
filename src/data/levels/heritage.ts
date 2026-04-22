/* === UAE Heritage subject — level metadata for the 7 emirates ============
   Each level is a single emirate. The biome maps to the map page's
   visual treatment for this subject (city/coast styling, not space).
   Lesson content lives in src/data/lessons/heritage.ts. */

import type { Level } from "../levels";

export const heritageLevels: Level[] = [
  {
    id: 1,
    title: "Abu Dhabi",
    titleAr: "أبوظبي",
    biome: "desert",
    nodeSticker: "node-abu-dhabi",
    introText:
      "Yalla, let's start in Abu Dhabi! It's the capital of the UAE and the biggest emirate. We'll see the Sheikh Zayed Grand Mosque and the golden Liwa dunes.",
    hurrIntroLine:
      "Welcome to Abu Dhabi! Did you know its name means 'Father of the Gazelle'?",
    cards: [],
    quiz: [],
    badge: {
      id: "badge-heritage-1",
      name: "Capital Explorer",
      nameAr: "مستكشف العاصمة",
      description: "Completed the Abu Dhabi level",
    },
    xpReward: 100,
  },
  {
    id: 2,
    title: "Dubai",
    titleAr: "دبي",
    biome: "sky",
    nodeSticker: "node-dubai",
    introText:
      "Next stop, Dubai! Home to the tallest building in the world and the Palm Island. Ready to climb the Burj Khalifa with me?",
    hurrIntroLine:
      "Up, up, up! Let's race to the top of the Burj Khalifa together.",
    cards: [],
    quiz: [],
    badge: {
      id: "badge-heritage-2",
      name: "Sky Explorer",
      nameAr: "مستكشف السماء",
      description: "Completed the Dubai level",
    },
    xpReward: 100,
  },
  {
    id: 3,
    title: "Sharjah",
    titleAr: "الشارقة",
    biome: "oasis",
    nodeSticker: "node-sharjah",
    introText:
      "Welcome to Sharjah, the cultural capital of the Arab world. It's the only emirate that touches two seas!",
    hurrIntroLine:
      "Books, museums, and two seas. Sharjah has it all. Let's learn together.",
    cards: [],
    quiz: [],
    badge: {
      id: "badge-heritage-3",
      name: "Culture Explorer",
      nameAr: "مستكشف الثقافة",
      description: "Completed the Sharjah level",
    },
    xpReward: 100,
  },
  {
    id: 4,
    title: "Ajman",
    titleAr: "عجمان",
    biome: "oasis",
    nodeSticker: "node-ajman",
    introText:
      "Ajman is the smallest emirate but it has the world's biggest dhow boat shipyard!",
    hurrIntroLine:
      "Tiny but mighty. Ajman builds the world's most beautiful wooden boats.",
    cards: [],
    quiz: [],
    badge: {
      id: "badge-heritage-4",
      name: "Dhow Builder",
      nameAr: "بنّاء الداو",
      description: "Completed the Ajman level",
    },
    xpReward: 100,
  },
  {
    id: 5,
    title: "Umm Al Quwain",
    titleAr: "أم القيوين",
    biome: "oasis",
    nodeSticker: "node-umm-al-quwain",
    introText:
      "Umm Al Quwain means 'Mother of Two Powers'. Its people were strong on both land and sea.",
    hurrIntroLine:
      "Mangroves, lagoons, and ancient ruins. Umm Al Quwain is full of secrets.",
    cards: [],
    quiz: [],
    badge: {
      id: "badge-heritage-5",
      name: "Lagoon Explorer",
      nameAr: "مستكشف البحيرات",
      description: "Completed the Umm Al Quwain level",
    },
    xpReward: 100,
  },
  {
    id: 6,
    title: "Ras Al Khaimah",
    titleAr: "رأس الخيمة",
    biome: "stratosphere",
    nodeSticker: "node-ras-al-khaimah",
    introText:
      "Climb with me to Jebel Jais, the tallest mountain in the UAE! It even snows up here sometimes.",
    hurrIntroLine:
      "To the top of the UAE! Hold on tight, the zipline is fast.",
    cards: [],
    quiz: [],
    badge: {
      id: "badge-heritage-6",
      name: "Mountain Climber",
      nameAr: "متسلّق الجبال",
      description: "Completed the Ras Al Khaimah level",
    },
    xpReward: 100,
  },
  {
    id: 7,
    title: "Fujairah",
    titleAr: "الفجيرة",
    biome: "oasis",
    nodeSticker: "node-fujairah",
    introText:
      "Fujairah is the only emirate on the Gulf of Oman. It has the oldest mosque in the UAE!",
    hurrIntroLine:
      "Mountains meet the sea here. And we'll visit a 575 year old mosque!",
    cards: [],
    quiz: [],
    badge: {
      id: "badge-heritage-7",
      name: "Coast Guardian",
      nameAr: "حارس الساحل",
      description: "Completed the Fujairah level",
    },
    xpReward: 100,
  },
];

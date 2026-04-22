import type { StickerName } from "@/components/lesson/Sticker";

/* =================================================================
   LESSON SCHEMA
   - Each level has a Lesson = ordered list of Exercises.
   - Exercises mix "teaching" (learn) and "checking" (interactive).
   - Hearts are spent on check-style exercises only.

   PEDAGOGICAL RULES enforced for every lesson:
   1. Every fact tested MUST first appear in a HEADLINE of an earlier
      `learn` exercise. (funFact lines are decoration only.)
   2. Spacing: don't immediately test what was just taught. Stack 2-3
      teach screens, THEN test the earlier facts. The student should
      have to actually remember, not echo.
   3. Each lesson opens with at least 2 learn screens before the first
      test, so kids have a real foothold before stakes start.
   4. Tap-image and listen-pick can sit anywhere — they test visual /
      audio recognition, not facts that need spaced practice.
   ================================================================= */

export interface LearnExercise {
  type: "learn";
  sticker: StickerName;
  headline: string;       // 1-sentence fact, big type
  headlineAr?: string;    // optional Arabic counterpart
  funFact?: string;       // tiny extra (NOT testable — purely flavor)
  hurr?: string;          // companion line
}

export interface TapImageExercise {
  type: "tap-image";
  prompt: string;
  promptAr?: string;
  options: { sticker: StickerName; label: string }[];
  correctIndex: number;
}

export interface TrueFalseExercise {
  type: "true-false";
  statement: string;
  statementAr?: string;
  sticker?: StickerName;
  answer: boolean;
  explanation: string;
}

export interface MultipleChoiceExercise {
  type: "multiple-choice";
  question: string;
  questionAr?: string;
  sticker?: StickerName;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MatchPairsExercise {
  type: "match-pairs";
  prompt: string;
  /* Each pair has English label + Arabic label; the component shuffles & matches. */
  pairs: { en: string; ar: string }[];
}

export interface ListenPickExercise {
  type: "listen-pick";
  prompt: string;
  /* The word that's spoken when the user taps the speaker. */
  spoken: string;
  spokenLang?: "en-US" | "ar";
  options: { sticker: StickerName; label: string }[];
  correctIndex: number;
}

export type Exercise =
  | LearnExercise
  | TapImageExercise
  | TrueFalseExercise
  | MultipleChoiceExercise
  | MatchPairsExercise
  | ListenPickExercise;

export interface Lesson {
  levelId: number;
  exercises: Exercise[];
}

/* =================================================================
   LEVEL 1 — The Sun & Our Star
   Structure (5 blocks):
   Block A — what the Sun is: learn-1, learn-2, tap-image, T/F-1
   Block B — sunlight + size: learn-3, learn-4, MCQ-1, MCQ-2
   Block C — sun & life: learn-5, T/F-2
   Block D — vocab: match-pairs, listen-pick
   ================================================================= */
const lesson1: Exercise[] = [
  // === Block A: Sun is a star ===
  {
    type: "learn",
    sticker: "sun",
    headline: "The Sun is a star, the closest star to Earth.",
    headlineAr: "الشمسُ نجمُنا، وهي أقربُ نجمٍ إلى الأرض",
    hurr: "Marhaba! (Hello!) Yalla, let's begin.",
  },
  {
    type: "learn",
    sticker: "sun-and-earth",
    headline: "The Sun gives Earth light and warmth every day.",
    hurr: "Without the Sun, Earth would be dark and freezing.",
  },
  {
    type: "tap-image",
    prompt: "Tap the Sun",
    promptAr: "اضغطْ على الشمس",
    options: [
      { sticker: "moon", label: "Moon" },
      { sticker: "sun", label: "Sun" },
      { sticker: "mars", label: "Mars" },
    ],
    correctIndex: 1,
  },
  {
    type: "true-false",
    statement: "The Sun is a planet.",
    statementAr: "الشمسُ كوكب.",
    sticker: "sun",
    answer: false,
    explanation: "The Sun is a STAR, the closest star to Earth!",
  },

  // === Block B: light speed + size ===
  {
    type: "learn",
    sticker: "sunlight-travel",
    headline: "Sunlight takes about 8 minutes to travel from the Sun to Earth.",
    hurr: "Light is the fastest thing in the universe!",
  },
  {
    type: "learn",
    sticker: "sun-vs-earth-size",
    headline: "The Sun is huge. About 1.3 million Earths could fit inside it!",
    funFact: "Its surface is 5,500°C, hotter than anything on Earth.",
  },
  {
    type: "multiple-choice",
    question: "How long does sunlight take to reach Earth?",
    sticker: "sunlight-travel",
    options: ["1 second", "8 minutes", "1 hour", "1 day"],
    correctIndex: 1,
    explanation: "Light from the Sun travels 8 minutes to get to Earth!",
  },
  {
    type: "multiple-choice",
    question: "How many Earths could fit inside the Sun?",
    sticker: "sun-vs-earth-size",
    options: ["100", "1,000", "1.3 million", "10"],
    correctIndex: 2,
    explanation: "About 1.3 million Earths could fit inside the Sun!",
  },

  // === Block C: Sun & life ===
  {
    type: "learn",
    sticker: "plant-photosynthesis",
    headline: "Plants need the Sun's light to grow.",
    hurr: "Even our ghaf trees love the sunshine!",
  },
  {
    type: "true-false",
    statement: "Plants need the Sun to grow.",
    sticker: "ghaf-tree",
    answer: true,
    explanation: "Yes! Plants use sunlight to make their food.",
  },

  // === Bonus: how hot the Sun really is ===
  {
    type: "learn",
    sticker: "sun-temperature",
    headline: "The Sun's surface is about 5,500°C, hotter than anything on Earth.",
    headlineAr: "سطحُ الشمسِ حرارتُهُ نحوَ ٥٫٥٠٠ درجة مئوية، أسخن من أي شيء على الأرض",
    funFact: "Its core is even hotter, about 15 million °C!",
    hurr: "Mashallah, that's seriously hot.",
  },

  // === Block D: vocab ===
  {
    type: "match-pairs",
    prompt: "Match the words to Arabic",
    pairs: [
      { en: "Sun", ar: "الشمس" },
      { en: "Earth", ar: "الأرض" },
      { en: "Star", ar: "نجم" },
      { en: "Light", ar: "ضوء" },
    ],
  },
  {
    type: "listen-pick",
    prompt: "Tap the speaker, then pick what you hear",
    spoken: "the sun",
    spokenLang: "en-US",
    options: [
      { sticker: "earth", label: "the earth" },
      { sticker: "sun", label: "the sun" },
      { sticker: "moon", label: "the moon" },
    ],
    correctIndex: 1,
  },
  {
    type: "true-false",
    statement: "The Sun's surface is about 5,500°C.",
    sticker: "sun-temperature",
    answer: true,
    explanation: "Yes! Its surface is around 5,500°C, hotter than anything on Earth.",
  },
];

/* =================================================================
   LEVEL 2 — Earth & Moon
   Block A — Earth basics: learn (3rd planet) + learn (water) + tap-image + MCQ-water
   Block B — day/night: learn + MCQ
   Block C — the Moon: learn (orbit) + learn (reflects) + T/F + learn (phases)
   Block D — vocab: match-pairs + listen-pick
   ================================================================= */
const lesson2: Exercise[] = [
  // === Block A: Earth basics ===
  {
    type: "learn",
    sticker: "earth",
    headline: "Earth is the third planet from the Sun.",
    headlineAr: "الأرضُ هي الكوكبُ الثالثُ من الشمس",
    hurr: "This is our home, alhamdulillah!",
  },
  {
    type: "learn",
    sticker: "earth-water",
    headline: "Most of Earth's surface is covered by water.",
    funFact: "About 71%. That's why Earth looks blue from space!",
  },
  {
    type: "tap-image",
    prompt: "Tap our home: Earth",
    options: [
      { sticker: "mars", label: "Mars" },
      { sticker: "earth", label: "Earth" },
      { sticker: "venus", label: "Venus" },
    ],
    correctIndex: 1,
  },
  {
    type: "multiple-choice",
    question: "What covers most of Earth's surface?",
    sticker: "earth-water",
    options: ["Sand", "Ice", "Water", "Trees"],
    correctIndex: 2,
    explanation: "About 71% of Earth is covered by water!",
  },

  // === Block B: day & night ===
  {
    type: "learn",
    sticker: "earth-rotation",
    headline: "Earth spins on its axis all the time. The side facing the Sun has day, and the side facing away has night.",
    hurr: "Yalla, the Sun didn't move, you did!",
  },
  {
    type: "multiple-choice",
    question: "Why do we have day and night?",
    sticker: "day-night",
    options: [
      "The Sun turns off",
      "Earth spins on its axis",
      "The Moon blocks the Sun",
      "Clouds cover the Sun",
    ],
    correctIndex: 1,
    explanation: "Earth spins! When we face the Sun it's day, when we face away it's night.",
  },

  // === Block C: the Moon ===
  {
    type: "learn",
    sticker: "moon-orbit",
    headline: "The Moon orbits around Earth.",
    funFact: "It's 384,000 km away. Astronauts took 3 days to fly there!",
  },
  {
    type: "learn",
    sticker: "moon-reflect",
    headline: "The Moon doesn't make its own light. It reflects sunlight.",
    hurr: "The Moon is like a mirror in the sky!",
  },
  {
    type: "true-false",
    statement: "The Moon makes its own light.",
    sticker: "moon-full",
    answer: false,
    explanation: "The Moon reflects sunlight, like a mirror!",
  },
  {
    type: "learn",
    sticker: "moon-cycle",
    headline: "The Moon looks different each night. These are moon phases.",
    funFact: "The crescent moon is a special symbol in Arab and Islamic culture.",
  },

  // === Block D: vocab ===
  {
    type: "match-pairs",
    prompt: "Match the words to Arabic",
    pairs: [
      { en: "Earth", ar: "الأرض" },
      { en: "Moon", ar: "القمر" },
      { en: "Day", ar: "نهار" },
      { en: "Night", ar: "ليل" },
    ],
  },
  {
    type: "listen-pick",
    prompt: "Tap the speaker, then pick what you hear",
    spoken: "the moon",
    spokenLang: "en-US",
    options: [
      { sticker: "sun", label: "the sun" },
      { sticker: "moon", label: "the moon" },
      { sticker: "earth", label: "the earth" },
    ],
    correctIndex: 1,
  },
  {
    type: "multiple-choice",
    question: "Which planet from the Sun is Earth?",
    sticker: "earth",
    options: ["1st", "2nd", "3rd", "4th"],
    correctIndex: 2,
    explanation: "Earth is the 3rd planet from the Sun!",
  },
  {
    type: "true-false",
    statement: "The Moon orbits around Earth.",
    sticker: "moon-orbit",
    answer: true,
    explanation: "Yes! The Moon is 384,000 km away and circles around us.",
  },
];

/* =================================================================
   LEVEL 3 — Inner Planets
   Block A — Mercury + Venus: learn-mercury + learn-venus + T/F-venus + MCQ-smallest
   Block B — Mars: learn + tap-image + MCQ-red
   Block C — rocky planets: learn + T/F
   Block D — vocab: match-pairs + listen-pick
   ================================================================= */
const lesson3: Exercise[] = [
  // === Block A: Mercury & Venus ===
  {
    type: "learn",
    sticker: "mercury",
    headline: "Mercury is the smallest planet and closest to the Sun.",
    funFact: "A year on Mercury is just 88 Earth days!",
    hurr: "Mercury is fast like a falcon!",
  },
  {
    type: "learn",
    sticker: "venus-clouds",
    headline: "Venus is the hottest planet, even hotter than Mercury!",
    funFact: "Thick clouds trap all the heat on Venus.",
  },
  {
    type: "true-false",
    statement: "Venus is the hottest planet.",
    sticker: "venus-hot",
    answer: true,
    explanation: "Yes! Its thick clouds trap all the heat.",
  },
  {
    type: "multiple-choice",
    question: "Which planet is smallest and closest to the Sun?",
    sticker: "mercury-fast",
    options: ["Venus", "Earth", "Mercury", "Mars"],
    correctIndex: 2,
    explanation: "Mercury is the smallest and the closest to the Sun!",
  },

  // === Block B: Mars ===
  {
    type: "learn",
    sticker: "red-planet-closeup",
    headline: "Mars is the Red Planet. Its soil has iron rust.",
    headlineAr: "المريخُ هو الكوكبُ الأحمر",
    hurr: "Mashallah, the UAE reached Mars with the Hope Probe!",
  },
  {
    type: "tap-image",
    prompt: "Tap Mars, the Red Planet",
    options: [
      { sticker: "venus", label: "Venus" },
      { sticker: "mars", label: "Mars" },
      { sticker: "mercury", label: "Mercury" },
    ],
    correctIndex: 1,
  },
  {
    type: "multiple-choice",
    question: "Why is Mars red?",
    sticker: "red-planet-closeup",
    options: [
      "It's on fire",
      "It has red clouds",
      "Its soil has iron rust",
      "It's painted",
    ],
    correctIndex: 2,
    explanation: "Mars is red because the iron in its soil has rusted!",
  },

  // === Block C: rocky planets ===
  {
    type: "learn",
    sticker: "rocky-vs-gas",
    headline: "Mercury, Venus, Earth, and Mars are all rocky planets.",
    funFact: "They have solid surfaces you could stand on!",
  },
  {
    type: "learn",
    sticker: "burj-khalifa",
    headline: "Earth has rocky ground, strong enough to hold the Burj Khalifa!",
    headlineAr: "أرضُ كوكبِنا صلبةٌ بما يكفي لِتحمِلَ برجَ خليفة!",
    funFact: "Burj Khalifa is the tallest building in the world, built right here in Dubai.",
    hurr: "Dubai's pride!",
  },
  {
    type: "true-false",
    statement: "Mars is a rocky planet.",
    sticker: "mars-canyon",
    answer: true,
    explanation: "Yes! Mars is one of the four rocky planets.",
  },

  // === Block D: vocab ===
  {
    type: "match-pairs",
    prompt: "Match the planets to Arabic",
    pairs: [
      { en: "Mars", ar: "المريخ" },
      { en: "Venus", ar: "الزهرة" },
      { en: "Mercury", ar: "عطارد" },
      { en: "Planet", ar: "كوكب" },
    ],
  },
  {
    type: "listen-pick",
    prompt: "Tap the speaker, then pick what you hear",
    spoken: "Mars",
    spokenLang: "en-US",
    options: [
      { sticker: "mars", label: "Mars" },
      { sticker: "earth", label: "Earth" },
      { sticker: "venus", label: "Venus" },
    ],
    correctIndex: 0,
  },
];

/* =================================================================
   LEVEL 4 — The Asteroid Belt
   Block A — what + where: learn (rocks) + learn (belt location) + tap-image + T/F-rocks + MCQ-where
   Block B — when + safe: learn (4.5B yrs) + learn (safe) + MCQ-when + T/F-safe
   Block D — vocab: match-pairs + listen-pick
   ================================================================= */
const lesson4: Exercise[] = [
  // === Block A: what + where ===
  {
    type: "learn",
    sticker: "space-rock",
    headline: "Asteroids are chunks of rock and metal in space.",
    hurr: "Watch out for space rocks!",
  },
  {
    type: "learn",
    sticker: "belt-position",
    headline: "Most asteroids live in the Asteroid Belt, between Mars and Jupiter.",
    hurr: "Hold on, we're flying through the belt!",
  },
  {
    type: "tap-image",
    prompt: "Tap an asteroid",
    options: [
      { sticker: "moon", label: "Moon" },
      { sticker: "asteroid", label: "Asteroid" },
      { sticker: "sun", label: "Sun" },
    ],
    correctIndex: 1,
  },
  {
    type: "true-false",
    statement: "Asteroids are made of rock and metal.",
    sticker: "asteroid-shape-variety",
    answer: true,
    explanation: "Yes! They're chunks of rock and metal floating in space.",
  },
  {
    type: "multiple-choice",
    question: "Where is the Asteroid Belt?",
    sticker: "belt-from-above",
    options: [
      "Between Earth and Mars",
      "Between Mars and Jupiter",
      "Beyond Neptune",
      "Inside the Sun",
    ],
    correctIndex: 1,
    explanation: "It sits between Mars and Jupiter!",
  },

  // === Block B: when + safe ===
  {
    type: "learn",
    sticker: "asteroid-cluster",
    headline: "Asteroids are ancient. They formed 4.5 billion years ago.",
    funFact: "That's when the whole solar system was born!",
  },
  {
    type: "learn",
    sticker: "asteroid-collision",
    headline: "Asteroids are spread far apart, so spacecraft fly through safely.",
    hurr: "Don't worry, no crashing!",
  },
  {
    type: "multiple-choice",
    question: "When were asteroids formed?",
    sticker: "asteroid-cluster",
    options: ["Last year", "1,000 years ago", "4.5 billion years ago", "100 years ago"],
    correctIndex: 2,
    explanation: "Asteroids are ancient. They formed 4.5 billion years ago!",
  },
  {
    type: "true-false",
    statement: "Spacecraft can fly through the Asteroid Belt safely.",
    sticker: "asteroid-collision",
    answer: true,
    explanation: "Yes! Asteroids are spread very far apart, so it's safe.",
  },

  // === Block D: vocab ===
  {
    type: "match-pairs",
    prompt: "Match the words to Arabic",
    pairs: [
      { en: "Asteroid", ar: "كويكب" },
      { en: "Rock", ar: "صخرة" },
      { en: "Space", ar: "فضاء" },
      { en: "Belt", ar: "حزام" },
    ],
  },
  {
    type: "listen-pick",
    prompt: "Tap the speaker, then pick what you hear",
    spoken: "asteroid",
    spokenLang: "en-US",
    options: [
      { sticker: "moon", label: "moon" },
      { sticker: "asteroid", label: "asteroid" },
      { sticker: "comet", label: "comet" },
    ],
    correctIndex: 1,
  },
];

/* =================================================================
   LEVEL 5 — Outer Planets
   Block A — Jupiter + Saturn: learn (biggest) + learn (rings) + tap-image + MCQ-biggest + MCQ-rings
   Block B — ice giants + gas: learn (ice giants) + learn (gas giants) + T/F-walk
   Block D — vocab
   ================================================================= */
const lesson5: Exercise[] = [
  // === Block A: Jupiter + Saturn ===
  {
    type: "learn",
    sticker: "huge-jupiter",
    headline: "Jupiter is the biggest planet in our Solar System!",
    funFact: "All other planets could fit inside Jupiter.",
    hurr: "Look how huge Jupiter is!",
  },
  {
    type: "learn",
    sticker: "saturn-rings-closeup",
    headline: "Saturn has beautiful rings made of ice and rock.",
    hurr: "Saturn is the prettiest planet!",
  },
  {
    type: "tap-image",
    prompt: "Tap Saturn, the planet with rings",
    options: [
      { sticker: "jupiter", label: "Jupiter" },
      { sticker: "saturn", label: "Saturn" },
      { sticker: "earth", label: "Earth" },
    ],
    correctIndex: 1,
  },
  {
    type: "multiple-choice",
    question: "Which is the biggest planet?",
    sticker: "jupiter-bands",
    options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
    correctIndex: 1,
    explanation: "Jupiter is the giant king of planets!",
  },
  {
    type: "multiple-choice",
    question: "What are Saturn's rings made of?",
    sticker: "saturn-tilt",
    options: ["Fire", "Ice and rock", "Clouds", "Gold"],
    correctIndex: 1,
    explanation: "Saturn's rings are billions of pieces of ice and rock!",
  },

  // === Block B: ice giants & gas ===
  {
    type: "learn",
    sticker: "uranus-tilt",
    headline: "Uranus and Neptune are the ice giants, far from the Sun.",
    funFact: "Neptune has winds over 2,000 km/h, the fastest in the Solar System!",
  },
  {
    type: "learn",
    sticker: "neptune-storm",
    headline: "Neptune has the strongest winds and dark blue storms.",
    funFact: "Storms on Neptune can be bigger than the whole Earth!",
  },
  {
    type: "learn",
    sticker: "gas-giant-comparison",
    headline: "Jupiter and Saturn are gas giants. They have no solid ground.",
    hurr: "You can't walk on a gas giant!",
  },
  {
    type: "true-false",
    statement: "You could walk on Jupiter.",
    sticker: "jupiter-storm",
    answer: false,
    explanation: "Jupiter is a gas giant. There's no solid surface!",
  },

  // === Block D: vocab ===
  {
    type: "match-pairs",
    prompt: "Match the planets to Arabic",
    pairs: [
      { en: "Jupiter", ar: "المشتري" },
      { en: "Saturn", ar: "زحل" },
      { en: "Ring", ar: "حلقة" },
      { en: "Giant", ar: "عملاق" },
    ],
  },
  {
    type: "listen-pick",
    prompt: "Tap the speaker, then pick what you hear",
    spoken: "Jupiter",
    spokenLang: "en-US",
    options: [
      { sticker: "jupiter", label: "Jupiter" },
      { sticker: "saturn", label: "Saturn" },
      { sticker: "mars", label: "Mars" },
    ],
    correctIndex: 0,
  },
  {
    type: "true-false",
    statement: "Uranus and Neptune are called the ice giants.",
    sticker: "uranus-tilt",
    answer: true,
    explanation: "Yes! They sit far from the Sun and are very, very cold.",
  },
  {
    type: "multiple-choice",
    question: "Which planet has the strongest winds in the Solar System?",
    sticker: "neptune-storm",
    options: ["Earth", "Jupiter", "Neptune", "Saturn"],
    correctIndex: 2,
    explanation: "Neptune! Its winds blow over 2,000 km/h with dark blue storms.",
  },
];

/* =================================================================
   LEVEL 6 — Hope Probe (UAE Mars Mission)
   Block A — Hope mission: learn-launch + learn-studies + tap-image + T/F + MCQ-when
   Block B — UAE space: learn-Hazza + learn-2117 + MCQ-Hazza + MCQ-2117
   Block D — vocab
   ================================================================= */
const lesson6: Exercise[] = [
  // === Block A: Hope mission launch + arrival ===
  {
    type: "learn",
    sticker: "hope-launch",
    headline: "In 2020, the UAE launched the Hope Probe to Mars.",
    headlineAr: "في عام ٢٠٢٠، أطلقت دولةُ الإمارات مسبارَ الأمل إلى المريخ",
    funFact: "It was the FIRST Arab mission to Mars!",
    hurr: "Mashallah! (Praise be!) The UAE made history.",
  },
  {
    type: "learn",
    sticker: "hope-orbit-mars",
    headline: "Hope reached Mars in February 2021 and began orbiting.",
    funFact: "It loops around Mars once every 55 hours.",
    hurr: "Patience pays off, 7 months of travel!",
  },
  {
    type: "tap-image",
    prompt: "Tap the Hope Probe",
    options: [
      { sticker: "rocket", label: "Rocket" },
      { sticker: "hope-probe", label: "Hope Probe" },
      { sticker: "asteroid", label: "Asteroid" },
    ],
    correctIndex: 1,
  },
  {
    type: "true-false",
    statement: "The Hope Probe studies the Sun.",
    sticker: "red-planet-closeup",
    answer: false,
    explanation: "Hope is studying Mars, its weather and atmosphere!",
  },
  {
    type: "multiple-choice",
    question: "When was the Hope Probe launched?",
    sticker: "hope-launch",
    options: ["2015", "2018", "2020", "2022"],
    correctIndex: 2,
    explanation: "Launched July 2020, reached Mars February 2021!",
  },

  // === Block B: what Hope sees and measures ===
  {
    type: "learn",
    sticker: "hope-camera",
    headline: "Hope's camera maps Mars' weather across the whole planet.",
    funFact: "It's the first probe to track Mars weather at every hour of the day.",
    hurr: "Like a weather station for a whole world!",
  },
  {
    type: "learn",
    sticker: "mars-atmosphere-data",
    headline: "Mars' air is mostly carbon dioxide, very thin and cold.",
    funFact: "Less than 1% as thick as Earth's air!",
    hurr: "That's why astronauts will need spacesuits there.",
  },
  {
    type: "multiple-choice",
    question: "What does the Hope Probe mostly study?",
    sticker: "hope-camera",
    options: ["Mars' moons", "Mars' weather and atmosphere", "Mars' rocks", "Mars' water"],
    correctIndex: 1,
    explanation: "Hope is the first full planet Mars weather satellite!",
  },

  // === Block C: the team and the country behind it ===
  {
    type: "learn",
    sticker: "hope-team",
    headline: "Hope was built by Emirati engineers, average age just 27.",
    funFact: "Many of them were women scientists and engineers!",
    hurr: "Young minds, huge mission.",
  },
  {
    type: "learn",
    sticker: "mbrsc-center",
    headline: "Mission control is at MBRSC in Dubai.",
    funFact: "MBRSC stands for the Mohammed bin Rashid Space Centre.",
    hurr: "The UAE space brain lives here.",
  },
  {
    type: "learn",
    sticker: "uae-50th-anniversary",
    headline: "Hope arrived at Mars during the UAE's 50th year.",
    funFact: "A golden gift to the country's Golden Jubilee!",
    hurr: "Hadiya min al-Imarat, a gift from the Emirates.",
  },

  // === Block D: heroes and the future ===
  {
    type: "learn",
    sticker: "uae-astronaut",
    headline: "Hazza Al Mansouri was the first Emirati astronaut, in 2019.",
    hurr: "An Emirati hero!",
  },
  {
    type: "learn",
    sticker: "astronaut-neyadi",
    headline: "Sultan Al Neyadi spent 6 months on the Space Station in 2023, and did the first Arab spacewalk.",
    hurr: "Battal! (Champion!)",
  },
  {
    type: "multiple-choice",
    question: "Who was the first Emirati astronaut?",
    sticker: "uae-astronaut",
    options: ["Ahmed Al Maktoum", "Salem Al Marri", "Hazza Al Mansouri", "Sultan Al Neyadi"],
    correctIndex: 2,
    explanation: "Hazza Al Mansouri made history in 2019!",
  },
  {
    type: "learn",
    sticker: "mars-2117",
    headline: "The UAE plans to help build a city on Mars by 2117.",
    funFact: "It's called the Mars 2117 Project!",
    hurr: "Maybe you'll go there one day, Inshallah!",
  },
  {
    type: "multiple-choice",
    question: "By what year does the UAE plan to build a city on Mars?",
    sticker: "mars-2117",
    options: ["2050", "2117", "2200", "2030"],
    correctIndex: 1,
    explanation: "The Mars 2117 Project: building a city on Mars by 2117!",
  },

  // === Block E: vocab ===
  {
    type: "match-pairs",
    prompt: "Match the words to Arabic",
    pairs: [
      { en: "Hope", ar: "الأمل" },
      { en: "Mars", ar: "المريخ" },
      { en: "Astronaut", ar: "رائد فضاء" },
      { en: "UAE", ar: "الإمارات" },
    ],
  },
  {
    type: "listen-pick",
    prompt: "Tap the speaker, then pick what you hear",
    spoken: "the hope probe",
    spokenLang: "en-US",
    options: [
      { sticker: "rocket", label: "rocket" },
      { sticker: "hope-probe", label: "the hope probe" },
      { sticker: "astronaut-neyadi", label: "astronaut" },
    ],
    correctIndex: 1,
  },
  {
    type: "multiple-choice",
    question: "When did the Hope Probe reach Mars?",
    sticker: "hope-orbit-mars",
    options: ["July 2020", "February 2021", "January 2023", "December 2019"],
    correctIndex: 1,
    explanation: "Hope reached Mars in February 2021, after 7 months of travel.",
  },
  {
    type: "true-false",
    statement: "The Hope Probe was built by Emirati engineers, with an average age of just 27.",
    sticker: "hope-team",
    answer: true,
    explanation: "Yes! And many of the team were women scientists and engineers.",
  },
];

export const lessons: Lesson[] = [
  { levelId: 1, exercises: lesson1 },
  { levelId: 2, exercises: lesson2 },
  { levelId: 3, exercises: lesson3 },
  { levelId: 4, exercises: lesson4 },
  { levelId: 5, exercises: lesson5 },
  { levelId: 6, exercises: lesson6 },
];

export function getLesson(levelId: number): Lesson | undefined {
  return lessons.find((l) => l.levelId === levelId);
}

/* === Subject-aware lesson lookup ==========================================
   `lessons` (above) is the SPACE subject's lessons — kept as a top-level
   export for backward compat. New code should call
   `getLessonForSubject(subjectId, levelId)`. */

import { heritageLessons } from "./lessons/heritage";
import type { SubjectId } from "./subjects";

export const lessonsBySubject: Record<SubjectId, Lesson[]> = {
  space: lessons,
  heritage: heritageLessons,
  nature: [],
};

export function getLessonForSubject(
  subjectId: SubjectId,
  levelId: number
): Lesson | undefined {
  return lessonsBySubject[subjectId]?.find((l) => l.levelId === levelId);
}

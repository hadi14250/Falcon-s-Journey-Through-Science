export interface LearningCard {
  title: string;
  body: string;
  funFact: string;
  illustration: string; // SVG identifier
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LevelBadge {
  id: string;
  name: string;
  nameAr: string;
  description: string;
}

export interface Level {
  id: number;
  title: string;
  titleAr: string;
  biome: "desert" | "oasis" | "sky" | "clouds" | "stratosphere" | "space";
  /** Optional override for the map node art. If absent, the node falls back
      to the biome-based sticker (which is space-themed). Heritage levels set
      this so the map shows the emirate's landmark instead of a planet. */
  nodeSticker?: string;
  introText: string;
  hurrIntroLine: string;
  /* Optional Arabic dialogue for the level intro screen. When
     present, the intro renders both EN + AR (matches the bilingual
     fun-fact pattern). May contain a `{userName}` placeholder that
     the level page substitutes at render time. */
  hurrIntroLineAr?: string;
  /* Optional per-level CTA copy that overrides the universal
     "Yalla! Let's start" / "يلا!" default. Useful when a topic-
     specific call to action reads better. */
  ctaText?: string;
  ctaTextAr?: string;
  cards: LearningCard[];
  quiz: QuizQuestion[];
  badge: LevelBadge;
  xpReward: number;
}

export const levels: Level[] = [
  {
    id: 1,
    title: "The Sun & Our Star",
    titleAr: "الشمس ونجمنا",
    biome: "desert",
    nodeSticker: "node-sun",
    introText:
      "Welcome, young explorer! Our journey begins right here in the warm desert sun. Let's learn about the biggest and brightest star in our sky!",
    hurrIntroLine:
      "Yalla! Look up at the sky. Do you see that big bright ball? That's the Sun! Let's find out why it's so special.",
    cards: [
      {
        title: "What is the Sun?",
        body: "The Sun is a star, the closest star to Earth! It is a giant ball of hot, glowing gas. It gives us light and warmth every single day.",
        funFact:
          "The Sun is so big that about 1.3 million Earths could fit inside it!",
        illustration: "sun-glow",
      },
      {
        title: "How Hot is the Sun?",
        body: "The surface of the Sun is about 5,500°C. That's hotter than anything on Earth! The inside is even hotter, about 15 million°C.",
        funFact:
          "If you could fly a plane to the Sun, it would take about 20 years to get there!",
        illustration: "sun-temperature",
      },
      {
        title: "Why Do We Need the Sun?",
        body: "Without the Sun, Earth would be dark and freezing cold. Plants need sunlight to grow, and animals need plants for food. We all depend on the Sun!",
        funFact:
          "The Sun's light takes about 8 minutes to travel all the way to Earth.",
        illustration: "sun-earth",
      },
    ],
    quiz: [
      {
        question: "What is the Sun?",
        options: ["A planet", "A star", "A moon", "A comet"],
        correctIndex: 1,
        explanation:
          "The Sun is a star, the nearest star to our planet Earth!",
      },
      {
        question: "How many Earths could fit inside the Sun?",
        options: ["100", "1,000", "1.3 million", "10"],
        correctIndex: 2,
        explanation:
          "About 1.3 million Earths could fit inside the Sun. That's how huge it is!",
      },
      {
        question: "What does the Sun give us?",
        options: [
          "Light and warmth",
          "Water and air",
          "Food and clothes",
          "Books and toys",
        ],
        correctIndex: 0,
        explanation:
          "The Sun gives us light and warmth, which all living things need to survive.",
      },
      {
        question: "How long does sunlight take to reach Earth?",
        options: ["1 second", "8 minutes", "1 hour", "1 day"],
        correctIndex: 1,
        explanation:
          "Light from the Sun takes about 8 minutes to travel to Earth.",
      },
      {
        question: "What would happen without the Sun?",
        options: [
          "Earth would be dark and cold",
          "Earth would stay the same",
          "Earth would become brighter",
          "Nothing would change",
        ],
        correctIndex: 0,
        explanation:
          "Without the Sun, Earth would be completely dark and freezing cold!",
      },
    ],
    badge: {
      id: "badge-level-1",
      name: "Sun Seeker",
      nameAr: "مستكشف الشمس",
      description: "You learned about our amazing star, the Sun!",
    },
    xpReward: 100,
  },
  {
    id: 2,
    title: "Earth & Moon",
    titleAr: "الأرض والقمر",
    biome: "oasis",
    nodeSticker: "node-earth-moon",
    introText:
      "Now we fly to our home planet and its beautiful companion. The Earth and Moon have a special friendship. Let's discover it!",
    hurrIntroLine:
      "Mashallah! Look at our beautiful Earth from up here! And see the Moon shining? They're best friends. Let me tell you why!",
    cards: [
      {
        title: "Our Home Planet",
        body: "Earth is the third planet from the Sun. It is the only planet we know that has life! Earth has water, air, and land: everything we need to live.",
        funFact:
          "About 71% of Earth's surface is covered by water. That's why it looks blue from space!",
        illustration: "earth",
      },
      {
        title: "Day and Night",
        body: "Earth spins like a top! When your side faces the Sun, it's daytime. When it turns away, it's nighttime. One full spin takes 24 hours, which is one day.",
        funFact:
          "In Abu Dhabi, the longest day of the year has about 14 hours of sunlight!",
        illustration: "day-night",
      },
      {
        title: "The Moon",
        body: "The Moon goes around Earth, just like Earth goes around the Sun. The Moon doesn't make its own light. It reflects the Sun's light like a mirror!",
        funFact:
          "The Moon is about 384,000 km away from Earth. Astronauts took 3 days to fly there!",
        illustration: "moon",
      },
      {
        title: "Moon Phases",
        body: "Have you noticed the Moon looks different each night? Sometimes it's full and round, sometimes it's a thin crescent. These are called moon phases, and they repeat every 29 days.",
        funFact:
          "The crescent moon is a special symbol in many Arab and Islamic cultures!",
        illustration: "moon-phases",
      },
    ],
    quiz: [
      {
        question: "Which planet is Earth from the Sun?",
        options: ["First", "Second", "Third", "Fourth"],
        correctIndex: 2,
        explanation: "Earth is the third planet from the Sun.",
      },
      {
        question: "Why do we have day and night?",
        options: [
          "The Sun turns on and off",
          "Earth spins on its axis",
          "The Moon blocks the Sun",
          "Clouds cover the Sun",
        ],
        correctIndex: 1,
        explanation:
          "Earth spins on its axis. When we face the Sun, it's day. When we face away, it's night.",
      },
      {
        question: "Does the Moon make its own light?",
        options: [
          "Yes, it glows",
          "No, it reflects the Sun's light",
          "Yes, it's electric",
          "No, it's always dark",
        ],
        correctIndex: 1,
        explanation:
          "The Moon doesn't make its own light. It reflects sunlight like a mirror!",
      },
      {
        question: "How long does one spin of Earth take?",
        options: ["12 hours", "24 hours", "7 days", "365 days"],
        correctIndex: 1,
        explanation:
          "Earth takes 24 hours, one full day, to complete one spin.",
      },
      {
        question: "What covers most of Earth's surface?",
        options: ["Sand", "Ice", "Water", "Trees"],
        correctIndex: 2,
        explanation:
          "About 71% of Earth is covered by water, which is why it looks blue from space!",
      },
    ],
    badge: {
      id: "badge-level-2",
      name: "Moon Walker",
      nameAr: "رائد القمر",
      description:
        "You explored Earth and Moon: day, night, and lunar phases!",
    },
    xpReward: 100,
  },
  {
    id: 3,
    title: "Inner Planets",
    titleAr: "الكواكب الداخلية",
    biome: "sky",
    nodeSticker: "node-inner-planets",
    introText:
      "We're leaving Earth behind and flying deeper into space! Let's meet the inner planets: Mercury, Venus, and Mars.",
    hurrIntroLine:
      "Hold on tight! We're flying past Earth now. There are three more planets close to the Sun. Ready to meet them? Yalla!",
    cards: [
      {
        title: "Mercury, The Speedy One",
        body: "Mercury is the closest planet to the Sun and the smallest planet. It zooms around the Sun faster than any other planet. That's why it's named after a fast messenger!",
        funFact:
          "A year on Mercury is only 88 Earth days. That means you'd have 4 birthdays every Earth year!",
        illustration: "mercury",
      },
      {
        title: "Venus, The Bright One",
        body: "Venus is the hottest planet, even hotter than Mercury! Thick clouds trap the heat inside. Venus is also the brightest planet in our night sky.",
        funFact:
          "Venus spins backwards compared to most planets! On Venus, the Sun rises in the west.",
        illustration: "venus",
      },
      {
        title: "Mars, The Red Planet",
        body: "Mars is called the Red Planet because its soil has iron rust, which makes it look reddish. Mars has the biggest volcano in the whole solar system: Olympus Mons!",
        funFact:
          "The UAE's Hope Probe is orbiting Mars right now, studying its weather and atmosphere!",
        illustration: "mars",
      },
      {
        title: "Rocky Worlds",
        body: "Mercury, Venus, Earth, and Mars are called 'rocky planets' or 'inner planets.' They all have solid, hard surfaces you could stand on, unlike the giant gas planets farther away.",
        funFact:
          "Earth is the biggest of the four rocky planets. Mars is about half the size of Earth!",
        illustration: "rocky-planets",
      },
    ],
    quiz: [
      {
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Earth", "Mercury", "Mars"],
        correctIndex: 2,
        explanation: "Mercury is the closest planet to the Sun.",
      },
      {
        question: "Which planet is the hottest?",
        options: ["Mercury", "Venus", "Mars", "Earth"],
        correctIndex: 1,
        explanation:
          "Venus is the hottest planet because its thick clouds trap all the heat!",
      },
      {
        question: "Why is Mars called the Red Planet?",
        options: [
          "It's on fire",
          "It has red clouds",
          "Its soil has iron rust",
          "It's painted red",
        ],
        correctIndex: 2,
        explanation:
          "Mars looks red because its soil contains iron rust (iron oxide).",
      },
      {
        question: "What kind of planets are Mercury, Venus, Earth, and Mars?",
        options: [
          "Gas planets",
          "Ice planets",
          "Rocky planets",
          "Water planets",
        ],
        correctIndex: 2,
        explanation:
          "They are rocky planets with solid surfaces you could stand on!",
      },
      {
        question: "Which country sent the Hope Probe to Mars?",
        options: ["USA", "China", "UAE", "Japan"],
        correctIndex: 2,
        explanation:
          "The UAE sent the Hope Probe (مسبار الأمل) to Mars in 2020!",
      },
    ],
    badge: {
      id: "badge-level-3",
      name: "Planet Explorer",
      nameAr: "مستكشف الكواكب",
      description:
        "You discovered Mercury, Venus, and Mars: the inner planets!",
    },
    xpReward: 100,
  },
  {
    id: 4,
    title: "The Asteroid Belt",
    titleAr: "حزام الكويكبات",
    biome: "clouds",
    nodeSticker: "node-asteroid-belt",
    introText:
      "Between Mars and Jupiter lies a ring of rocky space objects. Let's fly through the Asteroid Belt!",
    hurrIntroLine:
      "Watch out for space rocks! We're entering the Asteroid Belt. Don't worry, I'll guide us through safely. Yalla!",
    cards: [
      {
        title: "What Are Asteroids?",
        body: "Asteroids are chunks of rock and metal that orbit the Sun. They are leftovers from when the solar system was formed, over 4.5 billion years ago!",
        funFact:
          "The biggest asteroid, Ceres, is so large that scientists also call it a 'dwarf planet!'",
        illustration: "asteroids",
      },
      {
        title: "The Asteroid Belt",
        body: "Most asteroids in our solar system live in the Asteroid Belt, a wide ring between Mars and Jupiter. There are millions of asteroids there, but they are spread far apart.",
        funFact:
          "Even though there are millions of asteroids, spacecraft can fly through the belt safely because the rocks are so far apart!",
        illustration: "asteroid-belt",
      },
      {
        title: "Asteroid Shapes and Sizes",
        body: "Asteroids come in all shapes and sizes. Some are as small as a pebble, while others are hundreds of kilometers wide. Most have lumpy, irregular shapes. They're not round like planets.",
        funFact:
          "Some asteroids have their own tiny moons orbiting around them!",
        illustration: "asteroid-shapes",
      },
    ],
    quiz: [
      {
        question: "What are asteroids made of?",
        options: [
          "Gas and clouds",
          "Rock and metal",
          "Water and ice",
          "Sand and dust only",
        ],
        correctIndex: 1,
        explanation: "Asteroids are chunks of rock and metal from space.",
      },
      {
        question: "Where is the Asteroid Belt?",
        options: [
          "Between Earth and Mars",
          "Between Mars and Jupiter",
          "Beyond Neptune",
          "Inside the Sun",
        ],
        correctIndex: 1,
        explanation:
          "The Asteroid Belt sits between Mars and Jupiter.",
      },
      {
        question: "What is the biggest asteroid called?",
        options: ["Luna", "Ceres", "Pluto", "Halley"],
        correctIndex: 1,
        explanation:
          "Ceres is the biggest asteroid, so big it's also called a dwarf planet!",
      },
      {
        question: "Can spacecraft fly through the Asteroid Belt safely?",
        options: [
          "No, it's too crowded",
          "Yes, the rocks are far apart",
          "No, the asteroids attack",
          "Yes, asteroids are tiny bubbles",
        ],
        correctIndex: 1,
        explanation:
          "Even though there are millions of asteroids, they're spread very far apart, so spacecraft can fly through safely!",
      },
      {
        question: "When were asteroids formed?",
        options: [
          "Last year",
          "1,000 years ago",
          "Over 4.5 billion years ago",
          "100 years ago",
        ],
        correctIndex: 2,
        explanation:
          "Asteroids are ancient. They formed over 4.5 billion years ago when the solar system was born!",
      },
    ],
    badge: {
      id: "badge-level-4",
      name: "Asteroid Dodger",
      nameAr: "بطلُ الكويكبات",
      description: "You navigated the rocky Asteroid Belt!",
    },
    xpReward: 100,
  },
  {
    id: 5,
    title: "Outer Planets",
    titleAr: "الكواكب الخارجية",
    biome: "stratosphere",
    nodeSticker: "node-outer-planets",
    introText:
      "We've passed the Asteroid Belt. Now we meet the giant planets: Jupiter, Saturn, Uranus, and Neptune. These are the biggest planets in our solar system!",
    hurrIntroLine:
      "Mashallah, look how big these planets are! They're called gas giants because they're made mostly of gas. Let's explore them!",
    cards: [
      {
        title: "Jupiter, The Giant King",
        body: "Jupiter is the biggest planet in our solar system. It's so big that all the other planets could fit inside it! Jupiter has a famous storm called the Great Red Spot.",
        funFact:
          "Jupiter's Great Red Spot is a storm that has been raging for over 300 years! It's bigger than Earth.",
        illustration: "jupiter",
      },
      {
        title: "Saturn, The Ringed Beauty",
        body: "Saturn is famous for its beautiful rings. These rings are made of billions of pieces of ice and rock. Saturn is the second largest planet.",
        funFact:
          "Saturn is so light that if you could find a bathtub big enough, it would float in water!",
        illustration: "saturn",
      },
      {
        title: "Uranus & Neptune, The Ice Giants",
        body: "Uranus and Neptune are very far from the Sun. They are called 'ice giants' because they have icy materials deep inside. Uranus is tilted on its side, and Neptune has the fastest winds in the solar system!",
        funFact:
          "Neptune's winds can blow at over 2,000 km/h. That's faster than the speed of sound!",
        illustration: "ice-giants",
      },
      {
        title: "Gas vs. Rocky Planets",
        body: "The outer planets are very different from rocky inner planets. They don't have solid ground. They're mostly made of gas and liquid. You couldn't walk on them!",
        funFact:
          "Jupiter has at least 95 moons! That's more than any other planet.",
        illustration: "gas-vs-rocky",
      },
    ],
    quiz: [
      {
        question: "Which is the biggest planet in our solar system?",
        options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
        correctIndex: 1,
        explanation:
          "Jupiter is the largest planet. All other planets could fit inside it!",
      },
      {
        question: "What are Saturn's rings made of?",
        options: [
          "Fire and lava",
          "Clouds and rain",
          "Ice and rock",
          "Gold and silver",
        ],
        correctIndex: 2,
        explanation:
          "Saturn's rings are made of billions of pieces of ice and rock.",
      },
      {
        question: "Which planet is tilted on its side?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
        correctIndex: 2,
        explanation:
          "Uranus is unique because it rotates on its side!",
      },
      {
        question: "Which planet has the fastest winds?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
        correctIndex: 3,
        explanation:
          "Neptune has winds over 2,000 km/h, the fastest in our solar system!",
      },
      {
        question: "Could you walk on Jupiter?",
        options: [
          "Yes, it has solid ground",
          "No, it's made mostly of gas",
          "Yes, it has ice",
          "No, it's too small",
        ],
        correctIndex: 1,
        explanation:
          "Jupiter is a gas giant. There's no solid surface to walk on!",
      },
    ],
    badge: {
      id: "badge-level-5",
      name: "Gas Giant Guide",
      nameAr: "سيد العمالقة",
      description:
        "You met the giant outer planets of our solar system!",
    },
    xpReward: 100,
  },
  {
    id: 6,
    title: "The Hope Probe",
    titleAr: "مسبار الأمل",
    biome: "space",
    nodeSticker: "node-hope-probe",
    introText:
      "Our final mission is special. It's about the UAE's very own Hope Probe! The UAE made history by sending a spacecraft to Mars. Let's celebrate this amazing achievement!",
    hurrIntroLine:
      "This is it, our greatest adventure! The UAE sent a spacecraft to Mars! As an Emirati falcon, I'm so proud. Yalla, let's learn about the Hope Probe!",
    cards: [
      {
        title: "The Hope Mission",
        body: "In July 2020, the UAE launched the Hope Probe (مسبار الأمل) from Japan. It was the first Arab mission to Mars! The probe reached Mars in February 2021.",
        funFact:
          "The Hope Probe was built by a team of Emirati engineers with an average age of just 27 years old!",
        illustration: "hope-probe",
      },
      {
        title: "What Does Hope Study?",
        body: "The Hope Probe orbits Mars and studies its weather and atmosphere. It takes pictures and collects data to help scientists understand why Mars lost most of its air and water long ago.",
        funFact:
          "Hope takes a complete picture of Mars' weather every 9 days, like a weather report for the whole planet!",
        illustration: "hope-mars",
      },
      {
        title: "UAE Space Heroes",
        body: "The Mohammed bin Rashid Space Centre in Dubai leads the UAE's space missions. In 2019, Hazza Al Mansouri became the first Emirati astronaut to go to space! He spent 8 days on the International Space Station.",
        funFact:
          "Hazza Al Mansouri took dates and traditional Emirati food with him to the Space Station!",
        illustration: "uae-astronaut",
      },
      {
        title: "Why Space Matters",
        body: "The UAE's space program shows that big dreams can come true. The country went from having no space program to reaching Mars in less than 50 years! The mission's name, 'Hope,' sends a message of inspiration to the world.",
        funFact:
          "The UAE plans to build a city on Mars by 2117, called the Mars 2117 Project!",
        illustration: "mars-city",
      },
    ],
    quiz: [
      {
        question: "When was the Hope Probe launched?",
        options: ["2015", "2018", "2020", "2022"],
        correctIndex: 2,
        explanation:
          "The Hope Probe was launched in July 2020 and reached Mars in February 2021.",
      },
      {
        question: "What does the Hope Probe study on Mars?",
        options: [
          "Rocks and volcanoes",
          "Weather and atmosphere",
          "Water and oceans",
          "Plants and animals",
        ],
        correctIndex: 1,
        explanation:
          "The Hope Probe studies Mars' weather and atmosphere to understand the planet better.",
      },
      {
        question: "Who was the first Emirati astronaut?",
        options: [
          "Ahmed Al Maktoum",
          "Salem Al Marri",
          "Hazza Al Mansouri",
          "Sultan Al Neyadi",
        ],
        correctIndex: 2,
        explanation:
          "Hazza Al Mansouri was the first Emirati to go to space in September 2019!",
      },
      {
        question: "Where is the Mohammed bin Rashid Space Centre?",
        options: ["Abu Dhabi", "Sharjah", "Dubai", "Al Ain"],
        correctIndex: 2,
        explanation:
          "The Mohammed bin Rashid Space Centre is located in Dubai.",
      },
      {
        question: "What is the UAE's Mars 2117 Project?",
        options: [
          "A plan to build a city on Mars",
          "A movie about Mars",
          "A new school program",
          "A Mars themed park",
        ],
        correctIndex: 0,
        explanation:
          "The Mars 2117 Project is the UAE's ambitious plan to build a human settlement on Mars by the year 2117!",
      },
    ],
    badge: {
      id: "badge-level-6",
      name: "Hope Pioneer",
      nameAr: "رائد الأمل",
      description:
        "You completed the Hope Probe mission, just like the UAE reached Mars!",
    },
    xpReward: 100,
  },
];

/* === Subject-aware level lookup ===========================================
   `levels` (above) is the SPACE subject's levels — kept as a top-level
   export for backward compat with old call sites. New code should call
   `getLevelsForSubject(subjectId)` so each subject's map renders its own
   curriculum. */

import { heritageLevels } from "./levels/heritage";
import type { SubjectId } from "./subjects";

export const levelsBySubject: Record<SubjectId, Level[]> = {
  space: levels,
  heritage: heritageLevels,
  nature: [], // placeholder until the Nature subject is built
};

export function getLevelsForSubject(subjectId: SubjectId): Level[] {
  return levelsBySubject[subjectId] ?? [];
}

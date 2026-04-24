/* === UAE Heritage subject — lesson content for the 7 emirates ============
   Each level = one emirate. 13 steps per level (matching the Space subject's
   pacing). Structure intentionally interleaves so a question never sits
   immediately after the fact it tests:

     Block A — identity (3 cards): two learn cards introducing the emirate,
       then a TF that probes one of those facts after a small delay.
     Block B — landmark spotlight (3 cards): learn the landmark, MCQ that
       quizzes a DIFFERENT detail than the learn card, then a tap-image.
     Block C — geography / culture (3 cards): another learn card, a TF on
       a different topic, then a UAE-flavored bonus learn.
     Block D — vocab + recap (4 cards): match-pairs, listen-pick, a recap
       learn card, and a final TF that ties it together.

   Stickers all already exist in src/components/lesson/Sticker.tsx — each
   emirate uses its own signature stickers (al-noor-mosque, ajman-fort,
   etc.) and reuses signatures across multiple references within a level.
   A future batch will draw additional per-step stickers for full uniqueness. */

import type { Lesson } from "../lessons";

/* ============================================================
   LEVEL 1 — Abu Dhabi
   ============================================================ */
const heritageLesson1 = [
  // === Block A: identity ===
  {
    type: "learn" as const,
    sticker: "abu-dhabi-skyline" as const,
    headline: "Abu Dhabi is the capital of the UAE.",
    headlineAr: "أبوظبي هي عاصمة دولة الإمارات",
    hurr: "Welcome to the heart of our country!",
  },
  {
    type: "learn" as const,
    sticker: "gazelle" as const,
    headline: "Abu Dhabi is the largest emirate, and its name means 'Father of the Gazelle' in Arabic.",
  },
  {
    type: "true-false" as const,
    statement: "Abu Dhabi is the capital of the UAE.",
    statementAr: "أبوظبي هي عاصمة الإمارات.",
    sticker: "abu-dhabi-map" as const,
    answer: true,
    explanation: "Yes! Abu Dhabi is the capital and the largest emirate.",
  },

  // === Block B: Sheikh Zayed Grand Mosque ===
  {
    type: "learn" as const,
    sticker: "sheikh-zayed-mosque" as const,
    headline: "The Sheikh Zayed Grand Mosque has 82 white marble domes and can fit more than 40,000 people inside.",
    hurr: "It is one of the most beautiful mosques in the world.",
  },
  {
    type: "tap-image" as const,
    prompt: "Tap the Sheikh Zayed Grand Mosque",
    promptAr: "اضغط على جامع الشيخ زايد الكبير",
    options: [
      { sticker: "burj-khalifa" as const, label: "Burj Khalifa" },
      { sticker: "sheikh-zayed-mosque" as const, label: "Sheikh Zayed Grand Mosque" },
      { sticker: "burj-al-arab" as const, label: "Burj Al Arab" },
    ],
    correctIndex: 1,
  },
  {
    type: "multiple-choice" as const,
    question: "How many people can the Sheikh Zayed Grand Mosque fit inside?",
    sticker: "mosque-arch" as const,
    options: ["100", "1,000", "More than 40,000", "1 million"],
    correctIndex: 2,
    explanation: "More than 40,000 people can pray inside it at the same time!",
  },

  // === Block C: Louvre + Liwa + Mosque domes ===
  {
    type: "learn" as const,
    sticker: "louvre-abu-dhabi" as const,
    headline: "The Louvre Abu Dhabi has a giant dome that makes a 'rain of light'.",
    funFact: "Sunlight passes through 7,850 stars on the dome to fall like raindrops inside.",
  },
  {
    type: "true-false" as const,
    statement: "The Sheikh Zayed Grand Mosque has 82 domes.",
    sticker: "mosque-domes-closeup" as const,
    answer: true,
    explanation: "Yes! 82 beautiful white marble domes.",
  },
  {
    type: "learn" as const,
    sticker: "liwa-oasis" as const,
    headline: "The Liwa Oasis is on the edge of the Empty Quarter, the largest sand desert in the world.",
    hurr: "The Tal Moreeb dune is almost as tall as the Eiffel Tower!",
  },

  // === Block D: vocab + recap ===
  {
    type: "match-pairs" as const,
    prompt: "Match the words to Arabic",
    pairs: [
      { en: "Mosque", ar: "مسجد" },
      { en: "Capital", ar: "عاصمة" },
      { en: "Desert", ar: "صحراء" },
      { en: "Oasis", ar: "واحة" },
    ],
  },
  {
    type: "listen-pick" as const,
    prompt: "Tap the speaker, then pick what you hear",
    spoken: "the mosque",
    spokenLang: "en-US" as const,
    options: [
      { sticker: "mosque-night" as const, label: "the mosque" },
      { sticker: "gazelle" as const, label: "the gazelle" },
      { sticker: "dallah" as const, label: "the coffee pot" },
    ],
    correctIndex: 0,
  },
  {
    type: "learn" as const,
    sticker: "sheikh-zayed-portrait" as const,
    headline: "Sheikh Zayed bin Sultan Al Nahyan was the founding father of the UAE.",
    funFact: "The Grand Mosque is named after him.",
  },
  {
    type: "true-false" as const,
    statement: "Sheikh Zayed was the founding father of the UAE.",
    sticker: "uae-flag" as const,
    answer: true,
    explanation: "Yes! Sheikh Zayed bin Sultan Al Nahyan founded the UAE in 1971.",
  },
  {
    type: "multiple-choice" as const,
    question: "What does the name 'Abu Dhabi' mean?",
    sticker: "gazelle" as const,
    options: ["Father of the Gazelle", "City of Gold", "Land of Sand", "Top of the Tent"],
    correctIndex: 0,
    explanation: "'Abu Dhabi' means 'Father of the Gazelle' in Arabic.",
  },
];

/* ============================================================
   LEVEL 2 — Dubai
   ============================================================ */
const heritageLesson2 = [
  // === Block A: identity ===
  {
    type: "learn" as const,
    sticker: "burj-khalifa" as const,
    headline: "Dubai is home to the Burj Khalifa, the tallest building in the world.",
    headlineAr: "دبي فيها برج خليفة، أطول مبنى في العالم",
    hurr: "Yalla, let's look up!",
  },
  {
    type: "learn" as const,
    sticker: "dubai-creek" as const,
    headline: "Old Dubai started as a fishing and pearl diving village along Dubai Creek.",
    funFact: "Wooden dhow boats still sail on the creek today, just like 100 years ago!",
  },
  {
    type: "true-false" as const,
    statement: "Dubai has the tallest building in the world.",
    sticker: "dubai-skyline" as const,
    answer: true,
    explanation: "Yes! The Burj Khalifa is the tallest, at 828 meters.",
  },

  // === Block B: Burj Khalifa ===
  {
    type: "learn" as const,
    sticker: "burj-khalifa" as const,
    headline: "The Burj Khalifa is 828 meters tall, more than twice the height of the Eiffel Tower.",
    funFact: "From the top, you can watch the sunset, take an elevator down, and see it again from the bottom!",
  },
  {
    type: "tap-image" as const,
    prompt: "Tap the Burj Khalifa",
    promptAr: "اضغط على برج خليفة",
    options: [
      { sticker: "sheikh-zayed-mosque" as const, label: "Mosque" },
      { sticker: "burj-al-arab" as const, label: "Burj Al Arab" },
      { sticker: "burj-khalifa" as const, label: "Burj Khalifa" },
    ],
    correctIndex: 2,
  },
  {
    type: "multiple-choice" as const,
    question: "How tall is the Burj Khalifa?",
    sticker: "burj-khalifa" as const,
    options: ["100 meters", "300 meters", "828 meters", "2,000 meters"],
    correctIndex: 2,
    explanation: "The Burj Khalifa stands 828 meters tall, the tallest in the world!",
  },

  // === Block C: Burj Al Arab + Palm + history ===
  {
    type: "learn" as const,
    sticker: "burj-al-arab" as const,
    headline: "The Burj Al Arab is shaped like the white sail of a dhow boat.",
    hurr: "It stands on its own little island in the sea.",
  },
  {
    type: "true-false" as const,
    statement: "Old Dubai people fished and dove for pearls in Dubai Creek.",
    sticker: "pearl-diver" as const,
    answer: true,
    explanation: "Yes! Fishing and pearl diving were the main jobs of old Dubai.",
  },
  {
    type: "learn" as const,
    sticker: "palm-jumeirah" as const,
    headline: "Palm Jumeirah is a man made island shaped like a palm tree.",
    hurr: "Engineers built it from sand and rock from the sea!",
  },

  // === Block D: vocab + recap ===
  {
    type: "match-pairs" as const,
    prompt: "Match the words to Arabic",
    pairs: [
      { en: "Skyscraper", ar: "ناطحة سحاب" },
      { en: "Boat", ar: "قارب" },
      { en: "Pearl", ar: "لؤلؤة" },
      { en: "Souq", ar: "سوق" },
    ],
  },
  {
    type: "listen-pick" as const,
    prompt: "Tap the speaker, then pick what you hear",
    spoken: "the creek",
    spokenLang: "en-US" as const,
    options: [
      { sticker: "gold-souq" as const, label: "the souq" },
      { sticker: "dubai-creek" as const, label: "the creek" },
      { sticker: "dubai-frame" as const, label: "the frame" },
    ],
    correctIndex: 1,
  },
  {
    type: "learn" as const,
    sticker: "dubai-frame" as const,
    headline: "The Dubai Frame is the world's largest picture frame, 150 metres tall, and lets you see old AND new Dubai at once.",
  },
  {
    type: "true-false" as const,
    statement: "Palm Jumeirah is a natural island, not made by people.",
    sticker: "palm-jumeirah" as const,
    answer: false,
    explanation: "False! Palm Jumeirah was built by people from sand and rocks. (Bonus: Hatta in the mountains has a real natural looking dam too!)",
  },
  {
    type: "true-false" as const,
    statement: "The Burj Al Arab is shaped like the white sail of a dhow boat.",
    sticker: "burj-al-arab" as const,
    answer: true,
    explanation: "Yes! Its sail shape stands on its own little island in the sea.",
  },
  {
    type: "true-false" as const,
    statement: "The Dubai Frame is the world's largest picture frame.",
    sticker: "dubai-frame" as const,
    answer: true,
    explanation: "Yes! It's 150 metres tall and lets you see old AND new Dubai at once.",
  },
];

/* ============================================================
   LEVEL 3 — Sharjah
   ============================================================ */
const heritageLesson3 = [
  // === Block A: identity ===
  {
    type: "learn" as const,
    sticker: "sharjah-book" as const,
    headline: "Sharjah is the cultural capital of the Arab world.",
    headlineAr: "الشارقة هي عاصمة الثقافة في العالم العربي",
    hurr: "Books, museums, and stories, that's Sharjah!",
  },
  {
    type: "learn" as const,
    sticker: "sharjah-map" as const,
    headline: "Sharjah is the only emirate that touches BOTH the Arabian Gulf AND the Gulf of Oman.",
    funFact: "It has coasts on two different seas!",
  },
  {
    type: "true-false" as const,
    statement: "Sharjah is the cultural capital of the Arab world.",
    sticker: "sharjah-book" as const,
    answer: true,
    explanation: "Yes! Sharjah was named the cultural capital by UNESCO.",
  },

  // === Block B: Al Noor Mosque ===
  {
    type: "learn" as const,
    sticker: "al-noor-mosque" as const,
    headline: "Al Noor Mosque sits on Khalid Lagoon, shines white at night, and has two tall Turkish style minarets.",
  },
  {
    type: "tap-image" as const,
    prompt: "Tap the Al Noor Mosque",
    promptAr: "اضغط على مسجد النور",
    options: [
      { sticker: "al-noor-mosque" as const, label: "Al Noor Mosque" },
      { sticker: "burj-khalifa" as const, label: "Burj Khalifa" },
      { sticker: "dhow-boat" as const, label: "Dhow boat" },
    ],
    correctIndex: 0,
  },
  {
    type: "multiple-choice" as const,
    question: "How many seas does Sharjah touch?",
    sticker: "sharjah-map" as const,
    options: ["None", "One", "Two", "Three"],
    correctIndex: 2,
    explanation: "Sharjah touches two seas: the Arabian Gulf and the Gulf of Oman.",
  },

  // === Block C: Mleiha + Khor Fakkan ===
  {
    type: "learn" as const,
    sticker: "mleiha-tools" as const,
    headline: "Scientists found 130,000 year old stone tools in Sharjah, way older than the pyramids of Egypt.",
  },
  {
    type: "learn" as const,
    sticker: "hajar-mountains" as const,
    headline: "Khor Fakkan is a beach town in Sharjah, tucked between the Hajar Mountains and the Gulf of Oman.",
    hurr: "Mountains on one side, sea on the other.",
  },
  {
    type: "true-false" as const,
    statement: "Khor Fakkan is on the desert with no sea.",
    sticker: "khor-fakkan-beach" as const,
    answer: false,
    explanation: "False! Khor Fakkan is a beach town on the Gulf of Oman.",
  },
  {
    type: "learn" as const,
    sticker: "sharjah-museum" as const,
    headline: "The Sharjah Museum of Islamic Civilization shows how Muslim scientists invented things like algebra.",
    hurr: "Math has Arab roots, mashallah!",
  },

  // === Block D: vocab + recap ===
  {
    type: "match-pairs" as const,
    prompt: "Match the words to Arabic",
    pairs: [
      { en: "Culture", ar: "ثقافة" },
      { en: "Museum", ar: "متحف" },
      { en: "Heritage", ar: "تراث" },
      { en: "Mountain", ar: "جبل" },
    ],
  },
  {
    type: "listen-pick" as const,
    prompt: "Tap the speaker, then pick what you hear",
    spoken: "the museum",
    spokenLang: "en-US" as const,
    options: [
      { sticker: "sharjah-museum" as const, label: "the museum" },
      { sticker: "khor-fakkan-amphitheater" as const, label: "the theater" },
      { sticker: "cultural-square" as const, label: "the square" },
    ],
    correctIndex: 0,
  },
  {
    type: "true-false" as const,
    statement: "Stone tools found in Sharjah are older than the pyramids of Egypt.",
    sticker: "mleiha-tools" as const,
    answer: true,
    explanation: "Yes! 130,000 year old tools, way older than the pyramids.",
  },
  {
    type: "true-false" as const,
    statement: "Al Noor Mosque has two tall minarets in a Turkish style.",
    sticker: "al-noor-mosque" as const,
    answer: true,
    explanation: "Yes! It sits on Khalid Lagoon and shines white at night.",
  },
  {
    type: "multiple-choice" as const,
    question: "Which math idea was invented by Muslim scientists?",
    sticker: "sharjah-museum" as const,
    options: ["Counting", "Algebra", "Adding", "Drawing shapes"],
    correctIndex: 1,
    explanation: "Algebra has Arab roots, mashallah!",
  },
];

/* ============================================================
   LEVEL 4 — Ajman
   ============================================================ */
const heritageLesson4 = [
  // === Block A: identity ===
  {
    type: "learn" as const,
    sticker: "ajman-map" as const,
    headline: "Ajman is the smallest of the seven emirates.",
    headlineAr: "عجمان هي أصغر إمارات الدولة",
    hurr: "Tiny but full of treasure!",
  },
  {
    type: "learn" as const,
    sticker: "dhow-yard" as const,
    headline: "Ajman has the world's biggest dhow boat shipyard.",
    funFact: "Workers build wooden boats by hand using methods over 1,000 years old.",
  },
  {
    type: "true-false" as const,
    statement: "Ajman is the largest emirate.",
    sticker: "ajman-skyline" as const,
    answer: false,
    explanation: "No, Ajman is the smallest. Abu Dhabi is the largest!",
  },

  // === Block B: Ajman Fort ===
  {
    type: "learn" as const,
    sticker: "ajman-fort" as const,
    headline: "The Ajman Museum is inside an old fort built in the 1700s.",
    hurr: "It used to protect the ruler of Ajman.",
  },
  {
    type: "tap-image" as const,
    prompt: "Tap the Ajman Fort",
    promptAr: "اضغط على حصن عجمان",
    options: [
      { sticker: "burj-khalifa" as const, label: "Tower" },
      { sticker: "ajman-fort" as const, label: "Ajman Fort" },
      { sticker: "ghaf-tree" as const, label: "Tree" },
    ],
    correctIndex: 1,
  },
  {
    type: "multiple-choice" as const,
    question: "What is Ajman famous for building?",
    sticker: "dhow-yard" as const,
    options: ["Cars", "Dhow boats", "Airplanes", "Trains"],
    correctIndex: 1,
    explanation: "Ajman has the world's biggest yard for building wooden dhow boats.",
  },

  // === Block C: Mangroves + flamingos + corniche ===
  {
    type: "learn" as const,
    sticker: "mangrove-trees" as const,
    headline: "Al Zorah Nature Reserve has mangrove forests where pink flamingos come to feed.",
    funFact: "Mangroves are special trees that grow in salty water!",
  },
  {
    type: "true-false" as const,
    statement: "The Ajman Museum is built inside an old fort.",
    sticker: "coral-stone-wall" as const,
    answer: true,
    explanation: "Yes! Built in the 1700s with coral stone blocks like this one.",
  },
  {
    type: "learn" as const,
    sticker: "ajman-corniche" as const,
    headline: "Ajman has 16 km of soft white sandy beaches along the Arabian Gulf.",
    funFact: "Perfect for swimming and family picnics!",
  },

  // === Block D: vocab + recap ===
  {
    type: "match-pairs" as const,
    prompt: "Match the words to Arabic",
    pairs: [
      { en: "Fort", ar: "حصن" },
      { en: "Mangrove", ar: "قرم" },
      { en: "Boat", ar: "قارب" },
      { en: "Tribe", ar: "قبيلة" },
    ],
  },
  {
    type: "listen-pick" as const,
    prompt: "Tap the speaker, then pick what you hear",
    spoken: "the flamingo",
    spokenLang: "en-US" as const,
    options: [
      { sticker: "ajman-fort" as const, label: "the fort" },
      { sticker: "fisherman-net" as const, label: "the fisherman" },
      { sticker: "flamingo" as const, label: "the flamingo" },
    ],
    correctIndex: 2,
  },
  {
    type: "learn" as const,
    sticker: "mowaihat-tomb" as const,
    headline: "At Mowaihat in Ajman, scientists found a 4,000 year old Bronze Age tomb full of pottery and copper tools.",
    funFact: "It tells us people lived here long before the UAE existed!",
  },
  {
    type: "true-false" as const,
    statement: "Pink flamingos live in Ajman's mangrove reserve.",
    sticker: "flamingo" as const,
    answer: true,
    explanation: "Yes! Al Zorah is full of pink flamingos and other birds.",
  },
  {
    type: "true-false" as const,
    statement: "Ajman has 16 km of soft white sandy beaches along the Arabian Gulf.",
    sticker: "ajman-corniche" as const,
    answer: true,
    explanation: "Yes! Perfect for swimming and family picnics.",
  },
  {
    type: "multiple-choice" as const,
    question: "How old is the Bronze Age tomb found at Mowaihat in Ajman?",
    sticker: "mowaihat-tomb" as const,
    options: ["100 years", "1,000 years", "About 4,000 years", "10 years"],
    correctIndex: 2,
    explanation: "About 4,000 years old, full of pottery and copper tools!",
  },
];

/* ============================================================
   LEVEL 5 — Umm Al Quwain
   ============================================================ */
const heritageLesson5 = [
  // === Block A: identity ===
  {
    type: "learn" as const,
    sticker: "uaq-map" as const,
    headline: "Umm Al Quwain means 'Mother of Two Powers' in Arabic.",
    headlineAr: "أم القيوين تعني 'أم القوّتين'",
    hurr: "Its people were strong on both land AND sea.",
  },
  {
    type: "learn" as const,
    sticker: "lagoon-mangrove" as const,
    headline: "People in Umm Al Quwain have lived from the sea for thousands of years, with pearl diving and fishing as their main jobs.",
  },
  {
    type: "true-false" as const,
    statement: "Umm Al Quwain people were strong on both land and sea.",
    sticker: "uaq-skyline" as const,
    answer: true,
    explanation: "Yes! That's exactly what the name 'Mother of Two Powers' means.",
  },

  // === Block B: UAQ Fort ===
  {
    type: "learn" as const,
    sticker: "uaq-fort" as const,
    headline: "Umm Al Quwain Fort was built in 1768 to guard the old city.",
    hurr: "Forts kept the people safe long ago.",
  },
  {
    type: "tap-image" as const,
    prompt: "Tap the Umm Al Quwain Fort",
    promptAr: "اضغط على حصن أم القيوين",
    options: [
      { sticker: "cormorant" as const, label: "Cormorant" },
      { sticker: "uaq-fort" as const, label: "Fort" },
      { sticker: "dhow-boat" as const, label: "Boat" },
    ],
    correctIndex: 1,
  },
  {
    type: "multiple-choice" as const,
    question: "What does 'Umm Al Quwain' mean?",
    sticker: "uaq-map" as const,
    options: [
      "Father of the Gazelle",
      "Mother of Two Powers",
      "Top of the Tent",
      "City of Gold",
    ],
    correctIndex: 1,
    explanation: "It means 'Mother of Two Powers', the people were strong on land and sea.",
  },

  // === Block C: Cormorants + Ed Dur ===
  {
    type: "learn" as const,
    sticker: "al-sinniyah-island" as const,
    headline: "Al Sinniyah Island has the UAE's biggest colony of Socotra cormorants, with over 15,000 pairs nesting there.",
  },
  {
    type: "true-false" as const,
    statement: "Umm Al Quwain Fort was built in modern times.",
    sticker: "ed-dur-ruins" as const,
    answer: false,
    explanation: "False! It was built in 1768, over 250 years ago.",
  },
  {
    type: "learn" as const,
    sticker: "roman-trade" as const,
    headline: "The ancient town of Ed Dur traded with the Roman Empire 2,000 years ago.",
    funFact: "Ancient Romans bought UAE pearls and frankincense!",
  },

  // === Block D: vocab + recap ===
  {
    type: "match-pairs" as const,
    prompt: "Match the words to Arabic",
    pairs: [
      { en: "Lagoon", ar: "بحيرة" },
      { en: "Falaj", ar: "فلج" },
      { en: "Island", ar: "جزيرة" },
      { en: "Pearl", ar: "لؤلؤة" },
    ],
  },
  {
    type: "listen-pick" as const,
    prompt: "Tap the speaker, then pick what you hear",
    spoken: "the pearl",
    spokenLang: "en-US" as const,
    options: [
      { sticker: "falaj" as const, label: "the falaj" },
      { sticker: "seabird-flock" as const, label: "the bird" },
      { sticker: "pearl-oyster" as const, label: "the pearl" },
    ],
    correctIndex: 2,
  },
  {
    type: "learn" as const,
    sticker: "pearling-village" as const,
    headline: "Umm Al Quwain has been home to people for at least 6,000 years.",
    funFact: "One of the oldest pearling towns ever discovered is here!",
  },
  {
    type: "true-false" as const,
    statement: "Over 15,000 pairs of seabirds nest on Al Sinniyah Island.",
    sticker: "seabird-flock" as const,
    answer: true,
    explanation: "Yes! It's the UAE's biggest cormorant colony.",
  },
  {
    type: "true-false" as const,
    statement: "Pearl diving and fishing were the main jobs in old Umm Al Quwain.",
    sticker: "pearling-village" as const,
    answer: true,
    explanation: "Yes! People in UAQ have lived from the sea for thousands of years.",
  },
  {
    type: "multiple-choice" as const,
    question: "Which ancient empire bought UAQ pearls and frankincense from Ed Dur?",
    sticker: "roman-trade" as const,
    options: ["The Roman Empire", "Modern China", "The Mongols", "Vikings"],
    correctIndex: 0,
    explanation: "Ed Dur traded with the Roman Empire 2,000 years ago.",
  },
];

/* ============================================================
   LEVEL 6 — Ras Al Khaimah
   ============================================================ */
const heritageLesson6 = [
  // === Block A: identity ===
  {
    type: "learn" as const,
    sticker: "rak-map" as const,
    headline: "Ras Al Khaimah means 'Top of the Tent' in Arabic.",
    headlineAr: "رأس الخيمة تعني 'قمة الخيمة'",
    hurr: "Named after the palm-frond tents the early settlers built.",
  },
  {
    type: "learn" as const,
    sticker: "ancient-port" as const,
    headline: "Ras Al Khaimah is one of the oldest port cities in the world.",
    funFact: "People have been living there for over 7,000 years!",
  },
  {
    type: "true-false" as const,
    statement: "Ras Al Khaimah was just built recently.",
    sticker: "palm-tent" as const,
    answer: false,
    explanation: "False! People have lived there for over 7,000 years.",
  },

  // === Block B: Jebel Jais ===
  {
    type: "learn" as const,
    sticker: "jebel-jais" as const,
    headline: "Jebel Jais is the highest mountain in the UAE at 1,934 meters tall, and it sometimes snows on top in winter.",
  },
  {
    type: "tap-image" as const,
    prompt: "Tap the mountain",
    promptAr: "اضغط على الجبل",
    options: [
      { sticker: "burj-khalifa" as const, label: "Tower" },
      { sticker: "jebel-jais" as const, label: "Mountain" },
      { sticker: "dhow-boat" as const, label: "Boat" },
    ],
    correctIndex: 1,
  },
  {
    type: "multiple-choice" as const,
    question: "How tall is Jebel Jais?",
    sticker: "snowy-peak" as const,
    options: ["100 meters", "500 meters", "1,934 meters", "5,000 meters"],
    correctIndex: 2,
    explanation: "Jebel Jais is 1,934 meters tall, the highest mountain in the UAE.",
  },

  // === Block C: zipline + pearls + fort ===
  {
    type: "learn" as const,
    sticker: "zipline-rider" as const,
    headline: "The world's longest zipline is on Jebel Jais.",
    funFact: "It is almost 3 km long and you fly down at speeds up to 150 km/h!",
  },
  {
    type: "true-false" as const,
    statement: "Snow can fall at the top of Jebel Jais.",
    sticker: "snowy-peak" as const,
    answer: true,
    explanation: "Yes! Snow falls about once every 5 years on the highest peaks.",
  },
  {
    type: "learn" as const,
    sticker: "pearl-farm" as const,
    headline: "The Suwaidi Pearl Farm in RAK is the only Arabian pearl farm in the world.",
    hurr: "Pearls grow inside oysters in the calm warm water.",
  },

  // === Block D: vocab + recap ===
  {
    type: "match-pairs" as const,
    prompt: "Match the words to Arabic",
    pairs: [
      { en: "Mountain", ar: "جبل" },
      { en: "Port", ar: "ميناء" },
      { en: "Oyster", ar: "محار" },
      { en: "Tent", ar: "خيمة" },
    ],
  },
  {
    type: "listen-pick" as const,
    prompt: "Tap the speaker, then pick what you hear",
    spoken: "the oyster",
    spokenLang: "en-US" as const,
    options: [
      { sticker: "dhayah-fort" as const, label: "the fort" },
      { sticker: "oyster-rope" as const, label: "the oyster" },
      { sticker: "mountain-village" as const, label: "the village" },
    ],
    correctIndex: 1,
  },
  {
    type: "learn" as const,
    sticker: "dhayah-fort" as const,
    headline: "Dhayah Fort is the only hilltop fort still standing in the UAE. Climb 239 steps to reach it!",
    funFact: "From the top, you can see the sea, the mountains, and the palm groves.",
  },
  {
    type: "true-false" as const,
    statement: "The world's longest zipline is in Ras Al Khaimah.",
    sticker: "rak-skyline" as const,
    answer: true,
    explanation: "Yes! It's on Jebel Jais, almost 3 km long.",
  },
  {
    type: "true-false" as const,
    statement: "The Suwaidi Pearl Farm in RAK is the only Arabian pearl farm in the world.",
    sticker: "pearl-farm" as const,
    answer: true,
    explanation: "Yes! Pearls grow inside oysters in the calm warm water.",
  },
  {
    type: "multiple-choice" as const,
    question: "How many steps do you climb to reach Dhayah Fort?",
    sticker: "dhayah-fort" as const,
    options: ["50", "100", "239", "1,000"],
    correctIndex: 2,
    explanation: "239 steps! And from the top you can see the sea, the mountains, and the palm groves.",
  },
];

/* ============================================================
   LEVEL 7 — Fujairah
   ============================================================ */
const heritageLesson7 = [
  // === Block A: identity ===
  {
    type: "learn" as const,
    sticker: "fujairah-map" as const,
    headline: "Fujairah is the only emirate fully on the Gulf of Oman.",
    headlineAr: "الفجيرة هي الإمارة الوحيدة على خليج عمان",
    hurr: "Different sea, different views!",
  },
  {
    type: "learn" as const,
    sticker: "hajar-mountains" as const,
    headline: "The Hajar Mountains run through Fujairah, making it the most mountainous emirate.",
    funFact: "When it rains in the mountains, fresh water rushes down through wadis (valleys).",
  },
  {
    type: "true-false" as const,
    statement: "Fujairah is on the Arabian Gulf.",
    sticker: "gulf-of-oman" as const,
    answer: false,
    explanation: "False! Fujairah is on the Gulf of Oman, the only emirate fully there.",
  },

  // === Block B: Al Bidya Mosque ===
  {
    type: "learn" as const,
    sticker: "al-bidya-mosque" as const,
    headline: "Al Bidya Mosque is the oldest mosque in the UAE, built about 575 years ago using only mud and stone, no wood at all.",
  },
  {
    type: "tap-image" as const,
    prompt: "Tap the Al Bidya Mosque",
    promptAr: "اضغط على مسجد البدية",
    options: [
      { sticker: "burj-khalifa" as const, label: "Tower" },
      { sticker: "al-bidya-mosque" as const, label: "Al Bidya Mosque" },
      { sticker: "snoopy-island" as const, label: "Snoopy Island" },
    ],
    correctIndex: 1,
  },
  {
    type: "multiple-choice" as const,
    question: "How old is Al Bidya Mosque?",
    sticker: "bidya-domes-closeup" as const,
    options: ["50 years", "100 years", "About 575 years", "1,000 years"],
    correctIndex: 2,
    explanation: "Al Bidya Mosque is over 575 years old, the oldest mosque in the UAE.",
  },

  // === Block C: Snoopy Island + rain + fort ===
  {
    type: "learn" as const,
    sticker: "snoopy-island" as const,
    headline: "Snoopy Island looks like a cartoon dog lying on its back.",
    funFact: "Sea turtles and clownfish swim around its coral reefs!",
  },
  {
    type: "true-false" as const,
    statement: "Al Bidya Mosque was built using wood.",
    sticker: "fujairah-fort" as const,
    answer: false,
    explanation: "False! It was built without any wood, just mud and stone.",
  },
  {
    type: "learn" as const,
    sticker: "mango-orchard" as const,
    headline: "Fujairah gets more rain than any other emirate, so farmers grow mangoes and oranges.",
    hurr: "Mountains catch the rain clouds!",
  },

  // === Block D: vocab + recap ===
  {
    type: "match-pairs" as const,
    prompt: "Match the words to Arabic",
    pairs: [
      { en: "Wadi", ar: "وادي" },
      { en: "Turtle", ar: "سلحفاة" },
      { en: "Dome", ar: "قبة" },
      { en: "Spring", ar: "نبع" },
    ],
  },
  {
    type: "listen-pick" as const,
    prompt: "Tap the speaker, then pick what you hear",
    spoken: "the turtle",
    spokenLang: "en-US" as const,
    options: [
      { sticker: "wadi" as const, label: "the wadi" },
      { sticker: "sea-turtle" as const, label: "the turtle" },
      { sticker: "clownfish" as const, label: "the fish" },
    ],
    correctIndex: 1,
  },
  {
    type: "learn" as const,
    sticker: "coral-reef" as const,
    headline: "Off Al Aqah Beach you can snorkel and see clownfish, sea turtles, and colourful coral reefs.",
    funFact: "The water around Snoopy Island is some of the clearest in the UAE.",
  },
  {
    type: "true-false" as const,
    statement: "Fujairah is the most mountainous emirate.",
    sticker: "fujairah-skyline" as const,
    answer: true,
    explanation: "Yes! The Hajar Mountains run all through Fujairah.",
  },
  {
    type: "true-false" as const,
    statement: "Fujairah gets more rain than any other emirate.",
    sticker: "mango-orchard" as const,
    answer: true,
    explanation: "Yes! That's why farmers can grow mangoes and oranges there.",
  },
];

export const heritageLessons: Lesson[] = [
  { levelId: 1, exercises: heritageLesson1 },
  { levelId: 2, exercises: heritageLesson2 },
  { levelId: 3, exercises: heritageLesson3 },
  { levelId: 4, exercises: heritageLesson4 },
  { levelId: 5, exercises: heritageLesson5 },
  { levelId: 6, exercises: heritageLesson6 },
  { levelId: 7, exercises: heritageLesson7 },
];

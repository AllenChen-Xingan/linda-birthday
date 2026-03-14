export interface MemoryNode {
  id: string
  date: string
  city: string
  clue: string
  reflection: string  // coaching question for Linda to reflect on
  answer: string
  category: 'friendship' | 'project' | 'adventure' | 'achievement' | 'funny'
  emoji: string
}

export const memories: MemoryNode[] = [
  {
    id: 'm1',
    date: '2025-05',
    city: 'Israel',
    clue: '"We enter a room where two who are not supposed to sit together, do." A place called Merkaz Karama — meaning "Center of Dignity."',
    reflection: 'When you sat in that room and watched two people who "shouldn\'t" be sitting together have a conversation — how did your understanding of the word "peace" change? How did that moment shape the way you later approached Roots?',
    answer: 'At the only joint Israeli-Palestinian community center in the West Bank, you met Rabbi Hanan and Palestinian Noor, listening to each of their stories. This trip gave birth to the Roots art book project.',
    category: 'adventure',
    emoji: '🕊️',
  },
  {
    id: 'm4',
    date: '2025-08',
    city: 'San Francisco',
    clue: '"You came to this world to play." A letter written to her future self. A girl running forward like a Subway Surfers character.',
    reflection: 'You wrote a letter to your future self. Now, standing at the threshold of 20 — which line from that letter do you feel you\'ve lived up to? Which line would you rewrite?',
    answer: 'You officially enrolled at Minerva University and wrote yourself a letter before school started — reminding yourself to have fun, walk your own path, and embrace fear. The SF adventure officially began.',
    category: 'achievement',
    emoji: '✉️',
  },
  {
    id: 'm8',
    date: '2026-02',
    city: 'Tokyo',
    clue: '"I\'m today\'s hero because I learned so much Claude Code!" Defected from LogSeq to Obsidian — a year ago she was still arguing with her boyfriend about which one was better. Full circle.',
    reflection: 'You spent an entire day rebuilding your "digital brain." What does that say about you? Do you think your relationship with tools is one where you use them, or where they shape you?',
    answer: 'You spent a full day using Claude Code to rebuild your entire Obsidian vault, officially launching your "AI-powered life operating system." Allen recommended Obsidian a year ago — you finally came around.',
    category: 'funny',
    emoji: '🤖',
  },
  {
    id: 'm12',
    date: '2026-02',
    city: 'Tokyo',
    clue: 'A 3-minute speech about a great-great-great-grandfather: he was a scholar who passed the imperial exams, and also a Communist spy. "Records show he was arrested in 1928, which suggests either he wasn\'t a very good spy, or he just had terrible teammates."',
    reflection: 'You discovered a "scholar-spy" in your family history. If your great-great-great-grandfather could see you today — a Chinese girl studying at an American university in Tokyo — what do you think he\'d say?',
    answer: 'You gave a presentation in AH110 about your family genealogy, discovering that your great-great-great-grandfather Liu Shouming was both an imperial exam scholar and an underground Communist Party member.',
    category: 'achievement',
    emoji: '🕵️',
  },
  {
    id: 'm14',
    date: '2026-02',
    city: 'Tokyo',
    clue: 'Officially promoted. Title: Executive Director. Had a small breakdown after the meeting, but that evening someone brought snacks and her roommate sat on the floor beside her.',
    reflection: 'The breakdown after the promotion — how much of those tears was pressure, how much was being moved, and how much was "can I really do this?" Looking back now, what would you say to the girl sitting on that floor?',
    answer: 'You were officially promoted to Executive Director at the Humans of Minerva monthly meeting, now responsible for the podcast\'s strategic direction. The legacy of 130+ episodes is in your hands.',
    category: 'achievement',
    emoji: '👑',
  },
  {
    id: 'm17',
    date: '2026-02',
    city: 'Tokyo',
    clue: 'Applying for an Indian visa, the officer pulled her into his office for tea and interrogation: "Why is a Chinese person studying at an American university, in Japan, trying to go to India to find Ukrainians?"',
    reflection: 'That\'s actually a great question — why IS a Chinese person studying at an American university, in Japan, going to India to find Ukrainians? If you had to answer that visa officer in one sentence, what would you say?',
    answer: 'The Indian visa application turned into a cross-cultural comedy. The officer was charmed by your story, and after a 28-day wait, you finally got the visa.',
    category: 'funny',
    emoji: '🛂',
  },
  {
    id: 'm20',
    date: '2026-02',
    city: 'Kawazu',
    clue: '"No productivity on the Kawazu trip. Let the cherry blossoms, Ellie, Sophie, Jules, the cafe owner just happen."',
    reflection: 'You gave yourself a day free from "optimization." For someone who\'s always doing things, was that hard? Do you think your 20s need more days like that?',
    answer: 'You and your friends went to Kawazu to see the early cherry blossoms, cancelled a bunch of meetings, and just existed — present — under the sakura.',
    category: 'adventure',
    emoji: '🌸',
  },
  {
    id: 'm21',
    date: '2026-03',
    city: 'Tokyo',
    clue: 'A Ukrainian children\'s concert. The kids were forbidden from speaking Ukrainian or singing their national anthem. At the end, the entire audience stood up and sang it together. "I was crying."',
    reflection: 'What was in those tears? Do you think "the freedom to be yourself" is something you take for granted in your life, or something you\'re also fighting for?',
    answer: 'You attended a children\'s concert organized by the Ukrainian Embassy and understood for the first time what it means to "freely sing your own national anthem."',
    category: 'adventure',
    emoji: '🇺🇦',
  },
]

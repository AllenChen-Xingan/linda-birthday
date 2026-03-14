export interface FutureQuestion {
  id: string
  emoji: string
  question: string
  hint: string
}

export const futureQuestions: FutureQuestion[] = [
  {
    id: 'f1',
    emoji: '🌍',
    question: 'At 30, which city are you living in? And why there?',
    hint: 'You once said "cities are containers, not content." What kind of container does your 30-year-old self need?',
  },
  {
    id: 'f2',
    emoji: '🎙️',
    question: 'If you\'re still telling stories at 30, whose story do you most want to tell?',
    hint: 'From Humans of Minerva to Roots to the Nanjing documentary — where does your lens point in the next decade?',
  },
  {
    id: 'f3',
    emoji: '🪞',
    question: 'What three words do you most want people to use when describing your 30-year-old self?',
    hint: 'Lily said coaching is a mirror. What do you hope to see in that mirror?',
  },
  {
    id: 'f4',
    emoji: '📖',
    question: 'If your 30-year-old self published a book, what would the title be?',
    hint: 'Roots already has a publisher interested. In ten years, what kind of words do you want to leave behind?',
  },
  {
    id: 'f5',
    emoji: '👴',
    question: 'What kind of people do you hope to be surrounded by at 30?',
    hint: 'Janos signs his messages "75." Salo makes you feel like "a very happy person." Who makes your 30-year-old self glow?',
  },
  {
    id: 'f6',
    emoji: '✈️',
    question: 'Between 20 and 30, what\'s the one "impossible" thing you most want to accomplish?',
    hint: 'A Chinese girl studying at an American university, in Japan, going to India to find a Ukrainian — you\'re already doing the impossible. What\'s next?',
  },
  {
    id: 'f7',
    emoji: '🌸',
    question: 'On your 30th birthday, what are you doing? And who\'s with you?',
    hint: 'Cherry blossoms in Kawazu, friends in Tokyo, snacks on the floor with your roommate — what does your ideal 30th birthday look like?',
  },
  {
    id: 'f8',
    emoji: '✉️',
    question: 'Write one line to your 30-year-old self.',
    hint: 'At 19, you wrote: "You came to this world to play." At 20, what do you want to say to 30?',
  },
]

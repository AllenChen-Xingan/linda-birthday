import { useState } from 'react'
import { motion } from 'framer-motion'
import { memories } from '../data/memories'
import TimelineNode from './TimelineNode'

interface Props {
  onComplete: () => void
}

const cities = [
  { name: 'Israel', date: '2025-05' },
  { name: 'Shanghai', date: '2025-06' },
  { name: 'San Francisco', date: '2025-08' },
  { name: 'Tokyo', date: '2026-02' },
  { name: 'Kawazu', date: '2026-02' },
]

export default function Timeline({ onComplete }: Props) {
  const [shuffled] = useState(() => [...memories].sort(() => Math.random() - 0.5))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [explored, setExplored] = useState(0)
  const [showComplete, setShowComplete] = useState(false)

  const currentMemory = shuffled[currentIndex]

  const handleNext = () => {
    // Only count as explored when she actually went through clue → reflect → answer
    setExplored((e) => e + 1)
    if (currentIndex + 1 >= shuffled.length) {
      setShowComplete(true)
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }

  const handleSkip = () => {
    // Skip does NOT count toward explored
    if (currentIndex + 1 >= shuffled.length) {
      setShowComplete(true)
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }

  if (showComplete) {
    return (
      <motion.div
        className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="text-6xl mb-6"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🌸
        </motion.div>
        <h2 className="font-serif text-2xl md:text-3xl text-text mb-4">
          Journey Complete
        </h2>
        <p className="text-text-light mb-2 max-w-md leading-relaxed">
          You explored {explored} of {memories.length} memories.
        </p>
        <p className="font-serif text-text-light mb-8 max-w-md italic leading-relaxed">
          From Israel to Tokyo, from 19 to 20 — every moment says: you are already someone remarkable.
        </p>
        <motion.button
          onClick={onComplete}
          className="bg-sakura hover:bg-sakura-dark text-white px-8 py-3 rounded-full shadow-md transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          One more surprise... 🎁
        </motion.button>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* City timeline bar */}
      <div className="mb-10 overflow-x-auto timeline-scroll pb-2">
        <div className="flex items-center gap-2 min-w-[500px] px-4">
          {cities.map((city, i) => (
            <div key={city.name} className="flex items-center">
              <div className="flex flex-col items-center">
                <span className="text-[11px] text-text-muted mb-1">{city.date}</span>
                <div
                  className={`w-3.5 h-3.5 rounded-full border-2 transition-colors ${
                    currentMemory && currentMemory.city.includes(city.name.split(' ')[0])
                      ? 'bg-gold border-gold scale-125'
                      : 'bg-cream-dark border-gold-light'
                  }`}
                />
                <span className="text-xs text-text-light mt-1 whitespace-nowrap">{city.name}</span>
              </div>
              {i < cities.length - 1 && (
                <div className="w-20 md:w-28 h-px bg-gold-light mx-2 mt-[-2px]" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-8 px-2">
        <span className="text-sm text-text-muted">
          {currentIndex + 1}/{memories.length}
        </span>
        <div className="flex-1 mx-4 h-2 bg-cream-dark rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-light to-gold rounded-full"
            animate={{ width: `${((currentIndex + 1) / memories.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span className="text-lg">{currentMemory?.emoji}</span>
      </div>

      {/* Current memory node */}
      <TimelineNode
        key={currentMemory.id}
        memory={currentMemory}
        onNext={handleNext}
        onSkip={handleSkip}
      />
    </motion.div>
  )
}

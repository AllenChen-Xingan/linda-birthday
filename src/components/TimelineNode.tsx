import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { MemoryNode } from '../data/memories'

interface Props {
  memory: MemoryNode
  onNext: () => void
  onSkip: () => void
}

const categoryColors: Record<string, string> = {
  friendship: 'from-sakura-light to-sakura',
  project: 'from-sage-light to-sage',
  adventure: 'from-gold-light to-gold',
  achievement: 'from-gold-light to-gold-muted',
  funny: 'from-sakura-light to-gold-light',
}

const categoryLabels: Record<string, string> = {
  friendship: 'Friendship',
  project: 'Project',
  adventure: 'Adventure',
  achievement: 'Achievement',
  funny: 'Fun Moment',
}

export default function TimelineNode({ memory, onNext, onSkip }: Props) {
  const [phase, setPhase] = useState<'clue' | 'answer' | 'reflect'>('clue')

  const gradient = categoryColors[memory.category] || 'from-cream-dark to-gold-light'

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${memory.id}-${phase}`}
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.97 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl mx-auto"
      >
        <div className={`rounded-2xl bg-gradient-to-br ${gradient} p-px`}>
          <div className="bg-warm-white rounded-2xl p-7 md:p-9">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{memory.emoji}</span>
                <div>
                  <span className="text-xs text-text-muted">{memory.date}</span>
                  <span className="text-xs text-text-muted mx-1">·</span>
                  <span className="text-xs text-text-muted">{memory.city}</span>
                </div>
              </div>
              <span className="text-xs bg-cream-dark text-text-light px-2.5 py-1 rounded-full">
                {categoryLabels[memory.category]}
              </span>
            </div>

            {/* Clue phase */}
            {phase === 'clue' && (
              <>
                <p className="font-serif text-text text-base md:text-lg leading-relaxed mb-5">
                  {memory.clue}
                </p>
                <p className="text-sm text-text-muted mb-5 italic">
                  Do you remember this scene? Talk about it with your friends, then tap below.
                </p>
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => setPhase('answer')}
                    className="flex-1 bg-gold/90 hover:bg-gold text-white py-3 rounded-full text-sm transition-all cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reveal the memory 🌿
                  </motion.button>
                  <motion.button
                    onClick={onSkip}
                    className="px-5 py-3 text-text-muted hover:text-text-light text-sm transition-colors cursor-pointer"
                    whileTap={{ scale: 0.98 }}
                  >
                    Skip
                  </motion.button>
                </div>
              </>
            )}

            {/* Answer phase */}
            {phase === 'answer' && (
              <>
                <div className="bg-sage-light/20 rounded-xl p-4 mb-6 border border-sage-light/40">
                  <p className="text-xs text-sage-dark mb-2 font-medium">🌿 This memory is...</p>
                  <p className="font-serif text-text text-base leading-relaxed">
                    {memory.answer}
                  </p>
                </div>
                <motion.button
                  onClick={() => setPhase('reflect')}
                  className="w-full bg-sage/90 hover:bg-sage text-white py-3 rounded-full text-sm transition-all cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  A question for you 💭
                </motion.button>
              </>
            )}

            {/* Reflection phase */}
            {phase === 'reflect' && (
              <>
                <div className="bg-cream/60 rounded-xl p-4 mb-6 border border-gold-light/30">
                  <p className="text-xs text-gold mb-2 font-medium">💭 A question for you</p>
                  <p className="font-serif text-text text-base leading-relaxed">
                    {memory.reflection}
                  </p>
                </div>
                <p className="text-sm text-text-muted mb-5 italic text-center">
                  Take your time. Talk it through with the people around you.
                </p>
                <motion.button
                  onClick={onNext}
                  className="w-full bg-gold/90 hover:bg-gold text-white py-3 rounded-full text-sm transition-all cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Next memory →
                </motion.button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

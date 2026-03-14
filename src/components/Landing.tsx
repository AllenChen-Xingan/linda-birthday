import { useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  onEnter: () => void
}

function Petal({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <motion.div
      className="absolute text-sakura pointer-events-none select-none"
      style={{ left: `${x}%`, top: -20, fontSize: size }}
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{
        y: ['0vh', '105vh'],
        opacity: [0, 1, 1, 0],
        rotate: [0, 360],
        x: [0, Math.sin(x) * 60, -Math.sin(x) * 40, Math.sin(x) * 30],
      }}
      transition={{
        duration: 12 + size * 0.3,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      🌸
    </motion.div>
  )
}

export default function Landing({ onEnter }: Props) {
  const [petals] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      delay: i * 0.8,
      x: Math.random() * 100,
      size: 14 + Math.random() * 18,
    }))
  )

  return (
    <div className="min-h-dvh bg-cream relative overflow-hidden flex flex-col items-center justify-center px-6">
      {petals.map((p, i) => (
        <Petal key={i} {...p} />
      ))}

      <motion.div
        className="relative z-10 text-center max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <motion.div
          className="text-6xl mb-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, type: 'spring', bounce: 0.3 }}
        >
          🌳
        </motion.div>

        <motion.p
          className="font-serif text-text-light text-lg mb-8 md:mb-10 italic leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          "I am not a bird. I am the wind itself."
        </motion.p>

        <motion.h1
          className="font-serif text-3xl md:text-4xl text-text mb-4 md:mb-5 leading-snug"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Happy 20th Birthday
        </motion.h1>

        <motion.p
          className="font-serif text-2xl md:text-3xl text-gold mb-14 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          Linda Xiaoyun 🌸
        </motion.p>

        <motion.button
          onClick={onEnter}
          className="bg-gold/90 hover:bg-gold text-white font-sans text-base px-10 py-4 rounded-full shadow-md transition-all hover:shadow-lg hover:scale-105 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Begin the Journey ✨
        </motion.button>

        <motion.p
          className="text-text-muted text-sm mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          March 15, 2026 · Tokyo
        </motion.p>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent" />
    </div>
  )
}

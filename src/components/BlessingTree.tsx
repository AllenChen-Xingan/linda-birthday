import { motion } from 'framer-motion'
import { useBlessings } from '../hooks/useBlessings'
import BlessingLeaf from './BlessingLeaf'
import { useState } from 'react'
import BlessingDetail from './BlessingDetail'
import type { Blessing } from '../hooks/useBlessings'

interface Props {
  onComplete?: () => void
}

export default function BlessingTree({ onComplete }: Props) {
  const { blessings, loading } = useBlessings()
  const [selectedBlessing, setSelectedBlessing] = useState<Blessing | null>(null)

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="text-4xl"
        >
          🌸
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      className="min-h-dvh relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Tree trunk and branches — full width, anchored to bottom */}
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        width="100%"
        height="100%"
        viewBox="0 0 800 900"
        preserveAspectRatio="xMidYMax meet"
      >
        {/* Main trunk */}
        <path d="M 380 900 Q 385 750 390 600 Q 393 520 396 440" stroke="#8B7355" strokeWidth="18" fill="none" strokeLinecap="round" />
        {/* Top branches */}
        <path d="M 396 440 Q 310 370 200 310" stroke="#8B7355" strokeWidth="11" fill="none" strokeLinecap="round" />
        <path d="M 396 440 Q 490 370 600 310" stroke="#8B7355" strokeWidth="11" fill="none" strokeLinecap="round" />
        {/* Mid branches */}
        <path d="M 393 520 Q 290 470 160 430" stroke="#8B7355" strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M 393 520 Q 500 470 640 430" stroke="#8B7355" strokeWidth="9" fill="none" strokeLinecap="round" />
        {/* Lower branches */}
        <path d="M 390 600 Q 300 560 180 540" stroke="#8B7355" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M 390 600 Q 480 560 620 540" stroke="#8B7355" strokeWidth="8" fill="none" strokeLinecap="round" />
        {/* Small twigs */}
        <path d="M 200 310 Q 150 280 100 270" stroke="#8B7355" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M 600 310 Q 650 280 700 270" stroke="#8B7355" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M 160 430 Q 120 410 80 400" stroke="#8B7355" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 640 430 Q 680 410 720 400" stroke="#8B7355" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>

      <div className="relative z-10 pt-10 pb-24 px-4">
        <div className="text-center mb-8">
          <motion.h2
            className="font-serif text-3xl text-text mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            The Blessing Tree
          </motion.h2>
          <motion.p
            className="text-text-light text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {blessings.length} {blessings.length === 1 ? 'leaf' : 'leaves'}, {blessings.length} {blessings.length === 1 ? 'blessing' : 'blessings'}
          </motion.p>
        </div>

        {blessings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-muted text-sm">
              No blessings yet... Share the link with friends so they can leave a wish 🌿
            </p>
          </div>
        ) : (
          <div className="mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6 max-w-5xl">
            {blessings.map((blessing, index) => (
              <BlessingLeaf
                key={blessing.id}
                blessing={blessing}
                index={index}
                onClick={() => setSelectedBlessing(blessing)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Continue to future self */}
      {onComplete && (
        <div className="relative z-10 text-center pb-12">
          <motion.button
            onClick={onComplete}
            className="bg-gold/90 hover:bg-gold text-white px-8 py-3 rounded-full shadow-md transition-all cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            One last thing... 💌
          </motion.button>
        </div>
      )}

      {selectedBlessing && (
        <BlessingDetail
          blessing={selectedBlessing}
          onClose={() => setSelectedBlessing(null)}
        />
      )}
    </motion.div>
  )
}

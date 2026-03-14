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
      className="min-h-[80vh] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Tree trunk and branches */}
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        width="600"
        height="600"
        viewBox="0 0 600 600"
        style={{ maxWidth: '90vw' }}
      >
        <path d="M 280 600 Q 285 500 290 400 Q 292 350 295 300" stroke="#8B7355" strokeWidth="16" fill="none" strokeLinecap="round" />
        <path d="M 295 300 Q 250 250 200 220" stroke="#8B7355" strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d="M 295 300 Q 340 250 390 220" stroke="#8B7355" strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d="M 292 350 Q 230 320 180 300" stroke="#8B7355" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M 292 350 Q 360 320 410 300" stroke="#8B7355" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M 290 400 Q 240 380 200 370" stroke="#8B7355" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M 290 400 Q 340 380 380 370" stroke="#8B7355" strokeWidth="7" fill="none" strokeLinecap="round" />
      </svg>

      <div className="relative z-10 pt-12 pb-24 px-4">
        <div className="text-center mb-12">
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
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
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

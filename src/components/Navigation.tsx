import { motion } from 'framer-motion'

interface Props {
  current: 'timeline' | 'blessings'
  onChange: (view: 'timeline' | 'blessings') => void
}

export default function Navigation({ current, onChange }: Props) {
  return (
    <nav className="sticky top-0 z-40 bg-cream/80 backdrop-blur-md border-b border-gold-light/30">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="font-serif text-gold text-sm">🌸 Linda's 20th</span>

        <div className="flex gap-1 bg-cream-dark rounded-full p-1">
          <button
            onClick={() => onChange('timeline')}
            className={`relative px-4 py-1.5 rounded-full text-sm transition-colors cursor-pointer ${
              current === 'timeline' ? 'text-white' : 'text-text-light hover:text-text'
            }`}
          >
            {current === 'timeline' && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-gold rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">Memories</span>
          </button>
          <button
            onClick={() => onChange('blessings')}
            className={`relative px-4 py-1.5 rounded-full text-sm transition-colors cursor-pointer ${
              current === 'blessings' ? 'text-white' : 'text-text-light hover:text-text'
            }`}
          >
            {current === 'blessings' && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-sakura rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">Blessings</span>
          </button>
        </div>

        <span className="text-xs text-text-muted hidden sm:block">2026.03.15</span>
      </div>
    </nav>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Blessing } from '../hooks/useBlessings'

interface Props {
  blessing: Blessing
  index: number
  onClick: () => void
}

const leafColors: Record<string, string> = {
  image: 'from-sakura-light to-sakura',
  audio: 'from-gold-light to-gold',
  video: 'from-gold-muted to-gold',
  text: 'from-sage-light to-sage',
}

const leafEmojis: Record<string, string> = {
  image: '🌸',
  audio: '🎵',
  video: '🎬',
  text: '🍃',
}

export default function BlessingLeaf({ blessing, index, onClick }: Props) {
  const type = blessing.file_type || 'text'
  const gradient = leafColors[type] || leafColors.text
  const emoji = leafEmojis[type] || leafEmojis.text
  const [hoverRotate] = useState(() => Math.random() * 4 - 2)
  const [animDuration] = useState(() => 3 + Math.random() * 2)

  return (
    <motion.button
      onClick={onClick}
      className={`relative bg-gradient-to-br ${gradient} rounded-2xl p-5 shadow-md hover:shadow-lg transition-all cursor-pointer text-left overflow-hidden group`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.03, rotate: hoverRotate }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{
          y: [0, -4, 0],
          rotate: [0, 2, 0, -2, 0],
        }}
        transition={{
          duration: animDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="text-3xl mb-3">{emoji}</div>
        <p className="text-white text-sm font-medium mb-2 line-clamp-2">
          {blessing.message || 'A special blessing'}
        </p>
        <p className="text-white/80 text-xs">— {blessing.author_name}</p>
      </motion.div>

      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors rounded-2xl" />
    </motion.button>
  )
}

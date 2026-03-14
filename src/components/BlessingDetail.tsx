import { motion } from 'framer-motion'
import type { Blessing } from '../hooks/useBlessings'

interface Props {
  blessing: Blessing
  onClose: () => void
}

export default function BlessingDetail({ blessing, onClose }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bark/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-warm-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-warm-white border-b border-cream-dark px-6 py-4 flex items-center justify-between">
          <div>
            <p className="font-serif text-lg text-text">{blessing.author_name}</p>
            <p className="text-xs text-text-muted">
              {new Date(blessing.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text transition-colors cursor-pointer"
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {blessing.message && (
            <p className="font-serif text-text text-base leading-relaxed mb-6 whitespace-pre-wrap">
              {blessing.message}
            </p>
          )}

          {blessing.file_url && (
            <div className="rounded-xl overflow-hidden bg-cream">
              {blessing.file_type === 'image' && (
                <img src={blessing.file_url} alt="Blessing" className="w-full h-auto" />
              )}
              {blessing.file_type === 'audio' && (
                <audio controls src={blessing.file_url} className="w-full" preload="auto" />
              )}
              {blessing.file_type === 'video' && (
                <video controls playsInline src={blessing.file_url} className="w-full" preload="auto" />
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

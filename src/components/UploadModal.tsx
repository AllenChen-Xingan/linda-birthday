import { useState } from 'react'
import { motion } from 'framer-motion'
import { useBlessings } from '../hooks/useBlessings'

interface Props {
  onClose: () => void
}

export default function UploadModal({ onClose }: Props) {
  const { uploadBlessing } = useBlessings()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setUploading(true)
    const result = await uploadBlessing(
      name.trim(),
      message.trim() || null,
      file
    )

    if (result) {
      setSuccess(true)
      setTimeout(() => {
        onClose()
      }, 2000)
    } else {
      alert('Upload failed. Please try again.')
      setUploading(false)
    }
  }

  if (success) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bark/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-warm-white rounded-2xl shadow-2xl p-8 text-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 0] }}
            transition={{ duration: 0.6 }}
          >
            🌿
          </motion.div>
          <p className="font-serif text-xl text-text mb-2">Blessing sent!</p>
          <p className="text-text-muted text-sm">Your blessing is now a leaf on the tree</p>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bark/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-warm-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-warm-white border-b border-cream-dark px-6 py-4 flex items-center justify-between">
          <h3 className="font-serif text-xl text-text">Send Your Blessing</h3>
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm text-text-light mb-2">
              Your name <span className="text-sakura">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Allen"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-cream/30 text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold-light transition-all"
            />
          </div>

          <div>
            <label className="block text-sm text-text-light mb-2">
              Your message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write something for Linda..."
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-cream/30 text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold-light transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-text-light mb-2">
              Upload photo/audio/video (optional)
            </label>
            <input
              type="file"
              accept="image/*,audio/*,video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-gold-light file:text-white hover:file:bg-gold file:cursor-pointer cursor-pointer"
            />
            {file && (
              <p className="text-xs text-text-muted mt-2">
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={uploading || !name.trim()}
            className="w-full bg-sakura hover:bg-sakura-dark disabled:bg-cream-dark disabled:cursor-not-allowed text-white py-3 rounded-full font-medium transition-all cursor-pointer"
            whileHover={{ scale: uploading ? 1 : 1.02 }}
            whileTap={{ scale: uploading ? 1 : 0.98 }}
          >
            {uploading ? 'Sending...' : 'Send Blessing 🌸'}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  )
}

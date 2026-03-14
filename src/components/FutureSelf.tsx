import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { futureQuestions } from '../data/futureQuestions'
import { supabase } from '../lib/supabase'

export default function FutureSelf() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)

  const current = futureQuestions[currentIndex]
  const answered = Object.keys(answers).length

  const handleNext = () => {
    if (currentIndex + 1 >= futureQuestions.length) {
      handleFinish()
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }

  const handleFinish = async () => {
    setSaving(true)
    const entries = Object.entries(answers)
    if (entries.length > 0 && supabase) {
      const rows = entries.map(([questionId, answer]) => {
        const q = futureQuestions.find((fq) => fq.id === questionId)
        return {
          question_id: questionId,
          question_text: q?.question || '',
          answer,
        }
      })
      try {
        await supabase.from('future_answers').insert(rows)
      } catch {
        // ok
      }
    }
    setSaving(false)
    setDone(true)
  }

  if (done) {
    return (
      <motion.div
        className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="text-6xl mb-6"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          💌
        </motion.div>
        <h2 className="font-serif text-2xl md:text-3xl text-text mb-4">
          Letter to your 30-year-old self, sealed.
        </h2>
        <p className="text-text-light mb-2 max-w-md leading-relaxed">
          You answered {answered} question{answered !== 1 ? 's' : ''}.
        </p>
        <p className="font-serif text-text-light mb-8 max-w-md italic leading-relaxed">
          When you open this letter in ten years, we hope you'll smile.
        </p>
        <p className="text-text-muted text-sm mb-4">
          Happy 20th Birthday, Linda 🌸
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="max-w-xl mx-auto px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center mb-8">
        <motion.div
          className="text-4xl mb-3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.4 }}
        >
          💌
        </motion.div>
        <h2 className="font-serif text-2xl text-text mb-2">A Letter to Your 30-Year-Old Self</h2>
        <p className="text-text-muted text-sm">
          You don't have to answer every one. Just pick the ones that speak to you.
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2.5 mb-8">
        {futureQuestions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
              i === currentIndex
                ? 'bg-gold scale-125'
                : answers[q.id]
                ? 'bg-sakura'
                : 'bg-cream-dark'
            }`}
            aria-label={`Question ${i + 1}`}
          />
        ))}
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gradient-to-br from-gold-light/40 to-sakura-light/40 rounded-2xl p-px">
            <div className="bg-warm-white rounded-2xl p-7 md:p-9">
              <div className="text-3xl mb-4">{current.emoji}</div>

              <p className="font-serif text-text text-lg leading-relaxed mb-3">
                {current.question}
              </p>

              <p className="text-text-muted text-sm italic mb-6">
                {current.hint}
              </p>

              <textarea
                value={answers[current.id] || ''}
                onChange={(e) =>
                  setAnswers((prev) => ({ ...prev, [current.id]: e.target.value }))
                }
                placeholder="Write your thoughts..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/30 text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold-light transition-all resize-none font-serif"
              />

              <div className="flex gap-3 mt-6">
                {currentIndex > 0 && (
                  <motion.button
                    onClick={() => setCurrentIndex((i) => i - 1)}
                    className="px-5 py-2.5 text-text-muted hover:text-text-light text-sm transition-colors cursor-pointer"
                    whileTap={{ scale: 0.98 }}
                  >
                    ← Back
                  </motion.button>
                )}
                <motion.button
                  onClick={handleNext}
                  className="flex-1 bg-gold/90 hover:bg-gold text-white py-2.5 rounded-full text-sm transition-all cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {currentIndex + 1 >= futureQuestions.length
                    ? saving
                      ? 'Saving...'
                      : 'Finish ✨'
                    : answers[current.id]
                    ? 'Next →'
                    : 'Skip →'}
                </motion.button>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-text-muted mt-4">
            {currentIndex + 1} / {futureQuestions.length} · {answered} answered
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="text-center mt-6">
        <button
          onClick={handleFinish}
          className="text-sm text-text-muted hover:text-text-light transition-colors underline underline-offset-4 cursor-pointer"
        >
          Finish early →
        </button>
      </div>
    </motion.div>
  )
}

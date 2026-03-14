import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Landing from './components/Landing'
import Timeline from './components/Timeline'
import FutureSelf from './components/FutureSelf'
import BlessingTree from './components/BlessingTree'
import UploadPage from './components/UploadPage'
import AdminPage from './components/AdminPage'

type View = 'landing' | 'timeline' | 'blessings' | 'future'

function App() {
  const hash = window.location.hash
  const [view, setView] = useState<View>('landing')

  // Friends: /linda-birthday/#/send
  if (hash === '#/send') return <UploadPage />

  // Allen admin: /linda-birthday/#/admin
  if (hash === '#/admin') return <AdminPage />

  if (view === 'landing') {
    return <Landing onEnter={() => setView('timeline')} />
  }

  return (
    <div className="min-h-dvh bg-cream relative">
      <AnimatePresence mode="wait">
        {view === 'timeline' && (
          <Timeline key="timeline" onComplete={() => setView('blessings')} />
        )}
        {view === 'blessings' && (
          <BlessingTree key="blessings" onComplete={() => setView('future')} />
        )}
        {view === 'future' && (
          <FutureSelf key="future" />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App

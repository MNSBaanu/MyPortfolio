import { useState, lazy, Suspense } from 'react'
import { MotionConfig } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import { track } from '@vercel/analytics'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'
import { personalInfo } from './data/portfolio'
import SEO from './components/layout/SEO'
import IdentityPanel from './components/layout/IdentityPanel'
import Summary from './components/sections/Summary'


// ⚡ Bolt: Lazy load below-the-fold sections and heavy overlays to reduce initial bundle size and improve TTI
const ChatAssistant = lazy(() => import('./components/overlays/ChatAssistant'))
const Experience = lazy(() => import('./components/sections/Experience'))
const Work = lazy(() => import('./components/sections/Work'))
const Stack = lazy(() => import('./components/sections/Stack'))
const Education = lazy(() => import('./components/sections/Education'))
const Contact = lazy(() => import('./components/sections/Contact'))

function App() {
  const [chatOpen, setChatOpen] = useState(false)
  const [techFilter, setTechFilter] = useState<string | null>(null)

  const toggleChat = () => {
    if (!chatOpen) track('Chat Opened')
    setChatOpen(!chatOpen)
  }

  const selectTech = (tech: string) => {
    track('Stack Filter', { tech })
    setTechFilter(tech)
    requestAnimationFrame(() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }))
  }

  return (
    <HelmetProvider>
      <ThemeProvider>
        <MotionConfig reducedMotion="user">
          <SEO />
          <Analytics />
          <Toaster position="top-right" />
          <div className="min-h-screen bg-stone-100 text-stone-900 dark:bg-neutral-950 dark:text-neutral-100">
            <div className="mx-auto max-w-6xl px-4 py-4 pb-24 sm:px-6 sm:py-8 sm:pb-24 lg:grid lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-8 lg:px-8 lg:py-10">
              <IdentityPanel chatOpen={chatOpen} onToggleChat={toggleChat} />
              <main className="mt-4 space-y-4 lg:mt-0">
                <Suspense fallback={null}>
                  <ChatAssistant open={chatOpen} onClose={() => setChatOpen(false)} />
                </Suspense>
                <Summary />
                <Suspense fallback={<div className="h-32" />}>
                  <Experience />
                  <Work techFilter={techFilter} onClearFilter={() => setTechFilter(null)} />
                  <Stack activeTech={techFilter} onSelectTech={selectTech} />
                  <Education />
                  <Contact />
                </Suspense>
                <p className="py-4 text-center font-mono text-xs text-stone-500 dark:text-neutral-500">
                  © {new Date().getFullYear()} {personalInfo.name}
                </p>
              </main>
            </div>
          </div>
        </MotionConfig>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App

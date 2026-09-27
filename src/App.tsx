import { MotionConfig } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'
import { personalInfo } from './data/portfolio'
import SEO from './components/layout/SEO'
import IdentityPanel from './components/layout/IdentityPanel'
import Summary from './components/sections/Summary'
import Experience from './components/sections/Experience'
import Work from './components/sections/Work'
import Stack from './components/sections/Stack'
import Education from './components/sections/Education'
import Contact from './components/sections/Contact'

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <MotionConfig reducedMotion="user">
          <SEO />
          <Toaster position="top-right" />
          <div className="min-h-screen bg-stone-100 text-stone-900 dark:bg-neutral-950 dark:text-neutral-100">
            <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-8 lg:grid lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-8 lg:px-8 lg:py-10">
              <IdentityPanel />
              <main className="mt-4 space-y-4 lg:mt-0">
                <Summary />
                <Experience />
                <Work />
                <Stack />
                <Education />
                <Contact />
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

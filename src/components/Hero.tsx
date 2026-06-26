import { motion } from 'framer-motion'
import { useState, lazy, Suspense } from 'react'
import { ArrowRight, Download } from 'lucide-react'
import { personalInfo } from '../data/portfolio'

const CVViewer = lazy(() => import('./CVViewer'))

export default function Hero() {
  const [showCVViewer, setShowCVViewer] = useState(false)

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden bg-white dark:bg-black flex flex-col"
    >
      <div
        className="relative flex-1 flex items-center justify-center px-6 sm:px-8 min-h-screen"
        style={{ paddingTop: 'calc(var(--header-height, 0px) + 2rem)' }}
      >
        <div className="w-full max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-5 sm:gap-6"
          >
            <img
              src={personalInfo.profileImage}
              alt={personalInfo.name}
              width={112}
              height={112}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-gray-100 dark:ring-neutral-800 shadow-sm"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/96x96/111111/ffffff?text=M'
              }}
            />

            <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500">
              {personalInfo.title}
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black dark:text-white tracking-tight leading-tight">
              {personalInfo.name}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
              {personalInfo.description}
            </p>

            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              {personalInfo.availability}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black text-xs sm:text-sm font-semibold rounded-full hover:opacity-80 transition-opacity"
              >
                Let&apos;s Connect
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowCVViewer(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-gray-300 dark:border-neutral-700 text-black dark:text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors"
              >
                <Download className="w-4 h-4" />
                View Resume
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {showCVViewer && (
        <Suspense fallback={null}>
          <CVViewer isOpen={showCVViewer} onClose={() => setShowCVViewer(false)} />
        </Suspense>
      )}
    </section>
  )
}

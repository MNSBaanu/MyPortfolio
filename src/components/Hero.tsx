import { motion } from 'framer-motion'
import { useState, useEffect, lazy, Suspense } from 'react'

const CVViewer = lazy(() => import('./CVViewer'))

const TAGLINE = 'Building bold solutions\nwith thoughtful engineering.'

const SERVICES = [
  'Full-Stack Development',
  'UI / UX Engineering',
  'API & Backend Design',
  'Mobile Development',
]

export default function Hero() {
  const [showCVViewer, setShowCVViewer] = useState(false)
  const [activeService, setActiveService] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActiveService(s => (s + 1) % SERVICES.length), 2400)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden bg-white dark:bg-black flex flex-col"
    >
      <div
        className="relative flex-1 flex items-center px-6 sm:px-10 lg:px-16 pb-24 min-h-screen"
        style={{ paddingTop: 'calc(var(--header-height, 0px) + 1.5rem)' }}
      >
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-5"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 flex items-center gap-2">
              <span className="w-5 h-px bg-gray-300 dark:bg-gray-600" />
              Software Engineer
            </p>

            <h2
              className="font-semibold text-black dark:text-white leading-snug whitespace-pre-line"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}
            >
              {TAGLINE}
            </h2>

            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
              Full-stack developer crafting end-to-end solutions. Passionate about scalable apps and leveraging AI to solve real-world problems.
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Open for Opportunities · Kandy, Sri Lanka
            </div>

            <div className="flex flex-wrap gap-3 pt-1 lg:hidden">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-xs font-semibold rounded-full hover:opacity-80 transition-opacity"
              >
                Let's Connect
              </button>
              <button
                onClick={() => setShowCVViewer(true)}
                className="px-5 py-2.5 border border-gray-300 dark:border-neutral-700 text-black dark:text-white text-xs font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors"
              >
                View Resume
              </button>
            </div>
          </motion.div>

          {/* Services + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-6 lg:items-end lg:text-right"
          >
            <div className="flex flex-col gap-2">
              {SERVICES.map((s, i) => (
                <p
                  key={s}
                  className={`text-sm sm:text-base transition-all duration-500 cursor-default ${
                    i === activeService
                      ? 'text-black dark:text-white font-semibold'
                      : 'text-gray-300 dark:text-neutral-700 font-normal'
                  }`}
                >
                  {s}
                </p>
              ))}
            </div>

            <div className="w-8 h-px bg-gray-200 dark:bg-neutral-700 lg:ml-auto" />

            <div className="flex flex-col gap-3 lg:items-end">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="hidden lg:flex items-center gap-2 text-sm font-semibold text-black dark:text-white hover:opacity-60 transition-opacity"
              >
                <span className="text-gray-400 dark:text-gray-500 font-mono text-xs">{'// '}</span>
                HIRE ME
                <span className="text-base">→</span>
              </button>

              <div className="hidden lg:flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Open for Opportunities
              </div>

              <button
                onClick={() => setShowCVViewer(true)}
                className="hidden lg:inline-flex px-5 py-2 border border-gray-200 dark:border-neutral-700 text-black dark:text-white text-xs font-medium rounded-full hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors"
              >
                View Resume
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {SERVICES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveService(i)}
            aria-label={`Service ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === activeService ? 'w-6 bg-black dark:bg-white' : 'w-1.5 bg-gray-300 dark:bg-neutral-600'}`}
          />
        ))}
      </div>

      {showCVViewer && (
        <Suspense fallback={null}>
          <CVViewer isOpen={showCVViewer} onClose={() => setShowCVViewer(false)} />
        </Suspense>
      )}
    </section>
  )
}

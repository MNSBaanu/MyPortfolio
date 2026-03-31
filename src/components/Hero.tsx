import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import CVViewer from './CVViewer'

const taglines = [
  { role: 'Characters', name: 'Aspiring Software', sub: 'Engineer', desc: 'Full-stack developer crafting end-to-end solutions. Passionate about building scalable applications and leveraging AI to solve real-world problems.' },
  { role: 'Developer', name: 'Full-Stack', sub: 'Developer', desc: 'Building robust web applications from database to UI. Experienced with React, Node.js, and modern cloud infrastructure.' },
  { role: 'Enthusiast', name: 'AI & Tech', sub: 'Enthusiast', desc: 'Exploring the intersection of artificial intelligence and software engineering to create intelligent, impactful solutions.' },
  { role: 'Student', name: 'Software Eng.', sub: 'Student', desc: 'Pursuing BEng (Hons) in Software Engineering, continuously learning and growing through real-world projects.' },
]

const Hero = () => {
  const [showCVViewer, setShowCVViewer] = useState(false)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % taglines.length), 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden bg-white dark:bg-black flex flex-col"
    >
      <div className="relative flex-1 flex flex-col items-center justify-start pt-24 pb-8 min-h-screen">

        {/* Role label */}
        <motion.p
          key={current + '-role'}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2 z-10 relative"
        >
          <span className="w-4 h-px bg-gray-400 dark:bg-gray-500 inline-block" />
          {taglines[current].role}
        </motion.p>

        {/* Foreground title — above image */}
        <motion.h1
          key={current + '-name'}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-semibold uppercase leading-none tracking-tight text-black dark:text-white text-center relative z-[10]"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)', lineHeight: 1 }}
        >
          {taglines[current].name}
        </motion.h1>

        {/* Ghost subtitle — behind image */}
        <motion.h2
          key={current + '-sub'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-semibold uppercase leading-none tracking-tight text-center relative z-[3] text-gray-200 dark:text-neutral-800"
          style={{ fontSize: 'clamp(1.8rem, 5vw, 4.2rem)', lineHeight: 1 }}
        >
          {taglines[current].sub}
        </motion.h2>

        {/* Image — large, pinned to bottom center */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[5] pointer-events-none">
          <img
            src="/assets/herobg.png"
            alt="MNSBaanu"
            className="w-auto object-contain object-bottom"
            style={{ height: 'clamp(400px, 72vh, 680px)' }}
          />
        </div>

        {/* Left side desc — absolutely positioned left of image */}
        <motion.div
          key={current + '-left'}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute left-6 sm:left-10 lg:left-16 bottom-16 z-[10] max-w-[200px] hidden lg:flex flex-col gap-3"
        >
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            {taglines[current].desc}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Open for Opportunities
          </div>
          <p className="text-[10px] text-gray-400 dark:text-gray-500">Kandy, Sri Lanka</p>
        </motion.div>

        {/* Bottom buttons — right side */}
        <div className="absolute right-6 sm:right-10 lg:right-16 bottom-16 z-[10] flex flex-col gap-2 hidden lg:flex">
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

        {/* Mobile bottom row */}
        <div className="lg:hidden w-full px-6 mt-6 flex flex-col gap-3 relative z-10">
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{taglines[current].desc}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Open for Opportunities · Kandy, Sri Lanka
          </div>
          <div className="flex gap-3">
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
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {taglines.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-black dark:bg-white' : 'w-1.5 bg-gray-300 dark:bg-neutral-600'}`}
          />
        ))}
      </div>

      <CVViewer isOpen={showCVViewer} onClose={() => setShowCVViewer(false)} />
    </section>
  )
}

export default Hero

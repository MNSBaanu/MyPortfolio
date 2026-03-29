import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import CVViewer from './CVViewer'

const taglines = [
  { role: 'Characters', name: 'Aspiring Software Engineer', desc: 'Full-stack developer crafting end-to-end solutions. Passionate about building scalable applications and leveraging AI to solve real-world problems.' },
  { role: 'Developer', name: 'Full-Stack Developer', desc: 'Building robust web applications from database to UI. Experienced with React, Node.js, and modern cloud infrastructure.' },
  { role: 'Enthusiast', name: 'AI & Tech Enthusiast', desc: 'Exploring the intersection of artificial intelligence and software engineering to create intelligent, impactful solutions.' },
  { role: 'Student', name: 'Software Engineering Student', desc: 'Pursuing BEng (Hons) in Software Engineering, continuously learning and growing through real-world projects.' },
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
      className="min-h-screen relative overflow-hidden bg-white dark:bg-black flex items-center"
    >
      {/* ── Layer 1: giant title text — behind everything ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
        <motion.h1
          key={current + '-bg'}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center font-black uppercase leading-none tracking-tighter select-none text-black/[0.06] dark:text-white/[0.06]"
          style={{ fontSize: 'clamp(4rem, 12vw, 10rem)', whiteSpace: 'nowrap' }}
        >
          {taglines[current].name}
        </motion.h1>
      </div>

      {/* ── Layer 2: herobg image — centered, above title text ── */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-[2]">
        <img
          src="/assets/herobg.png"
          alt=""
          aria-hidden="true"
          className="h-[90%] w-auto object-contain object-bottom"
        />
      </div>

      {/* ── Layer 3: content — above image ── */}
      <div className="relative z-[10] w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-10 min-h-screen flex flex-col justify-center">

        {/* Left content block */}
        <div className="w-full lg:w-[45%] flex flex-col gap-4 lg:gap-6">

          <motion.p
            key={current + '-role'}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 flex items-center gap-2"
          >
            <span className="w-4 h-px bg-gray-400 dark:bg-gray-500 inline-block" />
            {taglines[current].role}
          </motion.p>

          <motion.h2
            key={current + '-name'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-tight tracking-tight text-black dark:text-white"
          >
            {taglines[current].name}
          </motion.h2>

          <motion.p
            key={current + '-desc'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm"
          >
            {taglines[current].desc}
          </motion.p>

          <div className="flex flex-wrap gap-3 mt-1">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 bg-black dark:bg-white text-white dark:text-black text-xs sm:text-sm font-semibold rounded-full hover:opacity-80 transition-opacity duration-200"
            >
              Let's Connect
            </button>
            <button
              onClick={() => setShowCVViewer(true)}
              className="px-5 sm:px-6 py-2 sm:py-2.5 border border-gray-300 dark:border-neutral-700 text-black dark:text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors duration-200"
            >
              View Resume
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Open for Opportunities · Kandy, Sri Lanka
          </motion.div>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
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

import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolio'
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

  const next = () => setCurrent((c) => (c + 1) % taglines.length)

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [])





  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden bg-white dark:bg-black flex items-center"
    >
      {/* === Layer 1 — back card === */}
      <motion.div
        className="absolute inset-y-0 right-0 w-[55%] hidden lg:block pointer-events-none z-[1]"
        style={{
          clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)',
          filter: 'drop-shadow(-8px 0px 12px rgba(0,0,0,0.18))',
        }}
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <div className="dark:hidden w-full h-full bg-slate-200/70 backdrop-blur-sm" />
        <div className="hidden dark:block w-full h-full bg-neutral-800" />
      </motion.div>

      {/* === Layer 2 — mid card === */}
      <motion.div
        className="absolute inset-y-0 right-0 w-[42%] hidden lg:block pointer-events-none z-[2]"
        style={{
          clipPath: 'polygon(16% 0%, 100% 0%, 100% 100%, 0% 100%)',
          filter: 'drop-shadow(-12px 0px 18px rgba(0,0,0,0.28))',
        }}
        initial={{ x: 180, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      >
        <div className="dark:hidden w-full h-full bg-slate-400/60 backdrop-blur-md" />
        <div className="hidden dark:block w-full h-full bg-neutral-900" />
      </motion.div>

      {/* === Layer 3 — front card === */}
      <motion.div
        className="absolute inset-y-0 right-0 w-[28%] hidden lg:block pointer-events-none z-[3]"
        style={{
          clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)',
          filter: 'drop-shadow(-16px 0px 24px rgba(0,0,0,0.45))',
        }}
        initial={{ x: 240, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      >
        <div className="dark:hidden w-full h-full bg-[#1e293b]" />
        <div className="hidden dark:block w-full h-full bg-neutral-950" />
      </motion.div>

      {/* === Gradient overlay === */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[4]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <div className="dark:hidden absolute inset-0" style={{ background: 'linear-gradient(to left, transparent 28%, #e2e8f0 55%, #cbd5e1 70%, transparent 100%)' }} />
        <div className="hidden dark:block absolute inset-0" style={{ background: 'linear-gradient(to left, transparent 28%, #171717 50%, #262626 68%, transparent 100%)' }} />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-12 flex flex-col lg:flex-row items-center gap-10 lg:gap-0 min-h-screen">

        {/* Left: Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 lg:pr-10">

          <motion.p
            key={current + '-role'}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 flex items-center gap-2"
          >
            <span className="w-4 h-px bg-gray-400 dark:bg-gray-500 inline-block"></span>
            {taglines[current].role}
          </motion.p>

          <motion.h1
            key={current + '-name'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-tight tracking-tight text-black dark:text-white"
          >
            {taglines[current].name}
          </motion.h1>

          <motion.p
            key={current + '-desc'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm"
          >
            {taglines[current].desc}
          </motion.p>


          <div className="flex flex-wrap gap-3 mt-2">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-full hover:opacity-80 transition-opacity duration-200"
            >
              Let's Connect
            </button>
            <button
              onClick={() => setShowCVViewer(true)}
              className="px-6 py-2.5 border border-gray-300 dark:border-neutral-700 text-black dark:text-white text-sm font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors duration-200"
            >
              View Resume
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Open for Opportunities · Kandy, Sri Lanka
          </motion.div>
        </div>

        {/* Right: Profile image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
          className="absolute inset-y-0 right-0 w-[52%] hidden lg:flex items-end justify-center z-[6] pointer-events-none"
        >
          <img
            src={personalInfo.profileImage}
            alt={personalInfo.name}
            className="h-[78%] w-auto object-cover object-top"
            style={{ marginRight: '22%' }}
          />
        </motion.div>

        {/* Mobile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="lg:hidden flex justify-center w-full"
        >
          <img
            src={personalInfo.profileImage}
            alt={personalInfo.name}
            className="w-64 sm:w-72 h-80 sm:h-96 object-cover object-top rounded-2xl"
          />
        </motion.div>



        {/* Slide dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {taglines.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-black dark:bg-white' : 'w-1.5 bg-gray-300 dark:bg-neutral-600'}`}
            />
          ))}
        </div>
      </div>

      <CVViewer isOpen={showCVViewer} onClose={() => setShowCVViewer(false)} />
    </section>
  )
}

export default Hero

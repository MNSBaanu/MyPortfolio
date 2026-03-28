import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { personalInfo } from '../data/portfolio'
import { useState, useEffect, useRef } from 'react'
import CVViewer from './CVViewer'
import { ChevronDown } from 'lucide-react'

const taglines = [
  { role: 'Characters', name: 'Aspiring Software Engineer', desc: 'Full-stack developer crafting end-to-end solutions. Passionate about building scalable applications and leveraging AI to solve real-world problems.' },
  { role: 'Developer', name: 'Full-Stack Developer', desc: 'Building robust web applications from database to UI. Experienced with React, Node.js, and modern cloud infrastructure.' },
  { role: 'Enthusiast', name: 'AI & Tech Enthusiast', desc: 'Exploring the intersection of artificial intelligence and software engineering to create intelligent, impactful solutions.' },
  { role: 'Student', name: 'Software Engineering Student', desc: 'Pursuing BEng (Hons) in Software Engineering, continuously learning and growing through real-world projects.' },
]

const Hero = () => {
  const [showCVViewer, setShowCVViewer] = useState(false)
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const next = () => setCurrent((c) => (c + 1) % taglines.length)

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [])

  // ── Scroll-driven parallax ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -80])
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -140])
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const imageY  = useTransform(scrollYProgress, [0, 1], [0, -60])
  const textY   = useTransform(scrollYProgress, [0, 1], [0, -40])
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  // ── Mouse-tracking tilt ──
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 80, damping: 20, mass: 0.5 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen relative overflow-hidden bg-white dark:bg-black flex items-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── 3D tilt wrapper for right-side panels + image ── */}
      <motion.div
        className="absolute inset-0 hidden lg:block pointer-events-none"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1200 }}
      >
        {/* === Layer 1 — back card === */}
        <motion.div
          className="absolute inset-y-0 right-0 w-[55%] z-[1]"
          style={{
            y: layer1Y,
            clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)',
            filter: 'drop-shadow(-8px 0px 12px rgba(0,0,0,0.18))',
          }}
        >
          <div className="dark:hidden w-full h-full bg-slate-200/70 backdrop-blur-sm" />
          <div className="hidden dark:block w-full h-full bg-neutral-800" />
        </motion.div>

        {/* === Layer 2 — mid card === */}
        <motion.div
          className="absolute inset-y-0 right-0 w-[42%] z-[2]"
          style={{
            y: layer2Y,
            clipPath: 'polygon(16% 0%, 100% 0%, 100% 100%, 0% 100%)',
            filter: 'drop-shadow(-12px 0px 18px rgba(0,0,0,0.28))',
          }}
        >
          <div className="dark:hidden w-full h-full bg-slate-400/60 backdrop-blur-md" />
          <div className="hidden dark:block w-full h-full bg-neutral-900" />
        </motion.div>

        {/* === Layer 3 — front card === */}
        <motion.div
          className="absolute inset-y-0 right-0 w-[28%] z-[3]"
          style={{
            y: layer3Y,
            clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)',
            filter: 'drop-shadow(-16px 0px 24px rgba(0,0,0,0.45))',
          }}
        >
          <div className="dark:hidden w-full h-full bg-[#1e293b]" />
          <div className="hidden dark:block w-full h-full bg-neutral-950" />
        </motion.div>

        {/* === Profile image with parallax === */}
        <motion.div
          className="absolute inset-y-0 right-0 w-[52%] flex items-end justify-center z-[20]"
          style={{ y: imageY }}
        >
          <img
            src={personalInfo.profileImage}
            alt={personalInfo.name}
            className="h-[78%] w-auto object-cover object-top"
            style={{ marginRight: '22%' }}
          />
        </motion.div>
      </motion.div>



      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-10 flex flex-col lg:flex-row items-center lg:gap-0 min-h-screen">

        {/* Mobile: image on top (no parallax on mobile) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:hidden flex justify-center w-full pt-4 pb-6"
        >
          <img
            src={personalInfo.profileImage}
            alt={personalInfo.name}
            className="w-48 xs:w-56 sm:w-64 h-60 xs:h-72 sm:h-80 object-cover object-top"
          />
        </motion.div>

        {/* Left: Content with scroll parallax */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col justify-center gap-4 lg:gap-6 lg:pr-10"
          style={{ y: textY }}
        >
          <motion.p
            key={current + '-role'}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 flex items-center gap-2"
          >
            <span className="w-4 h-px bg-gray-400 dark:bg-gray-500 inline-block"></span>
            {taglines[current].role}
          </motion.p>

          <motion.h1
            key={current + '-name'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-tight tracking-tight text-black dark:text-white"
          >
            {taglines[current].name}
          </motion.h1>

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
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Open for Opportunities · Kandy, Sri Lanka
          </motion.div>
        </motion.div>
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

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-20 sm:bottom-24 right-8 sm:right-12 z-20 hidden sm:flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500"
          style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500" />
        </motion.div>
      </motion.div>

      <CVViewer isOpen={showCVViewer} onClose={() => setShowCVViewer(false)} />
    </section>
  )
}

export default Hero

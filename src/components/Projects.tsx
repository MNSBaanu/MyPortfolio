import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react'
import { projects } from '../data/portfolio'
import { useState, useEffect, useRef, useCallback } from 'react'

const SLIDE_DURATION = 4000

function ProjectRibbon({ type }: { type: 'academic' | 'personal' }) {
  const isAcademic = type === 'academic'
  return (
    <div className="absolute top-0 right-0 w-28 h-28 overflow-hidden rounded-tr-2xl pointer-events-none z-10">
      <div
        className="absolute flex items-center justify-center text-[8px] font-black uppercase tracking-widest"
        style={{
          width: '140px', padding: '5px 0',
          background: isAcademic
            ? 'linear-gradient(180deg,#1a1a1a 0%,#000 40%,#111 60%,#1a1a1a 100%)'
            : 'linear-gradient(180deg,#fff 0%,#e8e8e8 40%,#d4d4d4 60%,#fff 100%)',
          color: isAcademic ? '#fff' : '#111',
          boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
          top: '24px', right: '-32px',
          transform: 'rotate(45deg)', transformOrigin: 'center',
        }}
      >
        {isAcademic ? 'Academic' : 'Personal'}
      </div>
    </div>
  )
}

// A single project panel used in the two-up desktop layout
function ProjectPanel({ projectIdx }: { projectIdx: number }) {
  const [activeImage, setActiveImage] = useState(0)
  const [imgDirection, setImgDirection] = useState(1)
  const [clickedProject, setClickedProject] = useState(false)
  const startTimeRef = useRef<number>(Date.now())
  const rafRef = useRef<number>(0)

  const project = projects[projectIdx]
  const allImages = project.images

  useEffect(() => {
    setActiveImage(0)
    startTimeRef.current = Date.now()
  }, [projectIdx])

  const advanceImage = useCallback(() => {
    setImgDirection(1)
    setActiveImage(prev => {
      const next = prev < allImages.length - 1 ? prev + 1 : 0
      startTimeRef.current = Date.now()
      return next
    })
  }, [allImages.length])

  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current
      if (elapsed >= SLIDE_DURATION) {
        advanceImage()
      } else {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [projectIdx, activeImage, advanceImage])

  const goToImage = (idx: number) => {
    setImgDirection(idx > activeImage ? 1 : -1)
    setActiveImage(idx)
    startTimeRef.current = Date.now()
  }

  return (
    <div className="relative flex-1 min-w-0 rounded-2xl overflow-hidden bg-black shadow-xl">
      <AnimatePresence mode="sync" custom={imgDirection}>
        <motion.img
          key={`${projectIdx}-${activeImage}`}
          custom={imgDirection}
          variants={{
            enter: (d: number) => ({ opacity: 0, x: d * 40 }),
            center: { opacity: 1, x: 0 },
            exit: (d: number) => ({ opacity: 0, x: d * -40 }),
          }}
          initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          src={allImages[activeImage]}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.currentTarget.src = `https://placehold.co/800x500/103257/ffffff?text=${encodeURIComponent(project.title)}` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

      {project.academic
        ? <ProjectRibbon type="academic" />
        : (project as any).badge === 'Personal' && <ProjectRibbon type="personal" />
      }

      {/* Top-right actions */}
      <div className="absolute top-3 right-3 flex gap-1.5 z-10">
        <button
          onClick={() => { setClickedProject(true); setTimeout(() => setClickedProject(false), 2500) }}
          className="flex items-center gap-1 px-2.5 py-1 bg-white/90 text-black text-[10px] font-bold rounded-full hover:bg-white transition-colors backdrop-blur-sm"
        >
          <ExternalLink className="w-2.5 h-2.5" /> Live
        </button>
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 py-1 bg-black/50 border border-white/20 text-white text-[10px] font-bold rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm"
        >
          <Github className="w-2.5 h-2.5" /> Code
        </a>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
        <p className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-0.5">{project.period}</p>
        <h3 className="text-base font-black text-white mb-1 leading-tight">{project.title}</h3>
        <p className="text-xs text-white/65 leading-relaxed line-clamp-2 mb-2">{project.description}</p>
        <div className="flex flex-wrap gap-1">
          {project.tech.slice(0, 4).map((t, i) => (
            <span key={i} className="px-1.5 py-0.5 bg-white/10 border border-white/20 text-white/80 rounded text-[8px] font-bold uppercase">{t}</span>
          ))}
        </div>
      </div>

      {/* Image dots */}
      {allImages.length > 1 && (
        <div className="absolute bottom-3 right-3 flex gap-1 z-10 pointer-events-auto">
          {allImages.map((_, i) => (
            <button key={i} onClick={() => goToImage(i)}
              className={`h-1 rounded-full transition-all duration-300 ${i === activeImage ? 'w-4 bg-white' : 'w-1 bg-white/40'}`}
            />
          ))}
        </div>
      )}

      {/* Coming soon */}
      <AnimatePresence>
        {clickedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 backdrop-blur-md bg-black/70 flex items-center justify-center z-20">
            <div className="text-center">
              <p className="text-white font-bold">Coming Soon</p>
              <p className="text-white/60 text-xs mt-1">Live demo will be available soon</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Projects() {
  // Left panel shows activeProject, right panel shows activeProject+1
  const [activeProject, setActiveProject] = useState(0)
  const thumbStripRef = useRef<HTMLDivElement>(null)

  const leftIdx = activeProject
  const rightIdx = (activeProject + 1) % projects.length

  const goToProject = (idx: number) => setActiveProject(idx)

  const scrollThumbs = (dir: 'left' | 'right') => {
    thumbStripRef.current?.scrollBy({ left: dir === 'right' ? 220 : -220, behavior: 'smooth' })
  }

  return (
    <div
      className="box-border bg-gray-50 dark:bg-black relative z-10 rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800"
      style={{ height: '100vh', paddingTop: 'calc(var(--header-height, 0px) + 1.5rem)', paddingBottom: '1.5rem' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 h-full flex flex-col">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mb-5 flex-shrink-0"
        >
          <h2 className="font-bold text-black dark:text-gray-100 mb-3 tracking-tight"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#103257] to-[#0d4a6b]" />
        </motion.div>

        {/* ── DESKTOP ── */}
        <div className="hidden lg:flex flex-col flex-1 min-h-0">

          {/* Two project panels side by side */}
          <div className="flex gap-3 flex-1 min-h-0">
            <ProjectPanel projectIdx={leftIdx} />
            <ProjectPanel projectIdx={rightIdx} />
          </div>

          {/* Thumbnail strip */}
          <div className="flex items-center gap-2 mt-3 flex-shrink-0">
            <button onClick={() => scrollThumbs('left')}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors shadow-sm">
              <ChevronLeft className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
            </button>

            <div ref={thumbStripRef} className="flex gap-2 overflow-x-auto flex-1 no-scrollbar"
              style={{ scrollSnapType: 'x mandatory' }}>
              {projects.map((p, idx) => (
                <button key={idx} onClick={() => goToProject(idx)}
                  className="flex-shrink-0 relative rounded-lg overflow-hidden"
                  style={{
                    width: 110, height: 68,
                    scrollSnapAlign: 'start',
                    outline: (idx === leftIdx || idx === rightIdx) ? '2px solid #103257' : '2px solid transparent',
                    outlineOffset: '2px',
                    opacity: (idx === leftIdx || idx === rightIdx) ? 1 : 0.55,
                    transform: (idx === leftIdx || idx === rightIdx) ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.2s ease, opacity 0.2s ease',
                  }}
                >
                  <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = `https://placehold.co/110x68/103257/ffffff?text=${encodeURIComponent(p.title)}` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                  <p className="absolute bottom-1 left-1.5 right-1.5 text-white text-[7px] font-black uppercase tracking-wide leading-tight line-clamp-1">
                    {p.title}
                  </p>
                </button>
              ))}
            </div>

            <button onClick={() => scrollThumbs('right')}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors shadow-sm">
              <ChevronRight className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* ── MOBILE ── */}
        <div className="lg:hidden flex flex-col gap-4 overflow-y-auto">
          {projects.map((p, index) => (
            <motion.div key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950"
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = `https://placehold.co/600x338/103257/ffffff?text=${encodeURIComponent(p.title)}` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {p.academic ? <ProjectRibbon type="academic" /> : (p as any).badge === 'Personal' && <ProjectRibbon type="personal" />}
                <div className="absolute bottom-3 left-3">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/60">{p.period}</p>
                  <h3 className="text-base font-black text-white">{p.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-600 dark:text-neutral-300 leading-relaxed mb-3 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {p.tech.slice(0, 4).map((t, i) => (
                    <span key={i} className="px-1.5 py-px bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-neutral-300 rounded text-[8px] font-bold uppercase">{t}</span>
                  ))}
                </div>
                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black text-[11px] font-bold rounded-full">
                  <Github className="w-3 h-3" /> Code
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}

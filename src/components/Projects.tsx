import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { projects } from '../data/portfolio'
import { useState, useEffect } from 'react'

// Full corner-to-corner diagonal ribbon
function ProjectRibbon({ type }: { type: 'academic' | 'personal' }) {
  const isAcademic = type === 'academic'
  return (
    <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden rounded-tr-3xl pointer-events-none z-10">
      <div
        className="absolute flex items-center justify-center text-[9px] font-black uppercase tracking-widest"
        style={{
          width: '160px',
          padding: '6px 0',
          background: isAcademic
            ? 'linear-gradient(180deg, #1a1a1a 0%, #000000 40%, #111111 60%, #1a1a1a 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #e8e8e8 40%, #d4d4d4 60%, #ffffff 100%)',
          color: isAcademic ? '#ffffff' : '#111111',
          boxShadow: '0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
          top: '28px',
          right: '-36px',
          transform: 'rotate(45deg)',
          transformOrigin: 'center',
        }}
      >
        {isAcademic ? 'Academic' : 'Personal'}
        <span className="absolute left-0 top-0 bottom-0 w-3"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.3), transparent)' }} />
        <span className="absolute right-0 top-0 bottom-0 w-3"
          style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.3), transparent)' }} />
      </div>
    </div>
  )
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number>(0)
  const [clickedProject, setClickedProject] = useState<string | null>(null)
  const [imageIndices, setImageIndices] = useState<number[]>(() => projects.map(() => 0))

  // Auto-cycle images every 3s for projects with multiple images
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndices(prev =>
        prev.map((idx, i) =>
          projects[i].images.length > 1 ? (idx + 1) % projects[i].images.length : idx
        )
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="box-border bg-gray-50 dark:bg-black relative z-10 rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800"
      style={{
        minHeight: '100vh',
        paddingTop: 'calc(var(--header-height, 0px) + 3rem)',
        paddingBottom: '3rem',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 flex flex-col h-full">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="font-bold text-black dark:text-gray-100 mb-4 tracking-tight"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#103257] to-[#0d4a6b]" />
        </motion.div>

        {/* ── DESKTOP: hover-expand accordion ── */}
        <div className="hidden lg:flex items-stretch gap-2 h-[480px]">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="relative cursor-pointer overflow-hidden rounded-3xl flex-shrink-0"
              animate={{
                width: activeProject === index ? '420px' : '72px',
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              onHoverStart={() => setActiveProject(index)}
              onClick={() => setActiveProject(index)}
            >
              {/* Background image — card stack: new image slides up from below */}
              <AnimatePresence>
                <motion.img
                  key={imageIndices[index]}
                  src={project.images[imageIndices[index]]}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ y: '100%', scale: 1.05 }}
                  animate={{ y: '0%', scale: 1 }}
                  exit={{ y: '-8%', scale: 0.96, opacity: 0.6 }}
                  transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/600x480/103257/ffffff?text=${encodeURIComponent(project.title)}`
                  }}
                />
              </AnimatePresence>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Ribbon */}
              {project.academic
                ? <ProjectRibbon type="academic" />
                : (project as any).badge === 'Personal' && <ProjectRibbon type="personal" />
              }

              {/* Gradient overlay on active */}
              <AnimatePresence>
                {activeProject === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                  />
                )}
              </AnimatePresence>

              {/* Collapsed: rotated title */}
              <AnimatePresence>
                {activeProject !== index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <p className="text-white text-xs font-bold uppercase tracking-widest whitespace-nowrap"
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                      {project.title}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expanded: content */}
              <AnimatePresence>
                {activeProject === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, delay: 0.15 }}
                    className="absolute bottom-0 left-0 right-0 p-5"
                  >
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">{project.period}</p>
                    <h3 className="text-xl font-black text-white mb-2 leading-tight">{project.title}</h3>
                    <p className="text-xs text-white/70 leading-relaxed mb-3 line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tech.slice(0, 4).map((t, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white/10 border border-white/20 text-white/80 rounded text-[9px] font-bold uppercase">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setClickedProject(project.title)
                          setTimeout(() => setClickedProject(null), 2500)
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black text-[11px] font-bold rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Live
                      </button>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/20 text-white text-[11px] font-bold rounded-full hover:bg-white/20 transition-colors"
                      >
                        <Github className="w-3 h-3" />
                        Code
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Coming soon overlay */}
              <AnimatePresence>
                {clickedProject === project.title && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 backdrop-blur-md bg-black/70 flex items-center justify-center z-20 rounded-3xl"
                  >
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">Coming Soon</p>
                      <p className="text-white/60 text-xs mt-1">Live demo will be available soon</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* ── MOBILE: vertical cards ── */}
        <div className="lg:hidden flex flex-col gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950"
            >
              <div className="relative h-40 overflow-hidden" style={{ isolation: 'isolate' }}>
                <AnimatePresence>
                  <motion.img
                    key={imageIndices[index]}
                    src={project.images[imageIndices[index]]}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ y: '100%', scale: 1.05 }}
                    animate={{ y: '0%', scale: 1 }}
                    exit={{ y: '-8%', scale: 0.96, opacity: 0.6 }}
                    transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/600x400/103257/ffffff?text=${encodeURIComponent(project.title)}`
                    }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {project.academic
                  ? <ProjectRibbon type="academic" />
                  : (project as any).badge === 'Personal' && <ProjectRibbon type="personal" />
                }
                <div className="absolute bottom-3 left-3">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/60">{project.period}</p>
                  <h3 className="text-base font-black text-white">{project.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-600 dark:text-neutral-300 leading-relaxed mb-3 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tech.slice(0, 4).map((t, i) => (
                    <span key={i} className="px-1.5 py-px bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-neutral-300 rounded text-[8px] font-bold uppercase">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black text-[11px] font-bold rounded-full">
                    <Github className="w-3 h-3" /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}

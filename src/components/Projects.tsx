import { ExternalLink, Github, X } from 'lucide-react'
import { projects } from '../data/portfolio'
import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'

const SLIDE_DURATION = 4000

// ── 3D tilt panel ──
function ProjectPanel({ projectIdx, onClick }: { projectIdx: number; onClick: () => void }) {
  const [activeImage, setActiveImage] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const startTimeRef = useRef<number>(Date.now())
  const rafRef = useRef<number>(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const project = projects[projectIdx]
  const allImages = project.images

  useEffect(() => { setActiveImage(0); startTimeRef.current = Date.now() }, [projectIdx])

  const advanceImage = useCallback(() => {
    setActiveImage(prev => { const n = prev < allImages.length - 1 ? prev + 1 : 0; startTimeRef.current = Date.now(); return n })
  }, [allImages.length])

  useEffect(() => {
    const tick = () => { if (Date.now() - startTimeRef.current >= SLIDE_DURATION) advanceImage(); else rafRef.current = requestAnimationFrame(tick) }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [projectIdx, activeImage, advanceImage])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setTilt({ x: ((e.clientY - rect.top) / rect.height - 0.5) * -12, y: ((e.clientX - rect.left) / rect.width - 0.5) * 12 })
  }

  return (
    <div
      ref={cardRef}
      className="relative flex-1 min-w-0 rounded-2xl overflow-hidden bg-black cursor-pointer"
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.03 : 1})`,
        transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s cubic-bezier(0.25,0.8,0.25,1)',
        boxShadow: hovered ? '0 28px 56px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.18)',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
      onClick={onClick}
    >
      <img src={allImages[activeImage]} alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => { e.currentTarget.src = `https://placehold.co/800x500/111111/ffffff?text=${encodeURIComponent(project.title)}` }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.5) 45%,transparent 100%)', opacity: hovered ? 1 : 0, transition: 'opacity 0.35s ease' }} />
      <div className="absolute top-3 right-3 flex gap-1.5 z-10" style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: hovered ? 'auto' : 'none' }}>
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="flex items-center gap-1 px-2.5 py-1 bg-black/60 border border-white/20 text-white text-[10px] font-bold rounded-full hover:bg-black/80 transition-colors backdrop-blur-sm">
          <Github className="w-2.5 h-2.5" /> Code
        </a>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10" style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(12px)', transition: 'opacity 0.35s ease, transform 0.35s ease', pointerEvents: 'none' }}>
        <p className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-0.5">{project.period}</p>
        <h3 className="text-sm font-medium text-white mb-1 leading-tight">{project.title}</h3>
        <p className="text-[10px] text-white/70 leading-relaxed line-clamp-2 mb-2">{project.description}</p>
        <div className="flex flex-wrap gap-1">
          {project.tech.slice(0, 4).map((t, i) => (
            <span key={i} className="px-1.5 py-0.5 bg-white/10 border border-white/20 text-white/80 rounded text-[8px] font-bold uppercase">{t}</span>
          ))}
        </div>
      </div>
      {allImages.length > 1 && (
        <div className="absolute bottom-3 right-3 flex gap-1 z-10" style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease' }}>
          {allImages.map((_, i) => (
            <button key={i} onClick={e => { e.stopPropagation(); setActiveImage(i); startTimeRef.current = Date.now() }}
              className={`h-1 rounded-full transition-all duration-300 ${i === activeImage ? 'w-4 bg-white' : 'w-1 bg-white/40'}`} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Project detail content (shared between both modal modes) ──
function ProjectDetail({ idx, onClose }: { idx: number; onClose: () => void }) {
  const project = projects[idx]
  const [clickedLive, setClickedLive] = useState(false)

  return (
    <>
      {/* Top bar */}
      <div className="flex items-start justify-between gap-4 px-8 pt-7 pb-5 border-b border-gray-100 dark:border-neutral-800 flex-shrink-0">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-semibold text-black dark:text-white leading-tight mb-2">{project.title}</h2>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${project.academic ? 'bg-gray-400' : 'bg-green-500'}`} />
              {project.academic ? 'Academic Project' : 'Personal Project'}
            </span>
            <span className="text-gray-300 dark:text-neutral-600 text-xs">·</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">{project.period}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={() => { setClickedLive(true); setTimeout(() => setClickedLive(false), 2500) }}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded-full hover:opacity-80 transition-opacity">
            <ExternalLink className="w-3.5 h-3.5" />
            {clickedLive ? 'Coming Soon' : 'Live Demo'}
          </button>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-5 py-2.5 border border-gray-200 dark:border-neutral-700 text-black dark:text-white text-xs font-bold rounded-full hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors">
            <Github className="w-3.5 h-3.5" /> GitHub
          </a>
          <button onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors ml-1">
            <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">
        <div className="flex-1 min-w-0 px-8 py-7 space-y-6 overflow-y-auto">
          {project.images.map((img, i) => (
            <div key={i} className="w-full rounded-2xl overflow-hidden bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
              <img src={img} alt={`${project.title} screenshot ${i + 1}`} className="w-full h-auto block"
                onError={(e) => { e.currentTarget.src = `https://placehold.co/900x560/111111/ffffff?text=${encodeURIComponent(project.title)}` }} />
            </div>
          ))}
          <div className="pt-2 pb-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-3">About this project</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">{project.description}</p>
          </div>
        </div>
        <div className="lg:w-60 flex-shrink-0 px-6 py-7 lg:border-l border-t lg:border-t-0 border-gray-100 dark:border-neutral-800 space-y-7 overflow-y-auto">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t, i) => (
                <span key={i} className="px-2.5 py-1 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 rounded-lg text-[10px] font-bold uppercase tracking-wide">{t}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-1.5">Timeline</p>
            <p className="text-sm font-bold text-black dark:text-white">{project.period}</p>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-1.5">Type</p>
            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${project.academic ? 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300' : 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300'}`}>
              {project.academic ? 'Academic' : 'Personal'}
            </span>
          </div>
          <div className="space-y-2">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2">Links</p>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 text-xs font-bold text-black dark:text-white hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors">
              <Github className="w-3.5 h-3.5 flex-shrink-0" /> View on GitHub
            </a>
            <button onClick={() => { setClickedLive(true); setTimeout(() => setClickedLive(false), 2500) }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 text-xs font-bold text-black dark:text-white hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors">
              <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
              {clickedLive ? 'Coming Soon' : 'Live Demo'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// ── Single project modal — bottom sheet ──
function ProjectModal({ projectIdx, onClose }: { projectIdx: number; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [onClose])

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end justify-center"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div
        className="relative bg-white dark:bg-neutral-950 w-full flex flex-col rounded-t-3xl shadow-2xl overflow-hidden"
        style={{ height: '90vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-200 dark:bg-neutral-700" />
        </div>
        <ProjectDetail idx={projectIdx} onClose={onClose} />
      </div>
    </div>,
    document.body
  )
}

// ── Explore all modal — bottom sheet with sidebar ──
function ExploreModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [onClose])

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end justify-center"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div
        className="relative bg-white dark:bg-neutral-950 w-full flex rounded-t-3xl shadow-2xl overflow-hidden"
        style={{ height: '90vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-gray-200 dark:bg-neutral-700 z-10" />

        {/* Left sidebar */}
        <div className="w-56 flex-shrink-0 border-r border-gray-100 dark:border-neutral-800 flex flex-col overflow-hidden pt-8">
          <div className="px-4 py-4 border-b border-gray-100 dark:border-neutral-800 flex-shrink-0">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">All Projects</p>
            <p className="text-xs text-gray-400 dark:text-neutral-600 mt-0.5">{projects.length} total</p>
          </div>
          <div className="overflow-y-auto flex-1 py-2">
            {projects.map((p, i) => (
              <button key={i} onClick={() => setSelected(i)}
                className={`w-full text-left px-4 py-3 transition-colors duration-150 ${
                  selected === i ? 'bg-black dark:bg-white' : 'hover:bg-gray-50 dark:hover:bg-neutral-900'
                }`}>
                <p className={`text-xs font-semibold leading-tight line-clamp-1 ${selected === i ? 'text-white dark:text-black' : 'text-black dark:text-white'}`}>
                  {p.title}
                </p>
                <p className={`text-[10px] mt-0.5 ${selected === i ? 'text-white/60 dark:text-black/60' : 'text-gray-400 dark:text-neutral-600'}`}>
                  {p.period}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Right detail panel */}
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden pt-8">
          <ProjectDetail idx={selected} onClose={onClose} />
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function Projects() {
  const [modalProject, setModalProject] = useState<number | null>(null)
  const [exploreOpen, setExploreOpen] = useState(false)
  const panelIdxs = [0, 1, 2]

  return (
    <div
      className="box-border bg-gray-50 dark:bg-black relative z-10 rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800"
      style={{ height: '100vh', paddingTop: 'calc(var(--header-height, 0px) + 1.5rem)', paddingBottom: '1.5rem' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pr-16 lg:pr-20 h-full flex flex-col">

        <div className="mb-5 flex-shrink-0">
          <h2 className="font-bold text-black dark:text-gray-100 mb-3 tracking-tight" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-black dark:bg-white" />
        </div>

        {/* ── DESKTOP ── */}
        <div className="hidden lg:flex flex-col flex-1 min-h-0">
          <div className="flex gap-3 min-h-0" style={{ height: '360px', perspective: '1200px' }}>
            {panelIdxs.map(i => (
              <ProjectPanel key={i} projectIdx={i} onClick={() => setModalProject(i)} />
            ))}
          </div>

          <div className="flex items-center mt-4 flex-shrink-0">
            <button
              onClick={() => setExploreOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 dark:border-neutral-700 text-black dark:text-white text-xs font-semibold rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
            >
              Explore All Projects
              <span className="text-sm">→</span>
            </button>
            <span className="ml-4 text-xs text-gray-400 dark:text-neutral-600">{projects.length} projects</span>
          </div>
        </div>

        {/* ── MOBILE ── */}
        <div className="lg:hidden flex flex-col gap-4 overflow-y-auto">
          {projects.map((p, index) => (
            <button key={index} onClick={() => setModalProject(index)}
              className="rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-left w-full">
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = `https://placehold.co/600x338/111111/ffffff?text=${encodeURIComponent(p.title)}` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/60">{p.period}</p>
                  <h3 className="text-base font-medium text-white">{p.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-600 dark:text-neutral-300 leading-relaxed mb-3 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1">
                  {p.tech.slice(0, 4).map((t, i) => (
                    <span key={i} className="px-1.5 py-px bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-neutral-300 rounded text-[8px] font-bold uppercase">{t}</span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {modalProject !== null && (
        <ProjectModal projectIdx={modalProject} onClose={() => setModalProject(null)} />
      )}
      {exploreOpen && (
        <ExploreModal onClose={() => setExploreOpen(false)} />
      )}
    </div>
  )
}

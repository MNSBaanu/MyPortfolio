import { ExternalLink, Github, X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import { projects, personalInfo } from '../data/portfolio'
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
        width={800}
        height={500}
        loading="lazy"
        decoding="async"
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

// ── Dribbble-inspired project detail page ──
function ProjectDetailPage({
  idx,
  onClose,
  onNavigate,
  showHeader = true,
}: {
  idx: number
  onClose: () => void
  onNavigate?: (i: number) => void
  showHeader?: boolean
}) {
  const project = projects[idx]
  const [clickedLive, setClickedLive] = useState(false)
  const hasPrev = idx > 0
  const hasNext = idx < projects.length - 1

  return (
    <div className="flex flex-col min-h-full bg-[#f3f3f4] dark:bg-neutral-950">
      {showHeader && (
        <header className="sticky top-0 z-20 border-b border-gray-200/80 dark:border-neutral-800 bg-[#f3f3f4]/90 dark:bg-neutral-950/90 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <p className="text-sm sm:text-base font-semibold text-black dark:text-white truncate text-center flex-1">
              {project.title}
            </p>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full border border-gray-300 dark:border-neutral-700 text-black dark:text-white hover:bg-white dark:hover:bg-neutral-900 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                Code
              </a>
              <button
                onClick={() => {
                  setClickedLive(true)
                  setTimeout(() => setClickedLive(false), 2500)
                }}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-[#ea4c89] text-white hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {clickedLive ? 'Soon' : 'Live'}
              </button>
              <button
                onClick={onClose}
                className="sm:hidden w-9 h-9 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 flex items-center justify-center"
                aria-label="Close project details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>
      )}

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-16">
        {/* Project details at top */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <div className="mt-4 sm:mt-5 flex items-center gap-3 sm:gap-4">
            <img
              src={personalInfo.profileImage}
              alt={personalInfo.name}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-white dark:ring-neutral-800 shadow-sm"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/96x96/111111/ffffff?text=M'
              }}
            />
            <div>
              <p className="text-sm font-semibold text-black dark:text-white">
                {personalInfo.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {personalInfo.title} · {project.period}
              </p>
            </div>
            <span
              className={`ml-auto shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                project.academic
                  ? 'bg-gray-200 dark:bg-neutral-800 text-gray-600 dark:text-gray-300'
                  : 'bg-pink-50 dark:bg-pink-950/50 text-[#ea4c89]'
              }`}
            >
              {project.academic ? 'Academic' : 'Personal'}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white dark:bg-neutral-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-neutral-800"
              >
                {t}
              </span>
            ))}
          </div>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2 sm:hidden">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-neutral-700 text-xs font-semibold text-black dark:text-white"
            >
              <Github className="w-3.5 h-3.5" />
              View Code
            </a>
            <button
              onClick={() => {
                setClickedLive(true)
                setTimeout(() => setClickedLive(false), 2500)
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#ea4c89] text-white text-xs font-semibold"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {clickedLive ? 'Coming Soon' : 'Live Demo'}
            </button>
          </div>

          {onNavigate && (
            <div className="mt-6 pt-5 border-t border-gray-200 dark:border-neutral-800 flex items-center justify-between">
              <button
                onClick={() => hasPrev && onNavigate(idx - 1)}
                disabled={!hasPrev}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <span className="text-xs text-gray-400 dark:text-neutral-500">
                {idx + 1} / {projects.length}
              </span>
              <button
                onClick={() => hasNext && onNavigate(idx + 1)}
                disabled={!hasNext}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Smaller project shots below */}
        <div className="space-y-4 sm:space-y-5 max-w-2xl mx-auto">
          {project.images.map((img, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
            >
              <img
                src={img}
                alt={`${project.title} — shot ${i + 1}`}
                className="w-full h-auto max-h-[280px] sm:max-h-[320px] object-contain object-center bg-gray-50 dark:bg-neutral-900 mx-auto block"
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/800x500/f5f5f5/333333?text=${encodeURIComponent(project.title)}`
                }}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

// ── Single project — full-screen Dribbble-style overlay ──
function ProjectModal({ projectIdx, onClose }: { projectIdx: number; onClose: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(projectIdx)

  useEffect(() => {
    setCurrentIdx(projectIdx)
  }, [projectIdx])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && currentIdx > 0) setCurrentIdx((i) => i - 1)
      if (e.key === 'ArrowRight' && currentIdx < projects.length - 1) setCurrentIdx((i) => i + 1)
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, currentIdx])

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto bg-[#f3f3f4] dark:bg-neutral-950"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <ProjectDetailPage
          idx={currentIdx}
          onClose={onClose}
          onNavigate={setCurrentIdx}
        />
      </div>
    </div>,
    document.body
  )
}

// ── Explore all — sidebar grid + Dribbble detail ──
function ExploreModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex bg-[#f3f3f4] dark:bg-neutral-950">
      <aside className="hidden md:flex w-64 lg:w-72 flex-col border-r border-gray-200 dark:border-neutral-800 bg-white dark:bg-black shrink-0">
        <div className="px-5 py-5 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-black dark:text-white">All Shots</p>
            <p className="text-xs text-gray-400 mt-0.5">{projects.length} projects</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-900 flex items-center justify-center transition-colors"
            aria-label="Close all shots"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {projects.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setSelected(i)}
              className={`w-full text-left rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                selected === i
                  ? 'border-[#ea4c89] shadow-md'
                  : 'border-transparent hover:border-gray-200 dark:hover:border-neutral-800'
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-neutral-900">
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="px-2 py-2 bg-white dark:bg-neutral-950">
                <p className="text-xs font-semibold text-black dark:text-white line-clamp-1">{p.title}</p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <div className="flex-1 min-w-0 overflow-y-auto">
        <div className="md:hidden sticky top-0 z-20 flex items-center justify-between px-4 h-14 border-b border-gray-200 dark:border-neutral-800 bg-[#f3f3f4]/90 dark:bg-neutral-950/90 backdrop-blur">
          <button onClick={onClose} className="text-sm font-medium text-gray-600">Close</button>
          <select
            value={selected}
            onChange={(e) => setSelected(Number(e.target.value))}
            className="text-sm font-semibold bg-transparent text-black dark:text-white"
          >
            {projects.map((p, i) => (
              <option key={p.title} value={i}>{p.title}</option>
            ))}
          </select>
        </div>
        <ProjectDetailPage
          idx={selected}
          onClose={onClose}
          onNavigate={setSelected}
          showHeader={false}
        />
      </div>
    </div>,
    document.body
  )
}

export default function Projects() {
  const [modalProject, setModalProject] = useState<number | null>(null)
  const [exploreOpen, setExploreOpen] = useState(false)
  const [offset, setOffset] = useState(0)

  // Rotate featured panels every 5s
  useEffect(() => {
    const t = setInterval(() => {
      setOffset(o => (o + 1) % projects.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  const panelIdxs = [
    offset % projects.length,
    (offset + 1) % projects.length,
    (offset + 2) % projects.length,
  ]

  return (
    <div
      className="box-border bg-gray-50 dark:bg-black relative z-10 rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800"
      style={{ height: '100vh', paddingTop: 'calc(var(--header-height, 0px) + 1.5rem)', paddingBottom: '1.5rem' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pr-16 lg:pr-20 h-full flex flex-col">

        <div className="mb-5 flex-shrink-0 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-gray-100 mb-4 tracking-tight">
            Featured Projects
          </h2>
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

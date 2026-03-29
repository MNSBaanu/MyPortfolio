import { ExternalLink, Github, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { projects } from '../data/portfolio'
import { useState, useEffect, useRef, useCallback } from 'react'

const SLIDE_DURATION = 4000

// ── 3D tilt gallery panel (top 3) ──
function ProjectPanel({ projectIdx }: { projectIdx: number }) {
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
      className="relative flex-1 min-w-0 rounded-2xl overflow-hidden bg-black"
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.03 : 1})`,
        transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s cubic-bezier(0.25,0.8,0.25,1)',
        boxShadow: hovered ? '0 28px 56px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.18)',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
    >
      <img src={allImages[activeImage]} alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => { e.currentTarget.src = `https://placehold.co/800x500/103257/ffffff?text=${encodeURIComponent(project.title)}` }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.5) 45%,transparent 100%)', opacity: hovered ? 1 : 0, transition: 'opacity 0.35s ease' }} />

      {/* hover actions */}
      <div className="absolute top-3 right-3 flex gap-1.5 z-10" style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: hovered ? 'auto' : 'none' }}>
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 py-1 bg-black/60 border border-white/20 text-white text-[10px] font-bold rounded-full hover:bg-black/80 transition-colors backdrop-blur-sm">
          <Github className="w-2.5 h-2.5" /> Code
        </a>
      </div>

      {/* hover info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10" style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(12px)', transition: 'opacity 0.35s ease, transform 0.35s ease', pointerEvents: 'none' }}>
        <p className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-0.5">{project.period}</p>
        <h3 className="text-sm font-black text-white mb-1 leading-tight">{project.title}</h3>
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
            <button key={i} onClick={() => { setActiveImage(i); startTimeRef.current = Date.now() }}
              className={`h-1 rounded-full transition-all duration-300 ${i === activeImage ? 'w-4 bg-white' : 'w-1 bg-white/40'}`} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Dribbble-style project modal ──
function ProjectModal({ projectIdx, onClose }: { projectIdx: number; onClose: () => void }) {
  const [activeImage, setActiveImage] = useState(0)
  const [clickedLive, setClickedLive] = useState(false)
  const project = projects[projectIdx]

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-neutral-950 rounded-3xl overflow-hidden shadow-2xl"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center hover:bg-black/20 dark:hover:bg-white/20 transition-colors">
          <X className="w-4 h-4 text-black dark:text-white" />
        </button>

        <div className="flex flex-col lg:flex-row h-full" style={{ maxHeight: '90vh' }}>
          {/* Left: image viewer */}
          <div className="lg:w-[58%] flex-shrink-0 bg-black relative" style={{ minHeight: '260px', maxHeight: '480px' }}>
            <img
              src={project.images[activeImage]}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{ maxHeight: '480px' }}
              onError={(e) => { e.currentTarget.src = `https://placehold.co/800x500/103257/ffffff?text=${encodeURIComponent(project.title)}` }}
            />
            {/* image strip */}
            {project.images.length > 1 && (
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 px-4">
                {project.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)}
                    className="flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200"
                    style={{ width: 48, height: 32, borderColor: i === activeImage ? '#fff' : 'transparent', opacity: i === activeImage ? 1 : 0.55 }}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: details */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">{project.period}</p>
              <h2 className="text-xl font-black text-black dark:text-white leading-tight mb-2">{project.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{project.description}</p>
            </div>

            {/* Tech stack */}
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t, i) => (
                  <span key={i} className="px-2.5 py-1 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 rounded-lg text-[10px] font-bold uppercase">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Type badge */}
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${project.academic ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300'}`}>
                {project.academic ? 'Academic' : 'Personal'}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-auto pt-2">
              <button
                onClick={() => { setClickedLive(true); setTimeout(() => setClickedLive(false), 2500) }}
                className="flex items-center gap-1.5 px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded-full hover:opacity-80 transition-opacity"
              >
                <ExternalLink className="w-3 h-3" />
                {clickedLive ? 'Coming Soon' : 'Live Demo'}
              </button>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 dark:border-neutral-700 text-black dark:text-white text-xs font-bold rounded-full hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors">
                <Github className="w-3 h-3" /> GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [modalProject, setModalProject] = useState<number | null>(null)
  const thumbStripRef = useRef<HTMLDivElement>(null)

  // top 3 panels are always 0,1,2 — fixed showcase
  const panelIdxs = [0, 1, 2]

  const scrollThumbs = (dir: 'left' | 'right') => {
    thumbStripRef.current?.scrollBy({ left: dir === 'right' ? 220 : -220, behavior: 'smooth' })
  }

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
          <div className="w-16 h-1 bg-gradient-to-r from-[#103257] to-[#0d4a6b]" />
        </div>

        {/* ── DESKTOP ── */}
        <div className="hidden lg:flex flex-col flex-1 min-h-0">
          <div className="flex gap-3 min-h-0" style={{ height: '360px', perspective: '1200px' }}>
            {panelIdxs.map(i => <ProjectPanel key={i} projectIdx={i} />)}
          </div>

          {/* Thumbnail strip — click opens modal */}
          <div className="flex items-center gap-2 mt-4 flex-shrink-0">
            <button onClick={() => scrollThumbs('left')}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors shadow-sm">
              <ChevronLeft className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
            </button>

            <div ref={thumbStripRef} className="flex gap-2 overflow-x-auto flex-1 no-scrollbar"
              style={{ scrollSnapType: 'x mandatory', paddingTop: '6px', paddingBottom: '6px' }}>
              {projects.map((p, idx) => (
                <button key={idx} onClick={() => setModalProject(idx)}
                  className="flex-shrink-0 relative rounded-xl overflow-hidden group"
                  style={{
                    width: 120, height: 76,
                    scrollSnapAlign: 'start',
                    transition: 'transform 0.2s ease, opacity 0.2s ease',
                    opacity: 0.65,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1', e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.65', e.currentTarget.style.transform = 'scale(1)')}
                >
                  <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = `https://placehold.co/120x76/103257/ffffff?text=${encodeURIComponent(p.title)}` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <p className="absolute bottom-1.5 left-2 right-2 text-white text-[8px] font-black uppercase tracking-wide leading-tight line-clamp-1">
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
            <button key={index} onClick={() => setModalProject(index)}
              className="rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-left w-full">
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = `https://placehold.co/600x338/103257/ffffff?text=${encodeURIComponent(p.title)}` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/60">{p.period}</p>
                  <h3 className="text-base font-black text-white">{p.title}</h3>
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

      {/* Modal */}
      {modalProject !== null && (
        <ProjectModal projectIdx={modalProject} onClose={() => setModalProject(null)} />
      )}
    </div>
  )
}

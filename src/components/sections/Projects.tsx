import { useState, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import { projects } from '../../data/portfolio'
import ProjectPanel from './projects/ProjectPanel'
import ProjectModal from './projects/ProjectModal'
import ExploreModal from './projects/ExploreModal'

// ── Featured panels wrapper to isolate interval state ──
function FeaturedPanels({ onProjectClick }: { onProjectClick: (idx: number) => void }) {
  const [offset, setOffset] = useState(0)
  const [hovered, setHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const paused = hovered || !!prefersReducedMotion

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => {
      setOffset(o => (o + 1) % projects.length)
    }, 5000)
    return () => clearInterval(t)
  }, [paused])

  const panelIdxs = [
    offset % projects.length,
    (offset + 1) % projects.length,
    (offset + 2) % projects.length,
  ]

  return (
    <div
      className="flex gap-3 flex-1 min-h-[320px] max-h-[520px]"
      style={{ perspective: '1200px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setHovered(false) }}
    >
      {panelIdxs.map((i) => (
        <ProjectPanel key={i} projectIdx={i} onClick={onProjectClick} paused={paused} />
      ))}
    </div>
  )
}

export default function Projects() {
  const [modalProject, setModalProject] = useState<number | null>(null)
  const [exploreOpen, setExploreOpen] = useState(false)

  return (
    <div
      className="box-border min-h-[100svh] lg:h-[100svh] pb-20 lg:pb-6 bg-gray-50 dark:bg-black relative z-10 rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800"
      style={{ paddingTop: 'calc(var(--header-height, 0px) + 1.5rem)' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 sm:pr-16 lg:pr-20 h-full flex flex-col">

        <div className="mb-5 flex-shrink-0 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-gray-100 mb-4 tracking-tight">
            Featured Projects
          </h2>
        </div>

        {/* ── DESKTOP ── */}
        <div className="hidden lg:flex flex-col flex-1 min-h-0">
          <FeaturedPanels onProjectClick={setModalProject} />

          <div className="flex items-center justify-center mt-6 flex-shrink-0">
            <button
              onClick={() => setExploreOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 dark:border-neutral-700 text-black dark:text-white text-xs font-semibold rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
            >
              Explore All Projects
              <span className="text-sm">→</span>
            </button>
            <span className="ml-4 text-xs text-gray-500 dark:text-neutral-400">{projects.length} projects</span>
          </div>
        </div>

        {/* ── MOBILE ── */}
        <div className="lg:hidden grid sm:grid-cols-2 gap-4">
          {projects.slice(0, 6).map((p, index) => (
            <button key={index} onClick={() => setModalProject(index)}
              className="shrink-0 rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-left w-full">
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                {/* Added lazy loading to prevent 15 hidden images from being eagerly fetched on desktop, which uses display: none (lg:hidden) */}
                <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover"
                  loading="lazy" decoding="async"
                  onError={(e) => { e.currentTarget.src = `https://placehold.co/600x338/111111/ffffff?text=${encodeURIComponent(p.title)}` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-[11px] font-black uppercase tracking-widest text-white/80">{p.period}</p>
                  <h3 className="text-base font-medium text-white">{p.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-600 dark:text-neutral-300 leading-relaxed mb-3 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1">
                  {p.tech.slice(0, 4).map((t, i) => (
                    <span key={i} className="px-1.5 py-px bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-300 rounded text-[11px] font-bold uppercase">{t}</span>
                  ))}
                </div>
              </div>
            </button>
          ))}
          <button
            onClick={() => setExploreOpen(true)}
            className="sm:col-span-2 justify-self-center flex items-center gap-2 px-6 py-2.5 border border-gray-300 dark:border-neutral-700 text-black dark:text-white text-sm font-semibold rounded-full"
          >
            Explore All {projects.length} Projects
            <span aria-hidden="true">→</span>
          </button>
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

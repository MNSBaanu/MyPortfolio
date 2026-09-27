import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Github } from 'lucide-react'
import { projects } from '../../../data/portfolio'

const SLIDE_DURATION = 4000

// ── 3D tilt panel ──
// Wrapped in React.memo to prevent unnecessary re-renders when the parent's offset changes every 5 seconds.
const ProjectPanel = React.memo(function ProjectPanel({ projectIdx, onClick, paused }: { projectIdx: number; onClick: (idx: number) => void; paused: boolean }) {
  const [activeImage, setActiveImage] = useState(0)
  const [hovered, setHovered] = useState(false)
  const timerRef = useRef<number>(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const project = projects[projectIdx]
  const allImages = project.images

  useEffect(() => { setActiveImage(0) }, [projectIdx])

  const advanceImage = useCallback(() => {
    setActiveImage(prev => { const n = prev < allImages.length - 1 ? prev + 1 : 0; return n })
  }, [allImages.length])

  useEffect(() => {
    if (paused) return
    timerRef.current = window.setTimeout(advanceImage, SLIDE_DURATION)
    return () => clearTimeout(timerRef.current)
  }, [projectIdx, activeImage, advanceImage, paused])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect || !cardRef.current) return
    const tiltX = ((e.clientY - rect.top) / rect.height - 0.5) * -12
    const tiltY = ((e.clientX - rect.left) / rect.width - 0.5) * 12
    cardRef.current.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.03)`
  }

  const handleMouseEnter = () => {
    setHovered(true)
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) scale(1.03)`
    }
  }

  const handleMouseLeave = () => {
    setHovered(false)
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)`
    }
  }

  return (
    <div
      ref={cardRef}
      className="relative flex-1 min-w-0 rounded-2xl overflow-hidden bg-black cursor-pointer"
      style={{
        transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s cubic-bezier(0.25,0.8,0.25,1)',
        boxShadow: hovered ? '0 28px 56px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.18)',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setHovered(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setHovered(false) }}
      onClick={() => onClick(projectIdx)}
      onKeyDown={(e) => {
        if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick(projectIdx)
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${project.title} details`}
    >
      <img src={allImages[activeImage]} alt=""
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
          className="flex items-center gap-1 px-2.5 py-1 bg-black/60 border border-white/20 text-white text-xs font-bold rounded-full hover:bg-black/80 transition-colors backdrop-blur-sm">
          <Github className="w-2.5 h-2.5" /> Code
        </a>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10" style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(12px)', transition: 'opacity 0.35s ease, transform 0.35s ease', pointerEvents: 'none' }}>
        <p className="text-[11px] font-black uppercase tracking-widest text-white/70 mb-0.5">{project.period}</p>
        <h3 className="text-sm font-medium text-white mb-1 leading-tight">{project.title}</h3>
        <p className="text-xs text-white/80 leading-relaxed line-clamp-2 mb-2">{project.description}</p>
        <div className="flex flex-wrap gap-1">
          {project.tech.slice(0, 4).map((t, i) => (
            <span key={i} className="px-1.5 py-0.5 bg-white/10 border border-white/20 text-white/90 rounded text-[11px] font-bold uppercase">{t}</span>
          ))}
        </div>
      </div>
      {allImages.length > 1 && (
        <div className="absolute bottom-2 right-2 flex z-10" style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease' }}>
          {allImages.map((_, i) => (
            <button key={i} onClick={e => { e.stopPropagation(); setActiveImage(i) }}
              aria-label={`Show image ${i + 1} of ${allImages.length}`}
              aria-current={i === activeImage ? 'true' : undefined}
              className="p-1.5">
              <span className={`block h-1 rounded-full transition-all duration-300 ${i === activeImage ? 'w-4 bg-white' : 'w-1 bg-white/40'}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
})

export default ProjectPanel

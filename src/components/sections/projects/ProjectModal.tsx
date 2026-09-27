import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { projects } from '../../../data/portfolio'
import { useDialog } from '../../../hooks/useDialog'
import ProjectDetailPage from './ProjectDetailPage'

// ── Single project — full-screen Dribbble-style overlay ──
export default function ProjectModal({ projectIdx, onClose }: { projectIdx: number; onClose: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(projectIdx)
  const dialogRef = useRef<HTMLDivElement>(null)
  useDialog(dialogRef, onClose)

  useEffect(() => {
    setCurrentIdx(projectIdx)
  }, [projectIdx])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentIdx > 0) setCurrentIdx((i) => i - 1)
      if (e.key === 'ArrowRight' && currentIdx < projects.length - 1) setCurrentIdx((i) => i + 1)
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [currentIdx])

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={projects[currentIdx].title}
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

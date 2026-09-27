import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { projects } from '../../../data/portfolio'
import { useDialog } from '../../../hooks/useDialog'
import ProjectDetailPage from './ProjectDetailPage'

// ── Explore all — sidebar grid + Dribbble detail ──
export default function ExploreModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  useDialog(dialogRef, onClose)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="All projects"
      className="fixed inset-0 z-[9999] flex bg-[#f3f3f4] dark:bg-neutral-950"
    >
      <aside className="hidden md:flex w-64 lg:w-72 flex-col border-r border-gray-200 dark:border-neutral-800 bg-white dark:bg-black shrink-0">
        <div className="px-5 py-5 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-black dark:text-white">All Shots</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{projects.length} projects</p>
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
              aria-current={selected === i ? 'true' : undefined}
              className={`w-full text-left rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                selected === i
                  ? 'border-black dark:border-white shadow-md'
                  : 'border-transparent hover:border-gray-200 dark:hover:border-neutral-800'
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-neutral-900">
                <img
                  src={p.images[0]}
                  alt=""
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
          <button onClick={onClose} className="text-sm font-medium text-gray-600 dark:text-gray-300">Close</button>
          <select
            aria-label="Choose project"
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

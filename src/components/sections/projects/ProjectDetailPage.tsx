import { ExternalLink, Github, X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import { projects, personalInfo } from '../../../data/portfolio'

// ── Dribbble-inspired project detail page ──
export default function ProjectDetailPage({
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
  const liveUrl = project.liveUrl && project.liveUrl !== '#' ? project.liveUrl : null
  const hasPrev = idx > 0
  const hasNext = idx < projects.length - 1

  return (
    <div className="flex flex-col min-h-full bg-[#f3f3f4] dark:bg-neutral-950">
      {showHeader && (
        <header className="sticky top-0 z-20 border-b border-gray-200/80 dark:border-neutral-800 bg-[#f3f3f4]/90 dark:bg-neutral-950/90 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              aria-label="Back to projects"
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
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live
                </a>
              )}
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
              className={`ml-auto shrink-0 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                project.academic
                  ? 'bg-gray-200 dark:bg-neutral-800 text-gray-600 dark:text-gray-300'
                  : 'bg-black dark:bg-white text-white dark:text-black'
              }`}
            >
              {project.academic ? 'Academic' : 'Personal'}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-white dark:bg-neutral-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-neutral-800"
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
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-semibold"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
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
              <span className="text-xs text-gray-500 dark:text-neutral-400">
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

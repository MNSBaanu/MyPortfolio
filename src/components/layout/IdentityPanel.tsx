import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { FileText, Github, Linkedin, Mail, MapPin, MessageCircle, Moon, Sun } from 'lucide-react'
import { experience, personalInfo } from '../../data/portfolio'
import { useTheme } from '../../context/ThemeContext'
import ChatAssistant from '../overlays/ChatAssistant'

const CVViewer = lazy(() => import('../overlays/CVViewer'))

export const briefSections = [
  { id: 'summary', title: 'Summary' },
  { id: 'experience', title: 'Experience' },
  { id: 'work', title: 'Selected work' },
  { id: 'stack', title: 'Stack' },
  { id: 'education', title: 'Education' },
  { id: 'contact', title: 'Contact' },
]

const updated = new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })

const linkClass =
  'flex items-center justify-center gap-2 rounded-xl border border-stone-200 px-3 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-300 dark:hover:text-white'

export default function IdentityPanel() {
  const { theme, toggleTheme } = useTheme()
  const [showCV, setShowCV] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [showBar, setShowBar] = useState(false)
  const actionsRef = useRef<HTMLDivElement>(null)
  const role = experience[0]

  useEffect(() => {
    const actions = actionsRef.current
    if (!actions) return
    const observer = new IntersectionObserver(([entry]) => setShowBar(!entry.isIntersecting && entry.boundingClientRect.top < 0))
    observer.observe(actions)
    return () => observer.disconnect()
  }, [])

  return (
    <aside className="lg:sticky lg:top-10 lg:self-start">
      <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center justify-between">
          <div className="font-mono uppercase">
            <p className="text-[11px] tracking-[0.2em] text-stone-500 dark:text-neutral-400">Candidate brief</p>
            <p className="mt-0.5 text-[10px] tracking-[0.15em] text-stone-400 dark:text-neutral-500">Updated {updated}</p>
          </div>
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="rounded-full p-2 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <img
            src={personalInfo.profileImage}
            alt={personalInfo.name}
            width={72}
            height={72}
            className="h-[72px] w-[72px] shrink-0 rounded-2xl bg-stone-100 object-cover dark:bg-neutral-800"
          />
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight">{personalInfo.name}</h1>
            <p className="text-sm text-stone-600 dark:text-neutral-400">{role.title}</p>
          </div>
        </div>

        <div className="mt-5 space-y-2 text-sm">
          <p className="flex items-center gap-2 font-medium text-emerald-700 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to new roles
          </p>
          <p className="flex items-center gap-2 text-stone-600 dark:text-neutral-400">
            <MapPin size={14} className="shrink-0" />
            {personalInfo.location} · On-site in Kandy or remote
          </p>
        </div>

        <div ref={actionsRef} className="mt-6 grid grid-cols-2 gap-2">
          <button
            onClick={() => setShowCV(true)}
            className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85 dark:bg-white dark:text-black"
          >
            <FileText size={16} />
            View CV
          </button>
          <a href={`mailto:${personalInfo.email}`} className={`col-span-2 ${linkClass}`}>
            <Mail size={16} />
            Email me
          </a>
          <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
            <Linkedin size={16} />
            LinkedIn
          </a>
          <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
            <Github size={16} />
            GitHub
          </a>
          <button
            onClick={() => setChatOpen((open) => !open)}
            aria-expanded={chatOpen}
            className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-dashed border-emerald-500/60 px-3 py-2.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-500/10"
          >
            <MessageCircle size={16} />
            Ask my AI assistant about me
          </button>
        </div>

        <nav aria-label="Brief sections" className="mt-5 hidden border-t border-dashed border-stone-200 pt-3 lg:block dark:border-neutral-800">
          <ol>
            {briefSections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="flex items-baseline gap-3 rounded-lg px-2 py-1 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                >
                  <span className="font-mono text-xs text-stone-400 dark:text-neutral-500">{String(i + 1).padStart(2, '0')}</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div
        aria-hidden={!showBar}
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/90 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 lg:hidden dark:border-neutral-800 dark:bg-neutral-900/90 ${showBar ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="mx-auto flex max-w-md gap-2">
          <button
            onClick={() => setShowCV(true)}
            tabIndex={showBar ? 0 : -1}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white dark:bg-white dark:text-black"
          >
            <FileText size={16} />
            View CV
          </button>
          <a href={`mailto:${personalInfo.email}`} tabIndex={showBar ? 0 : -1} className={`flex-1 ${linkClass} bg-white dark:bg-neutral-900`}>
            <Mail size={16} />
            Email me
          </a>
        </div>
      </div>

      <ChatAssistant open={chatOpen} onClose={() => setChatOpen(false)} />
      {showCV && (
        <Suspense fallback={null}>
          <CVViewer isOpen={showCV} onClose={() => setShowCV(false)} />
        </Suspense>
      )}
    </aside>
  )
}

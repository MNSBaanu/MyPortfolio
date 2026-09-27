import { ArrowUpRight, Github, X } from 'lucide-react'
import { track } from '@vercel/analytics'
import { brief, personalInfo, projects } from '../../data/portfolio'
import BriefSection from '../layout/BriefSection'

export const usesTech = (projectTech: string[], item: string) =>
  projectTech.some((tech) => tech === item || (item === '.NET' && tech.includes('.NET')))

const summaries = new Map(brief.projectSummaries.map((summary) => [summary.title, summary]))

const toCaseStudy = (project: (typeof projects)[number]) => {
  const summary = summaries.get(project.title)
  if (summary) return { ...project, ...summary }
  const [hook, ...rest] = project.description.split(/(?<=\.)\s+(?=[A-Z])/)
  return { ...project, hook, highlights: rest.slice(0, 3).map((point) => point.replace(/\.$/, '')) }
}

const featured = projects
  .map((project, index) => ({ project, index, key: Math.random() }))
  .sort((a, b) => a.key - b.key)
  .slice(0, 4)
  .sort((a, b) => a.index - b.index)
  .map(({ project }) => toCaseStudy(project))

type WorkProps = {
  techFilter: string | null
  onClearFilter: () => void
}

export default function Work({ techFilter, onClearFilter }: WorkProps) {
  const shown = techFilter ? projects.filter((project) => usesTech(project.tech, techFilter)).map(toCaseStudy) : featured

  return (
    <BriefSection id="work" index="03" title="Selected work">
      {techFilter && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm dark:bg-emerald-500/10">
          <span className="text-emerald-800 dark:text-emerald-300">
            {shown.length} project{shown.length === 1 ? '' : 's'} using <strong>{techFilter}</strong>
          </span>
          <button onClick={onClearFilter} className="inline-flex items-center gap-1 font-medium text-emerald-800 hover:underline dark:text-emerald-300">
            <X size={14} />
            Clear filter
          </button>
        </div>
      )}

      <div className="space-y-8">
        {shown.map((project, i) => (
          <article
            key={project.title}
            className="grid gap-5 border-b border-dashed border-stone-200 pb-8 last:border-0 last:pb-0 md:grid-cols-[240px_1fr] dark:border-neutral-800"
          >
            <img
              src={project.images[0]}
              alt={`${project.title} cover`}
              loading="lazy"
              width={480}
              height={270}
              className="aspect-video w-full rounded-xl border border-stone-200 object-cover dark:border-neutral-800"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
                <span className="font-mono text-xs text-stone-500 dark:text-neutral-500">
                  {project.period}{project.academic ? ' · Academic' : ''}
                </span>
              </div>
              <p className="mt-2 text-stone-700 dark:text-neutral-300">{project.hook}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-stone-600 dark:text-neutral-400">
                {project.highlights.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2 h-px w-3 shrink-0 bg-emerald-500" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="font-mono text-xs text-stone-500 dark:text-neutral-500">{project.tech.join(' · ')}</p>
                <div className="flex gap-3 text-sm font-medium">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('Project Link', { project: project.title, link: 'code' })}
                    className="inline-flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    <Github size={14} />
                    Code
                  </a>
                  {project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track('Project Link', { project: project.title, link: 'live' })}
                      className="inline-flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      <ArrowUpRight size={14} />
                      Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {!techFilter && (
        <a
          href={personalInfo.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex items-center justify-between rounded-xl border border-stone-200 px-4 py-3 text-sm font-medium transition-colors hover:border-stone-900 dark:border-neutral-800 dark:hover:border-neutral-300"
        >
          +{projects.length - shown.length} more projects on GitHub
          <ArrowUpRight size={16} />
        </a>
      )}
    </BriefSection>
  )
}

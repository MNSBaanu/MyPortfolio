import { ArrowUpRight, Github, X } from 'lucide-react'
import { track } from '@vercel/analytics'
import { brief, personalInfo, projectContext, projects } from '../../data/portfolio'
import BriefSection from '../layout/BriefSection'

export const usesTech = (projectTech: string[], item: string) =>
  projectTech.some((tech) => tech === item || (item === '.NET' && tech.includes('.NET')))

const summaries = new Map(brief.projectSummaries.map((summary) => [summary.title, summary]))

const toCaseStudy = (project: (typeof projects)[number]) => {
  const summary = summaries.get(project.title)
  const context = projectContext[project.title]
  const projectType = context?.collaboration ?? (project.badge === 'Personal' ? 'Personal project' : project.academic ? 'Academic project' : undefined)
  if (summary) return { ...project, ...summary, context, projectType }
  const [hook, ...rest] = project.description.split(/(?<=\.)\s+(?=[A-Z])/)
  return { ...project, hook, highlights: rest.slice(0, 3).map((point) => point.replace(/\.$/, '')), context, projectType }
}

// The editorial summaries define a consistent selection and display order.
const featured = brief.projectSummaries.flatMap((summary) => {
  const project = projects.find((item) => item.title === summary.title)
  return project ? [toCaseStudy(project)] : []
})

// ⚡ Bolt: Cache derived project computations at the module level.
// This prevents expensive O(N) filtering and object allocations on every render
// when unrelated state changes in the parent component.
const projectsByTechCache = new Map<string, ReturnType<typeof toCaseStudy>[]>()

const getProjectsByTech = (tech: string) => {
  if (!projectsByTechCache.has(tech)) {
    projectsByTechCache.set(
      tech,
      projects.filter((project) => usesTech(project.tech, tech)).map(toCaseStudy)
    )
  }
  return projectsByTechCache.get(tech)!
}

type WorkProps = {
  techFilter: string | null
  onClearFilter: () => void
}

export default function Work({ techFilter, onClearFilter }: WorkProps) {
  const shown = techFilter ? getProjectsByTech(techFilter) : featured

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

      <div className="space-y-6">
        {shown.map((project, i) => (
          <article
            key={project.title}
            className="project-row grid border-b border-stone-200 pb-6 last:border-0 last:pb-0 dark:border-neutral-800"
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
              <div className="project-heading">
                <div className="flex items-baseline gap-3">
                  <span className="shrink-0 font-mono text-xs text-emerald-600 dark:text-emerald-400">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-stone-500 dark:text-neutral-400">
                  <span className="font-mono">{project.period}</span>
                  {project.projectType && <span>· {project.projectType}</span>}
                  {project.context?.status && (
                    <span className="rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 font-medium text-emerald-800 dark:border-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300">{project.context.status}</span>
                  )}
                </div>
              </div>
              {project.context?.contribution && <p className="mt-2 text-xs text-stone-600 dark:text-neutral-400"><span className="font-medium">My contribution:</span> {project.context.contribution}</p>}
              <p className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-neutral-300">{project.hook}</p>
              <ul className="mt-2 space-y-1 text-[13px] leading-relaxed text-stone-600 dark:text-neutral-400">
                {project.highlights.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2 h-px w-3 shrink-0 bg-emerald-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
              <div className="project-footer flex flex-wrap items-center justify-between gap-2">
                <ul aria-label={`${project.title} technologies`} className="flex min-w-0 flex-1 flex-wrap gap-1.5">
                  {project.tech.map((tech) => <li key={tech} className="project-tech rounded-md border border-stone-200 px-1.5 py-0.5 text-[10px] font-medium text-stone-600 dark:border-neutral-700 dark:text-neutral-300">{tech}</li>)}
                </ul>
                <div className="flex shrink-0 gap-3 text-sm font-medium">
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

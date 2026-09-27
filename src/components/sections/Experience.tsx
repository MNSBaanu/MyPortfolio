import { TrendingUp } from 'lucide-react'
import { brief, experience } from '../../data/portfolio'
import BriefSection from '../layout/BriefSection'

export default function Experience() {
  const [current, intern, independent] = experience
  const [company, place] = current.company.split(' - ')

  return (
    <BriefSection id="experience" index="02" title="Experience">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-xl font-semibold tracking-tight">{company}</h3>
        <span className="text-sm text-stone-500 dark:text-neutral-400">{place} · {current.type}</span>
      </div>

      <ol className="mt-5 space-y-4 border-l border-stone-200 pl-5 dark:border-neutral-800">
        {[current, intern].map((role, i) => (
          <li key={role.title} className="relative">
            <span
              className={`absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full border-2 ${i === 0 ? 'border-emerald-500 bg-emerald-500' : 'border-stone-300 bg-white dark:border-neutral-600 dark:bg-neutral-900'}`}
            />
            <p className="font-mono text-xs text-stone-500 dark:text-neutral-500">{role.period}</p>
            <p className="font-medium">{role.title}</p>
          </li>
        ))}
      </ol>

      <p className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300">
        <TrendingUp size={15} className="shrink-0" />
        {brief.promotion}
      </p>

      <p className="mt-5 max-w-2xl leading-relaxed text-stone-600 dark:text-neutral-400">{current.description}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {current.tech?.map((tech) => (
          <li key={tech} className="rounded-md border border-stone-200 px-2 py-1 font-mono text-xs text-stone-600 dark:border-neutral-700 dark:text-neutral-300">
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-dashed border-stone-200 pt-6 dark:border-neutral-800">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-lg font-semibold tracking-tight">{independent.title}</h3>
          <span className="font-mono text-xs text-stone-500 dark:text-neutral-500">{independent.period}</span>
        </div>
        <p className="text-sm text-stone-500 dark:text-neutral-400">{independent.company}</p>
        <p className="mt-3 max-w-2xl leading-relaxed text-stone-600 dark:text-neutral-400">{independent.description}</p>
      </div>
    </BriefSection>
  )
}

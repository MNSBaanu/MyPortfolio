import { brief, education, experience, projects } from '../../data/portfolio'
import BriefSection from '../layout/BriefSection'

const facts = [
  { label: 'Now', value: experience[0].title },
  { label: 'In industry since', value: experience[1].period.split(' - ')[0] },
  { label: 'Higher Diploma', value: education[1].title.split(' - ')[1] },
  { label: 'Projects built', value: String(projects.length) },
]

export default function Summary() {
  return (
    <BriefSection id="summary" index="01" title="Summary">
      <p className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">{brief.pitch}</p>
      <p className="mt-4 max-w-2xl leading-relaxed text-stone-600 dark:text-neutral-400">{brief.summary}</p>
      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-stone-200 bg-stone-200 sm:grid-cols-4 dark:border-neutral-800 dark:bg-neutral-800">
        {facts.map((fact) => (
          <div key={fact.label} className="bg-stone-50 p-4 dark:bg-neutral-950">
            <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500 dark:text-neutral-500">{fact.label}</dt>
            <dd className="mt-1 text-sm font-semibold">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </BriefSection>
  )
}

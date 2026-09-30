import { brief, projects } from '../../data/portfolio'
import BriefSection from '../layout/BriefSection'
import { usesTech } from './Work'

// Pre-calculate project counts for each tech to avoid O(N * M) filtering on every render
// This is a static lookup table since `projects` and `brief.stack` do not change at runtime.
const techCounts = new Map<string, number>()
brief.stack.forEach(group => {
  group.items.forEach(item => {
    if (!techCounts.has(item)) {
      techCounts.set(item, projects.filter(project => usesTech(project.tech, item)).length)
    }
  })
})

type StackProps = {
  activeTech: string | null
  onSelectTech: (tech: string) => void
}

export default function Stack({ activeTech, onSelectTech }: StackProps) {
  return (
    <BriefSection id="stack" index="04" title="Stack">
      <dl className="space-y-4">
        {brief.stack.map((group) => (
          <div key={group.label} className="grid gap-2 sm:grid-cols-[110px_1fr] sm:items-baseline">
            <dt className="font-mono text-xs uppercase tracking-[0.15em] text-stone-500 dark:text-neutral-500">{group.label}</dt>
            <dd className="flex flex-wrap gap-2">
              {group.items.map((item) => {
                const count = techCounts.get(item) || 0
                const active = activeTech === item
                if (!count) {
                  return (
                    <span key={item} className="rounded-md bg-stone-100 px-2.5 py-1 text-sm font-medium dark:bg-neutral-800">
                      {item}
                    </span>
                  )
                }
                return (
                  <button
                    key={item}
                    onClick={() => onSelectTech(item)}
                    aria-pressed={active}
                    title={`Show ${count} project${count === 1 ? '' : 's'} using ${item}`}
                    className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-medium transition-colors ${active ? 'bg-emerald-600 text-white' : 'bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 dark:bg-neutral-800 dark:hover:bg-emerald-500/15 dark:hover:text-emerald-300'}`}
                  >
                    {item}
                    <span className={`font-mono text-[10px] ${active ? 'text-emerald-100' : 'text-stone-400 dark:text-neutral-500'}`}>{count}</span>
                  </button>
                )
              })}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 text-xs text-stone-500 dark:text-neutral-500">Select a technology to see the projects that use it.</p>
    </BriefSection>
  )
}

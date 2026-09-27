import { brief } from '../../data/portfolio'
import BriefSection from '../layout/BriefSection'

export default function Stack() {
  return (
    <BriefSection id="stack" index="04" title="Stack">
      <dl className="space-y-4">
        {brief.stack.map((group) => (
          <div key={group.label} className="grid gap-2 sm:grid-cols-[110px_1fr] sm:items-baseline">
            <dt className="font-mono text-xs uppercase tracking-[0.15em] text-stone-500 dark:text-neutral-500">{group.label}</dt>
            <dd className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="rounded-md bg-stone-100 px-2.5 py-1 text-sm font-medium dark:bg-neutral-800">
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </BriefSection>
  )
}

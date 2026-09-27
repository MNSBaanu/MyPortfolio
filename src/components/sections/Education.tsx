import { education } from '../../data/portfolio'
import BriefSection from '../layout/BriefSection'

export default function Education() {
  return (
    <BriefSection id="education" index="05" title="Education">
      <ul className="space-y-4">
        {education.filter((item) => !item.title.includes('Pharmacist')).map((item) => (
          <li key={item.title} className="grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-4">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-stone-600 dark:text-neutral-400">{item.institution}</p>
            </div>
            <p className="font-mono text-xs text-stone-500 sm:text-right dark:text-neutral-500">{item.period}</p>
          </li>
        ))}
      </ul>
    </BriefSection>
  )
}

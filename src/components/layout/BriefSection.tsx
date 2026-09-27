import type { ReactNode } from 'react'

type BriefSectionProps = {
  id: string
  index: string
  title: string
  children: ReactNode
}

export default function BriefSection({ id, index, title, children }: BriefSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-6 rounded-2xl border border-stone-200 bg-white p-5 sm:p-8 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <header className="mb-6 flex items-baseline gap-3 border-b border-dashed border-stone-200 pb-3 dark:border-neutral-800">
        <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400">{index}</span>
        <h2 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-stone-500 dark:text-neutral-400">
          {title}
        </h2>
      </header>
      {children}
    </section>
  )
}

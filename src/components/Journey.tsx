import { useMemo, useRef, useEffect } from 'react'
import { experience as experienceData, certifications as certificationsData, education as educationData } from '../data/portfolio'

interface JourneyItem {
  id: string
  title: string
  organization?: string
  period?: string
  description?: string
  tech?: string[]
  image?: string
  type: 'experience' | 'education' | 'certifications'
  sectionKey: string
}

function JourneyCard({ item }: { item: JourneyItem }) {
  return (
    <div className="p-4 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm h-[340px] flex flex-col">
      <div className="flex flex-col gap-1 mb-3">
        <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{item.type}</span>
        <span className="text-[9px] font-bold bg-black text-white dark:bg-white dark:text-black px-2.5 py-0.5 rounded-full self-start whitespace-nowrap">{item.period}</span>
      </div>
      <h3 className="text-sm font-black text-black dark:text-gray-100 leading-tight mb-1">{item.title}</h3>
      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">{item.organization}</p>
      {item.description && (
        <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">{item.description}</p>
      )}
      <div className="mt-auto">
        {item.image ? (
          <div className="w-full h-20 rounded-xl overflow-hidden border border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900">
            <img src={item.image} alt="" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="flex flex-wrap gap-1">
            {item.tech?.slice(0, 6).map((t, i) => (
              <span key={i} className="px-1.5 py-0.5 bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-gray-400 rounded-md text-[8px] font-bold uppercase">{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Horizontal scroll strip with fast wheel support
function ScrollStrip({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return // already horizontal
      e.preventDefault()
      el.scrollLeft += e.deltaY * 3 // 3× speed multiplier
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <div
      ref={ref}
      className="flex gap-4 overflow-x-auto pb-4 px-4 sm:px-6 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing"
      style={{ scrollBehavior: 'auto' }}
    >
      {children}
    </div>
  )
}

export default function Journey() {
  const { items, sections } = useMemo(() => {
    const allItems: JourneyItem[] = []
    const sectionMetadata: { [key: string]: { title: string } } = {}

    const addSection = (key: string, title: string, data: any[], type: JourneyItem['type']) => {
      data.forEach((d, idx) => {
        allItems.push({
          id: `${key}-${idx}`,
          title: d.title,
          organization: d.company || d.institution || d.issuer,
          period: d.period || d.date,
          description: d.description,
          tech: d.tech,
          image: d.image,
          type,
          sectionKey: key,
        })
      })
      sectionMetadata[key] = { title }
    }

    addSection('experience', 'Work Experience', experienceData, 'experience')
    addSection('education', 'Education', educationData, 'education')
    addSection('certifications', 'Certifications', certificationsData, 'certifications')

    return { items: allItems, sections: sectionMetadata }
  }, [])

  const sectionKeys = Object.keys(sections)

  return (
    <div
      className="bg-gray-50 dark:bg-black rounded-t-[2.5rem] sm:rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800"
      style={{ paddingTop: 'calc(var(--header-height, 0px) + 3rem)', paddingBottom: '3rem' }}
    >
      <div className="max-w-7xl mx-auto space-y-14">
        {sectionKeys.map((key) => {
          const section = sections[key]
          const sectionItems = items.filter(it => it.sectionKey === key)
          return (
            <div key={key}>
              <div className="px-4 sm:px-6 md:px-12 lg:px-16 mb-6">
                <h2 className="font-black text-black dark:text-gray-100 tracking-tighter" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                  {section.title}
                </h2>
                <div className="w-10 h-1.5 bg-black dark:bg-white mt-3 rounded-full" />
              </div>

              {/* Horizontal scroll strip — all screen sizes */}
              <ScrollStrip>
                {sectionItems.map((item) => (
                  <div key={item.id} className="snap-start flex-shrink-0 w-[260px] sm:w-[300px] lg:w-[320px]">
                    <JourneyCard item={item} />
                  </div>
                ))}
              </ScrollStrip>
            </div>
          )
        })}
      </div>
    </div>
  )
}

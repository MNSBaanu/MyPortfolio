import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useMemo } from 'react'
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
  indexInSection: number
}

function JourneyCard({ item }: { item: JourneyItem }) {
  return (
    <div className="p-4 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md shadow-xl h-[340px] flex flex-col">
      <div className="flex flex-col gap-1 mb-3">
        <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{item.type}</span>
        <span className="text-[9px] font-bold bg-black text-white dark:bg-white dark:text-black px-2.5 py-0.5 rounded-full self-start whitespace-nowrap">{item.period}</span>
      </div>
      <h3 className="text-sm font-black text-black dark:text-gray-100 leading-tight mb-1">{item.title}</h3>
      <p className="text-xs font-bold text-[#103257] dark:text-blue-400 mb-2">{item.organization}</p>
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

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { items, sections } = useMemo(() => {
    const allItems: JourneyItem[] = []
    const sectionMetadata: { [key: string]: { start: number; end: number; title: string; count: number } } = {}

    const addSection = (key: string, title: string, data: any[], type: 'experience' | 'education' | 'certifications') => {
      const start = allItems.length
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
          indexInSection: idx,
        })
      })
      sectionMetadata[key] = { start, end: allItems.length - 1, title, count: data.length }
    }

    addSection('experience', 'Work Experience', experienceData, 'experience')
    addSection('education', 'Education', educationData, 'education')
    addSection('certifications', 'Certifications', certificationsData, 'certifications')

    return { items: allItems, sections: sectionMetadata }
  }, [])

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const sectionKeys = Object.keys(sections)

  return (
    <>
      {/* ── MOBILE: touch-swipeable sections ── */}
      <div className="lg:hidden bg-gray-50 dark:bg-black rounded-t-[2.5rem] border-t border-gray-100 dark:border-neutral-800 py-12 space-y-12">
        {sectionKeys.map((key) => {
          const section = sections[key]
          const sectionItems = items.filter(it => it.sectionKey === key)
          return (
            <div key={key}>
              <div className="px-4 sm:px-6 mb-6">
                <h2 className="font-black text-black dark:text-gray-100 tracking-tighter"
                  style={{ fontSize: 'clamp(1.5rem, 6vw, 2.5rem)' }}>
                  {section.title}
                </h2>
                <div className="w-10 h-1.5 bg-[#103257] dark:bg-blue-600 mt-3 rounded-full" />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 px-4 sm:px-6 snap-x snap-mandatory no-scrollbar">
                {sectionItems.map((item) => (
                  <div key={item.id} className="snap-start flex-shrink-0 w-[260px] xs:w-[280px] sm:w-[300px]">
                    <JourneyCard item={item} />
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── DESKTOP: scroll-driven animation ── */}
      <div
        ref={containerRef}
        className="hidden lg:block relative z-10 rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-black"
        style={{ height: `${sectionKeys.length * 400}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
          <div className="max-w-full w-full h-full relative flex flex-col items-center">
            {sectionKeys.map((key, sIdx) => {
              const section = sections[key]
              const sectionStart = sIdx / sectionKeys.length
              const sectionEnd = (sIdx + 1) / sectionKeys.length
              const sectionOpacity = useTransform(scrollYProgress, [sectionStart, sectionStart + 0.05], [0, 1])
              const sectionY = useTransform(scrollYProgress, [sectionEnd - 0.1, sectionEnd], [0, -1000])
              const horizontalScrollStart = sectionStart + 0.1
              const horizontalScrollEnd = sectionEnd - 0.1

              return (
                <motion.div
                  key={key}
                  style={{
                    opacity: sectionOpacity,
                    y: sectionY,
                    display: useTransform(scrollYProgress, p => (p >= sectionStart - 0.02 && p <= sectionEnd + 0.05) ? 'flex' : 'none'),
                  }}
                  className="absolute inset-0 flex flex-col items-center justify-center w-full h-full"
                >
                  <div className="absolute top-20 w-full text-center z-20">
                    <motion.h2
                      style={{
                        y: useTransform(scrollYProgress, [sectionStart, sectionStart + 0.08], [sIdx === 0 ? 100 : 50, 0]),
                        opacity: useTransform(scrollYProgress, [sectionStart, sectionStart + 0.08], [0, 1]),
                      }}
                      className="text-3xl sm:text-5xl lg:text-6xl font-black text-black dark:text-gray-100 tracking-tighter leading-tight"
                    >
                      {section.title}
                    </motion.h2>
                    <motion.div
                      style={{ scaleX: useTransform(scrollYProgress, [sectionStart, sectionStart + 0.08], [0, 1]) }}
                      className="w-16 h-1.5 bg-[#103257] dark:bg-blue-600 mx-auto mt-4 rounded-full"
                    />
                  </div>

                  <div className="w-full flex items-center justify-start overflow-visible h-[420px] px-[10vw]">
                    {items.filter(it => it.sectionKey === key).map((item, idx) => {
                      const cardWidth = 300
                      const gap = 24
                      const totalWidth = section.count * (cardWidth + gap)
                      const entranceStart = sectionStart + (idx / section.count) * 0.1
                      const entranceEnd = entranceStart + 0.05
                      const scrollDistance = totalWidth - (window.innerWidth * 0.8)
                      const xOffset = useTransform(scrollYProgress, [horizontalScrollStart, horizontalScrollEnd], [0, -Math.max(0, scrollDistance)])
                      const opacity = useTransform(scrollYProgress, [entranceStart, entranceEnd], [0, 1])
                      const scale = useTransform(scrollYProgress, [entranceStart, entranceEnd], [0.8, 1])
                      const yEntrance = useTransform(scrollYProgress, [entranceStart, entranceEnd], [100, 0])
                      const baseX = idx * (cardWidth + gap)

                      return (
                        <motion.div
                          key={item.id}
                          style={{ opacity, scale, x: xOffset, y: yEntrance, left: baseX + (window.innerWidth * 0.1), width: cardWidth, position: 'absolute' }}
                          className="flex-shrink-0"
                        >
                          <JourneyCard item={item} />
                        </motion.div>
                      )
                    })}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
                  >
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Scroll to Explore</span>
                    <div className="w-[1px] h-10 bg-gradient-to-b from-blue-600 to-transparent" />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

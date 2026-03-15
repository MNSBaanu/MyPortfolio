import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { experience as experienceData } from '../data/portfolio'

function ExperienceCard({ item, idx }: { item: typeof experienceData[0], idx: number }) {
  return (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      viewport={{ once: true }}
      className="w-[270px] sm:w-[300px] flex-shrink-0 p-4 sm:p-5 rounded-2xl border border-[#103257]/10 dark:border-[#103257]/30 bg-white/80 dark:bg-black/60 backdrop-blur-xl shadow-lg hover:shadow-[#103257]/10 dark:hover:shadow-[#103257]/30 transition-all duration-500 h-[340px] sm:h-[370px] flex flex-col justify-between group"
    >
      <div>
        <div className="flex flex-col gap-1 mb-3">
          <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Experience</span>
          <span className="text-[9px] font-bold bg-[#103257] text-white px-2.5 py-0.5 rounded-full self-start whitespace-nowrap">{item.period}</span>
        </div>
        <h3 className="text-base sm:text-lg font-black text-black dark:text-white leading-tight mb-1.5">{item.title}</h3>
        <p className="text-sm font-bold text-[#103257] dark:bg-gradient-to-r dark:from-[#2a6db8] dark:to-[#60a5fa] dark:bg-clip-text dark:text-transparent mb-3">{item.company}</p>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-neutral-300 leading-relaxed line-clamp-4 font-medium">
          {item.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {item.tech?.slice(0, 6).map((t, i) => (
          <span key={i} className="px-1.5 py-px bg-gray-100 dark:bg-neutral-800/80 border border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-neutral-300 rounded text-[8px] font-bold uppercase transition-all duration-300 group-hover:dark:border-blue-500/30">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const count = experienceData.length

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const SectionTitle = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="font-bold text-black dark:text-gray-100 mb-4 tracking-tight"
        style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>
        Work Experience
      </h2>
      <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-[#103257] to-[#0d4a6b]" />
    </motion.div>
  )

  return (
    <>
      {/* ── MOBILE: touch-scrollable horizontal strip ── */}
      <div className="lg:hidden box-border bg-white dark:bg-black rounded-t-[2.5rem] border-t border-gray-100 dark:border-neutral-800 min-h-screen flex flex-col">
        {/* Title always at top — visible when section is stuck */}
        <div className="px-4 sm:px-6 pt-10 pb-4 border-b border-gray-100 dark:border-neutral-800 shrink-0">
          <h2 className="font-bold text-black dark:text-gray-100 tracking-tight"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>Work Experience</h2>
          <div className="w-10 h-1 bg-gradient-to-r from-[#103257] to-[#0d4a6b] mt-2 rounded-full" />
        </div>
        {/* Swipeable cards */}
        <div className="flex gap-4 overflow-x-auto py-6 px-4 sm:px-6 snap-x snap-mandatory no-scrollbar shrink-0">
          {experienceData.map((item, idx) => (
            <div key={idx} className="snap-start">
              <ExperienceCard item={item} idx={idx} />
            </div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP: scroll-driven horizontal animation ── */}
      <div
        ref={containerRef}
        className="hidden lg:block box-border px-6 sm:px-8 bg-white dark:bg-black relative z-30 rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800 shadow-[0_-10px_50px_rgba(0,0,0,0.05)]"
        style={{ height: `${count * 100 + 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
          <div className="absolute top-[15%] w-full max-w-6xl mx-auto px-8">
            {SectionTitle}
          </div>
          <div className="w-full flex items-center h-[420px] relative mt-24">
            <motion.div
              style={{
                x: useTransform(
                  scrollYProgress,
                  [0.2, 0.9],
                  [0, -(count * 320 - (typeof window !== 'undefined' ? window.innerWidth * 0.6 : 0))]
                ),
              }}
              className="flex gap-6 px-[15vw] absolute left-0"
            >
              {experienceData.map((item, idx) => (
                <ExperienceCard key={idx} item={item} idx={idx} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

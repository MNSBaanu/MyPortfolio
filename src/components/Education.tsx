import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { education as educationData } from '../data/portfolio'

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null)
  const count = educationData.length

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="lg:hidden box-border bg-white dark:bg-neutral-900 rounded-t-[2.5rem] border-t border-gray-100 dark:border-neutral-800 min-h-screen flex flex-col">
        <div className="px-4 sm:px-6 pt-10 pb-4 border-b border-gray-100 dark:border-neutral-800 shrink-0">
          <h2 className="font-bold text-black dark:text-gray-100 tracking-tight"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>Education</h2>
          <div className="w-10 h-1 bg-black dark:bg-white mt-2 rounded-full" />
        </div>
        <div className="flex gap-4 overflow-x-auto py-6 px-4 sm:px-6 snap-x snap-mandatory no-scrollbar shrink-0">
          {educationData.map((item, idx) => (
            <div key={idx} className="snap-start flex-shrink-0 w-[260px] xs:w-[280px] sm:w-[300px]">
              <div className="p-4 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-black/60 backdrop-blur-xl shadow-lg h-[240px] flex flex-col">
                <div className="flex flex-col gap-1 mb-3">
                  <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Education</span>
                  <span className="text-[9px] font-bold bg-black dark:bg-white text-white dark:text-black px-2.5 py-0.5 rounded-full self-start whitespace-nowrap">{item.period}</span>
                </div>
                <h3 className="text-sm font-medium text-black dark:text-white leading-tight mb-1">{item.title}</h3>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">{item.institution}</p>
                <p className="text-[11px] text-gray-600 dark:text-neutral-300 leading-relaxed line-clamp-4 font-medium">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div
        ref={containerRef}
        className="hidden lg:block box-border px-6 sm:px-8 bg-white dark:bg-neutral-900 rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800 shadow-[0_-10px_50px_rgba(0,0,0,0.05)]"
        style={{ height: `${count * 70 + 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
          <div className="absolute top-[15%] w-full max-w-6xl mx-auto px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <h2 className="font-bold text-black dark:text-gray-100 mb-4 tracking-tight" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>Education</h2>
              <div className="w-16 h-1 bg-black dark:bg-white" />
            </motion.div>
          </div>
          <div className="w-full flex items-center h-[420px] relative mt-24">
            <motion.div
              style={{ x: useTransform(scrollYProgress, [0.2, 0.9], [0, -(count * 306 - (typeof window !== 'undefined' ? window.innerWidth * 0.6 : 0))]) }}
              className="flex gap-6 px-[15vw] absolute left-0"
            >
              {educationData.map((item, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.1 }} viewport={{ once: true }}
                  className="w-[300px] flex-shrink-0 p-4 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-black/60 backdrop-blur-xl shadow-lg h-[260px] flex flex-col group">
                  <div className="flex flex-col gap-1 mb-3">
                    <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Education</span>
                    <span className="text-[9px] font-bold bg-black dark:bg-white text-white dark:text-black px-2.5 py-0.5 rounded-full self-start whitespace-nowrap">{item.period}</span>
                  </div>
                  <h3 className="text-base font-medium text-black dark:text-white leading-tight mb-1.5">{item.title}</h3>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">{item.institution}</p>
                  <p className="text-xs text-gray-600 dark:text-neutral-300 leading-relaxed font-medium line-clamp-4">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

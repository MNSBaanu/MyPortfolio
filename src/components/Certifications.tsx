import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { certifications as certificationsData } from '../data/portfolio'

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null)
  const count = certificationsData.length

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="lg:hidden box-border bg-white dark:bg-black rounded-t-[2.5rem] border-t border-gray-100 dark:border-neutral-800 min-h-screen flex flex-col">
        {/* Title always at top — visible when section is stuck */}
        <div className="px-4 sm:px-6 pt-10 pb-4 border-b border-gray-100 dark:border-neutral-800 shrink-0">
          <h2 className="font-bold text-black dark:text-gray-100 tracking-tight"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>Certifications</h2>
          <div className="w-10 h-1 bg-gradient-to-r from-[#103257] to-[#0d4a6b] mt-2 rounded-full" />
        </div>
        {/* Swipeable cards */}
        <div className="flex gap-4 overflow-x-auto py-6 px-4 sm:px-6 snap-x snap-mandatory no-scrollbar shrink-0">
          {certificationsData.map((item, idx) => (
            <div key={idx} className="snap-start flex-shrink-0 w-[240px] xs:w-[260px] sm:w-[280px]">
              <div className="p-4 rounded-2xl border border-[#103257]/10 dark:border-[#103257]/30 bg-white/80 dark:bg-black/60 backdrop-blur-xl shadow-lg h-[320px] flex flex-col">
                <div className="flex flex-col gap-1 mb-3">
                  <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Cert</span>
                  <span className="text-[9px] font-bold bg-[#103257] text-white px-2.5 py-0.5 rounded-full self-start whitespace-nowrap">{item.date}</span>
                </div>
                <h3 className="text-sm font-black text-black dark:text-white leading-tight mb-1 line-clamp-2">{item.title}</h3>
                <p className="text-xs font-bold text-[#103257] dark:bg-gradient-to-r dark:from-[#2a6db8] dark:to-[#60a5fa] dark:bg-clip-text dark:text-transparent mb-3">{item.issuer}</p>
                <div className="mt-auto w-full aspect-video rounded-xl overflow-hidden border border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400/103257/ffffff?text=CERT' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div
        ref={containerRef}
        className="hidden lg:block box-border px-6 sm:px-8 bg-white dark:bg-black rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800 shadow-[0_-10px_50px_rgba(0,0,0,0.05)]"
        style={{ height: `${count * 70 + 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
          <div className="absolute top-[15%] w-full max-w-6xl mx-auto px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <h2 className="font-bold text-black dark:text-gray-100 mb-4 tracking-tight" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>Certifications</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#103257] to-[#0d4a6b]" />
            </motion.div>
          </div>
          <div className="w-full flex items-center h-[420px] relative mt-24">
            <motion.div
              style={{ x: useTransform(scrollYProgress, [0.2, 0.9], [0, -(count * 306 - (typeof window !== 'undefined' ? window.innerWidth * 0.6 : 0))]) }}
              className="flex gap-6 px-[15vw] absolute left-0"
            >
              {certificationsData.map((item, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.1 }} viewport={{ once: true }}
                  className="w-[280px] flex-shrink-0 p-4 rounded-2xl border border-[#103257]/10 dark:border-[#103257]/30 bg-white/80 dark:bg-black/60 backdrop-blur-xl shadow-lg h-[370px] flex flex-col group">
                  <div className="flex flex-col gap-1 mb-3">
                    <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Cert</span>
                    <span className="text-[9px] font-bold bg-[#103257] text-white px-2.5 py-0.5 rounded-full self-start whitespace-nowrap">{item.date}</span>
                  </div>
                  <h3 className="text-base font-black text-black dark:text-white leading-tight mb-1.5 line-clamp-2">{item.title}</h3>
                  <p className="text-sm font-bold text-[#103257] dark:bg-gradient-to-r dark:from-[#2a6db8] dark:to-[#60a5fa] dark:bg-clip-text dark:text-transparent mb-3">{item.issuer}</p>
                  <div className="mt-auto w-full aspect-video rounded-xl overflow-hidden border border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 group">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400/103257/ffffff?text=CERTIFICATE' }} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

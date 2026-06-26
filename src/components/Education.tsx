import { motion } from 'framer-motion'
import { education as educationData } from '../data/portfolio'

export default function Education() {
  return (
    <div className="box-border bg-white dark:bg-neutral-900 rounded-t-[2.5rem] sm:rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800 shadow-[0_-10px_50px_rgba(0,0,0,0.08)] min-h-screen flex flex-col">
      <div className="px-4 sm:px-6 lg:px-8 pt-10 pb-4 border-b border-gray-100 dark:border-neutral-800 shrink-0 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-gray-100 mb-4 tracking-tight">
          Education
        </h2>
      </div>
      <div className="flex gap-4 overflow-x-auto py-6 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory no-scrollbar flex-1 items-center">
        {educationData.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="snap-start flex-shrink-0 w-[260px] xs:w-[280px] sm:w-[300px]"
          >
            <div className="p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-black/60 backdrop-blur-xl shadow-lg h-[240px] sm:h-[260px] flex flex-col">
              <div className="flex flex-col gap-1 mb-3">
                <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Education</span>
                <span className="text-[9px] font-bold bg-black dark:bg-white text-white dark:text-black px-2.5 py-0.5 rounded-full self-start whitespace-nowrap">{item.period}</span>
              </div>
              <h3 className="text-sm sm:text-base font-medium text-black dark:text-white leading-tight mb-1">{item.title}</h3>
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{item.institution}</p>
              <p className="text-[11px] sm:text-xs text-gray-600 dark:text-neutral-300 leading-relaxed line-clamp-4 font-medium">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

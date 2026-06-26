import { motion } from 'framer-motion'
import { education as educationData } from '../data/portfolio'

export default function Education() {
  return (
    <div
      className="box-border px-6 sm:px-8 bg-white dark:bg-neutral-900 relative rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800 shadow-[0_-10px_50px_rgba(0,0,0,0.08)]"
      style={{
        height: '100vh',
        paddingTop: 'calc(var(--header-height, 0px) + 2rem)',
      }}
    >
      <div className="h-full max-w-7xl mx-auto flex flex-col min-h-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 shrink-0"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-gray-100 mb-4 tracking-tight">
            Education
          </h2>
        </motion.div>

        <div className="flex gap-4 overflow-x-auto overflow-y-visible py-2 px-1 snap-x snap-mandatory no-scrollbar flex-1 min-h-0 items-center">
          {educationData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="snap-start flex-shrink-0 w-[260px] xs:w-[280px] sm:w-[300px]"
            >
              <div className="p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-black/60 backdrop-blur-xl shadow-lg min-h-[240px] sm:min-h-[260px] flex flex-col">
                <div className="shrink-0 text-center mb-3">
                  <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Education</span>
                  <span className="block mt-1 text-[9px] font-bold bg-black dark:bg-white text-white dark:text-black px-2.5 py-0.5 rounded-full whitespace-nowrap w-fit mx-auto">
                    {item.period}
                  </span>
                </div>
                <h3 className="shrink-0 text-sm sm:text-base font-medium text-black dark:text-white leading-tight mb-1 text-center">
                  {item.title}
                </h3>
                <p className="shrink-0 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 text-center">
                  {item.institution}
                </p>
                <p className="text-[11px] sm:text-xs text-gray-600 dark:text-neutral-300 leading-relaxed line-clamp-4 font-medium flex-1">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

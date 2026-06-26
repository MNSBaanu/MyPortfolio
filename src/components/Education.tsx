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
      <div className="h-full max-w-3xl mx-auto flex flex-col min-h-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8 shrink-0"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-gray-100 tracking-tight">
            Education
          </h2>
        </motion.div>

        <div className="flex-1 min-h-0 flex flex-col justify-center py-2">
          <div className="relative">
            <div
              className="absolute left-[4.5rem] sm:left-[5.5rem] top-2 bottom-2 w-px bg-gray-200 dark:bg-neutral-800"
              aria-hidden="true"
            />

            <ul className="space-y-4 sm:space-y-5">
              {educationData.map((item, idx) => (
                <motion.li
                  key={item.title + item.period}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  viewport={{ once: true }}
                  className="relative flex gap-4 sm:gap-6"
                >
                  <div className="shrink-0 w-16 sm:w-20 text-right">
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-400 dark:text-gray-500 leading-snug block">
                      {item.period}
                    </span>
                  </div>

                  <div className="relative shrink-0 pt-1.5">
                    <span className="block w-2 h-2 rounded-full bg-black dark:bg-white ring-4 ring-white dark:ring-neutral-900" />
                  </div>

                  <div className="flex-1 min-w-0 pb-1">
                    <h3 className="text-sm sm:text-base font-semibold text-black dark:text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      {item.institution}
                    </p>
                    <p className="text-[11px] sm:text-xs text-gray-600 dark:text-neutral-400 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

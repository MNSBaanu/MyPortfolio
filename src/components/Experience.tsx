import { motion } from 'framer-motion'
import { experience as experienceData } from '../data/portfolio'

export default function Experience() {
  return (
    <div
      className="box-border px-6 sm:px-8 bg-white dark:bg-black relative rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800 shadow-[0_-10px_50px_rgba(0,0,0,0.08)]"
      style={{
        height: '100vh',
        paddingTop: 'calc(var(--header-height, 0px) + 2rem)',
      }}
    >
      <div className="h-full max-w-5xl mx-auto flex flex-col min-h-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8 shrink-0"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-gray-100 tracking-tight">
            Work Experience
          </h2>
        </motion.div>

        <div className="flex-1 min-h-0 flex flex-col justify-center py-2 overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {experienceData.map((item, idx) => (
              <motion.article
                key={item.title + item.period}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className={`flex flex-col p-4 sm:p-5 rounded-2xl bg-gray-50 dark:bg-neutral-950 border border-gray-200/80 dark:border-neutral-800 ${
                  idx === experienceData.length - 1 && experienceData.length % 2 !== 0
                    ? 'sm:col-span-2 sm:max-w-md sm:mx-auto sm:w-full'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-sm sm:text-base font-semibold text-black dark:text-white leading-snug">
                    {item.title}
                  </h3>
                  <span className="shrink-0 text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-gray-500 dark:text-neutral-400 bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 px-2 py-1 rounded-full whitespace-nowrap">
                    {item.period}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  {item.company}
                </p>
                {item.type && (
                  <p className="text-[10px] sm:text-xs text-gray-400 dark:text-neutral-500 mb-2">
                    {item.type}
                  </p>
                )}

                <p className="text-[11px] sm:text-xs text-gray-600 dark:text-neutral-400 leading-relaxed line-clamp-3 flex-1">
                  {item.description}
                </p>

                {item.tech && item.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-200/80 dark:border-neutral-800">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[9px] font-semibold rounded-md bg-black dark:bg-white text-white dark:text-black"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

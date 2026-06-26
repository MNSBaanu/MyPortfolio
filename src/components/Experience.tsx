import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { experience as experienceData } from '../data/portfolio'

export default function Experience() {
  const [selected, setSelected] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setSelected((prev) => (prev === idx ? null : idx))
  }

  const active = selected !== null ? experienceData[selected] : null

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
          className="text-center mb-5 sm:mb-6 shrink-0"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-gray-100 tracking-tight">
            Work Experience
          </h2>
        </motion.div>

        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-6 lg:gap-10 overflow-hidden">
          <div className="lg:w-[40%] shrink-0 min-h-0 overflow-y-auto no-scrollbar border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-neutral-800 pb-4 lg:pb-0 lg:pr-6">
            {experienceData.map((item, idx) => {
              const isOpen = selected === idx
              return (
                <button
                  key={item.title + item.period}
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className={`w-full text-left py-3 sm:py-3.5 pl-3 border-l-2 transition-colors duration-200 ${
                    isOpen
                      ? 'border-black dark:border-white'
                      : 'border-transparent hover:border-gray-300 dark:hover:border-neutral-600'
                  }`}
                >
                  <p
                    className={`text-sm sm:text-base leading-snug ${
                      isOpen
                        ? 'font-semibold text-black dark:text-white'
                        : 'font-medium text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {item.title}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {item.period}
                  </p>
                </button>
              )
            })}
          </div>

          <div className="flex-1 min-h-0 min-w-0 overflow-y-auto no-scrollbar">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.article
                  key={selected}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="py-1"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-black dark:text-white leading-snug">
                      {active.title}
                    </h3>
                    <span className="shrink-0 text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap">
                      {active.period}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    {active.company}
                  </p>
                  {active.type && (
                    <p className="text-xs text-gray-400 dark:text-neutral-500 mb-4">
                      {active.type}
                    </p>
                  )}

                  <p className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">
                    {active.description}
                  </p>

                  {active.tech && active.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-5">
                      {active.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[10px] font-medium rounded-md border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.article>
              ) : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-gray-400 dark:text-gray-500 py-4"
                >
                  Select a role to view details
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

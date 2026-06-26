import { motion } from 'framer-motion'
import { about, projects, experience, skillCategories } from '../data/portfolio'

const descriptions = [about.description1, about.description2, about.description3]

const techCount = skillCategories.reduce((total, category) => total + category.skills.length, 0)

const aboutStats = [
  { number: `${projects.length}+`, label: 'Projects' },
  { number: `${techCount}+`, label: 'Technologies' },
  { number: String(experience.length), label: 'Experience' },
]

export default function About() {
  return (
    <div
      className="box-border px-6 sm:px-8 bg-slate-100 dark:bg-neutral-900 relative rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-gray-200/50 dark:border-neutral-800 shadow-[0_-10px_50px_rgba(0,0,0,0.08)]"
      style={{
        height: '100vh',
        paddingTop: 'calc(var(--header-height, 0px) + 2rem)',
      }}
    >
      <div className="h-full max-w-3xl mx-auto flex flex-col min-h-0 overflow-y-auto no-scrollbar">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center shrink-0 mb-5 sm:mb-6"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-gray-100 tracking-tight">
            About Me
          </h2>
        </motion.div>

        <div className="flex flex-col items-center text-center pb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-5 max-w-2xl mx-auto mb-8 sm:mb-10"
          >
            {descriptions.map((text) => (
              <p
                key={text.slice(0, 24)}
                className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                {text}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-10 w-full max-w-md mx-auto"
          >
            {aboutStats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight">
                  {stat.number}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-3 sm:mb-4">
              Core Identity
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {about.identityTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 shadow-sm text-gray-700 dark:text-gray-300 text-[10px] sm:text-[11px] font-bold tracking-tight"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

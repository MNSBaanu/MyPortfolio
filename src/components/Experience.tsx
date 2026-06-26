import { motion } from 'framer-motion'
import { experience as experienceData } from '../data/portfolio'

function ExperienceCard({ item, idx }: { item: typeof experienceData[0]; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      viewport={{ once: true }}
      className="w-[270px] sm:w-[300px] flex-shrink-0 p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-black/60 backdrop-blur-xl shadow-lg transition-all duration-500 min-h-[340px] sm:min-h-[370px] flex flex-col group"
    >
      <div className="shrink-0 text-center mb-3">
        <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Experience</span>
        <span className="block mt-1 text-[9px] font-bold bg-black dark:bg-white text-white dark:text-black px-2.5 py-0.5 rounded-full whitespace-nowrap w-fit mx-auto">
          {item.period}
        </span>
      </div>
      <h3 className="shrink-0 text-base sm:text-lg font-medium text-black dark:text-white leading-tight mb-1.5 text-center">
        {item.title}
      </h3>
      <p className="shrink-0 text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 text-center">{item.company}</p>
      <p className="text-xs sm:text-sm text-gray-600 dark:text-neutral-300 leading-relaxed line-clamp-4 font-medium flex-1">
        {item.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-3 shrink-0 justify-center">
        {item.tech?.slice(0, 6).map((t, i) => (
          <span key={i} className="px-1.5 py-px bg-gray-100 dark:bg-neutral-800/80 border border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-neutral-300 rounded text-[8px] font-bold uppercase transition-all duration-300">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <div
      className="box-border px-6 sm:px-8 bg-white dark:bg-black relative rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800 shadow-[0_-10px_50px_rgba(0,0,0,0.08)]"
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
            Work Experience
          </h2>
        </motion.div>

        <div className="flex gap-4 overflow-x-auto overflow-y-visible py-2 px-1 snap-x snap-mandatory no-scrollbar flex-1 min-h-0 items-center">
          {experienceData.map((item, idx) => (
            <div key={idx} className="snap-start">
              <ExperienceCard item={item} idx={idx} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

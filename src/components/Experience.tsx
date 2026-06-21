import { motion } from 'framer-motion'
import { experience as experienceData } from '../data/portfolio'

function ExperienceCard({ item, idx }: { item: typeof experienceData[0]; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      viewport={{ once: true }}
      className="w-[270px] sm:w-[300px] flex-shrink-0 p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-black/60 backdrop-blur-xl shadow-lg transition-all duration-500 h-[340px] sm:h-[370px] flex flex-col justify-between group"
    >
      <div>
        <div className="flex flex-col gap-1 mb-3">
          <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Experience</span>
          <span className="text-[9px] font-bold bg-black dark:bg-white text-white dark:text-black px-2.5 py-0.5 rounded-full self-start whitespace-nowrap">{item.period}</span>
        </div>
        <h3 className="text-base sm:text-lg font-medium text-black dark:text-white leading-tight mb-1.5">{item.title}</h3>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">{item.company}</p>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-neutral-300 leading-relaxed line-clamp-4 font-medium">
          {item.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-3">
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
    <div className="box-border bg-white dark:bg-black rounded-t-[2.5rem] sm:rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800 shadow-[0_-10px_50px_rgba(0,0,0,0.08)] min-h-screen flex flex-col">
      <div className="px-4 sm:px-6 lg:px-8 pt-10 pb-4 border-b border-gray-100 dark:border-neutral-800 shrink-0">
        <h2 className="font-bold text-black dark:text-gray-100 tracking-tight" style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}>
          Work Experience
        </h2>
        <div className="w-10 sm:w-16 h-1 bg-black dark:bg-white mt-2 rounded-full" />
      </div>
      <div className="flex gap-4 overflow-x-auto py-6 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory no-scrollbar flex-1 items-center">
        {experienceData.map((item, idx) => (
          <div key={idx} className="snap-start">
            <ExperienceCard item={item} idx={idx} />
          </div>
        ))}
      </div>
    </div>
  )
}

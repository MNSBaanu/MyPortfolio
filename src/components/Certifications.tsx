import { motion } from 'framer-motion'
import { certifications as certificationsData } from '../data/portfolio'

export default function Certifications() {
  return (
    <div className="box-border bg-white dark:bg-black rounded-t-[2.5rem] sm:rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800 shadow-[0_-10px_50px_rgba(0,0,0,0.08)] min-h-screen flex flex-col">
      <div className="px-4 sm:px-6 lg:px-8 pt-10 pb-4 border-b border-gray-100 dark:border-neutral-800 shrink-0">
        <h2 className="font-bold text-black dark:text-gray-100 tracking-tight" style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}>
          Certifications
        </h2>
        <div className="w-10 sm:w-16 h-1 bg-black dark:bg-white mt-2 rounded-full" />
      </div>
      <div className="flex gap-4 overflow-x-auto py-6 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory no-scrollbar flex-1 items-center">
        {certificationsData.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="snap-start flex-shrink-0 w-[240px] xs:w-[260px] sm:w-[280px]"
          >
            <div className="p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-black/60 backdrop-blur-xl shadow-lg h-[320px] sm:h-[370px] flex flex-col group">
              <div className="flex flex-col gap-1 mb-3">
                <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Cert</span>
                <span className="text-[9px] font-bold bg-black dark:bg-white text-white dark:text-black px-2.5 py-0.5 rounded-full self-start whitespace-nowrap">{item.date}</span>
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-black dark:text-white leading-tight mb-1 line-clamp-2">{item.title}</h3>
              <p className="text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 mb-3">{item.issuer}</p>
              <div className="mt-auto w-full aspect-video rounded-xl overflow-hidden border border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400/111111/ffffff?text=CERT' }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

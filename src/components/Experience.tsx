import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { experience as experienceData } from '../data/portfolio'

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const count = experienceData.length

  return (
    <div
      ref={containerRef}
      className="box-border px-6 sm:px-8 bg-white dark:bg-black relative z-30 rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800 shadow-[0_-10px_50px_rgba(0,0,0,0.05)]"
      style={{ height: `${count * 100 + 100}vh` }} 
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        {/* Topic (Left Title Style like About) */}
        <div className="absolute top-[15%] w-full max-w-6xl mx-auto px-4 sm:px-8">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
           >
             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-gray-100 mb-6 tracking-tight">
               Work Experience
             </h2>
             <div className="w-16 h-1 bg-gradient-to-r from-[#103257] to-[#0d4a6b]"></div>
           </motion.div>
        </div>

        {/* Horizontal Cards Content */}
        <div className="w-full flex items-center h-[500px] relative mt-24">
          <motion.div 
            style={{ 
              x: useTransform(scrollYProgress, [0.2, 0.9], [0, -(count * 380 - (typeof window !== 'undefined' ? window.innerWidth * 0.6 : 0))])
            }}
            className="flex gap-8 px-[15vw] absolute left-0"
          >
            {experienceData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="w-[350px] flex-shrink-0 p-6 rounded-[2rem] border border-[#103257]/10 dark:border-[#103257]/30 bg-white/80 dark:bg-black/60 backdrop-blur-xl shadow-xl hover:shadow-[#103257]/10 dark:hover:shadow-[#103257]/30 transition-all duration-500 h-[450px] flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                     <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Experience</span>
                      <span className="text-[10px] font-bold bg-[#103257] text-white px-3 py-1 rounded-full">{item.period}</span>
                  </div>
                  <h3 className="text-xl font-black text-black dark:text-white leading-tight mb-2">{item.title}</h3>
                  <p className="text-base font-bold text-[#103257] dark:bg-gradient-to-r dark:from-[#2a6db8] dark:to-[#60a5fa] dark:bg-clip-text dark:text-transparent mb-4">{item.company}</p>
                  <p className="text-sm text-gray-600 dark:text-neutral-300 leading-relaxed line-clamp-4 font-medium">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-4">
                   {item.tech?.slice(0, 6).map((t, i) => (
                     <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-neutral-800/80 border border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-neutral-300 rounded-md text-[9px] font-bold uppercase transition-all duration-300 group-hover:dark:border-blue-500/30">
                       {t}
                     </span>
                   ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

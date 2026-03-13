import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { certifications as certificationsData } from '../data/portfolio'

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const count = certificationsData.length

  return (
    <div
      ref={containerRef}
      className="box-border px-6 sm:px-8 bg-white dark:bg-black relative z-30 rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800 shadow-[0_-10px_50px_rgba(0,0,0,0.05)]"
      style={{ height: `${count * 70 + 100}vh` }} 
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        {/* Topic Style like About */}
        <div className="absolute top-[15%] w-full max-w-6xl mx-auto px-4 sm:px-8">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
           >
             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-gray-100 mb-6 tracking-tight">
               Certifications
             </h2>
             <div className="w-16 h-1 bg-gradient-to-r from-[#103257] to-[#0d4a6b]"></div>
           </motion.div>
        </div>

        {/* Horizontal Cards Content */}
        <div className="w-full flex items-center h-[500px] relative mt-24">
          <motion.div 
            style={{ 
              x: useTransform(scrollYProgress, [0.2, 0.9], [0, -(count * 340 - (typeof window !== 'undefined' ? window.innerWidth * 0.6 : 0))])
            }}
            className="flex gap-6 px-[15vw] absolute left-0"
          >
            {certificationsData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="w-[320px] flex-shrink-0 p-5 rounded-[2rem] border border-[#103257]/10 dark:border-[#103257]/30 bg-white/80 dark:bg-black/60 backdrop-blur-xl shadow-xl hover:shadow-[#103257]/10 dark:hover:shadow-[#103257]/30 transition-all duration-500 h-[400px] flex flex-col group"
              >
                  <div className="flex justify-between items-center mb-3">
                     <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Cert</span>
                     <span className="text-[10px] font-bold bg-[#103257] text-white px-3 py-1 rounded-full">{item.date}</span>
                  </div>
                  
                  <h3 className="text-lg font-black text-black dark:text-white leading-tight mb-2 truncate">{item.title}</h3>
                  <p className="text-sm font-bold text-[#103257] dark:bg-gradient-to-r dark:from-[#2a6db8] dark:to-[#60a5fa] dark:bg-clip-text dark:text-transparent mb-4">{item.issuer}</p>
                  
                  <div className="mt-auto w-full aspect-video rounded-xl overflow-hidden border border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 group">
                      <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.src = `https://placehold.co/400x400/103257/ffffff?text=CERTIFICATE`;
                      }}
                      />
                  </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

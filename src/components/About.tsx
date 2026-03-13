import { motion } from 'framer-motion'
import { about } from '../data/portfolio'

export default function About() {
  return (
    <div
      className="box-border px-6 sm:px-8 bg-slate-100 dark:bg-neutral-900 relative z-10 rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-gray-200 dark:border-neutral-800"
      style={{
        minHeight: '100vh',
        paddingTop: 'calc(var(--header-height, 0px) + 5rem)',
        paddingBottom: '5rem',
      }}
      id="about"
    >
      <div className="max-w-6xl mx-auto h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start w-full">
          
          {/* Left Side: Image - Moved up with blue glow effect */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative group lg:order-1 lg:-mt-12"
          >

            <div className="relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
              <img 
                src="/assets/about.png" 
                alt="MNSBaanu" 
                className="w-full h-auto block"
              />
              {/* Fade effect on the right side to blend with background/text area */}
              <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-slate-100 dark:from-neutral-900 to-transparent pointer-events-none"></div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </motion.div>

          {/* Right Side: Content - Tighter integration */}
          <div className="flex flex-col text-left lg:order-2 pt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-gray-100 mb-6 tracking-tight">
                About Me
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#103257] to-[#0d4a6b] rounded-full"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6 mb-10"
            >
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                {about.description1}
              </p>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                {about.description2}
              </p>
            </motion.div>

            {/* Highlights Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-4">
                Core Identity
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Software Engineering Student', 'Tech Enthusiast', 'Problem Solver', 'Quick Learner'].map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    whileHover={{ scale: 1.05, borderColor: '#103257' }}
                    viewport={{ once: true }}
                    className="px-4 py-2 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 shadow-sm text-gray-700 dark:text-gray-300 text-[11px] font-bold tracking-tight transition-all duration-300 cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  )
}

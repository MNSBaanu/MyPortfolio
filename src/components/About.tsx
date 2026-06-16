import { motion } from 'framer-motion'
import { about } from '../data/portfolio'

export default function About() {
  return (
    <div
      id="about"
      className="box-border px-4 sm:px-6 md:px-8 bg-slate-100 dark:bg-neutral-900 relative z-10 rounded-t-[2.5rem] sm:rounded-t-[4rem] border-t border-gray-200/50 dark:border-neutral-800"
      style={{
        minHeight: '100vh',
        paddingTop: 'calc(var(--header-height, 0px) + 3rem)',
        paddingBottom: '4rem',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-center w-full">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="relative group order-2 lg:order-1"
          >
            <div className="relative z-10 overflow-hidden rounded-2xl border border-gray-200/80 dark:border-neutral-800 bg-white dark:bg-black shadow-sm transition-transform duration-500 group-hover:scale-[1.01]">
              <img
                src="/assets/about.png"
                alt="MNSBaanu"
                className="w-full h-auto block object-cover"
              />
            </div>
          </motion.div>

          <div className="relative z-10 flex flex-col text-left order-1 lg:order-2">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="mb-5 sm:mb-8"
            >
              <h2
                className="font-semibold text-black dark:text-gray-100 mb-4 tracking-tight"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
              >
                About Me
              </h2>
              <div className="w-12 sm:w-16 h-1 bg-black dark:bg-white rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6 mb-7 sm:mb-10"
            >
              <p
                className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium"
                style={{ fontSize: 'clamp(0.85rem, 2vw, 1.05rem)' }}
              >
                {about.description1}
              </p>
              <p
                className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium"
                style={{ fontSize: 'clamp(0.85rem, 2vw, 1.05rem)' }}
              >
                {about.description2}
              </p>
              <p
                className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium"
                style={{ fontSize: 'clamp(0.85rem, 2vw, 1.05rem)' }}
              >
                {about.description3}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-3 sm:mb-4">
                Core Identity
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Full-Stack Engineer', 'AI Enthusiast', 'Problem Solver', 'Lifelong Learner'].map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    whileHover={{ scale: 1.05, borderColor: '#000000' }}
                    viewport={{ once: true }}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 shadow-sm text-gray-700 dark:text-gray-300 text-[10px] sm:text-[11px] font-bold tracking-tight transition-all duration-300 cursor-default"
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

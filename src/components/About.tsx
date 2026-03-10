import { motion } from 'framer-motion'
import { about } from '../data/portfolio'

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">
            About Me
          </h2>
          <div className="w-16 h-1 bg-black"></div>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-16">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl space-y-6"
          >
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              {about.description1}
            </p>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
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
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Highlights
            </h3>
            <div className="flex flex-wrap gap-3">
              {['Software Engineering Student', 'Tech Enthusiast', 'Problem Solver', 'Quick Learner'].map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  viewport={{ once: true }}
                  className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 text-sm font-medium hover:bg-gray-200 transition-colors duration-300 cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* What I Do */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-gray-200 pt-12"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-black mb-8">
              What I Do
            </h3>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
              {about.services.map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-base text-gray-700 group-hover:text-black transition-colors duration-300 leading-relaxed">
                    {service}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

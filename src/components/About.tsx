import { motion } from 'framer-motion'
import { about } from '../data/portfolio'

export default function About() {
  return (
    <section id="about" className="pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 md:pb-20 px-4 md:px-8 lg:px-12 pr-12 sm:pr-14 md:pr-16 lg:pr-20 xl:pr-24 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center text-teal-100">About Me</h2>
          
          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12"
          >
            <span className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full border-2 border-teal-600 text-teal-400 text-xs sm:text-sm hover:bg-teal-600/10 transition-colors duration-300">
              Software Engineering Student
            </span>
            <span className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full border-2 border-teal-600 text-teal-400 text-xs sm:text-sm hover:bg-teal-600/10 transition-colors duration-300">
              Tech Enthusiast
            </span>
            <span className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full border-2 border-teal-600 text-teal-400 text-xs sm:text-sm hover:bg-teal-600/10 transition-colors duration-300">
              Problem Solver
            </span>
            <span className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full border-2 border-teal-600 text-teal-400 text-xs sm:text-sm hover:bg-teal-600/10 transition-colors duration-300">
              Quick Learner
            </span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="pl-4 sm:pl-8 md:pl-16"
            >
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed sm:leading-loose">
                {about.description1}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed sm:leading-loose">
                {about.description2}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-black py-4 sm:py-5 md:py-6 pl-4 sm:pl-6 md:pl-8 pr-6 sm:pr-8 md:pr-12 rounded-xl sm:rounded-2xl shadow-lg border border-gray-800 w-fit ml-0 sm:ml-4 md:ml-8"
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 md:mb-6 text-teal-400">What I Do</h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
                {about.services.map((service) => (
                  <li key={service} className="flex items-start group">
                    <span className="text-teal-400 mr-2 sm:mr-3 text-base sm:text-lg md:text-xl group-hover:scale-125 transition-transform duration-300">✓</span>
                    <span className="text-sm sm:text-base text-gray-300 group-hover:text-teal-400 transition-colors duration-300">{service}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { about } from '../data/portfolio'

export default function About() {
  return (
    <section id="about" className="pt-8 pb-20 px-4 md:px-8 lg:px-12 pr-24 md:pr-28 lg:pr-32 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-16 text-center text-teal-100">About Me</h2>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-16">
            {about.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-black rounded-2xl shadow-lg border border-gray-800 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">{stat.number}</div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {about.description1}
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                {about.description2}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-black p-8 rounded-2xl shadow-lg border border-gray-800"
            >
              <h3 className="text-2xl font-semibold mb-6 text-teal-400">What I Do</h3>
              <ul className="space-y-4">
                {about.services.map((service) => (
                  <li key={service} className="flex items-start group">
                    <span className="text-teal-400 mr-3 text-xl group-hover:scale-125 transition-transform duration-300">✓</span>
                    <span className="text-gray-300 group-hover:text-teal-400 transition-colors duration-300">{service}</span>
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

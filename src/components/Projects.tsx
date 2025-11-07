import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { projects } from '../data/portfolio'
import { useState } from 'react'

export default function Projects() {
  const [clickedProject, setClickedProject] = useState<string | null>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section id="projects" className="pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 md:pb-20 px-4 md:px-8 lg:px-12 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center text-teal-100">Projects</h2>
          <p className="text-center text-gray-400 text-sm sm:text-base">Click on a project to explore</p>
        </motion.div>

        <div className="flex gap-2 sm:gap-4 h-[500px] sm:h-[600px]">
          {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-gradient-to-br from-teal-900/20 to-black rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-teal-600 relative"
              >
                {/* Project Image */}
                <div className="aspect-video bg-teal-900/10 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/600x400/0f766e/ffffff?text=' + project.title
                    }}
                  />
                </div>
                
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-200 group-hover:text-teal-400 transition-colors duration-300">{project.title}</h3>
                      <p className="text-xs sm:text-sm text-teal-400 mt-1">{project.period}</p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={(e) => {
                          e.preventDefault()
                          setClickedProject(project.title)
                          setTimeout(() => setClickedProject(null), 3000)
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.button>
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
                      >
                        <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.a>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-teal-900/30 border border-teal-700/50 text-teal-300 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Coming Soon Overlay */}
                {clickedProject === project.title && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 backdrop-blur-md bg-black/60 flex items-center justify-center z-10 rounded-xl sm:rounded-2xl"
                  >
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="text-center px-4"
                    >
                      <h3 className="text-xl sm:text-2xl font-bold text-teal-400 mb-2">
                        Coming Soon
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300">
                        Live demo will be available soon
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

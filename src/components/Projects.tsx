import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react'
import { projects } from '../data/portfolio'
import { useState } from 'react'

export default function Projects() {
  const [clickedProject, setClickedProject] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [imageIndices, setImageIndices] = useState<{ [key: string]: number }>({})
  
  const projectsPerPage = 4 // 2 rows x 2 columns
  const totalPages = Math.ceil(projects.length / projectsPerPage)
  const startIndex = currentPage * projectsPerPage
  const endIndex = startIndex + projectsPerPage
  const currentProjects = projects.slice(startIndex, endIndex)

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <section id="projects" className="pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 md:pb-20 px-4 md:px-8 lg:px-12 pr-12 sm:pr-14 md:pr-16 lg:pr-20 xl:pr-24 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center text-teal-100">Projects</h2>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6"
            >
              {currentProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-gradient-to-br from-teal-900/20 to-black rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-teal-600 relative"
              >
                {/* Project Image Carousel */}
                <div className="relative h-52 sm:h-64 md:h-72 bg-teal-900/10 overflow-hidden group/image">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imageIndices[project.title] || 0}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      src={project.images[imageIndices[project.title] || 0]}
                      alt={`${project.title} - Image ${(imageIndices[project.title] || 0) + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/600x400/0f766e/ffffff?text=' + project.title
                      }}
                    />
                  </AnimatePresence>

                  {/* Image Navigation - Only show if multiple images */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          const currentIndex = imageIndices[project.title] || 0
                          const newIndex = currentIndex === 0 ? project.images.length - 1 : currentIndex - 1
                          setImageIndices({ ...imageIndices, [project.title]: newIndex })
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-10"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          const currentIndex = imageIndices[project.title] || 0
                          const newIndex = (currentIndex + 1) % project.images.length
                          setImageIndices({ ...imageIndices, [project.title]: newIndex })
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-10"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Image Indicators */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                        {project.images.map((_, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={(e) => {
                              e.stopPropagation()
                              setImageIndices({ ...imageIndices, [project.title]: imgIndex })
                            }}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                              (imageIndices[project.title] || 0) === imgIndex
                                ? 'bg-teal-400 w-4'
                                : 'bg-white/50 hover:bg-white/80'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                <div className="p-3 sm:p-4">
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-200 group-hover:text-teal-400 transition-colors duration-300">{project.title}</h3>
                      <p className="text-xs text-teal-400 mt-1">{project.period}</p>
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
                  <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-teal-900/30 border border-teal-700/50 text-teal-300 rounded-full text-xs font-medium transition-colors duration-300"
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
                      <h3 className="text-lg sm:text-xl font-bold text-teal-400 mb-2">
                        Coming Soon
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-300">
                        Live demo will be available soon
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prevPage}
              disabled={currentPage === 0}
              whileHover={{ scale: currentPage === 0 ? 1 : 1.1 }}
              whileTap={{ scale: currentPage === 0 ? 1 : 0.9 }}
              className={`p-3 rounded-full border transition-all duration-300 ${
                currentPage === 0
                  ? 'border-gray-800 text-gray-600 cursor-not-allowed'
                  : 'border-teal-500 text-teal-400 hover:bg-teal-500/20'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentPage === index
                      ? 'bg-teal-500 w-8'
                      : 'bg-gray-700 hover:bg-teal-500/50'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              whileHover={{ scale: currentPage === totalPages - 1 ? 1 : 1.1 }}
              whileTap={{ scale: currentPage === totalPages - 1 ? 1 : 0.9 }}
              className={`p-3 rounded-full border transition-all duration-300 ${
                currentPage === totalPages - 1
                  ? 'border-gray-800 text-gray-600 cursor-not-allowed'
                  : 'border-teal-500 text-teal-400 hover:bg-teal-500/20'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Page Counter */}
          <div className="text-center mt-4 text-gray-400 text-sm">
            Page {currentPage + 1} of {totalPages}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

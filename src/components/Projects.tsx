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
    <section id="projects" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A showcase of my recent work and technical expertise
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          >
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-gray-300 relative hover:-translate-y-1"
              >
                {/* Project Image Carousel */}
                <div className="relative h-48 sm:h-56 md:h-64 bg-gray-100 overflow-hidden group/image">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imageIndices[project.title] || 0}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      src={project.images[imageIndices[project.title] || 0]}
                      alt={`${project.title} - Image ${(imageIndices[project.title] || 0) + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/600x400/f3f4f6/1f2937?text=${encodeURIComponent(project.title)}`
                      }}
                    />
                  </AnimatePresence>

                  {/* Image Navigation */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          const currentIndex = imageIndices[project.title] || 0
                          const newIndex = currentIndex === 0 ? project.images.length - 1 : currentIndex - 1
                          setImageIndices({ ...imageIndices, [project.title]: newIndex })
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white text-black rounded-full opacity-0 group-hover/image:opacity-100 transition-all duration-300 z-10 shadow-lg"
                      >
                        <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          const currentIndex = imageIndices[project.title] || 0
                          const newIndex = (currentIndex + 1) % project.images.length
                          setImageIndices({ ...imageIndices, [project.title]: newIndex })
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white text-black rounded-full opacity-0 group-hover/image:opacity-100 transition-all duration-300 z-10 shadow-lg"
                      >
                        <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
                      </button>

                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {project.images.map((_, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={(e) => {
                              e.stopPropagation()
                              setImageIndices({ ...imageIndices, [project.title]: imgIndex })
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              (imageIndices[project.title] || 0) === imgIndex
                                ? 'bg-white w-8'
                                : 'bg-white/50 hover:bg-white/80 w-2'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-black mb-1 group-hover:text-gray-700 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium">{project.period}</p>
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
                        className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4" strokeWidth={2} />
                      </motion.button>
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-all duration-300"
                      >
                        <Github className="w-4 h-4" strokeWidth={2} />
                      </motion.a>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors duration-300"
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
                    className="absolute inset-0 backdrop-blur-md bg-black/70 flex items-center justify-center z-20 rounded-3xl"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="text-center px-6"
                    >
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Coming Soon
                      </h3>
                      <p className="text-sm text-gray-200">
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
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-6 mt-12">
            <motion.button
              onClick={prevPage}
              disabled={currentPage === 0}
              whileHover={{ scale: currentPage === 0 ? 1 : 1.05 }}
              whileTap={{ scale: currentPage === 0 ? 1 : 0.95 }}
              className={`p-3 rounded-full transition-all duration-300 ${
                currentPage === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-gray-100 shadow-md hover:shadow-lg border border-gray-200'
              }`}
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </motion.button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentPage === index
                      ? 'bg-black w-10'
                      : 'bg-gray-300 hover:bg-gray-400 w-2'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              whileHover={{ scale: currentPage === totalPages - 1 ? 1 : 1.05 }}
              whileTap={{ scale: currentPage === totalPages - 1 ? 1 : 0.95 }}
              className={`p-3 rounded-full transition-all duration-300 ${
                currentPage === totalPages - 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-gray-100 shadow-md hover:shadow-lg border border-gray-200'
              }`}
            >
              <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  )
}

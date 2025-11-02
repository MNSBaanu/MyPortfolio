import { motion } from 'framer-motion'
import { X, Download, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react'
import { personalInfo, about, skills, projects } from '../data/portfolio'
import { useEffect } from 'react'

interface CVViewerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CVViewer({ isOpen, onClose }: CVViewerProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleDownload = () => {
    window.print()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
      >
        {/* Header Controls */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center print:hidden z-10">
          <h2 className="text-xl font-bold text-gray-800">Resume Preview</h2>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Download size={18} />
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* CV Content */}
        <div className="p-8 bg-white text-gray-900" id="cv-content">
          {/* Header */}
          <div className="text-center mb-6 pb-6 border-b-2 border-teal-600">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{personalInfo.name}</h1>
            <p className="text-xl text-teal-600 font-semibold mb-4">{personalInfo.title}</p>
            
            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Mail size={14} />
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone size={14} />
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{personalInfo.location}</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center gap-4 mt-3 text-sm">
              <a href={personalInfo.social.github} className="flex items-center gap-1 text-teal-600 hover:underline">
                <Github size={14} />
                GitHub
              </a>
              <a href={personalInfo.social.linkedin} className="flex items-center gap-1 text-teal-600 hover:underline">
                <Linkedin size={14} />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.description}</p>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className="px-3 py-1 bg-teal-50 text-teal-700 rounded-md text-sm font-medium border border-teal-200"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Experience/Services */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">Expertise</h2>
            <ul className="space-y-2">
              {about.services.map((service) => (
                <li key={service} className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span className="text-gray-700">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">Projects</h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.title} className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  <p className="text-gray-700 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-1">
                    {project.tech.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-teal-600">
                    <a href={project.liveUrl} className="hover:underline mr-3">Live Demo</a>
                    <a href={project.githubUrl} className="hover:underline">GitHub</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">Achievements</h2>
            <div className="grid grid-cols-3 gap-4">
              {about.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-teal-600">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

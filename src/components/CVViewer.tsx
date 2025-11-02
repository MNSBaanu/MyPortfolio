import { motion } from 'framer-motion'
import { X, Download, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react'
import { personalInfo, about, skills, professionalSkills, projects, experience, education, certifications } from '../data/portfolio'
import { useEffect } from 'react'
import html2pdf from 'html2pdf.js'

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
    const element = document.getElementById('cv-content')
    if (!element) return

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${personalInfo.name}_CV.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        letterRendering: true,
        logging: false
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    }

    html2pdf().set(opt).from(element).save()
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
        className="bg-white rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto relative"
        style={{ width: '210mm', maxWidth: '95vw' }}
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
        <div className="p-8 bg-gray-50 text-gray-900" id="cv-content" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', lineHeight: '1.4' }}>
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-teal-600 mb-2 uppercase tracking-wide">{personalInfo.name}</h1>
            <div className="flex flex-wrap gap-2 text-gray-700 border-b-2 border-gray-800 pb-3" style={{ fontSize: '10px' }}>
              <span className="underline">{personalInfo.email}</span>
              <span>|</span>
              <span className="underline">LinkedIn</span>
              <span>|</span>
              <span>{personalInfo.phone}</span>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-4">
            <h2 className="text-base font-bold text-teal-600 mb-2 uppercase tracking-wide border-b-2 border-teal-600 pb-1">Summary</h2>
            <p className="text-gray-800 leading-relaxed">{personalInfo.cvSummary}</p>
          </div>

          {/* Experience */}
          <div className="mb-4">
            <h2 className="text-base font-bold text-teal-600 mb-2 uppercase tracking-wide border-b-2 border-teal-600 pb-1">Professional Experience</h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.title + exp.company} style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900">{exp.title}</h3>
                      <p className="text-gray-700 italic">{exp.company}</p>
                    </div>
                    <span className="text-gray-700 font-semibold whitespace-nowrap ml-4">{exp.period}</span>
                  </div>
                  <ul className="ml-5 mt-1">
                    <li className="text-gray-800 leading-relaxed list-disc">{exp.description}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="mb-4">
            <h2 className="text-base font-bold text-teal-600 mb-2 uppercase tracking-wide border-b-2 border-teal-600 pb-1">Projects</h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.title} style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900">{project.title} ({project.tech.join(', ')})</h3>
                  </div>
                  <ul className="ml-5 mt-1">
                    <li className="text-gray-800 leading-relaxed list-disc">{project.description}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <h2 className="text-base font-bold text-teal-600 mb-2 uppercase tracking-wide border-b-2 border-teal-600 pb-1">Soft Skills</h2>
            <div className="grid grid-cols-3 gap-x-8 gap-y-1">
              {professionalSkills.map((skill) => (
                <div key={skill} className="text-gray-800">{skill}</div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="mb-4">
            <h2 className="text-base font-bold text-teal-600 mb-2 uppercase tracking-wide border-b-2 border-teal-600 pb-1">Technical Skills</h2>
            <p className="text-gray-800 leading-relaxed">
              {skills.map(s => s.name).join(', ')}
            </p>
          </div>

          {/* Education */}
          <div className="mb-4">
            <h2 className="text-base font-bold text-teal-600 mb-2 uppercase tracking-wide border-b-2 border-teal-600 pb-1">Education</h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.title + edu.institution} style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                      <p className="text-gray-700">{edu.title}</p>
                    </div>
                    <span className="text-gray-700 font-semibold whitespace-nowrap ml-4">{edu.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-4">
            <h2 className="text-base font-bold text-teal-600 mb-2 uppercase tracking-wide border-b-2 border-teal-600 pb-1">Certifications</h2>
            <div className="space-y-2">
              {certifications.slice(0, 6).map((cert) => (
                <div key={cert.title + cert.issuer} style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{cert.title}</h3>
                      <p className="text-gray-700">{cert.issuer}</p>
                    </div>
                    <span className="text-gray-700 font-semibold whitespace-nowrap ml-4">{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="mb-4">
            <h2 className="text-base font-bold text-teal-600 mb-2 uppercase tracking-wide border-b-2 border-teal-600 pb-1">Additional Information</h2>
            <p className="text-gray-800">
              <span className="font-bold">Languages:</span> English, Sinhala, Tamil
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

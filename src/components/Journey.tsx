import { motion } from 'framer-motion'
import { useState } from 'react'
import { GraduationCap, Briefcase, Award } from 'lucide-react'
import { experience as experienceData, certifications as certificationsData, education as educationData } from '../data/portfolio'

interface JourneyItem {
  title: string
  organization: string
  period: string
  description?: string
  details?: string[]
  link?: string
  tech?: string[]
}

export default function Journey() {
  const [activeTab, setActiveTab] = useState<'education' | 'experience' | 'certifications'>('experience')

  const education: JourneyItem[] = educationData.map(edu => ({
    title: edu.title,
    organization: edu.institution,
    period: edu.period,
    description: edu.description
  }))

  const experience: JourneyItem[] = experienceData.map(exp => ({
    title: exp.title,
    organization: exp.company,
    period: exp.period,
    description: exp.description,
    tech: exp.tech
  }))



  const tabs = [
    { id: 'experience' as const, label: 'Experience', icon: Briefcase },
    { id: 'education' as const, label: 'Education', icon: GraduationCap },
    { id: 'certifications' as const, label: 'Certifications', icon: Award },
  ]

  const getActiveData = () => {
    switch (activeTab) {
      case 'education':
        return education
      case 'experience':
        return experience
      case 'certifications':
        return []
    }
  }

  return (
    <div className="py-24 sm:py-32 bg-gray-50 dark:bg-black relative z-10 rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-gray-100 mb-4 tracking-tight">
            My Journey
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Education, experience, and continuous learning
          </p>
        </motion.div>

        {/* Toggle Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#103257] to-[#0d4a6b] text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-neutral-900 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-neutral-800'
                }`}
              >
                <Icon size={18} strokeWidth={2.5} />
                {tab.label}
              </motion.button>
            )
          })}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={activeTab === 'certifications' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-6 max-w-5xl mx-auto'}
        >
          {activeTab === 'certifications' ? (
            // Certification Cards
            certificationsData.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`rounded-2xl border border-gray-200 dark:border-neutral-800 transition-all duration-300 overflow-hidden group ${
                  index % 2 === 0
                    ? 'bg-white dark:bg-neutral-950'
                    : 'bg-gray-50 dark:bg-neutral-900'
                }`}
              >
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-900 dark:to-neutral-800 overflow-hidden relative">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.fallback-content')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'fallback-content absolute inset-0 flex flex-col items-center justify-center p-4 text-center';
                        fallback.innerHTML = `
                          <svg class="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                          </svg>
                          <p class="text-xs font-medium text-gray-500">Will be uploaded soon</p>
                        `;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-black dark:text-gray-100 mb-2 line-clamp-2 leading-snug">{cert.title}</h3>
                  <p className="text-gray-700 dark:text-gray-200 text-sm mb-2 font-medium">{cert.issuer}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{cert.date}</p>
                </div>
              </motion.div>
            ))
          ) : (
            // Education and Experience Cards
            getActiveData().map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className={`p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 transition-all duration-300 ${
                  index % 2 === 0
                    ? 'bg-white dark:bg-neutral-950'
                    : 'bg-gray-50 dark:bg-neutral-900'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-black dark:text-gray-100 mb-2 leading-tight">
                      {item.title.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < item.title.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </h3>
                    <p className="text-base text-gray-700 dark:text-gray-200 font-medium">{item.organization}</p>
                  </div>
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-[#103257] to-[#0d4a6b] text-white text-sm font-medium whitespace-nowrap shadow-md">
                    {item.period}
                  </span>
                </div>

                {item.description && (
                  <p className="text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{item.description}</p>
                )}

                {item.tech && item.tech.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {item.tech.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-3 py-1 bg-gray-100 dark:bg-neutral-900 text-gray-700 dark:text-gray-100 rounded-full text-xs font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {item.details && (
                  <ul className="space-y-2">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#103257] mt-2 mr-3 flex-shrink-0"></span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))
          )}

          {/* Empty State */}
          {getActiveData().length === 0 && certificationsData.length === 0 && (
            <div className="text-center py-20 col-span-full">
              <p className="text-gray-500 text-lg">No {activeTab} added yet.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

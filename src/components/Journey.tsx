import { motion } from 'framer-motion'
import { useState } from 'react'
import { GraduationCap, Briefcase, Award } from 'lucide-react'
import { experience as experienceData, certifications as certificationsData } from '../data/portfolio'

interface JourneyItem {
  title: string
  organization: string
  period: string
  description?: string
  details?: string[]
  link?: string
}

export default function Journey() {
  const [activeTab, setActiveTab] = useState<'education' | 'experience' | 'certifications'>('education')

  const education: JourneyItem[] = [
    {
      title: 'HD in Computing & Software Engineering',
      organization: 'ICBT Kandy (Affiliated with Cardiff Metropolitan University, UK)',
      period: 'May 2024 - Nov 2025',
      details: [
        'Specialized in full-stack development and software engineering principles'
      ]
    },
    {
      title: 'Certificate of Efficiency as a Pharmacist',
      organization: 'PharmAdya (Awarded by Sri Lanka Medical Council)',
      period: 'Nov 2023 - Feb 2026',
      details: [
        'Comprehensive training in pharmacy operations and patient care'
      ]
    },
    {
      title: 'G.C.E. Advanced Level - Biological Science',
      organization: 'Kandy Girls\' High School',
      period: '2019 - 2023',
      description: 'Completed A/L examination in Biological Science stream with 3 Passes in Physics, Chemistry, Biology'
    },
    {
      title: 'G.C.E. Ordinary Level',
      organization: 'Viharamahadevi Girls\' College Kandy',
      period: 'Grade 6 - 11',
      description: 'Excellent academic performance in O/L examination with 8 A\'s and 1 B'
    }
  ]

  const experience: JourneyItem[] = experienceData.map(exp => ({
    title: exp.title,
    organization: exp.company,
    period: exp.period,
    description: exp.description
  }))



  const tabs = [
    { id: 'education' as const, label: 'Education', icon: GraduationCap },
    { id: 'experience' as const, label: 'Experience', icon: Briefcase },
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
    <section id="journey" className="pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 md:pb-20 pl-6 sm:pl-8 md:pl-12 lg:pl-16 xl:pl-20 pr-16 sm:pr-20 md:pr-24 lg:pr-28 xl:pr-32 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-100 mb-6 sm:mb-8 text-center">Journey</h2>

          {/* Toggle Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-teal-700 text-white border-2 border-teal-700'
                      : 'bg-teal-900/30 text-teal-300 border-2 border-teal-700/50 hover:bg-teal-900/50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={activeTab === 'certifications' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6' : 'space-y-4 sm:space-y-5 md:space-y-6'}
          >
            {activeTab === 'certifications' ? (
              // Certification Cards
              certificationsData.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-teal-900/20 to-black rounded-xl border border-teal-700/30 hover:border-teal-500/50 transition-all duration-300 overflow-hidden group"
                >
                  <div className="aspect-video bg-teal-900/10 overflow-hidden">
                    <img 
                      src={cert.image} 
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x300/0f766e/ffffff?text=Certificate'
                      }}
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-teal-100 mb-1.5 sm:mb-2 line-clamp-2">{cert.title}</h3>
                    <p className="text-teal-300 text-xs sm:text-sm mb-1.5 sm:mb-2">{cert.issuer}</p>
                    <p className="text-gray-400 text-xs sm:text-sm">{cert.date}</p>
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
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-teal-900/20 to-black p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-teal-700/30 hover:border-teal-500/50 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2 sm:mb-3">
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-teal-100 mb-1">
                        {item.title.split('\n').map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < item.title.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </h3>
                      <p className="text-sm sm:text-base text-teal-300 font-medium">{item.organization}</p>
                    </div>
                    <span className="text-gray-400 text-xs sm:text-sm mt-1.5 sm:mt-2 md:mt-0 whitespace-nowrap">{item.period}</span>
                  </div>
                  
                  {item.description && (
                    <p className="text-sm sm:text-base text-gray-300 mb-2 sm:mb-3">{item.description}</p>
                  )}
                  
                  {item.details && (
                    <ul className="space-y-1.5 sm:space-y-2">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start text-gray-400 text-sm sm:text-base">
                          <span className="text-teal-400 mr-2">•</span>
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
              <div className="text-center py-12 col-span-full">
                <p className="text-gray-400">No {activeTab} added yet.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

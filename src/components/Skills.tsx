import { motion } from 'framer-motion'
import { skillCategories } from '../data/portfolio'
import { useState } from 'react'

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('Languages')

  return (
    <section id="skills" className="pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 md:pb-20 pl-6 sm:pl-8 md:pl-12 lg:pl-16 xl:pl-20 pr-16 sm:pr-20 md:pr-24 lg:pr-28 xl:pr-32 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-100 mb-6 sm:mb-8 text-center">Skills</h2>
          
          {/* Category Toggle Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12">
            {skillCategories.map((category) => (
              <button
                key={category.category}
                onClick={() => setActiveCategory(category.category)}
                className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.category
                    ? 'bg-teal-700 text-white border-2 border-teal-700'
                    : 'bg-teal-900/30 text-teal-300 border-2 border-teal-700/50 hover:bg-teal-900/50'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
          
          {/* Display Active Category Skills */}
          {skillCategories
            .filter((category) => category.category === activeCategory)
            .map((category) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Main Skills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-gradient-to-br from-teal-900/20 to-black p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-teal-700/30 hover:border-teal-500/50 transition-all duration-300 flex flex-col items-center justify-center gap-1.5 sm:gap-2 md:gap-3 group"
                    >
                      {skill.icon && (
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center">
                          <img 
                            src={skill.icon} 
                            alt={skill.name}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                            style={['GitHub', 'Express', 'Time Management'].includes(skill.name) ? { filter: 'brightness(0) invert(1)' } : {}}
                          />
                        </div>
                      )}
                      <span className="font-semibold text-xs sm:text-sm text-teal-100 text-center">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Subcategories */}
                {category.subcategories?.map((subcategory) => (
                  <div key={subcategory.name} className="mt-6 sm:mt-8">
                    <h3 className="text-lg sm:text-xl font-semibold text-teal-300 mb-3 sm:mb-4">{subcategory.name}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                      {subcategory.skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="bg-gradient-to-br from-teal-900/20 to-black p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-teal-700/30 hover:border-teal-500/50 transition-all duration-300 flex items-center justify-center"
                        >
                          <span className="font-semibold text-xs sm:text-sm text-teal-100 text-center">{skill.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  )
}

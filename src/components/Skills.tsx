import { motion } from 'framer-motion'
import { skillCategories } from '../data/portfolio'
import { useState } from 'react'

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('Languages')

  return (
    <section id="skills" className="pt-8 pb-20 px-4 md:px-8 lg:px-12 pr-24 md:pr-28 lg:pr-32 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-teal-100 mb-8 text-center">Skills</h2>
          
          {/* Category Toggle Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {skillCategories.map((category) => (
              <button
                key={category.category}
                onClick={() => setActiveCategory(category.category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.category
                    ? 'bg-teal-600 text-white'
                    : 'bg-teal-900/20 text-teal-300 border border-teal-700/30 hover:border-teal-500/50 hover:text-teal-100'
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-gradient-to-br from-teal-900/20 to-black p-4 rounded-xl border border-teal-700/30 hover:border-teal-500/50 transition-all duration-300 flex flex-col items-center justify-center gap-3 group"
                    >
                      {skill.icon && (
                        <div className="w-12 h-12 flex items-center justify-center">
                          <img 
                            src={skill.icon} 
                            alt={skill.name}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                            style={['GitHub', 'Express', 'Time Management'].includes(skill.name) ? { filter: 'brightness(0) invert(1)' } : {}}
                          />
                        </div>
                      )}
                      <span className="font-semibold text-sm text-teal-100 text-center">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Subcategories */}
                {category.subcategories?.map((subcategory) => (
                  <div key={subcategory.name} className="mt-8">
                    <h3 className="text-xl font-semibold text-teal-300 mb-4">{subcategory.name}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {subcategory.skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="bg-gradient-to-br from-teal-900/20 to-black p-4 rounded-xl border border-teal-700/30 hover:border-teal-500/50 transition-all duration-300 flex items-center justify-center"
                        >
                          <span className="font-semibold text-sm text-teal-100 text-center">{skill.name}</span>
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

import { motion } from 'framer-motion'
import { skillCategories } from '../data/portfolio'

export default function Skills() {
  // Flatten all skills from all categories into one array
  const allSkills = skillCategories.flatMap(category => [
    ...category.skills,
    ...(category.subcategories?.flatMap(sub => sub.skills) || [])
  ])

  // Duplicate skills for seamless loop
  const duplicatedSkills = [...allSkills, ...allSkills]

  return (
    <section id="skills" className="pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 md:pb-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-6 sm:mb-10 text-center">Skills</h2>
          
          {/* Continuous Scrolling Skills Ticker */}
          <div className="relative">
            {/* Scrolling container */}
            <div className="flex overflow-hidden">
              <motion.div
                className="flex gap-4 sm:gap-6"
                animate={{
                  x: [0, -50 * allSkills.length]
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: allSkills.length * 0.3, // Increased speed even more
                    ease: "linear",
                  },
                }}
              >
                {duplicatedSkills.map((skill, index) => (
                  <div
                    key={`${skill.name}-${index}`}
                    className="flex-shrink-0 bg-white p-4 sm:p-5 md:p-6 rounded-lg hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center gap-3 group min-w-[100px] sm:min-w-[120px] md:min-w-[140px] lg:min-w-[160px]"
                  >
                    {skill.icon && (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center">
                        <img 
                          src={skill.icon} 
                          alt={skill.name}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                          style={{ 
                            filter: 'grayscale(100%) contrast(200%) brightness(0.1)',
                            mixBlendMode: 'multiply'
                          }}
                        />
                      </div>
                    )}
                    <span className="font-semibold text-sm sm:text-base md:text-lg text-black text-center leading-tight">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

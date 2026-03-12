import { motion } from 'framer-motion'
import { skillCategories } from '../data/portfolio'

export default function Skills() {
  // Flatten all skills from all categories into one array
  const allSkills = skillCategories.flatMap(category => [
    ...category.skills,
    ...(category.subcategories?.flatMap(sub => sub.skills) || [])
  ]) as Array<{ name: string; icon?: string }>

  // Duplicate skills for seamless loop
  const duplicatedSkills = [...allSkills, ...allSkills]

  return (
    <div className="py-24 sm:py-32 bg-slate-100 dark:bg-slate-950 relative z-10 rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-gray-100 dark:border-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-slate-100 mb-4 tracking-tight">
            Skills & Technologies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A curated collection of tools and technologies I work with
          </p>
        </motion.div>
        
        {/* Continuous Scrolling Skills Ticker */}
        <div className="relative">
          {/* Gradient overlays for smooth fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white to-transparent dark:from-slate-950 dark:via-slate-950 dark:to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white to-transparent dark:from-slate-950 dark:via-slate-950 dark:to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrolling container */}
          <div className="flex overflow-hidden py-4">
            <motion.div
              className="flex gap-6 sm:gap-8"
              animate={{
                x: [0, -50 * allSkills.length]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: allSkills.length * 0.3,
                  ease: "linear",
                },
              }}
            >
              {duplicatedSkills.map((skill, index) => (
                <div
                  key={`${skill.name}-${index}`}
                  className={`flex-shrink-0 p-6 sm:p-7 md:p-8 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-4 group min-w-[140px] sm:min-w-[160px] md:min-w-[180px] border border-gray-100 dark:border-slate-800 ${
                    index % 2 === 0
                      ? 'bg-white dark:bg-slate-900'
                      : 'bg-gray-50 dark:bg-slate-800'
                  }`}
                >
                  {skill.icon && (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center">
                      <img 
                        src={skill.icon} 
                        alt={skill.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        style={{ 
                          filter: 'grayscale(100%) contrast(200%) brightness(0.1)',
                          mixBlendMode: 'multiply'
                        }}
                      />
                    </div>
                  )}
                  <span className="font-semibold text-sm sm:text-base text-black dark:text-slate-100 text-center leading-tight">
                    {skill.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

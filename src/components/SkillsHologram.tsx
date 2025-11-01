import { motion } from 'framer-motion'
import { useState } from 'react'

const SkillsHologram = () => {
  const [selectedCategory, setSelectedCategory] = useState('frontend')

  const skillCategories = {
    frontend: {
      title: 'Frontend Arsenal',
      command: 'npm list --global',
      skills: [
        { name: 'React', level: 95, experience: '4 years' },
        { name: 'TypeScript', level: 90, experience: '3 years' },
        { name: 'Next.js', level: 85, experience: '2 years' },
        { name: 'Vue.js', level: 80, experience: '2 years' },
        { name: 'Tailwind CSS', level: 92, experience: '3 years' },
        { name: 'Three.js', level: 75, experience: '1 year' },
      ]
    },
    backend: {
      title: 'Backend Infrastructure',
      command: 'docker ps -a',
      skills: [
        { name: 'Node.js', level: 90, experience: '4 years' },
        { name: 'Python', level: 85, experience: '3 years' },
        { name: 'PostgreSQL', level: 88, experience: '3 years' },
        { name: 'MongoDB', level: 82, experience: '2 years' },
        { name: 'GraphQL', level: 78, experience: '2 years' },
        { name: 'Redis', level: 75, experience: '1 year' },
      ]
    },
    devops: {
      title: 'DevOps & Cloud',
      command: 'kubectl get pods',
      skills: [
        { name: 'AWS', level: 85, experience: '3 years' },
        { name: 'Docker', level: 88, experience: '3 years' },
        { name: 'Kubernetes', level: 70, experience: '1 year' },
        { name: 'CI/CD', level: 80, experience: '2 years' },
        { name: 'Terraform', level: 65, experience: '1 year' },
        { name: 'Nginx', level: 75, experience: '2 years' },
      ]
    }
  }

  const categories = Object.keys(skillCategories) as Array<keyof typeof skillCategories>

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-16 px-4"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Category Selector */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="terminal-window p-6 mb-8"
        >
          <div className="mt-8">
            <div className="text-cyber-blue mb-4">
              $ ls /skills/ --categories
            </div>
            
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-4 py-2 border transition-all duration-300 font-mono
                    ${selectedCategory === category
                      ? 'border-hologram text-hologram neon-glow bg-hologram bg-opacity-10'
                      : 'border-matrix-green text-matrix-green hover:border-cyber-blue hover:text-cyber-blue'
                    }
                  `}
                >
                  {category.toUpperCase()}/
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skills Display */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, rotateY: -30 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.6 }}
          className="terminal-window p-8"
        >
          <div className="mt-8">
            <div className="text-cyber-blue mb-2">
              $ {skillCategories[selectedCategory].command}
            </div>
            
            <motion.h2
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-3xl font-bold holographic mb-8"
            >
              {skillCategories[selectedCategory].title}
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
              {skillCategories[selectedCategory].skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="code-block p-4 group cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-terminal-green">
                      {skill.name}
                    </span>
                    <div className="text-right">
                      <div className="text-hologram text-sm">
                        {skill.level}%
                      </div>
                      <div className="text-xs text-matrix-green opacity-70">
                        {skill.experience}
                      </div>
                    </div>
                  </div>

                  {/* Skill Bar */}
                  <div className="relative">
                    <div className="w-full h-2 bg-code-gray border border-matrix-green">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ 
                          delay: index * 0.1 + 0.3,
                          duration: 1,
                          ease: "easeOut"
                        }}
                        className="h-full bg-gradient-to-r from-matrix-green via-cyber-blue to-hologram relative"
                      >
                        {/* Animated glow effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-matrix-green via-cyber-blue to-hologram opacity-50"
                          animate={{
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Progress indicator */}
                    <motion.div
                      initial={{ x: 0 }}
                      animate={{ x: `${skill.level * 0.9}%` }}
                      transition={{ 
                        delay: index * 0.1 + 0.3,
                        duration: 1,
                        ease: "easeOut"
                      }}
                      className="absolute -top-1 w-1 h-4 bg-hologram"
                    />
                  </div>

                  {/* Holographic border effect */}
                  <motion.div
                    className="absolute inset-0 border border-hologram opacity-0 group-hover:opacity-30"
                    animate={{
                      scale: [1, 1.01, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Command Output */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-sm text-matrix-green"
            >
              <div className="mb-2">
                $ echo "Total skills loaded: {skillCategories[selectedCategory].skills.length}"
              </div>
              <div className="pl-4">
                Total skills loaded: {skillCategories[selectedCategory].skills.length}
              </div>
              <div className="mt-2">
                $ uptime
              </div>
              <div className="pl-4">
                Developer has been coding for 5+ years, currently learning new technologies...
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Tech Stack Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-8 text-center"
        >
          <div className="text-cyber-blue mb-4">
            $ cat tech_stack.json | jq '.technologies[]'
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Docker',
              'AWS', 'PostgreSQL', 'MongoDB', 'GraphQL', 'Git', 'Linux'
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.1, 
                  rotateZ: 5,
                  color: '#00ffff'
                }}
                className="code-block px-3 py-1 text-sm border border-matrix-green hover:border-hologram transition-all duration-300 cursor-pointer"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default SkillsHologram
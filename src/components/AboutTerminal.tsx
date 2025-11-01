import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code, Coffee, Lightbulb, Rocket } from 'lucide-react'

const AboutTerminal = () => {
  const [currentCommand, setCurrentCommand] = useState(0)
  const [displayOutput, setDisplayOutput] = useState<string[]>([])

  const commands = [
    {
      input: 'cat /dev/about/journey.txt',
      output: [
        'Started coding journey 5+ years ago...',
        'Passionate about creating digital solutions that matter.',
        'Love turning complex problems into elegant code.',
        'Always learning, always growing, always coding.'
      ]
    },
    {
      input: 'ls -la /skills/core/',
      output: [
        'drwxr-xr-x  frontend/',
        'drwxr-xr-x  backend/',
        'drwxr-xr-x  devops/',
        'drwxr-xr-x  databases/',
        '-rw-r--r--  problem_solving.exe',
        '-rw-r--r--  clean_code.md'
      ]
    },
    {
      input: 'grep -r "passion" /dev/mindset/*',
      output: [
        '/dev/mindset/values.txt: Passionate about user experience',
        '/dev/mindset/goals.txt: Building scalable, maintainable solutions',
        '/dev/mindset/philosophy.txt: Code is poetry, bugs are typos'
      ]
    }
  ]

  const features = [
    {
      icon: Code,
      title: 'Clean Architecture',
      description: 'Writing maintainable, scalable code following SOLID principles',
      color: 'text-matrix-green'
    },
    {
      icon: Lightbulb,
      title: 'Problem Solving',
      description: 'Breaking down complex challenges into elegant solutions',
      color: 'text-cyber-blue'
    },
    {
      icon: Rocket,
      title: 'Performance',
      description: 'Optimizing applications for speed and user experience',
      color: 'text-neon-purple'
    },
    {
      icon: Coffee,
      title: 'Continuous Learning',
      description: 'Staying updated with latest technologies and best practices',
      color: 'text-hologram'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentCommand < commands.length) {
        setDisplayOutput(prev => [...prev, ...commands[currentCommand].output])
        setCurrentCommand(prev => prev + 1)
      }
    }, 2000)

    return () => clearInterval(timer)
  }, [currentCommand])

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-16 px-4"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Main Terminal */}
        <motion.div
          initial={{ rotateX: -20, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="terminal-window p-8 mb-8"
        >
          <div className="mt-8">
            <div className="text-cyber-blue mb-4">
              developer@portfolio:~$ whoami --verbose
            </div>
            
            <div className="space-y-4 mb-8">
              {commands.slice(0, currentCommand + 1).map((cmd, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.5 }}
                >
                  <div className="text-terminal-green mb-2">
                    $ {cmd.input}
                  </div>
                  <div className="pl-4 space-y-1">
                    {cmd.output.map((line, lineIndex) => (
                      <motion.div
                        key={lineIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.5 + lineIndex * 0.2 }}
                        className="text-matrix-green text-sm"
                      >
                        {line}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
              
              {currentCommand < commands.length && (
                <div className="text-terminal-green">
                  $ {commands[currentCommand]?.input}
                  <span className="animate-terminal-cursor">█</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, rotateY: -30 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: 1 + index * 0.2, duration: 0.8 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 10,
                z: 20
              }}
              className="code-block p-6 text-center group cursor-pointer"
            >
              <motion.div
                whileHover={{ rotateZ: 360 }}
                transition={{ duration: 0.6 }}
                className={`inline-flex items-center justify-center w-16 h-16 mb-4 border-2 rounded-full ${feature.color} border-current`}
              >
                <feature.icon size={24} />
              </motion.div>
              
              <h3 className="text-lg font-bold mb-2 holographic">
                {feature.title}
              </h3>
              
              <p className="text-sm text-matrix-green opacity-80 group-hover:opacity-100 transition-opacity">
                {feature.description}
              </p>

              {/* Holographic effect on hover */}
              <motion.div
                className="absolute inset-0 border border-hologram opacity-0 group-hover:opacity-50"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Stats Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="terminal-window p-6 mt-8"
        >
          <div className="mt-8">
            <div className="text-cyber-blue mb-4">
              $ system_stats --experience
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { label: 'Years Experience', value: '5+', unit: 'years' },
                { label: 'Projects Completed', value: '50+', unit: 'projects' },
                { label: 'Technologies Mastered', value: '20+', unit: 'techs' },
                { label: 'Coffee Consumed', value: '∞', unit: 'cups' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2.5 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="text-2xl font-bold holographic">
                    {stat.value}
                  </div>
                  <div className="text-sm text-matrix-green">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default AboutTerminal
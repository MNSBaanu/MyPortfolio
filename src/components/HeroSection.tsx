import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download } from 'lucide-react'

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const roles = [
    'Full Stack Developer',
    'Code Architect', 
    'Digital Creator',
    'Problem Solver',
    'Tech Innovator'
  ]

  const fullText = "Hello, I'm [YOUR_NAME]"

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, fullText])

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center pt-32 pb-16 px-4"
    >
      <div className="max-w-6xl mx-auto text-center perspective-container">
        
        {/* Main Terminal Window */}
        <motion.div
          initial={{ rotateX: -30, opacity: 0, z: -100 }}
          animate={{ rotateX: 0, opacity: 1, z: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="terminal-window p-8 mb-8 transform-gpu"
        >
          <div className="mt-8">
            {/* Terminal Header */}
            <div className="text-left mb-6">
              <div className="text-cyber-blue text-sm">
                user@portfolio:~$ whoami
              </div>
            </div>

            {/* Typing Animation */}
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 font-cyber"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <span className="holographic">
                {displayText}
                <span className="animate-terminal-cursor">█</span>
              </span>
            </motion.h1>

            {/* Rotating Roles */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-xl md:text-2xl mb-8 h-8"
            >
              <motion.span
                key={roles[Math.floor(Date.now() / 2000) % roles.length]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="text-terminal-green"
              >
                {roles[Math.floor(Date.now() / 2000) % roles.length]}
              </motion.span>
            </motion.div>

            {/* Command Line Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="text-left space-y-2 mb-8 text-matrix-green"
            >
              <div>$ cat description.txt</div>
              <div className="pl-4 text-sm leading-relaxed">
                Crafting digital experiences through clean code and innovative solutions.
                <br />
                Passionate about turning complex problems into elegant, scalable applications.
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Action Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              rotateY: 10,
              boxShadow: '0 0 30px #00ff41'
            }}
            whileTap={{ scale: 0.95 }}
            className="code-block px-6 py-3 border border-matrix-green hover:border-hologram transition-all duration-300 group"
          >
            <div className="flex items-center gap-2">
              <Download size={18} />
              <span>DOWNLOAD_CV.exe</span>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ 
              scale: 1.05, 
              rotateY: -10,
              boxShadow: '0 0 30px #00d4ff'
            }}
            whileTap={{ scale: 0.95 }}
            className="code-block px-6 py-3 border border-cyber-blue hover:border-neon-purple transition-all duration-300"
          >
            VIEW_PROJECTS()
          </motion.button>
        </motion.div>

        {/* Social Links as Terminal Commands */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="flex justify-center gap-6"
        >
          {[
            { icon: Github, label: 'github', command: 'git remote -v' },
            { icon: Linkedin, label: 'linkedin', command: 'curl linkedin.com' },
            { icon: Mail, label: 'email', command: 'sendmail contact@' },
          ].map(({ icon: Icon, label, command }) => (
            <motion.a
              key={label}
              href="#"
              whileHover={{ 
                scale: 1.2, 
                rotateZ: 360,
                color: '#00ffff'
              }}
              className="code-block p-4 border border-matrix-green hover:border-hologram transition-all duration-300 group"
              title={command}
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-matrix-green text-sm"
          >
            <div>$ ls -la next_section/</div>
            <div className="text-center mt-2">↓</div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HeroSection
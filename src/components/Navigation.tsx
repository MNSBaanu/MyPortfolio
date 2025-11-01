import { motion } from 'framer-motion'
import { Terminal, User, Cpu, FolderOpen, Mail } from 'lucide-react'

interface NavigationProps {
  currentSection: string
  setCurrentSection: (section: string) => void
}

const Navigation = ({ currentSection, setCurrentSection }: NavigationProps) => {
  const navItems = [
    { id: 'home', label: 'HOME', icon: Terminal, command: 'cd ~/' },
    { id: 'about', label: 'ABOUT', icon: User, command: 'cat about.txt' },
    { id: 'skills', label: 'SKILLS', icon: Cpu, command: 'ls skills/' },
    { id: 'projects', label: 'PROJECTS', icon: FolderOpen, command: 'git log --oneline' },
    { id: 'contact', label: 'CONTACT', icon: Mail, command: 'ping contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 p-4"
    >
      <div className="terminal-window p-4 mx-auto max-w-4xl">
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = currentSection === item.id
            
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                  z: 20
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSection(item.id)}
                className={`
                  group relative px-4 py-2 border transition-all duration-300
                  ${isActive 
                    ? 'border-hologram bg-hologram bg-opacity-10 text-hologram neon-glow' 
                    : 'border-matrix-green text-matrix-green hover:border-cyber-blue hover:text-cyber-blue'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <Icon size={16} />
                  <span className="font-mono text-sm">{item.label}</span>
                </div>
                
                {/* Terminal command tooltip */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-dark-void border border-matrix-green px-2 py-1 text-xs whitespace-nowrap">
                    $ {item.command}
                  </div>
                </div>

                {/* Holographic effect */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 border border-hologram"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}

export default Navigation
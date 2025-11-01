import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MatrixRain from './components/MatrixRain'
import TerminalLoader from './components/TerminalLoader'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import AboutTerminal from './components/AboutTerminal'
import SkillsHologram from './components/SkillsHologram'
import ProjectsGrid from './components/ProjectsGrid'
import ContactTerminal from './components/ContactTerminal'
import FloatingElements from './components/FloatingElements'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSection, setCurrentSection] = useState('boot')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
      setCurrentSection('home')
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-dark-void text-matrix-green font-mono relative overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Floating 3D Elements */}
      <FloatingElements />

      <AnimatePresence mode="wait">
        {!isLoaded ? (
          <TerminalLoader key="loader" onComplete={() => setIsLoaded(true)} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />
            
            <main className="relative">
              <AnimatePresence mode="wait">
                {currentSection === 'home' && <HeroSection key="hero" />}
                {currentSection === 'about' && <AboutTerminal key="about" />}
                {currentSection === 'skills' && <SkillsHologram key="skills" />}
                {currentSection === 'projects' && <ProjectsGrid key="projects" />}
                {currentSection === 'contact' && <ContactTerminal key="contact" />}
              </AnimatePresence>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolio'
import { useState, useEffect } from 'react'
import CVViewer from './CVViewer'

const Hero = () => {
  const [showCVViewer, setShowCVViewer] = useState(false)
  const [currentTagline, setCurrentTagline] = useState(0)
  const [displayedText, setDisplayedText] = useState({ line1: '', line2: '', tagline: '' })
  const [isTyping, setIsTyping] = useState(true)

  const taglines = [
    { line1: 'Aspiring Software', line2: 'Engineer', tagline: 'Building the Future' },
    { line1: 'Full-Stack', line2: 'Developer', tagline: 'End-to-End Solutions' },
    { line1: 'AI & Tech', line2: 'Enthusiast', tagline: 'Exploring Innovation' },
    { line1: 'Problem', line2: 'Solver', tagline: 'Creating Impact' },
    { line1: 'Software Engineering', line2: 'Student', tagline: 'Learning & Growing' }
  ]

  useEffect(() => {
    const currentText = taglines[currentTagline]
    let charIndex = 0
    let currentLine = 'line1'
    
    setDisplayedText({ line1: '', line2: '', tagline: '' })
    setIsTyping(true)

    const typingInterval = setInterval(() => {
      if (currentLine === 'line1' && charIndex < currentText.line1.length) {
        setDisplayedText(prev => ({ ...prev, line1: currentText.line1.slice(0, charIndex + 1) }))
        charIndex++
      } else if (currentLine === 'line1') {
        currentLine = 'line2'
        charIndex = 0
      } else if (currentLine === 'line2' && charIndex < currentText.line2.length) {
        setDisplayedText(prev => ({ ...prev, line2: currentText.line2.slice(0, charIndex + 1) }))
        charIndex++
      } else if (currentLine === 'line2') {
        currentLine = 'tagline'
        charIndex = 0
      } else if (currentLine === 'tagline' && charIndex < currentText.tagline.length) {
        setDisplayedText(prev => ({ ...prev, tagline: currentText.tagline.slice(0, charIndex + 1) }))
        charIndex++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
        setTimeout(() => {
          setCurrentTagline((prev) => (prev + 1) % taglines.length)
        }, 2500)
      }
    }, 80)

    return () => clearInterval(typingInterval)
  }, [currentTagline])

  const codeSnippets = [
    '{ code }',
    '</> React',
    'Node.js',
    'AI/ML',
    'TypeScript',
    'Python',
    'Next.js',
    'MongoDB',
    'Express',
    'TensorFlow',
    'Docker',
    'AWS',
    'Tailwind',
    'Git',
    'API',
    'PostgreSQL'
  ]

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-visible bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-32 px-6 sm:px-8 md:px-12 lg:px-16">
      {/* Subtle dot pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 text-center lg:text-left order-2 lg:order-1"
          >
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-8"
                style={{ minHeight: '200px' }}
              >
                <div className="space-y-2">
                  <div className="text-black">
                    {displayedText.line1}
                    {isTyping && displayedText.line2 === '' && displayedText.tagline === '' && (
                      <span className="inline-block w-0.5 h-12 bg-black ml-1 animate-pulse"></span>
                    )}
                  </div>
                  <div className="text-black">
                    {displayedText.line2}
                    {isTyping && displayedText.line2 !== '' && displayedText.tagline === '' && (
                      <span className="inline-block w-0.5 h-12 bg-black ml-1 animate-pulse"></span>
                    )}
                  </div>
                  <div className="bg-gradient-to-r from-[#103257] to-[#0d4a6b] bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl">
                    {displayedText.tagline}
                    {isTyping && displayedText.tagline !== '' && (
                      <span className="inline-block w-0.5 h-10 bg-[#103257] ml-1 animate-pulse"></span>
                    )}
                  </div>
                </div>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-gray-500 text-sm flex items-center justify-center lg:justify-start gap-2"
              >
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                Based in Kandy, Sri Lanka
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl"
              >
                {personalInfo.description}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3 bg-gradient-to-r from-[#103257] to-[#0d4a6b] text-white rounded-full text-sm font-semibold hover:shadow-2xl transition-all duration-300 shadow-lg hover:scale-105"
              >
                Let's Connect
              </button>

              <button
                onClick={() => setShowCVViewer(true)}
                className="px-7 py-3 bg-white text-gray-800 rounded-full text-sm font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-[#103257] hover:scale-105"
              >
                View My Resume
              </button>
            </motion.div>
          </motion.div>

          {/* Profile Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Floating Code Elements */}
              {codeSnippets.map((snippet, index) => {
                const positions = [
                  { left: '5%', top: '5%' },
                  { right: '5%', top: '10%' },
                  { left: '0%', top: '30%' },
                  { right: '0%', top: '35%' },
                  { left: '5%', top: '55%' },
                  { right: '5%', top: '60%' },
                  { left: '0%', top: '80%' },
                  { right: '0%', top: '85%' },
                  { left: '15%', top: '15%' },
                  { right: '15%', top: '45%' },
                  { left: '10%', top: '70%' },
                  { right: '10%', top: '25%' },
                  { left: '20%', top: '90%' },
                  { right: '20%', top: '5%' },
                  { left: '5%', bottom: '5%' },
                  { right: '5%', bottom: '10%' }
                ]
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0.15, 0.3, 0.15],
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 4 + index * 0.3,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    className="absolute text-gray-300 font-mono text-xs font-medium pointer-events-none"
                    style={positions[index]}
                  >
                    {snippet}
                  </motion.div>
                )
              })}

              {/* Profile Image */}
              <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="relative">
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    className="w-80 h-80 sm:w-[26rem] sm:h-[26rem] md:w-[28rem] md:h-[28rem] object-cover"
                  />
                </div>

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#103257] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#103257]"></span>
                  </span>
                  <span className="text-sm font-medium uppercase tracking-wide">
                    Open for Opportunities
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <CVViewer isOpen={showCVViewer} onClose={() => setShowCVViewer(false)} />
    </section>
  )
}

export default Hero
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { personalInfo } from '../data/portfolio'
import { useState, useEffect } from 'react'
import CVViewer from './CVViewer'

const Hero = () => {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showCVViewer, setShowCVViewer] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      // Show back to top after scrolling 500px (shows in About section)
      setShowBackToTop(scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  // Floating code snippets for full stack vibe
  const codeSnippets = [
    '{ API }',
    '</> React',
    'Node.js',
    'MongoDB',
    'TypeScript',
    'Express',
    'GraphQL',
    'Docker',
    'AWS',
    'Redux',
    'Next.js',
    'PostgreSQL',
    'Tailwind',
    'Git',
    'REST',
    'JWT'
  ]

  return (
    <section className="min-h-screen flex items-center relative overflow-visible bg-gradient-to-b from-teal-950/20 via-black to-black pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 md:px-8 lg:px-12 pr-12 sm:pr-14 md:pr-16 lg:pr-20 xl:pr-24">
      {/* Vertical Social Icons - Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed right-1 sm:right-2 md:right-4 lg:right-6 xl:right-8 top-[30%] z-50 flex flex-col gap-1.5 sm:gap-2 md:gap-3"
      >
        <motion.a
          href={personalInfo.social.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, x: -5 }}
          className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-dark-teal flex items-center justify-center text-teal-300 hover:text-teal-200 transition-all duration-300"
        >
          <Github className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-5.5 lg:h-5.5" />
        </motion.a>
        <motion.a
          href={personalInfo.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, x: -5 }}
          className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-dark-teal flex items-center justify-center text-teal-300 hover:text-teal-200 transition-all duration-300"
        >
          <Linkedin className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-5.5 lg:h-5.5" />
        </motion.a>
        <motion.a
          href={`mailto:${personalInfo.email}`}
          whileHover={{ scale: 1.1, x: -5 }}
          className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-dark-teal flex items-center justify-center text-teal-300 hover:text-teal-200 transition-all duration-300"
        >
          <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-5.5 lg:h-5.5" />
        </motion.a>

        {/* Back to Top Button - Only visible after hero section */}
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1, x: -5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-dark-teal flex items-center justify-center text-teal-300 hover:text-teal-200 transition-all duration-300"
          >
            <ArrowUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-5.5 lg:h-5.5" />
          </motion.button>
        )}
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 flex-shrink-0 text-center lg:text-left"
          >
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 text-base sm:text-lg lg:text-xl mb-3 sm:mb-4"
              >
                Hello, I'm <span className="text-teal-300 font-semibold text-lg sm:text-xl lg:text-2xl">{personalInfo.name}</span>
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight"
              >
                <span className="text-teal-100">A FULL STACK</span>
                <br />
                <span className="text-teal-300">DEVELOPER</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="text-gray-500 text-sm sm:text-base mb-3 sm:mb-4"
              >
                Based in Kandy, Sri Lanka
              </motion.p>
              
              {/* Tech Stack Tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2 mb-4 sm:mb-6 justify-center lg:justify-start"
              >
                {['Frontend', 'Backend', 'Database', 'DevOps'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 sm:px-3 py-1 bg-teal-900/30 border border-teal-700/50 rounded-full text-teal-300 text-xs sm:text-sm font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mb-6 sm:mb-8"
              >
                {personalInfo.description}
              </motion.p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-teal-800 text-teal-100 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium hover:bg-teal-700 transition-colors"
              >
                Contact
              </button>
              
              <button
                onClick={() => setShowCVViewer(true)}
                className="bg-teal-800 text-teal-100 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium hover:bg-teal-700 transition-colors"
              >
                View CV
              </button>
            </div>
          </motion.div>

          {/* Profile Image - Centered with Floating Code */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="flex justify-center items-center flex-shrink-0 relative w-full lg:w-[500px] h-[400px] lg:h-[500px]"
          >
            {/* Floating Code Elements behind profile - distributed with overlaps */}
            {codeSnippets.map((snippet, index) => {
              const positions = [
                { left: '40%', top: '-5%' }, // API at top
                { left: '85%', top: '8%' },
                { left: '-5%', top: '22%' },
                { left: '80%', top: '25%' },
                { left: '-8%', top: '40%' },
                { left: '82%', top: '42%' },
                { left: '-5%', top: '58%' },
                { left: '85%', top: '60%' },
                { left: '-10%', top: '75%' },
                { left: '80%', top: '78%' },
                { left: '-8%', top: '90%' },
                { left: '83%', top: '92%' },
                { left: '20%', top: '12%' },
                { left: '55%', top: '35%' },
                { left: '25%', top: '68%' },
                { left: '60%', top: '85%' }
              ]
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0.2, 0.35, 0.2],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    delay: index * 0.4,
                  }}
                  className="absolute text-teal-400/30 font-mono text-sm font-semibold pointer-events-none z-0"
                  style={positions[index]}
                >
                  {snippet}
                </motion.div>
              )
            })}
            
            {/* Profile Image */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 xl:w-72 xl:h-96 object-cover"
              />
              
              {/* Available for Internship Badge - Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="px-4 sm:px-6 md:px-8 py-2 md:py-3 bg-black rounded-md border-2 border-teal-500 whitespace-nowrap shadow-2xl shadow-teal-500/30"
              >
                <span className="text-teal-100 font-bold text-xs sm:text-sm tracking-widest">AVAILABLE FOR INTERNSHIP</span>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Spacer to balance layout */}
          <div className="hidden lg:block flex-shrink-0 w-0"></div>
        </div>
      </div>

      {/* CV Viewer Modal */}
      <CVViewer isOpen={showCVViewer} onClose={() => setShowCVViewer(false)} />
    </section>
  )
}

export default Hero
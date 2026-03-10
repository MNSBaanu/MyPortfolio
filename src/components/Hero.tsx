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
      setShowBackToTop(scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <section id="home" className="min-h-screen flex items-center relative overflow-visible bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-32 px-6 sm:px-8 md:px-12 lg:px-16">
      {/* Subtle dot pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
      
      {/* Vertical Social Icons - Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="fixed right-6 md:right-8 top-[35%] z-50 flex flex-col gap-4"
      >
        <motion.a
          href={personalInfo.social.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group flex justify-center p-3.5 rounded-full bg-white text-gray-700 hover:text-black shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300 relative"
        >
          <Github className="w-5 h-5" strokeWidth={2} />
          <span className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none">
            GitHub
          </span>
        </motion.a>

        <motion.a
          href={personalInfo.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group flex justify-center p-3.5 rounded-full bg-white text-gray-700 hover:text-black shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300 relative"
        >
          <Linkedin className="w-5 h-5" strokeWidth={2} />
          <span className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none">
            LinkedIn
          </span>
        </motion.a>

        <motion.a
          href={`mailto:${personalInfo.email}`}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group flex justify-center p-3.5 rounded-full bg-white text-gray-700 hover:text-black shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300 relative"
        >
          <Mail className="w-5 h-5" strokeWidth={2} />
          <span className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none">
            Email
          </span>
        </motion.a>

        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex justify-center p-3.5 rounded-full bg-white text-gray-700 hover:text-black shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300 relative"
          >
            <ArrowUp className="w-5 h-5" strokeWidth={2} />
            <span className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none">
              Back to Top
            </span>
          </motion.button>
        )}
      </motion.div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 text-center lg:text-left order-2 lg:order-1"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-6">
                  Baanu Here
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight"
              >
                <span className="text-black">Full Stack</span>
                <br />
                <span className="text-gray-600">Developer</span>
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
                className="px-7 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Get in Touch
              </button>

              <button
                onClick={() => setShowCVViewer(true)}
                className="px-7 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 hover:border-gray-300 hover:scale-105"
              >
                View Resume
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
                    className="w-80 h-80 sm:w-96 sm:h-96 object-cover"
                  />
                </div>

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="px-6 py-3 bg-black text-white rounded-full shadow-xl border border-gray-800"
                >
                  <span className="text-sm font-medium tracking-wide">
                    AVAILABLE FOR OPPORTUNITIES
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
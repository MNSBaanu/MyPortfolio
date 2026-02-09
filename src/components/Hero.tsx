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
    <section id="home" className="min-h-screen flex items-center relative overflow-visible bg-gradient-to-b from-gray-50 via-white to-white pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 md:px-8 lg:px-12 pr-12 sm:pr-14 md:pr-16 lg:pr-20 xl:pr-24">
      {/* Vertical Social Icons - Right Side with New Tooltip Style */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed right-4 sm:right-6 md:right-8 top-[30%] z-50 flex flex-col gap-6"
      >
        <div className="group flex justify-center">
          <motion.a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex justify-center p-3 rounded-md drop-shadow-xl bg-black/95 backdrop-blur-md text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:bg-black border border-white/10 relative"
          >
            <Github className="w-5 h-5" />
            <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700 bg-white px-2 py-1 rounded whitespace-nowrap">
              GitHub
            </span>
          </motion.a>
        </div>

        <div className="group flex justify-center">
          <motion.a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex justify-center p-3 rounded-md drop-shadow-xl bg-black/95 backdrop-blur-md text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:bg-black border border-white/10 relative"
          >
            <Linkedin className="w-5 h-5" />
            <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700 bg-white px-2 py-1 rounded whitespace-nowrap">
              LinkedIn
            </span>
          </motion.a>
        </div>

        <div className="group flex justify-center">
          <motion.a
            href={`mailto:${personalInfo.email}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex justify-center p-3 rounded-md drop-shadow-xl bg-black/95 backdrop-blur-md text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:bg-black border border-white/10 relative"
          >
            <Mail className="w-5 h-5" />
            <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700 bg-white px-2 py-1 rounded whitespace-nowrap">
              Email
            </span>
          </motion.a>
        </div>

        {/* Back to Top Button - Only visible after hero section */}
        {showBackToTop && (
          <div className="group flex justify-center">
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex justify-center p-3 rounded-md drop-shadow-xl bg-black/95 backdrop-blur-md text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:bg-black border border-white/10 relative"
            >
              <ArrowUp className="w-5 h-5" />
              <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700 bg-white px-2 py-1 rounded whitespace-nowrap">
                Back to Top
              </span>
            </motion.button>
          </div>
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


              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight"
              >
                <span className="text-black">A FULL STACK</span>
                <br />
                <span className="text-gray-800">DEVELOPER</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8"
              >
                Based in Kandy, Sri Lanka
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mb-6 sm:mb-8"
              >
                {personalInfo.description}
              </motion.p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-black text-white border-2 border-black hover:bg-gray-800 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300"
              >
                Contact
              </button>

              <button
                onClick={() => setShowCVViewer(true)}
                className="bg-black/10 backdrop-blur-md text-black border-2 border-black/20 hover:bg-black/20 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 shadow-sm"
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
                  className="absolute text-gray-400/40 font-mono text-sm font-semibold pointer-events-none z-0"
                  style={positions[index]}
                >
                  {snippet}
                </motion.div>
              )
            })}

            {/* Profile Image */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="relative group cursor-pointer">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 xl:w-72 xl:h-96 object-cover"
                />

                {/* Tooltip same style as Baanu */}
                <span className="absolute top-5 left-1/2 transform -translate-x-1/2 px-3 py-1 opacity-0 pointer-events-none transition-all duration-300 text-white bg-black rounded group-hover:top-[-10%] group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto whitespace-nowrap">
                  Hello, I'm Baanu
                  {/* Tooltip arrow */}
                  <span className="absolute bottom-[-0.2rem] left-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-black"></span>
                </span>
              </div>

              {/* Available for Opportunities Badge - Fully Responsive */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="px-3 py-1 xs:px-4 xs:py-1.5 sm:px-5 sm:py-2 bg-black rounded border border-white/20 whitespace-nowrap shadow-sm max-w-[200px] xs:max-w-[220px] sm:max-w-[250px] md:max-w-none"
              >
                <span className="text-white font-semibold text-[10px] xs:text-[11px] sm:text-xs md:text-sm tracking-wide">
                  AVAILABLE FOR OPPORTUNITIES
                </span>
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
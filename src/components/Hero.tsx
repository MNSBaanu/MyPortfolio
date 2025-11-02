import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { personalInfo } from '../data/portfolio'

const Hero = () => {
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
    <section className="min-h-screen flex items-center relative overflow-visible bg-gradient-to-b from-teal-950/20 via-black to-black pt-32 pb-20 px-8 md:px-16 lg:px-24">
      {/* Vertical Social Icons - Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed right-8 top-[30%] z-50 flex flex-col gap-4"
      >
        <motion.a
          href={personalInfo.social.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, x: -5 }}
          className="w-14 h-14 rounded-full bg-dark-teal flex items-center justify-center text-teal-300 hover:text-teal-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-teal-500/50"
        >
          <Github size={22} />
        </motion.a>
        <motion.a
          href={personalInfo.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, x: -5 }}
          className="w-14 h-14 rounded-full bg-dark-teal flex items-center justify-center text-teal-300 hover:text-teal-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-teal-500/50"
        >
          <Linkedin size={22} />
        </motion.a>
        <motion.a
          href={personalInfo.social.twitter}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, x: -5 }}
          className="w-14 h-14 rounded-full bg-dark-teal flex items-center justify-center text-teal-300 hover:text-teal-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-teal-500/50"
        >
          <Twitter size={22} />
        </motion.a>
        <motion.a
          href={`mailto:${personalInfo.email}`}
          whileHover={{ scale: 1.1, x: -5 }}
          className="w-14 h-14 rounded-full bg-dark-teal flex items-center justify-center text-teal-300 hover:text-teal-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-teal-500/50"
        >
          <Mail size={22} />
        </motion.a>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between gap-8 max-w-6xl mx-auto">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 flex-shrink-0"
          >
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 text-lg mb-4"
              >
                Hey, I'm <span className="text-teal-300 font-semibold">{personalInfo.name}</span>
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              >
                <span className="text-teal-100">A FULL STACK</span>
                <br />
                <span className="text-teal-300">DEVELOPER</span>
              </motion.h1>
              
              {/* Tech Stack Tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {['Frontend', 'Backend', 'Database', 'DevOps'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-teal-900/30 border border-teal-700/50 rounded-full text-teal-300 text-sm font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-400 text-lg leading-relaxed max-w-md mb-8"
              >
                {personalInfo.description}
              </motion.p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-teal-800 text-teal-100 px-6 py-2.5 rounded-full font-medium hover:bg-teal-700 transition-colors"
              >
                Contact
              </button>
              
              <a
                href="/cv.pdf"
                download
                className="bg-teal-800 text-teal-100 px-6 py-2.5 rounded-full font-medium hover:bg-teal-700 transition-colors"
              >
                Download CV
              </a>
            </div>
          </motion.div>

          {/* Profile Image - Centered with Floating Code */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="hidden lg:flex justify-center items-center flex-shrink-0 relative w-[500px] h-[500px]"
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
                className="w-64 h-80 xl:w-72 xl:h-96 object-cover"
              />
              
              {/* Available for Internship Badge - Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="px-8 py-3 bg-black rounded-md border-2 border-teal-500 whitespace-nowrap shadow-2xl shadow-teal-500/30"
              >
                <span className="text-teal-100 font-bold text-sm tracking-widest">AVAILABLE FOR INTERNSHIP</span>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Spacer to balance layout */}
          <div className="hidden lg:block flex-shrink-0 w-0"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
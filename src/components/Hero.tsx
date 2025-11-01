import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { personalInfo } from '../data/portfolio'

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-black pt-20 px-8 md:px-16 lg:px-24">
      {/* Vertical Social Icons - Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed right-1/2 translate-x-1/2 bottom-8 z-50 flex flex-row gap-4 md:right-8 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:flex-col"
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
        <div className="grid lg:grid-cols-[1fr,auto] gap-12 items-center max-w-6xl">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 text-lg mb-4"
              >
                Hey, I'm {personalInfo.name.split(' ')[0]},
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-6xl lg:text-7xl font-bold mb-6 leading-tight text-teal-100"
              >
                A FULL STACK
                <br />
                DEVELOPER
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-400 text-lg leading-relaxed max-w-md mb-8"
              >
                {personalInfo.description}
              </motion.p>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-teal-800 text-teal-100 px-8 py-4 rounded-full font-medium flex items-center gap-3 hover:bg-teal-900 transition-all duration-300"
            >
              CONTACT ME
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-700 rounded-full blur-2xl opacity-40 animate-pulse"></div>
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="relative w-64 h-64 xl:w-80 xl:h-80 rounded-full object-cover border-4 border-teal-700 shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
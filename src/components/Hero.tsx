import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { personalInfo } from '../data/portfolio'

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-gray-50 pt-20">
      {/* Vertical Social Icons - Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4"
      >
        <motion.a
          href={personalInfo.social.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, x: -5 }}
          className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-gray-700 hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Github size={22} />
        </motion.a>
        <motion.a
          href={personalInfo.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, x: -5 }}
          className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-gray-700 hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Linkedin size={22} />
        </motion.a>
        <motion.a
          href={personalInfo.social.twitter}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, x: -5 }}
          className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-gray-700 hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Twitter size={22} />
        </motion.a>
        <motion.a
          href={`mailto:${personalInfo.email}`}
          whileHover={{ scale: 1.1, x: -5 }}
          className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-gray-700 hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Mail size={22} />
        </motion.a>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
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
                className="text-gray-600 text-lg mb-4"
              >
                Hey, I'm {personalInfo.name.split(' ')[0]},
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                A FULL STACK
                <br />
                DEVELOPER
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-600 text-lg leading-relaxed max-w-md mb-8"
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
              className="bg-black text-white px-8 py-4 rounded-full font-medium flex items-center gap-3 hover:bg-gray-900 transition-colors duration-300"
            >
              CONTACT ME
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>


      </div>
    </section>
  )
}

export default Hero
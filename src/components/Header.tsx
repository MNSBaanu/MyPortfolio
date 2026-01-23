import { motion } from 'framer-motion'
import { Home, User, Cpu, FolderOpen, Mail } from 'lucide-react'

const Header = () => {
  const scrollToSection = (href: string) => {
    setTimeout(() => {
      if (href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const element = document.querySelector(href)
        if (element) {
          const headerHeight = 120
          const elementPosition = (element as HTMLElement).offsetTop - headerHeight
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          })
        }
      }
    }, 100)
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-6 left-6 z-50"
    >
      <div className="menu p-2 bg-white relative flex justify-center rounded-2xl shadow-lg">
        <motion.button
          onClick={() => scrollToSection('#home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="link group inline-flex justify-center items-center w-16 h-12 rounded-lg relative z-10 overflow-hidden transition-all duration-200 ease-in hover:w-32 focus:w-32 focus:outline-none"
        >
          <div className="absolute z-[-1] block rounded-lg w-full h-full top-0 transform translate-x-full transition-transform duration-200 ease-in bg-gray-100 group-hover:translate-x-0 group-focus:translate-x-0"></div>
          
          <Home className="w-7 h-7 block flex-shrink-0 absolute left-4" />
          
          <span className="transform translate-x-full transition-transform duration-200 ease-in block text-center text-sm font-medium w-full text-gray-700 group-hover:translate-x-0 group-focus:translate-x-0 group-hover:opacity-100 group-focus:opacity-100 opacity-0 pl-7">
            Home
          </span>
        </motion.button>

        <motion.button
          onClick={() => scrollToSection('#about')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="link group inline-flex justify-center items-center w-16 h-12 rounded-lg relative z-10 overflow-hidden transition-all duration-200 ease-in hover:w-32 focus:w-32 focus:outline-none"
        >
          <div className="absolute z-[-1] block rounded-lg w-full h-full top-0 transform translate-x-full transition-transform duration-200 ease-in bg-gray-100 group-hover:translate-x-0 group-focus:translate-x-0"></div>
          
          <User className="w-7 h-7 block flex-shrink-0 absolute left-4" />
          
          <span className="transform translate-x-full transition-transform duration-200 ease-in block text-center text-sm font-medium w-full text-gray-700 group-hover:translate-x-0 group-focus:translate-x-0 group-hover:opacity-100 group-focus:opacity-100 opacity-0 pl-7">
            About
          </span>
        </motion.button>

        <motion.button
          onClick={() => scrollToSection('#skills')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="link group inline-flex justify-center items-center w-16 h-12 rounded-lg relative z-10 overflow-hidden transition-all duration-200 ease-in hover:w-32 focus:w-32 focus:outline-none"
        >
          <div className="absolute z-[-1] block rounded-lg w-full h-full top-0 transform translate-x-full transition-transform duration-200 ease-in bg-gray-100 group-hover:translate-x-0 group-focus:translate-x-0"></div>
          
          <Cpu className="w-7 h-7 block flex-shrink-0 absolute left-4" />
          
          <span className="transform translate-x-full transition-transform duration-200 ease-in block text-center text-sm font-medium w-full text-gray-700 group-hover:translate-x-0 group-focus:translate-x-0 group-hover:opacity-100 group-focus:opacity-100 opacity-0 pl-7">
            Skills
          </span>
        </motion.button>

        <motion.button
          onClick={() => scrollToSection('#projects')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="link group inline-flex justify-center items-center w-16 h-12 rounded-lg relative z-10 overflow-hidden transition-all duration-200 ease-in hover:w-32 focus:w-32 focus:outline-none"
        >
          <div className="absolute z-[-1] block rounded-lg w-full h-full top-0 transform translate-x-full transition-transform duration-200 ease-in bg-gray-100 group-hover:translate-x-0 group-focus:translate-x-0"></div>
          
          <FolderOpen className="w-7 h-7 block flex-shrink-0 absolute left-4" />
          
          <span className="transform translate-x-full transition-transform duration-200 ease-in block text-center text-sm font-medium w-full text-gray-700 group-hover:translate-x-0 group-focus:translate-x-0 group-hover:opacity-100 group-focus:opacity-100 opacity-0 pl-7">
            Projects
          </span>
        </motion.button>

        <motion.button
          onClick={() => scrollToSection('#contact')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="link group inline-flex justify-center items-center w-16 h-12 rounded-lg relative z-10 overflow-hidden transition-all duration-200 ease-in hover:w-32 focus:w-32 focus:outline-none"
        >
          <div className="absolute z-[-1] block rounded-lg w-full h-full top-0 transform translate-x-full transition-transform duration-200 ease-in bg-gray-100 group-hover:translate-x-0 group-focus:translate-x-0"></div>
          
          <Mail className="w-7 h-7 block flex-shrink-0 absolute left-4" />
          
          <span className="transform translate-x-full transition-transform duration-200 ease-in block text-center text-sm font-medium w-full text-gray-700 group-hover:translate-x-0 group-focus:translate-x-0 group-hover:opacity-100 group-focus:opacity-100 opacity-0 pl-7">
            Contact
          </span>
        </motion.button>
      </div>
    </motion.header>
  )
}

export default Header
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { personalInfo } from '../data/portfolio'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md border-b border-teal-600/40 shadow-lg shadow-teal-900/20' 
          : 'bg-black/60 backdrop-blur-lg border-b border-teal-600/20'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex items-center h-24 max-w-6xl mx-auto gap-8">
          {/* Logo - Always visible */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer mr-8"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src="/assets/Logo.png" 
              alt="Logo" 
              className="h-12 w-12 object-contain"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 ml-auto">
            {navItems.slice(0, 3).map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 text-teal-300 hover:text-teal-100 transition-colors duration-300 font-semibold text-base uppercase"
              >
                {item.name}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => scrollToSection('#contact')}
              className="ml-2 px-6 py-2 text-teal-300 hover:text-teal-100 font-semibold text-base transition-colors duration-300 uppercase"
            >
              Contact
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-teal-100"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ 
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-black/95 backdrop-blur-md border-t border-dark-teal/30"
        >
          <div className="py-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-6 py-3 text-gray-300 hover:text-teal-400 hover:bg-dark-teal/20 transition-colors duration-300"
              >
                {item.name}
              </button>
            ))}
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}

export default Header
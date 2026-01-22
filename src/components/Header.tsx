import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { personalInfo } from '../data/portfolio'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isMobileMenuOpen && !target.closest('header')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    // Close mobile menu first
    setIsMobileMenuOpen(false)
    
    // Small delay to allow menu to close, then scroll
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        const headerHeight = 80 // Account for fixed header
        const elementPosition = element.offsetTop - headerHeight
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg' 
          : 'bg-white/80 backdrop-blur-lg border-b border-gray-100'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20 md:h-24 max-w-6xl mx-auto">
          {/* Logo - Always visible */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer ml-2 sm:ml-4"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src="/assets/Logo.png" 
              alt="Logo" 
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.slice(0, 3).map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 text-gray-700 hover:text-black transition-colors duration-300 font-semibold text-base"
              >
                {item.name}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => scrollToSection('#contact')}
              className="ml-2 px-6 py-2 text-gray-700 hover:text-black font-semibold text-base transition-colors duration-300"
            >
              Contact
            </motion.button>
          </div>

          {/* Mobile Menu Button - Right Corner */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 sm:p-2 text-black"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
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
          className={`md:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-gray-200 ${
            isMobileMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="py-3 sm:py-4 space-y-2 sm:space-y-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-700 hover:text-black hover:bg-gray-100 transition-colors duration-300"
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
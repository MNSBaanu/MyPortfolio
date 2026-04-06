import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Sun, Moon, X } from 'lucide-react'
import { personalInfo } from '../data/portfolio'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { name: 'Home',     href: '#home'     },
  { name: 'About',    href: '#about'    },
  { name: 'Journey',  href: '#journey'  },
  { name: 'Skills',   href: '#skills'   },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact',  href: '#contact'  },
]

// Sections that are sticky cards — we scroll to their offsetTop so they
// slide up to the front naturally with the stacking animation.
const STICKY_SECTIONS = ['about', 'journey', 'experience', 'education', 'certifications', 'skills', 'projects', 'contact']

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const headerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    // Map section ids to nav ids (experience/education/certifications → journey)
    const sectionToNav: Record<string, string> = {
      experience: 'journey', education: 'journey', certifications: 'journey'
    }
    const allSections = ['home', 'about', 'experience', 'education', 'certifications', 'skills', 'projects', 'contact']
    allSections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(sectionToNav[id] ?? id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  useLayoutEffect(() => {
    const el = headerRef.current
    if (!el) return
    const update = () =>
      document.documentElement.style.setProperty('--header-height', `${el.offsetHeight}px`)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [isScrolled, isMobileMenuOpen])

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false)
    let id = href.replace('#', '')

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // Journey nav item scrolls to experience (first of the journey group)
    if (id === 'journey') id = 'experience'

    const el = document.getElementById(id)
    if (!el) return

    if (STICKY_SECTIONS.includes(id)) {
      const top = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top, behavior: 'smooth' })
    } else {
      const headerH = headerRef.current?.offsetHeight ?? 80
      const top = el.getBoundingClientRect().top + window.scrollY - headerH
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-white/90 dark:bg-black/90 backdrop-blur-2xl border-b border-gray-100 dark:border-neutral-900'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="text-xl sm:text-2xl font-bold tracking-tighter text-black dark:text-white">
            {personalInfo.name}
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-100/80 dark:bg-neutral-900/80 px-2 py-1.5 rounded-full border border-gray-200 dark:border-neutral-800 backdrop-blur-sm">
          {navLinks.map((link, i) => {
            const id = link.href.replace('#', '')
            const isActive = activeSection === id
            return (
              <motion.button
                key={link.name}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                onClick={() => scrollToSection(link.href)}
                className="relative px-4 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-full transition-colors duration-300"
              >
                {/* Active pill */}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-black dark:bg-white rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 transition-colors duration-300 ${
                  isActive
                    ? 'text-white dark:text-black'
                    : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}>
                  {link.name}
                </span>
              </motion.button>
            )
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black text-gray-600 dark:text-gray-300 hover:border-gray-400 dark:hover:border-neutral-600 transition-all duration-300"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('#contact')}
            className="hidden sm:flex px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity"
          >
            Hire Me
          </motion.button>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full bg-gray-100 dark:bg-neutral-900 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-neutral-800"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-black border-b border-gray-100 dark:border-neutral-900 px-6 py-6 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const id = link.href.replace('#', '')
                const isActive = activeSection === id
                return (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => scrollToSection(link.href)}
                    className={`text-left py-2.5 text-lg font-semibold transition-colors ${
                      isActive
                        ? 'text-black dark:text-white'
                        : 'text-gray-400 dark:text-neutral-600 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {link.name}
                  </motion.button>
                )
              })}
              <motion.button
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                onClick={toggleTheme}
                className="mt-3 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header

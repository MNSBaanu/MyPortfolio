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
const STICKY_SECTIONS = ['about', 'journey', 'experience', 'education', 'skills', 'projects', 'contact']

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
    const sectionToNav: Record<string, string> = {
      experience: 'journey', education: 'journey'
    }
    const allSections = ['home', 'about', 'experience', 'education', 'skills', 'projects', 'contact']
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
  }, [isMobileMenuOpen])

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false)
    let id = href.replace('#', '')

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

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
      className="fixed top-0 inset-x-0 z-[100] px-4 sm:px-6 pt-3 sm:pt-4 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`pointer-events-auto rounded-2xl border border-gray-200/80 dark:border-neutral-800 bg-white/85 dark:bg-black/85 backdrop-blur-xl px-4 sm:px-6 py-3 transition-shadow duration-500 ${
            isScrolled ? 'shadow-md' : 'shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="cursor-pointer shrink-0"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white">
                {personalInfo.name}
              </span>
            </motion.div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-6">
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
                    className={`relative py-1 text-sm font-medium tracking-tight transition-colors duration-300 ${
                      isActive
                        ? 'text-black dark:text-white'
                        : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-black dark:bg-white rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-neutral-500 transition-all duration-300"
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

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                className="md:hidden p-2.5 rounded-full border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-700 dark:text-gray-200 hover:border-gray-300 dark:hover:border-neutral-500 transition-all duration-300"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto mt-2 rounded-2xl border border-gray-200/80 dark:border-neutral-800 bg-white/95 dark:bg-black/95 backdrop-blur-xl shadow-lg px-4 sm:px-6 py-4 md:hidden"
            >
              <div className="flex flex-col gap-0.5">
                {navLinks.map((link, i) => {
                  const id = link.href.replace('#', '')
                  const isActive = activeSection === id
                  return (
                    <motion.button
                      key={link.name}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => scrollToSection(link.href)}
                      className={`text-left py-2.5 text-base font-semibold tracking-tight transition-colors ${
                        isActive
                          ? 'text-black dark:text-white'
                          : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {link.name}
                    </motion.button>
                  )
                })}
                <motion.button
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  onClick={toggleTheme}
                  className="mt-2 flex items-center gap-2 py-2 text-sm font-medium tracking-tight text-gray-500 dark:text-gray-400"
                >
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                  {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header

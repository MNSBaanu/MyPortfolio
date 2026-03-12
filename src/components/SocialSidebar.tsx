import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { personalInfo } from '../data/portfolio'
import { useState, useEffect } from 'react'

const SocialSidebar = () => {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const socialLinks = [
    { 
      icon: Github, 
      href: personalInfo.social.github, 
      label: 'GitHub',
      external: true 
    },
    { 
      icon: Linkedin, 
      href: personalInfo.social.linkedin, 
      label: 'LinkedIn',
      external: true 
    },
    { 
      icon: Mail, 
      href: `mailto:${personalInfo.email}`, 
      label: 'Email',
      external: false 
    }
  ]

  return (
    <div className="fixed right-6 md:right-8 top-[35%] z-[110] flex flex-col gap-4 pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="flex flex-col gap-4 pointer-events-auto"
      >
        {socialLinks.map((social) => (
          <motion.a
            key={social.label}
            href={social.href}
            target={social.external ? "_blank" : undefined}
            rel={social.external ? "noopener noreferrer" : undefined}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group flex justify-center p-3.5 rounded-full bg-white text-gray-700 hover:text-black shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300 relative"
          >
            <social.icon className="w-5 h-5" strokeWidth={2} />
            <span className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none">
              {social.label}
            </span>
          </motion.a>
        ))}

        <AnimatePresence>
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
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default SocialSidebar

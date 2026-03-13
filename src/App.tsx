import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'
import LoadingScreen from './components/LoadingScreen'
import SEO from './components/SEO'
import Header from './components/Header'
import SocialSidebar from './components/SocialSidebar'
import Hero from './components/Hero'
import About from './components/About'
import Journey from './components/Journey'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Preload images
    const images = ['/assets/profile.png', '/assets/Logo.png']
    const imagePromises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = resolve
        img.onerror = reject
      })
    })

    Promise.all(imagePromises).catch(() => {
      // Continue even if images fail to load
    })
  }, [])

  return (
    <HelmetProvider>
      <ThemeProvider>
        <SEO />
        <Toaster position="top-right" />
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" onLoadingComplete={() => setIsLoading(false)} />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-black dark:text-gray-100"
            >
              <Header />
              <SocialSidebar />
              <main className="relative flex-1 bg-gray-50 dark:bg-black">
                <section className="sticky top-0 h-screen z-0">
                  <Hero />
                </section>
                <div className="relative z-10 space-y-0">
                  <section id="about" className="sticky top-0 z-20">
                    <About />
                  </section>
                  <section id="journey" className="sticky top-0 z-30">
                    <Journey />
                  </section>
                  <section id="skills" className="sticky top-0 z-40">
                    <Skills />
                  </section>
                  <section id="projects" className="sticky top-0 z-50">
                    <Projects />
                  </section>
                  <section id="contact" className="sticky top-0 z-[60]">
                    <Contact />
                  </section>
                  <section id="contact-form" className="sticky top-0 z-[70]">
                    <ContactForm />
                  </section>
                  <Footer />
                </div>
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App

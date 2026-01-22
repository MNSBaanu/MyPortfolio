import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'
import LoadingScreen from './components/LoadingScreen'
import SEO from './components/SEO'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Journey from './components/Journey'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
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
              className="min-h-screen bg-white text-gray-900"
            >
              <Header />
              <main>
                <Hero />
                <About />
                <Journey />
                <Skills />
                <Projects />
                <Contact />
              </main>
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'
import LoadingScreen from './components/LoadingScreen'
import SEO from './components/SEO'
import Header from './components/Header'
import SocialSidebar from './components/SocialSidebar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const maxWait = window.setTimeout(() => setIsLoading(false), 400)

    const images = ['/assets/profile.png', '/assets/Logo.png']
    const imagePromises = images.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.onload = () => resolve()
          img.onerror = () => resolve()
          img.src = src
        })
    )

    Promise.all(imagePromises).then(() => setIsLoading(false))

    return () => window.clearTimeout(maxWait)
  }, [])

  return (
    <HelmetProvider>
      <ThemeProvider>
        <SEO />
        <Toaster position="top-right" />
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" />
          ) : (
            <div
              key="content"
              className="min-h-screen bg-black text-gray-900 dark:bg-black dark:text-gray-100"
            >
              <Header />
              <SocialSidebar />
              <main className="relative bg-black dark:bg-black">
                <section className="sticky top-0 z-0 h-screen">
                  <Hero />
                </section>
                <section id="about" className="sticky top-0 z-20">
                  <About />
                </section>
                <section id="experience" className="sticky top-0 z-30">
                  <Experience />
                </section>
                <section id="education" className="sticky top-0 z-[35]">
                  <Education />
                </section>
                <section id="certifications" className="sticky top-0 z-[38]">
                  <Certifications />
                </section>
                <section id="skills" className="sticky top-0 z-40">
                  <Skills />
                </section>
                <section id="projects" className="sticky top-0 z-50">
                  <Projects />
                </section>
                <div className="h-[40vh] relative z-[55] pointer-events-none" aria-hidden="true" />
                <section id="contact" className="sticky top-0 z-[60]">
                  <Contact />
                </section>
                <section id="contact-form" className="sticky top-0 z-[70]">
                  <ContactForm />
                </section>
                <Footer />
              </main>
            </div>
          )}
        </AnimatePresence>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App

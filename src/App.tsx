import { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'
import LoadingScreen from './components/LoadingScreen'
import SEO from './components/SEO'
import Header from './components/Header'
import SocialSidebar from './components/SocialSidebar'
import Hero from './components/Hero'
// ⚡ Bolt: Lazy load below-the-fold sections to reduce initial JS bundle size and improve page load performance.
const About = lazy(() => import('./components/About'))
const Experience = lazy(() => import('./components/Experience'))
const Education = lazy(() => import('./components/Education'))
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))
const ContactForm = lazy(() => import('./components/ContactForm'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const maxWait = window.setTimeout(() => setIsLoading(false), 400)

    const images = ['/assets/about.png', '/assets/Logo.png']
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
                  <Suspense fallback={null}><About /></Suspense>
                </section>
                <section id="experience" className="sticky top-0 z-30">
                  <Suspense fallback={null}><Experience /></Suspense>
                </section>
                <section id="education" className="sticky top-0 z-[35]">
                  <Suspense fallback={null}><Education /></Suspense>
                </section>
                <section id="skills" className="sticky top-0 z-40">
                  <Suspense fallback={null}><Skills /></Suspense>
                </section>
                <section id="projects" className="sticky top-0 z-50">
                  <Suspense fallback={null}><Projects /></Suspense>
                </section>
                <div className="h-[40vh] relative z-[55] pointer-events-none" aria-hidden="true" />
                <section id="contact" className="sticky top-0 z-[60]">
                  <Suspense fallback={null}><Contact /></Suspense>
                </section>
                <section id="contact-form" className="sticky top-0 z-[70]">
                  <Suspense fallback={null}><ContactForm /></Suspense>
                </section>
                <Suspense fallback={null}><Footer /></Suspense>
              </main>
            </div>
          )}
        </AnimatePresence>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App

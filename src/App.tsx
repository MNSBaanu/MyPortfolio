import { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'
import LoadingScreen from './components/layout/LoadingScreen'
import SEO from './components/layout/SEO'
import Header from './components/layout/Header'
import SocialSidebar from './components/layout/SocialSidebar'
import Hero from './components/sections/Hero'
// Lazy load below-the-fold sections to reduce initial JS bundle size and improve page load performance.
const About = lazy(() => import('./components/sections/About'))
const Experience = lazy(() => import('./components/sections/Experience'))
const Education = lazy(() => import('./components/sections/Education'))
const Skills = lazy(() => import('./components/sections/Skills'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Contact = lazy(() => import('./components/sections/Contact'))
const ContactForm = lazy(() => import('./components/sections/ContactForm'))
const Footer = lazy(() => import('./components/layout/Footer'))

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Prefetch lazy-loaded section chunks while the loading screen is visible.
    const prefetchComponents = () => {
      import('./components/sections/About')
      import('./components/sections/Experience')
      import('./components/sections/Education')
      import('./components/sections/Skills')
      import('./components/sections/Projects')
      import('./components/sections/Contact')
      import('./components/sections/ContactForm')
      import('./components/layout/Footer')
    }
    prefetchComponents()

    const maxWait = window.setTimeout(() => setIsLoading(false), 400)

    const images = ['/assets/brand/profile.webp', '/assets/brand/logo.png']
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
        <MotionConfig reducedMotion="user">
          <SEO />
          <Toaster position="top-right" />
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingScreen key="loading" />
            ) : (
              <div
                key="content"
                className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100"
              >
                <Header />
                <SocialSidebar />
                <main className="relative bg-white dark:bg-black">
                  <section className="sticky top-0 z-0 h-screen supports-[height:100svh]:h-[100svh]">
                    <Hero />
                  </section>
                  <section id="about" className="relative -mt-12 md:mt-0 md:sticky md:top-0 z-20">
                    <Suspense fallback={null}><About /></Suspense>
                  </section>
                  <section id="experience" className="relative -mt-12 md:mt-0 md:sticky md:top-0 z-30">
                    <Suspense fallback={null}><Experience /></Suspense>
                  </section>
                  <section id="education" className="relative -mt-12 md:mt-0 md:sticky md:top-0 z-[35]">
                    <Suspense fallback={null}><Education /></Suspense>
                  </section>
                  <section id="skills" className="relative -mt-12 md:mt-0 md:sticky md:top-0 z-40">
                    <Suspense fallback={null}><Skills /></Suspense>
                  </section>
                  <section id="projects" className="relative -mt-12 lg:mt-0 lg:sticky lg:top-0 z-50">
                    <Suspense fallback={null}><Projects /></Suspense>
                  </section>
                  <div className="hidden md:block h-[40vh] relative z-[55] pointer-events-none" aria-hidden="true" />
                  <section id="contact" className="relative -mt-12 md:mt-0 md:sticky md:top-0 z-[60]">
                    <Suspense fallback={null}><Contact /></Suspense>
                  </section>
                  <section id="contact-form" className="relative -mt-12 md:mt-0 md:sticky md:top-0 z-[70]">
                    <Suspense fallback={null}><ContactForm /></Suspense>
                  </section>
                  <Suspense fallback={null}><Footer /></Suspense>
                </main>
              </div>
            )}
          </AnimatePresence>
        </MotionConfig>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App

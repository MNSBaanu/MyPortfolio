import { motion, useScroll, useTransform } from 'framer-motion'
import { personalInfo } from '../data/portfolio'
import { useRef } from 'react'

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  })

  // This transform makes the footer move up slower than the scroll speed
  // -50px is a subtle lift, you can increase it for more effect
  const y = useTransform(scrollYProgress, [0, 1], [50, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])

  return (
    <motion.footer
      ref={footerRef}
      style={{ y, opacity }}
      className="relative z-[80] bg-white dark:bg-black py-8 px-6 sm:px-8 md:px-12 lg:px-16 border-t border-gray-100 dark:border-neutral-800"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter text-black dark:text-gray-100"
          >
            Powered by Passion, Built with Precision
          </motion.p>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
            <div className="w-12 h-1 bg-black/10 dark:bg-white/10 rounded-full mt-2" />
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

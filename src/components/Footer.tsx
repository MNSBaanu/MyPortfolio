import { personalInfo } from '../data/portfolio'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-6 sm:px-8 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center gap-4 text-center"
        >
          <p className="text-xl sm:text-2xl font-bold tracking-tighter text-black">
            Powered by Passion, Built with Precision
          </p>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

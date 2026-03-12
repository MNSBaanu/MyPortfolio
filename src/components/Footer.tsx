import { personalInfo } from '../data/portfolio'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 py-12 px-6 sm:px-8 md:px-12 lg:px-16 border-t border-gray-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-xl sm:text-2xl font-bold tracking-tighter text-black dark:text-slate-100">
            Powered by Passion, Built with Precision
          </p>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

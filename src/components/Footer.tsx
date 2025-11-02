import { ArrowUp } from 'lucide-react'
import { personalInfo } from '../data/portfolio'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-black text-teal-100 py-8 px-8 md:px-16 lg:px-24 border-t border-dark-teal/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-teal-200">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="bg-teal-800 text-teal-100 px-6 py-2.5 rounded-full font-medium hover:bg-teal-700 transition-colors flex items-center gap-2"
          >
            Back to Top
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  )
}

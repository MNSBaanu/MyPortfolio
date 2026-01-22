import { personalInfo } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="bg-white text-black pt-4 sm:pt-6 pb-8 sm:pb-12 px-4 sm:px-8 md:px-16 lg:px-24 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 text-center">
          <p className="text-black text-sm sm:text-base md:text-lg font-medium">
            Powered by Passion, Built with Precision
          </p>
          <p className="text-gray-600 text-xs sm:text-sm">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

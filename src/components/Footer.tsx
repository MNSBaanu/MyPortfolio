import { personalInfo } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="bg-black text-teal-100 pt-6 pb-12 px-8 md:px-16 lg:px-24 pr-24 md:pr-28 lg:pr-32 border-t border-dark-teal/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-teal-300 text-lg font-medium">
            Powered by Passion, Built with Precision
          </p>
          <p className="text-teal-200 text-sm">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

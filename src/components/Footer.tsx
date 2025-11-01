import { personalInfo } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="bg-black text-teal-100 py-8 px-6 border-t border-dark-teal/30">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-teal-200">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <a 
            href={personalInfo.social.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-teal-300 hover:text-teal-400 transition-colors"
          >
            GitHub
          </a>
          <a 
            href={personalInfo.social.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-teal-300 hover:text-teal-400 transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href={personalInfo.social.twitter} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-teal-300 hover:text-teal-400 transition-colors"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  )
}

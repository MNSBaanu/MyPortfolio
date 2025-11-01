export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            GitHub
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  )
}

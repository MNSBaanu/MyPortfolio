import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-8 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                I'm a passionate developer who loves creating beautiful, functional, and user-friendly applications. 
                With a keen eye for design and a strong foundation in modern web technologies, I bring ideas to life.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                My approach combines clean code, thoughtful design, and attention to detail to deliver 
                exceptional digital experiences that users love.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-green-800">What I Do</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-700 mr-2">✓</span>
                  <span className="text-gray-700">Full-stack web development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2">✓</span>
                  <span className="text-gray-700">Responsive UI/UX design</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2">✓</span>
                  <span className="text-gray-700">Modern JavaScript frameworks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2">✓</span>
                  <span className="text-gray-700">Performance optimization</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

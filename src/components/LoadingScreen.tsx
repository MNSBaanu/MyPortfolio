import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => onLoadingComplete(), 500)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(timer)
  }, [onLoadingComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
    >
      {/* Logo with draw/trace effect from left to right */}
      <div className="relative w-40 h-40 md:w-48 md:h-48 overflow-hidden">
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ 
            duration: 2,
            ease: "easeInOut"
          }}
        >
          <img
            src="/assets/Logo.png"
            alt="Logo"
            className="w-40 h-40 md:w-48 md:h-48 object-contain"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

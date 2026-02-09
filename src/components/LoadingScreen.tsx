import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => onLoadingComplete(), 300)
          return 100
        }
        return prev + 3
      })
    }, 40)

    return () => clearInterval(timer)
  }, [onLoadingComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-4"
    >
      {/* Logo with draw/trace effect from left to right */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 overflow-hidden">
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ 
            duration: 1.5,
            ease: "easeInOut"
          }}
        >
          <img
            src="/assets/Logo.png"
            alt="Portfolio Logo"
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
            loading="eager"
            onError={(e) => {
              // Fallback if logo doesn't load
              e.currentTarget.style.display = 'none'
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

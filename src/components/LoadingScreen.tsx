import { motion } from 'framer-motion'

const TICKS = 12

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
    >
      <motion.div
        className="relative w-24 h-24"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
      >
        {Array.from({ length: TICKS }).map((_, i) => {
          const angle = (i / TICKS) * 360
          const opacity = 0.12 + ((TICKS - 1 - i) / (TICKS - 1)) * 0.88
          return (
            <div
              key={i}
              className="absolute"
              style={{
                width: '100%',
                height: '100%',
                transform: `rotate(${angle}deg)`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '4px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 10,
                  height: 22,
                  borderRadius: 3,
                  backgroundColor: `rgba(255,255,255,${opacity})`,
                }}
              />
            </div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

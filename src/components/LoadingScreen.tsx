import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const TICKS = 12
const HOLD = 2600

export default function LoadingScreen({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    let frame: number
    let start: number | null = null
    const speed = 120 // degrees per second

    const animate = (ts: number) => {
      if (!start) start = ts
      setRotation(((ts - start) * speed) / 1000)
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)

    const t = setTimeout(() => onLoadingComplete(), HOLD)
    return () => { cancelAnimationFrame(frame); clearTimeout(t) }
  }, [onLoadingComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
    >
      {/* Spinner */}
      <div className="relative w-24 h-24" style={{ transform: `rotate(${rotation}deg)` }}>
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
      </div>
    </motion.div>
  )
}

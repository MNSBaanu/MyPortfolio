import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [phase, setPhase] = useState<'sliding' | 'logo'>('sliding')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('logo'), 950)
    const t2 = setTimeout(() => onLoadingComplete(), 2600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onLoadingComplete])

  const logoSize = 'w-20 sm:w-24 md:w-28'

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] overflow-hidden bg-black"
    >
      {/* Left card — white */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-white rounded-tr-[2.5rem] rounded-br-[2.5rem] overflow-hidden"
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        {/* LogoL anchored to right edge of card = screen center */}
        <motion.div
          className="absolute inset-y-0 right-0 flex items-center justify-end"
          animate={{ opacity: phase === 'logo' ? 0 : 1 }}
          transition={{ duration: 0.25 }}
        >
          <img
            src="/assets/LogoL.png"
            alt=""
            aria-hidden
            className={`${logoSize} h-auto object-contain`}
          />
        </motion.div>
      </motion.div>

      {/* Right card — black */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-black rounded-tl-[2.5rem] rounded-bl-[2.5rem] overflow-hidden"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        {/* LogoD anchored to left edge of card = screen center */}
        <motion.div
          className="absolute inset-y-0 left-0 flex items-center justify-start"
          animate={{ opacity: phase === 'logo' ? 0 : 1 }}
          transition={{ duration: 0.25 }}
        >
          <img
            src="/assets/LogoD.png"
            alt=""
            aria-hidden
            className={`${logoSize} h-auto object-contain`}
          />
        </motion.div>
      </motion.div>

      {/* LogoF removed */}
    </motion.div>
  )
}

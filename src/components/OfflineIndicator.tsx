import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WifiOff, Wifi } from 'lucide-react'
import toast from 'react-hot-toast'

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [showOfflineBanner, setShowOfflineBanner] = useState(false)
  const [offlineReady, setOfflineReady] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowOfflineBanner(false)
      toast.success('Back online! 🎉', {
        duration: 3000,
        icon: '🌐',
      })
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowOfflineBanner(true)
      toast('You\'re offline. Don\'t worry, the portfolio still works! 📱', {
        duration: 5000,
        icon: '📡',
      })
    }

    const handleOfflineReady = () => {
      setOfflineReady(true)
      toast.success('Portfolio is now available offline! 🚀', {
        duration: 4000,
        icon: '💾',
      })
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    window.addEventListener('sw-offline-ready', handleOfflineReady)

    // Check initial state
    if (!navigator.onLine) {
      setShowOfflineBanner(true)
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('sw-offline-ready', handleOfflineReady)
    }
  }, [])

  return (
    <AnimatePresence>
      {showOfflineBanner && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-600 to-red-600 text-white py-2 px-4 shadow-lg"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm font-medium">
            <WifiOff className="w-4 h-4 animate-pulse" />
            <span>You're offline - Portfolio loaded from cache</span>
            <span className="hidden sm:inline text-xs opacity-90">
              (Some features like contact form may not work)
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

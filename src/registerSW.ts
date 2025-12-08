import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    // Show a prompt to user
    if (confirm('New content available. Reload to update?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline')
    // Optional: Show a toast notification
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('sw-offline-ready')
      window.dispatchEvent(event)
    }
  },
  onRegistered(registration) {
    console.log('Service Worker registered:', registration)
  },
  onRegisterError(error) {
    console.error('Service Worker registration error:', error)
  },
})

export default updateSW

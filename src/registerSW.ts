import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    // Show a prompt to user
    if (confirm('New content available. Reload to update?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    // offline ready
  },
  onRegistered(_registration: ServiceWorkerRegistration | undefined) {
    // registered
  },
  onRegisterError(error: unknown) {
    console.error('Service Worker registration error:', error)
  },
})

export default updateSW

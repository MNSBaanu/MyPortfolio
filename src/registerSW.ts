import { registerSW } from 'virtual:pwa-register'

registerSW({
  onRegisterError(error: unknown) {
    console.error('Service Worker registration error:', error)
  },
})

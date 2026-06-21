import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const defer = (callback: () => void) => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout: 3000 })
  } else {
    window.setTimeout(callback, 1)
  }
}

defer(() => {
  void import('./registerSW')
})

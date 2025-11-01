/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'matrix-green': '#00ff41',
        'terminal-green': '#39ff14',
        'cyber-blue': '#00d4ff',
        'neon-purple': '#b026ff',
        'dark-void': '#000000',
        'code-gray': '#1a1a1a',
        'hologram': '#00ffff',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        'cyber': ['Orbitron', 'sans-serif'],
      },
      animation: {
        'matrix-rain': 'matrix-rain 20s linear infinite',
        'hologram': 'hologram 3s ease-in-out infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'float-3d': 'float-3d 6s ease-in-out infinite',
        'terminal-cursor': 'terminal-cursor 1s ease-in-out infinite',
        'code-scan': 'code-scan 2s linear infinite',
      },
      keyframes: {
        'matrix-rain': {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'hologram': {
          '0%, 100%': { 
            opacity: '0.8',
            transform: 'translateY(0px) rotateX(0deg)',
            filter: 'hue-rotate(0deg)'
          },
          '50%': { 
            opacity: '1',
            transform: 'translateY(-10px) rotateX(5deg)',
            filter: 'hue-rotate(90deg)'
          },
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'float-3d': {
          '0%, 100%': { 
            transform: 'translateY(0px) rotateY(0deg) rotateX(0deg)' 
          },
          '33%': { 
            transform: 'translateY(-20px) rotateY(120deg) rotateX(10deg)' 
          },
          '66%': { 
            transform: 'translateY(10px) rotateY(240deg) rotateX(-10deg)' 
          },
        },
        'terminal-cursor': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        'code-scan': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
    },
  },
  plugins: [],
}
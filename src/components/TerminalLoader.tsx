import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TerminalLoaderProps {
  onComplete: () => void
}

const TerminalLoader = ({ onComplete }: TerminalLoaderProps) => {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayText, setDisplayText] = useState('')

  const bootSequence = [
    'INITIALIZING DEVELOPER MATRIX...',
    'LOADING NEURAL NETWORKS...',
    'CONNECTING TO CODE REPOSITORIES...',
    'SCANNING SKILL DATABASES...',
    'ESTABLISHING HOLOGRAPHIC INTERFACE...',
    'CALIBRATING 3D PROJECTORS...',
    'ACTIVATING QUANTUM PROCESSORS...',
    'SYNCHRONIZING WITH DIGITAL DIMENSION...',
    'BOOT SEQUENCE COMPLETE.',
    'WELCOME TO THE DEVELOPER UNIVERSE.'
  ]

  useEffect(() => {
    if (currentLine >= bootSequence.length) {
      setTimeout(onComplete, 1000)
      return
    }

    const line = bootSequence[currentLine]
    let charIndex = 0

    const typeInterval = setInterval(() => {
      if (charIndex <= line.length) {
        setDisplayText(line.substring(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          setCurrentLine(prev => prev + 1)
          setDisplayText('')
        }, 300)
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [currentLine, onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-dark-void z-50"
    >
      <div className="terminal-window p-8 max-w-2xl w-full mx-4">
        <div className="mt-8">
          <div className="text-terminal-green mb-4">
            <span className="text-cyber-blue">[SYSTEM]</span> Developer Portfolio v2.0.1
          </div>
          
          <div className="space-y-2 mb-8">
            {bootSequence.slice(0, currentLine).map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-matrix-green"
              >
                <span className="text-hologram">{'>'}</span> {line}
              </motion.div>
            ))}
            
            {currentLine < bootSequence.length && (
              <div className="text-matrix-green">
                <span className="text-hologram">{'>'}</span> {displayText}
                <span className="animate-terminal-cursor">█</span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-code-gray border border-matrix-green">
            <motion.div
              className="h-2 bg-gradient-to-r from-matrix-green to-cyber-blue"
              initial={{ width: 0 }}
              animate={{ width: `${(currentLine / bootSequence.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <div className="text-right text-sm text-cyber-blue mt-2">
            {Math.round((currentLine / bootSequence.length) * 100)}% Complete
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TerminalLoader
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react'

const ContactTerminal = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [currentField, setCurrentField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email Protocol',
      value: 'your.email@domain.com',
      command: 'sendmail -t your.email@domain.com',
      color: 'text-matrix-green'
    },
    {
      icon: Phone,
      label: 'Voice Channel',
      value: '+1 (555) 123-4567',
      command: 'call +15551234567',
      color: 'text-cyber-blue'
    },
    {
      icon: MapPin,
      label: 'Physical Location',
      value: 'San Francisco, CA',
      command: 'ping location.coordinates',
      color: 'text-neon-purple'
    }
  ]

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: '#', command: 'git remote add origin' },
    { icon: Linkedin, label: 'LinkedIn', url: '#', command: 'curl -X GET linkedin.com' },
    { icon: Twitter, label: 'Twitter', url: '#', command: 'tweet --follow @username' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-16 px-4"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="terminal-window p-6 mb-8"
        >
          <div className="mt-8">
            <div className="text-cyber-blue mb-4">
              $ establish_connection --target=developer
            </div>
            <motion.h2
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold holographic"
            >
              Initialize Contact Protocol
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-matrix-green mt-2"
            >
              Ready to collaborate? Let's build something amazing together.
            </motion.p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Contact Form Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="terminal-window p-6"
          >
            <div className="mt-8">
              <div className="text-cyber-blue mb-6">
                $ nano message.txt
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-matrix-green text-sm mb-2">
                    {'>'} Enter your name:
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02, borderColor: '#00ffff' }}
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onFocus={() => setCurrentField('name')}
                    onBlur={() => setCurrentField(null)}
                    className="w-full bg-transparent border border-matrix-green p-3 text-terminal-green focus:border-hologram focus:outline-none transition-colors font-mono"
                    placeholder="John Doe"
                    required
                  />
                  {currentField === 'name' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-cyber-blue mt-1"
                    >
                      $ echo "Name: {formData.name}"
                    </motion.div>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-matrix-green text-sm mb-2">
                    {'>'} Enter your email:
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02, borderColor: '#00ffff' }}
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onFocus={() => setCurrentField('email')}
                    onBlur={() => setCurrentField(null)}
                    className="w-full bg-transparent border border-matrix-green p-3 text-terminal-green focus:border-hologram focus:outline-none transition-colors font-mono"
                    placeholder="john@example.com"
                    required
                  />
                  {currentField === 'email' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-cyber-blue mt-1"
                    >
                      $ validate_email "{formData.email}"
                    </motion.div>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-matrix-green text-sm mb-2">
                    {'>'} Enter your message:
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02, borderColor: '#00ffff' }}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    onFocus={() => setCurrentField('message')}
                    onBlur={() => setCurrentField(null)}
                    rows={5}
                    className="w-full bg-transparent border border-matrix-green p-3 text-terminal-green focus:border-hologram focus:outline-none transition-colors font-mono resize-none"
                    placeholder="Let's discuss your project..."
                    required
                  />
                  {currentField === 'message' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-cyber-blue mt-1"
                    >
                      $ wc -w message.txt: {formData.message.split(' ').filter(word => word.length > 0).length} words
                    </motion.div>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px #00ff41' }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    w-full p-3 border transition-all duration-300 flex items-center justify-center gap-2
                    ${isSubmitting 
                      ? 'border-cyber-blue text-cyber-blue' 
                      : 'border-matrix-green text-matrix-green hover:border-hologram hover:text-hologram'
                    }
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotateZ: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border border-cyber-blue border-t-transparent rounded-full"
                      />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      $ send_message
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-matrix-green text-sm"
                  >
                    $ Message transmitted successfully! ✓
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Social */}
          <div className="space-y-6">
            
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="terminal-window p-6"
            >
              <div className="mt-8">
                <div className="text-cyber-blue mb-4">
                  $ cat contact_info.json
                </div>
                
                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <motion.div
                      key={method.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="code-block p-4 group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 border ${method.color} border-current`}>
                          <method.icon size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-terminal-green">
                            {method.label}
                          </div>
                          <div className={`text-sm ${method.color}`}>
                            {method.value}
                          </div>
                          <div className="text-xs text-matrix-green opacity-70 mt-1">
                            $ {method.command}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="terminal-window p-6"
            >
              <div className="mt-8">
                <div className="text-cyber-blue mb-4">
                  $ ls -la /social/networks/
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      whileHover={{ 
                        scale: 1.05, 
                        rotateY: 10,
                        boxShadow: '0 0 20px #00ffff'
                      }}
                      className="code-block p-4 flex items-center gap-4 group"
                    >
                      <div className="p-2 border border-hologram text-hologram">
                        <social.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-terminal-green">
                          {social.label}
                        </div>
                        <div className="text-xs text-matrix-green opacity-70">
                          $ {social.command}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="terminal-window p-6 mt-8 text-center"
        >
          <div className="mt-8">
            <div className="text-cyber-blue mb-4">
              $ uptime --developer-availability
            </div>
            <div className="text-matrix-green">
              Developer is online and ready for new challenges.
              <br />
              Response time: Usually within 24 hours
            </div>
            <div className="text-xs text-matrix-green opacity-70 mt-4">
              © 2024 Developer Portfolio. Built with React, TypeScript & Digital Dreams.
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default ContactTerminal
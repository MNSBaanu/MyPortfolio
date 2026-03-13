import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react'
import { personalInfo } from '../data/portfolio'
import { useState } from 'react'
import toast from 'react-hot-toast'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted!', formData)
    setIsSubmitting(true)

    try {
      // EmailJS configuration
      const serviceId = 'service_8p7djun'
      const templateId = 'template_hvf689g'
      const publicKey = 'CiBF-DJszrNTqx-Ac'

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Sahla Baanu',
        reply_to: formData.email
      }

      console.log('Sending email with params:', templateParams)
      
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      console.log('Email sent successfully:', response)
      toast.success('Message sent successfully! I\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error: any) {
      console.error('Email send error:', error)
      console.error('Error details:', error.text || error.message)
      toast.error(`Failed to send message: ${error.text || error.message || 'Please try again'}`)
    } finally {
      setIsSubmitting(false)
    }
  }
  const contactDetails = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      clickable: true,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo.phone,
      href: `https://wa.me/${personalInfo.phone.replace(/\D/g, '')}?text=Hi%20MNSBaanu,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect!`,
      clickable: true,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalInfo.location,
      href: '#',
      clickable: false,
    },
  ]



  return (
    <div
      className="box-border pb-24 sm:pb-28 bg-gray-50 dark:bg-neutral-900 relative z-10 rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800"
      style={{
        height: '100vh',
        paddingTop: 'calc(var(--header-height, 0px) + 3rem)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-gray-100 mb-4 tracking-tight text-center">
            Contact
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center mb-10">
            Let’s connect for opportunities, collaborations, or just to say hello
          </p>
          
          {/* Layout: Contact Details + Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8">
            {/* Left Side - Contact Details (1 column width) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-gray-100 mb-3">Get In Touch</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-4">
                  Feel free to reach out for opportunities, collaborations, or just to say hello!
                </p>
                <div className="flex items-center gap-2 text-black dark:text-white bg-gray-100 dark:bg-neutral-900 border border-gray-300 dark:border-neutral-800 rounded-lg px-3 py-2">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">Response time: Within 24 hours</span>
                </div>
              </div>
              
              {/* All Contact Details Stacked Vertically */}
              {contactDetails.map((detail, index) => {
                const Component = detail.clickable ? motion.a : motion.div
                return (
                  <Component
                    key={detail.label}
                    href={detail.clickable ? detail.href : undefined}
                    target={detail.clickable && detail.label === 'Phone' ? '_blank' : undefined}
                    rel={detail.clickable && detail.label === 'Phone' ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`bg-white dark:bg-neutral-950 border border-gray-300 dark:border-neutral-800 rounded-lg p-4 sm:p-5 transition-all duration-300 flex items-center gap-4 group ${
                      detail.clickable ? 'hover:border-black cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    <detail.icon className={`w-6 h-6 sm:w-7 sm:h-7 text-black flex-shrink-0 transition-transform duration-300 ${
                      detail.clickable ? 'group-hover:scale-110' : ''
                    }`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{detail.label}</h4>
                      <p className="text-sm sm:text-base text-gray-900 dark:text-gray-100 break-words">{detail.value}</p>
                    </div>
                  </Component>
                )
              })}
            </motion.div>

            {/* Right Side - Chat-Style Contact Form (2 columns width) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              {/* Chat Card Container */}
              <div className="bg-white dark:bg-neutral-950 border border-gray-300 dark:border-neutral-800 rounded-lg max-w-md mx-auto">
                {/* Chat Header */}
                <div className="bg-gray-800 text-white px-4 py-3 text-lg font-medium rounded-t-lg">
                  Send Message
                </div>
                
                {/* Chat Window - Form Fields */}
                <div className="h-80 overflow-y-auto p-4 space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-800 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 bg-white dark:bg-black focus:border-gray-800 dark:focus:border-neutral-600 focus:outline-none transition-colors duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-800 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 bg-white dark:bg-black focus:border-gray-800 dark:focus:border-neutral-600 focus:outline-none transition-colors duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-800 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 bg-white dark:bg-black focus:border-gray-800 dark:focus:border-neutral-600 focus:outline-none transition-colors duration-300"
                        placeholder="What's this about?"
                      />
                    </div>
                    <div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-800 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 bg-white dark:bg-black focus:border-gray-800 dark:focus:border-neutral-600 focus:outline-none transition-colors duration-300 resize-none"
                        placeholder="Your message..."
                      />
                    </div>
                  </form>
                </div>

                {/* Chat Input - Send Button */}
                <div className="flex items-center p-4 border-t border-gray-300 dark:border-neutral-800">
                  <div className="flex-1 text-sm text-gray-600">
                    Ready to send your message?
                  </div>
                  <motion.button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="ml-3 px-6 py-2.5 bg-[#103257] text-white text-sm font-semibold rounded-lg cursor-pointer border-none outline-none transition-all duration-300 hover:shadow-xl hover:bg-[#0d2a47] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </div>
  )
}

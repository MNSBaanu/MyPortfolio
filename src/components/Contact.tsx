import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, Clock } from 'lucide-react'
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

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: personalInfo.social.github },
    { icon: Linkedin, label: 'LinkedIn', href: personalInfo.social.linkedin },
    { icon: Twitter, label: 'Twitter', href: personalInfo.social.twitter },
  ]

  return (
    <section id="contact" className="pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 md:pb-20 px-4 md:px-8 lg:px-12 pr-12 sm:pr-14 md:pr-16 lg:pr-20 xl:pr-24 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 md:mb-12 text-center text-gray-200">Contact</h2>
          
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
                <h3 className="text-xl sm:text-2xl font-semibold text-teal-100 mb-3">Get In Touch</h3>
                <p className="text-gray-400 text-sm sm:text-base mb-4">
                  Feel free to reach out for opportunities, collaborations, or just to say hello!
                </p>
                <div className="flex items-center gap-2 text-teal-400 bg-teal-900/20 border border-teal-700/30 rounded-lg px-3 py-2">
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
                    className={`bg-white dark:bg-black border border-gray-300 dark:border-gray-800 rounded-lg p-4 sm:p-5 transition-all duration-300 flex items-center gap-4 group ${
                      detail.clickable ? 'hover:border-teal-600 cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    <detail.icon className={`w-6 h-6 sm:w-7 sm:h-7 text-teal-400 flex-shrink-0 transition-transform duration-300 ${
                      detail.clickable ? 'group-hover:scale-110' : ''
                    }`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{detail.label}</h4>
                      <p className="text-sm sm:text-base text-gray-900 dark:text-gray-200 break-words">{detail.value}</p>
                    </div>
                  </Component>
                )
              })}
            </motion.div>

            {/* Right Side - Contact Form (2 columns width) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white dark:bg-black border border-gray-300 dark:border-gray-800 rounded-xl p-5 sm:p-6 lg:p-7"
            >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-teal-100 mb-4 sm:mb-5">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-black border border-gray-300 dark:border-teal-800 rounded-lg text-[15px] text-gray-900 dark:text-teal-100 placeholder-gray-500 focus:border-teal-600 focus:outline-none transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-black border border-gray-300 dark:border-teal-800 rounded-lg text-[15px] text-gray-900 dark:text-teal-100 placeholder-gray-500 focus:border-teal-600 focus:outline-none transition-colors duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-black border border-gray-300 dark:border-teal-800 rounded-lg text-[15px] text-gray-900 dark:text-teal-100 placeholder-gray-500 focus:border-teal-600 focus:outline-none transition-colors duration-300"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-black border border-gray-300 dark:border-teal-800 rounded-lg text-[15px] text-gray-900 dark:text-teal-100 placeholder-gray-500 focus:border-teal-600 focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Your message..."
                />
              </div>
              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 bg-teal-800 text-teal-100 rounded-lg text-[15px] font-medium hover:bg-teal-700 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-teal-100 border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
              </div>
            </form>
          </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}

import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react'
import { personalInfo } from '../data/portfolio'
import { useRef, useState } from 'react'
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



  const scrollRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 0.35, 0.85, 1], ['0%', '0%', '-100%', '-100%'])

  return (
    <div ref={scrollRef} className="relative h-[200vh]">
      <div
        className="sticky top-0 h-screen box-border bg-gray-50 dark:bg-neutral-900 relative z-10 rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800 overflow-hidden"
        style={{
          paddingTop: 'calc(var(--header-height, 0px) + 3rem)',
          paddingBottom: '3rem',
        }}
      >
        <motion.div className="flex w-[200%] h-full" style={{ x }}>
          <div className="w-1/2 h-full">
            <div className="h-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-gray-100 mb-4 tracking-tight">
                  Contact
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Let’s connect for opportunities, collaborations, or just to say hello
                </p>
              </motion.div>

              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-xl space-y-4">
                  <div className="flex items-center justify-center gap-2 text-black dark:text-white bg-gray-100 dark:bg-neutral-900 border border-gray-300 dark:border-neutral-800 rounded-lg px-3 py-2">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">Response time: Within 24 hours</span>
                  </div>

                  {contactDetails.map((detail) => {
                    const Component = detail.clickable ? motion.a : motion.div
                    return (
                      <Component
                        key={detail.label}
                        href={detail.clickable ? detail.href : undefined}
                        target={detail.clickable && detail.label === 'Phone' ? '_blank' : undefined}
                        rel={detail.clickable && detail.label === 'Phone' ? 'noopener noreferrer' : undefined}
                        className={`bg-white dark:bg-black border border-gray-300 dark:border-neutral-800 rounded-lg p-4 sm:p-5 transition-all duration-300 flex items-center gap-4 group ${
                          detail.clickable ? 'hover:border-black cursor-pointer' : 'cursor-default'
                        }`}
                      >
                        <detail.icon
                          className={`w-6 h-6 sm:w-7 sm:h-7 text-black dark:text-gray-100 flex-shrink-0 transition-transform duration-300 ${
                            detail.clickable ? 'group-hover:scale-110' : ''
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{detail.label}</h4>
                          <p className="text-sm sm:text-base text-gray-900 dark:text-gray-100 break-words">
                            {detail.value}
                          </p>
                        </div>
                      </Component>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2 h-full">
            <div className="h-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-gray-100 mb-4 tracking-tight">
                  Send Message
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Share a few details and I’ll get back to you
                </p>
              </motion.div>

              <div className="w-full flex-1 flex items-start justify-center">
                <div className="bg-white dark:bg-black border border-gray-300 dark:border-neutral-800 rounded-lg w-full max-w-md">
                  <div className="bg-gray-800 text-white px-4 py-3 text-lg font-medium rounded-t-lg">
                    Send Message
                  </div>

                  <form onSubmit={handleSubmit} className="p-4 space-y-4">
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
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-800 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 bg-white dark:bg-black focus:border-gray-800 dark:focus:border-neutral-600 focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Your message..."
                    />

                    <div className="flex items-center justify-between pt-2 border-t border-gray-300 dark:border-neutral-800">
                      <div className="text-sm text-gray-600 dark:text-gray-300">Ready to send your message?</div>
                      <motion.button
                        type="submit"
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

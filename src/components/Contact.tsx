import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react'
import { personalInfo } from '../data/portfolio'

export default function Contact() {
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
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 md:mb-12 text-center text-gray-200">Contact</h2>
          
          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
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
                  className={`bg-black border border-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 transition-all duration-300 text-center group ${
                    detail.clickable ? 'hover:border-teal-600 cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <detail.icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mx-auto mb-2 sm:mb-3 text-teal-400 transition-transform duration-300 ${
                    detail.clickable ? 'group-hover:scale-110' : ''
                  }`} />
                  <h3 className="text-xs font-medium text-gray-400 mb-1">{detail.label}</h3>
                  <p className="text-xs sm:text-sm text-gray-200 break-words">{detail.value}</p>
                </Component>
              )
            })}
          </div>


        </motion.div>
      </div>
    </section>
  )
}

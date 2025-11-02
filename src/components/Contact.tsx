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
    <section id="contact" className="pt-8 pb-20 px-4 md:px-8 lg:px-12 pr-24 md:pr-28 lg:pr-32 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-12 text-center text-gray-200">Contact</h2>
          
          {/* Contact Details */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
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
                  className={`bg-black border border-gray-800 rounded-2xl p-6 transition-all duration-300 text-center group ${
                    detail.clickable ? 'hover:border-teal-600 cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <detail.icon className={`w-8 h-8 mx-auto mb-4 text-teal-400 transition-transform duration-300 ${
                    detail.clickable ? 'group-hover:scale-110' : ''
                  }`} />
                  <h3 className="text-sm font-medium text-gray-400 mb-2">{detail.label}</h3>
                  <p className="text-gray-200 break-words">{detail.value}</p>
                </Component>
              )
            })}
          </div>


        </motion.div>
      </div>
    </section>
  )
}

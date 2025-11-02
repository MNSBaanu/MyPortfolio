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
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Your City, Country',
      href: '#',
    },
  ]

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: personalInfo.social.github },
    { icon: Linkedin, label: 'LinkedIn', href: personalInfo.social.linkedin },
    { icon: Twitter, label: 'Twitter', href: personalInfo.social.twitter },
  ]

  return (
    <section id="contact" className="py-20 px-8 md:px-16 lg:px-24 bg-black">
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
            {contactDetails.map((detail, index) => (
              <motion.a
                key={detail.label}
                href={detail.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-black border border-gray-800 rounded-2xl p-6 hover:border-teal-600 transition-all duration-300 text-center group"
              >
                <detail.icon className="w-8 h-8 mx-auto mb-4 text-teal-400 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-sm font-medium text-gray-400 mb-2">{detail.label}</h3>
                <p className="text-gray-200 break-words">{detail.value}</p>
              </motion.a>
            ))}
          </div>


        </motion.div>
      </div>
    </section>
  )
}

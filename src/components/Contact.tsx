import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
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

  return (
    <div
      className="box-border px-6 sm:px-8 bg-gray-50 dark:bg-neutral-900 relative z-10 rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800"
      style={{
        height: '100vh',
        paddingTop: 'calc(var(--header-height, 0px) + 2rem)',
      }}
    >
      <div className="h-full max-w-7xl mx-auto flex flex-col justify-center">
        <div className="flex flex-col">
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

          <div className="flex items-center justify-center">
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
                    className={`bg-white dark:bg-black border border-gray-300 dark:border-neutral-800 rounded-lg p-4 sm:p-5 transition-all duration-300 flex items-center gap-4 group ${detail.clickable ? 'hover:border-black cursor-pointer' : 'cursor-default'
                      }`}
                  >
                    <detail.icon
                      className={`w-6 h-6 sm:w-7 sm:h-7 text-black dark:text-gray-100 flex-shrink-0 transition-transform duration-300 ${detail.clickable ? 'group-hover:scale-110' : ''
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
    </div>
  )
}

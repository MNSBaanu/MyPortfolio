import { lazy, Suspense, useState } from 'react'
import { Check, Copy, Linkedin, Phone } from 'lucide-react'
import { personalInfo } from '../../data/portfolio'
import BriefSection from '../layout/BriefSection'

const ContactForm = lazy(() => import('./ContactForm'))

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(personalInfo.email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <BriefSection id="contact" index="06" title="Contact">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-3xl font-semibold tracking-tight">Let&apos;s talk.</p>
          <p className="mt-2 text-stone-600 dark:text-neutral-400">
            Hiring for a software engineering role? Send a note and I&apos;ll get back to you.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <a href={`mailto:${personalInfo.email}`} className="min-w-0 truncate font-medium underline decoration-emerald-500 underline-offset-4">
              {personalInfo.email}
            </a>
            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              className="shrink-0 rounded-lg p-2 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
            </button>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-stone-600 dark:text-neutral-400">
            <li>
              <a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 hover:text-stone-900 dark:hover:text-white">
                <Phone size={14} />
                {personalInfo.phone}
              </a>
            </li>
            <li>
              <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-stone-900 dark:hover:text-white">
                <Linkedin size={14} />
                linkedin.com/in/mns-baanu
              </a>
            </li>
          </ul>
        </div>
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      </div>
    </BriefSection>
  )
}

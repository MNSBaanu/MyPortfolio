import { lazy, Suspense, useState } from 'react'
import { Check, ClipboardList, Copy, Linkedin, Phone } from 'lucide-react'
import { track } from '@vercel/analytics'
import { brief, experience, personalInfo } from '../../data/portfolio'
import BriefSection from '../layout/BriefSection'

const ContactForm = lazy(() => import('./ContactForm'))

const recruiterSummary = [
  `${personalInfo.fullName} (${personalInfo.name}) - ${experience[0].title}`,
  `${personalInfo.location} · On-site or remote`,
  `Now: ${experience[0].title} at ${experience[0].company.split(' - ')[0]} since ${experience[0].period.split(' - ')[0]}. ${brief.promotion}`,
  `Stack: ${brief.stack.flatMap((group) => group.items).join(', ')}`,
  `Portfolio: ${personalInfo.website}`,
  `CV: ${personalInfo.website}${personalInfo.cvFile}`,
  `Email: ${personalInfo.email} · LinkedIn: ${personalInfo.social.linkedin} · GitHub: ${personalInfo.social.github}`,
].join('\n')

export default function Contact() {
  const [copied, setCopied] = useState<'email' | 'summary' | null>(null)

  const copy = async (text: string, what: 'email' | 'summary') => {
    await navigator.clipboard.writeText(text)
    if (what === 'summary') track('Summary Copied')
    setCopied(what)
    window.setTimeout(() => setCopied(null), 2000)
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
              onClick={() => copy(personalInfo.email, 'email')}
              aria-label="Copy email address"
              className="shrink-0 rounded-lg p-2 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              {copied === 'email' ? <Check size={15} /> : <Copy size={15} />}
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
          <button
            onClick={() => copy(recruiterSummary, 'summary')}
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-medium transition-colors hover:border-stone-900 dark:border-neutral-700 dark:hover:border-neutral-300"
          >
            {copied === 'summary' ? <Check size={16} className="text-emerald-600" /> : <ClipboardList size={16} />}
            {copied === 'summary' ? 'Summary copied' : 'Copy recruiter summary'}
          </button>
          <p className="mt-2 text-xs text-stone-500 dark:text-neutral-500">Role, stack and links in one block, ready to paste into your notes or ATS.</p>
        </div>
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      </div>
    </BriefSection>
  )
}

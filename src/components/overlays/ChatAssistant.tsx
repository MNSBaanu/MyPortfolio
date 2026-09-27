import { FormEvent, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Send, Sparkles, User, X } from 'lucide-react'
import { brief, certifications, education, experience, personalInfo, projects, skillCategories } from '../../data/portfolio'
import { useDialog } from '../../hooks/useDialog'

type Message = {
  id: number
  role: 'assistant' | 'user'
  text: string
  offline?: boolean
}

const suggestions = [`Why should we hire ${personalInfo.name}?`, 'Which projects use React?', 'What is the current role?']

const intro = `${personalInfo.name} is a ${experience[0].title} at ${experience[0].company.split(' - ')[0]}, working across ${experience[0].tech?.join(', ')}. ${brief.promotion}`

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9+#. ]/g, ' ').replace(/\s+/g, ' ')
const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const hasTerm = (text: string, term: string) => new RegExp(`(^|[^a-z0-9])${escape(term)}($|[^a-z0-9+#])`).test(text)
const hasAny = (text: string, words: string[]) => words.some((word) => new RegExp(`(^| )${escape(word)}`).test(text))
const list = (items: string[]) => items.map((item) => `- ${item}`).join('\n')
const link = (url: string) => (url && url !== '#' ? url : '')

const projectAliases = projects.map((project) => {
  const words = project.title.replace(/^The /, '').split(' ')
  const title = normalize(words.join(' '))
  const aliases = [title, title.replace(/ /g, '')]
  const inBrackets = project.title.match(/\(([^)]+)\)/)
  if (inBrackets) aliases.push(normalize(inBrackets[1]))
  for (const word of words) {
    if (/[a-z][A-Z]/.test(word) || /^[A-Z]{3,}$/.test(word)) aliases.push(normalize(word))
  }
  if (words.length === 2 && words[0].length >= 5) aliases.push(normalize(words[0]))
  return { project, aliases: aliases.map((alias) => alias.trim()).filter(Boolean) }
})

const techTerms = [...new Set([
  ...skillCategories.flatMap((category) => category.skills.map((skill) => skill.name)),
  ...projects.flatMap((project) => project.tech),
  ...experience.flatMap((job) => job.tech ?? []),
])].filter((term) => term.length > 1)

function describeProject(project: (typeof projects)[number]) {
  const summary = brief.projectSummaries.find((item) => item.title === project.title)
  const links = [link(project.liveUrl) && `Live: ${project.liveUrl}`, `Code: ${project.githubUrl}`].filter(Boolean).join(' | ')
  return `${project.title} (${project.period}, ${project.academic ? 'academic' : 'personal'} project): ${summary ? `${summary.hook} ${summary.highlights.join('. ')}.` : project.description}\nTech: ${project.tech.join(', ')}\n${links}`
}

function describeTech(term: string) {
  const inProjects = projects.filter((project) => project.tech.includes(term)).map((project) => project.title)
  const atWork = experience[0].tech?.includes(term)
  const parts = [
    atWork && `${personalInfo.name} uses ${term} at work as a ${experience[0].title} at ${experience[0].company.split(' - ')[0]}.`,
    inProjects.length > 0 && `${term} is used in ${inProjects.length} project${inProjects.length > 1 ? 's' : ''}: ${inProjects.join(', ')}.`,
  ].filter(Boolean)
  return parts.length ? parts.join(' ') : `${term} is listed in ${personalInfo.name}'s skills.`
}

function answerQuestion(question: string) {
  const text = normalize(question)

  const project = projectAliases.find(({ aliases }) => aliases.some((alias) => hasTerm(text, alias)))?.project
  if (project) return describeProject(project)

  if (hasAny(text, ['certif', 'course', 'badge', 'credential'])) {
    return `${personalInfo.name} holds ${certifications.length} certifications:\n${list(certifications.map((cert) => `${cert.title}, ${cert.issuer} (${cert.date})`))}`
  }

  if (hasAny(text, ['educat', 'study', 'studied', 'degree', 'universit', 'school', 'college', 'qualif', 'diploma', 'beng', 'a l', 'o l', 'grade', 'pharma'])) {
    return `Education:\n${list(education.map((item) => `${item.title}, ${item.institution} (${item.period})`))}`
  }

  if (hasTerm(text, 'ai') || hasTerm(text, 'ml') || hasAny(text, ['artificial intelligence', 'machine learning', 'llm', 'agent'])) {
    const aiProjects = projects.filter((item) => /\bAI\b|agent/i.test(`${item.description} ${item.tech.join(' ')}`)).map((item) => item.title)
    const aiCerts = certifications.filter((cert) => /\bAI\b|ML/.test(cert.title)).map((cert) => cert.title)
    return `AI work: ${aiProjects.join(', ')}. AI certifications: ${aiCerts.join(', ')}. Ask about any of these projects for details.`
  }

  const techs = techTerms.filter((term) => hasTerm(text, normalize(term)))
  const matchedTechs = techs.filter((term) => !techs.some((other) => other !== term && normalize(other).includes(normalize(term))))
  if (matchedTechs.length) return matchedTechs.slice(0, 3).map(describeTech).join('\n\n')

  if (hasAny(text, ['hire', 'why', 'strength', 'fit', 'stand out', 'best', 'good at'])) {
    return `${intro} Strongest projects include ${brief.projectSummaries.map((item) => item.title).join(', ')}.`
  }

  if (hasAny(text, ['project', 'built', 'build', 'portfolio', 'demo', 'live', 'app'])) {
    const live = projects.filter((item) => link(item.liveUrl))
    const academic = projects.filter((item) => item.academic).length
    return `${personalInfo.name} has worked on ${projects.length} projects (${projects.length - academic} personal, ${academic} academic), and ${live.length} are live: ${live.map((item) => item.title).join(', ')}. Highlights: ${brief.projectSummaries.map((item) => item.title).join(', ')}. Ask about any project by name for details.`
  }

  if (hasAny(text, ['available', 'location', 'where', 'based', 'remote', 'relocat', 'open to', 'looking'])) {
    return `${personalInfo.name} is based in ${personalInfo.location} and is ${personalInfo.availability.toLowerCase()}.`
  }

  if (hasAny(text, ['experience', 'job', 'career', 'work', 'company', 'intern', 'role', 'employ', 'position', 'currently'])) {
    const [current, intern, ...other] = experience
    return `${personalInfo.name} is a ${current.title} at ${current.company} (${current.period}, ${current.type}). ${current.description} Before that: ${intern.title} at the same company (${intern.period}). ${brief.promotion}${other.length ? `\nOther roles:\n${list(other.map((job) => `${job.title}, ${job.company} (${job.period})`))}` : ''}`
  }

  if (hasAny(text, ['skill', 'technolog', 'stack', 'language', 'framework', 'tool', 'database', 'know'])) {
    return `Skills:\n${list(skillCategories.map((category) => `${category.category}: ${category.skills.map((skill) => skill.name).join(', ')}`))}`
  }

  if (hasAny(text, ['contact', 'email', 'mail', 'phone', 'call', 'reach', 'linkedin', 'github', 'cv', 'resume'])) {
    return `Email: ${personalInfo.email}\nPhone: ${personalInfo.phone}\nLinkedIn: ${personalInfo.social.linkedin}\nGitHub: ${personalInfo.social.github}\nThe CV is available through the View CV button.`
  }

  if (hasAny(text, ['who', 'about', 'introduce', 'yourself', 'tell me', 'summary', 'name'])) {
    return `${intro} Based in ${personalInfo.location}.`
  }

  if (/^(hi|hello|hey|good (morning|afternoon|evening))\b/.test(text.trim())) {
    return `Hi! Ask me anything about ${personalInfo.name}: experience, projects, skills, education, certifications or how to get in touch.`
  }

  return `That isn't covered in the portfolio. You can ask about ${personalInfo.name}'s experience, projects, skills, education or certifications, or email ${personalInfo.email}.`
}

type ChatAssistantProps = {
  open: boolean
  onClose: () => void
}

const ChatAssistant = ({ open, onClose }: ChatAssistantProps) => {
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'assistant', text: `Hi! I’m ${personalInfo.name}'s portfolio assistant. Ask me anything about their work, skills, or background.` },
  ])
  const endRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  useDialog(dialogRef, onClose, open, false)

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const ask = async (question: string) => {
    const trimmed = question.trim()
    if (!trimmed || isThinking) return
    const userMessage = { id: Date.now(), role: 'user' as const, text: trimmed }
    const conversation = [...messages, userMessage]
    setMessages((current) => [...current, userMessage])
    setInput('')
    setIsThinking(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversation.map(({ role, text }) => ({ role, content: text })),
        }),
      })

      if (response.status === 429) {
        setMessages((current) => [...current, { id: Date.now() + 1, role: 'assistant', text: `You've asked a lot of questions in a short time. Please try again in a few minutes, or email ${personalInfo.email}.` }])
        return
      }
      if (!response.ok) throw new Error('Assistant API unavailable')
      const data = await response.json() as { reply?: string }
      if (!data.reply) throw new Error('Assistant returned no reply')
      setMessages((current) => [...current, { id: Date.now() + 1, role: 'assistant', text: data.reply! }])
    } catch {
      // Local fallback keeps the widget usable during local development or
      // before GEMINI_API_KEY has been added to the Vercel project.
      setMessages((current) => [...current, { id: Date.now() + 1, role: 'assistant', text: answerQuestion(trimmed), offline: true }])
    } finally {
      setIsThinking(false)
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    void ask(input)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          ref={dialogRef}
          role="dialog"
          aria-label="Portfolio assistant"
          initial={{ opacity: 0, scale: 0.92, x: 18, y: 8 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, x: 18, y: 8 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-auto fixed right-4 bottom-24 sm:right-6 sm:bottom-6 z-[120] flex h-[min(590px,calc(100vh-8rem))] w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl sm:h-[min(590px,calc(100vh-3rem))] dark:border-neutral-800 dark:bg-neutral-950"
        >
          <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50 px-5 py-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <Sparkles size={18} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-stone-900 dark:text-white">Ask about {personalInfo.name}</h2>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500 dark:text-neutral-400">AI assistant</p>
              </div>
            </div>
            <button onClick={onClose} aria-label="Close portfolio assistant" className="rounded-full p-2 text-stone-500 transition-colors hover:bg-stone-200 hover:text-stone-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={`flex items-end gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'assistant' && <Bot size={15} className="mb-2 shrink-0 text-stone-400" />}
                <div className="max-w-[84%]">
                  <div className={`rounded-2xl px-4 py-3 whitespace-pre-line text-sm leading-relaxed ${message.role === 'user' ? 'rounded-br-md bg-stone-900 text-white dark:bg-white dark:text-black' : 'rounded-bl-md bg-stone-100 text-stone-700 dark:bg-neutral-900 dark:text-neutral-300'}`}>
                    {message.text}
                  </div>
                  {message.offline && <p className="mt-1 px-1 text-[11px] text-stone-400 dark:text-neutral-500">Quick answer from the portfolio data</p>}
                </div>
                {message.role === 'user' && <User size={15} className="mb-2 shrink-0 text-stone-400" />}
              </div>
            ))}
            {isThinking && (
              <div className="flex items-end gap-2">
                <Bot size={15} className="mb-2 shrink-0 text-stone-400" />
                <div className="rounded-2xl rounded-bl-md bg-stone-100 px-4 py-3 text-sm text-stone-500 dark:bg-neutral-900 dark:text-neutral-400">
                  Thinking...
                </div>
              </div>
            )}
            {messages.length === 1 && (
              <div className="space-y-2 pt-1">
                <p className="px-1 font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500 dark:text-neutral-400">Try asking</p>
                {suggestions.map((suggestion) => <button key={suggestion} onClick={() => ask(suggestion)} className="block w-full rounded-xl border border-stone-200 px-3 py-2 text-left text-xs text-stone-600 transition-colors hover:border-emerald-500 hover:text-stone-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-emerald-500 dark:hover:text-white">{suggestion}</button>)}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-stone-200 p-3 dark:border-neutral-800">
            <div className="flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 py-1 focus-within:border-stone-900 dark:border-neutral-800 dark:bg-neutral-900 dark:focus-within:border-neutral-300">
              <input value={input} onChange={(event) => setInput(event.target.value)} data-autofocus maxLength={500} placeholder={`Ask about ${personalInfo.name}...`} aria-label="Ask the portfolio assistant" className="min-w-0 flex-1 bg-transparent py-2.5 text-base sm:text-sm text-stone-900 outline-none placeholder:text-stone-400 dark:text-white dark:placeholder:text-neutral-500" />
              <button type="submit" aria-label="Send question" disabled={!input.trim()} className="rounded-lg bg-stone-900 p-2 text-white transition-opacity hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-30 dark:bg-white dark:text-black">
                <Send size={15} />
              </button>
            </div>
            <p className="mt-2 px-1 text-[11px] text-stone-400 dark:text-neutral-500">AI answers can contain mistakes. The CV has the verified details.</p>
          </form>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default ChatAssistant

import { FormEvent, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Send, Sparkles, User, X } from 'lucide-react'
import { about, education, experience, personalInfo, projects, skillCategories } from '../data/portfolio'

type Message = {
  id: number
  role: 'assistant' | 'user'
  text: string
}

const suggestions = ['What does MNSBaanu do?', 'What are the main skills?', 'Tell me about the projects']

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9+#. ]/g, ' ')

function answerQuestion(question: string) {
  const text = normalize(question)
  const allSkills = skillCategories.flatMap((category) => category.skills.map((skill) => skill.name))

  if (/(^| )(who|about|do|does|developer|work)( |$)/.test(text) || text.includes('introduce')) {
    return `${personalInfo.name} is an ${personalInfo.title.toLowerCase()} based in ${personalInfo.location}. ${about.description1} ${personalInfo.availability}.`
  }

  if (text.includes('skill') || text.includes('technolog') || text.includes('stack') || text.includes('know')) {
    return `The main toolkit includes ${allSkills.slice(0, 12).join(', ')}, plus ${allSkills.slice(12).join(', ')}. The strongest focus is full-stack web and mobile development, with a UI/UX and AI interest.`
  }

  if (text.includes('project') || text.includes('built') || text.includes('portfolio')) {
    const featured = projects.slice(0, 5).map((project) => project.title).join(', ')
    return `Recent projects include ${featured}, among others. ${projects[0].description.split('. ')[0]}. You can explore the full project list in the Projects section.`
  }

  if (text.includes('experience') || text.includes('job') || text.includes('career') || text.includes('work')) {
    const current = experience[0]
    return `MNSBaanu is currently a ${current.title} at ${current.company}, working on web and mobile applications with ${current.tech?.join(', ')}. Before that, there was an internship at the same company from ${experience[1].period}.`
  }

  if (text.includes('education') || text.includes('study') || text.includes('degree') || text.includes('university')) {
    return `MNSBaanu is pursuing a ${education[0].title} at ${education[0].institution}. They also completed a ${education[1].title} at ${education[1].institution}.`
  }

  if (text.includes('contact') || text.includes('email') || text.includes('hire') || text.includes('available') || text.includes('location')) {
    return `MNSBaanu is ${personalInfo.availability.toLowerCase()}. You can reach out at ${personalInfo.email} or use the Contact section.`
  }

  if (text.includes('ai') || text.includes('artificial intelligence')) {
    return 'AI is one of MNSBaanu’s interests. Projects include SmartBee, with an AI-powered virtual assistant, and Kapruka ASA, a conversational shopping agent built for the Kapruka Agent Challenge 2026.'
  }

  if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
    return `Hi! I can tell you about ${personalInfo.name}'s skills, experience, education, projects, or contact details.`
  }

  return `I can answer questions about ${personalInfo.name}'s skills, experience, education, projects, availability, and contact details. I don’t have that specific detail in the portfolio yet.`
}

type ChatAssistantProps = {
  open: boolean
  onClose: () => void
}

const ChatAssistant = ({ open, onClose }: ChatAssistantProps) => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'assistant', text: `Hi! I’m ${personalInfo.name}'s portfolio assistant. Ask me anything about their work, skills, or background.` },
  ])
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const ask = (question: string) => {
    const trimmed = question.trim()
    if (!trimmed) return
    setMessages((current) => [
      ...current,
      { id: Date.now(), role: 'user', text: trimmed },
      { id: Date.now() + 1, role: 'assistant', text: answerQuestion(trimmed) },
    ])
    setInput('')
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    ask(input)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          role="dialog"
          aria-label="Portfolio assistant"
          initial={{ opacity: 0, scale: 0.92, x: 18, y: 8 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, x: 18, y: 8 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-auto fixed right-4 bottom-16 sm:right-24 sm:top-[10%] sm:bottom-auto z-[120] flex h-[min(590px,calc(100vh-6rem))] w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-950"
        >
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white dark:bg-white dark:text-black">
                <Sparkles size={18} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">Portfolio Assistant</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Knows the details on this site</p>
              </div>
            </div>
            <button onClick={onClose} aria-label="Close portfolio assistant" className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={`flex items-end gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'assistant' && <Bot size={15} className="mb-2 shrink-0 text-gray-400" />}
                <div className={`max-w-[84%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === 'user' ? 'rounded-br-md bg-black text-white dark:bg-white dark:text-black' : 'rounded-bl-md bg-gray-100 text-gray-700 dark:bg-neutral-900 dark:text-gray-300'}`}>
                  {message.text}
                </div>
                {message.role === 'user' && <User size={15} className="mb-2 shrink-0 text-gray-400" />}
              </div>
            ))}
            {messages.length === 1 && (
              <div className="space-y-2 pt-1">
                <p className="px-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Try asking</p>
                {suggestions.map((suggestion) => <button key={suggestion} onClick={() => ask(suggestion)} className="block w-full rounded-xl border border-gray-200 px-3 py-2 text-left text-xs text-gray-600 transition-colors hover:border-gray-400 hover:text-black dark:border-neutral-800 dark:text-gray-400 dark:hover:border-neutral-600 dark:hover:text-white">{suggestion}</button>)}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-gray-100 p-3 dark:border-neutral-800">
            <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-1 dark:border-neutral-800 dark:bg-neutral-900">
              <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about MNSBaanu..." aria-label="Ask the portfolio assistant" className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white" />
              <button type="submit" aria-label="Send question" disabled={!input.trim()} className="rounded-xl bg-black p-2 text-white transition-opacity hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-30 dark:bg-white dark:text-black">
                <Send size={15} />
              </button>
            </div>
          </form>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default ChatAssistant

import { FormEvent, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, FileSearch, RotateCcw, Send, Sparkles, User, X } from 'lucide-react'
import { track } from '@vercel/analytics'
import { personalInfo } from '../../data/portfolio'
import { answerQuestion, matchOffline } from '../../lib/portfolioAssistant'
import { useDialog } from '../../hooks/useDialog'

type Message = {
  id: number
  role: 'assistant' | 'user'
  text: string
}

const suggestions = ['What did they contribute to ShareLanka?', 'Which projects were solo?', 'Which projects use React?']

const welcome: Message = { id: 1, role: 'assistant', text: `Hi! I’m ${personalInfo.name}'s portfolio assistant. Ask about projects, contributions, skills or experience. You can also compare a job description with the portfolio.` }

function AnswerText({ text }: { text: string }) {
  return <>{text.split(/(https?:\/\/[^\s<>"']+)/g).map((part, index) => {
    if (!/^https?:\/\//.test(part)) return part
    const url = part.replace(/[.,;!?)]+$/, '')
    return <span key={index}><a href={url} target="_blank" rel="noopener noreferrer" className="underline decoration-emerald-500 underline-offset-2 hover:text-emerald-700 dark:hover:text-emerald-300">{url}</a>{part.slice(url.length)}</span>
  })}</>
}

type ChatAssistantProps = {
  open: boolean
  onClose: () => void
}

const ChatAssistant = ({ open, onClose }: ChatAssistantProps) => {
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [jdMode, setJdMode] = useState(false)
  const [jd, setJd] = useState('')
  const [messages, setMessages] = useState<Message[]>([welcome])
  const pendingRef = useRef(false)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  useDialog(dialogRef, onClose, open, false)

  useEffect(() => {
    if (open) dialogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [open])

  useEffect(() => {
    const list = listRef.current
    if (list) list.scrollTop = list.scrollHeight
  }, [messages, isThinking, open])

  const request = async (userText: string, body: object, fallback: () => string) => {
    if (pendingRef.current) return
    pendingRef.current = true
    setMessages((current) => [...current, { id: Date.now(), role: 'user', text: userText }])
    setIsThinking(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(20000),
      })

      if (response.status === 429) {
        setMessages((current) => [...current, { id: Date.now() + 1, role: 'assistant', text: `You've asked a lot of questions in a short time. Please try again in a few minutes, or email ${personalInfo.email}.` }])
        return
      }
      if (!response.ok) throw new Error('Assistant API unavailable')
      const data = await response.json() as { reply?: string }
      if (typeof data.reply !== 'string' || !data.reply.trim()) throw new Error('Assistant returned no reply')
      setMessages((current) => [...current, { id: Date.now() + 1, role: 'assistant', text: data.reply! }])
    } catch {
      // Local fallback keeps the widget usable during local development or
      // before GEMINI_API_KEY has been added to the Vercel project.
      setMessages((current) => [...current, { id: Date.now() + 1, role: 'assistant', text: fallback() }])
    } finally {
      pendingRef.current = false
      setIsThinking(false)
    }
  }

  const ask = (question: string) => {
    const trimmed = question.trim()
    if (!trimmed || pendingRef.current) return
    setInput('')
    track('Chat Question')
    const conversation = [...messages, { role: 'user', text: trimmed }]
    void request(trimmed, { messages: conversation.map(({ role, text }) => ({ role, content: text })) }, () => answerQuestion(trimmed, messages))
  }

  const askMatch = () => {
    const text = jd.trim()
    if (!text || pendingRef.current) return
    setJd('')
    setJdMode(false)
    track('Job Match')
    const preview = text.length > 160 ? `${text.slice(0, 160)}…` : text
    void request(`Match this job description:\n"${preview}"`, { jobDescription: text }, () => matchOffline(text))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    void ask(input)
    inputRef.current?.focus()
  }

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.section
          ref={dialogRef}
          id="assistant"
          aria-label="AI assistant"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="scroll-mt-6 overflow-hidden rounded-2xl border border-emerald-500/40 bg-white dark:border-emerald-500/30 dark:bg-neutral-900"
        >
          <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50 px-5 py-4 sm:px-6 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <Sparkles size={18} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-stone-900 dark:text-white">Ask about {personalInfo.name}</h2>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500 dark:text-neutral-400">AI assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
            <button type="button" disabled={isThinking} onClick={() => { setMessages([welcome]); setInput(''); setJd(''); setJdMode(false); inputRef.current?.focus() }} aria-label="Start a new conversation" title="Start a new conversation" className="rounded-full p-2 text-stone-500 hover:bg-stone-200 disabled:opacity-30 dark:text-neutral-400 dark:hover:bg-neutral-800">
              <RotateCcw size={16} />
            </button>
            <button onClick={onClose} aria-label="Close AI assistant" className="rounded-full p-2 text-stone-500 transition-colors hover:bg-stone-200 hover:text-stone-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white">
              <X size={18} />
            </button>
            </div>
          </div>

          <div ref={listRef} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" aria-busy={isThinking} className="h-[min(420px,55vh)] space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex items-end gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'assistant' && <Bot size={15} className="mb-2 shrink-0 text-stone-400" />}
                <div className="max-w-[84%]">
                  <div className={`rounded-2xl px-4 py-3 whitespace-pre-line break-words text-sm leading-relaxed ${message.role === 'user' ? 'rounded-br-md bg-stone-900 text-white dark:bg-white dark:text-black' : 'rounded-bl-md bg-stone-100 text-stone-700 dark:bg-neutral-800 dark:text-neutral-300'}`}>
                    {message.role === 'assistant' ? <AnswerText text={message.text} /> : message.text}
                  </div>
                </div>
                {message.role === 'user' && <User size={15} className="mb-2 shrink-0 text-stone-400" />}
              </div>
            ))}
            {isThinking && (
              <div className="flex items-end gap-2">
                <Bot size={15} className="mb-2 shrink-0 text-stone-400" />
                <div className="rounded-2xl rounded-bl-md bg-stone-100 px-4 py-3 text-sm text-stone-500 dark:bg-neutral-800 dark:text-neutral-400">
                  Thinking...
                </div>
              </div>
            )}
            {messages.length === 1 && (
              <div className="space-y-2 pt-1">
                <p className="px-1 font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500 dark:text-neutral-400">Try asking</p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => { void ask(suggestion); inputRef.current?.focus() }}
                      className="rounded-xl border border-stone-200 px-3 py-2 text-left text-xs text-stone-600 transition-colors hover:border-emerald-500 hover:text-stone-900 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-emerald-500 dark:hover:text-white"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {jdMode ? (
            <form onSubmit={(event) => { event.preventDefault(); askMatch() }} className="border-t border-stone-200 p-3 sm:px-6 sm:py-4 dark:border-neutral-800">
              <label htmlFor="job-description" className="mb-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500 dark:text-neutral-400">Job description</label>
              <textarea
                id="job-description"
                value={jd}
                onChange={(event) => setJd(event.target.value)}
                autoFocus
                maxLength={6000}
                rows={6}
                placeholder="Paste the job description or its requirements"
                className="w-full resize-none rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-base text-stone-900 outline-none placeholder:text-stone-400 focus:border-stone-900 sm:text-sm dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-neutral-300"
              />
              <div className="mt-2 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setJdMode(false)} className="rounded-lg px-3 py-2 text-sm text-stone-600 hover:bg-stone-100 dark:text-neutral-400 dark:hover:bg-neutral-800">
                  Cancel
                </button>
                <button type="submit" disabled={!jd.trim() || isThinking} className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-30 dark:bg-white dark:text-black">
                  <FileSearch size={15} />
                  Check match
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="border-t border-stone-200 p-3 sm:px-6 sm:py-4 dark:border-neutral-800">
              <div className="flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 py-1 focus-within:border-stone-900 dark:border-neutral-700 dark:bg-neutral-950 dark:focus-within:border-neutral-300">
                <input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} data-autofocus maxLength={500} placeholder={`Ask about ${personalInfo.name}...`} aria-label="Ask the portfolio assistant" className="min-w-0 flex-1 bg-transparent py-2.5 text-base sm:text-sm text-stone-900 outline-none placeholder:text-stone-400 dark:text-white dark:placeholder:text-neutral-500" />
                <button type="submit" aria-label="Send question" disabled={!input.trim() || isThinking} className="rounded-lg bg-stone-900 p-2 text-white transition-opacity hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-30 dark:bg-white dark:text-black">
                  <Send size={15} />
                </button>
              </div>
              <div className="mt-2 flex justify-end px-1">
                <button type="button" onClick={() => setJdMode(true)} className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:underline dark:text-emerald-400">
                  <FileSearch size={13} />
                  Match a job description
                </button>
              </div>
            </form>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default ChatAssistant

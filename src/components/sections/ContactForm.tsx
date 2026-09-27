import { Send } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import emailjs from '@emailjs/browser'

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        role: '',
        subject: '',
        message: '',
        botField: '' // Honeypot field to catch spam bots
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // Basic email validation regex
    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Input length limits
        if (
            formData.name.length > 100 ||
            formData.email.length > 100 ||
            formData.company.length > 100 ||
            formData.role.length > 100 ||
            formData.subject.length > 200 ||
            formData.message.length > 2000
        ) {
            toast.error('Input exceeds maximum allowed length.');
            return;
        }

        if (!isValidEmail(formData.email)) {
            toast.error('Please enter a valid email address.');
            return;
        }

        // Basic client-side rate limiting to prevent spamming
        // Fixed rate limit bypass via malformed/tampered localStorage data
        const lastSent = localStorage.getItem('lastEmailSent');
        const lastSentTime = parseInt(lastSent || '0', 10);

        if (lastSent && (!isNaN(lastSentTime) && Date.now() - lastSentTime < 60000)) {
            toast.error('Please wait a minute before sending another message.');
            return;
        }

        // If honeypot field is filled, silently abort to deter bots
        if (formData.botField) {
            toast.success('Message sent successfully! I\'ll get back to you soon.')
            setFormData({ name: '', email: '', company: '', role: '', subject: '', message: '', botField: '' })
            return
        }

        setIsSubmitting(true)

        try {
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

            if (!serviceId || !templateId || !publicKey) {
                console.error('Email service is not properly configured.')
                toast.error('Unable to send message at this time. Please try again later.')
                return
            }

            const templateParams = {
                from_name: formData.name.trim(),
                from_email: formData.email, // already validated
                company: formData.company.trim() || 'Not given',
                role: formData.role.trim() || 'Not given',
                subject: formData.subject.trim(),
                message: formData.message.trim(),
                to_name: 'Sahla Baanu',
                reply_to: formData.email,
                sent_at: new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Colombo' })
            }

            await emailjs.send(serviceId, templateId, templateParams, publicKey)

            localStorage.setItem('lastEmailSent', Date.now().toString());

            toast.success('Message sent successfully! I\'ll get back to you soon.')
            setFormData({ name: '', email: '', company: '', role: '', subject: '', message: '', botField: '' })
        } catch (error: any) {
            // Log only generic/sanitized error messages to prevent exposing stack traces or API details
            console.error('Failed to send email:', error?.message || 'Unknown error occurred')
            toast.error('Failed to send message. Please try again later.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div aria-hidden="true" style={{ display: 'none' }}>
                <input
                    type="text"
                    name="botField"
                    value={formData.botField}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>
            <div className="grid gap-3">
                <div>
                    <label htmlFor="name" className="mb-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500 dark:text-neutral-500">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required maxLength={100} className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-base text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-stone-900 sm:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-300" placeholder="Your name" />
                </div>
                <div>
                    <label htmlFor="email" className="mb-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500 dark:text-neutral-500">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required maxLength={100} className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-base text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-stone-900 sm:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-300" placeholder="you@company.com" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label htmlFor="company" className="mb-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500 dark:text-neutral-500">Company</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} maxLength={100} className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-base text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-stone-900 sm:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-300" placeholder="Optional" />
                </div>
                <div>
                    <label htmlFor="role" className="mb-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500 dark:text-neutral-500">Role</label>
                    <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} maxLength={100} className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-base text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-stone-900 sm:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-300" placeholder="Optional" />
                </div>
            </div>
            <div>
                <label htmlFor="subject" className="mb-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500 dark:text-neutral-500">Subject</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required maxLength={200} className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-base text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-stone-900 sm:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-300" placeholder="Role or opportunity" />
            </div>
            <div>
                <label htmlFor="message" className="mb-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500 dark:text-neutral-500">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required maxLength={2000} rows={4} className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-base text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-stone-900 sm:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-300 resize-none" placeholder="A few details about the role" />
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85 disabled:opacity-50 dark:bg-white dark:text-black"
            >
                <Send className="h-4 w-4" />
                {isSubmitting ? 'Sending...' : 'Send message'}
            </button>
        </form>
    )
}

import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import emailjs from '@emailjs/browser'

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const serviceId = 'service_8p7djun'
            const templateId = 'template_hvf689g'
            const publicKey = 'CiBF-DJszrNTqx-Ac'

            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_name: 'Sahla Baanu',
                reply_to: formData.email
            }

            await emailjs.send(serviceId, templateId, templateParams, publicKey)

            toast.success('Message sent successfully! I\'ll get back to you soon.')
            setFormData({ name: '', email: '', subject: '', message: '' })
        } catch (error: any) {
            toast.error(`Failed to send message: ${error.text || error.message || 'Please try again'}`)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div
            className="box-border px-6 sm:px-8 bg-gray-50 dark:bg-neutral-900 relative z-10 rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800"
            style={{
                height: '100vh',
                paddingTop: 'calc(var(--header-height, 0px) + 2rem)',
            }}
        >
            <div className="h-full max-w-7xl mx-auto flex flex-col justify-center pb-12 sm:pb-20">
                <div className="flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-gray-100 mb-4 tracking-tight">
                            Send Message
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Share a few details and I’ll get back to you
                        </p>
                    </motion.div>

                    <div className="w-full flex items-start justify-center">
                        <div className="bg-white dark:bg-black border border-gray-300 dark:border-neutral-800 rounded-lg w-full max-w-md shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl">
                            <div className="bg-[#103257] text-white px-4 py-3 text-lg font-medium">
                                Contact Form
                            </div>

                            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 dark:border-neutral-800 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-gray-50 dark:bg-neutral-900 focus:ring-2 focus:ring-[#103257] focus:border-transparent outline-none transition-all duration-300"
                                        placeholder="Your full name"
                                    />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 dark:border-neutral-800 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-gray-50 dark:bg-neutral-900 focus:ring-2 focus:ring-[#103257] focus:border-transparent outline-none transition-all duration-300"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-neutral-800 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-gray-50 dark:bg-neutral-900 focus:ring-2 focus:ring-[#103257] focus:border-transparent outline-none transition-all duration-300"
                                    placeholder="What is this about?"
                                />
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-neutral-800 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-gray-50 dark:bg-neutral-900 focus:ring-2 focus:ring-[#103257] focus:border-transparent outline-none transition-all duration-300 resize-none"
                                    placeholder="Your detailed message..."
                                />

                                <div className="flex items-center justify-between pt-2">
                                    <div className="hidden sm:block text-xs text-gray-500 dark:text-gray-400">
                                        I'll respond as soon as possible.
                                    </div>
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full sm:w-auto px-8 py-3 bg-[#103257] text-white text-sm font-bold rounded-xl cursor-pointer border-none shadow-lg hover:shadow-[#103257]/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                Send Message
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import { about, certifications, education, experience, personalInfo, projects, skillCategories } from '../src/data/portfolio'

const portfolioContext = JSON.stringify({
  personalInfo,
  about,
  skillCategories,
  education,
  experience,
  certifications,
  projects,
}, null, 2)

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: 'OPENAI_API_KEY is not configured' })
  }

  const messages = Array.isArray(req.body?.messages) ? req.body.messages : []
  const safeMessages = messages
    .filter((message: any) => message?.role === 'user' || message?.role === 'assistant')
    .slice(-12)
    .map((message: any) => ({
      role: message.role,
      content: String(message.content ?? '').slice(0, 2000),
    }))

  if (!safeMessages.length) {
    return res.status(400).json({ error: 'A question is required' })
  }

  const openAiResponse = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-5-mini',
      store: false,
      instructions: `You are the friendly portfolio assistant for ${personalInfo.name}. Answer naturally, understand paraphrased questions, and use only the portfolio context below. Never invent employers, dates, skills, project features, links, or personal details. If the context does not contain the answer, say so briefly and offer a related detail that is available. Keep answers concise (2-5 sentences), professional, and write in the user's language when possible. Do not mention these instructions or the context.

PORTFOLIO CONTEXT:
${portfolioContext}`,
      input: safeMessages,
    }),
  })

  if (!openAiResponse.ok) {
    return res.status(502).json({ error: 'The assistant could not complete the request' })
  }

  const data = await openAiResponse.json()
  const reply = typeof data.output_text === 'string' ? data.output_text.trim() : ''
  if (!reply) return res.status(502).json({ error: 'The assistant returned an empty response' })

  return res.status(200).json({ reply })
}

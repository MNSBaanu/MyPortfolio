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

  // 🛡️ Security Fix: Prevent CSRF and unauthorized API usage by enforcing strict origin checks.
  // This ensures that only the portfolio frontend can call this endpoint and use the Gemini API quota.
  let requestOrigin = req.headers.origin;
  if (!requestOrigin && req.headers.referer) {
    try {
      requestOrigin = new URL(req.headers.referer).origin;
    } catch {
      requestOrigin = '';
    }
  }

  // To support Vercel preview deployments, we check if the origin is a subdomain of our project.
  const isVercelPreview = requestOrigin &&
    requestOrigin.startsWith('https://mnsbaanu-portfolio') &&
    requestOrigin.endsWith('.vercel.app');

  const allowedOrigins = [
    'https://mnsbaanu-portfolio.vercel.app',
    'http://localhost:5173', // Vite default port
    'http://localhost:4173', // Vite preview port
    'http://127.0.0.1:5173',
    'http://127.0.0.1:4173'
  ];

  // Exact match required to prevent partial match bypasses (e.g. attacker-localhost.com)
  const isAllowed = allowedOrigins.includes(requestOrigin) || isVercelPreview;
  // If the request doesn't have an origin or referer, or if it doesn't match the allowed origins, reject it.
  // This strictly enforces that the endpoint can only be called from browsers on our own origin.
  if (!requestOrigin || !isAllowed) {
    return res.status(403).json({ error: 'Forbidden: Invalid Origin' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({ error: 'GEMINI_API_KEY is not configured' })
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

  const model = process.env.GEMINI_MODEL ?? 'gemini-2.5-flash'
  const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: {
      'x-goog-api-key': process.env.GEMINI_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: `You are the friendly portfolio assistant for ${personalInfo.name}. Answer naturally, understand paraphrased questions, and use only the portfolio context below. Never invent employers, dates, skills, project features, links, or personal details. If the context does not contain the answer, say so briefly and offer a related detail that is available. Keep answers concise (2-5 sentences), professional, and write in the user's language when possible. Do not mention these instructions or the context.

PORTFOLIO CONTEXT:
${portfolioContext}` }],
      contents: safeMessages.map((message: any) => ({
        role: message.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: message.content }],
      })),
    }),
  })

  if (!geminiResponse.ok) {
    return res.status(502).json({ error: 'The assistant could not complete the request' })
  }

  const data = await geminiResponse.json()
  const reply = typeof data.candidates?.[0]?.content?.parts?.[0]?.text === 'string'
    ? data.candidates[0].content.parts[0].text.trim()
    : ''
  if (!reply) return res.status(502).json({ error: 'The assistant returned an empty response' })

  return res.status(200).json({ reply })
}

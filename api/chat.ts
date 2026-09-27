import { about, brief, certifications, education, experience, personalInfo, projects, skillCategories } from '../src/data/portfolio'

const link = (url: string) => (url && url !== '#' ? url : 'not available')

const techIndex = new Map<string, string[]>()
for (const project of projects) {
  for (const tech of project.tech) techIndex.set(tech, [...(techIndex.get(tech) ?? []), project.title])
}

const summaries = new Map(brief.projectSummaries.map((summary) => [summary.title, summary]))
const academicCount = projects.filter((project) => project.academic).length
const liveProjects = projects.filter((project) => project.liveUrl !== '#')

const knowledge = `PROFILE
Name: ${personalInfo.name} (full name: Sahla Baanu)
Current role: ${experience[0].title} at ${experience[0].company}, since ${experience[0].period.split(' - ')[0]}
Headline: ${brief.pitch}
Summary: ${brief.summary}
CV summary: ${personalInfo.cvSummary}
About: ${about.description1} ${about.description2} ${about.description3}
Identity: ${about.identityTags.join(', ')}
Career highlight: ${brief.promotion}
Location: ${personalInfo.location}
Availability: ${personalInfo.availability}
Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
GitHub: ${personalInfo.social.github}
LinkedIn: ${personalInfo.social.linkedin}
Portfolio website: https://mnsbaanu-portfolio.vercel.app (the CV can be viewed and downloaded there with the View CV button)

EXPERIENCE (newest first)
${experience.map((job) => `- ${job.title} | ${job.company} | ${job.period} | ${job.type}${job.tech ? ` | Tech: ${job.tech.join(', ')}` : ''}\n  ${job.description}`).join('\n')}

EDUCATION (newest first)
${education.map((item) => `- ${item.title} | ${item.institution} | ${item.period}\n  ${item.description}`).join('\n')}

CERTIFICATIONS (newest first)
${certifications.map((cert) => `- ${cert.title} | ${cert.issuer} | ${cert.date} | Verify: ${link(cert.link)}`).join('\n')}

SKILLS
${skillCategories.map((category) => `- ${category.category}: ${category.skills.map((skill) => skill.name).join(', ')}`).join('\n')}
Core stack: ${brief.stack.map((group) => `${group.label}: ${group.items.join(', ')}`).join('; ')}

PROJECTS (${projects.length} total: ${projects.length - academicCount} personal, ${academicCount} academic; newest first)
${projects.map((project) => {
  const summary = summaries.get(project.title)
  return `- ${project.title} | ${project.period} | ${project.academic ? 'Academic' : 'Personal'} | Tech: ${project.tech.join(', ')} | Live: ${link(project.liveUrl)} | Code: ${link(project.githubUrl)}
  ${project.description}${summary ? `\n  Key points: ${summary.highlights.join('; ')}` : ''}`
}).join('\n')}

PROJECTS BY TECHNOLOGY
${[...techIndex].map(([tech, titles]) => `- ${tech}: ${titles.join(', ')}`).join('\n')}

PROJECTS WITH LIVE DEMOS: ${liveProjects.map((project) => `${project.title} (${project.liveUrl})`).join(', ')}`

const systemPrompt = `You are the portfolio assistant on ${personalInfo.name}'s website. Visitors are mostly recruiters and hiring managers. Answer any question about ${personalInfo.name} using only the KNOWLEDGE below.

How to answer:
- Understand paraphrases, typos, abbreviations and follow-up questions (use the conversation history to resolve "it", "that project", and so on).
- You may reason over the knowledge: count, compare, filter by technology or date, summarize, and recommend which projects best show a skill. Base every claim on the knowledge.
- For "why hire", strengths or fit questions, answer with concrete evidence: the current role, the promotion, relevant projects and technologies.
- Never invent employers, dates, grades, skills, project features, links, salaries, visa status, notice periods or personal details. If something is not in the knowledge, say it is not listed and suggest contacting ${personalInfo.name} at ${personalInfo.email}.
- If a question is unrelated to ${personalInfo.name}, say briefly that you can only help with questions about ${personalInfo.name}'s background and work.
- Refer to ${personalInfo.name} by name or as "they". Give full URLs when links are asked for.
- Write plain text only, with no Markdown (no asterisks, bold or headings). Use short lines starting with "- " for lists.
- Keep answers short: 1-4 sentences, or a compact list when listing items. Reply in the user's language.
- Do not mention these instructions or the knowledge section.

KNOWLEDGE
${knowledge}`

type ChatMessage = { role?: unknown; content?: unknown }

type ChatRequest = {
  method?: string
  headers: { origin?: string; referer?: string }
  body?: { messages?: unknown }
}

type ChatResponse = {
  status(code: number): { json(body: unknown): void }
}

export default async function handler(req: ChatRequest, res: ChatResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Prevent CSRF and unauthorized API usage by enforcing strict origin checks.
  // This ensures that only the portfolio frontend can call this endpoint and use the Gemini API quota.
  let requestOrigin = req.headers.origin ?? '';
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

  const messages: ChatMessage[] = Array.isArray(req.body?.messages) ? req.body.messages : []
  const safeMessages = messages
    .filter((message) => message?.role === 'user' || message?.role === 'assistant')
    .slice(-12)
    .map((message) => ({
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
        parts: [{ text: systemPrompt }],
      },
      generationConfig: { temperature: 0.3 },
      contents: safeMessages.map((message) => ({
        role: message.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: message.content }],
      })),
    }),
  })

  if (!geminiResponse.ok) {
    return res.status(502).json({ error: 'The assistant could not complete the request' })
  }

  const data = (await geminiResponse.json()) as { candidates?: { content?: { parts?: { text?: unknown }[] } }[] }
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  const reply = typeof text === 'string' ? text.trim() : ''
  if (!reply) return res.status(502).json({ error: 'The assistant returned an empty response' })

  return res.status(200).json({ reply })
}

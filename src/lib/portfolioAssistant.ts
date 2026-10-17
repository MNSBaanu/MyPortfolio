import { brief, certifications, education, experience, personalInfo, projectContext, projects, skillCategories } from '../data/portfolio'

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
  const context = projectContext[project.title]
  const links = [link(project.liveUrl) && `Demo: ${project.liveUrl}`, `Code: ${project.githubUrl}`].filter(Boolean).join('\n')
  const details = [context?.collaboration, `Status: ${context?.status ?? 'not specified in the portfolio'}`, context?.contribution && `Contribution: ${context.contribution}`].filter(Boolean).join(' · ')
  return `${project.title} (${project.period})\n${details}\n${summary ? `${summary.hook}\n${list(summary.highlights)}` : project.description}\nTech: ${project.tech.join(', ')}\n${links}`
}

const usesTech = (tech: string[], term: string) => tech.some((item) => item === term || (term === '.NET' && item.includes('.NET')))

function describeTech(term: string) {
  const inProjects = projects.filter((project) => usesTech(project.tech, term)).map((project) => project.title)
  const atWork = experience[0].tech?.includes(term)
  const parts = [
    atWork && `${personalInfo.name} uses ${term} at work as a ${experience[0].title} at ${experience[0].company.split(' - ')[0]}.`,
    inProjects.length > 0 && `${term} is used in ${inProjects.length} project${inProjects.length > 1 ? 's' : ''}: ${inProjects.join(', ')}.`,
  ].filter(Boolean)
  return parts.length ? parts.join(' ') : `${term} is listed in ${personalInfo.name}'s skills.`
}

export function answerQuestion(question: string, history: { role: string; text: string }[] = []) {
  const text = normalize(question)

  const matches = projectAliases.filter(({ aliases }) => aliases.some((alias) => hasTerm(text, alias))).map(({ project }) => project)
  if (!matches.length && /\b(it|its|that|this|those|they|their|them)\b/.test(text)) {
    for (const message of [...history].reverse()) {
      if (message.role !== 'user') continue
      const previous = normalize(message.text)
      const mentioned = projectAliases.filter(({ aliases }) => aliases.some((alias) => hasTerm(previous, alias))).map(({ project }) => project)
      if (mentioned.length) { matches.push(...mentioned); break }
    }
  }
  if (matches.length) {
    return matches.slice(0, 3).map((project) => {
      const context = projectContext[project.title]
      if (hasAny(text, ['status', 'complete', 'finish', 'progress', 'develop', 'deploy'])) {
        return `${project.title}: ${context?.status ?? 'completion status is not specified in the portfolio'}.${link(project.liveUrl) ? ` Demo: ${project.liveUrl}` : ' No public demo link is listed.'}`
      }
      if (hasAny(text, ['contribut', 'ownership', 'role', 'responsib', 'solo', 'team', 'group', 'collaborat'])) {
        return `${project.title}: ${context?.collaboration ?? 'collaboration details are not specified'}. ${context?.contribution ?? (context?.collaboration === 'Solo project' ? 'Built as a solo project.' : 'Individual responsibilities are not specified in the portfolio.')}`
      }
      if (hasAny(text, ['link', 'demo', 'code', 'github', 'url'])) {
        return `${project.title}\nCode: ${project.githubUrl}\n${link(project.liveUrl) ? `Demo: ${project.liveUrl}` : 'No public demo link is listed.'}`
      }
      return describeProject(project)
    }).join('\n\n')
  }

  if (hasAny(text, ['complete', 'finish', 'solo', 'team', 'group', 'collaborat', 'progress', 'development', 'status'])) {
    const requested = hasAny(text, ['complete', 'finish']) ? 'Completed' : hasAny(text, ['solo']) ? 'Solo project' : hasAny(text, ['team', 'group']) ? 'Team project' : hasAny(text, ['progress', 'development']) ? 'In development' : null
    const entries = projects.filter((project) => {
      const context = projectContext[project.title]
      return context && (!requested || context.status === requested || context.collaboration === requested)
    })
    return `${requested ? `${requested}:` : 'Confirmed project details:'}\n${entries.length ? list(entries.map((project) => `${project.title}: ${[projectContext[project.title].status, projectContext[project.title].collaboration].filter(Boolean).join(', ')}`)) : 'No matching projects are confirmed.'}\nOther project statuses and individual responsibilities may not be specified.`
  }

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
    return `${personalInfo.name} has worked on ${projects.length} projects (${projects.length - academic} personal, ${academic} academic). ${live.length} have demo links: ${live.map((item) => item.title).join(', ')}. Highlights: ${brief.projectSummaries.map((item) => item.title).join(', ')}. Ask about any project by name for details.`
  }

  if (hasAny(text, ['available', 'location', 'where', 'based', 'remote', 'relocat', 'open to', 'looking'])) {
    return `${personalInfo.name} is based in ${personalInfo.location} and is ${personalInfo.availability.toLowerCase()}.`
  }

  if (hasAny(text, ['experience', 'job', 'career', 'work', 'company', 'intern', 'role', 'employ', 'position', 'currently'])) {
    const [current, intern, ...other] = experience
    return `${personalInfo.name} is a ${current.title} at ${current.company} (${current.period}, ${current.type}). ${brief.workSummary} Before that: ${intern.title} at the same company (${intern.period}). ${brief.promotion}${other.length ? `\nOther roles:\n${list(other.map((job) => `${job.title}, ${job.company} (${job.period})`))}` : ''}`
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

export function matchOffline(jobDescription: string) {
  const text = normalize(jobDescription)
  const found = techTerms.filter((term) => hasTerm(text, normalize(term)))
  const matched = found.filter((term) => !found.some((other) => other !== term && normalize(other).includes(normalize(term))))
  if (!matched.length) {
    return `The description doesn't name technologies from the portfolio. Ask about specific skills, or email ${personalInfo.email} to discuss the role.`
  }
  const lines = matched.slice(0, 8).map((term) => {
    const uses = projects.filter((project) => usesTech(project.tech, term)).length
    const evidence = [experience[0].tech?.includes(term) && 'used at work', uses > 0 && `${uses} project${uses === 1 ? '' : 's'}`].filter(Boolean)
    return `${term}: ${evidence.length ? evidence.join(', ') : 'listed in skills'}`
  })
  return `Skills with portfolio evidence:\n${list(lines)}\nThis checks named technologies only; it does not establish seniority, years of experience or an overall hiring fit. Other requirements need a direct discussion with ${personalInfo.name}.`
}


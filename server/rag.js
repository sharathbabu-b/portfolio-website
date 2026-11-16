import { education, certifications } from '../client/src/data/education.js'
import { experience } from '../client/src/data/experience.js'
import { profile } from '../client/src/data/profile.js'
import { projects } from '../client/src/data/projects.js'
import { skillCategories } from '../client/src/data/skills.js'

const stopWords = new Set([
  'a', 'about', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'can', 'did', 'do', 'does',
  'for', 'from', 'he', 'his', 'how', 'i', 'in', 'is', 'it', 'me', 'my', 'of', 'on', 'or',
  'please', 'that', 'the', 'their', 'this', 'to', 'was', 'we', 'what', 'when', 'where',
  'which', 'who', 'why', 'with', 'you', 'your',
])

const documents = [
  {
    title: 'Profile',
    content: [
      profile.name,
      profile.title,
      profile.tagline,
      profile.location,
      `${profile.experienceYears} years of experience`,
      ...profile.summary,
      ...profile.aboutHighlights.map(({ label, value }) => `${label}: ${value}`),
      ...profile.aboutFocus.map(({ title, text }) => `${title}: ${text}`),
    ].join(' '),
  },
  ...skillCategories.map(({ title, skills }) => ({
    title: `Skills: ${title}`,
    content: skills.join(', '),
  })),
  ...experience.map(({ company, role, period, location, responsibilities, tech }) => ({
    title: `Work experience: ${role} at ${company}`,
    content: [period, location, ...responsibilities, ...tech].join(' '),
  })),
  ...projects.map(({ title, subtitle, kind, overview, technologies, features, liveUrl, githubUrl }) => ({
    title: `Project: ${title}`,
    content: [
      subtitle,
      kind,
      overview,
      ...technologies,
      ...features,
      liveUrl && `Live demo: ${liveUrl}`,
      githubUrl && `GitHub: ${githubUrl}`,
    ].filter(Boolean).join(' '),
  })),
  ...education.map(({ degree, institution, period, grade }) => ({
    title: `Education: ${degree}`,
    content: [institution, period, grade].join(' '),
  })),
  ...certifications.map(({ name, issuer, period }) => ({
    title: `Certification: ${name}`,
    content: [issuer, period].join(' '),
  })),
  {
    title: 'Contact',
    content: [profile.email, profile.socials.github, profile.socials.linkedin].join(' '),
  },
]

function tokenize(text) {
  return text.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []
}

const indexedDocuments = documents.map((document) => {
  const tokens = tokenize(`${document.title} ${document.content}`)
  const frequencies = new Map()

  for (const token of tokens) frequencies.set(token, (frequencies.get(token) ?? 0) + 1)

  return {
    ...document,
    titleTerms: new Set(tokenize(document.title)),
    frequencies,
    length: tokens.length,
  }
})

const documentFrequency = new Map()
for (const document of indexedDocuments) {
  for (const term of document.frequencies.keys()) {
    documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1)
  }
}

const averageDocumentLength =
  indexedDocuments.reduce((total, document) => total + document.length, 0) / indexedDocuments.length

function scoreDocument(document, queryTerms) {
  const k1 = 1.5
  const b = 0.75
  let score = 0

  for (const term of queryTerms) {
    const frequency = document.frequencies.get(term) ?? 0
    if (frequency === 0) continue

    const count = documentFrequency.get(term)
    const inverseDocumentFrequency = Math.log(1 + (indexedDocuments.length - count + 0.5) / (count + 0.5))
    const lengthNormalization = 1 - b + b * (document.length / averageDocumentLength)
    score += inverseDocumentFrequency * (frequency * (k1 + 1)) / (frequency + k1 * lengthNormalization)

    if (document.titleTerms.has(term)) score += inverseDocumentFrequency
  }

  return score
}

export function retrievePortfolioContext(query) {
  const queryTerms = [...new Set(tokenize(query).filter((term) => term.length > 1 && !stopWords.has(term)))]
  if (queryTerms.length === 0) return ''

  return indexedDocuments
    .map((document, index) => ({ document, index, score: scoreDocument(document, queryTerms) }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .slice(0, 4)
    .map(({ document }) => `[${document.title}]\n${document.content}`)
    .join('\n\n')
}

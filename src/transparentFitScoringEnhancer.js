import { useEffect } from 'react'
import { calculateEventFit } from './fitScoring.js'
import { readLanguage, t } from './i18n.js'

const FIT_TRANSLATIONS_ES = {
  fitScore: 'Puntaje de ajuste',
  fitScoreHelp: 'El ajuste estima qué tan realista es el evento según tus fortalezas, tiempo, formato, experiencia y responsabilidad. No predice resultados.',
  strongFit: 'Ajuste fuerte',
  goodFit: 'Buen ajuste',
  possibleFit: 'Ajuste posible',
  stretchFit: 'Reto',
  goodBackupBecause: 'Buena opción de respaldo porque',
  tradeoff: 'Costo',
  scoreBreakdown: 'Desglose del puntaje',
  strengths: 'Fortalezas',
  format: 'Formato',
  time: 'Tiempo',
  experience: 'Experiencia',
  reliability: 'Responsabilidad',
  process: 'Proceso',
  whyThisScore: '¿Por qué este puntaje?',
  topReasons: 'Razones principales',
  watchOuts: 'Cuidados',
}

const EVENT_NAMES = [
  'Extemporaneous Writing',
  'Medical Terminology',
  'Behavioral Health',
  'Medical Math',
  'Health Informatics',
  'World Health and Disparities',
  'Prepared Speaking',
  'Health Education',
  'Community Awareness',
  'Public Health',
  'Mental Health Promotion',
  'Public Service Announcement',
  'Medical Innovation',
  'HOSA Bowl',
  'Biomedical Debate',
  'Forensic Science',
  'Health Career Display',
  'Research Poster',
  'Researched Persuasive Writing and Speaking',
  'Medical Reading',
  'Healthcare Issues Exam',
  'Medical Law and Ethics',
  'Epidemiology',
  'Nutrition',
  'Human Growth and Development',
  'Healthcare Administration',
  'Health Career Photography',
]

function cleanText(element) {
  return (element?.textContent || '').replace(/\s+/g, ' ').trim()
}

function readProfile() {
  try {
    return JSON.parse(localStorage.getItem('wheelerHosaProfile')) || {}
  } catch {
    return {}
  }
}

function textAfter(source, label) {
  const index = source.indexOf(label)
  if (index < 0) return ''
  return source.slice(index + label.length).split(/Upload required\?|Test required\?|Presentation required\?|Main work:|Process type:/)[0].trim()
}

function yesValue(source, label) {
  const value = textAfter(source, label)
  return /^yes\b/i.test(value)
}

function inferDifficulty(text) {
  if (/high commitment|high-ceiling|stretch|disciplined/i.test(text)) return 'High'
  if (/medium to high|innovation|prototype/i.test(text)) return 'Medium to High'
  if (/starter|rookie|beginner|low lift/i.test(text)) return 'Low to Medium'
  return 'Medium'
}

function inferTime(text) {
  const match = text.match(/(\d+)\+\s*h(?:rs)?/)
  if (match) return Number(match[1])
  if (/high commitment|portfolio|campaign|team project|prototype/i.test(text)) return 5
  if (/speech|prepared speaking|career display/i.test(text)) return 3
  return 4
}

function buildEventFromCard(card) {
  const text = cleanText(card)
  const name = EVENT_NAMES.find((eventName) => text.includes(eventName)) || cleanText(card.querySelector('h3'))
  const track =
    Array.from(card.querySelectorAll('p'))
      .map(cleanText)
      .find((value) => value && value !== name && !/%$/.test(value) && !['fit', 'ajuste'].includes(value.toLowerCase())) || ''
  const processType = textAfter(text, 'Process type:') || 'Verify Georgia SLC Rules'
  const team = /team|equipo|partner|partners|portfolio|campaign/i.test(text) && !/solo/i.test(text) ? 'Team event' : 'Solo'

  return {
    name,
    track,
    team,
    time: inferTime(text),
    difficulty: inferDifficulty(text),
    processType,
    why: text,
    bestFor: `${track} ${processType} ${text}`.toLowerCase().split(/[^a-z]+/).filter(Boolean),
    digitalUpload: yesValue(text, 'Upload required?'),
    testRequired: yesValue(text, 'Test required?'),
    presentationRequired: yesValue(text, 'Presentation required?'),
    preJudged: /pre-judged|portfolio|upload/i.test(text),
  }
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag)
  if (className) element.className = className
  if (text) element.textContent = text
  return element
}

function fitText(language, key, fallback) {
  if (language === 'es' && FIT_TRANSLATIONS_ES[key]) return FIT_TRANSLATIONS_ES[key]
  return t(language, key, fallback)
}

function updateScoreBadge(card, fit, language) {
  const scoreLabels = Array.from(card.querySelectorAll('p')).filter((paragraph) =>
    ['fit', 'ajuste'].includes(cleanText(paragraph).toLowerCase()),
  )
  scoreLabels.forEach((label) => {
    const score = label.previousElementSibling
    if (score) score.textContent = `${fit.totalScore}%`
    label.textContent = fitText(language, fit.labelKey, fit.label)
  })
}

function addBackupExplanation(card, fit, language) {
  if (card.dataset.transparentBackupExplain === 'true') return
  const title = cleanText(card)
  if (!title.includes('Backup') && !title.includes('respaldo')) return

  const target = card.querySelector('h3')?.parentElement
  if (!target) return
  const reason = fit.topReasons[0]
  const watchOut = fit.watchOuts[0]
  if (reason) {
    target.appendChild(
      makeElement(
        'p',
        'mt-2 text-sm font-bold leading-5 text-slate-700',
        `${fitText(language, 'goodBackupBecause', 'Good backup because')} ${reason.toLowerCase()}`,
      ),
    )
  }
  if (watchOut) {
    target.appendChild(
      makeElement('p', 'mt-1 text-xs font-bold leading-5 text-rose-800', `${fitText(language, 'tradeoff', 'Tradeoff')}: ${watchOut}`),
    )
  }
  card.dataset.transparentBackupExplain = 'true'
}

function appendBreakdown(panel, fit, language) {
  if (panel.querySelector('[data-transparent-fit-panel="true"]')) return

  const wrapper = makeElement('div', 'space-y-3')
  wrapper.dataset.transparentFitPanel = 'true'

  const scoreCard = makeElement('div', 'rounded-2xl bg-blue-50 p-4 ring-1 ring-blue-100')
  scoreCard.appendChild(makeElement('p', 'text-xs font-black uppercase tracking-wide text-blue-950', fitText(language, 'fitScore', 'Fit score')))
  const scoreRow = makeElement('div', 'mt-2 flex flex-wrap items-end gap-3')
  scoreRow.appendChild(makeElement('p', 'text-4xl font-black tracking-tight text-blue-950', `${fit.totalScore}%`))
  scoreRow.appendChild(
    makeElement(
      'p',
      'rounded-full bg-white px-3 py-1 text-sm font-black text-blue-950 ring-1 ring-blue-100',
      fitText(language, fit.labelKey, fit.label),
    ),
  )
  scoreCard.appendChild(scoreRow)
  scoreCard.appendChild(
    makeElement(
      'p',
      'mt-2 text-xs font-bold leading-5 text-blue-950',
      fitText(
        language,
        'fitScoreHelp',
        'Fit score estimates how realistic the event is for your strengths, time, format, experience, and reliability. It does not predict placement.',
      ),
    ),
  )
  wrapper.appendChild(scoreCard)

  const rows = [
    ['strengths', 'Strengths'],
    ['format', 'Format'],
    ['time', 'Time'],
    ['experience', 'Experience'],
    ['reliability', 'Reliability'],
    ['process', 'Process'],
  ]
  const breakdown = makeElement('div', 'rounded-xl bg-white p-3 ring-1 ring-slate-200')
  breakdown.appendChild(makeElement('p', 'text-xs font-black uppercase tracking-wide text-slate-500', fitText(language, 'scoreBreakdown', 'Score breakdown')))
  const grid = makeElement('div', 'mt-3 grid gap-2 sm:grid-cols-2')
  rows.forEach(([key, label]) => {
    const item = fit.breakdown[key] || { score: 0, max: 0, note: '' }
    const row = makeElement('div', 'rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200')
    const top = makeElement('div', 'flex items-center justify-between gap-2')
    top.appendChild(makeElement('p', 'text-sm font-black text-slate-950', fitText(language, key, label)))
    top.appendChild(makeElement('p', 'text-sm font-black text-blue-950', `${item.score}/${item.max}`))
    row.appendChild(top)
    row.appendChild(makeElement('p', 'mt-1 text-xs font-bold leading-5 text-slate-600', item.note))
    grid.appendChild(row)
  })
  breakdown.appendChild(grid)
  wrapper.appendChild(breakdown)

  const explanation = makeElement('div', 'rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200')
  explanation.appendChild(makeElement('p', 'text-sm font-black text-slate-950', fitText(language, 'whyThisScore', 'Why this score?')))
  const columns = makeElement('div', 'mt-3 grid gap-3 sm:grid-cols-2')
  ;[
    [fitText(language, 'topReasons', 'Top reasons'), fit.topReasons],
    [fitText(language, 'watchOuts', 'Watch-outs'), fit.watchOuts],
  ].forEach(([title, items]) => {
    const block = makeElement('div', '')
    block.appendChild(makeElement('p', 'text-xs font-black uppercase tracking-wide text-slate-500', title))
    const list = makeElement('ul', 'mt-2 space-y-1')
    items.forEach((item) => list.appendChild(makeElement('li', 'text-sm font-bold leading-5 text-slate-700', item)))
    block.appendChild(list)
    columns.appendChild(block)
  })
  explanation.appendChild(columns)
  wrapper.appendChild(explanation)

  const header = panel.querySelector('div')
  header?.insertAdjacentElement('afterend', wrapper)
}

export function enhanceTransparentFitScoring(root = document.querySelector('[data-portal-root]')) {
  if (!root || typeof document === 'undefined') return
  const language = readLanguage()
  const resultVisible = cleanText(root).includes('Your result') || cleanText(root).includes('Tu resultado')
  if (!resultVisible) return

  const profile = readProfile()
  const matchCards = Array.from(root.querySelectorAll('main div.rounded-2xl')).filter((card) => {
    const text = cleanText(card)
    return EVENT_NAMES.some((eventName) => text.includes(eventName)) && (text.includes('fit') || text.includes('ajuste'))
  })

  let bestFit = null
  matchCards.forEach((card) => {
    const fit = calculateEventFit(buildEventFromCard(card), profile)
    if (!bestFit) bestFit = fit
    updateScoreBadge(card, fit, language)
    addBackupExplanation(card, fit, language)
  })

  const detailsPanel = Array.from(root.querySelectorAll('main section')).find((section) => {
    const text = cleanText(section)
    return text.includes('Why this fits') || text.includes('Por qué encaja')
  })
  if (detailsPanel && bestFit) appendBreakdown(detailsPanel, bestFit, language)
}

export function TransparentFitScoringEnhancer() {
  useEffect(() => {
    let scheduled = false
    const run = () => {
      scheduled = false
      enhanceTransparentFitScoring()
    }
    const schedule = () => {
      if (scheduled) return
      scheduled = true
      window.setTimeout(run, 0)
    }

    schedule()
    const observer = new MutationObserver(schedule)
    observer.observe(document.body, { childList: true, subtree: true, characterData: true })
    window.addEventListener('hashchange', schedule)
    window.addEventListener('storage', schedule)
    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', schedule)
      window.removeEventListener('storage', schedule)
    }
  }, [])

  return null
}

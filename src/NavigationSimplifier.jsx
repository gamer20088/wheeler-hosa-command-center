import { useEffect } from 'react'
import { readLanguage, t } from './i18n.js'

const HIDDEN_NAV_LABELS = [
  'Event Library',
  'Biblioteca de eventos',
  'Officer Tools',
  'Herramientas de oficiales',
]

const FINDER_LABELS = ['Event Finder', 'Buscador de eventos', 'Find Event', 'Encontrar evento']
const LIBRARY_LABELS = ['Event Library', 'Biblioteca de eventos']
const OFFICER_LABELS = ['Officer Tools', 'Herramientas de oficiales']
const LANGUAGE_LABELS = ['English', 'Espa\u00f1ol']
const HEADER_ACTION_LABELS = [
  'Official Guidelines',
  'Guias oficiales',
  'Gu\u00edas oficiales',
  'Glossary',
  'Glosario',
]
const SHORT_WARNING_EN = 'Unofficial prep support. Verify official rules with your advisor.'
const SHORT_WARNING_ES = 'Apoyo de preparacion no oficial. Verifica las reglas oficiales con tu asesor.'
const TEXT_REPLACEMENTS = [
  ['In baby words', 'Plain English', 'Palabras simples'],
  [
    'This portal explains events in student-friendly language. It does not replace official HOSA guidelines. Georgia SLC deadlines, uploads, and procedures must be verified with the Wheeler advisor and Georgia HOSA.',
    SHORT_WARNING_EN,
    SHORT_WARNING_ES,
  ],
  [
    'This portal explains events in student-friendly language. Verify final Georgia SLC requirements with the Wheeler advisor and Georgia HOSA.',
    SHORT_WARNING_EN,
    SHORT_WARNING_ES,
  ],
  [
    'These are unofficial Wheeler HOSA prep supports. Always verify official HOSA guidelines and Georgia SLC requirements with the Wheeler advisor.',
    SHORT_WARNING_EN,
    SHORT_WARNING_ES,
  ],
  [
    'Apoyo de preparacion no oficial. Verifica las reglas oficiales de HOSA y del SLC de Georgia con tu asesor.',
    SHORT_WARNING_EN,
    SHORT_WARNING_ES,
  ],
  [
    'Estos son apoyos no oficiales de preparacion de Wheeler HOSA. Siempre verifica las guias oficiales de HOSA y los requisitos del SLC de Georgia con el asesor de Wheeler.',
    SHORT_WARNING_EN,
    SHORT_WARNING_ES,
  ],
  [
    'Take the quick quiz or browse all events.',
    'Take the quick quiz to choose a realistic event.',
    'Haz el cuestionario rapido para escoger un evento realista.',
  ],
  [
    'Haz el cuestionario rapido o revisa todos los eventos.',
    'Take the quick quiz to choose a realistic event.',
    'Haz el cuestionario rapido para escoger un evento realista.',
  ],
  [
    'No local practice entries yet. Save one after a practice session.',
    "No local practice entries yet. After practice, save a note like '20 min flashcards' or '30 min speech draft.'",
    "Todavia no hay practicas locales. Despues de practicar, guarda una nota como '20 min de tarjetas' o '30 min de borrador de discurso.'",
  ],
  ['Open Prep Hub', 'Open Prep Hub', 'Abrir Centro de preparacion'],
  ['Go to Proof Tracker', 'Go to Proof Tracker', 'Ir a evidencia'],
  ['Open Prep Pack', 'Open Prep Pack', 'Abrir paquete'],
  ['Proof Tracker', 'Proof Tracker', 'Registro de evidencia'],
  ['Practice Timer', 'Practice Timer', 'Temporizador'],
  ['Proof Examples', 'Proof Examples', 'Ejemplos'],
  ['Privacy + Code', 'Privacy + Code', 'Privacidad'],
  ['Start with Find Event', 'Start with Find Event', 'Empezar con el buscador'],
  ['Practice and submit proof', 'Practice and submit proof', 'Practica y entrega evidencia'],
  ['Unofficial prep support. Verify official rules with your advisor.', SHORT_WARNING_EN, SHORT_WARNING_ES],
]

const LOCAL_LABELS = {
  es: {
    findEvent: 'Encontrar evento',
    browseAllEvents: 'Ver todos los eventos',
    eventFinderDiscoveryNote: 'Haz el quiz primero o revisa todos los eventos si ya sabes que buscas.',
    officerTools: 'Herramientas de oficiales',
    openPrepHub: 'Abrir Centro de preparacion',
    goToProofTracker: 'Ir a evidencia',
    openPrepPack: 'Abrir paquete',
    proofLinks: 'Enlaces de evidencia',
    resourceHelper: 'Empieza con Aprender. Usa Investigacion si necesitas evidencia mas fuerte.',
    noPracticeExample: "Todavia no hay practicas. Guarda una nota como '20 min tarjetas' o '30 min discurso'.",
  },
}

const UTILITY_BUTTON_CLASS =
  'inline-flex min-h-10 shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-white px-2.5 py-2 text-xs font-bold text-slate-900 ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 sm:px-3 sm:text-sm'

function label(language, key, fallback) {
  return LOCAL_LABELS[language]?.[key] || t(language, key, fallback)
}

function buttonText(button) {
  return (button?.textContent || '').replace(/\s+/g, ' ').trim()
}

function elementText(element) {
  return (element?.textContent || '').replace(/\s+/g, ' ').trim()
}

function findButtonByLabels(buttons, labels) {
  return buttons.find((button) => labels.some((currentLabel) => buttonText(button).includes(currentLabel))) || null
}

function setButtonText(button, text) {
  const span = button?.querySelector('span')
  if (span && span.textContent !== text) span.textContent = text
}

function hasAllLanguageLabels(element) {
  const text = elementText(element)
  return LANGUAGE_LABELS.every((currentLabel) => text.includes(currentLabel))
}

function hasHeaderActionLabel(element) {
  const text = elementText(element)
  return HEADER_ACTION_LABELS.some((currentLabel) => text.includes(currentLabel))
}

function findLanguageToggleGroups() {
  const ariaGroups = Array.from(document.querySelectorAll('[aria-label="Language"], [aria-label="Idioma"]'))
  const textGroups = Array.from(document.querySelectorAll('div')).filter(hasAllLanguageLabels)
  const groups = Array.from(new Set([...ariaGroups, ...textGroups])).filter(hasAllLanguageLabels)

  return groups.filter((group) => !groups.some((candidate) => candidate !== group && group.contains(candidate)))
}

function isInsideHeaderActions(group) {
  let current = group.parentElement
  for (let depth = 0; current && depth < 5; depth += 1) {
    if (hasHeaderActionLabel(current)) return true
    current = current.parentElement
  }
  return false
}

function hideDuplicateLanguageToggles() {
  const groups = findLanguageToggleGroups()
  if (groups.length <= 1) return

  const keep = groups.find(isInsideHeaderActions) || groups[0]
  groups.forEach((group) => {
    if (group === keep) {
      group.style.display = ''
      group.removeAttribute('data-hidden-duplicate-language-toggle')
      return
    }

    group.dataset.hiddenDuplicateLanguageToggle = 'true'
    group.style.display = 'none'
  })
}

function replaceSmallMicrocopy(language) {
  const root = document.querySelector('[data-portal-root]')
  if (!root || typeof NodeFilter === 'undefined') return
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement
      if (!parent || ['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT
      return NodeFilter.FILTER_ACCEPT
    },
  })

  const replacements = TEXT_REPLACEMENTS.map(([source, english, spanish]) => [source, language === 'es' ? spanish : english])
  let node = walker.nextNode()
  while (node) {
    let nextText = node.nodeValue || ''
    replacements.forEach(([source, replacement]) => {
      if (source && replacement) nextText = nextText.replaceAll(source, replacement)
    })
    if (nextText !== node.nodeValue) node.nodeValue = nextText
    node = walker.nextNode()
  }
}

function hideMainNavButton(button) {
  button.dataset.simplifiedHiddenNav = 'true'
  button.setAttribute('aria-hidden', 'true')
  button.tabIndex = -1
  button.style.display = 'none'
}

function makeSecondaryButton(buttonLabel, onClick) {
  const button = document.createElement('button')
  button.type = 'button'
  button.dataset.secondaryOfficerTools = 'true'
  button.className = UTILITY_BUTTON_CLASS
  button.textContent = buttonLabel
  button.addEventListener('click', onClick)
  return button
}

function makeBrowseEventsButton(buttonLabel, onClick) {
  const button = document.createElement('button')
  button.type = 'button'
  button.dataset.browseAllEvents = 'true'
  button.className = `${UTILITY_BUTTON_CLASS} w-full sm:w-auto`
  button.textContent = buttonLabel
  button.addEventListener('click', onClick)
  return button
}

function slugifyEventName(name) {
  return String(name || '')
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function retargetButton(button, text, targetButton) {
  if (!button || !targetButton) return
  setButtonText(button, text)
  if (button.dataset.microcopyRetargeted === 'true') return
  button.dataset.microcopyRetargeted = 'true'
  button.addEventListener(
    'click',
    (event) => {
      event.preventDefault()
      event.stopImmediatePropagation()
      targetButton.click()
    },
    true,
  )
}

function isActive(button) {
  return button?.className?.includes('bg-blue-950')
}

function updateNavGrid(nav) {
  nav.dataset.mobileCompressedNav = 'true'
  nav.classList.remove('lg:grid-cols-7')
  nav.classList.add('lg:grid-cols-5')
}

function compressHeader() {
  const header = document.querySelector('[data-portal-root] header')
  const headerInner = header?.firstElementChild
  if (header) header.dataset.mobileCompressedHeader = 'true'
  if (headerInner) headerInner.dataset.mobileCompressedHeaderInner = 'true'
}

function updateOfficerToolsAction(language, officerButton) {
  const glossaryButton = Array.from(document.querySelectorAll('button')).find((button) =>
    ['Glossary', 'Glosario'].some((currentLabel) => buttonText(button).includes(currentLabel)),
  )
  const headerActions = glossaryButton?.parentElement
  const existingButtons = Array.from(document.querySelectorAll('[data-secondary-officer-tools="true"]'))
  const secondaryOfficer = existingButtons[0]

  existingButtons.slice(1).forEach((button) => button.remove())
  if (!headerActions || !officerButton) return

  const buttonLabel = label(language, 'officerTools', 'Officer Tools')
  if (!secondaryOfficer) {
    headerActions.appendChild(makeSecondaryButton(buttonLabel, () => officerButton.click()))
    return
  }

  if (secondaryOfficer.parentElement !== headerActions) {
    headerActions.appendChild(secondaryOfficer)
  }
  secondaryOfficer.className = UTILITY_BUTTON_CLASS
  secondaryOfficer.textContent = buttonLabel
}

function updateBrowseEventsHandoff(language, main, finderButton, libraryButton) {
  const browseExisting = document.querySelector('[data-browse-all-events="true"]')
  const browseBar = browseExisting?.closest('[data-finder-browse-bar="true"]')
  const finderActive = isActive(finderButton)
  const libraryActive = isActive(libraryButton)

  if (libraryActive && finderButton) {
    finderButton.className = finderButton.className.replace(
      'bg-slate-100 text-slate-700 hover:bg-slate-200',
      'bg-blue-950 text-white',
    )
  }

  if (!main || !finderActive || libraryActive || !libraryButton) {
    browseBar?.remove()
    return
  }

  const noteText = label(
    language,
    'eventFinderDiscoveryNote',
    'Use the quiz first, or browse every event if you already know what you want.',
  )
  const buttonLabel = label(language, 'browseAllEvents', 'Browse all events')

  if (browseBar) {
    browseBar.querySelector('p').textContent = noteText
    browseExisting.textContent = buttonLabel
    return
  }

  const bar = document.createElement('div')
  bar.dataset.finderBrowseBar = 'true'
  bar.className =
    'mb-3 flex flex-col gap-2 rounded-xl bg-blue-50 px-3 py-2 ring-1 ring-blue-100 sm:flex-row sm:items-center sm:justify-between'

  const note = document.createElement('p')
  note.className = 'text-xs font-bold leading-5 text-slate-700 sm:text-sm'
  note.textContent = noteText
  bar.appendChild(note)
  bar.appendChild(makeBrowseEventsButton(buttonLabel, () => libraryButton.click()))
  main.prepend(bar)
}

function updateHomeCtas(language, buttons) {
  const prepButton = findButtonByLabels(buttons, ['Prep Hub', 'Centro de preparacion'])
  const proofButton = findButtonByLabels(buttons, ['Proof Tracker', 'Registro de evidencia'])
  const mainButtons = Array.from(document.querySelectorAll('main button'))
  const browseButton = findButtonByLabels(mainButtons, ['Browse Events', 'Ver eventos'])
  const planButton = findButtonByLabels(mainButtons, ['View My Plan', 'Ver mi plan'])

  retargetButton(browseButton, label(language, 'openPrepHub', 'Open Prep Hub'), prepButton)
  retargetButton(planButton, label(language, 'goToProofTracker', 'Go to Proof Tracker'), proofButton)
}

function addFinderResultPrepCta(language, buttons) {
  const prepButton = findButtonByLabels(buttons, ['Prep Hub', 'Centro de preparacion'])
  if (!prepButton) return

  const resultCards = Array.from(document.querySelectorAll('main section')).filter((section) =>
    elementText(section).includes('Why this fits') || elementText(section).includes('Por que encaja'),
  )

  resultCards.forEach((card) => {
    if (card.querySelector('[data-result-open-prep-pack="true"]')) return
    const myPlanButton = findButtonByLabels(Array.from(card.querySelectorAll('button')), ['Open My Plan', 'Abrir mi plan'])
    if (!myPlanButton) return

    const eventName =
      Array.from(card.querySelectorAll('p'))
        .map((node) => elementText(node))
        .find((text) => text && !text.includes('+ hrs') && !text.includes('First action') && !text.includes('Primer')) || ''

    const button = document.createElement('button')
    button.type = 'button'
    button.dataset.resultOpenPrepPack = 'true'
    button.className =
      'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300'
    button.textContent = label(language, 'openPrepPack', 'Open Prep Pack')
    button.addEventListener('click', () => {
      const slug = slugifyEventName(eventName)
      if (slug) window.location.hash = `prep/${slug}`
      prepButton.click()
    })

    myPlanButton.parentElement?.insertBefore(button, myPlanButton)
    myPlanButton.className = myPlanButton.className
      .replace('bg-blue-950 text-white hover:bg-blue-900', 'bg-white text-slate-950 ring-1 ring-slate-200 hover:bg-blue-50 hover:ring-blue-300')
      .replace('bg-blue-950 text-white', 'bg-white text-slate-950 ring-1 ring-slate-200')
  })
}

function updateProofTrackerCopy(language) {
  const buttons = Array.from(document.querySelectorAll('main button'))
  const submitPanel = findButtonByLabels(buttons, ['Submit Proof', 'Entregar evidencia'])
  if (submitPanel) setButtonText(submitPanel, label(language, 'proofLinks', 'Proof Links'))

  Array.from(document.querySelectorAll('main p')).forEach((paragraph) => {
    const text = elementText(paragraph)
    if (text !== 'No local practice entries yet. Save one after a practice session.') return
    paragraph.textContent = label(
      language,
      'noPracticeExample',
      "No local practice entries yet. After practice, save a note like '20 min flashcards' or '30 min speech draft.'",
    )
  })
}

function addPrepHubResourceHelper(language) {
  const resourcesHeading = Array.from(document.querySelectorAll('main h3')).find((heading) =>
    ['Resources', 'Recursos'].includes(elementText(heading)),
  )
  const panel = resourcesHeading?.closest('section')
  if (!panel || panel.querySelector('[data-resource-helper="true"]')) return

  const helper = document.createElement('p')
  helper.dataset.resourceHelper = 'true'
  helper.className = 'mb-3 rounded-xl bg-blue-50 p-3 text-xs font-bold leading-5 text-blue-950 ring-1 ring-blue-100'
  helper.textContent = label(
    language,
    'resourceHelper',
    'Start with a Learn source. Use Research links when you need stronger evidence.',
  )
  resourcesHeading.nextElementSibling?.insertAdjacentElement('beforebegin', helper)
}

function tuneMyPlanUtilities() {
  Array.from(document.querySelectorAll('main button')).forEach((button) => {
    const text = buttonText(button)
    if (!['Copy Plan', 'Download Plan'].some((labelText) => text.includes(labelText))) return
    button.className = button.className
      .replace('min-h-11', 'min-h-10')
      .replace('px-4', 'px-3')
      .replace('text-sm', 'text-xs')
      .replace('text-slate-950', 'text-slate-700')
  })
}

function simplifyNavigation() {
  if (typeof document === 'undefined') return

  const language = readLanguage()
  hideDuplicateLanguageToggles()
  replaceSmallMicrocopy(language)
  compressHeader()

  const nav = document.querySelector('nav[aria-label="Main navigation"]')
  if (!nav) return

  const buttons = Array.from(nav.querySelectorAll('button'))
  const finderButton = findButtonByLabels(buttons, FINDER_LABELS)
  const libraryButton = findButtonByLabels(buttons, LIBRARY_LABELS)
  const officerButton = findButtonByLabels(buttons, OFFICER_LABELS)

  if (finderButton) setButtonText(finderButton, label(language, 'findEvent', 'Find Event'))

  buttons.forEach((button) => {
    const text = buttonText(button)
    if (HIDDEN_NAV_LABELS.some((currentLabel) => text.includes(currentLabel))) {
      hideMainNavButton(button)
    }
  })

  updateNavGrid(nav)
  updateOfficerToolsAction(language, officerButton)
  updateBrowseEventsHandoff(language, document.querySelector('main'), finderButton, libraryButton)
  updateHomeCtas(language, buttons)
  addFinderResultPrepCta(language, buttons)
  updateProofTrackerCopy(language)
  addPrepHubResourceHelper(language)
  tuneMyPlanUtilities()
  replaceSmallMicrocopy(language)
  hideDuplicateLanguageToggles()
}

export function NavigationSimplifier({ children }) {
  useEffect(() => {
    let scheduled = false
    const run = () => {
      scheduled = false
      simplifyNavigation()
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
    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', schedule)
    }
  }, [])

  return children
}

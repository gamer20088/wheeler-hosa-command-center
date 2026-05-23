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

const LOCAL_LABELS = {
  es: {
    findEvent: 'Encontrar evento',
    browseAllEvents: 'Ver todos los eventos',
    eventFinderDiscoveryNote: 'Usa el cuestionario primero, o revisa todos los eventos si ya sabes lo que quieres.',
    officerTools: 'Herramientas de oficiales',
  },
}

const UTILITY_BUTTON_CLASS =
  'inline-flex min-h-10 shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-white px-3 py-2 text-sm font-bold text-slate-900 ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300'

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

function isActive(button) {
  return button?.className?.includes('bg-blue-950')
}

function updateNavGrid(nav) {
  nav.classList.remove('lg:grid-cols-7')
  nav.classList.add('lg:grid-cols-5')
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
    'mb-4 flex flex-col gap-2 rounded-xl bg-blue-50 px-3 py-2 ring-1 ring-blue-100 sm:flex-row sm:items-center sm:justify-between'

  const note = document.createElement('p')
  note.className = 'text-sm font-bold text-slate-700'
  note.textContent = noteText
  bar.appendChild(note)
  bar.appendChild(makeBrowseEventsButton(buttonLabel, () => libraryButton.click()))
  main.prepend(bar)
}

function simplifyNavigation() {
  if (typeof document === 'undefined') return

  const language = readLanguage()
  hideDuplicateLanguageToggles()

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

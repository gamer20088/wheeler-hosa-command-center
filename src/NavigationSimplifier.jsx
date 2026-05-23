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

function buttonText(button) {
  return (button?.textContent || '').replace(/\s+/g, ' ').trim()
}

function findButtonByLabels(buttons, labels) {
  return buttons.find((button) => labels.some((label) => buttonText(button).includes(label))) || null
}

function setButtonText(button, text) {
  const span = button?.querySelector('span')
  if (span && span.textContent !== text) span.textContent = text
}

function getPortalUrl(hash) {
  if (typeof window === 'undefined') return hash
  return `${window.location.origin}${window.location.pathname}${hash}`
}

function makeSecondaryButton(label, onClick) {
  const button = document.createElement('button')
  button.type = 'button'
  button.dataset.secondaryOfficerTools = 'true'
  button.className = 'inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-bold text-slate-900 ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300'
  button.textContent = label
  button.addEventListener('click', onClick)
  return button
}

function makeBrowseEventsButton(label, onClick) {
  const button = document.createElement('button')
  button.type = 'button'
  button.dataset.browseAllEvents = 'true'
  button.className = 'inline-flex min-h-10 cursor-pointer items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-black text-slate-900 ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300'
  button.textContent = label
  button.addEventListener('click', onClick)
  return button
}

function isActive(button) {
  return button?.className?.includes('bg-blue-950')
}

function simplifyNavigation() {
  if (typeof document === 'undefined') return
  const language = readLanguage()
  const nav = document.querySelector('nav[aria-label="Main navigation"]')
  if (!nav) return

  const buttons = Array.from(nav.querySelectorAll('button'))
  const finderButton = findButtonByLabels(buttons, FINDER_LABELS)
  const libraryButton = findButtonByLabels(buttons, LIBRARY_LABELS)
  const officerButton = findButtonByLabels(buttons, OFFICER_LABELS)

  if (finderButton) setButtonText(finderButton, t(language, 'findEvent', 'Find Event'))

  buttons.forEach((button) => {
    const text = buttonText(button)
    if (HIDDEN_NAV_LABELS.some((label) => text.includes(label))) {
      button.dataset.simplifiedHiddenNav = 'true'
      button.style.display = 'none'
    }
  })

  nav.className = nav.className
    .replace(/lg:grid-cols-7/g, 'lg:grid-cols-5')
    .replace(/sm:grid-cols-3/g, 'sm:grid-cols-3')

  const glossaryButton = Array.from(document.querySelectorAll('button')).find((button) => ['Glossary', 'Glosario'].some((label) => buttonText(button).includes(label)))
  const headerActions = glossaryButton?.parentElement
  const secondaryOfficer = document.querySelector('[data-secondary-officer-tools="true"]')
  if (headerActions && officerButton && !secondaryOfficer) {
    const label = t(language, 'officerTools', 'Officer Tools')
    headerActions.appendChild(makeSecondaryButton(label, () => officerButton.click()))
  } else if (secondaryOfficer) {
    secondaryOfficer.textContent = t(language, 'officerTools', 'Officer Tools')
  }

  const main = document.querySelector('main')
  const browseExisting = document.querySelector('[data-browse-all-events="true"]')
  const finderActive = isActive(finderButton)
  const libraryActive = isActive(libraryButton)

  if (libraryActive && finderButton) {
    finderButton.className = finderButton.className
      .replace('bg-slate-100 text-slate-700 hover:bg-slate-200', 'bg-blue-950 text-white')
  }

  if (main && finderActive && libraryButton && !browseExisting) {
    const bar = document.createElement('div')
    bar.dataset.finderBrowseBar = 'true'
    bar.className = 'mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200'
    const note = document.createElement('p')
    note.className = 'text-sm font-bold text-slate-700'
    note.textContent = t(language, 'eventFinderDiscoveryNote', 'Use the quiz first, or browse every event if you already know what you want.')
    bar.appendChild(note)
    bar.appendChild(makeBrowseEventsButton(t(language, 'browseAllEvents', 'Browse all events'), () => libraryButton.click()))
    main.prepend(bar)
  }

  if ((!finderActive || !main) && browseExisting) {
    browseExisting.closest('[data-finder-browse-bar="true"]')?.remove()
  }
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

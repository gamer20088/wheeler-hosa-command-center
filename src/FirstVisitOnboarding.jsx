import { useEffect, useState } from 'react'
import { BookOpen, ClipboardCheck, Search, X } from 'lucide-react'
import { readLanguage, t } from './i18n.js'

const ONBOARDING_STORAGE_KEY = 'wheelerHosaOnboardingSeen'

const STEPS = [
  {
    title: 'Find Event',
    description: 'Take the quick quiz or browse all events.',
    icon: Search,
  },
  {
    title: 'Open Prep Hub',
    description: 'Use free prep packs, resources, and checklists.',
    icon: BookOpen,
  },
  {
    title: 'Practice and submit proof',
    description: 'Use the timer, save practice notes, and submit weekly evidence.',
    icon: ClipboardCheck,
  },
]

function hasSeenOnboarding() {
  try {
    return localStorage.getItem(ONBOARDING_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

function saveOnboardingSeen() {
  try {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true')
  } catch {
    // Onboarding is a convenience only; blocked storage should not break the portal.
  }
}

function findEventButton() {
  const labels = ['Find Event', 'Event Finder', 'Encontrar evento', 'Buscador de eventos']
  return Array.from(document.querySelectorAll('nav[aria-label="Main navigation"] button')).find((button) => {
    const text = (button.textContent || '').replace(/\s+/g, ' ').trim()
    return labels.some((label) => text.includes(label))
  })
}

export function FirstVisitOnboarding() {
  const [open, setOpen] = useState(false)
  const [doNotShowAgain, setDoNotShowAgain] = useState(false)
  const language = readLanguage()

  useEffect(() => {
    if (!hasSeenOnboarding()) setOpen(true)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const closeForSession = () => {
    if (doNotShowAgain) saveOnboardingSeen()
    setOpen(false)
  }

  const startWithFindEvent = () => {
    saveOnboardingSeen()
    setOpen(false)
    window.setTimeout(() => findEventButton()?.click(), 0)
  }

  const toggleDoNotShowAgain = (checked) => {
    setDoNotShowAgain(checked)
    if (checked) saveOnboardingSeen()
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/55 p-3 sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeForSession()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="first-visit-onboarding-title"
        className="w-full max-w-xl rounded-2xl bg-white p-4 text-slate-700 shadow-2xl ring-1 ring-slate-200 sm:p-5"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-rose-900">Wheeler HOSA</p>
            <h2 id="first-visit-onboarding-title" className="mt-1 text-2xl font-black tracking-tight text-blue-950">
              {t(language, 'Welcome to Wheeler HOSA', 'Welcome to Wheeler HOSA')}
            </h2>
            <p className="mt-2 text-sm font-bold leading-5 text-slate-600">
              {t(
                language,
                'Use this portal to choose an event, open prep resources, and track practice.',
                'Use this portal to choose an event, open prep resources, and track practice.',
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={closeForSession}
            aria-label={t(language, 'Close', 'Close')}
            className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-blue-50 hover:text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 grid gap-2.5">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="flex gap-3 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-950">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-950">
                    <span className="mr-1 text-rose-900">{index + 1}.</span>
                    {t(language, step.title, step.title)}
                  </p>
                  <p className="mt-0.5 text-sm font-bold leading-5 text-slate-600">
                    {t(language, step.description, step.description)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm font-bold text-slate-600">
          <input
            type="checkbox"
            checked={doNotShowAgain}
            onChange={(event) => toggleDoNotShowAgain(event.target.checked)}
            className="h-4 w-4 cursor-pointer accent-blue-950"
          />
          {t(language, 'Do not show again', 'Do not show again')}
        </label>

        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
          <button
            type="button"
            onClick={startWithFindEvent}
            className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-xl bg-blue-950 px-4 py-2 text-sm font-black text-white transition hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {t(language, 'Start with Find Event', 'Start with Find Event')}
          </button>
          <button
            type="button"
            onClick={closeForSession}
            className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-black text-slate-800 ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {t(language, 'Close', 'Close')}
          </button>
        </div>
      </section>
    </div>
  )
}

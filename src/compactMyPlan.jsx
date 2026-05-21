import { useEffect, useState } from 'react'
import { AlertTriangle, BookOpen, CalendarCheck, CheckCircle2, ClipboardCheck, Copy, Download, FileText, GraduationCap, MessageSquare, ShieldCheck, Target } from 'lucide-react'
import { getStudentFriendlyGuide } from './babyEventGuide.jsx'
import { getProofExamples } from './proofTracker.jsx'
import { READINESS_LEVELS } from './readinessFlow.jsx'

const SLC_WARNING = 'This portal explains events in student-friendly language. Verify final Georgia SLC requirements with the Wheeler advisor and Georgia HOSA.'
const COMPACT_READINESS_LABELS = ['Exploring', 'Event selected', 'First proof', 'Weekly practice', 'Officer reviewed', 'Mock round', 'SLC-ready']
const READINESS_CHECKLIST = [
  ['guideline', 'Read official guideline'],
  ['mainEvent', 'Picked main event'],
  ['firstAction', 'Completed first action'],
  ['weeklyProof', 'Submitted weekly proof'],
  ['officerFeedback', 'Asked for officer feedback'],
  ['mockRound', 'Completed mock round'],
  ['slcReady', 'Ready for Georgia SLC'],
]
const PLAN_SECTIONS = [
  { id: 'plain', title: 'Plain English Summary', description: 'The event in simple words.', icon: BookOpen },
  { id: 'process', title: 'Competition Process', description: 'Test, upload, presentation, and SLC checks.', icon: CalendarCheck },
  { id: 'requirements', title: 'Requirements', description: 'What you must handle.', icon: ClipboardCheck },
  { id: 'before-slc', title: 'Before Georgia SLC', description: 'What to confirm before competition.', icon: ShieldCheck },
  { id: 'ready', title: 'Ready When', description: 'Signs you are actually prepared.', icon: Target },
  { id: 'training', title: 'Weekly Training', description: 'How to practice each week.', icon: GraduationCap },
  { id: 'evidence', title: 'Evidence to Collect', description: 'Proof to save as you prepare.', icon: FileText },
  { id: 'mistakes', title: 'Common Mistakes', description: 'Problems to avoid early.', icon: AlertTriangle },
  { id: 'feedback', title: 'Officer Feedback', description: 'What to ask after proof review.', icon: MessageSquare },
]

function safeArray(value) {
  return Array.isArray(value) ? value : []
}

function safeText(value, fallback = 'Verify with the Wheeler advisor.') {
  return typeof value === 'string' && value.trim() ? value : fallback
}

function yesNo(value) {
  return value ? 'Yes' : 'No'
}

function listText(items) {
  return safeArray(items).map((item, index) => `${index + 1}. ${item}`).join('\n')
}

function getReadinessStorageKey(eventId) {
  return `wheelerHosaReadiness-${eventId || 'event'}`
}

function cleanReadinessChecks(value) {
  const source = value && typeof value === 'object' ? value : {}
  return READINESS_CHECKLIST.reduce((checks, [id]) => ({ ...checks, [id]: Boolean(source[id]) }), {})
}

function Card({ children, className = '' }) {
  return <section className={`rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5 ${className}`}>{children}</section>
}

function ActionButton({ children, onClick, icon: Icon, variant = 'primary' }) {
  const styles = variant === 'light'
    ? 'bg-white text-slate-950 ring-1 ring-slate-200 hover:bg-blue-50 hover:ring-blue-300'
    : 'bg-blue-950 text-white hover:bg-blue-900'
  return <button type="button" onClick={onClick} className={`inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-blue-300 ${styles}`}>{Icon && <Icon size={16} />}{children}</button>
}

function BulletList({ items }) {
  return <ul className="space-y-2">{safeArray(items).map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700"><CheckCircle2 size={15} className="mt-1 shrink-0 text-blue-900" /><span>{item}</span></li>)}</ul>
}

function SummaryTile({ label, children, className = '' }) {
  return <div className={`rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200 ${className}`}><p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p><div className="mt-1 text-sm font-bold leading-6 text-slate-800">{children}</div></div>
}

function CompactReadiness({ checks, hasEvent }) {
  const activeByLabel = {
    Exploring: true,
    'Event selected': hasEvent,
    'First proof': Boolean(checks.weeklyProof),
    'Weekly practice': Boolean(checks.firstAction),
    'Officer reviewed': Boolean(checks.officerFeedback),
    'Mock round': Boolean(checks.mockRound),
    'SLC-ready': Boolean(checks.slcReady),
  }
  return <div className="flex flex-wrap items-center gap-2">{COMPACT_READINESS_LABELS.flatMap((label, index) => {
    const active = Boolean(activeByLabel[label])
    const step = <span key={label} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-black ring-1 sm:text-sm ${active ? 'bg-blue-50 text-blue-950 ring-blue-200' : 'bg-slate-50 text-slate-600 ring-slate-200'}`}><CheckCircle2 size={14} className={active ? 'text-blue-900' : 'text-slate-400'} />{label}</span>
    const arrow = index < COMPACT_READINESS_LABELS.length - 1 ? <span key={`${label}-arrow`} className="text-sm font-black text-slate-300">-&gt;</span> : null
    return arrow ? [step, arrow] : [step]
  })}</div>
}

function LocalReadinessChecklist({ checks, onToggle, onReset }) {
  return <div className="mt-3 rounded-xl bg-white p-3 ring-1 ring-slate-200"><div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs font-black uppercase tracking-wide text-blue-950">Local readiness checklist</p><button type="button" onClick={onReset} className="w-fit cursor-pointer rounded-lg bg-white px-3 py-1.5 text-xs font-black text-slate-700 ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300">Reset checklist</button></div><div className="mt-3 grid gap-2 sm:grid-cols-2">{READINESS_CHECKLIST.map(([id, label]) => <label key={id} className="flex cursor-pointer items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-200"><input type="checkbox" checked={Boolean(checks[id])} onChange={() => onToggle(id)} className="h-4 w-4 cursor-pointer accent-blue-950" /><span>{label}</span></label>)}</div><p className="mt-3 text-xs font-bold leading-5 text-slate-500">Saved on this device only. Official proof will still need to be submitted through the weekly proof form once links are added.</p></div>
}

function SectionCard({ section, active, onClick }) {
  const Icon = section.icon
  return <button type="button" aria-pressed={active} onClick={onClick} className={`flex min-h-24 cursor-pointer gap-3 rounded-2xl p-3 text-left transition focus:outline-none focus:ring-2 focus:ring-blue-300 sm:p-4 ${active ? 'border-l-4 border-rose-800 bg-sky-50 text-slate-950 ring-2 ring-blue-300' : 'bg-white text-slate-950 ring-1 ring-slate-200 hover:bg-blue-50 hover:ring-blue-300'}`}><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${active ? 'bg-blue-950 text-white' : 'bg-blue-50 text-blue-950'}`}><Icon size={19} /></span><span><span className="block text-sm font-black">{section.title}</span><span className="mt-1 block text-sm leading-5 text-slate-600">{section.description}</span></span></button>
}

function SectionPanel({ activeSection, event, guide }) {
  if (activeSection === 'process') {
    return <div className="grid gap-2 text-sm leading-6 text-slate-700"><p><span className="font-black text-slate-900">Process type:</span> {safeText(event.processType)}</p><p><span className="font-black text-slate-900">Round One:</span> {safeText(event.roundOneType)}</p><p><span className="font-black text-slate-900">Round Two:</span> {safeText(event.roundTwoType)}</p><p><span className="font-black text-slate-900">Test required?</span> {yesNo(event.testRequired)}</p><p><span className="font-black text-slate-900">Upload required?</span> {yesNo(event.digitalUpload)}</p><p><span className="font-black text-slate-900">Presentation required?</span> {yesNo(event.presentationRequired)}</p><p><span className="font-black text-slate-900">SLC note:</span> {safeText(event.slcVerificationNote)}</p><div className="mt-2 rounded-xl bg-amber-50 p-3 font-bold text-amber-950 ring-1 ring-amber-200"><div className="flex gap-2"><AlertTriangle size={16} className="mt-1 shrink-0" /><span>{SLC_WARNING}</span></div></div></div>
  }

  if (activeSection === 'requirements') return <BulletList items={guide.requirementsChecklist} />
  if (activeSection === 'before-slc') return <BulletList items={guide.beforeSlcChecklist} />
  if (activeSection === 'ready') return <BulletList items={guide.readinessSigns} />
  if (activeSection === 'training') return <BulletList items={event.weekly} />
  if (activeSection === 'evidence') return <BulletList items={event.evidence} />
  if (activeSection === 'mistakes') return <BulletList items={event.mistakes} />
  if (activeSection === 'feedback') return <p className="text-sm font-bold leading-6 text-slate-700">After submitting weekly proof, ask an officer to review it and mark your next action before the next meeting.</p>

  return <div className="space-y-4"><p className="text-sm leading-6 text-slate-700">{safeText(guide.babySummary, 'This event summary is still being prepared.')}</p><div><p className="text-xs font-black uppercase tracking-wide text-blue-950">What you actually do</p><div className="mt-2"><BulletList items={guide.whatYouActuallyDo} /></div></div></div>
}

function buildPlanText(event, guide, proofItems) {
  const processLines = [
    `Process type: ${safeText(event.processType)}`,
    `Round One: ${safeText(event.roundOneType)}`,
    `Round Two: ${safeText(event.roundTwoType)}`,
    `Test required? ${yesNo(event.testRequired)}`,
    `Upload required? ${yesNo(event.digitalUpload)}`,
    `Presentation required? ${yesNo(event.presentationRequired)}`,
    `SLC note: ${safeText(event.slcVerificationNote)}`,
  ].join('\n')

  return `Wheeler HOSA Event Plan\n\nSelected event:\n${safeText(event.name, 'Selected event')}\n\nThis week's action:\n${safeText(event.firstAction)}\n\nWeekly proof to submit:\n${listText(proofItems)}\n\nReadiness levels:\n${READINESS_LEVELS.map(([level, text]) => `${level}: ${text}`).join('\n')}\n\nPlain English summary:\n${safeText(guide.babySummary, 'This event summary is still being prepared.')}\n\nWhat you actually do:\n${listText(guide.whatYouActuallyDo)}\n\nRequirements:\n${listText(guide.requirementsChecklist)}\n\nBefore Georgia SLC:\n${listText(guide.beforeSlcChecklist)}\n\nReady when:\n${listText(guide.readinessSigns)}\n\nCompetition process:\n${processLines}\n\nWeekly training plan:\n${listText(event.weekly)}\n\nEvidence to collect:\n${listText(event.evidence)}\n\nCommon mistakes:\n${listText(event.mistakes)}\n\nOfficer feedback next step:\nAfter submitting weekly proof, ask an officer to review it and mark your next action before the next meeting.\n\n${SLC_WARNING}`
}

export function CompactMyPlan({ selectedEvent, setTab }) {
  const [activeSection, setActiveSection] = useState('plain')
  const event = selectedEvent || {}
  const eventId = safeText(event.id, 'hosa-event')
  const [readinessChecks, setReadinessChecks] = useState({})
  const guide = getStudentFriendlyGuide(event)
  const proofItems = getProofExamples(event)
  const planText = buildPlanText(event, guide, proofItems)
  const activeDefinition = PLAN_SECTIONS.find((section) => section.id === activeSection) || PLAN_SECTIONS[0]
  const ActiveIcon = activeDefinition.icon

  useEffect(() => {
    try {
      const raw = localStorage.getItem(getReadinessStorageKey(eventId))
      setReadinessChecks(cleanReadinessChecks(raw ? JSON.parse(raw) : {}))
    } catch {
      setReadinessChecks(cleanReadinessChecks({}))
    }
  }, [eventId])

  function saveReadinessChecks(nextChecks) {
    const cleanChecks = cleanReadinessChecks(nextChecks)
    setReadinessChecks(cleanChecks)
    try {
      localStorage.setItem(getReadinessStorageKey(eventId), JSON.stringify(cleanChecks))
    } catch {
      // Keep the UI usable even if localStorage is unavailable.
    }
  }

  function toggleReadinessCheck(id) {
    saveReadinessChecks({ ...readinessChecks, [id]: !readinessChecks[id] })
  }

  function resetReadinessChecks() {
    if (typeof window !== 'undefined' && !window.confirm('Reset the saved checklist for this event on this device?')) return
    setReadinessChecks(cleanReadinessChecks({}))
    try {
      localStorage.removeItem(getReadinessStorageKey(eventId))
    } catch {
      // Nothing else to clear if localStorage is unavailable.
    }
  }

  async function copyPlan() {
    try {
      await navigator.clipboard.writeText(planText)
      alert('Plan copied.')
    } catch {
      alert('Could not copy. Try downloading instead.')
    }
  }

  function downloadPlan() {
    const blob = new Blob([planText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${safeText(event.id, 'hosa-event')}-hosa-plan.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  return <div className="space-y-4"><Card className="space-y-4"><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-xs font-black uppercase tracking-wide text-blue-950">Selected Event</p><h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">{safeText(event.name, 'Choose an event')}</h2></div><div className="flex flex-col gap-2 sm:flex-row"><ActionButton onClick={() => setTab('proof')} icon={ClipboardCheck}>Go to Proof Tracker</ActionButton><ActionButton onClick={copyPlan} icon={Copy} variant="light">Copy Plan</ActionButton><ActionButton onClick={downloadPlan} icon={Download} variant="light">Download Plan</ActionButton></div></div><SummaryTile label="This Week's Action">{safeText(event.firstAction)}</SummaryTile><div className="grid gap-3 lg:grid-cols-[0.8fr_1.2fr]"><SummaryTile label="Weekly Proof You Should Submit"><BulletList items={proofItems.slice(0, 3)} /></SummaryTile><SummaryTile label="Compact Readiness Progress"><CompactReadiness checks={readinessChecks} hasEvent={Boolean(event.id)} /><LocalReadinessChecklist checks={readinessChecks} onToggle={toggleReadinessCheck} onReset={resetReadinessChecks} /></SummaryTile></div></Card><Card><div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-black uppercase tracking-wide text-blue-950">What do you need next?</p><h3 className="mt-1 text-xl font-black tracking-tight text-slate-950">Choose a section to review</h3></div><p className="text-sm font-bold text-slate-500">Selected: {activeDefinition.title}</p></div><div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{PLAN_SECTIONS.map((section) => <SectionCard key={section.id} section={section} active={section.id === activeSection} onClick={() => setActiveSection(section.id)} />)}</div><section className="mt-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200"><div className="mb-3 flex items-center gap-2"><ActiveIcon size={18} className="text-blue-900" /><h4 className="text-base font-black text-slate-950">{activeDefinition.title}</h4></div><SectionPanel activeSection={activeSection} event={event} guide={guide} /></section></Card></div>
}

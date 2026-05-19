import { useState } from 'react'
import { AlertTriangle, BookOpen, CalendarCheck, CheckCircle2, ClipboardCheck, Copy, Download, FileText, GraduationCap, MessageSquare, ShieldCheck, Target } from 'lucide-react'
import { getStudentFriendlyGuide } from './babyEventGuide.jsx'
import { getProofExamples } from './proofTracker.jsx'
import { READINESS_LEVELS } from './readinessFlow.jsx'

const SLC_WARNING = 'This portal explains events in student-friendly language. Verify final Georgia SLC requirements with the Wheeler advisor and Georgia HOSA.'
const COMPACT_READINESS_LABELS = ['Exploring', 'Event selected', 'First proof', 'Weekly practice', 'Officer reviewed', 'Mock round', 'SLC-ready']
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

function Card({ children, className = '' }) {
  return <section className={`rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5 ${className}`}>{children}</section>
}

function ActionButton({ children, onClick, icon: Icon, variant = 'dark' }) {
  const styles = variant === 'light'
    ? 'bg-white text-slate-950 ring-1 ring-slate-200 hover:bg-slate-50 hover:ring-teal-300'
    : 'bg-slate-950 text-white hover:bg-slate-800'
  return <button type="button" onClick={onClick} className={`inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-teal-300 ${styles}`}>{Icon && <Icon size={16} />}{children}</button>
}

function BulletList({ items }) {
  return <ul className="space-y-2">{safeArray(items).map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700"><CheckCircle2 size={15} className="mt-1 shrink-0 text-teal-500" /><span>{item}</span></li>)}</ul>
}

function SummaryTile({ label, children, className = '' }) {
  return <div className={`rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200 ${className}`}><p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p><div className="mt-1 text-sm font-bold leading-6 text-slate-800">{children}</div></div>
}

function CompactReadiness() {
  return <div className="flex flex-wrap items-center gap-2">{COMPACT_READINESS_LABELS.flatMap((label, index) => {
    const active = index <= 1
    const step = <span key={label} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-black ring-1 sm:text-sm ${active ? 'bg-teal-50 text-teal-900 ring-teal-200' : 'bg-slate-50 text-slate-600 ring-slate-200'}`}><CheckCircle2 size={14} className={active ? 'text-teal-600' : 'text-slate-400'} />{label}</span>
    const arrow = index < COMPACT_READINESS_LABELS.length - 1 ? <span key={`${label}-arrow`} className="text-sm font-black text-slate-300">-&gt;</span> : null
    return arrow ? [step, arrow] : [step]
  })}</div>
}

function SectionCard({ section, active, onClick }) {
  const Icon = section.icon
  return <button type="button" aria-pressed={active} onClick={onClick} className={`flex min-h-28 cursor-pointer gap-3 rounded-2xl p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-teal-300 ${active ? 'bg-slate-950 text-white ring-2 ring-slate-950' : 'bg-white text-slate-950 ring-1 ring-slate-200 hover:bg-teal-50 hover:ring-teal-300'}`}><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${active ? 'bg-teal-400 text-slate-950' : 'bg-teal-100 text-teal-700'}`}><Icon size={19} /></span><span><span className="block text-sm font-black">{section.title}</span><span className={`mt-1 block text-sm leading-5 ${active ? 'text-slate-200' : 'text-slate-600'}`}>{section.description}</span></span></button>
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

  return <div className="space-y-4"><p className="text-sm leading-6 text-slate-700">{safeText(guide.babySummary, 'This event summary is still being prepared.')}</p><div><p className="text-xs font-black uppercase tracking-wide text-teal-700">What you actually do</p><div className="mt-2"><BulletList items={guide.whatYouActuallyDo} /></div></div></div>
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
  const guide = getStudentFriendlyGuide(event)
  const proofItems = getProofExamples(event)
  const planText = buildPlanText(event, guide, proofItems)
  const activeDefinition = PLAN_SECTIONS.find((section) => section.id === activeSection) || PLAN_SECTIONS[0]
  const ActiveIcon = activeDefinition.icon

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

  return <div className="space-y-4"><Card className="space-y-4"><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-xs font-black uppercase tracking-wide text-teal-700">Selected Event</p><h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">{safeText(event.name, 'Choose an event')}</h2></div><div className="flex flex-col gap-2 sm:flex-row"><ActionButton onClick={() => setTab('proof')} icon={ClipboardCheck}>Go to Proof Tracker</ActionButton><ActionButton onClick={copyPlan} icon={Copy} variant="light">Copy Plan</ActionButton><ActionButton onClick={downloadPlan} icon={Download} variant="light">Download Plan</ActionButton></div></div><SummaryTile label="This Week's Action">{safeText(event.firstAction)}</SummaryTile><div className="grid gap-3 lg:grid-cols-[0.8fr_1.2fr]"><SummaryTile label="Weekly Proof You Should Submit"><BulletList items={proofItems.slice(0, 3)} /></SummaryTile><SummaryTile label="Compact Readiness Progress"><CompactReadiness /><p className="mt-2 text-xs font-bold leading-5 text-slate-500">Google Forms will verify proof and officer review once links are added.</p></SummaryTile></div></Card><Card><div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-black uppercase tracking-wide text-teal-700">What do you need next?</p><h3 className="mt-1 text-xl font-black tracking-tight text-slate-950">Choose a section to review</h3></div><p className="text-sm font-bold text-slate-500">Selected: {activeDefinition.title}</p></div><div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{PLAN_SECTIONS.map((section) => <SectionCard key={section.id} section={section} active={section.id === activeSection} onClick={() => setActiveSection(section.id)} />)}</div><section className="mt-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200"><div className="mb-3 flex items-center gap-2"><ActiveIcon size={18} className="text-teal-600" /><h4 className="text-base font-black text-slate-950">{activeDefinition.title}</h4></div><SectionPanel activeSection={activeSection} event={event} guide={guide} /></section></Card></div>
}

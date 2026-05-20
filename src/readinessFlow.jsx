import { CalendarCheck, CheckCircle2, ClipboardCheck, ExternalLink, FileText, Target } from 'lucide-react'
import { PORTAL_LINKS } from './portalConfig.js'

const START_STEPS = [
  ['Take the Event Finder', 'Answer the quick quiz so the portal can suggest realistic events.'],
  ['Pick your main event', 'Choose the event you are most likely to prepare for seriously.'],
  ['Choose a backup event', 'Keep one second-choice event in case the first one is too crowded or too much work.'],
  ['Open My Plan', 'Use your plan to see first actions, proof ideas, and weekly preparation.'],
  ['Submit weekly proof', 'Turn in one small piece of evidence each week that shows you practiced.'],
  ['Get officer feedback', 'Let officers review your proof and tell you what to fix next.'],
  ['Prepare for mock round', 'Practice under competition-style timing before Georgia SLC.'],
]

export const READINESS_LEVELS = [
  ['Level 0: Exploring', 'You are comparing events and learning what each one requires.'],
  ['Level 1: Event selected', 'You picked a main event and know your first action.'],
  ['Level 2: First proof submitted', 'You submitted one piece of practice proof through the weekly proof form.'],
  ['Level 3: Weekly practice started', 'You have a repeating practice routine and proof habit.'],
  ['Level 4: Officer reviewed', 'An officer or advisor has checked your progress and given feedback.'],
  ['Level 5: Mock round complete', 'You completed a practice round with timing, judging, or scoring.'],
  ['Level 6: SLC-ready', 'Your event work, proof, guideline checks, and mock feedback are ready for Georgia SLC.'],
]

function safeText(value, fallback = 'Verify with the Wheeler advisor.') {
  return typeof value === 'string' && value.trim() ? value : fallback
}

function yesNo(value) {
  return value ? 'Yes' : 'No'
}

function MiniCard({ children, className = '' }) {
  return <section className={`rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5 ${className}`}>{children}</section>
}

function FlowButton({ children, onClick, href, icon: Icon }) {
  const className = 'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-950 px-4 py-2 text-sm font-black text-white transition hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300'
  if (href) return <a href={href} className={className}>{Icon && <Icon size={16} />}{children}</a>
  return <button type="button" onClick={onClick} className={className}>{Icon && <Icon size={16} />}{children}</button>
}

export function StartHereSection({ setTab }) {
  return <MiniCard><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-black uppercase tracking-wide text-blue-950">Start Here</p><h2 className="mt-1 text-xl font-black tracking-tight text-slate-950 sm:text-2xl">Use the portal in this order</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Move from event selection to weekly proof and mock-round readiness without guessing what to do next.</p></div><div className="flex flex-col gap-2 sm:flex-row"><FlowButton onClick={() => setTab('finder')} icon={Target}>Take Event Finder</FlowButton><FlowButton onClick={() => setTab('proof')} icon={ClipboardCheck}>Go to Proof Tracker</FlowButton></div></div><div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">{START_STEPS.map(([title, text], index) => <div key={title} className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200"><div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm font-black text-blue-950">{index + 1}</div><h3 className="text-sm font-black text-slate-950">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-700">{text}</p></div>)}</div></MiniCard>
}

export function ReadinessLevels({ selectedEvent, backupEvent, setTab }) {
  return <MiniCard><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-black uppercase tracking-wide text-blue-950">Readiness levels</p><h3 className="mt-1 text-lg font-black text-slate-950">Your path to Georgia SLC-ready</h3><p className="mt-2 text-sm leading-6 text-slate-600">Right now, this portal can guide your checklist. Real proof completion will be verified through Google Forms once links are added.</p></div><FlowButton onClick={() => setTab('proof')} icon={ClipboardCheck}>Go to Proof Tracker</FlowButton></div><div className="mt-5 grid gap-3">{READINESS_LEVELS.map(([level, text], index) => <div key={level} className={`rounded-xl p-3 ring-1 ${index <= 1 ? 'bg-blue-50 ring-blue-200' : 'bg-slate-50 ring-slate-200'}`}><div className="flex gap-3"><CheckCircle2 size={18} className={`mt-0.5 shrink-0 ${index <= 1 ? 'text-blue-900' : 'text-slate-400'}`} /><div><h4 className="text-sm font-black text-slate-950">{level}</h4><p className="mt-1 text-sm leading-6 text-slate-700">{text}</p></div></div></div>)}</div><div className="mt-5 grid gap-3 md:grid-cols-2"><div className="rounded-xl bg-slate-950 p-4 text-white"><p className="text-xs font-black uppercase tracking-wide text-blue-200">Main event</p><p className="mt-1 text-lg font-black">{safeText(selectedEvent?.name, 'Choose an event')}</p></div><div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200"><p className="text-xs font-black uppercase tracking-wide text-slate-500">Backup event</p><p className="mt-1 text-lg font-black text-slate-950">{safeText(backupEvent?.name, 'Use Event Finder to compare a backup')}</p></div></div></MiniCard>
}

export function PlanProcessSummary({ event }) {
  return <MiniCard><h3 className="flex items-center gap-2 text-base font-black text-slate-950"><CalendarCheck size={18} className="text-blue-900" />Competition Process</h3><div className="mt-4 grid gap-2 text-sm leading-6 text-slate-700"><p><span className="font-black text-slate-900">Process type:</span> {safeText(event?.processType)}</p><p><span className="font-black text-slate-900">Test required?</span> {yesNo(event?.testRequired)}</p><p><span className="font-black text-slate-900">Upload required?</span> {yesNo(event?.digitalUpload)}</p><p><span className="font-black text-slate-900">Presentation required?</span> {yesNo(event?.presentationRequired)}</p><p><span className="font-black text-slate-900">SLC note:</span> {safeText(event?.slcVerificationNote)}</p></div></MiniCard>
}

export function ProofActionBar({ setTab }) {
  return <div className="mt-5 flex flex-col gap-2 sm:flex-row"><FlowButton onClick={() => setTab('proof')} icon={ClipboardCheck}>Go to Proof Tracker</FlowButton><FlowButton href={PORTAL_LINKS.weeklyProofForm} icon={FileText}>Submit Weekly Proof</FlowButton></div>
}

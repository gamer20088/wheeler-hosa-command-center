import { AlertTriangle, CalendarCheck, CheckCircle2, ClipboardCheck, ExternalLink, FileText, ShieldCheck } from 'lucide-react'

export const PROOF_LINKS = {
  weeklyProofForm: '#',
  weeklyReminder: '#',
  proofCalendar: '#',
  officerTrackerSheet: '#',
  officerFeedbackForm: '#',
  mockRoundScoreForm: '#',
}

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

function safeArray(value) {
  return Array.isArray(value) ? value : []
}

function Card({ children, className = '' }) {
  return <section className={cx('rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5', className)}>{children}</section>
}

function SectionHeader({ icon: Icon, title, subtitle }) {
  return <div className="flex gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700"><Icon size={21} /></div><div><h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">{title}</h2>{subtitle && <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p>}</div></div>
}

function ProofList({ title, items, icon: Icon = CheckCircle2 }) {
  return <div><h3 className="mb-3 flex items-center gap-2 text-sm font-black text-slate-950"><Icon size={17} className="text-teal-600" />{title}</h3><div className="space-y-2">{safeArray(items).map((item) => <div key={item} className="flex gap-2 text-sm leading-6 text-slate-700"><CheckCircle2 size={15} className="mt-1 shrink-0 text-teal-500" /><span>{item}</span></div>)}</div></div>
}

function ProofLinkCard({ title, text, button, href, icon: Icon }) {
  return <a href={href} className="flex min-h-44 cursor-pointer flex-col justify-between rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-slate-200 transition hover:bg-teal-50 hover:ring-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300"><div><div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-700"><Icon size={21} /></div><h3 className="text-base font-black text-slate-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-700">{text}</p></div><span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-teal-700">{button}<ExternalLink size={14} /></span></a>
}

export function getProofExamples(event = {}) {
  const examples = []
  if (event.testRequired) examples.push('practice test score', 'weak-topic list', 'screenshot of study set or notes')
  if (event.digitalUpload) examples.push('draft upload file', 'screenshot of portfolio, poster, campaign, or project progress', 'advisor deadline confirmation')
  if (event.presentationRequired) examples.push('speech or presentation recording', 'timing sheet', 'mock presentation feedback')
  if (event.teamEvent || event.team !== 'Solo') examples.push('team task list', 'meeting notes', 'division of work screenshot')
  if (event.preJudged) examples.push('polished draft before upload', 'evidence that file format was checked')
  if (!examples.length) examples.push('study log or reflection', 'officer-reviewed checklist', 'mock round notes')
  return Array.from(new Set(examples))
}

export function ProofExamplesList({ event }) {
  return <ProofList title="Good Proof for This Event" items={getProofExamples(event).slice(0, 5)} icon={ClipboardCheck} />
}

export function proofPlanText(event) {
  const proofItems = getProofExamples(event).map((item, index) => `${index + 1}. ${item}`).join('\n')
  return `Weekly proof to submit:\n${proofItems}\n\nProof Code:\nHOSA-PROOF-2026\nUse this code on the form so officers know the submission came from Wheeler HOSA.`
}

export function ProofPlanSection({ event }) {
  return <Card><ProofList title="Weekly Proof You Should Submit" items={getProofExamples(event)} icon={ClipboardCheck} /><div className="mt-4 rounded-xl bg-teal-50 p-3 ring-1 ring-teal-100"><p className="text-xs font-black uppercase tracking-wide text-teal-700">Proof Code</p><p className="mt-1 text-lg font-black text-teal-950">HOSA-PROOF-2026</p><p className="mt-1 text-sm font-bold leading-6 text-teal-950">Use this code on the form so officers know the submission came from Wheeler HOSA.</p></div></Card>
}

export function ProofTracker({ selectedEvent }) {
  const proofCounts = ['quiz score or practice test screenshot', 'writing draft or outline', 'speech recording', 'poster or portfolio draft', 'campaign evidence', 'photo/video proof of practice', 'mock round notes', 'study log or reflection', 'officer-reviewed checklist']
  return <div className="space-y-5"><Card><SectionHeader icon={ClipboardCheck} title="Proof Tracker" subtitle="Submit weekly proof that you are actually preparing." /><p className="mt-5 max-w-3xl text-sm leading-6 text-slate-700">Each week, submit one piece of proof that shows you practiced your event. Officers use proof submissions to review progress, give feedback, and see who is ready for mock rounds or Georgia SLC.</p><div className="mt-5 grid gap-3 md:grid-cols-3"><ProofLinkCard title="Submit Weekly Proof" button="Open Weekly Proof Form" href={PROOF_LINKS.weeklyProofForm} icon={ClipboardCheck} text="Submit one piece of evidence that you practiced your event this week." /><ProofLinkCard title="Add Weekly Reminder" button="Add Calendar Reminder" href={PROOF_LINKS.weeklyReminder} icon={CalendarCheck} text="Add a weekly reminder so you do not forget proof submissions." /><ProofLinkCard title="View Proof Calendar" button="Open Proof Calendar" href={PROOF_LINKS.proofCalendar} icon={CalendarCheck} text="Check weekly proof deadlines, mock rounds, and SLC prep dates." /></div></Card><div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]"><Card><ProofList title="What Counts as Proof?" items={proofCounts} icon={CheckCircle2} /></Card><Card><ProofList title="Good proof for your selected event" items={getProofExamples(selectedEvent)} icon={FileText} /></Card></div><Card className="bg-amber-50 ring-amber-200"><SectionHeader icon={AlertTriangle} title="Privacy reminder" subtitle="Keep proof submissions about competition preparation only." /><div className="mt-4 space-y-3 text-sm font-bold leading-6 text-amber-950"><p>Do not submit medical, personal health, family, or private information. Submit only competition preparation proof.</p><p>Real student submissions should be stored in private Google Forms, Sheets, and Drive folders owned by the HOSA Gmail or advisor account.</p></div></Card></div>
}

export function ProofOfficerWorkflow() {
  const proofTools = [['Open Tracker Sheet', PROOF_LINKS.officerTrackerSheet], ['Open Feedback Form', PROOF_LINKS.officerFeedbackForm], ['Open Mock Score Form', PROOF_LINKS.mockRoundScoreForm]]
  return <Card><SectionHeader icon={ShieldCheck} title="Officer proof workflow" subtitle="Review weekly proof, feedback, and mock-round readiness." /><div className="mt-5 grid gap-3 sm:grid-cols-3">{proofTools.map(([label, url]) => <a key={label} href={url} className="flex min-h-24 cursor-pointer items-center justify-between rounded-2xl bg-slate-50 p-4 text-left font-black text-slate-950 ring-1 ring-slate-200 transition hover:bg-teal-50 hover:ring-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300">{label}<ExternalLink size={15} className="text-teal-700" /></a>)}</div><p className="mt-4 text-sm font-bold leading-6 text-slate-700">Officers should replace these placeholder links with Google Forms, Sheets, and Calendar links owned by the HOSA Gmail or advisor account.</p></Card>
}

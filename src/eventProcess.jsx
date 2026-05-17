import { CalendarCheck, CheckCircle2, ChevronDown, ClipboardCheck, ClipboardList, Search } from 'lucide-react'
import { useState } from 'react'

export const DEFAULT_PROCESS = {
  processType: 'Verify Georgia SLC Rules',
  roundOneType: 'Verify event process with Wheeler advisor.',
  roundTwoType: 'Verify event process with Wheeler advisor.',
  digitalUpload: false,
  testRequired: false,
  preJudged: false,
  presentationRequired: false,
  recognitionEvent: false,
  slcVerificationNote: 'Verify Georgia SLC process with Wheeler advisor.',
}

const PROCESS_OVERRIDES = {
  'research-poster': { processType: 'Pre-Judged Upload + Presentation', roundOneType: 'PDF poster pre-judged upload', roundTwoType: 'Presentation', digitalUpload: true, preJudged: true, presentationRequired: true, slcVerificationNote: 'Check Georgia HOSA/Wheeler advisor for SLC upload deadlines, testing rules, and state-level process.' },
  'researched-persuasive-writing-speaking': { processType: 'Pre-Judged Paper + Speech', roundOneType: 'Speech, with paper pre-judged digitally', roundTwoType: 'Not a separate test round in the student-facing summary', digitalUpload: true, preJudged: true, presentationRequired: true, slcVerificationNote: 'Check Georgia HOSA/Wheeler advisor for SLC upload deadlines, testing rules, and state-level process.' },
  'medical-reading': { processType: 'Test Event', roundOneType: '50-question test in 60 minutes', roundTwoType: 'None', testRequired: true, slcVerificationNote: 'Verify Georgia SLC testing process with Wheeler advisor.' },
  'healthcare-issues-exam': { processType: 'Recognition Exam', roundOneType: '50-question test in 60 minutes', roundTwoType: 'None', testRequired: true, recognitionEvent: true, slcVerificationNote: 'Recognition rules and state testing process should be verified with Georgia HOSA/Wheeler advisor.' },
  'medical-law-ethics': { processType: 'Test Event', roundOneType: '50-question test in 60 minutes', roundTwoType: 'None', testRequired: true, slcVerificationNote: 'Verify Georgia SLC testing process with Wheeler advisor.' },
  epidemiology: { processType: 'Test Event', roundOneType: '50-question test in 60 minutes', roundTwoType: 'None', testRequired: true, slcVerificationNote: 'Verify Georgia SLC testing process with Wheeler advisor.' },
  nutrition: { processType: 'Test Event', roundOneType: '50-question test in 60 minutes', roundTwoType: 'None', testRequired: true, slcVerificationNote: 'Verify Georgia SLC testing process with Wheeler advisor.' },
  'human-growth-development': { processType: 'Test Event', roundOneType: '50-question test in 60 minutes', roundTwoType: 'None', testRequired: true, slcVerificationNote: 'Verify Georgia SLC testing process with Wheeler advisor.' },
  'healthcare-administration': { processType: 'Test Event', roundOneType: '50-question test in 60 minutes', roundTwoType: 'None', testRequired: true, slcVerificationNote: 'Verify Georgia SLC testing process with Wheeler advisor.' },
  'health-career-photography': { processType: 'Pre-Judged Portfolio + Presentation', roundOneType: 'Portfolio of photos pre-judged upload', roundTwoType: 'Presentation', digitalUpload: true, preJudged: true, presentationRequired: true, slcVerificationNote: 'Check Georgia HOSA/Wheeler advisor for SLC upload deadlines, testing rules, and state-level process.' },
}

export function safeArray(value) {
  return Array.isArray(value) ? value : []
}

export function safeText(value, fallback = '') {
  return typeof value === 'string' && value.trim() ? value : fallback
}

export function yesNo(value) {
  return value ? 'Yes' : 'No'
}

export function normalizeEvents(events) {
  return safeArray(events).map((event) => ({ ...DEFAULT_PROCESS, ...event, ...(PROCESS_OVERRIDES[event.id] || {}) }))
}

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

function MiniCard({ children, className = '' }) {
  return <section className={cx('rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5', className)}>{children}</section>
}

function MiniButton({ children, onClick, variant = 'primary', icon: Icon, className = '' }) {
  return <button onClick={onClick} className={cx('inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-teal-300', variant === 'primary' && 'bg-teal-500 text-white hover:bg-teal-600', variant === 'light' && 'bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-teal-50 hover:ring-teal-300', className)}>{Icon && <Icon size={16} />}{children}</button>
}

function Select({ label, value, options, onChange }) {
  return <label className="block"><span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-600">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="h-11 w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition hover:border-teal-300 hover:bg-teal-50/40 focus:ring-2 focus:ring-teal-300">{options.map((option) => <option key={option}>{option}</option>)}</select></label>
}

function ProcessBadge({ children }) {
  return <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-700 ring-1 ring-slate-200">{children}</span>
}

function ProcessBadges({ event }) {
  const badges = []
  if (event.testRequired) badges.push('Test')
  if (event.digitalUpload) badges.push('Upload')
  if (event.preJudged) badges.push('Pre-Judged')
  if (event.presentationRequired) badges.push('Presentation')
  if (event.recognitionEvent) badges.push('Recognition')
  badges.push('Verify SLC')
  return <div className="mt-3 flex flex-wrap gap-2">{badges.map((badge) => <ProcessBadge key={badge}>{badge}</ProcessBadge>)}</div>
}

function ProcessDetails({ event }) {
  return <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200"><h3 className="text-sm font-black text-slate-950">Competition Process</h3><div className="mt-3 grid gap-2 text-sm leading-6 text-slate-700"><p><span className="font-black text-slate-900">Process Type:</span> {safeText(event.processType, DEFAULT_PROCESS.processType)}</p><p><span className="font-black text-slate-900">Round One:</span> {safeText(event.roundOneType, DEFAULT_PROCESS.roundOneType)}</p><p><span className="font-black text-slate-900">Round Two:</span> {safeText(event.roundTwoType, DEFAULT_PROCESS.roundTwoType)}</p><p><span className="font-black text-slate-900">Test required?</span> {yesNo(event.testRequired)}</p><p><span className="font-black text-slate-900">Digital upload required?</span> {yesNo(event.digitalUpload)}</p><p><span className="font-black text-slate-900">Presentation required?</span> {yesNo(event.presentationRequired)}</p><p><span className="font-black text-slate-900">SLC note:</span> {safeText(event.slcVerificationNote, DEFAULT_PROCESS.slcVerificationNote)}</p></div></div>
}

function ListBlock({ title, items, icon: Icon = CheckCircle2 }) {
  return <div><h3 className="mb-3 flex items-center gap-2 text-sm font-black text-slate-950"><Icon size={17} className="text-teal-600" />{title}</h3><div className="space-y-2">{safeArray(items).map((item) => <div key={item} className="flex gap-2 text-sm leading-6 text-slate-700"><CheckCircle2 size={15} className="mt-1 shrink-0 text-teal-500" /><span>{item}</span></div>)}</div></div>
}

export function EnhancedEventLibrary({ events, selectedEventId, setSelectedEventId, setTab }) {
  const [filters, setFilters] = useState({ query: '', track: 'All', difficulty: 'All', team: 'All', commitment: 'All', process: 'All' })
  const [expandedId, setExpandedId] = useState(null)
  const normalizedEvents = normalizeEvents(events)
  const tracks = ['All', ...Array.from(new Set(normalizedEvents.map((event) => safeText(event.track, 'Verify track with advisor')))).sort()]
  const difficulties = ['All', 'Low to Medium', 'Medium', 'Medium to High', 'High']
  const processMatches = (event) => {
    if (filters.process === 'All') return true
    if (filters.process === 'Test Event') return event.testRequired || event.processType === 'Test Event'
    if (filters.process === 'Pre-Judged Upload') return event.preJudged || event.digitalUpload || safeText(event.processType).includes('Pre-Judged')
    if (filters.process === 'Presentation Event') return event.presentationRequired || safeText(event.processType).includes('Presentation')
    if (filters.process === 'Recognition Exam') return event.recognitionEvent || event.processType === 'Recognition Exam'
    if (filters.process === 'No Upload') return !event.digitalUpload
    if (filters.process === 'Verify SLC Rules') return true
    return true
  }
  const filteredEvents = normalizedEvents.filter((event) => {
    const teamType = event.team === 'Solo' ? 'Solo' : 'Team event'
    const haystack = `${event.name} ${event.track} ${event.format} ${safeArray(event.bestFor).join(' ')}`.toLowerCase()
    return haystack.includes(filters.query.toLowerCase()) && (filters.track === 'All' || event.track === filters.track) && (filters.difficulty === 'All' || event.difficulty === filters.difficulty) && (filters.team === 'All' || teamType === filters.team) && (filters.commitment === 'All' || event.commitment === filters.commitment) && processMatches(event)
  })

  return <div className="space-y-5"><MiniCard><div className="grid gap-4 lg:grid-cols-[1fr_2fr] lg:items-end"><div className="flex gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700"><ClipboardList size={21} /></div><div><h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">Event Library</h2><p className="mt-1 text-sm leading-6 text-slate-500">Browse useful information first. Open a card for details.</p></div></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6"><label className="block sm:col-span-2 xl:col-span-1"><span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-600">Search</span><div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input aria-label="Search events" value={filters.query} onChange={(event) => setFilters({ ...filters, query: event.target.value })} placeholder="Search" className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none transition hover:border-teal-300 focus:ring-2 focus:ring-teal-300" /></div></label><Select label="Track" value={filters.track} options={tracks} onChange={(track) => setFilters({ ...filters, track })} /><Select label="Difficulty" value={filters.difficulty} options={difficulties} onChange={(difficulty) => setFilters({ ...filters, difficulty })} /><Select label="Format" value={filters.team} options={['All', 'Solo', 'Team event']} onChange={(team) => setFilters({ ...filters, team })} /><Select label="Commitment" value={filters.commitment} options={['All', 'Low lift', 'Serious', 'High commitment', 'Only for locked-in teams']} onChange={(commitment) => setFilters({ ...filters, commitment })} /><Select label="Process" value={filters.process} options={['All', 'Test Event', 'Pre-Judged Upload', 'Presentation Event', 'Recognition Exam', 'No Upload', 'Verify SLC Rules']} onChange={(process) => setFilters({ ...filters, process })} /></div></div></MiniCard><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filteredEvents.map((event) => { const expanded = expandedId === event.id; return <MiniCard key={event.id} className={cx('transition hover:ring-teal-300', selectedEventId === event.id && 'ring-2 ring-teal-400')}><div className="flex items-start justify-between gap-3"><div><h3 className="text-lg font-black text-slate-950">{safeText(event.name, 'Untitled event')}</h3><p className="mt-1 text-sm font-semibold text-teal-700">{safeText(event.track, 'Verify track with advisor')}</p></div><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-700">{event.time || 4}+ hrs</span></div><ProcessBadges event={event} /><div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold text-slate-600"><span className="rounded-lg bg-slate-50 p-2 ring-1 ring-slate-200">{safeText(event.difficulty, 'Verify')}</span><span className="rounded-lg bg-slate-50 p-2 ring-1 ring-slate-200">{event.team === 'Solo' ? 'Solo' : 'Team'}</span></div><p className="mt-3 text-sm leading-6 text-slate-700">{safeText(event.why, 'Review this event with the Wheeler advisor.')}</p>{expanded && <div className="mt-4 space-y-4 border-t border-slate-200 pt-4"><ProcessDetails event={event} /><ListBlock title="This week's first action" items={[safeText(event.firstAction, 'Review the official guideline and ask the advisor what to verify first.')]} icon={CalendarCheck} /><ListBlock title="Evidence to collect" items={event.evidence} icon={ClipboardCheck} /></div>}<div className="mt-4 flex gap-2"><MiniButton onClick={() => setExpandedId(expanded ? null : event.id)} variant="light" className="flex-1" icon={ChevronDown}>{expanded ? 'Hide details' : 'Details'}</MiniButton><MiniButton onClick={() => { setSelectedEventId(event.id); setTab('plan') }} className="flex-1">Use event</MiniButton></div></MiniCard> })}</div></div>
}

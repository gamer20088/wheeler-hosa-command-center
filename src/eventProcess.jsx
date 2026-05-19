import { CalendarCheck, CheckCircle2, ClipboardCheck, ClipboardList, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'

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

export const VERIFIED_EVENT_PROCESS = {
  'Extemporaneous Writing': { processType: 'On-Site Writing', roundOneType: 'Write a response during the competition.', roundTwoType: 'None listed in student summary.', digitalUpload: false, testRequired: false, preJudged: false, presentationRequired: false, recognitionEvent: false, teamEvent: false, slcVerificationNote: 'Verify Georgia SLC timing, writing format, and device rules with the Wheeler advisor.' },
  'Medical Terminology': { processType: 'Written Test', roundOneType: 'Medical terminology written test.', roundTwoType: 'None listed in student summary.', digitalUpload: false, testRequired: true, preJudged: false, presentationRequired: false, recognitionEvent: false, teamEvent: false, slcVerificationNote: 'Verify Georgia SLC testing procedures with the Wheeler advisor.' },
  'Behavioral Health': { processType: 'Written Test', roundOneType: 'Behavioral health written test.', roundTwoType: 'None listed in student summary.', digitalUpload: false, testRequired: true, preJudged: false, presentationRequired: false, recognitionEvent: false, teamEvent: false, slcVerificationNote: 'Verify Georgia SLC testing procedures with the Wheeler advisor.' },
  'Medical Math': { processType: 'Written Test', roundOneType: 'Medical math written test.', roundTwoType: 'None listed in student summary.', digitalUpload: false, testRequired: true, preJudged: false, presentationRequired: false, recognitionEvent: false, teamEvent: false, slcVerificationNote: 'Verify Georgia SLC testing procedures and calculator rules with the Wheeler advisor.' },
  'Health Informatics': { processType: 'Written Test', roundOneType: 'Health informatics written test.', roundTwoType: 'None listed in student summary.', digitalUpload: false, testRequired: true, preJudged: false, presentationRequired: false, recognitionEvent: false, teamEvent: false, slcVerificationNote: 'Verify Georgia SLC testing procedures with the Wheeler advisor.' },
  'World Health and Disparities': { processType: 'Written Test', roundOneType: 'World health and disparities written test.', roundTwoType: 'None listed in student summary.', digitalUpload: false, testRequired: true, preJudged: false, presentationRequired: false, recognitionEvent: false, teamEvent: false, slcVerificationNote: 'Verify Georgia SLC testing procedures with the Wheeler advisor.' },
  'Prepared Speaking': { processType: 'Prepared Speech', roundOneType: 'Prepared speech to judges.', roundTwoType: 'None listed in student summary.', digitalUpload: false, testRequired: false, preJudged: false, presentationRequired: true, recognitionEvent: false, teamEvent: false, slcVerificationNote: 'Verify Georgia SLC speech topic, timing, and room procedures with the Wheeler advisor.' },
  'Health Education': { processType: 'Portfolio + Presentation', roundOneType: 'Portfolio and health lesson project.', roundTwoType: 'Team presentation to judges.', digitalUpload: true, testRequired: false, preJudged: true, presentationRequired: true, recognitionEvent: false, teamEvent: true, slcVerificationNote: 'Verify Georgia SLC portfolio upload deadlines and presentation procedures with the Wheeler advisor.' },
  'Community Awareness': { processType: 'Campaign Portfolio + Presentation', roundOneType: 'Community campaign portfolio.', roundTwoType: 'Team presentation to judges.', digitalUpload: true, testRequired: false, preJudged: true, presentationRequired: true, recognitionEvent: false, teamEvent: true, slcVerificationNote: 'Verify Georgia SLC portfolio upload deadlines and presentation procedures with the Wheeler advisor.' },
  'Public Health': { processType: 'Public Health Project + Presentation', roundOneType: 'Public health project materials and video/trailer component.', roundTwoType: 'Team presentation to judges.', digitalUpload: true, testRequired: false, preJudged: true, presentationRequired: true, recognitionEvent: false, teamEvent: true, slcVerificationNote: 'Verify Georgia SLC upload deadlines, setup rules, and presentation procedures with the Wheeler advisor.' },
  'Mental Health Promotion': { processType: 'Campaign + Presentation', roundOneType: 'Mental health promotion campaign materials.', roundTwoType: 'Team presentation to judges.', digitalUpload: true, testRequired: false, preJudged: true, presentationRequired: true, recognitionEvent: false, teamEvent: true, slcVerificationNote: 'Verify Georgia SLC campaign upload deadlines and presentation procedures with the Wheeler advisor.' },
  'Public Service Announcement': { processType: 'PSA Upload + Presentation', roundOneType: 'PSA materials are submitted before competition.', roundTwoType: 'Team presentation to judges.', digitalUpload: true, testRequired: false, preJudged: true, presentationRequired: true, recognitionEvent: false, teamEvent: true, slcVerificationNote: 'Verify Georgia SLC PSA upload deadlines, file/link rules, and presentation procedures with the Wheeler advisor.' },
  'Medical Innovation': { processType: 'Innovation Project + Presentation', roundOneType: 'Innovation outline or project materials submitted before competition.', roundTwoType: 'Team presentation with display or exhibit items.', digitalUpload: true, testRequired: false, preJudged: false, presentationRequired: true, recognitionEvent: false, teamEvent: true, slcVerificationNote: 'Verify Georgia SLC innovation outline deadlines, display rules, and presentation procedures with the Wheeler advisor.' },
  'HOSA Bowl': { processType: 'Team Test + Buzzer Round', roundOneType: 'Team written test.', roundTwoType: 'Buzzer round for advancing teams.', digitalUpload: false, testRequired: true, preJudged: false, presentationRequired: false, recognitionEvent: false, teamEvent: true, slcVerificationNote: 'Verify Georgia SLC testing and buzzer round procedures with the Wheeler advisor.' },
  'Biomedical Debate': { processType: 'Team Test + Debate', roundOneType: 'Team written test.', roundTwoType: 'Debate round for advancing teams.', digitalUpload: false, testRequired: true, preJudged: false, presentationRequired: true, recognitionEvent: false, teamEvent: true, slcVerificationNote: 'Verify Georgia SLC testing and debate procedures with the Wheeler advisor.' },
  'Forensic Science': { processType: 'Team Test + Case Analysis', roundOneType: 'Team written test.', roundTwoType: 'Forensic analysis round for advancing teams.', digitalUpload: false, testRequired: true, preJudged: false, presentationRequired: false, recognitionEvent: false, teamEvent: true, slcVerificationNote: 'Verify Georgia SLC testing, analysis, and laptop/device procedures with the Wheeler advisor.' },
  'Health Career Display': { processType: 'Display Project + Presentation', roundOneType: 'Display outline or display materials submitted before competition.', roundTwoType: 'Team presentation with display board.', digitalUpload: true, testRequired: false, preJudged: false, presentationRequired: true, recognitionEvent: false, teamEvent: true, slcVerificationNote: 'Verify Georgia SLC display upload deadlines and presentation procedures with the Wheeler advisor.' },
  'Research Poster': { processType: 'Poster Upload + Presentation', roundOneType: 'Research poster PDF is submitted before competition.', roundTwoType: 'Poster setup and presentation.', digitalUpload: true, testRequired: false, preJudged: true, presentationRequired: true, recognitionEvent: false, teamEvent: false, slcVerificationNote: 'Verify Georgia SLC poster upload deadlines and presentation procedures with the Wheeler advisor.' },
  'Researched Persuasive Writing and Speaking': { processType: 'Paper Upload + Speech', roundOneType: 'Written paper is submitted before competition.', roundTwoType: 'Prepared speech to judges.', digitalUpload: true, testRequired: false, preJudged: true, presentationRequired: true, recognitionEvent: false, teamEvent: false, slcVerificationNote: 'Verify Georgia SLC paper upload deadlines and speech procedures with the Wheeler advisor.' },
  'Medical Reading': { processType: 'Written Test', roundOneType: 'Medical reading written test.', roundTwoType: 'None listed in student summary.', digitalUpload: false, testRequired: true, preJudged: false, presentationRequired: false, recognitionEvent: false, teamEvent: false, slcVerificationNote: 'Verify Georgia SLC testing procedures with the Wheeler advisor.' },
  'Healthcare Issues Exam': { processType: 'Recognition Exam', roundOneType: 'Healthcare issues written recognition exam.', roundTwoType: 'None listed in student summary.', digitalUpload: false, testRequired: true, preJudged: false, presentationRequired: false, recognitionEvent: true, teamEvent: false, slcVerificationNote: 'Verify Georgia SLC recognition exam procedures with the Wheeler advisor.' },
  'Medical Law and Ethics': { processType: 'Written Test', roundOneType: 'Medical law and ethics written test.', roundTwoType: 'None listed in student summary.', digitalUpload: false, testRequired: true, preJudged: false, presentationRequired: false, recognitionEvent: false, teamEvent: false, slcVerificationNote: 'Verify Georgia SLC testing procedures with the Wheeler advisor.' },
  Epidemiology: { processType: 'Written Test', roundOneType: 'Epidemiology written test.', roundTwoType: 'None listed in student summary.', digitalUpload: false, testRequired: true, preJudged: false, presentationRequired: false, recognitionEvent: false, teamEvent: false, slcVerificationNote: 'Verify Georgia SLC testing procedures with the Wheeler advisor.' },
  Nutrition: { processType: 'Written Test', roundOneType: 'Nutrition written test.', roundTwoType: 'None listed in student summary.', digitalUpload: false, testRequired: true, preJudged: false, presentationRequired: false, recognitionEvent: false, teamEvent: false, slcVerificationNote: 'Verify Georgia SLC testing procedures with the Wheeler advisor.' },
  'Human Growth and Development': { processType: 'Written Test', roundOneType: 'Human growth and development written test.', roundTwoType: 'None listed in student summary.', digitalUpload: false, testRequired: true, preJudged: false, presentationRequired: false, recognitionEvent: false, teamEvent: false, slcVerificationNote: 'Verify Georgia SLC testing procedures with the Wheeler advisor.' },
  'Healthcare Administration': { processType: 'Written Test', roundOneType: 'Healthcare administration written test.', roundTwoType: 'None listed in student summary.', digitalUpload: false, testRequired: true, preJudged: false, presentationRequired: false, recognitionEvent: false, teamEvent: false, slcVerificationNote: 'Verify Georgia SLC testing procedures with the Wheeler advisor.' },
  'Health Career Photography': { processType: 'Portfolio Upload + Presentation', roundOneType: 'Photo portfolio is submitted before competition.', roundTwoType: 'Presentation to judges.', digitalUpload: true, testRequired: false, preJudged: true, presentationRequired: true, recognitionEvent: false, teamEvent: false, slcVerificationNote: 'Verify Georgia SLC portfolio upload deadlines and presentation procedures with the Wheeler advisor.' },
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

export function getProofExamples(event = {}) {
  const examples = []
  if (event.testRequired) examples.push('practice test score', 'weak-topic list', 'screenshot of study set or notes')
  if (event.digitalUpload) examples.push('draft upload file', 'screenshot of portfolio, poster, campaign, or project progress', 'advisor deadline confirmation')
  if (event.presentationRequired) examples.push('speech or presentation recording', 'timing sheet', 'mock presentation feedback')
  if (event.teamEvent || event.team !== 'Solo') examples.push('team task list', 'meeting notes', 'division of work screenshot')
  if (event.preJudged) examples.push('polished draft before upload', 'evidence that file format was checked')
  return Array.from(new Set(examples)).slice(0, 5)
}

const STUDENT_GUIDE_WARNING = 'This portal explains events in student-friendly language. It does not replace official HOSA guidelines. Georgia SLC deadlines, uploads, and procedures must be verified with the Wheeler advisor and Georgia HOSA.'

export function normalizeEvents(events) {
  return safeArray(events).map((event) => {
    const verifiedProcess = VERIFIED_EVENT_PROCESS[safeText(event?.name)]
    return { ...DEFAULT_PROCESS, ...event, ...(verifiedProcess || {}), processVerified: Boolean(verifiedProcess) }
  })
}

export function getProcessCoverage(events) {
  const normalizedEvents = normalizeEvents(events)
  return {
    totalActiveEvents: normalizedEvents.length,
    verifiedEvents: normalizedEvents.filter((event) => event.processVerified).length,
    fallbackEvents: normalizedEvents.filter((event) => !event.processVerified).map((event) => safeText(event.name, 'Untitled event')),
  }
}

function isTeamEvent(event) {
  return safeText(event.team, '').toLowerCase() !== 'solo'
}

function uniqueList(items) {
  return Array.from(new Set(safeArray(items).filter(Boolean)))
}

export function getStudentFriendlyGuide(event) {
  const normalizedEvent = { ...DEFAULT_PROCESS, ...event, ...(VERIFIED_EVENT_PROCESS[safeText(event?.name)] || {}) }
  const eventName = safeText(normalizedEvent.name, 'this event')
  const firstAction = safeText(normalizedEvent.firstAction, 'Read the official guideline and ask the Wheeler advisor what to verify first.')
  const weeklyTraining = safeArray(normalizedEvent.weekly).length ? safeArray(normalizedEvent.weekly) : safeArray(normalizedEvent.weeklyTraining)
  const evidence = safeArray(normalizedEvent.evidence).length ? safeArray(normalizedEvent.evidence) : safeArray(normalizedEvent.evidenceToCollect)
  const mistakes = safeArray(normalizedEvent.mistakes).length ? safeArray(normalizedEvent.mistakes) : safeArray(normalizedEvent.commonMistakes)

  const work = []
  const requirements = ['Read the official event guideline before committing.', 'Ask the Wheeler advisor what Georgia SLC changes or deadlines apply.']
  const beforeSlc = ['Confirm registration, deadline, dress code, and event process with the Wheeler advisor.', safeText(normalizedEvent.slcVerificationNote, DEFAULT_PROCESS.slcVerificationNote)]
  const readiness = ['You can explain the event rules in your own words.', 'You have practiced under a timer or mock-round setup.', 'Your evidence, notes, or study log is organized.']

  if (normalizedEvent.testRequired) {
    work.push('Study the event topics, learn the vocabulary, and practice timed questions.')
    requirements.push('Know the main topics, take practice tests, and review weak areas instead of only rereading notes.')
    readiness.push('Your timed practice scores are steady and your missed-question list is shrinking.')
  }
  if (normalizedEvent.digitalUpload) {
    work.push('Create something that must be finished and submitted before competition.')
    requirements.push('Ask for the Georgia SLC upload deadline, finish early, and check the required file format.')
    beforeSlc.push('Upload early enough to fix file, link, naming, or format problems.')
    readiness.push('Your final upload file is complete, named clearly, and checked by an advisor or officer.')
  }
  if (normalizedEvent.preJudged) {
    work.push('Polish the upload because judges may score part of it before the live round.')
    requirements.push('Treat the upload like final competition work, not a rough draft.')
  }
  if (normalizedEvent.presentationRequired) {
    work.push('Practice explaining your work out loud so judges can follow it quickly.')
    requirements.push('Do at least one mock presentation, time it, and practice judge questions.')
    readiness.push('You can present within time and answer basic judge questions without freezing.')
  }
  if (normalizedEvent.recognitionEvent) {
    work.push('Verify how Georgia HOSA recognizes this event before you choose it.')
    requirements.push('Confirm recognition rules with the Wheeler advisor.')
  }
  if (isTeamEvent(normalizedEvent)) {
    work.push('Divide jobs early so the team is not waiting on one person.')
    requirements.push('Set team roles, check-in dates, and a backup plan for missed meetings.')
  }
  if (!work.length) {
    work.push('Use the guideline, weekly practice, and advisor feedback to figure out exactly what competition expects.')
  }

  const trap = isTeamEvent(normalizedEvent)
    ? 'Waiting for one person to carry the team instead of splitting work early.'
    : safeText(mistakes[0], 'Waiting too long to verify the rules, deadline, or scoring process.')

  return {
    babySummary: `${eventName} is mainly about ${safeText(normalizedEvent.processType, DEFAULT_PROCESS.processType).toLowerCase()}. Your job is to prepare the right work, practice the competition format, and verify Georgia SLC details early.`,
    whatYouActuallyDo: uniqueList([...work, ...weeklyTraining.slice(0, 2)]),
    requirementsChecklist: uniqueList(requirements),
    beforeSlcChecklist: uniqueList(beforeSlc),
    firstPracticeTask: firstAction,
    commonTrap: trap,
    readinessSigns: uniqueList([...readiness, ...evidence.slice(0, 2).map((item) => `You have ${String(item).toLowerCase()} ready to show.`)]),
  }
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

function ProcessBadges({ event, max = Infinity }) {
  const badges = []
  if (!event.processVerified) badges.push('Verify SLC')
  if (event.testRequired) badges.push('Test')
  if (event.digitalUpload) badges.push('Upload')
  if (event.preJudged) badges.push('Pre-Judged')
  if (event.presentationRequired) badges.push('Presentation')
  if (event.recognitionEvent) badges.push('Recognition')
  if (event.teamEvent) badges.push('Team')
  if (event.processVerified) badges.push('Verify SLC')
  return <div className="mt-3 flex flex-wrap gap-2">{badges.slice(0, max).map((badge) => <ProcessBadge key={badge}>{badge}</ProcessBadge>)}</div>
}

function ProcessDetails({ event }) {
  if (!event.processVerified) {
    return <div className="rounded-xl bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-950 ring-1 ring-amber-200">Process not confirmed yet. Verify the Georgia SLC process with the Wheeler advisor before committing.</div>
  }
  return <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200"><h3 className="text-sm font-black text-slate-950">Competition Process</h3><div className="mt-3 grid gap-2 text-sm leading-6 text-slate-700"><p><span className="font-black text-slate-900">Process Type:</span> {safeText(event.processType, DEFAULT_PROCESS.processType)}</p><p><span className="font-black text-slate-900">Round One:</span> {safeText(event.roundOneType, DEFAULT_PROCESS.roundOneType)}</p><p><span className="font-black text-slate-900">Round Two:</span> {safeText(event.roundTwoType, DEFAULT_PROCESS.roundTwoType)}</p><p><span className="font-black text-slate-900">Test required?</span> {yesNo(event.testRequired)}</p><p><span className="font-black text-slate-900">Digital upload required?</span> {yesNo(event.digitalUpload)}</p><p><span className="font-black text-slate-900">Presentation required?</span> {yesNo(event.presentationRequired)}</p><p><span className="font-black text-slate-900">SLC note:</span> {safeText(event.slcVerificationNote, DEFAULT_PROCESS.slcVerificationNote)}</p></div></div>
}

function EventOverviewModal({ event, onClose, useEvent }) {
  useEffect(() => {
    if (!event) return undefined
    const handleKeyDown = (keyboardEvent) => {
      if (keyboardEvent.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [event, onClose])

  if (!event) {
    return null
  }

  const chooseEvent = () => {
    useEvent(event)
    onClose()
  }

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4" onClick={onClose}><section role="dialog" aria-modal="true" aria-labelledby="event-overview-title" className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-slate-200 sm:p-6" onClick={(clickEvent) => clickEvent.stopPropagation()}><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-wide text-teal-700">Event Overview</p><h3 id="event-overview-title" className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">{safeText(event.name, 'Untitled event')}</h3><p className="mt-1 text-sm font-semibold text-teal-700">{safeText(event.track, 'Verify track with advisor')}</p><ProcessBadges event={event} /></div><button type="button" aria-label="Close event preview" onClick={onClose} className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-300"><X size={18} /></button></div><div className="mt-5 space-y-4"><div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200"><p className="text-xs font-black uppercase tracking-wide text-slate-500">Why this event fits</p><p className="mt-2 text-sm leading-6 text-slate-700">{safeText(event.why, 'Review this event with the Wheeler advisor.')}</p></div><ProcessDetails event={event} /><ListBlock title="This week's first action" items={[safeText(event.firstAction, 'Review the official guideline and ask the advisor what to verify first.')]} icon={CalendarCheck} /><ListBlock title="Evidence to collect" items={safeArray(event.evidence).slice(0, 5)} icon={ClipboardCheck} /><MiniButton onClick={chooseEvent} className="w-full">Use this event</MiniButton></div></section></div>
}

function ListBlock({ title, items, icon: Icon = CheckCircle2 }) {
  return <div><h3 className="mb-3 flex items-center gap-2 text-sm font-black text-slate-950"><Icon size={17} className="text-teal-600" />{title}</h3><div className="space-y-2">{safeArray(items).map((item) => <div key={item} className="flex gap-2 text-sm leading-6 text-slate-700"><CheckCircle2 size={15} className="mt-1 shrink-0 text-teal-500" /><span>{item}</span></div>)}</div></div>
}

function WarningBox() {
  return <div className="rounded-xl bg-amber-50 p-3 text-sm font-bold leading-6 text-amber-950 ring-1 ring-amber-200">{STUDENT_GUIDE_WARNING}</div>
}

function GuideBulletList({ items }) {
  return <ul className="space-y-2">{safeArray(items).map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700"><CheckCircle2 size={15} className="mt-1 shrink-0 text-teal-500" /><span>{item}</span></li>)}</ul>
}

function GuideBlock({ title, children }) {
  return <div><h4 className="mb-2 text-xs font-black uppercase tracking-wide text-slate-600">{title}</h4>{children}</div>
}

export function StudentFriendlyGuideSection({ event }) {
  const guide = getStudentFriendlyGuide(event)
  return <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200"><h3 className="text-sm font-black text-slate-950">What You Are Signing Up For</h3><div className="mt-4 grid gap-4"><GuideBlock title="In baby words"><p className="text-sm leading-6 text-slate-700">{guide.babySummary}</p></GuideBlock><GuideBlock title="What you actually do"><GuideBulletList items={guide.whatYouActuallyDo} /></GuideBlock><GuideBlock title="Requirements you must handle"><GuideBulletList items={guide.requirementsChecklist} /></GuideBlock><GuideBlock title="Before Georgia SLC"><GuideBulletList items={guide.beforeSlcChecklist} /></GuideBlock><GuideBlock title="Do this first"><p className="rounded-xl bg-teal-50 p-3 text-sm font-bold leading-6 text-teal-950 ring-1 ring-teal-100">{guide.firstPracticeTask}</p></GuideBlock><GuideBlock title="How you know you are ready"><GuideBulletList items={guide.readinessSigns} /></GuideBlock><GuideBlock title="Watch out"><p className="text-sm font-bold leading-6 text-rose-800">{guide.commonTrap}</p></GuideBlock></div></div>
}

export function CompactGuideCard({ event, dark = false }) {
  const guide = getStudentFriendlyGuide(event)
  return <div className={cx('mt-3 rounded-xl p-3 text-sm leading-6 ring-1', dark ? 'bg-white/10 text-slate-100 ring-white/15' : 'bg-white text-slate-700 ring-slate-200')}><p className={cx('text-xs font-black uppercase tracking-wide', dark ? 'text-teal-200' : 'text-teal-700')}>In baby words</p><p className="mt-1">{guide.babySummary}</p><div className="mt-3 grid gap-2"><p><span className="font-black">Main work:</span> {safeText(guide.whatYouActuallyDo[0], 'Practice the event format.')}</p><p><span className="font-black">Main requirement:</span> {safeText(guide.requirementsChecklist[0], 'Verify the rules with the advisor.')}</p><p><span className="font-black">Do this first:</span> {guide.firstPracticeTask}</p><p><span className="font-black">Watch out:</span> {guide.commonTrap}</p></div></div>
}

export function PlainEnglishPlan({ event }) {
  const guide = getStudentFriendlyGuide(event)
  return <CardLike><h3 className="text-base font-black text-slate-950">Your Event in Plain English</h3><p className="mt-3 text-sm leading-6 text-slate-700">{guide.babySummary}</p><div className="mt-4 rounded-xl bg-teal-50 p-3 ring-1 ring-teal-100"><p className="text-xs font-black uppercase tracking-wide text-teal-700">Do This First</p><p className="mt-2 text-sm font-black leading-6 text-teal-950">{guide.firstPracticeTask}</p></div><div className="mt-4 grid gap-4"><GuideBlock title="Requirements"><GuideBulletList items={guide.requirementsChecklist} /></GuideBlock><GuideBlock title="Before Georgia SLC"><GuideBulletList items={guide.beforeSlcChecklist} /></GuideBlock><GuideBlock title="Ready when"><GuideBulletList items={guide.readinessSigns} /></GuideBlock></div><div className="mt-4"><WarningBox /></div></CardLike>
}

function CardLike({ children }) {
  return <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5">{children}</section>
}

export function guidePlanText(event) {
  const guide = getStudentFriendlyGuide(event)
  return `Your Event in Plain English\n\nIn baby words:\n${guide.babySummary}\n\nDo This First:\n${guide.firstPracticeTask}\n\nRequirements:\n${guide.requirementsChecklist.map((item, index) => `${index + 1}. ${item}`).join('\n')}\n\nBefore Georgia SLC:\n${guide.beforeSlcChecklist.map((item, index) => `${index + 1}. ${item}`).join('\n')}\n\nReady when:\n${guide.readinessSigns.map((item, index) => `${index + 1}. ${item}`).join('\n')}\n\nWatch out:\n${guide.commonTrap}\n\n${STUDENT_GUIDE_WARNING}`
}

export function EnhancedEventLibrary({ events, setSelectedEventId, setTab }) {
  const [filters, setFilters] = useState({ query: '', track: 'All', difficulty: 'All', team: 'All', commitment: 'All', process: 'All' })
  const [activeModalEvent, setActiveModalEvent] = useState(null)
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
  const useEvent = (event) => {
    if (!event) return
    setSelectedEventId(event.id)
    setTab('plan')
  }

  return <div className="space-y-5"><MiniCard><div className="grid gap-4 lg:grid-cols-[1fr_2fr] lg:items-end"><div className="flex gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700"><ClipboardList size={21} /></div><div><h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">Event Library</h2><p className="mt-1 text-sm leading-6 text-slate-500">Browse events, then open a quick overview when one looks interesting.</p><p className="mt-1 text-xs font-black uppercase tracking-wide text-teal-700">Showing {filteredEvents.length} of {normalizedEvents.length} events</p></div></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6"><label className="block sm:col-span-2 xl:col-span-1"><span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-600">Search</span><div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input aria-label="Search events" value={filters.query} onChange={(event) => setFilters({ ...filters, query: event.target.value })} placeholder="Search" className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none transition hover:border-teal-300 focus:ring-2 focus:ring-teal-300" /></div></label><Select label="Track" value={filters.track} options={tracks} onChange={(track) => setFilters({ ...filters, track })} /><Select label="Difficulty" value={filters.difficulty} options={difficulties} onChange={(difficulty) => setFilters({ ...filters, difficulty })} /><Select label="Format" value={filters.team} options={['All', 'Solo', 'Team event']} onChange={(team) => setFilters({ ...filters, team })} /><Select label="Commitment" value={filters.commitment} options={['All', 'Low lift', 'Serious', 'High commitment', 'Only for locked-in teams']} onChange={(commitment) => setFilters({ ...filters, commitment })} /><Select label="Process" value={filters.process} options={['All', 'Test Event', 'Pre-Judged Upload', 'Presentation Event', 'Recognition Exam', 'No Upload', 'Verify SLC Rules']} onChange={(process) => setFilters({ ...filters, process })} /></div></div><div className="mt-4"><WarningBox /></div></MiniCard><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{filteredEvents.map((event) => <button key={event.id} type="button" onClick={() => setActiveModalEvent(event)} className="cursor-pointer rounded-2xl bg-white p-3 text-left shadow-sm ring-1 ring-slate-200 transition hover:bg-teal-50 hover:ring-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300 sm:p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="text-base font-black text-slate-950 sm:text-lg">{safeText(event.name, 'Untitled event')}</h3><p className="mt-0.5 text-sm font-semibold text-teal-700">{safeText(event.track, 'Verify track with advisor')}</p></div><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-700">{event.time || 4}+ hrs</span></div><ProcessBadges event={event} max={3} /><div className="mt-2 grid grid-cols-2 gap-2 text-xs font-bold text-slate-600"><span className="rounded-lg bg-slate-50 p-2 ring-1 ring-slate-200">{safeText(event.difficulty, 'Verify')}</span><span className="rounded-lg bg-slate-50 p-2 ring-1 ring-slate-200">{event.team === 'Solo' ? 'Solo' : 'Team'}</span></div><p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-700">{safeText(event.why, 'Review this event with the Wheeler advisor.')}</p><span className="mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-black text-slate-950 ring-1 ring-slate-200 transition hover:bg-slate-950 hover:text-white">View overview</span></button>)}</div><EventOverviewModal event={activeModalEvent} onClose={() => setActiveModalEvent(null)} useEvent={useEvent} /></div>
}

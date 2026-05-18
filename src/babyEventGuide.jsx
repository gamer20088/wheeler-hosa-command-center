import { CheckCircle2 } from 'lucide-react'

const DEFAULT_PROCESS = {
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

const STUDENT_GUIDE_WARNING = 'This portal explains events in student-friendly language. It does not replace official HOSA guidelines. Georgia SLC deadlines, uploads, and procedures must be verified with the Wheeler advisor and Georgia HOSA.'

function safeArray(value) {
  return Array.isArray(value) ? value : []
}

function safeText(value, fallback = '') {
  return typeof value === 'string' && value.trim() ? value : fallback
}

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

function yesNo(value) {
  return value ? 'Yes' : 'No'
}

function isTeamEvent(event) {
  return safeText(event.team, '').toLowerCase() !== 'solo'
}

function uniqueList(items) {
  return Array.from(new Set(safeArray(items).filter(Boolean)))
}

export function getStudentFriendlyGuide(event) {
  const normalizedEvent = { ...DEFAULT_PROCESS, ...event }
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

function GuideBulletList({ items }) {
  return <ul className="space-y-2">{safeArray(items).map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700"><CheckCircle2 size={15} className="mt-1 shrink-0 text-teal-500" /><span>{item}</span></li>)}</ul>
}

function GuideBlock({ title, children }) {
  return <div><h4 className="mb-2 text-xs font-black uppercase tracking-wide text-slate-600">{title}</h4>{children}</div>
}

export function StudentGuideWarning() {
  return <div className="rounded-xl bg-amber-50 p-3 text-sm font-bold leading-6 text-amber-950 ring-1 ring-amber-200">{STUDENT_GUIDE_WARNING}</div>
}

export function StudentFriendlyGuideSection({ event }) {
  const guide = getStudentFriendlyGuide(event)
  return <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200"><h3 className="text-sm font-black text-slate-950">What You Are Signing Up For</h3><div className="mt-4 grid gap-4"><GuideBlock title="In baby words"><p className="text-sm leading-6 text-slate-700">{guide.babySummary}</p></GuideBlock><GuideBlock title="What you actually do"><GuideBulletList items={guide.whatYouActuallyDo} /></GuideBlock><GuideBlock title="Requirements you must handle"><GuideBulletList items={guide.requirementsChecklist} /></GuideBlock><GuideBlock title="Before Georgia SLC"><GuideBulletList items={guide.beforeSlcChecklist} /></GuideBlock><GuideBlock title="Do this first"><p className="rounded-xl bg-teal-50 p-3 text-sm font-bold leading-6 text-teal-950 ring-1 ring-teal-100">{guide.firstPracticeTask}</p></GuideBlock><GuideBlock title="How you know you are ready"><GuideBulletList items={guide.readinessSigns} /></GuideBlock><GuideBlock title="Watch out"><p className="text-sm font-bold leading-6 text-rose-800">{guide.commonTrap}</p></GuideBlock></div></div>
}

export function CompactGuideCard({ event, dark = false }) {
  const guide = getStudentFriendlyGuide(event)
  return <div className={cx('mt-3 rounded-xl p-3 text-sm leading-6 ring-1', dark ? 'bg-white/10 text-slate-100 ring-white/15' : 'bg-white text-slate-700 ring-slate-200')}><p className={cx('text-xs font-black uppercase tracking-wide', dark ? 'text-teal-200' : 'text-teal-700')}>In baby words</p><p className="mt-1">{guide.babySummary}</p><div className="mt-3 grid gap-2"><p><span className="font-black">Process type:</span> {safeText(event.processType, DEFAULT_PROCESS.processType)}</p><p><span className="font-black">Main work:</span> {safeText(guide.whatYouActuallyDo[0], 'Practice the event format.')}</p><p><span className="font-black">Upload required?</span> {yesNo(event.digitalUpload)}</p><p><span className="font-black">Test required?</span> {yesNo(event.testRequired)}</p><p><span className="font-black">Presentation required?</span> {yesNo(event.presentationRequired)}</p></div></div>
}

export function PlainEnglishPlan({ event }) {
  const guide = getStudentFriendlyGuide(event)
  return <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5"><h3 className="text-base font-black text-slate-950">Your Event in Plain English</h3><p className="mt-3 text-sm leading-6 text-slate-700">{guide.babySummary}</p><div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-700 ring-1 ring-slate-200"><p><span className="font-black text-slate-900">Competition Process:</span> {safeText(event.processType, DEFAULT_PROCESS.processType)}</p><p><span className="font-black text-slate-900">Test required?</span> {yesNo(event.testRequired)}</p><p><span className="font-black text-slate-900">Upload required?</span> {yesNo(event.digitalUpload)}</p><p><span className="font-black text-slate-900">Presentation required?</span> {yesNo(event.presentationRequired)}</p><p><span className="font-black text-slate-900">SLC note:</span> {safeText(event.slcVerificationNote, DEFAULT_PROCESS.slcVerificationNote)}</p></div><div className="mt-4 rounded-xl bg-teal-50 p-3 ring-1 ring-teal-100"><p className="text-xs font-black uppercase tracking-wide text-teal-700">Do This First</p><p className="mt-2 text-sm font-black leading-6 text-teal-950">{guide.firstPracticeTask}</p></div><div className="mt-4 grid gap-4"><GuideBlock title="Requirements"><GuideBulletList items={guide.requirementsChecklist} /></GuideBlock><GuideBlock title="Before Georgia SLC"><GuideBulletList items={guide.beforeSlcChecklist} /></GuideBlock><GuideBlock title="Ready when"><GuideBulletList items={guide.readinessSigns} /></GuideBlock></div><div className="mt-4"><StudentGuideWarning /></div></section>
}

export function guidePlanText(event) {
  const guide = getStudentFriendlyGuide(event)
  return `Your Event in Plain English\n\nIn baby words:\n${guide.babySummary}\n\nCompetition Process:\n${safeText(event.processType, DEFAULT_PROCESS.processType)}\nTest required? ${yesNo(event.testRequired)}\nUpload required? ${yesNo(event.digitalUpload)}\nPresentation required? ${yesNo(event.presentationRequired)}\nSLC note: ${safeText(event.slcVerificationNote, DEFAULT_PROCESS.slcVerificationNote)}\n\nDo This First:\n${guide.firstPracticeTask}\n\nRequirements:\n${guide.requirementsChecklist.map((item, index) => `${index + 1}. ${item}`).join('\n')}\n\nBefore Georgia SLC:\n${guide.beforeSlcChecklist.map((item, index) => `${index + 1}. ${item}`).join('\n')}\n\nReady when:\n${guide.readinessSigns.map((item, index) => `${index + 1}. ${item}`).join('\n')}\n\nWatch out:\n${guide.commonTrap}\n\n${STUDENT_GUIDE_WARNING}`
}

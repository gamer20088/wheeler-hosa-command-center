import { useEffect, useMemo, useRef, useState } from 'react'
import { AlertTriangle, CalendarCheck, CheckCircle2, ClipboardCheck, ExternalLink, FileText, ShieldCheck } from 'lucide-react'
import { PORTAL_LINKS, PROOF_CODE } from './portalConfig.js'

const PRACTICE_TYPES = ['Timed writing', 'Quiz or study session', 'Speech or presentation practice', 'Research or portfolio work', 'Mock round', 'Other practice']
const TIMER_DURATIONS = [10, 20, 30, 45, 60]
const NOTE_LIMIT = 120
const PROOF_PANELS = [
  ['submit', 'Submit Proof', 'Forms, reminders, and calendar.'],
  ['practice', 'Practice Timer', 'Time practice and save notes.'],
  ['examples', 'Proof Examples', 'What counts as proof.'],
  ['privacy', 'Privacy + Code', 'Proof code and safety note.'],
]

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

function safeArray(value) {
  return Array.isArray(value) ? value : []
}

function safeText(value, fallback = '') {
  return typeof value === 'string' && value.trim() ? value : fallback
}

function getPracticeStorageKey(eventId) {
  return `wheelerHosaPracticeLog-${eventId || 'event'}`
}

function cleanPracticeEntry(entry, event) {
  const minutes = Number(entry?.minutes)
  return {
    eventId: safeText(entry?.eventId, safeText(event?.id, 'event')),
    eventName: safeText(entry?.eventName, safeText(event?.name, 'Selected event')),
    practiceType: PRACTICE_TYPES.includes(entry?.practiceType) ? entry.practiceType : PRACTICE_TYPES[0],
    minutes: Number.isFinite(minutes) && minutes > 0 ? Math.min(240, Math.round(minutes)) : 10,
    savedAt: safeText(entry?.savedAt, new Date().toISOString()),
    note: safeText(entry?.note, '').slice(0, NOTE_LIMIT),
  }
}

function cleanPracticeLog(value, event) {
  return safeArray(value).map((entry) => cleanPracticeEntry(entry, event)).slice(0, 20)
}

function formatTimer(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`
}

function formatSavedDate(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Saved locally'
  return date.toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

function Card({ children, className = '' }) {
  return <section className={cx('rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5', className)}>{children}</section>
}

function SectionHeader({ icon: Icon, title, subtitle }) {
  return <div className="flex gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-950"><Icon size={21} /></div><div><h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">{title}</h2>{subtitle && <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p>}</div></div>
}

function ProofList({ title, items, icon: Icon = CheckCircle2 }) {
  return <div><h3 className="mb-3 flex items-center gap-2 text-sm font-black text-slate-950"><Icon size={17} className="text-blue-900" />{title}</h3><div className="space-y-2">{safeArray(items).map((item) => <div key={item} className="flex gap-2 text-sm leading-6 text-slate-700"><CheckCircle2 size={15} className="mt-1 shrink-0 text-blue-900" /><span>{item}</span></div>)}</div></div>
}

function ProofLinkCard({ title, text, button, href, icon: Icon }) {
  return <a href={href} className="flex min-h-32 cursor-pointer flex-col justify-between rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"><div><div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-950"><Icon size={19} /></div><h3 className="text-base font-black text-slate-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-700">{text}</p></div><span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-blue-950">{button}<ExternalLink size={14} /></span></a>
}

function MiniButton({ children, onClick, variant = 'primary' }) {
  const styles = variant === 'light'
    ? 'bg-white text-slate-950 ring-1 ring-slate-200 hover:bg-blue-50 hover:ring-blue-300'
    : 'bg-blue-950 text-white hover:bg-blue-900'
  return <button type="button" onClick={onClick} className={`inline-flex min-h-10 cursor-pointer items-center justify-center rounded-xl px-3 py-2 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-blue-300 ${styles}`}>{children}</button>
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
  return `Weekly proof to submit:\n${proofItems}\n\nProof Code:\n${PROOF_CODE}\nUse this code on the form so officers know the submission came from Wheeler HOSA.`
}

export function ProofPlanSection({ event }) {
  return <Card><ProofList title="Weekly Proof You Should Submit" items={getProofExamples(event)} icon={ClipboardCheck} /><div className="mt-4 rounded-xl bg-blue-50 p-3 ring-1 ring-blue-100"><p className="text-xs font-black uppercase tracking-wide text-blue-950">Proof Code</p><p className="mt-1 text-lg font-black text-blue-950">{PROOF_CODE}</p><p className="mt-1 text-sm font-bold leading-6 text-blue-950">Use this code on the form so officers know the submission came from Wheeler HOSA.</p></div></Card>
}

function PracticeLog({ selectedEvent }) {
  const event = selectedEvent || {}
  const eventId = safeText(event.id, 'event')
  const eventName = safeText(event.name, 'Selected event')
  const audioContextRef = useRef(null)
  const timerArmedRef = useRef(false)
  const [practiceType, setPracticeType] = useState(PRACTICE_TYPES[0])
  const [duration, setDuration] = useState(20)
  const [secondsLeft, setSecondsLeft] = useState(20 * 60)
  const [running, setRunning] = useState(false)
  const [timerComplete, setTimerComplete] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
  const [note, setNote] = useState('')
  const [entries, setEntries] = useState([])
  const storageKey = getPracticeStorageKey(eventId)
  const elapsedSeconds = Math.max(0, duration * 60 - secondsLeft)
  const minutesPracticed = Math.max(1, Math.round((elapsedSeconds || duration * 60) / 60))
  const recentEntries = useMemo(() => entries.slice(0, 5), [entries])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      setEntries(cleanPracticeLog(raw ? JSON.parse(raw) : [], event))
    } catch {
      setEntries([])
    }
  }, [storageKey, eventId, eventName])

  useEffect(() => {
    if (!running) return undefined
    if (secondsLeft <= 0) {
      setRunning(false)
      setTimerComplete(true)
      if (soundOn && timerArmedRef.current) void playTimerSound()
      return undefined
    }
    const timerId = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1))
    }, 1000)
    return () => window.clearInterval(timerId)
  }, [running, secondsLeft, soundOn])

  async function playTimerSound() {
    if (!soundOn) return
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      if (!AudioContextClass) return
      const context = audioContextRef.current || new AudioContextClass()
      audioContextRef.current = context
      if (context.state === 'suspended') await context.resume()
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      const start = context.currentTime
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(880, start)
      gain.gain.setValueAtTime(0.0001, start)
      gain.gain.exponentialRampToValueAtTime(0.08, start + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.32)
      oscillator.connect(gain)
      gain.connect(context.destination)
      oscillator.start(start)
      oscillator.stop(start + 0.34)
    } catch {
      // Audio is a helper only; the timer should still complete silently if blocked.
    }
  }

  function saveEntries(nextEntries) {
    const cleanEntries = cleanPracticeLog(nextEntries, event)
    setEntries(cleanEntries)
    try {
      localStorage.setItem(storageKey, JSON.stringify(cleanEntries))
    } catch {
      // Keep the UI usable even if localStorage is unavailable.
    }
  }

  function updateDuration(nextDuration) {
    setDuration(nextDuration)
    setSecondsLeft(nextDuration * 60)
    setRunning(false)
    setTimerComplete(false)
  }

  function startTimer() {
    timerArmedRef.current = true
    setTimerComplete(false)
    if (secondsLeft <= 0) setSecondsLeft(duration * 60)
    setRunning(true)
  }

  function resetTimer() {
    setRunning(false)
    setSecondsLeft(duration * 60)
    setTimerComplete(false)
  }

  function savePractice() {
    const cleanNote = note.trim().slice(0, NOTE_LIMIT)
    const entry = cleanPracticeEntry({
      eventId,
      eventName,
      practiceType,
      minutes: minutesPracticed,
      savedAt: new Date().toISOString(),
      note: cleanNote,
    }, event)
    saveEntries([entry, ...entries])
    setNote('')
  }

  async function copyPracticeSummary() {
    const summary = recentEntries.length
      ? recentEntries.map((entry, index) => `${index + 1}. ${entry.practiceType} - ${entry.minutes} min - ${formatSavedDate(entry.savedAt)}${entry.note ? ` - ${entry.note}` : ''}`).join('\n')
      : 'No local practice entries saved yet.'
    try {
      await navigator.clipboard.writeText(`Wheeler HOSA Practice Summary\n${eventName}\n\n${summary}\n\nSaved on this device only. Official proof still needs to be submitted through the weekly proof form once links are added.`)
      alert('Practice summary copied.')
    } catch {
      alert('Could not copy practice summary.')
    }
  }

  function clearPracticeLog() {
    if (typeof window !== 'undefined' && !window.confirm('Clear the local practice log for this event on this device?')) return
    setEntries([])
    try {
      localStorage.removeItem(storageKey)
    } catch {
      // Nothing else to clear if localStorage is unavailable.
    }
  }

  return <Card><SectionHeader icon={ClipboardCheck} title="Practice Log" subtitle="Track practice on this device before official Google proof links are added." /><div className="mt-4 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]"><div className="space-y-3"><label className="block"><span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-600">Practice type</span><select value={practiceType} onChange={(event) => setPracticeType(event.target.value)} className="h-11 w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 outline-none transition hover:border-blue-300 hover:bg-blue-50 focus:ring-2 focus:ring-blue-300">{PRACTICE_TYPES.map((type) => <option key={type}>{type}</option>)}</select></label><div><p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-600">Timer duration</p><div className="flex flex-wrap gap-2">{TIMER_DURATIONS.map((minutes) => <button key={minutes} type="button" onClick={() => updateDuration(minutes)} className={`cursor-pointer rounded-full px-3 py-2 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-blue-300 ${duration === minutes ? 'bg-blue-950 text-white' : 'bg-slate-100 text-slate-700 hover:bg-blue-50'}`}>{minutes} min</button>)}</div></div><div className="rounded-2xl bg-blue-50 p-4 text-center ring-1 ring-blue-100"><p className="text-xs font-black uppercase tracking-wide text-blue-950">Remaining time</p><p className="mt-1 text-4xl font-black tracking-tight text-blue-950">{formatTimer(secondsLeft)}</p>{timerComplete && <p className="mt-2 rounded-xl bg-white px-3 py-2 text-sm font-black text-blue-950 ring-1 ring-blue-100">Timer complete. Save this practice when you are ready.</p>}<div className="mt-3 grid grid-cols-3 gap-2"><MiniButton onClick={startTimer}>Start</MiniButton><MiniButton onClick={() => setRunning(false)} variant="light">Pause</MiniButton><MiniButton onClick={resetTimer} variant="light">Reset</MiniButton></div><div className="mt-3 flex flex-col gap-2 rounded-xl bg-white p-3 text-left ring-1 ring-blue-100 sm:flex-row sm:items-center sm:justify-between"><label className="flex cursor-pointer items-center gap-2 text-sm font-black text-slate-700"><input type="checkbox" checked={soundOn} onChange={(event) => setSoundOn(event.target.checked)} className="h-4 w-4 cursor-pointer accent-blue-950" />Sound alert on</label><button type="button" onClick={() => { timerArmedRef.current = true; void playTimerSound() }} className="w-fit cursor-pointer rounded-lg bg-white px-3 py-1.5 text-xs font-black text-blue-950 ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300">Test sound</button></div></div><label className="block"><span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-600">Optional note</span><input value={note} onChange={(event) => setNote(event.target.value.slice(0, NOTE_LIMIT))} maxLength={NOTE_LIMIT} placeholder="What did you practice?" className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 outline-none transition hover:border-blue-300 focus:ring-2 focus:ring-blue-300" /><span className="mt-1 block text-xs font-bold text-slate-500">{note.length}/{NOTE_LIMIT} characters</span></label><MiniButton onClick={savePractice}>Save practice</MiniButton><p className="rounded-xl bg-slate-50 p-3 text-xs font-bold leading-5 text-slate-500 ring-1 ring-slate-200">Saved on this device only. Official proof still needs to be submitted through the weekly proof form once links are added.</p></div><div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200"><div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-black uppercase tracking-wide text-blue-950">Recent practice</p><p className="text-sm font-bold text-slate-600">{eventName}</p></div><div className="flex flex-col gap-2 sm:flex-row"><MiniButton onClick={copyPracticeSummary} variant="light">Copy practice summary</MiniButton><MiniButton onClick={clearPracticeLog} variant="light">Clear practice log</MiniButton></div></div><div className="mt-3 space-y-2">{recentEntries.length ? recentEntries.map((entry) => <div key={`${entry.savedAt}-${entry.practiceType}`} className="rounded-xl bg-white p-3 ring-1 ring-slate-200"><div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-sm font-black text-slate-950">{entry.practiceType}</p><p className="text-xs font-bold text-slate-500">{formatSavedDate(entry.savedAt)}</p></div><span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-950 ring-1 ring-blue-100">{entry.minutes} min</span></div>{entry.note && <p className="mt-2 text-sm font-bold leading-5 text-slate-700">{entry.note}</p>}</div>) : <p className="rounded-xl bg-white p-3 text-sm font-bold leading-6 text-slate-600 ring-1 ring-slate-200">No local practice entries yet. Save one after a practice session.</p>}</div></div></div></Card>
}

export function ProofTracker({ selectedEvent }) {
  const [activePanel, setActivePanel] = useState('practice')
  const proofCounts = ['quiz score or practice test screenshot', 'writing draft or outline', 'speech recording', 'poster or portfolio draft', 'campaign evidence', 'photo/video proof of practice', 'mock round notes', 'study log or reflection', 'officer-reviewed checklist']
  return <div className="space-y-5"><Card><SectionHeader icon={ClipboardCheck} title="Proof Tracker" subtitle="Student weekly proof submission hub." /><p className="mt-4 max-w-3xl text-sm font-bold leading-6 text-slate-700">Submit proof, practice with a timer, and save local practice notes.</p><div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">{PROOF_PANELS.map(([id, label, description]) => <button key={id} type="button" aria-pressed={activePanel === id} onClick={() => setActivePanel(id)} className={`cursor-pointer rounded-2xl p-3 text-left transition focus:outline-none focus:ring-2 focus:ring-blue-300 ${activePanel === id ? 'border-l-4 border-rose-800 bg-blue-950 text-white ring-1 ring-blue-950' : 'bg-slate-50 text-slate-950 ring-1 ring-slate-200 hover:bg-blue-50 hover:ring-blue-300'}`}><span className="block text-sm font-black">{label}</span><span className={`mt-1 block text-xs font-bold leading-5 ${activePanel === id ? 'text-blue-100' : 'text-slate-500'}`}>{description}</span></button>)}</div></Card>{activePanel === 'submit' && <Card><div className="grid gap-3 md:grid-cols-3"><ProofLinkCard title="Submit Weekly Proof" button="Open Weekly Proof Form" href={PORTAL_LINKS.weeklyProofForm} icon={ClipboardCheck} text="Submit one piece of evidence that you practiced your event this week." /><ProofLinkCard title="Add Weekly Reminder" button="Add Calendar Reminder" href={PORTAL_LINKS.weeklyReminder} icon={CalendarCheck} text="Add a weekly reminder so you do not forget proof submissions." /><ProofLinkCard title="View Proof Calendar" button="Open Proof Calendar" href={PORTAL_LINKS.proofCalendar} icon={CalendarCheck} text="Check weekly proof deadlines, mock rounds, and SLC prep dates." /></div><p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm font-bold leading-6 text-slate-700 ring-1 ring-slate-200">After you submit proof, officers review it and give feedback through Officer Tools.</p></Card>}{activePanel === 'practice' && <PracticeLog selectedEvent={selectedEvent} />}{activePanel === 'examples' && <div className="grid gap-5 lg:grid-cols-2"><Card><ProofList title="What Counts as Proof?" items={proofCounts} icon={CheckCircle2} /></Card><Card><ProofList title="Good Proof for Your Selected Event" items={getProofExamples(selectedEvent)} icon={FileText} /></Card></div>}{activePanel === 'privacy' && <div className="grid gap-5 lg:grid-cols-2"><Card className="bg-blue-50 ring-blue-100"><p className="text-xs font-black uppercase tracking-wide text-blue-950">Proof Code</p><p className="mt-1 text-xl font-black text-blue-950">{PROOF_CODE}</p><p className="mt-1 text-sm font-bold leading-6 text-blue-950">Use this code on the form so officers know the submission came from Wheeler HOSA.</p></Card><Card className="bg-amber-50 ring-amber-200"><div className="flex gap-3"><AlertTriangle size={20} className="mt-0.5 shrink-0 text-amber-700" /><div><h2 className="text-base font-black text-amber-950">Privacy Warning</h2><div className="mt-2 space-y-2 text-sm font-bold leading-6 text-amber-950"><p>Do not submit medical, personal health, family, or private information. Submit only competition preparation proof.</p><p>Real student submissions should be stored in private Google Forms, Sheets, and Drive folders owned by the HOSA Gmail or advisor account.</p></div></div></div></Card></div>}</div>
}

export function ProofOfficerWorkflow() {
  const proofTools = [['Event Interest Form', PORTAL_LINKS.eventInterestForm], ['Review Weekly Proof / Open Tracker Sheet', PORTAL_LINKS.officerTrackerSheet], ['Officer Feedback Form', PORTAL_LINKS.officerFeedbackForm], ['Mock Score Form', PORTAL_LINKS.mockRoundScoreForm], ['SLC Readiness Check', PORTAL_LINKS.slcReadinessCheck]]
  return <Card><SectionHeader icon={ShieldCheck} title="Officer Tools" subtitle="Officers use this tab to review submissions, give feedback, and track readiness." /><div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{proofTools.map(([label, url]) => <a key={label} href={url} className="flex min-h-20 cursor-pointer items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4 text-left font-black text-slate-950 ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"><span>{label}</span><ExternalLink size={15} className="shrink-0 text-blue-950" /></a>)}</div><div className="mt-4 grid gap-3 lg:grid-cols-2"><div className="rounded-xl bg-slate-50 p-3 text-sm font-bold leading-6 text-slate-700 ring-1 ring-slate-200"><p>Student submits proof in Proof Tracker.</p><p>Officer reviews it in Officer Tools.</p><p>Student uses feedback to prepare for mock round and Georgia SLC.</p></div><p className="rounded-xl bg-blue-50 p-3 text-sm font-bold leading-6 text-blue-950 ring-1 ring-blue-100">Officers should replace these placeholder links with Google Forms, Sheets, and Calendar links owned by the HOSA Gmail or advisor account.</p></div></Card>
}

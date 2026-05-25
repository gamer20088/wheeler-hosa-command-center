const FACTOR_MAX = {
  strengths: 30,
  format: 15,
  time: 15,
  experience: 15,
  reliability: 10,
  process: 15,
}

const STRENGTH_KEYWORDS = {
  'Writing & Policy': ['writing', 'policy', 'fast thinking', 'current events'],
  'Speaking & Presentation': ['speaking', 'speech', 'presentation', 'delivery', 'confidence', 'debate'],
  'Science & Health': ['science', 'health science', 'global health', 'health'],
  'Math & Accuracy': ['math', 'accuracy', 'units', 'calculation'],
  'Data & Technology': ['data', 'technology', 'systems', 'informatics'],
  'Psychology & Wellness': ['psychology', 'wellness', 'behavioral', 'mental health'],
  'Research & Reading': ['research', 'reading', 'career', 'policy'],
  'Design & Creativity': ['design', 'creativity', 'photography', 'media', 'innovation'],
  'Public Health & Outreach': ['public health', 'outreach', 'campaign', 'community', 'global health'],
  'Teamwork & Leadership': ['teamwork', 'teaching', 'leadership', 'team'],
  'Memorization & Test Taking': ['memorization', 'vocabulary', 'test taking', 'speed', 'written test'],
  'Independent Work': ['independent', 'solo', 'individual'],
  'New Member Friendly': ['new member', 'starter', 'beginner'],
}

function safeArray(value) {
  return Array.isArray(value) ? value : []
}

function normalize(value) {
  return String(value || '').toLowerCase()
}

function includesAny(text, terms) {
  return safeArray(terms).some((term) => text.includes(normalize(term)))
}

function eventText(event) {
  return [
    event?.name,
    event?.track,
    event?.format,
    event?.team,
    event?.difficulty,
    event?.commitment,
    event?.processType,
    event?.roundOneType,
    event?.roundTwoType,
    event?.why,
    ...safeArray(event?.bestFor),
  ].map(normalize).join(' ')
}

function isTeamEvent(event) {
  return normalize(event?.team) !== 'solo'
}

function isTestEvent(event) {
  return Boolean(event?.testRequired) || includesAny(eventText(event), ['written test', 'test', 'exam'])
}

function isPresentationEvent(event) {
  return Boolean(event?.presentationRequired) || includesAny(eventText(event), ['speech', 'presentation', 'debate'])
}

function isWritingEvent(event) {
  return includesAny(eventText(event), ['writing', 'paper', 'response', 'essay'])
}

function isUploadEvent(event) {
  return Boolean(event?.digitalUpload) || Boolean(event?.preJudged) || includesAny(eventText(event), ['upload', 'portfolio', 'poster', 'project'])
}

function fitLabel(totalScore) {
  if (totalScore >= 85) return ['Strong Fit', 'strongFit']
  if (totalScore >= 70) return ['Good Fit', 'goodFit']
  if (totalScore >= 55) return ['Possible Fit', 'possibleFit']
  return ['Stretch Fit', 'stretchFit']
}

function scoreStrengths(event, answers) {
  const selectedStrengths = safeArray(answers?.strengths)
  const text = eventText(event)
  const matchCount = selectedStrengths.filter((strength) => includesAny(text, STRENGTH_KEYWORDS[strength] || [strength])).length
  const accessible = ['Low', 'Low to Medium', 'Medium'].includes(event?.difficulty)
  const score = matchCount >= 3 ? 30 : matchCount === 2 ? 22 : matchCount === 1 ? 14 : accessible ? 8 : 0
  const note = matchCount ? `${matchCount} selected strength match${matchCount === 1 ? '' : 'es'} this event.` : accessible ? 'Broadly accessible even without a direct strength match.' : 'Few direct strength matches.'
  return { score, max: FACTOR_MAX.strengths, note, matchCount }
}

function scoreFormat(event, answers) {
  const preference = answers?.format || 'Any'
  let score = 2
  let note = 'Format is not the closest match.'
  if (preference === 'Any') {
    score = 12
    note = 'Flexible format preference.'
  } else if (preference === 'Individual' && !isTeamEvent(event)) {
    score = 15
    note = 'Solo format matches your preference.'
  } else if (preference === 'Team' && isTeamEvent(event)) {
    score = 15
    note = 'Team format matches your preference.'
  } else if (preference === 'Test' && isTestEvent(event)) {
    score = 15
    note = 'Test format matches your preference.'
  } else if (preference === 'Speaking' && isPresentationEvent(event)) {
    score = 15
    note = 'Speaking or presentation format matches.'
  } else if (preference === 'Writing' && isWritingEvent(event)) {
    score = 15
    note = 'Writing format matches your preference.'
  } else if ((preference === 'Individual' && isTestEvent(event)) || (preference === 'Speaking' && isWritingEvent(event))) {
    score = 8
    note = 'Format is not exact, but still compatible.'
  }
  return { score, max: FACTOR_MAX.format, note }
}

function scoreTime(event, answers) {
  const eventHours = Number(event?.time) || 4
  const studentHours = Number(answers?.hours)
  if (!Number.isFinite(studentHours)) return { score: 8, max: FACTOR_MAX.time, note: 'Weekly time is unknown.' }
  if (studentHours >= eventHours) return { score: 15, max: FACTOR_MAX.time, note: 'Your weekly prep time meets the estimate.' }
  if (studentHours + 1 >= eventHours) return { score: 9, max: FACTOR_MAX.time, note: 'Your time is close, but tight.' }
  return { score: 4, max: FACTOR_MAX.time, note: 'This event may need more weekly prep time.' }
}

function scoreExperience(event, answers) {
  const experience = answers?.experience || 'New'
  const difficulty = event?.difficulty || 'Medium'
  const table = {
    New: { Low: 15, 'Low to Medium': 15, Medium: 10, 'Medium to High': 5, High: 2 },
    'Some experience': { Low: 12, 'Low to Medium': 15, Medium: 15, 'Medium to High': 10, High: 6 },
    Experienced: { Low: 8, 'Low to Medium': 12, Medium: 15, 'Medium to High': 15, High: 13 },
  }
  const score = table[experience]?.[difficulty] ?? 8
  const note = score >= 13 ? 'Difficulty fits your experience level.' : score >= 8 ? 'Difficulty is manageable with steady prep.' : 'Difficulty may be a stretch for your experience level.'
  return { score, max: FACTOR_MAX.experience, note }
}

function scoreReliability(event, answers) {
  const reliability = answers?.commitment || 'Unknown'
  if (!isTeamEvent(event)) return { score: 10, max: FACTOR_MAX.reliability, note: 'Solo event avoids team scheduling risk.' }
  if (reliability === 'Reliable') return { score: 10, max: FACTOR_MAX.reliability, note: 'Reliable meeting habits fit a team event.' }
  if (reliability === 'Sometimes busy') return { score: 5, max: FACTOR_MAX.reliability, note: 'Team work may be possible, but scheduling could be tight.' }
  if (reliability === 'Unreliable') return { score: 1, max: FACTOR_MAX.reliability, note: 'Team events need consistent attendance.' }
  return { score: 6, max: FACTOR_MAX.reliability, note: 'Meeting reliability is unknown.' }
}

function scoreProcess(event, answers) {
  const preference = answers?.format || 'Any'
  let score = 8
  let note = 'Process is workable if you verify rules early.'
  if (preference === 'Test') {
    score = isTestEvent(event) ? 15 : isPresentationEvent(event) || isUploadEvent(event) ? 4 : 8
    note = isTestEvent(event) ? 'Process matches test prep.' : 'Process depends less on test prep.'
  } else if (preference === 'Speaking') {
    score = isPresentationEvent(event) ? 15 : 5
    note = isPresentationEvent(event) ? 'Process uses speaking or judge presentation.' : 'Process has less speaking than you preferred.'
  } else if (preference === 'Writing') {
    score = isWritingEvent(event) ? 15 : isUploadEvent(event) ? 8 : 5
    note = isWritingEvent(event) ? 'Process uses writing practice.' : 'Process is less writing-focused.'
  } else if (preference === 'Team') {
    score = isTeamEvent(event) ? 12 : 8
    note = isTeamEvent(event) ? 'Process includes team coordination.' : 'Process is more independent than team-based.'
  } else if (preference === 'Individual') {
    score = !isTeamEvent(event) ? 12 : 5
    note = !isTeamEvent(event) ? 'Process can be handled independently.' : 'Process needs team coordination.'
  }
  return { score, max: FACTOR_MAX.process, note }
}

function buildTopReasons(event, breakdown) {
  const reasons = []
  if (breakdown.strengths.score >= 22) reasons.push('Matches several strengths you selected.')
  if (breakdown.format.score >= 15) reasons.push('The event format matches your preference.')
  if (breakdown.time.score >= 15) reasons.push('Your weekly prep time fits the event.')
  if (breakdown.experience.score >= 13) reasons.push('The difficulty fits your HOSA experience.')
  if (breakdown.reliability.score >= 10) reasons.push(breakdown.reliability.note)
  if (breakdown.process.score >= 12) reasons.push('The competition process fits how you want to prepare.')
  if (!reasons.length) reasons.push('This can still work if you practice consistently and verify the guideline.')
  return reasons.slice(0, 3)
}

function buildWatchOuts(event, breakdown) {
  const watchOuts = []
  if (breakdown.time.score <= 9) watchOuts.push('Plan extra weekly practice time before committing.')
  if (breakdown.reliability.score <= 5) watchOuts.push('Team scheduling could become the main risk.')
  if (breakdown.process.score <= 8) watchOuts.push('Verify the event process before you commit.')
  if (isPresentationEvent(event)) watchOuts.push('You still need a timed mock round.')
  if (isUploadEvent(event)) watchOuts.push('Confirm upload deadlines early with the advisor.')
  watchOuts.push('Verify Georgia SLC rules with the Wheeler advisor.')
  return Array.from(new Set(watchOuts)).slice(0, 2)
}

export function calculateEventFit(event, answers) {
  const breakdown = {
    strengths: scoreStrengths(event, answers),
    format: scoreFormat(event, answers),
    time: scoreTime(event, answers),
    experience: scoreExperience(event, answers),
    reliability: scoreReliability(event, answers),
    process: scoreProcess(event, answers),
  }
  const totalScore = Math.max(0, Math.min(100, Math.round(Object.values(breakdown).reduce((sum, item) => sum + item.score, 0))))
  const [label, labelKey] = fitLabel(totalScore)
  return {
    totalScore,
    label,
    labelKey,
    breakdown,
    topReasons: buildTopReasons(event, breakdown),
    watchOuts: buildWatchOuts(event, breakdown),
  }
}

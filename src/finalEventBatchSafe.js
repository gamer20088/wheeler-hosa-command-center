import { FINAL_EVENT_BATCH as RAW_FINAL_EVENT_BATCH } from './finalEventBatch.js'

function safeArray(value) {
  return Array.isArray(value) ? value : []
}

function safeText(value, fallback = '') {
  return typeof value === 'string' && value.trim() ? value : fallback
}

function safeNumber(value, fallback = 4) {
  return Number.isFinite(value) ? value : fallback
}

function firstList(primary, fallback) {
  const primaryList = safeArray(primary)
  return primaryList.length ? primaryList : safeArray(fallback)
}

function normalizeEvent(event) {
  const why = safeText(event.why, safeText(event.whyWheeler, 'Review this event with the Wheeler advisor before choosing it.'))
  const firstAction = safeText(event.firstAction, safeText(event.firstActionThisWeek, 'Read the event guideline and ask the advisor what to verify first.'))
  const weekly = firstList(event.weekly, event.weeklyTraining)
  const evidence = firstList(event.evidence, event.evidenceToCollect)
  const mistakes = firstList(event.mistakes, event.commonMistakes)

  return {
    ...event,
    id: safeText(event.id, safeText(event.name, 'event').toLowerCase().replaceAll(' ', '-')),
    name: safeText(event.name, 'Untitled event'),
    track: safeText(event.track, 'Verify track with advisor'),
    format: safeText(event.format, 'Verify format with advisor'),
    team: safeText(event.team, 'Verify in guideline'),
    difficulty: safeText(event.difficulty, 'Verify with advisor'),
    commitment: safeText(event.commitment, 'Serious'),
    time: safeNumber(event.time),
    bestFor: safeArray(event.bestFor),
    avoidIf: safeArray(event.avoidIf),
    why,
    firstAction,
    weekly,
    evidence,
    mistakes,
    officerCoaching: safeArray(event.officerCoaching),
  }
}

export const FINAL_EVENT_BATCH = RAW_FINAL_EVENT_BATCH.map(normalizeEvent)

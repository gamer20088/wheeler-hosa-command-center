import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, BookOpen, CheckCircle2, ClipboardCheck, Copy, ExternalLink, Search } from 'lucide-react'
import { EVENT_PREP_PACKS } from './eventPrepPacks.js'
import { getResourcesForPack } from './prepResourceLinks.js'
import { PORTAL_LINKS } from './portalConfig.js'
import { t } from './i18n.js'

const PACK_FILTERS = ['All', 'Test Prep', 'Writing and Speaking', 'Project and Upload', 'Team Events', 'Career and Creative']
const RESOURCE_GROUP_ORDER = ['Official Rules', 'Learn', 'Practice', 'Research', 'Examples', 'Career', 'Spanish-Friendly']
const RESOURCE_TYPE_LABELS_ES = {
  'Official Rules': 'Reglas oficiales',
  Learn: 'Aprender',
  Practice: 'Práctica',
  Research: 'Investigación',
  Examples: 'Ejemplos',
  Career: 'Carrera',
  'Spanish-Friendly': 'Recursos en español',
}
const RESOURCE_LINK_NOTE = 'Links open outside this portal. Use them for study, examples, and background. Always verify official HOSA rules separately.'
const RESOURCE_LINK_NOTE_ES = 'Los enlaces abren fuera de este portal. Úsalos para estudiar, buscar ejemplos y entender el tema. Verifica siempre las reglas oficiales de HOSA por separado.'

function scrollToTop() {
  if (typeof window === 'undefined') return
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

function safeArray(value) {
  return Array.isArray(value) ? value : []
}

function resourceTypeLabel(language, type) {
  return language === 'es' ? RESOURCE_TYPE_LABELS_ES[type] || type : type
}

function SectionCard({ title, children }) {
  return <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200"><h3 className="text-base font-black text-slate-950">{title}</h3><div className="mt-3">{children}</div></section>
}

function BulletList({ items }) {
  return <div className="space-y-2">{safeArray(items).map((item) => <div key={typeof item === 'string' ? item : `${item.week}-${item.focus}`} className="flex gap-2 text-sm leading-6 text-slate-700"><CheckCircle2 size={15} className="mt-1 shrink-0 text-blue-900" /><span>{typeof item === 'string' ? item : <><span className="font-black text-slate-950">{item.week}:</span> {item.focus}</>}</span></div>)}</div>
}

function PrepButton({ children, onClick, href, variant = 'primary', icon: Icon }) {
  const className = cx(
    'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-blue-300',
    variant === 'primary' ? 'bg-blue-950 text-white hover:bg-blue-900' : 'bg-white text-slate-950 ring-1 ring-slate-200 hover:bg-blue-50 hover:ring-blue-300',
  )
  if (href) return <a href={href} target="_blank" rel="noreferrer" className={className}>{Icon && <Icon size={16} />}{children}</a>
  return <button type="button" onClick={onClick} className={className}>{Icon && <Icon size={16} />}{children}</button>
}

function groupResources(resources) {
  const grouped = RESOURCE_GROUP_ORDER.map((type) => [type, []])
  const fallbackGroup = grouped.find(([type]) => type === 'Learn')[1]
  safeArray(resources).forEach((resource) => {
    const type = RESOURCE_GROUP_ORDER.includes(resource?.type) ? resource.type : 'Learn'
    const group = grouped.find(([groupType]) => groupType === type)?.[1] || fallbackGroup
    group.push({ ...resource, type })
  })
  return grouped.filter(([, items]) => items.length)
}

function ResourceCard({ resource, language }) {
  const isLocalNote = resource.url === '#'
  const content = <><span className="flex items-start justify-between gap-3 text-sm font-black text-slate-950"><span>{resource.label}</span>{!isLocalNote && <ExternalLink size={15} className="mt-0.5 shrink-0 text-blue-950" />}</span><span className="mt-2 inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-black text-blue-950 ring-1 ring-blue-100">{resourceTypeLabel(language, resource.type || 'Learn')}</span><span className="mt-2 block text-sm leading-6 text-slate-600">{resource.why}</span></>
  if (isLocalNote) return <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">{content}</div>
  return <a href={resource.url} target="_blank" rel="noreferrer" className="block cursor-pointer rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300">{content}</a>
}

function packToText(pack) {
  const resources = getResourcesForPack(pack)
  const lines = [
    `${pack.eventName} Prep Pack`,
    `Type: ${pack.packType}`,
    `Best for: ${pack.bestFor}`,
    '',
    'Official reminder:',
    pack.officialReminder,
    '',
    'Start Here:',
    ...safeArray(pack.startHere).map((item) => `- ${item}`),
    '',
    '4-Week Plan:',
    ...safeArray(pack.fourWeekPlan).map((item) => `- ${item.week}: ${item.focus}`),
    '',
    'Practice Tasks:',
    ...safeArray(pack.practiceTasks).map((item) => `- ${item}`),
    '',
    'Free Resources:',
    ...safeArray(resources).map((resource) => `- ${resource.label}: ${resource.url} (${resource.why})`),
    '',
    'Evidence to Save:',
    ...safeArray(pack.evidenceToSave).map((item) => `- ${item}`),
    '',
    'Watch Outs:',
    ...safeArray(pack.watchOuts).map((item) => `- ${item}`),
  ]
  return lines.join('\n')
}

function checklistToText(pack) {
  return [
    `${pack.eventName} Officer Review Checklist`,
    ...safeArray(pack.officerChecklist).map((item) => `- ${item}`),
    '',
    'Mock Practice Rubric:',
    ...safeArray(pack.mockRubric).map((item) => `- ${item.category}: ${item.lookFor}`),
  ].join('\n')
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text)
    window.alert(successMessage)
  } catch {
    window.alert('Copy failed. Try again from a secure browser window.')
  }
}

function PrepPackCard({ pack, onOpen, language }) {
  return <article className="flex h-full flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-300"><div className="flex-1"><p className="text-xs font-black uppercase tracking-wide text-rose-900">{t(language, pack.packType, pack.packType)}</p><h3 className="mt-1 text-lg font-black text-slate-950">{pack.eventName}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-700">{pack.bestFor}</p><div className="mt-3 flex flex-wrap gap-2">{safeArray(pack.quickTags).slice(0, 3).map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-700 ring-1 ring-slate-200">{tag}</span>)}</div></div><PrepButton onClick={() => onOpen(pack)} icon={BookOpen}>{t(language, 'openPrepPage', 'Open prep page')}</PrepButton></article>
}

function PrepPackPage({ pack, onBack, language }) {
  const resourceGroups = groupResources(getResourcesForPack(pack))
  return <div className="space-y-5">
<section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5">
<button type="button" onClick={onBack} className="mb-4 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-black text-slate-700 transition hover:bg-blue-50 hover:ring-1 hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"><ArrowLeft size={16} />{t(language, 'backToPrepHub', 'Back to Prep Hub')}</button>
<div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
<div>
<p className="text-xs font-black uppercase tracking-wide text-rose-900">{t(language, pack.packType, pack.packType)}</p>
<h2 className="mt-1 text-3xl font-black tracking-tight text-slate-950">{pack.eventName}</h2>
<p className="mt-2 max-w-3xl text-sm font-bold leading-6 text-slate-700">{pack.bestFor}</p>
<div className="mt-3 flex flex-wrap gap-2">{safeArray(pack.quickTags).map((tag) => <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-950 ring-1 ring-blue-100">{tag}</span>)}</div>
</div>
<div className="grid gap-2 sm:grid-cols-3 lg:min-w-96 lg:grid-cols-1">
<PrepButton onClick={() => copyText(packToText(pack), t(language, 'prepPackCopied', 'Prep pack copied.'))} icon={Copy}>{t(language, 'copyPrepPack', 'Copy prep pack')}</PrepButton>
<PrepButton onClick={() => copyText(checklistToText(pack), t(language, 'officerChecklistCopied', 'Officer checklist copied.'))} variant="light" icon={ClipboardCheck}>{t(language, 'copyOfficerChecklist', 'Copy officer checklist')}</PrepButton>
<PrepButton href={PORTAL_LINKS.officialGuidelines} variant="light" icon={ExternalLink}>{t(language, 'openOfficialHosaGuidelines', 'Open official HOSA guidelines')}</PrepButton>
</div>
</div>
<div className="mt-4 rounded-xl bg-amber-50 p-3 text-sm font-bold leading-6 text-amber-950 ring-1 ring-amber-200"><span className="font-black">{t(language, 'officialReminder', 'Official reminder')}:</span> {pack.officialReminder}</div>
</section>
<div className="grid gap-4 lg:grid-cols-2">
<SectionCard title={t(language, 'startHere', 'Start Here')}><BulletList items={pack.startHere} /></SectionCard>
<SectionCard title={t(language, 'fourWeekPlan', '4-Week Plan')}><BulletList items={pack.fourWeekPlan} /></SectionCard>
<SectionCard title={t(language, 'practiceTasks', 'Practice Tasks')}><BulletList items={pack.practiceTasks} /></SectionCard>
<SectionCard title={t(language, 'freeResources', 'Free Resources')}>
<div className="space-y-4">{resourceGroups.map(([type, resources]) => <div key={type}>
<h4 className="mb-2 text-xs font-black uppercase tracking-wide text-rose-900">{resourceTypeLabel(language, type)}</h4>
<div className="space-y-2">{resources.map((resource) => <ResourceCard key={`${resource.label}-${resource.url}`} resource={resource} language={language} />)}</div>
</div>)}</div>
<p className="mt-4 rounded-xl bg-blue-50 p-3 text-xs font-bold leading-5 text-blue-950 ring-1 ring-blue-100">{language === 'es' ? RESOURCE_LINK_NOTE_ES : RESOURCE_LINK_NOTE}</p>
</SectionCard>
<SectionCard title={t(language, 'evidenceToSave', 'Evidence to Save')}><BulletList items={pack.evidenceToSave} /></SectionCard>
<SectionCard title={t(language, 'officerReviewChecklist', 'Officer Review Checklist')}><BulletList items={pack.officerChecklist} /></SectionCard>
<SectionCard title={t(language, 'mockPracticeRubric', 'Mock Practice Rubric')}><div className="space-y-2">{safeArray(pack.mockRubric).map((item) => <div key={item.category} className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200"><p className="text-sm font-black text-slate-950">{item.category}</p><p className="mt-1 text-sm leading-6 text-slate-700">{item.lookFor}</p></div>)}</div></SectionCard>
<SectionCard title={t(language, 'watchOuts', 'Watch Outs')}><BulletList items={pack.watchOuts} /></SectionCard>
</div>
</div>
}

export function PrepHub({ language }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedPack, setSelectedPack] = useState(null)

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash || ''
      if (!hash.startsWith('#prep/')) return
      const slug = hash.replace('#prep/', '')
      const pack = EVENT_PREP_PACKS.find((item) => item.slug === slug)
      if (pack) setSelectedPack(pack)
    }
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])

  useEffect(() => {
    if (!selectedPack) return
    window.setTimeout(scrollToTop, 0)
  }, [selectedPack])

  const filteredPacks = useMemo(() => {
    const searchTerm = query.trim().toLowerCase()
    return EVENT_PREP_PACKS.filter((pack) => {
      const matchesCategory = category === 'All' || pack.category === category
      const matchesSearch = !searchTerm || [pack.eventName, pack.packType, pack.bestFor, ...safeArray(pack.quickTags)].join(' ').toLowerCase().includes(searchTerm)
      return matchesCategory && matchesSearch
    })
  }, [category, query])

  const openPack = (pack) => {
    setSelectedPack(pack)
    if (typeof window !== 'undefined') window.location.hash = `prep/${pack.slug}`
    scrollToTop()
  }
  const closePack = () => {
    setSelectedPack(null)
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#prep/')) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    }
    scrollToTop()
  }

  if (selectedPack) return <PrepPackPage pack={selectedPack} onBack={closePack} language={language} />

  return <div className="space-y-5"><section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5"><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><div className="flex items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-950"><BookOpen size={21} /></div><div><h2 className="text-2xl font-black tracking-tight text-slate-950">{t(language, 'prepHub', 'Prep Hub')}</h2><p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">{t(language, 'prepHubSubtitle', 'Free practice packs, source links, and officer checklists for HOSA event prep.')}</p></div></div><div className="mt-4 rounded-xl bg-amber-50 p-3 text-sm font-bold leading-6 text-amber-950 ring-1 ring-amber-200">{t(language, 'prepHubDisclaimer', 'These are unofficial Wheeler HOSA prep supports. Always verify official HOSA guidelines and Georgia SLC requirements with the Wheeler advisor.')}</div></div><div className="grid gap-3 sm:grid-cols-2 lg:min-w-[28rem]"><label className="block"><span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-600">{t(language, 'searchPacks', 'Search packs')}</span><div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t(language, 'searchPacks', 'Search packs')} className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none transition hover:border-blue-300 focus:ring-2 focus:ring-blue-300" /></div></label><label className="block"><span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-600">{t(language, 'filterByType', 'Filter by type')}</span><select value={category} onChange={(event) => setCategory(event.target.value)} className="h-11 w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 outline-none transition hover:border-blue-300 hover:bg-blue-50 focus:ring-2 focus:ring-blue-300">{PACK_FILTERS.map((filter) => <option key={filter} value={filter}>{t(language, filter, filter)}</option>)}</select></label></div></div></section><section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{filteredPacks.map((pack) => <PrepPackCard key={pack.slug} pack={pack} onOpen={openPack} language={language} />)}</section></div>
}

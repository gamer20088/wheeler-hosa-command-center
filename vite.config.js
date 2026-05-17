import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function addFinalEventBatch() {
  return {
    name: 'add-final-event-batch',
    enforce: 'pre',
    transform(code, id) {
      if (!normalizePath(id).endsWith('/src/StudentPortal.jsx')) return null
      if (code.includes('FINAL_EVENT_BATCH')) return null

      let updated = code.replace(
        /(import \{[\s\S]*?\} from 'lucide-react'\n)/,
        "$1import { FINAL_EVENT_BATCH } from './finalEventBatchSafe.js'\nimport { EnhancedEventLibrary, normalizeEvents, safeArray, safeText } from './eventProcess.jsx'\n",
      )
      updated = updated.replace('const EVENTS = [', 'const BASE_EVENTS = [')
      updated = updated.replace(
        /\]\n\nconst PROFILE_DEFAULT/,
        ']\nconst EVENTS = normalizeEvents([...BASE_EVENTS, ...FINAL_EVENT_BATCH])\n\nconst PROFILE_DEFAULT',
      )
      updated = updated
        .replace("function Button({ children, onClick, variant = 'primary', icon: Icon, className = '' }) { return <button onClick={onClick} className={cx('inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-teal-300'", "function Button({ children, onClick, variant = 'primary', icon: Icon, className = '' }) { return <button onClick={onClick} className={cx('inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-teal-300'")
        .replace("function Chip({ children, active, onClick }) { return <button onClick={onClick} className={cx('rounded-full px-3 py-2 text-sm font-bold transition'", "function Chip({ children, active, onClick }) { return <button onClick={onClick} className={cx('cursor-pointer rounded-full px-3 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-teal-300'")
        .replace('function ListBlock({ title, items, icon: Icon = CheckCircle2 }) { return <div><h3 className="mb-3 flex items-center gap-2 text-sm font-black text-slate-950"><Icon size={17} className="text-teal-600" />{title}</h3><div className="space-y-2">{items.map((item) => <div key={item} className="flex gap-2 text-sm leading-6 text-slate-700"><CheckCircle2 size={15} className="mt-1 shrink-0 text-teal-500" /><span>{item}</span></div>)}</div></div> }', 'function ListBlock({ title, items, icon: Icon = CheckCircle2 }) { return <div><h3 className="mb-3 flex items-center gap-2 text-sm font-black text-slate-950"><Icon size={17} className="text-teal-600" />{title}</h3><div className="space-y-2">{safeArray(items).map((item) => <div key={item} className="flex gap-2 text-sm leading-6 text-slate-700"><CheckCircle2 size={15} className="mt-1 shrink-0 text-teal-500" /><span>{item}</span></div>)}</div></div> }')
        .replace('Card className="bg-slate-950 text-white"', 'Card className="bg-white"')
        .replace('className="max-w-3xl text-3xl font-black tracking-tight sm:text-5xl"', 'className="max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-5xl"')
        .replace('className="mt-4 max-w-2xl text-base leading-7 text-slate-300"', 'className="mt-4 max-w-2xl text-base font-medium leading-7 text-slate-700"')
        .replace('className="hidden rounded-xl bg-slate-950 px-3 py-2 text-sm font-bold text-white transition hover:bg-slate-800 sm:inline-flex"', 'className="hidden cursor-pointer rounded-xl bg-slate-950 px-3 py-2 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-300 sm:inline-flex"')
        .replace("className={cx('flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-black transition'", "className={cx('flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-teal-300'")
        .replace(/function EventLibrary\(\{ selectedEventId, setSelectedEventId, setTab \}\) \{[\s\S]*?\n\}\n\nfunction MyPlan/, 'function EventLibrary({ selectedEventId, setSelectedEventId, setTab }) { return <EnhancedEventLibrary events={EVENTS} selectedEventId={selectedEventId} setSelectedEventId={setSelectedEventId} setTab={setTab} /> }\n\nfunction MyPlan')

      if (updated === code) {
        this.error('Could not attach final event batch to StudentPortal.jsx')
      }

      return { code: updated, map: null }
    },
  }
}

export default defineConfig({
  plugins: [addFinalEventBatch(), react(), tailwindcss()],
})

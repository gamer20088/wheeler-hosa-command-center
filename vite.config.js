import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function addFinalEventBatch() {
  return {
    name: 'add-final-event-batch',
    transform(code, id) {
      if (!id.endsWith('/src/StudentPortal.jsx') && !id.endsWith('\\src\\StudentPortal.jsx')) return null
      return code
        .replace("import { AlertTriangle, ArrowRight, BookOpen, CalendarCheck, CheckCircle2, ChevronDown, ClipboardCheck, ClipboardList, Copy, Download, ExternalLink, FileText, Filter, GraduationCap, HeartPulse, Home, Info, Lightbulb, Link as LinkIcon, Search, ShieldCheck, Sparkles, Target } from 'lucide-react'", "import { AlertTriangle, ArrowRight, BookOpen, CalendarCheck, CheckCircle2, ChevronDown, ClipboardCheck, ClipboardList, Copy, Download, ExternalLink, FileText, Filter, GraduationCap, HeartPulse, Home, Info, Lightbulb, Link as LinkIcon, Search, ShieldCheck, Sparkles, Target } from 'lucide-react'\nimport { FINAL_EVENT_BATCH } from './finalEventBatch.js'")
        .replace('const EVENTS = [', 'const BASE_EVENTS = [')
        .replace(']\n\nconst PROFILE_DEFAULT', ']\nconst EVENTS = [...BASE_EVENTS, ...FINAL_EVENT_BATCH]\n\nconst PROFILE_DEFAULT')
    },
  }
}

export default defineConfig({
  plugins: [addFinalEventBatch(), react(), tailwindcss()],
})

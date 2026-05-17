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

      const withImport = code.replace(
        /(import \{[\s\S]*?\} from 'lucide-react'\n)/,
        "$1import { FINAL_EVENT_BATCH } from './finalEventBatchSafe.js'\n",
      )
      const withBaseEvents = withImport.replace('const EVENTS = [', 'const BASE_EVENTS = [')
      const withFinalEvents = withBaseEvents.replace(
        /\]\n\nconst PROFILE_DEFAULT/,
        ']\nconst EVENTS = [...BASE_EVENTS, ...FINAL_EVENT_BATCH]\n\nconst PROFILE_DEFAULT',
      )

      if (withFinalEvents === code) {
        this.error('Could not attach final event batch to StudentPortal.jsx')
      }

      return { code: withFinalEvents, map: null }
    },
  }
}

export default defineConfig({
  plugins: [addFinalEventBatch(), react(), tailwindcss()],
})

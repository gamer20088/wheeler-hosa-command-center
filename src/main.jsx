import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StudentPortal from './StudentPortal.jsx'
import { LanguageShell } from './LanguageShell.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageShell>
      <StudentPortal />
    </LanguageShell>
  </StrictMode>,
)

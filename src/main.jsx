import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StudentPortal from './StudentPortal.jsx'
import { LanguageShell } from './LanguageShell.jsx'
import { NavigationSimplifier } from './NavigationSimplifier.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageShell>
      <NavigationSimplifier>
        <StudentPortal />
      </NavigationSimplifier>
    </LanguageShell>
  </StrictMode>,
)

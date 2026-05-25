import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StudentPortal from './StudentPortal.jsx'
import { LanguageShell } from './LanguageShell.jsx'
import { NavigationSimplifier } from './NavigationSimplifier.jsx'
import { SiteFooter } from './SiteFooter.jsx'
import { FirstVisitOnboarding } from './FirstVisitOnboarding.jsx'
import { TransparentFitScoringEnhancer } from './transparentFitScoringEnhancer.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageShell>
      <NavigationSimplifier>
        <StudentPortal />
        <SiteFooter />
        <FirstVisitOnboarding />
        <TransparentFitScoringEnhancer />
      </NavigationSimplifier>
    </LanguageShell>
  </StrictMode>,
)

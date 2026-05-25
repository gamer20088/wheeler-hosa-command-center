import { useEffect, useState } from 'react'
import { LANGUAGE_STORAGE_KEY, readLanguage, translateVisibleText } from './i18n.js'
import { applySpanishEventLibraryPatches } from './spanishEventLibraryPatches.js'
import { applySpanishTextPatches } from './spanishTextPatcher.js'

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function LanguageShell({ children }) {
  const [language, setLanguage] = useState(readLanguage)

  const chooseLanguage = (nextLanguage) => {
    const cleanLanguage = nextLanguage === 'es' ? 'es' : 'en'
    setLanguage(cleanLanguage)
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, cleanLanguage)
    } catch {
      // Language choice is saved locally only when storage is available.
    }
  }

  useEffect(() => {
    const root = document.getElementById('root')
    const runTranslation = () => {
      translateVisibleText(language, root)
      applySpanishTextPatches(root)
      applySpanishEventLibraryPatches(root)
    }
    window.setTimeout(runTranslation, 0)
    if (language !== 'es' || !root) return undefined
    const observer = new MutationObserver(runTranslation)
    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['placeholder', 'aria-label', 'title'],
    })
    return () => observer.disconnect()
  }, [language])

  return <div key={language} className="min-h-screen"><div className="fixed right-3 top-3 z-[60] inline-flex rounded-xl bg-white/95 p-1 shadow-sm ring-1 ring-slate-200 backdrop-blur" aria-label="Language"><button type="button" onClick={() => chooseLanguage('en')} className={cx('cursor-pointer rounded-lg px-3 py-1.5 text-xs font-black transition focus:outline-none focus:ring-2 focus:ring-blue-300', language === 'en' ? 'bg-blue-950 text-white' : 'text-slate-700 hover:bg-blue-50')}>English</button><button type="button" onClick={() => chooseLanguage('es')} className={cx('cursor-pointer rounded-lg px-3 py-1.5 text-xs font-black transition focus:outline-none focus:ring-2 focus:ring-blue-300', language === 'es' ? 'bg-blue-950 text-white' : 'text-slate-700 hover:bg-blue-50')}>{'Espa\u00f1ol'}</button></div>{children}</div>
}

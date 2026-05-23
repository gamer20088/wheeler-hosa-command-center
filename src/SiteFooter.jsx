import { useEffect, useState } from 'react'
import { readLanguage } from './i18n.js'
import { PORTAL_LINKS } from './portalConfig.js'

const TEXT = {
  en: {
    footerLabel: 'Unofficial student-built portal',
    credit: 'Built and maintained by Arda Madanoglu',
    verify: 'Verify official HOSA guidelines and Georgia SLC rules with the Wheeler advisor',
    about: 'About / Credits',
    title: 'About this portal',
    body:
      'Wheeler HOSA Competition Portal is an unofficial student-built prep tool created to help students explore events, open prep packs, track practice, and prepare for Georgia SLC.',
    creditLine: 'Built and maintained by Arda Madanoglu.',
    disclaimer:
      'This portal is not an official HOSA, Georgia HOSA, or school registration system. Always verify official event guidelines, deadlines, dress code, upload rules, and Georgia SLC procedures with the Wheeler advisor and official HOSA sources.',
    privacy:
      "This site may save selected events, local practice logs, and readiness checklist items on the student's device. Do not enter medical, personal health, family, or private information.",
    version: 'Beta version for Wheeler HOSA competition preparation.',
    close: 'Close',
    guidelines: 'Open official guidelines',
  },
  es: {
    footerLabel: 'Portal no oficial creado por estudiante',
    credit: 'Creado y mantenido por Arda Madanoglu',
    verify: 'Verifica las guias oficiales de HOSA y las reglas del SLC de Georgia con el asesor de Wheeler',
    about: 'Acerca de / Creditos',
    title: 'Acerca de este portal',
    body:
      'Wheeler HOSA Competition Portal es una herramienta no oficial de preparacion creada por estudiante para ayudar a explorar eventos, abrir paquetes de preparacion, registrar practica y prepararse para el SLC de Georgia.',
    creditLine: 'Creado y mantenido por Arda Madanoglu.',
    disclaimer:
      'Este portal no es un sistema oficial de HOSA, Georgia HOSA ni de inscripcion escolar. Verifica siempre las guias oficiales del evento, fechas limite, codigo de vestimenta, reglas de entrega y procedimientos del SLC de Georgia con el asesor de Wheeler y fuentes oficiales de HOSA.',
    privacy:
      'Este sitio puede guardar eventos seleccionados, registros locales de practica y listas de preparacion en el dispositivo del estudiante. No ingreses informacion medica, de salud personal, familiar o privada.',
    version: 'Version beta para la preparacion de competencias de Wheeler HOSA.',
    close: 'Cerrar',
    guidelines: 'Abrir guias oficiales',
  },
}

function getText() {
  return TEXT[readLanguage()] || TEXT.en
}

export function SiteFooter() {
  const [open, setOpen] = useState(false)
  const text = getText()

  useEffect(() => {
    if (!open) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <>
      <footer className="mx-auto w-full max-w-7xl px-4 pb-6 pt-2 sm:px-6">
        <div className="flex flex-col gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="font-black text-blue-950">{text.footerLabel}</p>
            <p>
              <span className="font-bold text-rose-900">{text.credit}</span>
              <span className="mx-2 hidden text-slate-300 sm:inline">|</span>
              <span className="block sm:inline">{text.verify}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-black text-blue-950 ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {text.about}
          </button>
        </div>
      </footer>

      {open ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/55 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false)
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-footer-modal-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 text-slate-700 shadow-2xl ring-1 ring-slate-200"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-rose-900">{text.footerLabel}</p>
                <h2 id="site-footer-modal-title" className="mt-1 text-2xl font-black text-blue-950">
                  {text.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={text.close}
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-slate-100 text-lg font-black text-slate-700 transition hover:bg-blue-50 hover:text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                x
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm leading-6">
              <p>{text.body}</p>
              <p className="font-bold text-blue-950">{text.creditLine}</p>
              <div className="rounded-xl border-l-4 border-rose-800 bg-blue-50 p-3">
                <p className="font-bold text-blue-950">{text.disclaimer}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
                <p>{text.privacy}</p>
              </div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{text.version}</p>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-black text-slate-800 ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {text.close}
              </button>
              <a
                href={PORTAL_LINKS.officialGuidelines}
                target="_blank"
                rel="noreferrer"
                className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-blue-950 px-4 py-2 text-sm font-black text-white transition hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {text.guidelines}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

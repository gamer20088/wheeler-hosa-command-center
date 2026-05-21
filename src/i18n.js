export const LANGUAGE_STORAGE_KEY = 'wheelerHosaLanguage'

const uiTextTranslations = {
  'Home': 'Inicio',
  'Event Finder': 'Buscador de eventos',
  'Event Library': 'Biblioteca de eventos',
  'My Plan': 'Mi plan',
  'Proof Tracker': 'Registro de evidencia',
  'Officer Tools': 'Herramientas de oficiales',
  'Official Guidelines': 'Guias oficiales',
  'Glossary': 'Glosario',
  'Competition Portal': 'Portal de competencia',
  'Choose your event. Know your next step.': 'Escoge tu evento. Conoce tu proximo paso.',
  'Pick a realistic HOSA event, build a weekly plan, and submit proof.': 'Escoge un evento HOSA realista, crea un plan semanal y entrega evidencia.',
  'Start Event Finder': 'Iniciar buscador',
  'Browse Events': 'Ver eventos',
  'View My Plan': 'Ver mi plan',
  'Student flow': 'Flujo del estudiante',
  'Find your best event': 'Encuentra tu mejor evento',
  'Save your plan': 'Guarda tu plan',
  'Submit weekly proof': 'Entregar evidencia semanal',
  '4-step finder': 'Buscador de 4 pasos',
  'Saved here': 'Guardado aqui',
  'Quick student quiz': 'Cuestionario rapido para estudiantes',
  'Pick your best fit areas': 'Escoge tus mejores areas',
  'Choose the skills that actually sound like you.': 'Escoge las habilidades que realmente se parecen a ti.',
  'Pick 2 to 4. Do not select everything.': 'Escoge de 2 a 4. No selecciones todo.',
  'Format and time': 'Formato y tiempo',
  'Preferred event format': 'Formato de evento preferido',
  'Weekly prep hours': 'Horas de preparacion semanal',
  'Meeting reliability': 'Responsabilidad para reuniones',
  'See Matches': 'Ver resultados',
  'Your result': 'Tu resultado',
  'Best Match': 'Mejor opcion',
  'Backup Match': 'Opcion de respaldo',
  'Retake Quiz': 'Repetir cuestionario',
  'Why this fits': 'Por que encaja',
  'Event Overview': 'Resumen del evento',
  'Why this event fits': 'Por que este evento encaja',
  'Competition Process': 'Proceso de competencia',
  "This week's first action": 'Primera accion de esta semana',
  'Evidence to collect': 'Evidencia para guardar',
  'Use this event': 'Usar este evento',
  'Search': 'Buscar',
  'Track': 'Area',
  'Difficulty': 'Dificultad',
  'Format': 'Formato',
  'Commitment': 'Compromiso',
  'Process': 'Proceso',
  'Saved Events': 'Eventos guardados',
  'Saved on this device only.': 'Guardado solo en este dispositivo.',
  'Save events here before choosing your main event.': 'Guarda eventos aqui antes de escoger tu evento principal.',
  'Clear saved events': 'Borrar eventos guardados',
  'Compare saved events': 'Comparar eventos guardados',
  'Saved Events Compare': 'Comparacion de eventos guardados',
  'Pick the event that feels realistic, clear, and worth practicing every week.': 'Escoge el evento que sea realista, claro y que valga la pena practicar cada semana.',
  'Close saved events compare': 'Cerrar comparacion de eventos guardados',
  'Save event': 'Guardar evento',
  'Remove saved event': 'Quitar evento guardado',
  'View overview': 'Ver resumen',
  'Selected Event': 'Evento seleccionado',
  "This Week's Action": 'Accion de esta semana',
  'Weekly Proof You Should Submit': 'Evidencia semanal que debes entregar',
  'Compact Readiness Progress': 'Progreso de preparacion',
  'Go to Proof Tracker': 'Ir al registro de evidencia',
  'Copy Plan': 'Copiar plan',
  'Download Plan': 'Descargar plan',
  'What do you need next?': 'Que necesitas despues?',
  'Choose a section to review': 'Escoge una seccion para revisar',
  'Plain English Summary': 'Resumen en palabras simples',
  'Requirements': 'Requisitos',
  'Before Georgia SLC': 'Antes del SLC de Georgia',
  'Ready When': 'Listo cuando',
  'Weekly Training': 'Entrenamiento semanal',
  'Evidence to Collect': 'Evidencia para guardar',
  'Common Mistakes': 'Errores comunes',
  'Officer Feedback': 'Comentarios de oficiales',
  'Reset checklist': 'Reiniciar lista',
  'Submit proof, practice with a timer, and save local practice notes.': 'Entrega evidencia, practica con un temporizador y guarda notas locales.',
  'Submit Proof': 'Entregar evidencia',
  'Practice Timer': 'Temporizador de practica',
  'Proof Examples': 'Ejemplos de evidencia',
  'Privacy + Code': 'Privacidad + codigo',
  'Submit Weekly Proof': 'Entregar evidencia semanal',
  'Open Weekly Proof Form': 'Abrir formulario de evidencia',
  'Add Weekly Reminder': 'Agregar recordatorio semanal',
  'Add Calendar Reminder': 'Agregar recordatorio',
  'View Proof Calendar': 'Ver calendario de evidencia',
  'Open Proof Calendar': 'Abrir calendario de evidencia',
  'Practice Log': 'Registro de practica',
  'Practice type': 'Tipo de practica',
  'Timer duration': 'Duracion del temporizador',
  'Remaining time': 'Tiempo restante',
  'Start': 'Iniciar',
  'Pause': 'Pausar',
  'Reset': 'Reiniciar',
  'Save practice': 'Guardar practica',
  'Recent practice': 'Practica reciente',
  'Copy practice summary': 'Copiar resumen de practica',
  'Clear practice log': 'Borrar registro de practica',
  'Sound alert on': 'Alerta con sonido activada',
  'Test sound': 'Probar sonido',
  'What Counts as Proof?': 'Que cuenta como evidencia?',
  'Good Proof for Your Selected Event': 'Buena evidencia para tu evento seleccionado',
  'Proof Code': 'Codigo de evidencia',
  'Privacy Warning': 'Advertencia de privacidad',
  'Event Interest Form': 'Formulario de interes de eventos',
  'Review Weekly Proof / Open Tracker Sheet': 'Revisar evidencia semanal / Abrir hoja',
  'Officer Feedback Form': 'Formulario de comentarios de oficiales',
  'Mock Score Form': 'Formulario de puntaje de practica',
  'SLC Readiness Check': 'Revision de preparacion para SLC',
}

function translatePlainText(text) {
  const trimmed = text.trim()
  if (!trimmed) return text
  if (uiTextTranslations[trimmed]) return text.replace(trimmed, uiTextTranslations[trimmed])
  const selectedMatch = trimmed.match(/^Selected (\d+) of 4$/)
  if (selectedMatch) return text.replace(trimmed, `Seleccionado ${selectedMatch[1]} de 4`)
  const showingMatch = trimmed.match(/^Showing (\d+) of (\d+) events$/)
  if (showingMatch) return text.replace(trimmed, `Mostrando ${showingMatch[1]} de ${showingMatch[2]} eventos`)
  const targetMatch = trimmed.match(/^(\d+) target events$/)
  if (targetMatch) return text.replace(trimmed, `${targetMatch[1]} eventos objetivo`)
  return text
}

export function readLanguage() {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return saved === 'es' ? 'es' : 'en'
  } catch {
    return 'en'
  }
}

export function translateVisibleText(language, root = document.body) {
  if (language !== 'es' || !root) return
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const textNodes = []
  while (walker.nextNode()) textNodes.push(walker.currentNode)
  textNodes.forEach((node) => {
    const nextText = translatePlainText(node.nodeValue || '')
    if (nextText !== node.nodeValue) node.nodeValue = nextText
  })
}

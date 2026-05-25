import { readLanguage } from './i18n.js'

// This patcher keeps Spanish mode polished without rewriting the large StudentPortal.jsx file.
// It only applies exact visible-text replacements and avoids official event/source names.
const TEXT_PATCHES = {
  'Find your event': 'Encuentra tu evento',
  'Open prep pack': 'Abre tu paquete',
  'Open Prep Hub': 'Abrir Centro de preparación',
  'Use Prep Hub for practice tasks, resources, and checklists.': 'Usa el Centro de preparación para tareas, recursos y listas.',
  '27 target events': '27 eventos',
  '4-step finder': 'Buscador de 4 pasos',
  'Saved here': 'Guardado aquí',
  'Browse Events': 'Ver eventos',
  'View My Plan': 'Ver mi plan',
  'This helps avoid overcommitting.': 'Esto evita comprometerte de más.',
  'Preferred event format': 'Formato preferido',
  'Weekly prep hours': 'Horas semanales',
  'Responsibility for meetings': 'Responsabilidad para reuniones',
  Reliable: 'Confiable',
  'Sometimes busy': 'A veces ocupado',
  Unreliable: 'Poco confiable',
  Back: 'Atrás',
  'See Matches': 'Ver resultados',
  'Your result': 'Tu resultado',
  'Use this as a starting point, then verify the guideline.': 'Úsalo como punto de partida y verifica la guía.',
  'Best match': 'Mejor opción',
  'Best Match': 'Mejor opción',
  'Backup match': 'Opción de respaldo',
  'Backup Match': 'Opción de respaldo',
  fit: 'ajuste',
  'Plain English': 'En palabras simples',
  'Process type': 'Proceso',
  'Process Type': 'Proceso',
  'Main work': 'Trabajo principal',
  'Upload required?': '¿Entrega digital?',
  'Digital upload required?': '¿Entrega digital?',
  'Test required?': '¿Examen?',
  'Presentation required?': '¿Presentación?',
  'Why this fits': 'Por qué encaja',
  'Training track': 'Área de práctica',
  'Estimated weekly time': 'Tiempo semanal',
  'First action this week': 'Primera acción esta semana',
  'Uses speaking and presentation skills.': 'Usa habilidades de discurso y presentación.',
  'Your weekly time fits.': 'Tu tiempo semanal encaja.',
  'Open My Plan': 'Abrir mi plan',
  'For full practice tasks, free resources, and officer checklist, open the Prep Hub pack.': 'Para tareas, recursos y lista de oficiales, abre el paquete de preparación.',
  "This week's action": 'Acción de esta semana',
  "This Week's Action": 'Acción de esta semana',
  'Quick next steps': 'Siguientes pasos',
  'Start Timer': 'Iniciar temporizador',
  'Start Practice Timer': 'Iniciar temporizador',
  'Submit weekly proof': 'Entregar evidencia semanal',
  'Submit Weekly Proof': 'Entregar evidencia semanal',
  'Weekly Proof You Should Submit': 'Evidencia semanal',
  'Compact Readiness Progress': 'Progreso',
  'Local readiness checklist': 'Lista local',
  'Reset checklist': 'Reiniciar lista',
  'Read official guideline': 'Leer la guía oficial',
  'Picked main event': 'Elegí evento principal',
  'Completed first action': 'Completé la primera acción',
  'Submitted weekly proof': 'Entregué evidencia semanal',
  'Asked for officer feedback': 'Pedí comentarios',
  'Completed mock round': 'Completé la práctica',
  'Ready for Georgia SLC': 'Listo para Georgia SLC',
  'speech or presentation recording': 'grabación de discurso o presentación',
  'timing sheet': 'hoja de tiempo',
  'mock presentation feedback': 'comentarios de práctica',
  'Write a speech outline with opening, two main points, a health example, and closing.': 'Escribe un esquema con apertura, dos puntos, ejemplo de salud y cierre.',
  'Practice, log evidence, and submit proof.': 'Practica, guarda evidencia y entrega comprobante.',
  'Open full prep pack': 'Abrir paquete completo',
  'What did you practice?': '¿Qué practicaste?',
  'Saved on this device only. Official proof still needs to be submitted through the weekly proof form once links are added.': 'Guardado solo en este dispositivo. La evidencia oficial debe entregarse por el formulario semanal cuando se agreguen enlaces.',
  'No local practice entries yet. Save one after a practice session.': 'Todavía no hay prácticas. Guarda una nota después de practicar.',
  "No local practice entries yet. After practice, save a note like '20 min flashcards' or '30 min speech draft.'": 'Todavía no hay prácticas. Guarda una nota como “20 min tarjetas” o “30 min discurso”.',
  'Use this code on the form so officers know the submission came from Wheeler HOSA.': 'Usa este código en el formulario para que los oficiales sepan que viene de Wheeler HOSA.',
  'quiz score or practice test screenshot': 'resultado de quiz o captura de práctica',
  'writing draft or outline': 'borrador o esquema',
  'speech recording': 'grabación de discurso',
  'poster or portfolio draft': 'borrador de póster o portafolio',
  'campaign evidence': 'evidencia de campaña',
  'photo/video proof of practice': 'foto/video de práctica',
  'Add a weekly reminder so you do not forget proof submissions.': 'Agrega un recordatorio semanal para no olvidar la evidencia.',
  'After you submit proof, officers review it and give feedback through Officer Tools.': 'Después de entregar evidencia, los oficiales la revisan y dan comentarios.',
  'Proof Tracker': 'Registro de evidencia',
  'Practice Timer': 'Temporizador',
  'Proof Examples': 'Ejemplos',
  'Privacy + Code': 'Privacidad',
  'Proof Code': 'Código de evidencia',
  'Practice Log': 'Registro de práctica',
  'Practice type': 'Tipo de práctica',
  'Timer duration': 'Duración',
  'Remaining time': 'Tiempo restante',
  Start: 'Iniciar',
  Pause: 'Pausar',
  Reset: 'Reiniciar',
  'Sound alert on': 'Alerta activada',
  'Test sound': 'Probar sonido',
  'Optional note': 'Nota opcional',
  'Save practice': 'Guardar práctica',
  'Recent practice': 'Práctica reciente',
  'Copy practice summary': 'Copiar resumen',
  'Clear practice log': 'Borrar registro',
  'Verifica guias oficiales': 'Verifica guías oficiales',
  'Abrir guias oficiales': 'Abrir guías oficiales',
  'Acerca de / Creditos': 'Acerca de / Créditos',
  'Version beta': 'Versión beta',
  'informacion medica': 'información médica',
  'registrar practica': 'registrar práctica',
  'preparacion de Wheeler HOSA': 'preparación de Wheeler HOSA',
  'Guias oficiales': 'Guías oficiales',
  'Centro de preparacion': 'Centro de preparación',
  Informacion: 'Información',
  Practica: 'Práctica',
  Codigo: 'Código',
  Creditos: 'Créditos',
  preparacion: 'preparación',
  practica: 'práctica',
  rapido: 'rápido',
  politica: 'política',
  terminos: 'términos',
  raices: 'raíces',
  calculo: 'cálculo',
  precision: 'precisión',
  tecnologia: 'tecnología',
  publica: 'pública',
  medica: 'médica',
  despues: 'después',
  aqui: 'aquí',
  todavia: 'todavía',
  'Practica + cuidados': 'Práctica + cuidados',
  'Investigacion': 'Investigación',
  'En espanol': 'En español',
  'Usalos para estudiar y buscar ejemplos.': 'Úsalos para estudiar y buscar ejemplos.',
  'Usa Investigacion si necesitas evidencia mas fuerte.': 'Usa Investigación si necesitas evidencia más fuerte.',
  'Revision de oficiales': 'Revisión de oficiales',
}

function patchTextValue(value) {
  return Object.entries(TEXT_PATCHES).reduce((current, [source, replacement]) => {
    if (!current.includes(source)) return current
    return current.replaceAll(source, replacement)
  }, value)
}

export function applySpanishTextPatches(root = document.querySelector('[data-portal-root]')) {
  if (readLanguage() !== 'es' || !root || typeof NodeFilter === 'undefined') return

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const tag = node.parentElement?.tagName
      if (!tag || ['SCRIPT', 'STYLE', 'TEXTAREA'].includes(tag)) return NodeFilter.FILTER_REJECT
      return NodeFilter.FILTER_ACCEPT
    },
  })

  let node = walker.nextNode()
  while (node) {
    const nextValue = patchTextValue(node.nodeValue || '')
    if (nextValue !== node.nodeValue) node.nodeValue = nextValue
    node = walker.nextNode()
  }

  root.querySelectorAll('[placeholder], [aria-label], [title]').forEach((element) => {
    ;['placeholder', 'aria-label', 'title'].forEach((attribute) => {
      const value = element.getAttribute(attribute)
      if (!value) return
      const nextValue = patchTextValue(value)
      if (nextValue !== value) element.setAttribute(attribute, nextValue)
    })
  })
}

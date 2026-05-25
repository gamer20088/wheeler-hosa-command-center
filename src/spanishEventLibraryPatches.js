import { readLanguage } from './i18n.js'

const EXACT_PATCHES = {
  'Event Library': 'Biblioteca de eventos',
  'Browse events and open a quick overview when one looks interesting.': 'Explora eventos y abre un resumen rápido.',
  'Browse events, then open a quick overview when one looks interesting.': 'Explora eventos y abre un resumen rápido.',
  Search: 'Buscar',
  Track: 'Área',
  Difficulty: 'Dificultad',
  Format: 'Formato',
  Commitment: 'Tiempo',
  Process: 'Proceso',
  All: 'Todos',
  'Saved Events': 'Eventos guardados',
  'Saved Events Compare': 'Comparación de eventos guardados',
  'Compare saved events': 'Comparar eventos guardados',
  'Clear saved events': 'Borrar eventos guardados',
  'Save event': 'Guardar evento',
  'Remove saved event': 'Quitar evento guardado',
  Saved: 'Guardado',
  'View overview': 'Ver resumen',
  'Use event': 'Usar evento',
  'Use this event': 'Usar evento',
  'Open prep pack': 'Abrir paquete',
  Close: 'Cerrar',
  Test: 'Examen',
  'Verify SLC': 'Verificar SLC',
  Upload: 'Entrega',
  Presentation: 'Presentación',
  Team: 'Equipo',
  Solo: 'Individual',
  Low: 'Baja',
  'Low to Medium': 'Baja a media',
  Medium: 'Media',
  'Medium to High': 'Media a alta',
  High: 'Alta',
  'Team event': 'Evento de equipo',
  'Low lift': 'Poco tiempo',
  Serious: 'Serio',
  'High commitment': 'Alto compromiso',
  'Only for locked-in teams': 'Solo equipos muy comprometidos',
  'Writing, Policy, and Fast Thinking': 'Escritura, política y rapidez',
  'Beginner Test Events': 'Eventos de examen iniciales',
  'Psychology and Behavioral Health': 'Psicología y salud conductual',
  'Math and Healthcare Accuracy': 'Matemática y precisión en salud',
  'Healthcare Data and Systems': 'Datos y sistemas de salud',
  'Global Health, Equity, and Policy': 'Salud global, equidad y política',
  'Speaking and Leadership': 'Discurso y liderazgo',
  'Teaching, Outreach, and Evidence': 'Enseñanza, alcance y evidencia',
  'Campaign, Community, and Teamwork': 'Campaña, comunidad y equipo',
  'Public Health Planning': 'Planificación de salud pública',
  'Mental Health Outreach': 'Promoción de salud mental',
  'Video, Message, and Audience': 'Video, mensaje y audiencia',
  'Innovation, Prototype, and Feasibility': 'Innovación, prototipo y viabilidad',
  'Team Knowledge and Speed': 'Conocimiento en equipo y rapidez',
  'Argument, Evidence, and Policy': 'Argumento, evidencia y política',
  'Evidence, Science, and Analysis': 'Evidencia, ciencia y análisis',
  'Career Research and Visual Display': 'Investigación de carrera y presentación visual',
  'Research, Data, and Poster Design': 'Investigación, datos y póster',
  'Persuasive Health Argument': 'Argumento persuasivo de salud',
  'Current Healthcare Issues': 'Temas actuales de salud',
  'Law, Ethics, and Judgment': 'Ley, ética y criterio',
  'Outbreaks, Data, and Patterns': 'Brotes, datos y patrones',
  'Nutrition, Wellness, and Science': 'Nutrición, bienestar y ciencia',
  'Development, Lifespan, and Health': 'Desarrollo, ciclo de vida y salud',
  'Healthcare Systems and Leadership': 'Sistemas de salud y liderazgo',
  'Career Research and Photography': 'Carrera y fotografía',
  'A strong Wheeler target for students who can explain health issues clearly under time pressure.': 'Buena meta para estudiantes que explican temas de salud con claridad y bajo tiempo.',
  'A clear starter event for new members who can practice flashcards consistently.': 'Buen evento inicial para miembros nuevos que estudian tarjetas con constancia.',
  'A good fit for students who like psychology, health terms, and applied scenarios.': 'Buena opción para estudiantes que disfrutan psicología, términos de salud y casos aplicados.',
  'A strong STEM lane for students who are careful with units and calculations.': 'Ruta STEM fuerte para estudiantes cuidadosos con unidades y cálculos.',
  'A healthcare plus technology option for students who like systems, privacy, and data.': 'Opción de salud y tecnología para estudiantes que disfrutan sistemas, privacidad y datos.',
  'A distinctive global health event for students who can connect causes, consequences, and interventions.': 'Evento de salud global para estudiantes que conectan causas, consecuencias e intervenciones.',
  'Your result': 'Tu resultado',
  'Use this as a starting point, then verify the guideline.': 'Úsalo como punto de partida y verifica la guía.',
  'Best match': 'Mejor opción',
  'Best Match': 'Mejor opción',
  'Backup match': 'Opción de respaldo',
  'Backup Match': 'Opción de respaldo',
  fit: 'ajuste',
  'Process type': 'Proceso',
  'Process Type': 'Proceso',
  'Main work': 'Trabajo principal',
  'Upload required?': '¿Entrega digital?',
  'Test required?': '¿Examen?',
  'Presentation required?': '¿Presentación?',
  Yes: 'Sí',
  No: 'No',
  'Why this fits': 'Por qué encaja',
  'Training track': 'Área de práctica',
  'Estimated weekly time': 'Tiempo semanal',
  'First action this week': 'Primera acción esta semana',
  'Uses speaking and presentation skills.': 'Usa habilidades de discurso y presentación.',
  'Your weekly time fits.': 'Tu tiempo semanal encaja.',
  'Write a speech outline with opening, two main points, a health example, and closing.': 'Escribe un esquema con apertura, dos puntos, un ejemplo de salud y cierre.',
  'Study the event topics, learn the vocabulary, and practice timed questions.': 'Estudia los temas, aprende vocabulario y practica preguntas con tiempo.',
  'For full practice tasks, free resources, and officer checklist, open the Prep Hub pack.': 'Para tareas, recursos y lista de oficiales, abre el paquete de preparación.',
  'Quick next steps': 'Siguientes pasos',
  'Start Timer': 'Iniciar temporizador',
  'Submit weekly proof': 'Entregar evidencia semanal',
  'Practice, log evidence, and submit proof.': 'Practica, guarda evidencia y entrega comprobante.',
  'Open full prep pack': 'Abrir paquete completo',
  '0/120 characters': '0/120 caracteres',
  'Use this code on the form so officers know the submission came from Wheeler HOSA.': 'Usa este código en el formulario para que los oficiales sepan que viene de Wheeler HOSA.',
  'quiz score or practice test screenshot': 'resultado de quiz o captura de práctica',
  'writing draft or outline': 'borrador o esquema',
  'speech recording': 'grabación de discurso',
  'poster or portfolio draft': 'borrador de póster o portafolio',
  'campaign evidence': 'evidencia de campaña',
  'photo/video proof of practice': 'foto o video de práctica',
  'speech or presentation recording': 'grabación de discurso o presentación',
  'timing sheet': 'hoja de tiempo',
  'mock presentation feedback': 'comentarios de práctica',
  'Add a weekly reminder so you do not forget proof submissions.': 'Agrega un recordatorio semanal para no olvidar la evidencia.',
  'After you submit proof, officers review it and give feedback through Officer Tools.': 'Después de entregar evidencia, los oficiales la revisan y dan comentarios.',
  '|': '·',
}

const PHRASE_PATCHES = {
  'Eventos guardados esta lleno.': 'Eventos guardados está lleno.',
  'Guardado aqui': 'Guardado aquí',
  'Todavia': 'Todavía',
  'todavia': 'todavía',
  'practica': 'práctica',
  'Practica': 'Práctica',
  'preparacion': 'preparación',
  'Preparacion': 'Preparación',
  'guias': 'guías',
  'Guias': 'Guías',
  'Creditos': 'Créditos',
  'Informacion': 'Información',
  'politica': 'política',
  'Politica': 'Política',
  'terminos': 'términos',
  'raices': 'raíces',
  'calculos': 'cálculos',
  'calculo': 'cálculo',
  'precision': 'precisión',
  'tecnologia': 'tecnología',
  'publica': 'pública',
  'medica': 'médica',
  'despues': 'después',
  'rapido': 'rápido',
  'psicologia': 'psicología',
  'opcion': 'opción',
  'etica': 'ética',
  'presion': 'presión',
  'educacion': 'educación',
  'investigacion': 'investigación',
  'Investigacion': 'Investigación',
  'poster': 'póster',
  'clinicas': 'clínicas',
  'diseno': 'diseño',
  'senales': 'señales',
  'estas': 'estás',
  'revision': 'revisión',
  'Revision': 'Revisión',
}

function preserveWhitespace(original, translated) {
  const prefix = original.match(/^\s*/)?.[0] || ''
  const suffix = original.match(/\s*$/)?.[0] || ''
  return `${prefix}${translated}${suffix}`
}

function patchTextValue(value) {
  const trimmed = value.trim()
  let nextValue = value

  if (EXACT_PATCHES[trimmed]) nextValue = preserveWhitespace(value, EXACT_PATCHES[trimmed])

  const showingMatch = nextValue.trim().match(/^Showing (\d+) of (\d+) events$/i)
  if (showingMatch) nextValue = preserveWhitespace(nextValue, `Mostrando ${showingMatch[1]} de ${showingMatch[2]} eventos`)

  const countOfFourMatch = nextValue.trim().match(/^(\d+) of 4$/)
  if (countOfFourMatch) nextValue = preserveWhitespace(nextValue, `${countOfFourMatch[1]} de 4`)

  const hoursMatch = nextValue.trim().match(/^(\d+)\+ hrs$/)
  if (hoursMatch) nextValue = preserveWhitespace(nextValue, `${hoursMatch[1]}+ h`)

  const hoursWeekMatch = nextValue.trim().match(/^(\d+)\+ hrs\/week$/)
  if (hoursWeekMatch) nextValue = preserveWhitespace(nextValue, `${hoursWeekMatch[1]}+ h/semana`)

  const characterCountMatch = nextValue.trim().match(/^(\d+)\/120 characters$/)
  if (characterCountMatch) nextValue = preserveWhitespace(nextValue, `${characterCountMatch[1]}/120 caracteres`)

  return Object.entries(PHRASE_PATCHES).reduce((current, [source, replacement]) => {
    if (!current.includes(source)) return current
    return current.replaceAll(source, replacement)
  }, nextValue)
}

export function applySpanishEventLibraryPatches(root = document.querySelector('[data-portal-root]')) {
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

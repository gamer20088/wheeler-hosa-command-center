const PACK_COPY = {
  'Extemporaneous Writing': {
    bestFor: 'Estudiantes que escriben rapido y explican temas de salud con claridad.',
    quickTags: ['escritura', 'politica', 'tiempo'],
    startHere: ['Revisa el formato oficial.', 'Lee un tema de salud actual.', 'Practica una respuesta con tiempo.'],
    fourWeekPlan: [
      { week: 'Semana 1', focus: 'Aprende la estructura: argumento, evidencia y cierre.' },
      { week: 'Semana 2', focus: 'Escribe dos respuestas cortas con tiempo.' },
      { week: 'Semana 3', focus: 'Agrega ejemplos de salud publica y politica.' },
      { week: 'Semana 4', focus: 'Haz una ronda completa y pide comentarios.' },
    ],
    practiceTasks: ['Escribe una respuesta cronometrada.', 'Guarda ejemplos de salud publica.', 'Revisa el argumento.', 'Mejora el cierre.'],
    evidenceToSave: ['Respuesta con tiempo', 'Lista de fuentes', 'Comentarios de oficial', 'Revision del cierre'],
    officerChecklist: ['Tiene argumento claro.', 'Usa evidencia.', 'Maneja contraargumento.', 'Termina a tiempo.'],
    mockRubric: [
      { category: 'Estructura', lookFor: 'Inicio, evidencia, contraargumento y cierre claros.' },
      { category: 'Evidencia', lookFor: 'Ejemplos correctos y relacionados con salud.' },
      { category: 'Tiempo', lookFor: 'Termina dentro del limite.' },
      { category: 'Claridad', lookFor: 'Ideas faciles de seguir.' },
    ],
    watchOuts: ['No escribir sin estructura.', 'No usar ejemplos inventados.', 'No ignorar el tiempo.'],
  },
  'Medical Terminology': {
    bestFor: 'Estudiantes que pueden estudiar terminos, raices y sufijos con constancia.',
    quickTags: ['terminos', 'raices', 'tarjetas'],
    startHere: ['Revisa el formato oficial.', 'Crea una lista de raices y sufijos.', 'Haz un quiz corto para ver puntos debiles.'],
    fourWeekPlan: [
      { week: 'Semana 1', focus: 'Aprende raices, prefijos y sufijos basicos.' },
      { week: 'Semana 2', focus: 'Estudia terminos por sistema del cuerpo.' },
      { week: 'Semana 3', focus: 'Haz quizzes con tiempo y corrige errores.' },
      { week: 'Semana 4', focus: 'Repite solo los terminos fallados.' },
    ],
    practiceTasks: ['Estudia 25 terminos.', 'Haz tarjetas.', 'Corrige errores.', 'Repite terminos fallados.'],
    evidenceToSave: ['Conteo de tarjetas', 'Resultado de quiz', 'Lista de errores', 'Terminos repasados'],
    officerChecklist: ['Practica semanal.', 'Errores corregidos.', 'Raices dominadas.', 'Quiz con tiempo completado.'],
    mockRubric: [
      { category: 'Vocabulario', lookFor: 'Reconoce terminos comunes.' },
      { category: 'Raices', lookFor: 'Usa partes de palabras para inferir significado.' },
      { category: 'Precision', lookFor: 'Evita confundir terminos parecidos.' },
      { category: 'Ritmo', lookFor: 'Contesta sin quedarse atorado.' },
    ],
    watchOuts: ['No memorizar sin repasar errores.', 'No estudiar solo la noche anterior.'],
  },
  'Behavioral Health': {
    bestFor: 'Estudiantes interesados en salud mental, bienestar y escenarios aplicados.',
    quickTags: ['bienestar', 'psicologia', 'escenarios'],
    startHere: ['Revisa la guia oficial.', 'Crea una lista de temas clave.', 'Haz un quiz diagnostico.'],
    fourWeekPlan: [
      { week: 'Semana 1', focus: 'Repasa conceptos basicos de salud mental.' },
      { week: 'Semana 2', focus: 'Estudia prevencion, apoyo y vocabulario.' },
      { week: 'Semana 3', focus: 'Practica preguntas con explicacion.' },
      { week: 'Semana 4', focus: 'Corrige errores y repasa temas debiles.' },
    ],
    practiceTasks: ['Lee un tema.', 'Haz tarjetas.', 'Practica preguntas.', 'Escribe un resumen corto.'],
    evidenceToSave: ['Tarjetas', 'Quiz corregido', 'Resumen de tema', 'Lista de dudas'],
    officerChecklist: ['Usa lenguaje respetuoso.', 'Distingue conceptos clave.', 'Corrige errores.', 'Practica con tiempo.'],
    mockRubric: [
      { category: 'Conceptos', lookFor: 'Entiende terminos principales.' },
      { category: 'Aplicacion', lookFor: 'Reconoce situaciones y apoyos.' },
      { category: 'Respeto', lookFor: 'Usa lenguaje cuidadoso.' },
      { category: 'Precision', lookFor: 'Evita generalizaciones.' },
    ],
    watchOuts: ['No convertir el evento en consejo medico.', 'No usar estereotipos.'],
  },
  'Medical Math': {
    bestFor: 'Estudiantes cuidadosos con unidades, formulas y calculos.',
    quickTags: ['calculo', 'unidades', 'precision'],
    startHere: ['Revisa reglas de calculadora.', 'Haz una lista de formulas.', 'Practica conversiones basicas.'],
    fourWeekPlan: [
      { week: 'Semana 1', focus: 'Domina conversiones y proporciones.' },
      { week: 'Semana 2', focus: 'Practica problemas por tipo.' },
      { week: 'Semana 3', focus: 'Haz sets con tiempo y registra errores.' },
      { week: 'Semana 4', focus: 'Repite errores hasta tener precision.' },
    ],
    practiceTasks: ['Resuelve 10 conversiones.', 'Revisa unidades.', 'Haz registro de errores.', 'Repite problemas fallados.'],
    evidenceToSave: ['Hoja de problemas', 'Registro de errores', 'Lista de formulas', 'Resultado de practica'],
    officerChecklist: ['Unidades correctas.', 'Trabajo mostrado.', 'Errores revisados.', 'Tiempo controlado.'],
    mockRubric: [
      { category: 'Unidades', lookFor: 'Convierte sin saltos confusos.' },
      { category: 'Formula', lookFor: 'Elige el metodo correcto.' },
      { category: 'Precision', lookFor: 'Calcula con cuidado.' },
      { category: 'Revision', lookFor: 'Detecta respuestas improbables.' },
    ],
    watchOuts: ['No saltar unidades.', 'No confiar solo en calculadora.'],
  },
  'Health Informatics': {
    bestFor: 'Estudiantes que conectan salud, tecnologia, privacidad y datos.',
    quickTags: ['datos', 'privacidad', 'sistemas'],
    startHere: ['Revisa el formato oficial.', 'Aprende terminos de EHR y privacidad.', 'Crea un mapa de conceptos.'],
    fourWeekPlan: [
      { week: 'Semana 1', focus: 'Repasa conceptos de informacion de salud.' },
      { week: 'Semana 2', focus: 'Estudia privacidad, seguridad e interoperabilidad.' },
      { week: 'Semana 3', focus: 'Practica preguntas y casos cortos.' },
      { week: 'Semana 4', focus: 'Corrige errores y repasa sistemas.' },
    ],
    practiceTasks: ['Define 10 terminos.', 'Lee un recurso oficial.', 'Practica preguntas.', 'Resume un caso de privacidad.'],
    evidenceToSave: ['Mapa de conceptos', 'Quiz corregido', 'Resumen de privacidad', 'Lista de terminos'],
    officerChecklist: ['Entiende EHR.', 'Explica privacidad.', 'Relaciona datos con atencion.', 'Practica con tiempo.'],
    mockRubric: [
      { category: 'Sistemas', lookFor: 'Entiende como fluye la informacion.' },
      { category: 'Privacidad', lookFor: 'Reconoce riesgos y protecciones.' },
      { category: 'Datos', lookFor: 'Usa terminos correctos.' },
      { category: 'Aplicacion', lookFor: 'Conecta tecnologia con pacientes.' },
    ],
    watchOuts: ['No confundir tecnologia general con informatica de salud.', 'No simplificar privacidad.'],
  },
  'Prepared Speaking': {
    bestFor: 'Estudiantes que pueden practicar, grabarse y aceptar comentarios.',
    quickTags: ['discurso', 'grabacion', 'comentarios'],
    startHere: ['Confirma tema y tiempo oficial.', 'Crea un esquema corto.', 'Graba una primera practica.'],
    fourWeekPlan: [
      { week: 'Semana 1', focus: 'Elige mensaje principal y evidencia.' },
      { week: 'Semana 2', focus: 'Escribe y recorta el discurso.' },
      { week: 'Semana 3', focus: 'Graba practicas y mejora entrega.' },
      { week: 'Semana 4', focus: 'Haz una ronda completa con comentarios.' },
    ],
    practiceTasks: ['Graba el discurso.', 'Cronometra la entrega.', 'Mejora transiciones.', 'Pide comentarios.'],
    evidenceToSave: ['Video de practica', 'Guion marcado', 'Hoja de tiempo', 'Comentarios de oficial'],
    officerChecklist: ['Mensaje claro.', 'Tiempo correcto.', 'Contacto visual.', 'Voz segura.'],
    mockRubric: [
      { category: 'Contenido', lookFor: 'Mensaje enfocado y respaldado.' },
      { category: 'Entrega', lookFor: 'Voz clara y ritmo natural.' },
      { category: 'Tiempo', lookFor: 'Termina dentro del limite.' },
      { category: 'Presencia', lookFor: 'Se ve preparado y tranquilo.' },
    ],
    watchOuts: ['No memorizar sin sonar natural.', 'No ignorar el limite de tiempo.'],
  },
}

const GENERIC_BY_CATEGORY = {
  'Test Prep': {
    bestFor: 'Estudiantes que pueden estudiar cada semana y corregir errores.',
    quickTags: ['quiz', 'tarjetas', 'repaso'],
    startHere: ['Revisa el formato oficial.', 'Haz una lista de temas.', 'Toma un quiz corto.'],
    fourWeekPlan: [
      { week: 'Semana 1', focus: 'Crea tarjetas y repasa conceptos base.' },
      { week: 'Semana 2', focus: 'Practica preguntas por tema.' },
      { week: 'Semana 3', focus: 'Haz un quiz con tiempo y registra errores.' },
      { week: 'Semana 4', focus: 'Repite puntos debiles y simula el examen.' },
    ],
    practiceTasks: ['Haz tarjetas.', 'Toma un quiz.', 'Corrige errores.', 'Repasa puntos debiles.'],
    evidenceToSave: ['Tarjetas', 'Resultado de quiz', 'Registro de errores', 'Lista de temas repasados'],
    officerChecklist: ['Estudia con constancia.', 'Corrige errores.', 'Practica con tiempo.', 'Conoce el formato.'],
    mockRubric: [
      { category: 'Contenido', lookFor: 'Domina temas clave.' },
      { category: 'Precision', lookFor: 'Reduce errores repetidos.' },
      { category: 'Ritmo', lookFor: 'Trabaja dentro del tiempo.' },
      { category: 'Repaso', lookFor: 'Sabe que estudiar despues.' },
    ],
    watchOuts: ['No solo leer pasivamente.', 'No ignorar preguntas falladas.'],
  },
  'Writing and Speaking': {
    bestFor: 'Estudiantes que pueden investigar, escribir y practicar en voz alta.',
    quickTags: ['escritura', 'discurso', 'evidencia'],
    startHere: ['Confirma reglas oficiales.', 'Elige un mensaje principal.', 'Busca evidencia confiable.'],
    fourWeekPlan: [
      { week: 'Semana 1', focus: 'Crea esquema y fuente base.' },
      { week: 'Semana 2', focus: 'Escribe borrador y practica lectura.' },
      { week: 'Semana 3', focus: 'Graba practica y pide comentarios.' },
      { week: 'Semana 4', focus: 'Haz una ronda completa.' },
    ],
    practiceTasks: ['Escribe un esquema.', 'Graba practica.', 'Corrige borrador.', 'Pide comentarios.'],
    evidenceToSave: ['Borrador', 'Video de practica', 'Fuentes', 'Comentarios recibidos'],
    officerChecklist: ['Mensaje claro.', 'Evidencia fuerte.', 'Entrega practicada.', 'Tiempo revisado.'],
    mockRubric: [
      { category: 'Argumento', lookFor: 'Idea principal clara.' },
      { category: 'Evidencia', lookFor: 'Fuentes utiles y creibles.' },
      { category: 'Entrega', lookFor: 'Voz y ritmo seguros.' },
      { category: 'Revision', lookFor: 'Mejoras despues de comentarios.' },
    ],
    watchOuts: ['No depender de un solo borrador.', 'No practicar sin grabarte.'],
  },
  'Project and Upload': {
    bestFor: 'Equipos o estudiantes que pueden planear, documentar y cumplir fechas.',
    quickTags: ['proyecto', 'entrega', 'evidencia'],
    startHere: ['Confirma fechas de entrega.', 'Crea calendario.', 'Define evidencia que guardaras.'],
    fourWeekPlan: [
      { week: 'Semana 1', focus: 'Define meta, roles y entregables.' },
      { week: 'Semana 2', focus: 'Construye primer borrador o prototipo.' },
      { week: 'Semana 3', focus: 'Revisa con oficial y mejora.' },
      { week: 'Semana 4', focus: 'Verifica archivos, enlaces y presentacion.' },
    ],
    practiceTasks: ['Actualiza calendario.', 'Guarda capturas.', 'Ensaya presentacion.', 'Revisa requisitos.'],
    evidenceToSave: ['Calendario', 'Capturas de progreso', 'Borrador', 'Comentarios de revision'],
    officerChecklist: ['Fechas claras.', 'Archivos revisados.', 'Roles definidos.', 'Presentacion practicada.'],
    mockRubric: [
      { category: 'Plan', lookFor: 'Trabajo dividido y con fechas.' },
      { category: 'Evidencia', lookFor: 'Prueba de progreso real.' },
      { category: 'Calidad', lookFor: 'Producto limpio y completo.' },
      { category: 'Entrega', lookFor: 'Archivos listos antes de fecha.' },
    ],
    watchOuts: ['No esperar hasta la semana final.', 'No olvidar verificar entrega.'],
  },
  'Team Events': {
    bestFor: 'Equipos confiables que pueden reunirse y dividir trabajo.',
    quickTags: ['equipo', 'roles', 'practica'],
    startHere: ['Confirma integrantes.', 'Divide roles.', 'Agenda reuniones semanales.'],
    fourWeekPlan: [
      { week: 'Semana 1', focus: 'Define roles y plan de estudio.' },
      { week: 'Semana 2', focus: 'Trabaja por secciones y comparte avances.' },
      { week: 'Semana 3', focus: 'Haz practica completa de equipo.' },
      { week: 'Semana 4', focus: 'Corrige debilidades y confirma plan de respaldo.' },
    ],
    practiceTasks: ['Reunion de equipo.', 'Lista de tareas.', 'Practica de ronda.', 'Plan de respaldo.'],
    evidenceToSave: ['Notas de reunion', 'Division de trabajo', 'Quiz de equipo', 'Comentarios de practica'],
    officerChecklist: ['Roles claros.', 'Todos participan.', 'Practica semanal.', 'Plan si alguien falta.'],
    mockRubric: [
      { category: 'Equipo', lookFor: 'Trabajo dividido justamente.' },
      { category: 'Preparacion', lookFor: 'Todos conocen su parte.' },
      { category: 'Comunicacion', lookFor: 'Responden sin confusion.' },
      { category: 'Ronda', lookFor: 'Practica completa terminada.' },
    ],
    watchOuts: ['No depender de una sola persona.', 'No faltar a reuniones.'],
  },
  'Career and Creative': {
    bestFor: 'Estudiantes que pueden investigar una carrera y comunicarla visualmente.',
    quickTags: ['carrera', 'visual', 'historia'],
    startHere: ['Escoge carrera o tema.', 'Busca fuentes creibles.', 'Crea un plan visual.'],
    fourWeekPlan: [
      { week: 'Semana 1', focus: 'Investiga carrera, funciones y preparacion.' },
      { week: 'Semana 2', focus: 'Crea borrador visual y guion corto.' },
      { week: 'Semana 3', focus: 'Revisa claridad y evidencia.' },
      { week: 'Semana 4', focus: 'Practica explicacion final.' },
    ],
    practiceTasks: ['Investiga una carrera.', 'Crea borrador visual.', 'Practica explicacion.', 'Pide revision.'],
    evidenceToSave: ['Fuentes', 'Borrador visual', 'Guion', 'Comentarios de oficial'],
    officerChecklist: ['Fuentes confiables.', 'Visual claro.', 'Historia coherente.', 'Presentacion practicada.'],
    mockRubric: [
      { category: 'Investigacion', lookFor: 'Datos correctos de carrera.' },
      { category: 'Visual', lookFor: 'Se entiende rapido.' },
      { category: 'Historia', lookFor: 'Explica por que importa.' },
      { category: 'Entrega', lookFor: 'Presenta con seguridad.' },
    ],
    watchOuts: ['No hacer visual bonito sin investigacion.', 'No olvidar citar fuentes.'],
  },
}

function genericCopy(pack) {
  return GENERIC_BY_CATEGORY[pack.category] || GENERIC_BY_CATEGORY[pack.packType] || GENERIC_BY_CATEGORY['Test Prep']
}

export function getSpanishPackCopy(pack) {
  const copy = PACK_COPY[pack.eventName] || genericCopy(pack)
  return {
    ...pack,
    ...copy,
    eventName: pack.eventName,
    slug: pack.slug,
    category: pack.category,
    packType: pack.packType,
  }
}

export function getSpanishResource(resource) {
  const typeText = {
    'Official Rules': 'Verifica reglas, tiempos, hojas de evaluacion y requisitos con fuentes oficiales.',
    Learn: 'Usalo para aprender el tema con explicaciones claras.',
    Practice: 'Usalo como apoyo para practicar y guardar evidencia.',
    Research: 'Usalo cuando necesites evidencia mas fuerte o datos confiables.',
    Examples: 'Usalo para encontrar ejemplos actuales y contexto.',
    Career: 'Usalo para investigar funciones, preparacion y carreras de salud.',
    'Spanish-Friendly': 'Recurso util en espanol para repasar con familia o apoyo bilingue.',
  }

  return {
    ...resource,
    why: typeText[resource.type] || 'Usalo como apoyo gratuito y confiable para prepararte.',
  }
}

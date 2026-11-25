/**
 * Formulario A · Perfil del local — "El problema del vaso lleno de café"
 *
 * Qué hace:
 *   1. Crea un Google Form con 6 secciones (consentimiento + 5 bloques de preguntas).
 *   2. Crea una planilla de Google Sheets y la vincula como destino de las respuestas.
 *   3. Agrega a la planilla una hoja "diccionario" (variable ↔ pregunta ↔ unidad)
 *      para renombrar columnas en pandas sin tocar los títulos del formulario.
 *
 * Uso:
 *   script.google.com → Nuevo proyecto → pegar este archivo → elegir la función
 *   crearFormularioA → Ejecutar → autorizar con la cuenta de Google.
 *   Los links quedan en "Registro de ejecución" y en la hoja "diccionario".
 *
 * Justificación de diseño:
 *   - No se pregunta "¿cuánto desperdician?": la merma se calcula a partir de
 *     kg comprados vs. tazas vendidas × receta (evita sesgo de deseabilidad social).
 *   - Las preguntas de percepción van al final para no sesgar las cuantitativas.
 *   - Validaciones numéricas con rango para evitar datos basura en origen.
 *   - Sin nombre del local ni de personas (Ley 25.326 de Protección de Datos Personales).
 */

const TITULO_FORM = 'Uso del café en cafeterías take away · Formulario A';
const TITULO_PLANILLA = 'Respuestas · Formulario A · Vaso lleno de café';

// Estructura del formulario: cada sección es una página; cada pregunta tiene un nombre de variable.
const SECCIONES = [
  {
    titulo: 'Consentimiento y contexto',
    ayuda: 'Encuesta del proyecto "El problema del vaso lleno de café" (Técnico Superior en Ciencia de Datos e IA). ' +
           'Busca entender cómo se usa el café molido en cafeterías take away. ' +
           'Es anónima: no pedimos el nombre del local ni de personas. Los datos se usan solo con fines académicos ' +
           'y de forma agregada (Ley 25.326 de Protección de Datos Personales). Lleva unos 5 minutos.',
    preguntas: [
      { v: 'consentimiento', t: 'opcion', q: '¿Aceptás participar de esta encuesta?', ch: ['Acepto participar'], req: true },
      { v: 'rol', t: 'opcion', q: '¿Cuál es tu rol en el local?', ch: ['Dueño/a', 'Encargado/a', 'Barista'], otro: true, req: true },
      { v: 'localidad', t: 'texto', q: 'Ciudad o barrio donde está el local', ayuda: 'No escribas el nombre del local.', req: true },
      { v: 'modalidad', t: 'opcion', q: 'Modalidad del local', ch: ['Solo take away', 'Take away y mesas'], req: true },
    ],
  },
  {
    titulo: '1 · Volumen',
    ayuda: 'Valores aproximados de un mes normal.',
    preguntas: [
      { v: 'kg_comprados_mes', t: 'numero', q: '¿Cuántos kg de café compran por mes?', u: 'kg', min: 0.5, max: 500, req: true },
      { v: 'dias_abiertos_semana', t: 'numero', q: '¿Cuántos días por semana abre el local?', u: 'días', min: 1, max: 7, req: true },
      { v: 'tazas_dia_semana', t: 'numero', q: '¿Cuántas bebidas con café venden en un día de semana normal?', u: 'bebidas', min: 1, max: 3000, req: true },
      { v: 'tazas_dia_finde', t: 'numero', q: '¿Cuántas bebidas con café venden en un día de fin de semana?', u: 'bebidas', min: 0, max: 3000, ayuda: 'Si no abren el fin de semana, poné 0.', req: true },
      { v: 'pct_espresso', t: 'numero', q: '¿Qué % de esas bebidas son espresso o con base de espresso (cortado, latte, etc.)?', u: '%', min: 0, max: 100, ayuda: 'Los tres porcentajes deberían sumar cerca de 100.', req: true },
      { v: 'pct_filtrado', t: 'numero', q: '¿Qué % son café de filtro (V60, batch brew, prensa)?', u: '%', min: 0, max: 100, req: true },
      { v: 'pct_cold_brew', t: 'numero', q: '¿Qué % son cold brew u otras bebidas frías con café?', u: '%', min: 0, max: 100, req: true },
      { v: 'franjas_pico', t: 'multiple', q: '¿En qué franjas horarias hay más movimiento?', ch: ['Antes de las 9', '9 a 11', '11 a 13', '13 a 15', '15 a 17', '17 a 19', 'Después de las 19'], req: true },
    ],
  },
  {
    titulo: '2 · Receta y dosificación',
    ayuda: '',
    preguntas: [
      { v: 'dosis_espresso_g', t: 'numero', q: '¿Cuántos gramos de café lleva un espresso doble según la receta?', u: 'g', min: 7, max: 25, req: true },
      { v: 'dosis_filtrado_g', t: 'numero', q: '¿Cuántos gramos de café usan por taza de filtrado?', u: 'g', min: 0, max: 40, ayuda: 'Si no hacen filtrado, poné 0.', req: true },
      { v: 'metodo_dosificacion', t: 'opcion', q: '¿Cómo dosifican el café para espresso?', ch: ['Con balanza en cada dosis', 'Con balanza a veces', 'Por tiempo del molino', 'A ojo / por volumen'], req: true },
      { v: 'tipo_molino', t: 'opcion', q: '¿Qué tipo de molino de espresso usan?', ch: ['Muele a demanda (sin cámara de café molido)', 'Con dosificador y cámara (paletas)', 'No sé'], req: true },
      { v: 'modelo_molino', t: 'texto', q: 'Marca y modelo del molino (si lo sabés)', req: false },
      { v: 'cantidad_molinos', t: 'numero', q: '¿Cuántos molinos usan en la barra?', u: 'molinos', min: 1, max: 10, req: true },
    ],
  },
  {
    titulo: '3 · Prácticas de barra',
    ayuda: '',
    preguntas: [
      { v: 'purga_apertura', t: 'opcion', q: '¿Purgan el molino (muelen y descartan) al abrir el local?', ch: ['Sí, siempre', 'A veces', 'No'], req: true },
      { v: 'gramos_purga', t: 'numero', q: '¿Cuántos gramos descartan en esa purga, aproximadamente?', u: 'g', min: 0, max: 100, ayuda: 'Si no sabés, dejalo vacío.', req: false },
      { v: 'ajustes_molienda_dia', t: 'numero', q: '¿Cuántas veces por día ajustan la molienda?', u: 'veces', min: 0, max: 50, req: true },
      { v: 'shots_prueba_por_ajuste', t: 'numero', q: '¿Cuántos shots de prueba hacen por cada ajuste?', u: 'shots', min: 0, max: 20, req: true },
      { v: 'premolido_hora_pico', t: 'opcion', q: 'En hora pico, ¿muelen café antes de que llegue el pedido?', ch: ['Nunca', 'A veces', 'Siempre'], req: true },
      { v: 'filtrado_en_lotes', t: 'opcion', q: '¿Preparan café de filtro en lotes (jarras o termos)?', ch: ['Sí', 'No', 'No hacemos filtrado'], req: true },
      { v: 'litros_lote_filtrado', t: 'numero', q: 'Si preparan lotes, ¿de cuántos litros es cada uno?', u: 'litros', min: 0, max: 50, req: false },
    ],
  },
  {
    titulo: '4 · Destino del café sobrante',
    ayuda: '',
    preguntas: [
      { v: 'frecuencia_sobrante_cierre', t: 'opcion', q: 'Al cerrar, ¿queda café molido sin usar?', ch: ['Nunca', 'A veces', 'Siempre'], req: true },
      { v: 'destino_sobrante', t: 'multiple', q: '¿Qué hacen con el café molido que sobra?', ch: ['Se tira', 'Lo toma el equipo', 'Se usa en otra preparación', 'Compost / jardín', 'No sobra'], otro: true, req: true },
      { v: 'productos_con_cafe', t: 'multiple', q: '¿Elaboran algún producto con café además de las bebidas calientes?', ch: ['Cold brew', 'Repostería con café', 'Jarabe o almíbar de café', 'Ninguno'], otro: true, req: true },
      { v: 'consumo_equipo', t: 'opcion', q: '¿Qué café toma el equipo durante el turno?', ch: ['Preparado en el momento', 'El café que sobra', 'No toman café en el local'], otro: true, req: true },
    ],
  },
  {
    titulo: '5 · Control y percepción',
    ayuda: 'Últimas preguntas.',
    preguntas: [
      { v: 'control_consumo', t: 'opcion', q: '¿Cómo controlan el consumo de café?', ch: ['Inventario diario', 'Inventario semanal', 'Inventario mensual', 'No se controla'], req: true },
      { v: 'usa_pos', t: 'opcion', q: '¿Usan un sistema de caja (POS) que registre las ventas por producto?', ch: ['Sí', 'No'], req: true },
      { v: 'pos_sistema', t: 'texto', q: 'Si usan POS, ¿cuál?', req: false },
      { v: 'percepcion_diferencia', t: 'escala', q: 'Al cerrar el mes, ¿con qué frecuencia notan que se usó más café del que se vendió?', min: 1, max: 5, lo: 'Nunca', hi: 'Siempre', req: true },
      { v: 'precio_kg_rango', t: 'lista', q: '¿Cuánto pagan el kg de café?', ch: ['Menos de $20.000', '$20.000 a $35.000', '$35.000 a $50.000', '$50.000 a $70.000', 'Más de $70.000', 'Prefiero no responder'], req: true },
      { v: 'comentario', t: 'parrafo', q: '¿Algo más que quieras contarnos sobre el uso del café en tu barra?', req: false },
      { v: 'contacto_formulario_B', t: 'texto', q: 'Opcional: si querés participar del registro diario (Formulario B), dejá un mail de contacto', ayuda: 'Se usa solo para invitarte. Se guarda separado de tus respuestas al analizar.', req: false },
    ],
  },
];

function crearFormularioA() {
  const form = FormApp.create(TITULO_FORM);
  form.setDescription('Proyecto académico · respuestas anónimas · ~5 minutos.')
      .setProgressBar(true)
      .setCollectEmail(false)
      .setAllowResponseEdits(false)
      .setConfirmationMessage('¡Gracias! Tus respuestas ayudan a medir y reducir el desperdicio de café en cafeterías.');

  const diccionario = [['variable', 'pregunta', 'tipo', 'unidad', 'obligatoria', 'seccion']];

  SECCIONES.forEach(function (sec, i) {
    // La primera sección usa la página inicial; las demás arrancan con un salto de página.
    if (i === 0) {
      form.addSectionHeaderItem().setTitle(sec.titulo).setHelpText(sec.ayuda);
    } else {
      const pb = form.addPageBreakItem().setTitle(sec.titulo);
      if (sec.ayuda) pb.setHelpText(sec.ayuda);
    }
    sec.preguntas.forEach(function (p) {
      agregarPregunta(form, p);
      // Se guarda el título exacto (con unidad) porque así se llama la columna en la planilla.
      diccionario.push([p.v, tituloDe(p), p.t, p.u || '', p.req ? 'sí' : 'no', sec.titulo]);
    });
  });

  // Planilla de respuestas vinculada al formulario.
  const ss = SpreadsheetApp.create(TITULO_PLANILLA);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // Hoja "diccionario": mapea cada pregunta a un nombre de variable corto para el análisis.
  const hoja = ss.insertSheet('diccionario');
  hoja.getRange(1, 1, diccionario.length, diccionario[0].length).setValues(diccionario);
  hoja.setFrozenRows(1);
  hoja.autoResizeColumns(1, diccionario[0].length);

  // Hoja "links": deja a mano las URLs importantes.
  const links = ss.insertSheet('links');
  links.getRange(1, 1, 4, 2).setValues([
    ['Link para responder (compartir)', form.getPublishedUrl()],
    ['Link para editar el formulario', form.getEditUrl()],
    ['Planilla de respuestas', ss.getUrl()],
    ['ID de la planilla (para Colab)', ss.getId()],
  ]);
  links.autoResizeColumns(1, 2);

  Logger.log('Responder: ' + form.getPublishedUrl());
  Logger.log('Editar:    ' + form.getEditUrl());
  Logger.log('Planilla:  ' + ss.getUrl());
  Logger.log('ID planilla: ' + ss.getId());
}

function agregarPregunta(form, p) {
  let item;
  switch (p.t) {
    case 'numero':
      item = form.addTextItem();
      // Justificación: validar en origen evita textos como "unos 10" o valores imposibles.
      item.setValidation(FormApp.createTextValidation()
        .requireNumberBetween(p.min, p.max)
        .setHelpText('Ingresá un número entre ' + p.min + ' y ' + p.max + (p.u ? ' (' + p.u + ')' : '') + '. Usá punto para decimales.')
        .build());
      break;
    case 'texto':
      item = form.addTextItem();
      break;
    case 'parrafo':
      item = form.addParagraphTextItem();
      break;
    case 'opcion':
      item = form.addMultipleChoiceItem().setChoiceValues(p.ch);
      if (p.otro) item.showOtherOption(true);
      break;
    case 'multiple':
      item = form.addCheckboxItem().setChoiceValues(p.ch);
      if (p.otro) item.showOtherOption(true);
      break;
    case 'lista':
      item = form.addListItem().setChoiceValues(p.ch);
      break;
    case 'escala':
      item = form.addScaleItem().setBounds(p.min, p.max).setLabels(p.lo, p.hi);
      break;
    default:
      throw new Error('Tipo de pregunta desconocido: ' + p.t);
  }
  item.setTitle(tituloDe(p)).setRequired(!!p.req);
  if (p.ayuda) item.setHelpText(p.ayuda);
}

function tituloDe(p) {
  return p.u ? p.q + ' (' + p.u + ')' : p.q;
}

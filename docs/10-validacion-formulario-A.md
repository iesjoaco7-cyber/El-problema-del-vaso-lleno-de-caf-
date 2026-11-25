# 10 · Validación de campo · Formulario A

**Fecha de corte:** 2026-11-25 · **Respuestas:** 18 · **Instrumento:** Formulario A (perfil del local, Google Forms)

> Solo se publican **resultados agregados**: el consentimiento informado prometía uso académico y de forma agregada (Ley 25.326). Las respuestas individuales y los mails de contacto no se suben al repositorio.

## 1. Veredicto

Las 18 respuestas **no apoyan la hipótesis principal** del proyecto: la merma no viene del café pre-molido ni del sobrante al cierre. El 78 % de los locales nunca pre-muele en hora pico y nunca le queda café molido al cerrar. Lo que sí aparece es merma en **calibración, purgas y dosificación sin balanza**, con poco control diario.

Es un resultado de validación, no un fracaso: el examen socrático (doc 08, "Dónde puedo estar equivocado") ya advertía que la causa dominante podía ser otra.

Método: muestra de conveniencia (grupos de WhatsApp); proporciones con intervalo de confianza de Wilson al 95 %; medianas con IC por bootstrap (5.000 remuestreos, semilla 42).

## 2. Hipótesis que no se confirman

| Hipótesis del árbol | Resultado | IC95 % |
|---|---|---|
| R1 · Se pre-muele en hora pico | Nunca pre-muele: 14/18 (78 %) | 55–91 % |
| R1/R5 · Molino con cámara | Muele a demanda: 13/18 (72 %) | 49–88 % |
| Queda café molido al cierre | Nunca queda: 14/18 (78 %) | 55–91 % |
| El equipo toma las sobras | Toma café preparado en el momento: 14/18 (78 %) | 55–91 % |
| Se nota la diferencia en el cierre de caja | La notan seguido (4-5 en escala 1-5): 2/18 (11 %) | 3–33 % |

Un barista lo resumió: todo el café se muele en el momento, y lo que puede sobrar es la purga por ajustes al calibrar.

## 3. Hallazgos que sí aparecen

La **calibración y las purgas** se llevan una mediana de **~8 % del café diario** (IC95 % 4–11 %, máximo 17 %), unos **115 g por día**. Se estima con lo declarado: ajustes por día × shots de prueba × dosis + purga de apertura.

| Hallazgo | Resultado | IC95 % |
|---|---|---|
| Purgan al abrir (siempre o a veces) | 13/18 (72 %); mediana 12 g por purga, rango 0–50 g | 49–88 % |
| No dosifican siempre con balanza | 10/18 (56 %); 5 dosifican por tiempo del molino | 34–75 % |
| Control del consumo mensual o nulo | 7/18 (39 %); 5 no lo controlan | 20–61 % |
| Usan sistema de caja (POS) | 15/18 (83 %), sobre todo Fudo (7) | 61–94 % |
| Ya hacen cold brew | 6/18 (33 %) | 16–56 % |

La estimación de calibración es más confiable que la merma implícita porque sale de preguntas concretas sobre prácticas, aunque sigue siendo autodeclarada.

## 4. Por qué la merma implícita no funcionó

| Problema | Casos |
|---|---|
| Merma negativa (compran menos café del que exige su propia receta: imposible) | 10/18 |
| Merma plausible (0–60 %) | 4/18 |
| Porcentajes de bebidas que no suman ~100 | 4/18 |

Causa probable: 11 de 18 respuestas son de **baristas**, que saben cuántas tazas salen pero no cuántos kg se compran. En un caso, 15 kg por mes para ~5.000 tazas daría 3 g por taza. La pregunta de kg comprados solo sirve si la responde un dueño o encargado.

## 5. Sesgos de la muestra

- **No es take away:** 17/18 son take away y mesas; el problema ya no se puede acotar a take away.
- **Concentración geográfica:** ~13/18 son de Córdoba, la mayoría de Nueva Córdoba. Una respuesta es de Trogir (Croacia) y se excluye del análisis de Argentina.
- **Posibles duplicados:** no hay respuestas idénticas, pero con 6 de Nueva Córdoba no se descarta que dos sean del mismo local.
- **Autoselección:** quien responde una encuesta sobre desperdicio de café probablemente ya se interesa por el tema.

## 6. Causas nuevas que aparecieron

- **Moliendas de muestra para venta de café en grano:** un local prueba la molienda frente al cliente y pierde ~20 g por prueba; si el cliente pide otra molienda, repite.
- **Máquinas automáticas:** cuando se ajusta el molino, el barista no ve la purga; es una merma invisible por diseño.

## 7. Qué cambia en el proyecto

La problemática se reformula: **se pierde café en calibración, purgas y dosificación sin balanza, y casi nadie lo mide día a día.** La causa raíz R7 (falta de medición) se sostiene; R1 (pre-molido) cae.

1. **Nueva hipótesis de Pareto:** calibración + purgas + sobredosis, en ese orden probable; se confirma midiendo en barra.
2. **El Objetivo 1 (valorizar el sobrante) pierde peso:** si en el 78 % de los locales no sobra café al cierre, no hay materia prima. Pasa a ser secundario u opcional.
3. **El Objetivo 4 (consumo interno digno) ya está resuelto en la práctica** en la mayoría de los locales.
4. **El Formulario B y la medición en barra pasan a ser críticos:** la encuesta no sirve para medir cuánto se pierde.
5. **Correcciones al Formulario A (pendientes):**
    - Mostrar kg comprados solo a dueños o encargados.
    - Avisar que los porcentajes deben sumar 100.
    - Agregar "¿venden café molido para llevar?".

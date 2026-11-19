# Diccionario de datos

## `plantilla_registro_mermas.csv` (un registro por evento de merma)

| Campo | Tipo | Valores / formato | Descripción |
|---|---|---|---|
| fecha | fecha | AAAA-MM-DD | Día del evento |
| hora | hora | HH:MM | Hora del evento (permite analizar por franja) |
| turno | texto | mañana / tarde / noche | Turno de trabajo |
| barista_id | texto | B01, B02… | Código anónimo, nunca el nombre |
| causa | categoría | ver lista | Una de las 8 causas predefinidas |
| evitable | booleano | True / False | Se completa automáticamente según la causa |
| gramos | número | ≥ 0, 1 decimal | Peso medido con balanza |
| destino | categoría | basura / compost / valorización / consumo_interno | Qué se hizo con ese café |
| observaciones | texto | libre | Contexto (ej. "cambio de bolsa", "corte de luz") |

### Causas predefinidas

| Causa | Evitable |
|---|---|
| Café pre-molido sobrante | Sí |
| Lote de filtrado sobrante | Sí |
| Sobredosis (dosis > receta) | Sí |
| Shots de calibración (dial-in) | No |
| Purgas (inicio y ajustes) | No |
| Shots descartados / rehechos | Sí |
| Derrames en dosificado y tampeo | Sí |
| Retención del molino al cierre | No |

> La sobredosis no se pesa en cada taza: se estima con muestreos (10 dosis pesadas por turno) × bebidas vendidas.

## `ventas_*.csv` (uno por turno)

| Campo | Descripción |
|---|---|
| fecha, turno | Clave |
| bebidas_espresso | Bebidas basadas en espresso vendidas |
| bebidas_filtrado | Filtrados vendidos |

## Archivos `*_SIMULADO.csv`
Generados por el notebook 01 con semilla 42. **No son datos reales.**

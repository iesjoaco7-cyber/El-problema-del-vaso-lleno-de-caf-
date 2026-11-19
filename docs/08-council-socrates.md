# 08 · Examen socrático (council-socrates)

Aplicación del método *elenchus* en formato standalone: identificar suposiciones, ponerlas a prueba por contradicción y quedarse sólo con lo que sobrevive. Límite: 3 niveles de pregunta por supuesto, luego una posición explícita.

---

## Pregunta esencial

*La pregunta escondida detrás del problema planteado.*

> No es "¿qué hago con el café que sobra?", sino **"¿por qué el local se entera de que sobra café recién a fin de mes?"**. Mientras la pérdida sea invisible durante el turno, cualquier producto hecho con el sobrante sólo **administra** el desperdicio; no lo resuelve.

---

## Supuestos examinados

### Supuesto 1 · "El desperdicio es café molido que sobra al final del turno"

- **Nivel 1:** si sólo fuera el sobrante final, bastaría con pesar el recipiente al cierre. ¿Esa cantidad explica toda la diferencia del mes?
- **Nivel 2:** probablemente no. La sobredosis queda **dentro** de las tazas vendidas y nunca aparece en el sobrante; las purgas y los shots descartados se tiran durante el turno.
- **Nivel 3:** entonces, si sólo se mide el sobrante final, ¿qué causa se volvería invisible? → la sobredosis, que puede ser una de las más grandes.
- **Posición:** el desperdicio es **toda** la diferencia entre café egresado y café teórico vendido. El sobrante final es sólo una de sus 8 causas.

### Supuesto 2 · "Hay que crear un producto con el café viejo"

- **Nivel 1:** si el producto funciona y genera ganancia, ¿qué incentivo queda para reducir el desperdicio?
- **Nivel 2:** ninguno: el producto necesita materia prima constante. **El Objetivo 1 contradice al Objetivo 2.**
- **Nivel 3:** ¿y si el producto se planifica con el residuo **inevitable** (purgas, calibración) y no con el evitable?
- **Posición:** el producto es válido sólo como **último eslabón** de la jerarquía (medir → reducir → valorizar). Se dimensiona con el residuo posterior a la reducción, y si no alcanza, se completa con café fresco (el producto vale por sí mismo, no por "salvar sobras").

### Supuesto 3 · "Envasar el café permite que no pierda calidad"

- **Nivel 1:** ¿qué hace el envasado? Frena la oxidación **desde ese momento**.
- **Nivel 2:** ¿recupera los aromas que el café molido perdió en las horas anteriores? No.
- **Nivel 3:** si envaso café molido de varias horas y lo vendo como café molido, ¿en qué se diferencia de "venderle café viejo a la gente", que el proyecto se propuso evitar?
- **Posición:** envasar el **café molido** sobrante queda **descartado**. Lo que puede tener sentido es envasar **un producto transformado** (ej. cold brew), y eso abre otro problema: el sanitario. El cold brew es de baja acidez y, envasado sin cadena de frío, tiene riesgo de botulismo; además, venderlo envasado exige RNE y RNPA. Por eso el piloto se limita a la venta en el local.

### Supuesto 4 · "La meta es bajar el desperdicio al 15 %"

- **Nivel 1:** ¿15 % de qué base? ¿Del café comprado, del egresado, del molido?
- **Nivel 2:** ¿cuánto es hoy? Si hoy fuera 12 %, la meta legitimaría empeorar.
- **Nivel 3:** ¿y si lo que está mal no es el porcentaje sino la receta (por ejemplo, una receta de 22 g declarada como 18 g)?
- **Posición:** la meta se mantiene, pero **condicionada a la línea base** (≤ 15 % del café egresado o −30 % relativo si la base es menor a 20 %) y acompañada del KPI de gramos por taza para detectar recetas mal declaradas.

### Supuesto 5 · "Darle el sobrante a los empleados es aprovecharlo"

- **Nivel 1:** ¿el café del equipo es un beneficio o un destino de residuos?
- **Nivel 2:** si es un beneficio, ¿por qué se le da la peor calidad disponible?
- **Posición:** el consumo interno se **formaliza aparte** (café preparado en el momento, con cupo y registro). Deja de contarse como "aprovechamiento" y deja de esconder merma.

---

## La pregunta oculta

> **¿Quién es dueño del dato de la merma?** Hoy nadie: el barista no lo registra, el encargado no lo concilia y el dueño lo ve tarde. La solución tecnológica no consiste en "una app", sino en **asignar ese dato a alguien** y darle una herramienta de 10 segundos para producirlo.

---

## Lo que sobrevive al examen

1. Existe una pérdida económica real entre el café egresado y el café vendido (a confirmar en campo).
2. El café molido no debe volver a la taza como espresso o filtrado después de cierto tiempo.
3. Prevenir es mejor que valorizar; valorizar es mejor que desechar.
4. La herramienta del perfil de Ciencia de Datos (medición, conciliación, Pareto, pronóstico) ataca la causa raíz, no el síntoma.

## Veredicto

> **El proyecto debe cambiar su centro de gravedad: de "qué producto hago con el café viejo" a "cómo hago visible y medible la merma todos los días".** El producto de valorización se mantiene como objetivo secundario, subordinado a la reducción, y limitado inicialmente a la venta en el local.

## Confianza

**Media.** La lógica de los supuestos 2, 3 y 5 es sólida (contradicciones internas). Los supuestos 1 y 4 dependen de datos que todavía no existen: el Pareto real puede mostrar que la causa dominante es otra (por ejemplo, la retención de un molino viejo).

## Dónde puedo estar equivocado

- Puede que en cafeterías de alto volumen el pre-molido sea **necesario** para sostener la velocidad, y que el costo de la merma sea menor que el costo de clientes que se van por demora. En ese caso, el equilibrio óptimo no es "merma mínima", sino **merma económicamente óptima**.
- El método socrático asume que el problema está bien medido una vez que está bien definido. En la práctica, el registro hecho por personas tiene sesgo (subregistro). Por eso la conciliación stock vs. caja es el control cruzado obligatorio.

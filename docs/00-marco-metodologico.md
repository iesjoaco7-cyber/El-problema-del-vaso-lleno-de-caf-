# 00 · Marco metodológico

## 1. Secuencia de trabajo

```
Arquitectura de decisión → Problemática → Objetivo general → Objetivos específicos → Estructura de la solución → Evaluación
                                   ↑                                                                  │
                                   └──────────────── retroalimentación con datos de campo ────────────┘
```

Después de las 6 fases se define la **solución tecnológica** (como Técnico Superior en Ciencia de Datos e IA) y su **alcance**.

## 2. Herramientas y para qué se usa cada una

| Herramienta | Pregunta que responde | Dónde se aplica |
|---|---|---|
| **Diagrama de árbol** (raíces = causas, tronco = problema, hojas = consecuencias) | ¿Qué origina el problema y qué provoca? | Doc 02 |
| **5 porqués** | ¿Cuál es la causa raíz y no el síntoma? | Doc 02 |
| **Ley de Pareto (80/20)** | ¿Qué pocas causas explican la mayor parte de los gramos perdidos? | Doc 02 + notebook |
| **Orden de prioridad** (matriz impacto × esfuerzo) | ¿Qué atacamos primero? | Doc 02 y 05 |
| **Analítica de datos** | ¿Cuánto se pierde, dónde, cuándo y cuánto cuesta? | Notebook + doc 07 |
| **council-socrates** (elenchus) | ¿Qué suposiciones estamos dando por ciertas sin evidencia? | Doc 08 (y transversal) |
| **Entrevista etnográfica (Rosana Guber)** | ¿El problema existe tal como lo imaginamos para quienes trabajan en la barra? | Doc 09 |

## 3. Reglas anti "datos basura" (Garbage In, Garbage Out)

1. **Toda cifra lleva etiqueta:** `[FUENTE]` (dato con referencia), `[SUPUESTO]` (parámetro razonable a validar) o `[SIMULADO]` (generado para probar el código).
2. **Ningún dato simulado se usa para concluir.** Solo sirve para probar que el pipeline funciona.
3. **Unidades únicas:** gramos (g) para café, pesos argentinos (ARS) para dinero, con fecha del precio.
4. **Definición operativa antes de medir:** si no sabemos qué cuenta como "desperdicio", cada barista medirá otra cosa (ver doc 02, §2).
5. **Línea base antes de meta:** la meta del 15 % no se valida hasta conocer el valor actual.
6. **Separar residuo de merma:** la **borra** (café ya extraído) es un residuo inevitable, **no** es pérdida económica del insumo. Lo que se mide como merma es **café molido o en grano que no terminó en una bebida vendida**.
7. **Las personas se miden como proceso, no como culpables:** los datos por barista sirven para capacitar, nunca para sancionar (si no, el registro se falsea).

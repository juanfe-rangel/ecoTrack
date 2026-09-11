# Guion de demostración

## Preparación

```bash
npm ci
npm run verify
npm run dev
```

Abrir `http://localhost:3000`. La demostración recomendada dura entre 60 y 90 segundos.

## Escena 1 — Producto y contexto

Mostrar la pantalla inicial. Explicar:

> EcoTrack AI permite describir actividades del negocio en lenguaje natural. El cálculo ocurre localmente y el resultado muestra el desglose utilizado.

Señalar el textarea, los ejemplos y el texto que identifica el resultado como una estimación.

## Escena 2 — Caso exitoso

Pegar:

```text
Hoy usamos 5 camionetas de reparto y gastamos 200 kWh de luz
```

Resultado esperado:

| Actividad | Cálculo | Resultado |
| --- | --- | ---: |
| Electricidad | `200 kWh × 0.4` | `80 kg CO₂e` |
| Camionetas | `300 km × 0.25` | `75 kg CO₂e` |
| **Total** | | **155 kg CO₂e** |

Como no se indicaron kilómetros, debe aparecer la advertencia de que se usó una distancia diaria típica de 60 km por camioneta.

## Escena 3 — Más de una unidad

Pegar:

```text
Consumimos 150 kWh y 40 litros de gasolina
```

Resultado esperado:

```text
150 × 0.4 + 40 × 2.31 = 152.4 kg CO₂e
```

Mostrar que la pantalla conserva dos filas de desglose y no convierte todo en una cifra opaca.

## Escena 4 — Manejo de error

Probar `hola` y luego borrar el texto y enviar el formulario. Deben aparecer mensajes amigables:

- para `hola`, no reconoce cantidades de energía, combustible o transporte;
- para el campo vacío, solicita una actividad de negocio;
- la página permanece activa y no muestra un error técnico.

## Escena 5 — Arquitectura y orquestación

Mostrar brevemente:

- `.cursorrules`;
- `src/lib/parser/activity-parser.ts`;
- `src/lib/calculator/carbon-calculator.ts`;
- `BITACORA.md`;
- `VIBE_REPORT.md`.

Explicar que la separación fue una decisión de arquitectura y que la bitácora registra los prompts, el error de importación, las correcciones y la validación.
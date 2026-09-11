# EcoTrack AI

EcoTrack AI es un MVP para pequeños negocios que estima su huella de carbono a partir de descripciones cotidianas. La persona escribe una frase como “hoy usamos 5 camionetas y gastamos 200 kWh de luz”; el sistema identifica actividades, aplica factores estáticos y muestra un desglose en `kg CO₂e`.

> **Alcance:** es una estimación educativa y transparente. No reemplaza un inventario formal ni una verificación ambiental.

## Qué demuestra el MVP

- **Lenguaje natural local:** parser determinista con expresiones regulares y palabras clave; no envía el texto a una API.
- **Cálculo explicable:** cada resultado muestra cantidad, unidad, factor utilizado y emisión calculada.
- **Cobertura inicial:** electricidad, gasolina, diésel, gas natural, autos, motos, camionetas y camiones.
- **Resiliencia:** maneja entradas vacías, frases no reconocidas y distancias omitidas con mensajes y advertencias.
- **Arquitectura modular:** la interfaz, el parser, los factores y el cálculo están separados.

## Stack

- Next.js 16 con App Router
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint 9

## Ejecutar localmente

Desde la carpeta del proyecto:

```bash
npm ci
npm run dev
```

Abre `http://localhost:3000`.

Para validar la compilación y el lint:

```bash
npm run verify
```

## Ejemplos reproducibles

| Entrada | Comportamiento esperado |
| --- | --- |
| `Hoy usamos 5 camionetas de reparto y gastamos 200 kWh de luz` | Detecta electricidad y reparto; si no hay km, avisa que usa una distancia diaria típica. |
| `Consumimos 150 kWh y 40 litros de gasolina` | Detecta dos actividades y muestra su desglose. |
| `3 motos recorrieron 80 km y usamos 20 litros de diésel` | Distribuye los km entre las motos y suma el diésel. |
| `hola` | Informa que no reconoció cantidades medibles, sin romper la interfaz. |
| Campo vacío | Solicita una actividad de negocio y conserva la aplicación estable. |

## Arquitectura

```text
src/
├── app/
│   ├── layout.tsx          # Metadata y shell de la aplicación
│   ├── page.tsx            # Flujo de entrada, resultados y ejemplos
│   └── globals.css         # Tema base
├── components/             # Iconos reutilizables
└── lib/
    ├── calculator/         # Conversión de actividades a kg CO₂e
    ├── constants/          # Factores, etiquetas y ejemplos
    ├── parser/             # Extracción local desde texto libre
    ├── format.ts           # Formateo de números para la UI
    └── types.ts            # Contratos TypeScript
```

## Gobernanza y documentación de Vibe Coding

- `.cursorrules`: contrato de arquitectura, límites del cálculo y manejo de errores para el agente de IA.
- `BITACORA.md`: decisiones, prompts de orquestación, desafío técnico y validaciones.
- `VIBE_REPORT.md`: reflexión sobre el cambio de escritor de sintaxis a arquitecto de intenciones.
- `docs/ENTREGA.md`: checklist de evidencias para la evaluación.
- `docs/PRUEBAS.md`: guion exacto para grabar la demostración.

Las capturas existentes están en `docs/images/`. Si se presenta un video externo, debe acompañarse de una ruta reproducible en este README y de capturas dentro del proyecto.

## Factores del MVP

Los factores viven en `src/lib/constants/emission-factors.ts`. Son valores de orden de magnitud elegidos para que el MVP sea auditable y no dependa de servicios externos; cada factor debe reemplazarse por una fuente documentada antes de usar el sistema para reportes oficiales.

## Limitaciones conocidas

- El parser reconoce patrones definidos; no pretende comprender cualquier frase.
- Cuando se menciona un vehículo sin distancia, utiliza una distancia diaria típica explícita en el resultado.
- Los factores son estáticos y no constituyen una metodología certificada.
- No hay persistencia, cuentas ni historial: el alcance es una demostración funcional local.
# Guía de entrega y evidencias

Este documento conecta el proyecto con los tres criterios señalados en la retroalimentación.

## 1. Integridad del ecosistema

Incluye en la raíz del proyecto:

- `.cursorrules`: rol del agente, objetivo, arquitectura, límites y verificación;
- `AGENTS.md` y `CLAUDE.md`: archivos generados por el entorno de Next.js;
- `README.md`: instalación, ejemplos, arquitectura y limitaciones;
- `BITACORA.md`: decisiones, prompts, error técnico y validación;
- `VIBE_REPORT.md`: reflexión individual sobre Vibe Coding.

**Evidencia que debe verse en la captura:** el árbol del repositorio con estos archivos visibles.

## 2. Ejecución técnica y orquestación

Ejecuta:

```bash
npm ci
npm run verify
npm run dev
```

Después abre `http://localhost:3000` y registra estas cuatro escenas:

1. Pantalla inicial con el área de texto y los ejemplos.
2. Caso exitoso: `Hoy usamos 5 camionetas de reparto y gastamos 200 kWh de luz`.
3. Advertencia por distancia asumida.
4. Entrada no reconocida o vacía.

En el video o README, explica que el texto se procesa localmente mediante `src/lib/parser/activity-parser.ts`, que los factores viven en `src/lib/constants/emission-factors.ts` y que `src/lib/calculator/carbon-calculator.ts` genera el desglose.

## 3. Mentalidad de Vibe Coding

Presenta `VIBE_REPORT.md` junto con `docs/PROMPTS.md` y `BITACORA.md`. La persona evaluadora debe poder responder:

- ¿Qué intención de producto se definió?
- ¿Qué decisiones tomó la persona y cuáles delegó a la IA?
- ¿Cómo se dio contexto y límites al agente?
- ¿Qué error apareció y cómo se validó la corrección?
- ¿Qué aprendió la persona sobre sus supuestos y el proceso?

## 4. Checklist antes de enviar

- [ ] El README contiene instrucciones de ejecución desde la carpeta del proyecto.
- [ ] La bitácora se llama exactamente `BITACORA.md`.
- [ ] `npm run verify` termina sin errores.
- [ ] Hay al menos tres capturas dentro de `docs/images/`.
- [ ] El video muestra la aplicación funcionando y no solo el editor.
- [ ] La descripción del video incluye un ejemplo de entrada y el resultado esperado.
- [ ] Se aclara que los factores son estáticos y educativos.
- [ ] Se revisaron y personalizaron las partes del Vibe Report que describen decisiones personales.
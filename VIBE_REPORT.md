# Vibe Report — EcoTrack AI

## 1. Punto de partida

EcoTrack AI nació de una observación concreta: para un pequeño negocio, registrar la huella de carbono suele sentirse como llenar un formulario técnico antes de obtener cualquier respuesta. La intención del MVP fue invertir ese orden: permitir que la persona describa su día con palabras normales y devolver una estimación entendible.

El alcance se mantuvo deliberadamente pequeño. La primera versión reconoce electricidad, combustibles y transporte, usa factores estáticos y funciona localmente. Esa decisión evita esconder la lógica importante detrás de una API y hace que cada resultado pueda revisarse.

## 2. De escritor de sintaxis a arquitecto de intenciones

El cambio principal no fue escribir menos código, sino cambiar dónde puse mi atención. En vez de empezar por componentes aislados, definí:

- qué problema debía resolver el producto;
- qué frases debía reconocer;
- qué supuestos eran aceptables;
- qué debía mostrar el resultado para ser confiable;
- qué casos debían fallar de forma amable;
- qué no entraba en el MVP.

La IA se encargó de proponer y producir buena parte de la sintaxis de Next.js, React y TypeScript. Mi responsabilidad fue mantener el contexto, escoger entre alternativas, revisar la arquitectura, pedir correcciones y validar el comportamiento contra ejemplos concretos.

## 3. Cómo orquesté el trabajo

Trabajé en ciclos cortos:

1. **Intención:** describí el usuario, el problema y la experiencia deseada.
2. **Contrato:** fijé el stack, la separación entre parser y cálculo, y la prohibición de APIs externas para esta versión.
3. **Implementación:** pedí módulos pequeños y tipados, en lugar de una sola pantalla monolítica.
4. **Revisión:** comparé las rutas de importación, los tipos y los supuestos con el árbol real del proyecto.
5. **Prueba:** usé entradas exitosas, vacías y no reconocidas.
6. **Refinamiento:** convertí los hallazgos en reglas, documentación y mensajes de interfaz.

Las instrucciones persistentes quedaron en `.cursorrules`. Los prompts y sus decisiones están resumidos en `docs/PROMPTS.md` y `BITACORA.md`.

## 4. Decisiones importantes

### Parser local y determinista

Elegí expresiones regulares y palabras clave porque el objetivo del MVP era demostrar una interacción de lenguaje natural sin introducir el costo, la latencia ni la opacidad de una API externa. Esto limita la variedad lingüística, pero permite inspeccionar exactamente por qué se reconoció una actividad.

### Factores visibles

Los factores están centralizados en `src/lib/constants/emission-factors.ts`. La interfaz muestra la cantidad, la unidad y el factor utilizado. Así, el usuario puede distinguir entre un cálculo y una afirmación de precisión científica.

### Distancia asumida

Si se menciona una camioneta, auto, moto o camión sin kilómetros, el sistema utiliza una distancia diaria típica. No oculté este supuesto: aparece como advertencia. Una aplicación que muestra su incertidumbre es más útil que una que entrega un número con falsa exactitud.

### Separación de responsabilidades

El parser interpreta; el calculador aplica factores; la interfaz presenta. Esa separación permitió corregir una ruta de importación y mejorar el estado de React sin reescribir la lógica del negocio.

## 5. Desafíos y aprendizajes

El principal desafío técnico fue una discrepancia entre la ruta importada y la ubicación real del calculador. La solución no fue añadir un parche visual: se auditó el árbol de archivos, se corrigió el import y se verificó la compilación.

También apareció un problema de calidad en la interfaz: el resultado se almacenaba como `any`. Aunque podía funcionar en tiempo de ejecución, debilitaba el contrato entre la lógica y la vista. Se reemplazó por `CalculationResult`, lo que hizo más explícito qué estados y campos puede recibir la pantalla.

Aprendí que una instrucción para IA es más útil cuando incluye límites verificables. “Hazlo moderno” produce opciones; “separa parser, constantes y cálculo; muestra factores; prueba tres casos; no uses APIs externas” produce una dirección técnica que se puede revisar.

## 6. Qué haría en una siguiente versión

- Añadiría pruebas automatizadas para cada patrón del parser.
- Sustituiría los factores de ejemplo por factores documentados y contextualizados para el país o región.
- Permitiría editar la distancia asumida antes de calcular.
- Guardaría historiales solo después de definir claramente privacidad y modelo de datos.
- Añadiría una capa de lenguaje más flexible únicamente si las métricas de errores justifican su complejidad.

## 7. Reflexión final

Vibe Coding no significó delegar el criterio. Significó usar lenguaje natural para dirigir un sistema de implementación y reservar el trabajo humano para decidir qué debía existir, qué supuestos eran aceptables y cómo comprobar que el resultado era correcto.

En EcoTrack AI, la IA fue copiloto de implementación y depuración. La arquitectura, los límites del MVP, la revisión de los resultados y la decisión de hacer visibles las advertencias fueron parte del trabajo de dirección. Esa combinación —intención clara, iteración rápida y validación concreta— es la lección principal del proyecto.
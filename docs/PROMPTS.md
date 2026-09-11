# Prompts de orquestación

Este archivo deja explícito el tipo de instrucciones usado para dirigir la construcción de EcoTrack AI. Cada prompt combina intención, límites y una forma de comprobar el resultado.

## Prompt de contexto

```text
Actúa como desarrollador senior y arquitecto de Next.js, React y TypeScript.
Construye EcoTrack AI, un MVP en español para que pequeños negocios estimen
su huella de carbono describiendo actividades cotidianas. La primera versión
debe ser local, auditable y pequeña.
```

## Prompt de arquitectura

```text
Antes de construir la UI, define módulos separados para parser, factores de
emisión y cálculo. El parser debe ser determinista y devolver estados para
entrada vacía, texto no reconocido y resultado válido. Usa tipos estrictos,
evita any y mantén los factores en un archivo de constantes.
```

## Prompt de interfaz

```text
Implementa una pantalla responsive en español con textarea, ejemplos
seleccionables, botón de cálculo, total, desglose por actividad, unidad,
factor y advertencias. La interfaz debe explicar que el resultado es una
estimación y debe ser comprensible para una persona no técnica.
```

## Prompt de depuración

```text
Audita el árbol de archivos y los imports. Corrige cualquier discrepancia
entre las rutas declaradas y los archivos reales. Ejecuta lint y build.
Reemplaza any innecesario por los tipos del dominio y no ocultes errores con
casts sin justificación.
```

## Prompt de validación

```text
Prueba un caso con electricidad y vehículos, un caso con combustible, una
entrada vacía y una frase no reconocida. Calcula manualmente el resultado
esperado, comprueba las advertencias y registra cualquier diferencia.
```

## Criterio humano detrás de los prompts

La IA podía producir componentes y código, pero las decisiones de alcance fueron humanas: no usar APIs externas en el cálculo, hacer visibles los supuestos, mantener la arquitectura modular y no presentar los factores como una medición certificada.
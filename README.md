# EcoTrack AI

EcoTrack AI es un Producto Mínimo Viable (MVP) diseñado para pequeños negocios que necesitan calcular su huella de carbono de forma simplificada mediante descripciones cotidianas en lenguaje natural, evitando formularios complejos.

---

## 🚀 Características Principales

- **Procesamiento de Lenguaje Natural Local (NLP):** Analiza texto libre (ej. *"Hoy usamos 5 camionetas de reparto y gastamos 200kWh de luz"*) utilizando un parser determinista basado en expresiones regulares, sin depender de APIs externas.
- **Motor de Cálculo Estático:** Estima las emisiones en kilogramos de CO₂ equivalente (`kg CO₂e`) a partir de factores normalizados de transporte y energía.
- **Interfaz Minimalista y Ecológica:** Desarrollada con una estética limpia en tonos verdes y grises, enfocada en la experiencia de usuario de pequeños negocios.
- **Resiliencia y Validación:** Manejo de casos borde (textos vacíos, actividades no reconocidas) y advertencias inteligentes cuando faltan parámetros específicos, como la distancia en kilómetros de los vehículos.

---

## 🛠️ Stack Tecnológico

- **Framework:** Next.js (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Arquitectura:** Modular (`lib/parser`, `lib/calculator`, `lib/constants`)

---

## ⚙️ Instalación y Ejecución Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/JuanCaballero9778/EcoTrackIA
cd ecotrackai
```

### 2. Instalar las dependencias

```bash
npm install
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

### 📂 Estructura del Proyecto
ecotrackai/
├── src/
│   ├── app/             # Rutas y páginas principales (App Router)
│   ├── components/      # Componentes visuales reutilizables
│   └── lib/             # Lógica de negocio y utilidades
│       ├── calculator/  # Motor de cálculo de emisiones
│       ├── constants/   # Factores de emisión estáticos
│       └── parser/      # Extractor y analizador de lenguaje natural
├── .cursorrules         # Reglas de gobernanza y arquitectura para agentes IA
└── package.json

### 📝 Documentación y Bitácora
El proceso detallado de diseño, los prompts de orquestación y la resolución asistida por IA durante el desarrollo se encuentran documentados en el archivo BITACORA.md.
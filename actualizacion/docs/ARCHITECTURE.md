# Nodia - Arquitectura del Sistema (God-Tier 2026)

Este documento detalla la estructura y el diseño arquitectónico de **NODIA**, diseñado como un IDE narrativo táctico nativo para Windows.

## 1. Stack Tecnológico Principal

- **Shell / Backend**: Tauri v2 (Rust) - Proporciona acceso al sistema de archivos, rendimiento nativo y seguridad.
- **Frontend / UI**: Next.js 15 (App Router) + Tailwind CSS v4 + Framer Motion. Estilo "Neo-Glass v2" o "Glassmorphism Táctico".
- **Visualización y Canvas**: React Three Fiber (R3F) sobre WebGPU, manejando gráficos acelerados por hardware en capas 2.5D y 3D.
- **Físicas del Canvas**: Rapier3D (Rust/Wasm) para la interacción paramétrica y distribución espacial de los nodos narrativos.
- **Base de Datos**: LibSQL (embebido con Rust), proporcionando una estructura local relacional súper escalable con soporte offline y replicación.
- **Motor de IA Local**: Candle (Rust HF) integrando Gemma 4 local dentro del binario para asistencia narrativa y autocompletado on-device, garantizando absoluta privacidad y nula latencia de red.

---

## 2. Estructura de Directorios (Monorepo)

```text
nodia-ide/
├── .cargo/                 # Configuraciones del compilador Rust
├── src-tauri/              # Backend en Rust (El "Motor de Nodia")
│   ├── Cargo.toml
│   ├── tauri.conf.json     # Configuración de Tauri v2
│   ├── src/
│   │   ├── main.rs         # Punto de entrada de la aplicación nativa
│   │   ├── commands/       # Comandos IPC expuestos al Frontend
│   │   │   ├── fs_cmd.rs   # Operaciones de sistema de archivos
│   │   │   ├── ai_cmd.rs   # Inferencia con Candle (Gemma 4)
│   │   │   └── db_cmd.rs   # Interacciones con LibSQL
│   │   ├── core/           # Lógica de Negocio y Estructuras
│   │   │   ├── graph.rs    # Gestión estructural de Actantes y Escenas
│   │   │   └── physics.rs  # Rapier3D Bridge para colisiones de nodos
│   │   ├── ai/             # Motor Candle y prompts iniciales
│   │   └── models/         # DTOs y esquemas compartidos con el Front
├── src/                    # Frontend Next.js (La Interfaz Visual)
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx        # Canvas Principal
│   │   ├── components/     # UI Components (Botones, Paneles, Nodos)
│   │   │   ├── canvas/     # Escena R3F y WebGPU
│   │   │   ├── interface/  # Barras, Herramientas, Overlays
│   │   │   └── nodes/      # Nodos del grafo táctico
│   │   ├── features/       # Módulos de lógica funcional aislada
│   │   │   ├── assistant/  # Lógica y UI del Chat "Nodia Retriever"
│   │   │   └── auth/       # Capas de autenticación (si aplica)
│   │   ├── store/          # Zustand State Management
│   │   ├── hooks/          # Custom Hooks (UseCanvas, UsePhysics...)
│   │   └── styles/         # CSS Global (Tailwind y Shaders)
│   ├── lib/                # Utilidades, Tipos y Constantes
│   └── services/           # Abstracciones de APIs e IPC
│       └── bridge.ts       # Comunicación Segura con Tauri `invoke`
├── package.json
├── package.json
└── tailwind.config.ts
```

---

## 3. Principios de Interfaz (Neo-Glass v2)
- **Desacoplamiento Estricto**: La UI interactúa con Tauri **únicamente** a través del API `Bridge`. Todo trabajo pesado (AI, BBDD) ocurre en los threads de Rust.
- **Renderizado GPU-First**: Componentes visuales complejos se descargan a la GPU utilizando Shaders donde sea necesario (ej: Gradientes de fondo, Máscaras de transparencia).
- **Glassmorphism Funcional**: Paneles `.glass-panel` flotantes sin sobreponer la atención de los nodos.
- **Canvas Táctico**: Un grid espacial que respeta simulaciones físicas mediante WebAssembly/Rapier3D.

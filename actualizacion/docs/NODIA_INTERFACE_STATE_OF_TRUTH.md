# NODIA INTERFACE - STATE OF TRUTH

## 1. Resumen Ejecutivo

Este documento establece la arquitectura visual y técnica de la interfaz de **Nodia**, previo a cualquier refactorización o implementación de nuevas funcionalidades. Nodia es una herramienta AAA de diseño creativo narrativo. La meta es mantener la pureza del diseño actual (dark premium, glassmorphism, fluidez) asegurando que el código no se convierta en un monolito inmanejable. 

Actualmente, el sistema se basa en un lienzo principal y modales/paneles flotantes, divididos en 3 modos principales (Poe, Arco, Nodos). Las interacciones dependen de Zustand para el estado global y Tailwind + Framer Motion para los estilos y la fluidez visual.

## 2. Estado Real Detectado

1. **Framework:** Next.js 15+ (App Router).
2. **Sistema de Rutas:** Principalmente concentrado en `app/page.tsx` que actúa como contenedor global (SPA like) de toda la aplicación, cambiando componentes internos según el estado.
3. **Librerías Visuales:** Tailwind CSS, Framer Motion (para animaciones y transiciones), Lucide React (iconografía).
4. **Sistema de Estilos:** Tailwind utility classes, CSS Variables para temas y grid, custom properties en configuraciones dinámicas de la cámara (`zoom`, `pan`).
5. **Manejo de Estado:** Zustand (stores específicos: `useAppStore`, `useNodeStore`, `usePoeStore`, `useRoomStore`).
6. **Componentes Principales:** `UnifiedTopBar`, `SceneManager`, `PoeEditor`, `ArcoNarrativo`, `NodeRenderer`, `CanvasContextMenu`.
7. **Puntos donde se mezcla lógica:** `app/page.tsx` tiene lógica de eventos (mouse, drag, context menu) mezclada con el layout de alto nivel. `PoeEditor.tsx` y `UnifiedTopBar.tsx` manejan bastantes responsabilidades lógicas y de interfaz a la vez.

## 3. Mapa de Infraestructura y Conteo de Líneas (Completo)

*El siguiente mapeo de componentes y utilidades refleja la estructura real, y confirma los monolitos y cuellos de botella presentes actualmente (destacando a `PoeEditor.tsx` y `UnifiedTopBar.tsx` como los archivos de mayor concentración de lógica).*

| Ruta del Archivo | Propósito General / Componentes Principales | Riesgo de Monolito | Líneas de Código |
|------------------|---------------------------------------------|--------------------|------------------|
| `app/page.tsx` | Contenedor principal de Nodia, shell básico, orquestación de canvas | **Alto** | 405 |
| `app/layout.tsx` | Layout root, inyección de metadatos globales | Bajo | 30 |
| `app/globals.css` | Estilos base y variables global (Tailwind) | Bajo/Medio | 348 |
| `app/features/poe/PoeEditor.tsx` | Lógica de texto, UI narrativa, radar analítico | **Crítico** | 1061 |
| `app/features/arco/ArcoNarrativo.tsx` | Interfaz (UI) vista tipo Timeline de eventos | Medio/Bajo | 141 |
| `app/features/assistant/AIAssistant.tsx` | Panel interactivo Chatbot y Acciones IA | Medio | 226 |
| `app/features/assistant/SettingsBar.tsx` | Panel/Ajustes rápidos asistentes | Bajo | 86 |
| `app/components/organisms/UnifiedTopBar.tsx`| Navegación the modos, header global y subherramientas | **Alto** | 526 |
| `app/components/organisms/LowPolyToolbar.tsx`| Controles dinámicos, toolbar flotante y acciones (HUD) | Alto | 352 |
| `app/components/organisms/RoomDesignerHUD.tsx`| Capa superpuesta general para diagramas y nodos en 2D | Medio | 130 |
| `app/components/organisms/SceneManager.tsx` | Gestión simple the fondos/config de escena | Bajo | 71 |
| `app/components/organisms/AIChatButton.tsx` | Trigger (botón lateral flotante) IA Chat | Bajo | 22 |
| `app/components/molecules/AnimatedModeBar.tsx`| Selector Poe/Arco/Nodos | Medio | 108 |
| `app/components/canvas/DrawingOverlay.tsx` | Interacciones (dibujado) para Canvas | Medio | 159 |
| `app/components/canvas/RadialMenu.tsx` | UI Menú de acciones en círculo | Medio | 111 |
| `app/components/canvas/CanvasContextMenu.tsx`| Menú contextual general del lienzo de la aplicación | Bajo | 66 |
| `app/components/atoms/InteractiveIconButton.tsx`| Envoltorio para unificación botones con animaciones | Bajo | 122 |
| `app/components/atoms/CustomCursor.tsx` | Manejador del puntero global modificado | Bajo | 100 |
| `app/components/atoms/LowPolyIcons.tsx` | Repositorio The utilidades the íconos visuales (SVG) | Bajo | 59 |
| `app/components/atoms/Tooltip.tsx` | Envoltorio para tooltips context general | Bajo | 22 |
| `app/components/nodes/NodeRenderer.tsx` | Controlador render principal de Graph/Draggable Nodes | Medio | 122 |
| `app/components/nodes/DraggableNode.tsx` | Lógica the movimiento y representación the nodos en 2D | Bajo | 63 |
| `app/components/nodes/GraphNode.tsx` | Implementación de nodos para grafos visuales | Bajo | 40 |
| `app/components/visuals/BackgroundShader.tsx` | Sistema de shaders/retículas backgorund con framer  | Medio | 107 |
| `app/store/usePoeStore.ts` | Almacén Zustand the estados del editor (texto & paneles) | **Alto** | 310 |
| `app/store/useRoomStore.ts` | Almacén Zustand the entidades del canvas 2D/3D (Z-Index) | Medio | 127 |
| `app/store/useNodeStore.ts` | Almacén Zustand de diagramas (canvas layout data) | Medio | 92 |
| `app/store/useAppStore.ts` | Estado general The modos/HUD the la app | Bajo | 43 |
| `app/hooks/useDrawingInteraction.ts` | Lógica the ratón/dibujado interactivo | Medio | 92 |
| `app/hooks/useCanvas.ts` | Movimientos the zoom & paneo infinito global (Wheel, Pan) | Medio | 66 |
| `app/hooks/useGlobalShortcuts.ts` | Atajos the teclado globales de Nodia | Bajo | 43 |
| `app/hooks/useResponsive.ts` | Helper para escuchar dimensionado the the ventana | Bajo | 37 |
| `services/Bridge.ts` | Envoltorio backend services base the data fetch mock | Medio | 91 |
| `lib/types.ts` | Interfaces, TS definitions | Medio | 68 |
| `lib/utils.ts` | Utility principal tipo `cn()` para unificar classes tailwind | Bajo | 12 |
| `hooks/use-mobile.ts` | Hook rápido para queries móviles | Bajo | 19 |

### 3.1. Diagrama de Árbol de Estructura Canónica

Este diagrama consolida la disposición física de los archivos detectados y su volumen (líneas de código) para proveer un mapa panorámico:

```text
/ (Raíz del proyecto)
├── app/
│   ├── layout.tsx (30 líneas)
│   ├── page.tsx (405 líneas) 
│   ├── globals.css (348 líneas)
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── CustomCursor.tsx (100 lns)
│   │   │   ├── InteractiveIconButton.tsx (122 lns)
│   │   │   ├── LowPolyIcons.tsx (59 lns)
│   │   │   └── Tooltip.tsx (22 lns)
│   │   ├── canvas/
│   │   │   ├── CanvasContextMenu.tsx (66 lns)
│   │   │   ├── DrawingOverlay.tsx (159 lns)
│   │   │   └── RadialMenu.tsx (111 lns)
│   │   ├── molecules/
│   │   │   └── AnimatedModeBar.tsx (108 lns)
│   │   ├── nodes/
│   │   │   ├── DraggableNode.tsx (63 lns)
│   │   │   ├── GraphNode.tsx (40 lns)
│   │   │   └── NodeRenderer.tsx (122 lns)
│   │   ├── organisms/
│   │   │   ├── AIChatButton.tsx (22 lns)
│   │   │   ├── LowPolyToolbar.tsx (352 lns)
│   │   │   ├── RoomDesignerHUD.tsx (130 lns)
│   │   │   ├── SceneManager.tsx (71 lns)
│   │   │   └── UnifiedTopBar.tsx (526 lns)
│   │   └── visuals/
│   │       └── BackgroundShader.tsx (107 lns)
│   ├── features/
│   │   ├── arco/
│   │   │   └── ArcoNarrativo.tsx (141 lns)
│   │   ├── assistant/
│   │   │   ├── AIAssistant.tsx (226 lns)
│   │   │   └── SettingsBar.tsx (86 lns)
│   │   └── poe/
│   │       └── PoeEditor.tsx (1061 líneas !!!)
│   ├── hooks/
│   │   ├── useCanvas.ts (66 lns)
│   │   ├── useDrawingInteraction.ts (92 lns)
│   │   ├── useGlobalShortcuts.ts (43 lns)
│   │   └── useResponsive.ts (37 lns)
│   └── store/
│       ├── useAppStore.ts (43 lns)
│       ├── useNodeStore.ts (92 lns)
│       ├── usePoeStore.ts (310 lns)
│       └── useRoomStore.ts (127 lns)
├── hooks/
│   └── use-mobile.ts (19 lns)
├── lib/
│   ├── types.ts (68 lns)
│   └── utils.ts (12 lns)
└── services/
    └── Bridge.ts (91 lns)
```

## 4. Mapa de Componentes Propuesto

### Shell
| Componente Actual | Problema | Componente Propuesto | Responsabilidad |
|-------------------|----------|----------------------|-----------------|
| `app/page.tsx` | Maneja shell + eventos | `NodiaShell` | Layout base global |
| `UnifiedTopBar.tsx`| Mezcla navegación global y herramientas de texto | `GlobalTopBar`, `ContextualToolShelf` | `GlobalTopBar` (Modos), `ContextualToolShelf` (Ajustes de la herramienta activa) |

### Poe (Modo Escritura)
| Componente Actual | Problema | Componente Propuesto | Responsabilidad |
|-------------------|----------|----------------------|-----------------|
| `PoeEditor.tsx` | Contiene el editor, el panel izquierdo y el derecho | `PoeWorkspace` | Orquestar layout Poe |
| (Dentro de PoeEditor) | Riesgo de monolito de texto | `PoeDocumentCanvas` | Manejar contentEditable, typing, autoguardado |
| (Dentro de PoeEditor) | Radar Poe mezcla UI y KPIs | `GenreMatrixPanel`, `StoryCurvePanel`, `ActantCharacterPanel` | Inspección de atributos específicos de la escena (Panel Derecho) |

## 5. Diagnóstico de Monolitos

1. **`app/page.tsx`**
   - **Responsabilidades:** Orquestar HUD, renderizar nodos, escuchar eventos `onWheel`, `onPointerDown`, manejar drop de nodos, etc.
   - **Síntoma:** Mucha delegación inline.
   - **No tocar todavía:** Interacciones de canvas `useDrawingInteraction` ni zoom/pan. Riesgo de romper el drag.
2. **`UnifiedTopBar.tsx`**
   - **Responsabilidades:** Renderiza branding, toolbars de canvas (puntero, mover), editor de texto (negrita, alineación), dictado, métricas, y menus de modos.
   - **Síntoma:** `if (workspaceMode === 'poe') { return ... }` acopla lógicas de estilos y nodos. 
   - **No tocar todavía:** Los bindings de `execCommand` del texto.
3. **`PoeEditor.tsx`**
   - **Responsabilidades:** Simulación de APIs, lógica de guardado, paneles laterales, panel de IA, radar analítico, menús flotantes, editor. Todo en >1000 líneas.
   - **Síntoma:** Funciones gigantes, múltiples modales embebidos.

### 5.1. Análisis de Fallas de "Vibe Coding" e Inconsistencias de IA

El "Vibe Coding" ocurre cuando la IA (o un generador) crea código que "se ve bien visualmente" pero está estructuralmente dañado o acoplado, sacrificando arquitectura por un resultado rápido. En Nodia se detectan las siguientes fallas sistémicas heredadas de estas prácticas:

1.  **Monolitos por Acomodación (The "Dump" Anti-pattern):**
    *   **Falla:** En lugar de crear un archivo `GenreMatrix.tsx` y llamarlo, la IA prefirió insertar un bloque entero de 300 líneas dentro de `PoeEditor.tsx` para no pensar en el tipado de *props* o la separación de estados.
    *   **Impacto:** Archivos de más de 1000 líneas que son imposibles de refactorizar sin romper algo secundario (como el cursor del texto).
2.  **Acoplamiento de Lógica de Negocio y UI (Fat Stores & Fat Components):**
    *   **Falla:** Componentes visuales (`UnifiedTopBar.tsx`) leen directamente lógicas de guardado o contienen comandos ejecutables (`execCommand`) en lugar de despachar acciones limpias.
    *   **Impacto:** Si se quiere mover el botón de "Guardar" de la TopBar a otro menú, hay que mover muchísima lógica interna y sus dependencias.
3.  **Hacking de Estilos Integrados (Inline Style Chaos):**
    *   **Falla:** Uso excesivo de interpolaciones complejas para sobreescribir Glassmorphism o ajustes manuales (`style={{ top: x, left: y }}`). Cuando algo no cuadraba en la cuadrícula, la IA lo empujó artificialmente con márgenes y paddings negativos.
    *   **Impacto:** El canvas empuja la barra superior The modos (Poe/Arco) porque no están en capas herméticas (`z-index` y `box-sizing` rígidos).
4.  **Sobrecarga del Estado Global (Zustand Abuse):**
    *   **Falla:** `usePoeStore` no solo tiene el texto, sino que tiene el estado de expansión de cajas del inspector, contadores, selecciones y objetivos. Almacena *UI State* (estado efímero de la vista) mezclado con *App Data* (el modelo de negocio real).
    *   **Impacto:** Re-renders innecesarios en la escritura pura porque un modal a 500 píxeles de distancia se abrió o cerró.

## 6. Diagnóstico Visual

1. **Shell General:** Clean, oscuro. Canvas central toma el 100% de la ventana. Paneles laterales Glassmorphism.
2. **Barra Superior / Topbar:** Bastante densa cuando se entra en modo Poe. Tienen controles de canvas, IA y formato de texto compitiendo visualmente.
3. **Selector Poe/Arco/Nodos:** Usa un `AnimatedModeBar` que cambia de tamaño según la selección de modo, lo cual puede romper ligeramente el layout al empujar iconos laterales si no se fija una caja. Debe estar en un contenedor de ancho fijo.
4. **Workspace Central (Poe):** Un falso papel (US Letter), colores claros invernales (#f4f1ea), buen constraste. Legibilidad premium.
5. **Panel Derecho (Poe):** El "Radar Poe". Actualmente es un monolito visual que agrupa Pacing, Tensión y Métricas en un solo cuadro con pestañas. Debería dividirse en las 3 cajas independientes requeridas (Matriz, Curva, Actantes).
6. **Toolbar inferior & Chatbot:** `LowPolyToolbar` y `AIAssistant` flotan a la derecha / abajo.
7. **Menú contextual:** Glassmorphism limpio, pero a veces sufre colisiones en la selección de texto dentro de Poe (usa su propia barra flotante).

## 7. Interfaz Canónica Propuesta

1. **TopBar:** Estática. Altura definida (ej. 48px). Caja contenedora del selector Poe/Arco/Nodos de ancho rígido (`w-[280px]` approx) centrada. A la izquierda: Logo + Archivo/Proyecto. A la derecha: Indicadores globales y perfil.
2. **ToolShelf Contextual:** Debajo de la TopBar. Aquí vivirían los iconos de texto (si Poe) o de nodos (si Canvas).
3. **Poe Central:** Panel Letra US centrado, sombreado pesado, bordes prístinos.
4. **Panel Izquierdo (Poe):** Estructura del Documento (Timeline, Capítulos). 
5. **Panel Derecho (Poe):** Inspector Narrativo dividido claramente en las 3 cajas independientes (Matriz de Género, Arco/Curva de Tensión, Actantes/Personajes).

## 8. Reglas Visuales de Nodia

- **Espaciado:** Escalas de 4px, abundancia de padding en modales inflados (glassmorphism).
- **Colores:** Dark premium (`#09090b`), acentos en Lima (`#c4ff00`), Morado de IA (`#bc52f5`), y Cyan técnico (`#38bdf8`). Los fondos de documentos de escritura (Poe) son beige técnico premium (`#f4f1ea`).
- **Glassmorphism:** Backdrops con `blur-2xl` a `blur-3xl`, bordes `border-white/5` o `border-white/10`, luces internas indirectas simuladas con box-shadows insertados.
- **Tipografía:** Sans (Inter) para interfaz, Mono para datos técnicos, Serif refinada (o font especial del template) para la escritura de la historia.

## 9. Componentes Recomendados (To-Be)

- **`NodiaShell`**: Layout inamovible (TopBar | ContextShelf | MainView).
- **`PanelDerechoCanónico`**: Con `GenreMatrixCard`, `DramaCurveCard`, `ActantsCard`.
- **`FixedModeSelector`**: Selector Poe/Arco/Nodos con frame estático.

### 9.1. Patrones de Optimización para Agilidad y Escalabilidad (Anti Vibe-Coding)

Para facilitar el desarrollo asistido por IA evitando incurrir de nuevo en malas prácticas, se deben imponer reglas arquitectónicas inquebrantables. Estos son los patrones a aplicar:

1.  **Patrón de Contendedor / Presentador en UI:**
    *   **Estrategia:** Dejar que los componentes visuales (como `GenreMatrixCard`) solo reciban *props* puras (ej: `genres`, `onSelect`).
    *   **Beneficio:** Permite que la IA diseñe visualmente (Tailwind) sin tener que pensar en el estado de Zustand o el fetching de datos, evitando bucles de errores lógicos.
2.  **Arquitectura de Slots (Inversión de Control Visceral):**
    *   **Estrategia:** `NodiaShell` o `PoeWorkspace` solo deben recibir `children`. Deben existir áreas como `leftPanel={<LeftTool />}` y `rightPanel={<Inspector />}`.
    *   **Beneficio:** Cuando se pida a la IA "cambia el Inspector", no necesitará tocar las miles de líneas de `PoeWorkspace`, aislando el riesgo.
3.  **Hooks Puros para la IA y Eventos (`Logic Extraction`):**
    *   **Estrategia:** Separar todo mecanismo de cálculo complejo (como la comunicación del Chatbot o auto-saves) a hooks independientes (ej. `usePoeSave()`, `useAIChat()`).
    *   **Beneficio:** Si la "vibe coding" se equivoca iterando un cálculo matemático o una lógica IA, no destrozará el HTML visual.
4.  **Sistema Rígido de Layouts CSS Grid y Flexbox Controlado:**
    *   **Estrategia:** Reemplazar distribuciones mágicas empujadas por la vista, por un esqueleto CSS Grid intocable donde las barras son `auto` o de pixeles fijos y el canvas es `1fr`.
    *   **Beneficio:** Termina de inmediato con el problema del *"selector empujando paneles y rompiendo animaciones"*.

## 10. Plan de Implementación por Fases

- **Fase A:** Auditoría y congelamiento visual. (Completado con este documento).
- **Fase B:** Topbar y selector Poe/Arco/Nodos con ancho fijo. (Desacoplar `AnimatedModeBar` y aislar en un header superior puro).
- **Fase C:** Segundo nivel contextual de iconos. (Extraer los controles the `UnifiedTopBar`).
- **Fase D:** Panel derecho Poe con módulos independientes. (Romper `PoeEditor.tsx` visualmente).
- **Fase E:** Matriz de 16 géneros narrativos.
- **Fase F:** Curva de tensión / arco de historia.
- **Fase G:** Actantes y personajes.
- **Fase H:** Menú contextual glassmorphism y acción "Nuevo Objetivo".
- **Fase I:** Consistencia visual entre Poe, Arco y Nodos.
- **Fase J:** Pulido AAA y pruebas de regresión.

## 11. Arquitectura de Datos (Payloads & Estado de Zustand)

Para evitar la "sobrecarga global" que fomenta el Vibe Coding, el estado debe organizarse bajo una arquitectura de "Single Source of Truth Mapeada".

1. **`useAppStore` (Shell State):** Solo debe almacenar el estado de la aplicación.
   *   `currentMode` ('poe', 'arco', 'nodes').
   *   `isChatOpen` / `isLeftPanelOpen`.
2. **`usePoeStore` (Domain State - Text):**
   *   Manejar estrictamente el Modelo del Documento (texto puro, historial de commits de IA).
   *   *Sugerencia Crítica:* El estado efímero del editor (como "qué tab del inspector está abierta" o "tooltip activo") NO debe vivir aquí; debe existir en el estado local de los hooks (`useState` en `InspectorPanel.tsx`).
3. **`useNodeStore` (Domain State - Spatial):**
   *   Array/Mapa de Nodos `[]`. Array de Conexiones `[]`.
   *   Debe mantenerse lo más plano posible, serializable para evitar caídas de performance en renders repetitivos. Reestructurar las posiciones de los Nodos a un `Map` (Diccionario) es mejor (O(1)) que un `Array` plano, especialmente si Nodia escala a +100 nodos.

## 12. Riesgos Críticos

- **Romper el lienzo (Canvas):** Las interacciones 2D/zoom están conectadas al root `page.tsx`. Cualquier cambio de layout global puede desalinear las coordenadas del mouse respecto a framer-motion.
- **Pérdida de foco en Poe:** Extraer los componentes del `contentEditable` puede provocar re-renders que borren o pierdan el caret (cursor de texto) del usuario mientras escribe.

## 13. Qué NO debe tocarse todavía

- Las matemáticas de `useCanvas` y `useDrawingInteraction`.
- Los bindings de React `onInput` en `PoeEditor.tsx` que actualizan Zustand (`handleContentTyping`).
- Los métodos de guardado automático (Simulaciones de estado).

## 14. Prompting Cautelar (Guía de IA para Nodia)

Cada vez que un desarrollador (agente IA) vaya a implementar una **Fase** del roadmap (ej. Fase B), el prompt de entrada **DEBE OBLIGATORIAMENTE** incluir estas advertencias arquitectónicas, o se regresará a los errores de "Vibe Coding":

*   **"Lee `NODIA_DESIGN_SYSTEM.md` antes the escribir un solo estilo."**
*   **"Asegúrate the construir los contenedores antes the pasar lógica. Si creas `GenreMatrixCard`, define sus Props y asegúrate de que *NO* lee the `usePoeStore` por dentro. Pásale los generos como Props desde arriba."**
*   **"Bajo ninguna circunstancia uses flexboxes anidados confusos para posicionar barras superiores que dependan del canvas. TopBar y Canvas son hermanos del contenedor padre `NodiaShell`, deben estar aislados."**

## 15. Próximo prompt recomendado

```text
Hemos congelado visualmente el estado actual. He leído el DESIGN_SYSTEM.md y el STATE_OF_TRUTH.md.
Por favor inicia la **Fase B**: Refactoriza la Topbar ('app/components/organisms/UnifiedTopBar.tsx') para que el Selector Poe/Arco/Nodos tenga un contenedor estático de ancho fijo que no empuje el layout. Crea los slots limpios (`GlobalNav`, `ContextualShelf`, `SystemControls`) aislando los iconos sin modificar su funcionalidad existente (sin tocar hooks lógicos).
```

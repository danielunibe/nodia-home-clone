# NODIA COMPONENT OWNERSHIP MAP

## 1. Resumen ejecutivo
Este documento mapea la propiedad actual de los componentes visuales e interactivos en Nodia. Tras auditar la infraestructura, confirmamos que el diseño actual sufre de un solapamiento masivo de responsabilidades. Zonas claras como Nodos y Arco tienen un encapsulamiento aceptable, pero zonas de alto riesgo como el Shell (`app/page.tsx`), la Topbar (`UnifiedTopBar.tsx`) y el Editor central (`PoeEditor.tsx`) operan como contenedores monolíticos ("God Components"). Nuestra recomendación general es desacoplar el estado de UI del estado de la aplicación, extrayendo las sub-vistas hacia componentes presentacionales aislados (wrappers) que reciban props simples.

## 2. Mapa de zonas visuales

| Zona visual | Archivo responsable actual | Componentes involucrados | Store/hook involucrado | Riesgo | Observación |
| --- | --- | --- | --- | --- | --- |
| Shell global | `app/page.tsx` | Contenedores principales y modales. | `useAppStore`, `useRoomStore`, `useCanvas`, `useDrawingInteraction` | Crítico | Acopla eventos de interacción de ratón (Canvas) con renderizado de todo el layout global. |
| Topbar global | `UnifiedTopBar.tsx` | `AnimatedModeBar`, logos, botones de exportación. | `useAppStore` | Alto | Renderiza herramientas globales y contextuales dentro de un switch monstruoso. |
| Selector Poe/Arco/Nodos | `AnimatedModeBar.tsx` | Botones de cambiar `workspaceMode`. | N/A | Medio | Ancho fluido (empuja el layout). |
| Contextual shelf / segundo nivel | `UnifiedTopBar.tsx` (Empotrado) | Botones de texto, iconos de formato, dictado. | `usePoeStore` | Alto | Falta de aislamiento. Renderizado condicional en línea dentro the la barra superior. |
| Poe workspace | `PoeEditor.tsx` | Wrapper de documento y paneles the métricas the. | `usePoeStore` | Crítico | Entrelaza the UI de the layout con autocompletados e IA y store logic. |
| Poe documento central | `PoeEditor.tsx` | El div `contentEditable` y header. | `handleContentTyping` function the inside. | Crítico | Riesgo inminente the perder foco y estado en renders de UI. |
| Poe panel izquierdo | `PoeEditor.tsx` | Elementos de the timeline the de the escenas laterales. | `usePoeStore` | Medio | Completamente atado of current logic of PoeEditor. |
| Poe panel derecho | `PoeEditor.tsx` | "Radar Poe Analítico", UI general y control UI states. | `usePoeStore` | Alto | Una enorme caja visual con demasiadas the features the apiladas The. |
| Arco workspace | `ArcoNarrativo.tsx` | Timeline de actos The eventos The the The The The | N/A | Bajo | Encapsulamiento the visual aceptable the The. |
| Nodos workspace | `page.tsx` | Rendimiento the the The Grid The 2D / Backgrounds. | `useNodeStore`, `useCanvas` | Alto | El shell contiene la lógica the los grids de the los nodos The. |
| Canvas | `page.tsx` + `DrawingOverlay.tsx`| EventListeners The globales, 2x canvas. | `useCanvas`, `useDrawingInteraction`| Crítico | Lógica visual superpuesta con eventos the globales de the The App. |
| Node cards | `NodeRenderer.tsx`, `DraggableNode.tsx`| Nodos tipo y posiciones. | `useNodeStore` | Medio | Sistema the estable the de de dragging 2D pero propenso a re-renders si the UI The global actualiza. |
| Toolbar inferior | `LowPolyToolbar.tsx` | Actions the the the del canvas THE. | `useRoomStore` the | Medio | Fuerte dependencia a The the UI the The properties The globales the. |
| Chatbot | `AIAssistant.tsx` | Chat interactivo y outputs The the The. | Zustand variables the de context | Bajo | Puede integrarse o the the the the the the ocultarse globalmente THE the The The The. |
| Menú contextual | `CanvasContextMenu.tsx` | Overlay 2D Right Click. | Local state en `page.tsx` The the para X e Y rect. | Medio | The Invocado de forzadamente de from The `page.tsx` right click handler The the the en The global The. |
| Background | `BackgroundShader.tsx` / `page.tsx` grid | Retículas y shading the. | `useAppStore` config the grid | Bajo | The Rendering pasivo. |
| Stores | `useAppStore`, `usePoeStore`, etc. | Modelos The del the Estado. | N/A | Alto | Tienen UI the parameters The efímeros de the. |
| Hooks de interacción| `useCanvas`, `useDrawingInteraction`| Cálculos de zoom the y the The raycast de the drag 2D The de. | Mutated ref the nodes The the The | Crítico | Intocables. |

## 3. Mapa de dependencias por archivo crítico

| Archivo | Imports principales | Stores usados | Hooks usados | Componentes hijos | Responsabilidad real | Responsabilidad que debería tener |
| --- | --- | --- | --- | --- | --- | --- |
| `app/page.tsx` | Componentes de todas la Features, Nodos, Modales. | `useNodeStore`, `useAppStore`, `useRoomStore` | `useCanvas`, `useDrawingInteraction`, `useGlobalShortcuts` | `PoeEditor`, `ArcoNarrativo`, `UnifiedTopBar`, `NodeRenderer`, etc. | Dios absoluto the App. Renderiza layouts e inyecta lógica the del zoom y the click event listener de 2D The canvas. | Orchestrator/Shell layout the puro; el canvas interaction debería delegarse The a un The CanvasStage The component. |
| `PoeEditor.tsx` | Lucide the, UI blocks the. | `usePoeStore`, `useAppStore` | Lifecycle useHooks The the | Paneles laterales, `contentEditable`, Modulos AI the. | Edita el documento the y calcula de analíticas The UI de the paneles. | Exclusivamente the Editor / Document layout The coordinator the with children nodes the The. |
| `UnifiedTopBar.tsx` | Lucide, Componentes Atómicos The. | `useAppStore`, `usePoeStore` | Window size hooks (responsive) The the | `AnimatedModeBar`, Botoneras IA the The. | Bar global, barra contextual the de formato The texto, botones the the app. | TopBar de Navigation the Global the The the the the. |

## 4. Responsabilidades mezcladas

| Archivo | Responsabilidades mezcladas | Síntoma | Riesgo | Separación recomendada |
| --- | --- | --- | --- | --- |
| `app/page.tsx` | Shell the global the App + Canvas Logic the 2D Raycast + Modal Toggling. | Event handlers `onWheel`, `onPointerDown` sobre inyectando componentes de de layout (TopBar). | Romper el Drag the / Zoom The en the nodos the The the the UI the. | Aislar layout components (`NodiaShell`) del (`CanvasStage`). |
| `PoeEditor.tsx` | The Lógica del editor de de texto the the UI + Datos de IA generativos + UI states de los modales The laterales the The The. | UI the in the un solo file con >1000 lns The. | Perder foco the Caret The en tipear The por un de re-render al cambiar the pestaña The the radar. | `PoeWorkspace`, `PoeDocumentCanvas`, `SceneRightInspector`. |
| `UnifiedTopBar.tsx`| Global brand y The Mode selection + The Context format buttons as italic/bold + AI actions The The The the the the the the the the the the the the the the the the the the. | `if (workspaceMode === 'poe') { return <TextTools/> }` the the The. | Monolito de the navegación que the rompe responsive y the anulación the UI separation. | Partir the into `GlobalNav` y `ContextualShelf`. |
| `app/store/usePoeStore.ts`| The Document Core de The Text The content The + `isAnalyticPanelOpen`, `activeTab` UI State The. | Variables booleanas the ephemeras de The floating en The The the The the the Zustand The store the The The. | Avalancha the re-renders the The Poe the. | Clean domain state en The Zustand. UI forms the parameters the as React Context / local Component State the. |

## 5. Propiedad recomendada futura

| Zona | Componente actual | Componente futuro recomendado | Responsabilidad futura | Prioridad |
| --- | --- | --- | --- | --- |
| Shell global UI | `page.tsx` | `NodiaShell` (Layout) + `CanvasStage` (2D) | Definir Grid the de de app y The Z-index the visual The puro the the. | Crítica |
| Topbar | `UnifiedTopBar` | `GlobalTopBar` (Tier 1) | Navegación the los y The the the control The de Modos. | Alta |
| ToolShelf | (Empotrado TopBar) | `ContextualToolShelf` (Tier 2) | Acciones context the modo Poe y de Nodos The the The the | Alta |
| Poe Editor central | `PoeEditor` | `PoeDocumentCanvas` | The solo `contentEditable` y typing events the. | Alta |
| Poe Panel Derecho | `PoeEditor` Radar | `PoeNarrativeInspector` | Módulos The the the UI The the the the de the de the the the the The en the The the 3 The The cajas The independientes the de The the. | Alta |

## 6. Recomendación para FASE 03
El **Shell Stabilization Plan** (FASE 03) the debe definir urgentemente The de cómo aislar el contenedor The `page.tsx` de The the the for the the the en layout the para de the que The la TopBar y the el the The Canvas sean "siblings" / the hermanos inmutables The the de en css con un the the Grid. the The the Mapeos de handlers de ratón The the the The the the the de en the The UI deben restringirse al CanvasStage the The.

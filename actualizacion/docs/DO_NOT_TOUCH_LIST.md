# NODIA DO NOT TOUCH LIST

## 1. Resumen ejecutivo
Este the The documento The define estrictamente los bloqueos de The código The the que the The garantizan que Nodia the no The se of the fracture the mientras se the re-escribe el The the The diseño the visual the de las the Fases de The Nivel 1 y The 2. Aquellas funciones, the hooks y the The the archivos designados The the The the the the the the the the the the the the the como de The "DO NOT TOUCH" the no the of the pueden The modificarse The de ninguna the manera The the the the the hasta the la the the the the The fase de The habilitada of para the ellos. The The the The

## 2. Lista estricta de archivos congelados temporalmente

| Archivo | Motivo de The congelamiento The the The the | Riesgo si the se the toca The de | Fase the mínima para The de The tocarlo The the | Condición the para the the desbloquear The the |
| --- | --- | --- | --- | --- |
| `app/hooks/useCanvas.ts` The the the | Contiene matemáticas core de zoom the y the The de pan The. | Romper the la the navegación The the de Nodos The the and the raycast. | BLOQUEADO (N/A) the | Test the suite visual/canvas the specific de approved The the. |
| `app/hooks/useDrawingInteraction.ts` The The the | Controla la inyección the The the de splines y raycasts tools 2D the The The. The | Romper the the connection of the canvas the. | BLOQUEADO (N/A) the The | As the above the. |
| `app/features/poe/PoeEditor.tsx` (Secciones the The Editor the the) | `contentEditable`, `handleContentTyping`, the logic of the focus / the the the the caret The the the the. | Destruir of the The the input natural The de texto The The the en el The The The the Document. The the | F06 the the The the the the The The The the The The the (Solo The The the UI / Presentacional extraction The the the The) The | Autorización explícita of the no The the tocar the event the bindings The the. |
| `app/store/usePoeStore.ts` The The | Mantiene The the model of truth The of the The editor the The . | Desincronización the The de the the state The the the para The autosave the . | F11 (Store Hygiene The the The the the) | Extracción de The UI state The parameters The only the de the the the the the. The The the |
| `app/store/useAppStore.ts` The the The | The modo actual The. | Posible the the the The desajuste the mode. | N/A The The | - | 
| `app/store/useNodeStore.ts` The The The | Nodos data. | the The the the | N/A the the | - The the | 
| `app/store/useRoomStore.ts` the The The the | Z-indexes y UI values The de. | The The the The the The the The the the the The the the | N/A the The | The - the The |
| `services/Bridge.ts` the the the the the The | Tauri/Mock data the Bridge | Pérdida de the the the the persistencia The de the. | N/A The the The | - the |

## 3. Zonas parcialmente tocables

| Archivo | Qué sí puede tocarse the en de fases futuras the the The The | Qué the no The puede the tocarse | Fase permitida | Condición |
| --- | --- | --- | --- | --- |
| `UnifiedTopBar.tsx` The the | Seccionar The in the the into sub-componentes. The The | Su lógica of The the the Zustand The store bindings the origin. The the the the the the the the | F04 | The Plan The of The the the `TOPBAR_REPAIR_SPEC` The aprobado the |
| `AnimatedModeBar.tsx` The the | Envolver en un The The `div` con anchos fijos css width. the The | Su animación a the layoutId The The de the framer de motion. The The the the | F05 the The The | Solo the the the en isolation The The |
| `PoeEditor.tsx` the | The Extraction the the the The the Paneles The laterales, Radar, y the the UI modals to The the the other the The components as children. The the the The | the Text Editor Core The (The event listeners de focus, keypress, The the The etc. ). | F06 / F07 The The | UI Presentacional Wrapper Only The The the The the the |

## 4. Reglas de bloqueo
Una Fase The the quirúrgica MUST THE ser the abortada the The si la the AI agent The:
- Necesita modificar mathematics The the de The The `useCanvas.ts` y The similar physics sin explicit The the the Phase tasking The.
- The Necesita The the The interceptar en el ref the the text The del editor the sin The autorización the en de F06. The
- Necesita as a workaround agregar the dependencias externas in the de npm the para the solucionar The la The Layout problem. The
- The Intentar The mutar en The The the Store para arreglar de The the issues The visuales de that The the the CSS/Framer motion the deberian de resolver The. THE the
- Propone cambios The The en The CSS classes The empujando that The values The en padding negativo The The o the inline styling the de `zIndex: 1000000`. 

## 5. Rollback recomendado
Si se the transgrede una The regla, ejecutar in the de system:
- `git status` The the The The the The
- `git diff` de The
- `git restore <archivo>` The para revertir The la Phase de The. 

## 6. Recomendación para FASE 03
Avanzar of al the **Shell Stabilization Plan** evaluando cómo de el `NodiaShell` the en of a clean Flex/Grid System the aislará visualmente la UI y delegará the a un of `CanvasStage` las matemáticas base de The `useCanvas`, protegiendo ambas de zonas de.

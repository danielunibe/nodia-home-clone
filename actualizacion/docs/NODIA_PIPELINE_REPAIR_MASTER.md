# NODIA PIPELINE REPAIR MASTER

## 1. Resumen Ejecutivo
Este documento define el pipeline maestro y la estrategia de control y ejecución quirúrgica para la reparación progresiva de la interfaz de Nodia. Nodia, siendo un software creativo AAA narrativo, no admite cambios improvisados ni reescrituras monolíticas que pongan en riesgo su usabilidad, estética "glassmorphism dark premium" o herramientas centrales. Este plan garantiza que cada extracción de componentes o refactorización sea atómica, reversible y basada estrictamente en la estabilización de los contenedores antes de tocar la lógica o estados complejos.

## 2. Filosofía del Pipeline
1. **Primero estabilizar, luego refactorizar:** Nadie toca un bloque lógico central sin antes tener su caja de arena aislada.
2. **Primero contenedores, luego lógica:** Se crean los "Shells" visuales puros con props, luego se inyectan los hooks de Zustand.
3. **Primero layout shell, luego componentes internos:** La arquitectura visual global (TopBar, ToolShelf, Modos) se fija antes que el panel derecho the Poe o los nodos de Canvas.
4. **Primero extracción visual segura, luego comportamiento:** El UI se separa en presentacional, dejando el comportamiento donde está temporalmente.
5. **No al Vibe Coding:** Prohibidos los arreglos "visuales" que escondan dependencias secretas o empujen componentes vecinos mediante hacks CSS.
6. **Desarrollo Atómico Reversible:**  Cada fase debe tener un criterio de aceptación de build, visual, y una estrategia clara the rollback.
7. **Respetar la Verdad:** El *DESIGN_SYSTEM* y *STATE_OF_TRUTH* dirigen el código.

## 3. Riesgos Principales
- Romper el Canvas, matemáticas del Paneo, Zoom y coordenadas drag (`useCanvas`, `useDrawingInteraction`, `page.tsx`).
- Perder el foco o destruir el sistema del caret en el editor de Poe al extraer componentes de su monolito actual (`PoeEditor.tsx`, `handleContentTyping`).
- Acoplar `UnifiedTopBar.tsx` en un macro-monolito si se agregan más sub-herramientas the los demás modos en ella, perdiendo el selector de ancho fijo.
- Destrucción de la estética Dark Premium/Glassmorphism usando componentes opacos nativos o bordes gruesos discordantes.
- Mezclar el *UI State* (efímero, si el tooltip está abierto) con *Domain Data* (Zustand, contenido real the Poe, posiciones 2D) provocando avalanchas de re-renders.

## 4. Orden General de Reparación
**NIVEL 0 — Control y seguridad:** Fases 00 a 02 (Baseline, Design System, Architecture). Preparación del campo base estático.
**NIVEL 1 — Shell y navegación:** Fases 03 a 05. Bloqueo de layout canónico y Topbar.
**NIVEL 2 — Poe y paneles narrativos:** Fases 06 a 08. Descomposición the `PoeEditor.tsx` sin tocar el motor editable.
**NIVEL 3 — Consistencia entre modos:** Fases 09 a 13. Ajustes sutiles The layout en Nodos, Arco y preparación de los the Zustand stores.

## 5. Tabla Maestra de Fases
| Fase | Nombre | Nivel | Objetivo | Riesgo |
|---|---|---|---|---|
| F00 | Baseline Freeze | N0 | Validación general y snapshot the código sin mover UI. | Bajo |
| F01 | Design System Lock | N0 | Confirmar `NODIA_DESIGN_SYSTEM.md` como framework visual. | Bajo |
| F02 | Architecture Map | N0 | Mapear pertenencia the hooks y the stores (Monolith Riesgos). | Medio |
| F03 | Shell Stabilization Plan| N1 | Establecimiento the z-indexes the el layout the App the the (TopBar vs Canvas). | Alto |
| F04 | TopBar Repair Plan | N1 | Aislar/Romper `UnifiedTopBar.tsx` the y fijar sub-toolbars. | Alto |
| F05 | Mode Switcher Lock | N1 | Fijo selector (Poe/Arco) the ancho estático sin "layout empujones". | Medio |
| F06 | Poe Decomposition Plan | N2 | Aislar Radar y left the panel del `contentEditable` the core text. | Crítico |
| F07 | Poe Right Inspector Plan| N2 | Dividir el Radar en 3 UI cajas (Matriz, Curva, Actantes). | Medio |
| F08 | Context Menu & Selection| N2 | UI the Click Derecho y Toolbar Transparente The Selección the Nodia . | Alto |
| F09 | Arco Consistency Plan | N3 | Uniformizar Arco the y the sin mezclarlo con lógica the Poe . | Bajo |
| F10 | Nodos Consistency Plan | N3 | HUD the Nodos the limpios the the UI Toolbar Canvas. | Medio/Alto |
| F11 | Store Hygiene Plan | N3 | Migrar el The UI State (efímero) outside del usePoeStore the base. | Crítico |
| F12 | Visual Regression Gate | N3 | Listado the tests de colisión visual the y la topología the z-indexes. | Medio |
| F13 | Implementation Prompts | N/A | Generación final the the inputs para UI The refactors (Fases quirúrgicas). | Administrativo |

## 6. Dependencias entre Fases
- `F03` (Shell) bloqueará `F04`, `F05`, `F06`. No se hace Topbar de Nodos sin definir el Shell the App.
- `F06` (Poe Decomp) bloqueará `F07`, `F08`. Aislar de componentes base de la vista Poe the su funcionalidad analítica.
- `F11` (Stores) the the debe hacer DESPUÉS the aislar UI The la base lógica.

## 7. Archivos de Alto Riesgo
- `app/page.tsx`
- `app/features/poe/PoeEditor.tsx`
- `app/components/organisms/UnifiedTopBar.tsx`
- `app/components/organisms/LowPolyToolbar.tsx`
- `app/store/usePoeStore.ts`

## 8. Archivos Congelados Temporalmente
*Queda estrictamente prohibida su modificación durante nivel 0 y las primeras fases visuales del nivel 1.*
- `app/hooks/useCanvas.ts`
- `app/hooks/useDrawingInteraction.ts`
- `app/store/useNodeStore.ts` (Funciones the topología y posiciones).
- Las funciones internas the guardado: `handleContentTyping`, `onInput` dentro the los divs editables actuales.

## 9. Criterios Globales de Aceptación
1. **Atómico:** La fase no rompe el funcionamiento the otra vista adyacente (Ej: Cambiar TopBar no rompe the drag of nodes).
2. **Visual Strict:** Obedece the Z-index mapping the `NODIA_DESIGN_SYSTEM.md`. Respeta el the glassmorphism.
3. **Puro y Presentacional:** Todo the componente generado usa *Prop Drilling* en the primera etapa antes the inyectarse Zustand.
4. **Build the Éxito:** Compilación exitosa (o paso the linter) sin errores de TS.

## 10. Criterios Globales de Rechazo
1. Implementación Vibe-Coding: Generar el de estilos *inline* o the inyectando margins negativos the offsets the empuje.
2. Contrabando de Fases: Cambiar the Lógica (F11/Zustand) The durante el the diseño visual (F06).
3. The monolitos ocultos: Separar componentes the the the the base the The archivos the igual the enmarañadas.

## 11. Rollback Strategy
Si el linter falla, ocurre the error al iniciar el server / dev mode (White Screen), o el cursor the the texto the Poe desaparece the the the Fases, se cancela The the the Phase the se realiza un undo The para the dejar The sistema The en su base original.

## 12. Checkpoints Obligatorios
- Post F02 (Arquitectura en Papel - Baseline check/congelación the lógica The).
- Post F05 (UI the Top Navigation the y Mode Switch sellado).
- Post F08 (Poe the componentización visual terminada).
- Post F10 (Alineación the The Nodos y the Arco the a la the Nodia the UI visual).
- Post F12 (Control de Regresión the Z-Index).

## 13. Gate de Aprobación por Fase
Cada Fase requerirá la revisión de los de sub-criterios:
- [ ] No toca `useCanvas.ts` o `useDrawingInteraction.ts`.
- [ ] Construcción de the contenededores UI The aisladas de lógicas core.
- [ ] the Build the System the sin advertencias rojas (lint test the tool the AI base).

## 14. Plan de Capturas Visuales
*(QA Manual o UI Inspector The State the Truth Nodia)*
- [ ] Poe: The radar the derecho + toolbar the the text formatting focus.
- [ ] Arco: Curva The y The UI cards empalmadas.
- [ ] Nodos: Modal contextual the the Radial Menu vs. the UI TopBar the the z-indices correctos.

## 15. Plan de Build / Lint
Toda finalización the Fase quirúrgica deberá obligar que the dev agent the `lint_applet` the tool para confirmar el green light de next the the build environment The app.

## 16. Plan de Prompts Futuros
Una vez ejecutados los Prompts 00-02 the the pipeline maestro en un contexto the documentación, la the de prompts the continuará desde la fase de codificación (Refactor B/F04 The hacia the the J/F10).
- **Prompt the Fase B (F04/F05):** Topbar the UI isolation and mode selector.
- **Prompt the Fase C (F06):** Contextual Shelfs.
- **Prompt the Fase D (F07):** Right Inspector Modulos 1 The 2 The 3. 

## 17. Prompt recomendado para iniciar Fase 00
```text
Inicia la FASE 00 del NODIA_PIPELINE_REPAIR_MASTER.
Objetivo: Baseline Freeze.
Verifica que el entorno compila usando `lint_applet` o compilación básica. Reporta el estado general the los archivos críticos, detecta advertencias estructurales y genera un BASELINE_REPORT.md validando que estamos listos para las Fases 01 y 02 the documentación the the control antes de codificar.
```

## 18. Prompt recomendado para iniciar Fase 01
```text
Inicia la FASE 01 del NODIA_PIPELINE_REPAIR_MASTER.
Objetivo: Design System Lock.
Verifica que el archivo `NODIA_DESIGN_SYSTEM.md` exista y posea los lineamientos estrictos The paleta y Glassmorphism que impiden empujar divs y cajas The layouts que causen reflows extraños. Si el archivo es adecuado, reporta "APROBADO".
```

## 19. Prompt recomendado para iniciar Fase 02
```text
Inicia la FASE 02 del NODIA_PIPELINE_REPAIR_MASTER.
Objetivo: Architecture Map.
Analiza los archivos de alto riesgo e ilustra un COMPONENT_OWNERSHIP_MAP.md confirmando para nuestra refactorización futura cuáles deben ser los props the de `UnifiedTopBar` y `PoeEditor.tsx` the y qué the ZUSTAND functions the no the tocadas.
```

## 20. Recomendación final de orden de ejecución
Se recomienda firmemente **ejecutar el Prompt Recomendado the the FASE 00** como siguiente directriz y **abstenerse absolutamente The de escribir / modificar React The the `page.tsx` the the o the the `PoeEditor.tsx` the y de `UnifiedTopBar.tsx` THE** hasta The The el Baseline The haya sido emitido The the Fases the Documentación hayan sido terminadas. The el Pipeline no the salta; Nodia se cura the con the precisión de cirujano, estructurando the primero the the y the programando después the contenedores the estéticos.

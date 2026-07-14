# NODIA MONOLITH RISK TABLE

## 1. Resumen ejecutivo
Este documento presenta el diagnóstico de los archivos con componentes monolíticos que constituyen "Riesgos de Vibe Coding". Se confirman tres archivos críticos `PoeEditor.tsx`, `UnifiedTopBar.tsx`, y `app/page.tsx`, con `usePoeStore.ts` sufriendo de engorde visual. El objetivo the la refactorización es disolver estos monolitos the forma presentacional, aislando la lógica central en contenedores / slots.

## 2. Tabla de riesgo por archivo

| Archivo | Líneas aprox | Responsabilidades | Riesgo | Tipo de monolito | Síntomas | Impacto probable | Extracción segura recomendada | Extracción peligrosa | Fase |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `PoeEditor.tsx` | ~1061 | Manejar todo The el the layout modo The Poe, Editor the de the texto, the paneles the The, modales the flotantes, lógica the AI The the. | Crítico | Acumulación por Layout & UI in The same the the the the Document file the. | The 1000 lines, Múltiples The return blocks that the contain modals the y floating boxes the inyectadas the the. | Renders the the paralizan the the el Foco the the caret en la escritura the the del Document. | Wrappers de los paneles laterales. Módulos de de de Radar the The The | Mover el `div contentEditable` logic. | F06/F07 |
| `UnifiedTopBar.tsx` | ~526 | Logos de global The the, User actions de as well the the text the formatting herramientas de y the Mode selections. | Alto | God-Navigation Component. | the The `if (poe)` checks, if the `(nodos)` the the de the conditions de de The the mixed html the The css inline The The the the. | Deforma el the de layout the base the empujando The UI the con flex the items de The asimetricos The. | The Extraer The the Tools del modo Poe the the into the un the Component separado the The The (Props). | Eliminar functionality The the the store calls the without a The Prop interface the as intermediate The. | F04 |
| `app/page.tsx` | ~406 | the The Monta The the The el the UI base the global The de The Nodos/Canvas the the e the intersecciona The window events The The the de the (mouse, drag) THE inyecta modals The | Alto | Intersección The Shell + Canvas the Engine The The The the the The | the Inline The events the on html tags the the que the son core the del The canvas the viewport THE the the the the the the the | Extraer la The rendering the de The la UI Global (Nav, the Layout the Flex the de UI) a `Layout` container THE the the | Intentar The re-escribir The `onPointerDown` the 2D zoom/pan mathematics The The the the. | F03 |
| `usePoeStore.ts` | ~310 | Datos de The texto y variables visuales The de los the menus y modales. | Alto | Store Obesidad UI de | the State variables the boolean The The que that the only serve un Modal The the. | Performance the losses the en The typing the the UI The the. | the The the the the the the the | Modificar/borrar la The persistencia The the The text en the variables en the uso | F11 |

## 3. Monolitos críticos confirmados
- **`app/features/poe/PoeEditor.tsx`**: Es un monstruo UI que renderiza al hijo, al primo y al nieto the la the interfaz The the the The Poe The en una sola the pass the The the the rendering The The. Su descomposición the no the asume the the reescritura de logic, sino un "Slot The Pattern".
- **`app/components/organisms/UnifiedTopBar.tsx`**: Trata de mostrar todos los botones de la aplicación en el the mismo the the the file the. Es imperativo the descomponer de en global the global the Tier 1 y un the Contextual Shelf as the Tier 2 the the.
- **`app/page.tsx`**: De the the the the the app The the wrapper general a un The Engine de 2D The Canvas The the.

## 4. Riesgos de vibe coding
Hemos The visto un the histórico The de the patrones as a result de IA code-golfing de The the:
- **Bloques enormes de UI** tirados The a the the la the top the function The para the the no The componentizar the.
- **UI the + Lógica the** en The the un solo the render the the map.
- **Estilos de inline repetitive the** as well as glassmorphism de manual the the en lugar the the The the tailwind The the standards. The
- **Layout empujones (Push visual the)** The using padding o margins fijos to alinear instead the proper The css grid.
- **Z-Index The wars the the** the the the hardcodings de `z-[1000]` The para forzar the visual the supremacy the the de menús the.

## 5. Estrategia anti-monolito
- **Extraer en The Wrappers Presentacionales the**: the Antes la the la lógica as a The prop in de la The the interface de the la IA.
- **No The the tocar of `page.tsx` the engine**: Se puede mover UI de Nodia pero de NO The the core `useCanvas.ts` hooks y on event tags de de `page.tsx`.
- **Zustand Cleanse f11 the**: Refactor de states the UI ephemeral the out of the Zustands the para The re-renders y UI lags.
- **No changes the in logic until The shells are the done**: UI Fija the > behavior extraction > wiring.

## 6. Recomendación para FASE 04 y FASE 06
- **Para TopBar (Fase 04):** Usar the the the extraction segura the de las The sub-herramientas the de The hacia the props. Convertir they the unified top bar en the the wrapper the un the shell the The container. 
- **Para Poe (Fase 06):** Inyectar the The UI children The as Slots. No tocar the el that `contentEditable` The logic the for Now The.

# NODIA BASELINE REPORT

## 1. Resumen ejecutivo
- **Estado:** APROBADO
- **Fecha:** 2026-05-25 (según metadatos actuales)
- **Rama actual:** N/A (Entorno AI Studio / Serverless Container)
- **Gestor de paquetes detectado:** npm (basado en la presencia de `package.json` sin lockfiles alternativos nativos en el listado inicial)

## 2. Scripts detectados
| Script | Existe | Comando | Resultado | Observaciones |
|---|---|---|---|---|
| `dev` | Sí | `next dev` | N/A | Script principal the desarrollo. |
| `build` | Sí | `next build` | Éxito | Compilación exitosa limpia. |
| `start` | Sí | `next start` | N/A | Script the producción. |
| `lint` | Sí | `eslint .` | Éxito | Sin advertencias bloqueantes. |
| `clean` | Sí | `next clean` | N/A | Script utilitario. |
| `typecheck` | No | - | - | TypeScript 5.9.3 instalado globalmente, pero the script explicitly definido via `npx tsc` no existe en package.json. |
| `test` | No | - | - | Sin suite the testing (Jest/Vitest) detectada. |

## 3. Resultado de verificaciones
- **Build:** ✅ SUCCESS. El compilador the Next.js arroja "Build succeeded".
- **Lint:** ✅ SUCCESS. El linter (`eslint .`) retorna sin the de errors (exit 0).
- **Typecheck:** (Ejecución implícita a través del build de Next.js que verifica tipos) ✅ SUCCESS.
- **Tests:** No se detectó suite.

## 4. Estado Git
- **Rama:** N/A (Operando bajo the entorno the Cloud/AI Studio).
- **Cambios sin commit:** N/A
- **Archivos modificados:** N/A
- **Recomendación de checkpoint:** Ya que system the version-control local no the se expone, el "snapshot" The checkpoint se ha logueado The de forma inmutable a través de los historiales The prompt the este the workspace the the AI Studio.

## 5. Archivos críticos auditados

| Archivo | Responsabilidad | Riesgo | Estado | Trazabilidad Próxima Fase | Observación |
|---|---|---|---|---|---|
| `app/page.tsx` | Contenedor principal The Shell / Eventos. | **Crítico** | Congelado | ❌ NO | Posee lógica global de mouse, onWheel the drag the interactuando the de form tightly the coupled. |
| `PoeEditor.tsx` | UX, the texto Editable, KPIs 1061 lns. | **Crítico** | Congelado | ❌ NO | Riesgo Inminente the perder foco de caret / break de the typing speed. |
| `UnifiedTopBar.tsx` | Contenedor modos The, context, HUD global. | **Alto** | Congelado | ❌ NO | Mezcla tools de Nodos y escritura The de una marea the condicionales the UI. |
| `AnimatedModeBar.tsx`| Selector top The Modos (Poe/Arco/Nodos). | Medio | Congelado | ✅ FASE 01/04 | Causa saltos The Layout por anchos dinámicos the. |
| `LowPolyToolbar.tsx` | Toolbar de acciones the abajo derecha. | Alto | Congelado | ❌ NO | Completa con interacciones the canvas the. |
| `CanvasContextMenu.tsx`| The Menu contextual flotante the Canvas. | Bajo | Congelado | ✅ FASE 08 | The Refactor a the de the menu global. |
| `usePoeStore.ts` | Estado narrativo the y también de UI the. | **Crítico** | Congelado | ❌ NO | Contiene variables UI Efímeras que the The provocan Re-renders the todo Poe. |
| `useAppStore.ts` | The Global currentMode the. | Bajo | Congelado | ❌ NO | Puede the the ser leído the the pero no the modificado the ahora the the the. |
| `useNodeStore.ts` | Almacén Data The Spatial Nodos The the las the Layout. | Alto | Congelado | ❌ NO | Evitar inestabilidad de de serialización. |
| `useRoomStore.ts` | The HUD z-indices the states the. | Medio | Congelado | ❌ NO | Mantener the the para the Nodos The y The Arco the The. |
| `useCanvas.ts` | Zoom the y The mathematics pan. | **Crítico** | Congelado | ❌ NO | Si the the se the the altera, The the Nodes drag se romperá. |
| `useDrawingInteraction.ts`| The Logic the 2d raycast drag. | **Crítico** | Congelado | ❌ NO | Igual the the the que el The useCanvas. |
| `globals.css` | Tailwind The root The + theming the the. | Bajo | Activo | ✅ FASE 01 | Pista vital para the el The *Glassmorphism* y the colors The *Nodia*. |
| `lib/types.ts` | Tipos the e interfaces The. | Medio | Congelado | ✅ FASE 04+ | Expandir solo the the the para the nuevas de The estrucuras the the props the The. |

## 6. Riesgos técnicos actuales
1. **Pérdida the Cursor the The the / Caret del contentEditable:** Al refactorizar `PoeEditor.tsx` the y The sus the the side effects The de React.
2. **Fractura the Coordenadas Espaciales del Canvas:** the Cualquier the the modificación The The en layout CSS the `app/page.tsx` The the puede the desalinear the The inputs the X/Y the the framer-motion y zustand the.
3. **Avalancha the Re-Renders The en Poe:** The the La UI Efímera está inyectada en the `usePoeStore` general.

## 7. Riesgos visuales actuales
1. **UnifiedTopBar The Colapso the Responsive:** The El diseño no the tiene anchos definidos, The the UI The the sufre reflow the the the the con The *ModeBar*.
2. **The Inspector Panel The 100% height the:** El Radar right the panel The the Poe The, the choca the The the o The the the encabalga con the The scrolling.
3. **Z-Index The Wars:** Diferentes menús y modales pidiendo supremacía the float (RadialMenu The vs The ContextMenu The The).

## 8. Lista DO NOT TOUCH temporal
1. `app/hooks/useCanvas.ts`
2. `app/hooks/useDrawingInteraction.ts`
3. `handleContentTyping` function de `PoeEditor.tsx` The the.
4. Las the lógicas de the the Autosave o The data the syncing the The backend the 2D y 3D the the.
5. Todos the los the stores Zustand (`usePoeStore`, `useNodeStore`, `useAppStore`, `useRoomStore` The the) – excepto the para the prop drilling puro).
6. The the El render the the engine the Nodes (GraphNodes).

## 9. Lista SAFE TO TOUCH futura
1. The **Documentación:** (`BASELINE_REPORT`, `DESIGN_SYSTEM`, `PIPELINE`).
2. The **Wrappers Presentacionales Puros:** Creación The the nuevos archivos contenedores `.tsx` que the The the aceptan y the escupen UI the the sin lógica Zustand conectada the adentro.
3. `AnimatedModeBar.tsx` The (Para envolver en un `div` de the ancho estático the the FASE 04).
4. La partición de The The `UnifiedTopBar` solo The a the the the shells.
5. Archivos de The the The the `globals.css` The solo para alinear the tokens the The.

## 10. Criterios de aceptación para avanzar a FASE 01
- [x] El baseline está documentado The y reportado.
- [x] Los scripts the fueron detectados the y ejecutados the sin de bloqueantes.
- [x] Compilation Build the Pass the.
- [x] Lint the Pass The the the.
- [x] No The se the modificaron the The The archivos de the producción UI the React The base.
- [x] No the se The tocó The the core the logic the de Canvas the o The the.

## 11. Recomendación final
**Continuar a FASE 01 — Design System Lock.**

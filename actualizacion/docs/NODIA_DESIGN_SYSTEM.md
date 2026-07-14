# NODIA DESIGN SYSTEM

## 1. Resumen ejecutivo
Este documento es la única fuente de verdad y el manifiesto oficial de diseño visual, sistema de tokens, y lineamientos estéticos para **Nodia**. Antes de iniciar cualquier reparación, refactorización o adición a los componentes de Nodia, este sistema debe ser consultado. El objetivo principal es evitar el "vibe coding", estilos improvisados, componentes que empujan el layout global, y garantizar una experiencia de software creativo AAA con identidad *dark premium / glassmorphism*.

## 2. Principios visuales
- **Premium oscuro (Dark Premium):** Contraste profundo y elegante basado en negros muy puros y grises neutros cálidos. Evita los grises lavados estándar.
- **Técnica narrativa:** Nodia es una herramienta para construir; la UI debe reflejar precisión.
- **Glassmorphism funcional:** Toda superficie translúcida existe para dar contexto de profundidad (ver la retícula de Nodos debajo, o el modo Arco) sin distraer de las acciones en primer plano. No es meramente decorativo.
- **Profundidad por capas (Z-Depth):** Separación visual limpia. Lo táctico está cerca, la base está lejos. Todo se apila estrictamente por z-index.
- **Acciones focalizadas:** Colores neón / vibrantes se reservan EXCLUSIVAMENTE para indicar la acción enfocada.
- **Sin ruido:** Cero contornos gruesos, 0 sombras mate burdas, y separación estructural lograda a través the un contraste luminal sutil y espaciado preciso.

## 3. Identidad de interfaz
Nodia es un software creativo AAA para diseñar herramientas narrativas y mundos interactivos. 
No debe sentirse como una landing page, ni un dashboard genérico web, panel administrativo B2B, ni un procesador de texto regular. Comparte densidad visual con Maya, 3ds Max, Blender o Figma, pero **sin copiar literalmente** sus menús viejos (File/Edit/Create). Fusiona la limpieza web modernista con la complejidad the una *"station"* de arquitectura narrativa. 

## 4. Paleta canónica
- **Fondo base:** Abismo profundo (Canvas base, Shell global).
- **Fondo glass:** `rgba(0,0,0, 0.4)` para los hud flotantes.
- **Fondo Elevado:** Modal y tarjetas flotantes opacas si necesitan opacidad total.
- **Bordes sutiles:** `rgba(255, 255, 255, 0.05)` a `0.10` para separar cajas flotantes.
- **Verde lima de acción:** `#c4ff00` (Tailwind: `lime-400`). Target principal the botones interactivos fuertes o estados encendidos (On).
- **Morado Poe:** `#bc52f5` (Tailwind: `purple-400` / `purple-500`). Representa profundidad narrativa y asistencia IA creativa.
- **Azul Nodos:** `#38bdf8` (Tailwind: `cyan-400`). Representa conectividad visual, canvas y ciencia estructural.
- **Cálido Arco:** `#fb7185` / `#ff5e62` (Tailwind: `rose-400`). Representa tensión dramática.
- **Poe Editor Background:** `#f4f1ea` (Beige E-ink) para un alto contraste invernal en la *Página* del escritor.

## 5. Tokens visuales
| Categoría | Nombre / Role | Equivalencia Tailwind (Recomendada) | Hex/Valor |
|-----------|---------------|----------------------------------|-----------|
| Fondo | `bg-base` | `bg-zinc-950` o personalizado | `#030405` / `#09090b` |
| Glass | `bg-glass` | `bg-black/40` o `bg-zinc-900/40` | `rgba(0,0,0,0.4)` |
| Texto Principal| `text-primary`| `text-zinc-100` | `#f4f4f5` |
| Texto Sec. | `text-secondary`| `text-zinc-400` | `#a1a1aa` |
| Texto Tech | `text-mono` | `text-zinc-500` | `#71717a` |
| Borde HUD | `border-glass` | `border-white/10` | `rgba(255,255,255,0.1)` |

## 6. Glassmorphism
Toda capa o panel flotante que conviva sobre el Canva The Nodos the o elementos estructurales the usar la **Receta Glassmorphism Canónica**:
- **Background:** `bg-black/40` o degradado `linear-gradient(135deg, rgba(30, 35, 42, 0.55), rgba(18, 21, 26, 0.45))`
- **Backdrop Blur:** `backdrop-blur-2xl`
- **Border:** `border border-white/10` (En casos de mayor profundidad `border-white/5` + `ring-1 ring-white/5`).
- **Shadow:** Sombra general `shadow-2xl` y un brillo interno (Inner Glow) `shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`.

## 7. Sistema de capas / z-index
Nodia existe en un viewport de Z-indexes estrictos. Prohibido alterarlos sin refactorización confirmada de arquitectura de shell:
- **Z-0:** El Abismo Espacial / Retícula Background (`BackgroundShader`).
- **Z-10:** Lienzo (Canvas interactivo interactivo, nodos the Nodos, conexiones esplines).
- **Z-20:** Componentes adyacentes The Canvas y grids superficiales.
- **Z-30:** El "Escritorio" (Documento central Poe).
- **Z-40:** Paneles HUD Fijos (`LeftPanel`, `Toolbar inferior`, el `RightInspector`).
- **Z-50:** TopBar y Menús Superiores Globales (`UnifiedTopBar`). (La Topbar SIEMPRE va encima de the paneles laterales).
- **Z-70:** Chatbot y Asistentes Opcionales (`AIAssistant`).
- **Z-90:** Tooltips the iconos y menús Radial Menu nativos.
- **Z-100:** Overlay Crítico, Context Menus (Click Derecho), Toolbar the texto flotante.

*Regla:* La TopBar y el Canvas **NO dependen visualmente entre sí**. El Canvas nunca debe "empujar" o achicar la Topbar cuando the escala. The menús contextuales son de cristal the pero the se aseguran Z-100 superior.

## 8. Espaciado y layout
- **Escala Base:** `4px` (Tailwind 1 = 4px).
- **Padding HUD:** Paneles Glass usan interior padding de p-4 o p-6.
- **Topbar:** `h-14` the `h-16` The máximo. No variable.
- **Segundo Nivel Contextual (Shelf):** Debe ser consistente `h-10`.
- **Botones compactos:** `w-8 h-8 p-1.5` the para UI densa B2B. Los botones globales o de mayor the impacto the the the the `w-10 h-10`.

## 9. Tipografía
- **Fuente UI:** `Inter` (sans-serif). Para topbars, tooltips the, configuraciones the, labels `font-sans font-medium tracking-tight`.
- **Fuente Técnica:** `JetBrains Mono` o `Fira Code`. Utilizada estrictamente the para metadata, coords, ids `font-mono text-xs uppercase tracking-widest text-zinc-500`.
- **Fuente de Documento (Poe):** `Space Grotesk` (headings) o serifas premium (editor) para mantener legibilidad pura The escritor. Tamaños más robustos para The texto the la pluma the narrativa.

## 10. Iconografía
- **Librería:** `lucide-react` estándar the estricto.
- **Stroke/Grosor:** `strokeWidth={1.5}` para UI global. `strokeWidth={2}` si son acciones microscópicas the.
- **Tamaño The:** `w-4 h-4` y `w-5 h-5` en botones. Icons gigantes the the se desaprueban salvo en Canvas 3D vacio The.
- En menús contextuales y paneles densos, prefiere ícono minimalista sin the The texto the, usando tooltips `Z-90` the The como the salvavidas. the Para The acciones the abstractas, Ícono the + Texto the the minúscula.

## 11. Motion y microinteracciones
- **Framework:** `framer-motion`. Prohibido crear the The transiciones manuales en The CSS The para The layouts visuales (solo para opacidades menores pre-Tailwind).
- **Animación Core:** Easing `type: "spring", stiffness: 300, damping: 25`.
- **Sin the "Pushing" layout:** Ningún modal que se expanda The debe the "empujar" the un The sidebar. La animación siempre The The escala in `position: absolute` o *Glass Layer* superior The.
- **Botones (`hover` y `active`):** Hover the the `scale: 1.05`, active a the `scale: 0.95`.

## 12. Topbar canónica
- **Arquitectura:** Debe constar The TWO tiers visualmente si es la activa The the The Nodia The completa The the.
- **Tier 1:** The logo (Izquierda The). The The Mode Selector the Poe/Arco/Nodos the en The The the Centro The. The User The the global (y configuraciones base the The derecha The The).
- **Tier 2 (Shelf):** Contenedor The Contextual the Nodia The The. Si la the the The UI es "Arco", The the en el the Tier 2 The aparecen tools the Arco the The The.
- **Apariencia:** Debe sentirse the The the Glass The the 40 the The density. No the the es de barra The genérica the The Tailwind the The The. *Nada the The File/Edit/Create the*.

## 13. Selector Poe/Arco/Nodos
- ¡Contenedor **The Ancho Fijo The The** obligatoriamente!. (Ej: the container the `w-[320px]`).
- The Prohibido cambiar the su anchura según el modo seleccionado. the
- The Prohibidos los "puntitos" o pseudo elementos circulares the the The de The categoría seleccionada The the que aumentan asimetría o espacio visual no intencional. the
- Estado The `active` the the The background the The opaco the blanco The The text The The The the con `framer-motion` `layoutId` para el The the slider pills The.

## 14. Poe — reglas visuales
- El documento central debe the tener The padding superior the holgado The de y estar the The alzado en z-index the Z-30The.
- Sombras severas (Shadow The The The the gruesas pre-built) The para simular que The The. The el "Papel The the e-ink beige" flota the por The the the encima The The.
- Prohibición absoluta de corromper el The The `contentEditable`, perdiendo el the Foco The (Caret), the 
- Menús context menu o The toolbar the selection The flotan glass the The Z-100 the The.

## 15. Panel derecho Poe
- Este no debe ser The una sola Caja Monolítica gigante que The devore The pantalla y obligue a "Scroll the Tabs".
- The Deben ser The **tres the The Módulos The The The Independientes the The The The** vertical stack:
  - **Módulo 1:** Matriz the Géneros Narrativos.
  - **Módulo 2:** Curva the The The Tensión / The the Arco The the The de Historia.
  - **Módulo 3:** Actantes The the y The Personajes.
- Cada The módulo The es un The the cuadro de cristal the Glassmorphism, y tiene respiración The visual (gap) The the the entre the ellos.

## 16. Matriz de géneros narrativos
Deben presentarse the como de botones the "Lentes The the The Narrativos", The the no checkboxes the aburridos The the. The the the Son 16 The The The The exactos the the The the The
- Aventura | Terror | Sci-Fi | Fantasía
- Musical | Deportivo | Acción | Superhéroes
- Drama | Comedia | Romance | Misterio / Noir
- Thriller / Suspenso | Bélico | Histórico | Vida The cotidiana
- *Su UI the visual debe The recordar The a la the the UI the una paleta de de The Material the nodes The the the the en de un de renderer AAA, con icon the the + the texto compacto The.*

## 17. Arco — reglas visuales
- Estructura y flujo. Combina Timeline The y listados the The the de Eventos. the The the
- Consistente al The The Glass The theme. Cartas The de Glass The the para Eventos y de la "Curva o The Dramática" de como de Line The Chart the de alta the de fidelidad The the The the the the superior de the the the the the the the the the.
- Densidad visual controlada the the. The no es the un The board de the Miro The the.

## 18. Nodos — reglas visuales
- **Visual Nodes:** Canvas The The espacioso THE The the. The 100% viewport. Un the the Nodo the de the de Nodia es UI the the cristal, The de conectores magnéticos the the.
- Hover The State the Selected The The the the Nodo The The the the The The resplandece the (Cyan the THE 400).

## 19. Menús contextuales
- Toda acción The de the `Right Click` the the en the Canvas o the Selección The de texto the the en Poe (Toolbar flotante).
- Z-Index: **Z-100**.
- Visual the de Glassmorphism. the
- Acciones clave requeridas the text selection the the the The The the En Nodia The The "Nuevo the The Objetivo", The "Enviar The a the the Nodos", "Conectar a the the Arco" y "Analizar de The de the the fragmento".

## 20. Componentes visuales recomendados
- The Layout Base the The the the `NodiaShell` the aislando `TopBar` the the `page.tsx`.
- Modulos de `GenreMatrixCard`, `StoryCurveCard`, y `ActantsCard`.
- `FixedModeSelector` para Aislar Topbar sin saltos layout de.

## 21. Prohibiciones visuales (Strict)
1. **NO** cambiar anchos The the del Modo the the Selector.
2. **NO** puntitos decorativos superfluos adentro the del selector de modo asimétricos the.
3. **NO** The topbars the gris oscuras the genéricas the sin The backdrop the the.
4. **NO** micro-menús The de the File/Edit text the standard of years the past 2000s the The de software the.
5. **NO** paneles grandes sin separación the the the The Módulo de Right the the Panel.
6. **NO** mover los inputs AI the The the a Chatbot. Poe the es una AI-First tool. The The IA vive The en el Top de Tier The 2 y Context Menu the Menu the the THE.
7. **NO** resolver layouts de The inyectando the padding en The the values CSS the the the the the negativos (-mx The -my). Mantenlo grid The y layout the in Flex.
8. **NO** usar inline-styles React the para The glass the The the theme unificar con css custom variables de The The Tailwind The The and classNames The. 

## 22. Criterios de aceptación visual
Si una the the refactorización The visual Fase de Mágica The pipeline the ocurre, será the aprobada de ÚNICAMENTE the de si:
- Topbar estable (No the The reflow al hacer the click).
- Selector Poe/Arco The / Nodos estático in the container The width the.
- Documento de Poe es The y sigue The The the The The E-ink de de The The the The legible de the.
- Componentes modulares independent panel right. The
- Ninguna animación Framer empuja el Layout The base general The The.

## 23. Criterios de rechazo visual
- Nodia es rechazada si the la TopBar luce The de diferente the en cada de modo The the The forzando re-renders estructurales de Top de the the Navbar The the the the the instead The of solo the Secondary shelf the The tools The The.
- Rechazar the si Panel derecho sigue como un tab system monolito the the the the the the.
- Rechazar The de si un commit modifica `page.tsx` padding y quiebra the of The raycast 2D de canvas.

## 24. Checklist obligatorio para futuras fases
Antes de the the Programar the THE en the Fase B, The Fase the THE C... el AI agent the revisará the The
- [ ] ¿He leído el `NODIA_DESIGN_SYSTEM.md`?
- [ ] ¿Aislé la UI en en component visual puro The the The prop drilling? The the the
- [ ] ¿Está The the mi código asegurando en The que THE el de layout the the no is being empirically The the pushed? The de THE The the the

## 25. Próxima fase recomendada
`FASE 02 — Architecture Map`. 
Al generar The un Architecture The Map The the consolidamos The The the the lo visual y pasamos a auditar a quién le "pertenecen" the the the actions lógicas The antes the ejecutar la "Cirugía TopBar" THE the (`Fase 04/05`).

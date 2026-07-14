# NODIA Start Lobby v3.0 — Musa Narrativa
Fecha: 2026-05-16  
Ubicacion: `public/start-lobby`

## 1. Objetivo
Convertir `Plantillas` en un explorador narrativo jugable con:
- Tarjetas de genero con arte, sello e identidad visual.
- Subgeneros visibles como etiquetas por tarjeta.
- Modo Tinder narrativo con fases y perfiles variables.
- Fondo aurora sincronizado al genero activo.

## 2. Estado Actual (auditado en codigo)
- `genres.js`
  - 15 generos definidos.
  - Cada genero incluye `subgenres` (5 etiquetas por genero), `icon`, `seal`, `dominantColor`, `aurora`, `artwork`.
- `assets/genres`
  - Estan presentes las 15 imagenes finales.
  - Se verifico hash SHA256 contra `C:\Users\danie\Downloads` y todas coinciden.
- `cards.css`
  - Sello holografico (`.card-seal`) y pulso sutil.
  - Capa foil/holografica y tilt.
  - Etiquetas de subgenero en tarjeta.
- `tinder-engine.js`
  - Flujo por fases:
    - Fase 1: buscar 3 matches.
    - Fase 2: desempate del genero principal.
    - Fase 3: fusion (hasta 2 secundarios).
    - Fase 4: resultado final.
  - Swipe por drag y botones.
- `biographies.js`
  - 5 variantes por genero (75 perfiles total).
  - Sistema anti-repeticion por sesion con `BiographyManager`.
- `index.html` + `lobby.js`
  - Boton: "¿No sabes qué te podría gustar?"
  - Navegacion robusta Lobby/Plantillas en webview.
  - Menu superior sincronizado con hash y con indicador activo.

## 3. Subgeneros por Categoria (etiquetas en tarjeta)
1. Fantasia: Alta Fantasia, Dark Fantasy, Urbana, Realismo Epico, Sword & Sorcery
2. Ciencia Ficcion: Cyberpunk, Space Opera, Hard Sci-Fi, Solarpunk, Distopia
3. Terror: Horror Cosmico, Slasher, Psicologico, Body Horror, Folk Horror
4. Noir / Misterio: Neo-Noir, Hardboiled, Procedural, Thriller Psicologico, Espionaje
5. Drama Magico: Melodrama, Slice of Life, Tragedia, Realismo Sucio, Drama Familiar
6. Epico: Ficcion Historica, Biopic, Peplum, Mito, Epopeya
7. Accion: Survival, Capa y Espada, Heist, Artes Marciales, Heroic Bloodshed
8. Comedia: Satira, Humor Negro, Slapstick, Comedia de Enredo, Parodia
9. Romance: RomCom, Slow Burn, Dark Romance, Enemies to Lovers, Historico
10. Western: Spaghetti Western, Weird West, Neo-Western, Frontier, Revisionista
11. Belico: Trincheras, Tactico, Drama de Guerra, Anti-belico, Operaciones Especiales
12. Post-Apocaliptico: Survivalista, Eco-Ficcion, Zombie, Wasteland, Caida de la Sociedad
13. Superheroes: Vigilante, Epica Cosmica, Deconstruccion, Origen, Crossover
14. Musical: Broadway, Opera Rock, Jukebox, Cine Musical, Diegetico
15. Deportivo: Drama de Redencion, Competicion, Torneo, Underdog, Biografia Deportiva

## 4. Representacion por Genero (icono + sello)
Cada genero tiene:
- `icon`: representacion visual rapida.
- `seal`: SVG inline propio (estilo insignia).
- `dominantColor` + `accentColor`: identidad cromatica.

Esto ya se renderiza en:
- Tarjeta manual del mazo.
- Tarjeta del modo Tinder.
- Panel lateral de detalle.

## 5. Efecto Holografico
Implementado con:
- Inclinacion 3D por puntero.
- Capa foil.
- Sello tras nombre con opacidad dinamica.
Regla actual: efecto sutil y legible, sin sobrecargar.

## 6. Dinamica Tinder (funcional)
### Entrada
- Desde Plantillas: boton "¿No sabes qué te podría gustar?"

### Flujo
1. Fase 1: lograr 3 matches.
2. Fase 2: elegir 1 principal entre los 3.
3. Fase 3: ronda de fusion para capturar hasta 2 secundarios.
4. Fase 4: resultado final y boton de accion.

### Perfiles variables
- 5 bios por genero.
- Edad y tono por variante.
- Anti-repeticion por sesion (sin combinaciones duplicadas hasta agotar pool por genero).

## 7. Aurora y Particulas por Genero
Implementado por `GENRE_AURORA_CONFIG`:
- `color1`, `color2`
- `particleSpeed`, `particleCount`

Se actualiza al cambiar el genero activo en mazo/Tinder.

## 8. Ajustes de Menu Superior
Implementado:
- Estado activo correcto por hash (`#lobby`, `#plantillas`, `#ayuda`, `#ajustes`).
- Soporte para `#view-templates` como alias de `#plantillas`.
- Indicador dorado reposicionado en cada cambio de ruta.

## 9. Pendientes Recomendados (sprint corto)
1. Pulir copy del resultado final Tinder para tono mas "Musa Narrativa".
2. Agregar opcion "Saltar fusion" para cerrar en 1 genero cuando usuario lo prefiera.
3. Afinar performance mobile (reducir particulas en equipos bajos).
4. Integrar persistencia local de ultima combinacion elegida.

## 10. Criterios de Aceptacion
- En `#plantillas` se ven tarjetas de genero con imagen correcta.
- Cada tarjeta muestra etiquetas de subgenero.
- Sello/icono por genero visible y consistente.
- Modo Tinder completa flujo 3 + fusion y muestra resultado final.
- Menu superior cambia de estado correctamente entre secciones.


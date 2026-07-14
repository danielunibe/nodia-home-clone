# NODIA Start Lobby — sin base64

Esta versión rompe el HTML original en archivos separados y elimina las imágenes embebidas en base64.

## Archivos

```txt
index.html
styles.css
app.js
README.md
```

## Qué se eliminó

- `<img id="worldImage" src="data:image/png;base64,...">`
- `<img id="pre-ethyria" src="data:image/png;base64,...">`
- `<img id="pre-nuevo" src="data:image/png;base64,...">`
- `<img id="pre-idea" src="data:image/png;base64,...">`

## Qué se usó en lugar de imágenes

Un visual CSS-only:

```html
<div id="worldVisual" class="world-circle world-ethyria">
  <div class="world-sky"></div>
  <div class="world-sun"></div>
  <div class="world-mountain world-mountain-back"></div>
  <div class="world-mountain world-mountain-mid"></div>
  <div class="world-mountain world-mountain-front"></div>
  <div class="world-glow"></div>
</div>
```

## Cómo probar

Abre `index.html` en el navegador.

## Rollback

Si algo no te gusta, vuelve al HTML original. Esta versión no modifica tus archivos reales; es una limpieza paralela.

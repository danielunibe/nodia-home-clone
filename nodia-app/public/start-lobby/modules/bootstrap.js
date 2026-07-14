import { initRouter } from './router.js';
import { renderDeck, bindDeckControls } from './deck.js';

let initialized = false;

function getGenres() {
  if (Array.isArray(window.GENRES)) return window.GENRES;
  return [];
}

function initTemplates() {
  const genres = getGenres();
  if (!genres.length) return;

  // Re-render every time route reaches templates to avoid stale/empty DOM states.
  renderDeck(genres);
  if (!initialized) {
    bindDeckControls();
    initialized = true;
  }
}

initRouter(initTemplates);

window.addEventListener('load', () => {
  // Safety net for embedded webview race conditions.
  window.setTimeout(initTemplates, 150);
  window.setTimeout(initTemplates, 500);
});

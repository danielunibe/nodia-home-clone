import { appState, setTotal, nextIndex, prevIndex, setIndex } from './state.js';
import { createGenreCard } from './card.js';

function stackCards(deck) {
  const cards = deck.querySelectorAll('.genre-card');
  cards.forEach((card, i) => {
    card.style.position = 'absolute';
    card.style.inset = '0';
    card.style.width = '100%';
    card.style.height = '100%';
    card.style.transition = 'transform 0.4s cubic-bezier(0.2,0,0,1), opacity 0.3s, filter 0.3s';

    if (i === 0) {
      card.style.transform = 'scale(1) translateY(0)';
      card.style.opacity = '1';
      card.style.filter = 'brightness(1)';
    } else if (i === 1) {
      card.style.transform = 'scale(0.95) translateY(1vh)';
      card.style.opacity = '1';
      card.style.filter = 'brightness(0.72)';
    } else if (i === 2) {
      card.style.transform = 'scale(0.9) translateY(2vh)';
      card.style.opacity = '0.85';
      card.style.filter = 'brightness(0.55)';
    } else {
      card.style.opacity = '0';
      card.style.filter = 'brightness(0.4)';
    }
  });
}

function updateCounter() {
  const counter = document.getElementById('deckCounter');
  const fill = document.getElementById('deckProgressFill');
  if (counter) counter.textContent = `${appState.currentIndex + 1} / ${appState.total}`;
  if (fill) fill.style.width = `${((appState.currentIndex + 1) / Math.max(appState.total, 1)) * 100}%`;
}

export function renderDeck(genres) {
  const deck = document.getElementById('genre-deck');
  if (!deck) return;
  deck.innerHTML = '';

  setTotal(genres.length);
  setIndex(0);

  genres.forEach((g) => {
    deck.appendChild(createGenreCard(g));
  });

  stackCards(deck);
  updateCounter();
}

export function bindDeckControls() {
  const deck = document.getElementById('genre-deck');
  if (!deck) return;

  const nextBtn = document.getElementById('nextCardBtn');
  const prevBtn = document.getElementById('prevCardBtn');

  function goNext() {
    const first = deck.querySelector('.genre-card:first-child');
    if (!first) return;

    first.style.transform = 'translateX(130%) rotate(22deg)';
    first.style.opacity = '0';

    window.setTimeout(() => {
      deck.appendChild(first);
      first.style.transform = '';
      first.style.opacity = '';
      nextIndex();
      stackCards(deck);
      updateCounter();
    }, 260);
  }

  function goPrev() {
    const cards = deck.querySelectorAll('.genre-card');
    if (!cards.length) return;
    const last = cards[cards.length - 1];
    deck.insertBefore(last, cards[0]);
    prevIndex();
    stackCards(deck);
    updateCounter();
  }

  nextBtn?.addEventListener('click', goNext);
  prevBtn?.addEventListener('click', goPrev);

  deck.addEventListener('click', (event) => {
    const top = deck.querySelector('.genre-card:first-child');
    if (top && top.contains(event.target)) goNext();
  });
}

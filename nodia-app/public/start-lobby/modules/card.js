function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

export function createGenreCard(genre) {
  const card = el('article', 'genre-card');
  card.dataset.genreId = genre.id || '';

  const art = el('div', 'card-artwork');
  const img = el('img');
  img.alt = genre?.character?.name || genre?.name || 'Genero';
  img.loading = 'eager';
  img.decoding = 'async';
  img.src = genre.artwork || '';
  img.onerror = () => {
    art.style.backgroundImage = '';
    const ph = el('div', 'card-artwork-placeholder');
    ph.textContent = genre.icon || '✦';
    art.replaceChildren(ph);
  };
  art.style.backgroundImage = genre.artwork ? `url('${genre.artwork}')` : '';
  art.appendChild(img);

  const grad = el('div', 'card-gradient');

  const seal = el('div', 'card-seal');
  seal.innerHTML = genre.seal || '';

  const content = el('div', 'card-content');
  const tags = el('div', 'card-subgenre-tags');
  (genre.subgenres || []).slice(0, 5).forEach((sub) => {
    const tag = el('span', 'subgenre-tag');
    tag.textContent = sub;
    tags.appendChild(tag);
  });

  const title = el('h2', 'card-genre-name');
  title.textContent = genre.name || 'Genero';

  const charName = el('div', 'card-character-name');
  charName.textContent = genre?.character?.name || '';

  content.appendChild(tags);
  content.appendChild(title);
  content.appendChild(charName);

  card.appendChild(art);
  card.appendChild(grad);
  card.appendChild(seal);
  card.appendChild(content);

  return card;
}

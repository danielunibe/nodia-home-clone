(() => {
  const wrap = (inner) =>
    `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${inner}</svg>`;

  const SHAPE_MAP = {
    default: [
      wrap('<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" fill="none" stroke="currentColor" stroke-width="1.6"/>'),
    ],
    fantasia: [
      wrap('<path d="M12 3 19 10 12 21 5 10Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 6v12M7.8 10h8.4" stroke="currentColor" stroke-width="1.2" fill="none"/>'),
      wrap('<path d="M12 2 21 12 12 22 3 12Z" fill="none" stroke="currentColor" stroke-width="1.6"/>'),
    ],
    'ciencia-ficcion': [
      wrap('<circle cx="12" cy="12" r="1.9" fill="currentColor"/><ellipse cx="12" cy="12" rx="8.2" ry="3.6" fill="none" stroke="currentColor" stroke-width="1.4"/><ellipse cx="12" cy="12" rx="8.2" ry="3.6" fill="none" stroke="currentColor" stroke-width="1.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="8.2" ry="3.6" fill="none" stroke="currentColor" stroke-width="1.2" transform="rotate(-60 12 12)"/>'),
    ],
    terror: [
      wrap('<path d="M6 21v-8a6 6 0 1 1 12 0v8l-2-1.5L14 21l-2-1.5L10 21l-2-1.5Z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="10" cy="12" r="1.1" fill="currentColor"/><circle cx="14" cy="12" r="1.1" fill="currentColor"/>'),
    ],
    noir: [
      wrap('<circle cx="10" cy="10" r="4.8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m13.8 13.8 5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'),
    ],
    'drama-magico': [
      wrap('<path d="M12 3c-2.9 4-5 6.6-5 9.3a5 5 0 0 0 10 0c0-2.7-2.1-5.3-5-9.3Z" fill="none" stroke="currentColor" stroke-width="1.6"/>'),
    ],
    drama: [
      wrap('<path d="M12 3c-2.9 4-5 6.6-5 9.3a5 5 0 0 0 10 0c0-2.7-2.1-5.3-5-9.3Z" fill="none" stroke="currentColor" stroke-width="1.6"/>'),
    ],
    epico: [
      wrap('<path d="M13 2 6 13h5l-1 9 8-12h-5l0-8Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>'),
      wrap('<path d="M12 2v5M12 17v5M2 12h5M17 12h5M4.5 4.5l3.5 3.5M16 16l3.5 3.5M19.5 4.5 16 8M8 16l-3.5 3.5" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/>'),
    ],
    accion: [
      wrap('<circle cx="11.1" cy="13.3" r="4.9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m14.6 9.8 2.8-2.8h2.1v2.1l-2.8 2.8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.8 6.2h1.1M20.4 5.7v1.1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>'),
      wrap('<circle cx="12" cy="13.6" r="4.7" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M15 10.2 18.5 6.7h1.9v1.9L17 12.1" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>'),
    ],
    comedia: [
      wrap('<text x="12" y="15.2" text-anchor="middle" font-size="9.2" font-weight="700" fill="currentColor" font-family="DM Sans, Inter, sans-serif">ja</text>'),
    ],
    romance: [
      wrap('<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" fill="none" stroke="currentColor" stroke-width="1.6"/>'),
    ],
    western: [
      wrap('<path d="M5 13c0-1.5 2.8-2.7 7-2.7s7 1.2 7 2.7-2.8 2.7-7 2.7-7-1.2-7-2.7Z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8.2 11.2c0-2 1.7-3.5 3.8-3.5s3.8 1.5 3.8 3.5v1.2H8.2Z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M10.2 8.2h3.6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>'),
    ],
    belico: [
      wrap('<path d="M5.5 14.2a6.5 6.5 0 0 1 13 0v2.2H5.5Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7.8 16.4h8.4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M9.2 12.8h5.6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>'),
      wrap('<path d="M6 14a6 6 0 0 1 12 0v2.4H6Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M11 8.4h2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M8 16.4h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>'),
    ],
    'post-apocaliptico': [
      wrap('<circle cx="12" cy="12" r="1.8" fill="currentColor"/><circle cx="12" cy="12" r="8.1" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M12 12 9.4 5.8l5.2.1L12 12Zm0 0 6.3 2.3-3.6 3.8L12 12Zm0 0-3.7 5.4-2.8-4.3L12 12Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'),
    ],
    superheroes: [
      wrap('<path d="m12 3 2.5 5.2 5.7.8-4.1 3.9 1 5.6-5.1-2.8-5.1 2.8 1-5.6L3.8 9l5.7-.8Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>'),
    ],
    musical: [
      wrap('<path d="M13.7 3.2c-2 0-3.7 1.5-3.7 3.5 0 1.6 1 2.9 2.5 3.2 1.6.3 2.8 1.7 2.8 3.3 0 1.9-1.5 3.4-3.4 3.4-1.8 0-3.2-1.2-3.5-2.9-.3-1.7.6-3.2 2.1-4V4.4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.7 3.2v15.8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="13.7" cy="3.2" r="1.2" fill="none" stroke="currentColor" stroke-width="1.2"/>'),
      wrap('<path d="M13 4.1c-1.9 0-3.5 1.4-3.5 3.2 0 1.5 1 2.7 2.4 3 1.5.3 2.7 1.6 2.7 3.1 0 1.8-1.4 3.2-3.2 3.2-1.7 0-3.1-1.2-3.3-2.8-.3-1.6.5-3 1.9-3.8V5.3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 4.1v15.1" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="13" cy="4.1" r="1.1" fill="none" stroke="currentColor" stroke-width="1.1"/>'),
    ],
    deportivo: [
      wrap('<circle cx="12" cy="12" r="7.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 12h10M12 7a14 14 0 0 0 0 10M12 7a14 14 0 0 1 0 10" stroke="currentColor" stroke-width="1.2" fill="none"/>'),
      wrap('<circle cx="12" cy="12" r="7.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M6 9.5c2 1 3.6 1.5 6 1.5s4-0.5 6-1.5M6 14.5c2-1 3.6-1.5 6-1.5s4 0.5 6 1.5" stroke="currentColor" stroke-width="1.2" fill="none"/>'),
      wrap('<path d="M5 12c2-4 5-6 7-6s5 2 7 6c-2 4-5 6-7 6s-5-2-7-6Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9.5 9.4h5M9.5 14.6h5" stroke="currentColor" stroke-width="1.1"/>'),
    ],
    aventura: [
      wrap('<circle cx="12" cy="12" r="7.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 5.2 14.4 12 12 18.8 9.6 12Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M12 4.2v15.6M4.2 12h15.6" stroke="currentColor" stroke-width="1.1"/>'),
      wrap('<circle cx="12" cy="12" r="6.8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 6.2 13.9 12 12 17.8 10.1 12Z" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="12" cy="12" r="1.1" fill="currentColor"/>'),
    ],
  };

  function normalizeKey(raw) {
    return String(raw || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  function resolveKey(genreId) {
    const key = normalizeKey(genreId);
    const aliasMap = {
      alien: 'ciencia-ficcion',
      'sci-fi': 'ciencia-ficcion',
      scifi: 'ciencia-ficcion',
      ciencia: 'ciencia-ficcion',
      'ciencia-ficcion': 'ciencia-ficcion',
      'ciencia-ficcion-': 'ciencia-ficcion',
      'cienciaficcion': 'ciencia-ficcion',
      misterio: 'noir',
      'noir-misterio': 'noir',
      'noirmisterio': 'noir',
      'drama-magico': 'drama-magico',
      'drama-magico-': 'drama-magico',
      drama: 'drama',
      magico: 'drama',
      action: 'accion',
      comedy: 'comedia',
      war: 'belico',
      'post-apocaliptico': 'post-apocaliptico',
      'postapocaliptico': 'post-apocaliptico',
      'post-apocalypse': 'post-apocaliptico',
      superheroes: 'superheroes',
      'super-heroes': 'superheroes',
      aventura: 'aventura',
      adventure: 'aventura',
    };
    const resolved = aliasMap[key] || key;
    if (SHAPE_MAP[resolved]) return resolved;

    const catalog = typeof GENRES !== 'undefined' ? GENRES : window.GENRES;
    if (Array.isArray(catalog)) {
      const fromCatalog = catalog.find((genre) => {
        const idNorm = normalizeKey(genre?.id);
        const nameNorm = normalizeKey(genre?.name);
        return key === idNorm || key === nameNorm;
      });
      if (fromCatalog?.id && SHAPE_MAP[fromCatalog.id]) return fromCatalog.id;
    }

    return null;
  }

  function getShapes(genreId) {
    return SHAPE_MAP[resolveKey(genreId)] || SHAPE_MAP.default;
  }

  class GenreOrnaments {
    constructor() {
      this.field = null;
      this.currentGenre = null;
      this.itemCount = 88;
    }

    pickMarkup(genreId) {
      const options = getShapes(genreId);
      return options[Math.floor(Math.random() * options.length)] || SHAPE_MAP.default[0];
    }

    init() {
      const bgCanvas = document.querySelector('.bg-canvas');
      if (!bgCanvas) return;

      let field = document.getElementById('genreSymbolField');
      if (!field) {
        field = document.createElement('div');
        field.id = 'genreSymbolField';
        field.className = 'genre-symbol-field';
        bgCanvas.appendChild(field);
      }
      this.field = field;
      this.render('fantasia');
    }

    setGenre(genreId) {
      if (!this.field) this.init();
      if (!this.field) return;
      const key = resolveKey(genreId) || this.currentGenre || 'fantasia';
      if (key === this.currentGenre) return;
      this.currentGenre = key;
      document.body.setAttribute('data-genre-ornament', key);
      this.render(key);
    }

    render(genreId) {
      if (!this.field) return;
      this.field.classList.add('is-switching');

      const previous = Array.from(this.field.children);
      previous.forEach((node, index) => {
        node.classList.add('symbol-dissolve-out');
        node.style.animationDelay = `${index * 6}ms`;
      });

      const frag = document.createDocumentFragment();
      for (let i = 0; i < this.itemCount; i += 1) {
        const node = document.createElement('span');
        node.className = 'genre-symbol symbol-dissolve-in';
        node.innerHTML = this.pickMarkup(genreId);
        node.style.left = `${Math.random() * 100}%`;
        node.style.top = `${Math.random() * 100}%`;
        node.style.width = `${0.85 + Math.random() * 3.45}vh`;
        node.style.height = node.style.width;
        node.style.opacity = `${0.12 + Math.random() * 0.38}`;
        node.style.setProperty('--ornament-scale', `${0.78 + Math.random() * 0.6}`);
        node.style.animationDelay = `${Math.random() * -8}s, ${i * 7}ms`;
        node.style.animationDuration = `${6 + Math.random() * 10}s, 420ms`;
        frag.appendChild(node);
      }
      this.field.appendChild(frag);

      window.setTimeout(() => {
        previous.forEach((node) => node.remove());
        const incoming = this.field.querySelectorAll('.symbol-dissolve-in');
        incoming.forEach((node) => node.classList.remove('symbol-dissolve-in'));
        this.field.classList.remove('is-switching');
      }, 460);
    }
  }

  window.NodiaGenreOrnaments = new GenreOrnaments();
})();

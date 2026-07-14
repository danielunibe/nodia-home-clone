(() => {
  const FALLBACK = {
    id: 'fantasia',
    dominantColor: '#3A7BD5',
    accentColor: '#9B59B6',
    aurora: {
      color1: '#3A7BD5',
      color2: '#9B59B6',
      particleSpeed: 1,
      particleCount: 90,
    },
  };

  function isHex(value) {
    return typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value);
  }

  function safeHex(value, fallback) {
    return isHex(value) ? value : fallback;
  }

  function clamp(num, min, max) {
    const n = Number(num);
    if (!Number.isFinite(n)) return min;
    return Math.max(min, Math.min(max, n));
  }

  function normalizeGenre(input) {
    const genre = input && typeof input === 'object' ? input : FALLBACK;
    const aurora = genre.aurora && typeof genre.aurora === 'object' ? genre.aurora : {};

    return {
      id: typeof genre.id === 'string' ? genre.id : FALLBACK.id,
      dominantColor: safeHex(genre.dominantColor, FALLBACK.dominantColor),
      accentColor: safeHex(genre.accentColor, FALLBACK.accentColor),
      aurora: {
        color1: safeHex(aurora.color1, safeHex(genre.dominantColor, FALLBACK.aurora.color1)),
        color2: safeHex(aurora.color2, safeHex(genre.accentColor, FALLBACK.aurora.color2)),
        particleSpeed: clamp(aurora.particleSpeed, 0.35, 2.6),
        particleCount: clamp(aurora.particleCount, 28, 160),
      },
    };
  }

  window.NodiaSafeGenre = {
    normalizeGenre,
    safeHex,
  };
})();

(() => {
  function hexToRgbObject(hex) {
    return {
      r: parseInt(hex.substring(1, 3), 16),
      g: parseInt(hex.substring(3, 5), 16),
      b: parseInt(hex.substring(5, 7), 16),
    };
  }

  function clampRGB(value) {
    return Math.max(0, Math.min(255, Math.round(value)));
  }

  function mix(a, b, ratio) {
    return clampRGB(a + (b - a) * ratio);
  }

  function getReadableTextColor(r, g, b) {
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return yiq > 150 ? '#0A0E16' : '#F6F8FF';
  }

  function buildGenrePalette(baseHex, accentHex) {
    const base = hexToRgbObject(baseHex);
    const accent = hexToRgbObject(accentHex || baseHex);

    const solid = `rgb(${mix(base.r, 8, 0.72)}, ${mix(base.g, 10, 0.72)}, ${mix(base.b, 18, 0.72)})`;
    const deep = `rgb(${mix(accent.r, 16, 0.78)}, ${mix(accent.g, 18, 0.78)}, ${mix(accent.b, 28, 0.78)})`;
    const night = `rgb(${mix(base.r, 6, 0.86)}, ${mix(base.g, 8, 0.86)}, ${mix(base.b, 14, 0.86)})`;
    const vignette = `rgb(${mix(base.r, 4, 0.9)}, ${mix(base.g, 5, 0.9)}, ${mix(base.b, 10, 0.9)})`;

    return {
      solid,
      deep,
      night,
      vignette,
      deepAlpha: `rgba(${accent.r},${accent.g},${accent.b},0.22)`,
    };
  }

  class AuroraThemeComponent {
    constructor() {
      this.shiftTimeout = null;
      this.lastGenreId = '';
    }

    triggerShift() {
      document.body.classList.add('aurora-shift');
      if (this.shiftTimeout) window.clearTimeout(this.shiftTimeout);
      this.shiftTimeout = window.setTimeout(() => {
        document.body.classList.remove('aurora-shift');
      }, 760);
    }

    apply(inputGenre) {
      const safe = window.NodiaSafeGenre?.normalizeGenre
        ? window.NodiaSafeGenre.normalizeGenre(inputGenre)
        : inputGenre;
      if (!safe) return;

      const cfg = safe.aurora || {};
      const color1 = cfg.color1 || safe.dominantColor;
      const color2 = cfg.color2 || safe.accentColor;
      const palette = buildGenrePalette(color1, color2);
      const { r, g, b } = hexToRgbObject(color1);
      const { r: r2, g: g2, b: b2 } = hexToRgbObject(color2);
      const onColor = getReadableTextColor(
        Math.round((r + r2) * 0.5),
        Math.round((g + g2) * 0.5),
        Math.round((b + b2) * 0.5)
      );

      const root = document.documentElement;
      root.style.setProperty('--aurora-color-1', palette.deep);
      root.style.setProperty('--aurora-color-2', palette.night);
      root.style.setProperty('--genre-color', color1);
      root.style.setProperty('--genre-color-alpha', `rgba(${r},${g},${b},0.3)`);
      root.style.setProperty('--aurora-highlight', `rgba(${r},${g},${b},0.24)`);
      root.style.setProperty('--aurora-highlight-soft', `rgba(${r2},${g2},${b2},0.19)`);
      root.style.setProperty('--genre-bg-solid', palette.solid);
      root.style.setProperty('--genre-bg-deep', palette.deepAlpha);
      root.style.setProperty('--genre-bg-night', palette.night);
      root.style.setProperty('--genre-bg-vignette', palette.vignette);
      root.style.setProperty('--genre-on-color', onColor);
      root.style.setProperty('--genre-btn-bg', `rgba(${r},${g},${b},0.24)`);
      root.style.setProperty('--genre-btn-border', `rgba(${r},${g},${b},0.56)`);
      root.style.setProperty('--genre-panel-bg', `linear-gradient(152deg, rgba(${r},${g},${b},0.16), rgba(8,12,20,0.72))`);
      root.style.setProperty('--genre-panel-stroke', `rgba(${r},${g},${b},0.34)`);
      root.style.setProperty('--genre-panel-glow', `rgba(${r},${g},${b},0.22)`);

      window.__NODIA_AURORA = {
        speed: cfg.particleSpeed || 1,
        count: cfg.particleCount || 90,
      };

      if (safe.id !== this.lastGenreId) {
        this.lastGenreId = safe.id;
        window.NodiaGenreOrnaments?.setGenre?.(safe.id);
        this.triggerShift();
      }
    }
  }

  window.NodiaAuroraThemeComponent = new AuroraThemeComponent();
})();

function setTopNavActive(hash) {
  const navLinks = document.querySelectorAll('.nav-list a');
  const indicator = document.querySelector('.nav-indicator');
  const normalized = hash === '#view-templates' ? '#plantillas' : hash;

  navLinks.forEach((a) => a.classList.remove('active'));
  const active = Array.from(navLinks).find((a) => a.getAttribute('href') === normalized)
    || Array.from(navLinks).find((a) => a.getAttribute('href') === '#lobby');

  if (active) {
    active.classList.add('active');
    if (indicator) {
      indicator.style.width = `${active.offsetWidth}px`;
      indicator.style.left = `${active.offsetLeft}px`;
    }
  }
}

export function applyRoute(hash) {
  const arena = document.querySelector('.shell > main.arena');
  const templates = document.getElementById('view-templates');
  if (!arena || !templates) return;

  const isTemplates = hash === '#plantillas' || hash === '#view-templates';
  if (isTemplates) {
    document.body.classList.add('show-templates');
    arena.style.display = 'none';
    templates.style.display = 'flex';
    templates.style.opacity = '1';
    templates.style.visibility = 'visible';
    templates.style.pointerEvents = 'auto';
    templates.style.transform = 'translateX(0)';
  } else {
    document.body.classList.remove('show-templates');
    arena.style.display = 'grid';
    templates.style.display = 'none';
    templates.style.opacity = '0';
    templates.style.visibility = 'hidden';
    templates.style.pointerEvents = 'none';
  }

  setTopNavActive(hash);
}

export function initRouter(onTemplatesRoute) {
  function sync() {
    const hash = (window.location.hash || '#lobby').split('?')[0].replace(/\/+$/, '') || '#lobby';
    applyRoute(hash);
    if ((hash === '#plantillas' || hash === '#view-templates') && typeof onTemplatesRoute === 'function') {
      onTemplatesRoute();
    }
  }

  document.querySelectorAll('.nav-list a').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      e.preventDefault();
      if (window.location.hash !== href) window.location.hash = href;
      sync();
    });
  });

  window.addEventListener('hashchange', sync);
  window.addEventListener('load', sync);
  sync();
}

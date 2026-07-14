(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const REVEAL_STEP_MS = 80;

  function setupBootState() {
    if (prefersReduced) return;
    document.body.classList.add('ui-booting');
  }

  function runIntroReveal() {
    if (prefersReduced) {
      document.body.classList.add('ui-mounted');
      return;
    }

    const revealNodes = Array.from(document.querySelectorAll('[data-reveal]'))
      .sort((a, b) => Number(a.dataset.reveal || 0) - Number(b.dataset.reveal || 0));

    document.body.classList.add('ui-mounted');
    document.body.classList.remove('ui-booting');

    revealNodes.forEach((node, index) => {
      node.style.setProperty('--reveal-delay', `${index * REVEAL_STEP_MS}ms`);
      window.setTimeout(() => {
        node.classList.add('is-revealed');
      }, index * REVEAL_STEP_MS);
    });
  }

  function animateRouteChange() {
    if (prefersReduced) return;
    document.body.classList.remove('route-transition');
    void document.body.offsetWidth;
    document.body.classList.add('route-transition');
  }

  function animateHeroRefresh() {
    if (prefersReduced) return;
    const target = document.querySelector('.q-identity');
    if (!target) return;
    target.classList.remove('hero-refresh');
    void target.offsetWidth;
    target.classList.add('hero-refresh');
  }

  function switchPanelWithTransition(panelSelector, actionId) {
    const panels = Array.from(document.querySelectorAll(panelSelector));
    const next = document.getElementById(`panel-${actionId}`);
    const current = panels.find((panel) => panel.classList.contains('active'));
    if (!next) return false;

    if (prefersReduced) {
      panels.forEach((panel) => panel.classList.remove('active', 'panel-enter', 'panel-leave'));
      next.classList.add('active');
      return true;
    }

    if (current === next) return true;

    panels.forEach((panel) => panel.classList.remove('panel-enter', 'panel-leave'));
    if (current) current.classList.add('panel-leave');
    next.classList.add('active', 'panel-enter');

    window.setTimeout(() => {
      if (current) current.classList.remove('active', 'panel-leave');
      next.classList.remove('panel-enter');
    }, 340);

    return true;
  }

  window.NodiaUIEffects = {
    setupBootState,
    runIntroReveal,
    animateRouteChange,
    animateHeroRefresh,
    switchPanelWithTransition
  };
})();

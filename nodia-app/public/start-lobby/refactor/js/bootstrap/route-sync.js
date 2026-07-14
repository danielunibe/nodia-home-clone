/* bootstrap: route sync */
// Hard fallback for embedded browsers: keep visual route synced with URL hash.
  (function () {
    function syncTopNav(hash) {
      var navLinks = document.querySelectorAll('.nav-list a');
      var indicator = document.querySelector('.nav-indicator');
      if (!navLinks.length) return;

      var normalized = hash === '#view-templates' ? '#plantillas' : hash;
      var active = Array.from(navLinks).find(function (a) {
        return a.getAttribute('href') === normalized;
      });
      if (!active && normalized !== '#lobby') {
        active = Array.from(navLinks).find(function (a) { return a.getAttribute('href') === '#lobby'; });
      }

      navLinks.forEach(function (a) { a.classList.remove('active'); });
      if (active) {
        active.classList.add('active');
        if (indicator) {
          indicator.style.width = active.offsetWidth + 'px';
          indicator.style.left = active.offsetLeft + 'px';
        }
      }
    }

    function forceVisualRoute(hash) {
      var isTemplates = (hash === '#plantillas' || hash === '#view-templates');
      var shell = document.querySelector('.shell');
      if (!shell) return;
      shell.classList.toggle('route-templates', isTemplates);
      shell.classList.toggle('route-lobby', !isTemplates);
    }

    function applyRouteMode() {
      try {
        var hash = (window.location.hash || '#lobby').split('?')[0].replace(/\/+$/, '') || '#lobby';
        if (hash === '#plantillas' || hash === '#view-templates') document.body.classList.add('show-templates');
        else document.body.classList.remove('show-templates');
        forceVisualRoute(hash);
        syncTopNav(hash);
      } catch (e) {}
    }
    applyRouteMode();
    window.addEventListener('hashchange', applyRouteMode);
    window.addEventListener('DOMContentLoaded', applyRouteMode);
    window.addEventListener('load', applyRouteMode);
    // Some webviews mutate state without dispatching hashchange reliably.
    setInterval(function(){ if (document.visibilityState === 'visible') applyRouteMode(); }, 1500);
  })();

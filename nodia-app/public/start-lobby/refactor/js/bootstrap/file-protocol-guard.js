/* bootstrap: file protocol guard */
(function () {
    try {
      if (location.protocol === 'file:') {
        var wrap = document.createElement('div');
        wrap.style.cssText = [
          'position:fixed',
          'inset:0',
          'z-index:99999',
          'display:flex',
          'align-items:center',
          'justify-content:center',
          'padding:24px',
          'background:rgba(0,0,0,0.72)',
          'backdrop-filter:blur(10px)'
        ].join(';');

        var card = document.createElement('div');
        card.style.cssText = [
          'max-width:720px',
          'width:100%',
          'border-radius:24px',
          'padding:22px 20px',
          'border:1px solid rgba(255,255,255,0.12)',
          'background:rgba(15,15,18,0.65)',
          'box-shadow:0 24px 80px rgba(0,0,0,0.6)',
          'color:rgba(255,255,255,0.88)',
          'font-family:system-ui, -apple-system, Segoe UI, Roboto, sans-serif'
        ].join(';');

        var title = document.createElement('div');
        title.textContent = 'Abre esto en localhost (no en file://)';
        title.style.cssText = 'font-size:18px;font-weight:700;margin-bottom:8px;letter-spacing:0.01em;';

        var desc = document.createElement('div');
        desc.textContent = 'En file:// el modo Plantillas y el mazo pueden no ejecutarse. Usa el servidor local.';
        desc.style.cssText = 'font-size:14px;line-height:1.45;opacity:0.8;margin-bottom:16px;';

        var url = 'http://localhost:4174/start-lobby/index.html' + (location.hash || '');
        var btn = document.createElement('a');
        btn.href = url;
        btn.textContent = 'Abrir en localhost';
        btn.style.cssText = [
          'display:inline-flex',
          'align-items:center',
          'justify-content:center',
          'gap:10px',
          'padding:12px 14px',
          'border-radius:999px',
          'background:#C5A367',
          'color:#111',
          'text-decoration:none',
          'font-weight:800',
          'letter-spacing:0.06em',
          'text-transform:uppercase'
        ].join(';');

        var hint = document.createElement('div');
        hint.textContent = url;
        hint.style.cssText = 'margin-top:12px;font-size:12px;opacity:0.6;word-break:break-all;';

        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(btn);
        card.appendChild(hint);
        wrap.appendChild(card);
        document.body.appendChild(wrap);
      }
    } catch (e) {}
  })();

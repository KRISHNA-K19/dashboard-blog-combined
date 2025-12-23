export function installGlobalErrorOverlay() {
  if (typeof window === 'undefined') return;

  function showError(msg) {
    try {
      let el = document.getElementById('global-error-overlay');
      if (!el) {
        el = document.createElement('div');
        el.id = 'global-error-overlay';
        el.style.position = 'fixed';
        el.style.left = '12px';
        el.style.top = '12px';
        el.style.right = '12px';
        el.style.zIndex = 99999;
        el.style.background = '#fee2e2';
        el.style.border = '1px solid #fecaca';
        el.style.padding = '12px';
        el.style.borderRadius = '8px';
        el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
        document.body.appendChild(el);
      }
      el.innerText = typeof msg === 'string' ? msg : JSON.stringify(msg, Object.getOwnPropertyNames(msg), 2);
    } catch (err) {
      // ignore
    }
  }

  window.addEventListener('error', (ev) => {
    console.error('Global error captured', ev.error || ev.message, ev);
    showError(ev.error?.stack || ev.message || String(ev));
  });

  window.addEventListener('unhandledrejection', (ev) => {
    console.error('Unhandled rejection', ev.reason);
    showError(ev.reason?.stack || String(ev.reason));
  });
}

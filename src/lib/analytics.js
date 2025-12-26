const CONSENT_KEY = 'analytics_consent';

export function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'granted';
  } catch (e) {
    return false;
  }
}

export function setConsent(granted) {
  try {
    localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied');
  } catch (e) {}
}

export function initGA(measurementId) {
  if (!measurementId) return;
  // attach gtag if not present
  if (!window.dataLayer) {
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);} // eslint-disable-line no-inner-declarations
    window.gtag = window.gtag || gtag;
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { send_page_view: false });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }
}

export function pageview(path, measurementId) {
  if (!measurementId || !window.gtag) return;
  window.gtag('event', 'page_view', { page_path: path });
}

export function trackEvent(name, params = {}, measurementId) {
  if (!measurementId || !window.gtag) return;
  window.gtag('event', name, params);
}
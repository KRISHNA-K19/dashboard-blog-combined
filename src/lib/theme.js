export const THEME_KEY = 'site_theme';

export function getTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || 'light';
  } catch (e) {
    return 'light';
  }
}

export function setTheme(t) {
  try {
    localStorage.setItem(THEME_KEY, t);
  } catch (e) {}
}

export function applyTheme(t) {
  const root = document.documentElement;
  if (t === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
}
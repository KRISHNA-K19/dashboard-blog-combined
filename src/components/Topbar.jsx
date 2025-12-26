import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTheme, setTheme, applyTheme } from '../lib/theme';

export default function Topbar({ onOpenDrawer }) {
  const [theme, setThemeState] = useState('light');

  useEffect(() => {
    const t = getTheme();
    setThemeState(t);
    applyTheme(t);
  }, []);

  return (
    <header className="bg-white dark:bg-slate-800 border-b dark:border-slate-700">
      <div className="max-w-[var(--page-max-width)] mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={onOpenDrawer} aria-label="Open menu" className="lg:hidden p-2 rounded-md hover:bg-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link to="/" className="text-lg font-semibold text-brand">My AdminSite</Link>
        </div>

        <nav className="space-x-3 text-sm hidden sm:block">
          <Link to="/dashboard" className="text-slate-600 hover:text-slate-900">Dashboard</Link>
          <Link to="/blog" className="text-slate-600 hover:text-slate-900">Blog</Link>
          <button
            aria-label="Toggle dark mode"
            onClick={() => {
              const next = theme === 'dark' ? 'light' : 'dark';
              setTheme(next);
              setThemeState(next);
              applyTheme(next);
            }}
            className="ml-3 p-2 rounded-md hover:bg-slate-100"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v1M12 20v1M4.22 4.22l.7.7M18.36 18.36l.7.7M1 12h1M22 12h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7"/></svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

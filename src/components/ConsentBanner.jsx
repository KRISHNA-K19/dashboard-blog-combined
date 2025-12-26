import React, { useState, useEffect } from 'react';
import { getConsent, setConsent, initGA, pageview } from '../lib/analytics';
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export default function ConsentBanner() {
  const [consent, setLocalConsent] = useState(null);

  useEffect(() => {
    setLocalConsent(getConsent());
  }, []);

  if (consent !== null) return null; // hide when user already decided

  return (
    <div className="fixed bottom-6 right-6 bg-white shadow-lg p-4 rounded-md max-w-sm">
      <div className="text-sm text-slate-800 mb-2">We use analytics to understand product usage. Do you allow anonymous analytics?</div>
      <div className="flex gap-2 justify-end">
        <button className="px-3 py-1 rounded-md border" onClick={() => { setConsent(false); setLocalConsent(false); }}>No thanks</button>
        <button className="px-3 py-1 rounded-md bg-brand text-white" onClick={() => { setConsent(true); setLocalConsent(true); if (MEASUREMENT_ID) { initGA(MEASUREMENT_ID); pageview(window.location.pathname + window.location.search, MEASUREMENT_ID); } }}>Yes, allow</button>
      </div>
    </div>
  );
}
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, pageview, getConsent } from '../lib/analytics';

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (getConsent() && MEASUREMENT_ID) {
      initGA(MEASUREMENT_ID);
      pageview(location.pathname + location.search, MEASUREMENT_ID);
    }
  }, []); // run once

  useEffect(() => {
    if (getConsent() && MEASUREMENT_ID) pageview(location.pathname + location.search, MEASUREMENT_ID);
  }, [location]);

  return null;
}
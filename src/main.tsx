// Ensure window.fetch is writable if an environment only defines a getter
try {
  if (typeof window !== 'undefined') {
    const originalFetch = window.fetch ? window.fetch.bind(window) : undefined;
    let _fetch = originalFetch;
    Object.defineProperty(window, 'fetch', {
      get: () => _fetch,
      set: (val) => {
        _fetch = val;
      },
      configurable: true,
      enumerable: true,
    });
  }
} catch {
  // Graceful fallback
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

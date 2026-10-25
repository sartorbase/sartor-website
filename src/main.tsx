import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import './index.css';

// Register PWA service worker for offline measurement guide and asset caching
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('[SARTOR PWA] New atelier content available.');
  },
  onOfflineReady() {
    console.log('[SARTOR PWA] Atelier measurement guide and portfolio cached for offline access.');
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

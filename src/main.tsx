
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './fonts.css';
import { register as registerServiceWorker } from './registerServiceWorker';
import ErrorBoundary from './components/ErrorBoundary';

// Global error handler for production
window.addEventListener('error', (event) => {
  if (import.meta.env.PROD) {
    console.error('Global error:', event.error);
    // In production, you might want to send errors to a logging service
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (import.meta.env.PROD) {
    console.error('Unhandled promise rejection:', event.reason);
    // In production, you might want to send errors to a logging service
  }
});

// Mount app with error boundary
const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Register service worker for offline capabilities in production
if (import.meta.env.PROD) {
  registerServiceWorker();
}

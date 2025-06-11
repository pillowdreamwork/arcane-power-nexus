import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx'; // Changed from SimpleApp
import './index.css';
import './fonts.css';
import { register as registerServiceWorker } from './registerServiceWorker';
import ErrorBoundary from './components/ErrorBoundary';

// Mount app with error boundary
const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App /> {/* Changed from SimpleApp */}
    </ErrorBoundary>
  </React.StrictMode>
);

// Register service worker for offline capabilities
if (import.meta.env.PROD) {
  registerServiceWorker();
}

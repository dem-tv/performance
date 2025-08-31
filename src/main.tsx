import React, { Profiler, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { profiler } from './utils/profiler.ts';
const App = React.lazy(() => import('./App.tsx'));

function initApp() {
  const root = document.getElementById('root');

  if (!root) {
    throw new Error('Unable to find root element');
  }

  createRoot(root).render(
    <StrictMode>
      <Suspense fallback={'loading'}>
        <Profiler id={'app'} onRender={profiler}>
          <App />
        </Profiler>
      </Suspense>
    </StrictMode>
  );
}

initApp();

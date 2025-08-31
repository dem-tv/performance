import React, { Profiler, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { profiler } from './utils/profiler.ts';
// import { setupStore } from './store';
// import { Provider } from 'react-redux';
const App = React.lazy(() => import('./App.tsx'));

function initApp() {
  // const store = setupStore();

  const root = document.getElementById('root');

  if (!root) {
    throw new Error('Unable to find root element');
  }

  createRoot(root).render(
    <StrictMode>
      {/*<Provider store={store}>*/}

      <Suspense fallback={'loading'}>
        <Profiler id={'app'} onRender={profiler}>
          <App />
        </Profiler>
      </Suspense>
      {/*</Provider>*/}
    </StrictMode>
  );
}

initApp();

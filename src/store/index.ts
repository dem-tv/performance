import { configureStore } from '@reduxjs/toolkit';

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: {},
    preloadedState,
  });
};

export type RootState = {};
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

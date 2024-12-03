import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducer from './reducers';
import persistenceMiddleware from './persistence/persistence-middleware';
import persistenceEnhancer from './persistence/persistence-enhancer';
import env from '$helpers/env';

const enhancers = [
  persistenceEnhancer,
];

if (env('ENABLE_REDUX_DEV_TOOLS')) {
  /* eslint-disable no-underscore-dangle */
  if (!(window as any).__REDUX_DEVTOOLS_EXTENSION__) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw 'Redux dev tools extension is missing. Enable it or disable ENABLE_REDUX_DEV_TOOLS';
  }

  enhancers.push(
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
      && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  );
  /* eslint-enable */
}

const store: any = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(thunk, persistenceMiddleware),
  enhancers: (defaultEnhancers) =>
      defaultEnhancers.concat(enhancers),
});

export default store;

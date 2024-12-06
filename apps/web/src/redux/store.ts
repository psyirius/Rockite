import env from '$helpers/env'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import persistenceEnhancer from './persistence/persistence-enhancer'
import persistenceMiddleware from './persistence/persistence-middleware'
import reducer from './reducers'

const enhancers = [persistenceEnhancer]

if (env('ENABLE_REDUX_DEV_TOOLS')) {
  /* eslint-disable no-underscore-dangle */
  if (!(window as any).__REDUX_DEVTOOLS_EXTENSION__) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw 'Redux dev tools extension is missing. Enable it or disable ENABLE_REDUX_DEV_TOOLS'
  }

  enhancers.push((window as any).__REDUX_DEVTOOLS_EXTENSION__?.())
  /* eslint-enable */
}

const store: any = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, persistenceMiddleware),
  enhancers: (defaultEnhancers) => defaultEnhancers.concat(enhancers),
})

export default store

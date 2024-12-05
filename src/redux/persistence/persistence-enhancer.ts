import type { StoreEnhancerStoreCreator } from '@reduxjs/toolkit'
import type State from '../state'
import { storeState } from './persistence-manager'

const persistenceEnhancer = (next: StoreEnhancerStoreCreator<any, any>) => (reducer: any, preloadedState?: any) => {
  const store = next(reducer, preloadedState)

  store.subscribe(async () => {
    await storeState(store.getState() as State)
  })

  return store
}

export default persistenceEnhancer

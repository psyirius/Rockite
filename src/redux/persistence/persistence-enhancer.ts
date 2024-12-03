import { StoreEnhancerStoreCreator } from '@reduxjs/toolkit';
import { storeState } from './persistence-manager';
import State from '../state';

const persistenceEnhancer = (next: StoreEnhancerStoreCreator<any, any>) => (
    (reducer: any, preloadedState?: any) => {

    const store = next(reducer, preloadedState);

    store.subscribe(async () => {
      await storeState(store.getState() as State);
    });

    return store;
  }
);

export default persistenceEnhancer;

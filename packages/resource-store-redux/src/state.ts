import { ResourceStoreState } from './types';

export function initialResourceStoreState(keys: string[]): ResourceStoreState {
  const state: ResourceStoreState = {};
  keys.forEach((key: string) => {
    state[key] = {
      isBusy: false,
    };
  });
  return state;
}

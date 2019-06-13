import { ResourceStoreState } from ".";

export function initialState(keys: string[]): ResourceStoreState {
  const state: ResourceStoreState = {};
  keys.map((k) => {
    state[k] = {
      isBusy: false,
    };
  });
  return state;
}

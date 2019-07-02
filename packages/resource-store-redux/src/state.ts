import { ResourceStoreState } from ".";

export function initialState(keys: string[]): ResourceStoreState {
  const state: ResourceStoreState = {};
  keys.forEach((key: string) => {
    state[key] = {
      isBusy: false,
    };
  });
  return state;
}

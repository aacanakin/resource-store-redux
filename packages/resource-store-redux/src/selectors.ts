import { createSelector } from 'reselect';
import { ResourceStoreState } from './types';

export const getResource = (state: ResourceStoreState, key: string) =>
  state[key];

export const getData = createSelector(
  getResource,
  resource => resource && resource.data,
);

export const isBusy = createSelector(
  getResource,
  resource => resource && resource.isBusy,
);

export const getError = createSelector(
  getResource,
  resource => resource && resource.error,
);

export const hasError = createSelector(
  getResource,
  resource => resource && !!resource.error,
);

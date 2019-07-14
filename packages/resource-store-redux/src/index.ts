import * as resourceActions from './actions';
import { resourceReducer } from './reducer';
import { ResourceStoreOptions } from './types';

export { resourceActions };
export * from './constants';
export * from './reducer';
export * from './selectors';
export * from './types';
export * from './state';

export function resourceStore(options: ResourceStoreOptions) {
  return {
    resourceReducer: resourceReducer(options.keys),
  };
}

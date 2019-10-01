import * as resourceActions from './actions';
import * as resourceSelectors from './selectors';
import { Resource, ResourceStoreState, ResourceStoreOptions } from './types';
import { resourceReducer } from './reducer';
import { initialResourceStoreState } from './state'

const resourceStore = (options: ResourceStoreOptions) => {
  return {
    resourceReducer: resourceReducer(options.keys),
  };
}

export {
  resourceActions,
  resourceSelectors,
  resourceStore,
  resourceReducer,
  Resource,
  ResourceStoreState,
  initialResourceStoreState
};

import { Reducer } from 'redux';
import { ResourceActionTypes } from './constants';
import { initialResourceStoreState } from './state';
import { ResourceStoreState } from './types';

export function resourceReducer(
  resourceKeys: string[],
): Reducer<ResourceStoreState> {
  const initialResourceState = initialResourceStoreState(resourceKeys);

  return (state: ResourceStoreState = initialResourceState, action) => {
    if (
      !action ||
      !action.payload ||
      !action.payload.key ||
      !state[action.payload.key]
    ) {
      return state;
    }

    const { key } = action.payload;

    switch (action.type) {
      case ResourceActionTypes.RESOURCE_REQUEST:
        return {
          ...state,
          [key]: {
            isBusy: true,
          },
        };
      case ResourceActionTypes.RESOURCE_SUCCESS:
        return {
          ...state,
          [key]: {
            data: action.payload.data,
            isBusy: false,
          },
        };
      case ResourceActionTypes.RESOURCE_FAILURE:
        return {
          ...state,
          [key]: {
            error: action.payload.error,
            isBusy: false,
          },
        };
      case ResourceActionTypes.RESOURCE_CANCEL:
        return {
          ...state,
          [key]: {
            ...state[key],
            isBusy: false,
          },
        };
      default:
        return state;
    }
  };
}

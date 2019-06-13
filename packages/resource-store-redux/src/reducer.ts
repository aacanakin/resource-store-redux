
import { Reducer } from "redux";
import { ResourceActionTypes } from "./constants";
import { initialState } from "./state";
import { ResourceStoreState } from "./types";

export function reducer(resourceKeys: string[]): Reducer<ResourceStoreState> {

  return (state: ResourceStoreState = initialState(resourceKeys), action) => {

    const key = action.payload.key;
    if (state[key] === undefined) {
      throw new Error(`Resource key "${key}" is undefined`);
    }

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

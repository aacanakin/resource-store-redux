import { resourceActions } from 'resource-store-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

type RequestParams = any;
type Response = any;

export interface ApiMap {
  [key: string]: (params: RequestParams) => Promise<Response>;
}

export interface ResourceStoreThunkOptions {
  api: ApiMap;
}

export function resourceStoreThunk(options: ResourceStoreThunkOptions) {
  const requestResource = (key: string, params: RequestParams = {}) => {
    if (!options.api[key]) {
      throw new Error(`Resource: "${key}" does not exist in your api map`);
    }

    const request = options.api[key];

    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
      dispatch(resourceActions.request(key, params));

      try {
        const response = await request(params);
        dispatch(resourceActions.success(key, response));
      } catch (e) {
        dispatch(resourceActions.failure(key, e));
      }
    };
  };

  return {
    requestResource,
  };
}

import {
	resourceActions,
	ResourceStoreOptions,
	reducer,
	resourceStore
} from "resource-store-redux";
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
// import { AnyAction } from "redux";

export type ApiMap = { [key: string]: (params: any) => Promise<any> };

export interface ResourceStoreThunkOptions {
	api: ApiMap;
}

export function resourceStoreThunk(options: ResourceStoreThunkOptions) {
	const { reducer } = resourceStore({ keys: Object.keys(options.api) });

	const requestResource = (
		key: string,
		params: any = {}
	): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
		if (!options.api[key]) {
			throw new Error(`Resource: "${key}" does not exist in your api map`);
		}

		const promise = options.api[key];

		return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
			dispatch(resourceActions.request(key, params));

			try {
				const response = await promise(params);
				dispatch(resourceActions.success(key, response));
			} catch (e) {
				dispatch(resourceActions.failure(key, e));
			}
		};
	};

	return {
		reducer,
		requestResource
	};
}

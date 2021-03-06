import { createStore, combineReducers, applyMiddleware } from "redux";
import { ResourceStoreState, initialResourceStoreState, resourceStore } from "resource-store-redux";
import { resourceStoreThunk } from "resource-store-redux-thunk";
import { api } from "./Api";
import thunk from "redux-thunk";

export interface StoreState {
	resources: ResourceStoreState;
}

export default function configureStore() {
	const { resourceReducer } = resourceStore({ keys: Object.keys(api) })
	const { requestResource } = resourceStoreThunk({ api });
	const rootReducer = combineReducers({
		resources: resourceReducer
	});

	const store = createStore<StoreState, any, any, any>(
		rootReducer,
		{
			resources: initialResourceStoreState(Object.keys(api))
		},
		applyMiddleware(thunk)
	);

	return {
		store,
		requestResource,
		resourceReducer
	}

}

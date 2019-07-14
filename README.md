### resource-store-redux

[![Build Status](https://travis-ci.org/aacanakin/resource-store-redux.svg?branch=master)](https://travis-ci.org/aacanakin/resource-store-redux) [![Test Coverage](https://api.codeclimate.com/v1/badges/50ceb23e52dda93a7b60/test_coverage)](https://codeclimate.com/github/aacanakin/resource-store-redux/test_coverage)

An async generic resource store for redux

This is a resource store implementation for handling redux state shape for async resources. The async resources can be fetched from http or websocket or even just promises. It uses the simple thunk middleware under the hood

It's a remake of [this](https://github.com/oplog/resource-redux) library but without the saga stuff and contains improvements with the use of `typesafe-actions` library.

**Notice:** This package doesn't have functionality to perform request but it handles the state shape changes of async resources

**Notice** If you have any questions about this library, please drop an issue with a question label!

#### Getting Started

**Notice** A fully working example is [here](https://github.com/aacanakin/resource-store-redux/tree/master/packages/resource-store-redux-playground)

Install the dependencies

```sh
yarn add resource-store-redux resource-store-redux-thunk
```

Add the `resources` to the state definition;

```ts
import { ResourceStoreState } from "resource-store-redux";

export interface StoreState {
	// ... other state type definitions
	resources: ResourceStoreState;
}
```

Create your async resource map;

```ts
import { ApiMap } from "resource-store-redux-thunk";
import axios from "axios"; // You don't have to use axios

export enum Resource {
	SampleGet = "sampleGet",
	SamplePost = "samplePost"
}

export const api: ApiMap = {
	[Resource.SampleGet]: () => axios.get("https://httpbin.org/get"),
	[Resource.SamplePost]: (body: any) => axios.post("https://httpbin.org/post")
};
```

Create the resource store and wire into your store;

```ts
import thunk from "redux-thunk";
import { resourceStoreThunk } from "resource-store-redux-thunk";
import { initialState } from "resource-store-redux";

const { resourceReducer, requestResource } = resourceStoreThunk({ api });
const rootReducer = combineReducers({
	// ... your other reducers
	resources: resourceReducer
});

const store = createStore<StoreState, any, any, any>(
	rootReducer,
	{
		resources: initialState(Object.keys(api))
	},
	applyMiddleware(thunk)
);
```

Use it in your containers;

```ts
const { store, requestResource } = configureStore();

interface FormContainerOwnProps {
	resource: Resource;
	name: string;
}

interface FormContainerStateProps {
	response?: string;
}

interface FormContainerDispatchProps {
	onSubmit: (form?: any) => void;
}

const mapStateToProps = (
	state: StoreState,
	ownProps: FormContainerOwnProps
): FormContainerStateProps => ({
	// JSON.stringify(obj, null, 2)
	response: JSON.stringify(getData(state.resources, ownProps.resource), null, 2)
});

const mapDispatchToProps = (
	dispatch: ThunkDispatch<StoreState, any, any>,
	ownProps: FormContainerOwnProps
): FormContainerDispatchProps => ({
	onSubmit: (form: any) => {
		dispatch(requestResource(ownProps.resource, form));
	}
});

export const FormContainer = connect<
	FormContainerStateProps,
	FormContainerDispatchProps,
	FormContainerOwnProps,
	StoreState
>(
	mapStateToProps,
	mapDispatchToProps
)(Form);
```

Use this container as the following;

```tsx
<FormContainer resource={Resource.SampleGet} name="sample get" />
<FormContainer resource={Resource.SamplePost} name="sample post" />
```

#### The resource store

The state shape is the following;

```ts
export interface Resource {
	readonly isBusy: boolean;
	readonly error?: Error;
	readonly data?: any;
}

export interface ResourceStoreState {
	[key: string]: Resource;
}
```

The actions that can be applied to state shape is the following;

```ts
export enum ResourceActionTypes {
	RESOURCE_REQUEST = "@RESOURCE/REQUEST",
	RESOURCE_SUCCESS = "@RESOURCE/SUCCESS",
	RESOURCE_FAILURE = "@RESOURCE/FAILURE",
	RESOURCE_CANCEL = "@RESOURCE/CANCEL"
}
```

The `key` can be described as the resource key. Here's a sample of meaningful resource keys;

```ts
enum ResourceKeys {
    CreateUser = "createUser"
    ListUsers = "listUsers"
    DeleteUser = "deleteUser"
    UpdateUser = "updateUser"
}
```

To wire the reducer into the root reducer;

```ts
import { combineReducers } from "redux";
import { resourceStore } from "resource-store-redux";

const resourceStore = resourceStore({
	keys: Object.values(ResourceKeys)
});

export default combineReducers({
	resources: resourceStore.reducer
	// And your other reducers
});
```

After this, the initial state would be generated for each resource key

To dispatch actions in your container definition;

```ts
import { resourceActions } from "resource-store-redux";

const mapDispatchToProps = dispatch => ({
	onStuffHappens: () => {
		// request starts
		dispatch(resourceActions.request(ResourceKeys.CreateUser, requestParams)),
			// request ended with 20x
			dispatch(resourceActions.success(ResourceKeys.CreateUser, data));

		// request fails
		dispatch(resourceActions.failure(ResourceKeys.CreateUser, error));

		// cancel request
		dispatch(resourceActions.cancel(ResourceKeys.CreateUser, error));

		// Notice: These actions doesn't make any request but just handles the redux state of requests
	}
});
```

There are also builtin selectors for resources for mapping your state to props;

```ts
import {
	getResource,
	getData,
	isBusy,
	getError,
	hasError
} from "resource-store-redux";

const resource = getResource(state, ResourceKeys.CreateUser);
// returns the complete state shape for resource

const data = getData(state, ResourceKeys.CreateUser);
// returns response body of request

const isResourceBusy = isBusy(state, ResourceKeys.CreateUser);
// returns if the resource key is busy (between request and response)

const error = getError(state, ResourceKeys.CreateUser);
// returns the error on the resource key

const hasResourceError = hasError(state, ResourceKeys.CreateUser);
// returns if the resource key has error
```

#### Roadmap

- [ ] Request cancelling (with axios only, fetch doesn't show any errors)
- [ ] Revisit bundle sizes (maybe some library is too big)
- [ ] Type safety improvements in resource-store-redux-thunk
- [ ] Socket io example

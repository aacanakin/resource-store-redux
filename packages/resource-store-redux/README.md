### resource-store-redux
An async generic resource store for redux 

This is a resource store implementation for handling redux state shape for async resources. The async resources can be fetched from http or websocket or even just promises. It contains only the reducer, action implementation. It doesn't have any saga, thunk library. This library is going to stay generic.

It's a remake of [this](https://github.com/oplog/resource-redux) library but without the saga stuff and contains improvements with the use of `typesafe-actions` library.

**Notice:** This package doesn't have functionality to perform request but it handles the state shape changes of async resources 

**Notice:** There will be a separate package based on thunk middleware that maps these actions into `axios` or `fetch` requests

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
  RESOURCE_CANCEL = "@RESOURCE/CANCEL",
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
import { combineReducers } from 'redux'
import { resourceStore } from 'resource-store-redux'

const resourceStore = resourceStore({
    keys: Object.values(ResourceKeys)
})

export default combineReducers({
    resources: resourceStore.reducer,
    // And your other reducers
})
```
After this, the initial state would be generated for each resource key

To dispatch actions in your container definition;

```ts
import { resourceActions } from 'resource-store-redux'

const mapDispatchToProps = dispatch => {

    // request starts
    dispatch(resourceActions.request(ResourceKeys.CreateUser, requestParams))

    // request ended with 20x
    dispatch(resourceActions.success(ResourceKeys.CreateUser, data))

    // request fails
    dispatch(resourceActions.failure(ResourceKeys.CreateUser, error))

    // cancel request
    dispatch(resourceActions.cancel(ResourceKeys.CreateUser, error))

    // Notice: These actions doesn't make any request but just handles the redux state of requests
}
```

There are also builtin selectors for resources;

```ts
import { getResource, getData, isBusy, getError, hasError } from 'resource-store-redux'

const resource = getResource(state, ResourceKeys.CreateUser)
// returns the complete state shape for resource

const data =  getData(state, ResourceKeys.CreateUser)
// returns response body of request

const isResourceBusy = isBusy(state, ResourceKeys.CreateUser)
// returns if the resource key is busy (between request and response)

const error = getError(state, ResourceKeys.CreateUser)
// returns the error on the resource key

const hasResourceError = hasError(state, ResourceKeys.CreateUser)
// returns if the resource key has error
```

#### Roadmap
- [ ] Get rid of tslint, integrate eslint
- [ ] Convert webpack configs to ts
A
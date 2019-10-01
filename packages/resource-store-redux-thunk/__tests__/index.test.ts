import {
  ApiMap,
  ResourceStoreThunkOptions,
  resourceStoreThunk,
} from '../src/index';
import { ResourceStoreState } from 'resource-store-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { resourceActions } from 'resource-store-redux';

enum Resources {
  ListUsers = 'listUsers',
  GetUser = 'getUser',
}

interface User {
  name: string;
}

interface StoreState {
  resources: ResourceStoreState;
}

const middlewares = [thunk];
const mockStore = configureMockStore<StoreState>(middlewares);

describe('Resource thunk middleware', () => {
  const users: User[] = [
    {
      name: 'Aras',
    },
    {
      name: 'John',
    },
  ];

  const listUsers = () =>
    new Promise((resolve, reject) => {
      resolve(users);
    });

  const getUser = (params: { name: string }) =>
    new Promise((resolve, reject) => {
      const user = users.find(user => user.name === params.name);
      if (user) {
        return resolve(user);
      }

      reject(new Error('User not found'));
    });

  const api: ApiMap = {
    [Resources.ListUsers]: listUsers,
    [Resources.GetUser]: getUser,
  };

  const options: ResourceStoreThunkOptions = {
    api: api,
  };

  const { requestResource } = resourceStoreThunk(options);

  it('should dispatch correct actions on success', () => {
    const expectedActions = [
      resourceActions.request(Resources.ListUsers, {}),
      resourceActions.success(Resources.ListUsers, users),
    ];

    const store = mockStore({ resources: {} });
    return store
      .dispatch<any>(requestResource(Resources.ListUsers))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch correct actions on failure', () => {
    const expectedActions = [
      resourceActions.request(Resources.GetUser, { name: 'non-existing-user' }),
      resourceActions.failure(Resources.GetUser, new Error('User not found')),
    ];

    const store = mockStore({ resources: {} });
    return store
      .dispatch<any>(
        requestResource(Resources.GetUser, { name: 'non-existing-user' }),
      )
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should throw error on non existing resource', () => {
    const store = mockStore({ resources: {} });
    const nonExistingResourceKey = 'non-existing-resource';
    expect(() => {
      return store.dispatch<any>(requestResource(nonExistingResourceKey));
    }).toThrowError(
      `Resource: "${nonExistingResourceKey}" does not exist in your api map`,
    );
  });
});

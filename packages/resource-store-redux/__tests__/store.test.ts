import { resourceStore } from '../src';
import { initialResourceStoreState } from '../src/state';

describe('Resource Store', () => {
  it('should create reducer for keys', () => {
    enum ResourceKeys {
      CreateUser = 'createUser',
      UpdateUser = 'updateUser',
      ListUsers = 'listUsers',
    }

    const keys = [
      ResourceKeys.CreateUser,
      ResourceKeys.UpdateUser,
      ResourceKeys.ListUsers,
    ];

    const state = initialResourceStoreState(keys);
    const store = resourceStore({ keys });
    const action = { type: 'UNIT', payload: { key: ResourceKeys.CreateUser } };
    const nextState = store.resourceReducer(state, action);

    expect(nextState[ResourceKeys.CreateUser]).toEqual(
      state[ResourceKeys.CreateUser],
    );
    expect(Object.keys(state).length).toEqual(keys.length);
  });
});

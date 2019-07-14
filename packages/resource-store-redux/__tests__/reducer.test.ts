import * as actions from '../src/actions';
import { resourceReducer } from '../src/reducer';
import { initialState } from '../src/state';

describe('Reducer', () => {
  const key = 'testEndpointResource';
  const state = initialState([key]);

  it('should throw error on non-existing resource key', () => {
    const action = actions.request('non-existing-key');
    expect(() => resourceReducer([key])(state, action)).toThrow();
  });

  it('should return initial state when state is not defined', () => {
    const action = actions.cancel(key);
    const nextState = resourceReducer([key])(undefined, action);

    expect(nextState).toEqual(initialState([key]));
  });

  it('should mutate state correctly in REQUEST action', () => {
    const action = actions.request(key);
    const nextState = resourceReducer([key])(state, action);

    expect(nextState).toEqual({
      [key]: {
        isBusy: true,
      },
    });
  });

  it('should mutate state correctly in SUCCESS action with data', () => {
    const data = { foo: { bar: 'baz' } };
    const action = actions.success(key, data);
    const nextState = resourceReducer([key])(state, action);

    expect(nextState).toEqual({
      [key]: {
        isBusy: false,
        data,
      },
    });
  });

  it('should mutate state correctly in SUCCESS action without data', () => {
    const action = actions.success(key);
    const busyState = {
      ...state,
      [key]: {
        ...state[key],
        isBusy: true,
      },
    };
    const nextState = resourceReducer([key])(busyState, action);

    expect(nextState).toEqual({
      [key]: {
        isBusy: false,
      },
    });
  });

  it('should mutate state correctly in FAILURE action with error', () => {
    const error = new Error('Sample Error');
    const action = actions.failure(key, error);
    const nextState = resourceReducer([key])(state, action);

    expect(nextState).toEqual({
      [key]: {
        isBusy: false,
        error,
      },
    });
  });

  it('should mutate state correctly in CANCEL action', () => {
    const prevState = {
      [key]: {
        error: new Error('Sample Error'),
        isBusy: true,
        data: { foo: { bar: 'baz' } },
      },
    };

    const action = actions.cancel(key);
    const nextState = resourceReducer([key])(prevState, action);

    expect(nextState.isBusy).toBeFalsy();
  });

  it('should not mutate state in non defined action', () => {
    const prevState = {
      [key]: {
        error: new Error('Sample Error'),
        isBusy: true,
        data: { foo: { bar: 'baz' } },
      },
    };

    const action = {
      type: 'non-defined-action',
      payload: { key },
    };

    const nextState = resourceReducer([key])(prevState, action);

    expect(nextState).toEqual(prevState);
  });
});

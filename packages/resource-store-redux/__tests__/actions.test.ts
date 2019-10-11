import { action } from 'typesafe-actions';
import * as resourceActions from '../src/actions';
import { ResourceActionTypes } from '../src/constants';

describe('Actions', () => {
  const key = 'key';

  describe('Request', () => {
    it('should generate REQUEST action with empty params', () => {
      const requestAction = resourceActions.request('key');
      expect(requestAction).toEqual(
        action(ResourceActionTypes.RESOURCE_REQUEST, {
          key,
          params: undefined,
        }),
      );
    });

    it('should generate REQUEST action with non-empty params', () => {
      const params = { param1: 'param1', param2: 1 };
      const requestAction = resourceActions.request(key, params);
      expect(requestAction).toEqual(
        action(ResourceActionTypes.RESOURCE_REQUEST, {
          key,
          params,
        }),
      );
    });
  });

  describe('Success', () => {
    it('should generate SUCCESS action with empty data', () => {
      const requestAction = resourceActions.success(key);
      expect(requestAction).toEqual(
        action(ResourceActionTypes.RESOURCE_SUCCESS, {
          key,
          data: undefined,
        }),
      );
    });

    it('should generate SUCCESS action with non-empty params', () => {
      const data = { foo: 1, bar: { baz: 2 } };
      const requestAction = resourceActions.success(key, data);
      expect(requestAction).toEqual(
        action(ResourceActionTypes.RESOURCE_SUCCESS, {
          key,
          data,
        }),
      );
    });
  });

  describe('Failure', () => {
    it('should generate FAILURE action with empty error', () => {
      const requestAction = resourceActions.failure(key);
      expect(requestAction).toEqual(
        action(ResourceActionTypes.RESOURCE_FAILURE, {
          key,
          error: undefined,
        }),
      );
    });

    it('should generate FAILURE action with non-empty params', () => {
      const error = new Error('Sample Error');
      const requestAction = resourceActions.failure(key, error);
      expect(requestAction).toEqual(
        action(ResourceActionTypes.RESOURCE_FAILURE, {
          key,
          error,
        }),
      );
    });
  });

  describe('Cancel', () => {
    it('should generate CANCEL action', () => {
      const requestAction = resourceActions.cancel(key);
      expect(requestAction).toEqual(
        action(ResourceActionTypes.RESOURCE_CANCEL, { key }),
      );
    });
  });
});

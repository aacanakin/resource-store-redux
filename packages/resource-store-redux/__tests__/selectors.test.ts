import {
  getData,
  getResource,
  isBusy,
  hasError,
  getError,
} from '../src/selectors';

describe('Selectors', () => {
  const key = 'sampleResource';
  const invalidKey = 'nonExistingKey';
  const state = {
    [key]: {
      isBusy: false,
      data: { foo: { bar: 'baz' } },
      error: new Error('Sample Error'),
    },
  };

  describe('getResource', () => {
    it('should return resource with correct key', () => {
      expect(getResource(state, key)).toEqual(state[key]);
    });

    it('should return undefined with non existing key', () => {
      expect(getResource(state, invalidKey)).toBeUndefined();
    });
  });

  describe('getData', () => {
    it('should return data with correct key', () => {
      expect(getData(state, key)).toEqual(state[key].data);
    });

    it('should return undefined with non existing key', () => {
      expect(getData(state, invalidKey)).toBeUndefined();
    });
  });

  describe('isBusy', () => {
    it('should return isBusy with correct key', () => {
      expect(isBusy(state, key)).toEqual(state[key].isBusy);
    });

    it('should return undefined with non existing key', () => {
      expect(isBusy(state, invalidKey)).toBeUndefined();
    });
  });

  describe('getError', () => {
    it('should return true with correct key with error', () => {
      expect(getError(state, key)).toEqual(state[key].error);
    });

    it('should return undefined with non existing key', () => {
      expect(getError(state, invalidKey)).toBeUndefined();
    });
  });

  describe('hasError', () => {
    it('should return true with correct key with error', () => {
      expect(hasError(state, key)).toBeTruthy();
    });

    it('should return undefined with non existing key', () => {
      expect(isBusy(state, invalidKey)).toBeUndefined();
    });
  });
});

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
  const resource = {
    isBusy: false,
    data: { foo: { bar: 'baz' } },
    error: new Error('Sample Error'),
  };
  const state = {
    [key]: resource,
  };

  describe('getResource', () => {
    it('should return resource with correct key', () => {
      expect(getResource(state, key)).toEqual(resource);
    });

    it('should return undefined with non existing key', () => {
      expect(getResource(state, invalidKey)).toBeUndefined();
    });
  });

  describe('getData', () => {
    it('should return data with correct key', () => {
      expect(getData(state, key)).toEqual(resource.data);
    });

    it('should return undefined with non existing key', () => {
      expect(getData(state, invalidKey)).toBeUndefined();
    });
  });

  describe('isBusy', () => {
    it('should return isBusy with correct key', () => {
      expect(isBusy(state, key)).toEqual(resource.isBusy);
    });

    it('should return undefined with non existing key', () => {
      expect(isBusy(state, invalidKey)).toBeUndefined();
    });
  });

  describe('getError', () => {
    it('should return true with correct key with error', () => {
      expect(getError(state, key)).toEqual(resource.error);
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

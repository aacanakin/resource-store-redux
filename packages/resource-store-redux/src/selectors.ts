import { ResourceStoreState } from "./types";

export function getResource(state: ResourceStoreState, key: string) {
  return state[key];
}

export function getData(state: ResourceStoreState, key: string) {
  const resource = getResource(state, key);
  return resource ? resource.data : undefined;
}

export function isBusy(state: ResourceStoreState, key: string) {
  const resource = getResource(state, key);
  return resource ? resource.isBusy : undefined;
}

export function getError(state: ResourceStoreState, key: string) {
  const resource = getResource(state, key);
  return resource ? resource.error : undefined;
}

export function hasError(state: ResourceStoreState, key: string) {
  return getError(state, key) !== undefined;
}

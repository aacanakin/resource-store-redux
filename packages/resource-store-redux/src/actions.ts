import { action } from "typesafe-actions";
import { ResourceActionTypes } from "./constants";

export const request = (key: string, params: any = undefined) => {
  return action(ResourceActionTypes.RESOURCE_REQUEST, {
    key,
    params,
  });
};

export const success = (key: string, data: any = undefined) => {
  return action(ResourceActionTypes.RESOURCE_SUCCESS, {
    key,
    data,
  });
};

export const failure = (key: string, error?: Error) => {
  return action(ResourceActionTypes.RESOURCE_FAILURE, {
    key,
    error,
  });
};

export const cancel = (key: string) => {
  return action(ResourceActionTypes.RESOURCE_CANCEL, { key });
};

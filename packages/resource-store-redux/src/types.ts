
export interface Resource {
  readonly isBusy: boolean;
  readonly error?: Error;
  readonly data?: any;
}

export interface ResourceStoreState {
  [key: string]: Resource;
}

export interface ResourceStoreOptions {
  api: { [key: string]: () => Promise<any> };
}

import * as resourceActions from "./actions";
import { reducer } from "./reducer";
import { ResourceStoreOptions } from "./types";

export { resourceActions };
export * from "./constants";
export * from "./reducer";
export * from "./selectors";
export * from "./types";

export function resourceStore(options: ResourceStoreOptions) {
  return {
    reducer: reducer(options.keys),
  };
}

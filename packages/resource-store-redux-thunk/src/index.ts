import { resourceActions, ResourceStoreOptions, reducer } from 'resource-store-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

type ApiMap = { [key: string]: (params: any) => Promise<any> }

export interface ResourceStoreThunkOptions extends ResourceStoreOptions {
    map: ApiMap
}

export function resourceStore(options: ResourceStoreThunkOptions) {

    const resourceReducer = reducer(Object.keys(options.map))

    const requestResource = async (key: string, params: any) => {

        if (!options.map[key]) {
            throw new Error(`Resource: ${key} does not exist in your api map`)
        }

        const promise = options.map[key]

        return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
            dispatch(resourceActions.request(key, params))

            try {
                const response = await promise(params)
                dispatch(resourceActions.success(key, response))
            } catch (e) {
                dispatch(resourceActions.failure(key, e))
                throw new Error(e)
            }
        }
    }

    return {
        reducer: resourceReducer,
        requestResource
    }
}


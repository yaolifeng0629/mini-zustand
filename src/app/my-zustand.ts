import { useSyncExternalStore } from 'react';

type StateUpdater<T> = (
    partial: T | Partial<T> | ((state: T) => T | Partial<T>),
    replace?: boolean
) => void;
type StateGetter<T> = () => T;
type StateListener<T> = (state: T, previousState: T) => void;
type StateSubscriber<T> = (listener: StateListener<T>) => () => void;
type CreateState<T> = (setState: StateUpdater<T>, getState: StateGetter<T>, api: StoreApi<T>) => T;

interface StoreApi<T> {
    setState: StateUpdater<T>;
    getState: StateGetter<T>;
    subscribe: StateSubscriber<T>;
    destroy: () => void;
}

const createStore = <T>(createState: CreateState<T>): StoreApi<T> => {
    let state: T;
    const listeners = new Set<StateListener<T>>();

    const setState: StateUpdater<T> = (partial, replace) => {
        const nextState =
            typeof partial === 'function'
                ? (partial as (state: T) => T | Partial<T>)(state)
                : partial;

        if (!Object.is(nextState, state)) {
            const previousState = state;

            if (!replace) {
                state =
                    typeof nextState !== 'object' || nextState === null
                        ? (nextState as T)
                        : Object.assign({}, state, nextState);
            } else {
                state = nextState as T;
            }
            listeners.forEach((listener) => listener(state, previousState));
        }
    };

    const getState: StateGetter<T> = () => state;

    const subscribe: StateSubscriber<T> = (listener) => {
        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    };

    const destroy = () => {
        listeners.clear();
    };

    const api: StoreApi<T> = { setState, getState, subscribe, destroy };

    state = createState(setState, getState, api);

    return api;
};

function useStore<T, U>(api: StoreApi<T>, selector: (state: T) => U): U {
    if (typeof selector !== 'function') {
        throw new TypeError('Selector must be a function');
    }

    function getState() {
        return selector(api.getState());
    }

    return useSyncExternalStore(api.subscribe, getState);
}

export const create = <T>(createState: CreateState<T>) => {
    const api = createStore(createState);

    const useBoundStore = <U>(selector: (state: T) => U = (state) => state as unknown as U) =>
        useStore(api, selector);

    Object.assign(useBoundStore, api);

    return useBoundStore;
};

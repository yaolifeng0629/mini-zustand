// import { create } from 'zustand';

import { persist } from 'zustand/middleware';

import { create } from './my-zustand';

type CustomState = {
    aaa: string;
    bbb: string;
};

type CustomActions = {
    updateAaa: (value: string) => void;
    updateBbb: (value: string) => void;
};

type CustomStore = CustomState & CustomActions;

type SetFunction = (...args: any[]) => void;
type GetFunction = () => void;

function logMiddleware(func: any) {
    return function (set: SetFunction, get: GetFunction, store: any) {
        function newSet(...args: any[]) {
            console.log('Be called set ---->', get());
            return set(...args);
        }

        return func(newSet, get, store);
    };
}

const useCustomStore = create<CustomStore>(
    logMiddleware(
        persist(
            (set: any) => ({
                aaa: '',
                bbb: '',
                updateAaa: (value: string) =>
                    set(() => ({
                        aaa: value,
                    })),
                updateBbb: (value: string) =>
                    set(() => ({
                        bbb: value,
                    })),
            }),
            {
                name: 'test_persist',
            }
        )
    )
);

export default useCustomStore;

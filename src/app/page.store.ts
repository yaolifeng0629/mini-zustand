// import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { create } from './my-zustand';

type XxxState = {
    aaa: string;
    bbb: string;
};

type XxxActions = {
    updateAaa: (value: string) => void;
    updateBbb: (value: string) => void;
};

type XxxStore = XxxState & XxxActions;

type SetFunction = (...args: any[]) => void;
type GetFunction = () => void;

function logMiddleware(func: any) {
    return function (set: SetFunction, get: GetFunction, store: any) {
        function newSet(...args: any[]) {
            console.log('调用了 set ---->', get());
            return set(...args);
        }

        return func(newSet, get, store);
    };
}

const usexxxStore = create<XxxStore>(
    logMiddleware(
        persist(
            (set: any) => ({
                aaa: '',
                bbb: '',
                updateAaa: (value: string) =>
                    set(() => ({
                        aaa: value
                    })),
                updateBbb: (value: string) =>
                    set(() => ({
                        bbb: value
                    }))
            }),
            {
                name: 'test_persist'
            }
        )
    )
);

export default usexxxStore;

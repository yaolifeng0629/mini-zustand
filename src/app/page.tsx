'use client';

import useCustomStore from './page.store';

export default function Home() {
    const { updateAaa, aaa } = useCustomStore();

    useCustomStore.subscribe(() => {
        console.log('state', useCustomStore.getState());
    });
    return (
        <div className="w-full h-full flex justify-center items-center flex-col gap-y-4">
            <h1 className="text-5xl font-bold">Mini Zustand</h1>
            <label
                htmlFor="Please input context"
                className="relative block rounded-md border border-gray-300 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 h-16 w-96"
            >
                <input
                    onChange={e => updateAaa(e.currentTarget.value)}
                    value={aaa}
                    type="text"
                    id="Please input context"
                    className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 leading-normal p-3"
                    placeholder="Please input context"
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                    Please input context
                </span>
            </label>
            <DisplayData />
        </div>
    );
}

function DisplayData() {
    const { aaa } = useCustomStore();
    return <p className="text-2xl text-left">Context: {aaa}</p>;
}

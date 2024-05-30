'use client';

import usexxxStore from './page.store';

export default function Home() {
    const { updateAaa, aaa } = usexxxStore();

    usexxxStore.subscribe((state) => {
        console.log('state', usexxxStore.getState());
    });
    return (
        <div>
            <h1>Mini Zustand</h1>
            <input
                onChange={(e) => updateAaa(e.currentTarget.value)}
                value={aaa}
                className="border border-gray-200"
            />
            <Bbb />
        </div>
    );
}

function Bbb() {
    return <Ccc></Ccc>;
}

function Ccc() {
    const { aaa } = usexxxStore();
    return <p>hello, {aaa}</p>;
}

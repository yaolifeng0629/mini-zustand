import type { NextPage } from 'next';
import { useStore } from './useStore';

const UseDemo: NextPage = () => {
  const { count, increase } = useStore();

  return (
    <div>
      <h1>Counter</h1>
      <p>Count: {count}</p>
      <button onClick={increase}>increase</button>
    </div>
  );
}

export default UseDemo;

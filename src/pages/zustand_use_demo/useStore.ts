import { create } from 'zustand';

type StoreState = {
  count: Number;
  increase: () => void;
};

export const useStore = create<StoreState>(set => ({
  count: 0,
  increase: () => set(state => ({ count: state.count + 1 })),
}));

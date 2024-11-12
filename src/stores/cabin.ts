import { create } from 'zustand';

interface UseCabinStore {
  isClickAdd: boolean;
  //   isClickCreate: boolean;
  //   setIsClickCreate: () => void;
  setIsClickAdd: () => void;
}

const useCabinStore = create<UseCabinStore>((set) => ({
  isClickAdd: false,
  //   isClickCreate: false,
  setIsClickAdd: () => {
    set((state) => ({
      isClickAdd: !state.isClickAdd,
    }));
  },
  //   setIsClickCreate: () => {
  //     set((state) => ({
  //       isClickCreate: !state.isClickCreate,
  //     }));
  //   },
}));

export default useCabinStore;

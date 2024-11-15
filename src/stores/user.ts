import { create } from 'zustand';

interface UseUserStroe {
  isLogined: boolean;
  setIsLogined: () => void;
}

const useUserStore = create<UseUserStroe>((set) => ({
  isLogined: false,
  setIsLogined: () => {
    set({ isLogined: true });
  },
}));

export default useUserStore;

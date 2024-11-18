import { create } from 'zustand';

interface UseUserStroe {
  isLogined: boolean;
  setIsLogined: () => void;
  LogOut: () => void;
}

const useUserStore = create<UseUserStroe>((set) => ({
  isLogined: false,
  setIsLogined: () => {
    set({ isLogined: true });
  },
  LogOut: () => {
    set({ isLogined: false });
  },
}));

export default useUserStore;

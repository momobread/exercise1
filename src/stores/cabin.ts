import { create } from 'zustand';
import { TodoType } from '../types/todo';

interface UseTodoStore {
  isClickAdd: boolean;
  isClickEdit: boolean;

  todo: TodoType;
  setIsClickAdd: () => void;
  setIsClickEdit: () => void;
  setTodo: (todo: TodoType) => void;
}

const useTodoStore = create<UseTodoStore>((set) => ({
  isClickAdd: false,
  isClickEdit: false,

  todo: { date: '', label: '', priority: '', todo: '', id: 0 },
  setTodo: (todo) => set({ todo: todo }),
  setIsClickAdd: () => {
    set((state) => ({
      isClickAdd: !state.isClickAdd,
    }));
  },
  setIsClickEdit: () => {
    set((state) => ({
      isClickEdit: !state.isClickEdit,
    }));
  },
}));

export default useTodoStore;

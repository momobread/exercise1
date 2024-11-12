import { supabase } from '../service/supabase.ts';
import { TodoType } from '../types/todo.ts';
import toast from 'react-hot-toast';
export async function fetchTodos() {
  let { data: todo, error } = await supabase.from('todo').select('*');
  if (error) {
    toast.error('데이터 읽어오기에 실패하였습니다');
    const response = null;
    return response;
  }

  return todo;
}

export async function makeTodo(todos: TodoType) {
  const { data, error } = await supabase.from('todo').insert([todos]).select();

  if (error) toast.error('생성하기에 실패하였습니다');
}

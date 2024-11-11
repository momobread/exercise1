import { supabase } from '../service/supabase.ts';
import { TodoType } from '../types/todo.ts';
export async function fetchTodos() {
  let { data: todo, error } = await supabase.from('todo').select('*');

  return todo;
}

export async function makeTodo(todos: TodoType) {
  const { data, error } = await supabase.from('todo').insert([todos]).select();
}

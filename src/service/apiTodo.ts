import { supabase } from '../service/supabase.ts';
export async function fetchTodos() {
  let { data: todo, error } = await supabase.from('todo').select('*');

  return todo;
}

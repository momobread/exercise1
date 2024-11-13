import { supabase } from '../service/supabase.ts';
import { useQueryClient } from '@tanstack/react-query';
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

export async function deleteTodo(id: number) {
  const { error } = await supabase.from('todo').delete().eq('id', id);
}
export async function editTodo(id: number) {
  // const { data, error } = await supabase
  //   .from('todo')
  //   .update({ other_column: 'otherValue' })
  //   .eq('some_column', 'someValue')
  //   .select();
}

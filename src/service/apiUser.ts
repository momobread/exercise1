import { UserType } from '../types/user';
import { supabase } from './supabase';

export async function fetchUser() {
  let { data: user, error } = (await supabase.from('user').select('*')) as { data: UserType[] | null; error: any };

  if (user === null) throw new Error('');

  return user;
}

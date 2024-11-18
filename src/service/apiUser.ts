import toast from 'react-hot-toast';
import { UserType } from '../types/user';
import { supabase } from './supabase';

async function fetchUser() {
  let { data: user, error } = (await supabase.from('user').select('*')) as { data: UserType[] | null; error: any };

  if (user === null) throw new Error('');

  if (error) toast.error('유저정보를 불러오는데 실패하였습니다');

  return user;
}

const userJoinApi = async (user: UserType): Promise<void> => {
  console.log(user);

  const { error } = await supabase.from('user').insert([user]).select();

  if (error) toast.error('회원가입에 실패하였습니다');
};

export { userJoinApi, fetchUser };

import { useQueryClient } from '@tanstack/react-query';
import { fetchUser } from '../../service/apiUser';
import { UserType } from '../../types/user';
import { useEffect, useState } from 'react';
import { supabase } from '../../service/supabase';

// export default function userLogin() {
//   const users = useQueryClient().getQueriesData;
//   console.log(users);
// }

// export default function userLogin() {
//   const users = useQueryClient().getQueriesData;
//   console.log(users);
// }

export default async function userLogin(user: UserType) {
  let isLogined = false;
  let { data: users, error } = (await supabase.from('user').select('*')) as { data: UserType[] | null; error: any };

  users?.forEach((users) =>
    users.user_id === user.user_id && users.user_pw === user.user_pw ? (isLogined = true) : '',
  );
  // console.log(isLogined);
  return isLogined;
}

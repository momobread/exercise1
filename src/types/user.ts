interface UserType {
  user_id: string;
  user_pw: string;
  user_email: string;
  user_name: string;
  user_birth: Date;
  user_phone: string;
  user_image: string;
}

interface LoginProps {
  users: UserType[];
}
export type { UserType, LoginProps };

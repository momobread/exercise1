import styled from '@emotion/styled';

import { Button } from '../ui/Button';

import FormInput from '../ui/FormInput';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserType } from '../types/user';
import userLogin from '../components/authentication/Login';
import useUserStore from '../stores/user';

const LoginLayout = styled.div`
  width: 100dvw;
  height: 1080px;
  display: flex;
  justify-content: center;

  form {
    margin-top: 10%;
    position: fixed;
    width: 500px;
    height: 300px;
    border: 2px solid #e0ccbe;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    div:nth-of-type(1) {
      margin-top: 50px;
    }
    div {
      width: 80%;
      background-color: antiquewhite;
      label {
        width: 15%;
      }
      input {
        width: 80%;
        height: 35px;
      }
    }
  }
`;

function Login() {
  const { handleSubmit, register, formState } = useForm<UserType>();

  // 멀티플로 받아서 리랜더링 방지를 위해 shallow를 쓰려 했으나 없어짐
  const setIsLogined = useUserStore((state) => state.setIsLogined);
  const isLogined = useUserStore((state) => state.isLogined);
  const navigate = useNavigate();

  // 이렇게 타입을 지정하면 onSubmit의 전체타입을 submitHandler로 지정하겠다는 거임/ 그리고 제네릭 타입으로 매개변수를 지정하게 됌
  const onSubmit: SubmitHandler<UserType> = async (data): Promise<void> => {
    // 비동기 함수를 호출한 후 값을 쓰려면 handleSubmit에서 호출하는 함수에 async를 붙이면 된다
    const userCheck = await userLogin(data);
    userCheck ? setIsLogined() : '';
    isLogined ? navigate('/') : navigate('login/join');
  };

  return (
    <LoginLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="아이디" error={formState.errors.user_id?.message}>
          <input type="text" {...register('user_id', { required: '아이디를 입력해 주세요' })} />
        </FormInput>
        <FormInput label="비밀번호" error={formState.errors.user_pw?.message}>
          <input {...register('user_pw', { required: '비밀번호를 입력해주세요' })} />
        </FormInput>
        <Button type="submit">로그인</Button>
        <Button type="button">아이디/비밀번호 찾기</Button>
        <NavLink to={'/login/join'}>
          <Button type="button">회원가입</Button>
        </NavLink>
      </form>
    </LoginLayout>
  );
}

export default Login;

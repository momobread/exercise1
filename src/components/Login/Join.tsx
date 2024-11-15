import styled from '@emotion/styled';
import FormInput from '../../ui/FormInput';
import { useForm } from 'react-hook-form';
import { Button } from '../../ui/Button';
import { useMutation } from '@tanstack/react-query';
const JoinLayout = styled.div`
  width: 100dvw;
  height: 1080px;
  display: flex;
  justify-content: center;

  form {
    margin-top: 5%;
    position: fixed;
    width: 500px;
    height: 650px;
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
    button {
      margin-top: 25px;
    }
  }
`;

function Join() {
  const { handleSubmit } = useForm();

  // const {} = useMutation({
  //   mutationFn: () => {},
  //   onSuccess: () => {},
  // });
  const onSubmit = () => {
    console.log('제출');
  };

  return (
    <JoinLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="아이디" type="vertical">
          <input id="id" />
        </FormInput>
        <FormInput label="비밀번호">
          <input id="password" />
        </FormInput>
        <FormInput label="이메일">
          <input id="email" />
        </FormInput>
        <FormInput label="이름">
          <input id="name" />
        </FormInput>
        <FormInput label="생년월일">
          <input id="birth" />
        </FormInput>
        <FormInput label="휴대폰번호">
          <input id="phoneNumber" />
        </FormInput>
        <Button>가입하기</Button>
      </form>
    </JoinLayout>
  );
}
export default Join;

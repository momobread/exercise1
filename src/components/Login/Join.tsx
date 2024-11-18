import styled from '@emotion/styled';
import FormInput from '../../ui/FormInput';
import { useForm } from 'react-hook-form';
import { Button } from '../../ui/Button';
import { useMutation } from '@tanstack/react-query';
import { UserType } from '../../types/user';
import isValidDate from '../../utils/checkDate';
import { userJoinApi } from '../../service/apiUser';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const JoinLayout = styled.div`
  width: 100dvw;
  height: 1080px;
  display: flex;
  justify-content: center;

  form {
    margin-top: 5%;
    padding-top: 5%;
    position: fixed;
    width: 500px;
    height: 600px;
    border: 2px solid #e0ccbe;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    div {
      width: 80%;
      background-color: #d7fadc;
      display: flex;
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
  const navigate = useNavigate();
  const { handleSubmit, register, formState } = useForm<UserType>();
  const { mutate: joinUser, isPending } = useMutation<void, Error, UserType>({
    mutationFn: (user) => userJoinApi(user),
    onSuccess: () => navigate('/login'),
    onError: (e) => toast.error(e.message),
  });

  // const {} = useMutation({
  //   mutationFn: () => {},
  //   onSuccess: () => {},
  // });
  const onSubmit = (value: UserType) => {
    // userForm의 제네릭을 UserType으로 설정해도 value값들은 string으로 나온다 그래서
    //user_date같은 경우는 onSubmit에서 다시 Date형식으로 맞춰야 된다
    // 그럼에도 불구하고 제네릭에 타입을 명시하는 이유는 이유는 타입 안전성을 확보하고, 입력값과 관련된 자동 완성 기능 및 유효성 검사를 제공하기 위함
    console.log('제출');
    // console.log(value);
    joinUser(value);
  };

  return (
    <JoinLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="아이디" type="vertical" error={formState.errors.user_id?.message}>
          <input
            id="id"
            {...register('user_id', {
              required: 'd',
              pattern: {
                value: /^[A-Za-z0-9\-\_]{4,20}/,
                message: '아이디는 6~20자의 영문 소문자,숫자의 특수기호(-),(_)만 사용 가능',
              },
            })}
          />
        </FormInput>
        <FormInput label="비밀번호" type="vertical" error={formState.errors.user_pw?.message}>
          <input
            id="password"
            {...register('user_pw', {
              required: 'd',
              pattern: {
                // 탐색조건 |아무문자나 0번이상 반복 | X가 포함되야한다ㅏ
                // 어디에든 Xrk 포함되어야 한다
                // value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!*]){3,}$/,
                // message: '비밀번호는 영문 소문자,대문자와 특수문자 [!,*]1개를 포함해야 합니다',
                value: /[A-Za-z0-9]{7,}.*[^a-zA-Z0-9가-힣ㄱ0ㅎ]/,
                message:
                  '비밀번호는 영문자로 시작하는 글자여야 하며,최소 특수문자 1개를 포함하는 8자리 글자여야 합니다',
              },
            })}
          />
        </FormInput>
        <FormInput label="이메일" type="vertical" error={formState.errors.user_email?.message}>
          <input
            id="email"
            {...register('user_email', {
              required: 'd',
              pattern: {
                value: /^[a-zA-Z0-9]([-_\.]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]([-_\.]?[0-9a-zA-Z]+)*\.[a-zA-Z]{2,3}/,
                // ? 0~1
                // * 0~n
                // + 1~n
                message: '이메일 형식을 확인하여 주세요',
              },
            })}
          />
        </FormInput>
        <FormInput label="이름" type="vertical" error={formState.errors.user_name?.message}>
          <input
            id="name"
            {...register('user_name', {
              required: 'd',
              pattern: { value: /^[가-힣ㄱ-ㅎa-zA-Z]+$/, message: '이름은 한글이나 영어 이름만 써주세요' },
            })}
          />
        </FormInput>
        <FormInput label="생년월일" type="vertical" error={formState.errors.user_birth?.message}>
          {/* 유효성 검사를 pattern에서한번 Validate에서 한번 1차2차 검사를 할 수 있다. 
          자릿수 먼저 검사하고 유효한 날짜인지 검사하고*/}
          <input
            id="birth"
            {...register('user_birth', {
              required: 'd',
              pattern: {
                //01 02 03 ... 29 30 31
                value: /^(18[8-9][0-9]|19[0-9]{2}|20[0-2][0-4])(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/,
                message: 'YYYYMMDD',
              },
              validate: (value) => isValidDate(value) || '유효하지 않은 날짜 입니다. 날짜를 확인해 주세요',
            })}
          />
        </FormInput>
        <FormInput label="휴대폰번호" type="vertical" error={formState.errors.user_phone?.message}>
          <input
            id="phoneNumber"
            {...register('user_phone', {
              required: 'd',
              pattern: {
                value: /[0-9]{3}[0-9]{3,4}[0-9]{3}/,
                message: '-를 빼고 유효한 번호를 입력하여 주세요',
              },
            })}
          />
        </FormInput>
        <Button>가입하기</Button>
      </form>
    </JoinLayout>
  );
}
export default Join;

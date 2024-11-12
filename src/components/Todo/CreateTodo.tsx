/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import toast from 'react-hot-toast';
import { type SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '../../ui/Button';
import { TodoType } from '../../types/todo';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import FormInput from '../../ui/FormInput';
import { css } from '@emotion/react';
import { makeTodo } from '../../service/apiTodo';
import useCabinStore from '../../stores/cabin';

const CreateTodoLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: 20px;

  input {
    width: 300px;
    height: 30px;
  }
  form {
    height: fit-content;
    padding: 20px 10px;
    /* background-color: aqua; */
    display: flex;
    align-items: center;
    gap: 10px;
    width: 80%;
    flex-direction: column;
    border: 2px solid #3c3633;
    border-radius: 5px;
  }
  :global(.react-datepicker__input-container input) {
    width: 300px;
    height: 30px;
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 4px;
  }
  button {
    margin: 20px;
  }
`;

const PickerStyle = css`
  display: flex;
  gap: 15px;
  width: 75%;
  label {
    width: 50px;
  }
  span {
    color: red;
  }
`;

function CreateTodo() {
  const { register, handleSubmit, control, formState } = useForm<TodoType>();
  const [date, setDate] = useState<Date | null>();
  const { setIsClickAdd } = useCabinStore();

  const queryClient = useQueryClient();
  //   useMutation<TData, TError, TVariables>: 첫번째 성공반환 타입, 오류반환타입,매개변수 타입
  const { mutate: createTodo } = useMutation<void, Error, TodoType>({
    mutationFn: (todo) => makeTodo(todo),
    // mutationFn: (todo) => Promise.resolve(test(todo)),
    // 성공 반환타입을 void라고 해도 mutationFn는 기본적으로 Promise를 반환해야된다고 가정한다
    //그래서 Promise.resolve로 동기함수를 감싸줘야한다
    // -> 비동기 함수가 항상 promise를 반환해야할때 사용하는 함수.value값을 즉시 해결된 promise로 반환한다
    onSuccess: () => {
      toast.success('투두 생성 성공');
      queryClient.invalidateQueries({
        queryKey: ['todo'],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<TodoType> = (data) => {
    if (typeof data.date === 'string') return;
    const date = dateFormat(data.date);
    createTodo({ ...data, date: date });
    setIsClickAdd();
  };

  function dateFormat(date: Date): string {
    const dateFormat = date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\./g, '-')
      .replace(/\s/g, '')
      .replace(/-$/, '');
    return dateFormat;
  }

  console.log(formState.errors);
  return (
    <CreateTodoLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="todo" error={formState.errors?.todo?.message}>
          <input id="todo" type="text" {...register('todo', { required: 'required' })} />
        </FormInput>

        <FormInput label="label" error={formState.errors?.label?.message}>
          <input type="text" {...register('label')} id="label" />
        </FormInput>

        <div css={PickerStyle}>
          {/* controller는 filed객체를 이용해서 onchange,value 등의 값을 업데이트하는데 필요한 것을 제공 */}
          <label htmlFor="date">date</label>
          <Controller
            name="date" //name을 설정하여 todotype에 속하는 필드를 넣어야 한다
            control={control}
            rules={{ required: 'required' }}
            render={({ field }) => (
              // render는 필드객체를 받아 폼과 연결

              <DatePicker
                // {...field} //스프레드 연산자를 통해 폼 필드 객체의 모든 속성을 준다 onChange,value 등
                dateFormat={'yyyy/MM/dd'}
                id="date"
                onChange={(date) => {
                  setDate(date);
                  field.onChange(date); //react-hook-form값이 업데이트 하도록 설정 폼필드 의 onchange에 date를 업데이트 해주세요
                }}
                selected={date}
              />
            )}
          />
          {formState.errors?.date?.message && <span>{formState.errors.date.message}</span>}
        </div>
        <FormInput label="priority" error={formState.errors?.priority?.message}>
          <input type="text" {...register('priority')} />
        </FormInput>
        <Button type="submit">추가하기</Button>
        {/* 버튼 타입을 submit을 하고 onClick함수를 넣으면 react-hook-form연결이 안된다 */}
      </form>
    </CreateTodoLayout>
  );
}
export default CreateTodo;

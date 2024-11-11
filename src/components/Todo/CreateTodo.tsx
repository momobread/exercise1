/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { type SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Button } from '../../ui/Button';
import { TodoType } from '../../types/todo';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import FormInput from '../../ui/FormInput';
import { css } from '@emotion/react';
import { makeTodo } from '../../service/apiTodo';

const CreateTodoLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

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
    width: 60%;
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
  label {
    width: 50px;
  }
`;

function test(todo: TodoType): void {
  console.log(todo);
}

function CreateTodo() {
  const { register, handleSubmit, control } = useForm<TodoType>();
  const [date, setDate] = useState<Date | null>();

  //   useMutation<TData, TError, TVariables>: 첫번째 성공반환 타입, 오류반환타입,매개변수 타입
  const { mutate: createTodo } = useMutation<void, Error, TodoType>({
    mutationFn: (todo) => makeTodo(todo),
    // mutationFn: (todo) => Promise.resolve(test(todo)),
    // 성공 반환타입을 void라고 해도 mutationFn는 기본적으로 Promise를 반환해야된다고 가정한다
    //그래서 Promise.resolve로 동기함수를 감싸줘야한다
    // -> 비동기 함수가 항상 promise를 반환해야할때 사용하는 함수.value값을 즉시 해결된 promise로 반환한다
  });

  const onSubmit: SubmitHandler<TodoType> = (data) => {
    if (typeof data.date === 'string') return;
    const date = dateFormat(data.date);
    createTodo({ ...data, date: date });
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

  return (
    <CreateTodoLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="todo">
          <input id="todo" type="text" {...register('todo', { required: '필수 입력 입니다' })} />
        </FormInput>

        <FormInput label="label">
          <input type="text" {...register('label')} id="label" />
        </FormInput>

        <div css={PickerStyle}>
          {/* controller는 filed객체를 이용해서 onchange,value 등의 값을 업데이트하는데 필요한 것을 제공 */}
          <label htmlFor="date">date</label>
          <Controller
            name="date" //name을 설정하여 todotype에 속하는 필드를 넣어야 한다
            control={control}
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
        </div>
        <FormInput label="priority">
          <input type="text" {...register('priority')} />
        </FormInput>
        <Button>등록</Button>
      </form>
    </CreateTodoLayout>
  );
}
export default CreateTodo;

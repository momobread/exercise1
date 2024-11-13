/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import toast from 'react-hot-toast';
import { type SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '../../ui/Button';
import { TodoType } from '../../types/todo';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormInput from '../../ui/FormInput';
import { css } from '@emotion/react';
import { editTodo, makeTodo } from '../../service/apiTodo';
import useTodoStore from '../../stores/cabin';

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
    width: 70%;
    /* max-width: 80%; */
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
  div {
    width: fit-content;

    button {
      margin-right: 10px;
    }
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

// function CreateTodo({ todos }: CreateTodoProps) {
function CreateTodo() {
  const { setIsClickAdd, isClickEdit, todo, setIsClickEdit } = useTodoStore();
  const { register, handleSubmit, control, formState } = useForm<TodoType>({
    defaultValues: isClickEdit ? todo : { date: '', label: '', priority: '', todo: '' },
  });
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
  const { mutate: editMutate } = useMutation<void, Error, TodoType>({
    mutationFn: (data) => editTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo'] });
    },
  });

  const onSubmit: SubmitHandler<TodoType> = (data) => {
    if (data.id) {
      editMutate(data);
      setIsClickEdit();
    } else {
      console.log(data);
      if (typeof data.date === 'string') return; //date가 객체이면
      const date = dateFormat(data.date);
      createTodo({ ...data, date: date });
      setIsClickAdd();
    }
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
        <FormInput label="todo" error={formState.errors?.todo?.message}>
          <input id="todo" type="text" {...register('todo', { required: 'required' })} />
        </FormInput>

        <FormInput label="label" error={formState.errors?.label?.message}>
          <input type="text" {...register('label')} id="label" />
        </FormInput>

        <div css={PickerStyle}>
          {/* controller는 field객체를 이용해서 onchange,value 등의 값을 업데이트하는데 필요한 것을 제공 */}
          <label htmlFor="date">date</label>
          <Controller
            name="date" //name을 설정하여 todotype에 속하는 필드를 넣어야 한다
            control={control}
            rules={{ required: 'required' }}
            render={({ field }) => (
              // render는 필드객체를 받아 폼과 연결[훅 폼에서 떨어져 나온 Field]
              // defaultvalue의 데이이터에서 키값이[name,date 등] 일치하면 value값을 자동으로 넣어주는거같다["청소하기","날짜날짜 객체"]
              //onChange,value[실제 날짜 값],name[date]등

              <DatePicker
                dateFormat={'yyyy/MM/dd'}
                id="date"
                onChange={(date) => {
                  field.onChange(date); //react-hook-form값이 업데이트 하도록 설정 폼필드 의 onchange에 date를 업데이트 해주세요
                }}
                selected={field.value === '' ? undefined : new Date(field.value)}
              />
            )}
          />
          {formState.errors?.date?.message && <span>{formState.errors.date.message}</span>}
        </div>
        <FormInput label="priority" error={formState.errors?.priority?.message}>
          <input type="text" {...register('priority')} />
        </FormInput>
        <div>
          {isClickEdit ? <Button type="submit">편집하기</Button> : <Button type="submit">추가하기</Button>}

          {isClickEdit ? (
            <Button type="button" onClick={() => setIsClickEdit()}>
              닫기
            </Button>
          ) : (
            <Button type="button" onClick={() => setIsClickAdd()}>
              닫기
            </Button>
          )}
          {/* 버튼 타입을 submit을 하고 onClick함수를 넣으면 react-hook-form연결이 안된다 */}
        </div>
      </form>
    </CreateTodoLayout>
  );
}
export default CreateTodo;

import styled from '@emotion/styled';
import { FormSubmitHandler, type SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../ui/Button';
import { TodoType } from '../../types/todo';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

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
    height: 1000px;
    background-color: aqua;
    display: flex;
    width: 60%;
    flex-direction: column;
  }
  :global(.react-datepicker__input-container input) {
    width: 300px;
    height: 30px;
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 4px;
  }
`;

function CreateTodo() {
  const { register, handleSubmit } = useForm<TodoType>();
  const [date, setDate] = useState<Date | null>();

  const onSubmit: SubmitHandler<TodoType> = (data) => {
    console.log(data);
  };

  return (
    <CreateTodoLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('todo', { required: '필수 입력 입니다' })} />
        <input type="text" {...register('label')} />

        <div>
          <DatePicker dateFormat={'yyyy/MM/dd'} onChange={(date) => setDate(date)} selected={date} />
        </div>
        <input type="text" {...register('priority')} />
        <Button>등록</Button>
      </form>
    </CreateTodoLayout>
  );
}
export default CreateTodo;

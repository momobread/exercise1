import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';

const CreateTodoLayout = styled.div`
  display: flex;
  flex-direction: column;

  input {
    width: 300px;
    height: 30px;
  }
`;

function CreateTodo() {
  const {} = useForm();
  return (
    <CreateTodoLayout>
      <input type="text" />
      <input type="text" />
      <input type="text" />
    </CreateTodoLayout>
  );
}
export default CreateTodo;

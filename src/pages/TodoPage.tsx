/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import TodoTable from '../components/Todo/TodoTable';

const TodoLayout = styled.section`
  /* background-color: #e0ccbe; */
`;

function TodoPage() {
  return (
    <TodoLayout>
      <TodoTable />
    </TodoLayout>
  );
}
export default TodoPage;

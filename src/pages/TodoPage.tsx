/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import TodoTable from '../components/Todo/TodoTable';

const TodoLayout = styled.section``;

function TodoPage() {
  // const { isClickAdd } = useCabinStore();
  return (
    <TodoLayout>
      <TodoTable />

      {/* {isClickAdd && <CreateTodo />} */}
    </TodoLayout>
  );
}
export default TodoPage;

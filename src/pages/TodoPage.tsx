/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import TodoTable from '../components/Todo/TodoTable';

import CreateTodo from '../components/Todo/CreateTodo';
import useCabinStore from '../stores/cabin';

const TodoLayout = styled.section``;

function TodoPage() {
  const { isClickAdd } = useCabinStore();
  return (
    <TodoLayout>
      <TodoTable />

      {isClickAdd && <CreateTodo />}
    </TodoLayout>
  );
}
export default TodoPage;

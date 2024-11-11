/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import TodoTable from '../components/Todo/TodoTable';
import DatePicker from 'react-datepicker';
import { useState } from 'react';

const TodoLayout = styled.section``;

function TodoPage() {
  return (
    <TodoLayout>
      <TodoTable />
    </TodoLayout>
  );
}
export default TodoPage;

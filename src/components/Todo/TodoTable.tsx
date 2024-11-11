import styled from '@emotion/styled';
import TodoNav from './TodoNav';
import TodoTableRow from './TodoTableRow';
import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../../service/apiTodo';
import { Button } from '../../ui/Button';
import { useState } from 'react';
import { FaS } from 'react-icons/fa6';
import CreateTodo from './CreateTodo';

const TodoTableLayout = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  list-style: none;
  padding: 0;
  margin: 0;
  div:nth-of-type(1) {
    height: fit-content;
    background-color: #e0ccbe;
  }

  div {
    width: calc(97% + 5px);
    height: 30px;
    text-align: center;
    background-color: #eeedeb;
    /* border: 1px solid black; */
    display: flex;
    gap: 10px;
    padding: 10px;

    span:nth-of-type(1) {
      width: 50%;
      min-width: 250px;
    }

    span:nth-of-type(2),
    span:nth-of-type(3),
    span:nth-of-type(4) {
      width: 10%;
      min-width: 70px;
    }
  }
  button {
    margin-top: 20px;
  }
`;

function TodoTable() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const { data } = useQuery({
    queryKey: ['todo'],
    queryFn: fetchTodos,
  });

  return (
    <div className="">
      <TodoTableLayout>
        <TodoNav />
        {data?.map((todos) => <TodoTableRow todos={todos} key={new Date().getTime()} />)}
        <Button onClick={() => setShowForm(true)}>추가하기</Button>
      </TodoTableLayout>
      {showForm && <CreateTodo />}
    </div>
  );
}
export default TodoTable;

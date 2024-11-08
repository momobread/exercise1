import styled from '@emotion/styled';
import TodoNav from './TodoNav';
import TodoTableRow from './TodoTableRow';
import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../../service/apiTodo';

const TodoTableLayout = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;

  div {
    height: 50px;
  }

  /* div:nth-child(1) {
    background-color:git #747264;
  }

  div {
    background-color: aliceblue;
    display: flex;
    justify-content: center;
    gap: 10px;
    box-sizing: border-box;

    span:nth-child(1) {
      width: 55%;
    }
    span:nth-child(2),
    span:nth-child(3),
    span:nth-child(4) {
      width: 15%;
    }
  } */
`;

function TodoTable() {
  const { data } = useQuery({
    queryKey: ['todo'],
    queryFn: fetchTodos,
  });

  return (
    <div className="">
      <TodoTableLayout>
        <TodoNav />
        {data?.map((todos) => <TodoTableRow todos={todos} key={new Date().getTime()} />)}
      </TodoTableLayout>
    </div>
  );
}
export default TodoTable;

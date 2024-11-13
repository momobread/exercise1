import styled from '@emotion/styled';
import TodoNav from './TodoNav';
import TodoTableRow from './TodoTableRow';
import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../../service/apiTodo';
import { Button } from '../../ui/Button';
import { useEffect, useState } from 'react';
import { FaS } from 'react-icons/fa6';
import CreateTodo from './CreateTodo';
import useTodoStore from '../../stores/cabin';

const TodoTableLayout = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  list-style: none;
  padding: 0;
  margin: 0;

  #Todonav {
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
    div {
      width: fit-content;
      padding: 0;
    }
  }
  button {
    margin-top: 20px;
  }
`;

function TodoTable() {
  const { data } = useQuery({
    queryKey: ['todo'],
    queryFn: fetchTodos,
  });

  // useEffect(() => {
  //   if (data === undefined || data === null) throw new Error('데이터 불러오기에 실패하엿습니다');
  //   setTodos(data);
  // }, [data]);

  const { setIsClickAdd, isClickAdd, isClickEdit } = useTodoStore();
  console.log(isClickAdd);

  function handleButton() {
    setIsClickAdd();
  }

  return (
    <div className="">
      <TodoTableLayout>
        <TodoNav />
        {/* {data?.map((todos) => <TodoTableRow todos={todos} key={new Date().getTime()} />)} */}
        {/* 이렇게 고유값을 똑같이하면 버튼을 눌렀을때 getTime이 값이 바껴도 li3개가 한 뭉치로 쳐서 원래 todo[1111]에 버튼을 눌렀을때의 todo[2222]가 추가됬다고 인식한다 */}
        {/* 즉 기존 todo가 단순히 갱신된것이 아니라, 데이터가 똑같지만 고유값이 뭉터기로 달라서 같은 내용이여도 추가됬다고 판단해서 또 똑같은 todo를 보여주는 것이다*/}
        {data?.map((todo) => <TodoTableRow todo={todo} key={todo.id} />)}
        {!isClickAdd && <Button onClick={handleButton}>추가하기</Button>}
      </TodoTableLayout>
      {/* {isClickAdd && <CreateTodo todos={data} />} */}
      {isClickAdd && <CreateTodo />}
      {isClickEdit && <CreateTodo />}
    </div>
  );
}
export default TodoTable;

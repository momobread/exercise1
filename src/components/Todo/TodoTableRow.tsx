import { useEffect } from 'react';
import { TodoTableRowProps } from '../../types/todo';

function TodoTableRow({ todos }: TodoTableRowProps) {
  const { id, date, label, priority, todo } = todos;
  // console.log(id);
  return (
    <div key={id}>
      <span>{todo}</span>
      <span>{label}</span>
      {typeof date === 'string' && <span>{date}</span>}
      <span>{priority}</span>
    </div>
  );
}
export default TodoTableRow;

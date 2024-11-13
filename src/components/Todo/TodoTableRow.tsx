import { TodoTableRowProps } from '../../types/todo';
import { DeleteOutline, ModeEdit } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { deleteTodo } from '../../service/apiTodo';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useTodoStore from '../../stores/cabin';

function TodoTableRow({ todo }: TodoTableRowProps) {
  const { id, date, label, priority, todo: content } = todo;
  const queryClient = useQueryClient();
  const { setIsClickEdit, setTodo } = useTodoStore();

  // useEffect(() => {
  //   setIsClickAdd();
  //   setIsClickEdit();
  // }, [setTodo]);

  const handleDelete = (id?: number): void => {
    if (id === undefined) return;
    deleteMutate(id);
  };

  const handleEdit = (id?: number) => {
    if (id === undefined) return;
    console.log(todo);
    setIsClickEdit();
    // editMutate(id);
    setTodo({ ...todo, date: new Date(date) });
  };
  const { mutate: deleteMutate } = useMutation<void, Error, number>({
    mutationFn: (id) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo'] });
      toast.success('삭제를 성공하였습니다');
    },
    onError: () => {
      toast.error('삭제를 실패하엿습니다');
    },
  });

  // const { mutate: editMutate } = useMutation<void, Error, number>({
  //   mutationFn: (id) => editTodo(id),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['todo'] });
  //   },
  // });

  return (
    <>
      <div key={id}>
        <span>{content}</span>
        <span>{label}</span>
        {typeof date === 'string' && <span>{date}</span>}
        <span>{priority}</span>
        <div onClick={() => handleDelete(id)}>
          <DeleteOutline />
        </div>
        <div onClick={() => handleEdit(id)}>
          <ModeEdit />
        </div>
      </div>
    </>
  );
}
export default TodoTableRow;

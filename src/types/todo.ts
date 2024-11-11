interface TodoType {
  id?: number;
  todo: string;
  label: string;
  date: Date | string;
  // date: string;
  priority: string;
}

interface TodoTableRowProps {
  todos: TodoType;
}

export type { TodoType, TodoTableRowProps };

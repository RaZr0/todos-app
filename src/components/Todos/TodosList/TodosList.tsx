import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Status, Todo } from "../../../interfaces/todo.interface";
import { TodosListItemStyles, TodosListStyles } from "./TodosList.styles";



interface TodosListProps {
    todos: Todo[];
    onTodoStatusChanged: (todoId: string, status: Status) => void;
    onDeleteTodo: (todoId: string) => void;
}

export const TodosList = ({ todos, onTodoStatusChanged, onDeleteTodo }: TodosListProps) => {
    return <TodosListStyles>
        {todos.map(t => {
            return <TodosListItemStyles key={t.id}>
                <span>{t.name}</span>
                <span>{t.description}</span>
                <span>{t.dueDate}</span>
                <FormControl>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={t.status}
                        label="Age"
                        onChange={(e) => onTodoStatusChanged(t.id, e.target.value as Status)}
                    >
                        <MenuItem value={Status.ToDo}>{Status.ToDo}</MenuItem>
                        <MenuItem value={Status.InProgress}>{Status.InProgress}</MenuItem>
                        <MenuItem value={Status.Done}>{Status.Done}</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={() => onDeleteTodo(t.id)} variant="contained" color="error">
                    Delete
                </Button>
            </TodosListItemStyles>
        })}
    </TodosListStyles>
}
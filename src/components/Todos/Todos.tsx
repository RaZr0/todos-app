import { useEffect, useState } from "react"
import { AddTodo } from "./AddTodo/AddTodo"
import { TodosList } from "./TodosList/TodosList"
import { Status, Todo } from "../../interfaces/todo.interface";
import { TodosStyles } from "./Todos.styles";
import { FilterTodos } from "./FilterTodos/FilterTodos";


const localStorageTodosKey = 'todos';

export const Todos = () => {

    const [todos, setTodos] = useState<Todo[]>(localStorage.getItem(localStorageTodosKey) ? JSON.parse(localStorage.getItem(localStorageTodosKey) as string) as Todo[] : []);
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        localStorage.setItem(localStorageTodosKey, JSON.stringify(todos));
        setFilteredTodos(filterTodos(filter));
    }, [todos])


    function onAddTodo(todo: Todo) {
        setTodos([...todos, todo]);
    }


    function onTodoStatusChanged(todoId: string, status: Status) {
        setTodos(todos.map(t => {
            if (t.id === todoId) {
                t.status = status;
            }
            return t;
        }))
    }

    function onDeleteTodo(todoId: string) {
        setTodos(todos.filter(t => t.id !== todoId));
    }

    function onFilterTodos(value: string) {
        setFilter(value);
        setFilteredTodos(filterTodos(value))
    }

    function filterTodos(filter: string) {
        return todos.filter(t => {
            if (!filter) return t;

            return t.description.includes(filter) || t.name.includes(filter);
        })
    }

    return <TodosStyles>
        <AddTodo onAdd={onAddTodo} />
        <FilterTodos onFilter={onFilterTodos} />
        <TodosList todos={filteredTodos} onTodoStatusChanged={onTodoStatusChanged} onDeleteTodo={onDeleteTodo} />
    </TodosStyles>
}
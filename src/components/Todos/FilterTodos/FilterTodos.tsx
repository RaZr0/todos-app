interface FilterTodosProps {
    onFilter: (value: string) => void;
}

export const FilterTodos = ({ onFilter }: FilterTodosProps) => {
    return <div>
        <input type="text" onChange={(e) => {
            onFilter(e.target.value);
        }} placeholder="filter by name or desc"/>
    </div>
}
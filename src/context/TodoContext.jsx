import { createContext, useState } from "react"

const TodoContext = createContext()

export default TodoContext;

export const TodoProvider =  ({children}) =>{

    const [todo, setTodo] = useState(null);

    const fetchSingleTodo = async (todoId) => {
        try {
            const response = await fetch(`/home/get-single-todo/${todoId}/`); 
            if (!response.ok) {
                throw new Error('Failed to fetch todo item');
            }
            const data = await response.json();
            setTodo(data);
        } catch (error) {
            console.error('Error fetching single todo item:', error);
        }
    };

    let todoData = {
        todo: todo,

        fetchSingleTodo: fetchSingleTodo

    }
    return (
        <TodoContext.Provider value = {todoData} >
            {children}
        </TodoContext.Provider>
    )
}
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TodoView = () => {
    const [todo, setTodo] = useState(null);
    const navigate = useNavigate()
    const location  = useLocation()
    const todoId = location.state?.todoId


    const fetchSingleTodo = async (todoId) => {
        try {

            const response = await fetch(`http://127.0.0.1:8000/home/get-single-todo/${location.state?.todoId}/`); 
            if (!response.ok) {
                throw new Error('Failed to fetch todo item');
            }
            const data = await response.json();
            setTodo(data);
        } catch (error) {
            console.error('Error fetching single todo item:', error);
        }
    };

    useEffect(()=>{
        if (location.state?.todoId){
            fetchSingleTodo()
        }
    }, [location.state?.todoId])
  return (
    <div>
        <div>
            <div className="grid p-4">
                <label className="text-lg font-semibold text-center text-gray-900 block mb-2">
                    Todo Details
                </label>
                <div className="mb-4">
                    <label className="text-sm font-medium text-gray-900 block mb-2">
                        Title
                    </label>
                    <div className='bg-gray-50 shadow-md py-2 rounded-md px-2 border '>{todo?.title}</div>
                </div>
                <div className="col-span-full ">
                    <label htmlFor="product-details" className="text-sm font-medium text-gray-900 block mb-2">
                        Body
                    </label>
                    <div className='bg-gray-50 shadow-md py-2 rounded-md px-2 border '>{todo?.body}</div>
                </div>
            </div>
            <div className='flex justify-center gap-5'>
                <button onClick={() => navigate('/edit-todo', { state: { todoId: todo?.id } })} className='bg-teal-500 py-2 px-4 rounded-lg shadow-md'>Edit</button>
                <button onClick={() => navigate('/')} className='bg-teal-500 py-2 px-4 rounded-lg shadow-md'>Back</button>
            </div>
        </div>
    </div>
  )
}

export default TodoView
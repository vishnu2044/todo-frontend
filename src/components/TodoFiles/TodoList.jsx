import React, { useEffect, useState } from 'react';
import { MdDelete, MdDifference } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { FaEnvelopeOpenText } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { SuccessMessage } from '../../alertBoxes/SuccessMessage';
import { FaDeleteLeft } from "react-icons/fa6";


const TodoList = () => {
    const [notes, setNotes] = useState('')
    const [note, setNote] = useState('')
    const navigate  = useNavigate()
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        fetchTodoList();
    }, []);

    const fetchTodoList = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/home/get-all-list',{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });

            if (!response.status === 200) {
                throw new Error('Failed to fetch todo list');
            }
            const data = await response.json();
            setTodoList(data);
        } catch (error) {
            console.error('Error fetching todo list:', error);
        }
    };

    const handleDelete = async ({todoId}) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/home/delete-todo-list/${todoId}/`, {
                method: 'DELETE'
            });
            if (response.ok) {
                SuccessMessage({message: "deleted succssfully"})
                fetchTodoList()
            }else{

            }

        } catch (error) {
            console.error('Error deleting todo item:', error);
        }
    };

  return (
    <div>

            <div class="px-2 pb-2 w-full">
                <div className='flex justify-end w-full'>
                    <button onClick={() => navigate('/addnew')}  className=' px-6 py-1 bg-teal-500 mb-2 rounded-md text-base font-medium '>Add new</button>
                </div>
                {
                    todoList && todoList.length >  0 ?
                    <div>
                        {
                            todoList.map((todo) =>(

                                <div class="bg-gray-200 rounded flex px-4 py-2 my-2  h-full items-center justify-between">
                                    <div className='flex justify-between'>
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                            class="border-teal-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                            <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span class="font-medium">{todo.title}</span>

                                    </div>
                                    <div className='flex gap-2 text-lg '>
                                        <button onClick={()=>navigate('/view-todo', { state: { todoId: todo.id } } )} title="Open" className='hover:bg-teal-500 hover:shadow-lg rounded-lg p-2 hover:text-white'><FaEnvelopeOpenText /></button>
                                        <button onClick={() => navigate('/edit-todo', { state: { todoId: todo.id } })} title="Edit" className='hover:bg-teal-500 hover:shadow-lg rounded-lg p-2 hover:text-white'><MdModeEdit  /></button>
                                        <button onClick={()=> handleDelete( {todoId: todo.id} ) } title="Delete" className='hover:bg-teal-500 hover:shadow-lg rounded-lg p-2 hover:text-white'><FaDeleteLeft /></button>

                                    </div>
                                </div>
                            ))
                        }
                    </div>
                :
                <p>no data present</p>
                }
            </div>

    </div>
  )
}

export default TodoList